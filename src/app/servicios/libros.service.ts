import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize, Observable } from 'rxjs';
import { Libro } from '../entidades/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  
  private dbPath = '/libro';
  citasRef: AngularFirestoreCollection<Libro>;
  
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore) {    
    this.citasRef = db.collection(this.dbPath);
   
  }

  getAll(): AngularFirestoreCollection<Libro> {
    return this.citasRef;
  }

  getById(id: string): Observable<any> {
    return this.citasRef.doc(id).valueChanges();
  }

  create(cita: Libro): any {
    return this.citasRef.add(cita);
  }

  update(id: string, cita: Libro): Promise<void> {
    return this.citasRef.doc(id).update(cita);
  }

  delete(id: string): Promise<void> {
    return this.citasRef.doc(id).delete();
  }
  uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(resolve => {
      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
      )
        .subscribe();
    });
  }

 
}
