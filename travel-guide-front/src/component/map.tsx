import React from "react";
import { Map, GoogleApiWrapper, GoogleAPI, Marker, MarkerProps } from 'google-maps-react';

/// <reference path="../node_modules/@types/googlemaps/index.d.ts" />

interface IPropsGlobal {
  loaded?: boolean,
  google: GoogleAPI,
  markers?: Marker[],
  latLng?: any,
  zoom?: number
}

const MapContainer: React.FC<IPropsGlobal> = props => {

  const [marker, setMarker] = React.useState(props.latLng);

  let initialZoom = 14;
  if (props.zoom) {
    initialZoom = props.zoom;
  }

  console.log("Initializing MAP in coordinates:" + props.latLng);
  console.log("MARKER INIT:" + marker);

  if (!props.loaded) return <div><h1>Cargando mapa, por favor espere...</h1></div>;

  const onMapClick = (mapProps: any, map: any, e: any) => {
    map.setCenter(e.latLng);
    setMarker(JSON.stringify(e.latLng));
  }

  const onMarkerClick = (markerProps: any, marker: any, e: any) => {
    console.log("MARKER CLCK: " + markerProps + "***MARKER: " + marker + "***EvENT:" + e);
  }

  const getMarkerPosition = (): google.maps.LatLngLiteral | undefined => {
    if (marker) {
      console.log("GET POS FROM marker:" + marker);
      return JSON.parse(marker);
    }
    if (props.latLng) {
      console.log("GET POS FROM props:" + props.latLng);
      return JSON.parse(props.latLng);
    }
  }
  function getMP(): google.maps.LatLng {
    return JSON.parse(marker);
  }
  //
  //style = {{ width: '300px', height: '300px', position: 'relative' }

  return (
    <div className="mapStyles">
      {console.log("MARKER POS:" + marker)}
      <Map google={props.google}
        zoom={initialZoom}
        onClick={onMapClick}
        initialCenter={getMarkerPosition()}
      >

        <Marker onClick={onMarkerClick}
          position={getMarkerPosition()}
          title='Nuevo Checkpoint'
        />
      </Map>
    </div >
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB7P2-QjVwWHJ9O5yTvA8GB_DVqpzMcOSg",
  language: "ES-es"
})(MapContainer) 
