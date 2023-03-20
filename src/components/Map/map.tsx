import React from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import geoDataFromFile from './data.json'
import { useRouter } from 'next/router'

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
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [11.43226146697998, 48.77335941579284],
          [11.432476043701172, 48.77244021326843],
          [11.431403160095215, 48.77203010209762],
          [11.428892612457275, 48.769187515357935],
          [11.430180072784424, 48.76835309367359],
          [11.430845260620115, 48.767787376170105],
          [11.431446075439453, 48.76699536095809],
          [11.431703567504883, 48.76642962815863],
          [11.431746482849121, 48.76583560185989],
          [11.431660652160645, 48.76568002238241],
          [11.433227062225342, 48.76597703733026],
          [11.433613300323486, 48.765128418532996],
          [11.433699131011963, 48.76485968625767],
          [11.434192657470703, 48.76495869305272],
          [11.434385776519775, 48.764887973933305]
        ]
      }
    }
  ]
}

// create a Map component that renders a Leaflet map and takes geoJSON data as a prop
const Map = ({ dataLayer }: any) => {
  const itemList = []
  for (const geojson of dataLayer) {
    itemList.push(<GeoJSON data={geojson} />)
  }
  console.log('itemList', itemList)
  const router = useRouter()
  const { lng, lat, zoom } = router.query
  return (
    <MapContainer
      center={[parseParamFloat(lat) || LAT, parseParamFloat(lng) || LNG]}
      zoom={parseParamInt(zoom) || ZOOM}
      scrollWheelZoom={true}
      style={{ height: 400, width: '100%', zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {itemList}
    </MapContainer>
  )
}

export default Map
