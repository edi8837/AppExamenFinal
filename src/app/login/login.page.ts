import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private authSvc: AuthService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  async login(password:string){
    const user = await this.authSvc.login(this.user);
    if (user) {
      this.mostrarMensaje('Ingresado Correctamente')
      this.router.navigateByUrl('/home')
      localStorage.setItem("login", "true")
      localStorage.setItem("email", ""+user.user?.email)
      localStorage.setItem("password", password)
      const res= await this.authSvc.getUid();
      localStorage.setItem("uid", ""+res)
    }

  }

  async mostrarMensaje(mensaje: any) {
    const toast = await this.toastController.create({
      position: 'top',
       message: mensaje,
      duration: 1500
    });
    toast.present();
  }

}
