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

@NgModule({
  declarations: [UserEquipmentComponent, EquipmentCard, WaiverComponent],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class EquipmentModule {}
