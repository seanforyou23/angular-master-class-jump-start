import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { validateEmail } from '../email-validator.directive';
import { checkEmailAvailabilityFactory } from '../email-availability-validator.directive';

@Component({
  selector: 'trm-contacts-creator',
  templateUrl: './contacts-creator.component.html',
  styleUrls: ['./contacts-creator.component.css']
})
export class ContactsCreatorComponent implements OnInit {
  form: FormGroup;

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      email: [
        '',
        [validateEmail],
        [checkEmailAvailabilityFactory(this.contactsService)]
      ],
      birthday: '',
      phone: this.fb.array(['']),
      website: '',
      address: this.fb.group({
        street: '',
        zip: '',
        city: '',
        country: ''
      })
    });
  }

  addPhoneField() {
    const control = <FormArray>this.form.get('phone');
    control.push(new FormControl(''));
  }

  removePhoneField(idx) {
    const control = <FormArray>this.form.get('phone');
    control.removeAt(idx);
  }

  save(contact: Contact) {
    // this.contactsService.addContact(contact)
    //   .toPromise()
    //   .then(() => {
    //     this.router.navigate(['']);
    //   });

    this.contactsService.addContact(contact)
      .subscribe(() => {
        this.router.navigate([''])
      });
  }

}
