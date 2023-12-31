import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
      <article>
        <img class="listing-photo" [src]="housingLocation?.photo" />
        <section class="listing-description">
          <h2 class="listing-heading">{{housingLocation?.name}}</h2>
          <p class="listing-location">{{housingLocation?.city}}</p>
        </section>
        <section class="listing-features">
          <h2 class="section-heading">About this location</h2>
          <ul>
            <li>Available Units: {{housingLocation?.availableUnits}}</li>
            <li>Wifi: {{housingLocation?.wifi ? 'Yes' : 'No'}}</li>
            <li>Laundry: {{housingLocation?.laundry ? 'Yes' : 'No'}}</li>
          </ul>
        </section>
        <section class="listing-apply">
          <h2 class="section-heading">Apply now to live here</h2>
          <form [formGroup]="applyForm" (submit)="submitApplication()">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" formControlName="firstName" />
            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" formControlName="lastName" />
            <label for="email">Email</label>
            <input type="text" id="email" formControlName="email" />
            <button class="primary" type="submit">Apply now</button>
          </form>
        </section>
      </article>

  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id'));
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? "",
  )};
}
