import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: 'list',
  loadChildren: () => import('./pages/routines/list/list.module').then(m => m.ListModule)
}, {path: 'create', loadChildren: () => import('./pages/routines/create/create.module').then(m => m.CreateModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
