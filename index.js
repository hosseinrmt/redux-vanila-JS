const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers; // for combine reducers to an object
const applyMiddleware = redux.applyMiddleware; // from action to reducer
const logger = reduxLogger.createLogger(); // for log all dispatches

// action:
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// action creators:
function buyCake() {
  // action creator
  return {
    type: BUY_CAKE,
  };
}
function buyIceCream() {
  return {
    type: BUY_ICECREAM,
  };
}

// reducer :
const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamState = {
  numOfIceCreams: 10,
};
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { ...state, numOfCakes: state.numOfCakes - 1 };

    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return { ...state, numOfIceCreams: state.numOfIceCreams - 1 };

    default:
      return state;
  }
};

// store :
const reducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(reducer, applyMiddleware(logger));

store.dispatch(buyCake());
store.dispatch(buyIceCream());
