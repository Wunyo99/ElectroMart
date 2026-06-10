import {
  ChefHat,
  Headphones,
  Laptop,
  MoveRight,
  Smartphone,
  Tv,
  Watch,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const ShopCategory = () => {
  const shopCategory = [
    {
      icon: <Laptop />,
      name: "Laptops",
      desc: "Powerful computing",
      color: "text-blue-500",
      bg: "bg-blue-100",
      href: "/shop?category=Laptops",
    },
    {
      icon: <Smartphone />,
      name: "Phones",
      desc: "Stay connected",
      color: "text-violet-500",
      bg: "bg-violet-100",
      href: "/shop?category=Phones",
    },
    {
      icon: <Tv />,
      name: "TVs",
      desc: "Cinema at home",
      color: "text-pink-500",
      bg: "bg-pink-100",
      href: "/shop?category=TVs",
    },
    {
      icon: <Headphones />,
      name: "Audio",
      desc: "Premium sound",
      color: "text-orange-500",
      bg: "bg-orange-100",
      href: "/shop?category=Audio",
    },
    {
      icon: <ChefHat />,
      name: "Kitchen",
      desc: "Modern cooking",
      color: "text-green-500",
      bg: "bg-green-100",
      href: "/shop?category=Kitchen",
    },
    {
      icon: <Watch />,
      name: "Wearables",
      desc: "Smart lifestyle",
      color: "text-cyan-500",
      bg: "bg-cyan-100",
      href: "/shop?category=Wearables",
    },
  ];

  return (
    <section className="px-5 py-20 bg-gray-50 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay:0.2}}
      >
        <p className="text-center font-medium text-sm text-teal-500 tracking-wider uppercase mb-2">
          Browse by category
        </p>
        <h2 className="text-3xl text-center font-bold ">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
        {shopCategory.map((shopCat, idx) => (
            <Link
              to={shopCat.href}
              key={idx}
              className="border h-50 text-center bg-white border-gray-300 p-5 group hover:shadow-lg rounded-2xl"
            >
              <div
                className={`w-15 h-15 rounded-2xl mx-auto flex items-center justify-center mb-4 group-hover:scale-109 duration-300 ${shopCat.color} ${shopCat.bg}`}
              >
                {shopCat.icon}
              </div>
              <h5 className="font-semibold text-xl mb-2 group-hover:text-teal-500">
                {shopCat.name}
              </h5>
              <p className="text-sm text-gray-500 font-medium mb-2">
                {shopCat.desc}
              </p>
              <div className="flex justify-center">
                <MoveRight
                  size={17}
                  className="text-teal-500 lg:hidden group-hover:block "
                />
              </div>
            </Link>
        ))}
      </div>
              </motion.div>

    </section>
  );
};

export default ShopCategory;
