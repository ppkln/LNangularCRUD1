const express = require('express');
const app = express();

const bookRoute = express.Router();
let Book = require('../models/Book')

//add book
bookRoute.route('/add-book').post((req,res,next)=>{
    console.log("มาถึงฟังก์ชัน add Book ในไฟล์ book.route.js แล้ว")
    Book.create(req.body,(error,data)=>{
        if (error){
            return next(error);
        } else {
            res.json(data);
        }
    })
    console.log("ทำการบันทึกข้อมูลหนังสือใหม่เข้า MongoDB เรียบร้อยแล้ว")
})
// get all books
bookRoute.route('/').get((req,res,next)=>{
    Book.find((error,data)=>{
        if (error){
            return next(error);
        } else {
            res.json(data);//ส่งข้อมูลหนังสือทั้งหมดใน MongoDB ออกไปโดยแปลงเป็นข้อมูลแบบ Json
        }
    })
})
// get find book
bookRoute.route('/read-book/:id').get((req,res,next)=>{
    console.log("ค่าที่แนบมาพร้อมURL : "+req.params.id)
    Book.findById(req.params.id,(error,data)=>{
        if (error){
            return next(error);
        } else {
            res.json(data);//ส่งข้อมูลหนังสือที่ค้นพบใน MongoDB ออกไปโดยแปลงเป็นข้อมูลแบบ Json
        }
    })
})
// update book\
bookRoute.route('/update-book/:id').put((req,res,next)=>{
    Book.findByIdAndUpdate(req.params.id,{
        $set:req.body //เป็นคำสั่งให้ทำการ update ข้อมูลใน Document books ที่อยู่ใน MongoDB
    },(error,data)=>{
        if (error){
            return next(error);
            console.log("update fail.")
        } else {
            res.json(data);
            console.log("Book updated successfully.",data)
        }
    })
})
// delete book 
bookRoute.route('/delete-book/:id').delete((req,res,next)=>{
    console.log("เลข _id ที่ส่งผ่านเข้ามาที่ไฟล์ book.route.js :"+req.params.id);
    Book.findByIdAndRemove(req.params.id,(error,data)=>{
        if (error){
            return next(error);
        } else {
            res.status(200).json({msg:data});
            console.log("ทำการลบข้อมูลเรียบร้อยแล้วคือ : ",data)
        }
    })
})

module.exports = bookRoute;