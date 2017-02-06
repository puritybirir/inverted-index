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

  /**
   * checkInputData
   *
   * Parses JSON if file type is correct
   *
   * @param{object}
   * @return{bool}
   */
  checkInputData(file) {
    try {
      JSON.parse(file);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * validJson
   *
   * Reads the JSON data using FileReader
   *
   * @param {object} file - Content of the file
   * @param {string} filename - Name of the file
   * @return {string}
   */
  validJson(filename, file) {
    if (!file.length) {
      return 'Empty file';
    }
    try {
      const jsonData = JSON.parse(file);
      if (this.checkTitleAndText(jsonData)) {
        return 'No title or text';
      }
      this.createIndex(filename, jsonData);
      this.jsonData = jsonData;
      return 'File Uploaded';
    } catch (error) {
      return 'Invalid Json file';
    }
  }

  /**
   * cleanData
   *
   * Tokenizes data
   *
   * @param {string}
   * @return {object}
   */
  cleanData(data) {
    let terms = (data)
      .toLowerCase()
      .replace(/[^a-z0-9 ]/gi, '')
      .split(' ');
    return terms;
  }

  /**
   * checkTitleAndText
   *
   * Checks that the array has a title and a text.
   *
   * @param {array}
   * @return {bool}
   */
  checkTitleAndText(myArray) {
    return myArray.some(value => !value.hasOwnProperty('title') || !value.hasOwnProperty('text'))
  }

  /**
   * getUniqueTerms
   *
   * Gets the unique terms.
   *
   * @param {array}
   * @return {object}
   */
  getUniqueTerms(terms) {
    return terms.filter((value, index, arr) => arr.indexOf(value) === index);
  }

  /**
   * getValues
   *
   * Gets the values for each of the terms.
   *
   * @param {object}
   * @param {string}
   * @return {array}
   */
  getValues(jsonData, indexTerm) {
    const objArray = [];
    let i = 0;
    for (const object of jsonData) {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const terms = this.cleanData(object[key]);
          if (terms.indexOf(indexTerm) > -1 && objArray.indexOf(i) < 0) {
            objArray.push(i);
          }
        }
      }
      i += 1;
    }
    return objArray;
  }

  /**
   * createIndex
   *
   * Ensures that a correct Index is created
   *
   * @param {object}
   * @param {string}
   */
  createIndex(filename, jsonData) {
    if (jsonData != null) {
      let indexTerms = [];
      const index = {};
      jsonData.forEach((obj, objIndex) => {
        Object.keys(obj).forEach((key) => {
          const terms = this.cleanData(obj[key]);
          indexTerms = indexTerms.concat(this.getUniqueTerms(terms));
        });
      });
      indexTerms.forEach((indexTerm) => {
        let objArray = this.getValues(jsonData, indexTerm);
        index[indexTerm] = objArray;
      });
      this.indexObject[filename] = index;
    }
  }

  /**
   * getIndex
   *
   * Gets the created Index from createIndex
   *
   * @param {object} file - Content of the file
   * @return {object}
   */
  getIndex(file) {
    return this.indexObject;
  }

  /**
   * getResult
   *
   * Searches the created index
   *
   * @param {string}
   * @param {string}
   * @preturn {object}
   */
  getResult(items, filename) {
    const fileResult = {};
    for (const item of items) {
      if (item !== '') {
        if (this.indexObject[filename][item.toLowerCase()] !== undefined) {
          fileResult[item] = this.indexObject[filename][item.toLowerCase()];
        } else {
          fileResult[item] = [];
        }
      }
    }
    return fileResult;
  }

  /**
   * searchIndex
   *
   * Searches the created Index
   *
   * @param {string}
   * @param {array}
   *
   * @return{object}
   */
  searchIndex(filename, ...valuesToSearch) {
    if (Object.keys(this.indexObject).length !== 0) {
      const results = {};
      let items = valuesToSearch.toString();
      items = this.cleanData(items);
      if (Object.keys(this.indexObject).indexOf(filename) != -1) {
        results[filename] = this.getResult(items, filename);
      } else {
        if (filename === 'All') {
          for (const file of Object.keys(this.indexObject)) {
            results[file] = this.getResult(items, file);
          }
        }
      }
      return results;
    }
  }
}