import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel.interface';
import { database } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor() {}

  getAll() {
    return database.hotels.reverse().toArray();
  }

  getById(id: string) {
    return database.hotels.get({ id });
  }

  create(body: Hotel) {
    return database.hotels.add({ ...body, id: Date.now() + '' });
  }

  async update(id: string, newOne: Hotel) {
    await database.hotels.update(id, newOne);
  }

  async delete(id: string) {
    await database.hotels.delete(id);
  }
}
