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
    @Input({ required: true }) buttonName!: string | undefined;
    @Input({ required: true }) buttonSubName!: string | undefined;
    sort(events: PressReleaseEvent[]) {
        return events.sort((a, b) => a.Name.localeCompare(b.Name));
    }
    newPressEvent() {
        let repeat = 0;
        if (
            this.button.ButtonNumber === 21 ||
            this.button.ButtonNumber === 22 ||
            this.button.ButtonNumber === 12 ||
            this.button.ButtonNumber === 13
        ) {
            repeat = 3;
        }
        this.button.PressEvent.push({
            Variables: [],
            Variable: '',
            Value: '',
            Name: '___Button ' + (this.buttonName ?? this.button.ButtonNumber) + ' is pressed',
            Condition: '',
            ConditionValue: '',
            ConditionLogic: 'AND',
            Conditions: [],
            Repeat: repeat,
        });
        console.log(this.button);
    }
    newReleaseEvent() {
        let repeat = 0;
        this.button.ReleaseEvent.push({
            Variables: [],
            Variable: '',
            Value: '',
            Name: '___Button ' + (this.buttonName ?? this.button.ButtonNumber) + ' is released',
            Condition: '',
            ConditionValue: '',
            ConditionLogic: 'AND',
            Conditions: [],
            Repeat: repeat,
        });
    }
    del(event: PressReleaseEvent) {
        if (!confirm('Delete event "' + event.Name + '"?')) return;
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
