app.controller('MyIndexController', ['$scope', function ($scope) {
  $scope.searchTable = false;
  $scope.files = [];
  $scope.searchFiles = [];
  $scope.instance = new Index();
  $scope.showIndex = false;
  $scope.showSearch = false;
  $scope.indexData = {};
  $scope.objKeys = Object.keys;

  $scope.readFile = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    const filename = file.name;
    reader.onload = (event) => {
      let content = event.target.result;
      $scope.alert = $scope.instance.createIndex(filename, content);
      $scope.$apply();
    }
  }

  $scope.getFile = () => {
    const file = document.getElementById('filePath').files[0];
    $scope.filename = file.name;
    $scope.files.push(file.name);
    $scope.searchFiles.push(file.name);
    $scope.readFile(file);
  }

  $scope.createIndex = () => {
    $scope.showIndex = true;
    $scope.showSearch = false;
    $scope.indexData = $scope.instance.indexObject;
  }

  $scope.search = () => {
    $scope.showIndex = false;
    $scope.showSearch = true;
    const selectSearch = $scope.toSearch;
    const terms = document.getElementById("terms").value;
    const opt = document.getElementById("select");
    const filename = opt.options[opt.selectedIndex].text;
    $scope.results = $scope.instance.searchIndex(filename, terms);
  }
}]);