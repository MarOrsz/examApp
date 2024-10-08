import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../env';
import {Exam} from './exam.model';
import { throwError } from 'rxjs';


@Injectable()
export class ExamsApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${API_URL}/exams`);
  }

  saveExam(exam: Exam): Observable<any> {
    return this.http
      .post(`${API_URL}/exams`, exam);
  }

  deleteExam(examId: number) {
    return this.http
      .delete(`${API_URL}/exams/${examId}`);
  }
}