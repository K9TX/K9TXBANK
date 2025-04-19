import React from "react";
import { useAuthContext } from "../context/AuthContext";
import Goback from "../components/Goback";

const CheckBalance = () => {
  const { authUser: user } = useAuthContext();
  const [loading, setloading] = React.useState(true);
  const [balance,setbalance] = React.useState(null);
  const handleclick = () => {
    setloading(true);
    setbalance(null);
    document.getElementById("my_modal_1").showModal();

     setTimeout(() => {
       setbalance(user.account.balance);
       setloading(false);
     }, 3000);



  };
  return (
    <>
      {/* ........................... */}
      <div className="h-screen  bg-black m-auto ">
        <div className="flex justify-center items-center h-full">
          {/* ............. */}
          <div
            className="hero min-h-screen "
            // style={{
            //   backgroundImage: "url(/checkBalanceBackground.jpg)",
            // }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 flex items-center sm:gap-8 sm:text-4xl text-3xl font-bold">
                  {" "}
                  <Goback />
                  Online K9TX-BANK
                </h1>
                <p className="mb-5 sm:block hidden">
                  Easily view your current account balance in real-time. Stay
                  updated on your available funds before making transactions.
                  This feature ensures financial awareness and helps in managing
                  expenses effectively.
                </p>
                <button
                  className="btn bg-blue-500 text-white text-md p-2"
                  onClick={handleclick}
                >
                  Check Balance
                </button>

                <dialog id="my_modal_1" className="modal h-full">
                  <div className="modal-box border-2 h-1/2 border-blue-400 flex flex-col justify-center overflow-hidden">
                    {/* <h3 className="font-bold text-2xl absolute justify-center"></h3> */}
                    <p className="py-4">
                      {loading ? (
                        <span className="loading loading-ring loading-xl"></span>
                      ) : (
                        <div className="flex flex-col items-center ">
                          <span className="text-gray-400">
                            <img
                              src="/second/checkBalance.png"
                              className="w-20 animate-pulse"
                              alt=""
                            />{" "}
                          </span>{" "}
                          <br />
                          <span className="text-xl font-bold">
                            Your Account Balance :
                          </span>
                          <span className="text-3xl font-bold">
                            ${balance}.00
                          </span>
                        </div>
                      )}
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>

          {/* ............. */}
        </div>
      </div>
    </>
  );
};

export default CheckBalance;
