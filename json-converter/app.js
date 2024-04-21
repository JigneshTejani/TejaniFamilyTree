let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require('path');
const excelToJson = require('convert-excel-to-json');
const multer = require("multer");

const PORT = 8080
const cors = require("cors")

app.use(cors())
app.use(bodyParser.json());

// load index file to upload file on http://localhost:3000/
app.get('/', function (req, res) {
    const result = excelToJson({
        sourceFile: __dirname + '/harji.xlsx',
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

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const upload = multer({
    dest: __dirname + "./temp/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post(
    "/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname + '/../public/images/',`${req.body.name}.png`);

        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(200)
                    .contentType("text/plain")
                    .end("File uploaded!");
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(403)
                    .contentType("text/plain")
                    .end("Only .png files are allowed!");
            });
        }
    }
);

app.listen(PORT, function () {
    console.log(`Server running on port : ${PORT}`);
});
