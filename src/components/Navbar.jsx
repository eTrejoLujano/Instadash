import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux-store/authSlice";
import { getCart } from "../redux-store/cartSlice";
import { formatAddress } from "./Util/helperFunctions";
import CartMenu from "./NavbarFeatures/CartMenu";
import Instacart from "../assets/icons/instadash.png";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { CgClose, CgProfile, CgCloseO } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { RxHome } from "react-icons/rx";
import { SlBag, SlArrowDown } from "react-icons/sl";
import { TfiReceipt } from "react-icons/tfi";
import { TbHeart } from "react-icons/tb";
import AddressDropdown from "./NavbarFeatures/AddressDropdown";
import AddressModal from "./NavbarFeatures/AddressModal";
import FoodModal from "./Store/FoodModal";
import SearchDropdown from "./NavbarFeatures/SearchDropdown";
import Loading from "./Util/Loading";

function Navbar() {
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const cartRef = useRef(null);
  const slideCartRef = useRef(null);
  const menuRef = useRef(null);
  const slideMenuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [loading, setLoading] = useState();
  const [menu, setMenu] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  const [searchIcon, setSearchIcon] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [foodModal, setFoodModal] = useState(false);
  const [modalInfo, setModalInfo] = useState();
  const [inputText, setInputText] = useState("");
  var [cartTotal, setCartTotal] = useState(0);
  const currentAddress = useSelector((state) => state.auth.location);
  const user_id = useSelector((state) => state.auth.user.user_id);
  const cart = useSelector((state) => state.cart.cart);
  const restaurants = useSelector((state) => state.store.store);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await dispatch(getCart({ user_id })).then((res) => {
        console.log("res", res);

        console.log("inside if");
        for (let i = 0; i < res.payload.payload.length; i++) {
          cartTotal += res.payload.payload[i].quantity;
        }
        console.log("cart total", cartTotal);
        setCartTotal(cartTotal);
      });
      // console.log("outside cart", cart);
      // if (cart) {
      //   for (let i = 0; i < cart.length; i++) {
      //     cartTotal += cart[i].quantity;
      //   }
      // }
      // console.log("response", res);
      setLoading(false);
    }
    fetchData();
  }, [dispatch, user_id, currentAddress]);
  useEffect(() => {
    if (cart) {
      cartTotal = 0;
      console.log("inside if");
      for (let i = 0; i < cart.length; i++) {
        cartTotal += cart[i].quantity;
      }
      console.log("cart total", cartTotal);
      setCartTotal(cartTotal);
    }
  }, [cart]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      searchRef.current.value = "";
      setSearchIcon(true);
      setSearchDropdown(false);
      setInputText("");
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
    setInputText("");
  };
  const homeClick = () => {
    navigate("/");
    setMenu(false);
  };
  const pickUpClick = () => {
    navigate("/pickup");
    setMenu(false);
  };
  const orderClick = () => {
    navigate("/orders");
    setMenu(false);
  };
  const accountClick = () => {
    navigate("/account");
    setMenu(false);
  };
  const savedClick = () => {
    navigate("/saved");
    setMenu(false);
  };
  const signoutClick = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleCartMenu = () => {
    setCartMenu(!cartMenu);
  };

  const cartCounter = (quantity) => {
    setCartTotal(quantity);
  };

  const menuOptions = [
    { id: 1, name: "Home", icon: RxHome, click: homeClick },
    { id: 2, name: "Pickup", icon: SlBag, click: pickUpClick },
    { id: 3, name: "Orders", icon: TfiReceipt, click: orderClick },
    { id: 4, name: "Account", icon: CgProfile, click: accountClick },
    // { id: 5, name: "Saved Stores", icon: TbHeart, click: savedClick },
    { id: 6, name: "Sign Out", icon: CgCloseO, click: signoutClick },
  ];
  console.log("current address", currentAddress);
  const handleClose = () => {
    setAddressModal(false);
  };
  const cartMenuClose = () => {
    setCartMenu(false);
  };
  const handleFoodModal = (object) => {
    setFoodModal(true);
    setModalInfo(object);
  };
  const closeFoodModal = () => {
    setFoodModal(false);
  };
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const storeView = ({ id, destinations, place_id, totalRatings }) => {
    navigate("/store", {
      state: {
        id,
        destinations,
        place_id,
        totalRatings,
        origins: currentAddress.address,
      },
    });
  };
  let inputStyling =
    "border h-[2.4rem] w-[22.5rem] rounded-md bg-gray-50 border-none focus:border-solid focus:border-2 focus:border-black focus:outline-none px-10";

  if (loading) return <Loading />;
  else if (!loading)
    return (
      <div className="">
        {addressModal && <AddressModal handleClose={handleClose} />}
        {foodModal && (
          <FoodModal
            itemId={modalInfo.itemId}
            name={modalInfo.name}
            description={modalInfo.description}
            image={modalInfo.image}
            price={modalInfo.price}
            quantity={modalInfo.quantity}
            handleClose={closeFoodModal}
          />
        )}
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
            } duration-300 shadow-xl shadow-gray-400 overflow-y-scroll container-snap`}
          >
            {cartMenu && (
              <CartMenu
                handleCartMenu={handleCartMenu}
                slideCartRef={slideCartRef}
                cartMenuClose={cartMenuClose}
                handleFoodModal={handleFoodModal}
              />
            )}
          </div>
        </div>
        <div className="w-full h-[4rem] bg-white fixed z-20 border border-gray-2 flex md:justify-between px-4 lg:px-[3.9rem] items-center">
          <div
            className={`${
              searchDropdown ? "md:flex hidden" : "flex"
            } items-center space-x-5 w-1/4 md:w-full`}
            ref={menuRef}
          >
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
            <div className="hidden md:flex space-x-5 cursor-pointer">
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
          <div className="flex items-center space-x-4 md:w-fit w-full">
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center justify-center z-50 w-full h-[3.9rem] bg-white">
                <div className="relative text-gray-500 left-9">
                  {searchIcon ? (
                    <AiOutlineSearch size={24} />
                  ) : (
                    <FiArrowLeft size={23} onClick={onClear} />
                  )}
                </div>
                <input
                  className="rounded-full block px-10 text-sm w-full md:w-[18rem]
              lg:w-[22rem] lg h-[2.6rem] border border-gray-100 bg-gray-100 
              focus:ring-black text-black focus:border-solid focus:border-2 focus:border-black focus:outline-none"
                  ref={searchRef}
                  placeholder="Search stores, dishes, products"
                  onClick={() => {
                    setSearchIcon(false);
                    setSearchDropdown(true);
                  }}
                  onChange={inputHandler}
                />
              </div>
              {searchDropdown && (
                <SearchDropdown
                  ref={searchDropdownRef}
                  input={inputText}
                  storeView={storeView}
                />
              )}
            </div>
            <button onClick={() => setCartMenu(!cartMenu)} ref={cartRef}>
              <BsCart3 size={24} />
              <div className="absolute flex items-center justify-center rounded-full w-[1.1rem] h-[1.1rem] bg-red-500 right-[.5rem] lg:right-[3.4rem] bottom-[2rem]">
                <div className="text-xs text-white">{cartTotal}</div>
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
