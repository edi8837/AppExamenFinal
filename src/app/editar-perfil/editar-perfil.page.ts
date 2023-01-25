import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../servicios/paciente.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  newImage:string=""
  citaForm: FormGroup=  this.fb.group({
    link: this.newImage,
    cedula:[''],
    nombre:[''],
    apellido:[''],
    direccion:[''],
    correo:[''],
    fechaNacimiento:[''],
    celular:[''] 
   
  })

  

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
  
  saveCita() {    
    
    console.log(this.newImage)
    
    if (!this.citaForm.valid) {
      return false;
    } else {      
      this.pacienteService.create(this.citaForm.value).then(() => {
        console.log('Cita creada exitosamente!')
        this.citaForm.reset();
        this.router.navigate(['/home']);
      });
    }
  }
  async newImageUpdate(event:any){

  console.log(event)
   
    const path ='Pacientes'
    //const name ="prueba1"
    const nmem1=event.target.files[0]["name"]
    console.log(nmem1)
    const file =event.target.files[0]
    const res = await this.pacienteService.cargarImanee(file,path,nmem1)
    console.log("promesa recivida",res)
    this.newImage = res as string
    console.log("fin")
   
  }


}
