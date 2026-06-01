SITE PREMIUM - BARBEARIA DO VARELLA

Arquivos inclusos:
- index.html: página inicial
- agendamento.html: página de agendamento separada
- style.css: todo o design do site
- script.js: animações e envio para WhatsApp

COMO EDITAR:
1. Para mudar o número do WhatsApp:
   Abra script.js e altere WHATSAPP_BARBEARIA.

2. Para mudar Instagram, endereço e telefone:
   Abra index.html e edite a parte do rodapé.

3. Para trocar imagens:
   No style.css, procure por url('https://images.unsplash.com...') e troque pelo link da sua imagem.

4. Para abrir:
   Clique duas vezes no arquivo index.html.

5. Para publicar:
   Pode usar GitHub Pages, Netlify ou Vercel.


ATUALIZAÇÃO DE LOGO E CONTATOS
1. Para trocar a logo do site e o ícone da aba do navegador, substitua o arquivo:
   assets/logo.svg
   por sua logo com o mesmo nome. Se preferir PNG, use logo.png e altere nos HTMLs de assets/logo.svg para assets/logo.png.

2. A logo e o nome no menu já são clicáveis e voltam para o início do site.

3. Para trocar o WhatsApp oficial, abra script.js e altere:
   const WHATSAPP_BARBEARIA = '5521999999999';

4. Para trocar Instagram/WhatsApp que aparecem nos botões, altere os links em index.html e agendamento.html.


ATUALIZAÇÃO DO AGENDAMENTO:
- O campo WhatsApp aceita somente números.
- Use DDD + número, exemplo: 21999999999.
- A área de agendamento recebeu visual premium com etapas, resumo de funcionamento e campos mais modernos.


=== ATUALIZAÇÃO DE LOGOS ===
Agora o projeto já está configurado para estes nomes:

assets/logo/logo-principal.svg  -> logo completa, usada no agendamento/áreas maiores
assets/logo/logo-escudo.svg     -> escudo, usado no menu superior
assets/logo/favicon.svg         -> ícone da aba do navegador

Para trocar, basta substituir os arquivos dentro da pasta assets/logo/ mantendo exatamente os mesmos nomes.
Se usar PNG em vez de SVG, altere o final .svg para .png no index.html e no agendamento.html.

Dica: use SVG para o site e PNG 1000x1000 transparente para Instagram/WhatsApp/Canva.
