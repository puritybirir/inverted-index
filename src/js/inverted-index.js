class Index {
	constructor() {
		//constructor method is called when an instance of the Index class is created
		this.indexArray = [];
		/*this.indexArray array is instantiated to hold the indices of JSON files;
		adding 'this' makes the variable global(can be accessed from any method)*/
	}

	createIndex(filePath) {
		//createIndex method takes the file path of the JSON file as an argument
		$.getJSON(filePath, function(json) {
			//$.getJSON (asynchronous) gets the contents of the JSON file and returns a JSON(json)
			if (json != null) {
				//continues if the JSON file has content
				var indexTerms = [];
				//indexTerms array is instantiated to hold unique terms for the index
				for (const object of json) {
					/*from the returned JSON(json) we get the text values of each JSON object {}
					by looping through the JSON array []*/
					let text = object.text.toLowerCase();
					//the text values are lowercased
					let terms = text.split(/\W+/);
					//we then split the text values with non-word characters as separator to get the terms
					for (const term of terms) {
						/*we loop through the terms, adding each term only once to 
						indexTerms array to create a unique array of terms for the index*/
						if (!indexTerms.contains(term)) {
							indexTerms.push(term);
						}
					}
				}
			}
		});

		var index = {};
		/*index object(dictionary) is instantiated to hold key(indexTerms) - value(positions of JSON objects containing the index term)
		pairs of the index*/
		index['filePath'] = filePath;
		//the file path is the first entry to the index object to distinguish the indices
		for (const indexTerm of indexTerms) {
			//we loop through the indexTerms, testing if each is contained in each of the text values of the JSON array
			var objects = [];
			//objects array is instantiated to hold the position(s) of the JSON object(s) containing the index term
			for (let i = 0; i < json.length; i++) {
				let text = json[i].text.toLowerCase();
				let terms = text.split(/\W+/);
				if (terms.contains(indexTerm)) {
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
	}

	getIndex(filePath) {
		//getIndex method takes the file path of the JSON file as an argument
		if (this.indexArray.length != 0) {
			//continues if the index array has content
			for (const index of this.indexArray) {
				//we loop through the indices to find the index that matches the file path 
				if (index.filePath == filePath) {
					return(index.toSource());
					break;
				}
				//when the index is gotten, it is returned and the loop breaks
			}
		}
	}

	searchIndex(...terms) {
		//searchIndex method takes a variable number of terms to search (...) as an argument
		if (this.indexArray.length != 0) {
			if (terms[0].includes('.json')) {
				//if the first term is a JSON file, it will search only one file
				for (const index of this.indexArray) {
					//we loop through the indices to establish the index to use using the file path
					if (index.filePath == terms[0]) {
						var index = index;
						break;
					} 	
				}
				for (const x of terms.splice(0, 1)) {
					/*the first term is removed by splicing then we loop through the remaining terms and return
					the position(s) of the JSON object(s) containing the terms*/
					if (Array.isArray(x)) {
						//if the term is an array, we return each of the items in the array 
						for (const y of x) {
							if (Array.isArray(y)) {
								//if the item of the term array is another array, we return each of the items in the item array
								for (const z of y) {
									return(index[z.toLowerCase()]);
								}
							} else {
								return(index[y.toLowerCase()]);
								//if the item of the term array is not an array, we return the item
							}
						}
					} else {
						return(index[x.toLowerCase()]);
						//if the term is not an array, we return the term
					}
				}

			} else {
				//if the first term is not a JSON file, it will search the entire index array
				for (const x of terms) {
					if (Array.isArray(x)) {
						for (const y of x) {
							if (Array.isArray(y)) {
								for (const z of y) {
									for (const index of this.indexArray) {
										//we loop through the indices to get the index where the term is defined
										if (index[z.toLowerCase()] != undefined) {
											//when we get an index, its file path and the position(s) are returned
											return(index['filePath']);
											return(index[z.toLowerCase()]);
										}
									}
								}
							} else {
								for (const index of this.indexArray) {
									if (index[y.toLowerCase()] != undefined) {
										return(index['filePath']);
										return(index[y.toLowerCase()]);
									}
								}
							}
						}
					} else {
						for (const index of this.indexArray) {
							if (index[x.toLowerCase()] != undefined) {
								return(index['filePath']);
								return(index[x.toLowerCase()]);
							}
						}
					}
				}
			}
		}
	}
}
