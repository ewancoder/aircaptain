import { Component, ElementRef, ViewChild } from '@angular/core';
import { Profile, Root } from './model';
import { Button, ProfileComponent } from './profile/profile.component';
import { ButtonComponent } from './button/button.component';

@Component({
    selector: 'aircap-honeycomb',
    imports: [ProfileComponent, ButtonComponent],
    templateUrl: './honeycomb.component.html',
    styleUrl: './honeycomb.component.scss',
})
export class HoneycombComponent {
    @ViewChild('input') input!: ElementRef<HTMLTextAreaElement>;
    selectedButton: Button | null = null;
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

    selectButton(button: Button | null) {
        this.selectedButton = button;
    }
}
