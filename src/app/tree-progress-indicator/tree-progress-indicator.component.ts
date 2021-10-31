import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

enum ProgressStates {
  seed,
  sprout,
  tree
}

@Component({
  selector: 'app-tree-progress-indicator',
  templateUrl: './tree-progress-indicator.component.html',
  styleUrls: ['./tree-progress-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeProgressIndicatorComponent {
  @Input()
  set progress(n: number | null) {
    if (typeof n === 'number') {
      this.state = ProgressStates[Math.round((n / 100 * (Object.keys(ProgressStates).length / 2))) - 1];
    } else {
      this.state = ProgressStates[0];
    }
  }

  state!: string;
}
