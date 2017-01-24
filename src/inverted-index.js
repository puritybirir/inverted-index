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
      let jsonData = JSON.parse(reader.result);
      this.createIndex(jsonData, filename);
      this.jsonData = jsonData;
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
        for (let item of items) {
          if (item != '') {
            if (this.indexObject[filename][item.toLowerCase()] != undefined) {
              results[item] = this.indexObject[filename][item.toLowerCase()];
            }
          }
        }
      } else if (filename == 'All') {
        for (let item of items) {
          if (item != '') {
            for (const index in this.indexObject) {

              const term = item.toLowerCase();
              if (this.indexObject[index][term] != undefined) {
                results[item] = this.indexObject[filename][item.toLowerCase()];
              }
            }
          }
        }
      }
      return results;
    }
  }

}