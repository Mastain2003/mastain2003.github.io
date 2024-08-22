document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const customTextTypeInput = document.getElementById('customTextType');
    const textList = document.getElementById('textList');
    const textTypeList = document.getElementById('textTypeList');
    const textForm = document.getElementById('textForm');
    const filterType = document.getElementById('filterType');
    const filterStatus = document.getElementById('filterStatus');
    const limitEntries = document.getElementById('limitEntries');
    const markAllUnreadButton = document.getElementById('markAllUnreadButton');
    const deleteSelectedButton = document.getElementById('deleteSelectedButton');

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

    const displayTexts = () => {
        textList.innerHTML = '';

        let filteredTexts = texts.filter(text => {
            return (!filterType.value || text.type === filterType.value) &&
                   (!filterStatus.value || text.status === filterStatus.value);
        });

        filteredTexts = limitEntries.value === '0' ? filteredTexts : filteredTexts.slice(0, parseInt(limitEntries.value));

        if (filteredTexts.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 5;
            cell.textContent = 'Nothing to show';
            row.appendChild(cell);
            textList.appendChild(row);
            return;
        }

        filteredTexts.forEach((text, index) => {
            const row = document.createElement('tr');
            row.className = text.status;

            const numberCell = document.createElement('td');
            numberCell.textContent = index + 1;
            row.appendChild(numberCell);

            const textCell = document.createElement('td');
            textCell.textContent = capitalizeWords(text.content);
            row.appendChild(textCell);

            const typeCell = document.createElement('td');
            typeCell.textContent = capitalizeWords(text.type);
            row.appendChild(typeCell);

            const statusCell = document.createElement('td');
            statusCell.textContent = capitalizeWords(text.status);
            row.appendChild(statusCell);

            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.index = index;
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);

            textList.appendChild(row);

            // Mark as read
            text.status = 'read';
        });

        saveTexts();
    };

    textForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newText = {
            content: textInput.value.trim().toLowerCase(),
            type: customTextTypeInput.value.trim().toLowerCase(),
            status: 'unread'
        };

        const isDuplicate = texts.some(text => text.content === newText.content && text.type === newText.type);
        if (isDuplicate) {
            alert('Duplicate entry. This text and type combination already exists.');
            return;
        }

        texts.push(newText);
        saveTexts();
        textInput.value = '';
        customTextTypeInput.value = '';
        updateDatalist();
        displayTexts();
    });

    markAllUnreadButton.addEventListener('click', () => {
        texts.forEach(text => text.status = 'unread');
        saveTexts();
        displayTexts();
    });

    deleteSelectedButton.addEventListener('click', () => {
        const checkboxes = textList.querySelectorAll('input[type="checkbox"]');
        texts = texts.filter((_, index) => !checkboxes[index].checked);
        saveTexts();
        displayTexts();
    });

    filterType.addEventListener('change', displayTexts);
    filterStatus.addEventListener('change', displayTexts);
    limitEntries.addEventListener('change', displayTexts);

    // Initial display of texts when the page loads
    updateDatalist();
    displayTexts();
});
