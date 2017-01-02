describe ("Read book data",function(){

	it("assert JSON file is not empty",function(){
		var isNotEmpty = function IsJsonString(filePath) {
    		try {
        		JSON.parse(filePath);
    		} catch (e) {
        		return false;
    		}
    			return true;
			};
		expect(isNotEmpty).toBe(true).because('The JSON file should be a valid JSON array');
	});
});

describe ("Populate Index",function(){
	beforeEach(function() {

		var myIndexPopulate=JSON.parse(filePath);
		var myIndexGet=getIndex(myIndexPopulate);

	
	});
		it("index should be created after reading",function(){

			
			expect(myIndexGet).not.toBe(null).because('Index should be created after reading the file');

		});
		it("index maps string keys to correct obj", function(){
			
			var myFunction= function() {
				var testArray=['a','1'];
				var a=createIndex(testArray);
				var b=getIndex(a);
				return b;
			}
			expect(myFunction).toBe(['a']).because('Index should return corresponding key');

		});
});
describe ("Search Index", function(){
	beforeEach(function(){
		var testArray=["a","b","c"];

		var mySearchIndex= searchIndex(testArray);

	});
	it("searching should returns array of correct indices", function(){
		
		expect(mySearchIndex).toContain("a","b","c");
	});

})