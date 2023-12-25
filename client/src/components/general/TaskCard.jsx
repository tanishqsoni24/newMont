import React from "react";

export default function TaskCard(props) {
  return (
    <div className="w-96 h-52 m-3 p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.title}
        </h5>
      </a>
      <div className="flex justify-evenly">
        <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
        {props.desc}
        </p>
        <button className="bg-[#073692] h-11 text-white px-5 py-2 rounded-xl font-bold ">
          Receive
        </button>
      </div>
      <div>
        <p className="text-xs" >Completed</p>
        <div className="max-w-screen-md h-2 bg-gray-200 rounded-lg " ></div>
        <p className="float-right" >8/50</p>
      </div>
    </div>
  );
}
