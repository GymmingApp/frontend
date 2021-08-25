import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {OnLeaveForm} from '../interface/on-leave-form';

@Injectable({
  providedIn: 'root'
})
export class LeaveFormGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: OnLeaveForm,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.leaving ? component.leaving() : true;
  }
}
