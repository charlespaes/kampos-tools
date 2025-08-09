document.getElementById('gerar-srt').addEventListener('click', function() {
    const textoBruto = document.getElementById('texto-bruto').value;
    const areaDownload = document.getElementById('area-download');
    areaDownload.innerHTML = ''; // Limpa a área de download anterior

    if (textoBruto.trim() === '') {
        alert('Por favor, cole algum texto na caixa.');
        return;
    }

    try {
        const conteudoSrt = converterParaSRT(textoBruto);
        criarLinkDownload(conteudoSrt);
    } catch (error) {
        alert('Ocorreu um erro ao processar o texto.\nDetalhes: ' + error.message);
    }
});

/**
 * Nova função para converter texto que já está no formato SRT.
 * Ela vai limpar, re-numerar e garantir que o formato final seja válido.
 */
function converterParaSRT(texto) {
    // Separa o texto em blocos de legenda. Um bloco é separado do outro por uma linha em branco.
    const blocos = texto.trim().split(/\n\s*\n/).filter(Boolean);

    if (blocos.length === 0) {
        throw new Error("Nenhum bloco de legenda encontrado. Verifique se as legendas estão separadas por uma linha em branco.");
    }

    let srtFinal = '';
    let contador = 1; // Vamos re-numerar tudo para garantir a sequência correta.

    for (const bloco of blocos) {
        const linhas = bloco.split('\n');

        // Encontra a linha que contém o tempo (-->)
        const linhaDoTempo = linhas.find(l => l.includes('-->'));

        if (linhaDoTempo) {
            // Pega o texto da legenda, que são todas as linhas DEPOIS da linha do tempo.
            const indiceLinhaTempo = linhas.findIndex(l => l.includes('-->'));
            const textoLegenda = linhas.slice(indiceLinhaTempo + 1).join('\n').trim();

            if (textoLegenda) {
                // Monta o bloco SRT corrigido e re-numerado
                srtFinal += `${contador}\n`;
                srtFinal += `${linhaDoTempo.trim()}\n`; // Usa a linha do tempo que encontramos
                srtFinal += `${textoLegenda}\n\n`; // Adiciona a quebra de linha dupla no final
                contador++;
            }
        }
        // Se um bloco não tiver uma linha de tempo, ele será ignorado.
    }

    if (srtFinal.trim() === '') {
        throw new Error("Não foi possível extrair nenhuma legenda válida. Verifique se o formato do tempo (ex: 00:03:11,000 --> 00:03:19,000) está correto.");
    }

    return srtFinal;
}

function criarLinkDownload(conteudo) {
    // Usa o encoding UTF-8 com BOM, que é mais compatível com players do Windows
    const blob = new Blob(["\uFEFF" + conteudo], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'legenda_corrigida.srt';
    link.textContent = 'Baixar Arquivo .SRT Corrigido';
    
    const areaDownload = document.getElementById('area-download');
    areaDownload.innerHTML = ''; // Limpa antes de adicionar
    areaDownload.appendChild(link);
}