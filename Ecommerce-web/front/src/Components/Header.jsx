import { Link } from "react-router-dom";
import { useEcom } from "../context/EcomProvider";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import instance from "../axiosConfig";


function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cart, categories, fetchCategories } = useEcom();
  const { isUserLoggedIn, Logout } = useAuth();

  useEffect(() => {
    async function getCategories() {
      await fetchCategories(); 
    }
    getCategories();
  }, []);

  async function handleLogout() {
    try {
        const response = await instance.post("/LogoutUser", {}, { withCredentials: true });

        if (response.status === 200) {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setIsUserLoggedIn(false);
        }
    } catch (error) {
        console.log("Logout Error:", error);
    }
}


  return (
    <div className="flex justify-between bg-amber-200 px-12 py-2 mb-4">
      <Link to="/">
        <div className="font-bold text-xl">Ecommerce</div>
      </Link>
      <ul className="flex gap-4">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/wishlist">
          <p className="flex items-center">
            Wishlist{" "}
            <span className="px-1">
              <FaHeart />
            </span>
          </p>
        </Link>
        <li>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="rounded-lg px-3 text-center inline-flex items-center relative cursor-pointer"
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            Shop By Category
            <svg
              className="w-2.5 h-2.5 ms-3 transition-all duration-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
              style={dropdownOpen ? { transform: "rotate(180deg)" } : {}}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdown"
            className={`z-1 ${
              dropdownOpen ? "block" : "hidden"
            } bg-white divide-y divide-gray-100 shadow-sm w-44 dark:bg-amber-400 absolute mt-3`}
          >
            <ul
              className="py-2 text-sm text-black dark:text-black"
              aria-labelledby="dropdownDefaultButton"
            >
              {categories.length > 0 &&
                categories.map((category, index) => {
                  console.log(categories);

                  return (
                    <li key={index}>
                      <a
                        href={`/category/${category.category.toLowerCase()}`}
                        className="block w-full px-4 py-2 hover:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                      >
                        {category.category}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </li>

        <li>
          {isUserLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/user/login">Login</Link>
          )}
        </li>

        <Link to="/cart">
          <p className="flex relative">
            Cart
            <span className="absolute right-[-14px] top-[-9px] rounded-full bg-red-600 text-white px-[5px] mt-1 text-xs">
              {cart.length > 0 ? cart.length : cart.length}
            </span>
            <FaCartShopping className="text-lg mt-1" />
          </p>
        </Link>
      </ul>
    </div>
  );
}

export default Header;
