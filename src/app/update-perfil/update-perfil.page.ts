import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '../entidades/paciente';
import { AuthService } from '../servicios/auth.service';
import { PacienteService } from '../servicios/paciente.service';

@Component({
  selector: 'app-update-perfil',
  templateUrl: './update-perfil.page.html',
  styleUrls: ['./update-perfil.page.scss'],
})
export class UpdatePerfilPage implements OnInit {
  uid = localStorage.getItem("uid");
  newFile = ''
  paciente: Paciente = {
    uid: "" + localStorage.getItem("uid"),
    email: "" + localStorage.getItem("email"),
    celular: '',
    foto: '',
    direccion: '',
    nombre: '',
    password: "" + localStorage.getItem("password"),


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
    this.pacienteService.getDoc<Paciente>(path, "" + localStorage.getItem("uid")).subscribe(res => {
      if (res !== undefined) {
        this.paciente = res;

      }
    });
  }
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((como) => {
        this.paciente.foto = como.target?.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  async guardarUser() {
    const path = 'paciente';
    const name = this.paciente.nombre;
    if (this.newFile !== undefined) {
      const res = await this.servicePaciente.uploadImage(this.newFile, path, name);
      this.paciente.foto = res;
    }
    this.pacienteService.createDoc(this.paciente, path, "" + localStorage.getItem("uid")).then(res => {
      console.log('guardado con exito');
      this.router.navigate(['../perfil'])
    }).catch(error => {
    });
  }

}
