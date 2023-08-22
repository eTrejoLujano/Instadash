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
  for (var j = 0; j < 8; j++) {
    strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
    strEmail = strEmail + strTmp;
  }
  strEmail = strEmail + ".com";
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
