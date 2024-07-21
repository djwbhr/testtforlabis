import { StyleSheet, View, Alert } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MapScreen = React.forwardRef(({ props }, ref) => {
  const webViewRef = ref;
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Map</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <style>
      body { margin: 0; padding: 0; }
      #map { height: 100vh; width: 100%; }
    </style>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
      let map;

      function initMap() {
        map = L.map('map',{zoomControl:false}).setView([62.0337, 129.7235], 12); // Установка начального положения карты

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        }).addTo(map);

        // Обработка клика на карте
        map.on('click', function(e) {
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;
          const title = prompt('Введите название точки:');
          if (title) {
            addMarker(lat, lng, title); // Добавление маркера по клику
            window.ReactNativeWebView.postMessage(JSON.stringify({ lat, lng, title })); // Отправка координат и названия в React Native
          }
        });
      }

      function addMarker(lat, lng, title) {
        console.log('Adding marker:', lat, lng, title);
        const marker = L.marker([lat, lng]).addTo(map).bindPopup(title).openPopup(); // Добавление маркера на карту с названием
        
        marker.on('click', function() {
            if (confirm('Удалить точку ?')) {
            map.removeLayer(marker); // Удаление маркера с карты
            window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'REMOVE_MARKER', lat, lng })); // Отправка команды на удаление
          }
        });
      }

      // Инициализация карты при загрузке
      window.onload = initMap;

      // Функция для добавления маркеров
      window.loadMarkers = function(coordinates) {
        console.log('Loading markers:', coordinates);
        coordinates.forEach(coord => {
          addMarker(coord.lat, coord.lng, coord.title);
        });
      };

      // Функция для центрирования карты
      window.centerMapOnMarker = function(lat, lng) {
        map.setView([lat, lng], 16); // Центрируем карту на маркере
      };
    </script>
  </head>
  <body>
    <div id="map"></div>
  </body>
  </html>
`;

  const handleMessage = async (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    const { lat, lng, action, title } = data;

    if (action === "REMOVE_MARKER") {
      // Удаление маркера
      try {
        const existingCoordinates = await AsyncStorage.getItem("coordinates");
        let coordinates = existingCoordinates
          ? JSON.parse(existingCoordinates)
          : [];
        coordinates = coordinates.filter(
          (coord) => !(coord.lat === lat && coord.lng === lng)
        ); // Удаление координат
        await AsyncStorage.setItem("coordinates", JSON.stringify(coordinates)); // Сохранение обновленного массива
        Alert.alert("Маркер удален", `Широта: ${lat}, Долгота: ${lng} удален.`);
      } catch (error) {
        console.error("Ошибка при удалении координат:", error);
      }
    } else {
      // Сохранение координат локально
      try {
        const existingCoordinates = await AsyncStorage.getItem("coordinates");
        const coordinates = existingCoordinates
          ? JSON.parse(existingCoordinates)
          : [];
        coordinates.push({ lat, lng, title }); // Добавление новых координат и названия в массив
        await AsyncStorage.setItem("coordinates", JSON.stringify(coordinates));
        Alert.alert(
          "Координаты сохранены",
          `Широта: ${lat}, Долгота: ${lng}, Название: ${title}`
        );
      } catch (error) {
        console.error("Ошибка при сохранении координат:", error);
      }
    }
  };

  const loadMarkersFromStorage = async () => {
    try {
      const existingCoordinates = await AsyncStorage.getItem("coordinates");
      if (existingCoordinates) {
        const coordinates = JSON.parse(existingCoordinates);
        console.log("Markers loaded from AsyncStorage:", coordinates); // Отладочная информация
        webViewRef.current.injectJavaScript(
          `window.loadMarkers(${JSON.stringify(coordinates)});`
        );
      } else {
        console.log("No markers found in AsyncStorage"); // Отладочная информация
      }
    } catch (error) {
      console.error("Ошибка при загрузке координат:", error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        style={styles.webView}
        onMessage={handleMessage}
        onLoadEnd={loadMarkersFromStorage}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
});

export default MapScreen;
