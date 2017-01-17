describe("Read book data", function() {
    beforeEach(function() {
        var file = file.files[0];
        var reader = new FileReader();
    });
    it("assert JSON file is not empty", function() {
        expect(file).not.toBe(null);
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