import { Component, Input } from '@angular/core';
import { Daum } from '../model';
import { EventComponent } from '../event/event.component';

@Component({
    selector: 'aircap-hc-controller-button',
    imports: [EventComponent],
    templateUrl: './controller-button.component.html',
    styleUrl: './controller-button.component.scss',
})
export class ControllerButtonComponent {
    @Input({ required: true }) button!: Daum;
    newPressEvent() {
        this.button.PressEvent.push({
            Variables: [],
            Variable: '',
            Value: '',
            Name: '',
            Condition: '',
            ConditionValue: '',
            ConditionLogic: '',
            Conditions: [],
            Repeat: 0,
        });
        console.log(this.button);
    }
    newReleaseEvent() {
        this.button.ReleaseEvent.push({
            Variables: [],
            Variable: '',
            Value: '',
            Name: '',
            Condition: '',
            ConditionValue: '',
            ConditionLogic: '',
            Conditions: [],
            Repeat: 0,
        });
    }
}
