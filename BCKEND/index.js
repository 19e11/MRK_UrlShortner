const express = require('express');
const cors = require('cors');
const shortenUrl = require('shorten-url');

const app = express();

app.use(cors({
    origin:['http://localhost:5173',
    'https://mrk-url-shortner.vercel.app']
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.send('Ni Hao');
});

app.post('/', (req,res)=>{
    let newLink = shortenUrl(req.body.url,50);
    res.json({newLink})
});

app.listen(3000, ()=>{
    console.log("Runnin!!");
})