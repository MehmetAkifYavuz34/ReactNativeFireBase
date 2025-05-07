import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainRouter from './src/router/mainRouter';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainRouter />
    </NavigationContainer>
  );
};

export default App;
