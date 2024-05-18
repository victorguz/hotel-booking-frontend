import { Hotel } from "./hotel.interface";

export interface Room {
  id?: string;
  hotelId?: string;
  hotel?: Hotel;
  name?: string;
  type?: string;
  basePrice?: number;
  tax?: number;
  location?: string;
  enabled?: boolean;
  maxOccupancy?: number;
}
