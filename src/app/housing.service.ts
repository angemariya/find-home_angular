import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  protected housingLocationsList: HousingLocation[] = [];

  constructor() { }

  getHousingLocations(): HousingLocation[] {
    return this.housingLocationsList;
  }

  getHousingLocationById(id: Number): HousingLocation | undefined {
    return this.housingLocationsList.find(housingLocation => housingLocation.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application submitted for ${firstName} ${lastName} at ${email}`);
  }
}
