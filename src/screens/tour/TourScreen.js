import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions, FlatList, Button } from "react-native";
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
            <View style={styles.tourButtonTextContainer}>
                <Text style={styles.titleButton}>{item.title}</Text>
                <TouchableOpacity onPress={() => handlePress('TourDetail', item)}>
                    <Text style={styles.textButton}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity style={ticketStyles.icon} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-circle-outline" size={40} />
                </TouchableOpacity>
                <Text style={ticketStyles.titleText}>Tour</Text>
                <TouchableOpacity style={ticketStyles.icon} onPress={() => setHelpVisible(!isHelpVisible)}>
                    <Ionicons name="information-circle-outline" size={40} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={[{ key: 'slider' }, ...data]}
                renderItem={({ item }) =>
                    item.key === 'slider' ? (
                        <SlideTour />
                    ) : (
                        renderItem({ item })
                    )
                }
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => <Text style={styles.subTitle}>Danh sách tour</Text>}
                contentContainerStyle={styles.tourListContent}
            />

            <BottomButtonBar />

            <PopUp isVisible={isHelpVisible}>
                <PopUp.Container>
                    <PopUp.Header title="Hướng dẫn" />
                    <PopUp.Body>
                        <Text style={ticketStyles.popText}>
                            Click Xem thêm hoặc ảnh tương ứng trên đầu trang để xem thông tin chi tiết các tour tham quan!
                        </Text>
                    </PopUp.Body>
                    <PopUp.Footer>
                        <Button title="Quay lại" onPress={() => setHelpVisible(!isHelpVisible)} />
                    </PopUp.Footer>
                </PopUp.Container>
            </PopUp>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        flexDirection: 'row',
        height: Dimensions.get('window').height * 0.08,
        width: '100%',
        marginTop: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    subTitle: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    tourButton: {
        flexDirection: 'row',
        backgroundColor: '#e8e8e8',
        shadowColor: 'black',
        elevation: 5,
        borderRadius: 15,
        height: Dimensions.get('window').height * 0.1,
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
    },
    tourButtonTextContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1,
    },
    titleButton: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    textButton: {
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        textAlign: 'right',
        color: '#1E90FF',
    },
    imageButton: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').height * 0.1,
        borderRadius: 10,
    },
    tourListContent: {
        paddingBottom: 100,
    },
});
