/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Notes from './Notes';
import Login, { IUser } from './Login';

//modified type to only take username
export type TRootStackParamList = {
  Login: undefined;
  Notes: {
    username: string;
  };
};
// export type TRootStackParamList = {
//     Login: undefined;
//     Notes: {
//         user: IUser;
//     };
// };

function App() {
    //modified to adapt to new rtpe TRootStackParamList
    const [signedInAs, setSignedInAs] = React.useState<string | false>(false);
    //const [signedInAs, setSignedInAs] = React.useState<IUser | false>(false);

    const Stack = createNativeStackNavigator<TRootStackParamList>();

    return (
        <NavigationContainer>
            {/* Modified so we are only passing in username and not (user) which includes users password */}
            <Stack.Navigator>
                {!signedInAs ? (
                    <Stack.Screen name="Login">
                    {(props) => <Login {...props} onLogin={(user) => setSignedInAs(user.username)} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="Notes" component={Notes} initialParams={{ username: signedInAs }} />
                )}
            </Stack.Navigator>
            {/* <Stack.Navigator>
                {
                    !signedInAs ?
                        <Stack.Screen name="Login">
                            {(props) => <Login {...props} onLogin={(user) => setSignedInAs(user)} />}
                        </Stack.Screen> :
                        <Stack.Screen name="Notes" component={Notes} initialParams={{ user: signedInAs }} />
                }
            </Stack.Navigator> */}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
});

export default App;
