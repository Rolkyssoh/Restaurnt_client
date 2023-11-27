import {View, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from './Header';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {DishListItem} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Text} from '@rneui/themed';
import {API, graphqlOperation} from 'aws-amplify';
import {useBasketContext} from '../../contexts/BasketContext';
import {getStructure} from '../../graphql/queries';
import {onCreateDish, onDeleteDish, onUpdateDish} from '../../graphql/subscriptions';

export const RestaurantHomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    setRestaurantInfos,
    restaurantInfos,
    setShopInfos,
    shopInfos,
    basket,
    basketDishes,
  } = useBasketContext();

  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const id = route.params?.id;

  useEffect(() => {
    console.log('le basket dish dans restau home:', basketDishes);
  }, [basketDishes]);

  const fetchDishes = idRestau => {
    API.graphql(graphqlOperation(listDishesByRestaurant, {id: idRestau})).then(
      resp => {
        const dishList = resp.data.getStructure.Dishes.items.filter(
          _ => !_._deleted,
        );
        setDishes(dishList);
      },
    );
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    if (restaurantInfos) setRestaurantInfos(null);
    if (shopInfos) setShopInfos(null);
    // fetch the restaurant with the id
    API.graphql(graphqlOperation(getStructure, {id})).then(restau =>
      setRestaurant(restau.data.getStructure),
    );

    fetchDishes(id);
  }, [id]);

  useEffect(() => {
    if (id) {
      // Watch the on create dish
      const subscription = API.graphql(
        graphqlOperation(onCreateDish, {
          filter: {structureID: {eq: id}},
        }),
      ).subscribe({
        next: ({value}) => {
          fetchDishes(id);
          console.log('le wath onCreateDish:', value);
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
      // Watch the on update dish
      const subscription = API.graphql(
        graphqlOperation(onUpdateDish, {
          filter: {structureID: {eq: id}},
        }),
      ).subscribe({
        next: ({value}) => {
          fetchDishes(id);
          console.log('le wath onUpdateDish:', value);
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
      // Watch the on delete dish
      const subscriptionToDeleted = API.graphql(
        graphqlOperation(onDeleteDish, {
          filter: {structureID: {eq: id}},
        }),
      ).subscribe({
        next: ({value}) => {
          fetchDishes(id);
          console.log('le wath onDeleteDish:', value);
        },
        error: err => {
          console.warn(err);
        },
      });
      return () => subscriptionToDeleted.unsubscribe();
    }
  }, [id]);

  useEffect(() => {
    setRestaurantInfos(restaurant);
  }, [restaurant]);

  useEffect(() => {
    const filtering = searchTerm ? filterDishesByTerm(searchTerm) : dishes;
    setFilteredDishes(filtering);
  }, [searchTerm, dishes]);

  const filterDishesByTerm = term => {
    return dishes.filter(
      _ => `${_.name} ${_.description} `.indexOf(term) !== -1,
    );
  };

  if (!restaurant) {
    return <ActivityIndicator size={'large'} color="black" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <Header
            restaurant={restaurant}
            searchTerm={searchTerm}
            setTerm={setSearchTerm}
          />
        )}
        data={filteredDishes}
        renderItem={({item}) => <DishListItem dish={item} />}
        showsVerticalScrollIndicator={false}
      />
      {/* For empty filtered dishes array */}
      {filteredDishes.length === 0 && (
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
            Aucun plat trouvé
          </Text>
        </View>
      )}
      <View style={styles.iconContainer}>
        <IonIcons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={40}
          color="#fff"
        />
      </View>
      {basket && basketDishes.length >0 &&(
        <Button
          titleStyle={{ fontSize:18, fontWeight:'200'}}
          title={
            basketDishes.length === 1 && basketDishes[0].quantity === 0
              ? 'Voir Panier ' + 0
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

export const listDishesByRestaurant = /* GraphQL */ `
  query GetStructure($id: ID!) {
    getStructure(id: $id) {
      Dishes {
        items {
          id
          name
          image
          description
          price
          image_url
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
