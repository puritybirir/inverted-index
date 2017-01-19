const myDoc = [{
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },
    {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
]

let index;
describe("Inverted index", () => {
    beforeEach(() => {
        index = new Index();
    });

    describe("Read book data", () => {
        let readData;
        beforeEach(() => {
            readData = index.createIndex(myDoc);
        });
        it("assert JSON file is not empty", () => {
            expect(readData).not.toBe(null);
        });
    });

    describe("Populate Index", function() {
        let populatedData;
        let mapData;
        beforeEach(() => {
            populatedData = index.getIndex('myDoc');
            mapData = index.createIndex(myDoc);
        });

        it("index should be created after reading", () => {

            expect(populatedData).not.toBe(null);

        });
        it("ensures a correct index is created", () => {
            expect(mapData).toEqual({
                alice: [0],
                in: [0],
                wonderland: [0],
                falls: [0],
                into: [0],
                a: [0, 1],
                rabbit: [0],
                hole: [0],
                and: [0, 1],
                enters: [0],
                world: [0],
                full: [0],
                of: [0, 1],
                imagination: [0],
                the: [1],
                lord: [1],
                rings: [1],
                fellowship: [1],
                ring: [1],
                an: [1],
                unusual: [1],
                alliance: [1],
                man: [1],
                elf: [1],
                dwarf: [1],
                wizard: [1],
                hobbit: [1],
                seek: [1],
                to: [1],
                destroy: [1],
                powerful: [1]
            });
        });
        describe('searchIndex', () => {
            let getData;
            beforeEach(() => {
                getData = index.searchIndex('wonderland');
            });
            it('Searches for a particular word', () => {
                expect(getData).toEqual({ wonderland: [0] });
            });
        });

    });
});