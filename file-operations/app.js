const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/createFile', (req, res) => {
    const filename = req.body.filename;
    const text = req.body.text;

    fs.writeFile(filename, text, (err) => {
        if (err) {
            console.error("Error creating file: ", err);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            res.status(200).json({message: "File created successfully"});
        }
    });
});

app.get('/readFile', (req, res) => {
    const filename = req.body.filename
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file: ", err);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            res.status(200).json({message: "File read successfully", data: data});
        }
    });
});

app.put('/modifyFile', (req, res) => {
    const filename = req.body.filename;
    const text = req.body.text;

    fs.appendFile(filename,`\n${text}`, (err) => {
        if (err) {
            console.error("Error modifying file: ", err);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            res.status(200).json({message: "File modified successfully"});
        }
    });
});

app.delete('/deleteFile', (req, res) => {
    const filename = req.body.filename

    fs.truncate(filename, 0, (err) => {
        if (err) {
            console.error("Error deleting file: ", err);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            res.status(200).json({message: "Text deleted from file successfully"});
        }
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});