
function isGoHell(player){
    if (player.getPosY()>window.innerHeight/2){
        return true;
    }
    return false
}

function drawPancarte (pancarte){
    const pancarteImg = new Image();
    pancarteImg.src = "images/pancarte.png";
    pancarteImg.onload = () => {
        ctx.drawImage(
            pancarteImg,
            pancarte.getPosX(),
            pancarte.getPosY()
        );
    };
}