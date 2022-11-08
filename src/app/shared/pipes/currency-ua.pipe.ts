import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyUa'
})
export class CurrencyUaPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string{
    let valArr = [...(value + '')];
    let last = valArr.slice(-1)[0];
    let lastTwo = valArr.slice(-2).join('');

    if (last === '1') {
      return value + ' гривня';
    } else if (
      lastTwo === '11' ||
      lastTwo === '12' ||
      lastTwo === '13' ||
      lastTwo === '14'
    ) {
      return value + ' гривень';
    } else if (last === '2' || last === '3' || last === '4') {
      return value + ' гривні';
    } else {
      return value + ' гривень';
    }
  }


}
