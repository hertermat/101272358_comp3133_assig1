import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { EventComponent } from './event/event.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  {path: '', redirectTo: 'bookings', pathMatch:'full'},
  {path:'add', component:BookingListComponent},
  {path:'booking/details', component: BookingDetailsComponent},
  {path:'list', component: BookingListComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
