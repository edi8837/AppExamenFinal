import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../entidades/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;
  constructor(public afAuth: AngularFireAuth) {

    afAuth.authState.subscribe(user => (this.isLogged = user));
  }

  async login(user: User) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log('ErrorLogin', error)
      return false;
    }

  }

  async register(user: User) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log('Error Creation user', error)
      return false;
    }

  }

  async getUid() {
    const user = await this.afAuth.currentUser
    if (user === null) {
      return null;
    } else {
      return user.uid
    }
  }
}
