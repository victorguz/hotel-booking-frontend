import { Injectable } from '@angular/core';
import { database } from './database.service';
import { Room } from '../interfaces/room.interface';
import { HotelSearchCriteria } from '../interfaces/hotel.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor() {}

  async getAllByHotelSearchCriteria(body: HotelSearchCriteria) {
    let rooms = await database.rooms.toArray();
    rooms = rooms.filter((val) => val.enabled);
    let reservations = await database.reservations.toArray();
    if (body.city) {
      rooms = rooms.filter((val) => {
        return val.hotel?.city?.toLowerCase().includes(body.city ?? '');
      });
    }
    if (body.guests) {
      rooms = rooms.filter((val) => {
        return val.maxOccupancy! >= body.guests!;
      });
    }
    if (reservations.length > 0) {
      /**
       * validate if exist a reservation with the same roomId
       * and check if the room is available for body date range
       * return rooms
       */
      rooms = rooms.filter((val) => {
        return !reservations.some((reservation) => {
          if (
            reservation.checkInDate &&
            body.checkInDate &&
            reservation.checkOutDate &&
            body.checkOutDate
          ) {
            return (
              reservation.status == 'Aceptada' &&
              reservation.roomId == val.id &&
              // there is a reservation with checkInDate and checkOutDate inside the body date range
              reservation.checkInDate <= body.checkOutDate &&
              reservation.checkOutDate >= body.checkInDate
            );
          }
          return true;
        });
      });
    }
    return rooms;
  }

  async getByHotelId(id: string) {
    return (await database.rooms.toArray()).filter((val) => val.hotelId == id);
  }
  getById(id: string) {
    return database.rooms.where({ id }).toArray();
  }

  create(body: Room) {
    return database.rooms.add({ ...body, id: Date.now() + '' });
  }

  async update(id: string, newOne: Room) {
    await database.rooms.update(id, newOne);
  }

  async delete(id: string) {
    await database.rooms.delete(id);
  }
}
