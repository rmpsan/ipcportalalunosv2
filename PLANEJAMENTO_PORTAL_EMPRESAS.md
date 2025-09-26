# 🏢 Portal de Empresas - Instituto Paulista de Cinema

## 📋 Visão Geral
Portal completo para empresas apoiadoras e clientes do Instituto Paulista de Cinema, oferecendo serviços integrados de produção audiovisual, contratação de talentos e parcerias estratégicas.

## 🎯 Objetivos
- Facilitar a compra de stock footage pelo catálogo do instituto
- Permitir solicitação e acompanhamento de orçamentos de produções
- Criar ponte entre empresas e talentos do instituto
- Gerenciar vagas de emprego para estudantes
- Fornecer sistema de feedback para contratações
- Centralizar todos os serviços empresariais em uma plataforma

## 👥 Público-Alvo
- **Empresas Apoiadoras**: Parceiros estratégicos do instituto
- **Empresas Clientes**: Contratantes de serviços audiovisuais
- **Agências de Publicidade**: Clientes de produção e talentos
- **Produtoras**: Parceiros de co-produção e fornecimento

## 🚀 Funcionalidades Principais

### 1. 📺 Catálogo de Stock Footage
- **Busca Avançada**: Por categoria, duração, resolução, tags
- **Preview em Alta Qualidade**: Player integrado com controles
- **Sistema de Licenciamento**: Diferentes tipos de licença
- **Carrinho de Compras**: Múltiplos itens, descontos por volume
- **Download Seguro**: Links temporários pós-compra
- **Histórico de Compras**: Redownload de itens adquiridos

### 2. 🎬 Solicitação de Produções
- **Formulário Detalhado**: Briefing completo do projeto
- **Upload de Referências**: Imagens, vídeos, documentos
- **Orçamento Automático**: Calculadora baseada em parâmetros
- **Timeline Estimada**: Cronograma automático do projeto
- **Aprovação de Propostas**: Sistema de aceite digital
- **Chat Integrado**: Comunicação direta com produtores

### 3. 📊 Acompanhamento de Produções
- **Dashboard de Projetos**: Status em tempo real
- **Timeline Visual**: Marcos e entregas
- **Aprovação de Etapas**: Sistema de validação por fase
- **Compartilhamento de Arquivos**: Upload/download seguro
- **Relatórios de Progresso**: Atualizações automáticas
- **Notificações**: Email e push notifications

### 4. 💼 Gestão de Vagas
- **Cadastro de Vagas**: Formulário completo com requisitos
- **Categorização**: Por área, nível, tipo de contrato
- **Publicação Automática**: Integração com portal do aluno
- **Gestão de Candidatos**: Lista de inscritos por vaga
- **Agendamento de Entrevistas**: Calendário integrado
- **Status de Contratação**: Acompanhamento do processo

### 5. 🎭 Banco de Talentos
- **Busca Avançada**: Por habilidades, experiência, localização
- **Perfis Detalhados**: Portfolio, currículo, projetos
- **Sistema de Filtros**: Múltiplos critérios de seleção
- **Favoritos**: Lista de talentos de interesse
- **Contato Direto**: Mensagens via plataforma
- **Histórico Acadêmico**: Notas e certificações

### 6. 📈 Histórico e Avaliações
- **Histórico de Pontos**: Sistema de gamificação do aluno
- **Notas Acadêmicas**: Performance em disciplinas
- **Projetos Realizados**: Portfolio acadêmico
- **Avaliações de Professores**: Feedback institucional
- **Soft Skills**: Avaliação comportamental
- **Certificações**: Cursos e especializações

### 7. 💬 Sistema de Feedback
- **Avaliação de Contratados**: Formulários estruturados
- **Acompanhamento Contínuo**: Check-ins periódicos
- **Métricas de Performance**: KPIs personalizáveis
- **Relatórios para Instituto**: Feedback educacional
- **Planos de Desenvolvimento**: Sugestões de melhoria
- **Histórico de Feedback**: Timeline de avaliações

## 🎨 Estrutura de Telas

### 📱 Telas Principais
1. **Dashboard Empresarial** - Visão geral e métricas
2. **Catálogo Stock Footage** - Busca e compra de conteúdo
3. **Solicitação de Produções** - Briefing e orçamentos
4. **Acompanhamento de Projetos** - Status e timeline
5. **Gestão de Vagas** - Publicação e candidatos
6. **Banco de Talentos** - Busca e perfis de alunos
7. **Histórico de Alunos** - Notas e performance
8. **Sistema de Feedback** - Avaliações e relatórios
9. **Configurações** - Perfil da empresa e preferências
10. **Suporte** - Chat e documentação

### 🔐 Autenticação
- **Login Empresarial**: Email/senha ou SSO
- **Cadastro de Empresa**: Formulário com validação
- **Recuperação de Senha**: Email de reset
- **Perfil da Empresa**: Dados e configurações

## 🛠️ Arquitetura Técnica

### 📁 Estrutura de Pastas
```
views/company/
├── CompanyPortal.tsx              # Portal principal
├── CompanyAuthView.tsx            # Autenticação
├── CompanyDashboardView.tsx       # Dashboard
├── CompanyStockFootageView.tsx    # Catálogo stock footage
├── CompanyProductionView.tsx      # Solicitação de produções
├── CompanyProjectsView.tsx        # Acompanhamento projetos
├── CompanyJobsView.tsx            # Gestão de vagas
├── CompanyTalentsView.tsx         # Banco de talentos
├── CompanyStudentHistoryView.tsx  # Histórico de alunos
├── CompanyFeedbackView.tsx        # Sistema de feedback
├── CompanySettingsView.tsx        # Configurações
├── CompanySupportView.tsx         # Suporte
├── CompanySidebar.tsx             # Navegação desktop
├── CompanyMobileSidebar.tsx       # Navegação mobile
└── components/                    # Componentes específicos
    ├── StockFootageCard.tsx
    ├── ProductionForm.tsx
    ├── ProjectTimeline.tsx
    ├── JobForm.tsx
    ├── TalentCard.tsx
    ├── StudentProfile.tsx
    ├── FeedbackForm.tsx
    └── CompanyStats.tsx
```

### 🎨 Design System
- **Paleta de Cores**: Azul corporativo (#1E40AF) como primária
- **Tipografia**: Inter para consistência
- **Ícones**: Lucide React para uniformidade
- **Componentes**: Reutilização do sistema existente
- **Responsividade**: Mobile-first approach

### 📊 Tipos TypeScript
```typescript
interface Company {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  segment: string;
  size: 'small' | 'medium' | 'large';
  type: 'supporter' | 'client' | 'both';
}

interface StockFootage {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  resolution: string;
  price: number;
  license: 'standard' | 'extended' | 'exclusive';
  tags: string[];
  previewUrl: string;
  downloadUrl: string;
}

interface ProductionRequest {
  id: string;
  companyId: string;
  title: string;
  description: string;
  budget: number;
  deadline: Date;
  status: 'pending' | 'approved' | 'in_progress' | 'completed';
  attachments: string[];
}

interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  location: string;
  type: 'full_time' | 'part_time' | 'internship' | 'freelance';
  status: 'active' | 'paused' | 'closed';
}

interface Talent {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience: string;
  portfolio: string[];
  academicHistory: AcademicRecord[];
  points: number;
  availability: boolean;
}
```

## 🔄 Integração com Sistema Existente

### 📡 Pontos de Integração
1. **Sistema de Autenticação**: Extensão do auth atual
2. **Banco de Dados**: Novas tabelas para empresas
3. **API Endpoints**: Novos endpoints para funcionalidades
4. **Notificações**: Sistema unificado de notificações
5. **Upload de Arquivos**: Reutilização do sistema existente

### 🔗 Acesso via "Outras Opções"
- Adicionar botão "Portal Empresarial" no menu
- Redirecionamento para autenticação empresarial
- Sessão separada para empresas

## 📅 Cronograma de Desenvolvimento

### 🏗️ Fase 1: Estrutura Base (Semana 1)
- [ ] Criação da estrutura de pastas
- [ ] Componentes de autenticação empresarial
- [ ] Dashboard básico
- [ ] Sidebar e navegação

### 🎬 Fase 2: Funcionalidades Core (Semana 2)
- [ ] Catálogo de Stock Footage
- [ ] Solicitação de Produções
- [ ] Banco de Talentos básico
- [ ] Gestão de Vagas

### 📊 Fase 3: Funcionalidades Avançadas (Semana 3)
- [ ] Acompanhamento de Projetos
- [ ] Histórico de Alunos
- [ ] Sistema de Feedback
- [ ] Configurações e Suporte

### 🎨 Fase 4: Refinamento e Testes (Semana 4)
- [ ] Responsividade mobile
- [ ] Testes de usabilidade
- [ ] Otimizações de performance
- [ ] Documentação final

## 🎯 Métricas de Sucesso
- **Cadastro de Empresas**: Meta de 50+ empresas no primeiro mês
- **Compras de Stock Footage**: 100+ transações mensais
- **Solicitações de Produção**: 20+ projetos mensais
- **Vagas Publicadas**: 30+ vagas ativas
- **Contratações**: 15+ alunos contratados mensalmente

## 🔒 Considerações de Segurança
- **Autenticação Segura**: JWT tokens e sessões
- **Proteção de Dados**: LGPD compliance
- **Upload Seguro**: Validação de arquivos
- **Pagamentos**: Integração com gateways seguros
- **Backup**: Rotinas automáticas de backup

## 📱 Responsividade
- **Desktop**: Experiência completa
- **Tablet**: Adaptação de layouts
- **Mobile**: Funcionalidades essenciais
- **PWA**: Instalação como app

---

**Próximos Passos**: Iniciar desenvolvimento da Fase 1 com criação da estrutura base e autenticação empresarial.