function hideLevel(){
    const data = charger();
    const listeLev = {"heaven3": 1,"heaven2": 2,"heaven1": 3,"classic1": 4,"classic2": 5,"classic3": 6,"hell1": 7,"hell2": 8,"hell3": 9};
    
    const unlockedLevels = data.unlockedLevel || [4];
    
    for (let levelName in listeLev) {
        let levelId = listeLev[levelName];
        let elem = document.getElementById(levelName);
        
        if (elem) {
            if (!unlockedLevels.includes(levelId)) {
                elem.style.visibility = "hidden";
                elem.style.pointerEvents = "none";
            } else {
                elem.style.visibility = "visible";
                elem.style.pointerEvents = "auto";
            }
        }
    }
}

window.addEventListener('load', hideLevel);