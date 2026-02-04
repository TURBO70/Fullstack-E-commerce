import { Component } from '@angular/core';
import { DashboardHeader } from "../dashboard-header/dashboard-header";
import { DashboardOverview } from '../dashboard-overview/dashboard-overview';
import { DashboardNavbar } from "../dashboard-navbar/dashboard-navbar";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [DashboardOverview, DashboardHeader, DashboardNavbar, RouterModule],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {

}
