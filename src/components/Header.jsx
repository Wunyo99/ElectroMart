import { useState, useContext } from "react";
import {
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  User2,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../components/Cart.jsx";
import { CartContext } from "../store/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { items } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const categories = [
    { name: "All Products", href: "/shop" },
    { name: "Laptops", href: "/shop?category=Laptops" },
    { name: "Phones", href: "/shop?category=Phones" },
    { name: "TVs", href: "/shop?category=TVs" },
    { name: "Audio", href: "/shop?category=Audio" },
    { name: "Kitchen", href: "/shop?category=Kitchen" },
    { name: "Deals", href: "/shop?sale=true" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  const navigateSignIn = () => {
    navigate("/signin");
  };

  return (
    <>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <header className=" bg-white z-100  sticky top-0 w-full shadow-lg py-5 px-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              <Link to="/">
                <span className="text-teal-500">Electro</span>Mart.
              </Link>
            </h1>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute top-4 start-3" size={18} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:outline-teal-500 border-0 bg-[#f1f5f9] rounded-full py-3 pl-10  w-120"
                type="text"
                placeholder="Search for products..."
              />
            </form>
            <div className="flex gap-2">
              {categories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.href}
                  className={`text-gray-500  text-sm font-medium rounded-full hover:bg-[#f1f5f9] py-2 px-4`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="flex gap-6">
              {user ? (
                <a
                  className="flex gap-2 items-center rounded-full hover:bg-[#f1f5f9] py-2 px-4 cursor-pointer"
                  href="/profile"
                >
                  <User2 size={18} />
                  <span className="text-sm">Profile</span>
                </a>
              ) : (
                <button
                  className="flex gap-2 items-center rounded-full hover:bg-[#f1f5f9] py-2 px-4 cursor-pointer"
                  onClick={navigateSignIn}
                >
                  <LogIn size={18} />
                  <span className="text-sm">Sign In</span>
                </button>
              )}

              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative flex gap-2 items-center bg-teal-500 py-2 px-4 rounded-full text-sm text-white font-medium cursor-pointer hover:shadow-lg transition-all"
              >
                <ShoppingBag size={18} />
                <span>Cart</span>
                {items.length > 0 && (
                  <p className="bg-red-500 w-5 h-5 text-sm absolute -top-2 end-0 rounded-full">
                    {items.length}
                  </p>
                )}
              </button>
            </div>
          </div>
          <div className="flex gap-5 md:gap-10 lg:hidden">
            <div className="relative w-12 h-12 rounded-full flex items-center justify-center text-white bg-teal-500">
              <button onClick={() => setIsCartOpen(!isCartOpen)}>
                <ShoppingBag size={20} />
                {items.length > 0 && (
                  <p className="bg-red-500 w-5 h-5 text-sm absolute -top-2 end-0 rounded-full">
                    {items.length}
                  </p>
                )}
              </button>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-5">
            {user ? (
              <a
                className="flex gap-2 items-center rounded-full hover:bg-[#f1f5f9] py-2 px-4 cursor-pointer"
                href="/profile"
              >
                <User2 size={18} />
                <span className="text-sm">Profile</span>
              </a>
            ) : (
              <button
                className="flex gap-2 items-center rounded-full hover:bg-[#f1f5f9] py-2 px-4 cursor-pointer"
                onClick={navigateSignIn}
              >
                <LogIn size={18} />
                <span className="text-sm">Sign In</span>
              </button>
            )}
            <nav className="flex flex-col gap-4 py-4 mt-2">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
