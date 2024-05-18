import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomFormComponent } from '../room-form/room-form.component';
import { Reservation } from '../../interfaces/reservation.interface';
import { DialogService } from '../../services/dialog.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-detail',
  providers: [],
  imports: [SharedModule],
  standalone: true,
  templateUrl: './reservation-detail.component.html',
  styleUrl: './reservation-detail.component.scss',
})
export class ReservationDetailComponent {
  displayedColumns: string[] = ['name', 'principal'];

  constructor(
    private dialogRef: MatDialogRef<RoomFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public reservation: Reservation,
    private dialog: DialogService,
    private reservationService: ReservationService
  ) {}

  updateStatus(status: boolean) {
    this.dialog
      .dialogConfirmation({
        title: status ? 'Aceptará la reserva' : 'Cancelará la reserva',
        message: status
          ? '¿Quiere aceptar la reserva?'
          : '¿Quiere cancelar la reserva?',
      })
      .subscribe(async (ok) => {
        if (ok) {
          await this.reservationService.update(this.reservation.id!, {
            ...this.reservation,
            status: status ? 'Aceptada' : 'Cancelada',
          });
          status ? this.onOk() : this.onCancel();
        }
      });
  }

  onCancel(): void {
    this.dialog.dialogInformation({
      message:
        'El usuario será notificado en su correo electrónico. <br> <br> Otros usuarios podrán seguir reservando la habitación para estas fechas.',
      title: 'Cancelar reserva',
    });
    this.dialogRef.close(false);
  }

  onOk(): void {
    this.dialog.dialogInformation({
      message:
        'El usuario será notificado en su correo electrónico.  <br> <br> La habitación ya no aparecerá disponible para esas fechas.',
      title: 'Aceptar reserva',
    });
    this.dialogRef.close(true);
  }
}
