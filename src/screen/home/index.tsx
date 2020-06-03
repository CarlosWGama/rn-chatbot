import * as React from 'react';
import { View, Text } from 'react-native';
import { Chatbot } from '../../components/chatbot';

export interface HomeProps {
}

export function HomeScreen (props: HomeProps) {
    return (
      <View style={{flex:1}} >
         <Text>Home</Text>
         <Chatbot/>
      </View>
    );
}
