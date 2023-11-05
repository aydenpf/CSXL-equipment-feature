import { Component } from '@angular/core';
import { EquipmentCard } from '../widgets/equipment-card/equipment-card.widget';

@Component({
  selector: 'app-user-equipment',
  templateUrl: './user-equipment.component.html',
  styleUrls: ['./user-equipment.component.css']
})
export class UserEquipmentComponent {
  public static Route = {
    path: 'user-equipment',
    title: 'User Equipment Checkout',
    component: UserEquipmentComponent
  };
}
