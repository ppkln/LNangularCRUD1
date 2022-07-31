
let express = require('express'),
    path = require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    mongoDB = require('./database/db')

    const bookRoute = require('./routes/book.route');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB.db,{
    useNewUrlParser:true,
    //useFindAndModify:true,
    useUnifiedTopology:false
}).then(()=>{
    console.log("Connected to Database.")
},error=>{
    console.log("Database error"+ error)
})


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(cors());

app.use(express.static(path.join(__dirname,'dist/')));
// base route
app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'))
})

//API root
app.use('/api',bookRoute);

//port
const port = process.env.port ||8000;

app.listen(port,()=>{
    console.log("เรียกหน้า index.js ขึ้นมาทำงาน")
    console.log('Listening on port' + port)
})

// 404 handle
app.use((req,res,next)=>{
    next(createError(404));
})

// Error Handle
app.use(function(err,req,res,next){
    console.error(err.message);
    if (!err.statusCode) err.statusCode=500;
    res.status(err.statusCode).send(err.message)
})