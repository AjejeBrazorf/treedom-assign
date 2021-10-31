import {Injectable} from '@angular/core';
import {TreeService, ValidationRes} from './tree.service';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {ValidationErrors} from '@angular/forms';

const QUANTITY_LIMIT = 10;
const EXISTING_NAMES = ['Pippo', 'Paperoga', ' Topolino'];

@Injectable()
export class TreeMockService implements TreeService{

  uniqueNameValidator(name: string): Observable<ValidationErrors | null> {
    console.log('(name) that\'s an http call');
    return of(EXISTING_NAMES.includes(name)).pipe(delay(2000))
      .pipe(
        map(invalid => {
          return invalid ?  { nameAlreadyInUse: true } : null;
        })
      );
  }

  quantityOverflowValidator(quantity: number): Observable<ValidationErrors | null> {
    console.log('(quantity) that\'s an http call');
    return of(quantity <= QUANTITY_LIMIT).pipe(delay(2000))
      .pipe(
        map(isValid => {
          return isValid ? null : { quantityOverflow: true, maxQuantity: QUANTITY_LIMIT };
        })
      );
  }
}
