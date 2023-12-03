import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { EquipmentService } from '../equipment.service';
import { permissionGuard } from 'src/app/permission.guard';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { EquipmentCheckoutModel } from '../equipment-checkout.model';

@Component({
  selector: 'app-equipment-return',
  templateUrl: './equipment-return.component.html',
  styleUrls: ['./equipment-return.component.css']
})
export class EquipmentReturnComponent implements OnInit {
  public static Route: Route = {
    path: 'ambassador/return',
    component: EquipmentReturnComponent,
    title: 'Equipment Return',
    canActivate: [permissionGuard('equipment.update', 'equipment')],
    resolve: { profile: profileResolver }
  };
  private currentCheckoutReturn: EquipmentCheckoutModel | undefined;

  constructor(
    public router: Router,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.currentCheckoutReturn =
      this.equipmentService.getCurrentCheckoutReturn();
  }
}
