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
  clinte :any
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
      this.router.navigateByUrl('/tabinical')
      localStorage.setItem("login", "true")
      localStorage.setItem("email", ""+user.user?.email)
      localStorage.setItem("password", password)
      const res= await this.authSvc.getUid();
      localStorage.setItem("uid", ""+res)
    }

  }
 
  async googleLogin(){
    console.log('entraaaaaaaaaaaaaa')
    try {
      
    const res= await this.authSvc.loginGoogle();
    console.log(res)
      this.clinte=res
     await this.router.navigate(['/tab-inicial-cliente'])
    
    
   
    } catch (error) {
      console.log(error)
    }

    localStorage.setItem("idC",this.clinte["uid"])
    localStorage.setItem("nombreC",this.clinte["displayName"])
    localStorage.setItem("EmailC",this.clinte["email"])
    localStorage.setItem("Fotho",this.clinte["photoURL"])
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
