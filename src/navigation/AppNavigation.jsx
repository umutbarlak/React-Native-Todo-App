import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SCREENS from '../utils/router';
import TodosScreen from '../screens/TodosScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const Stack = createNativeStackNavigator();

const {HOME, TODOS, ONBOARDING} = SCREENS;

const AppNavigation = () => {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState(ONBOARDING);
  const getInitialRoute = async () => {
    const savedRoute = await AsyncStorage.getItem('route');
    if (savedRoute) {
      setInitialRoute(JSON.parse(savedRoute));
    }
    setLoading(false);
  };
  useEffect(() => {
    getInitialRoute();
  }, []);

  if (loading) {
    return (
      <LottieView
        style={{
          width: 300,
          height: 300,
          alignSelf: 'center',
          height: '100%',
        }}
        source={require('../assets/animation/loading.json')}
        autoPlay
        loopa
      />
    ); // veya bir splash screen gösterebilirsin
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={HOME}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={TODOS}
        component={TodosScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={ONBOARDING}
        component={OnBoardingScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
