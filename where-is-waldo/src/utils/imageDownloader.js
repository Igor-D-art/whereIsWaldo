import {
    getStorage,
    ref,
    getDownloadURL,
  } from 'firebase/storage';

async function downloadImage(imageUrl) {
   try {
      // Create a reference with an initial file path and name
      const storage = getStorage();

      // Create a reference from a Google Cloud Storage URI
      const gsReference = ref(storage, imageUrl);

      const url = await getDownloadURL(ref(storage, gsReference)).then((result)=>{return result})
      console.log(url)

      return url;
        
        
      //   (url) => {
      //   // `url` is the download URL for 'images/stars.jpg'

      //   // This can be downloaded directly:
      //   // const xhr = new XMLHttpRequest();
      //   // xhr.responseType = 'blob';
      //   // xhr.onload = (event) => {
      //   //   const blob = xhr.response;
      //   // };
      //   // xhr.open('GET', url);
      //   // xhr.send();

      //   // Or inserted into an <img> element
      //   // const img = document.getElementById('gp_image');
      //   // img.setAttribute('src', url);
      //   // console.log(url)
      //   // return url
      // }
  
    } catch (error) {
      console.error('There was an error:', error);
    }
}

export default downloadImage;