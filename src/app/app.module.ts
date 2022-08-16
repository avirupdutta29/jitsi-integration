import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JitsiComponent } from './MyComponent/jitsi.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    JitsiComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
