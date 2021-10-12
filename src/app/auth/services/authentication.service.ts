import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import UserModel from 'src/app/core/models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: UserModel | null = null;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('currentUser') != null)
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  login(userModel: UserModel) {
    const headers = { 'Content-Type': 'application/json' }
    return this.http.post<UserModel>(`${environment.apiUrl}/Auth/Login`, JSON.stringify(userModel), { headers })
      .pipe(map((user: any) => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        this.currentUser = user.data;
        localStorage.setItem('currentUser', JSON.stringify(user.data));
        // this.currentUserSubject.next(user);
        return user;
      }));
  }




  loadCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    return this.currentUser;
  }


  logout() {
    // remove user from local storage to log user out
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
  }
}
