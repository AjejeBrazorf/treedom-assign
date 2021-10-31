import {ContentChild, Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appStep]',
})
export class StepDirective {
    @Input() set appStep(label: string){
      this.label = label;
    }
    label!: string;
    @ContentChild(TemplateRef) public stepTemplate!: TemplateRef<any>;
    constructor(public template: TemplateRef<any>) {}
}
