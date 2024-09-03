import { createContext, useContext, useReducer } from "react";

const TotalPriceContext = createContext(); // context untuk menyimpan state

const TotalPriceDispatchContext = createContext(); // context untuk menyimpan action

function totalPriceReducer(state: number, action) {
  switch (action.type) {
    case "UPDATE_TOTAL_PRICE": {
      return action.payload.total;
    }

    default:
      throw Error("Unknown action: " + action.type);
  }
}

export function TotalPriceProvider({ children }) {
  const [totalPrice, dispatch] = useReducer(totalPriceReducer, 0);

  return (
    <TotalPriceContext.Provider value={totalPrice}>
      <TotalPriceDispatchContext.Provider value={dispatch}>
        {children}
      </TotalPriceDispatchContext.Provider>
    </TotalPriceContext.Provider>
  );
}

export function useTotalPrice() {
  return useContext(TotalPriceContext);
}

export function useTotalPriceDispatch() {
  return useContext(TotalPriceDispatchContext);
}
