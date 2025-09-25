export const initialStore = () => {
  return {
    token: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_token":
      const { tokenValue } = action.payload;
      return {
        ...store,
        token: tokenValue,
      };
    default:
      throw Error("Unknown action.");
  }
}
