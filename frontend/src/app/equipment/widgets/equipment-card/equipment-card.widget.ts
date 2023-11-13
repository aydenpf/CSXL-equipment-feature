/**
 * The Equipment Card widget abstracts the implementation of each
 * individual equipment card from the whole equipment page.
 */

import { Component, Input } from '@angular/core';
import { EquipmentType } from '../../equipmentType.model';
import { Router } from '@angular/router';
import { Profile, ProfileService } from 'src/app/profile/profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'equipment-card',
  templateUrl: './equipment-card.widget.html',
  styleUrls: ['./equipment-card.widget.css']
})
export class EquipmentCard {
  /** Inputs and outputs go here */
  public profile$: Observable<Profile | undefined>;
  @Input() equipmentType!: EquipmentType;

  constructor(
    public router: Router,
    private profileService: ProfileService
  ) {
    this.profile$ = this.profileService.profile$;
  }
}
