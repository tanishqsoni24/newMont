import React from 'react'
import TaskCard from '../components/general/TaskCard'

export default function Task() {
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
