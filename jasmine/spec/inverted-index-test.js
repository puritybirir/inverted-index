 const myDoc = [{
     title: 'Alice in Wonderland',
     text: 'Alice falls into a rabbit hole and enters a world full of imagination.',
   },
   {
     title: 'The Lord of the Rings: The Fellowship of the Ring.',
     text: 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.',
   },
 ];

 const myDoc2 = [{
     title: 'The Fault in our stars',
     text: 'Some infinities are bigger than others, a writer we used to like taught us that',
   },
   {
     title: ' Of The Alchemist',
     text: 'And, when you want something, all the universe conspires in helping you to achieve it.',
   },
 ];

 const emptyJson = '';

 let index;
 describe('Inverted index', () => {
   beforeEach(() => {
     index = new Index();
   });

   describe('Read book data', () => {
     beforeEach(() => {
       index.createIndex('myDoc', myDoc);
     });
     it('assert JSON file is not empty', () => {
       expect(index.getIndex(myDoc)).toBeTruthy();
     });

     it('checks that JSON file is valid', () => {
       expect(index.getIndex(myDoc)).toBeTruthy();
     });
   });

   describe('Populate Index', () => {
     beforeEach(() => {
       index.createIndex('myDoc', myDoc);
       index.createIndex('myDoc2', myDoc2);
     });

     it('index should be created after reading', () => {
       expect(index.getIndex(myDoc)).toBeTruthy();
     });

     it('ensures a correct index is created', () => {
       expect(index.getIndex(myDoc).myDoc.in).toEqual([0]);
       expect(index.getIndex(myDoc).myDoc.of).toEqual([0, 1]);
       expect(index.getIndex(myDoc).myDoc.lord).toEqual([1]);
       expect(index.getIndex(myDoc).myDoc.alice).toEqual([0]);
     });

     it('ensures an index is not overwritten by new JSON file', () => {
       expect(index.getIndex(myDoc).myDoc.elf).toEqual([1]);
       expect(index.getIndex(myDoc).myDoc.rabbit).toEqual([0]);
       expect(index.getIndex(myDoc2).myDoc2.infinities).toEqual([0]);
       expect(index.getIndex(myDoc2).myDoc2.alchemist).toEqual([1]);
     });
   });

   describe('searchIndex', () => {
     let getData;
     let correctData;
     let multipleData;
     let arrayData;
     let multipleArrayData;
     let searchAllData;

     beforeEach(() => {
       index.createIndex('myDoc', myDoc);
       index.createIndex('myDoc2', myDoc2);
       getData = index.searchIndex('myDoc', 'wonderland');
       correctData = index.searchIndex('myDoc', 'alice');
       multipleData = index.searchIndex('myDoc', 'a alice elf dwarf hole');
       arrayData = index.searchIndex('myDoc2', '[infinities are bigger universe conspires]');
       multipleArrayData = index.searchIndex('myDoc2', '[infinities are [universe conspires in] helping]');
       searchAllData = index.searchIndex('All', 'of');
     });

     it('Searches for a particular word', () => {
       expect(getData).toEqual({ myDoc: { wonderland: [0] } });
     });

     it('Finds the correct index of word input', () => {
       expect(correctData).toEqual({ myDoc: { alice: [0] } });
     });

     it('Ensures searchIndex can handle a varied number of searchterms as arguments', () => {
       expect(multipleData)
         .toEqual({ myDoc: { a: [0, 1], alice: [0], elf: [1], dwarf: [1], hole: [0] } });
     });

     it('Ensures it can search an array', () => {
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

     it('Ensures it can search an array an arrays', () => {
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

     it('Searches all indexed files ', () => {
       expect(searchAllData).toEqual({
         myDoc: { of: [0, 1] },
         myDoc2: { of: [1] },
       });
     });
   });
 });