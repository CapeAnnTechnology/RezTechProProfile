import { VenueModel } from './venue.model';

export interface BusinessModel {
   _id: String;
   title: String;
   location: String;
   phoneNumber: String;
   faxNumber: String;
   venues: VenueModel[];
}

// "_id": "5bb79a35318cc53701524810",
// "title": "South Side, Inc",
// "location": "443 2nd St. North Beverly, MA",
// "phoneNumber": "978.358.1243",
// "faxNumber": "978.358.1245",
// "venues": [
