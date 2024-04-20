let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require('path');
const excelToJson = require('convert-excel-to-json');

const PORT = 8080

app.use(bodyParser.json());

// load index file to upload file on http://localhost:3000/
app.get('/', function (req, res) {
    const result = excelToJson({
        sourceFile: __dirname + '/jiva.xlsx',
        header: {rows: 1}, columnToKey: {
            A: '1', B: '2', C: '3', D: '4', E: '5',F: '6', G: '7', H: '8', I: '9'
        }
    })
    res.json(result)
});

app.get('/final', function (req, res) {
    const result = excelToJson({
        sourceFile: __dirname + '/tree.xlsx',
        header: {rows: 1}, columnToKey: {
            A: 'name', B: 'name_guj', C: 'father', D: 'spouse', E: 'spouse_guj',
            F: 'number', G: 'city', H: 'occupation', I: 'photo', J: 'spouse_photo'
        }
    })
    fs.writeFileSync(path.join(__dirname + '/../src/tree/',"newTree.json"), JSON.stringify(result))
    res.json(result)
});

app.listen(PORT, function () {
    console.log(`Server running on port : ${PORT}`);
});
