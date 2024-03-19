import { black } from "color-name";
import { StyleSheet, Dimensions } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor:'white'
    },
    text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },
    navigator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#fff',

    },
    buttonNavigator: {
      backgroundColor: '#fff',
      borderRadius: 5,
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    button: {
        flex: 1,
        height: 60,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'lightgray',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
})

/* fonts */
export const FontFamily = {
    customNavigation: "Inter-Bold",
  };
  /* font sizes */
  export const FontSize = {
    customNavigation_size: 12,
  };
  /* Colors */
  export const Color = {
    bottomNavigationBottomNavigationBackgroundColor: "#fff",
    bottomNavigationBottomNavigationBorderColor: "#e2e2e2",
    bottomNavigationBottomNavigationSelectedColor: "#000",
  };
  /* Paddings */
  export const Padding = {
    p_base: 16,
    p_5xs: 8,
    p_2xs: 11,
  };
  /* border radiuses */
  export const Border = {
    br_5xs: 8,
    br_81xl: 100,
  };

/* styles for ticket screens */
export const ticketStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        position: 'relative',
    },
    title: {
        flexDirection: 'row',
        height: Dimensions.get('window').height * 0.08,
        width: Dimensions.get('window').width * 0.98,
        marginTop: 60,
        marginLeft: 5,
        justifyContent: 'space-between',
        textAlign: 'center',
        borderColor: 'grey',
        borderWidth: 0,
        borderBottomWidth: 2,
    },
    titleText: {
        flex: 2,
        color: "black",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'center',
    },
    icon: {
        textAlign: 'center',
        marginLeft: 20,
        flex: 1,
    },
    formContainer: {
        flexDirection: 'column',
        marginTop: 30,
        height: Dimensions.get('window').height * 0.9,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
    label: {
        marginLeft: 20,
        fontWeight: "bold",
        fontSize: 15,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    calendar: {
        flex: 1,
        marginTop: 20,
    },
    inputDate: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        flex: 8,
    },
    countContainer: {
        flexDirection: 'row',
        flex: 3,
    },
    countIcon: {
        marginLeft: 8,
        marginTop: 3,
    },
    countNumber: {
        marginLeft: 8,
        fontSize: 15,
    },
    warning: {
        marginLeft: 20,
        paddingBottom: 5,
        fontSize: 15,
    },
    ticketContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 10,
    },
    subTitle: {
        flex: 5,
    },
    priceStyle: {
        marginLeft: 8,
        fontSize: 15,
        fontStyle: 'italic',
    },
    button: {
        width: 100,
        height: 50,
        textAlign: 'center',
        fontSize: 20,
        borderWidth: 2,
        borderRadius: 8,
        fontWeight: 'bold',
        paddingTop: 10,
        margin: Dimensions.get('window').width * 0.05,
        marginLeft: Dimensions.get('window').width * 0.4,
    },
    buttonContainer: {
        height: Dimensions.get('window').height * 0.18,
        marginBottom: 20,
    },
    strong: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginTop: -20,
    },
    popText: {
        margin: 10,
    },
    datePicker: {
        position: 'relative',
    }
})