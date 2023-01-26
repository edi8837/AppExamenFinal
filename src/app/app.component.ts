import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router
  ) { }


  cerrarSesion() {
    localStorage.removeItem("login")
    localStorage.removeItem("uid")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    
    

    this.router.navigateByUrl('/login')

  }
}
