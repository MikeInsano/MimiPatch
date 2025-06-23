import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import BabyStatus from '../components/BabyStatus';
import Header from '../components/Header';
import Player from '../components/Player';
import Notifications from './Notifications';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#AE49D0', padding: 16 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <BabyStatus />
        <View style={{ gap: 16 }}>
          <Player />
          <Notifications/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
