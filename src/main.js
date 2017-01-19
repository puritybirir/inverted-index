window.onload = () => {
  var instance = new Index();

  var filePath = document.getElementById('filePath');
  var createIndexButton = document.getElementById('createIndexButton');
  var terms = document.getElementById('terms');
  var searchButton = document.getElementById('searchButton');
  var display = document.getElementById('display');

  createIndexButton.addEventListener('click', function (e) {
    var indexArray = instance.readFile(filePath.files[0]);
  });


  searchButton.addEventListener('click', function (e) {
    instance.displaySearch(terms.value);
  });
}