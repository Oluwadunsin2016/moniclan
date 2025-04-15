/* eslint-disable react/prop-types */
import { Avatar } from '@nextui-org/react';
import ReactCountryFlag from 'react-country-flag';

const CountryFlag = ({ code, rounded = false, className }) => {
  return (
    <>
      {!rounded ? (
        <ReactCountryFlag countryCode={code} svg className={`!h-auto overflow-hidden rounded-lg ${className}`} />
      ) : (
        <Avatar
          alt={code}
          className={`h-6 w-6 ${className}`}
          src={`https://flagcdn.com/${code?.toLowerCase()}.svg`}
        />
      )}
    </>
  );
};

export default CountryFlag;