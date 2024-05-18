import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../modules/shared/shared.module';
import { Room } from '../../interfaces/room.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomService } from '../../services/room.service';

export enum RoomType {
  SINGLE = 'single',
  DOUBLE = 'double',
  TRIPLE = 'triple',
  FAMILY = 'family',
  SHARED = 'shared',
}

export const ROOM_TYPES: { value: string; name: string }[] = [
  { value: RoomType.SINGLE, name: 'Individual' },
  { value: RoomType.DOUBLE, name: 'Doble' },
  { value: RoomType.TRIPLE, name: 'Triple' },
  { value: RoomType.FAMILY, name: 'Familiar' },
  { value: RoomType.SHARED, name: 'Compartida' },
];
@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss',
})
export class RoomFormComponent implements OnChanges {
  form!: FormGroup;

  roomTypes = ROOM_TYPES;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private dialogRef: MatDialogRef<RoomFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { room?: Room; hotel: Hotel }
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [this.data.room?.name, Validators.required],
      type: [this.data.room?.type, Validators.required],
      basePrice: [this.data.room?.basePrice, Validators.required],
      tax: [this.data.room?.tax, [Validators.required]],
      location: [this.data.room?.location, [Validators.required]],
      enabled: [this.data.room?.enabled],
      maxOccupancy: [
        this.data.room?.maxOccupancy,
        [Validators.required, Validators.min(0)],
      ],
      hotelId: [this.data.hotel?.id],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onOk(): void {
    if (this.data.room) {
      this.roomService.update(this.data.room.id!, this.form.getRawValue());
    } else {
      this.roomService.create({
        ...this.form.getRawValue(),
        hotelId: this.data.hotel.id,
        hotel: this.data.hotel,
      });
    }
    this.dialogRef.close(true);
  }
}
