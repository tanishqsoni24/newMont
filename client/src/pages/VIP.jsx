import React from 'react'
import VipCard from '../components/general/VipCard'

export default function VIP() {
  return (
    <React.Fragment>
<div style={{marginTop: "6rem"}} className="container mx-auto flex flex-wrap justify-between">
    <VipCard  level="0"/>
    <VipCard level="1"/>
    <VipCard level="2"/>
    <VipCard level="3"/>
    <VipCard level="4"/>
    <VipCard level="5"/>
</div>

    </React.Fragment>
  )
}
