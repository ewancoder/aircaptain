import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// Button can be a "modifier" on any specific "layer"
// Button can switch to a specific "layer"
// Button can have a specific name/description for a specific layer (and printable per-layer map)

interface Button {
    name: string;
    x: number;
    y: number;
    class: string;
    w?: number;
    h?: number;
    r?: number;
}

@Component({
    selector: 'aircap-hc-profile',
    imports: [],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
    @ViewChild('svg') svg!: ElementRef<SVGSVGElement>;

    protected buttons: Button[] = [
        { name: 'AP HDG', x: 220, y: 194, class: 'small' },
        { name: 'AP NAV', x: 247, y: 194, class: 'small' },
    ];

    ngOnInit() {
        this.initializeButtonSizes();
    }

    private initializeButtonSizes() {
        for (const btn of this.buttons) {
            if (btn.class === 'small') {
                btn.w = 30;
                btn.h = 30;
                btn.r = 5;
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
