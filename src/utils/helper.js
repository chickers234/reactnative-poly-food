import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');
import Toast from 'react-native-simple-toast';

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

export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  var re = /(\+84|0)([35789]\d{8}|1\d{9})$/g;
  return re.test(phone);
};

export const CustomToast = (str) => {
  Toast.show(str);
};
