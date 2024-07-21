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
![image](https://github.com/user-attachments/assets/cc365284-1985-4f11-b1e6-2e690b42029d)
работают как на эмуляторе:
<br/>
![image](https://github.com/user-attachments/assets/e166c3f7-1ac2-4286-a180-5d2d4893854d)
<br/>
так и на физ.устройстве:
<br/>
![image](https://github.com/user-attachments/assets/5aa1e990-599f-4e0d-8a98-783a600880d8)
# Маркеры и карта через WebView
![image](https://github.com/user-attachments/assets/e429105f-5888-4f21-b4a5-22c1808c65b8)
<br/>
## Центрирование по названию
![image](https://github.com/user-attachments/assets/5c42000b-9933-4be5-a015-f3c24295f9ff)
## Удаление/добавление маркера
### Удаление
![image](https://github.com/user-attachments/assets/3dd5e65d-cbfd-41b4-87b3-c2afdf238b24)
<br/>
![image](https://github.com/user-attachments/assets/0e08fd23-32ea-4864-b6c7-7d27d2e9bbfa)
<br/>
![image](https://github.com/user-attachments/assets/51952564-c262-4ef1-aa82-aeec65917ea9)
### Добавление по клику на карту
![image](https://github.com/user-attachments/assets/3895d049-f6a9-4e31-9fdb-3510781e62df)
<br/>
![image](https://github.com/user-attachments/assets/a066cfde-fc27-4779-9e25-837fa64f36e6)
<br/>


