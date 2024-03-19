import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";
import BottomButtonBar from "../components/NavigatorBottomBar";
import Settings from "../components/SettingComponent";

export default function SettingScreen () {
    const navigation = useNavigation();
    return (
        <View style={globalStyles.container}>
            <View style={styles.content}>
                
                <Settings />
            </View>
            <BottomButtonBar />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }, content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})