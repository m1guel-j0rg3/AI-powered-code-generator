let botao = document.querySelector(".botao-gerar")
let chave = "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"
let endereco = "https://api.groq.com/openai/v1/chat/completions"

function CopiarTexto() {
    var texto = document.getElementById("copy-button").value
    navigator.clipboard.writeText(texto).then(function() {
      alert("Texto copiado com sucesso!");
    }, function() {
      alert("Erro ao copiar texto.");
    });
  }

async function gerarCodigo(){
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let blocoResultado = document.querySelector(".bloco-resultado")

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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" 
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "Você é um gerador de código HTML, CSS e JavaScript. Responda somente com código puro. Nunca use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, o <body> com o HTML e o <script> com o JavaScript. Siga exatamente o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo piscando, use opacity no @keyframes. Se pedir algo girando, use rotate no @keyframes. Se pedir algo se movendo, use translateX ou translateY no @keyframes." 
                },
                {
                    role: "user",
                    content: textoUsuario
                }
            ]
        })
    })
   
    let dados = await resposta.json()

    if (!dados.choices) {
    console.error(dados)
    blocoCodigo.textContent = "Erro na API"
    return
}

    let resultado = dados.choices[0].message.content

    blocoCodigo.textContent = resultado
    blocoResultado.srcdoc = resultado

    console.log(dados)


}

botao.addEventListener("click", gerarCodigo)
