import React from "react";

const PasswordChange = () => {
  let inputStyling =
    "border h-[2.8rem] w-[20rem] rounded-md bg-gray-50 border-none focus:border-solid focus:border-2 focus:border-black focus:outline-none px-4";

  return (
    <div className="h-[50rem] w-screen bg-gray-50 flex justify-center">
      <div className="h-full w-[24rem] bg-white relative top-[6rem] md:top-[2rem] pt-20 flex justify-center">
        <div className="flex-col flex items-center space-y-10">
          <div className="font-semibold text-3xl">Set new password</div>
          <form className="flex flex-col justify-center space-y-[2.3rem]">
            <div>
              <p>Old Password</p>
              <input className={inputStyling} type="text" name="email" />
            </div>
            <div>
              <p>New Password</p>
              <input className={inputStyling} type="password" name="password" />
            </div>
            <div>
              <p>Confirm New Password</p>
              <input className={inputStyling} type="password" name="password" />
            </div>
            <button
              className="border rounded-full h-[2.6rem] bg-red-600 text-white text-base"
              type="submit"
            >
              Change my password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
