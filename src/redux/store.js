import { createStore } from "redux";
import rootReducer from "./reducers";

export default createStore(rootReducer);

// le store c'est  lequivalent du context.js de firebase context
//le store envoie une info a redux et redux va le publier dans le sotre