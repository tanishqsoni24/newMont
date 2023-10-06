import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=' bg-[#31C48D] text-white' >
      <p className='p-5 text-center text-xl font-light ' >&copy; {currentYear} New Mont. All rights reserved.</p>
    </footer>
  );
};

export default Footer;