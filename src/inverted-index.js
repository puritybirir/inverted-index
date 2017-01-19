class Index {
    constructor() {
        this.indexArray = [];
    }
    readFile(file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            var jsonData = JSON.parse(reader.result);
            this.displayIndex(jsonData);
            this.createIndex(jsonData);
            this.jsonData = jsonData;
            //this.terms = terms
        }
    }
    cleanData(data) {
        let terms = (data)
            .toLowerCase()
            .replace(/,(?=\S)/g, ' ')
            .replace(/\btitle\b|\btext\b|,(?=\s)|[:.{}""]/g, '')
            .split(' ');
        return terms;
    }

    createIndex(jsonData) {
        if (jsonData != null) {
            var indexTerms = [];
            for (let object of jsonData) {
                for (let key in object) {
                    if (object.hasOwnProperty(key)) {
                        let terms = this.cleanData(object[key]);
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
                for (let object of jsonData) {
                    for (let key in object) {
                        if (object.hasOwnProperty(key)) {
                            let terms = this.cleanData(object[key]);
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
            return this.indexArray[0];
        }
    }


    displayIndex(jsonData) {
        this.createIndex(jsonData);
        let createdIndex = this.indexArray;
        let toBeDisplayed = createdIndex.shift();
        termstable.innerHTML = ' '
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
        return this.indexArray[0];
    }

    searchIndex(valuesToSearch) {
        this.createIndex(this.jsonData);
        if (this.indexArray.length != 0) {
            var results = {};
            var tokens = valuesToSearch.split(' ');
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
        resulttable.innerHTML = ''
        for (let [key, value] of Object.entries(searchResults)) {
            resulttable.innerHTML = resulttable.innerHTML + '<tr><td>' + key + '</td>' + '<td>' + value + '</td></tr> '
        }

    }

}