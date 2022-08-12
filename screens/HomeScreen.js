import React, {useEffect, useLayoutEffect, useState} from 'react'
import { View, Text, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { UserIcon, ChevronDownIcon, SearchIcon, AdjustmentsIcon } from "react-native-heroicons/outline";
import Categories from '../components/categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from "../sanity";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() =>{
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    // useEffect is when the componet loads
    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"] {
            ...,
            restaurant[]->{
                ...,
                dishes[]->
            }
        }`).then(data =>{
            setFeaturedCategories(data)
        })
    }, [])

    // console.log(featuredCategories);

  return (
    <SafeAreaView className = "bg-white pt-5">
        {/* Header */}
        <View className = "flex-row pb-3 items-center mx-4 space-x-2 px-4">
            <Image 
                source={{
                    uri: 'https://links.papareact.com/wru' }}
                    className = 'h-7 w-7 bg-grey-300 rounded-full p-4'
                    />
            <View className = "flex-1">
                <Text className = "font-bold text-grey-400 text-xs">
                    Deliver Now!
                </Text>
                <Text className = "font-bold text-xl">Current Location
                    <ChevronDownIcon size={20} color="#00CCBB"/> </Text>
            </View>
            <UserIcon size={35} color="#00CCBB" />
        </View>

        {/* Search */}
        <View className= "flex-row items-center space-x-2 pb-2 mx-4">
            <View className = "flex-row flex-1 space-x-2 bg-gray-200 p-3">
                <SearchIcon color="grey" size={20} />
                <TextInput
                    placeholder='Resturants and Cuisines'
                    keyboardType='default'  />
            </View>
            <AdjustmentsIcon color='#00CCBB' />
        </View>

        {/* Body */}
        <ScrollView className="bg-gray-100"
                    contentContainerStyle={{paddingBottom: 100,}}   >
            {/* Categories */}
            <Categories />
            {/* Featured Rows */}
            
            {featuredCategories?.map(category =>(
                <FeaturedRow 
                key={category.id}
                id={category.id}
                title={category.name}
                description={category.short_description}
            />
            ))}

        </ScrollView>
        
    </SafeAreaView>
  );
};

export default HomeScreen;