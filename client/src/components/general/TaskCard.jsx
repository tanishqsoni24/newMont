import React from "react";

export default function TaskCard(props) {
  return (
    <div className="max-w-sm m-3 p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
      <img width="35" height="35" src="https://img.icons8.com/fluency-systems-filled/48/26439b/task.png" alt="task"/>
         <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Task-{props.level}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Go <b>VIP-{props.level}</b> by step guideline process on how to certify
        for your weekly benefits:
      </p>
      <p className="mb-3 my-2 font-normal text-gray-500 dark:text-gray-400">
        Go to this step by step guideline process on how to certify for your
        weekly benefits:
      </p>
    </div>
  );
}
