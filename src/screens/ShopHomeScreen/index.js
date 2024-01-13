import {View, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';

import styles from '../RestaurantHomeScreen/styles';
import {useBasketContext} from '../../contexts/BasketContext';
import {Button, Text} from '@rneui/themed';
import ShopHeader from './ShopHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {IngredientListItem} from '../../components/shop/IngredientListItem';
import {getStructure} from '../../graphql/queries';
import {
  onCreateIngredient,
  onDeleteIngredient,
  onUpdateIngredient,
} from '../../graphql/subscriptions';

export const ShopeHomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    basket,
    basketDishes,
    setShopInfos,
    shopInfos,
    setRestaurantInfos,
    restaurantInfos,
  } = useBasketContext();

  const [shopContent, setShopContent] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const id = route.params?.ShopId;

  // For get shop by his id
  useEffect(() => {
    console.log('the id:::::::', id)
    if (!id) {
      return;
    }
    if (shopInfos) setShopInfos(null);
    if (restaurantInfos) setRestaurantInfos(null);
    API.graphql(graphqlOperation(getStructure, {id})).then(resp =>
      setShopContent(resp.data.getStructure),
    );
    fetchIngredients(id);
  }, [id]);

  useEffect(() => {
    if (id) {
      // Watch the oncreate ingredients
      const subscription = API.graphql(
        graphqlOperation(onCreateIngredient, {
          filter: {structureID: {eq: id}},
        }),
      ).subscribe({
        next: ({value}) => {
          fetchIngredients(id);
        },
        error: err => {
          console.warn(err);
        },
      });
      return () => subscription.unsubscribe();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      // Watch the onupdate ingredients
      const subscription = API.graphql(
        graphqlOperation(onUpdateIngredient, {
          filter: {structureID: {eq: id}},
        }),
      ).subscribe({
        next: ({value}) => {
          fetchIngredients(id);
        },
        error: err => {
          console.warn(err);
        },
      });
      return () => subscription.unsubscribe();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      // Watch the ondelete ingredient
      const subscriptionToDeleted = API.graphql(
        graphqlOperation(onDeleteIngredient, {
          filter: {structureID: {eq: id}},
        }),
      ).subscribe({
        next: ({value}) => {
          fetchIngredients(id);
          console.log('le wath onDeleteIngredient:', value);
        },
        error: err => {
          console.warn(err);
        },
      });
      return () => subscriptionToDeleted.unsubscribe();
    }
  }, [id]);

  const fetchIngredients = idShop => {
    API.graphql(graphqlOperation(listIngredientsByShop, {id: idShop})).then(
      resp => {
        const ingredientList = resp.data.getStructure.Ingredients.items
        // .filter(
        //   _ => !_._deleted,
        // );
        setIngredients(ingredientList);
      },
    );
  };

  // For search
  useEffect(() => {
    const filtering = searchTerm
      ? filterIngredientsByTerm(searchTerm)
      : ingredients;
    setFilteredIngredients(filtering);
  }, [searchTerm, ingredients]);

  const filterIngredientsByTerm = term => {
    return ingredients.filter(
      _ => `${_.name} ${_.description} `.indexOf(term) !== -1,
    );
  };

  useEffect(() => {
    setShopInfos(shopContent);
  }, [shopContent]);

  if (!shopContent) {
    return <ActivityIndicator size={'large'} color="black" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <ShopHeader
            shop={shopContent}
            searchTerm={searchTerm}
            setTerm={setSearchTerm}
          />
        )}
        data={filteredIngredients}
        renderItem={({item}) => <IngredientListItem ingredient={item} />}
        showsVerticalScrollIndicator={false}
      />
      {/* For empty filtered dishes array */}
      {filteredIngredients.length === 0 && (
        <View
          style={{
            flex: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            h3
            style={{
              color: 'lightgrey',
            }}>
            Aucun Ingrédient trouvé
          </Text>
        </View>
      )}
      <IonIcons
        onPress={() => navigation.goBack()}
        name="arrow-back"
        size={45}
        color="#fff"
        style={styles.iconContainer}
      />
      {basket && basketDishes.length >0 && (
        <Button
          title={
            basketDishes.length === 1 && basketDishes[0].quantity === 0
              ? 'Voir Panier ' + basketDishes[0].quantity
              : 'Voir Panier ' + basketDishes.length
          }
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.navigate('Basket')}
        />
      )}
    </View>
  );
};

export const listIngredientsByShop = /* GraphQL */ `
  query GetStructure($id: ID!) {
    getStructure(id: $id) {
      Ingredients {
        items {
          id
          name
          image
          image_url
          description
          price
          structureID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
