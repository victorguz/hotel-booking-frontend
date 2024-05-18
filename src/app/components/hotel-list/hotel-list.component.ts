import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../interfaces/hotel.interface';
import { SharedModule } from '../../modules/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelFormComponent } from '../hotel-form/hotel-form.component';
import { DialogService } from '../../services/dialog.service';

@Component({
  providers: [HotelService],
  imports: [SharedModule, HotelFormComponent],
  standalone: true,
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  hotel: any = {};

  constructor(
    private hotelService: HotelService,
    private dialog: DialogService
  ) {}

  async ngOnInit() {
    await this.getAll();
  }
  async getAll() {
    this.hotels = await this.hotelService.getAll();
    this.hotel = undefined;
  }

  async onSubmit(hotel: Hotel) {
    await this.hotelService.create({
      ...hotel,
    });
    await this.getAll();
    this.dialog.showSuccess('Hotel creado correctamente');
  }
}
