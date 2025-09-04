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
        let indentLevel = 0;
        const lines = text
            .split(/\r?\n/)
            .filter((line) => line.trim() !== '')
            .map((line) => {
                if (line.startsWith('# ')) {
                    line = '-' + line.slice(1);
                    indentLevel = 1;
                    return line;
                } else if (line.startsWith('## ')) {
                    line = '  -' + line.slice(2);
                    indentLevel = 2;
                    return line;
                } else if (line.startsWith('### ')) {
                    line = '    -' + line.slice(3);
                    indentLevel = 3;
                    return line;
                }

                return '  '.repeat(indentLevel) + line;
            });

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
