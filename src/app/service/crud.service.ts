import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

export class Book{
  _id!:String; //การมีเครื่องหมาย ! นี้เพื่อเป็นการบอกว่าค่านี้ ห้ามเป็นค่า null
  name!:String;
  price!: String;
  description!:String;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //node/express api
  REST_API: String = 'http://localhost:8000/api';
  //Http Header
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');


  constructor(private httpClient:HttpClient) { }

  //Add book
  AddBook(data: Book): Observable<any>{
    console.log("เข้ามาที่ AddBook ใน CrudService แล้ว")
    let API_URL='http://localhost:8000/api/add-book';
    return this.httpClient.post(API_URL,data,{headers:this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }
  //get all books
  GetBooks(){
    return this.httpClient.get('http://localhost:8000/api');
  }
  //get single book
  GetBook(id: any): Observable<any>{
    let API_URL='http://localhost:8000/api/read-book/'+id;
    return this.httpClient.get(API_URL,{headers:this.httpHeaders})
    .pipe(map((res:any)=>{
      return res || {}
    }),
      catchError(this.handleError)
    )
  }
  //update Book
  updateBook(id:any, data:any): Observable<any>{
    let API_URL = 'http://localhost:8000/api/update-book/'+id;
    return this.httpClient.put(API_URL, data,{headers:this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }
  //delete Book
  deleteBook(id:any): Observable<any>{
    console.log("อยู่ในฟังก์ชัน deleteBook() ของ crudService แล้ว");
    console.log("เลข _id ที่ส่งผ่านเข้ามาในฟังก์ชัน deleteBook(id) ของไฟล์ crudService :"+ id);
    let API_URL = 'http://localhost:8000/api/delete-book/'+id;
    return this.httpClient.delete(API_URL,{headers:this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }

  //handle Error
  handleError(error:HttpErrorResponse){
    let errorMessage ='';
    if (error.error instanceof ErrorEvent){
      // handleError client's error
      errorMessage='client error : '+error.error.message;
    } else {
      // handleError Server's error
      errorMessage ='Server Error code:'+error.status+'\nMessage:' +error.message;
    }
    console.log("มี Error เกิดขึ้น (ยังอยู่ในไฟล์ crudService)");
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
