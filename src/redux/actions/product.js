import { AFF_MODAL_PRODUCT } from "./types";
// importer le type de l'action

export const affProduct = (dataReturned) => ({
    type: AFF_MODAL_PRODUCT,
    dataReturned
});