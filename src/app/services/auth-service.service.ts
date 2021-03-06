import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Const } from '../const';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  constructor(private http: HttpClient) { }
  basicJwtAuthLogin(user) {
    return this.http.post<any>(Const.API_BASE_URL + '/auth/login', user).pipe(
      map(
        data => {
          localStorage.setItem(TOKEN, `Bearer ${data.accessToken}`)
          return data;
        }
      )
    )
  }
  userSignup(user) {
    return this.http.post<any>(Const.API_BASE_URL + '/auth/signup', user);
  }

  getVerificationLink(email) {
    return this.http.post<any>(Const.API_BASE_URL + '/auth/send-email', email);
  }

  getOtp(body) {
    return this.http.post<any>(Const.API_BASE_URL + '/auth/generate-otp', body);
  }

  submitOtp(body) {
    return this.http.post<any>(Const.API_BASE_URL + '/auth/validate-otp', body);
  }

  resetPassword(body) {
    return this.http.post<any>(Const.API_BASE_URL + '/auth/reset-password', body);
  }

  getAuthToken() {
    if(localStorage.getItem(TOKEN))

      return localStorage.getItem(TOKEN)
  }
  setAuthToken(token) {
    localStorage.setItem(TOKEN, token);
  }
  isUserLoggedIn() {
    let token = localStorage.getItem(TOKEN)
    if(token === null || token.includes('undefined'))
      return false;
    else
      return true;
  }
  removeToken() {
    localStorage.removeItem(TOKEN)
  }
  getAuthMail(){

    return localStorage.getItem("email");

  }
}
