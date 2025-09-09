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
    controllerLed?: ControllerLed;
    controllerButtons?: ControllerButton[];
}

export interface ControllerButton {
    name?: string;
    buttonNumber: number;
}

interface ControllerLed {
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
        },
        {
            name: 'AP NAV',
            x: 247,
            y: 194,
            class: 'small',
            controllerButtons: [{ buttonNumber: 1 }],
        },
        {
            name: 'AP APR',
            x: 274,
            y: 194,
            class: 'small',
            controllerButtons: [{ buttonNumber: 2 }],
        },
        { name: 'AP REV', x: 301, y: 194, class: 'small' },
        { name: 'AP ALT', x: 328, y: 194, class: 'small' },
        { name: 'AP VS', x: 355, y: 194, class: 'small' },
        { name: 'AP IAS', x: 382, y: 194, class: 'small' },
        { name: 'FCU', x: 178, y: 196, class: 'large' },
        { name: 'Rotary', x: 419, y: 196, class: 'large' },
        { name: 'AP', x: 479, y: 195, w: 38, h: 38, r: 10 },
        {
            name: 'Gear',
            x: 85,
            y: 303,
            w: 70,
            h: 90,
            r: 15,
            controllerButtons: [
                { name: 'Gear Up', buttonNumber: 30 },
                { name: 'Gear Down', buttonNumber: 31 },
            ],
        },
        { name: 'Toggle 1', x: 202, y: 292, class: 'toggle' },
        { name: 'Toggle 2', x: 235, y: 292, class: 'toggle' },
        { name: 'Toggle 3', x: 268, y: 292, class: 'toggle' },
        { name: 'Toggle 4', x: 301, y: 292, class: 'toggle' },
        { name: 'Toggle 5', x: 334, y: 292, class: 'toggle' },
        { name: 'Toggle 6', x: 367, y: 292, class: 'toggle' },
        { name: 'Toggle 7', x: 399, y: 292, class: 'toggle' },
        { name: 'Flaps', x: 504, y: 290, w: 70, h: 64, r: 15 },
        { name: 'Trim Wheel', x: 118, y: 479, w: 56, h: 240, r: 15 },
        { name: 'Throttle 1', x: 167, y: 554, class: 'throttle' },
        { name: 'Throttle 2', x: 219, y: 554, class: 'throttle' },
        { name: 'Throttle 3', x: 273, y: 554, class: 'throttle' },
        { name: 'Throttle 4', x: 327, y: 554, class: 'throttle' },
        { name: 'Throttle 5', x: 379, y: 554, class: 'throttle' },
        { name: 'Throttle 6', x: 434, y: 554, class: 'throttle' },
        {
            name: 'Led Warning',
            x: 202,
            y: 347,
            class: 'led',
            controllerLed: {
                byteIndex: 2,
                bitIndex: 6,
            },
        },
        { name: 'Led Caution', x: 202, y: 363, class: 'led' },
        { name: 'Led Engine Fire', x: 232, y: 347, class: 'led' },
        { name: 'Led Vacuum', x: 232, y: 363, class: 'led' },
        { name: 'Led Low Oil Pressure', x: 262, y: 347, class: 'led' },
        { name: 'Led Low Hyd Pressure', x: 262, y: 363, class: 'led' },
        { name: 'Led Low Fuel Pressure', x: 292, y: 347, class: 'led' },
        { name: 'Led Aux Fuel Pump', x: 292, y: 363, class: 'led' },
        { name: 'Led Anti Ice', x: 322, y: 347, class: 'led' },
        { name: 'Led Parking Brake', x: 322, y: 363, class: 'led' },
        { name: 'Led Starter Engaged', x: 352, y: 347, class: 'led' },
        { name: 'Led Low Volts', x: 352, y: 363, class: 'led' },
        { name: 'Led Apu', x: 382, y: 347, class: 'led' },
        { name: 'Led Door', x: 382, y: 363, class: 'led' },
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
