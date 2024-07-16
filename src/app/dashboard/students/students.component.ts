import { Component } from '@angular/core';

import { Student } from '../../global/interfaces/student';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  dataSource: Student[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'DOB', 'edit', 'delete'];
  idIndex: number = 0;

  constructor(private matDialog: MatDialog) {
    this.dataSource = [
      {
        id: ++this.idIndex,
        firstName: 'Hugo',
        lastName: 'Oyola',
        DOB: new Date('1990-09-02'),
        email: 'hugo212h@gmail.com',
      },
      {
        id: ++this.idIndex,
        firstName: 'Shirley',
        lastName: 'Serquen',
        DOB: new Date('1988-11-20'),
        email: 'shiseb@gmail.com',
      },
    ];
    this.idIndex = this.dataSource.length;
  }

  newStudent(): void {
    this.matDialog
      .open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value['email']) {
            value['id'] = ++this.idIndex;
            value['subscribedStudents'] = [];
            this.dataSource = [...this.dataSource, value];
          }
        },
      });
  }

  editStudent(student: Student) {
    this.matDialog
      .open(StudentDialogComponent, { data: student })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.dataSource = this.dataSource.map((el) =>
              el.id === student.id ? value : el
            );
          }
        },
      });
  }

  deleteStudentById(id: string | number) {
    this.dataSource = this.dataSource.filter((el) => el.id != id);
  }
}
