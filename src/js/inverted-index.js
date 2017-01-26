/**
 * InvertedIndex Class
 * @class
 */
class Index {
  /**
   * class constructor
   * @constructor
   */

  constructor() {
      this.indexObject = {};
      this.fileArray = [];
    }
    //check invalid json
  checkInputData(file) {
    try {
      JSON.parse(file);
      return true;
    } catch (error) {
      return false;
    }

  }

  /**
   * Reads the JSON data using FileReader
   * @param {object} file - Content of the file
   */
  readFile(file) {
    const reader = new FileReader();
    reader.readAsText(file);
    const filename = file.name;
    reader.onload = () => {
      if (!reader.result.length) {
        return alert('Empty file')
      }
      try {
        let jsonData = JSON.parse(reader.result);
        this.createIndex(jsonData, filename);

        if (this.checkTitleAndText(jsonData)) {
          return alert('No title or text');
        }

        this.jsonData = jsonData;
      } catch (error) {
        console.debug(error)
      }
    };
  }
  cleanData(data) {
    let terms = (data)
      .toLowerCase()
      .replace(/,(?=\S)/g, ' ')
      .replace(/\btitle\b|\btext\b|,(?=\s)|[:.{}""]/g, '')
      .split(' ');
    return terms;
  }

  checkTitleAndText(array) {
    return array.some(value => !value.hasOwnProperty('title') || !value.hasOwnProperty('text'))
  }

  createIndex(jsonData, filename) {
    if (jsonData != null) {
      const indexTerms = [];
      for (let object of jsonData) {
        for (let key in object) {
          if (object.hasOwnProperty(key)) {
            let terms = this.cleanData(object[key]);
            for (let term of terms) {
              if (indexTerms.indexOf(term) < 0) {
                indexTerms.push(term);
              }
            }
          }
        }
      }


      const index = {};
      for (let indexTerm of indexTerms) {
        const objects = [];
        let i = 0;
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
      this.indexObject[filename] = index;
    }
  }

  getIndex(file) {
    if (this.indexObject.length != 0) {
      for (let index of this.indexObject) {
        if (index.file == file) {
          display.innerText = index.toSource();
        }
      }
    }
    return this.indexObject[0];
  }

  searchIndex(filename, valuesToSearch) {
    if (Object.keys(this.indexObject).length != 0) {
      const results = {};
      let items = valuesToSearch.split(/\W/);
      if (Object.keys(this.indexObject).indexOf(filename) != -1) {
        const fileResult = {}
        for (let item of items) {
          if (item != '') {
            if (this.indexObject[filename][item.toLowerCase()] != undefined) {
              fileResult[item] = this.indexObject[filename][item.toLowerCase()];
            } else {
              fileResult[item] = [];
            }
          }
        }
        results[filename] = fileResult;
      } else {
        if (filename === 'All') {
          for (const file of Object.keys(this.indexObject)) {
            const fileResult = {}
            for (let item of items) {
              if (item != '') {
                if (this.indexObject[file][item.toLowerCase()] != undefined) {
                  fileResult[item] = this.indexObject[file][item.toLowerCase()];
                } else {
                  fileResult[item] = [];
                }
              }
            }
            results[file] = fileResult;
          }
        }
      }
      return results;
    }
  }

}