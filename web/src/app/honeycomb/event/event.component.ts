import { Component, Input } from '@angular/core';
import { PressReleaseEvent } from '../model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'aircap-hc-event',
    imports: [FormsModule],
    templateUrl: './event.component.html',
    styleUrl: './event.component.scss',
})
export class EventComponent {
    @Input({ required: true }) event!: PressReleaseEvent;
}
