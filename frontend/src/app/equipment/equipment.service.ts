import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from './equipment.model';
import { EquipmentType } from './equipmentType.model';
import { ProfileService } from '../profile/profile.service';
import { CheckoutRequestModel } from './checkoutRequest.model';
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  constructor(
    private http: HttpClient,
    private profileSvc: ProfileService
  ) {}

  /** Returns all equipment entries from backend database table using backend HTTP get request
   * @returns {Observable<Equipment[]>}
   */
  getAllEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>('/api/equipment/get_all');
  }

  /** Returns all equipmentType objects from backend method using HTTP get request.
   * @returns {Observable<EquipmentType[]>}
   */
  getAllEquipmentTypes(): Observable<EquipmentType[]> {
    return this.http.get<EquipmentType[]>('/api/equipment/get_all_types');
  }

  /**
   * Delete a checkout request. Ambassador permissions required for this function.
   * @param user, equipmentCheckoutRequest
   * @returns None
   */
  deleteRequest() {
    //TODO
  }

  /**
   * Get all checkout requests
   * @param None
   * @returns Observable<CheckoutRequestModels[]>
   */
  getAllRequest(): Observable<CheckoutRequestModel[]> {
    return this.http.get<CheckoutRequestModel[]>(
      '/api/equipment/get_all_requests'
    );
  }

  /**
   * add a checkout request
   * @param user, checkout request obtject
   * @returns checkout request object
   */
  addRequest(): CheckoutRequestModel {
    let reqOne: CheckoutRequestModel = {
      user_name: 'jimmy',
      model: 'Meta Quest 3',
      pid: 444444444
    };

    return reqOne;
  }
}
