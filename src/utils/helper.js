import 'intl/locale-data/jsonp/en';

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

export function formatMoney(currency) {
  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'VND',
    minimumFractionDigits: 0,
  });

  return formatter.format(currency);
}
