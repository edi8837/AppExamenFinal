import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../servicios/paciente.service';
import { finalize } from 'rxjs/operators';
import { Paciente } from '../entidades/paciente';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  newImage1 =""
  citaForm: FormGroup=  this.fb.group({
    link:[''],
    cedula:[''],
    nombre:[''],
    apellido:[''],
    direccion:[''],
    correo:[''],
    fechaNacimiento:[''],
    celular:[''] 
   
  })
  newfile = ""
  name = ""
  paciente: Paciente = new Paciente; 

  constructor(
    private pacienteService: PacienteService, 
    private router: Router,
    public fb: FormBuilder
  ) { }
  ngOnInit() {
 
  }
 
 

  async saveCita() {

    console.log("hola" + this.paciente.nombre)

    if (!this.citaForm.valid) {
      return false;
    } else {
      
      const path = 'Pacientes'
      this.paciente =this.citaForm.value
      console.log(this.paciente)
     
      const res = await this.pacienteService.cargarImanee(this.newfile, path, this.name)

        this.paciente.link=res 
      
   
      console.log("fin")



      this.pacienteService.create(this.paciente).then(() => {
        console.log('Cita creada exitosamente!' + this.paciente)
        this.citaForm.reset();
        this.router.navigate(['/home']);
      });
      
    }
    return true;
  }
  async newImageUpdate(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newfile = event.target.files[0]
      this.name = event.target.files[0]["name"]
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage1 = image.target?.result as string
      })
      reader.readAsDataURL(event.target.files[0])
    }
    console.log(event)

    
  }


}
