import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import SCREENS from '../utils/router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

SCREENS;

const OnBoardingScreen = ({navigation}) => {
  const setInitialRoute = async () => {
    await AsyncStorage.setItem('route', JSON.stringify(SCREENS.HOME));
  };
  return (
    <Onboarding
      onSkip={() => {
        navigation.replace(SCREENS.HOME);
        setInitialRoute();
      }}
      onDone={() => {
        navigation.navigate(SCREENS.HOME);
        setInitialRoute();
      }}
      style={{flex: 1}}
      pages={[
        {
          backgroundColor: '#80C4E9',
          image: (
            <LottieView
              style={{width: width, height: width}}
              source={require('../assets/animation/boost.json')}
              autoPlay
              loop
            />
          ),
          title: 'Boost Your Productivity',
          subtitle: 'Join our Udemig courses to enhance your skils',
        },
        {
          backgroundColor: '#FFB26F',
          image: (
            <LottieView
              style={{width: width, height: width}}
              source={require('../assets/animation/goals.json')}
              autoPlay
              loop
            />
          ),
          title: 'Work Without Interruptions ',
          subtitle: 'Complete your tasks smoothly with our prroductivity tips',
        },
        {
          backgroundColor: '#9192ff',
          image: (
            <LottieView
              style={{width: width, height: width}}
              source={require('../assets/animation/interruption.json')}
              autoPlay
              loopa
            />
          ),
          title: 'Reach Higher Goals',
          subtitle:
            'Utilize our platform to achieve your professional aspirations',
        },
      ]}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({});
