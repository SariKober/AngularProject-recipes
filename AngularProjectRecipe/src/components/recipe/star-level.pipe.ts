import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'starLevel',
	standalone: true,
})
export class StarLevelPipe implements PipeTransform {
	transform(starLevelPipe: number): string {
		let x = '';
		for (let i = 0; i < starLevelPipe; i++) x += '⭐';
		return x;
	}
}
