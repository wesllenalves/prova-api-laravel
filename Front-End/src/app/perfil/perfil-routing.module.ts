import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { PerfilComponent } from './perfil.component';
import { Shell } from '@app/shell/shell.service';
import { PerfilAddComponent } from './perfil-add/perfil-add.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/profile', pathMatch: 'full' },
    { path: 'profile', component: PerfilComponent, data: { title: extract('Profile') } },
    { path: 'add/pessoas', component: PerfilAddComponent, data: { title: extract('Adicionar Pessoa') } }
  ])
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PerfilRoutingModule {}
