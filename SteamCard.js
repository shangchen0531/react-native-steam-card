import React, {Component} from 'react';
import { 
    Image,
    Easing,
    Platform,
    Animated, 
    Dimensions,
    StyleSheet, 
    PanResponder, 
    ImageBackground,
}
from 'react-native';
const {height: wheight, width: wwidth} = Dimensions.get('window');
// const wheight = Dimensions.get('window').height;
// const wwidth = Dimensions.get('window').width;

class SteamCard extends Component {
    constructor(props) {
        super(props);
        console.log("开始加载SteamCard");
        console.log("当前ratio = " + props.ratio);
        
        console.log("屏幕宽度：" + wwidth);
        console.log("屏幕高度：" + wheight);
        let ratio = props.ratio ? props.ratio : 0.8;
        // console.log(img);
        let iuri, iheight, iwidth;
        // let img = {};
        
        if (props.style === undefined ||
            props.style.height === undefined || 
            props.style.width === undefined) {
            if (Platform.OS === "web") {
                iuri = props.source;
                Image.getSize(props.source, (width, height) => {
                    iheight = height;
                    iwidth = width;
                }, (error) => {
                    console.log(error);
                });
            } else {
                // img = Image.resolveAssetSource(props.source);
                console.log("调用了resolveA");
                ({uri: iuri, height: iheight, width: iwidth} = 
                Image.resolveAssetSource(props.source));
            }
            console.log({iuri, iheight, iwidth});
            // iheight *= ratio;
            // iwidth *= ratio;
            console.log("使用了ratio进行了缩放");
        } else {
            iheight = props.style.height;
            iwidth = props.style.width;
            console.log("使用了传入的宽高度");
        }

        // 根据屏幕宽高度进行对图片进行缩放
        // 屏幕高度默认大于宽度

        let width_ratio = wwidth / iwidth; // 屏幕宽度与图片宽度的比例
        let height_ratio = wheight / iheight; // 屏幕高度与图片高度的比例

        // 要缩放到最大的纬度都能在屏幕内
        let mara = Math.min(width_ratio, height_ratio);
        if (Math.max(width_ratio, height_ratio) < 1) {
            // 屏幕比图片小，直接缩小图片到屏幕内
            iwidth *= mara * ratio;
            iheight *= mara * ratio;
        }
        else if (Math.min(width_ratio, height_ratio) > 1) {
            // 屏幕比图片大, 缩小ratio值
            iwidth *= ratio;
            iheight *= ratio;
        }
        
        this.state = {
            imgSrc: props.source,
            height: iheight,
            width: iwidth,
        }

        console.log("当前ratio: " + ratio + " 高度：" + iheight + 
        " 宽度：" + iwidth);
        console.log("\n====\n")

        this.preRender = this.preRender.bind(this);
    }

    preRender() {

        this.scaleValue = new Animated.Value(1);

        this.x_input_range = [0, Math.floor(this.state.width / 2), 
                                 Math.floor(this.state.width)];
        this.y_input_range = [0, Math.floor(this.state.height / 2), 
                                 Math.floor(this.state.height)];

        this._offsetX = new Animated.Value(this.x_input_range[1]);
        this._offsetY = new Animated.Value(this.y_input_range[1]);
        this._last_x = -1;
        this._last_y = -1;

        this._rotateX = this._offsetY.interpolate({
            inputRange: this.y_input_range,
            outputRange: ['25deg', '0deg', '-25deg'],
            extrapolate: 'identity',
        });
        this._rotateY = this._offsetX.interpolate({
            inputRange: this.x_input_range,
            outputRange: ['-25deg', '0deg', '25deg'],
            extrapolate: 'identity',
        });
        this._bgColor = this._offsetY.interpolate({
            inputRange: this.y_input_range,
            outputRange: [
                'hsla(0, 0%, 100%, .15)', 
                'hsla(0, 0%, 0%, 0)', 
                'hsla(0, 0%, 0%, .3)'],
            extrapolate: 'clamp',
        });

        this.easeOut = Easing.bezier(0.61, 1, 0.88, 1);
        this.release_duration = 600;

        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                Animated.timing(this.scaleValue, {
                    toValue: 1.3,
                    duration: 250,
                    easing: this.easeOut,
                    useNativeDriver: false,
                }).start();
            },
            onPanResponderMove: (evt, gestureState) => {
                let na = evt.nativeEvent;
                if (this._last_x == -1 ||
                    Math.abs(na.locationY - this._last_y) <= 90) {
                        Animated.parallel([
                            Animated.timing(this._offsetX, {
                                toValue: na.locationX,
                                duration: 100,
                                easing: this.easeOut,
                                useNativeDriver: false,
                            }),
                            Animated.timing(this._offsetY, {
                                toValue: na.locationY,
                                duration: 100,
                                easing: this.easeOut,
                                useNativeDriver: false,
                            }),
                        ]).start();
                    this._last_x = na.locationX;
                    this._last_y = na.locationY;
                }
            },
            onPanResponderRelease: () => {
                Animated.parallel([
                    Animated.timing(this.scaleValue, {
                        toValue: 1,
                        duration: this.release_duration,
                        easing: this.easeOut,
                        useNativeDriver: false,
                    }),
                    Animated.timing(this._offsetX, {
                        toValue: this.x_input_range[1],
                        duration: this.release_duration,
                        easing: this.easeOut,
                        useNativeDriver: false,
                    }),
                    Animated.timing(this._offsetY, {
                        toValue: this.y_input_range[1],
                        duration: this.release_duration,
                        easing: this.easeOut,
                        useNativeDriver: false,
                    }),
                ]).start();
                this._last_x = -1;
            }
        });
    }

    render() {
        this.preRender();
        return (
            <Animated.View
                style={{
                    transform: [{scale: this.scaleValue}, 
                                {rotateX: this._rotateX},
                                {rotateY: this._rotateY}]
                }}
                {...this.panResponder.panHandlers}
            >
                <ImageBackground 
                    style={{
                        height: this.state.height, 
                        width: this.state.width,
                    }}
                    imageStyle={styles.image_in_box}
                    source={this.state.imgSrc}>
                    <Animated.View
                        style={{ 
                            height: this.state.height, 
                            width: this.state.width, 
                            backgroundColor: this._bgColor,
                            borderRadius: 
                            styles.image_in_box.borderRadius * 1.6,
                        }}
                    />
                </ImageBackground>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    image_in_box: {
        borderRadius: 5,
    }
});

export default SteamCard;