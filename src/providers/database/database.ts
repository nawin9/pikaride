import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class DatabaseProvider {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
  }

  async register(email, password, success) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      const profileRef = this.db.list('profiles');
      await profileRef.push({email: email});
      success();
    }
    catch (e) {
      console.error(e);
    }
  }

  async login(email, password, success) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      const profileRef = this.db.list('profiles');
      profileRef.snapshotChanges().subscribe(actions => {
        const res = actions.filter(a => {
          return a.payload.val().email === email
        })
        success(result, res[0].key);
      });
    }
    catch (e) {
      console.error(e);
    }
  }

}
