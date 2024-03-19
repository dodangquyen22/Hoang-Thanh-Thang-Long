import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomButtonBar from "../components/NavigatorBottomBar";
import GridEvent from "../components/GridEvent";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Notification from "../components/TableEvent";
import { theme } from '../theme';

export default function EventScreen() {
    const navigation = useNavigation();
    const [showGrid, setShowGrid] = React.useState(true);
    const [iconTable, setIcon] = React.useState(false);

    const toggleView = () => {
        setShowGrid(!showGrid);
        setIcon(!iconTable)
    };

    
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Sự kiện</Text>
                
            </View>
            <Notification />
            <BottomButtonBar /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    title: {
        flexDirection: 'row',
        height: Dimensions.get('window').height * 0.08,
        marginTop: 40,
        justifyContent: 'space-between',
        textAlign: 'center'
    },
    titleText: {
        flex: 1,
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
        paddingLeft: 10,
        color: theme.text
    },
    titleIcon: {
        color: "black",
        paddingRight: 10
    },

})


