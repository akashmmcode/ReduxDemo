const { configureStore } = require("@reduxjs/toolkit");

// const redux = require('redux');

//string constant that defines the type of the object
const CAKE_ORDERED = "CAKE_ORDERED";

// 1)action
//action creator (simply creates an action) is a function which returns an action..
function orderCake() {
  //action is an object that has a type property (can have more property also)
  return {
    type: CAKE_ORDERED,
    quantity: 1,
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
    default:
      return state;
  }
};

// 3) Redux store (brings the actions and the reducers together)

const store = configureStore({ reducer }); //first line of execution this is where we create our redux store accepts reducer and this inturn contains the initial state of the application

console.log("Initial state", store.getState()); //initial state log

const unsubscribe = store.subscribe(
  () => console.log("update state", store.getState()) //getState() gives access to that state it holds the store
);

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

// calling the function returned by the subscribe will unsubscribe
unsubscribe();
