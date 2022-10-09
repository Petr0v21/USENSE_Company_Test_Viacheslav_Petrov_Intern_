import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchBaseCurrent } from "../../store/action-creators/current";

const Header = () => {
  const dispatch = useAppDispatch();
  const { base, errors, loading } = useAppSelector((state) => state.base);
  useEffect(() => {
    dispatch(fetchBaseCurrent());
  }, []);
  if (errors) {
    return <h3>{errors}</h3>;
  }
  return (
    <div className="header">
      {loading ? (
        <h2>Loading ...</h2>
      ) : (
        <div className="header-values">
          <label>{base.USD}</label>
          <label>{base.EUR}</label>
        </div>
      )}
    </div>
  );
};

export default Header;
