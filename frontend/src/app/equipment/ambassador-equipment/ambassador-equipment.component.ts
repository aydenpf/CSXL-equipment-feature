import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { permissionGuard } from 'src/app/permission.guard';
import { profileResolver } from 'src/app/profile/profile.resolver';

@Component({
  selector: 'app-ambassador-equipment',
  templateUrl: './ambassador-equipment.component.html',
  styleUrls: ['./ambassador-equipment.component.css']
})
export class AmbassadorEquipmentComponent {
  public static Route: Route = {
    path: 'ambassador',
    component: AmbassadorEquipmentComponent,
    title: 'XL Equipment',
    canActivate: [permissionGuard('equipment.update', 'equipment')],
    resolve: { profile: profileResolver }
  };

  constructor(public router: Router) {}
}
