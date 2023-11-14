import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'https://my-json-server.typicode.com/angemariya/mock-data-homes/locations'

  constructor() { }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const response = await fetch(this.url);
    const housingLocations = await response.json();
    return housingLocations ?? [];
  }

  async getHousingLocationById(id: Number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application submitted for ${firstName} ${lastName} at ${email}`);
  }
}
