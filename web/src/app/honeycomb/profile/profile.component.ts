import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

// Button can be a "modifier" on any specific "layer"
// Button can switch to a specific "layer"
// Button can have a specific name/description for a specific layer (and printable per-layer map)

export interface Button {
    name: string;
    x: number;
    y: number;
    class?: string;
    w?: number;
    h?: number;
    r?: number;
    controllerLeds?: ControllerLed[];
    controllerButtons?: ControllerButton[];
}

export interface ControllerButton {
    name?: string;
    buttonNumber: number;
}

export interface ControllerLed {
    name?: string;
    byteIndex: number;
    bitIndex: number;
}

@Component({
    selector: 'aircap-hc-profile',
    imports: [],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
    @ViewChild('svg') svg!: ElementRef<SVGSVGElement>;
    @Output() buttonSelected = new EventEmitter<Button | null>();
    selectedButton: Button | null = null;
    showInteractibles = false;

    protected buttons: Button[] = [
        {
            name: 'AP HDG',
            x: 220,
            y: 194,
            class: 'small',
            controllerButtons: [{ buttonNumber: 0 }],
            controllerLeds: [
                {
                    byteIndex: 1,
                    bitIndex: 0,
                },
            ],
        },
        {
            name: 'AP NAV',
            x: 247,
            y: 194,
            class: 'small',
            controllerButtons: [{ buttonNumber: 1 }],
            controllerLeds: [
                {
                    byteIndex: 1,
                    bitIndex: 1,
                },
            ],
        },
        {
            name: 'AP APR',
            x: 274,
            y: 194,
            class: 'small',
            controllerButtons: [{ buttonNumber: 2 }],
            controllerLeds: [
                {
                    byteIndex: 1,
                    bitIndex: 2,
                },
            ],
        },
        {
            name: 'AP REV',
            x: 301,
            y: 194,
            class: 'small',
            controllerButtons: [{ buttonNumber: 3 }],
            controllerLeds: [
                {
                    byteIndex: 1,
                    bitIndex: 3,
                },
            ],
        },
        {
            name: 'AP ALT',
            x: 328,
            y: 194,
            class: 'small',
            controllerButtons: [{ buttonNumber: 4 }],
            controllerLeds: [
                {
                    byteIndex: 1,
                    bitIndex: 4,
                },
            ],
        },
        {
            name: 'AP VS',
            x: 355,
            y: 194,
            class: 'small',
            controllerButtons: [{ buttonNumber: 5 }],
            controllerLeds: [
                {
                    byteIndex: 1,
                    bitIndex: 5,
                },
            ],
        },
        {
            name: 'AP IAS',
            x: 382,
            y: 194,
            class: 'small',
            controllerButtons: [{ buttonNumber: 6 }],
            controllerLeds: [
                {
                    byteIndex: 1,
                    bitIndex: 6,
                },
            ],
        },
        {
            name: 'FCU',
            x: 178,
            y: 196,
            class: 'large',
            controllerButtons: [
                { name: 'IAS', buttonNumber: 16 },
                { name: 'CRS', buttonNumber: 17 },
                { name: 'HDG', buttonNumber: 18 },
                { name: 'VS', buttonNumber: 19 },
                { name: 'ALT', buttonNumber: 20 },
            ],
        },
        {
            name: 'Rotary',
            x: 419,
            y: 196,
            class: 'large',
            controllerButtons: [
                { name: 'Increase', buttonNumber: 12 },
                { name: 'Decrease', buttonNumber: 13 },
            ],
        },
        {
            name: 'AP - autopilot toggle',
            x: 479,
            y: 195,
            w: 38,
            h: 38,
            r: 10,
            controllerButtons: [{ buttonNumber: 7 }],
            controllerLeds: [
                {
                    byteIndex: 1,
                    bitIndex: 7,
                },
            ],
        },
        {
            name: 'Gear',
            x: 85,
            y: 303,
            w: 70,
            h: 90,
            r: 15,
            controllerButtons: [
                { name: 'Up', buttonNumber: 30 },
                { name: 'Down', buttonNumber: 31 },
            ],
        },
        {
            name: 'Toggle 1',
            x: 202,
            y: 292,
            class: 'toggle',
            controllerButtons: [
                { name: 'On', buttonNumber: 33 },
                { name: 'Off', buttonNumber: 34 },
            ],
        },
        {
            name: 'Toggle 2',
            x: 235,
            y: 292,
            class: 'toggle',
            controllerButtons: [
                { name: 'On', buttonNumber: 35 },
                { name: 'Off', buttonNumber: 36 },
            ],
        },
        {
            name: 'Toggle 3',
            x: 268,
            y: 292,
            class: 'toggle',
            controllerButtons: [
                { name: 'On', buttonNumber: 37 },
                { name: 'Off', buttonNumber: 38 },
            ],
        },
        {
            name: 'Toggle 4',
            x: 301,
            y: 292,
            class: 'toggle',
            controllerButtons: [
                { name: 'On', buttonNumber: 39 },
                { name: 'Off', buttonNumber: 40 },
            ],
        },
        {
            name: 'Toggle 5',
            x: 334,
            y: 292,
            class: 'toggle',
            controllerButtons: [
                { name: 'On', buttonNumber: 41 },
                { name: 'Off', buttonNumber: 42 },
            ],
        },
        {
            name: 'Toggle 6',
            x: 367,
            y: 292,
            class: 'toggle',
            controllerButtons: [
                { name: 'On', buttonNumber: 43 },
                { name: 'Off', buttonNumber: 44 },
            ],
        },
        {
            name: 'Toggle 7',
            x: 399,
            y: 292,
            class: 'toggle',
            controllerButtons: [
                { name: 'On', buttonNumber: 45 },
                { name: 'Off', buttonNumber: 46 },
            ],
        },
        {
            name: 'Flaps',
            x: 504,
            y: 290,
            w: 70,
            h: 64,
            r: 15,
            controllerButtons: [
                { name: 'Down', buttonNumber: 14 },
                { name: 'Up', buttonNumber: 15 },
            ],
        },
        {
            name: 'Trim Wheel',
            x: 118,
            y: 479,
            w: 56,
            h: 240,
            r: 15,
            controllerButtons: [
                { name: 'Up (trim down)', buttonNumber: 21 },
                { name: 'Down (trim up)', buttonNumber: 22 },
            ],
        },
        {
            name: 'Throttle 1',
            x: 167,
            y: 554,
            class: 'throttle',
            controllerButtons: [{ name: 'Detent', buttonNumber: 23 }],
        },
        {
            name: 'Throttle 2',
            x: 219,
            y: 554,
            class: 'throttle',
            controllerButtons: [
                { name: 'Reverse', buttonNumber: 8 },
                { name: 'Detent', buttonNumber: 24 },
                { name: 'TOGA', buttonNumber: 28 },
            ],
        },
        {
            name: 'Throttle 3',
            x: 273,
            y: 554,
            class: 'throttle',
            controllerButtons: [
                { name: 'Reverse', buttonNumber: 9 },
                { name: 'Detent', buttonNumber: 25 },
                { name: 'TOGA', buttonNumber: 29 },
            ],
        },
        {
            name: 'Throttle 4',
            x: 327,
            y: 554,
            class: 'throttle',
            controllerButtons: [
                { name: 'Reverse', buttonNumber: 10 },
                { name: 'Detent', buttonNumber: 26 },
                { name: 'TOGA', buttonNumber: 47 },
            ],
        },
        {
            name: 'Throttle 5',
            x: 379,
            y: 554,
            class: 'throttle',
            controllerButtons: [
                { name: 'Reverse', buttonNumber: 11 },
                { name: 'Detent', buttonNumber: 27 },
            ],
        },
        {
            name: 'Throttle 6',
            x: 434,
            y: 554,
            class: 'throttle',
            controllerButtons: [{ name: 'Detent', buttonNumber: 32 }],
        },
        {
            name: 'Led MASTER (When ALL lights should be working)',
            x: 300,
            y: 120,
            h: 80,
            w: 400,
            r: 10,
            controllerLeds: [
                {
                    byteIndex: 0,
                    bitIndex: 0,
                },
            ],
        },
        {
            name: 'Led Warning',
            x: 202,
            y: 347,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 2,
                    bitIndex: 6,
                },
            ],
        },
        {
            name: 'Caution',
            x: 202,
            y: 363,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 3,
                    bitIndex: 5,
                },
            ],
        },
        {
            name: 'Engine Fire',
            x: 232,
            y: 347,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 2,
                    bitIndex: 7,
                },
            ],
        },
        {
            name: 'Vacuum',
            x: 232,
            y: 363,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 3,
                    bitIndex: 6,
                },
            ],
        },
        {
            name: 'Low Oil Pressure',
            x: 262,
            y: 347,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 3,
                    bitIndex: 0,
                },
            ],
        },
        {
            name: 'Low Hyd Pressure',
            x: 262,
            y: 363,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 3,
                    bitIndex: 7,
                },
            ],
        },
        {
            name: 'Low Fuel Pressure',
            x: 292,
            y: 347,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 3,
                    bitIndex: 1,
                },
            ],
        },
        {
            name: 'Aux Fuel Pump',
            x: 292,
            y: 363,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 4,
                    bitIndex: 0,
                },
            ],
        },
        {
            name: 'Anti Ice',
            x: 322,
            y: 347,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 3,
                    bitIndex: 2,
                },
            ],
        },
        {
            name: 'Parking Brake',
            x: 322,
            y: 363,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 4,
                    bitIndex: 1,
                },
            ],
        },
        {
            name: 'Starter Engaged',
            x: 352,
            y: 347,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 3,
                    bitIndex: 3,
                },
            ],
        },
        {
            name: 'Low Volts',
            x: 352,
            y: 363,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 4,
                    bitIndex: 2,
                },
            ],
        },
        {
            name: 'Apu',
            x: 382,
            y: 347,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 3,
                    bitIndex: 4,
                },
            ],
        },
        {
            name: 'Door',
            x: 382,
            y: 363,
            class: 'led',
            controllerLeds: [
                {
                    byteIndex: 4,
                    bitIndex: 3,
                },
            ],
        },
        {
            name: 'Gear Top',
            x: 88,
            y: 204,
            w: 34,
            h: 22,
            r: 5,
            controllerLeds: [
                { name: 'Green', byteIndex: 2, bitIndex: 2 },
                { name: 'Red', byteIndex: 2, bitIndex: 3 },
            ],
        },
        {
            name: 'Gear Left',
            x: 74,
            y: 234,
            w: 26,
            h: 28,
            r: 5,
            controllerLeds: [
                { name: 'Green', byteIndex: 2, bitIndex: 0 },
                { name: 'Red', byteIndex: 2, bitIndex: 1 },
            ],
        },
        {
            name: 'Gear Right',
            x: 112,
            y: 234,
            w: 26,
            h: 28,
            r: 5,
            controllerLeds: [
                { name: 'Green', byteIndex: 2, bitIndex: 4 },
                { name: 'Red', byteIndex: 2, bitIndex: 5 },
            ],
        },
    ];

    ngOnInit() {
        this.initializeButtonSizes();
    }

    selectButton(button: Button, evt: MouseEvent) {
        this.selectedButton = button;
        this.buttonSelected.emit(button);
        evt.stopPropagation(); // So that we do not deselect a button right after selecting it.
    }

    deselectButton() {
        this.selectedButton = null;
        this.buttonSelected.emit(null);
    }

    private initializeButtonSizes() {
        for (const btn of this.buttons) {
            if (btn.class === 'small') {
                btn.w = 30;
                btn.h = 30;
                btn.r = 5;
            }
            if (btn.class === 'large') {
                btn.w = 50;
                btn.h = 50;
                btn.r = 30;
            }
            if (btn.class === 'toggle') {
                btn.w = 26;
                btn.h = 52;
                btn.r = 4;
            }
            if (btn.class === 'throttle') {
                btn.w = 40;
                btn.h = 100;
                btn.r = 15;
            }
            if (btn.class === 'led') {
                btn.w = 30;
                btn.h = 16;
                btn.r = 1;
            }
        }
    }

    ngAfterViewInit() {
        // Log coordinates for debugging.
        this.svg.nativeElement.addEventListener('mousemove', (evt) => {
            const pt = this.svg.nativeElement.createSVGPoint();
            pt.x = evt.clientX;
            pt.y = evt.clientY;
            const svgCoords = pt.matrixTransform(this.svg.nativeElement.getScreenCTM()?.inverse());
            console.log(`x=${svgCoords.x.toFixed(1)}, y=${svgCoords.y.toFixed(1)}`);
        });
    }
}
