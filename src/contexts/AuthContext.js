import {API, Auth, graphqlOperation} from 'aws-amplify';
import {createContext, useContext, useEffect, useState} from 'react';
import {listUsers} from '../graphql/queries';
import * as Location from 'expo-location';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbUserLocation, setDbUserLocation] = useState(null);

  // the user id
  const sub = authUser?.attributes?.sub;

  useEffect(() => {
    console.log('the first innn:::', sub)
    Auth.currentAuthenticatedUser({bypassCache: true}).then(setAuthUser);
  }, []);

  useEffect(() => { 
    if (sub == undefined) {
      setLoading(false);
      return;
    }

    API.graphql(graphqlOperation(listUsers)).then(result => {
      const theCurrentUser = result.data.listUsers.items.filter(
        _ => _.sub === sub,
      );

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
    });
  }, [sub]);

  return (
    <AuthContext.Provider
      value={{authUser, dbUser, sub, setDbUser, loading, dbUserLocation}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
