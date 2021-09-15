import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http:HttpClient) { }


  createUser(user: any){

    return this.http.post("http://localhost:3000/user/",user)
  }
  getAllUser(){

    return this.http.get("http://localhost:3000/user/");
  }
  updateUser(user:any,id:any){

    return this.http.put("http://localhost:3000/user/"+id,user);
  }
  deleteUser(user:any){

    return this.http.delete("http://localhost:3000/user/"+user.id);
  }

  }

