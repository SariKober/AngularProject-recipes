import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'duration',
	standalone: true,
})
export class DurationPipe implements PipeTransform {
	transform(durationInMinutes: number): string {
		const hours = Math.floor(durationInMinutes / 60);
		const minutes = durationInMinutes % 60;
		if (hours == 0) {
			return minutes.toString() + 'דקות';
		} else if (minutes == 0) {
			return `שעות:${hours}`;
		} else {
			return 'דקות:' + minutes.toString() + ' ' + hours.toString() + 'שעות:';
		}
	}
}
