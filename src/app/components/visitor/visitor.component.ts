import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';

@Component({
  selector: 'app-visitor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './visitor.component.html',
  styleUrl: './visitor.component.scss'
})
export class VisitorComponent {

}
