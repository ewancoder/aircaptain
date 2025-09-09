import { Component, ElementRef, ViewChild } from '@angular/core';
import { Profile, Root } from './model';
import { ProfileComponent } from './profile/profile.component';

@Component({
    selector: 'aircap-honeycomb',
    imports: [ProfileComponent],
    templateUrl: './honeycomb.component.html',
    styleUrl: './honeycomb.component.scss',
})
export class HoneycombComponent {
    @ViewChild('input') input!: ElementRef<HTMLTextAreaElement>;
    profiles: Profile[] = [];
    currentProfile: Profile = {
        Version: 1,
        SaveName: 'New',
        ConfiguratorSettings: {
            device: 'Bravo Throttle Quadrant',
        },
        Data: [],
        LEDs: [],
    };

    load() {
        const content = this.input.nativeElement.value;
        const object = JSON.parse(content) as Root;
        console.log(object);
        this.profiles = object.profiles;
    }

    loadProfile(profile: Profile) {
        this.currentProfile = profile;
    }
}
