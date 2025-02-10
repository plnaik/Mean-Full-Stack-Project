import { Injectable } from '@angular/core';
  import {  Router } from '@angular/router';
  import { CanActivate } from '@angular/router';

  @Injectable({
    providedIn:'root',
  })

  export class authGuard implements CanActivate{
    constructor(private router:Router){}

    canActivate():boolean{
      const token = localStorage.getItem('token');
      if(token){
        return true;
      }else{
        this.router.navigate(['register']);
        return false;
      }
    }

  }
