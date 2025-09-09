import { Component, Input } from '@angular/core';
import { Daum, PressReleaseEvent } from '../model';
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
    del(event: PressReleaseEvent) {
        let index = this.button.PressEvent.indexOf(event);
        if (index >= 0) {
            this.button.PressEvent.splice(index, 1);
        }
        index = this.button.ReleaseEvent.indexOf(event);
        if (index >= 0) {
            this.button.ReleaseEvent.splice(index, 1);
        }
    }
}
