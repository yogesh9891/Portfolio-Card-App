module.exports = {
    project: {
      ios: {},
      android: {
        unstable_reactLegacyComponentNames: ['CameraView'],
      },
    },
    assets: ['./assets/fonts/'],
    dependencies: {
      'react-native-vector-icons': {
        platforms: {
          ios: null,
        },
      },
    },
  
  };