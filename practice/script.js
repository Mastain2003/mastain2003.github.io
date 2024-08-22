document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const customTextTypeInput = document.getElementById('customTextType');
    const textList = document.getElementById('textList');
    const textTypeList = document.getElementById('textTypeList');
    const textForm = document.getElementById('textForm');
    const filterType = document.getElementById('filterType');
    const limitEntries = document.getElementById('limitEntries');
    const markAllUnreadButton = document.getElementById('markAllUnreadButton');
    const deleteSelectedButton = document.getElementById('deleteSelectedButton');
    const showListButton = document.getElementById('showListButton');
    const statusMessage = document.getElementById('statusMessage');

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
            return (!filterType.value || text.type === filterType.value);
        });

        filteredTexts = limitEntries.value === '0' ? filteredTexts : filteredTexts.slice(0, parseInt(limitEntries.value));

        if (filteredTexts.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 4;
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

            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.index = index;
            checkbox.addEventListener('change', handleCheckboxChange);
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);

            textList.appendChild(row);

            // Mark as read
            text.status = 'read';
        });

        saveTexts();
    };

    const handleCheckboxChange = () => {
        const anyChecked = Array.from(textList.querySelectorAll('input[type="checkbox"]')).some(checkbox => checkbox.checked);
        deleteSelectedButton.style.display = anyChecked ? 'inline-block' : 'none';
    };

    const showStatusMessage = (message) => {
        statusMessage.textContent = message;
        statusMessage.style.display = 'block';
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 3000);
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
            showStatusMessage('Duplicate entry. This text and type combination already exists.');
            return;
        }

        texts.push(newText);
        saveTexts();
        textInput.value = '';
        customTextTypeInput.value = '';
        updateDatalist();
        showStatusMessage('Entry added successfully.');
    });

    markAllUnreadButton.addEventListener('click', () => {
        texts.forEach(text => text.status = 'unread');
        saveTexts();
        showStatusMessage('All entries marked as unread.');
    });

    deleteSelectedButton.addEventListener('click', () => {
        const checkboxes = textList.querySelectorAll('input[type="checkbox"]');
        texts = texts.filter((_, index) => !checkboxes[index].checked);
        saveTexts();
        displayTexts();
        deleteSelectedButton.style.display = 'none';
        showStatusMessage('Selected entries deleted.');
    });

    showListButton.addEventListener('click', () => {
        displayTexts();
    });

    filterType.addEventListener('change', displayTexts);
    limitEntries.addEventListener('change', displayTexts);

    // Do not display texts initially
    updateDatalist();
});
