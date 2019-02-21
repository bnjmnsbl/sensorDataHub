/* eslint-disable no-undef */
let lnglat = [13.405,52.52,];

let map = new mapboxgl.Map({
  container: 'map-container',
  style:'/stylesheets/mapstyle.json',
  center: [13.4244,52.5047],
  zoom: 10,

});

let el = document.createElement('div');

el.className = 'marker';

new mapboxgl.Marker(el)
  .setLngLat(lnglat)
  .addTo(map);
