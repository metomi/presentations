var cylcUsingInstitutionCoors = {
  "Met Office": [50.727622, -3.475646],
  "Centre for Environmental Data Analysis (CEDA)": [51.574887, -1.314517],
  "Plymouth Marine Laboratory": [50.366158, -4.147829],
  "National Centre for Atmospheric Science (NCAS)": [53.804501, -1.561474],
  "National Institute of Water & Atmospheric Research (NIWA)": [-36.8731, 174.7773],
  "Max-Planck-Institut für Meteorologie": [53.5677276, 9.9752491],
  "Deutches Klimarechenzentrum (DKRZ)": [53.5668648, 9.9765854],
  "Bureau of Meteorology": [-37.819662735644165, 144.9508629712867],
  "Meteorological Service Singapore (MSS)": [1.3538045, 103.9887531],
  "NRL Marine Meteorology Division": [36.59290173643106, -121.85459554195404],
  "Geophysical Fluid Dynamics Laboratory (GFDL)": [40.34539934495465, -74.61623311042786],
  "Phillippine Atmospheric, Geophysical, & Astronomical Services Administration (PAGASA)": [14.641788980309357, 121.04441821575165],
  "South African Weather Service (SAWS)": [-25.8906835142836, 28.17072629928589],
  "National Centre for Medium Range Weather Forecasting (NCMRWF)": [28.6244782, 77.3591772],
  "Korean Meteorological Administration (KMA)": [37.494, 126.917],
  "Centre of Excellence in Simulation of Weather and Climate in Europe (ESiWACE)": [53.5668648, 9.9765854],
  "NOAA Center for Weather and Climate Prediction (NCWCP)": [38.972, -76.925],
  "Euro-Mediterranean Center on Climate Change (CMCC)": [40.3522584, 18.1716594],
  "Barcelona Supercomputing Center (BSC)": [41.389, 2.116],
  "National Center for Atmospheric Reserach (NCAR)": [39.9778899, -105.2748664],
  "ARC Centre of Excellence for Climate Extremes (CLEX)": [-33.918, 151.234],
  "Netherlands eScience Center": [52.356907918929025, 4.9544088542461395],
  "557th Weather Wing": [41.1303357, -95.9153233]
};

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([0, 30].reverse()),
    zoom: 2
  })
});

var markersList = [];
for (var institution in cylcUsingInstitutionCoors) {
  // needs 'reverse' as OpenLayers is in LonLat not more standard LatLon
  var markerData = cylcUsingInstitutionCoors[institution].reverse();
  var markerAll = new ol.Feature({
    geometry: new ol.geom.Point(
    ol.proj.fromLonLat(markerData)
    ),
  });
  markersList.push(markerAll);
}
var vectorSource = new ol.source.Vector({
  features: markersList
});

var markerVectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: new ol.style.Style({
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({color: 'black'}),
      stroke: new ol.style.Stroke({
        color: [255, 255, 255], width: 2
      })
    })
  })
});
map.addLayer(markerVectorLayer);
