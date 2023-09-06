import React from "react";

const AccountInfo = () => {
  let inputStyling =
    "border h-[2.4rem] w-[26rem] md:w-[21rem] rounded-md bg-gray-50 border-none focus:border-solid focus:border-2 focus:border-black focus:outline-none px-4";

  return (
    <div className="w-screen h-full pt-0 top-[9rem] lg:top-[4rem] relative lg:pt-20">
      <div className="flex justify-center pb-7">
        <div className="md:h-[29rem] md:w-[48rem] h-[47rem] w-[30rem] border border-gray-300">
          <div className="h-[5.5rem] flex justify-between items-center px-7">
            <div className="text-2xl">Edit Profile</div>
            {/* <div className="text-red-500 font-semibold">Change Password</div> */}
          </div>
          <div className="w-full h-[.05rem] rounded bg-gray-300"></div>
          <form
            //   onSubmit={}
            className="flex flex-col py-6 space-y-6"
          >
            <div className="flex flex-col items-center space-y-[3rem] md:flex-row md:justify-center md:space-x-[2rem] md:space-y-0">
              <div className="space-y-2">
                <p>First Name</p>
                <input
                  className={inputStyling}
                  type="text"
                  name="firstName"
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <p>Last Name</p>
                <input
                  className={inputStyling}
                  type="text"
                  name="lastName"
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex flex-col items-center space-y-[3rem] md:flex-row md:justify-center md:space-x-[2rem] md:space-y-0">
              <div>
                <p>Email</p>
                <input
                  className="border h-[2.8rem] w-[26rem] md:w-[21rem] rounded-md bg-gray-50 border-none focus:border-solid focus:border-2 focus:border-black focus:outline-none px-4"
                  type="text"
                  name="email"
                />
              </div>
              <div className="space-y-2">
                <p>Password</p>
                <input
                  className={inputStyling}
                  type="text"
                  name="firstName"
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex flex-col items-center space-y-[3rem] md:flex-row md:justify-center md:space-x-[2rem] md:space-y-0">
              <div className="space-y-2">
                <p>Confirm Password</p>
                <input
                  className={inputStyling}
                  type="text"
                  name="lastName"
                  placeholder=""
                />
              </div>
              <div className="w-[21rem] flex justify-center items-center"></div>
            </div>
          </form>
          <div className="flex justify-center md:justify-end px-8 md:pr-9">
            <button
              className="border rounded-full h-[3rem] w-full md:w-[9rem] bg-red-500 text-white text-xl"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
