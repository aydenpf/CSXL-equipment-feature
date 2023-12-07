import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { permissionGuard } from 'src/app/permission.guard';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { EquipmentService } from '../equipment.service';
import { CheckoutRequestModel } from '../checkoutRequest.model';
import { Observable, map, reduce, tap, timer } from 'rxjs';
import { StagedCheckoutRequestModel } from '../staged-checkout-request.model';
import { StageCard } from '../widgets/staged-checkout-request-card/staged-checkout-request-card.widget';
import { CheckoutRequestCard } from '../widgets/checkout-request-card/checkout-request-card.widget';
import { EquipmentCheckoutCard } from '../widgets/equipment-checkout-card/equipment-checkout-card.widget';
import { EquipmentCheckoutConfirmationComponent } from '../equipment-checkout-confirmation/equipment-checkout-confirmation.component';
import { EquipmentCheckoutModel } from '../equipment-checkout.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  checkoutRequestsLength: number = 0;
  stagedCheckoutRequests$: Observable<StagedCheckoutRequestModel[]>;
  stagedCheckoutRequestsLength: number = 0;
  equipmentCheckouts$: Observable<EquipmentCheckoutModel[]>;
  checkoutsLength: number = 0;

  @ViewChild(StageCard) stageTable: StageCard | undefined;
  @ViewChild(CheckoutRequestCard) requestTable: CheckoutRequestCard | undefined;
  @ViewChild(EquipmentCheckoutCard) checkoutTable:
    | EquipmentCheckoutCard
    | undefined;

  constructor(
    public router: Router,
    private equipmentService: EquipmentService,
    protected snackBar: MatSnackBar
  ) {
    this.checkoutRequests$ = equipmentService.getAllRequest();
    this.getCheckoutRequestLength();
    this.stagedCheckoutRequests$ = equipmentService.getAllStagedCheckouts();
    this.getStagedCheckoutLength();
    this.equipmentCheckouts$ = equipmentService.get_all_active_checkouts().pipe(
      map((checkouts) => {
        checkouts.forEach((checkout) => {
          checkout.end_at = new Date(checkout.end_at);
        });
        return checkouts;
      })
    );
    this.getCheckoutsLength();
    this.stagedCheckoutRequests$.subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // every 5 seconds call the get all request service method to update ambassador equipment checkout page.
  ngOnInit(): void {
    timer(0, 5000)
      .pipe(
        tap(() => {
          this.updateCheckoutRequestsTable();
        })
      )
      .subscribe();
  }

  updateCheckoutRequestsTable() {
    //updates the checkout request table
    this.checkoutRequests$ = this.equipmentService.getAllRequest();
    this.getCheckoutRequestLength();
    this.requestTable?.refreshTable();
  }

  updateStagedCheckoutTable() {
    //updates the staged checkout request table
    this.stagedCheckoutRequests$ =
      this.equipmentService.getAllStagedCheckouts();
    this.getStagedCheckoutLength();
    this.stageTable?.refreshTable();
  }

  updateCheckoutTable() {
    //updates the checkout table
    this.equipmentCheckouts$ = this.equipmentService
      .get_all_active_checkouts()
      .pipe(
        map((checkouts) => {
          checkouts.forEach((checkout) => {
            checkout.end_at = new Date(checkout.end_at);
          });
          return checkouts;
        })
      );
    this.getCheckoutsLength();
    this.checkoutTable?.refreshTable();
  }

  approveRequest(request: CheckoutRequestModel) {
    // Convert request into staged request.
    this.equipmentService.approveRequest(request).subscribe({
      next: () => {
        this.equipmentService
          .deleteRequest(request)
          .subscribe(() => this.updateCheckoutRequestsTable());
        this.updateStagedCheckoutTable();
        this.updateCheckoutRequestsTable();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  cancelRequest(request: CheckoutRequestModel) {
    // Calls the proper API route to remove a request from checkout requests table in the backend.
    this.equipmentService
      .deleteRequest(request)
      .subscribe(() => this.updateCheckoutRequestsTable());

    this.snackBar.open(
      `Canceled checkout request of ${request.model} by ${request.user_name}`,
      '',
      { duration: 4000 }
    );
  }

  approveStagedRequest(request: StagedCheckoutRequestModel) {
    // Calls the proper API route to move request into checkouts table in backend.
    this.equipmentService.create_checkout(request).subscribe({
      next: (value) => {
        this.cancelStagedRequest(request);
        this.updateCheckoutTable();
        this.snackBar.open(
          `${request.user_name} has checked out one ${request.model}`,
          '',
          { duration: 4000 }
        );
      },
      error: (err) => console.log(err)
    });
  }

  cancelStagedRequest(stagedRequest: StagedCheckoutRequestModel) {
    this.equipmentService.removeStagedCheckout(stagedRequest).subscribe({
      next: (value) => {
        this.updateStagedCheckoutTable();
      },
      error: (err) => console.log(err)
    });
    this.snackBar.open(
      `Canceled staged checkout request of ${stagedRequest.model} by ${stagedRequest.user_name}`,
      '',
      { duration: 4000 }
    );
  }

  // Gets the length of the observable array of checkout request models.
  getCheckoutRequestLength() {
    this.checkoutRequests$.subscribe((array) => {
      this.checkoutRequestsLength = array.length;
    });
  }

  //Gets the length of the observable array of staged checkout request models
  getStagedCheckoutLength() {
    this.stagedCheckoutRequests$.subscribe((array) => {
      this.stagedCheckoutRequestsLength = array.length;
    });
  }
  //Gets the length of the observable array of checkout models
  getCheckoutsLength() {
    this.equipmentCheckouts$.subscribe((array) => {
      this.checkoutsLength = array.length;
    });
  }

  returnEquipment(checkout: EquipmentCheckoutModel) {
    // Calls proper API route to return an equipment checkout
    this.equipmentService.returnCheckout(checkout).subscribe({
      next: (value) => {
        this.updateCheckoutTable();
        this.snackBar.open(
          `${checkout.user_name} has returned ${checkout.model} with id ${checkout.equipment_id}`,
          '',
          { duration: 4000 }
        );
      },
      error: (err) => console.log(err)
    });
  }
}
