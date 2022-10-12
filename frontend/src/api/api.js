const API_URL = "http://localhost:5069/api";

const getData = async (url, minDelay, params) => {
  const fetchResult = await fetch(url, params);
  const data = await fetchResult.json();
  const [res] = await Promise.allSettled([data, new Promise((resolve) => setTimeout(resolve, minDelay))]);
  return res.value;
};

const checkForError = (data) => {
  if (data.error) {
    throw data.msg;
  }
};

export const fetchProducts = async (dispatch, onRequest, onSuccess, onError) => {
  dispatch(onRequest());
  try {
    const data = await getData(API_URL + "/products", 300);
    checkForError(data);
    dispatch(onSuccess(data));
  } catch (err) {
    dispatch(onError(err));
  }
};

export const fetchProduct = async (id, dispatch, onRequest, onSuccess, onError) => {
  dispatch(onRequest());
  try {
    const data = await getData(`${API_URL}/products/${id}`, 300);
    checkForError(data);
    dispatch(onSuccess(data));
  } catch (err) {
    onError(err);
  }
};

export const addProductToCart = async (productId, authToken, quantity, onRequest, onSuccess, onError) => {
  onRequest();
  try {
    const data = await getData(API_URL + "/cart", 500, {
      method: "PUT",
      headers: { Authorization: authToken, "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    checkForError(data);
    onSuccess(data);
  } catch (err) {
    onError(err);
  }
};

export const deleteProductFromCart = async (productId, authToken, onRequest, onSuccess, onError) => {
  onRequest();
  try {
    const data = await getData(API_URL + "/cart", 500, {
      method: "DELETE",
      headers: { Authorization: authToken, "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    checkForError(data);
    onSuccess(data);
  } catch (err) {
    onError(err);
  }
};

export const loginUser = async (login, password, dispatch, onRequest, onSuccess, onError) => {
  dispatch(onRequest());
  try {
    const data = await getData(API_URL + "/auth", 300, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    checkForError(data);
    dispatch(onSuccess(data));
  } catch (err) {
    dispatch(onError(err));
  }
};

export const fetchCart = async (authToken, dispatch, onRequest, onSuccess, onError) => {
  dispatch(onRequest());
  try {
    const data = await getData(API_URL + "/cart", 300, {
      headers: { Authorization: authToken, "Content-Type": "application/json" },
    });
    checkForError(data);
    dispatch(onSuccess(data));
  } catch (err) {
    dispatch(onError(err));
  }
};

export const clearCart = async (authToken, onRequest, onSuccess, onError) => {
  onRequest();
  try {
    const data = await getData(API_URL + "/cart", 500, {
      method: "DELETE",
      headers: { Authorization: authToken, "Content-Type": "application/json" },
    });
    checkForError(data);
    onSuccess(data);
  } catch (err) {
    onError(err);
  }
};
