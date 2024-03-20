import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private roles = new BehaviorSubject<string[]>([]);
  private fullName = new BehaviorSubject<string>('');

  constructor() {}

  public getRolesFromStore() {
    return this.roles.asObservable();
  }

  public setRolesFromStore(roles: string[]) {
    this.roles.next(roles);
    console.log('les rôles:', roles);
  }

  public getFullNameFromStore() {
    return this.fullName.asObservable();
  }
  public setFullNameFromStore(fullName: string) {
    return this.fullName.next(fullName);
  }
}
