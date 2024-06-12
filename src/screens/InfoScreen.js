import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import BottomButtonBar from "../components/NavigatorBottomBar";
import { ScrollView, FlatList } from "react-native";
import SlideImage from "../components/SlideImage";
import { Padding } from "../styles/globalStyles";
import { FontAwesome } from "@expo/vector-icons";
import * as Speech from "expo-speech";

export default function InfoScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const imageHeight = screenWidth * 0.75;

  const text =
    "Hoàng thành Thăng Long (chữ Hán: 昇龍皇城; Hán-Việt: Thăng Long Hoàng thành) là quần thể di tích gắn với lịch sử kinh thành Thăng Long - Đông Kinh và tỉnh thành Hà Nội bắt đầu từ thời kì tiền Thăng Long (An Nam đô hộ phủ thế kỷ VII) qua thời Đinh - Tiền Lê, phát triển mạnh dưới thời Lý, Trần, Lê và thành Hà Nội dưới triều Nguyễn. Đây là công trình kiến trúc đồ sộ, được các triều vua xây dựng trong nhiều giai đoạn lịch sử và trở thành một trong những di tích quan trọng bậc nhất trong hệ thống các di tích Việt Nam. Giai đoạn Tiền Thăng Long Thời kỳ Nhà Đường, An Nam được chia thành 12 châu với 50 huyện, Tống Bình là trung tâm của An Nam đô hộ phủ, lần đầu tiên vùng đất sau này là kinh thành Thăng Long nắm giữ vai trò một trung tâm quyền lực chính trị. Năm 866, viên tướng nhà Đường là Cao Biền xây dựng một thành trì mới, Tống Bình được đổi tên thành Đại La – thủ phủ của Tĩnh Hải quân. Theo truyền thuyết, khi đắp thành, Cao Biền thấy một vị thần hiện lên tự xưng là thần Long Đỗ. Vì vậy, sử sách còn gọi Thăng Long là đất Long Đỗ. Cuối thế kỷ IX, chính quyền trung ương nhà Đường suy yếu nghiêm trọng. Đầu thế kỷ X, các thế lực cát cứ nổi lên đánh giết lẫn nhau, tạo ra thế loạn chia cắt Ngũ Đại Thập Quốc. Khúc Thừa Dụ, khi đó là Hào trưởng Chu Diên, được dân chúng ủng hộ, đã tiến ra chiếm đóng phủ thành Đại La, tự xưng là Tiết độ sứ. Sau khi đã nắm được quyền lực thực tế trên đất Tĩnh Hải quân, ông đã cho xây dựng chính quyền dựa trên danh xưng của chính quyền đô hộ nhà Đường, nhưng thực chất là một chính quyền độc lập và do người Việt quản lý. Năm 931, Dương Đình Nghệ đem quân từ Ái Châu ra Đại La đánh đuổi thứ sử Lý Tiến của nước Nam Hán. Lý Tiến bỏ chạy, Dương Đình Nghệ giải phóng thành Đại La giành quyền tự chủ cho đất nước Việt được 6 năm thì bị Kiều Công Tiễn giết hại. Năm 938, Ngô Quyền hạ thành Đại La, tiêu diệt Kiều Công Tiễn. Sau đó, ông chỉ huy trận Bạch Đằng, đánh bại quân Nam Hán, giết chết Hoằng Tháo. Mùa xuân năm 939, ông xưng là Ngô Vương, không đóng đô ở Đại La mà về Cổ Loa. Sau khi Đinh Tiên Hoàng dẹp loạn 12 sứ quân, các Triều đại Đinh, Tiền Lê đóng đô ở Hoa Lư. Đại La lúc này do Đô hộ phủ sĩ sư Lưu Cơ cai quản và tu sửa Hoàng thành quay về hướng nam (hướng về kinh đô Hoa Lư thay vì hướng về phương bắc như chính quyền đô hộ đã làm) vì thế mà vị quan này được coi là người " +
    "giao chìa khóa " +
    "thành Đại La cho Lý Thái Tổ.";
  
  const subText_1 = "Hoàng thành Thăng Long (chữ Hán: 昇龍皇城; Hán-Việt: Thăng Long Hoàng thành) là quần thể di tích gắn với lịch sử kinh thành Thăng Long - Đông Kinh và tỉnh thành Hà Nội bắt đầu từ thời kì tiền Thăng Long (An Nam đô hộ phủ thế kỷ VII) qua thời Đinh - Tiền Lê, phát triển mạnh dưới thời Lý, Trần, Lê và thành Hà Nội dưới triều Nguyễn."
  const subText_2 = "Đây là công trình kiến trúc đồ sộ, được các triều vua xây dựng trong nhiều giai đoạn lịch sử và trở thành một trong những di tích quan trọng bậc nhất trong hệ thống các di tích Việt Nam. Giai đoạn Tiền Thăng Long Thời kỳ Nhà Đường, An Nam được chia thành 12 châu với 50 huyện, Tống Bình là trung tâm của An Nam đô hộ phủ, lần đầu tiên vùng đất sau này là kinh thành Thăng Long nắm giữ vai trò một trung tâm quyền lực chính trị."
  const subText_3 = "Năm 866, viên tướng nhà Đường là Cao Biền xây dựng một thành trì mới, Tống Bình được đổi tên thành Đại La – thủ phủ của Tĩnh Hải quân. Theo truyền thuyết, khi đắp thành, Cao Biền thấy một vị thần hiện lên tự xưng là thần Long Đỗ. Vì vậy, sử sách còn gọi Thăng Long là đất Long Đỗ. Cuối thế kỷ IX, chính quyền trung ương nhà Đường suy yếu nghiêm trọng. Đầu thế kỷ X, các thế lực cát cứ nổi lên đánh giết lẫn nhau, tạo ra thế loạn chia cắt Ngũ Đại Thập Quốc."
  const subText_4 = "Khúc Thừa Dụ, khi đó là Hào trưởng Chu Diên, được dân chúng ủng hộ, đã tiến ra chiếm đóng phủ thành Đại La, tự xưng là Tiết độ sứ. Sau khi đã nắm được quyền lực thực tế trên đất Tĩnh Hải quân, ông đã cho xây dựng chính quyền dựa trên danh xưng của chính quyền đô hộ nhà Đường, nhưng thực chất là một chính quyền độc lập và do người Việt quản lý. Năm 931, Dương Đình Nghệ đem quân từ Ái Châu ra Đại La đánh đuổi thứ sử Lý Tiến của nước Nam Hán."
  const subText_5 = "Lý Tiến bỏ chạy, Dương Đình Nghệ giải phóng thành Đại La giành quyền tự chủ cho đất nước Việt được 6 năm thì bị Kiều Công Tiễn giết hại. Năm 938, Ngô Quyền hạ thành Đại La, tiêu diệt Kiều Công Tiễn. Sau đó, ông chỉ huy trận Bạch Đằng, đánh bại quân Nam Hán, giết chết Hoằng Tháo. Mùa xuân năm 939, ông xưng là Ngô Vương, không đóng đô ở Đại La mà về Cổ Loa. Sau khi Đinh Tiên Hoàng dẹp loạn 12 sứ quân, các Triều đại Đinh, Tiền Lê đóng đô ở Hoa Lư. Đại La lúc này do Đô hộ phủ sĩ sư Lưu Cơ cai quản và tu sửa Hoàng thành quay về hướng nam (hướng về kinh đô Hoa Lư thay vì hướng về phương bắc như chính quyền đô hộ đã làm) vì thế mà vị quan này được coi là người giao chìa khóa thành Đại La cho Lý Thái Tổ."
  const [descriptionText, setDescriptionText] = React.useState("");
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  React.useEffect(() => {
    setDescriptionText(text);
  }, []);

  const speakText = () => {
    setIsSpeaking(true);
    Speech.speak(descriptionText, {
      pitch: 1,
      rate: 1,
      volume: 1,
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const stopText = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      stopText();
    } else {
      speakText();
    }
    setIsSpeaking(!isSpeaking);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.boxContent}>
        <SlideImage />
        {/* <Image
                    source={require('../../assets/images/hiking.png')}
                    style={styles.image}
                /> */}

        <ScrollView style={styles.descriptionContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.title}>Tổng quan Hoàng Thành</Text>
            <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={toggleSpeaking}>
            <FontAwesome name={isSpeaking ? "volume-down" : "volume-up"} size={24} color="black" />
          </TouchableOpacity>
            </View>
          </View>

          

          <Text
            numberOfLines={2000}
            style={{
              flex: 1,
              paddingBottom: 20,
              fontSize: 18,
              textAlign: "justify",
            }}
          >
            {subText_1}
          </Text>
          <Image source = {{uri:'https://firebasestorage.googleapis.com/v0/b/server-backend-ac3df.appspot.com/o/HoangThanh_Materials%2FAnh-Hoang-Thanh-Than-11.jpg?alt=media&token=97676806-03fc-4ff5-80d3-9b41d8152156'}}
                  style = {{ width: 'auto',
                    height: 217.5,
                    borderRadius: 16, marginBottom: 10, top: 0}}/>
          <Text
            numberOfLines={2000}
            style={{
              flex: 1,
              paddingBottom: 20,
              fontSize: 18,
              textAlign: "justify",
            }}
          >
            {subText_2}
          </Text>
          <Image source = {{uri:'https://firebasestorage.googleapis.com/v0/b/server-backend-ac3df.appspot.com/o/HoangThanh_Materials%2Fnguon-goc-lich-su-cua-hoang-thanh-thang-long-3.jpg?alt=media&token=5a216a57-da23-489d-8325-37b49f4d1751'}}
                  style = {{ width: 'auto',
                    height: 217.5,
                    borderRadius: 16, marginBottom: 10, top: 0}}/>
          <Text
            numberOfLines={2000}
            style={{
              flex: 1,
              paddingBottom: 20,
              fontSize: 18,
              textAlign: "justify",
            }}
          >
            {subText_3}
          </Text>
          <Image source = {{uri:'https://firebasestorage.googleapis.com/v0/b/server-backend-ac3df.appspot.com/o/HoangThanh_Materials%2Fhoang-thanh-thang-long-2634.jpg?alt=media&token=1a605611-f3bd-48b5-853b-68077cf91e0a'}}
                  style = {{ width: 'auto',
                    height: 217.5,
                    borderRadius: 16, marginBottom: 10, top: 0}}/>
          <Text
            numberOfLines={2000}
            style={{
              flex: 1,
              paddingBottom: 20,
              fontSize: 18,
              textAlign: "justify",
            }}
          >
            {subText_4}
          </Text>
          <Image source = {{uri:'https://firebasestorage.googleapis.com/v0/b/server-backend-ac3df.appspot.com/o/HoangThanh_Materials%2F23A07034-02.jpg?alt=media&token=1537a7b6-6359-41cd-a6d9-69f710956a01'}}
                  style = {{ width: 'auto',
                    height: 217.5,
                    borderRadius: 16, marginBottom: 10, top: 0}}/>
          <Text
            numberOfLines={2000}
            style={{
              flex: 1,
              paddingBottom: 70,
              fontSize: 18,
              textAlign: "justify",
            }}
          >
            {subText_5}
          </Text>
        </ScrollView>
      </ScrollView>

      <BottomButtonBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  boxContent: {
    // position: 'absolute',
    top: 20,
  },
  image: {
    width: Dimensions.get("window").width * 0.98,
    height: Dimensions.get("window").height * 0.5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 20,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "justify",
    width: "50px",
    textAlign: "center",
    marginBottom: 100,
  },
  buttonRow: {
    flexDirection: 'row', 
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: '#DDDDDD', // Adjust background color as needed
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5,
  },
});
