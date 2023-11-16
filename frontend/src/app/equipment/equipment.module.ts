import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* UI Widgets */
import { UserEquipmentComponent } from './user-equipment/user-equipment.component';
import { WaiverComponent } from './waiver/waiver.component';

/* Angular Material Modules */
import { EquipmentCard } from './widgets/equipment-card/equipment-card.widget';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentService } from './equipment.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EquipmentCheckoutConfirmationComponent } from './equipment-checkout-confirmation/equipment-checkout-confirmation.component';
import { AmbassadorEquipmentComponent } from './ambassador-equipment/ambassador-equipment.component';
import { CheckoutRequestCard } from './widgets/checkout-request-card/checkout-request-card.widget';
import { MatTableModule } from '@angular/material/table';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    UserEquipmentComponent,
    EquipmentCard,
    WaiverComponent,
    EquipmentCheckoutConfirmationComponent,
    AmbassadorEquipmentComponent,
    CheckoutRequestCard
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class EquipmentModule {}
