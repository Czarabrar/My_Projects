import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '../Components/Features';
import { dummymsg } from '../Constants';
import Voice from '@react-native-community/voice';
import { apiCall } from '../Api/openAi';
import Tts from 'react-native-tts';

const HomeScreen = () => {
  const [messages, setMessages] = useState(dummymsg);
  const [recording, setRecording] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [speaking, setSpeaking] = useState(true);
  const ScrollViewRef = useRef();

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
    Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    setRecording(true);
    setSpeaking(true);
    try {
      await Voice.start('en-US');
      console.log('trying');
    } catch (error) {
      console.log('this is the error ', error);
    }
  };
  const animateAndStartRecording = async () => {
    // Start the animation only if recording is not active
    if (!recording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1.2, duration: 300, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]),
        { iterations: -1 } // Loop indefinitely
      ).start();
    }
    // Start recording
    startRecording();
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchResponse = (input) => {
    // Call the API with the recorded prompt
    apiCall(input, messages)
      .then((response) => {
        console.log('API response:', response);
        // Extract relevant data from the response
        const completionText = response.completion;
        // Update messages with the response
        setMessages([
          ...messages,
          { role: 'user', content: input }, // Display user input first
          { role: 'assistant', content: completionText }, // Then display assistant's response
        ]);
  
        // Convert the response text to speech
        Tts.speak(completionText);
      })
      .catch((error) => {
        console.error('API call error:', error);
      });
  };
  

  const updateScrollView = () => {
    ScrollViewRef.current.scrollToEnd({ animated: true });
  };

  const speechStartHandler = () => {
    console.log('speech start handler');
  };

  const speechEndHandler = () => {
    setRecording(false);
    console.log('speech end handler');
  };

  const speechResultsHandler = (e) => {
    console.log('voice event: ', e);
    setMessages([...messages, { role: 'user', content: e.value }]);
    fetchResponse(e.value);
  };

  const speechErrorHandler = (e) => {
    console.log('speech error handler:', e);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const stopSpeaking = () => {
    Tts.stop();
    setSpeaking(false);
    
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F5EB' }}>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Image
            source={require('../../Assets/Images/robot.png')}
            style={{ height: hp(17), width: hp(12) }}
          />
        </View>

        {messages.length > 0 ? (
          <View style={{ flex: 1, marginTop: 20 }}>
            <Text style={{ fontSize: wp(5), fontFamily: 'monospace', color: '#000', marginLeft: 5 }}>
              Assistant
            </Text>
            <View style={{ height: hp(58), backgroundColor: '#D1D5DB', borderRadius: 20, padding: 10 }}>
              <ScrollView
                ref={ScrollViewRef}
                bounces={false}
                style={{ flex: 1 }}>
                {messages.map((message, index) => {
                  if (message.role == 'assistant') {
                    if (typeof message.content === 'string' && message.content.includes('https')) {
                      return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                          <View style={{ padding: 10, borderRadius: 20, backgroundColor: '#6EE7B7' }}>
                            <Image
                              source={{ uri: message.content }}
                              style={{ width: wp(60), height: wp(60), borderRadius: 20 }}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                      );
                    } else {
                      return (
                        <View key={index} style={{ width: wp(70), backgroundColor: '#6EE7B7', padding: 10, borderRadius: 20, marginLeft: 'auto', marginBottom: 10 }}>
                          <Text style={{ fontFamily: 'monospace', color: '#000' }}>
                            {message.content}
                          </Text>
                        </View>
                      );
                    }
                  } else {
                    return (
                      <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                        <View style={{ width: wp(70), backgroundColor: '#FFF', padding: 10, borderRadius: 20, marginRight: 'auto' }}>
                          <Text style={{ fontFamily: 'monospace', color: '#000' }}>
                            {message.content}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          {recording ? (
            <TouchableOpacity onPress={stopRecording}>
              <Animated.Image
                source={require('../../Assets/Images/mike.png')}
                style={{
                  width: wp(15),
                  height: hp(10),
                  tintColor: '#074173',
                  transform: [{ scale: scaleAnim }],
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={animateAndStartRecording}>
              <Image
                source={require('../../Assets/Images/mike.png')}
                style={{ width: wp(15), height: hp(10), tintColor: '#074173' }}
              />
            </TouchableOpacity>
          )}

          {messages.length > 0 && (
            <TouchableOpacity style={{ backgroundColor: '#C7D2FE', borderRadius: 20, padding: 10, position: 'absolute', right: 10 }} onPress={clearMessages}>
              <Text style={{ fontFamily: 'monospace', fontSize: 16, color: '#FFF' }}>
                Clear
              </Text>
            </TouchableOpacity>
          )}

          {speaking && (
            <TouchableOpacity style={{ backgroundColor: '#EF4444', borderRadius: 20, padding: 10, position: 'absolute', left: 10 }} onPress={stopSpeaking}>
              <Text style={{ fontFamily: 'monospace', fontSize: 16, color: '#FFF' }}>
                Stop
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
