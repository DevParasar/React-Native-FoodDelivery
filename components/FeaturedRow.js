import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from "../sanity";

const FeaturedRow = ({id, title, description}) => {
    const [restaurants,setRestaurents] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured" && _id == $id] {
            ...,
            restaurant[]->{
                ...,
                dishes[]->,
                type->{
                    name
                }
            },
        }[0]
        `, {id}).then(data=>{
            setRestaurents(data?.restaurants);
        })
    }, [id]);

    // console.log(restaurants);

  return (
    <View>
        <View className= "mt-4 flex-row items-center justify-between px-4">
            <Text className="font-bold text-lg">{title}</Text>
            <ArrowRightIcon color="#00CCBB" />
        </View>
        <Text className="text-xs text-gray-500 px-4">{description}</Text>
        <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal:15,}}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
        >
        
        {restaurants?.map((restaurant) => (
            <RestaurantCard 
            key={restaurant.id}
            id={restaurant.id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={4.3}
            genre="Japanese"
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}     />
        ))}
        
        
        {/* <RestaurantCard 
            id={123}
            imgUrl="https:/links.papareact.com/gn7"
            title="Sushi"
            rating={4.3}
            genre="Japanese"
            address="123 street"
            short_description="Test description"
            dishes={[]}
            long={20}
            lat={0}     /> */}
    
        </ScrollView>
    </View>
  )
}

export default FeaturedRow