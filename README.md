[![Build Status](https://travis-ci.org/andela-pbirir/inverted-index.svg?branch=develop)](https://travis-ci.org/andela-pbirir/inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-pbirir/inverted-index/badge.svg?branch=develop)](https://coveralls.io/github/andela-pbirir/inverted-index?branch=develop)

# Inverted Index
## Introduction

 An inverted index is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

## Key Features of this Application

* Supports Upload of JSON file created following the format displayed below:

```
[
    {
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },
    {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
]

```

* Creates an Index for any selected JSON file.

* Searching of a specific JSON file or all indexed JSON files.


## Technologies used

* EcmaScript 6 (JavaScript 2015)
* Gulp (Task Runner)




