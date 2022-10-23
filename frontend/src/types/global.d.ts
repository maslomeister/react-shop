declare module "*.css";

declare module "*.svg" {
  const content: string;
  export default content;
}

interface IUserData {
  authToken: string;
  userRole: "user" | "admin";
  name: string;
}

interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: number;
  picture: string;
}

interface ICartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface IProductData {
  name: string;
  description: string;
  price: number;
  inStock: number;
}
