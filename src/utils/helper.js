import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

export function getDistance(dis) {
  return Math.round(dis / 100) / 10;
}

export function sortByDistance(data) {
  function compare(a, b) {
    if (a.dis > b.dis) {
      return 1;
    }
    if (b.dis > a.dis) {
      return -1;
    }
    return 0;
  }
  return data.sort(compare);
}

export function getNow() {
  return moment().format('llll');
}

export function formatMoney(currency) {
  return currency.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
