import {Observable} from 'rxjs';
import {UrlTree} from '@angular/router';

export interface OnLeaveForm {
  leaving: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}
