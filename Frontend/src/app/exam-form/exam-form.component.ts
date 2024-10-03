import { Component } from '@angular/core';
import { ExamsApiService } from '../exams/exams-api.service';
import {Router} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [MatInputModule, MatCardModule],
  templateUrl: './exam-form.component.html',
  styleUrl: './exam-form.component.css'
})
export class ExamFormComponent  {
  exam = {
    id: 0,
    title: '',
    description: '',
    long_description: '',
  };

  constructor(private examsApi: ExamsApiService, private router: Router) { }

  updateTitle(event: any) {
    this.exam.title = event.target.value;
  }

  updateDescription(event: any) {
    this.exam.description = event.target.value;
  }

  updateLongDescription(event: any) {
    this.exam.long_description = event.target.value;
  }

  saveExam() {
    this.examsApi
      .saveExam(this.exam)
      .subscribe(
        () => this.router.navigate(['/']),
        error => alert(error.message)
      );
  }
}
