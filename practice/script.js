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

function showStatusMessage(message) {
    statusMessage.textContent = message;
}

function displayTexts() {
    textList.innerHTML = '';
    
    if (texts.length === 0) {
        textList.innerHTML = '<tr><td class="no-entries" colspan="4">Nothing to display</td></tr>';
        return;
    }

    // Add table headers
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

    // Show PDF button only if there are entries
    generatePdfButton.style.display = texts.length > 0 ? 'block' : 'none';
}

addButton.addEventListener('click', () => {
    const content = entryInput.value.trim();
    const type = typeInput.value.trim();

    if (!content || !type) {
        showStatusMessage('Both fields are required.');
        return;
    }

    // Check for duplicates
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

    const idsToDelete = [];
    const deletedEntries = [];

    checkedBoxes.forEach(checkbox => {
        const id = checkbox.dataset.id;
        idsToDelete.push(id);

        const entry = texts.find(text => text.id === id);
        if (entry) {
            deletedEntries.push(capitalizeWords(entry.content));
        }
    });

    texts = texts.filter(text => !idsToDelete.includes(text.id));

    saveTexts();
    displayTexts();
    deleteSelectedButton.style.display = 'none';

    showStatusMessage(`Deleted: ${deletedEntries.join(', ')}`);
});

showListButton.addEventListener('click', displayTexts);

generatePdfButton.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const uniqueTypes = [...new Set(texts.map(text => text.type))];
    let currentY = 16;

    uniqueTypes.forEach(type => {
        const filteredTexts = texts.filter(text => text.type === type);
        if (filteredTexts.length === 0) return;

        doc.setFontSize(18);
        doc.text(capitalizeWords(type) + " Entries", 14, currentY);
        currentY += 10;

        const tableData = filteredTexts.map((text, index) => [
            index + 1,
            capitalizeWords(text.content),
            capitalizeWords(text.type)
        ]);

        const headers = ['#', 'Entry', 'Type'];

        doc.autoTable({
            startY: currentY,
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

        currentY = doc.lastAutoTable.finalY + 10;
    });

    doc.save("text_management_list.pdf");
});

textList.addEventListener('change', () => {
    const checkedBoxes = document.querySelectorAll('#textList input[type="checkbox"]:checked');
    deleteSelectedButton.style.display = checkedBoxes.length > 0 ? 'block' : 'none';
});
