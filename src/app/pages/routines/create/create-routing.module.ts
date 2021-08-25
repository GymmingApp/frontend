import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateComponent} from './create.component';
import {LeaveFormGuard} from '../../../guard/leave-form-guard.service';

const routes: Routes = [{path: '', component: CreateComponent, canDeactivate: [LeaveFormGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule {
}
