
function isGoHell(player){
    if (player.getPosX()>window.innerWidth/2){
        return true;
    }
    return false
}

function isEnd(player,l,h){
    pancarte = new Obstacle(l,h,100,100,200);
    drawPancarte(pancarte);
    setInterval(()=>{
        let secondes = parseInt(5 % 60, 10)
        secondes = secondes < 10 ? "0" + secondes : secondes

        timerElement.innerText = `0:${secondes}`
        temps = temps <= 0 ? 0 : temps - 1
    },1000);
    isGoHell(player)
}

function drawPancarte (pancarte){
    const pancarteImg = new Image;
    pancarteImg.src = "pancarte.png";

    ctx.drawImage(
        pancarteImg,
        pancarte.getPosX(),
        pancarte.getPosY()
    )
}