import { AFF_MODAL_MENU } from "./types";
// importer le type de l'action

export const affMenu = (dataReturned) => ({
    type: AFF_MODAL_MENU,
    dataReturned
});