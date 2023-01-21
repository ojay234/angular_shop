import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs';
import { Observable, OperatorFunction, switchMap } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}
  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map((appUser: any) => appUser.isAdmin));
  }
}
