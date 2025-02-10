import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string='';
  password:string='';

  constructor(private authService:AuthService, private router:Router){}

  onSubmit(){
    const loginData = {
                       email:this.email,
                       password:this.password
    };
    this.authService.login(loginData).subscribe(
      (response:any)=>{
        localStorage.setItem('token',response.token);
        alert(`Login Successfull.!`)
        this.router.navigate(['/users']);
      },
      (error)=>{
        console.log('Login Failed',error);
        alert('Invalid email or password');
        
      }
    )

  }
}

