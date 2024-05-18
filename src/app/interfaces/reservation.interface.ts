import { EmergencyContact } from './emergency-contact.interface';
import { Guest } from './guest.interface';
import { Hotel } from './hotel.interface';
import { Room } from './room.interface';

export interface Reservation {
  id?: string;
  hotelId?: string;
  hotel?: Hotel;
  room?: Room;
  roomId?: string;
  principalGuest?: Guest;
  guestDetails?: Guest[];
  emergencyContact?: EmergencyContact;
  checkInDate?: Date;
  checkOutDate?: Date;
  totalPrice?: number;
  status?: string;
}
