import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { NgFor } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { error } from 'node:console';

@Component({
  selector: 'app-showusers',
  standalone: true,
  imports: [NgFor],
  templateUrl: './showusers.component.html',
  styleUrl: './showusers.component.css'
})
export class ShowUsersComponent {
  users:any[]=[];

  constructor(private authService:AuthService,@Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit():void{
    this.authService.getUsers().subscribe(
      (response:any)=>{
        this.users=response;
      },
      (error)=>{
        console.log(`Failed to fetch users data:-${error}`);
        
        if (isPlatformBrowser(this.platformId)) {
          alert(`Failed to fetch users data: ${error.message || 'Unknown error'}`);
        }
        
      }
    )
  }

// Edit/Update User 
  editUser(user:any):void{
  const updatedName =prompt("Enter new Name",user.name);
  const updatedEmail = prompt("Enter new Email id",user.email);
  const updatedMobile = prompt("Enter new Mobile Number",user.mobile);

  if(updatedName||updatedEmail||updatedMobile){
    const upadtedUser = {
     ...user,
      name:updatedName,
      email:updatedEmail,
      mobile:updatedMobile
    };

    this.authService.updateUser(user._id,
    upadtedUser).subscribe(
      (response:any)=>{
        alert('User Updated Successfully.....!');
        this.ngOnInit();
      },
      (error)=>{
        alert(`Failed to Fetch users data:-${error}`);
      if(isPlatformBrowser(this.platformId)){
        alert(`Failed to Fetch users data :${error.message || 'Unknown error'}`);
      }
    
      }
    )

  }

}
  // Delete User 
  deleteUser(userId:string):void{
    if(confirm('Are you sure want to Delete this User?'))
    {
      this.authService.deleteUser(userId).subscribe(
        (response:any)=>{
          alert('User Deleted Successfully');
          this.ngOnInit();

        },
        (error)=>{
          alert(`Failed to Delete User:${error.message ||
             'Unknown error'}`);
        }
      );
    }
  } 

}



