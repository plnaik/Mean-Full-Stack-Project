import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name:string='';
  email:string='';
  password:string='';
  mobile:string='';


  private apiUrl:string="http://localhost:5000/api/users/register";

  constructor(private http:HttpClient , private router:Router){}

  onSubmit():void{
    const user = {
      name:this.name,
      email:this.email,
      password:this.password,
      mobile:this.mobile
    };

    // Register User 
    this.http.post(this.apiUrl,user).subscribe({
      next:(response)=>{
        console.log(`${this.name},registered successfully`);
        alert(`${this.name},registered successfully`);
        
        this.router.navigate(['login']);
      },
      error:(error)=>{
        console.log(`Error registering user:`,error);
        const errorMessage = error.error?.message || 'Error registering user. Please try again.';
      alert(`Error registering user: ${errorMessage}`);
        
      }
    })
  }
}
