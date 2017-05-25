/////////////////////////////
// Modules.
/////////////////////////////
import { AuthModule } from '../auth/auth.module';
import { UserInterfaceModule } from '../user-interface/user-interface.module';

/////////////////////////////
// Services.
/////////////////////////////
import { AuthService } from '../auth/auth.service';

/////////////////////////////
// Components.
/////////////////////////////

/////////////////////////////
// Decorators.
/////////////////////////////
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    UserInterfaceModule,
    AuthModule
  ],
  declarations: [
  ],
  providers: [
    AuthService
  ]
})
export class LayoutModule { }
