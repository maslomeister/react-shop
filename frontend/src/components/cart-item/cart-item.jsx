import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductToCart, deleteProductFromCart } from "../../api/api";
import { addToCart, removeItemFromCart } from "../../store/actions/shop";
import { Button } from "../button/button";

import styles from "./cart-item.module.css";

export const CartItem = ({ id, name, price, quantity, total }) => {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.shop);

  const canAddItem = useMemo(() => {
    if (products.length > 0) {
      const productIndex = products.findIndex((product) => product.id === id);

      if (products[productIndex].inStock > 0) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }, [id, products]);

  const [itemState, setItemState] = useState({
    amountLoading: false,
    amountError: false,
    deleteLoading: false,
    deleteError: false,
  });

  const changeAmountToCart = (action) => {
    switch (action) {
      case "inc":
        changeAmount(1);
        break;
      case "dec":
        if (quantity - 1 === 0) {
          deleteItem();
        } else {
          changeAmount(-1);
        }
        break;
      default:
        changeAmount(1);
        break;
    }
  };

  const changeAmount = (amount) => {
    addProductToCart(
      id,
      authToken,
      amount,
      () => {
        setItemState((prevState) => {
          return { ...prevState, amountLoading: true };
        });
      },
      () => {
        setItemState((prevState) => {
          return { ...prevState, amountLoading: false };
        });
        dispatch(addToCart(id, amount));
      },
      () => {
        setItemState((prevState) => {
          return { ...prevState, amountLoading: false, amountError: true };
        });
        setTimeout(
          () =>
            setItemState((prevState) => {
              return { ...prevState, amountLoading: false, amountError: false };
            }),
          1000
        );
      }
    );
  };

  const deleteItem = () => {
    deleteProductFromCart(
      id,
      authToken,
      () =>
        setItemState((prevState) => {
          return { ...prevState, amountLoading: true, deleteLoading: true };
        }),
      () => {
        setItemState((prevState) => {
          return { ...prevState, amountLoading: false, deleteLoading: false };
        });
        dispatch(removeItemFromCart(id));
      },
      () => {
        setItemState((prevState) => {
          return { ...prevState, amountLoading: false, deleteLoading: false, deleteError: true };
        });
        setTimeout(
          () =>
            setItemState((prevState) => {
              return { ...prevState, deleteLoading: false, deleteError: false };
            }),
          1000
        );
      }
    );
  };

  const showAmount = useMemo(() => {
    if (itemState.amountLoading) {
      return <p>Загрузка</p>;
    } else if (itemState.amountError) {
      return <p>Ошибка</p>;
    }

    return (
      <>
        <p className={styles["change-amount"]} onClick={() => changeAmountToCart("dec")}>
          -
        </p>
        <p>{quantity}</p>
        {canAddItem ? (
          <p className={styles["change-amount"]} onClick={() => changeAmountToCart("inc")}>
            +
          </p>
        ) : (
          <p className={styles.invisible}>+</p>
        )}
      </>
    );
  }, [itemState]);

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}$</td>
      <td>
        <div className={styles.amount}>{showAmount}</div>
      </td>
      <td>{total}$</td>
      <td>
        <Button variant="red" loading={itemState.deleteLoading} error={itemState.deleteError} onClick={deleteItem}>
          Удалить
        </Button>
      </td>
    </tr>
  );
};
