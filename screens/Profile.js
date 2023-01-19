/* eslint-disable */
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';

export const Profile = () => {
    const [editing, setEditing] = useState(false);
    const [credEditing, setCredEditing] = useState(false);
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [phone, setPhone] = useState('555-555-5555');
    const [bloodGroup, setBloodGroup] = useState('A+');
    const [noticePeriod, setNoticePeriod] = useState('30 days');
    const [userName, setUsername] = useState('john_doe');
    const [password, setPassword] = useState('john_doe');

    const handleEdit = (field) => {
        setEditing(true);
    };

    const handleCredEdit = (field) => {
        setCredEditing(true);
    };

    const handleUpdate = () => {
        setEditing(false);
        setCredEditing(false);
        // Send data to server
    };
    return (
        <SafeAreaView className="flex-1 bg-[#181920]">
        <ScrollView className="flex flex-col p-4 mb-28 bg-[#181920]">
            <Text style={tw`text-3xl font-bold mb-4 text-center text-white`}>Profile</Text>
            <View style={tw`flex items-center`}>
                <Image
                    style={tw`w-24 h-24 rounded-full my-2`}
                    source={require('../assets/images/avatar.png')}
                />
                <Text style={tw`ml-4 text-lg text-gray-400`}>User ID: 123456</Text>
            </View>
            <View style={tw`mt-4`}>
                <View className="flex-1 flex-row justify-center gap-3">
                <Text style={tw`text-xl text-center font-semibold text-gray-400 my-2`}>Profile</Text>
                {!editing ? <TouchableOpacity style={tw`h-7 w-7`} onPress={() => handleEdit('name')}>
                    <Image
                        className="ml-2 h-7 w-7"
                        source={require('../assets/images/edit_icon.png')}
                    />
                </TouchableOpacity>:''}
                </View>
                <View className="border-b border-gray-400" />
                <View style={tw`mb-2`}>
                    <Text className="text-xl font-semibold text-gray-400 my-2">Name</Text>
                    {editing ? (
                        <TextInput
                            className="border border-gray-400 text-lg rounded bg-[#252a34]"
                            selectionColor="#9ca3af"
                            textColor="#9ca3af"
                            value={name}
                            onChangeText={setName}
                        />
                    ) : (
                        <View style={tw`flex flex-row items-center`}>
                            <TextInput
                                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                                selectionColor="#9ca3af"
                                textColor="#9ca3af"
                                underlineColor="transparent"
                                value={name}
                                editable={false}
                                onChangeText={setName}
                            />
                        </View>
                    )}
                </View>
                <View style={tw`mb-2`}>
                    <Text className="text-xl font-semibold text-gray-400 my-2">Email</Text>
                    {editing ? (
                        <TextInput
                            className="border border-gray-400 text-lg rounded bg-[#252a34]"
                            selectionColor="#9ca3af"
                            textColor="#9ca3af"
                            value={email}
                            onChangeText={setEmail}
                        />
                    ) : (
                        <View style={tw`flex flex-row items-center`}>
                            <TextInput
                                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                                selectionColor="#9ca3af"
                                textColor="#9ca3af"
                                underlineColor="transparent"
                                value={email}
                                editable={false}
                                onChangeText={setEmail}
                            />
                        </View>
                    )}
                </View>
                <View style={tw`mb-2`}>
                    <Text className="text-xl font-semibold text-gray-400 my-2">Phone</Text>
                    {editing ? (
                        <TextInput
                            className="border border-gray-400 text-lg rounded bg-[#252a34]"
                            selectionColor="#9ca3af"
                            textColor="#9ca3af"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    ) : (
                        <View style={tw`flex flex-row items-center`}>
                            <TextInput
                                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                                selectionColor="#9ca3af"
                                textColor="#9ca3af"
                                underlineColor="transparent"
                                value={phone}
                                editable={false}
                                onChangeText={setPhone}
                            />
                        </View>
                    )}
                </View>
                <View style={tw`mb-2`}>
                    <Text className="text-xl font-semibold text-gray-400 my-2">Blood Group</Text>
                    {editing ? (
                        <TextInput
                            className="border border-gray-400 text-lg rounded bg-[#252a34]"
                            selectionColor="#9ca3af"
                            textColor="#9ca3af"
                            value={bloodGroup}
                            onChangeText={setBloodGroup}
                        />
                    ) : (
                        <View style={tw`flex flex-row items-center`}>
                            <TextInput
                                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                                selectionColor="#9ca3af"
                                textColor="#9ca3af"
                                underlineColor="transparent"
                                value={bloodGroup}
                                editable={false}
                                onChangeText={setBloodGroup}
                            />
                        </View>
                    )}
                </View>
                <View style={tw`mb-2`}>
                    <Text className="text-xl font-semibold text-gray-400 my-2">Notice Period</Text>
                    {editing ? (
                        <TextInput
                            className="border border-gray-400 text-lg rounded bg-[#252a34]"
                            selectionColor="#9ca3af"
                            textColor="#9ca3af"
                            value={noticePeriod}
                            onChangeText={setNoticePeriod}
                        />
                    ) : (
                        <View style={tw`flex flex-row items-center`}>
                            <TextInput
                                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                                selectionColor="#9ca3af"
                                textColor="#9ca3af"
                                underlineColor="transparent"
                                value={noticePeriod}
                                editable={false}
                                onChangeText={setNoticePeriod}
                            />
                        </View>
                    )}
                </View>
                {editing && (
                <>
                    <View className="flex items-center">
                        <Button className="border rounded-xl w-11/12 h-12 bg-[#00ff57] mt-4 mb-4" onPress={handleUpdate}>
                            <Text className="text-gray-900 text-lg">Update</Text>
                        </Button>
                    </View>
                    <View style={tw`my-2`}>

                    </View></>
            )}
                <View className="flex-1 flex-row justify-center gap-3 mt-3">
                <Text style={tw`text-xl text-center font-semibold text-gray-400 my-2`}>Credentials</Text>
                {!credEditing ? <TouchableOpacity style={tw`h-7 w-7`} onPress={() => handleCredEdit('name')}>
                    <Image
                        className="ml-2 h-7 w-7"
                        source={require('../assets/images/edit_icon.png')}
                    />
                </TouchableOpacity>:''}
                </View>
                <View className="border-b border-gray-400" />
                <View style={tw`mb-2`}>
                    <Text className="text-xl font-semibold text-gray-400 my-2">Username</Text>
                    {credEditing ? (
                        <TextInput
                            className="border border-gray-400 text-lg rounded bg-[#252a34]"
                            selectionColor="#9ca3af"
                            textColor="#9ca3af"
                            value={userName}
                            onChangeText={setUsername}
                        />
                    ) : (
                        <View style={tw`flex flex-row items-center`}>
                            <TextInput
                                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                                selectionColor="#9ca3af"
                                textColor="#9ca3af"
                                underlineColor="transparent"
                                value={userName}
                                editable={false}
                                onChangeText={setUsername}
                            />
                        </View>
                    )}
                </View>
                <View style={tw`mb-2`}>
                    <Text className="text-xl font-semibold text-gray-400 my-2">Password</Text>
                    {credEditing ? (
                        <TextInput
                            className="border border-gray-400 text-lg rounded bg-[#252a34]"
                            selectionColor="#9ca3af"
                            textColor="#9ca3af"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    ) : (
                        <View style={tw`flex flex-row items-center`}>
                            <TextInput
                                className="rounded bg-[#252a34] w-full text-lg border border-solid border-gray-300"
                                selectionColor="#9ca3af"
                                textColor="#9ca3af"
                                underlineColor="transparent"
                                secureTextEntry={true}
                                value={password}
                                editable={false}
                                onChangeText={setPassword}
                            />
                        </View>
                    )}
                </View>
                <View className="my-2"></View>
            </View>
            {credEditing && (
                <>
                    <View className="flex items-center">
                        <Button className="border rounded-xl w-11/12 h-12 bg-[#00ff57] mt-4 mb-4" onPress={handleUpdate}>
                            <Text className="text-gray-900 text-lg">Update</Text>
                        </Button>
                    </View>
                    <View style={tw`my-2`}>

                    </View></>
            )}
        </ScrollView>
        </SafeAreaView>
    );
};