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

    let texts = JSON.parse(localStorage.getItem('texts')) || [];

    const saveTexts = () => {
        localStorage.setItem('texts', JSON.stringify(texts));
    };

    const updateDatalist = () => {
        const uniqueTypes = [...new Set(texts.map(text => text.type))];
        textTypeList.innerHTML = '';
        uniqueTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            textTypeList.appendChild(option);
        });
    };

    const displayTexts = () => {
        textList.innerHTML = '';

        const filteredTexts = texts.filter(text => {
            return (!filterType.value || text.type === filterType.value) && text.status === 'unread';
        });

        const limitedTexts = limitEntries.value === '0' ? filteredTexts : filteredTexts.slice(0, parseInt(limitEntries.value));

        limitedTexts.sort(() => Math.random() - 0.5); // Randomize the order

        limitedTexts.forEach((text, index) => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.index = index;

            li.textContent = `${text.content} [${text.type}]`;
            li.prepend(checkbox);
            textList.appendChild(li);

            text.status = 'read';
        });

        saveTexts();
    };

    addButton.addEventListener('click', () => {
        const newText = {
            content: textInput.value,
            type: customTextTypeInput.value,
            status: 'unread'
        };
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
