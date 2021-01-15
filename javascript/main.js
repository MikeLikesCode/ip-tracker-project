var mymap = L.map("mapid").setView([0, 0], 2);
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap<\/a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA<\/a>';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, {
  attribution
});
tiles.addTo(mymap);

async function fetchLocation(ip) {
        var value;
        await fetch('https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v1?apiKey=at_KvK9f5u7StYcnwQVhloWnCdQkOWDK&ipAddress=' + ip, {
          method: 'GET',
          headers: {
            'Accept': '*/*'
          }
        })
          .then(response => { value = response.json()})
          .catch(err => {
            console.log(err)
          });
      return value
      };

      async function setData(ip) {
        var ipadd = document.getElementById("ip");
        var location = document.getElementById("location");
        var time = document.getElementById("time");
        var isp = document.getElementById("isp");

        const data = await fetchLocation(ip);
        console.log(data)
        mymap.setView([data.location.lat, data.location.lng], 10);
        
        ipadd.innerHTML = data.ip;
        location.innerHTML = data.location.city + ", " + data.location.region + " " + data.location.postalCode;
        time.innerHTML = "UTC " + data.location.timezone;
        isp.innerHTML = data.isp;

      }

      setData('192.212.174.101');

      document.getElementById("submit").onclick = function(event) {
      event.preventDefault();
      setData(document.getElementById("address").value)};