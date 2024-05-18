import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../interfaces/hotel.interface';
import { Room } from '../../interfaces/room.interface';
import { SharedModule } from '../../modules/shared/shared.module';
import { RoomService } from '../../services/room.service';
import { FormGroup } from '@angular/forms';
import { HotelFormComponent } from '../hotel-form/hotel-form.component';
import { DialogService } from '../../services/dialog.service';
import { RoomFormComponent } from '../room-form/room-form.component';

@Component({
  providers: [HotelService],
  imports: [SharedModule, HotelFormComponent],
  standalone: true,
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss'],
})
export class HotelDetailComponent implements OnInit {
  rooms: Room[] = [];
  id!: string;
  hotel!: Hotel;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    private dialog: DialogService
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      await this.getById();
    }
  }

  async getById(): Promise<void> {
    const result = await this.hotelService.getById(this.id);
    if (result) {
      this.hotel = result;
      this.getByHotelId();
    }
  }

  async getByHotelId(): Promise<void> {
    const result = await this.roomService.getByHotelId(this.id);
    if (result) {
      this.rooms = result;
    }
  }

  onSubmit(hotel: Hotel) {
    this.hotelService.update(this.hotel.id!, hotel);
    this.dialog.showSuccess('Hotel actualizado correctamente');
  }

  openRoomForm(room?: Room) {
    this.dialog
      .dialogComponent({
        component: RoomFormComponent,
        data: { hotel: this.hotel, room },
      })
      .subscribe((ok) => {
        if (ok) {
          this.getByHotelId();
        }
      });
  }
}
