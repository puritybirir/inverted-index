class Index {
    constructor() {
        this.indexArray = [];
    }
    readFile(file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            var json = JSON.parse(reader.result);
            this.displayIndex(json);
            this.json = json;
        }
    }

    createIndex(json) {
        if (json != null) {
            var indexTerms = [];
            for (let object of json) {
                for (let key in object) {
                    if (object.hasOwnProperty(key)) {
                        let terms = object[key].toLowerCase().split(/\W+/g);
                        for (let term of terms) {
                            //pushes a term into indexTerms array if the terms is not present
                            if (indexTerms.indexOf(term) < 0) {
                                indexTerms.push(term);
                            }
                        }
                    }
                }
            }

            var index = {};
            for (let indexTerm of indexTerms) {
                var objects = [];
                var i = 0;
                for (let object of json) {
                    for (let key in object) {
                        if (object.hasOwnProperty(key)) {
                            let terms = object[key].toLowerCase().split(/\W+/g);
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
        }
    }

    displayIndex(json) {
        this.createIndex(json);
        let createdIndex = this.indexArray;
        let toBeDisplayed = createdIndex.shift();
        console.log(toBeDisplayed);
        for (let [key, value] of Object.entries(toBeDisplayed)) {
            termstable.innerHTML = termstable.innerHTML + '<tr><td>' + key + '</td>' + (value.includes(0) ?
                    '<td> <i class="glyphicon glyphicon-remove"></i> </td>' : ' <td></td>') +
                (value.includes(1) ? '<td><i class="glyphicon glyphicon-remove"></i></td>' : '<td></td>') + '</tr>';
        }

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

    searchIndex(valuesToSearch) {
        this.createIndex(this.json);
        if (this.indexArray.length != 0) {
            var results = {};
            var tokens = valuesToSearch.split(/\s*(,|\s)\s*/);
            if (tokens[0].indexOf('.json') > -1) {
                for (let index of this.indexArray) {
                    if (index.file == tokens[0]) {
                        var indexToUse = index;
                        break;

                    }
                }
                tokens.shift();
                for (let token of tokens) {
                    results[token] = indexToUse[token.toLowerCase()];

                }
            } else {
                for (let token of tokens) {
                    for (let index of this.indexArray) {
                        if (index[token.toLowerCase()] != undefined) {
                            results[token] = index[token.toLowerCase()];
                        }
                    }
                }
            }

            return results;
        }
    }

    displaySearch(valuesToSearch) {
        let searchResults = this.searchIndex(valuesToSearch);
        for (let [key, value] of Object.entries(searchResults)) {
            termstable.innerHTML = '<tr> <th> <h2>Words</h2> </th> <th> <h2>Document one</h2> </th> <th> <h2>Document Two</h2> </th> </tr> <tr><td>' + key + '</td>' + (value.includes(0) ?
                    '<td> <i class="glyphicon glyphicon-remove"></i> </td>' : ' <td></td>') +
                (value.includes(1) ? '<td><i class="glyphicon glyphicon-remove"></i></td>' : '<td></td>') + '</tr>';
        }

    }


}