/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Orders {
          nextToken
          startedAt
          __typename
        }
        isActive
        sub
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
  }
`;
export const syncCouriers = /* GraphQL */ `
  query SyncCouriers(
    $filter: ModelCourierFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCouriers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        address
        lat
        lng
        tranportationMode
        email
        Orders {
          nextToken
          startedAt
          __typename
        }
        isActive
        sub
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
        structureID
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
          structureID
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncOrderDishes = /* GraphQL */ `
  query SyncOrderDishes(
    $filter: ModelOrderDishFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrderDishes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
          structureID
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
      nextToken
      startedAt
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
          structureID
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
      nextToken
      startedAt
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
        OrderDishes {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncOrders = /* GraphQL */ `
  query SyncOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        status
        userID
        OrderDishes {
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
      nextToken
      startedAt
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
        OrderDishes {
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
      nextToken
      startedAt
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
        OrderDishes {
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
      nextToken
      startedAt
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
        OrderDishes {
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
      nextToken
      startedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Baskets {
          nextToken
          startedAt
          __typename
        }
        Orders {
          nextToken
          startedAt
          __typename
        }
        email
        isActive
        picture
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
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        sub
        name
        address
        lat
        lng
        type
        Baskets {
          nextToken
          startedAt
          __typename
        }
        Orders {
          nextToken
          startedAt
          __typename
        }
        email
        isActive
        picture
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
  }
`;
export const getBasketDish = /* GraphQL */ `
  query GetBasketDish($id: ID!) {
    getBasketDish(id: $id) {
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
        __typename
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
          __typename
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncBasketDishes = /* GraphQL */ `
  query SyncBasketDishes(
    $filter: ModelBasketDishFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBasketDishes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          __typename
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
      nextToken
      startedAt
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
          __typename
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
      nextToken
      startedAt
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncBaskets = /* GraphQL */ `
  query SyncBaskets(
    $filter: ModelBasketFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBaskets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        structureID
        BasketDishes {
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
      nextToken
      startedAt
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
      nextToken
      startedAt
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
      nextToken
      startedAt
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
      structureID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        structureID
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
  }
`;
export const syncIngredients = /* GraphQL */ `
  query SyncIngredients(
    $filter: ModelIngredientFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncIngredients(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        __typename
      }
      nextToken
      startedAt
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
        structureID
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
      structureID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        structureID
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
  }
`;
export const syncDishes = /* GraphQL */ `
  query SyncDishes(
    $filter: ModelDishFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDishes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        __typename
      }
      nextToken
      startedAt
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
        structureID
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        Dishes {
          nextToken
          startedAt
          __typename
        }
        Ingredients {
          nextToken
          startedAt
          __typename
        }
        Baskets {
          nextToken
          startedAt
          __typename
        }
        Orders {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncStructures = /* GraphQL */ `
  query SyncStructures(
    $filter: ModelStructureFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStructures(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        Dishes {
          nextToken
          startedAt
          __typename
        }
        Ingredients {
          nextToken
          startedAt
          __typename
        }
        Baskets {
          nextToken
          startedAt
          __typename
        }
        Orders {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
