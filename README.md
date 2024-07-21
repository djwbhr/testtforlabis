~~# Проблема:~~
~~PUSH нотификации можно запустить только на физическом устройстве из-за ограничений expo go (expo managed workflow)
подключил андроид по qr code, все та же проблема. Не могу получить expo push token
Есть вариант забилдить проект и скачать apk на android emulator.~~
# Идея 2ой страницы(2го варианта выполнения задания) - проще в реализации и кастомизации, по мооему
Карты - react native maps provider default/google
нижняя панель - bottom sheet modal
массив marker или кастомных маркеров внутри mapview через map, региструются нажатия по onmappress или как оно называлось
адреса хранятся в async storage/context 
btn press -> btnPrsd = true -> alert("выберите место на карте") -> onmappres(()=>{handleMapPress()})
handleMapPres=()=>{
if(btnPrsd){
  push в массив маркеров координаты и туда же + prompt("Введите название")
}
}
downpicker такой же, по нажатию на элеммент(улица/точка) будет центрирование по координатам этого маркера из массива
animateToRegion(lat,long,deltla,deltlo)
Примерно так
# UPD 20.07.24 23:00**
Забилдил и залил в EAS, не коммитил обновления
взял минимальный рабочий код -> https://docs.expo.dev/push-notifications/push-notifications-setup/
и по https://docs.expo.dev/develop/development-builds/create-a-build/ забилдил apk -> https://expo.dev/accounts/djwbhr/projects/testForLabis/builds/7d11e020-bc8d-48b0-88ce-6f9825ce454a
пытался запустить, тоже не работает
# UPD 21.07.24 19:50
забилдил в eas, создал проект в firebase, добавил android app внес туда имя проекта, добавли sha-1 ключи, создал сервис аккаунт скачал в директорию проекта. вставил мини код с react-native-firebase/app, react-native-firebase/messaging.
Пытался как в документации использовать messaging, с обновлений видимо поменялось на firebase.messaging -> импортировал, забилдил. Скачал апк, установил - не запускается, просто крашит. Запустил в expo go увидел ошибку: "Error: You attempted to use a Firebase module that's not installed natively on your project by calling firebase.app() ensure you have installed the npm package '@react-native-firebase/app". Все установлено
Теперь пробую expo-notifications...
# UPD 21.07.24 21:00
Нотификации с firebase
<br/>
![image](https://github.com/user-attachments/assets/763e17c9-bf4a-4338-be6a-f508cedf4c52)
работают как на эмуляторе:
<br/>
![image](https://github.com/user-attachments/assets/0de97530-b4a3-4497-9714-1c12ceabf86d)
<br/>
так и на физ.устройстве:
<br/>
![image](https://github.com/user-attachments/assets/cdc1e0f0-4ffe-47e4-9a56-6395b6b3f10f)
# Маркеры и карта через WebView
![image](https://github.com/user-attachments/assets/c9ee87cb-312c-4e34-a608-43cd3a4a3062)
## Центрирование по названию
![image](https://github.com/user-attachments/assets/492bf652-e460-41b6-a113-cc0eb67f40dc)
## Удаление/добавление маркера
### Удаление
![image](https://github.com/user-attachments/assets/182fc17f-cda9-48eb-8bbe-e7aaad325d2c)
<br/>
![image](https://github.com/user-attachments/assets/83e9d739-8add-4396-8fe5-2acfabc72b59)
### Добавление по клику на карту
![image](https://github.com/user-attachments/assets/c2a445ec-e47a-49d1-be12-a887fa261080)
<br/>
![image](https://github.com/user-attachments/assets/4c201acc-2319-4167-a2b3-eb447e6582c0)
<br/>
build: https://expo.dev/accounts/djwbhr/projects/testForLabis/builds/c3784e16-cd10-43cf-9ae2-8009f3dba84a


