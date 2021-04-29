import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

let autocomplete: any;

const handleScriptLoad = (updLocation: any, updCenter: any) => {
  autocomplete = new window.google.maps.places.Autocomplete(
    document.getElementById('autocomplete') as HTMLInputElement,
    { componentRestrictions: { country: 'us' } },
  );
  autocomplete.setFields(['address_components', 'formatted_address', 'geometry', 'name']);
  autocomplete.addListener('place_changed', () => handlePlaceSelect(updLocation, autocomplete, updCenter));
};

const handlePlaceSelect = async (updLocation: any, autocomplete: any, updCenter: any) => {
  const getPlaceResponse = autocomplete.getPlace();

  updLocation(getPlaceResponse.formatted_address);
  const addressComponent = getPlaceResponse.address_components.map((el) => el.short_name);
  const addressComponentTypes = getPlaceResponse.address_components.map((el) => el.types[0]);
  const addressComponents = {};
  addressComponentTypes.forEach((type, i) => (addressComponents[type] = addressComponent[i]));

  const addressFields = {
    teacher:
      getPlaceResponse.name !== addressComponents.street_number + ' ' + addressComponents.route
        ? getPlaceResponse.name
        : '',
    addressLine1: addressComponents.street_number + ' ' + addressComponents.route,
    addressLine2: addressComponents.subpremise,
    city: addressComponents.locality,
    state: addressComponents.administrative_area_level_1,
    countryName: addressComponents.country,
    zipCode: addressComponents.postal_code,
  };

  updCenter([
    {
      lat: getPlaceResponse.geometry.location.lat(),
      lng: getPlaceResponse.geometry.location.lng(),
    },
    addressFields,
  ]);
};

const Autocomplete = (props: any) => {
  const [location, setLocation] = useState('');
  const [center, setCenter] = useState();

  useEffect(() => {
    if (window.google) handleScriptLoad(setLocation, setCenter);
  }, []);

  const onChange = (e: any) => setLocation(e.target.value);

  // fix it!
  // props.onChange(center);

  return (
    <div>
      <Input
        id="autocomplete"
        placeholder={'Start Typing Address or Teacher`s Name'}
        onChange={onChange}
        value={location}
      />
    </div>
  );
};

export default Autocomplete;
