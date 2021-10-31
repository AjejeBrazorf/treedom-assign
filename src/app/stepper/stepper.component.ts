import {ChangeDetectionStrategy, Component, ContentChildren, Input, OnDestroy, OnInit, QueryList} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {StepDirective} from './step.directive';
import {map, switchMap, take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements OnInit, OnDestroy{

  @ContentChildren(StepDirective)
  steps!: QueryList<StepDirective>;
  @Input()
  forms!: FormGroup[];
  onDestroy$: Subject<any> = new Subject<any>();
  onNextWhilePending$: Subject<any> = new Subject<any>();
  loading$!: Observable<boolean>;
  currentStepIndex!: number;

  get currentStep(): StepDirective{
    return this.steps?.toArray()[this.currentStepIndex];
  }

  get currentForm(): FormGroup {
    return this.forms[this.currentStepIndex];
  }

  ngOnInit(): void {
    this.currentStepIndex = 0;
    this.onNextWhilePending$.asObservable().pipe(
      take(1),
      switchMap(() => this.currentForm.statusChanges),
      takeUntil(this.onDestroy$),
    ).subscribe( res => {
      if (res === 'VALID') {
        if (!this.isLastStep()) {
          this.currentStepIndex++;
        }
      }
    });
    this.loading$ = this.currentForm.statusChanges.pipe(
      takeUntil(this.onDestroy$),
      map(res => {
        return res === 'PENDING' || res === undefined;
      })
    );
  }

  isLastStep(): boolean {
    return this.currentStepIndex === this.steps?.toArray().length - 1;
  }

  canGoPrev(): boolean {
    return this.currentStepIndex > 0;
  }

  formIsDirty(i: number): boolean {
    return  this.forms[i] ? this.forms[i].dirty : i <= this.currentStepIndex;
  }

  formIsInvalid(i: number): boolean {
    return  this.forms[i] ? !this.forms[i].valid : i <= this.currentStepIndex;
  }

  nextStep(): void {
      if (this.currentForm.status === 'PENDING') {
         this.onNextWhilePending$.next();
       } else if (this.currentForm.status === 'VALID'){
         this.currentStepIndex++;
       }
  }


  prevStep(): void {
    if (this.canGoPrev()) {
      this.currentStepIndex--;
    }
  }

  goToStep(n: number): void {
    if (n < this.currentStepIndex || ( n > this.currentStepIndex && !this.forms[n - 1].invalid)) {
      this.currentStepIndex = n;
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
