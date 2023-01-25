import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entidades/user';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   user: User = new User();
  constructor(
    private router :Router,
    private authSvc: AuthService
  ) { }

  ngOnInit() {
  }

  async login(password:string){
    const user = await this.authSvc.login(this.user);
    if (user) {
      console.log("Ingresado Correctamente")
      this.router.navigateByUrl('/home')
      localStorage.setItem("login", "true")
      localStorage.setItem("email", ""+user.user?.email)
      localStorage.setItem("password", password)
      const res= await this.authSvc.getUid();
      localStorage.setItem("uid", ""+res)
    }

  }

}
