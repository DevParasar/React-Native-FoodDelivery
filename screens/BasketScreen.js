import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useMemo, useState }from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../features/restaurantSlice';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { XCircleIcon } from "react-native-heroicons/solid"
import { objectTraps } from 'immer/dist/internal';
import { urlFor } from "../sanity";
import { Currency } from "react-currency-formatter"

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  // this way there is no prop drilling, we can pull from the global store^^
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  //it will list items in groups not individually^^
  const basketTotal = useSelector (selectBasketTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce(() => {
      (results[items.id] = results[items.id] || []).push(items);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems)
  }, [items])
  //^^ loop items in the array and if the key exists add items at the end of the arrray

  console.log(groupedItemsInBasket);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB bg-white shadow-xs">
          <View>
          <Text className="text-lg font-bold text-center">Basket</Text>
          <Text className="text-center text-gray-400">
            {restaurant.title}
          </Text>
          </View>
            <TouchableOpacity
              className="rounded-full bg-gray-100 absolute top-3 right-5"
              onPress={navigation.goBack}>
              <XCircleIcon color= "#00CCBB" height ={50} width={50} />
            </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image source ={{
              uri:"https://links.papareact.com/wru",
          }} 
          className="h-7 bg-gray-300 p-4 rounded-full"  />
          <Text className ="felx-1"> Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {objectTraps.entries(groupedItemsInBasket).map(([key,items])=>(
            <View key={key}
                  className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
                />
              <Text className="flex-1">{items[0]?.name}</Text>
              {/* item [0] because it will give the first item on the list and we multiply it by the number of time it has been added */}

              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="INR" />
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({id:key}))}  >
                  Remove
                </Text>
              </TouchableOpacity>
            </View> 
          ))}
        </ScrollView>
        
        <View className="p-5 bg-white mt-5 space-y-5">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
               <Currency quantity={basketTotal} currency="INR" />
            </Text>
          </View>
        </View>

        <View className="p-5 bg-white mt-5 space-y-5">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
               <Currency quantity={30} currency="INR" />
            </Text>
          </View>
        </View>

        <View className="p-5 bg-white mt-5 space-y-5">
          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="text-extrabold">
               <Currency quantity={basketTotal + 30} currency="INR" />
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate("PreparingOrderScreen")}
          className="rounded-lg bg-[#00CCBB] p-4">
          <Text 
            className="text-center text-white text-lg font-bold">
              Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen