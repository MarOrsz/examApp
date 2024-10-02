import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {ExamsApiService} from './exams-api.service';
import {Exam} from './exam.model';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [],
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
}