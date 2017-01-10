const myDoc = [{
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },

    {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
]

describe("Read book data", function() {
    beforeEach(function() {
        var file = filePath.files[0];
        var reader = new FileReader();
    });
    it("assert JSON file is not empty", function() {

        var fileNotEmpty = JSON.parse(reader.result);
        var fileNotEmptyResult = function(fileNotEmpty) {
            if (fileNotEmpty = null) {
                return false;
            } else {
                return true;
            }
        };

        expect(fileNotEmptyResult).toBe(true);
    });


});

describe("Populate Index", function() {
    beforeEach(function() {

        checkEmpty = new createIndex();
        //test using spies to check if methods are exectued
        spyOn(checkEmpty, 'push');
    });
    it('should have called and created this function', function() {

        //calling the function to see if the code has been executed
        checkempty.push(term);

        expect(checkEmpty.push).toHaveBeenCalled();
        //because if this method is called the index has been created.
    });
    it("should map string keys to correct objects", function() {
        //calling function to see if it is executed in code

        expect(display.innerText).toBe('Index Created');
    });
});