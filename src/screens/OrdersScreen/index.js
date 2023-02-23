import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OrderListItem} from '../../components';
import {useOrderContext} from '../../contexts/OrderContext';
import {Text} from '@rneui/themed';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
        const result = orders.filter(_ => _.status === status);
        if (selected.length === 1) {
          setFilteredOrders(result);
        } else {
          setFilteredOrders([...filterdOrders, ...result]);
        }
      });
      console.log('le the selected orders:', selected);
    } else {
      setFilteredOrders(orders);
    }
  }, [selected, orders]);

  const filterOrdersByTerm = term => {
    return orders.filter(_ => `${_.status} `.indexOf(term) !== -1);
  };

  return (
    <View style={{flex: 1, marginBottom: 5, paddingTop: 15}}>
      <MultiSelect
        containerStyle={{backgroundColor: '#fff'}}
        activeColor="yellowgreen"
        itemTextStyle={{color: '#000'}}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Filtrez par status"
        searchPlaceholder="Search..."
        value={selected}
        onFocus={() => console.log('the focusss!')}
        onChange={item => {
          setSelected(item);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        selectedStyle={styles.selectedStyle}
      />
      <View style={styles.container}>
        <FlatList
          data={filterdOrders}
          renderItem={({item}) => <OrderListItem order={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {filterdOrders.length <= 0 && (
        <Text
          h3
          style={{color: 'lightgrey', alignSelf: 'center', marginTop: '50%'}}>
          Aucune commande trouvée
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: 'lightgrey',
    borderTopWidth: 0.5,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
  },
  dropdown: {
    height: 45,
    backgroundColor: 'lightgrey',
    borderBottomColor: 'yellowgreen',
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
    color: 'yellow',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#fff',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'yellowgreen',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
