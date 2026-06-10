export const Products = [
  // Laptops
  {
    id: "1",
    name: 'ZenBook Pro 14"',
    price: 1199,
    originalPrice: 1399,
    image:
      "https://www.laptopsdirect.co.uk/Images/UX6404VV-P4047W_1_Supersize.jpg?v=3",
    category: "Laptops",
    description:
      "Ultra-slim performance laptop with Intel i7 processor, 16GB RAM, and fast 1TB SSD storage.",
    specs: ["16GB RAM", "1TB SSD", "Intel i7 Processor"],
    colors: ["Midnight Black", "Silver"],
    isSale: true,
    rating: 4.6,
    reviewCount: 1875,
  },
  {
    id: "7",
    name: "ThinkPad X1 Carbon Gen 11",
    price: 1499,
    originalPrice: 1699,
    image:
      "https://i5.walmartimages.com/seo/Lenovo-ThinkPad-X1-Carbon-Gen-10-21CB-180-degree-hinge-design-Intel-Core-i7-1260P-4-7-GHz-Evo-Win-11-Pro-Intel-Iris-Xe-Graphics-16-GB-RAM-1-TB-SSD-TC_efd2fbf6-79d9-4ad7-b5bf-7faa4392574e.0f18c5319202b03044706c516d5e0c4b.jpeg",
    category: "Laptops",
    description:
      "Business-class laptop with powerful Intel i7 chip, lightweight carbon fiber body, and long battery life.",
    specs: ["16GB RAM", "1TB SSD", "Intel Evo i7"],
    colors: ["Black"],
    isSale: false,
    rating: 4.7,
    reviewCount: 3421,
  },
  {
    id: "9",
    name: "Dell XPS 13 Plus",
    price: 1399,
    originalPrice: 1599,
    image:
      "https://www.dellonline.co.za/cdn/shop/products/9AE50C64-ECCD-4257-A4A4-13CABF8A9FB4_147845_720x.jpg?v=1691048848",
    category: "Laptops",
    description:
      "Premium compact laptop with stunning OLED display, 13th Gen Intel processor, and lightning-fast SSD.",
    specs: ["16GB RAM", "512GB SSD", "Intel i7 13th Gen"],
    colors: ["Silver", "Graphite"],
    isSale: true,
    rating: 4.5,
    reviewCount: 2210,
  },
  {
    id: "10",
    name: "HP Spectre x360 14",
    price: 1299,
    originalPrice: 1499,
    image:
      "https://costtocost.ae/wp-content/uploads/2025/01/HP-Spectre-x360-14-eu0036nia-on-costtocost.ae-2.webp",
    category: "Laptops",
    description:
      "Convertible 2-in-1 laptop with touchscreen display, Intel Evo platform, and premium aluminum design.",
    specs: ["16GB RAM", "1TB SSD", "Intel Evo i7"],
    colors: ["Nightfall Black", "Poseidon Blue"],
    isSale: true,
    rating: 4.6,
    reviewCount: 1984,
  },
  {
    id: "11",
    name: 'MacBook Air 15"',
    price: 1399,
    originalPrice: 1499,
    image:
      "https://macfinder.co.uk/product-images/Macbook/A2941/MacBook-Air-13-Inch-97318.jpg",
    category: "Laptops",
    description:
      "Thin and powerful laptop with Apple M3 chip, long battery life, and a brilliant Liquid Retina display.",
    specs: ["16GB RAM", "512GB SSD", "M3 Chip"],
    colors: ["Black", "Silver", "Space Gray"],
    isSale: false,
    rating: 4.8,
    reviewCount: 4120,
  },

  // Phones
  {
    id: "2",
    name: "iPhone 15 Pro Max",
    price: 1199,
    image:
      "https://valuehubkenya.co.ke/wp-content/uploads/2025/10/apple-iphone-15-pro-max-1.jpg",
    category: "Phones",
    description:
      'Apple flagship smartphone with 6.7" Super Retina XDR display, A17 Pro chip, and advanced triple-camera system.',
    specs: ["256GB Storage", '6.7" Display', "5G"],
    colors: ["Gray", "Titanium Blue", "Natural Titanium"],
    isNew: false,
    rating: 4.8,
    reviewCount: 8450,
  },
  {
    id: "12",
    name: "Samsung Galaxy S24 Ultra",
    price: 1199,
    image:
      "https://bestpricegh.com/cdn/shop/files/Frame1_96536051-a8cf-42ee-ae83-25d81233bc90.png?crop=center&height=600&v=1707767157&width=600",
    category: "Phones",
    description:
      'Premium Android smartphone with 200MP camera, Snapdragon processor, and a stunning 6.8" Dynamic AMOLED display.',
    specs: ["512GB Storage", '6.8" Display', "5G"],
    colors: ["Gold", "Titanium Black", "Violet"],
    isNew: false,
    rating: 4.7,
    reviewCount: 6920,
  },
  {
    id: "13",
    name: "Google Pixel 8 Pro",
    price: 999,
    image:
      "https://phonehubkenya.co.ke/wp-content/uploads/2023/11/Google-Pixel-8-Pro-510x510.jpg",
    category: "Phones",
    description:
      "AI-powered smartphone with Google Tensor chip, exceptional computational photography, and smooth 120Hz display.",
    specs: ["256GB Storage", '6.7" Display', "5G"],
    colors: ["Bay Blue", "Porcelain", "Obsidian"],
    isNew: true,
    rating: 4.6,
    reviewCount: 4310,
  },
  {
    id: "14",
    name: "OnePlus 12",
    price: 899,
    image:
      "https://image01.oneplus.net/media/202405/28/b9b7af7dfc54d7ee88769ada1eb02a11.png",
    category: "Phones",
    description:
      "High-performance smartphone with Snapdragon 8 Gen 3 processor, 120Hz AMOLED display, and fast charging.",
    specs: ["256GB Storage", '6.82" Display', "5G"],
    colors: ["Emerald Green", "Silky Black"],
    isNew: true,
    rating: 4.6,
    reviewCount: 2870,
  },
  {
    id: "15",
    name: "Xiaomi 14 Pro",
    price: 799,
    image:
      "https://www.vopmart.com/media/catalog/product/cache/ee14c5ab36c97d39d331f867fa3bee63/x/i/xiaomi_14_pro.jpg",
    category: "Phones",
    description:
      "Premium smartphone with Leica camera system, Snapdragon processor, and a vibrant AMOLED display.",
    specs: ["256GB Storage", '6.73" Display', "5G"],
    colors: ["Black", "White", "Rock Blue"],
    isNew: true,
    rating: 4.5,
    reviewCount: 2150,
  },

  // TVs
  {
    id: "3",
    name: 'Samsung Neo QLED Smart TV 65"',
    price: 1299,
    originalPrice: 1499,
    image:
      "https://static.siamtv.com/media/catalog/product/cache/ac5899292bba0d707f548a520a8c41b3/T/V/TVCL-SS1-QA85QN70FAK_2_260123_220106.jpeg",
    category: "TVs",
    description:
      'Premium 65" Neo QLED 4K TV with Quantum Mini LED technology, HDR10+, and immersive Dolby Atmos sound.',
    specs: ["4K Neo QLED", "HDR10+", "Smart TV"],
    colors: ["Black"],
    isNew: true,
    rating: 4.7,
    reviewCount: 2540,
  },
  {
    id: "8",
    name: 'LG OLED evo Smart TV 55"',
    price: 1399,
    originalPrice: 1599,
    image:
      "https://bf1af2.akinoncloudcdn.com/products/2025/05/28/45979/52190028-1366-4cbc-9f21-8db44d655c20_size3840_cropCenter.jpg",
    category: "TVs",
    description:
      'Stunning 55" OLED evo display with perfect blacks, Dolby Vision, and AI-powered smart features.',
    specs: ["4K OLED", "Dolby Vision", "webOS Smart TV"],
    colors: ["Black"],
    rating: 4.8,
    reviewCount: 3124,
  },

  {
    id: "16",
    name: 'Sony Bravia XR 65" 4K LED TV',
    price: 1199,
    originalPrice: 1399,
    image:
      "https://www.atlanticelectrics.co.uk/cdn/shop/products/sony-bravia-xr-xr65x90j-2021-led-hdr-4k-ultra-hd-smart-google-tv-65-inch-with-freeview-hd-freesat-hd-dolby-atmos-black-584560.jpg?v=1675438227&width=1024",
    category: "TVs",
    description:
      '65" 4K LED TV powered by Sony Cognitive Processor XR with vibrant colors and immersive sound.',
    specs: ["4K LED", "Dolby Vision", "Google TV"],
    colors: ["Black"],
    rating: 4.7,
    reviewCount: 2089,
  },
  {
    id: "17",
    name: 'TCL Q7 55" QLED Smart TV',
    price: 699,
    originalPrice: 849,
    image: "https://http2.mlstatic.com/D_999603-MLA103880964947_012026-C.jpg",
    category: "TVs",
    description:
      'Affordable 55" QLED TV with 4K resolution, Dolby Vision HDR, and smooth gaming performance.',
    specs: ["4K QLED", "Dolby Vision", "Google TV"],
    colors: ["Black"],
    rating: 4.5,
    reviewCount: 1675,
  },
  {
    id: "18",
    name: 'Hisense U8K 65" Mini-LED TV',
    price: 999,
    originalPrice: 1199,
    image: "https://m.media-amazon.com/images/I/41sEU2ammeL._SL500_.jpg",
    category: "TVs",
    description:
      'Bright 65" Mini-LED 4K TV with Quantum Dot color, Dolby Vision HDR, and premium gaming features.',
    specs: ["4K Mini-LED", "Dolby Vision", "Smart TV"],
    colors: ["Black"],
    isNew: true,
    rating: 4.6,
    reviewCount: 1432,
  },

  // Audio
  {
    id: "4",
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    price: 399,
    image:
      "https://www.sevenoakssoundandvision.co.uk/images/product/large/WH1000XM5B.CE7.jpg",
    category: "Audio",
    description:
      "Industry-leading noise cancelling headphones with 30-hour battery life and crystal clear call quality.",
    specs: ["ANC", "30hr Battery", "Bluetooth 5.2"],
    colors: ["Black", "Silver"],
    rating: 4.8,
    reviewCount: 6432,
  },
  {
    id: "19",
    name: "Apple AirPods Pro (2nd Gen)",
    price: 249,
    image: "https://ilabstore.ru/wp-content/uploads/2023/10/MTJV3_AV2.jpeg",
    category: "Audio",
    description:
      "Premium wireless earbuds with adaptive transparency mode, spatial audio, and active noise cancellation.",
    specs: ["ANC", "Spatial Audio", "MagSafe Charging"],
    colors: ["White"],
    rating: 4.7,
    reviewCount: 9521,
  },
  {
    id: "20",
    name: "JBL Charge 5 Portable Bluetooth Speaker",
    price: 179,
    image:
      "https://techstar.ie/cdn/shop/files/Chrage_5_Red__6_800x.jpg?v=1702731664",
    category: "Audio",
    description:
      "Powerful portable speaker with deep bass, IP67 waterproof design, and up to 20 hours of playtime.",
    specs: ["20hr Battery", "IP67 Waterproof", "Bluetooth"],
    colors: ["Red", "Black", "Blue"],
    rating: 4.6,
    reviewCount: 3812,
  },
  {
    id: "21",
    name: "Blue Yeti USB Streaming Microphone",
    price: 129,
    image:
      "https://x.imastudent.com/content/0029800_blue-yeti-usb-microphone-midnight-blue_500.jpeg",
    category: "Audio",
    description:
      "Professional USB microphone perfect for streaming, podcasting, and recording with multiple pickup patterns.",
    specs: ["USB Mic", "Cardioid Mode", "Studio Quality"],
    colors: ["Midnight Blue", "Black", "Silver"],
    isNew: true,
    rating: 4.7,
    reviewCount: 5120,
  },
  {
    id: "22",
    name: "Samsung Galaxy Buds2 Pro",
    price: 229,
    image:
      "https://www.ourfriday.co.uk/image/cache/catalog/Samsung/samsung-galaxy-buds-2-pro-purple-resized-1-800x800.webp",
    category: "Audio",
    description:
      "Compact wireless earbuds with intelligent ANC, 360 audio, and crystal clear sound quality.",
    specs: ["ANC", "360 Audio", "Bluetooth"],
    colors: ["Purple", "Graphite", "White"],
    rating: 4.6,
    reviewCount: 2987,
  },

  // Kitchen
  {
    id: "5",
    name: "Electric Kettle 1.7L Fast Boil",
    price: 49,
    originalPrice: 69,
    image:
      "https://www.breville.co.uk/on/demandware.static/-/Sites-master-catalog/default/dw5c3beaf8/images/highres/UKImages/VKT159-breville-kettle-ss-with-base-front-angle-min.jpg",
    category: "Kitchen",
    description:
      "Fast-boiling electric kettle with 1.7L capacity, automatic shut-off, and stainless steel interior.",
    specs: ["1.7L Capacity", "Fast Boil", "Auto Shut-off"],
    colors: ["Silver", "Black", "White"],
    isSale: true,
    rating: 4.5,
    reviewCount: 2140,
  },

  {
    id: "23",
    name: "Smart Microwave Oven",
    price: 199,
    originalPrice: 249,
    image:
      "https://harmanhouse.com/wp-content/uploads/2021/06/ae-microwave-oven-solo-me6194st-me6194st-xsg-001-front.jpg",
    category: "Kitchen",
    description:
      "Compact microwave oven with 1000W power, multiple cooking presets, and easy digital controls.",
    specs: ["1000W Power", "10 Presets", "Digital Display"],
    colors: ["Silver", "Black"],
    isNew: true,
    rating: 4.4,
    reviewCount: 1765,
  },
  {
    id: "24",
    name: "Automatic Rice Cooker",
    price: 89,
    originalPrice: 119,
    image:
      "https://myhanabishi.com/cdn/shop/files/HHRC560HDRC.jpg?v=1716513865",
    category: "Kitchen",
    description:
      "Easy-to-use rice cooker with 2L capacity, keep-warm function, and non-stick inner pot.",
    specs: ["2L Capacity", "Keep Warm", "Non-stick Pot"],
    colors: ["White", "Black"],
    rating: 4.6,
    reviewCount: 2543,
  },
  {
    id: "25",
    name: "High-Speed Blender",
    price: 149,
    originalPrice: 189,
    image:
      "https://westinghousesmallappliances.com.au/cdn/shop/files/Westinghouse_Blender_800W_Turn_Dial_Control_1.8L_Glass_Jug_-_-_-885087.jpg?v=1741662896",
    category: "Kitchen",
    description:
      "Powerful blender with 1200W motor for smoothies, soups, and sauces with multiple speed settings.",
    specs: ["1200W Motor", "6 Speeds", "Glass Jar"],
    colors: ["Silver", "Black"],
    isNew: true,
    rating: 4.5,
    reviewCount: 1984,
  },
  {
    id: "26",
    name: "Electric Ceramic Stove",
    price: 179,
    originalPrice: 229,
    image: "https://m.media-amazon.com/images/I/41P9-yDdUSL.jpg",
    category: "Kitchen",
    description:
      "Modern electric ceramic cooktop with two heating zones, touch controls, and fast heat-up technology.",
    specs: ["2 Electric Burners", "Touch Control", "Ceramic Glass Surface"],
    colors: ["Black"],
    rating: 4.4,
    reviewCount: 1489,
  },

  // Wearables
  {
    id: "6",
    name: "Apple Watch Series 9",
    price: 399,
    image:
      "https://www.istore.com.ng/cdn/shop/files/Apple_Watch_Series_9_GPS_41mm_PRODUCTRED_Aluminum_PRODUCTRED_Sport_Band_PDP_Image_Position-1__WWEN_1600x.jpg?v=1696660048",
    category: "Wearables",
    description:
      "Premium smartwatch with advanced health monitoring, GPS, ECG support, and seamless iPhone integration.",
    specs: ["GPS", "Heart Rate", "ECG"],
    colors: ["Red", "Silver", "Starlight"],
    isNew: true,
    rating: 4.8,
    reviewCount: 6521,
  },
  {
    id: "27",
    name: "Samsung Galaxy Watch 6",
    price: 349,
    image: "https://m.media-amazon.com/images/I/61UKpO9t2FL.jpg",
    category: "Wearables",
    description:
      "Stylish smartwatch with sleep tracking, body composition analysis, and long-lasting battery life.",
    specs: ["GPS", "Sleep Tracking", "Body Composition"],
    colors: ["White", "Black", "Graphite"],
    isNew: true,
    rating: 4.7,
    reviewCount: 4890,
  },
  {
    id: "28",
    name: "Fitbit Charge 6 Fitness Tracker",
    price: 199,
    image:
      "https://media.kohlsimg.com/is/image/kohls/6626860_Black?wid=1000&hei=1000&op_sharpen=1",
    category: "Wearables",
    description:
      "Lightweight fitness tracker with heart rate monitoring, stress tracking, and built-in GPS.",
    specs: ["GPS", "Heart Rate", "Stress Tracking"],
    colors: ["Black", "Blue", "Coral"],
    isNew: false,
    rating: 4.6,
    reviewCount: 3715,
  },
  {
    id: "35",
    name: "Garmin Venu Sq Smartwatch",
    price: 249,
    image: "https://www.garmin.pk/images/product_gallery/1601044370_2.jpg",
    category: "Wearables",
    description:
      "Fitness-focused smartwatch with detailed workout tracking, pulse ox monitoring, and GPS.",
    specs: ["GPS", "Pulse Ox", "Fitness Tracking"],
    colors: ["Black", "White", "Mint"],
    isNew: true,
    rating: 4.5,
    reviewCount: 2143,
  },
  {
    id: "30",
    name: "Xiaomi Smart Band 8",
    price: 79,
    image:
      "https://xiaomistoreph.com/cdn/shop/files/Xiaomi_SmartBand8_WBG_4_1024x1024.jpg?v=1749552976",
    category: "Wearables",
    description:
      "Affordable fitness band with AMOLED display, 120+ workout modes, and long battery life.",
    specs: ["AMOLED Display", "120 Sports Modes", "14-day Battery"],
    colors: ["White", "Black", "Pink"],
    isNew: true,
    rating: 4.4,
    reviewCount: 2987,
  },
];
