import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { Room } from '../../interfaces/room.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomFormComponent } from '../room-form/room-form.component';
import { DialogService } from '../../services/dialog.service';
import { HotelSearchCriteria } from '../../interfaces/hotel.interface';
import { ReservationService } from '../../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-room-list-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './hotel-room-list-dialog.component.html',
  styleUrl: './hotel-room-list-dialog.component.scss',
})
export class HotelRoomListDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<RoomFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { rooms: Room[]; criteria: HotelSearchCriteria },
    private dialog: DialogService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  createReservationForm(room: Room) {
    this.dialog
      .dialogConfirmation({
        title: 'Estás a punto de reservar esta habitación',
        message: `¿Deseas confirmar tu reservación?
        <br> La reservación será confirmada por el administrador del hotel. Hasta entonces otras personas podrán seguir reservando esta habitación.
        ${
          this.data.criteria.guests && this.data.criteria.guests > 1
            ? `
            <br><br>A continuación te pediremos sus datos y los datos de tus acompañantes.
            `
            : ''
        }
        `,
      })
      .subscribe(async (ok) => {
        if (ok) {
          const hotel = room.hotel;
          delete room.hotel;

          const reservationId = await this.reservationService.create({
            hotelId: hotel!.id,
            hotel: hotel,
            room: room,
            roomId: room.id,
            checkInDate: this.data.criteria.checkInDate,
            checkOutDate: this.data.criteria.checkOutDate,
            totalPrice: room.basePrice! + room.tax!,
            status: 'Incompleta',
            principalGuest: {},
            guestDetails: [],
            emergencyContact: {},
          });

          this.router.navigate(['/reserve', reservationId]);

          this.dialogRef.close(true);
        }
      });
  }
}
