import { Products } from "../products";
import ProductCard from "../components/ProductCard";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, Funnel, X } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  "All",
  "Laptops",
  "Phones",
  "TVs",
  "Audio",
  "Kitchen",
  "Wearables",
];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Avg. Customer Review", value: "rating" },
  { label: "Newest Arrivals", value: "newest" },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const searchQuery = searchParams.get("search") || "";
  const showSale = searchParams.get("sale") === "true";
  const showNew = searchParams.get("new") === "true";

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let filtered = [...Products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (showSale) filtered = filtered.filter((p) => p.isSale);
    if (showNew) filtered = filtered.filter((p) => p.isNew);

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        filtered = filtered
          .filter((p) => p.isNew)
          .concat(filtered.filter((p) => !p.isNew));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy, searchQuery, showNew, showSale]);

  const getPageTitle = () => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (showSale) return "Today's Deals";
    if (showNew) return "New Arrivals";
    if (selectedCategory !== "All") return selectedCategory;
    return "All Products";
  };

  return (
    <>
      <section>
        <div className="p-8 bg-teal-300/10">
          <h1 className="text-2xl md:text-3xl font-bold">{getPageTitle()}</h1>
        </div>

        <div className="border border-gray-200 bg-white p-3 px-8 flex items-center justify-between mb-5">
          <p className="text-sm">{filteredProducts.length} results</p>

          <div className="md:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <Funnel size={16} />
              <span>Filter</span>
            </button>

            {isFilterOpen && (
              <div className="bg-white fixed p-5 inset-0 z-50 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-medium">Filters</h5>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X />
                  </button>
                </div>

                <div className="mt-15">
                  <h5 className="font-medium py-4">Category</h5>
                  <div className="flex flex-wrap gap-4">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          if (category === "All") setSearchParams({});
                          else setSearchParams({ category });
                          setIsFilterOpen(false);
                        }}
                        className={`px-4 py-2 text-sm rounded-full border transition-all ${
                          selectedCategory === category
                            ? "border-teal-500 bg-teal-500 text-white"
                            : "border-border hover:border-teal-500"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative group">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2"
            >
              <span className="text-sm">
                Sort by: {sortOptions.find((o) => o.value === sortBy)?.label}
              </span>
              <ChevronDown />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-300 shadow-lg rounded-lg transition-all z-10 min-w-50">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsSortOpen(!isSortOpen);
                    }}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sortBy === option.value
                        ? "bg-teal-50 text-teal-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-7 px-5">
        <div className="flex gap-6">
          <aside className="hidden md:block bg-white shrink-0 w-56">
            <div className="sticky top-40">
              <h3 className="font-bold mb-2">Category</h3>
              <ul className="space-y-2">
                {categories.map((category) => {
                  const href =
                    category === "All" ? "/shop" : `/shop?category=${category}`;
                  return (
                    <li key={category}>
                      <Link
                        to={href}
                        className={`text-sm transition-colors cursor-pointer ${
                          selectedCategory === category
                            ? "text-teal-500 font-semibold"
                            : "text-gray-500 hover:text-black"
                        }`}
                      >
                        {category}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Shop;
