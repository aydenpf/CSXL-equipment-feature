import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { permissionGuard } from 'src/app/permission.guard';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { EquipmentService } from '../equipment.service';
import { CheckoutRequestModel } from '../checkoutRequest.model';
import { Observable, tap, timer } from 'rxjs';

@Component({
  selector: 'app-ambassador-equipment',
  templateUrl: './ambassador-equipment.component.html',
  styleUrls: ['./ambassador-equipment.component.css']
})
export class AmbassadorEquipmentComponent implements OnInit {
  public static Route: Route = {
    path: 'ambassador',
    component: AmbassadorEquipmentComponent,
    title: 'XL Equipment',
    canActivate: [permissionGuard('equipment.update', 'equipment')],
    resolve: { profile: profileResolver }
  };

  checkoutRequests$: Observable<CheckoutRequestModel[]>;

  constructor(
    public router: Router,
    private equipmentService: EquipmentService
  ) {
    this.checkoutRequests$ = equipmentService.getAllRequest();
  }

  // every 5 seconds call the get all request service method to update ambassador equipment checkout page.
  ngOnInit(): void {
    timer(0, 5000)
      .pipe(
        tap(
          (_) =>
            (this.checkoutRequests$ = this.equipmentService.getAllRequest())
        )
      )
      .subscribe();
  }

  approveRequest(request: CheckoutRequestModel) {
    this.equipmentService.approveRequest(request);
  }

  cancelRequest(request: CheckoutRequestModel) {
    this.equipmentService.deleteRequest(request);
  }
}
