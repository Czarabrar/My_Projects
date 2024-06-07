import { View, Text,Image, ScrollView } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Features = () => {
  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    style={{height:hp(60),marginBottom:10}} className="space-y-4" >
      <Text style={{fontFamily:'monospace',fontSize:wp(6.5)}} className="font-semibold text-gray-700">Features</Text>
      <View className="bg-emerald-200 p-4 rounded-xl space-x-2" style={{}}>
        <View className="flex-row items-center space-x-1" style={{flexDirection:'row'}}>
            <Image source={require('../../Assets/Images/chatgpt.png')} style={{height:hp(8),width:hp(8)}}></Image>
            <View style={{width:'80%'}}>
            <Text style={{fontSize:wp(4.8),fontFamily:'monospace'}} className="font-semibold text-gray-700">
                Chatgpt
            </Text>
            <Text style={{fontSize:wp(3.3),fontFamily:'monospace'}} className="text-gray font-medium"
            >
            ChatGPT, developed by OpenAI, is an AI conversational agent based on the GPT architecture, capable of engaging in natural language conversations and generating human-like text across various topics.
            </Text>
            </View>
        </View>
      </View>
      <View className="p-4 rounded-xl space-x-2" style={{backgroundColor:'#CCD3CA'}}>
        <View className="flex-row items-center space-x-1">
            <Image source={require('../../Assets/Images/dalle.png')} style={{height:hp(8),width:hp(8),borderRadius:hp(5)}}></Image>
            <View style={{width:'80%'}}>
            <Text style={{fontSize:wp(4.8),fontFamily:'monospace'}} className="font-semibold text-gray-700">
                DALL-E
            </Text>
            <Text style={{fontSize:wp(3.3),fontFamily:'monospace'}} className="text-gray font-medium"
            >
           DALL-E, developed by OpenAI, is an image generation model based on the GPT architecture, enabling it to create images from textual descriptions, broadening AI's creative capabilities into the visual realm.
            </Text>
            </View>
        </View>
      </View>
      <View className="p-4 rounded-xl space-x-2" style={{backgroundColor:'#D0BFFF',marginBottom:20}}>
        <View className="flex-row items-center space-x-1">
            <Image source={require('../../Assets/Images/smartbrain.png')} style={{height:hp(8),width:hp(8)}}></Image>
            <View style={{width:'80%'}}>
            <Text style={{fontSize:wp(4.8),fontFamily:'monospace'}} className="font-semibold text-gray-700">
                SMART AI
            </Text>
            <Text style={{fontSize:wp(3.3),fontFamily:'monospace'}} className="text-gray font-medium"
            >
            A powerful Voice Assistant with the abilities of Chatgpt and Dalle,providing you the best of both words and Images.
            </Text>
            </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Features