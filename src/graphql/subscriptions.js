/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBugs = /* GraphQL */ `
  subscription OnCreateBugs($filter: ModelSubscriptionBugsFilterInput) {
    onCreateBugs(filter: $filter) {
      id
      title
      details
      userID
      courierID
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateBugs = /* GraphQL */ `
  subscription OnUpdateBugs($filter: ModelSubscriptionBugsFilterInput) {
    onUpdateBugs(filter: $filter) {
      id
      title
      details
      userID
      courierID
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteBugs = /* GraphQL */ `
  subscription OnDeleteBugs($filter: ModelSubscriptionBugsFilterInput) {
    onDeleteBugs(filter: $filter) {
      id
      title
      details
      userID
      courierID
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateAskedFeatures = /* GraphQL */ `
  subscription OnCreateAskedFeatures(
    $filter: ModelSubscriptionAskedFeaturesFilterInput
  ) {
    onCreateAskedFeatures(filter: $filter) {
      id
      title
      details
      userID
      courierID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateAskedFeatures = /* GraphQL */ `
  subscription OnUpdateAskedFeatures(
    $filter: ModelSubscriptionAskedFeaturesFilterInput
  ) {
    onUpdateAskedFeatures(filter: $filter) {
      id
      title
      details
      userID
      courierID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteAskedFeatures = /* GraphQL */ `
  subscription OnDeleteAskedFeatures(
    $filter: ModelSubscriptionAskedFeaturesFilterInput
  ) {
    onDeleteAskedFeatures(filter: $filter) {
      id
      title
      details
      userID
      courierID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateCourier = /* GraphQL */ `
  subscription OnCreateCourier($filter: ModelSubscriptionCourierFilterInput) {
    onCreateCourier(filter: $filter) {
      id
      name
      address
      lat
      lng
      tranportationMode
      email
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      isActive
      sub
      AskedFeatures {
        items {
          id
          title
          details
          userID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Bugs {
        items {
          id
          title
          details
          userID
          courierID
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateCourier = /* GraphQL */ `
  subscription OnUpdateCourier($filter: ModelSubscriptionCourierFilterInput) {
    onUpdateCourier(filter: $filter) {
      id
      name
      address
      lat
      lng
      tranportationMode
      email
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      isActive
      sub
      AskedFeatures {
        items {
          id
          title
          details
          userID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Bugs {
        items {
          id
          title
          details
          userID
          courierID
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteCourier = /* GraphQL */ `
  subscription OnDeleteCourier($filter: ModelSubscriptionCourierFilterInput) {
    onDeleteCourier(filter: $filter) {
      id
      name
      address
      lat
      lng
      tranportationMode
      email
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      isActive
      sub
      AskedFeatures {
        items {
          id
          title
          details
          userID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Bugs {
        items {
          id
          title
          details
          userID
          courierID
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      orderID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderDishDishId
      orderDishIngredientId
      __typename
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
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      orderID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderDishDishId
      orderDishIngredientId
      __typename
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
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      orderID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderDishDishId
      orderDishIngredientId
      __typename
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
      id
      status
      userID
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      structureID
      courierID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
      id
      status
      userID
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      structureID
      courierID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
      id
      status
      userID
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      structureID
      courierID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      email
      isActive
      picture
      favouriteRestaurants
      Bugs {
        items {
          id
          title
          details
          userID
          courierID
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      AskedFeatures {
        items {
          id
          title
          details
          userID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      email
      isActive
      picture
      favouriteRestaurants
      Bugs {
        items {
          id
          title
          details
          userID
          courierID
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      AskedFeatures {
        items {
          id
          title
          details
          userID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      email
      isActive
      picture
      favouriteRestaurants
      Bugs {
        items {
          id
          title
          details
          userID
          courierID
          image
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      AskedFeatures {
        items {
          id
          title
          details
          userID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      basketDishDishId
      basketDishIngredientId
      __typename
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
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      basketDishDishId
      basketDishIngredientId
      __typename
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
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        structureID
        image_url
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      basketDishDishId
      basketDishIngredientId
      __typename
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      image_url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      image_url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      image_url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      image_url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      image_url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
      image_url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
          image_url
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Ingredients {
        items {
          id
          name
          image
          description
          price
          structureID
          image_url
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      image_url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
          image_url
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Ingredients {
        items {
          id
          name
          image
          description
          price
          structureID
          image_url
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      image_url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
          image_url
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Ingredients {
        items {
          id
          name
          image
          description
          price
          structureID
          image_url
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
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
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      image_url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
