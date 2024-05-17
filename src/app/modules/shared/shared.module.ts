import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
const IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterLink,
  HttpClientModule,
  MatButtonModule,
];
const DECLARATIONS:any=[]
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...IMPORTS],
  exports: [...IMPORTS],
})
export class SharedModule {}
