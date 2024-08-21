document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const addButton = document.getElementById('addButton');
    const clearButton = document.getElementById('clearButton');
    const textList = document.getElementById('textList');

    // Load stored texts
    function loadTexts() {
        const texts = JSON.parse(localStorage.getItem('texts')) || [];
        textList.innerHTML = texts.map(text => `<li>${text}</li>`).join('');
    }

    // Save a new text
    function saveText(text) {
        const texts = JSON.parse(localStorage.getItem('texts')) || [];
        texts.push(text);
        localStorage.setItem('texts', JSON.stringify(texts));
        loadTexts();
    }

    // Clear all texts
    function clearTexts() {
        localStorage.removeItem('texts');
        loadTexts();
    }

    // Event listeners
    addButton.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (text) {
            saveText(text);
            textInput.value = '';
        }
    });

    clearButton.addEventListener('click', () => {
        clearTexts();
    });

    // Initial load
    loadTexts();
});
