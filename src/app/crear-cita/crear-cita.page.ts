import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { Doctor } from '../entidades/doctor';
import { DoctorService } from '../servicios/doctor.service';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { Citas } from '../entidades/citas';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.page.html',
  styleUrls: ['./crear-cita.page.scss'],
})
export class CrearCitaPage implements OnInit {
  doctores?:  any[];
  doctor1 :Doctor =new Doctor();
  handlerMessage = '';
  roleMessage = '';
  fechaCita:Date =  new Date();
  servicioT: Doctor[] = []
  serviciof: Doctor= new Doctor
  cita: Citas = {
    idPaciente:""+localStorage.getItem("uid"),
    idMedico: '',
    nombreDoctor: '',
    nombrePaciente: '',
    fecha: '',
    atendida:false,
    cancelado:false,
    


  };
  fecha:Date= new Date('MM-dd-yyyy')
  hora:any
  constructor(
    private dcoService: DoctorService,
    private alertController: AlertController
  ) {}

  ngOnInit() {

    this.listAllCitas();    
   
  }
  listAllCitas(){
    this.dcoService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.doctores = data;
      console.log(this.doctores);
    });

   
  }
  selectedTeam = '';
	onSelected(value:number){
    console.log("llega")
		this.selectedTeam = ""+value;
	}
  currentFood1 = undefined;
  currentFood = undefined;
  //Timestamp.fromDate(new Date("December 10, 1815"))
  guardar(){


    console.log("entra")
    console.log(this.fecha)
    console.log(this.hora)
  }
  

  }
 

