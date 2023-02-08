/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {HOST} from './host';

export const EditProfile = () => {
  const isFocused = useIsFocused();
  const [editing, setEditing] = useState(false);
  const [credEditing, setCredEditing] = useState(false);
  const [name, setName] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleID, setVehicleID] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [onDuty, setOnDuty] = useState('');

  const fetchProfile = async () => {
    const data = await AsyncStorage.getItem('rider_data');
    const riderDataObj = JSON.parse(data);
    console.log(riderDataObj);
    setName(riderDataObj.name);
    setDrivingLicense(riderDataObj.drivingLicense);
    setPhone(riderDataObj.phoneno);
    setVehicleID(riderDataObj.vehicleId);
    setPassword('213v324324$2@!@#!@$@$23');
    setOnDuty(riderDataObj.onduty);
    setEmail(riderDataObj.email);
    setBloodGroup(riderDataObj.bloodGroup);
  };
  useEffect(() => {
    if (isFocused) {
      fetchProfile();
    }
  }, [isFocused]);
  const handleUpdate = async () => {
    setEditing(false);
    setCredEditing(false);
    // Sending data to the server
    let body = {};
    if (password === '213v324324$2@!@#!@$@$23') {
      body = {
        name: name,
        phoneno: phone,
        vehicleId: vehicleID ? vehicleID : '',
        drivingLicense: drivingLicense,
      };
    } else {
      body = {
        name: name,
        phoneno: phone,
        password: password,
        vehicleId: vehicleID ? vehicleID : '',
        drivingLicense: drivingLicense,
      };
    }
    try {
      const response = await fetch(`http://${HOST}/rider/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        await AsyncStorage.setItem(
          'rider_data',
          JSON.stringify({
            ...body,
            bloodGroup: bloodGroup,
            email: email,
            onDuty: onDuty,
          }),
        );
        alert('Profile Updated successfully!');
      } else {
        console.log(data);
        throw new Error('Something went wrong!');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-[#181920]">
      <ScrollView className="flex flex-col p-4 mb-28 bg-[#181920]">
        <Text style={tw`text-3xl font-bold mb-4 text-center text-white`}>
          Profile
        </Text>
        <View style={tw`flex items-center`}>
          <Image
            style={tw`w-24 h-24 rounded-full my-2`}
            source={require('../assets/images/avatar.png')}
          />
        </View>
        <View style={tw`mt-4`}>
          <View className="flex-1 flex-row justify-center gap-3">
            <Text
              style={tw`text-xl text-center font-semibold text-gray-400 my-2`}>
              Profile
            </Text>

            <TouchableOpacity
              style={tw`h-7 w-7`}
              onPress={() => setEditing(!editing)}>
              <Image
                className="ml-2 h-7 w-7"
                source={require('../assets/images/edit_icon.png')}
              />
            </TouchableOpacity>
          </View>
          <View className="border-b border-gray-400" />
          <View style={tw`mb-2`}>
            <Text className="text-xl font-semibold text-gray-400 my-2">
              Name
            </Text>

            <View style={tw`flex flex-row items-center`}>
              <TextInput
                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                selectionColor="#9ca3af"
                textColor="#9ca3af"
                underlineColor="transparent"
                value={name}
                editable={editing}
                onChangeText={setName}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <Text className="text-xl font-semibold text-gray-400 my-2">
              Email ID
            </Text>

            <View style={tw`flex flex-row items-center`}>
              <TextInput
                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                selectionColor="#9ca3af"
                textColor="#9ca3af"
                underlineColor="transparent"
                value={email}
                editable={false}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <Text className="text-xl font-semibold text-gray-400 my-2">
              Driving License
            </Text>
            <View style={tw`flex flex-row items-center`}>
              <TextInput
                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                selectionColor="#9ca3af"
                textColor="#9ca3af"
                underlineColor="transparent"
                value={drivingLicense}
                editable={editing}
                onChangeText={setDrivingLicense}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <Text className="text-xl font-semibold text-gray-400 my-2">
              Phone Number
            </Text>

            <View style={tw`flex flex-row items-center`}>
              <TextInput
                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                selectionColor="#9ca3af"
                textColor="#9ca3af"
                underlineColor="transparent"
                value={phone}
                editable={editing}
                onChangeText={setPhone}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <Text className="text-xl font-semibold text-gray-400 my-2">
              Vehicle ID
            </Text>
            <View style={tw`flex flex-row items-center`}>
              <TextInput
                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                selectionColor="#9ca3af"
                textColor="#9ca3af"
                underlineColor="transparent"
                value={vehicleID}
                editable={editing}
                onChangeText={setVehicleID}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <Text className="text-xl font-semibold text-gray-400 my-2">
              Blood Group
            </Text>
            <View style={tw`flex flex-row items-center`}>
              <TextInput
                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                selectionColor="#9ca3af"
                textColor="#9ca3af"
                underlineColor="transparent"
                value={bloodGroup}
                editable={false}
              />
            </View>
          </View>
          {editing && (
            <>
              <View className="flex items-center">
                <Button
                  className="border rounded-xl w-11/12 h-12 bg-[#00ff57] mt-4 mb-4"
                  onPress={handleUpdate}>
                  <Text className="text-gray-900 text-lg">Update</Text>
                </Button>
              </View>
              <View style={tw`my-2`}></View>
            </>
          )}
          <View className="flex-1 flex-row justify-center gap-3 mt-3">
            <Text
              style={tw`text-xl text-center font-semibold text-gray-400 my-2`}>
              Credentials
            </Text>
            <TouchableOpacity
              style={tw`h-7 w-7`}
              onPress={() => setCredEditing(!credEditing)}>
              <Image
                className="ml-2 h-7 w-7"
                source={require('../assets/images/edit_icon.png')}
              />
            </TouchableOpacity>
          </View>
          <View className="border-b border-gray-400" />
          <View style={tw`mb-2`}>
            <Text className="text-xl font-semibold text-gray-400 my-2">
              Password
            </Text>

            <View style={tw`flex flex-row items-center`}>
              <TextInput
                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                selectionColor="#9ca3af"
                textColor="#9ca3af"
                underlineColor="transparent"
                secureTextEntry={true}
                value={password}
                editable={credEditing}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <View className="my-2"></View>
        </View>
        {credEditing && (
          <>
            <View className="flex items-center">
              <Button
                className="border rounded-xl w-11/12 h-12 bg-[#00ff57] mt-4 mb-4"
                onPress={handleUpdate}>
                <Text className="text-gray-900 text-lg">Update</Text>
              </Button>
            </View>
            <View style={tw`my-2`}></View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
