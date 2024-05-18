import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';

@Component({
  selector: 'app-administrator',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.scss',
})
export class AdministratorComponent {}
