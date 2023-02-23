/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {enableLatestRenderer} from 'react-native-maps';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/components';
import {Amplify} from 'aws-amplify';
import config from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';
import {withAuthenticator} from 'aws-amplify-react-native/dist/Auth';
import BasketContextProvider from './src/contexts/BasketContext';
import OrderContextProvider from './src/contexts/OrderContext';
import DishContextProvider from './src/contexts/DishContext';
import IngredientContextProvider from './src/contexts/IngredientContext';

Amplify.configure({...config, Analytics: {disabled: true}});
enableLatestRenderer();
// Amplify.configure(config);

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <AuthContextProvider>
          <BasketContextProvider>
            <OrderContextProvider>
              <DishContextProvider>
                <IngredientContextProvider>
                  <RootNavigator />
                </IngredientContextProvider>
              </DishContextProvider>
            </OrderContextProvider>
          </BasketContextProvider>
        </AuthContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#d5d5d5', flex: 1},
});

export default withAuthenticator(App);
