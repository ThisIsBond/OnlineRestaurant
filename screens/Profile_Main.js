import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { SafeAreaView } from "react-navigation";

const Profile_Main = ({ navigation }) => {

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 60, paddingBottom: '1%' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            top:'13%',
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                {/* Heading Name Section */}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                    <View
                        style={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            backgroundColor: '#ebebeb',
                            borderRadius: SIZES.radius

                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}> Profile </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView>
            {renderHeader()}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor:'#fb7b1a',
        padding: SIZES.padding,
        height: 180,
        width: '100%',
        borderRadius: 20
    }
})
export default Profile_Main;