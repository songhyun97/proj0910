//엄격한 코드 검사
'use strict';

/************* include library **************/
var express             = require('express');
var path                = require('path');
var server              = express();

/************* view engine setup **************/
server.set('views', path.join(__dirname, '/web'));

server.set('view engine', 'ejs');
server.engine('html', require('ejs').renderFile);


server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, '/web')));


/************* Routing **************/

//intro
server.get('/', (req, res, next) => {
    res.render("index.html");
});

//Quary String에 대하여 알아보자
server.get('/study', (req, res, next) => {

    // http://localhost/study?id=1234&name=백석대

    let student = {
        id : 0,
        name : "손님"
    }

    if(req.query.id !== null && req.query.id !== undefined){
        student.id = req.query.id;
    }
    if(req.query.name !== null && req.query.name !== undefined){
        student.name = req.query.name;
    }
  
    console.log(student);
    res.render("iWillStudy.html", student);
});

//계산기
server.get('/cal',(req,res,next) =>{  
   
    let Nums = {
        firstNum : 0,
        secondNum : 0
    }

    if(req.query.firstNum !== null && req.query.firstNum !== undefined){
        Nums.firstNum = Number(req.query.firstNum);
    }
    if(req.query.secondNum !== null && req.query.secondNum !== undefined){
        Nums.secondNum = Number(req.query.secondNum);
    }

    console.log('합은 :' +(Nums.firstNum+Nums.secondNum)+ '입니다.')
    res.render('cal.html',Nums);
});

//구구단 페이지
server.get('/99dan',  (req, res, next) => {

    // http://localhost/99dan?primary=8

    let gugudan = {
        primary : 2,
        length : 9
    }

    if(req.query.primary !== null && req.query.primary !== undefined){
        gugudan.primary = req.query.primary;
    }
  
    res.render("99dan.html", gugudan);
});

module.exports = server;
