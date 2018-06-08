const convert = require('xml-js');
const read = require('read-file');

//read('./books-data-121.xml', 'utf8', function(err, buffer) {
  read('./test.xml', 'utf8', function(err, buffer) {
    var xml = buffer
  var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
  console.log(result1)
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