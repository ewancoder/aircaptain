import { Component, Input } from '@angular/core';
import { Profile } from '../model';

@Component({
    selector: 'aircap-hc-profile-card',
    imports: [],
    templateUrl: './profile-card.component.html',
    styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
    @Input({ required: true }) profile!: Profile;
}
