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
   * @param{object}
   *
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
   * readFile
   *
   * Reads the JSON data using FileReader
   *
   * @param {object} file - Content of the file
   */
  validJson(file, filename) {
    if (!file.length) {
      return 'Empty file';
    }
    try {
      const jsonData = JSON.parse(file);

      if (this.checkTitleAndText(jsonData)) {
        return 'No title or text';
      }

      this.createIndex(jsonData, filename);
      this.jsonData = jsonData;
      return 'File Uploaded';
    } catch (error) {
      return 'Invalid Json file';
    }
  }

  /**
   * cleanData
   *
   * Reads the JSON data using FileReader
   *
   * @param {array}
   */
  cleanData(data) {
    let terms = (data)
      .toLowerCase()
      .replace(/,(?=\S)/g, ' ')
      .replace(/\btitle\b|\btext\b|,(?=\s)|[:.{}""]/g, '')
      .split(' ');
    return terms;
  }

  /**
   *checkTitleAndText
   *
   * Checks that the array has a title and a text.
   *
   * @param {array}
   */
  checkTitleAndText(array) {
    return array.some(value => !value.hasOwnProperty('title') || !value.hasOwnProperty('text'))
  }

  getUniqueTerms(terms) {
    return terms.filter((value, index, arr) => arr.indexOf(value) === index);
  }

  getTerms() {
    //
  }

  createIndexTerms(jsonData) {
    let indexTerms;
    jsonData.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        const terms = this.cleanData(obj[key]);
        indexTerms = indexTerms.concat(this.getUniqueTerms(terms));
      });
    });
    return indexTerms;
  }

  /**
   * createIndex
   *
   * Ensures that a correct Index is created
   *
   * @param {array}
   * @param {object}
   */
  createIndex(jsonData, filename) {
    if (jsonData != null) {
      let indexTerms = [];
      const index = {};

      jsonData.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
          const terms = this.cleanData(obj[key]);
          indexTerms = indexTerms.concat(this.getUniqueTerms(terms));
        });
      });

      // indexTerms.forEach((term) => {
      //   const objArray = [];
      //   let i = 0;

      // })s

      for (const indexTerm of indexTerms) {
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
        index[indexTerm] = objArray;
      }
      this.indexObject[filename] = index;
    }
  }

  /**
   * getIndex
   *
   * gets the created Index from createIndex
   *
   * @param {object} file - Content of the file
   */
  getIndex(file) {
    return this.indexObject;
  }

  /**
   * searchIndex
   *
   * searches the created Index
   *
   * @param {object}
   * @param {array}
   *
   * @return{object}
   */
  searchIndex(filename, ...valuesToSearch) {
    if (Object.keys(this.indexObject).length !== 0) {
      const results = {};
      let items = valuesToSearch.toString();
      items = items.replace(/[^a-z0-9 ]/gi, '').split(' ');
      if (Object.keys(this.indexObject).indexOf(filename) != -1) {
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
        results[filename] = fileResult;
      } else {
        if (filename === 'All') {
          for (const file of Object.keys(this.indexObject)) {
            const fileResult = {};
            for (const item of items) {
              if (item !== '') {
                if (this.indexObject[file][item.toLowerCase()] !== undefined) {
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