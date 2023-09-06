import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux-store/authSlice";
import { getCart } from "../redux-store/cartSlice";
import { formatAddress } from "./Util/helperFunctions";
import { availableStores } from "../redux-store/storeSlice";
import CartMenu from "./NavbarFeatures/CartMenu";
import Instacart from "../assets/icons/instadash.png";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { CgClose, CgProfile, CgCloseO } from "react-icons/cg";
import { BsCart3, BsCircle } from "react-icons/bs";
import { RxHome } from "react-icons/rx";
import { SlBag, SlArrowDown } from "react-icons/sl";
import { TfiReceipt } from "react-icons/tfi";
import { TbHeart } from "react-icons/tb";
import AddressDropdown from "./NavbarFeatures/AddressDropdown";
import AddressModal from "./NavbarFeatures/AddressModal";

function Navbar({ trueLoading, falseLoading }) {
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const cartRef = useRef(null);
  const slideCartRef = useRef(null);
  const menuRef = useRef(null);
  const slideMenuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  const [searchIcon, setSearchIcon] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const currentAddress = useSelector((state) => state.auth.location);
  const user_id = useSelector((state) => state.auth.user.user_id);

  useEffect(() => {
    async function fetchData() {
      dispatch(getCart({ user_id }));
    }
    fetchData();
  }, [dispatch, user_id, currentAddress]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchIcon(true);
    }
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      slideMenuRef.current &&
      !slideMenuRef.current.contains(event.target)
    ) {
      setMenu(false);
    }
    if (
      cartRef.current &&
      !cartRef.current.contains(event.target) &&
      slideCartRef.current &&
      !slideCartRef.current.contains(event.target)
    ) {
      setCartMenu(false);
    }
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDropdown(false);
    }
  };
  const onClear = () => {
    searchRef.current.value = "";
    setSearchIcon(true);
  };
  const homeClick = () => {
    navigate("/");
  };
  const pickUpClick = () => {
    navigate("/pickup");
  };
  const orderClick = () => {
    navigate("/orders");
  };
  const accountClick = () => {
    navigate("/account");
  };
  const savedClick = () => {
    navigate("/saved");
  };
  const signoutClick = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleCartMenu = () => {
    setCartMenu(!cartMenu);
  };
  const menuOptions = [
    { id: 1, name: "Home", icon: RxHome, click: homeClick },
    { id: 2, name: "Pickup", icon: SlBag, click: pickUpClick },
    { id: 3, name: "Orders", icon: TfiReceipt, click: orderClick },
    { id: 4, name: "Account", icon: CgProfile, click: accountClick },
    { id: 5, name: "Saved Stores", icon: TbHeart, click: savedClick },
    { id: 6, name: "Sign Out", icon: CgCloseO, click: signoutClick },
  ];
  console.log("current address", currentAddress);
  const handleClose = () => {
    setAddressModal(false);
  };
  const cartMenuClose = () => {
    setCartMenu(false);
  };
  let inputStyling =
    "border h-[2.4rem] w-[22.5rem] rounded-md bg-gray-50 border-none focus:border-solid focus:border-2 focus:border-black focus:outline-none px-10";
  return (
    <div className="">
      {addressModal && <AddressModal handleClose={handleClose} />}
      <div
        className={`fixed bg-white h-screen z-50 shadow-gray-300 shadow ${
          menu ? "md:w-[22rem] w-screen " : "md:w-0"
        } duration-300 shadow-xl shadow-gray-400`}
      >
        {menu && (
          <div className="scroll-smooth" ref={slideMenuRef}>
            <div className="relative pt-[1.5rem] pb-8 pl-[1rem] cursor-pointer">
              <CgClose size={22} onClick={() => setMenu(!menu)} />
            </div>
            <div
              className="flex flex-col
          overscroll-y-contain overflow-y-scroll container-snap"
            >
              {menuOptions.map(({ id, name, click }, index) => {
                const Icon = menuOptions[index].icon;
                return (
                  <div key={id} className="hover:bg-gray-100 pl-4">
                    <div
                      className="flex items-center
                    cursor-pointer h-[4rem] w-full"
                      onClick={click}
                    >
                      <Icon size={23} />
                      <div className="relative pl-[1.4rem] font-bold text-lg">
                        {name}
                      </div>
                    </div>
                    <div>
                      <div
                        className="flex w-full md:w-[21rem] h-[.05rem] rounded
                  bg-gray-200"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <div
          className={`fixed bg-white h-screen z-50 shadow-gray-300 shadow  ${
            cartMenu ? "md:w-[22rem] w-screen " : "md:w-0"
          } duration-300 shadow-xl shadow-gray-400`}
        >
          {cartMenu && (
            <CartMenu
              handleCartMenu={handleCartMenu}
              slideCartRef={slideCartRef}
              cartMenuClose={cartMenuClose}
            />
          )}
        </div>
      </div>
      <div className="w-full h-[4rem] bg-white fixed z-20 border border-gray-2 flex justify-between px-4 lg:px-[3.9rem] items-center">
        <div className="flex items-center space-x-5" ref={menuRef}>
          <AiOutlineMenu
            className="cursor-pointer h-5 "
            size={22}
            onClick={() => setMenu(!menu)}
          />
          <div
            className="cursor-pointer flex items-center space-x-3"
            onClick={homeClick}
          >
            <img src={Instacart} className="w-[2.5rem] h-[2.5rem]" />
            <div className="text-xl font-bold text-red-500 hidden lg:flex">
              DASHED EATS
            </div>
          </div>
          <div className="hidden sm:flex space-x-5 cursor-pointer">
            <div onClick={homeClick}>Delivery</div>
            <div onClick={pickUpClick}>Pickup</div>
          </div>
          <div className="hidden md:flex space-x-5">
            <h3 className="text-2xl font-light text-gray-300">|</h3>
            <button
              onClick={() => setDropdown((state) => !state)}
              className="text-black flex items-center"
              ref={inputRef}
            >
              {currentAddress
                ? formatAddress(currentAddress.address)[0]
                : "Enter An Address"}
              <SlArrowDown className="relative left-2" size={10} />
            </button>
            <div className="relative">
              {dropdown && (
                <AddressDropdown
                  dropdownRef={dropdownRef}
                  inputStyling={inputStyling}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center max-w-fit">
            <div className="relative text-gray-500 left-9">
              {searchIcon ? (
                <AiOutlineSearch size={24} />
              ) : (
                <FiArrowLeft size={23} onClick={onClear} />
              )}
            </div>
            <input
              className="rounded-full block px-10 text-sm w-full md:w-[19rem]
              lg:w-[22rem] lg h-[2.6rem] border border-gray-100 bg-gray-100 
              focus:ring-black text-black focus:border-solid focus:border-2 focus:border-black focus:outline-none"
              ref={searchRef}
              placeholder="Search stores, dishes, products"
              onClick={() => setSearchIcon(false)}
            />
          </div>
          <button onClick={() => setCartMenu(!cartMenu)} ref={cartRef}>
            <BsCart3 size={24} />
            <div className="absolute rounded-full w-4 h-4 bg-red-500 right-[.5rem] lg:right-[3.4rem] bottom-[2rem]">
              <div className="text-xs text-white flex items-center justify-center">
                1
              </div>
            </div>
          </button>
        </div>
      </div>
      <div
        className="w-screen absolute mt-[1rem] h-[7rem] pt-[3rem] justify-center
     text-black bg-white border border-gray-200 flex items-center md:hidden"
      >
        <button
          onClick={() => setAddressModal(true)}
          className="text-black flex items-center"
        >
          {currentAddress
            ? formatAddress(currentAddress.address)[0]
            : "Enter An Address"}
          <SlArrowDown className="relative left-2" size={10} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
