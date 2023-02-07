import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../entidades/user';
import { getAuth,signInWithPopup, GoogleAuthProvider, user } from '@angular/fire/auth'
import { Cliente } from '../entidades/cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  cliente:Cliente =new Cliente()
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
  async loginGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {

      const res =signInWithPopup(auth,provider);
     

      if((await res).user?.uid!=''){
        console.log(res)  
        return (await res).user
     }else{
       return false
     }
     
    } catch (error) {
      console.log(error)
    }
    return false;
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
