import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { Citas } from '../entidades/citas';
import { CitasService } from '../servicios/citas.service';
import { DoctorService } from '../servicios/doctor.service';
import { PacienteService } from '../servicios/paciente.service';

@Component({
  selector: 'app-listar-cita',
  templateUrl: './listar-cita.page.html',
  styleUrls: ['./listar-cita.page.scss'],
})
export class ListarCitaPage implements OnInit {
  citas: Citas[]=[]
  citas1:any=[]
  handlerMessage = '';
  roleMessage = '';

  constructor( private dcoService: DoctorService,
    private alertController: AlertController,
    private pacienteService: PacienteService,
    private citaService: CitasService,
    private router: Router,) { }

  ngOnInit() {
    this.listAllCitas()
   
   
  }
  
  listAllCitas(){
    this.citaService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.citas = data;
      //console.log(this.citas);
    console.log(""+localStorage.getItem("uid"))
    console.log(this.citas);
    for (let index = 0; index <this.citas?.length; index++) {
     if(this.citas[index].idPaciente==""+localStorage.getItem("uid")){
       
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
              const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
              const fecha: Date =  this.citas[index].fecha!.toDate();
              const fechaFormateada = dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear();
              let horasFormateadas = fecha.getHours() + ':' + fecha.getMinutes()
              if (fecha.getMinutes().toString.length === 1) horasFormateadas += '0'
              this.citas[index].fecha=fechaFormateada+' a las '+horasFormateadas
        
        this.citas1.push(this.citas[index])
      
    }
 
  }
  console.log(this.citas1);
      
    });
    
}
}
