import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SCREENS from '../utils/router';

const HomeScreen = ({navigation}) => {
  const resetRoute = async () => {
    await AsyncStorage.multiRemove(['route', 'todos']);
    navigation.replace(SCREENS.ONBOARDING);
  };
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require('../assets/animation/home.json')}
        autoPlay
        loop
      />
      <LinearGradient
        style={styles.buttonWrapper}
        colors={['#8967B3', '#CDC1FF']}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.TODOS)}
          style={styles.button}>
          <Text style={styles.buttonText}>New Task, Who's in?</Text>
        </TouchableOpacity>
      </LinearGradient>

      <LinearGradient
        style={styles.buttonWrapper}
        colors={['#B7B1F2', '#FDB7EA']}>
        <TouchableOpacity onPress={resetRoute} style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  },
  animation: {width: 350, height: 350},
  buttonWrapper: {
    borderRadius: 25,
  },
  button: {
    padding: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});
