import { Component } from '@angular/core';
import { Overview } from "../overview/overview";
import { DashboardHeader } from "../dashboard-header/dashboard-header";

@Component({
  selector: 'app-dashboard',
  imports: [Overview, DashboardHeader],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {

}
