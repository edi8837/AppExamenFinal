import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Citas } from '../entidades/citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private dbPath = '/citas';
  citasRef: AngularFirestoreCollection<Citas>;
  constructor(private db: AngularFirestore) {    
    this.citasRef = db.collection(this.dbPath); 
  }
    
  getAll(): AngularFirestoreCollection<Citas> {
    return this.citasRef;
  }

  getById(id: string): Observable<any> {
    return this.citasRef.doc(id).valueChanges();
  }

  create(cita: any): any {
    return this.citasRef.add(cita);
  }

  update(id: string, cita: Citas): Promise<void> {
    return this.citasRef.doc(id).update(cita);
  }

  delete(id: string): Promise<void> {
    return this.citasRef.doc(id).delete();
  }
}
