const girarImagem = document.getElementsByClassName("imagem");
for (let i = 0; i < girarImagem.length; i++) {
    girarImagem[i].addEventListener("click", function () {
        this.classList.toggle("girar");
    });
}