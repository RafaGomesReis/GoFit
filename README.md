# GoFit 🏋️‍♂️

GoFit é um aplicativo de fitness e bem-estar desenvolvido com React Native CLI.

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)
- **Para Android**: [Android Studio](https://developer.android.com/studio) e configuração do ambiente Android
- **Para iOS** (apenas macOS): [Xcode](https://developer.apple.com/xcode/) e CocoaPods

### 🤖 Configuração do Ambiente Android

1. Instale o [Android Studio](https://developer.android.com/studio)
2. Durante a instalação, certifique-se de instalar:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
3. Configure as variáveis de ambiente:
   - `ANDROID_HOME` apontando para o SDK do Android
   - Adicione as ferramentas do Android ao PATH

[Guia completo de configuração Android](https://reactnative.dev/docs/environment-setup?platform=android)

### 🍎 Configuração do Ambiente iOS (apenas macOS)

1. Instale o [Xcode](https://developer.apple.com/xcode/) pela App Store
2. Instale as ferramentas de linha de comando: `xcode-select --install`
3. Instale o CocoaPods: `sudo gem install cocoapods`

[Guia completo de configuração iOS](https://reactnative.dev/docs/environment-setup?platform=ios)

## 🚀 Como executar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/RafaGomesReis/GoFit.git
```

2. Entre na pasta do projeto:
```bash
cd GoFit/Frontend
```

3. Instale as dependências:
```bash
npm install
```

4. **Para iOS** (apenas macOS), instale os pods:
```bash
cd ios
pod install
cd ..
```

5. Inicie o projeto:

### 🤖 Para Android:
```bash
npm run android
```
> Este comando irá iniciar o Metro Bundler e instalar o app no emulador/dispositivo Android

### 🍎 Para iOS (apenas macOS):
```bash
npm run ios
```
> Este comando irá iniciar o Metro Bundler e instalar o app no simulador iOS

### Ou inicie o Metro Bundler separadamente:
```bash
npm start
```

## ⌨️ Comandos Disponíveis

- `npm start` - Inicia o Metro Bundler
- `npm run android` - Roda o app no Android
- `npm run ios` - Roda o app no iOS (apenas macOS)
- `npm run lint` - Executa o linter
- `npm test` - Executa os testes

## 📱 Funcionalidades

- Você pode criar sua própria Lista de Exercícios e fazer sua Série
- É disponibilizado o ensino de como fazer os exercicíos da forma correta
- Temporizador para marcar o tempo de descanso de cada exercício
- Organizador semanal dos treinos baseado nos dias escolhidos pelo usuário

## 🛠️ Tecnologias Utilizadas

- React Native CLI
- TypeScript
- React Navigation
- Async Storage
- Metro Bundler

## 🔧 Solução de Problemas

### Erro ao iniciar o projeto
Se você encontrar erros ao tentar iniciar o projeto:

1. **Limpe o cache do Metro Bundler**:
```bash
npm start -- --reset-cache
```

2. **Reinstale as dependências**:
```bash
# Exclua a pasta node_modules e o package-lock.json
rm -rf node_modules package-lock.json
npm install
```

3. **Para iOS, limpe e reinstale os pods**:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Erro no Android

1. **Limpe o build do Android**:
```bash
cd android
./gradlew clean
cd ..
```

2. **Verifique se o emulador ou dispositivo está conectado**:
```bash
adb devices
```

3. **Certifique-se de que a variável ANDROID_HOME está configurada corretamente**

### Erro no iOS (macOS)

1. **Limpe o build do Xcode**:
```bash
cd ios
xcodebuild clean
cd ..
```

2. **Reinstale os pods**:
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### App trava ou não atualiza

1. **Recarregue o app**:
   - Android: Pressione `R` duas vezes ou use o menu de desenvolvedor (Ctrl+M no emulador)
   - iOS: Pressione `Cmd+R` no simulador

2. **Reinicie o Metro Bundler**:
   - Pressione `Ctrl+C` para parar
   - Execute `npm start` novamente

3. **Verifique os logs no terminal** para possíveis erros

### Problemas de conexão com o Metro Bundler

- Certifique-se de que a porta 8081 está livre
- Se necessário, mate processos que estejam usando a porta:
  - Windows: `npx react-native start --port 8088` (usar outra porta)
  - macOS/Linux: `lsof -ti:8081 | xargs kill`

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
