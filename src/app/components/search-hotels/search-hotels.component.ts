import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel, HotelSearchCriteria } from '../../interfaces/hotel.interface';
import { SharedModule } from '../../modules/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { datePlusDays } from '../../modules/shared/shared.functions';
import { RoomService } from '../../services/room.service';
import { Room } from '../../interfaces/room.interface';
import { DialogService } from '../../services/dialog.service';
import { HotelRoomListDialogComponent } from '../hotel-room-list-dialog/hotel-room-list-dialog.component';
import { Router } from '@angular/router';

@Component({
  providers: [HotelService],
  imports: [SharedModule],
  standalone: true,
  selector: 'app-search-hotels',
  templateUrl: './search-hotels.component.html',
  styleUrls: ['./search-hotels.component.scss'],
})
export class SearchHotelsComponent implements OnInit {
  form: FormGroup = this.fb.nonNullable.group({
    city: [''],
    checkInDate: new Date(),
    checkOutDate: datePlusDays(new Date(), 7),
    guests: [1, [Validators.required, Validators.min(1)]],
  });
  hotels: Hotel[] = [];
  rooms: Room[] = [];
  minDate = new Date();
  constructor(
    private hotelService: HotelService,
    private fb: FormBuilder,
    private roomService: RoomService,
    private dialog: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.searchHotels();
  }

  async searchHotels() {
    this.rooms = await this.roomService.getAllByHotelSearchCriteria(
      this.form.getRawValue()
    );
    this.filterHotels();
  }

  filterHotels() {
    this.hotels = this.rooms
      .filter((val) => val.hotel !== undefined)
      .map((val) => val.hotel!);
  }

  openModalRooms(hotel: Hotel) {
    const availableRooms = this.rooms.filter((room) => {
      console.log(room.hotelId === hotel.id, room.hotelId, hotel.id);

      return room.hotelId === hotel.id;
    });
    console.log({ hotel, rooms: this.rooms, availableRooms });

    if (availableRooms.length > 0) {
      this.dialog.dialogComponent({
        component: HotelRoomListDialogComponent,
        data: {
          rooms: availableRooms,
          criteria: this.form.getRawValue(),
        },
        height: '90vh',
        width: '400px',
        updatePosition: { right: '20px', top: '20px' },
        disableClose: false,
        dontCloseOtherModals: true,
      });
    } else {
      this.dialog.showError('No hay habitaciones disponibles para este hotel');
    }
  }
}
