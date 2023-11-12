import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EquipmentService } from '../equipment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-waiver',
  templateUrl: './waiver.component.html',
  styleUrls: ['./waiver.component.css']
})
export class WaiverComponent {
  onSubmit() {
    this.router.navigateByUrl(''); //TODO: route to checkout complete page if they signed the waiver
  }
  form = this.formBuilder.group({
    signature: ''
  });

  public static Route = {
    path: 'waiver',
    title: 'User Equipment Checkout',
    component: WaiverComponent
  };

  constructor(
    private formBuilder: FormBuilder,
    equipmentService: EquipmentService,
    public router: Router
  ) {}
}
