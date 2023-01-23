import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from 'src/app/components/admin/pages/home/home.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private router: Router,
              private authService: AuthService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if (!this.authService.isAuthenticated() && state.url !== '/') {
        this.router.navigate(['']);
        return false;
      } else if (this.authService.isAuthenticated() && state.url === '/') {
        this.router.navigate(['/admin']);
      }
      return true;
  }
}
