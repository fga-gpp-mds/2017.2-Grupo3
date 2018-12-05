# Docker Troubleshooting
## Sumário
  * [Respostas para problemas comuns](#respostas-para-problemas-comuns)
    + [Ocorrem erros quando tento criar a imagem do docker](#ocorrem-erros-quando-tento-criar-a-imagem-do-docker)
    + [Quando o aplicativo é instalado no celular, ele apresenta uma tela branca por bastante tempo antes de apresentar a aplicação](#quando-o-aplicativo---instalado-no-celular--ele-apresenta-uma-tela-branca-por-bastante-tempo-antes-de-apresentar-a-aplica--o)
    + [Quando o aplicativo é instalado no celular, ele apresenta uma tela de erro vermelha](#quando-o-aplicativo---instalado-no-celular--ele-apresenta-uma-tela-de-erro-vermelha)
<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


## Respostas para problemas comuns
### Ocorrem erros quando tento criar a imagem do docker
- Verifique sua conexão com a internet
- Tenha certeza que a rede que você está conectado permita que se faça download das imagens do docker (algumas redes corporativas não permitem)
- Verifique se o arquivo **/android/app/build.gradle** possui nas linhas indicadas os seguintes valores:

```javascript
...
96    defaultConfig {
97        applicationId: "com.merendamais"
98        minSdkVersion: 16
99        targetSdkVersion: 25
100       versionCode: 34
101       versionName: "1.6"
102       ndk {
103           abiFilters: "armeabi-v7a", "x86"
104       }
105   }
...
```

### Quando o aplicativo é instalado no celular, ele apresenta uma tela branca por bastante tempo antes de apresentar a aplicação
Não sabemos o porque disso ocorrer porém, isso ocorre apenas na primeira build e portanto é considerado normal por conta da depuração por USB.

### Quando o aplicativo é instalado no celular, ele apresenta uma tela de erro vermelha
Provavelmente ocorreu um erro durante a execução dos scripts de variáveis de ambiente.

- Derrube a aplicação
- Tente: `$ sudo docker-compose up --build`
- Se o problema persistir, entre no bash do container e execute os commandos do arquivo variables.sh
