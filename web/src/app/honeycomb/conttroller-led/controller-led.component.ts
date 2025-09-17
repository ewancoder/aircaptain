import { Component, Input } from '@angular/core';
import { Led, LedCondition } from '../model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'aircap-hc-controller-led',
    imports: [FormsModule],
    templateUrl: './controller-led.component.html',
    styleUrl: './controller-led.component.scss',
})
export class ControllerLedComponent {
    @Input({ required: true }) led!: Led;
    @Input({ required: true }) buttonName!: string | undefined;
    @Input() buttonSubName: string | undefined;
    addCondition() {
        this.led.Conditions.push({
            Condition: '',
            ConditionValue: '',
            ConditionIsCustom: true,
        });
    }
    deleteCondition(condition: LedCondition) {
        if (condition.Condition && !confirm(`Delete condition "${condition.Condition}"?`)) return;
        const found = this.led.Conditions.indexOf(condition);
        if (found >= 0) {
            this.led.Conditions.splice(found, 1);
        }
    }
}
