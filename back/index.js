import express from "express";
import parser from 'body-parser';
import cors from 'cors';
import personRoutes from './routes/personRoutes.js';

const app = express();



app.use(parser.json());
app.use(cors());


app.use('/',personRoutes);

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>')
})


app.listen(8800,()=>{
    console.log('Server is running')
})