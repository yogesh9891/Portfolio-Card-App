import Toast from 'react-native-toast-message';


export const toastSuccess = (heading:string, message:string) => {
    Toast.show({

        type: 'success',

        text1: heading,

        text2: message,
        autoHide:true,
        visibilityTime:4000
    });

};
export const toastError = (error:any) => {
    
    // console.log(error,
    //     JSON.stringify(error,null,2),
        
    //     'ERRER=====================================================',
    //   );
    if (error?.response?.data?.message) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.response.data.message,
            autoHide:true,
            visibilityTime:4000
        });
    } else if (error?.message && error?.message != "Invalid token specified") {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error?.message,
            autoHide:true,
            visibilityTime:4000
        });
    }
    else {
    console.log(error,"errorerrorerror")

        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
            autoHide:true,
            visibilityTime:4000
        });
    }

  
};