import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEquipmentComponent } from './user-equipment/user-equipment.component';
import { EquipmentCard } from './widgets/equipment-card/equipment-card.widget';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  //  eslint-disable-next-line prettier/prettier
  declarations: [UserEquipmentComponent, EquipmentCard],
  imports: [CommonModule, MatCardModule]
})
export class EquipmentModule {}
