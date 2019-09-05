import React from "react";
import { Map, GoogleApiWrapper, GoogleAPI, Marker, InfoWindow } from 'google-maps-react';
import { ICheckpoint } from "../interfaces";
import * as Constants from '../Constants';
/// <reference path="../node_modules/@types/googlemaps/index.d.ts" />

interface IPropsGlobal {
  loaded?: boolean,
  google: GoogleAPI,
  checkpoint?: ICheckpoint,
  zoom?: number,
  clickCallback?: any,
  clickable?: boolean,
  center?: any;
}

const MapContainer: React.FC<IPropsGlobal> = props => {

  const [activeMarker, setActiveMarker] = React.useState();
  const [showInfoWindow, setShowInfoWindow] = React.useState(true);
  const [map, setMap] = React.useState();
  const [lat, setLat] = React.useState();
  const [lng, setLng] = React.useState();

  let initialZoom = 14;
  if (props.zoom) {
    initialZoom = props.zoom;
  }

  if (!props.loaded) return <div><h1>Cargando mapa, por favor espere...</h1></div>;

  let urlPhoto = "/img/usercardback4.jpg";
  if (props.checkpoint && props.checkpoint.photo) {
    urlPhoto = Constants.URL_PHOTO_CHECKPOINT + props.checkpoint.photo;
  }

  const setMapReady = (mapProps: any, map: any, e: any) => {
    setMap(map);
    if (props.center) {
      map.setCenter(props.center);
    }
  }

  const onMapClick = (mapProps: any, map: any, e: any) => {
    if (props.clickable) {
      map.setCenter(e.latLng);
      setLat(e.latLng.lat);
      setLng(e.latLng.lng);
      if (props.clickCallback && typeof props.clickCallback === 'function') {
        props.clickCallback(e.latLng);
      }
    }
  }

  const onMarkerClick = (markerProps: any, marker: any, e: any) => {
    if (props.checkpoint.photo) {
      urlPhoto = Constants.URL_PHOTO_CHECKPOINT + props.checkpoint.photo;
    }
    setActiveMarker(marker);
    setShowInfoWindow(true);
  }

  const getMarkerPosition = (): google.maps.LatLngLiteral | undefined => {
    if (lat && lng) {

      return { lat: lat, lng: lng };
    }
    if (props.checkpoint) {
      return { lat: props.checkpoint.lat, lng: props.checkpoint.lng };
    }
  }

  const recenter = () => {

  }

  const imgStyle = { height: '110px', width: '110px' }
  return (
    <div className="">
      <Map google={props.google}
        zoom={initialZoom}
        onClick={onMapClick}
        onReady={setMapReady}
        initialCenter={getMarkerPosition()}
        center={getMarkerPosition()}
        onRecenter={recenter}
      >
        {props.checkpoint &&
          <Marker
            key={props.checkpoint._id}
            onClick={onMarkerClick}
            cursor="hand"
            position={getMarkerPosition()}
            title={props.checkpoint.title}>
          </Marker>
        }
        {props.checkpoint &&
          <InfoWindow
            google={props.google}
            visible={showInfoWindow}
            marker={activeMarker}
            map={map}
          >
            <div className="">
              <h6>{props.checkpoint.title}</h6>
              <div className="col 6">{props.checkpoint.description}</div>
              <div className="col 12"><img alt={""} style={imgStyle} src={urlPhoto} /></div>
            </div>
          </InfoWindow>
        }
      </Map>

    </div >
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBpy3BZQaWo-Gx_DEgsRwqzgMbiE4AVfds",
  language: "ES-es"
})(MapContainer)


