
import React from 'react';

const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-4.25H10.5a6.01 6.01 0 0 0 1.5 4.25m0 0A2.25 2.25 0 1 1 12 5.25a2.25 2.25 0 0 1 0 4.5m0 0a2.25 2.25 0 1 1-2.25 2.25A2.25 2.25 0 0 1 12 9.75M12 15v.01M12 12v.01" />
  </svg>
);

export default LightBulbIcon;
