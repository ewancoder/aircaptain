import { Component, Input } from '@angular/core';
import { PressReleaseEvent } from '../model';

@Component({
    selector: 'aircap-hc-event',
    imports: [],
    templateUrl: './event.component.html',
    styleUrl: './event.component.scss',
})
export class EventComponent {
    @Input({ required: true }) event!: PressReleaseEvent;
}
