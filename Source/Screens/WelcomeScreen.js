import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WelcomeLogo from '../../Assets/SVG/WelcomeLogo';
import { useNavigation } from '@react-navigation/native';
const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 flex  justify-around bg-white">
      <View className="space-y-2">
      <Text style={{fontSize:wp(10),color:'#1a2b33',fontFamily:'monospace'}} className="text-center font-bold text-gray-700 ">
        My AI
      </Text>
      <Text className="text-center tracking-wider text-gray-600 font-semiBold
      " style={{fontFamily:'monospace',fontSize:wp(5),color:'#23556a'}}>
      The future is here
      </Text>
      </View>
      <View className="flex-row justify-center content-center	items-center">
      <Image source={require('../../Assets/Images/robot.png')} style={{width:wp(54),height:wp(75)}} />
      
      </View>
      <TouchableOpacity className=" mx-5 p-4 rounded-2xl" style={{backgroundColor:'#1a2b33'}}
      onPress={()=>navigation.navigate('Home')}>
        <Text style={{fontSize:wp(4),color:'#98ebf7'}} 
        className="text-center font-bold text-white text-2xl">
          Get Started
          </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
