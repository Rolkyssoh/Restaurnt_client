import { OrderStatus } from "../models";
  
export const englishToFrench = {
    [OrderStatus.NEW ]: 'NOUVEAU',
    [OrderStatus.COOKING]: 'EN PREPARTION',
    [OrderStatus.READY_FOR_PICKUP]: 'PRÊT AU RAMASSAGE',
    [OrderStatus.ACCEPTED]: 'LIVRAISON EN COURS',
    [OrderStatus.COMPLETED]: 'LIVRÉE',
};