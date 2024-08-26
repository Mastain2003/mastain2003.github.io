// JavaScript code handling the functionalities

document.getElementById('addButton').addEventListener('click', addEntry);
document.getElementById('showListButton').addEventListener('click', displayEntries);
document.getElementById('deleteSelectedButton').addEventListener('click', deleteSelectedEntries);
document.getElementById('generatePdfButton').addEventListener('click', generatePDF);

function addEntry() {
    const entryText = document.getElementById('entryInput').value.trim();
    const entryType = document.getElementById('typeInput').value.trim();
    
    if (!entryText || !entryType) {
        showStatusMessage("Both fields are required.");
        return;
    }

    const existingEntries = JSON.parse(localStorage.getItem('entries')) || [];

    // Case-insensitive duplicate check
    const duplicate = existingEntries.some(entry => 
        entry.text.toLowerCase() === entryText.toLowerCase() && 
        entry.type.toLowerCase() === entryType.toLowerCase()
    );

    if (duplicate) {
        showStatusMessage("Duplicate entry. This text with the same type already exists.");
        return;
    }

    const newEntry = {
        id: Date.now(),
        text: entryText,
        type: entryType,
        read: false
    };

    existingEntries.push(newEntry);
    localStorage.setItem('entries', JSON.stringify(existingEntries));
    
    showStatusMessage("Entry added successfully.");
    clearInputs();
}

function displayEntries() {
    const filterType = document.getElementById('filterType').value.trim().toLowerCase();
    const filterStatus = document.getElementById('filterStatus').value;
    const filterLimit = document.getElementById('filterLimit').value;
    const randomizeOrder = document.getElementById('randomizeOrder').checked;

    let entries = getEntries();
    
    if (filterType) {
        entries = entries.filter(entry => entry.type.toLowerCase().includes(filterType));
    }

    if (filterStatus !== 'all') {
        entries = entries.filter(entry => entry.status === filterStatus);
    }

    if (randomizeOrder) {
        entries = entries.sort(() => Math.random() - 0.5);
    }

    if (filterLimit !== 'all') {
        entries = entries.slice(0, parseInt(filterLimit, 10));
    }

    renderTable(entries);

    document.getElementById('deleteSelectedButton').style.display = entries.length ? 'block' : 'none';
    document.getElementById('generatePdfButton').style.display = entries.length ? 'block' : 'none';
}

function deleteSelectedEntries() {
    const checkboxes = document.querySelectorAll('#entryTable input[type="checkbox"]:checked');
    const selectedIds = Array.from(checkboxes).map(checkbox => parseInt(checkbox.dataset.id, 10));

    if (selectedIds.length === 0) {
        showStatusMessage('No entry selected.');
        return;
    }

    let entries = getEntries();
    const filteredEntries = entries.filter(entry => !selectedIds.includes(entry.id));

    localStorage.setItem('entries', JSON.stringify(filteredEntries));

    displayEntries();
    showStatusMessage('Selected entries deleted.');
}

function renderTable(entries) {
    const table = document.getElementById('entryTable');
    table.innerHTML = '';

    if (entries.length === 0) {
        table.innerHTML = '<tr class="no-entries"><td colspan="4">Nothing to display</td></tr>';
        return;
    }

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>#</th>
        <th>Text</th>
        <th>Type</th>
        <th></th>
    `;
    table.appendChild(headerRow);

    entries.forEach((entry, index) => {
        const row = document.createElement('tr');
        if (entry.status === 'read') row.classList.add('highlight');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${capitalizeWords(entry.text)}</td>
            <td>${capitalizeWords(entry.type)}</td>
            <td><input type="checkbox" data-id="${entry.id}"></td>
        `;
        table.appendChild(row);
    });

    markEntriesAsRead(entries);
}

function markEntriesAsRead(entries) {
    const allEntries = getEntries();
    allEntries.forEach(entry => {
        if (entries.some(e => e.id === entry.id)) {
            entry.status = 'read';
        }
    });
    localStorage.setItem('entries', JSON.stringify(allEntries));
}

function getEntries() {
    return JSON.parse(localStorage.getItem('entries') || '[]');
}

function updateTypeOptions() {
    const typeOptions = document.getElementById('typeOptions');
    const entries = getEntries();
    const uniqueTypes = [...new Set(entries.map(entry => entry.type.toLowerCase()))];

    typeOptions.innerHTML = '';
    uniqueTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = capitalizeWords(type);
        typeOptions.appendChild(option);
    });
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function showStatusMessage(message) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
    statusMessage.style.visibility = 'visible';

    setTimeout(() => {
        statusMessage.style.visibility = 'hidden';
    }, 3000);
}

function generatePDF() {
    // PDF generation logic here
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
        ]);

        const headers = ['#', 'Entry'];

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
}

// Initial setup
updateTypeOptions();
displayEntries();
