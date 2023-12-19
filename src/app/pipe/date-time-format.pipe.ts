import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat',
  standalone: true
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    const timestampInMilliseconds = value * 1000;
    const date = new Date(timestampInMilliseconds);
    return date.toLocaleString().toLocaleUpperCase()
  }

}
