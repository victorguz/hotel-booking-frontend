import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomFormComponent } from '../room-form/room-form.component';
import { Reservation } from '../../interfaces/reservation.interface';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { clone } from '../../modules/shared/shared.functions';
import { DialogService } from '../../services/dialog.service';
import { Guest } from '../../interfaces/guest.interface';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss',
})
export class ReservationFormComponent implements OnInit {
  displayedColumns: string[] = ['name', 'principal'];
  private id!: string;
  public reservation!: Reservation;
  guestForm!: FormGroup;

  emergencyContactForm!: FormGroup;
  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getById();
    }

    this.guestForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    this.emergencyContactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required]],
    });
  }

  async getById() {
    const result = await this.reservationService.getById(this.id);
    if (result) this.reservation = result;
  }

  async onSaveGuest() {
    const guest: Guest = this.guestForm.getRawValue();
    guest.id = Date.now() + '';
    const cloned: Reservation = clone(this.reservation);
    if (!cloned.principalGuest?.firstName) {
      cloned.principalGuest = guest;
    }
    if (!cloned.guestDetails?.length) {
      cloned.guestDetails = [];
    }
    cloned.guestDetails.push(guest);
    console.log(cloned);

    await this.reservationService.update(this.id, cloned);
    this.guestForm.reset();
    this.dialog.showSuccess('Huesped creado exitosamente');
    this.getById();
  }
  async updateEmergencyContact() {
    const cloned = clone(this.reservation);
    cloned.emergencyContact = this.emergencyContactForm.getRawValue();
    await this.reservationService.update(this.id, cloned);
    this.emergencyContactForm.reset();
    this.dialog.showSuccess('Huesped creado exitosamente');
    this.getById();
  }
  get canChangeStatus() {
    return (
      this.reservation.principalGuest?.firstName &&
      this.reservation.emergencyContact?.name
    );
  }
  async updateStatus() {
    await this.reservationService.update(this.id, {
      ...this.reservation,
      status: 'Pendiente',
    });
    this.dialog
      .dialogInformation({
        message:
          'El proceso finalizó. Le será enviado un correo electrónico al confirmar su reserva.',
        title: 'Su reserva ha sido enviada al hotel',
      })
      .subscribe((ok) => {
        this.router.navigate(['/']);
      });
  }
}
