import { Component, Input } from '@angular/core';
import { Condition, PressReleaseEvent, Variable } from '../model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'aircap-hc-event',
    imports: [FormsModule],
    templateUrl: './event.component.html',
    styleUrl: './event.component.scss',
})
export class EventComponent {
    @Input({ required: true }) event!: PressReleaseEvent;

    addCondition() {
        this.event.Conditions.push({
            Variable: '',
            Value: '',
            VariableIsCustom: false,
            VariableBoundaries: {
                MinValue: '',
                MaxValue: '',
                Clamp: false,
            },
            Condition: '',
            ConditionValue: '',
            ConditionIsCustom: true,
        });
    }
    addVariable() {
        this.event.Variables.push({
            Variable: '',
            Value: '',
            VariableIsCustom: true,
            VariableBoundaries: {
                MinValue: '',
                MaxValue: '',
                Clamp: false,
            },
        });
    }
    deleteCondition(condition: Condition) {
        const found = this.event.Conditions.indexOf(condition);
        if (found >= 0) {
            this.event.Conditions.splice(found, 1);
        }
    }
    deleteVariable(variable: Variable) {
        const found = this.event.Variables.indexOf(variable);
        if (found >= 0) {
            this.event.Variables.splice(found, 1);
        }
    }
}
