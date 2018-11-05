import { DoorModel } from './door.model';

export interface RoomModel {
   _id: string;
   venueId: string;
   title: string;
   capacity: number;
   occupancy: number;
   progress: number;
   doors: DoorModel[];
}

// "_id": "5bce1a3f1b42144076b851c6",
// "venueId": "5b300cb47039f3f8514d3e42",
// "title": "Side Bar",
// "capacity": "50",
// "doors": [
