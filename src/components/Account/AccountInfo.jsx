import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as accountAPI from "../../Api/account";
import { me } from "../../redux-store/authSlice";

const AccountInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const editAccount = async (e) => {
    e.preventDefault();
    let first_name = !e.target.firstName.value
      ? user.first_name
      : e.target.firstName.value;
    let last_name = !e.target.lastName.value
      ? user.last_name
      : e.target.lastName.value;
    let email = !e.target.email.value ? user.email : e.target.email.value;
    console.log("account info", first_name, last_name, email, user.email);
    await accountAPI.updateAccount({
      user_id: user.user_id,
      first_name,
      last_name,
      email,
    });
    dispatch(me());
  };
  let inputStyling =
    "border h-[2.4rem] w-full md:w-[21rem] rounded-md bg-gray-50 border-none focus:border-solid focus:border-2 focus:border-black focus:outline-none px-4";
  if (user)
    return (
      <div className="w-screen h-screen pt-0 top-[9rem] lg:top-[4rem] relative lg:pt-20">
        <div className="flex justify-center pb-7">
          <div className="md:h-[20rem] md:w-[48rem] h-[33rem] w-screen border border-gray-300">
            <div className="h-[5.5rem] flex justify-between items-center px-7">
              <div className="text-2xl">Edit Profile</div>
              <div
                className="text-red-600 font-semibold cursor-pointer"
                onClick={() => navigate("/account/change-password")}
              >
                Change Password
              </div>
            </div>
            <div className="w-full h-[.05rem] rounded bg-gray-300"></div>
            <form
              onSubmit={editAccount}
              className="flex flex-col py-6 space-y-6"
            >
              <div className="flex flex-col items-center space-y-[1.5rem] md:flex-row md:justify-center md:space-x-[2rem] md:space-y-0">
                <div className="space-y-2 w-full md:w-fit px-7 md:px-0">
                  <p className="px-2">First Name</p>
                  <input
                    className={inputStyling}
                    type="text"
                    name="firstName"
                    placeholder={user.first_name}
                  />
                </div>
                <div className="space-y-2 w-full md:w-fit px-7 md:px-0">
                  <p className="px-2">Last Name</p>
                  <input
                    className={inputStyling}
                    type="text"
                    name="lastName"
                    placeholder={user.last_name}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-[3rem] md:flex-row md:justify-between md:space-x-[2rem] md:space-y-0 px-7">
                <div className="space-y-2 w-full">
                  <p className="px-2">Email</p>
                  <input
                    className={inputStyling}
                    type="text"
                    name="email"
                    placeholder={user.email}
                  />
                </div>
                <button
                  className="border rounded-full h-[2.5rem] w-full md:w-[8rem] bg-red-500 text-white text-xl"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default AccountInfo;
