# Página Especial de Dia dos Namorados ❤️

Este é um projeto especial criado para expressar amor de uma forma única e interativa. A página inclui um player de música personalizado, uma seção para foto do casal, uma mensagem romântica e uma proposta especial com um toque de humor.

## Como Personalizar

1. **Adicionar sua música**:
   - Coloque seu arquivo de música na pasta raiz do projeto
   - No arquivo `script.js`, atualize o objeto `songs` com o título, artista e caminho do seu arquivo:
   ```javascript
   const songs = [
       {
           title: "Sua Música",
           artist: "Seu Artista",
           path: "caminho-da-sua-musica.mp3"
       }
   ];
   ```

2. **Adicionar sua foto**:
   - Substitua o arquivo `placeholder-photo.jpg` com sua foto
   - Ou atualize o caminho da imagem no arquivo `index.html`:
   ```html
   <img src="sua-foto.jpg" alt="Nossa Foto" class="our-photo">
   ```

3. **Personalizar a mensagem**:
   - No arquivo `index.html`, encontre a seção `message-section` e atualize o texto conforme desejar

4. **Cores**:
   - No arquivo `styles.css`, você pode personalizar as cores alterando as variáveis no seletor `:root`:
   ```css
   :root {
       --primary-color: #seu-codigo-de-cor;
       --secondary-color: #seu-codigo-de-cor;
       --background-color: #seu-codigo-de-cor;
       --text-color: #seu-codigo-de-cor;
   }
   ```

## Características

- 🎵 Player de música estilo Spotify
- 📸 Seção para foto do casal
- 💝 Mensagem romântica personalizada
- 🎮 Botão "Não" interativo que foge do cursor
- 💑 Mensagem especial após clicar em "Sim"
- 📱 Design responsivo para todos os dispositivos

## Como Usar

1. Clone este repositório
2. Personalize os arquivos conforme as instruções acima
3. Abra o arquivo `index.html` em um navegador web
4. Compartilhe com seu amor! ❤️
