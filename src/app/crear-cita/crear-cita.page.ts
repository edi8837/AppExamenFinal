import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { Doctor } from '../entidades/doctor';
import { DoctorService } from '../servicios/doctor.service';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { Citas } from '../entidades/citas';
import { PacienteService } from '../servicios/paciente.service';
import { Paciente } from '../entidades/user';
import { Router } from '@angular/router';
import { CitasService } from '../servicios/citas.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.page.html',
  styleUrls: ['./crear-cita.page.scss'],
})
export class CrearCitaPage implements OnInit {
  doctores?: any[];
  doctor1: Doctor = new Doctor();
  handlerMessage = '';
  roleMessage = '';
  fechaCita: Date = new Date();
  servicioT: Doctor[] = []
  paciente: any
  citas: Citas = new Citas();
  serviciof: Doctor = new Doctor

  fecha=''
  hora: any
  constructor(
    private dcoService: DoctorService,
    private alertController: AlertController,
    private pacienteService: PacienteService,
    private citaService: CitasService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.listAllCitas();
    this.getUserInfo();

  }
  listAllCitas() {
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
  onSelected(value: number) {
    console.log("llega")
    this.selectedTeam = "" + value;
  }
  currentFood1 = undefined;
  currentFood = undefined;
  //Timestamp.fromDate(new Date("December 10, 1815"))
  guardar() {
    const date = new Date(this.fecha);
    const data = {
      idPaciente: "" + localStorage.getItem("uid"),
      idMedico: this.doctor1.id,
      nombreDoctor: this.doctor1.nombre,
      nombrePaciente: this.paciente.nombre,
      fecha: date,
      atendida: false,
      cancelado: false,
      fotoPaciente:this.paciente.foto


    };
    console.log(data)
    this.citaService.create(data).then(() => {
      console.log('Cita creada exitosamente!')
      
     // this.router.navigate(['/home']);
    });

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

}


