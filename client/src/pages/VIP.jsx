import React from 'react'
import { useEffect } from 'react'
import VipCard from '../components/general/VipCard'

export default function VIP() {
  useEffect(() => {
    // Set the background color for the body element
    document.body.classList.add("body-bg-color");
  
    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("body-bg-color");
    };
  }, []);
  return (
    <React.Fragment>
<div style={{marginTop: "6rem"}} className="container mx-auto flex flex-wrap justify-around">
    <VipCard  level="0" contentOne="VIP - 0"/>
    <VipCard level="1" contentOne="When the investment amount reaches Rs 528.00, you will be upgraded to VIP1"/>
    <VipCard level="2"/>
    <VipCard level="3"/>
    <VipCard level="4"/>
    <VipCard level="5"/>
</div>

    </React.Fragment>
  )
}
