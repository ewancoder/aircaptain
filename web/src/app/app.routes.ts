import { Routes } from '@angular/router';
import { ChecklistsComponent } from './checklists/checklists.component';

export const routes: Routes = [
    { path: '', redirectTo: 'checklists', pathMatch: 'full' },
    { path: 'checklists', component: ChecklistsComponent },
];
