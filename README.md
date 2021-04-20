
# react-native-steam-card

## Getting started

`$ npm install react-native-steam-card --save`

### Mostly automatic installation

`$ react-native link react-native-steam-card`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-steam-card` and add `RNSteamCard.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNSteamCard.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNSteamCardPackage;` to the imports at the top of the file
  - Add `new RNSteamCardPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-steam-card'
  	project(':react-native-steam-card').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-steam-card/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-steam-card')
  	```


## Usage
```javascript
import RNSteamCard from 'react-native-steam-card';

// TODO: What to do with the module?
RNSteamCard;
```
  