import {Injectable} from '@angular/core';
import {TreeMockService} from './tree-mock.service';
import {Observable} from 'rxjs';
import {ValidationErrors} from '@angular/forms';

export type ValidationRes = {
  valid: boolean
};

@Injectable({
  providedIn: 'root',
  useClass: TreeMockService,
})
export abstract class TreeService {
  abstract quantityOverflowValidator(quantity: number): Observable<ValidationErrors | null>;
  abstract uniqueNameValidator(name: string): Observable<ValidationErrors | null>;
}
