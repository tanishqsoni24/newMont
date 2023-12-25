import React from "react";
import TaskCard from "../components/general/TaskCard";
import { useEffect } from "react";

export default function Task() {
  useEffect(() => {
    // Set the background color for the body element
    document.body.classList.add("body-bg-color2");

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove("body-bg-color2");
    };
  }, []);
  return (
    <React.Fragment>
      <h2 className="text-3xl  block text-center text-white font-bold m-7">
        Task System{" "}
      </h2>
      <div
        style={{ marginTop: "2rem" }}
        className="container mx-auto flex flex-wrap justify-around"
      >
        <TaskCard
          title="Daily Attendance"
          desc="Sign in every day and get 9 rupees (when you reach the goal, you can receive the bonus here every day)  "
        />
        <TaskCard
          title="Invite to activate 10"
          desc="By sharing, when the member you recommend reaches VIP1 or above, success +10. Additional reward 47 (when you reach the goal, you can receive the bonus here every day)"
        />
        <TaskCard
          title="Invite to activate 30"
          desc="By sharing, when the member you recommend reaches VIP1 or above, success +30. Additional reward 307 (when you reach the goal, you can receive the bonus here every day)"
        />
        <TaskCard
          title="Invite to activate 50"
          desc="By sharing, when the member you recommend reaches VIP1 or above, success +50. Additional reward 570 (when you reach the goal, you can receive the bonus here every day)"
        />
        <TaskCard
          title="Invite to activate 100"
          desc="By sharing, when the member you recommend reaches VIP1 or above, success +100. Additional reward 1170 (when you reach the goal, you can receive the bonus here every day)"
        />
        <TaskCard
          title="Invite to activate 1000"
          desc="By sharing, when the member you recommend reaches VIP1 or above, success +1000. Additional reward 8070 (when you reach the goal, you can receive the bonus here every day)"
        />
      </div>
    </React.Fragment>
  );
}
