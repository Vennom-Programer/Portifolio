let iamgem = 0;


const girarImagem = document.getElementsByClassName("imagem");
for (let i = 0; i < girarImagem.length; i++) {
    girarImagem[i].addEventListener("click", function () {
        iamgem = (iamgem + 1) % 4;
        this.style.transform = "rotate(" + (iamgem * 360) + "deg)";
    });
}