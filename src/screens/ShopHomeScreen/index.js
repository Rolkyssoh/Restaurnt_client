import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';

import styles from '../RestaurantHomeScreen/styles';
import {useBasketContext} from '../../contexts/BasketContext';
import {Button} from '@rneui/themed';
import ShopHeader from './ShopHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {IngredientListItem} from '../../components/shop/IngredientListItem';
import {getStructure} from '../../graphql/queries';

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

  const id = route.params?.ShopId;
  const [shopContent, setShopContent] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // For get shop by his id
  useEffect(() => {
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

  // useEffect(() => {
  //   fetchIngredients(id);
  // }, [basketDishes]);

  const fetchIngredients = idShop => {
    API.graphql(graphqlOperation(listIngredientsByShop, {id: idShop})).then(
      resp => {
        const ingredientList = resp.data.getStructure.Ingredients.items.filter(
          _ => !_._deleted,
        );
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

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => <ShopHeader shop={shopContent} />}
        data={filteredIngredients}
        renderItem={({item}) => <IngredientListItem ingredient={item} />}
        showsVerticalScrollIndicator={false}
      />
      <IonIcons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="#fff"
        style={styles.iconContainer}
      />
      {basket && (
        <Button
          title={'Voir Panier ' + basketDishes.length}
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
    }
  }
`;
