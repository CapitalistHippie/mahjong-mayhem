/////////////////////////////
// Modules.
/////////////////////////////
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from './layout/layout.module';
import { UserInterfaceModule } from './user-interface/user-interface.module';

/////////////////////////////
// Components.
/////////////////////////////
import { AppComponent } from './app.component';

/////////////////////////////
// Decorators.
/////////////////////////////
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    LayoutModule,
    UserInterfaceModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
