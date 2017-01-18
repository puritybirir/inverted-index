class Index {
    constructor() {
        this.indexArray = [];
    }
    readFile(file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            var json = JSON.parse(reader.result);
            this.createIndex(json);
        }
    }

    createIndex(json) {
        console.log('CONtent', json);
        if (json != null) {
            var indexTerms = [];
            for (let object of json) {
                for (let key in object) {
                    if (object.hasOwnProperty(key)) {
                        let terms = object[key].toLowerCase().split(/\W+/);
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
            //index['file'] = file.name;
            for (let indexTerm of indexTerms) {
                var objects = [];
                var i = 0;
                for (let object of json) {
                    for (let key in object) {
                        if (object.hasOwnProperty(key)) {
                            let terms = object[key].toLowerCase().split(/\W+/);
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
            // display.innerText = 'Index created';
            // alert('index created');
            for (let [key, value] of Object.entries(index)) {
                termstable.innerHTML = termstable.innerHTML + '<tr><td>' + key + '</td>' + (value.includes(0) ?
                        '<td> <i class="glyphicon glyphicon-ok"></i> </td>' : ' <td></td>') +
                    (value.includes(1) ? '<td><i class="glyphicon glyphicon-remove"></i></td>' : '<td></td>') + '</tr>';
            }
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
        if (this.indexArray.length != 0) {
            var results = [];
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