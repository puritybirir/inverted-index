window.onload = () => {
    let instance = new Index();

    let filePath = document.getElementById('filePath');
    const createIndexButton = document.getElementById('createIndexButton');
    const terms = document.getElementById('terms');
    const searchButton = document.getElementById('searchButton');
    const display = document.getElementById('display');

    createIndexButton.addEventListener('click', function(e) {
        instance.createIndex(filePath);
    });

    searchButton.addEventListener('click', function(e) {
        instance.searchIndex(terms.value);
    });
}