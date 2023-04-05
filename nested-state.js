const {
  configureStore,
  bindActionCreators,
  combineReducers,
  applyMiddleware,
} = require("@reduxjs/toolkit");

const produce = require("immer").produce;

//import logger from redux
const reduxLogger = require("redux-logger");

//create a logger constant
const logger = reduxLogger.createLogger();

const initialState = {
  name: "akash",
  address: {
    street: "123 main street",
    city: "amsterdam",
    state: "holland",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

//action creator

const updatestreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

// reducer number 1 for cake
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };

      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });

    default:
      return state;
  }
};

// middleware is passed as the second parameter as a extra feature to the store
const store = configureStore({ reducer, middleware: [logger] });

console.log("Initial state", store.getState()); //initial state log

// const unsubscribe = store.subscribe(
//   () => console.log("update state", store.getState()) //getState() gives access to that state it holds the store
// );

const unsubscribe = store.subscribe(
  () => {} //getState() gives access to that state it holds the store
);

store.dispatch(updatestreet("456 street"));

unsubscribe();
