import { Component, inject, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../Services/project.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './project-dialog.component.html',
})
export class ProjectDialogComponent {
  fb = inject(FormBuilder);
  projectService = inject(ProjectService);
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload = this.form.value;

    const request = this.data.id
      ? this.projectService.updateProject(this.data.id, payload)
      : this.projectService.createProject(payload);

    request.subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
