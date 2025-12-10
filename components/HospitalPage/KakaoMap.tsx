import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function KakaoMap() {
  const apiKey = process.env.EXPO_PUBLIC_KAKAO_API_KEY;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <style>
          html, body { margin: 0; padding: 0; height: 100%; }
          #map { width: 100%; height: 100%; }
        </style>
    </head>
    <body>
        <div id="map"></div>

        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false"></script>
        <script>
          kakao.maps.load(function() {
              var container = document.getElementById('map');
              var options = {
                  center: new kakao.maps.LatLng(33.450701, 126.570667),
                  level: 3
              };
              new kakao.maps.Map(container, options);
          });
        </script>

    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.webViewContainer}>
        <WebView
          originWhitelist={["*"]}
          source={{ html }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 25,
    paddingBottom: 15,
  },
  webViewContainer: {
    width: "100%",
    height: 200,
  },
});
