import React from 'react'
import HomeScreen from '../screens/HomeScreen'

function MainStack(Stack){
  return (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
    </>
  )
}

export default MainStack