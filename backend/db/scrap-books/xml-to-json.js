const convert = require('xml-js');
const read = require('read-file');
const writeFile = require('write');

let books = []
let authors = []
read('./books-data-121.xml', 'utf8', function(err, buffer) {
  // read('./test.xml', 'utf8', function(err, buffer) {
    var xml = buffer
  var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
  let jsonRes = JSON.parse(result1)
  jsonRes.books.work.forEach(element => {
    let book = {
      id: element.best_book.id._text,
      isbn: "",
      title: element.best_book.title._text,
      number_of_pages: Math.floor(Math.random() * 400) + 1,
      publish_date: new Date(),//element.original_publication_day._text + '-' + element.original_publication_month._text + '-' + element.original_publication_year._text,
      cover: element.best_book.image_url._text,
      author_id: element.best_book.author.id._text
    }
    let author = {
      id: element.best_book.author.id._text,
      name: element.best_book.author.name._text
    }
    if (!(authors.some(e => e.id === author.id))) {
      authors.push(author)
    }
    books.push(book)
  })
  writeFile('./data/book.json', JSON.stringify(books), function(err) {
    if (err) console.log(err);
  });
});


// var xml =
// '<?xml version="1.0" encoding="utf-8"?>' +
// '<note importance="high" logged="true">' +
// '    <title>Happy</title>' +
// '    <todo>Work</todo>' +
// '    <todo>Play</todo>' +
// '</note>';
// var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
// var result2 = convert.xml2json(xml, {compact: false, spaces: 4});
// console.log(result1, '\n', result2);