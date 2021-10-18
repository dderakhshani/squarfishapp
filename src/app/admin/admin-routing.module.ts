import { CreateTourComponent } from './pages/create-tour/create-tour.component';
import { ToursComponent } from './pages/tours/tours.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AuthGuard } from '../core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {
        path: 'create-tour', component: CreateTourComponent, canActivate: [AuthGuard], data: {
          title: 'Create Tour'
        },
      },
      {
        path: 'tours', component: ToursComponent, canActivate: [AuthGuard], data: {
          title: 'Tours List'
        },
      },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
