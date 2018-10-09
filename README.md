
<h1 align="center">Merenda+</h1>

<p align="center"><img src="https://raw.githubusercontent.com/wiki/fga-gpp-mds/2017.2-Grupo3/Imagens/Malu_Merenda.jpg" width="350px"></p>

<p align="center">
<a href="https://circleci.com/gh/fga-gpp-mds/2017.2-Grupo3"><img src="https://circleci.com/gh/fga-gpp-mds/2017.2-MerendaMais.svg?style=shield&circle-token=:circle-token"></a>
<a href="https://www.gnu.org/licenses/gpl-3.0.en.html"><img src="https://img.shields.io/aur/license/yaourt.svg" alt="License: GPL"></a>  
<a href="https://codeclimate.com/github/fga-gpp-mds/2017.2-MerendaMais/test_coverage"><img src="https://api.codeclimate.com/v1/badges/da7b1a4300b6c84c409b/test_coverage" /></a>
</p>


## 2017.2 - Merenda+ - Auxílio aos Conselheiros do Conselho de Alimentação Escolar (CAE).

<p align="justify">O Merenda+ é uma aplicação mobile, que auxilia o conselheiro nas tarefas pertinentes a assuntos sobre a fiscalização da merenda escolar de determinada escola da sua região de atuação, de modo que as atividades realizadas - desde o planejamento da visita até a consolidação dos dados - possam ser executadas de forma mais ágil e intuitiva do que como é efetuada atualmente - a mão, através de “caneta e papel” -.</p>

<p align="justify">Outro olhar também se aplica a esse projeto ao analisar o fato de que este oferece informações relevantes a respeito das fiscalizações ao Tribunal de Contas da União (TCU), que por sua vez analisará estes dados a fim de encontrar anomalias que possam prejudicar de qualquer forma a distibuição da merenda escolar ao alunos da rede pública de ensino.</p>

<p align="justify">O sistema foi inicialmente desenvolvido por estudantes do curso de Engenharia de Software da UnB-Gama como projeto das disciplinas Método de Desenvolvimento de Software e Gerência de Gestão de Portifólios e Projetos de Software.</p>

<p align="justify">Se tem o interesse em contribuir para a Merenda+, confira o guia de contribuições.</p>

### Acesso à Aplicação

<p align="justify">Para realizar o acesso a aplicação na versão atual mais estável deve-se seguir os seguintes passos: </p>

1. Instalar o <a href="https://expo.io/">EXPO</a> no seu aparelho mobile:
   *  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR">Android - Play Store</a>
   *  <a href="https://itunes.apple.com/us/app/expo-client/id982107779?mt=8">IOS - Apple Store</a>

2. Acessar o link da aplicação na barra de pesquisa ou ler o QRCode abaixo:
   * Link da Aplicação:
```https://expo.io/@rogerlenke/merendamais```

   * QRCode:
<p align="center"><img src="https://raw.githubusercontent.com/wiki/fga-gpp-mds/2017.2-MerendaMais/Imagens/Application_QRCode.PNG"></p>

3. Caso queira, veja um vídeo da aplicação no YouTube
   * <a href="https://youtu.be/hTZtxCQACKY">Clique aqui para ver o vídeo</a>

4. Desfrute, se você for um Conselheiro :wink:;

### Resumo Arquitetural

<p align="justify">A aplicação é formada por 2 camadas principais: </p>

* <a href="https://github.com/fga-gpp-mds/2017.2-MerendaMais">React Native - Front-end;
* <a href="https://github.com/AppCivicoPlataforma/AppCivico">Nuvem Cívica - Armazenamento </a>;  

<p align="justify">Para entender a arquitetura com mais detalhes acesse o <a href="https://github.com/fga-gpp-mds/2017.2-MerendaMais/wiki/Documento-de-Arquitetura">Documento de Arquitetura </a> do projeto e os repositórios de cada camada. </p>

### Instalação

<p align="justify">Os comandos abaixo foram voltados para usuários que utilizam o sistema operacional Linux. Dessa forma, o primeiro passo para a instalação do projeto é baixar o repositório com o seguinte comando:</p>

```git clone https://github.com/fga-gpp-mds/2017.2-MerendaMais.git```

<p align="justify">Após clonar o repositório, configure o ambiente para a execução de projetos que utilizem React Native. Para seguir um pequeno tutorial clique <a href="https://github.com/fga-gpp-mds/2017.2-MerendaMais/wiki/Configura%C3%A7%C3%A3o-do-Ambiente">aqui</a>.</p>

<p align="justify">Após configurar o ambiente, entre na pasta do projeto e rode os seguintes comandos:</p>

* Para instalar as dependências do projeto:

```npm install```

* Para gerar o QRCode de feedback instantâneo do React Native e ver as mudanças do código em tempo real:

```npm start```

### Docker

<p align="justify">A equipe não utilizou Docker durante o desenvolvimento, pois como os membros já estavam com o ambiente configurado não houve necessecidade de utilizá-lo. Porém caso não deseje configurar o ambiente, recomenda-se utilizar o Docker pois ele faz toda a configuração de ambiente automáticamente. Para utilizá-lo deve-se ter o  <a href="https://www.docker.com/community-edition#/download">Docker</a> e o <a href="https://docs.docker.com/compose/install/">Docker-compose</a> instalados.</p>

<p align="justify">Após instalar o Docker e o Docker-compose, entre na pasta do projeto e rode o seguinte comando no terminal e o projeto já estará funcionado:</p>

* Para subir o ambiente do projeto:

```bash
$ sudo docker-compose up
```

* Para parar o docker de rodar:

```
Ctrl+c
```

<p align="justify">Caso deseje instalar alguma dependência no package.json ou acessar o container via bash:</p>

* Para iniciar o container (caso você não tenha rodado o comando `docker-compose up`):

```bash
$ sudo docker-compose run merenda-merenda /bin/bash
```

* Para executar o docker via bash:

```bash
$ sudo docker-compose exec merenda-merenda /bin/bash
```

Ambos os comandos acima devem exibir o root do container,  como demonstrado abaixo:

```
root@<nome da sua máquina>:/code#
```

Para sair do bash do container e encerrar a sessão,  digite `Ctrl+d`.

#### Ajuda com o ambiente docker

Caso esteja com algum problema com o ambiente do docker, [aqui](docker_troubleshooting.md) temos algumas soluções para os problemas conhecidos. Se por acaso seu problema não for solucionado, abra uma [issue](https://github.com/fga-eps-mds/2017.2-MerendaMais/issues/new?labels=bug) para que possamos ajudar.


### Principais funcionalidades

* Manter Conselheiro;
* Realizar denúncia;
* Anexar arquivos;
* Consultar informações sobre a cartilha do Conselheiro, legislação e reuniões efetuadas;
* Agendar visita;
* Agendar reunião;
* Convidar conselheiros para eventos;
* Convida um agente da vigilância sanitário para a visita em uma escola;
* Pesquisar escola;
* Acessar dados de visitas;
* Acessar relatórios de fiscalizações;
* Gerenciar registros de Conselheiros;

### Como contribuir

Os contribuintes podem colaborar para manter e evoluir o sistema através da correção de bugs e implementação de novas funcionalidades, que estão listados na pipeline "Opened Issues" no zenhub <a href= "https://github.com/fga-gpp-mds/2017.2-MerendaMais/wiki#boards?repos=99947502">Boards</a>. Para contribuir, o projeto deve ser clonado do repositório oficial.

### Documentação

Toda a documentação pode ser acessada através da <a href="https://github.com/fga-gpp-mds/2017.2-MerendaMais/wiki">Wiki</a> do projeto.
