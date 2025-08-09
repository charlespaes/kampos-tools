// Espera o conteúdo da página carregar completamente antes de executar o script.
// É uma boa prática para evitar erros de elementos que ainda não existem.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECIONAR OS ELEMENTOS DA PÁGINA
    // Guardamos todos os elementos que vamos manipular em variáveis para fácil acesso.
    const inputView = document.getElementById('input-view');
    const outputView = document.getElementById('output-view');
    
    const markdownInput = document.getElementById('markdown-input');
    const outputContent = document.getElementById('output-content');
    
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const backBtn = document.getElementById('back-btn');

    // 2. ADICIONAR AS FUNCIONALIDADES (EVENTOS)

    // Evento para o botão "Gerar Leitura"
    generateBtn.addEventListener('click', () => {
        const markdownText = markdownInput.value;

        // Validação simples para não gerar uma tela em branco.
        if (!markdownText.trim()) {
            alert('Por favor, cole algum texto antes de gerar.');
            return; // Interrompe a função se não houver texto.
        }

        // A MÁGICA ACONTECE AQUI:
        // A biblioteca "marked" converte o texto em Markdown para HTML.
        // A opção 'gfm: true' ativa a compatibilidade com o "GitHub Flavored Markdown",
        // que suporta tabelas, texto riscado, etc.
        outputContent.innerHTML = marked.parse(markdownText, { gfm: true });

        // Troca a visibilidade das telas.
        inputView.classList.add('hidden');
        outputView.classList.remove('hidden');
    });

    // Evento para o botão "Limpar"
    clearBtn.addEventListener('click', () => {
        markdownInput.value = ''; // Limpa o conteúdo da caixa de texto.
    });

    // Evento para o botão "Inserir Novo Texto"
    backBtn.addEventListener('click', () => {
        // Inverte a troca de visibilidade para voltar à tela inicial.
        outputView.classList.add('hidden');
        inputView.classList.remove('hidden');
    });

});