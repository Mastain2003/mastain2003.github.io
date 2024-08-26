let texts = JSON.parse(localStorage.getItem('texts')) || [];
const entryInput = document.getElementById('entryInput');
const typeInput = document.getElementById('typeInput');
const addButton = document.getElementById('addButton');
const deleteSelectedButton = document.getElementById('deleteSelectedButton');
const showListButton = document.getElementById('showListButton');
const generatePdfButton = document.getElementById('generatePdfButton');
const textList = document.getElementById('textList');
const statusMessage = document.getElementById('statusMessage');

function capitalizeWords(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

function saveTexts() {
    localStorage.setItem('texts', JSON.stringify(texts));
}

function showStatusMessage(message, timeout = 3000) {
    statusMessage.textContent = message;
    statusMessage.style.visibility = 'visible';

    setTimeout(() => {
        statusMessage.style.visibility = 'hidden';
        statusMessage.textContent = '';
    }, timeout);
}

function displayTexts() {
    textList.innerHTML = '';
    
    if (texts.length === 0) {
        textList.innerHTML = '<tr><td class="no-entries" colspan="4">Nothing to display</td></tr>';
        return;
    }

    textList.innerHTML = `
        <tr>
            <th>#</th>
            <th>Entry</th>
            <th>Type</th>
            <th>Select</th>
        </tr>
    `;

    texts.forEach((text, index) => {
        const row = document.createElement('tr');
        row.className = text.read ? 'highlight' : '';

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${capitalizeWords(text.content)}</td>
            <td>${capitalizeWords(text.type)}</td>
            <td><input type="checkbox" data-id="${text.id}"></td>
        `;

        textList.appendChild(row);
    });

    generatePdfButton.style.display = texts.length > 0 ? 'block' : 'none';
}

addButton.addEventListener('click', () => {
    const content = entryInput.value.trim();
    const type = typeInput.value.trim();

    if (!content || !type) {
        showStatusMessage('Both fields are required.');
        return;
    }

    if (texts.some(text => text.content === content && text.type === type)) {
        showStatusMessage('Duplicate entry.');
        return;
    }

    const newText = {
        id: Date.now().toString(),
        content: content,
        type: type,
        read: false
    };

    texts.push(newText);
    saveTexts();
    showStatusMessage(`Added: ${capitalizeWords(content)}`);
    entryInput.value = '';
    typeInput.value = '';
});

deleteSelectedButton.addEventListener('click', () => {
    const checkedBoxes = document.querySelectorAll('#textList input[type="checkbox"]:checked');
    
    if (checkedBoxes.length === 0) {
        showStatusMessage('No entries selected for deletion.');
        return;
    }

    const idsToDelete = Array.from(checkedBoxes).map(checkbox => checkbox.dataset.id);
    const deletedEntries = [];

    texts = texts.filter(text => {
        if (idsToDelete.includes(text.id)) {
            deletedEntries.push(capitalizeWords(text.content));
            return false;
        }
        return true;
    });

    saveTexts();
    displayTexts();
    deleteSelectedButton.style.display = 'none';

    showStatusMessage(`Deleted: ${deletedEntries.join(', ')}`);
});

showListButton.addEventListener('click', displayTexts);

generatePdfButton.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    let currentX = 14;
    let currentY = 20;
    const margin = 10;

    const uniqueTypes = [...new Set(texts.map(text => text.type))];

    uniqueTypes.forEach((type, index) => {
        const filteredTexts = texts.filter(text => text.type === type);
        if (filteredTexts.length === 0) return;

        const tableData = filteredTexts.map((text, index) => [
            index + 1,
            capitalizeWords(text.content)
        ]);

        const headers = ['#', 'Entry'];

        const tableWidth = doc.getStringUnitWidth(headers.join(' ') + ' ' + tableData.map(row => row.join(' ')).join(' ')) * doc.internal.getFontSize();

        if (currentX + tableWidth + margin > pageWidth) {
            currentX = 14;
            currentY += 70;
        }

        doc.setFontSize(14);
        doc.text(capitalizeWords(type) + " Entries", currentX, currentY - 5);

        doc.autoTable({
            startY: currentY,
            startX: currentX,
            head: [headers],
            body: tableData,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 4, 109],
                textColor: [255, 255, 255]
            },
            bodyStyles: {
                fillColor: [240, 240, 240],
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255]
            },
            styles: {
                fontSize: 12,
                cellPadding: 3,
                valign: 'middle'
            }
        });

        const lastY = doc.lastAutoTable.finalY;
        const lastX = doc.lastAutoTable.finalX;
        currentX = lastX + margin;

        if (currentX + tableWidth + margin > pageWidth) {
            currentX = 14;
            currentY = lastY + 20;
        }
    });

    doc.save("text_management_list.pdf");
});

textList.addEventListener('change', () => {
    const checkedBoxes = document.querySelectorAll('#textList input[type="checkbox"]:checked');
    deleteSelectedButton.style.display = checkedBoxes.length > 0 ? 'block' : 'none';
});
