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
        Promotion Commission
      </h2>
      {/* <div
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
      </div> */}
      {/* <div style={{fontSize: "xx-large"}} className="text-center text-white">
        Coming Soon...
      </div> */}
      <div className="promo-body text-white">
        <div className="_inner-promo p-5">

        <h4 className="first-line">
        *The following rewards are permanently valid, and the commission will be credited automatically
        </h4>
        <div className="promo-cont mt-5 text-2xl font-bold">
          <div className="_upper-heading flex bg-white p-2 items-center rounded-t-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M19.2935 11.6694C19.0582 11.1988 18.7052 10.9635 18.4699 10.9635H17.9993L15.5285 12.14C15.5285 12.9636 14.9402 13.6696 14.1166 13.6696H9.29261C9.0573 13.6696 8.93964 13.4343 8.93964 13.3166C8.93964 13.0813 9.17496 12.9636 9.29261 12.9636H13.8813C14.2342 12.9636 14.3519 12.7283 14.4696 12.3754C14.4696 11.6694 13.8813 11.0811 13.1753 11.0811H10.4692C10.4692 10.9635 10.3515 10.8458 10.3515 10.8458L9.8809 10.3752C9.29261 9.78689 8.58667 9.55157 7.64541 9.55157H4.35099V9.08094C4.35099 8.84562 4.23333 8.72797 3.99801 8.72797H0.938911C0.821253 8.72797 0.585938 8.84562 0.585938 9.08094V15.4345C0.585938 15.5521 0.703595 15.6698 0.938911 15.6698H4.11567C4.35099 15.6698 4.46865 15.5521 4.46865 15.3168V14.7285L10.4692 17.9053C11.1751 18.1406 11.9987 17.9053 12.4694 17.5523L18.4699 13.3166L18.5876 13.199C19.2935 12.846 19.5288 12.2577 19.2935 11.6694Z" fill="#0000A0"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0648 10.6535C15.4321 10.6535 17.3512 8.73442 17.3512 6.36708C17.3512 3.99974 15.4321 2.08063 13.0648 2.08063C10.6974 2.08063 8.77832 3.99974 8.77832 6.36708C8.77832 8.73442 10.6974 10.6535 13.0648 10.6535ZM14.1778 3.82922C14.2623 3.68278 14.4496 3.63261 14.596 3.71716C14.7424 3.8017 14.7926 3.98896 14.7081 4.1354L11.9525 8.90819C11.8679 9.05463 11.6807 9.10481 11.5343 9.02026C11.3878 8.93571 11.3376 8.74846 11.4222 8.60202L14.1778 3.82922ZM15.1864 7.59341C15.0173 7.88629 14.6428 7.98664 14.3499 7.81754C14.057 7.64845 13.9567 7.27394 14.1257 6.98106C14.2948 6.68818 14.6694 6.58783 14.9622 6.75692C15.2551 6.92602 15.3555 7.30053 15.1864 7.59341ZM11.168 5.98049C11.4609 6.14959 11.8354 6.04924 12.0045 5.75636C12.1736 5.46348 12.0733 5.08897 11.7804 4.91987C11.4875 4.75078 11.113 4.85113 10.9439 5.14401C10.7748 5.43689 10.8751 5.8114 11.168 5.98049Z" fill="#0000A0"></path></svg>
          <span className="ml-2 text-[#353d95]">Promotion Commision Ratio</span>
          </div>
          <div className="_lower-body bg-[#1a479e] p-3 text-base rounded-b-lg">
            <div className="cont-heading mt-3">
              <h2 className="font-bold text-lg mb-1">Direct Recommendation Level 1</h2>
              <span className="tags bg-yellow-300 inline-block text-sm px-2 py-1 rounded-xl">
                Income 25%
              </span>
            </div>
            <div className="cont-heading mt-5">
              <h2 className="font-bold text-lg mb-1">InDirect Recommendation Level 2</h2>
              <span className="tags bg-yellow-300 inline-block text-sm px-2 py-1 rounded-xl">
              Income 3%
              </span>
            </div>
            <div className="cont-heading mt-5 mb-3">
              <h2 className="font-bold text-lg mb-1">InDirect Recommendation Level 3</h2>
              <span className="tags bg-yellow-300 inline-block text-sm px-2 py-1 rounded-xl">
              Income 1%
              </span>
            </div>
          </div>
        </div>
        <div className="_explaining_income grid grid-cols-2 mt-5">
          <div className="_exp_inner_cont bg-white px-4 mr-2 mb-3 py-3 rounded-xl">
            <span className="exp_number inline-block bg-[#353d95] px-2 rounded-xl mb-2">1</span>
            <p className="text-[#353d95]"><span className="font-bold">If you invite A to invest successfully</span>, you will get an additional reward of 25% of their investment, on their First Successfull Recharge.</p>
          </div>
          <div className="_exp_inner_cont bg-white px-4 py-3 mb-3 rounded-xl">
            <span className="exp_number inline-block bg-[#353d95] px-2 rounded-xl mb-2">2</span>
            <p className="text-[#353d95]"><span className="font-bold">If you invite A to invest successfully</span>, and <span className="font-bold">A invite B Successfully, </span> It will be considered as Level-2 of your Team List, and you will get an additional reward of 3% of B's First Successfull Recharge.</p>
          </div>
          <div className="_exp_inner_cont bg-white px-4 mr-2 py-3 rounded-xl">
            <span className="exp_number inline-block bg-[#353d95] px-2 rounded-xl mb-2">3</span>
            <p className="text-[#353d95]"><span className="font-bold">If you invite A to invest successfully</span>, and <span className="font-bold">A invite B Successfully, </span> further more, <span className="font-bold">B invite C Successfully, </span>It will be considered as Level-3 of your Team List, and you will get an additional reward of 1% of C's First Successfull Recharge.</p>
          </div>
        </div>
        </div>
      </div>
    </React.Fragment>
  );
}
