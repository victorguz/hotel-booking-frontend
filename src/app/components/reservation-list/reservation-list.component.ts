import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../interfaces/hotel.interface';
import { SharedModule } from '../../modules/shared/shared.module';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../interfaces/reservation.interface';
import { ReservationService } from '../../services/reservation.service';
import { RoomFormComponent } from '../room-form/room-form.component';

@Component({
  selector: 'app-reservation-list',
  providers: [HotelService],
  imports: [SharedModule],
  standalone: true,
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss',
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  hotel: any = {};

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private dialog: DialogService
  ) {}

  async ngOnInit() {
    await this.getAll();
  }
  async getAll() {
    this.reservations = await this.reservationService.getAll();
    this.hotel = undefined;
  }

  openReservation(reservation: Reservation) {
    this.dialog.dialogComponent({
      component: RoomFormComponent,
      data: reservation,
    });
  }
}
