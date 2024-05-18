import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomFormComponent } from '../room-form/room-form.component';
import { Reservation } from '../../interfaces/reservation.interface';

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
    public reservation: Reservation
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onOk(): void {
    this.dialogRef.close(true);
  }
}
