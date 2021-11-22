export function measure(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  // return d * 1000; // meters
  return d.toFixed(2); // kilometers
}

// LONGITUDE -180 to + 180
export function generateRandomLong() {
  var num = parseFloat((Math.random() * 180).toFixed(3));
  var posorneg = Math.floor(Math.random());
  if (posorneg == 0) {
    num = num * -1;
  }
  return num;
}
// LATITUDE -90 to +90
export function generateRandomLat() {
  var num = parseFloat((Math.random() * 90).toFixed(3));
  var posorneg = Math.floor(Math.random());
  if (posorneg == 0) {
    num = num * -1;
  }
  return num;
}
