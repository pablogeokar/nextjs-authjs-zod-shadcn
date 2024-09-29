# Passo a passo para a criação de um projeto do zero absoluto
Estou utilizando o pnpm como gerenciador de pacotes, utilize o seu gerenciador a sua escolha.

1 - Criar um novo projeto
```bash
pnpm dlx create-next-app@latest project-name
```
2 - Instalando as dependências iniciais
```bash
pnpm add next-auth@beta zod
```

3 - Inicializando o shadcn para a estilização em conjunto com o tailwind
```bash
pnpm dlx shadcn-ui@latest init
```

4 - exemplo de instalação dos componentes do shadcn de forma individual
```bash
pnpm dlx shadcn@latest add card button form input
```

5 - Iniciando a configuração do Next-Auth
```bash
pnpm dlx auth secret
```
6 - Passo a passo para a configuração social do Github
6.1 acessar o endereço: `https://github.com/settings/apps`
selecionar a opção [OAuth Apps]->[New OAuth App] e seguir os passos necessários, lembrando que é necessário informar a Authorization callback no formato: `http://localhost:3000/api/auth/callback/github`