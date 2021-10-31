import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StepperComponent} from './stepper/stepper.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StepDirective} from './stepper/step.directive';
import { TreeProgressIndicatorComponent } from './tree-progress-indicator/tree-progress-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    StepDirective,
    TreeProgressIndicatorComponent
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
