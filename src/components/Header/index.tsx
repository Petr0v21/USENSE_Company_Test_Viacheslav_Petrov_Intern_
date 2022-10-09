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
      <h2>Test Task ITOP-1000</h2>
      {loading ? (
        <h2>Loading ...</h2>
      ) : (
        <div className="header-values">
          <div>
            <label>USD</label>
            <input value={base.USD} />
          </div>
          <div>
            <label>EUR</label>
            <input value={base.EUR} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
