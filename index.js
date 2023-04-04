const { configureStore, bindActionCreators } = require("@reduxjs/toolkit");

// const redux = require('redux');

//string constant that defines the type of the object
const CAKE_ORDERED = "CAKE_ORDERED";

const CAKE_RESTOCKED = "CAKE_RESTOCKED";

// 1)action
//action creator (simply creates an action) is a function which returns an action..
function orderCake() {
  //action is an object that has a type property (can have more property also)
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

// 2)action 2 restock
function restockCake(qty = 1) {
  //action is an object that has a type property (can have more property also)
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

// 2)reducer
// (previousState,action)=> newState

//first principle of redux (the global state of your application is stored as an object inside a single store)

const initialState = {
  numOfCakes: 10,
  anotherProperty: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state, //first create a copy of the object and then chnage only the properties that need to
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

// 3) Redux store (brings the actions and the reducers together)

const store = configureStore({ reducer }); //first line of execution this is where we create our redux store accepts reducer and this inturn contains the initial state of the application

console.log("Initial state", store.getState()); //initial state log

// by calling this function returned by the subscribe will unsubscribe
const unsubscribe = store.subscribe(
  () => console.log("update state", store.getState()) //getState() gives access to that state it holds the store
);

// dispatch method accepts a action as a parameter(if u want u can give an action directly like)

// store.dispatch({
//   type: CAKE_ORDERED,
//   quantity: 1,
// });

// but now that we have an action creator we are passing that inisde the dispatch methord
store.dispatch(orderCake()); //when we dispatch the first action the reducer sees that the action type is CAKE_ORDERED
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(3));

// calling the function returned by the subscribe will unsubscribe
unsubscribe();
