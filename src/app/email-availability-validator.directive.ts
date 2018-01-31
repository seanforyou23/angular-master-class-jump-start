import { Directive, forwardRef } from '@angular/core';
import { AsyncValidator, NG_ASYNC_VALIDATORS, FormControl } from '@angular/forms';
import { ContactsService } from './contacts.service';
import { map } from 'rxjs/operators';

export function checkEmailAvailabilityFactory(contactsService: ContactsService) {
  console.log('test');
  return (c: FormControl) => {
    return contactsService.isEmailAvailable(c.value)
      .pipe(map(response => !response.error ? null : {
        emailTaken: true
      }));
  };
}

@Directive({
  selector: '[trmEmailAvailabilityValidator][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailAvailabilityValidatorDirective),
      multi: true
    }
  ]
})
export class EmailAvailabilityValidatorDirective {

  _validate: Function;

  constructor(private contactsService: ContactsService) {
    this._validate = checkEmailAvailabilityFactory(contactsService);
  }

  validate(c: FormControl) {
    return this._validate(c);
  }
}
