import { Component, ElementRef, ViewChild } from '@angular/core';
import { PressReleaseEvent, Profile, Root } from './model';
import { Button, ProfileComponent } from './profile/profile.component';
import { ButtonComponent } from './button/button.component';

@Component({
    selector: 'aircap-honeycomb',
    imports: [ProfileComponent, ButtonComponent],
    templateUrl: './honeycomb.component.html',
    styleUrl: './honeycomb.component.scss',
})
export class HoneycombComponent {
    @ViewChild('profileInput') input!: ElementRef<HTMLTextAreaElement>;
    selectedButton: Button | null = null;
    profiles: Profile[] = [
        {
            Version: 1,
            SaveName: 'New',
            ConfiguratorSettings: {
                device: 'Bravo Throttle Quadrant',
            },
            Data: [],
            LEDs: [],
        },
    ];

    currentProfile!: Profile;

    ngOnInit() {
        this.currentProfile = this.profiles[0];
    }

    copyProfileToClipboard() {
        navigator.clipboard.writeText(JSON.stringify(this.profiles));
    }

    load() {
        const content = this.input.nativeElement.value;
        const object = JSON.parse(content) as Root;
        console.log('Before normalization', object);
        for (const profile of object.profiles) {
            this.normalize(profile);
        }
        console.log('After normalization', object);
        this.profiles = object.profiles;
        this.currentProfile = this.profiles[0];
    }

    loadProfile(profile: Profile) {
        this.currentProfile = profile;
    }

    selectButton(button: Button | null) {
        this.selectedButton = button;
    }

    normalize(profile: Profile) {
        for (const btn of profile.Data) {
            for (const evt of btn.PressEvent) {
                this.normalizeEvt(evt);
            }

            for (const evt of btn.ReleaseEvent) {
                this.normalizeEvt(evt);
            }
        }
    }

    normalizeEvt(evt: PressReleaseEvent) {
        if (evt.Condition && evt.Condition.trim().length > 0) {
            evt.Conditions.push({
                Condition: evt.Condition,
                ConditionIsCustom: true,
                ConditionValue: evt.ConditionValue,
                Value: '',
                Variable: '',
                VariableBoundaries: {
                    Clamp: false,
                    MaxValue: '',
                    MinValue: '',
                },
                VariableIsCustom: false,
            });
            evt.Condition = '';
            evt.ConditionValue = '';
        }

        if (evt.Variable && evt.Variable.trim().length > 0) {
            evt.Variables.push({
                Variable: evt.Variable,
                VariableIsCustom: true,
                Value: evt.Value,
                VariableBoundaries: {
                    Clamp: false,
                    MaxValue: '',
                    MinValue: '',
                },
            });
            evt.Variable = '';
            evt.Value = '';
        }
    }
}
