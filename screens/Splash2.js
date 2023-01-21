import {
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Splash2 = () => {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView className="flex-1 bg-[#181920]">
            <ImageBackground source={require('../assets/images/Splash2.png')}>
                <View className="h-full">
                    <View className="mt-[120%] flex-1 ml-10">
                        <Text className="text-2xl font-semibold text-white mb-7">Deliver <Text className="text-[#1976D2]">Same Day</Text></Text>
                        <Text className="text-2xl text-white font-semibold">Delight your Customers</Text>
                        <Text className="text-2xl text-white font-semibold">Increase Your Sales</Text>
                        <TouchableOpacity
                            onPress={()=>navigation.navigate('Login')}
                            className="border-2 py-3 rounded-xl align-middle items-center mt-24 w-11/12 bg-[#181920] border-[#04F968]">
                            <Text className="text-[#04F968] text-lg">Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        </SafeAreaView>
    )
}

export default Splash2