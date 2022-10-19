import React, { useEffect, useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import { useParams } from "react-router-dom";

import { changeProductInfoApi, fetchProductApi } from "../../api/api";
import { fetchProductRequest, fetchProductSuccess, fetchProductError, changeProductData } from "../../store/actions/shop";
import { EditOrBuyButton } from "./components/edit-or-buy-button/edit-or-buy-button";
import { ShowAuthenticatedProduct } from "./components/show-authenticated-product/show-authenticated-product";
import { InputOrTitle } from "./components/input-or-title/input-or-title";
import { TextAreaOrDescription } from "./components/text-area-or-description/text-area-or-description";
import { ShowErrorOrLoading } from "../../components/show-error-or-loading/show-error-or-loading";
import { CartAmount } from "./components/cart-amount/cart-amount";
import { InputOrPrice } from "./components/input-or-price/input-or-price";
import { InputOrAmount } from "./components/input-or-amount/input-or-amount";
import { allowOnlyNumbers } from "../../utils/utils";

import styles from "./product.module.css";

const errorsDefault = { name: "", description: "", price: "", inStock: "" };

export const Product: React.FC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { product, productError, productLoading } = useAppSelector((state) => state.shop);
  const { authenticated, authToken, isUser } = useAppSelector((state) => state.auth);

  const [editItemState, setEditItemState] = useState({
    editMode: false,
    name: "",
    description: "",
    price: 0,
    inStock: 0,
  });

  const changeItemField = (field: string, value: string | number) => {
    setEditItemState((prevState) => {
      return { ...prevState, [field]: value };
    });
  };

  const [editItemErrors, setEditItemErrors] = useState({
    ...errorsDefault,
  });

  const changeItemErrorField = (field: string, value: string) => {
    setEditItemErrors((prevState) => {
      return { ...prevState, [field]: value };
    });
  };

  const [changeProductState, setChangeProductState] = useState({
    loading: false,
    isError: false,
    error: "",
  });

  const resetEditItemState = () => {
    setEditItemState({
      editMode: false,
      name: product.name,
      description: product.description,
      price: product.price,
      inStock: product.inStock,
    });
    setEditItemErrors({ ...errorsDefault });
  };

  const validateName = () => {
    const name = editItemState.name.trim();

    if (name.length === 0) {
      changeItemErrorField("name", "Поле пустое. Заполните пожалуйста");
      return false;
    } else {
      changeItemErrorField("name", "");
      return true;
    }
  };

  const validateDescription = () => {
    const description = editItemState.description.trim();

    if (description.length === 0) {
      changeItemErrorField("description", "Поле пустое. Заполните пожалуйста");
      return false;
    } else if (description.length > 600) {
      changeItemErrorField("description", "Превышен лимит символов");
    } else {
      changeItemErrorField("description", "");
      return true;
    }
  };

  const validatePrice = () => {
    const price = editItemState.price;
    if (price === 0) {
      changeItemErrorField("price", "Цена не может быть 0");
      return false;
    } else {
      changeItemErrorField("price", "");
      return true;
    }
  };

  const inputsError = useMemo(() => {
    if (JSON.stringify(editItemErrors) !== JSON.stringify({ ...errorsDefault })) {
      return "В каком-то из полей ошибка";
    } else if (changeProductState.error) {
      return changeProductState.error;
    } else {
      return "";
    }
  }, [editItemErrors, changeProductState.error]);

  const changeProductInfo = () => {
    const product = {
      name: editItemState.name,
      description: editItemState.description,
      price: editItemState.price,
      inStock: editItemState.inStock,
    };

    validateName();
    validatePrice();
    validateDescription();

    if (validateName() && validatePrice() && validateDescription()) {
      changeProductInfoApi(
        id,
        authToken,
        product,
        () => {
          setChangeProductState((prevState) => {
            return { ...prevState, loading: true };
          });
        },
        () => {
          setChangeProductState((prevState) => {
            return { ...prevState, loading: false };
          });
          dispatch(changeProductData(id, product));
        },
        (err) => {
          setChangeProductState((prevState) => {
            return { ...prevState, loading: false, isError: true, error: err };
          });
          setTimeout(() => {
            setChangeProductState((prevState) => {
              return { ...prevState, loading: false, isError: false, error: "" };
            });
          }, 1000);
        }
      );
    }
  };

  useEffect(() => {
    fetchProductApi(id, dispatch, fetchProductRequest, fetchProductSuccess, fetchProductError);
  }, []);

  useEffect(() => {
    if (editItemState.editMode) {
      if (editItemState.description.length >= 0) {
        validateDescription();
      }
    }
  }, [editItemState]);

  useEffect(() => {
    if (!authenticated) {
      resetEditItemState();
    }
    if (product.name) {
      setEditItemState({
        editMode: false,
        name: product.name,
        description: product.description,
        price: product.price,
        inStock: product.inStock,
      });
    }
  }, [authenticated, product]);

  return (
    <main className={styles.product}>
      <ShowErrorOrLoading loading={productLoading} error={productError}>
        <div data-testid="product-data" className={styles.data}>
          <div className={styles["main-info"]}>
            <img className={styles.image} src={product.picture} alt="product" />
            <div className={styles["name-price"]}>
              <InputOrTitle
                value={editItemState.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeItemField("name", event.target.value)}
                error={editItemErrors.name}
                onBlur={validateName}
                readOnly={changeProductState.loading}
                editMode={editItemState.editMode}
              />
              <InputOrPrice
                value={editItemState.price}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  changeItemField("price", Number(allowOnlyNumbers(event.target.value)));
                }}
                error={editItemErrors.price}
                onBlur={validatePrice}
                readOnly={changeProductState.loading}
                editMode={editItemState.editMode}
              />
              <InputOrAmount
                value={editItemState.inStock}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  changeItemField("inStock", Number(allowOnlyNumbers(event.target.value)));
                }}
                error={editItemErrors.inStock}
                readOnly={changeProductState.loading}
                editMode={editItemState.editMode}
              />
              <ShowAuthenticatedProduct authenticated={authenticated} isUser={isUser} inStock={product.inStock}>
                <EditOrBuyButton
                  isUser={isUser}
                  editMode={editItemState.editMode}
                  setEditMode={(mode: boolean) =>
                    setEditItemState((prevState) => {
                      return { ...prevState, editMode: mode };
                    })
                  }
                  resetEditItemState={resetEditItemState}
                  onSave={changeProductInfo}
                  onSaveLoading={changeProductState.loading}
                  onSaveError={changeProductState.error}
                  validationsError={inputsError}
                >
                  <CartAmount id={id} inStock={product.inStock} authToken={authToken} />
                </EditOrBuyButton>
              </ShowAuthenticatedProduct>
            </div>
          </div>
          <TextAreaOrDescription
            value={editItemState.description}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEditItemState((prevState) => {
                return { ...prevState, description: event.target.value };
              })
            }
            readOnly={changeProductState.loading}
            error={editItemErrors.description}
            editMode={editItemState.editMode}
          />
        </div>
      </ShowErrorOrLoading>
    </main>
  );
};
