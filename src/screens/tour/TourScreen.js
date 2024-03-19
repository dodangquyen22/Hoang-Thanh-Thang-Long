import React from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert, SafeAreaView, TextInput, Image, Dimensions, ScrollView, FlatList} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

import BottomButtonBar from "../../components/NavigatorBottomBar";
import SlideTour from "../../components/SlideTour.js";
import { PopUp } from "../../components/PopUp";
import { ticketStyles } from "../../styles/globalStyles";
import { tourData } from '../../constants';

export default function TourScreen() {
    const [isHelpVisible, setHelpVisible] = React.useState(false);
    const navigation = useNavigation();
    const handlePress = (buttonName, item) => {
        navigation.navigate(buttonName, { item });
    };

    const data = tourData;

    const renderItem = ({ item }) => (
        <View style={styles.tourButton}>
            <Image
                style={styles.imageButton}
                source={item.image}
            />
            <View>
                <Text style={styles.titleButton}>{item.title}</Text>
                <TouchableOpacity onPress={() => handlePress('TourDetail', item)}>
                    <Text style={styles.textButton}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity style={ticketStyles.icon} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-circle-outline" size={40}>
                    </Ionicons>
                </TouchableOpacity>
                <Text style={ticketStyles.titleText}>Tour</Text>
                <TouchableOpacity style={ticketStyles.icon} onPress={() => setHelpVisible(!isHelpVisible)}>
                    <Ionicons style={ticketStyles.icon} name="information-circle-outline" size={40}>
                    </Ionicons>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style ={{height: 300}}>
                <SlideTour />
            </ScrollView>
                <Text style={styles.subTitle}>Danh sách tour</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.tourList}
                />
                    <BottomButtonBar />

            <PopUp isVisible={isHelpVisible}>
                <PopUp.Container>
                    <PopUp.Header title="Hướng dẫn" />
                    <PopUp.Body>
                        <Text style={ticketStyles.popText}>Click Xem thêm hoặc ảnh tương ứng trên đầu trang để xem thông tin chi tiết các tour tham quan!</Text>
                    </PopUp.Body>
                    <PopUp.Footer>
                        <Button title="Quay lại" onPress={() => setHelpVisible(!isHelpVisible)} />
                    </PopUp.Footer>
                </PopUp.Container>
            </PopUp>            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    title: {
        flexDirection: 'row',
        height: Dimensions.get('window').height * 0.08,
        width: Dimensions.get('window').width * 0.98,
        marginTop: 60,
        marginLeft: 5,
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: 'center',
//        color: '#a16b56',
        marginTop: '5%',
    },
    tourContainer: {
        justifyContent: 'flex-start',
        margin: '5%',
    },
    tourButton: {
        flexDirection: 'row',
        backgroundColor: 'rgb(232,232,232)',
        shadowColor: 'black',
        elevation: 5,
        borderRadius: 15,
        height: Dimensions.get('window').height * 0.08,
        marginBottom: '10%',
    },
    titleButton: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: '2%',
        marginTop: '4%',
        marginBottom: '4%',
        width: Dimensions.get('window').width * 0.65,
//        flexWrap: 'wrap',
    },
    textButton: {
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        textAlign: 'right',
    },
    imageButton: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').height * 0.07,
        borderRadius: 15,
        margin: '1%',
    },
    tourList: {
        width: Dimensions.get('window').width * 0.9,
        margin:'5%',
    },
});