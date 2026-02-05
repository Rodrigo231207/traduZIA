let inputText = document.querySelector(".imput-text");
let textoTraduzido = document.querySelector(".texto-traduzido");
let idomas = document.querySelectorAll(".idiomas");

async function traduzir() {
    const idiomaSelecionado = document.querySelector(".idiomas.selecionado");

    const idiomaDestino = idiomaSelecionado == null ? idiomaSelecionado.value : "en-US";

    let endereco = "https://api.mymemory.translated.net/get?q="
        + inputText.value
        + "&langpair=pt-br|"
        + idiomaDestino

    let resposta = await fetch(endereco)

    let dados = await resposta.json()

    textoTraduzido.textContent = dados.responseData.translatedText

}

idomas.forEach((idioma) => {
    if (idioma.value === "en-US" || idioma.value === "en") {
        idioma.classList.add("selecionado");
    }

    idioma.addEventListener("click", () => {
        idomas.forEach((item) => item.classList.remove("selecionado"));
        idioma.classList.add("selecionado");
    });
});
function ouvirvoz() {
    let voz = window.webkitSpeechRecognition

    let reconhecimentoVOZ = new voz()
    reconhecimentoVOZ.lang = "pt-BR"
    reconhecimentoVOZ.onresult = (evento) => {
        let textotranscricao = evento.results[0][0].transcript
        inputText.textContent = textotranscricao

        traduzir()
    }
    reconhecimentoVOZ.start()

}