# BrechoPlus

Projeto desenvolvido durante o 2º ano do Ensino Médio Integrado com o Curso Técnico Análise e Desenvolvimento de Sistemas na Etec de Taboão da Serra


## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **Node.js e npm (ou yarn):** [https://nodejs.org/](https://nodejs.org/)
* **Git:** [https://git-scm.com/](https://git-scm.com/)
* **Expo CLI (Recomendado):**  `npm install --global expo-cli`  ou `yarn global add expo-cli` (Se o projeto usar Expo)
* **React Native CLI (Alternativo):** `npm install -g react-native-cli` ou `yarn global add react-native-cli` (Se o projeto *não* usar Expo e precisar de acesso nativo)
* **Java Development Kit (JDK):** [https://www.oracle.com/java/technologies/javase-jdk11-downloads.html](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (Pode ser necessário para Android)
* **Android Studio e emulador/dispositivo físico:** [https://developer.android.com/studio](https://developer.android.com/studio) (Para desenvolvimento Android)
* **Xcode e simulador/dispositivo físico:** [https://developer.apple.com/xcode/](https://developer.apple.com/xcode/) (Para desenvolvimento iOS - macOS necessário)


## Copiando e Configurando o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
   Substitua `seu-usuario/seu-repositorio` pelo nome de usuário e nome do repositório no GitHub.

2. **Navegue até o diretório do projeto:**

   ```bash
   cd seu-repositorio
   ```

3. **Instale as dependências:**

   ```bash
   npm install  # ou yarn install
   ```

## Executando o Projeto

As instruções a seguir dependem se o projeto usa Expo ou o React Native CLI.  Verifique o `package.json` para identificar qual método usar.

**Usando Expo:**

1. Inicie o projeto:

   ```bash
   expo start
   ```

2. Um QR code será exibido no terminal. Escaneie-o com o aplicativo Expo Go no seu dispositivo móvel para executar o app.  Você também pode executar em um simulador iOS ou Android diretamente pelo Expo Dev Client.


**Usando React Native CLI:**

1. **Android:**

   ```bash
   react-native run-android
   ```

2. **iOS:**

   ```bash
   react-native run-ios
   ```

   Certifique-se de ter um simulador iOS aberto ou um dispositivo conectado.

## Possíveis Problemas e Soluções

* **Erro de dependência:** Se encontrar erros durante a instalação das dependências, tente limpar o cache:

   ```bash
   npm cache clean --force # ou yarn cache clean
   ```

   e reinstale:

   ```bash
   npm install # ou yarn install
   ```

* **Problemas com o Android Studio:** Certifique-se de que as variáveis de ambiente `ANDROID_HOME` e `JAVA_HOME` estejam configuradas corretamente.

* **Problemas com o Xcode:** Certifique-se de ter o Xcode e as ferramentas de linha de comando instaladas e configuradas.

* **Conflitos de versão:** Verifique as versões do Node.js, npm (ou yarn) e React Native especificadas no projeto (geralmente em um arquivo `.nvmrc` ou no `package.json`) e tente usar as mesmas versões.
