import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StepperComponent} from './stepper/stepper.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StepDirective} from './stepper/step.directive';

@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    StepDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
