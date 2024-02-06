/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {enableLatestRenderer} from 'react-native-maps';
import React, { useEffect, useRef, useState } from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {RootNavigator} from './src/components';
import {Amplify} from 'aws-amplify';
// import {Authenticator,withAuthenticator} from '@aws-amplify/ui-react-native';
import { withAuthenticator } from '@aws-amplify/ui-react-native';
import config from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';
import BasketContextProvider from './src/contexts/BasketContext';
import OrderContextProvider from './src/contexts/OrderContext';
import DishContextProvider from './src/contexts/DishContext';
import IngredientContextProvider from './src/contexts/IngredientContext';

import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Amplify.configure({...config, Analytics: {disabled: true}});
enableLatestRenderer();
// Amplify.configure(config);
// LogBox.ignoreAllLogs()

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
    const navigationRef = useNavigationContainerRef();
    const routeNameRef = useRef();

    const setPreviousRouteValue = async (value) => {
      try {
        // await AsyncStorage.setItem('my-key', value);
        await AsyncStorage.setItem('@thePreviousRouteName', value)
        console.log('the current route:::', value)
      } catch (e) {
        // saving error
        console.log('Error while saving the current, route::', e)
      }
    }

  return (
    // <Authenticator.Provider>
    //   <Authenticator>
        <SafeAreaProvider style={styles.container}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                routeNameRef.current = navigationRef.getCurrentRoute();
              }}
              onStateChange={ async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.getCurrentRoute().name;
                const trackScreenView = () => {
                  // Your implementation of analytics goes here!
                  previousRouteName != undefined && setPreviousRouteValue(previousRouteName)
                };

                if (previousRouteName !== currentRouteName) {
                  // Save the current route name for later comparison
                  routeNameRef.current = currentRouteName;
              
                  // Replace the line below to add the tracker from a mobile analytics SDK
                  trackScreenView(currentRouteName);
                }
              }}
            >
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
          </GestureHandlerRootView>
        </SafeAreaProvider>
    //   </Authenticator>
    // </Authenticator.Provider>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#d5d5d5', flex: 1},
});

export default withAuthenticator(App);
// export default App;
 