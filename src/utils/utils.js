import moment from "moment";

export default class Utils {
  static generateId() {
    return Math.ceil(Math.random() * 10000000);
  }

  static validateCPass(pass, c_pass) {
    if (!!pass && c_pass !== pass) {
      return true;
    }
    return false;
  }

  static validateEmail(value) {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (regex.test(value) !== true) {
      return true;
    }
    return false;
  }

  static isNumber(str) {
    if (/^[0-9\b]+$/.test(str)) {
      return true;
    }
    return false;
  }

  static validatePhone(value) {
    if (value.length < 8 || value.length > 12) {
      return true;
    }
    return false;
  }

  static capitalize(str) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
  }

  static removeUnderscore(str) {
    return str.split("_").join(" ");
  }

  static formatWithSuffix(number) {
    if (!number) {
      return number;
    }
    if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    }
    return number.toString();
  }

  // For Otp
  static matchIsNumeric(text) {
    const isNumber = typeof text === "number";
    return (isNumber || (text && text !== "")) && !isNaN(Number(text));
  }

  static formatDate(date) {
    if (!date) {
      return "-";
    }
    return dayjs(date).format(import.meta.env.VITE_APP_SERVER_FORMAT);
  }

  static formatDateInHours(dateString) {
    if (!dateString) {
      return "-";
    }
    return dayjs(dateString).format("HH:mm:ss");
  }

  // static limitText(text, maxLength) {
  //   if (text?.length <= maxLength) {
  //     return text;
  //   } else {
  //     return text?.substring(0, maxLength - 3) + "...";
  //   }
  // }

  static limitText(text, maxLength) {
    const str = String(text); // Convert text to string
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substring(0, maxLength - 3) + "...";
    }
  }
}
