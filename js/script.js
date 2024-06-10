function select(event) {
    var iframe = document.getElementById('conteudo');
    if (iframe) {
        iframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // descrições e <p>'s

    var descricao = document.querySelector('.detalhe');
    var descricaoLink = event.target.getAttribute('data-description-1');
    descricao.textContent = descricaoLink;

    var descricao2 = document.querySelector('.detalhe2');
    var descricaoLink2 = event.target.getAttribute('data-description-2');
    descricao2.textContent = descricaoLink2;

    var descricao3 = document.querySelector('.detalhe3');
    var descricaoLink3 = event.target.getAttribute('data-description-3');
    descricao3.textContent = descricaoLink3;

    var descricao4 = document.querySelector('.detalhe4');
    var descricaoLink4 = event.target.getAttribute('data-description-4');
    descricao4.textContent = descricaoLink4;

    var descricao5 = document.querySelector('.detalhe5');
    var descricaoLink5 = event.target.getAttribute('data-description-5');
    descricao5.textContent = descricaoLink5;

    var descricao6 = document.querySelector('.detalhe6');
    var descricaoLink6 = event.target.getAttribute('data-description-6');
    descricao6.textContent = descricaoLink6;

    // Iframes

    var iframe2 = document.querySelector('.conteudo2'); // Seleciona o segundo iframe
    var iframe2Src = event.target.getAttribute('data-iframe2-src'); // Obtém o valor do atributo data-iframe2-src
        iframe2.src = iframe2Src; // Define o src do segundo iframe

    var iframe3 = document.querySelector('.conteudo3'); // Seleciona o segundo iframe
    var iframe3Src = event.target.getAttribute('data-iframe3-src'); // Obtém o valor do atributo data-iframe2-src
        iframe3.src = iframe3Src; // Define o src do tericeiro iframe

    var iframe4 = document.querySelector('.conteudo4'); // Seleciona o segundo iframe
    var iframe4Src = event.target.getAttribute('data-iframe4-src'); // Obtém o valor do atributo data-iframe2-src
        iframe4.src = iframe4Src; // Define o src do quarto iframe


    var link = document.querySelector('.link-1'); // Seleciona o elemento com a classe link-conteudo
    var fonteLink = event.target.getAttribute('src-link'); // Pega o valor da variavel src-link
        link.href = fonteLink; // Recebe o valor do src-link correspondente

    var link2 = document.querySelector('.link-2'); // Seleciona o elemento com a classe link-conteudo
    var fonteLink2 = event.target.getAttribute('src-link2'); // Pega o valor da variavel src-link
        link2.href = fonteLink2; // Recebe o valor do src-link correspondente

    var link3 = document.querySelector('.link-3'); // Seleciona o elemento com a classe link-conteudo
    var fonteLink3 = event.target.getAttribute('src-link3'); // Pega o valor da variavel src-link
        link3.href = fonteLink3; // Recebe o valor do src-link correspondente
}

const $html = document.querySelector('html')
const $checkbox = document.querySelector('.switch')

$checkbox.addEventListener('change', function(){
    $html.classList.toggle('dark-mode')
})
