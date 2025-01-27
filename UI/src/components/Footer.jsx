import React from 'react';

const Footer = () => {
  return (
    <div className="bg-transparent text-center p-4 text-black fixed bottom-0 w-full">
      <p className="m-0">
        &copy; {new Date().getFullYear()} e-TendChain. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
