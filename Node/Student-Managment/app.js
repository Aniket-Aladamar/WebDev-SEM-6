const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

let data = [ ]
let USN = data.length +1;

//GET: Retrive all data
app.get('/university/socse',(req,res)=>{
    res.json(data);
});

//POST: Add new data
app.post('/university/socse',(req,res)=>{
    const newData = req.body;
    newData.USN = USN++;
    data.push(newData);
    res.json(newData);
});

//PUT: Update data
app.put('/university/socse/:USN',(req,res)=>{
    const USN = parseInt(req.params.USN);
    const updatedData = {USN, name: req.body.name, sem: req.body.sem};

    const dataIndex = data.findIndex((item)=>item.USN === USN);
    if(dataIndex !== -1){
        data[dataIndex] = updatedData;
        res.json(updatedData);
    }else{
        res.status(404).json({message: "Data not found"});
    }
});

//DELETE: Delete data
app.delete('/university/socse/:USN',(req,res)=>{
    const USN = parseInt(req.params.USN);
    const dataIndex = data.findIndex((item)=>item.USN === USN);
    if(dataIndex !== -1){
        data = data.filter((item)=>item.USN !== USN);
        res.json({message: "Data deleted"});
    }else{
        res.status(404).json({message: "Data not found"});
    }   
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
