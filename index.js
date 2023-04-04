const { configureStore, bindActionCreators, combineReducers } = require("@reduxjs/toolkit");



// const redux = require('redux');

//string constant that defines the type of the object
const CAKE_ORDERED = "CAKE_ORDERED";

const CAKE_RESTOCKED = "CAKE_RESTOCKED";

const ICECREAM_ORDERED = "ICECREAM_ORDERED";

const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";



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


//3)order cake action
function orderIcecream(qty = 1) {
  //action is an object that has a type property (can have more property also)
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

// 4) restock cake action
function restockIcecream(qty = 1) {
  //action is an object that has a type property (can have more property also)
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty
  };
}





// 2)reducer
// (previousState,action)=> newState

//first principle of redux (the global state of your application is stored as an object inside a single store)

//cake state
const initialCakeState = {
  numOfCakes: 10,
};


//icecream state
const initialIceCreamState = {
  numOfIcecreams: 10,
};



 
// reducer number 1 for cake
const Cakereducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state, //first create a copy of the object and then chnage only the properties that need to
        numOfCakes: state.numOfCakes - 1,
      }
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      }
    default:
      return state;
  }
};

// reducer number 2 for icecream
const Icecreamreducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state, //first create a copy of the object and then chnage only the properties that need to
        numOfIcecreams: state.numOfIcecreams - action.payload,
      }
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      }
    default:
      return state;
  }
};



// helper function to combine multiple reducers
const rootReducer = combineReducers({
  cake:Cakereducer,
  icecream:Icecreamreducer,
});

// 3) Redux store (brings the actions and the reducers together)

const store = configureStore({ reducer:rootReducer }); //first line of execution this is where we create our redux store accepts reducer and this inturn contains the initial state of the application

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

store.dispatch(orderIcecream(5));

store.dispatch(restockIcecream(5));




// const actions = bindActionCreators({orderCake,restockCake},store.dispatch);    //not really necessarry

// actions.orderCake();
// actions.orderCake();
// actions.orderCake();

// actions.restockCake(3);

// calling the function returned by the subscribe will unsubscribe
unsubscribe();
