import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum TransportationModes {
  DRIVING = "DRIVING",
  BICYCLING = "BICYCLING"
}

export enum OrderStatus {
  NEW = "NEW",
  COOKING = "COOKING",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  PICKED_UP = "PICKED_UP",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED",
  DECLINED_BY_STRUCTURE = "DECLINED_BY_STRUCTURE"
}

export enum UserType {
  CUSTOMER = "CUSTOMER",
  DRIVER = "DRIVER",
  ADMIN = "ADMIN",
  RESTORER = "RESTORER"
}

export enum StructureType {
  RESTAURANT = "RESTAURANT",
  SHOP = "SHOP"
}



type EagerCourier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Courier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly sub: string;
  readonly lat: number;
  readonly lng: number;
  readonly tranportationMode: TransportationModes | keyof typeof TransportationModes;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCourier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Courier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly sub: string;
  readonly lat: number;
  readonly lng: number;
  readonly tranportationMode: TransportationModes | keyof typeof TransportationModes;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Courier = LazyLoading extends LazyLoadingDisabled ? EagerCourier : LazyCourier

export declare const Courier: (new (init: ModelInit<Courier>) => Courier) & {
  copyOf(source: Courier, mutator: (draft: MutableModel<Courier>) => MutableModel<Courier> | void): Courier;
}

type EagerOrderDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly Dish?: Dish | null;
  readonly Ingredient?: Ingredient | null;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderDishDishId?: string | null;
  readonly orderDishIngredientId?: string | null;
}

type LazyOrderDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly Dish: AsyncItem<Dish | undefined>;
  readonly Ingredient: AsyncItem<Ingredient | undefined>;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderDishDishId?: string | null;
  readonly orderDishIngredientId?: string | null;
}

export declare type OrderDish = LazyLoading extends LazyLoadingDisabled ? EagerOrderDish : LazyOrderDish

export declare const OrderDish: (new (init: ModelInit<OrderDish>) => OrderDish) & {
  copyOf(source: OrderDish, mutator: (draft: MutableModel<OrderDish>) => MutableModel<OrderDish> | void): OrderDish;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly userID: string;
  readonly OrderDishes?: (OrderDish | null)[] | null;
  readonly Courier?: Courier | null;
  readonly structureID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderCourierId?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly userID: string;
  readonly OrderDishes: AsyncCollection<OrderDish>;
  readonly Courier: AsyncItem<Courier | undefined>;
  readonly structureID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderCourierId?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sub: string;
  readonly name: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly type: UserType | keyof typeof UserType;
  readonly Baskets?: (Basket | null)[] | null;
  readonly Orders?: (Order | null)[] | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sub: string;
  readonly name: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly type: UserType | keyof typeof UserType;
  readonly Baskets: AsyncCollection<Basket>;
  readonly Orders: AsyncCollection<Order>;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerBasketDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly basketID: string;
  readonly Dish?: Dish | null;
  readonly Ingredient?: Ingredient | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly basketDishDishId?: string | null;
  readonly basketDishIngredientId?: string | null;
}

type LazyBasketDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly basketID: string;
  readonly Dish: AsyncItem<Dish | undefined>;
  readonly Ingredient: AsyncItem<Ingredient | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly basketDishDishId?: string | null;
  readonly basketDishIngredientId?: string | null;
}

export declare type BasketDish = LazyLoading extends LazyLoadingDisabled ? EagerBasketDish : LazyBasketDish

export declare const BasketDish: (new (init: ModelInit<BasketDish>) => BasketDish) & {
  copyOf(source: BasketDish, mutator: (draft: MutableModel<BasketDish>) => MutableModel<BasketDish> | void): BasketDish;
}

type EagerBasket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Basket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly structureID: string;
  readonly BasketDishes?: (BasketDish | null)[] | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBasket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Basket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly structureID: string;
  readonly BasketDishes: AsyncCollection<BasketDish>;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Basket = LazyLoading extends LazyLoadingDisabled ? EagerBasket : LazyBasket

export declare const Basket: (new (init: ModelInit<Basket>) => Basket) & {
  copyOf(source: Basket, mutator: (draft: MutableModel<Basket>) => MutableModel<Basket> | void): Basket;
}

type EagerIngredient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ingredient, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly description?: string | null;
  readonly price: number;
  readonly structureID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyIngredient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ingredient, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly description?: string | null;
  readonly price: number;
  readonly structureID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Ingredient = LazyLoading extends LazyLoadingDisabled ? EagerIngredient : LazyIngredient

export declare const Ingredient: (new (init: ModelInit<Ingredient>) => Ingredient) & {
  copyOf(source: Ingredient, mutator: (draft: MutableModel<Ingredient>) => MutableModel<Ingredient> | void): Ingredient;
}

type EagerDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Dish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly description?: string | null;
  readonly price: number;
  readonly structureID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Dish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly description?: string | null;
  readonly price: number;
  readonly structureID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Dish = LazyLoading extends LazyLoadingDisabled ? EagerDish : LazyDish

export declare const Dish: (new (init: ModelInit<Dish>) => Dish) & {
  copyOf(source: Dish, mutator: (draft: MutableModel<Dish>) => MutableModel<Dish> | void): Dish;
}

type EagerStructure = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Structure, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly deliveryFee: number;
  readonly minDeliveryTime: number;
  readonly maxDeliveryTime: number;
  readonly rating?: number | null;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly type: StructureType | keyof typeof StructureType;
  readonly adminSub?: string | null;
  readonly isActive: boolean;
  readonly Dishes?: (Dish | null)[] | null;
  readonly Ingredients?: (Ingredient | null)[] | null;
  readonly Baskets?: (Basket | null)[] | null;
  readonly Orders?: (Order | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStructure = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Structure, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly deliveryFee: number;
  readonly minDeliveryTime: number;
  readonly maxDeliveryTime: number;
  readonly rating?: number | null;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly type: StructureType | keyof typeof StructureType;
  readonly adminSub?: string | null;
  readonly isActive: boolean;
  readonly Dishes: AsyncCollection<Dish>;
  readonly Ingredients: AsyncCollection<Ingredient>;
  readonly Baskets: AsyncCollection<Basket>;
  readonly Orders: AsyncCollection<Order>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Structure = LazyLoading extends LazyLoadingDisabled ? EagerStructure : LazyStructure

export declare const Structure: (new (init: ModelInit<Structure>) => Structure) & {
  copyOf(source: Structure, mutator: (draft: MutableModel<Structure>) => MutableModel<Structure> | void): Structure;
}