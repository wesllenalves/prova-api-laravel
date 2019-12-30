import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, PerfilRoutingModule],
  declarations: [PerfilComponent]
})
export class PerfilModule { }
