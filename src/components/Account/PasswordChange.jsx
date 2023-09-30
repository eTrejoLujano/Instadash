import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REQ_URL } from "../Util/constants";
const URL = REQ_URL;

const PasswordChange = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  let inputStyling =
    "border h-[2.8rem] w-[20rem] rounded-md bg-gray-50 border-none focus:border-solid focus:border-2 focus:border-black focus:outline-none px-4";
  const updatePassword = async (e) => {
    e.preventDefault();
    const passwordChange = await axios.put(
      `${URL}/api/changepassword/${auth.user.user_id}/`,
      {
        old_password: e.target.old_password.value,
        password: e.target.password.value,
        password2: e.target.password2.value,
      },
      { headers: { Authorization: "Bearer " + auth.token.access } }
    );
    if (passwordChange.status == 200) {
      navigate("/");
    } else {
      alert("Passwords do not match");
    }
  };
  return (
    <div className="h-[50rem] w-screen bg-gray-50 flex justify-center">
      <div className="h-full w-[24rem] bg-white relative top-[6rem] md:top-[2rem] pt-20 flex justify-center">
        <div className="flex-col flex items-center space-y-10">
          <div className="text-center">
            <div className="font-semibold text-3xl">Set new password</div>
            <div className="font-semibold text-sm">
              (demo password is guest123#)
            </div>
          </div>
          <form
            onSubmit={updatePassword}
            className="flex flex-col justify-center space-y-[2.3rem]"
          >
            <div>
              <p>Old Password</p>
              <input
                className={inputStyling}
                type="password"
                name="old_password"
              />
            </div>
            <div>
              <p>New Password</p>
              <input className={inputStyling} type="password" name="password" />
            </div>
            <div>
              <p>Confirm New Password</p>
              <input
                className={inputStyling}
                type="password"
                name="password2"
              />
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
