import { rest } from "msw";
import { API_URL } from "../src/api/api";

export const productsMock = [
  {
    id: "0",
    name: "iPhone 14",
    description:
      "iPhone 14 has the same superspeedy chip that’s in iPhone 13 Pro. A15 Bionic, with a 5‑core GPU, powers all the latest features and makes graphically intense games and AR apps feel ultrafluid. An updated internal design delivers better thermal efficiency, so you can stay in the action longer.",
    price: 799,
    inStock: 25,
    picture: "https://github.com/maslomeister/react-shop/blob/master/frontend/public/images/iphone-14.png?raw=true",
  },
  {
    id: "1",
    name: "iPhone 14 Pro",
    description:
      "The iPhone 14 Pro and Pro Max feature a new Super Retina XDR display with updated ProMotion technology that allows for an Always-On display, a first for an iPhone. The Always-On display is made possible through a new 1Hz to 120Hz refresh rate along with improved power efficient technologies. When the Always-On display is active, the time, widgets, and Live Activities remain available at a glance at all times, and the wallpaper is dimmed.",
    price: 999,
    inStock: 25,
    picture: "https://github.com/maslomeister/react-shop/blob/master/frontend/public/images/iphone-14-pro.png?raw=true",
  },
  {
    id: "2",
    name: "iPhone 12",
    description:
      "The iPhone 12 series are the first iPhone models to be supplied from launch without EarPods or a wall adapter, which Apple says was done to reduce carbon emissions and waste since most users already own them. Apple also claims 70% more boxes can fit on a pallet given the smaller box, and thus further reducing emissions.[23] A USB-C to Lightning cord is still included. This change also applies retroactively to all other iPhone models still in production",
    price: 599,
    inStock: 25,
    picture: "https://github.com/maslomeister/react-shop/blob/master/frontend/public/images/iphone-12.png?raw=true",
  },
  {
    id: "3",
    name: "iPhone SE",
    description:
      "The iPhone SE is Apple's entry-level iPhone, starting at $429. The device offers an affordable entry point to the iPhone lineup, with many important features such as a powerful A-series chip, a high-quality camera with 4K video recording, Haptic Touch, wireless charging, water and dust resistance, and more. The current model added the A15 Bionic chip from the iPhone 13, 5G connectivity, an upgraded rear camera with more advanced computational photography capabilities, improved battery life, and stronger glass",
    price: 429,
    inStock: 25,
    picture: "https://github.com/maslomeister/react-shop/blob/master/frontend/public/images/iphone-se.png?raw=true",
  },
  {
    id: "4",
    name: "AirPods Pro",
    description:
      "AirPods Pro (2nd generation) have been reengineered to deliver up to 2x more Active Noise Cancellation. Adaptive Transparency reduces external noise, while Personalized Spatial Audio immerses you in sound. A single charge delivers up to 6 hours of battery life.⁷ And Touch control lets you easily adjust volume with a swipe. The revamped MagSafe Charging Case is a marvel on its own with Precision Finding¹⁵, built-in speaker, and lanyard loop.",
    price: 249,
    inStock: 30,
    picture: "https://github.com/maslomeister/react-shop/blob/master/frontend/public/images/airpods-pro.png?raw=true",
  },
  {
    id: "5",
    name: "AirTag",
    description:
      "AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.",
    price: 29,
    inStock: 30,
    picture: "https://github.com/maslomeister/react-shop/blob/master/frontend/public/images/airtag.png?raw=true",
  },
  {
    id: "6",
    name: "Apple Watch Ultra",
    description:
      "The aerospace-grade titanium case strikes the perfect balance of weight, durability, and corrosion resistance. The rugged Alpine Loop is made from two textile layers woven together into one continuous piece without stitching, with a titanium G-hook to ensure a secure fit.",
    price: 799,
    inStock: 5,
    picture: "https://github.com/maslomeister/react-shop/blob/master/frontend/public/images/apple-watch-ultra.png?raw=true",
  },
  {
    id: "7",
    name: "iPad Pro",
    description:
      "The iPad Pro is Apple's high-end tablet computer. The latest iPad Pro models feature a powerful M1 chip, a Thunderbolt port, an improved front-facing camera, a Liquid Retina XDR mini-LED display option on the larger model, and up to 16GB of RAM and 2TB of storage.",
    price: 799,
    inStock: 5,
    picture: "https://github.com/maslomeister/react-shop/blob/master/frontend/public/images/ipad-pro.png?raw=true",
  },
  {
    id: "8",
    name: "iPad Air",
    description:
      "The fourth generation of iPad Air was announced on September 15, 2020, and released on October 23. It used an Apple A14 Bionic chip, which comprised 11.9 billion transistors, a 40% faster 6-core CPU, a 30% faster 4-core GPU, and an embedded Neural Engine that can process 11 trillion operations per second. Its 10.9-inch Liquid Retina Screen display have a resolution of 2360 by 1640 pixels (3.8 million pixels). Its front 7-megapixel Facetime Camera is of 1080p and 60 fps.",
    price: 599,
    inStock: 4,
    picture: "https://github.com/maslomeister/react-shop/blob/master/frontend/public/images/ipad-air.png?raw=true",
  },
  {
    id: "9",
    name: "iPad Mini",
    description:
      "The sixth generation of iPad Mini was announced and released on September 24, 2021. It uses an Apple A15 Bionic chip, with a 40% faster 6-core CPU and 80% faster 5-core GPU. Its 16-core Neural Engine and AI accelerators within the CPU delivers a 2x boost of AI performance. Its 12-megapixel Ultra Wide front camera featured Apple's 'Center Stage Mode' technology, while its 12-megapixel back camera had larger apertures.",
    price: 499,
    inStock: 5,
    picture: "https://github.com/maslomeister/react-shop/blob/master/frontend/public/images/ipad-mini.png?raw=true",
  },
];

export const productWithId0Mock = {
  id: "0",
  name: "iPhone 14",
  description:
    "iPhone 14 has the same superspeedy chip that’s in iPhone 13 Pro. A15 Bionic, with a 5‑core GPU, powers all the latest features and makes graphically intense games and AR apps feel ultrafluid. An updated internal design delivers better thermal efficiency, so you can stay in the action longer.",
  price: 799,
  inStock: 25,
  picture: "https://github.com/maslomeister/react-shop/blob/master/frontend/public/images/iphone-14.png?raw=true",
};

export const cartWithItemMock = [
  {
    id: "0",
    name: "iPhone 14",
    price: 799,
    quantity: 1,
    totalPrice: 799,
  },
];

export const loginUserDataMock: IUserData = {
  authToken: "auth1234",
  userRole: "user",
  name: "Customer",
};

export const loginAdminDataMock: IUserData = {
  authToken: "auth1234",
  userRole: "admin",
  name: "Customer",
};

export const handlers = [
  rest.get(`${API_URL}/products`, (req, res, ctx) => {
    return res(ctx.json(productsMock), ctx.delay(150));
  }),

  rest.get(`${API_URL}/products/0`, (req, res, ctx) => {
    return res(ctx.json(productWithId0Mock), ctx.delay(150));
  }),

  rest.get(`${API_URL}/cart`, (req, res, ctx) => {
    return res(ctx.json(cartWithItemMock), ctx.delay(150));
  }),

  rest.get(`${API_URL}/auth`, (req, res, ctx) => {
    return res(ctx.json({ authToken: "auth1234", userRole: "user", name: "User" }), ctx.delay(150));
  }),

  rest.put(`${API_URL}/cart`, (req, res, ctx) => {
    return res(ctx.json(productWithId0Mock), ctx.delay(150));
  }),
];
