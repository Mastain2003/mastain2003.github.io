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
            textTable.style.display = 'table';
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

        if (texts.some(text=> text.content.toLowerCase()=== textContent && text.type.toLowerCase()=== textType)) {
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
        showStatusMessage(` ${capitalizeWords(textContent)} added successfully.`);
       // showStatusMessage(`Added: ${capitalizeWords(textContent)}`);
    });

    showListButton.addEventListener('click', displayTexts);

    textList.addEventListener('change', (event) => {
        const checkedBoxes = document.querySelectorAll('#textList input[type="checkbox"]:checked');
        deleteSelectedButton.style.display = checkedBoxes.length > 0 ? 'inline-block' : 'none';
    });

    deleteSelectedButton.addEventListener('click', () => {
        const checkedBoxes = document.querySelectorAll('#textList input[type="checkbox"]:checked');
        const idsToDelete = Array.from(checkedBoxes).map(checkbox => Number(checkbox.dataset.id));
        const deletedEntries = [];

    texts = texts.filter(text => {
        if (idsToDelete.includes(text.id)) {
            deletedEntries.push(capitalizeWords(text.content));
            return false;
        }
        return true;
    });

      //  texts = texts.filter(text => !idsToDelete.includes(text.id));
        saveTexts();
        displayTexts();
        deleteSelectedButton.style.display = 'none';
        showStatusMessage(`Deleted: ${deletedEntries.join(', ')}`);
        //showStatusMessage('Selected entries deleted.');
    });

    generatePdfButton.addEventListener('click', () => {
        //alert('1');
       // generatePDF();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape'); // Switch to landscape mode to better fit side-by-side tables
    const pageWidth = doc.internal.pageSize.getWidth();
    let currentX = 14;
    let currentY = 20;
    const margin = 10; // Margin between tables

    const uniqueTypes = [...new Set(texts.map(text => text.type))];
       // alert('2');

    uniqueTypes.forEach((type, index) => {
        //alert('5');
        const filteredTexts = texts.filter(text => text.type === type);
        if (filteredTexts.length === 0) return;

        const tableData = filteredTexts.map((text, index) => [
            index + 1,
            capitalizeWords(text.content)
        ]);
       // alert('6');

        const headers = ['#', 'Entry'];

        // Measure the width of the table to see if it fits
        const tableWidth = doc.getStringUnitWidth(headers.join(' ') + ' ' + tableData.map(row => row.join(' ')).join(' ')) * doc.internal.getFontSize();
         //alert('7');
        if (currentX + tableWidth + margin > pageWidth) {
            currentX = 14; // Reset X position to the left margin
            currentY += 70; // Move down to the next row
        }
       // alert('7.1');
        doc.setFontSize(14);
       // alert('7.2');
     alert(currentX);
      // alert(capitalizeWords(type));
        //alert(currentY-5);
        
        doc.text(capitalizeWords(type) + " Entries", currentX, currentY - 5);
        //alert('7.3');
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
        alert(currentX);
         alert('8');
        const lastY = doc.lastAutoTable.finalY;
        const lastX = doc.lastAutoTable.finalX;
        currentX = lastX ;//+ margin; // Move to the right of the current table
         alert(currentX);
        if (currentX + tableWidth + margin > pageWidth) {
            currentX = 14; // Reset X position to the left margin
            currentY = lastY + 20; // Move down to the next row
        }
        alert(currentX);
        alert('9');
    });
    alert('3');

    doc.save("text_management_list.pdf");
    alert('4');
});
    /*function generatePDF() {
    const existingEntries = JSON.parse(localStorage.getItem('texts')) || [];
    if (existingEntries.length === 0) {
        showStatusMessage("No entries to display.");
        return;
    }

    const doc = new jsPDF();

    // Group entries by type
    const groupedEntries = existingEntries.reduce((acc, entry) => {
        const type = entry.type.toLowerCase();
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(entry);
        return acc;
    }, {});

    let pageOffset = 10;
    const pageHeight = doc.internal.pageSize.height;

    Object.keys(groupedEntries).forEach((type, index) => {
        if (index > 0) {
            doc.addPage();
            pageOffset = 10; // Reset offset for new page
        }

        doc.setFontSize(16);
        doc.text(`Type: ${type.charAt(0).toUpperCase() + type.slice(1)}`, 10, pageOffset);
        pageOffset += 10;

        const tableData = groupedEntries[type].map((entry, idx) => [
            (idx + 1).toString(),
            entry.content.charAt(0).toUpperCase() + entry.content.slice(1),
        ]);

        doc.autoTable({
            head: [['No.', 'Location']],
            body: tableData,
            startY: pageOffset,
            margin: { top: 10 },
            styles: { overflow: 'linebreak', cellWidth: 'wrap' }
        });

        pageOffset += doc.previousAutoTable.finalY + 10;
    });

    doc.save('entries.pdf');
}*/
    updateDatalist();
});
