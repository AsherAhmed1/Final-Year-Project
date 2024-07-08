import React from 'react';
import PO from "./Option1/PersonalOption";
import BO from "./Option2/BuisenessOption";

const Options = () => {
  return (
    <div className='flex flex-wrap justify-center md:mt-32'>
        <PO/>
        <BO/>
    </div>
  )
}

export default Options;