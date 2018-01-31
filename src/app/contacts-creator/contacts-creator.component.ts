import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../models/contact';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'trm-contacts-creator',
  templateUrl: './contacts-creator.component.html',
  styleUrls: ['./contacts-creator.component.css']
})
export class ContactsCreatorComponent implements OnInit {

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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
