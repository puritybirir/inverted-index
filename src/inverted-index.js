class Index {
    constructor() {
        this.indexArray = [];
    }

    createIndex(file) {
        var reader = new FileReader();
        reader.onloadend = () => {
            var json = JSON.parse(reader.result);
            if (json != null) {
                var indexTerms = [];
                for (let object of json) {
                    for (let key in object) {
                        if (object.hasOwnProperty(key)) {
                            let string = object[key].toLowerCase();
                            let terms = string.split(/\W+/);
                            for (let term of terms) {
                                if (indexTerms.indexOf(term) < 0) {
                                    indexTerms.push(term);
                                }
                            }
                        }
                    }
                }

                var index = {};
                index['file'] = file.name;
                for (let indexTerm of indexTerms) {
                    var objects = [];
                    var i = 0;
                    for (let object of json) {
                        for (let key in object) {
                            if (object.hasOwnProperty(key)) {
                                let string = object[key].toLowerCase();
                                let terms = string.split(/\W+/);
                                if (terms.indexOf(indexTerm) > -1 & objects.indexOf(i) < 0) {
                                    objects.push(i);
                                }
                            }
                        }
                        i++;
                    }
                    index[indexTerm] = objects;
                }
                this.indexArray.push(index);
                display.innerText = 'Index created';
            }
        }
        reader.readAsText(file);
    }

    getIndex(file) {
        if (this.indexArray.length != 0) {
            for (let index of this.indexArray) {
                if (index.file == file) {
                    display.innerText = index.toSource();
                }
            }
        }
    }

    searchIndex(terms) {
        if (this.indexArray.length != 0) {
            var results = [];
            var tokens = terms.split(/\s*(,|\s)\s*/);
            if (tokens[0].indexOf('.json') > -1) {
                for (let index of this.indexArray) {
                    if (index.file == tokens[0]) {
                        var indexToUse = index;
                        break;
                    }
                }
                tokens.shift();
                for (let token of tokens) {
                    results.push(indexToUse[token.toLowerCase()]);
                }
            } else {
                for (let token of tokens) {
                    for (let index of this.indexArray) {
                        if (index[token.toLowerCase()] != undefined) {
                            results.push(index['file'] + " : " + index[token.toLowerCase()]);
                        }
                    }
                }
            }
            display.innerText = results;
        }
    }
}

window.onload = () => {
    var instance = new Index();

    var filePath = document.getElementById('filePath');
    var createIndexButton = document.getElementById('createIndexButton');
    var terms = document.getElementById('terms');
    var searchButton = document.getElementById('searchButton');
    var display = document.getElementById('display');

    createIndexButton.addEventListener('click', function(e) {
        instance.createIndex(filePath.files[0]);
    });

    searchButton.addEventListener('click', function(e) {
        instance.searchIndex(terms.value);
    });
}