import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import * as firebase from 'firebase';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyBE2oajLG7Nkg148jcScDOSOjcVKU8xkQA",
  authDomain: "instagram-clone-bcc16.firebaseapp.com",
  projectId: "instagram-clone-bcc16",
  storageBucket: "instagram-clone-bcc16.appspot.com",
  messagingSenderId: "1031337674352",
  appId: "1:1031337674352:web:e906eee298124d858316b5",
  measurementId: "G-CGE2ZY5WPC"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/Main';

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded:true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded:true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded) {
      return (
        <View style={{flex:1, justifyContent: 'center'}}>
          <Text>Loading...</Text>
        </View>
      )
    }

    if(!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )
  }
}

export default App
