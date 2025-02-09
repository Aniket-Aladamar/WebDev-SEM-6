const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

let data = [
    {id:1,name:'ABC'},
    {id:2,name:'DEF'},
];

let idCounter = data.length +1;

//GET: Retrive all data
app.get('/api/data',(req,res)=>{
    res.json(data);
});



//POST: Add new data
app.post('/api/data',(req,res)=>{
    const newData = req.body;
    newData.id = idCounter++;
    data.push(newData);
    res.json(newData);
});

//PUT: Update data
app.put('/api/data/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const updatedData = {id, name: req.body.name};

    const dataIndex = data.findIndex((item)=>item.id === id);
    if(dataIndex !== -1){
        data[dataIndex] = updatedData;
        res.json(updatedData);
    }else{
        res.status(404).json({message: "Data not found"});
    }
});

app.put('/university/socse/:usn',(req,res)=>{
    const usn = req.params.usn;
    const updatedData = {usn, name: req.body.name, sem: req.body.sem};

    const dataIndex = data.findIndex((item)=>item.usn === usn);
    if(dataIndex !== -1){
        data[dataIndex] = updatedData;
        res.json(updatedData);
    }else{
        res.status(404).json({message: "Data not found"});
    }
});


//DELETE: Delete data
app.delete('/api/data/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    data = data.filter((item)=>item.id !== id);
    res.json({ message: "successfully deleted " + id });
});

app.listen(port,()=>{
    console.log(`Server listening on ${port}`);
});