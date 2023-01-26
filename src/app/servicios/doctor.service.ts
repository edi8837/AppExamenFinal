import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Doctor } from '../entidades/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private dbPath = '/medicos';
  citasRef: AngularFirestoreCollection<Doctor>;
  constructor(private db: AngularFirestore) {    
    this.citasRef = db.collection(this.dbPath); 
  }
   
  getAll(): AngularFirestoreCollection<Doctor> {
    return this.citasRef;
  }

  getById(id: string): Observable<any> {
    return this.citasRef.doc(id).valueChanges();
  }

  create(cita: Doctor): any {
    return this.citasRef.add(cita);
  }

  update(id: string, cita: Doctor): Promise<void> {
    return this.citasRef.doc(id).update(cita);
  }

  delete(id: string): Promise<void> {
    return this.citasRef.doc(id).delete();
  }
}
