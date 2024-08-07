import { Component, Inject } from '@angular/core';

import { Student } from '../../../../global/interfaces/student';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
})
export class StudentDialogComponent {
  studentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public student?: Student
  ) {
    this.dateAdapter.setLocale('es-PE');
    this.matDialogRef.disableClose = true;
    this.studentForm = this.formBuilder.group({
      id: [],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      DOB: [new Date(), Validators.required],
      email: [
        null,
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        },
      ],
    });
    if (this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  onSubmit(): void {
    this.matDialogRef.close(this.studentForm.value);
    console.log(this.studentForm.value);
  }
}
