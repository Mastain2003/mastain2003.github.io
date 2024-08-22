document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const customTextTypeInput = document.getElementById('customTextType');
    const addButton = document.getElementById('addButton');
    const displayButton = document.getElementById('displayButton');
    const randomizeButton = document.getElementById('randomizeButton');
    const markAllUnreadButton = document.getElementById('markAllUnreadButton');
    const deleteSelectedButton = document.getElementById('deleteSelectedButton');
    const filterType = document.getElementById('filterType');
    const limitEntries = document.getElementById('limitEntries');
    const textList = document.getElementById('textList');
    const textTypeList = document.getElementById('textTypeList');
    const textForm = document.getElementById('textForm');

    let texts = JSON.parse(localStorage.getItem('texts')) || [];

    const saveTexts = () => {
        localStorage.setItem('texts', JSON.stringify(texts));
    };

    const updateDatalist = () => {
        const uniqueTypes = [...new Set(texts.map(text => text.type))];
        textTypeList.innerHTML = '';
        uniqueTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = capitalizeWords(type);
            textTypeList.appendChild(option);
        });
    };

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const displayTexts = () => {
        textList.innerHTML = '';

        if (texts.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 4;
            cell.textContent = 'Nothing to show';
            row.appendChild(cell);
            textList.appendChild(row);
            return;
        }

        const filteredTexts = texts.filter(text => {
            return !filterType.value || text.type === filterType.value.toLowerCase();
        });

        const limitedTexts = limitEntries.value === '0' ? filteredTexts : filteredTexts.slice(0, parseInt(limitEntries.value));

        limitedTexts.sort(() => Math.random() - 0.5); // Randomize the order

        limitedTexts.forEach((text, index) => {
            const row = document.createElement('tr');

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
    });

    displayButton.addEventListener('click', displayTexts);

    randomizeButton.addEventListener('click', () => {
        texts.sort(() => Math.random() - 0.5); // Randomize the order of the entire list
        saveTexts();
        displayTexts();
    });

    markAllUnreadButton.addEventListener('click', () => {
        texts.forEach(text => text.status = 'unread');
        saveTexts();
    });

    deleteSelectedButton.addEventListener('click', () => {
        const checkboxes = textList.querySelectorAll('input[type="checkbox"]');
        texts = texts.filter((_, index) => !checkboxes[index].checked);
        saveTexts();
        displayTexts();
    });

    // Initial display of texts when the page loads
    updateDatalist();
    displayTexts();
});
