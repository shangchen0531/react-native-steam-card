
# react-native-steam-card

## Demo in android
![image](https://github.com/shangchen0531/poet-liyu/blob/master/image/steam2.gif)

## Getting started

`$ npm install react-native-steam-card --save`

or

`$ yarn add react-native-steam-card`

### Mostly automatic installation

`$ react-native link react-native-steam-card`

## Usage
```javascript
import React from 'react';
import type {Node} from 'react';
import { StyleSheet, View } from 'react-native';
import SteamCard from 'react-native-steam-card';

// TODO: What to do with the module?
const App: () => Node = () => {

  return (
    <View style={styles.container}>
      <SteamCard 
        source={require("./asset/island.png")}
        ratio={0.65}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'rgba(23,41,48,1)',
  },
});

export default App;
```

## Configurable props
|  Property  | Type  | Default | Description |
|  ----  |  ----  |  ----  |  ----  |
|  source  | ImageSource  | `Must`  | Source of image. |
|  ratio   | Number | 0.8 | The scale value of image inside the view when hovering. |
| style | View.style | - | Style of image. |