import { AFF_MODAL_MENU, CHANGE_DATA_MENU,LOADING_MENU } from "./types";
// importer le type de l'action

export const affMenu = (dataReturned) => ({
    type: AFF_MODAL_MENU,
    dataReturned
});

export const changeMenu = (dataReturned) => ({
    type: CHANGE_DATA_MENU,
    dataReturned
});

export const affLoadingMenu = (dataReturned) =>({
    type: LOADING_MENU,
    dataReturned
})