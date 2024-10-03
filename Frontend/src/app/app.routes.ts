import { Routes } from '@angular/router';
import { ExamsComponent } from './exams/exams.component';
import { ExamFormComponent } from './exam-form/exam-form.component';

export const routes: Routes = [
    {path: '', component: ExamsComponent, children: [
        {path: 'form', component: ExamFormComponent}
    ]},
];
