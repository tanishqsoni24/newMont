import React from 'react'
import TaskCard from '../components/general/TaskCard'
import { useEffect } from 'react'

export default function Task() {
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
    <TaskCard  level="0"/>
    <TaskCard level="1"/>
    <TaskCard level="2"/>
    <TaskCard level="3"/>
    <TaskCard level="4"/>
    <TaskCard level="5"/>
</div>

    </React.Fragment>
  )
}
