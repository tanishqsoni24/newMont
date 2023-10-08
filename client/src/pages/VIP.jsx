import React from 'react'
import VipCard from '../components/general/VipCard'

export default function VIP() {
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
