import React, { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../store";

import { addProductToCartApi, deleteProductFromCartApi } from "../../api/api";
import { addToCart, removeItemFromCart } from "../../store/actions/shop";
import { Button } from "../button/button";

import styles from "./cart-item.module.css";

interface IProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export const CartItem: React.FC<IProps> = ({ id, name, price, quantity, total }) => {
  const dispatch = useAppDispatch();
  const { authToken } = useAppSelector((state) => state.auth);
  const { products } = useAppSelector((state) => state.shop);

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

  const changeAmountToCart = (action: string) => {
    if (action === "inc") {
      return changeAmount(1);
    }

    if (action === "dec") {
      if (quantity - 1 === 0) {
        return deleteItem();
      } else {
        return changeAmount(-1);
      }
    }
  };

  const changeAmount = (amount: number) => {
    addProductToCartApi(
      id,
      authToken,
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
      },
      amount
    );
  };

  const deleteItem = () => {
    deleteProductFromCartApi(
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
      return <p>ЗАГРУЗКА</p>;
    } else if (itemState.amountError) {
      return <p>ОШИБКА</p>;
    }

    return (
      <>
        <p data-testid="decrease" className={styles["change-amount"]} onClick={() => changeAmountToCart("dec")}>
          -
        </p>
        <p>{quantity}</p>
        {canAddItem ? (
          <p data-testid="increase" className={styles["change-amount"]} onClick={() => changeAmountToCart("inc")}>
            +
          </p>
        ) : (
          <p data-testid="no-increase" className={styles.invisible}>
            +
          </p>
        )}
      </>
    );
  }, [itemState]);

  return (
    <tr data-testid={`cart-item-${id}`}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}$</td>
      <td>
        <div className={styles.amount}>{showAmount}</div>
      </td>
      <td>{total}$</td>
      <td>
        <Button variant="red" loading={itemState.deleteLoading} error={itemState.deleteError} onClick={deleteItem}>
          УДАЛИТЬ
        </Button>
      </td>
    </tr>
  );
};
