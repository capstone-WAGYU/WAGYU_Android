import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

interface KakaoMapProps {
  address: string;
  hospitalName: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

export default function KakaoMap({ address, hospitalName }: KakaoMapProps) {
  const apiKey = process.env.EXPO_PUBLIC_KAKAO_API_KEY;
  const restApiKey = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;

  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://dapi.kakao.com/v2/local/search/address.json",
          {
            headers: {
              Authorization: `KakaoAK ${restApiKey}`,
            },
            params: {
              query: address,
            },
          }
        );

        if (res.data.documents.length > 0) {
          const doc = res.data.documents[0];
          setCoords({
            lat: parseFloat(doc.y),
            lng: parseFloat(doc.x),
          });
          setError(null);
        } else {
          setError("위치를 찾을 수 없습니다");
        }
      } catch (err) {
        console.error(err);
        setError("위치 검색 중 오류가 발생했습니다");
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [address]);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body { margin:0; padding:0; height:100%; }
          #map { width:100%; height:100%; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false"></script>
        <script>
          kakao.maps.load(function() {
              var container = document.getElementById('map');
              var options = {
                  center: new kakao.maps.LatLng(${coords?.lat || 37.5665}, ${coords?.lng || 126.978}),
                  level: 3
              };
              var map = new kakao.maps.Map(container, options);

              ${
                coords
                  ? `
              var markerPosition  = new kakao.maps.LatLng(${coords.lat}, ${coords.lng}); 
              var marker = new kakao.maps.Marker({ position: markerPosition }); 
              marker.setMap(map);

              var infowindow = new kakao.maps.InfoWindow({
                  content: '<div style="padding:5px;">${hospitalName}</div>'
              });
              infowindow.open(map, marker);
              `
                  : ""
              }
          });
        </script>
    </body>
    </html>
  `;

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        key={coords ? `${coords.lat}-${coords.lng}` : "default"}
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    marginBottom: 15,
  },
  loader: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
