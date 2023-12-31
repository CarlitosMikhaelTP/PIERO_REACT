/* global google */

import * as React from "react"
import { createRoot } from "react-dom/client"
import { Wrapper } from "@googlemaps/react-wrapper"
import { createCustomEqual } from "fast-equals"
import { isLatLngLiteral } from "@googlemaps/typescript-guards"
import '../assets/css/estilos.css'

const render = status => {
  return <h1>{status}</h1>
}

const MapComponent = () => {
  const [clicks, setClicks] = React.useState([])
  const [zoom, setZoom] = React.useState(13) // initial zoom
  const [center, setCenter] = React.useState({
    lat: -12.043889164267059,
    lng: -76.97714475080264
  })

  const onClick = e => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng])
  }

  const onIdle = m => {
    console.log("onIdle")
    setZoom(m.getZoom())
    setCenter(m.getCenter().toJSON())
  }

  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto"
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={event => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={event =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={event =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
      <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  )

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper
        apiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
        render={render}
      >
        {({ onLoad }) => (
          <Map
            center={center}
            onClick={onClick}
            onIdle={onIdle}
            zoom={zoom}
            style={{ flexGrow: "1", height: "100%" }}
            onLoad={onLoad} // Proporciona el evento onLoad al componente Map
          >
            {clicks.map((latLng, i) => (
              <Marker key={i} position={latLng} />
            ))}
          </Map>
        )}
      </Wrapper>
      {/* Basic form for controlling center and zoom of the map. */}
      {form}
    </div>
  );
}

const Map = ({ onClick, onIdle, children, style, ...options }) => {
  const ref = React.useRef(null)
  const [map, setMap] = React.useState()

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map])

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options)
    }
  }, [map, options])

  React.useEffect(() => {
    if (map) {
      ;["click", "idle"].forEach(eventName =>
        map.maps.event.clearListeners(map, eventName)
      )

      if (onClick) {
        map.addListener("click", onClick)
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map))
      }
    }
  }, [map, onClick, onIdle])

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map })
        }
      })}
    </>
  )
}

const Marker = options => {
  const [marker, setMarker] = React.useState()

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker())
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options)
    }
  }, [marker, options])

  return null
}

const deepCompareEqualsForMaps = createCustomEqual(deepEqual => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof google.maps.LatLng
  ) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b))
  }

  // TODO extend to other types

  // use fast-equals for other objects
  return deepEqual(a, b)
})

function useDeepCompareMemoize(value) {
  const ref = React.useRef()

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize))
}


export default MapComponent;