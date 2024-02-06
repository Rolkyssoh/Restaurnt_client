/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBill = /* GraphQL */ `
  query GetBill($id: ID!) {
    getBill(id: $id) {
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
export const listBills = /* GraphQL */ `
  query ListBills(
    $filter: ModelBillFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBills(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const billsByStructureID = /* GraphQL */ `
  query BillsByStructureID(
    $structureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBillFilterInput
    $limit: Int
    $nextToken: String
  ) {
    billsByStructureID(
      structureID: $structureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getBugs = /* GraphQL */ `
  query GetBugs($id: ID!) {
    getBugs(id: $id) {
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
export const listBugs = /* GraphQL */ `
  query ListBugs(
    $filter: ModelBugsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBugs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const bugsByUserID = /* GraphQL */ `
  query BugsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBugsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bugsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const bugsByCourierID = /* GraphQL */ `
  query BugsByCourierID(
    $courierID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBugsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bugsByCourierID(
      courierID: $courierID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getAskedFeatures = /* GraphQL */ `
  query GetAskedFeatures($id: ID!) {
    getAskedFeatures(id: $id) {
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
export const listAskedFeatures = /* GraphQL */ `
  query ListAskedFeatures(
    $filter: ModelAskedFeaturesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAskedFeatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const askedFeaturesByUserID = /* GraphQL */ `
  query AskedFeaturesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAskedFeaturesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    askedFeaturesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const askedFeaturesByCourierID = /* GraphQL */ `
  query AskedFeaturesByCourierID(
    $courierID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAskedFeaturesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    askedFeaturesByCourierID(
      courierID: $courierID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getCourier = /* GraphQL */ `
  query GetCourier($id: ID!) {
    getCourier(id: $id) {
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
export const listCouriers = /* GraphQL */ `
  query ListCouriers(
    $filter: ModelCourierFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCouriers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          nextToken
          __typename
        }
        AskedFeatures {
          nextToken
          __typename
        }
        Bugs {
          nextToken
          __typename
        }
        phonenumber
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getOrderDish = /* GraphQL */ `
  query GetOrderDish($id: ID!) {
    getOrderDish(id: $id) {
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
export const listOrderDishes = /* GraphQL */ `
  query ListOrderDishes(
    $filter: ModelOrderDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const orderDishesByOrderID = /* GraphQL */ `
  query OrderDishesByOrderID(
    $orderID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderDishesByOrderID(
      orderID: $orderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        userID
        structureID
        OrderDishes {
          nextToken
          __typename
        }
        courierID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ordersByUserID = /* GraphQL */ `
  query OrdersByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        userID
        structureID
        OrderDishes {
          nextToken
          __typename
        }
        courierID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ordersByStructureID = /* GraphQL */ `
  query OrdersByStructureID(
    $structureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByStructureID(
      structureID: $structureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        userID
        structureID
        OrderDishes {
          nextToken
          __typename
        }
        courierID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ordersByCourierID = /* GraphQL */ `
  query OrdersByCourierID(
    $courierID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByCourierID(
      courierID: $courierID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        userID
        structureID
        OrderDishes {
          nextToken
          __typename
        }
        courierID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          nextToken
          __typename
        }
        Orders {
          nextToken
          __typename
        }
        AskedFeatures {
          nextToken
          __typename
        }
        Bugs {
          nextToken
          __typename
        }
        phonenumber
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBasketDish = /* GraphQL */ `
  query GetBasketDish($id: ID!) {
    getBasketDish(id: $id) {
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
export const listBasketDishes = /* GraphQL */ `
  query ListBasketDishes(
    $filter: ModelBasketDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBasketDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const basketDishesByBasketID = /* GraphQL */ `
  query BasketDishesByBasketID(
    $basketID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBasketDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    basketDishesByBasketID(
      basketID: $basketID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getBasket = /* GraphQL */ `
  query GetBasket($id: ID!) {
    getBasket(id: $id) {
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
export const listBaskets = /* GraphQL */ `
  query ListBaskets(
    $filter: ModelBasketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBaskets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        structureID
        BasketDishes {
          nextToken
          __typename
        }
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const basketsByStructureID = /* GraphQL */ `
  query BasketsByStructureID(
    $structureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBasketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    basketsByStructureID(
      structureID: $structureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        structureID
        BasketDishes {
          nextToken
          __typename
        }
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const basketsByUserID = /* GraphQL */ `
  query BasketsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBasketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    basketsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        structureID
        BasketDishes {
          nextToken
          __typename
        }
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getIngredient = /* GraphQL */ `
  query GetIngredient($id: ID!) {
    getIngredient(id: $id) {
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
export const listIngredients = /* GraphQL */ `
  query ListIngredients(
    $filter: ModelIngredientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIngredients(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const ingredientsByStructureID = /* GraphQL */ `
  query IngredientsByStructureID(
    $structureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelIngredientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ingredientsByStructureID(
      structureID: $structureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getDish = /* GraphQL */ `
  query GetDish($id: ID!) {
    getDish(id: $id) {
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
export const listDishes = /* GraphQL */ `
  query ListDishes(
    $filter: ModelDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const dishesByStructureID = /* GraphQL */ `
  query DishesByStructureID(
    $structureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    dishesByStructureID(
      structureID: $structureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getStructure = /* GraphQL */ `
  query GetStructure($id: ID!) {
    getStructure(id: $id) {
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
export const listStructures = /* GraphQL */ `
  query ListStructures(
    $filter: ModelStructureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStructures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          nextToken
          __typename
        }
        Ingredients {
          nextToken
          __typename
        }
        Baskets {
          nextToken
          __typename
        }
        Orders {
          nextToken
          __typename
        }
        marketPlaceFees
        maxCancellations
        cancellationPenalityFee
        maxCancellationPenalityFee
        Bills {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
