import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Equipment } from './equipment.model';
import { EquipmentType } from './equipmentType.model';
import { Profile, ProfileService } from '../profile/profile.service';
import { CheckoutRequestModel } from './checkoutRequest.model';
import { EquipmentCheckoutModel } from './equipment-checkout.model';
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private profile: Profile | undefined;
  private profileSubscription!: Subscription;
  private currentCheckoutReturn: EquipmentCheckoutModel | undefined;

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

  /**
   * Retrieve all Equipment of a specific model type
   * @param model of the equipment to be retrieved
   * @returns list of equipment
   */
  getAllEquipmentByModel(model: String): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(
      `/api/equipment/get_equipment_for_request/${model}`
    );
  }

  /* * Update waiver_signed field for current user
   *
   * @returns Observable<Profile>
   */
  update_waiver_field(): Observable<Profile> {
    return this.http.put<Profile>(
      'api/equipment/update_waiver_field',
      this.profile
    );
  }

  /**
   * Create new equipmentCheckout model and post to backend
   * @param user_name, pid, equipment_id, model
   * @returns Observable<EquipmentCheckoutModel>
   */
  create_checkout(
    user_name: String,
    pid: Number,
    equipment_id: Number,
    model: String
  ): Observable<EquipmentCheckoutModel> {
    let currentDate = new Date();
    let threeDaysLater = new Date(currentDate);
    threeDaysLater.setDate(currentDate.getDate() + 3);
    let checkout = {
      user_name: user_name,
      pid: pid,
      equipment_id: equipment_id,
      model: model,
      is_active: true,
      started_at: currentDate,
      end_at: threeDaysLater
    };

    return this.http.post<EquipmentCheckoutModel>(
      '/api/equipment/create_checkout',
      checkout
    );
  }

  /**
   * Get all active Equipment checkout models from backend
   *
   * @returns Observable<EquipmentCheckoutModel[]>
   */
  get_all_active_checkouts(): Observable<EquipmentCheckoutModel[]> {
    return this.http.get<EquipmentCheckoutModel[]>(
      '/api/equipment/get_all_active_checkouts'
    );
  }

  /**
   * Updates the checkout model to be inactive and corresponding equipment model in backend
   *
   * @returns Observable<EquipmentCheckoutModel[]>
   */
  returnCheckout(
    checkout: EquipmentCheckoutModel
  ): Observable<EquipmentCheckoutModel> {
    console.log('return clicked');
    console.log(checkout.model);
    return this.http.put<EquipmentCheckoutModel>(
      '/api/equipment/return_checkout',
      checkout
    );
  }

  /**
   * setter for currentCheckoutReturn field
   * @param checkout the checkout object that will be checked back in (returned)
   */
  setCurrentCheckoutReturn(checkout: EquipmentCheckoutModel) {
    this.currentCheckoutReturn = checkout;
  }

  getCurrentCheckoutReturn(): EquipmentCheckoutModel {
    return this.currentCheckoutReturn!;
  }
}
