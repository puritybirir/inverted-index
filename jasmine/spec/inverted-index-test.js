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

  describe("Populate Index", function () {
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
      expect(mapData['in']).toEqual([0]);
      expect(mapData['of']).toEqual([0, 1]);
      expect(mapData['lord']).toEqual([1]);
      expect(mapData['alice']).toEqual([0]);
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

    describe('Correct Index', () => {
      let getData;
      beforeEach(() => {
        getData = index.searchIndex('alice');
      });
      it('Finds the correct index of word input', () => {
        expect(getData).toEqual({ alice: [0] });
      });
    });
  });
});