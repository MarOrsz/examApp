import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {ExamsApiService} from './exams-api.service';
import {Exam} from './exam.model';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatCardModule],
  providers: [ExamsApiService],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css'
})
export class ExamsComponent implements OnInit, OnDestroy{
  title = 'app';
  examsListSubs: Subscription;
  examsList: Exam[];

  constructor(private examsApi: ExamsApiService) {
  }


  ngOnInit(): void {
    this.examsListSubs = this.examsApi
    .getExams()
    .subscribe(res => {
        this.examsList = res;
      },
      console.error
    );
  }

  ngOnDestroy(): void {
    
  }

  delete(examId: number) {
    this.examsApi
      .deleteExam(examId)
      .subscribe(() => {
        this.examsListSubs = this.examsApi
          .getExams()
          .subscribe(res => {
              this.examsList = res;
            },
            console.error
          )
      }, console.error);
  }
}