export function makeEmail() {
  var strValues = "abcdefg12345";
  var strEmail = "";
  var strTmp;
  for (var i = 0; i < 10; i++) {
    strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
    strEmail = strEmail + strTmp;
  }
  strTmp = "";
  strEmail = strEmail + "@";

  strEmail = strEmail + "gmail.com";
  return strEmail;
}

export function currencyFormat(num) {
  if (num < 0) {
    return (
      "(" +
      "$" +
      num
        ?.toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        .substring(1) +
      ")"
    );
  }
  return "$" + num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatAddress(address) {
  let streetAddress = "";
  let cityStateZip = "";
  let comaSearch = false;
  for (let i of address) {
    if (!comaSearch) {
      if (i === ",") {
        comaSearch = true;
      } else {
        streetAddress += i;
      }
    } else {
      cityStateZip += i;
    }
  }
  return [streetAddress, cityStateZip.slice(1)];
}

export function gmapsAddress(address) {
  let formattedAddress = "";
  for (let i of address) {
    if (i == " ") {
      formattedAddress += "%20";
    } else if (i == ",") {
      formattedAddress += "%2C";
    } else {
      formattedAddress += i;
    }
  }
  return formattedAddress;
}

export function orderDateFormat(date) {
  return date.slice(0, 3) + "," + date.slice(3, 10);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function savedStoreCheck(array, storeId) {
  return array.filter((store) => store.id == storeId);
}
