export interface CurrentModel {
  base: string;
  result:
    | {
        UAH: number;
      }
    | {
        USD: number;
      }
    | {
        EUR: number;
      };
  updated: string;
  ms: number;
}

export interface CurrentMultyModel {
  base: string;
  results: {
    EUR: number;
    USD: number;
  };
  updated: string;
  ms: number;
}

export interface CurrentMultyResModel {
  EUR: number;
  USD: number;
}

export interface CurrencyBaseState {
  base: CurrentMultyResModel;
  loading: boolean;
  errors: null | string;
}

export interface CurrencyState {
  baseCurrent: {
    USD: number;
    EUR: number;
  };
  currency: CurrentModel;
  loading: boolean;
  errors: null | string;
  buyCount: number;
  sellCount: number;
}

export interface ParamsFetch {
  from: string;
  to: string;
}
