import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Libro } from '../entidades/libro';
import { Reservar } from '../entidades/reservar';

@Injectable({
  providedIn: 'root'
})
export class ReservarService {

  
  private dbPath = '/reservar';
  citasRef: AngularFirestoreCollection<Reservar>;
  
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore) {    
    this.citasRef = db.collection(this.dbPath);
   
  }

  getAll(): AngularFirestoreCollection<Reservar> {
    return this.citasRef;
  }

  getById(id: string): Observable<any> {
    return this.citasRef.doc(id).valueChanges();
  }

  create(cita: Reservar): any {
    return this.citasRef.add(cita);
  }

  update(id: string, cita: Reservar): Promise<void> {
    return this.citasRef.doc(id).update(cita);
  }

  delete(id: string): Promise<void> {
    return this.citasRef.doc(id).delete();
  }
}

