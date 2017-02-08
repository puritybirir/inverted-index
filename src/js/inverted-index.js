/**
 * Index Class
 *
 * @class
 */
class Index {

  /**
   * class constructor
   *
   * @constructor
   */
  constructor() {
    this.indexObject = {};
    this.fileArray = [];
  }

  /**
   * validateJson
   *
   * Validates the file input
   *
   * @param {string} filename - Name of the file
   * @return {string}
   */
  validateJson(file) {
    if (!file.length) {
      return 'Empty file';
    }
    try {
      const jsonData = JSON.parse(file);
      if (this.checkTitleAndText(jsonData)) {
        return 'No title or text';
      }
      this.jsonData = jsonData;
      return 'Correct file';
    } catch (error) {
      return 'Invalid JSON file';
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
    const terms = (data)
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
    return myArray.some(value => !value.hasOwnProperty('title') || !value.hasOwnProperty('text'));
  }

  /**
   * getUniqueTerms
   *
   * Gets the unique terms by ensuring none of the terms are repeated for example "alice" does not
   * appear twice in the created array.
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
   * Gets the values for each of the terms that show in which object the term is found.
   *
   * @param {object}
   * @param {string}
   * @return {array}
   */
  getValues(jsonData, indexTerm) {
    const objArray = [];
    let i = 0;
    jsonData.forEach((object) => {
      Object.keys(object).forEach((key) => {
        const terms = this.cleanData(object[key]);
        if (terms.indexOf(indexTerm) > -1 && objArray.indexOf(i) < 0) {
          objArray.push(i);
        }
      });
      i += 1;
    });
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
  createIndex(filename, content) {
    const message = this.validateJson(content);
    if (message === 'Correct file') {
      const jsonData = JSON.parse(content);
      if (jsonData != null) {
        let indexTerms = [];
        const index = {};
        jsonData.forEach((obj) => {
          Object.keys(obj).forEach((key) => {
            const terms = this.cleanData(obj[key]);
            indexTerms = indexTerms.concat(this.getUniqueTerms(terms));
          });
        });
        indexTerms.forEach((indexTerm) => {
          const objArray = this.getValues(jsonData, indexTerm);
          index[indexTerm] = objArray;
        });
        this.indexObject[filename] = index;
        return message;
      }
    } else {
      return message;
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
  getIndex(filename) {
    return this.indexObject[filename];
  }

  /**
   * getResult
   *
   * Searches the created index
   *
   * @param {string}
   * @param {string}
   * @return {object}
   */
  getResult(items, filename) {
    const fileResult = {};
    items.forEach((item) => {
      if (item !== '') {
        fileResult[item] = this.indexObject[filename][item.toLowerCase()];
      } else {
        fileResult[item] = [];
      }
    });
    return fileResult;
  }

  /**
   * searchIndex
   *
   * Implements a full text search on the created Index using the getResult method.
   *
   * @param {string}
   * @param {array}
   *
   * @return{object}
   */
  searchIndex(filename, ...valuesToSearch) {
    const results = {};
    let items = valuesToSearch.toString();
    items = this.cleanData(items);
    if (filename === 'All') {
      Object.keys(this.indexObject).forEach((file) => {
        results[file] = this.getResult(items, file);
      });
    } else {
      results[filename] = this.getResult(items, filename);
    }
    return results;
  }
}
