import {Injectable} from '@angular/core';
import {TreeService, ValidationRes} from './tree.service';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {ValidationErrors} from '@angular/forms';

const QUANTITY_LIMIT = 10;
const NOT_ALLOWED_NAMES = ['Pippo', 'Paperoga', ' Topolino'];

@Injectable()
export class TreeMockService implements TreeService{

  buyTree(): Observable<ValidationRes> {
    return of({valid: true}).pipe(delay(1000));

  }

  uniqueNameValidator(name: string): Observable<ValidationErrors | null> {
    console.log('that\'s an http call');
    return of(NOT_ALLOWED_NAMES.includes(name)).pipe(delay(1000))
      .pipe(
        map(invalid => {
          return invalid ?  { nameAlreadyInUse: true } : null;
        })
      );  }

  quantityAsyncValidator(quantity: number): Observable<ValidationErrors | null> {
    console.log('that\'s an http call');
    return of(quantity <= QUANTITY_LIMIT).pipe(delay(1000))
      .pipe(
        map(isValid => {
          return isValid ? null : { quantityOverflow: true, maxQuantity: QUANTITY_LIMIT };
        })
      );
  }
}
