export var rad = function (x) {
    return (x * Math.PI) / 180;
  };
export  var getDistance = function (lat1, lng1, lat2, lng2) {
    var R = 6378137; // Earth's mean radius in meter
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lng2 - lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };
export var getDistrict = function (place) {
    var place_list = place.split(",");
    var district = " ";
    district = place_list[place_list.length - 3];
    return district;
  };
export  var getCity = function (place) {
    var place_list = place.split(",");
    var city = "";
    city = place_list[place_list.length - 2];
    return city;
  };
export var getAddress = function (place) {
    var place_list = place.split(",");
    var address = "";
    address = place_list[0];
    return address;
  };