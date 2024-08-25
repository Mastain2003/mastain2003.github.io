document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const customTextTypeInput = document.getElementById('customTextType');
    const textList = document.getElementById('textList');
    const textTypeList = document.getElementById('textTypeList');
    const textForm = document.getElementById('textForm');
    const filterType = document.getElementById('filterType');
    const filterStatus = document.getElementById('filterStatus');
    const limitEntries = document.getElementById('limitEntries');
    const deleteSelectedButton = document.getElementById('deleteSelectedButton');
    const showListButton = document.getElementById('showListButton');
    const generatePdfButton = document.getElementById('generatePdfButton');
    const statusMessage = document.getElementById('statusMessage');
    const textTable = document.getElementById('textTable');
    const randomizeCheckbox = document.getElementById('randomizeCheckbox');

    let texts = JSON.parse(localStorage.getItem('texts')) || [];

    const saveTexts = () => {
        localStorage.setItem('texts', JSON.stringify(texts));
    };

    const updateDatalist = () => {
        const uniqueTypes = [...new Set(texts.map(text => text.type))];
        textTypeList.innerHTML = '';
        filterType.innerHTML = '<option value="">All Types</option>';
        uniqueTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = capitalizeWords(type);
            textTypeList.appendChild(option);
            filterType.appendChild(option.cloneNode(true));
        });
    };

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const displayTexts = () => {
        textList.innerHTML = '';

        // Filter texts based on type and status
        let filteredTexts = texts.filter(text => {
            const typeMatch = !filterType.value || text.type === filterType.value;
            const statusMatch = !filterStatus.value || text.status === filterStatus.value;
            return typeMatch && statusMatch;
        });

        // Check if randomization is enabled
        if (randomizeCheckbox.checked) {
            filteredTexts = shuffleArray(filteredTexts);
        }

        // Apply limit to the number of entries displayed
        filteredTexts = limitEntries.value === '0' ? filteredTexts : filteredTexts.slice(0, parseInt(limitEntries.value));

        if (filteredTexts.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 4;
            cell.textContent = 'Nothing to show';
            row.appendChild(cell);
            textList.appendChild(row);
            textTable.style.display = 'none';
            generatePdfButton.style.display = 'none';
            return;
        }

        // Display the filtered (and possibly randomized) texts
        filteredTexts.forEach((text, index) => {
            const row = document.createElement('tr');
            row.className = text.status === 'read' ? 'read-row' : '';

            const numberCell = document.createElement('td');
            numberCell.textContent = index + 1;
            row.appendChild(numberCell);

            const textCell = document.createElement('td');
            textCell.textContent = capitalizeWords(text.content);
            row.appendChild(textCell);

            const typeCell = document.createElement('td');
            typeCell.textContent = capitalizeWords(text.type);
            row.appendChild(typeCell);

            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.id = text.id;  // Using a unique ID for each entry
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);

            textList.appendChild(row);

            // Mark as read
            text.status = 'read';
        });

        // Update the display status of the table and buttons
        textTable.style.display = 'table';
        generatePdfButton.style.display = 'inline-block';
        deleteSelectedButton.style.display = 'none';  // Initially hide delete button
        saveTexts();
    };

    const showStatusMessage = (message) => {
        statusMessage.textContent = message;
        statusMessage.style.display = 'block';
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 2000);
    };

    textForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const textContent = textInput.value.trim().toLowerCase();
        const textType = customTextTypeInput.value.trim().toLowerCase();

        if (texts.some(text => text.content === textContent && text.type === textType)) {
            showStatusMessage('Duplicate entry not allowed.');
            return;
        }

        const newText = {
            id: Date.now(),  // Unique ID for each entry
            content: textContent,
            type: textType,
            status: 'unread'
        };

        texts.push(newText);
        saveTexts();
        updateDatalist();
        textInput.value = '';
        customTextTypeInput.value = '';
        showStatusMessage('Entry added successfully.');
    });

    showListButton.addEventListener('click', displayTexts);

    textList.addEventListener('change', (event) => {
        const checkedBoxes = document.querySelectorAll('#textList input[type="checkbox"]:checked');
        deleteSelectedButton.style.display = checkedBoxes.length > 0 ? 'inline-block' : 'none';
    });

    deleteSelectedButton.addEventListener('click', () => {
    const checkedBoxes = document.querySelectorAll('#textList input[type="checkbox"]:checked');
    
    if (checkedBoxes.length === 0) {
        showStatusMessage('No entries selected for deletion.');
        return;
    }

    // Collect IDs of selected entries and their names
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

    // Remove the selected entries from the texts array
    texts = texts.filter(text => !idsToDelete.includes(text.id));

    saveTexts();
    displayTexts();
    deleteSelectedButton.style.display = 'none';

    // Display the status message with the names of the deleted entries
    showStatusMessage(`Deleted: ${deletedEntries.join(', ')}`);
});

    generatePdfButton.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get unique types from the texts
    const uniqueTypes = [...new Set(texts.map(text => text.type))];

    // Set initial vertical position
    let currentY = 16;

    // Loop through each unique type to create a separate table
    uniqueTypes.forEach((type) => {
        // Filter texts by current type
        const filteredTexts = texts.filter(text => text.type === type);

        // Skip if there are no entries for this type
        if (filteredTexts.length === 0) return;

        // Add type title
        doc.setFontSize(18);
        doc.text(capitalizeWords(type) + " Entries", 14, currentY);
        currentY += 10;

        // Prepare the table data
        const tableData = filteredTexts.map((text, index) => [
            index + 1,
            capitalizeWords(text.content),
            capitalizeWords(text.type)
        ]);

        // Set table headers
        const headers = ['#', 'Entry', 'Type'];

        // Add table for this type
        doc.autoTable({
            startY: currentY,
            head: [headers],
            body: tableData,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 4, 109], // Header color matching the theme color
                textColor: [255, 255, 255]
            },
            bodyStyles: {
                fillColor: [240, 240, 240], // Light grey for table rows
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255] // White for alternate rows
            },
            styles: {
                fontSize: 12,
                cellPadding: 3,
                valign: 'middle'
            }
        });

        // Update currentY to the position after the table
        currentY = doc.lastAutoTable.finalY + 10;
    });

    // Save the PDF
    doc.save("text_management_list.pdf");
});

    updateDatalist();
});
