import { Injectable } from '@angular/core';
import { database } from './database.service';
import { Reservation } from '../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor() {}

  getAll() {
    return database.reservations.toArray();
  }

  async getByHotelId(id: string) {
    return (await database.reservations.toArray()).filter(
      (val) => val.hotelId == id
    );
  }
  getById(id: string) {
    return database.reservations.get({ id });
  }

  create(body: Reservation) {
    return database.reservations.add({ ...body, id: Date.now() + '' });
  }

  async update(id: string, newOne: Reservation) {
    await database.reservations.update(id, {
      emergencyContact: {
        name: newOne.emergencyContact?.name!,
        phone: newOne.emergencyContact?.phone!,
      },

      ...newOne,
    });
  }

  async delete(id: string) {
    await database.reservations.delete(id);
  }
}
