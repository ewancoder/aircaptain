import { Component, ElementRef, EventEmitter, Input, signal, ViewChild } from '@angular/core';
import { Daum, Profile } from '../model';
import { ButtonComponent, ButtonInfo } from '../button/button.component';
import { BehaviorSubject, distinct, filter, map, share } from 'rxjs';

// Button can be a "modifier" on any specific "layer"
// Button can switch to a specific "layer"
// Button can have a specific name/description for a specific layer (and printable per-layer map)

interface BtnConfig {
    name: string;
    x: number;
    y: number;
    class: string;
    w?: number;
    h?: number;
    r?: number;
}

const xMulti = 600 / 600;
const yMulti = 600 / 600;
@Component({
    selector: 'aircap-hc-profile',
    imports: [],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent {
    @ViewChild('svg') svg!: ElementRef<SVGSVGElement>;
    @Input({ required: true }) profile!: Profile;
    hoveredSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    buttonInfos: ButtonInfo[] = [];

    layers = ['Main', 'Radios'];
    currentLayer = 'Main';
    forPrinting = false;

    buttons: BtnConfig[] = [{ name: 'AP HDG', x: 220, y: 194, class: 'small' }];

    ngOnInit() {
        for (const btn of this.buttons) {
            if (btn.class === 'small') {
                btn.w = 30;
                btn.h = 30;
                btn.r = 5;
            }
        }
    }

    ngAfterViewInit() {
        console.log('svg', this.svg);
        this.svg.nativeElement.addEventListener('mousemove', (evt) => {
            const pt = this.svg.nativeElement.createSVGPoint();
            pt.x = evt.clientX;
            pt.y = evt.clientY;
            const svgCoords = pt.matrixTransform(this.svg.nativeElement.getScreenCTM()?.inverse());
            console.log(`x=${svgCoords.x.toFixed(1)}, y=${svgCoords.y.toFixed(1)}`);
        });
    }

    /*ngOnInit() {
        this.buttonInfos = this.profile.Data.map((daum) => this.getButtonInfo(daum));
        for (const key in this.buttons) {
            const button = this.buttons[key];
            button.x = button.x * xMulti;
            button.y = button.y * yMulti;
            button.r = button.r * ((xMulti + yMulti) / 2);
            button.w = button.w * xMulti;
            button.h = button.h * yMulti;
        }
    }

    getHovered$() {
        return this.hoveredSubject.asObservable().pipe(share());
    }

    switchLayer(layer: string) {
        this.currentLayer = layer;
    }

    buttons: Record<string, btn> = {
        b_hdg: { x: 207, y: 195, r: 5, w: 30, h: 30, name: 'AP HDG' },
        b_nav: {
            x: 237,
            y: 195,
            r: 5,
            w: 30,
            h: 30,
            name: 'AP NAV',
        },
        b_apr: { x: 268, y: 195, r: 5, w: 30, h: 30, name: 'AP APR' },
        b_rev: { x: 299, y: 195, r: 5, w: 30, h: 30 },
        b_alt: { x: 333, y: 195, r: 5, w: 30, h: 30 },
        b_vs: { x: 364, y: 195, r: 5, w: 30, h: 30 },
        b_ias: { x: 397, y: 195, r: 5, w: 30, h: 30 },
        b_ap: { x: 512, y: 195, r: 5, w: 35, h: 35 },
        b_t1: { x: 184, y: 289, r: 5, w: 30, h: 50 },
        b_t2: { x: 225, y: 289, r: 5, w: 30, h: 50 },
        b_t3: { x: 263, y: 289, r: 5, w: 30, h: 50 },
        b_t4: { x: 304, y: 289, r: 5, w: 30, h: 50 },
        b_t5: { x: 342, y: 289, r: 5, w: 30, h: 50 },
        b_t6: { x: 380, y: 289, r: 5, w: 30, h: 50 },
        b_t7: { x: 419, y: 289, r: 5, w: 30, h: 50 },
        b_fcu: { x: 151, y: 197, r: 25, w: 50, h: 50 },
        b_rotary: { x: 442, y: 197, r: 25, w: 50, h: 50 },
    };
    hovered: string | null = null;
    previousHovered: string | null = null;

    draw(cnv: HTMLCanvasElement) {
        const width = 600;
        const height = 600;
        const ctx = cnv.getContext('2d')!;
        ctx.clearRect(0, 0, width, height);

        if (this.hovered && this.buttons[this.hovered]) {
            const { x, y, r, w, h, name, tooltipPosition } = this.buttons[this.hovered];
            if (this.hovered.startsWith('l'))
                drawRectHighlight(ctx, x, y, w, h, r, 'rgba(50, 170, 250, 0.6)');
            else drawRectHighlight(ctx, x, y, w, h, r);

            if (name && !this.forPrinting) {
                drawRectHighlight(
                    ctx,
                    x,
                    tooltipPosition === ToolTipPosition.Bottom ? y + h / 2 + 22 : y - h / 2 - 22,
                    70,
                    30,
                    15,
                    'rgba(255, 255, 255, 1)',
                    true,
                    name,
                );
            }
        }

        if (this.forPrinting) {
            for (const key in this.buttons) {
                const { x, y, r, w, h, name, tooltipPosition } = this.buttons[key];
                if (!name) continue;
                drawRectHighlight(
                    ctx,
                    x,
                    tooltipPosition === ToolTipPosition.Bottom ? y + h / 2 + 22 : y - h / 2 - 22,
                    70,
                    30,
                    15,
                    'rgba(255, 255, 255, 1)',
                    true,
                    name,
                );
            }
        }
    }

    ngAfterViewInit() {
        var cnv = this.canvas.nativeElement;
        this.draw(cnv);

        cnv.addEventListener('mousemove', (e) => {
            const rect = cnv.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            console.log(mx, my);
            this.previousHovered = this.hovered;
            this.hovered = null;
            for (const btn in this.buttons) {
                const { x, y, r, w, h } = this.buttons[btn];
                const top = y - h / 2;
                const bottom = y + h / 2;
                const left = x - h / 2;
                const right = x + h / 2;
                if (mx >= left && mx <= right && my >= top && my <= bottom) {
                    this.hovered = btn;
                    break;
                }
            }
            if (this.previousHovered != this.hovered) {
                if (this.hovered) {
                    cnv.style.cursor = 'pointer';
                } else {
                    cnv.style.cursor = 'default';
                }
                this.hoveredSubject.next(this.hovered);
                this.draw(cnv);
            }
        });
    }

    getButtonInfo(button: Daum): ButtonInfo {
        return {
            profile: button,
            name: this.getButtonName(button.ButtonNumber),
        };
    }

    getButtonName(buttonNumber: number) {
        switch (buttonNumber) {
            case 0:
                return 'AP HDG';
            default:
                return 'unknown';
        }
    }*/
}

function drawRectHighlight(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    color: string = 'rgba(250, 170, 50, 0.6',
    bordered?: boolean,
    text?: string,
) {
    const left = x - w / 2;
    const top = y - h / 2;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(left, top, w, h, r);
    ctx.fill();
    if (text) {
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    }

    if (bordered) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        ctx.stroke();
    }
    //ctx.fillRect(left, top, w, h);
}

interface btn {
    x: number;
    y: number;
    r: number;
    w: number;
    h: number;
    led?: boolean;
    name?: string;
    tooltipPosition?: ToolTipPosition;
}

enum ToolTipPosition {
    Top = 0,
    Bottom = 1,
}

interface ButtonData {
    name: string;
    profile: Daum;
}
