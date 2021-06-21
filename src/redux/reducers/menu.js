// Les reducers ont un type d'action

// On importe une action

import { AFF_MODAL_MENU,CHANGE_DATA_MENU,LOADING_MENU } from "../actions/types";

// initialisation du state du reducer

const initStateMenu = {
    affModalMenu:false,
    data:null,
    listMenus:[],
    loadingMenus:false
}

// la fonction du reducer avec 2 parametres le state et 'action
// le state c'est le state initial donc au début et l'action bah c'est l'action qui va amener a la future modifiaction du state
const menu = (state=initStateMenu,action) => {
    console.log("------ REDUCER MENU : -------",state,action.dataReturned)
    switch (action.type) {
        case AFF_MODAL_MENU:
            return {...state,...action.dataReturned};
            break;
        case CHANGE_DATA_MENU:
            return {...state, listMenus:action.dataReturned} ;
            break;
        case LOADING_MENU:
            return {...state, loadingMenus:action.dataReturned} ;
            break;
        default:
            return state;
            break;
    }
}

export default menu;