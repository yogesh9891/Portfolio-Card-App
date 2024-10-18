//////local url
// export const url = 'http://192.168.0.21:4028';
/////live url
export const frontEndUrl = "https://thebrandcard.com";
export const url = "https://api.thebrandcard.com";


export const generateFilePath = (fileName:string) => {
    return `${url}/uploads/${fileName}`;
  }; 