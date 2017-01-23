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
    this.indexArray = [];
  }

  /**
   * Reads the JSON data using FileReader
   * @param {object} file - Content of the file
   */
  readFile(file) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let jsonData = JSON.parse(reader.result);
      this.createIndex(jsonData);
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

  createIndex(jsonData) {
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
      this.indexArray.push(index);
      return this.indexArray[0];
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
      const results = {};
      let items = valuesToSearch.split(/\W/);

      for (let item of items) {
        if (item != '') {
          for (let index of this.indexArray) {
            if (index[item.toLowerCase()] != undefined) {
              results[item] = index[item.toLowerCase()];
            }
          }
        }
      }
      return results;
    }
  }

}