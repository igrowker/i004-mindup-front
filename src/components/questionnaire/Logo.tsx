import React from 'react';

interface LogoProps {
  logoSize: string;
}

const Logo: React.FC<LogoProps> = ({ logoSize }) => {
  return (
    <div className={logoSize}>
      <img src="/logo1.png" alt="logo mindup" />
    </div>
  );
};

export default Logo;
