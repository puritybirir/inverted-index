const myDoc = [{
    "title": 'Alice in Wonderland',
    "text": 'Alice falls into a rabbit hole and enters a world full of imagination'.
  },
  {
    'title': 'The Lord of the Rings: The Fellowship of the Ring.',
    'text': 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  }
]

const bookName = 'books.json'
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

    it("checks for Invalid JSON file", () => {
      expect(() => {
        index.createIndex('Invalid', bookName);
      }).toThrow(new Exception('Invalid file'));
    });
  });




  describe("Populate Index", function () {
    let populatedData;
    let mapData;
    beforeEach(() => {
      mapData = index.createIndex(myDoc, 'myDoc');
      populatedData = index.getIndex('myDoc');
    });

    it("index should be created after reading", () => {

      expect(populatedData).not.toBe(null);

    });
    it("ensures a correct index is created", () => {
      expect(mapData['myDoc']['in']).toEqual([0]);
      expect(mapData['myDoc']['of']).toEqual([0, 1]);
      expect(mapData['myDoc']['lord']).toEqual([1]);
      expect(mapData['myDoc']['alice']).toEqual([0]);
    });

    describe('searchIndex', () => {
      let getData;
      beforeEach(() => {
        getData = index.searchIndex('myDoc', 'wonderland');
      });
      it('Searches for a particular word', () => {
        expect(getData).toEqual({ wonderland: [0] });
      });
    });

    describe('Correct Index', () => {
      let getData;
      beforeEach(() => {
        getData = index.searchIndex('myDoc', 'alice');
      });
      it('Finds the correct index of word input', () => {
        expect(getData).toEqual({ alice: [0] });
      });
    });
  });
});