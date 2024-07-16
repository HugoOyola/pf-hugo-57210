import { Component } from '@angular/core';

import { Course } from '../../global/interfaces/course';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  dataSource: Course[] = [];
  idIndex: number = 0;
  displayedColumns: string[] = [
    'id',
    'name',
    'startDate',
    'endDate',
    'spots',
    'edit',
    'delete',
  ];

  constructor(private matDialog: MatDialog) {
    this.dataSource = [
      {
        id: ++this.idIndex,
        comision: 23001,
        name: 'JavaScript',
        startDate: new Date('2024-01-02'),
        endDate: new Date('2024-11-01'),
        studentQuota: 45,
        subscribedStudents: [1, 2, 3, 4, 5],
      },
      {
        id: ++this.idIndex,
        comision: 23002,
        name: 'ReactJS',
        startDate: new Date('2024-01-02'),
        endDate: new Date('2024-11-01'),
        studentQuota: 23,
        subscribedStudents: [1, 2, 3, 4, 5, 6],
      },
      {
        id: ++this.idIndex,
        comision: 23003,
        name: 'NextJS',
        startDate: new Date('2024-01-02'),
        endDate: new Date('2024-11-01'),
        studentQuota: 100,
        subscribedStudents: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        id: ++this.idIndex,
        comision: 23004,
        name: 'Angular',
        startDate: new Date('2024-01-02'),
        endDate: new Date('2024-11-01'),
        studentQuota: 200,
        subscribedStudents: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        id: ++this.idIndex,
        comision: 23005,
        name: 'VueJS',
        startDate: new Date('2024-01-02'),
        endDate: new Date('2024-11-01'),
        studentQuota: 25,
        subscribedStudents: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ];
  }

  openDialog(): void {
    this.matDialog
      .open(CourseDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value['comision']) {
            value['id'] = ++this.idIndex;
            value['subscribedStudents'] = [];
            this.dataSource = [...this.dataSource, value];
          }
        },
      });
  }

  editCourse(course: Course) {
    this.matDialog
      .open(CourseDialogComponent, { data: course })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.dataSource = this.dataSource.map((el) =>
              el.id === course.id ? value : el
            );
          }
        },
      });
  }

  deleteCourseById(id: string | number) {
    if (confirm('¿Está seguro que desea elminiar este curso?')) {
      this.dataSource = this.dataSource.filter((el) => el.id != id);
    }
  }
}
