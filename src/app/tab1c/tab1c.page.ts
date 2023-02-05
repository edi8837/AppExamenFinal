import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { Libro } from '../entidades/libro';
import { LibrosService } from '../servicios/libros.service';

@Component({
  selector: 'app-tab1c',
  templateUrl: './tab1c.page.html',
  styleUrls: ['./tab1c.page.scss'],
})
export class Tab1cPage implements OnInit {
  libros: Libro[]=[]
  libros1:any=[]
  libros2:any=[]
  
   libro!:Libro
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
     if(this.libros[index].Cantidad>0){
       
       
        this.libros1.push(this.libros[index])
      
    }
 
  }
  console.log(this.libros1);
      
    });
    
}
Reservar(id:string){
  localStorage.setItem("idR", id)
  this.router.navigate(['/reservar']);

}

buscar(event:any){
const val=event.target.value
console.log(val)
if(val==""){
  this.listAllCitas()
}else{
  this.libros2=[]
for (let index1 = 0; index1 <this.libros1?.length; index1++){
    if(this.libros1[index1].categoria==val){
      
    
      this.libros2.push(this.libros[index1])
      console.log(this.libros2)
    }
    if(this.libros1[index1].codigoISBN==val){
      console.log(val)
    
      this.libros2.push(this.libros[index1])
      console.log(this.libros2)
    }if(this.libros1[index1].titulo==val){
      console.log(val)
      this.libros2.push(this.libros[index1])
      console.log(this.libros2)
    }
}
console.log(this.libros2)
this.libros1=[]
this.libros1=this.libros2

}


}

}
