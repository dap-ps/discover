export const getBase64Image = (imgUrl: string): Promise<string> => {
  return new Promise<string>((resolve) => {
    var img = new Image();
    img.src = imgUrl;
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = () => {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL('image/png');
      //console.log('UgetBase64Image.dataURL ', dataURL);
      resolve(dataURL);
    };
  });
};

export const modifyUnixTimestamp = (timestamp: number, minutes: number) => {
  return timestamp + minutes * 60;
};
