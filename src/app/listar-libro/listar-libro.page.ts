import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { Libro } from '../entidades/libro';
import { DoctorService } from '../servicios/doctor.service';
import { LibrosService } from '../servicios/libros.service';
import { PacienteService } from '../servicios/paciente.service';

@Component({
  selector: 'app-listar-libro',
  templateUrl: './listar-libro.page.html',
  styleUrls: ['./listar-libro.page.scss'],
})
export class ListarLibroPage implements OnInit {
  libros: Libro[]=[]
  libros1:any=[]
  handlerMessage = '';
  roleMessage = '';
  constructor( private dcoService: DoctorService,
    private alertController: AlertController,
    private pacienteService: PacienteService,
    private libroService: LibrosService,
    private router: Router,) { }

  ngOnInit() {
   
    this.listAllCitas()
  }

  listAllCitas(){
   
    this.libroService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.libros = data;
      //console.log(this.citas);
    console.log(""+localStorage.getItem("uid"))
    console.log(this.libros);
    this.libros1=[]
    for (let index = 0; index <this.libros?.length; index++) {
     if(this.libros[index].Cantidad>0){
       
       
        this.libros1.push(this.libros[index])
      
    }
 
  }
  console.log(this.libros1);
      
    });
    
}
actualizar(libro:any){

}
async delete(id: string) {
  const alert = await this.alertController.create({
    header: '¿Esta seguro que desea eliminar el registro?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
      },
      {
        text: 'Si',
        role: 'confirm',
        handler: () => {
          this.libroService.delete(id).then(() => {
            this.libros1=[]
            this.listAllCitas();
         
            console.log('Cita eliminada exitosamente!')
          }).catch(err => console.log(err));
        },
      },
    ],
  });

  await alert.present();
}

}
