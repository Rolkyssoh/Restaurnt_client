/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCourier = /* GraphQL */ `
  subscription OnCreateCourier($filter: ModelSubscriptionCourierFilterInput) {
    onCreateCourier(filter: $filter) {
      id
      name
      sub
      lat
      lng
      tranportationMode
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateCourier = /* GraphQL */ `
  subscription OnUpdateCourier($filter: ModelSubscriptionCourierFilterInput) {
    onUpdateCourier(filter: $filter) {
      id
      name
      sub
      lat
      lng
      tranportationMode
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteCourier = /* GraphQL */ `
  subscription OnDeleteCourier($filter: ModelSubscriptionCourierFilterInput) {
    onDeleteCourier(filter: $filter) {
      id
      name
      sub
      lat
      lng
      tranportationMode
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateOrderDish = /* GraphQL */ `
  subscription OnCreateOrderDish(
    $filter: ModelSubscriptionOrderDishFilterInput
  ) {
    onCreateOrderDish(filter: $filter) {
      id
      quantity
      Dish {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      orderID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderDishDishId
      orderDishIngredientId
    }
  }
`;
export const onUpdateOrderDish = /* GraphQL */ `
  subscription OnUpdateOrderDish(
    $filter: ModelSubscriptionOrderDishFilterInput
  ) {
    onUpdateOrderDish(filter: $filter) {
      id
      quantity
      Dish {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      orderID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderDishDishId
      orderDishIngredientId
    }
  }
`;
export const onDeleteOrderDish = /* GraphQL */ `
  subscription OnDeleteOrderDish(
    $filter: ModelSubscriptionOrderDishFilterInput
  ) {
    onDeleteOrderDish(filter: $filter) {
      id
      quantity
      Dish {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      orderID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderDishDishId
      orderDishIngredientId
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
      id
      status
      userID
      Structure {
        id
        name
        image
        deliveryFee
        minDeliveryTime
        maxDeliveryTime
        rating
        address
        lat
        lng
        type
        adminSub
        isActive
        Dishes {
          nextToken
          startedAt
        }
        Ingredients {
          nextToken
          startedAt
        }
        Baskets {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      OrderDishes {
        items {
          id
          quantity
          orderID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          orderDishDishId
          orderDishIngredientId
        }
        nextToken
        startedAt
      }
      Courier {
        id
        name
        sub
        lat
        lng
        tranportationMode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderStructureId
      orderCourierId
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
      id
      status
      userID
      Structure {
        id
        name
        image
        deliveryFee
        minDeliveryTime
        maxDeliveryTime
        rating
        address
        lat
        lng
        type
        adminSub
        isActive
        Dishes {
          nextToken
          startedAt
        }
        Ingredients {
          nextToken
          startedAt
        }
        Baskets {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      OrderDishes {
        items {
          id
          quantity
          orderID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          orderDishDishId
          orderDishIngredientId
        }
        nextToken
        startedAt
      }
      Courier {
        id
        name
        sub
        lat
        lng
        tranportationMode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderStructureId
      orderCourierId
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
      id
      status
      userID
      Structure {
        id
        name
        image
        deliveryFee
        minDeliveryTime
        maxDeliveryTime
        rating
        address
        lat
        lng
        type
        adminSub
        isActive
        Dishes {
          nextToken
          startedAt
        }
        Ingredients {
          nextToken
          startedAt
        }
        Baskets {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      OrderDishes {
        items {
          id
          quantity
          orderID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          orderDishDishId
          orderDishIngredientId
        }
        nextToken
        startedAt
      }
      Courier {
        id
        name
        sub
        lat
        lng
        tranportationMode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderStructureId
      orderCourierId
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      sub
      name
      address
      lat
      lng
      type
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Orders {
        items {
          id
          status
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          orderStructureId
          orderCourierId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      sub
      name
      address
      lat
      lng
      type
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Orders {
        items {
          id
          status
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          orderStructureId
          orderCourierId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      sub
      name
      address
      lat
      lng
      type
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Orders {
        items {
          id
          status
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          orderStructureId
          orderCourierId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateBasketDish = /* GraphQL */ `
  subscription OnCreateBasketDish(
    $filter: ModelSubscriptionBasketDishFilterInput
  ) {
    onCreateBasketDish(filter: $filter) {
      id
      quantity
      basketID
      Dish {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      basketDishDishId
      basketDishIngredientId
    }
  }
`;
export const onUpdateBasketDish = /* GraphQL */ `
  subscription OnUpdateBasketDish(
    $filter: ModelSubscriptionBasketDishFilterInput
  ) {
    onUpdateBasketDish(filter: $filter) {
      id
      quantity
      basketID
      Dish {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      basketDishDishId
      basketDishIngredientId
    }
  }
`;
export const onDeleteBasketDish = /* GraphQL */ `
  subscription OnDeleteBasketDish(
    $filter: ModelSubscriptionBasketDishFilterInput
  ) {
    onDeleteBasketDish(filter: $filter) {
      id
      quantity
      basketID
      Dish {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      basketDishDishId
      basketDishIngredientId
    }
  }
`;
export const onCreateBasket = /* GraphQL */ `
  subscription OnCreateBasket($filter: ModelSubscriptionBasketFilterInput) {
    onCreateBasket(filter: $filter) {
      id
      structureID
      BasketDishes {
        items {
          id
          quantity
          basketID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          basketDishDishId
          basketDishIngredientId
        }
        nextToken
        startedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateBasket = /* GraphQL */ `
  subscription OnUpdateBasket($filter: ModelSubscriptionBasketFilterInput) {
    onUpdateBasket(filter: $filter) {
      id
      structureID
      BasketDishes {
        items {
          id
          quantity
          basketID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          basketDishDishId
          basketDishIngredientId
        }
        nextToken
        startedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteBasket = /* GraphQL */ `
  subscription OnDeleteBasket($filter: ModelSubscriptionBasketFilterInput) {
    onDeleteBasket(filter: $filter) {
      id
      structureID
      BasketDishes {
        items {
          id
          quantity
          basketID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          basketDishDishId
          basketDishIngredientId
        }
        nextToken
        startedAt
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateIngredient = /* GraphQL */ `
  subscription OnCreateIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
  ) {
    onCreateIngredient(filter: $filter) {
      id
      name
      image
      description
      price
      structureID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateIngredient = /* GraphQL */ `
  subscription OnUpdateIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
  ) {
    onUpdateIngredient(filter: $filter) {
      id
      name
      image
      description
      price
      structureID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteIngredient = /* GraphQL */ `
  subscription OnDeleteIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
  ) {
    onDeleteIngredient(filter: $filter) {
      id
      name
      image
      description
      price
      structureID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateDish = /* GraphQL */ `
  subscription OnCreateDish($filter: ModelSubscriptionDishFilterInput) {
    onCreateDish(filter: $filter) {
      id
      name
      image
      description
      price
      structureID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateDish = /* GraphQL */ `
  subscription OnUpdateDish($filter: ModelSubscriptionDishFilterInput) {
    onUpdateDish(filter: $filter) {
      id
      name
      image
      description
      price
      structureID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteDish = /* GraphQL */ `
  subscription OnDeleteDish($filter: ModelSubscriptionDishFilterInput) {
    onDeleteDish(filter: $filter) {
      id
      name
      image
      description
      price
      structureID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateStructure = /* GraphQL */ `
  subscription OnCreateStructure(
    $filter: ModelSubscriptionStructureFilterInput
  ) {
    onCreateStructure(filter: $filter) {
      id
      name
      image
      deliveryFee
      minDeliveryTime
      maxDeliveryTime
      rating
      address
      lat
      lng
      type
      adminSub
      isActive
      Dishes {
        items {
          id
          name
          image
          description
          price
          structureID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Ingredients {
        items {
          id
          name
          image
          description
          price
          structureID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateStructure = /* GraphQL */ `
  subscription OnUpdateStructure(
    $filter: ModelSubscriptionStructureFilterInput
  ) {
    onUpdateStructure(filter: $filter) {
      id
      name
      image
      deliveryFee
      minDeliveryTime
      maxDeliveryTime
      rating
      address
      lat
      lng
      type
      adminSub
      isActive
      Dishes {
        items {
          id
          name
          image
          description
          price
          structureID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Ingredients {
        items {
          id
          name
          image
          description
          price
          structureID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteStructure = /* GraphQL */ `
  subscription OnDeleteStructure(
    $filter: ModelSubscriptionStructureFilterInput
  ) {
    onDeleteStructure(filter: $filter) {
      id
      name
      image
      deliveryFee
      minDeliveryTime
      maxDeliveryTime
      rating
      address
      lat
      lng
      type
      adminSub
      isActive
      Dishes {
        items {
          id
          name
          image
          description
          price
          structureID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Ingredients {
        items {
          id
          name
          image
          description
          price
          structureID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
