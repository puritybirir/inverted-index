const myDoc = `[{
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },
    {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
]`

let index;
describe("Inverted index", () => {
    beforeEach(() => {
        index = new Index();
    });

    describe("Read book data", () => {
        let readData;
        beforeEach(() => {
            readData = index.getIndex(myDoc);
        });
        it("assert JSON file is not empty", () => {
            expect(readData).not.toBe(null);
        });
    });
});