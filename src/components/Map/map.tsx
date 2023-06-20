import React from 'react'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css' // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility'
import geoDataFromFile from './data.json'
import { useRouter } from 'next/router'
import L from 'leaflet'
// import geodata from '../../map.json'

const parseParamInt = (p: string | string[]): number =>
  parseInt(Array.isArray(p) ? p[0] : p, 10)
const parseParamFloat = (p: string | string[]): number =>
  parseFloat(Array.isArray(p) ? p[0] : p)

/* const geo_json: GeoJSON.FeatureCollection<any> = data */
const LAT = 48.764987
const LNG = 11.434294
const ZOOM = 10

const geoData: GeoJSON.Feature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [11.434353590011597, 48.76486675817808]
  },
  properties: {}
}

const geoData2: GeoJSON.FeatureCollection<any> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        Name: 'Route von Goethestraße 150, 85055 Ingolstadt, Deutschland nach St2335, 85101 Lenting, Deutschland'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [11.45586, 48.7722, 0],
          [11.45607, 48.7722, 0],
          [11.45673, 48.77221, 0],
          [11.45712, 48.77222, 0],
          [11.4572, 48.77222, 0],
          [11.45753, 48.77222, 0],
          [11.45787, 48.77223, 0],
          [11.45801, 48.77223, 0],
          [11.4586, 48.77223, 0],
          [11.45869, 48.77223, 0],
          [11.45879, 48.77223, 0],
          [11.45925, 48.77226, 0],
          [11.45937, 48.77226, 0],
          [11.45948, 48.77227, 0],
          [11.45964, 48.77229, 0],
          [11.46014, 48.77232, 0],
          [11.46029, 48.77233, 0],
          [11.46055, 48.77234, 0],
          [11.46058, 48.77234, 0],
          [11.46083, 48.77235, 0],
          [11.46085, 48.77235, 0],
          [11.46113, 48.77236, 0],
          [11.4613, 48.77237, 0],
          [11.46135, 48.77237, 0],
          [11.46273, 48.77239, 0],
          [11.46288, 48.77234, 0],
          [11.46302, 48.77231, 0],
          [11.46308, 48.77229, 0],
          [11.46314, 48.77227, 0],
          [11.46318, 48.77223, 0],
          [11.46322, 48.7722, 0],
          [11.46327, 48.77213, 0],
          [11.46332, 48.77199, 0],
          [11.46332, 48.77174, 0],
          [11.46331, 48.77167, 0],
          [11.4633, 48.77163, 0],
          [11.46329, 48.77159, 0],
          [11.46327, 48.77155, 0],
          [11.46325, 48.77152, 0],
          [11.46323, 48.77149, 0],
          [11.4632, 48.77146, 0],
          [11.46318, 48.77143, 0],
          [11.46316, 48.77141, 0],
          [11.46314, 48.77139, 0],
          [11.46312, 48.77137, 0],
          [11.46308, 48.77135, 0],
          [11.46306, 48.77133, 0],
          [11.46304, 48.77132, 0],
          [11.46303, 48.77131, 0],
          [11.46299, 48.77128, 0],
          [11.46294, 48.77126, 0],
          [11.46291, 48.77124, 0],
          [11.46288, 48.77123, 0],
          [11.46285, 48.77121, 0],
          [11.46282, 48.7712, 0],
          [11.46279, 48.77118, 0],
          [11.46274, 48.77116, 0],
          [11.46269, 48.77114, 0],
          [11.46262, 48.77111, 0],
          [11.46255, 48.77108, 0],
          [11.46249, 48.77106, 0],
          [11.46243, 48.77103, 0],
          [11.46236, 48.771, 0],
          [11.46224, 48.77096, 0],
          [11.46208, 48.77089, 0],
          [11.46181, 48.77083, 0],
          [11.46175, 48.77082, 0],
          [11.46171, 48.77082, 0],
          [11.46167, 48.77082, 0],
          [11.46162, 48.77082, 0],
          [11.46158, 48.77082, 0],
          [11.46153, 48.77083, 0],
          [11.46147, 48.77084, 0],
          [11.46143, 48.77086, 0],
          [11.46134, 48.77089, 0],
          [11.46127, 48.77093, 0],
          [11.46126, 48.77093, 0],
          [11.4612, 48.77098, 0],
          [11.46117, 48.77101, 0],
          [11.46114, 48.77104, 0],
          [11.46112, 48.77108, 0],
          [11.4611, 48.77115, 0],
          [11.46109, 48.7712, 0],
          [11.46108, 48.77122, 0],
          [11.46108, 48.77123, 0],
          [11.46098, 48.77129, 0],
          [11.46099, 48.77142, 0],
          [11.461, 48.77156, 0],
          [11.46101, 48.77167, 0],
          [11.46102, 48.77182, 0],
          [11.46103, 48.77191, 0],
          [11.46105, 48.77213, 0],
          [11.46106, 48.77223, 0],
          [11.46107, 48.77239, 0],
          [11.46108, 48.77254, 0],
          [11.46109, 48.77275, 0],
          [11.4611, 48.77295, 0],
          [11.4611, 48.7731, 0],
          [11.4611, 48.77323, 0],
          [11.46111, 48.77338, 0],
          [11.46112, 48.77372, 0],
          [11.46112, 48.77376, 0],
          [11.46112, 48.77395, 0],
          [11.46112, 48.77446, 0],
          [11.4611, 48.77518, 0],
          [11.46108, 48.77567, 0],
          [11.46106, 48.77612, 0],
          [11.46101, 48.77663, 0],
          [11.46096, 48.77717, 0],
          [11.46094, 48.77746, 0],
          [11.46091, 48.77764, 0],
          [11.46089, 48.77785, 0],
          [11.46086, 48.77808, 0],
          [11.46075, 48.77886, 0],
          [11.46073, 48.77901, 0],
          [11.4607, 48.77917, 0],
          [11.46067, 48.77941, 0],
          [11.46059, 48.77998, 0],
          [11.46054, 48.78038, 0],
          [11.46049, 48.78071, 0],
          [11.46042, 48.78118, 0],
          [11.46039, 48.78135, 0],
          [11.46038, 48.78141, 0],
          [11.4603, 48.78212, 0],
          [11.46027, 48.78236, 0],
          [11.46026, 48.78241, 0],
          [11.46024, 48.78255, 0],
          [11.46019, 48.78295, 0],
          [11.46014, 48.78331, 0],
          [11.46008, 48.78384, 0],
          [11.46005, 48.78423, 0],
          [11.46004, 48.78455, 0],
          [11.46003, 48.78487, 0],
          [11.46004, 48.78518, 0],
          [11.46005, 48.78547, 0],
          [11.46007, 48.78582, 0],
          [11.46009, 48.78612, 0],
          [11.46012, 48.78636, 0],
          [11.46015, 48.78653, 0],
          [11.46019, 48.78679, 0],
          [11.46024, 48.7871, 0],
          [11.46029, 48.78734, 0],
          [11.46033, 48.78755, 0],
          [11.46042, 48.78787, 0],
          [11.46047, 48.78809, 0],
          [11.46051, 48.78824, 0],
          [11.46053, 48.78829, 0],
          [11.46058, 48.78846, 0],
          [11.46066, 48.7887, 0],
          [11.46079, 48.78909, 0],
          [11.46089, 48.7894, 0],
          [11.46103, 48.7898, 0],
          [11.46114, 48.79013, 0],
          [11.46134, 48.7907, 0],
          [11.46148, 48.79111, 0],
          [11.46176, 48.79187, 0],
          [11.46197, 48.79246, 0],
          [11.46206, 48.79274, 0],
          [11.46221, 48.79323, 0],
          [11.46231, 48.79355, 0],
          [11.46237, 48.79373, 0],
          [11.46237, 48.79374, 0],
          [11.46243, 48.7939, 0],
          [11.46249, 48.79408, 0],
          [11.46263, 48.79444, 0],
          [11.46271, 48.79463, 0],
          [11.46277, 48.79477, 0],
          [11.46289, 48.79506, 0],
          [11.46292, 48.79512, 0],
          [11.46298, 48.79529, 0],
          [11.46301, 48.7954, 0],
          [11.46303, 48.79547, 0],
          [11.46308, 48.79565, 0],
          [11.46316, 48.79591, 0],
          [11.46323, 48.79615, 0],
          [11.4633, 48.79637, 0],
          [11.46363, 48.79737, 0],
          [11.46419, 48.79902, 0],
          [11.46449, 48.79989, 0],
          [11.46461, 48.80025, 0],
          [11.46479, 48.80077, 0],
          [11.46485, 48.80095, 0],
          [11.46492, 48.80114, 0],
          [11.46511, 48.80169, 0],
          [11.46522, 48.80204, 0],
          [11.46527, 48.80217, 0],
          [11.4653, 48.80226, 0],
          [11.4654, 48.80256, 0],
          [11.46542, 48.80263, 0],
          [11.46548, 48.80285, 0],
          [11.46555, 48.8031, 0],
          [11.46561, 48.80333, 0],
          [11.46566, 48.80357, 0],
          [11.46575, 48.80406, 0],
          [11.46579, 48.80426, 0],
          [11.46581, 48.80438, 0],
          [11.46588, 48.80485, 0],
          [11.46591, 48.80517, 0],
          [11.46593, 48.80536, 0],
          [11.46594, 48.80551, 0],
          [11.46596, 48.80585, 0],
          [11.46596, 48.80588, 0],
          [11.46598, 48.80632, 0],
          [11.466, 48.80676, 0],
          [11.46601, 48.80688, 0],
          [11.46602, 48.80721, 0],
          [11.46603, 48.8075, 0],
          [11.46604, 48.80775, 0],
          [11.46605, 48.80814, 0],
          [11.46608, 48.80901, 0],
          [11.46609, 48.8095, 0],
          [11.46611, 48.81, 0],
          [11.46613, 48.81048, 0],
          [11.46613, 48.81063, 0],
          [11.46613, 48.8107, 0],
          [11.46615, 48.81098, 0],
          [11.46616, 48.81118, 0],
          [11.46617, 48.81134, 0],
          [11.46618, 48.81145, 0],
          [11.46624, 48.81194, 0],
          [11.46629, 48.81228, 0],
          [11.46636, 48.81264, 0],
          [11.46643, 48.81301, 0],
          [11.46649, 48.81327, 0],
          [11.46656, 48.81354, 0],
          [11.46667, 48.81392, 0],
          [11.46676, 48.81419, 0],
          [11.46687, 48.81429, 0],
          [11.46691, 48.81435, 0],
          [11.46696, 48.81447, 0],
          [11.46704, 48.81466, 0],
          [11.46731, 48.81533, 0],
          [11.46738, 48.81549, 0],
          [11.46745, 48.81562, 0],
          [11.46751, 48.81576, 0],
          [11.46758, 48.81589, 0],
          [11.46761, 48.81594, 0],
          [11.46769, 48.81609, 0],
          [11.46772, 48.81614, 0],
          [11.46776, 48.8162, 0],
          [11.46779, 48.81625, 0],
          [11.46782, 48.8163, 0],
          [11.46784, 48.81633, 0],
          [11.46787, 48.81637, 0],
          [11.46789, 48.8164, 0],
          [11.46791, 48.81643, 0],
          [11.46794, 48.81646, 0],
          [11.46797, 48.81649, 0],
          [11.46799, 48.81651, 0],
          [11.46801, 48.81653, 0],
          [11.46805, 48.81658, 0],
          [11.4681, 48.81662, 0],
          [11.46817, 48.81667, 0],
          [11.46824, 48.81671, 0],
          [11.46829, 48.81673, 0],
          [11.46834, 48.81675, 0],
          [11.46841, 48.81678, 0],
          [11.46847, 48.81679, 0],
          [11.46853, 48.8168, 0],
          [11.46857, 48.81681, 0],
          [11.46862, 48.81681, 0],
          [11.46869, 48.81681, 0],
          [11.46876, 48.81681, 0],
          [11.46881, 48.8168, 0],
          [11.46886, 48.81679, 0],
          [11.46893, 48.81678, 0],
          [11.46898, 48.81676, 0],
          [11.46902, 48.81675, 0],
          [11.46909, 48.81673, 0],
          [11.46914, 48.8167, 0],
          [11.46922, 48.81665, 0],
          [11.46926, 48.81661, 0],
          [11.46931, 48.81656, 0],
          [11.46934, 48.81651, 0],
          [11.46936, 48.81646, 0],
          [11.46938, 48.81641, 0],
          [11.46939, 48.81635, 0],
          [11.46938, 48.81631, 0],
          [11.46938, 48.81626, 0],
          [11.46936, 48.81621, 0],
          [11.46932, 48.81616, 0],
          [11.46929, 48.8161, 0],
          [11.46906, 48.81573, 0],
          [11.46902, 48.81566, 0],
          [11.46888, 48.81547, 0],
          [11.46881, 48.81537, 0],
          [11.46811, 48.81554, 0],
          [11.46776, 48.81563, 0],
          [11.46718, 48.81577, 0],
          [11.46673, 48.81587, 0],
          [11.46671, 48.81588, 0],
          [11.46626, 48.81599, 0],
          [11.46589, 48.81607, 0],
          [11.4657, 48.81612, 0],
          [11.46552, 48.81615, 0],
          [11.46516, 48.81622, 0],
          [11.46419, 48.81639, 0],
          [11.4641, 48.8164, 0],
          [11.4636, 48.8165, 0],
          [11.46336, 48.81655, 0]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        Name: 'Goethestraße 150, 85055 Ingolstadt, Deutschland'
      },
      geometry: {
        type: 'Point',
        coordinates: [11.4558603, 48.7722007, 0]
      }
    },
    {
      type: 'Feature',
      properties: {
        Name: 'St2335, 85101 Lenting, Deutschland'
      },
      geometry: {
        type: 'Point',
        coordinates: [11.4633641, 48.8165454, 0]
      }
    }
  ]
}
// code to calculate the boundary box for the map .
const calculateBoundingBox = (dataLayer) => {
  let minLat = Infinity
  let maxLat = -Infinity
  let minLng = Infinity
  let maxLng = -Infinity

  for (const geojson of dataLayer) {
    for (const feature of geojson.features) {
      const { coordinates } = feature.geometry
      if (
        feature.geometry.type === 'Polygon' ||
        feature.geometry.type === 'MultiPolygon'
      ) {
        for (const polygon of coordinates) {
          for (const ring of polygon) {
            for (const [lng, lat] of ring) {
              minLat = Math.min(lat, minLat)
              maxLat = Math.max(lat, maxLat)
              minLng = Math.min(lng, minLng)
              maxLng = Math.max(lng, maxLng)
            }
          }
        }
      } else if (feature.geometry.type === 'LineString') {
        for (const [lng, lat] of coordinates) {
          minLat = Math.min(lat, minLat)
          maxLat = Math.max(lat, maxLat)
          minLng = Math.min(lng, minLng)
          maxLng = Math.max(lng, maxLng)
        }
      } else if (feature.geometry.type === 'MultiPoint') {
        for (const [lng, lat] of coordinates) {
          minLat = Math.min(lat, minLat)
          maxLat = Math.max(lat, maxLat)
          minLng = Math.min(lng, minLng)
          maxLng = Math.max(lng, maxLng)
        }
      } else if (feature.geometry.type === 'Point') {
        const [lng, lat] = coordinates
        minLat = Math.min(lat, minLat)
        maxLat = Math.max(lat, maxLat)
        minLng = Math.min(lng, minLng)
        maxLng = Math.max(lng, maxLng)
      }
    }
  }

  return [
    [minLat, minLng],
    [maxLat, maxLng]
  ]
}

// code to calculate the zoom level .
const calculateZoom = (bounds, mapDim) => {
  const WORLD_DIM = { height: 256, width: 256 }
  const ZOOM_MAX = 21

  function latRad(lat) {
    const sin = Math.sin((lat * Math.PI) / 180)
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2
  }

  function zoom(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2)
  }

  const latFraction = (latRad(bounds[1][0]) - latRad(bounds[0][0])) / Math.PI

  const lngDiff = bounds[1][1] - bounds[0][1]
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360

  const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction)
  const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction)

  return Math.min(latZoom, lngZoom, ZOOM_MAX)
}
// create a Map component that renders a Leaflet map and takes geoJSON data as a prop
const Map = ({ dataLayer, datasetwithgeojson }) => {
  const calculateMeanCoords = (dataLayer) => {
    let minLat = Infinity
    let maxLat = -Infinity
    let minLng = Infinity
    let maxLng = -Infinity

    // Iterate over each item in the geojsonField array
    for (const geojson of dataLayer) {
      for (const feature of geojson.features) {
        if (feature.geometry.type === 'Polygon') {
          for (const polygon of feature.geometry.coordinates) {
            for (const [longitude, latitude] of polygon) {
              minLat = Math.min(latitude, minLat)
              maxLat = Math.max(latitude, maxLat)
              minLng = Math.min(longitude, minLng)
              maxLng = Math.max(longitude, maxLng)
            }
          }
        } else if (feature.geometry.type === 'MultiPoint') {
          for (const [longitude, latitude] of feature.geometry.coordinates) {
            minLat = Math.min(latitude, minLat)
            maxLat = Math.max(latitude, maxLat)
            minLng = Math.min(longitude, minLng)
            maxLng = Math.max(longitude, maxLng)
          }
        } else if (feature.geometry.type === 'Point') {
          const [longitude, latitude] = feature.geometry.coordinates
          minLat = Math.min(latitude, minLat)
          maxLat = Math.max(latitude, maxLat)
          minLng = Math.min(longitude, minLng)
          maxLng = Math.max(longitude, maxLng)
        } else if (feature.geometry.type === 'LineString') {
          for (const [longitude, latitude] of feature.geometry.coordinates) {
            minLat = Math.min(latitude, minLat)
            maxLat = Math.max(latitude, maxLat)
            minLng = Math.min(longitude, minLng)
            maxLng = Math.max(longitude, maxLng)
          }
        }
      }
    }

    const meanLat = (minLat + maxLat) / 2
    const meanLng = (minLng + maxLng) / 2

    return [meanLat, meanLng]
  }

  // usage
  const meanOfAllPoints = calculateMeanCoords(dataLayer)
  const meanLat = meanOfAllPoints[0]
  const meanLong = meanOfAllPoints[1]
  const itemList = []
  for (const geojson of dataLayer) {
    itemList.push(<GeoJSON data={geojson} />)
  }
  console.log('itemList', itemList)
  console.log('datasetwithgeojson', datasetwithgeojson)
  // console.log('itemList', itemList)
  // console.log('datasetwithgeojson', datasetwithgeojson)

  const bounds = calculateBoundingBox(dataLayer)
  const newZoom = calculateZoom(bounds, { height: 400, width: 400 })
  console.log(bounds)
  console.log(newZoom)

  const router = useRouter()
  const { lng, lat, zoom } = router.query
  // console.log(router)
  function handleMarkerClick(index) {
    const did = datasetwithgeojson[index]
    window.open(`/asset/${did}`, '_blank')
  }
  const createClickHandler = (index) => {
    // Return a new function that will be used as the event handler
    return () => {
      handleMarkerClick(index)
    }
  }
  const greenIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
  return (
    <MapContainer
      center={[meanLat, meanLong]}
      zoom={newZoom}
      scrollWheelZoom={true}
      style={{ height: 400, width: '100%', zIndex: 0 }}
    >
      {itemList.map((coord, index) => (
        // eslint-disable-next-line react/jsx-key
        <Marker
          position={[
            coord.props.data.features[0].geometry.coordinates[1][1],
            coord.props.data.features[0].geometry.coordinates[1][0]
          ]}
          eventHandlers={{ click: createClickHandler(index) }}
          icon={greenIcon}
        ></Marker>
      ))}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {itemList}
    </MapContainer>
  )
}

export default Map
function median(lats: any[]) {
  throw new Error('Function not implemented.')
}
