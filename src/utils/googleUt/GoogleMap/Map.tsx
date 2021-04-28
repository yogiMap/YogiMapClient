import React, { useEffect, useRef } from 'react';

let map, marker;

const handleScriptLoad = (ref: any, center: any, zoom: any) => {
  map = new google.maps.Map(ref.current, { center, zoom });
  marker = new google.maps.Marker({
    position: center,
    map: map,
    animation: google.maps.Animation.DROP,
  });
};

const Map = (props: any) => {
  const ref = useRef();
  const center = props.center ? props.center : { lat: 38.4816756, lng: -100.5638995 };
  const zoom = props.center ? 13.25 : 4;

  useEffect(() => handleScriptLoad(ref, center, zoom));

  return (
    // ignore ref type (solution?)
    // @ts-ignore
    <div
      ref={ref}
      style={{ width: '100%', height: '30vh', margin: `1em 0`, borderRadius: `0.5em` }}
      className="google-map"
    />
  );
};

export default Map;
