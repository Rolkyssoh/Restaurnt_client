import {API, Auth, graphqlOperation} from 'aws-amplify';
import {createContext, useContext, useEffect, useState} from 'react';
import {listUsers} from '../graphql/queries';
import {User} from '../models';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // the user id
  const sub = authUser?.attributes?.sub;

  useEffect(() => {
    Auth.currentAuthenticatedUser({bypassCache: true}).then(setAuthUser);
  }, []);

  useEffect(() => {
    if (!sub) {
      return;
    }

    // DataStore.query(User, user => user.sub('eq', sub)).then(users => {
    //   setDbUser(users[0]);
    //   setLoading(false);
    // });
    API.graphql(graphqlOperation(listUsers)).then(result => {
      const theCurrentUser = result.data.listUsers.items.filter(
        _ => _.sub === sub,
      );
      setDbUser(theCurrentUser[0]);
      setLoading(false);
    });
  }, [sub]);

  return (
    <AuthContext.Provider value={{authUser, dbUser, sub, setDbUser, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
