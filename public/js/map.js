mapboxgl.accessToken = 'pk.eyJ1IjoiYWphcmVrIiwiYSI6ImNrdmN2b3ltbzBwamQydXFudnZyZWg4dGwifQ.xVt9UPyXCft7uF9HObaojA';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom:12,
center:[15.58003,54.17671]
});
// Fetch stores from API
async function getStores() {
    const res = await fetch('/store');
    const data = await res.json();
  console.log(data);
    const stores = data.data.map(store => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            store.location.coordinates[0],
            store.location.coordinates[1]
          ]
        },
        properties: {
          storeId: store.storeId,
          icon: 'convenience'
        }
      };
    });
  
    loadMap(stores);
  }
  
  // Load map with stores
  function loadMap(stores) {
    map.on('load', function() {
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: stores
          }
        },
        layout: {
          'icon-image': '{icon}-15',
          'icon-size': 1.5,
          'text-field': '{storeId}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.9],
          'text-anchor': 'top'
        }
      });
    });
  }
  
  getStores();