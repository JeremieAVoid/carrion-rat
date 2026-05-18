function hideLevel(donnees){
    listeLev = ["heaven3","heaven2","heaven1","classic1","classic2","classic3","hell1","hell2","hell3"];
    for (let i=0; i<listeLev.length; i++){
        if (donnees[i]-1!==i){
            let elem = document.getElementById(listeLev[i]);
            elem.style.visibility = "hidden";
        }
    }
}