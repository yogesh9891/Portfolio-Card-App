import * as React from "react";
import {useRef, useState, useCallback, useMemo} from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import {
  CameraRuntimeError,
  PhotoFile,
  useCameraDevice,
  useCameraFormat,
  useFrameProcessor,
  VideoFile,
  TakePhotoOptions,
  Camera,
} from "react-native-vision-camera";
import {useEffect} from "react";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useIsFocused} from "@react-navigation/core";
import {getContactFromImageApi} from "../services/index.service";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import AddConnection from "./AddConnection";
import {useNavigation} from "@react-navigation/native";
// import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar'

const SCALE_FULL_ZOOM = 3;
const BUTTON_SIZE = 40;

export type Routes = {
  PermissionsPage: undefined;
  CameraPage: undefined;
  MediaPage: {
    path: string;
    type: "video" | "photo";
  };
  Devices: undefined;
};
type Props = NativeStackScreenProps<Routes, "CameraPage">;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Platform.select<number>({
  android: Dimensions.get("screen").height,
  ios: Dimensions.get("window").height,
}) as number;
function CameraCard(): React.ReactElement {
  const camera = useRef<Camera>(null);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const navigation = useNavigation();
const [loading, setLoading] = useState(false);
  // check if camera page is active
  const isFocussed = useIsFocused();
  const isActive = isFocussed;

  const [cameraPosition, setCameraPosition] = useState<"front" | "back">(
    "back",
  );
  const [enableHdr, setEnableHdr] = useState(false);
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [enableNightMode, setEnableNightMode] = useState(false);

  // camera device settings
  let device = useCameraDevice(cameraPosition);

  const [targetFps, setTargetFps] = useState(60);

  const screenAspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  const format = useCameraFormat(device, [
    {fps: targetFps},
    {videoAspectRatio: screenAspectRatio},
    {videoResolution: "max"},
    {photoAspectRatio: screenAspectRatio},
    {photoResolution: "max"},
  ]);

  const fps = Math.min(format?.maxFps ?? 1, targetFps);

  // Camera callbacks
  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);
  const onInitialized = useCallback(() => {
    if (isFocussed) {
      console.log("Camera initialized!");
      setIsCameraInitialized(true);
    }
  }, [isFocussed]);

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    getPermission();
  }, []);

  const handleAddBUssinesCard = async (base: string) => {
    try {

      setLoading(true)
      let obj = {
        image: base,
      };
      let {data: res} = await getContactFromImageApi(obj);

      if (res.data) {
        console.log({cardData: res.data}, "{cardData:res.data}");
        navigation.navigate("AddConnection", {cardData: res.data});
      }
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  };

  //#endregion

  //#region Pinch to Zoom Gesture
  // The gesture handler maps the linear pinch gesture (0 - 1) to an exponential curve since a camera's zoom
  // function does not appear linear to the user. (aka zoom 0.1 -> 0.2 does not look equal in difference as 0.8 -> 0.9)

  //#endregion

  useEffect(() => {
    const f =
      format != null
        ? `(${format.photoWidth}x${format.photoHeight} photo / ${format.videoWidth}x${format.videoHeight}@${format.maxFps} video @ ${fps}fps)`
        : undefined;
    console.log(`Camera: ${device?.name} | Format: ${f}`);
  }, [device?.name, format, fps]);

  const frameProcessor = useFrameProcessor(frame => {
    "worklet";

    console.log(
      `${frame.timestamp}: ${frame.width}x${frame.height} ${frame.pixelFormat} Frame (${frame.orientation})`,
    );
  }, []);

  const takePhoto = async () => {
    if (!camera.current) return console.log("No camera");
    const photo = await camera.current?.takePhoto();
    fetchImage(`file://${photo.path}`);
  };

  const fetchImage = async (uri: string) => {
    const imageResponse = await fetch(uri);
    const imageBlob = await imageResponse.blob();
    const base64Data = await blobToBase64(imageBlob);

    await handleAddBUssinesCard(base64Data);
  };

  const blobToBase64 = (blob: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(String(reader.result));
      };
      reader.readAsDataURL(blob);
    });
  };

 

  return (

    
      loading ? ( <View
        style={[
          styles.container,
          {
            backgroundColor: "#1A1824",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}>
        <Text style={{color: "#fff"}}>Please Wait...</Text>
      </View>) : (
        <View style={[styles.container, {backgroundColor: "white"}]}>
        {device != null && (
          <Camera
            ref={camera}
            style={{height: hp(55), marginTop: hp(18)}}
            device={device}
            format={format}
            fps={fps}
            hdr={enableHdr}
            lowLightBoost={device.supportsLowLightBoost && enableNightMode}
            isActive={isActive}
            onInitialized={onInitialized}
            onError={onError}
            enableZoomGesture={false}
            enableFpsGraph={true}
            orientation="portrait"
            photo={true}
            video={true}
          />
        )}
  
  
  
        <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
          <View style={styles.button}>
            <View style={styles.button1}>
              <View style={styles.button2}></View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      )
    
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  captureButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: 10,
  },
  button: {
    marginBottom: 10,
    width: wp(20),
    height: wp(20),
    borderRadius: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  button1: {
    width: wp(18),
    height: wp(18),
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    // marginBottom: 10,
    width: wp(15),
    height: wp(15),
    borderRadius: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  rightButtonRow: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  text: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default CameraCard;
