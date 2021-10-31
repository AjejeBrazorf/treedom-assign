import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {StepDirective} from './step.directive';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements AfterViewInit, OnDestroy{

  @ContentChildren(StepDirective)
  steps!: QueryList<StepDirective>;
  @Input()
  forms!: FormGroup[];
  @Output()
  progress$: EventEmitter<number> = new EventEmitter<number>();

  loading$!: Observable<boolean>;
  private _onDestroy$: Subject<any> = new Subject<any>();
  private _onNextWhilePending$: Subject<any> = new Subject<any>();

  private _currentStepIndex!: number;

  set currentStepIndex(n: number) {
    this._currentStepIndex = n;
    this.progress$.next((this.currentStepIndex + 1) / this.steps?.toArray().length * 100);
    this.cd.detectChanges();
  }

  get currentStepIndex(): number {
    return this._currentStepIndex;
  }

  get currentStep(): StepDirective{
    return this.steps?.toArray()[this.currentStepIndex];
  }

  get currentForm(): FormGroup {
    return this.forms[this.currentStepIndex];
  }

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.currentStepIndex = 0;
    this._onNextWhilePending$.asObservable().pipe(
      switchMap(() => this.currentForm.statusChanges),
      takeUntil(this._onDestroy$),
    ).subscribe( res => {
      if (res === 'VALID') {
          this.currentStepIndex++;
      }
    });
    this.loading$ = this.currentForm.statusChanges.pipe(
      takeUntil(this._onDestroy$),
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
       this._onNextWhilePending$.next();
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

  resetStepper(): void {
    this.forms.forEach(form => form.reset());
    this.currentStepIndex = 0;
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }
}
