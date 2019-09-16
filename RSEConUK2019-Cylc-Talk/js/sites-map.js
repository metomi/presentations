/* Major Cylc-using sites, with various metadata to display via the plot.
   Note 1: lat-lon decimal degrees coordinates are (ideally) to 5 s.f.;
   co-located sites need the exact same coors to be displayed as a group.
   Note 2: forceLabelCoors non-false when label offset override required
   to stop labels from overlapping in site clusters.

   Note: code largely that as used also on the Cylc website, see:

     https://github.com/cylc/cylc.github.io/
         blob/master/_includes/sites-world-map.html

   where UM Partner colour-coding has not been applied (it is irrelevant to
   the audience for the presentation). However, that data has been left in the
   below structure to make diffs clearer, should this be used elsewhere.
*/
const cylcUsingSiteData = [
  { name: 'National Institute of Water & Atmospheric Research (NIWA)',
    shortName: 'NIWA',
    devSite: true,
    forceLabelCoors: false,
    latLonDecimalDegrees: [-36.8731, 174.7773],
    umPartnerSite: true},
  { name: 'NOAA Center for Weather and Climate Prediction (NCWCP)',
    shortName: 'NCWCP',
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [38.972, -76.925],
    umPartnerSite: false},
  { name: 'National Center for Atmospheric Research (NCAR)',
    shortName: 'NCAR',
    devSite: false,
    forceLabelCoors: [0, -45],
    latLonDecimalDegrees: [39.97788, -105.27486],
    umPartnerSite: false},
  { name: 'Barcelona Supercomputing Center (BSC)',
    shortName: 'BSC',
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [41.389, 2.116],
    umPartnerSite: false},
  { name: 'National Centre for Medium Range Weather Forecasting (NCMRWF)',
    shortName: 'NCMRWF',
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [28.62447, 77.35917],
    umPartnerSite: true},
  { name: 'Met Office',
    shortName: false,
    devSite: true,
    forceLabelCoors: [0, -30],
    latLonDecimalDegrees: [50.72762, -3.47564],
    umPartnerSite: true},
  { name: 'Geophysical Fluid Dynamics Laboratory (GFDL)',
    shortName: 'GFDL',
    devSite: false,
    forceLabelCoors: [0, -40],
    latLonDecimalDegrees: [40.34539, -74.61623],
    umPartnerSite: false},
  { name: 'Phillippine Atmospheric, Geophysical, & Astronomical Services Administration (PAGASA)',
    shortName: 'PAGASA',
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [14.64178, 121.04441],
    umPartnerSite: false},
  { name: 'Euro-Mediterranean Center on Climate Change (CMCC)',
    shortName: 'CMCC',
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [40.35225, 18.17165],
    umPartnerSite: false},
  { name: 'ARC Centre of Excellence for Climate Extremes (CLEX)',
    shortName: 'CLEX',
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [-33.918, 151.234],
    umPartnerSite: false},
  { name: 'South African Weather Service (SAWS)',
    shortName: 'SAWS',
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [-25.89068, 28.17072],
    umPartnerSite: true},
  { name: 'Centre for Environmental Data Analysis (CEDA)',
    shortName: 'CEDA',
    devSite: false,
    forceLabelCoors: [-50, -5],
    latLonDecimalDegrees: [51.57488, -1.31451],
    umPartnerSite: false},
  { name: 'Meteorological Service Singapore (MSS)',
    shortName: 'MSS',
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [1.3538, 103.98875],
    umPartnerSite: true},
  { name: 'NRL Marine Meteorology Division',
    shortName: false,
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [36.5929, -121.85459],
    umPartnerSite: false},
  { name: '557th Weather Wing',
    shortName: false,
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [41.13033, -95.91532],
    umPartnerSite: true},
  { name: 'Netherlands eScience Center',
    shortName: false,
    devSite: false,
    forceLabelCoors: [0, -20],
    latLonDecimalDegrees: [52.3569, 4.9544],
    umPartnerSite: false},
  { name: 'Max-Planck-Institut f\u00fcr Meteorologie',
    shortName: false,
    devSite: false,
    forceLabelCoors: [70, 5],
    latLonDecimalDegrees: [53.56772, 9.97524],
    umPartnerSite: false},
  { name: 'Deutches Klimarechenzentrum (DKRZ)',
    shortName: 'DKRZ',
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [53.56686, 9.97658],
    umPartnerSite: false},
  { name: 'Centre of Excellence in Simulation of Weather and Climate in Europe (ESiWACE)',
    shortName: 'ESiWACE',
    devSite: false,
    forceLabelCoors: [0, -60],
    latLonDecimalDegrees: [53.56686, 9.97658],
    umPartnerSite: false},
  { name: 'Bureau of Meteorology',
    shortName: false,
    devSite: true,
    forceLabelCoors: [0, -40],
    latLonDecimalDegrees: [-37.81966, 144.95086],
    umPartnerSite: true},
  { name: 'National Centre for Atmospheric Science (NCAS)',
    shortName: 'NCAS',
    devSite: false,
    forceLabelCoors: [0, -40],
    latLonDecimalDegrees: [53.8045, -1.56147],
    umPartnerSite: false},
  { name: 'Korean Meteorological Administration (KMA)',
    shortName: 'KMA',
    devSite: false,
    forceLabelCoors: false,
    latLonDecimalDegrees: [37.494, 126.917],
    umPartnerSite: true},
  { name: 'Plymouth Marine Laboratory',
    shortName: false,
    devSite: false,
    forceLabelCoors: [0, 25],
    latLonDecimalDegrees: [50.36615, -4.14782],
    umPartnerSite: false},
];
// Colours from the Cylc logo to use for the site markers & labels.
const cylcColours = {
  'red': '#FF5966',
  'blue': '#00B4FD',
  'green': '#00C798',
  'yellow': '#FFCC00',
};

// From array of all sites, create array of all site locations, by merging
// co-located sites into their own item to be marked as one.
var locationsMap =
    cylcUsingSiteData.reduce(function (locationAccumulator, currentSite) {
  var comparison = locationAccumulator[currentSite.latLonDecimalDegrees];
  if (comparison == null) {
    comparison = currentSite;
  } else {
    currentSite.shortName =
        currentSite.shortName.concat(' & ', comparison.shortName);
    currentSite.name = currentSite.name.concat(' & ', comparison.name);
    comparison = {
      ...comparison,
      ...currentSite
    };
  }
  locationAccumulator[currentSite.latLonDecimalDegrees] = comparison;
  return locationAccumulator;
}, {});
const cylcUsingSiteDataByLocation =
  Object.keys(locationsMap).map(function (key) {
  return locationsMap[key];
});

// Create world map.
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.Stamen({
        layer: 'watercolor'
      })
    }),
    new ol.layer.Tile({
      source: new ol.source.Stamen({
        layer: 'terrain-labels'
      })
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([50.7, -3.48].reverse()),
    zoom: 10,
    minZoom: 2 // prevent zoom out to extent labels overwhelm & spoil view
  }),
});

// Add each site location as a 'feature' with the name label to display.
var vectorSource = new ol.source.Vector();
for (var site of cylcUsingSiteDataByLocation) {
  // Needs 'reverse' as OpenLayers takes LonLat not the standard LatLon.
  var markerData = site.latLonDecimalDegrees.reverse();
  var markerAll = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat(markerData)
    ),
    name: site.name,
    shortName: site.shortName,
    devSite: site.devSite,
    forceLabelCoors: site.forceLabelCoors,
  });
  vectorSource.addFeature(markerAll);
};

// Add newline character after every two words for neater labels.
function wrapLabels(text) {
  var result = text.replace(/(\S+\s*){1,2}/g, "$&\n");
  return result;
};

// Define a style for the site features, including name labels.
function styleFunction(feature) {
  // Process site data to colour points & labels by type:
  var colour = cylcColours.yellow;
  var zindex = 0;
  var showLabels = false;
  if (feature.get('devSite')) {
    colour = cylcColours.red;
    zindex = 2; // plot on top of other sites (most towards the foreground)
    showLabels = true;
  }

  // There is no easy way to handle label overlapping in OpenLayers, so...
  // 1) make labels show short name (acronym etc.) only when zoom is low:
  var nameLabel;
  var labelOffsets = [0, 40]; // default for (2), override for cases here
  if (feature.get('shortName') && map.getView().getZoom() < 4) {
    labelOffsets = [0, 30]; // decrease default as most names are shorter
    nameLabel = feature.get('shortName');
  } else {
    nameLabel = wrapLabels(feature.get('name')); // full name
  };
  // 2) create custom offsets for close labels to maintain readability:
  coorsOrFalse = feature.get('forceLabelCoors');
  if (coorsOrFalse) {
    labelOffsets = coorsOrFalse;
  };
  if (!showLabels) {
    nameLabel = "";
  }

  // Define the style: standard, except with some customisations as above.
  var siteStyle = new ol.style.Style({
    zIndex: zindex,
    image: new ol.style.Circle({
      radius: 10,
      fill: new ol.style.Fill({
        color: colour
      }),
      stroke: new ol.style.Stroke({
        color: 'black',
        width: 3
      })
    }),
    text: new ol.style.Text({
      text: nameLabel,
      font: '22px Calibri, sans-serif',
      fill: new ol.style.Fill({
        color: 'black'
      }),
      stroke: new ol.style.Stroke({
        color: colour,
        width: 5
      }),
      offsetX: labelOffsets[0],
      offsetY: labelOffsets[1],
    })
  });
  return siteStyle;
};

// Plot the styled site features on the world map.
var siteVectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: styleFunction,
});
map.addLayer(siteVectorLayer);
