// Les reducers ont un type d'action

// On importe une action

import { AFF_MODAL_PRODUCT } from "../actions/types";

// initialisation du state du reducer

const initStateProduct = {

    affModalProduct:false,
    data:null
}

// la fonction du reducer avec 2 parametres le state et 'action

// le state c'est le state initial donc au début et l'action bah c'est l'action qui va amener a la future modifiaction du state
const product = (state=initStateProduct,action) => {

    console.log("------ REDUCER PRODUCT : -------",state,action.dataReturned)

    switch (action.type) {

        case AFF_MODAL_PRODUCT:

            return action.dataReturned;

            break;
    
        default:

            return state;

            break;

    }

}

export default product;