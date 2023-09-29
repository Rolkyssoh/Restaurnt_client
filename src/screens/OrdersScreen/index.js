import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OrderListItem} from '../../components';
import {useOrderContext} from '../../contexts/OrderContext';
import {Text} from '@rneui/themed';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {OrderStatus} from '../../models';

const data = [
  {label: 'Nouveau', value: `${OrderStatus.NEW}`},
  {label: 'Annuler', value: `${OrderStatus.DECLINED_BY_STRUCTURE}`},
  {label: 'En cuisine', value: `${OrderStatus.COOKING}`},
  {label: 'Prêt au ramassage', value: `${OrderStatus.READY_FOR_PICKUP}`},
  {label: 'En route', value: `${OrderStatus.PICKED_UP}`},
  {label: 'Livrée', value: `${OrderStatus.COMPLETED}`},
];

export const OrdersScreen = () => {
  const {orders} = useOrderContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterdOrders, setFilteredOrders] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (selected.length > 0) {
      selected.map(status => {
        // const result = orders.filter(_ => `${_.status} `.indexOf(status) !== -1)
        const result = orders.filter(_ => _.status === status)
        console.log('the resuuulllt::::', result)
        console.log('the the fiiiltterrrr::::', filterdOrders)
        if(selected.length === 1){
          setFilteredOrders(result);
        } else {
          const arrayEmpty = []
          // for(let i = 0; i < result.length; i++){
          //   const isInDisplayItems = filterdOrders.some(_ => _.id !== result[i].id)
          //   console.log('the boooolean:::', isInDisplayItems)
          //   if(isInDisplayItems){
          //     arrayEmpty.push(result[i])
          //   }
          // }
          for(let i=0; i<result.length; i++){
            const theIndex = filterdOrders.indexOf(result[i])
            console.log('the indexxxx:::', theIndex)
            console.log('the eltttt:::', result[i])
            if(theIndex ===-1){
              console.log('elt non incluuu:::', result[i])
              arrayEmpty.push(result[i])
            }
          }
          setFilteredOrders([...arrayEmpty, ...filterdOrders])
          console.log('le new AAArrray:::', arrayEmpty)
        }
      });
      console.log('le the selected orders:', selected);
    } else {
      setFilteredOrders(orders);
    }
  }, [selected.length, orders]);

  const filterOrdersByTerm = term => {
    return orders.filter(_ => `${_.status} `.indexOf(term) !== -1);
  };

  return (
    <View
      style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Commandes</Text>
        <Text style={styles.headerSubtitle}>Liste de nouvelles et anciennes commandes</Text>
      </View>
      <MultiSelect
        containerStyle={{backgroundColor: '#fff'}}
        activeColor="#249689"
        itemTextStyle={{color: '#000'}}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedStyle={styles.selectedStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Filtrez par status"
        searchPlaceholder="Search..."
        value={selected}
        onChange={item => {
          console.log('on est bien dans le onchage:::::::::', item)
          setSelected(item);
        }}
        renderLeftIcon={() => (
          <MaterialCommunityIcons
            style={styles.icon}
            color="black"
            name="filter-outline"
            size={22}
          />
        )}
        renderRightIcon={() => (
          <View style={{flexDirection:'column', marginHorizontal:10}}>
            <Ionicons
              style={{top:5}}
              color="black"
              name="chevron-up"
              size={20}
            />
            <Ionicons
              style={{bottom:5}}
              color="black"
              name="chevron-down"
              size={20}
            />
          </View>
        )}
        
      />
      <View style={styles.containerScroll}>
        <FlatList
          data={filterdOrders}
          keyExtractor={item => item.id}
          renderItem={({item}) => <OrderListItem order={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {filterdOrders.length <= 0 && (
        <View style={{flex: 1, alignItems:'center', marginBottom:100}}>
          <Text h3 h3Style={{color:'lightgrey'}}>
            Aucune commande trouvée
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    marginBottom: 5,
    backgroundColor: 'whitesmoke',
  },
  header:{
    backgroundColor:'#249689',
    height:120,
    justifyContent:'center',
    paddingHorizontal:20,
    marginBottom:18
  },
  headerTitle:{
    color:'#fff',
    fontSize:30,
    fontWeight:'bold',
    marginVertical:10
  },
  headerSubtitle:{
    color:'#fff',
    fontSize:12,
    fontWeight:'bold'
  },
  containerScroll: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  dropdown: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom:23,
    borderRadius: 25,
    

    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#fff',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#249689',
    fontWeight:'bold',
  },
  icon: {
    marginRight: 5,
    marginLeft:10
  },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor:'#249689'
  },
});
