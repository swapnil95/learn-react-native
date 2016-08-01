import React, { Component } from 'react'
import { Text, Navigator, TouchableHighlight } from 'react-native'
import { AppRegistry } from 'react-native'

import PassportDetails from './src/Containers/PassportDetails'
import PersonalDetails from './src/Containers/PersonalDetails'
import Start from './src/Containers/Start'

class AwsomeProject extends Component {
  render() {
    const routes = [
      {title: 'Start', index: 0},
      {title: 'Passport Details', index: 1},
      {title: 'Personal Details', index: 2}
    ];
    return (
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
          }
        }}
        navigationBar={
         <Navigator.NavigationBar
           routeMapper={{
             LeftButton: (route, navigator, index, navState) => {
               if(index !== 0) {
                return (<Text onPress={() => navigator.pop()}>Back</Text>)
              }
              return (<Text></Text>)
             },
             RightButton: (route, navigator, index, navState) => {
               if(index !== routes.length-1) {
                 return (
                   <Text onPress={() => navigator.push(routes[index+1])}>
                    Next
                   </Text>
                 )
               }
               return (<Text></Text>)
             },
             Title: (route, navigator, index, navState) => {
              return (
                <Text>{routes[index].title}</Text>
              )
             },
           }}
           style={{backgroundColor: '#5E7690'}}
         />
       }
        style={{padding: 100}}
      />
    );
  }
}

AppRegistry.registerComponent('AwsomeProject', () => AwsomeProject);
