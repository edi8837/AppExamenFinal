import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { resolve } from 'dns';
import { link } from 'fs';
import { finalize, Observable } from 'rxjs';
import { Paciente } from '../entidades/paciente';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private dbPath = '/paciente';
  citasRef: AngularFirestoreCollection<Paciente>;
  
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore) {    
    this.citasRef = db.collection(this.dbPath);
   
  }

  getAll(): AngularFirestoreCollection<Paciente> {
    return this.citasRef;
  }

  getById(id: string): Observable<any> {
    return this.citasRef.doc(id).valueChanges();
  }

  create(cita: Paciente): any {
    return this.citasRef.add(cita);
  }

  update(id: string, cita: Paciente): Promise<void> {
    return this.citasRef.doc(id).update(cita);
  }

  delete(id: string): Promise<void> {
    return this.citasRef.doc(id).delete();
  }
  cargarImanee(file:any,path:string,nombre:string):Promise<string>{
    return new Promise(resolve =>{
   
      const filePath = path+ '/' +nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res =>{
            const linkimg=res
            resolve(linkimg)
            return
          })
        })
     )
    .subscribe()

    })
  }
}
