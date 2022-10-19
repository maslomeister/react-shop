import { Dispatch } from "react";

export const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5069/api" : "https://maslomeister-shop.herokuapp.com/api";

interface IError {
  error?: boolean;
  msg?: string | unknown;
}

export const getData = async <T>(url: string, minDelay: number, params?: RequestInit | undefined): Promise<T | IError> => {
  try {
    const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === "rejected";

    const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

    const data = fetch(url, params).then((data) => data.json());
    const res = await Promise.allSettled([data, new Promise((resolve) => setTimeout(resolve, minDelay))]);

    const response = res.find(isFulfilled)?.value;

    const error = res.find(isRejected)?.reason;
    if (error) {
      throw error;
    }

    return response;
  } catch (err) {
    if (err instanceof Error) {
      return { error: true, msg: err.message };
    }
    return { error: true, msg: err };
  }
};

function isError<T>(pet: T | IError): pet is IError {
  return (pet as IError).error !== undefined;
}

const checkForError = (data: IError) => {
  if (data.error) {
    throw data.msg;
  }
};

export const fetchProductsApi = async (
  dispatch: Dispatch<IFetchProductsRequest | IFetchProductsSuccess | IFetchProductsError>,
  onRequest: () => IFetchProductsRequest,
  onSuccess: (data: IProduct[]) => IFetchProductsSuccess,
  onError: (error: string) => IFetchProductsError
) => {
  dispatch(onRequest());
  try {
    const data = await getData<IProduct[]>(API_URL + "/products", 300);
    if (isError(data)) {
      checkForError(data);
    } else {
      dispatch(onSuccess(data));
    }
  } catch (err) {
    dispatch(onError(err as string));
  }
};

export const fetchProductApi = async (
  id: string,
  dispatch: Dispatch<IFetchProductRequest | IFetchProductSuccess | IFetchProductError>,
  onRequest: () => IFetchProductRequest,
  onSuccess: (data: IProduct) => IFetchProductSuccess,
  onError: (error: string) => IFetchProductError
) => {
  dispatch(onRequest());
  try {
    const data = await getData<IProduct>(`${API_URL}/products/${id}`, 300);
    if (isError(data)) {
      checkForError(data);
    } else {
      dispatch(onSuccess(data));
    }
  } catch (err) {
    onError(err as string);
  }
};

export const changeProductInfoApi = async (
  id: string,
  authToken: string,
  productData: IProductData,
  onRequest: () => void,
  onSuccess: (data: IProductData) => void,
  onError: (error: string) => void
) => {
  onRequest();
  try {
    const data = await getData<IProductData>(`${API_URL}/products/${id}`, 300, {
      method: "PUT",
      headers: { Authorization: authToken, "Content-Type": "application/json" },
      body: JSON.stringify({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        inStock: productData.inStock,
      }),
    });
    if (isError(data)) {
      checkForError(data);
    } else {
      onSuccess(data);
    }
  } catch (err) {
    onError(err as string);
  }
};

export const addProductToCartApi = async (
  productId: string,
  authToken: string,
  onRequest: () => void,
  onSuccess: (data: IProduct) => void,
  onError: (err: string) => void,
  quantity?: number
) => {
  onRequest();
  try {
    const data = await getData<IProduct>(API_URL + "/cart", 500, {
      method: "PUT",
      headers: { Authorization: authToken, "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    if (isError(data)) {
      checkForError(data);
    } else {
      onSuccess(data);
    }
  } catch (err) {
    onError(err as string);
  }
};

export const deleteProductFromCartApi = async (
  productId: string,
  authToken: string,
  onRequest: () => void,
  onSuccess: (data: Record<string, never>) => void,
  onError: (err: string) => void
) => {
  onRequest();
  try {
    const data = await getData<Record<string, never>>(API_URL + "/cart", 500, {
      method: "DELETE",
      headers: { Authorization: authToken, "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    if (isError(data)) {
      checkForError(data);
    } else {
      onSuccess(data);
    }
  } catch (err) {
    onError(err as string);
  }
};

export const loginUserApi = async (
  login: string,
  password: string,
  dispatch: Dispatch<ILoginUserRequest | ILoginUserSuccess>,
  onRequest: () => ILoginUserRequest,
  onSuccess: (data: IUserData) => ILoginUserSuccess,
  onError: (error: string) => void
) => {
  dispatch(onRequest());
  try {
    const data = await getData<IUserData>(API_URL + "/auth", 300, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    if (isError(data)) {
      checkForError(data);
    } else {
      dispatch(onSuccess(data));
    }
  } catch (err) {
    onError(err as string);
  }
};

export const registerUserApi = async (
  login: string,
  password: string,
  dispatch: Dispatch<IRegisterUserRequest | IRegisterUserSuccess>,
  onRequest: () => IRegisterUserRequest,
  onSuccess: (data: IUserData) => IRegisterUserSuccess,
  onError: (error: string) => void
) => {
  dispatch(onRequest());
  try {
    const data = await getData<IUserData>(API_URL + "/register", 300, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    if (isError(data)) {
      checkForError(data);
    } else {
      dispatch(onSuccess(data));
    }
  } catch (err) {
    onError(err as string);
  }
};

export const verifyUserApi = async (
  authToken: string,
  onRequest: () => void,
  onSuccess: (data: IUserData) => void,
  onError: (err: string) => void
) => {
  onRequest();
  try {
    const data = await getData<IUserData>(API_URL + "/auth", 300, {
      headers: { Authorization: authToken, "Content-Type": "application/json" },
    });
    if (isError(data)) {
      checkForError(data);
    } else {
      onSuccess(data);
    }
  } catch (err) {
    onError(err as string);
  }
};

export const fetchCartApi = async (
  authToken: string,
  dispatch: Dispatch<ICartDataRequest | ICartDataSuccess | ICartDataError>,
  onRequest: () => ICartDataRequest,
  onSuccess: (data: ICartProduct[]) => ICartDataSuccess,
  onError: (err: string) => ICartDataError
) => {
  dispatch(onRequest());
  try {
    const data = await getData<ICartProduct[]>(API_URL + "/cart", 300, {
      headers: { Authorization: authToken, "Content-Type": "application/json" },
    });
    if (isError(data)) {
      checkForError(data);
    } else {
      dispatch(onSuccess(data));
    }
  } catch (err) {
    dispatch(onError(err as string));
  }
};

export const clearCartApi = async (
  authToken: string,
  onRequest: () => void,
  onSuccess: (data: []) => void,
  onError: (err: string) => void
) => {
  onRequest();
  try {
    const data = await getData<[]>(API_URL + "/cart", 500, {
      method: "DELETE",
      headers: { Authorization: authToken, "Content-Type": "application/json" },
    });
    if (isError(data)) {
      checkForError(data);
    } else {
      onSuccess(data);
    }
  } catch (err) {
    onError(err as string);
  }
};
