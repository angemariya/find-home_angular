import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
      <article>
        <img class="listing-photo" [src]="housingLocation?.photo" />
        <section class="listing-description">
          <h2 class="listing-heading">{{housingLocation?.name}}</h2>
          <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
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
          <h2>Apply now to live here</h2>
          <button class="primary">Apply now</button>
        </section>
      </article>

  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id'));
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }
}
