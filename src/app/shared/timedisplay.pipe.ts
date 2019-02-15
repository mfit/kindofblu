import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timedisplay'
})
export class TimedisplayPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const secs = ('' + (value % 60)).padStart(2, '0');
    const mins = ('' + Math.round(value / 60)).padStart(3, ' ');
    return mins + ":" + secs;
  }
}
