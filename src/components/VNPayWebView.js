import React from 'react';
import { View, WebView } from 'react-native';

// ...

const MyWebViewScreen = ({ route }) => {
  const { vnpayUrl } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: vnpayUrl }} />
    </View>
  );
};

export default MyWebViewScreen;