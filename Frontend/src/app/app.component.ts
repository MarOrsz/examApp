import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ExamsApiService} from './exams/exams-api.service';
import {Exam} from './exams/exam.model';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HttpClientModule],  // Import HttpClientModule here
  providers: [ExamsApiService]  // Provide the service (optional if it's already providedIn: 'root')
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  examsListSubs: Subscription;
  examsList: Exam[];

  constructor(private examsApi: ExamsApiService) {
  }

  ngOnInit() {
    this.examsListSubs = this.examsApi
      .getExams()
      .subscribe(res => {
          this.examsList = res;
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.examsListSubs.unsubscribe();
  }
}