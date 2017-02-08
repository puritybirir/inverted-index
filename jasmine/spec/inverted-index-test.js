 const myDoc = [
   {
     "title": "Alice in Wonderland",
     "text": "Alice falls into a rabbit hole and enters a world full of imagination."
   },
   {
     "title": "The Lord of the Rings: The Fellowship of the Ring.",
     "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
   }
 ];

 const myDoc2 = [
   {
     "title": "The Fault in our stars",
     "text": "Some infinities are bigger than others, a writer we used to like taught us that"
   },
   {
     "title": "Of The Alchemist",
     "text": "And, when you want something, all the universe conspires in helping you to achieve it."
   }
 ];

 const wrongJson = [
   {
   "key": "Alice in Wonderland",
   "value": "Alice falls into a rabbit hole and enters a world full of imagination."
 }
 ];

 const invalidJson = '[ \
   {"title": "Alice in Wonderland", \
    "text": "Alice falls into a rabbit hole and enters a world full of imagination." \
  }, \
  { \
    "title": "The Lord of the Rings: The Fellowship of the Ring.", \
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring." \
  }';

 const emptyJson =[];

 let index;

 describe('Inverted index', () => {
   beforeEach(() => {
     index = new Index();
   });

   describe('Read book data', () => {
     it('asserts JSON file is not empty', () => {
       expect(index.createIndex('emptyJson', emptyJson)).toBe('Empty file');
     });

     it('checks for an invalid Json file', () => {
       expect(index.createIndex('invalidJson',invalidJson)).toBe('Invalid JSON file');
      });

     it('asserts that the file is parsed correctly', () => {
       expect(index.createIndex('myDoc', JSON.stringify(myDoc))).toBe('Correct file');
     });

     it('asserts that error is returned if the file is wrong', () => {
       expect(index.createIndex('wrongJson',JSON.stringify(wrongJson))).toBe('No title or text');
     });

   });

   describe('Populate Index', () => {
     beforeEach(() => {
       index.createIndex('myDoc', JSON.stringify(myDoc));
       index.createIndex('myDoc2', JSON.stringify(myDoc2));
     });

     it('index should be created after reading', () => {
       expect(index.getIndex('myDoc')).toBeTruthy();
     });

     it('ensures a correct index is created', () => {
       expect(index.getIndex('myDoc').in).toEqual([0]);
       expect(index.getIndex('myDoc').of).toEqual([0, 1]);
       expect(index.getIndex('myDoc').lord).toEqual([1]);
       expect(index.getIndex('myDoc').alice).toEqual([0]);
     });

     it('ensures an index is not overwritten by new JSON file', () => {
       expect(index.getIndex('myDoc').elf).toEqual([1]);
       expect(index.getIndex('myDoc').rabbit).toEqual([0]);
       expect(index.getIndex('myDoc2').infinities).toEqual([0]);
       expect(index.getIndex('myDoc2').alchemist).toEqual([1]);
     });
   });

   describe('Search Index', () => {
     let getData;
     let correctData;
     let multipleData;
     let arrayData;
     let multipleArrayData;
     let searchAllData;

     beforeEach(() => {
       index.createIndex('myDoc', JSON.stringify(myDoc));
       index.createIndex('myDoc2', JSON.stringify(myDoc2));
       getData = index.searchIndex('myDoc', 'wonderland');
       correctData = index.searchIndex('myDoc', 'alice');
       multipleData = index.searchIndex('myDoc', 'a alice elf dwarf hole');
       arrayData = index.searchIndex('myDoc2', '[infinities are bigger universe conspires]');
       multipleArrayData = index.searchIndex('myDoc2', '[infinities are [universe conspires in] helping]');
       searchAllData = index.searchIndex('All', 'of');
     });

     it('searches for a particular word', () => {
       expect(getData).toEqual({ myDoc: { wonderland: [0] } });
     });

     it('finds the correct index of word input', () => {
       expect(correctData).toEqual({ myDoc: { alice: [0] } });
     });

     it('ensures searchIndex can handle a varied number of searchterms as arguments', () => {
       expect(multipleData)
         .toEqual({ myDoc: { a: [0, 1], alice: [0], elf: [1], dwarf: [1], hole: [0] } });
     });

     it('ensures it can search an array', () => {
       expect(arrayData)
         .toEqual({
           myDoc2: {
             infinities: [0],
             are: [0],
             bigger: [0],
             universe: [1],
             conspires: [1],
           },
         });
     });

     it('ensures it can search an array of arrays', () => {
       expect(multipleArrayData)
         .toEqual({
           myDoc2: {
             infinities: [0],
             are: [0],
             universe: [1],
             conspires: [1],
             in: [0, 1],
             helping: [1],
           },
         });
     });

     it('searches all indexed files ', () => {
       expect(searchAllData).toEqual({
         myDoc: { of: [0, 1] },
         myDoc2: { of: [1] },
       });
     });
   });
 });