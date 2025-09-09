import { Component, Input } from '@angular/core';
import { Button, ControllerButton } from '../profile/profile.component';
import { ControllerButtonComponent } from '../controller-button/controller-button.component';
import { Profile } from '../model';

@Component({
    selector: 'aircap-hc-button',
    imports: [ControllerButtonComponent],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent {
    @Input({ required: true }) button!: Button;
    @Input({ required: true }) profile!: Profile;

    getControllerButton(button: ControllerButton) {
        let found = this.profile.Data.find((d) => d.ButtonNumber === button.buttonNumber);
        if (!found) {
            found = {
                ButtonNumber: button.buttonNumber,
                PressEvent: [],
                ReleaseEvent: [],
            };
            this.profile.Data.push(found);
        }

        return found;
    }
}
