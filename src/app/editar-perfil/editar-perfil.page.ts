import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../servicios/paciente.service';
import { finalize } from 'rxjs/operators';
import { Paciente } from '../entidades/paciente';
import { AuthService } from '../servicios/auth.service';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  paciente: Paciente = {
    uid:  ""+localStorage.getItem("uid"),
    email: '',
    celular: '',
    foto: '',
    direccion: '',
    nombre: '',
    password: '',


  };
  newFile: any;
  uid = '';

  constructor(
    private authSvc: AuthService,
    private pacienteService: PacienteService,
    private router: Router,
    public fb: FormBuilder,

    public servicePaciente: PacienteService,

  ) { }
  async ngOnInit() {
    const uid = await this.authSvc.getUid();
    console.log(uid);

  }

  initPaciente() {
    this.uid = ""+localStorage.getItem("uid");
    this.paciente = {
      uid: ""+localStorage.getItem("uid"),
      email: '',
      celular: '',
      foto: '',
      direccion: '',
      nombre: '',
      password: ''

    };
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
    this.pacienteService.createDoc(this.paciente, path, ""+localStorage.getItem("uid")).then(res => {
      console.log('guardado con exito');
    }).catch(error => {
    });
  }

}
