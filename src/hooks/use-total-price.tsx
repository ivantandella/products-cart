import { useReducer } from "react";

// export type TotalPriceType = {
//   total: number;
// };

export type TotalPriceActionType = {
  type: "UPDATE_TOTAL_PRICE";
  payload: {
    total: number;
  };
};

export function totalPriceReducer(state: number, action: TotalPriceActionType) {
  switch (action.type) {
    case "UPDATE_TOTAL_PRICE": {
      return action.payload.total;
    }

    default:
      return state;
  }
}

export default function useTotalPrice() {
  const [totalPrice, dispatch] = useReducer(totalPriceReducer, 0);

  function onUpdateTotalPrice(sum: number) {
    dispatch({
      type: "UPDATE_TOTAL_PRICE",
      payload: {
        total: sum,
      },
    });
  }

  return { totalPrice, onUpdateTotalPrice };
}
