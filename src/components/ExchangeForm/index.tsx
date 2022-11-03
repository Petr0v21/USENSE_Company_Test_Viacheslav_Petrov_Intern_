import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchExchangeCurrent } from "../../store/action-creators/current";
import { currencySlice } from "../../store/reducers/rootReducer";

const ExchangeForm: React.FC = () => {
  const [buy, setBuy] = useState("USD");
  const [sell, setSell] = useState("UAH");
  const [change, setChange] = useState("BUY");
  const { errors, loading, buyCount, sellCount } = useAppSelector(
    (state) => state.currency
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchExchangeCurrent({
        from: buy,
        to: sell,
      })
    );
  }, [buy, sell]);

  useEffect(() => {
    dispatch(currencySlice.actions.changeVal(change));
  }, [loading]);

  if (errors) {
    return <h2>{errors}</h2>;
  }
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="exchange"
    >
      <h1>Exchange Form</h1>
      <div className="exchange-row">
        <input
          name="buyCount"
          value={buyCount}
          onChange={(event) =>
            dispatch(currencySlice.actions.handlerBuy(event.target.value))
          }
        />
        <select
          onChange={async (event) => {
            setBuy(event.target.value);
            setChange("BUY");
          }}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
      </div>
      <div className="exchange-row">
        <input
          name="sellCount"
          value={sellCount}
          onChange={(event) =>
            dispatch(currencySlice.actions.handlerSell(event.target.value))
          }
        />
        <select
          onChange={async (event) => {
            setSell(event.target.value);
            setChange("SELL");
          }}
        >
          <option value="UAH">UAH</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <button className="exchange-button">Перевести</button>
    </form>
  );
};

export default ExchangeForm;
