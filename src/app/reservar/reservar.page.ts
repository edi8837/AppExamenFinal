import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Libro } from '../entidades/libro';
import { Reservar } from '../entidades/reservar';
import { AuthService } from '../servicios/auth.service';
import { LibrosService } from '../servicios/libros.service';
import { ReservarService } from '../servicios/reservar.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
})
export class ReservarPage implements OnInit {
  newFile = ''
  libro: Libro = {
    codigoISBN: "",
    autor: "",
    editorial: '',
    foto: '',
    titulo: '',
    categoria: '',
    Cantidad: 0,


  };
  rervar: Reservar = {
    name: "" + localStorage.getItem("nombreC"),
    email: "" + localStorage.getItem("EmailC"),
    photo: '' + localStorage.getItem("Fotho"),
    uid: '' + localStorage.getItem("idC"),
    idP: "" + localStorage.getItem("idR"),
    cantidadR: 0,
    codigoISBN: '',
    autor: '',
    editorial: '',
    titulo: '',
    categoria: '',
    foto: '',
    Cantidad: 0
  }

  cantidad: any;
  constructor(
    private authSvc: AuthService,
    private libroService: LibrosService,
    private ReservarService: ReservarService,
    private router: Router,
    private toastController: ToastController,

    public fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getLibroInfo()

  }
  getLibroInfo() {
    this.libroService.getById("" + localStorage.getItem("idR")).subscribe(res => {

      this.libro = res;
      console.log(res)

    })
  }

  async guardarUser() {


    this.libroService.update("" + localStorage.getItem("idl"), this.libro,).then(() => {
      console.log('Cita creada exitosamente!' + this.libro)
      this.router.navigate(['/tabinical']);
    });
  }

  async mostrarMensaje(mensaje: any) {
    const toast = await this.toastController.create({
      position: 'top',
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

  guardar() {
    console.log("entra")

    console.log(this.cantidad)
    if (this.cantidad > 0) {
      if (this.libro.Cantidad >= this.cantidad && this.libro.Cantidad >= 0) {
        this.mostrarMensaje("si se puede guardar")


        this.libro.Cantidad = this.libro.Cantidad - this.cantidad
        console.log(this.libro)

        this.rervar.cantidadR = this.cantidad
        this.rervar.codigoISBN = this.libro.codigoISBN,
          this.rervar.autor = this.libro.autor,
          this.rervar.editorial = this.libro.editorial,
          this.rervar.titulo = this.libro.titulo,
          this.rervar.categoria = this.libro.categoria,
          this.rervar.foto = this.libro.foto,
          this.rervar.Cantidad = this.libro.Cantidad
        console.log(this.rervar)
        this.ReservarService.create(this.rervar).then(() => {
          console.log('reservacion creada exitosamente!' + this.rervar)
        })
        this.libroService.update("" + localStorage.getItem("idR"), this.libro,).then(() => {
          console.log('Cita creada exitosamente!' + this.libro)
          this.router.navigate(['/tab-inicial-cliente']);
        });

      } else
        if (this.libro.Cantidad < this.cantidad) {
          this.mostrarMensaje("no se puede guardar")
          console.log("no se puede guardar")
        }
    } else {
      this.mostrarMensaje("no se puede guardar")
    }
  }

}

