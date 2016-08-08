import React, { Component } from 'react'
import { Text, Navigator, TouchableHighlight,AppRegistry, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import PassportDetails from './src/Containers/PassportDetails'
import PersonalDetails from './src/Containers/PersonalDetails'
import TravelDetails from './src/Containers/TravelDetails'
import Start from './src/Containers/Start'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './src/Reducers'

let store = createStore(reducer)


class AwsomeProject extends Component {
  render() {
    const routes = [
      {title: 'Start', index: 0},
      {title: 'Passport Details', index: 1},
      {title: 'Personal Details', index: 2},
      {title: 'Travel Details', index: 3}
    ];
    return (
      <Provider store={store}>
      <Navigator
        initialRoute={routes[0]}
        intialRouterStack = {routes}
        renderScene={(route, navigator) => {
          switch (route.title) {
            case 'Start':
              return (<Start />)
            case 'Passport Details':
              return (<PassportDetails />)
            case 'Personal Details':
              return (<PersonalDetails />)
            case 'Travel Details':
              return (<TravelDetails />)
          }
        }}
        navigationBar={
         <Navigator.NavigationBar
           routeMapper={{
             LeftButton: (route, navigator, index, navState) => {
               if(index !== 0) {
                return (
                  <TouchableHighlight
                    style={{height: 50, marginLeft: 25}}
                    onPress={() => navigator.pop()} >
                      <Icon
                        style={{marginTop: 17, color: '#fff'}}
                        size={25} name="angle-left" />
                  </TouchableHighlight>)
              }
              return (<Text></Text>)
             },
             RightButton: (route, navigator, index, navState) => {
               if(index !== routes.length-1) {
                 return (
                   <TouchableHighlight
                    style={{height: 50, marginRight: 25}}
                    onPress={() => navigator.push(routes[index+1])}>
                      <Icon
                        style={{marginTop: 17, color: '#fff'}}
                        size={25} name="angle-right" />
                  </TouchableHighlight>
                )
               }
               return (<Text></Text>)
             },
             Title: (route, navigator, index, navState) => {
              return (
                <Text
                  style={{
                    color: '#fff',
                    marginTop: 17,
                    marginLeft: 20,
                    textAlign: 'center',
                    width: 180,
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                    {routes[index].title}
                </Text>
              )
             },
           }}
           style={{backgroundColor: '#00bcd4',
                   elevation: 8}}
        />
       }
        style={{padding: 10, paddingTop:80}}
      />
      </Provider  >
    );
  }
}

AppRegistry.registerComponent('AwsomeProject', () => AwsomeProject);
