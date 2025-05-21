// delete-confirm-dialog.component.ts
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>تأكيد الحذف</h2>
    <mat-dialog-content>هل أنت متأكد من حذف هذا المشروع؟</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">لا</button>
      <button mat-button color="warn" (click)="onConfirm()">نعم</button>
    </mat-dialog-actions>
  `,
})
export class DeleteConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
