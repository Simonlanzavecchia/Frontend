import { Routes } from '@angular/router';
import { ErrorComponent } from './screens/error/error.component';
import { InsComponent } from './screens/ins/ins.component';
import { MainComponent } from './screens/main/main.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'ins', component: InsComponent }
];
