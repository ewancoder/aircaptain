import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    @Output() eventDeleted = new EventEmitter<void>();

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
        if (condition.Condition && !confirm(`Delete condition "${condition.Condition}"?`)) return;
        const found = this.event.Conditions.indexOf(condition);
        if (found >= 0) {
            this.event.Conditions.splice(found, 1);
        }
    }
    deleteVariable(variable: Variable) {
        if (variable.Variable && !confirm(`Delete variable "${variable.Variable}"?`)) return;
        const found = this.event.Variables.indexOf(variable);
        if (found >= 0) {
            this.event.Variables.splice(found, 1);
        }
    }
    deleteEvent() {
        this.eventDeleted.emit();
    }
}
