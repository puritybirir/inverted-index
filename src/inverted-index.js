//This is an inverted index.
class Index {
	createIndex(filePath) {
		//'createIndex' method takes the file path of the JSON file as an argument
		$.getJSON(filePath, function(json) {
			//$.getJSON (asynchronous) gets the contents of the JSON file and returns a JSON('json')
			var indexTerms = [];
			//'indexTerms' array is instantiated to hold unique terms for the index
			for (var i = 0; i < json.length; i++) {
				/*from the returned JSON('json') we get the 'text' values of each JSON object {}
				by looping through the JSON array []*/
				var text = json[i].text.toLowerCase();
				//the 'text' values are lowercased
				var terms = text.split(/\W+/);
				//we then split the 'text' values using non-word characters as separator to get the terms
				for (var j = 0; j < terms.length; j++) {
					/*we loop through the terms, adding each term only once to 
					'indexTerms' array to create a unique array of terms for the index*/
					if (!indexTerms.contains(terms[j])) {
						indexTerms.push(terms[j]);
					}
				}
			}
		});

		this.index = {};
		/*'this.index' object(dictionary) is instantiated to hold key('indexTerms') - value(positions of JSON objects containing the index term)
		pairs of the index. adding 'this' makes the variable global(can be used in any method)*/
		for (var i = 0; i < indexTerms.length; i++) {
			//we loop through the 'indexTerms', testing if each is contained in each of the 'text' values of the JSON array
			var objects = [];
			//'objects' array is instantiated to hold the position of the JSON object containing the index term
			for (var j = 0; j < json.length; j++) {
				var text = json[j].text.toLowerCase();
				var terms = text.split(/\W+/);
				if (terms.contains(indexTerms[i])) {
					objects.push(j);
				}
				/*if the index term is contained in the 'text' value of the JSON object, the position of the JSON object is
				added to the 'objects' array*/
			}
			this.index[indexTerms[i]] = objects;
			/*a key-value pair is entered into the index('this.index') with the key as the index term and the value as
			an array of position(s) of JSON object(s) containing the index term*/
		}
	}

	getIndex() {
		return(this.index.toSource());
		//'getIndex' method returns an object(dictionary) that is an index of the content in the JSON file
	}

	searchIndex(terms) {
		//'searchIndex' method takes terms to search as an argument
		var tokens = terms.toLowerCase().split(/\W+/);
		//the search terms are lowercased then split to tokens
		for (var i = 0; i < tokens.length; i++) {
			//for each token, an array of numbers is returned, each number representing the position of an object in the JSON file
			return(this.index[tokens[i]]);
		}
	}
}
