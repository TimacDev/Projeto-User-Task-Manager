# Projeto User Task Manager

## Sobre

Aplicação web para gestão de tarefas e utilizadores.

**Autor:** Tiago Machado

**Repositório:** [https://github.com/TimacDev/Projeto-User-Task-Manager.git](https://github.com/TimacDev/Projeto-User-Task-Manager.git)


## Task Manager

### Como utilizar

1. Inserir input de texto no campo `New Task`
2. Definir a categoria no menu dropdown
3. Clicar para adicionar — a tarefa surge na lista em coluna
4. Clicar na tarefa (frase/string) para marcar como **concluída**
5. Testar os diferentes botões e a barra de pesquisa
6. O botão `Clean All` elimina todas as tasks após evento de **confirmação**

---

## User Manager

### Como utilizar

1. Inserir input de texto no campo **Nome**
2. Inserir input de texto no campo **E-mail**
3. Clicar em `Add User` para adicionar o cartão de utilizador
4. Observar o contador de users a atualizar à medida que adiciona utilizadores

### Funcionalidades do User Card

- **Toggle Ativo/Inativo** — alterna o estado do utilizador
- **Delete** — elimina o cartão
- **Card clicável** — abre modal com informações extra

### Ordenação e Filtros

- Com mais de 1 user card, utilizar os botões `Order` e `Filter`
- O filtro requer cards declarados como **inativos** para funcionar

---

## Decisões Técnicas

### Layout Minimalista

Design simples para garantir boa leitura e experiência de utilizador.

### Método `stopPropagation()`

Utilizado no user card clicável para que, ao abrir o modal, os botões sejam independentes do evento de clique do fundo do card.

### `Date.now()` para IDs

Utilizado para gerar ID único de cada **User** e **Task**, assim como para definir e mostrar:

- Data de criação do utilizador
- Data de conclusão da task

