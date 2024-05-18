import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Hotel } from '../interfaces/hotel.interface';
import { Room } from '../interfaces/room.interface';
import { Guest } from '../interfaces/guest.interface';
import { Reservation } from '../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  public hotels!: Table<Hotel, string>;
  public rooms!: Table<Room, string>;
  public guests!: Table<Guest, string>;
  public reservations!: Table<Reservation, string>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      hotels: '++id',
      rooms: '++id',
      guests: '++id',
      reservations: '++id',
    });
  }
}

export const database = new DatabaseService();
