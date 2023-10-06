import React from 'react'
import VipCard from '../components/general/VipCard'

export default function VIP() {
  return (
    <React.Fragment>
        
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" className="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">NewMount-VIP</span>
    </a>
  </div>
</nav>
<div className="container mx-auto flex flex-wrap justify-between">
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
