import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { Libro } from '../entidades/libro';
import { LibrosService } from '../servicios/libros.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  libros: Libro[]=[]
  libros1:any=[]
  handlerMessage = '';
  roleMessage = '';
  constructor(
    private alertController: AlertController,
  
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
    
       
       
        this.libros1.push(this.libros[index])
      
    
 
  }
  console.log(this.libros1);
      
    });
    
}
actualizar(id:string){
  localStorage.setItem("idl", id)
  this.router.navigate(['/actualizar-libro']);

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

