if(window.innerWidth >= '900'){
    document.getElementById("pistakes").style.top = `38.8%`
} else{
    document.getElementById("pistakes").style.top = `46%`
}

function loveFunction() {
    const targ = document.getElementById("showsumluv");
    targ.style.color = `#ff1a1a`;
    targ.innerText = "Loved"
}