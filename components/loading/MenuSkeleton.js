import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import tw from "tailwind-react-native-classnames";

export function MenuSkeleton({ count = 4 }) {

    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.timing(progress, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            })
        );
        loop.start();
        return () => loop.stop();
    }, [progress]);


    const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-80, 80],
    });

    return (
        <>
            <View style={tw`w-48 h-6 bg-gray-300 rounded mb-5`} />
            <View style={tw`flex-row justify-start flex-wrap`}>
                {Array.from({ length: count }).map((_, index) => (
                    <View key={index} style={tw`items-center w-1/4 mb-4`}>
                        <View style={tw`w-16 h-16 bg-gray-300 rounded-lg mb-2 overflow-hidden`}>
                            <Animated.View
                                pointerEvents="none"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    bottom: 0,
                                    width: 60,
                                    transform: [{ translateX }],
                                }}
                            >
                                <LinearGradient
                                    colors={["transparent", "rgba(255,255,255,0.55)", "transparent"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{ flex: 1 }}
                                />
                            </Animated.View>
                        </View>

                        <View style={tw`w-16 h-3 bg-gray-300 rounded`} />
                    </View>
                ))}
            </View>
        </>
    );
}
