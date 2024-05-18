import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpinnerMessageOptions } from '../../../../interfaces/dialogs.interfaces';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  constructor(
    private dialogRef: MatDialogRef<SpinnerComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      options: SpinnerMessageOptions;
    }
  ) {
    setTimeout(
      () => this.onCancel(),
       data.options.timeoutMillis ?? 5000
    );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onOk(): void {
    this.dialogRef.close(true);
  }

}
