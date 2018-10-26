var map = L.map('map-container').setView([52.52,13.405], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

L.marker([52.52,13.405]).addTo(map)
  .bindPopup('Sensor Location');