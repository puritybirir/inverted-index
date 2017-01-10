class Index {
    constructor() {
        this.indexArray = [];
    }

    createIndex(filePath) {
        let file = filePath.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            let json = JSON.parse(reader.result);
            if (json != null) {
                let indexTerms = [];
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

                let index = {};
                index['filePath'] = filePath.value;
                for (let indexTerm of indexTerms) {
                    let objects = [];
                    let i = 0;
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

    getIndex(filePath) {
        if (this.indexArray.length != 0) {
            for (let index of this.indexArray) {
                if (index.filePath == filePath) {
                    display.innerText = index.toSource();
                }
            }
        }
    }

    searchIndex(terms) {
        if (this.indexArray.length != 0) {
            let results = [];
            let tokens = terms.split(/\s*(,|\s)\s*/);
            if (tokens[0].indexOf('.json') > -1) {
                for (let index of this.indexArray) {
                    if (index.filePath == tokens[0]) {
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
                            results.push(index['filePath'] + " : " + index[token.toLowerCase()]);
                        }
                    }
                }
            }
            display.innerText = results;
        }
    }
}

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