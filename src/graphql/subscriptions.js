/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBill = /* GraphQL */ `
  subscription OnCreateBill($filter: ModelSubscriptionBillFilterInput) {
    onCreateBill(filter: $filter) {
      id
      amount
      regulated
      paymentDate
      monthConcerned
      structureID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBill = /* GraphQL */ `
  subscription OnUpdateBill($filter: ModelSubscriptionBillFilterInput) {
    onUpdateBill(filter: $filter) {
      id
      amount
      regulated
      paymentDate
      monthConcerned
      structureID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBill = /* GraphQL */ `
  subscription OnDeleteBill($filter: ModelSubscriptionBillFilterInput) {
    onDeleteBill(filter: $filter) {
      id
      amount
      regulated
      paymentDate
      monthConcerned
      structureID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateBugs = /* GraphQL */ `
  subscription OnCreateBugs($filter: ModelSubscriptionBugsFilterInput) {
    onCreateBugs(filter: $filter) {
      id
      title
      details
      image
      userID
      courierID
      createdAt
      updatedAt
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
      image
      userID
      courierID
      createdAt
      updatedAt
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
      image
      userID
      courierID
      createdAt
      updatedAt
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
      isActive
      sub
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
        __typename
      }
      Bugs {
        items {
          id
          title
          details
          image
          userID
          courierID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      phonenumber
      createdAt
      updatedAt
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
      isActive
      sub
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
        __typename
      }
      Bugs {
        items {
          id
          title
          details
          image
          userID
          courierID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      phonenumber
      createdAt
      updatedAt
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
      isActive
      sub
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
        __typename
      }
      Bugs {
        items {
          id
          title
          details
          image
          userID
          courierID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      phonenumber
      createdAt
      updatedAt
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
        image_url
        structureID
        isActivate
        maxNumberPerDay
        createdAt
        updatedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        image_url
        structureID
        isActivate
        maxNumber
        createdAt
        updatedAt
        __typename
      }
      orderID
      createdAt
      updatedAt
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
        image_url
        structureID
        isActivate
        maxNumberPerDay
        createdAt
        updatedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        image_url
        structureID
        isActivate
        maxNumber
        createdAt
        updatedAt
        __typename
      }
      orderID
      createdAt
      updatedAt
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
        image_url
        structureID
        isActivate
        maxNumberPerDay
        createdAt
        updatedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        image_url
        structureID
        isActivate
        maxNumber
        createdAt
        updatedAt
        __typename
      }
      orderID
      createdAt
      updatedAt
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
      structureID
      OrderDishes {
        items {
          id
          quantity
          orderID
          createdAt
          updatedAt
          orderDishDishId
          orderDishIngredientId
          __typename
        }
        nextToken
        __typename
      }
      courierID
      createdAt
      updatedAt
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
      structureID
      OrderDishes {
        items {
          id
          quantity
          orderID
          createdAt
          updatedAt
          orderDishDishId
          orderDishIngredientId
          __typename
        }
        nextToken
        __typename
      }
      courierID
      createdAt
      updatedAt
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
      structureID
      OrderDishes {
        items {
          id
          quantity
          orderID
          createdAt
          updatedAt
          orderDishDishId
          orderDishIngredientId
          __typename
        }
        nextToken
        __typename
      }
      courierID
      createdAt
      updatedAt
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
      email
      isActive
      picture
      favouriteRestaurants
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
        __typename
      }
      Bugs {
        items {
          id
          title
          details
          image
          userID
          courierID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      phonenumber
      createdAt
      updatedAt
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
      email
      isActive
      picture
      favouriteRestaurants
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
        __typename
      }
      Bugs {
        items {
          id
          title
          details
          image
          userID
          courierID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      phonenumber
      createdAt
      updatedAt
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
      email
      isActive
      picture
      favouriteRestaurants
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
        __typename
      }
      Bugs {
        items {
          id
          title
          details
          image
          userID
          courierID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      phonenumber
      createdAt
      updatedAt
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
      Dish {
        id
        name
        image
        description
        price
        image_url
        structureID
        isActivate
        maxNumberPerDay
        createdAt
        updatedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        image_url
        structureID
        isActivate
        maxNumber
        createdAt
        updatedAt
        __typename
      }
      basketID
      createdAt
      updatedAt
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
      Dish {
        id
        name
        image
        description
        price
        image_url
        structureID
        isActivate
        maxNumberPerDay
        createdAt
        updatedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        image_url
        structureID
        isActivate
        maxNumber
        createdAt
        updatedAt
        __typename
      }
      basketID
      createdAt
      updatedAt
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
      Dish {
        id
        name
        image
        description
        price
        image_url
        structureID
        isActivate
        maxNumberPerDay
        createdAt
        updatedAt
        __typename
      }
      Ingredient {
        id
        name
        image
        description
        price
        image_url
        structureID
        isActivate
        maxNumber
        createdAt
        updatedAt
        __typename
      }
      basketID
      createdAt
      updatedAt
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
          basketDishDishId
          basketDishIngredientId
          __typename
        }
        nextToken
        __typename
      }
      userID
      createdAt
      updatedAt
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
          basketDishDishId
          basketDishIngredientId
          __typename
        }
        nextToken
        __typename
      }
      userID
      createdAt
      updatedAt
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
          basketDishDishId
          basketDishIngredientId
          __typename
        }
        nextToken
        __typename
      }
      userID
      createdAt
      updatedAt
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
      image_url
      structureID
      isActivate
      maxNumber
      createdAt
      updatedAt
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
      image_url
      structureID
      isActivate
      maxNumber
      createdAt
      updatedAt
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
      image_url
      structureID
      isActivate
      maxNumber
      createdAt
      updatedAt
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
      image_url
      structureID
      isActivate
      maxNumberPerDay
      createdAt
      updatedAt
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
      image_url
      structureID
      isActivate
      maxNumberPerDay
      createdAt
      updatedAt
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
      image_url
      structureID
      isActivate
      maxNumberPerDay
      createdAt
      updatedAt
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
      image_url
      Dishes {
        items {
          id
          name
          image
          description
          price
          image_url
          structureID
          isActivate
          maxNumberPerDay
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Ingredients {
        items {
          id
          name
          image
          description
          price
          image_url
          structureID
          isActivate
          maxNumber
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
        __typename
      }
      marketPlaceFees
      maxCancellations
      cancellationPenalityFee
      maxCancellationPenalityFee
      Bills {
        items {
          id
          amount
          regulated
          paymentDate
          monthConcerned
          structureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
      image_url
      Dishes {
        items {
          id
          name
          image
          description
          price
          image_url
          structureID
          isActivate
          maxNumberPerDay
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Ingredients {
        items {
          id
          name
          image
          description
          price
          image_url
          structureID
          isActivate
          maxNumber
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
        __typename
      }
      marketPlaceFees
      maxCancellations
      cancellationPenalityFee
      maxCancellationPenalityFee
      Bills {
        items {
          id
          amount
          regulated
          paymentDate
          monthConcerned
          structureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
      image_url
      Dishes {
        items {
          id
          name
          image
          description
          price
          image_url
          structureID
          isActivate
          maxNumberPerDay
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Ingredients {
        items {
          id
          name
          image
          description
          price
          image_url
          structureID
          isActivate
          maxNumber
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Baskets {
        items {
          id
          structureID
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
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
          __typename
        }
        nextToken
        __typename
      }
      marketPlaceFees
      maxCancellations
      cancellationPenalityFee
      maxCancellationPenalityFee
      Bills {
        items {
          id
          amount
          regulated
          paymentDate
          monthConcerned
          structureID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
