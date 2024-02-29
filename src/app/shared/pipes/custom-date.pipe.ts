import { Pipe, PipeTransform } from '@angular/core';

import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string): string {
    const dateObject = new Date(value);
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(dateObject, 'dd-MM-yyyy')!;
  }

}
