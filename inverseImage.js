function inverserImageVerticalement(imageSrc, callback) {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
        const canvasTemp = document.createElement('canvas');
        canvasTemp.width = img.width;
        canvasTemp.height = img.height;
        const ctxTemp = canvasTemp.getContext('2d');
        
        ctxTemp.translate(0, img.height);
        ctxTemp.scale(1, -1);
        ctxTemp.drawImage(img, 0, 0);
        
        const imgInversee = new Image();
        imgInversee.src = canvasTemp.toDataURL();
        imgInversee.onload = () => callback(imgInversee);
    };
}