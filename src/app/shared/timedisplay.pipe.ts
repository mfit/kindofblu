import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timedisplay'
})
export class TimedisplayPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const secsNum = value % 60;
    const minsNum = Math.floor(value / 60);

    const secs = ('' + secsNum).padStart(2, '0');
    const mins = ('' + minsNum).padStart(3, ' ');
    return mins + ":" + secs;
  }
}
