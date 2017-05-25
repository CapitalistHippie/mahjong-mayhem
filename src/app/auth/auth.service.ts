import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {
  }

  public authenticate(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }
}
