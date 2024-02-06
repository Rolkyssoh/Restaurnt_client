/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBill = /* GraphQL */ `
  mutation CreateBill(
    $input: CreateBillInput!
    $condition: ModelBillConditionInput
  ) {
    createBill(input: $input, condition: $condition) {
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
export const updateBill = /* GraphQL */ `
  mutation UpdateBill(
    $input: UpdateBillInput!
    $condition: ModelBillConditionInput
  ) {
    updateBill(input: $input, condition: $condition) {
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
export const deleteBill = /* GraphQL */ `
  mutation DeleteBill(
    $input: DeleteBillInput!
    $condition: ModelBillConditionInput
  ) {
    deleteBill(input: $input, condition: $condition) {
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
export const createBugs = /* GraphQL */ `
  mutation CreateBugs(
    $input: CreateBugsInput!
    $condition: ModelBugsConditionInput
  ) {
    createBugs(input: $input, condition: $condition) {
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
export const updateBugs = /* GraphQL */ `
  mutation UpdateBugs(
    $input: UpdateBugsInput!
    $condition: ModelBugsConditionInput
  ) {
    updateBugs(input: $input, condition: $condition) {
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
export const deleteBugs = /* GraphQL */ `
  mutation DeleteBugs(
    $input: DeleteBugsInput!
    $condition: ModelBugsConditionInput
  ) {
    deleteBugs(input: $input, condition: $condition) {
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
export const createAskedFeatures = /* GraphQL */ `
  mutation CreateAskedFeatures(
    $input: CreateAskedFeaturesInput!
    $condition: ModelAskedFeaturesConditionInput
  ) {
    createAskedFeatures(input: $input, condition: $condition) {
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
export const updateAskedFeatures = /* GraphQL */ `
  mutation UpdateAskedFeatures(
    $input: UpdateAskedFeaturesInput!
    $condition: ModelAskedFeaturesConditionInput
  ) {
    updateAskedFeatures(input: $input, condition: $condition) {
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
export const deleteAskedFeatures = /* GraphQL */ `
  mutation DeleteAskedFeatures(
    $input: DeleteAskedFeaturesInput!
    $condition: ModelAskedFeaturesConditionInput
  ) {
    deleteAskedFeatures(input: $input, condition: $condition) {
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
export const createCourier = /* GraphQL */ `
  mutation CreateCourier(
    $input: CreateCourierInput!
    $condition: ModelCourierConditionInput
  ) {
    createCourier(input: $input, condition: $condition) {
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
export const updateCourier = /* GraphQL */ `
  mutation UpdateCourier(
    $input: UpdateCourierInput!
    $condition: ModelCourierConditionInput
  ) {
    updateCourier(input: $input, condition: $condition) {
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
export const deleteCourier = /* GraphQL */ `
  mutation DeleteCourier(
    $input: DeleteCourierInput!
    $condition: ModelCourierConditionInput
  ) {
    deleteCourier(input: $input, condition: $condition) {
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
export const createOrderDish = /* GraphQL */ `
  mutation CreateOrderDish(
    $input: CreateOrderDishInput!
    $condition: ModelOrderDishConditionInput
  ) {
    createOrderDish(input: $input, condition: $condition) {
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
export const updateOrderDish = /* GraphQL */ `
  mutation UpdateOrderDish(
    $input: UpdateOrderDishInput!
    $condition: ModelOrderDishConditionInput
  ) {
    updateOrderDish(input: $input, condition: $condition) {
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
export const deleteOrderDish = /* GraphQL */ `
  mutation DeleteOrderDish(
    $input: DeleteOrderDishInput!
    $condition: ModelOrderDishConditionInput
  ) {
    deleteOrderDish(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createBasketDish = /* GraphQL */ `
  mutation CreateBasketDish(
    $input: CreateBasketDishInput!
    $condition: ModelBasketDishConditionInput
  ) {
    createBasketDish(input: $input, condition: $condition) {
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
export const updateBasketDish = /* GraphQL */ `
  mutation UpdateBasketDish(
    $input: UpdateBasketDishInput!
    $condition: ModelBasketDishConditionInput
  ) {
    updateBasketDish(input: $input, condition: $condition) {
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
export const deleteBasketDish = /* GraphQL */ `
  mutation DeleteBasketDish(
    $input: DeleteBasketDishInput!
    $condition: ModelBasketDishConditionInput
  ) {
    deleteBasketDish(input: $input, condition: $condition) {
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
export const createBasket = /* GraphQL */ `
  mutation CreateBasket(
    $input: CreateBasketInput!
    $condition: ModelBasketConditionInput
  ) {
    createBasket(input: $input, condition: $condition) {
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
export const updateBasket = /* GraphQL */ `
  mutation UpdateBasket(
    $input: UpdateBasketInput!
    $condition: ModelBasketConditionInput
  ) {
    updateBasket(input: $input, condition: $condition) {
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
export const deleteBasket = /* GraphQL */ `
  mutation DeleteBasket(
    $input: DeleteBasketInput!
    $condition: ModelBasketConditionInput
  ) {
    deleteBasket(input: $input, condition: $condition) {
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
export const createIngredient = /* GraphQL */ `
  mutation CreateIngredient(
    $input: CreateIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    createIngredient(input: $input, condition: $condition) {
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
export const updateIngredient = /* GraphQL */ `
  mutation UpdateIngredient(
    $input: UpdateIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    updateIngredient(input: $input, condition: $condition) {
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
export const deleteIngredient = /* GraphQL */ `
  mutation DeleteIngredient(
    $input: DeleteIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    deleteIngredient(input: $input, condition: $condition) {
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
export const createDish = /* GraphQL */ `
  mutation CreateDish(
    $input: CreateDishInput!
    $condition: ModelDishConditionInput
  ) {
    createDish(input: $input, condition: $condition) {
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
export const updateDish = /* GraphQL */ `
  mutation UpdateDish(
    $input: UpdateDishInput!
    $condition: ModelDishConditionInput
  ) {
    updateDish(input: $input, condition: $condition) {
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
export const deleteDish = /* GraphQL */ `
  mutation DeleteDish(
    $input: DeleteDishInput!
    $condition: ModelDishConditionInput
  ) {
    deleteDish(input: $input, condition: $condition) {
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
export const createStructure = /* GraphQL */ `
  mutation CreateStructure(
    $input: CreateStructureInput!
    $condition: ModelStructureConditionInput
  ) {
    createStructure(input: $input, condition: $condition) {
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
export const updateStructure = /* GraphQL */ `
  mutation UpdateStructure(
    $input: UpdateStructureInput!
    $condition: ModelStructureConditionInput
  ) {
    updateStructure(input: $input, condition: $condition) {
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
export const deleteStructure = /* GraphQL */ `
  mutation DeleteStructure(
    $input: DeleteStructureInput!
    $condition: ModelStructureConditionInput
  ) {
    deleteStructure(input: $input, condition: $condition) {
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
