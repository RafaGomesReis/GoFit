# GoFit 🏋️‍♂️

StriveFit é um aplicativo de fitness e bem-estar desenvolvido com React Native e Expo.

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Git](https://git-scm.com/)

> **Nota**: Não é necessário instalar o Expo CLI globalmente. O projeto usa `npx expo` que baixa automaticamente a versão necessária.

## 🚀 Como executar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/RafaGomesReis/StriveFit.git
```

2. Entre na pasta do projeto:
```bash
cd StriveFit
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o projeto:
```bash
npx expo start
```

> **Aviso**: Ao iniciar, você pode ver avisos sobre versões de pacotes que precisam ser atualizadas. Isso é normal e o projeto funcionará corretamente mesmo assim.

5. **Para visualizar o aplicativo**, você terá várias opções:

### 📱 No Celular (Recomendado)
- Instale o aplicativo **Expo Go** no seu celular:
  - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)
- Escaneie o QR Code que aparecerá no terminal
- O aplicativo será carregado diretamente no seu celular

### 🌐 No Navegador Web
- Pressione `w` no terminal para abrir no navegador
- Útil para desenvolvimento e testes rápidos

### 📲 Em Emulador/Simulador
- Pressione `a` para abrir no emulador Android (se configurado)
- Pressione `i` para abrir no simulador iOS (apenas macOS)

### ⌨️ Comandos Disponíveis Durante a Execução
Após iniciar o projeto, você pode usar os seguintes comandos no terminal:
- `s` - Alternar para development build
- `a` - Abrir no Android
- `w` - Abrir no navegador web
- `j` - Abrir debugger
- `r` - Recarregar aplicativo
- `m` - Alternar menu
- `shift+m` - Mais ferramentas
- `o` - Abrir código do projeto no editor
- `?` - Mostrar todos os comandos
- `Ctrl+C` - Parar o servidor

## 📱 Funcionalidades

- Você pode criar sua própria Lista de Exercícios e fazer sua Série
- É disponibilizado o ensino de como fazer os exercicíos da forma correta
- Temporizador para marcar o tempo de descanso de cada exercício
- Organizador semanal dos treinos baseado nos dias escolhidos pelo usuário

## 🛠️ Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- Metro Bundler

## 🔧 Solução de Problemas

### Avisos sobre versões de pacotes
Se você ver avisos sobre versões desatualizadas dos pacotes, pode atualizá-los executando:
```bash
npx expo install --fix
```

### Tela Branca com Loading Infinito
Se o aplicativo ficar com tela branca e loading infinito no Expo Go:

1. **Limpe o cache e reinicie**:
```bash
npx expo start --clear
```

2. **Feche completamente o Expo Go** no celular e abra novamente

3. **Verifique a conexão de rede**:
   - Certifique-se de que seu celular e computador estão na mesma rede Wi-Fi
   - Tente desconectar e reconectar o Wi-Fi em ambos os dispositivos

4. **Use o modo LAN (recomendado):**
   - No terminal do Expo, pressione a tecla `l` para garantir que está em modo LAN
   - Certifique-se de que o firewall do computador permite conexões nas portas do Expo (geralmente 19000 e 19001)
   - Escaneie o QR Code ou digite manualmente o endereço IP mostrado no terminal no app Expo Go

5. **Atualize as dependências**:
```bash
npm install
npx expo install --fix
```

6. **Verifique os logs no terminal** para possíveis erros durante o carregamento

7. **Como última opção, reinicie o Metro Bundler**:
   - Pressione `Ctrl+C` para parar o servidor
   - Execute `npx expo start --clear` novamente

### Problemas com QR Code
- Certifique-se de que seu celular e computador estão na mesma rede Wi-Fi
- Se o QR Code não funcionar, tente usar o endereço `exp://` mostrado no terminal
- Se continuar com problemas, tente reiniciar o Expo Go e o servidor Expo

## 👥 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## ✒️ Autores

* **Rafael Gomes Reis** - *Desenvolvimento* - [RafaGomesReis](https://github.com/RafaGomesReis)
* **Jonathan Reis** - *Mentoria* - [JonathanReisCom](https://github.com/JonathanReisCom/JonathanReisCom)

---
README feito com ❤️ por Rafael Gomes Reis
