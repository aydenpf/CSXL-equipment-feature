import { EquipmentRoutingModule } from './equipment-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEquipmentComponent } from './user-equipment/user-equipment.component';
import { EquipmentCard } from './widgets/equipment-card/equipment-card.widget';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EquipmentService } from './equipment.service';
import { ReactiveFormsModule } from '@angular/forms';
import { WaiverComponent } from './waiver/waiver.component';

@NgModule({
  declarations: [UserEquipmentComponent, EquipmentCard, WaiverComponent],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class EquipmentModule {}
