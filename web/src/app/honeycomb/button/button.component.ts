import { Component, Input } from '@angular/core';
import { Button, ControllerButton, ControllerLed } from '../profile/profile.component';
import { ControllerButtonComponent } from '../controller-button/controller-button.component';
import { Profile } from '../model';
import { ControllerLedComponent } from '../conttroller-led/controller-led.component';

@Component({
    selector: 'aircap-hc-button',
    imports: [ControllerButtonComponent, ControllerLedComponent],
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

    getControllerLed(led: ControllerLed) {
        let found = this.profile.LEDs.find(
            (l) => l.BitIndex === led.bitIndex && l.ByteIndex === led.byteIndex,
        );
        if (!found) {
            found = {
                BitIndex: led.bitIndex,
                ByteIndex: led.byteIndex,
                ConditionLogic: 'AND',
                Conditions: [],
            };
            this.profile.LEDs.push(found);
        }

        return found;
    }
}
