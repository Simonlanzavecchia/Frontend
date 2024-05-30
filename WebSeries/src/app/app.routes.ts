import { Routes } from '@angular/router';
import { ErrorComponent } from './screens/error/error.component';
import { MainComponent } from './screens/main/main.component';
import { LoginComponent } from './screens/login/login.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent }
];