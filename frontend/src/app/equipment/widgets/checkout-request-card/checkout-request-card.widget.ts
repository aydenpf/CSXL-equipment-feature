import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckoutRequestModel } from '../../checkoutRequest.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'checkout-request-card',
  templateUrl: './checkout-request-card.widget.html',
  styleUrls: ['./checkout-request-card.widget.css']
})
export class CheckoutRequestCard {
  @Input() checkoutRequests!: Observable<CheckoutRequestModel[]>;
  @Output() approveRequest = new EventEmitter<CheckoutRequestModel>();
  @Output() cancelRequest = new EventEmitter<CheckoutRequestModel>();

  columnsToDisplay = ['Name', 'Model', 'Action'];
}
