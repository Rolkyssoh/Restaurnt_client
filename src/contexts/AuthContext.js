import {generateClient} from 'aws-amplify/api';
import { fetchUserAttributes } from 'aws-amplify/auth';
import {createContext, useContext, useEffect, useState} from 'react';
import {listUsers} from '../graphql/queries';
import * as Location from 'expo-location';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbUserLocation, setDbUserLocation] = useState(null);
  const client = generateClient()

  // the user id
  // let sub;

  useEffect(() => {
    handleFetchUserAttributes()
  }, []);

  useEffect(() => { 
    if (!authUser) {
      // setLoading(false);
      return;
    }
    getCurrentUserInDb()
  }, [authUser]);

      //Get the current auth user informations
    async function handleFetchUserAttributes() {
        try {
            const userAttributes = await fetchUserAttributes();
            setAuthUser(userAttributes)
        } catch (error) {
          console.log(error);
        }
    }

    const getCurrentUserInDb = async () => {
      const result = await client.graphql({
        query: listUsers,
        variables:{
          filter:{
            sub:{ eq: authUser.sub}
          }
        }
      })
      const theCurrentUser = result.data.listUsers.items
      if (theCurrentUser.length === 0) {
        (async () => {
          let {status} = await Location.requestForegroundPermissionsAsync();
          if (!status === 'granted') {
            console.warn('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync();
          setDbUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        })();
      }

      setDbUser(theCurrentUser[0]);
      setLoading(false);
    }

  return (
    <AuthContext.Provider
      value={{authUser, dbUser, setDbUser, loading, dbUserLocation}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
