document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('textInput');
    const textType = document.getElementById('textType');
    const addButton = document.getElementById('addButton');
    const filterType = document.getElementById('filterType');
    const limitEntries = document.getElementById('limitEntries');
    const displayButton = document.getElementById('displayButton');
    const randomizeButton = document.getElementById('randomizeButton');
    const markAllUnreadButton = document.getElementById('markAllUnreadButton');
    const textList = document.getElementById('textList');

    // Load and display filtered items on page load
    displayButton.addEventListener('click', loadAndDisplayFilteredItems);

    // Add text with type to the list and local storage
    addButton.addEventListener('click', function () {
        const text = textInput.value.trim();
        const type = textType.value;
        if (text) {
            const listItem = {
                text: `${type}: ${text}`,
                type: type,
                read: false // Initially unread
            };
            saveItem(listItem);
            textInput.value = '';
            loadAndDisplayFilteredItems(); // Refresh list after adding
        }
    });

    // Randomize the list
    randomizeButton.addEventListener('click', function () {
        const items = Array.from(textList.children);
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            textList.appendChild(items[j]);
        }
        updateNumbering();
    });

    // Mark all entries as unread
    markAllUnreadButton.addEventListener('click', function () {
        markAllAsUnread();
        loadAndDisplayFilteredItems(); // Refresh list after marking all unread
    });

    // Add item to the list (UI) and mark it as read
    function addItemToList(item, index) {
        item.read = true; // Mark as read when displayed

        const li = document.createElement('li');
        li.setAttribute('data-text', item.text);
        li.innerHTML = `
            ${index + 1}. ${item.text} (Read)
        `;
        textList.appendChild(li);

        updateItem(item); // Update the item in local storage
    }

    // Save item to local storage
    function saveItem(item) {
        const items = getItemsFromStorage();
        items.push(item);
        localStorage.setItem('textItems', JSON.stringify(items));
    }

    // Update item in local storage
    function updateItem(updatedItem) {
        let items = getItemsFromStorage();
        items = items.map(item => item.text === updatedItem.text ? updatedItem : item);
        localStorage.setItem('textItems', JSON.stringify(items));
    }

    // Load items from local storage, filter them, and display
    function loadAndDisplayFilteredItems() {
        const items = getItemsFromStorage();
        const filteredItems = filterItems(items);
        const limitedItems = limitItems(filteredItems);

        textList.innerHTML = ''; // Clear the current list

        limitedItems.forEach(addItemToList);
        randomizeButton.click(); // Randomize after displaying
    }

    // Filter items based on type and read status
    function filterItems(items) {
        const selectedType = filterType.value;
        return items.filter(item => 
            (selectedType === 'All' || item.type === selectedType) && !item.read
        );
    }

    // Limit the number of items displayed
    function limitItems(items) {
        const limit = parseInt(limitEntries.value);
        return limit === 0 ? items : items.slice(0, limit);
    }

    // Get items from local storage
    function getItemsFromStorage() {
        return JSON.parse(localStorage.getItem('textItems')) || [];
    }

    // Update the numbering of list items after randomization
    function updateNumbering() {
        const items = textList.querySelectorAll('li');
        items.forEach((li, index) => {
            li.innerHTML = `${index + 1}. ${li.getAttribute('data-text')} (Read)`;
        });
    }

    // Mark all items as unread in local storage
    function markAllAsUnread() {
        let items = getItemsFromStorage();
        items = items.map(item => {
            item.read = false;
            return item;
        });
        localStorage.setItem('textItems', JSON.stringify(items));
    }
});
