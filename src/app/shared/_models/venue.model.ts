import { RoomModel } from './room.model';

export interface VenueModel {
   _id: String;
   businessId: String;
   title: String;
   location: String;
   phoneNumber: String;
   faxNumber: String;
   comments: String;
   rooms: RoomModel[];
}

// "_id": "5b300cb47039f3f8514d3e42",
// "businessId": "5b300a7f7039f3f8514d30c7",
// "title": "Drew's Bar",
// "name": "Drew's Bar",
// "location": "1 City Hall Square, Boston, MA 02201",
// "phoneNumber": "9784231212",
// "faxNumber": "9787651234",
// "comments": "Sample Concert Venue",
// "viewPublic": false,
// "rooms": [
