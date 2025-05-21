import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectService } from '../../Services/project.service';
import { ProjectDialogComponent } from '../../Components/project-dialog/project-dialog.component';
import { DeleteConfirmDialogComponent } from '../../Components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projectService = inject(ProjectService);
  dialog = inject(MatDialog);
  projects: any[] = [];
  newProjectName: string = '';
  displayedColumns: string[] = ['name', 'actions'];
  isLoading: boolean = false;
  ngOnInit() {
    this.loadProjects();
  }

  openDialog(project: any = null) {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '400px',
      data: project ? { ...project } : { name: '', description: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadProjects();
    });
  }

  loadProjects() {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.projects = response.result;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.isLoading = false;
      },
    });
  }

  deleteProject(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.projectService.deleteProject(id).subscribe({
          next: () => {
            // مثلا تعمل تحديث للقائمة بعد الحذف
            console.log('تم حذف المشروع');
            this.loadProjects(); // دالة لتحميل المشاريع مجددًا
          },
          error: (err) => {
            console.error('حدث خطأ أثناء الحذف', err);
          },
        });
      }
    });
  }
}
