import {Component} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {TreeService} from './shared/tree.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  forms: FormGroup[];
  title = 'treedom-assign';
  get quantityControl(): FormControl {
    return this.forms[0].controls.quantity as FormControl;
  }

  constructor(private formBuilder: FormBuilder, private treeService: TreeService) {

    this.forms = [
      this.formBuilder.group({
        quantity: this.formBuilder.control(
          null,
          {
            updateOn: 'submit',
            validators: Validators.compose([
              Validators.required,
              Validators.min(1)
            ]),
            asyncValidators: this.quantityValidator(),
          },
        ),
      }),
      this.formBuilder.group({
        name: this.formBuilder.control(
          null,
          {
            updateOn: 'submit',
            validators: Validators.compose([
              Validators.required,
              Validators.minLength(2)
            ]),
            asyncValidators: this.nameValidator(),
          }
        )
      })
    ];
  }

  quantityValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.treeService.quantityAsyncValidator(control.value as number);
    };
  }

  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.treeService.uniqueNameValidator(control.value as string);
    };
  }
}
