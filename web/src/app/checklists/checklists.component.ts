import { Component, ElementRef, inputBinding, ViewChild } from '@angular/core';
import { Check, CheckComponent } from '../check/check.component';

@Component({
    selector: 'aircap-checklists',
    imports: [CheckComponent],
    templateUrl: './checklists.component.html',
    styleUrl: './checklists.component.scss',
})
export class ChecklistsComponent {
    protected checks: Check[] = [];
    @ViewChild('input') input!: ElementRef<HTMLTextAreaElement>;
    generate() {
        const text = this.input.nativeElement.value;
        const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');

        this.checks = this.recursiveChecks(lines);
    }

    recursiveChecks(lines: string[]): Check[] {
        const checks = [];
        let currentCheck: Check = undefined!;
        let recursiveLines: string[] = [];
        for (const line of lines) {
            if (!currentCheck && !line.startsWith('-')) throw Error('Invalid format.');

            if (line.startsWith('- ')) {
                if (currentCheck) {
                    if (recursiveLines.length > 0) {
                        currentCheck.checks = this.recursiveChecks(recursiveLines);
                    }
                    checks.push(currentCheck);
                    recursiveLines = [];
                }

                currentCheck = {
                    title: line.split(':')[0].trim().slice(2),
                    action: line.split(':')[1]?.trim(),
                    checks: [],
                };
                continue;
            }

            if (line.startsWith('  > ')) {
                currentCheck.description = line.slice(4);
                continue;
            }

            recursiveLines.push(line.slice(2));
            continue;
        }

        if (recursiveLines.length > 0) {
            currentCheck.checks = this.recursiveChecks(recursiveLines);
            recursiveLines = [];
        }
        checks.push(currentCheck);
        console.log(checks);
        return checks;
    }
}
