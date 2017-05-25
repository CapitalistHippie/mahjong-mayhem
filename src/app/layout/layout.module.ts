// Modules.
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';

// Services.
import { AuthService } from '../auth/auth.service';

// Components.
import { HeaderComponent } from './header/header.component';

// Decorators.
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    SharedModule,
    AuthModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [
    AuthService
  ]
})
export class LayoutModule { }
