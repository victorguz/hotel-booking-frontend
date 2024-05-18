import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../modules/shared/shared.module';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './hotel-form.component.html',
  styleUrl: './hotel-form.component.scss',
})
export class HotelFormComponent implements OnChanges {
  @Input() hotel!: Hotel;
  @Output() onSubmit = new EventEmitter<Hotel>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [this.hotel?.name, Validators.required],
      city: [this.hotel?.city, Validators.required],
      country: [this.hotel?.country, Validators.required],
      phone: [this.hotel?.phone],
      email: [this.hotel?.email],
      enabled: [this.hotel?.enabled != undefined ? this.hotel?.enabled : true],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
  }

  sumbit() {
    this.onSubmit.emit(this.form.getRawValue());
  }
}
