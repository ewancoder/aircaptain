import { Component, Input } from '@angular/core';

@Component({
    selector: 'aircap-check',
    imports: [],
    templateUrl: './check.component.html',
    styleUrl: './check.component.scss',
})
export class CheckComponent {
    isChecked = false;
    @Input({ required: true }) check!: Check;

    toggle() {
        this.isChecked = !this.isChecked;
    }
}

export interface Check {
    title: string;
    action?: string;
    description?: string;
    checks: Check[];
}
