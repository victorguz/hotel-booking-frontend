import { Room } from './room.interface';

export interface Hotel {
  id?: string;
  name?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  rooms?: Room[];
  enabled?: boolean;
}

export interface HotelSearchCriteria {
  city?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  guests?: number;
}
