import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Daum } from '../model';
import { Observable } from 'rxjs';

@Component({
    selector: 'aircap-hc-button',
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent {
    @Input({ required: true }) button!: Daum;
}

export interface ButtonInfo {
    profile: Daum;
    name: string;
}
