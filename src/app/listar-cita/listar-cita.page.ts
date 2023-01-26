import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { CitasService } from '../servicios/citas.service';
import { DoctorService } from '../servicios/doctor.service';
import { PacienteService } from '../servicios/paciente.service';

@Component({
  selector: 'app-listar-cita',
  templateUrl: './listar-cita.page.html',
  styleUrls: ['./listar-cita.page.scss'],
})
export class ListarCitaPage implements OnInit {
  citas?:  any[];
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
      console.log(this.citas);
      
    });
  }
}
