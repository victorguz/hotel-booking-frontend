import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FieldFormComponent } from './components/field-form/field-form.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from './components/dialog/dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RoomFormComponent } from '../../components/room-form/room-form.component';
import {MatNativeDateModule} from '@angular/material/core';
const IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterLink,
  HttpClientModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatIconModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatSelectModule,
  MatInputModule,
  MatNativeDateModule
];
const DECLARATIONS: any = [
  NavbarComponent,
  FieldFormComponent,
  DialogComponent,
  SpinnerComponent,
  RoomFormComponent,
];
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...IMPORTS],
  exports: [...IMPORTS, ...DECLARATIONS],
})
export class SharedModule {}
