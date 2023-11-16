import { Component, Input } from '@angular/core';
import { CheckoutRequestModel } from '../../checkoutRequest.model'

@Component({
  selector: 'checkout-request-card',
  templateUrl: './checkout-request-card.widget.html',
  styleUrls: ['./checkout-request-card.widget.css']
})
export class CheckoutRequestCard {
  @Input() checkoutRequests!: CheckoutRequestModel[];


}
