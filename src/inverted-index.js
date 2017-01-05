class Index {
	constructor() {
		//constructor method is called when an instance of the Index class is created
		this.indexArray = [];
		/*this.indexArray class level array is instantiated to hold the indices of JSON files*/
	}

	createIndex(filePath) {
		//createIndex method takes the JSON file path as the argument
		var file = filePath.files[0];
		//getting the actual file
		var reader = new FileReader();
		//an instance of the FileReader class is created to read the contents of the file
		reader.readAsText(file);
		//the reader reads the file and returns a string of the content
		reader.onloadend = () => {
			//what happens after reading the file; we make it an arrow function so as to access the class level index array
			var json = JSON.parse(reader.result);
			//the result is returned as a string(readAsText), so it has to be parsed
			if (json != null) {
				//continues if the JSON file has content
				var indexTerms = [];
				//indexTerms array is instantiated to hold unique terms for the index
				for (let object of json) {
					/*from the returned JSON(json) we get the text values of each JSON object {}
					by looping through the JSON array []*/
					let text = object.text.toLowerCase();
					//the text values are lowercased
					let terms = text.split(/\W+/);
					//we then split the text values with non-word characters as separator to get the terms
					for (let term of terms) {
						/*we loop through the terms, adding each term only once to 
						indexTerms array to create a unique array of terms for the index*/
						if (indexTerms.indexOf(term) < 0) {
							indexTerms.push(term);
						}
					}
				}

				var index = {};
				/*index object(dictionary) is instantiated to hold key(indexTerms) - value(positions of JSON objects containing the index term)
				pairs of the index*/
				index['filePath'] = filePath.value;
				//the file path is the first entry to the index object to distinguish the indices
				for (let indexTerm of indexTerms) {
					//we loop through the indexTerms, testing if each is contained in each of the text values of the JSON array
					var objects = [];
					//objects array is instantiated to hold the position(s) of the JSON object(s) containing the index term
					for (let i = 0; i < json.length; i++) {
						let text = json[i].text.toLowerCase();
						let terms = text.split(/\W+/);
						if (terms.indexOf(indexTerm) > -1) {
							objects.push(i);
						}
						/*if the index term is contained in the text value of the JSON object, the position of the JSON object is
						added to the objects array*/
					}
					index[indexTerm] = objects;
					/*a key-value pair is entered into the index with the key as the index term and the value as
					an array of position(s) of JSON object(s) containing the index term*/
				}
				this.indexArray.push(index);
				//the index is then added to the index array
				display.innerText = 'Index created';
			}			
		}
		
	}

	getIndex(filePath) {
		display.innerText=this.indexArray.toSource();
		//getIndex method takes the JSON file path as the argument
		if (this.indexArray.length != 0) {
			//continues if the index array has content
			for (let index of this.indexArray) {
				//we loop through the indices to find the index that matches the file path 
				if (index.filePath == filePath) {
					display.innerText = index.toSource();
				}
				//when the index is gotten, it is returned
			}
		}
	}

	searchIndex(terms) {
		//searchIndex method takes a variable number of terms to search (...) as the argument
		var results = [];
		//results array is instantiated to hold results of the search
		var tokens = terms.split(/\s*(,|\s)\s*/);
		//the terms are split using commas and whitespaces(regex) as separator to tokens
		if (this.indexArray.length != 0) {
			if (tokens[0].indexOf('.json') > -1) {
				//if the first token is a JSON file, it will search the JSON file only
				for (let index of this.indexArray) {
					//we loop through the indices to establish the index to use using the file path
					if (index.filePath == tokens[0]) {
						var indexToUse = index;
						break;
					} 	
				}
				tokens.shift();
				//the first token(JSON file path) is removed
				for (let x of tokens) {
					//we loop through the remaining tokens and return the position(s) of the JSON object(s) containing the tokens
					if (Array.isArray(x)) {
						//if the token is an array, we return each of the items in the array 
						for (let y of x) {
							if (Array.isArray(y)) {
								//if the item of the token array is another array, we return each of the items in the item array
								for (let z of y) {
									results.push(indexToUse[z.toLowerCase()]);
								}
							} else {
								results.push(indexToUse[y.toLowerCase()]);
								//if the item of the token array is not an array, we return the item
							}
						}
					} else {
						results.push(indexToUse[x.toLowerCase()]);
						//if the token is not an array, we return the token
					}
				}
				display.innerText = results;
				//results are then displayed
			} else {
				//if the first token is not a JSON file, it will search the entire index array
				for (let x of tokens) {
					if (Array.isArray(x)) {
						for (let y of x) {
							if (Array.isArray(y)) {
								for (let z of y) {
									for (let index of this.indexArray) {
										//we loop through the indices to get the index where the token is defined
										if (index[z.toLowerCase()] != undefined) {
											//when we get an index, its file path and the position(s) are returned
											results.push(index['filePath']+" : "+index[z.toLowerCase()]);
										}
									}
								}
							} else {
								for (let index of this.indexArray) {
									if (index[y.toLowerCase()] != undefined) {
										results.push(index['filePath']+" : "+index[y.toLowerCase()]);
									}
								}
							}
						}
					} else {
						for (let index of this.indexArray) {
							if (index[x.toLowerCase()] != undefined) {
								results.push(index['filePath']+" : "+index[x.toLowerCase()]);
							}
						}
					}
				}
			}
			display.innerText = results;
			console.log(results);
		}
	}
}

window.onload = () => {
	var instance = new Index();

	var filePath = document.getElementById('filePath');
	var createIndexButton = document.getElementById('createIndexButton');
	var terms = document.getElementById('terms');
	var searchButton = document.getElementById('searchButton');
	var display = document.getElementById('display');

	createIndexButton.addEventListener('click', () =>{
		instance.createIndex(filePath);
	});

	searchButton.addEventListener('click', () => {
		instance.searchIndex(terms.value);
		//instance.getIndex(terms.value);
	});
}