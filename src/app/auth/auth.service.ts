import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = false;
  private userRole: string | null = null;

  constructor(private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    // Aquí iría la llamada real a la API
    if (email === 'admin@demo.com' && password === 'dfr123') {
      this.isLoggedIn = true;
      this.userRole = 'admin';
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userRole = null;
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getRole(): string | null {
    return this.userRole;
  }
}
