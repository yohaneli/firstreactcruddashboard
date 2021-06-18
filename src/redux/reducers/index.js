import { combineReducers } from "redux";

// combine reducers permet de combiner plusieurs reducers ou cas ou il y en a plusieurs

import menu from "./menu";

import product from "./product";


export default combineReducers({menu,product});

// c'est si c'est une concaténation de tous les reducers