# 🏋️ **PLANO DE DESENVOLVIMENTO - GoFit**

> Aplicativo de academia para gerenciamento de treinos, exercícios e acompanhamento de progresso

## 📱 **Visão Geral do Projeto**

O StriveFit é um aplicativo mobile desenvolvido em React Native que visa ajudar usuários em academias a:
- Definir e organizar suas séries de exercícios
- Acompanhar pesos utilizados e progressão
- Visualizar vídeos e fotos de execução correta
- Gerenciar treinos semanais
- Monitorar progresso e estatísticas

---

## 🎯 **FASES DE DESENVOLVIMENTO**

### **FASE 1: AUTENTICAÇÃO E NAVEGAÇÃO** 
**Status: Em andamento**

#### ✅ **Concluído**
- Estrutura básica do projeto com Expo Router
- Navegação por tabs (Home, Treinos, Perfil)
- Layout base com SafeAreaProvider

#### 🔄 **Em andamento**
- [ ] Splash Screen (desenvolvimento atual)

#### 📋 **Próximas tarefas**
- [ ] **Social Login Implementation**
  - Google Authentication
  - Apple Login (iOS) / Facebook Login (Android)
  - Integração com expo-auth-session
- [ ] **Onboarding Flow**
  - Telas de apresentação do app
  - Coleta de dados iniciais do usuário
- [ ] **Sistema de Persistência**
  - AsyncStorage para manter login
  - Verificação de autenticação na inicialização
- [ ] **Navegação Condicional**
  - Stack de autenticação vs stack principal
  - Redirecionamento baseado no status de login

---

### **FASE 2: ESTRUTURA DE DADOS E BACKEND**
**Status: Planejado**

#### 📊 **Modelagem de Dados**
- [ ] **Expandir Types existentes:**

- [ ] **Configurar Backend**
  - Firebase/Supabase para banco de dados
  - Storage para vídeos e imagens
  - API endpoints para CRUD operations

#### 🔧 **Implementar Serviços**
- [ ] Serviços de exercícios (expandir arquivos existentes)
- [ ] Serviços de treinos
- [ ] Serviços de usuário e progresso
- [ ] Sistema de cache local

---

### **FASE 3: FUNCIONALIDADES CORE DE EXERCÍCIOS**
**Status: Planejado**

#### 📚 **Biblioteca de Exercícios**
- [ ] **Lista de Exercícios**
  - Visualização por categorias
  - Sistema de busca e filtros
  - Favoritos do usuário
- [ ] **Detalhes do Exercício**
  - Vídeo demonstrativo
  - Fotos de execução
  - Instruções passo a passo
  - Músculos trabalhados
  - Equipamentos necessários

#### 🏗️ **Criação de Treinos**
- [ ] **Montagem Personalizada**
  - Seleção de exercícios
  - Definição de séries, repetições, pesos
  - Configuração de tempo de descanso
- [ ] **Treinos Pré-definidos**
  - Biblioteca de treinos prontos
  - Filtros por objetivo e nível
  - Personalização de treinos existentes

---

### **FASE 4: FUNCIONALIDADES AVANÇADAS DE TREINO**
**Status: Planejado**

#### ⏱️ **Sistema de Execução de Treino**
- [ ] **Timer e Cronômetro**
  - Contador de descanso entre séries
  - Cronômetro para exercícios cardio
  - Notificações sonoras
- [ ] **Registro de Progresso**
  - Input de peso utilizado
  - Marcação de séries concluídas
  - Notas sobre execução
- [ ] **Interface de Treino**
  - Visualização clara do exercício atual
  - Progresso visual do treino
  - Acesso rápido ao vídeo demonstrativo

#### 📅 **Organizador Semanal**
- [ ] **Planejamento**
  - Calendário de treinos
  - Divisão por grupos musculares
  - Sugestões de periodização
- [ ] **Notificações**
  - Lembretes de treino
  - Motivação e dicas
  - Estatísticas semanais

---

### **FASE 5: ACOMPANHAMENTO E PROGRESSO**
**Status: Planejado**

#### 📈 **Sistema de Progresso**
- [ ] **Histórico de Treinos**
  - Lista de treinos concluídos
  - Detalhes de cada sessão
  - Comparação de performance
- [ ] **Estatísticas e Gráficos**
  - Evolução de peso por exercício
  - Frequência de treinos
  - Calorias queimadas estimadas
- [ ] **Fotos de Progresso**
  - Upload e organização por data
  - Comparação temporal
  - Galeria privada

#### 🧮 **Recursos de Apoio**
- [ ] **Calculadoras**
  - 1RM (Uma Repetição Máxima)
  - IMC e percentual de gordura
  - Necessidades calóricas
- [ ] **Sugestões Inteligentes**
  - Progressão de carga
  - Variação de exercícios
  - Dicas de execução

---

### **FASE 6: UX/UI E FUNCIONALIDADES EXTRAS**
**Status: Futuro**

#### 🎨 **Melhorias de Interface**
- [ ] **Design System**
  - Componentes reutilizáveis
  - Paleta de cores consistente
  - Tipografia padronizada
- [ ] **Experiência do Usuário**
  - Animações fluidas
  - Transições suaves
  - Feedback visual adequado
- [ ] **Personalização**
  - Dark mode / Light mode
  - Temas personalizáveis
  - Configurações de acessibilidade

#### 🤝 **Funcionalidades Sociais (Opcional)**
- [ ] **Compartilhamento**
  - Treinos entre usuários
  - Progressos nas redes sociais
  - Sistema de templates
- [ ] **Gamificação**
  - Desafios semanais
  - Conquistas e badges
  - Ranking entre amigos

---

## 🚀 **PRÓXIMOS PASSOS IMEDIATOS**

### **1. Finalizar Splash Screen e Implementar Social Login**

### **2. Estruturar Navegação com Autenticação**
- Criar AuthStack vs MainStack
- Implementar verificação de token
- Configurar redirecionamentos

### **3. Expandir Estrutura de Dados**
- Finalizar types existentes
- Implementar serviços básicos
- Configurar backend (Firebase recomendado)

### **4. Desenvolver Tela Home**
- Dashboard com progresso atual
- Treino do dia
- Estatísticas rápidas
- Acesso direto para iniciar treino

---

## 📋 **ESTRUTURA ATUAL DO PROJETO**

```
StriveFit/
├── Frontend/
│   ├── app/
│   │   ├── _layout.tsx      # Navegação principal (tabs)
│   │   ├── index.tsx        # Tela Home
│   │   ├── workouts.tsx     # Tela de Treinos
│   │   └── profile.tsx      # Tela de Perfil
│   └── components/          # Componentes reutilizáveis
├── types/
│   ├── exercise.ts          # Tipos para exercícios
│   └── exerciseLists.ts     # Tipos para listas de exercícios
├── services/
│   ├── exercise.ts          # Serviços de exercícios
│   └── exerciseLists.ts     # Serviços de listas
└── data/
    └── index.ts            # Dados mockados
```

---

## 🎯 **METAS POR SPRINT**

### **Sprint 1 (Semanas 1-2)**
- ✅ Splash Screen
- 🔄 Social Login
- 📱 Navegação básica

### **Sprint 2 (Semanas 3-4)**
- 🗄️ Estrutura de dados
- 🔧 Backend básico
- 📋 CRUD de exercícios

### **Sprint 3 (Semanas 5-6)**
- 🏠 Tela Home funcional
- 📚 Biblioteca de exercícios
- 🔍 Sistema de busca

### **Sprint 4 (Semanas 7-8)**
- 🏗️ Criação de treinos
- ⏱️ Timer e cronômetro
- 📊 Registro de progresso

---

## 🛠️ **TECNOLOGIAS UTILIZADAS**

- **Frontend:** React Native + Expo
- **Navegação:** Expo Router
- **Estado:** Context API / Redux (a definir)
- **Backend:** Firebase/Supabase (a definir)
- **Autenticação:** Expo Auth Session
- **Storage:** AsyncStorage
- **UI:** React Native Elements (a definir)

---

## 📝 **NOTAS IMPORTANTES**

1. **Priorizar funcionalidades core** antes de implementar recursos extras
2. **Manter design consistente** em todas as telas
3. **Implementar testes** para funcionalidades críticas
4. **Considerar performance** especialmente para vídeos e imagens
5. **Planejar offline-first** para uso em academias com conexão instável

---

*Última atualização: Janeiro 2025*
*Versão do documento: 1.0* 