import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Paciente } from '../entidades/paciente';
import { AuthService } from '../servicios/auth.service';
import { PacienteService } from '../servicios/paciente.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  
  paciente: Paciente = {
    uid:  ""+localStorage.getItem("uid"),
    email: ""+localStorage.getItem("email"),
    celular: '',
    foto: '',
    direccion: '',
    nombre: '',
    password: ""+localStorage.getItem("password"),


  };
 
  
  constructor(
    private authSvc: AuthService,
    private pacienteService: PacienteService,
    private router: Router,
  
    public fb: FormBuilder,

    public servicePaciente: PacienteService
  ) { }
  
  ngOnInit() {
    this.getUserInfo()
  }

  getUserInfo() {
 
    console.log('getUserInfo');
    const path = 'paciente';
    this.pacienteService.getDoc<Paciente>(path, ""+localStorage.getItem("uid")).subscribe( res => {
           if (res !== undefined) {
             this.paciente = res;
             
           }
    });
}

}
