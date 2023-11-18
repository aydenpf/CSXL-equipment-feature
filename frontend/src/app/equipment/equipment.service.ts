import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Equipment } from './equipment.model';
import { EquipmentType } from './equipmentType.model';
import { Profile, ProfileService } from '../profile/profile.service';
import { CheckoutRequestModel } from './checkoutRequest.model';
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private profile: Profile | undefined;
  private profileSubscription!: Subscription;

  constructor(
    private http: HttpClient,
    private profileSvc: ProfileService
  ) {
    this.profileSubscription = this.profileSvc.profile$.subscribe(
      (profile) => (this.profile = profile)
    );
  }

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
   * Creates a checkout request and adds it to backend database.
   * @param user, equipmentCheckoutRequest
   * @return equipmentCheckoutRequest
   * @throws WaiverNotSigned exception if user has not signed waiver.
   */
  addRequest(equipmentType: EquipmentType): Observable<CheckoutRequestModel> {
    if (this.profile === undefined) {
      throw new Error('Only allowed for logged in users.');
    }
    let modelName = equipmentType.model;
    let first_name = this.profile.first_name;
    let last_name = this.profile.last_name;
    let pid_value = this.profile.pid;
    let checkout_request = {
      user_name: `${first_name} ${last_name}`,
      model: modelName,
      pid: pid_value
    };
    console.log(checkout_request);
    return this.http.post<CheckoutRequestModel>(
      '/api/equipment/add_request',
      checkout_request
    );
  }

  /**
   * Delete a checkout request. Ambassador permissions required for this function.
   * @param user, equipmentCheckoutRequest
   * @returns None
   */
  deleteRequest(request: CheckoutRequestModel) {
    //formatting for delete request data
    const options = {
      headers: new HttpHeaders(),
      body: request // Here you put the body data
    };
    //make the api call
    return this.http.delete<CheckoutRequestModel>(
      '/api/equipment/delete_request',
      options
    );
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
   * Approve a checkout request
   * @param user, checkout request obtject
   * @returns checkout request object
   */
  approveRequest(request: CheckoutRequestModel) {
    console.log('Approved');
  }
}
