import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { SignInRequest } from 'src/app/request/SignInRequest';
import { SignInResponse } from 'src/app/response/SignInResponse';

@Injectable({
  providedIn: 'root',
})


export class AuthService {

  private URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient,
              private router: Router) { }

  public signIn(payload: SignInRequest) : Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.URL}/sign`, payload).pipe(
      tap(res => {
        console.log(res);
        localStorage.setItem('@jwt:jwt', res.token);
        return this.router.navigate(['/admin']);
      })
    );
  }

  public signOut() {
    localStorage.removeItem('@jwt:jwt');
    return this.router.navigate(['']);
  }

  public isAuthenticated() : boolean {
    const token = localStorage.getItem("@jwt:jwt");

    if(!token)
      return false;

    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }

}
