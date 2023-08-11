const express = require('express');
const cors = require('cors');
const myBooksRouters = require('./routers/book.routers');
const errorHandling = require('./error/errorHandling');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api',myBooksRouters);
app.use((req,res,next)=>{
    res.status(404).json({
        error:true,
        code: 404,
        message: "Endpoint not found"
    });
});
app.use(errorHandling);

module.exports = app;