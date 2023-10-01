# Arquitetura da Solução

A seguir, apresentamos um diagrama de alto nível que ilustra a estrutura da solução:

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura Distribuida](img/arquitetura-distribuida.png)
## Arquitetura Backend
No caso do nosso projeto, optamos por uma abordagem baseada em serviços com uma estrutura de código que segue os princípios do Domain-Driven Design (DDD) e está dividida em camadas bem definidas.
Benefícios:
Separação de Responsabilidades: A divisão do projeto em camadas distintas, como Domain, Infrastructure, Application e Presentation, permite uma clara separação de responsabilidades. Isso torna o código mais organizado e facilita a manutenção e escalabilidade.
Modelagem de Domínio Rico: Ao seguir os princípios do DDD, focamos na modelagem do domínio, o que nos ajuda a entender melhor os requisitos do negócio e a criar um sistema que reflita com precisão o domínio do problema.
Modularização: A abordagem baseada em serviços facilita a modularização do sistema. Isso significa que cada parte da aplicação pode ser desenvolvida, testada e mantida separadamente, o que simplifica a colaboração entre equipes e a evolução do projeto.

Malefícios:
Complexidade Inicial: A estruturação em camadas e a aplicação de princípios DDD podem parecer complexas em projetos simples, adicionando algum overhead inicial de desenvolvimento.
Aprendizado e Treinamento: A equipe pode precisar de algum tempo para se familiarizar completamente com a estrutura adotada, especialmente se não estiver acostumada com o DDD.
Integração de Tecnologias: Em alguns casos, como o uso do MongoDB e Identity na camada de domínio, pode ser necessário fazer adaptações na estrutura DDD padrão, o que pode levar à introdução de classes anêmicas.

Observações Adicionais:
É importante notar que, embora tenhamos adotado o DDD como diretriz geral, em alguns casos, pragmatismo e necessidades específicas do projeto podem nos levar a fazer adaptações. Por exemplo, a integração de tecnologias como MongoDB e Identity pode exigir modificações na estrutura original do DDD. Da mesma forma, a introdução de classes anêmicas pode ser necessária para lidar com requisitos específicos do projeto.
No geral, a abordagem adotada combina a simplicidade inicial necessária para um projeto mais simples com a flexibilidade para acomodar requisitos específicos, mantendo um foco claro na modelagem de domínio e na separação de responsabilidades. Isso nos permite desenvolver um sistema que atende às necessidades do negócio e é facilmente escalável à medida que o projeto cresce.
![Arquitetura API](img/arquitetura-api.png)
![Arquitetura DDD](img/arquitetura-ddd.png)

Justificativas das Escolhas
ASP.NET 7: Escolhemos o ASP.NET 7 como framework para a API devido à sua robustez e suporte para desenvolvimento web moderno. Ele oferece uma ampla gama de recursos para criação de APIs, incluindo suporte a roteamento, autenticação e integração com bancos de dados.

MySQL e MongoDB: Optamos por usar o MySQL como banco de dados relacional para armazenar os registros de usuários devido à sua estrutura tabular adequada para esse tipo de dados. Utilizamos o MongoDB como banco NoSQL para armazenar dados diversos, como justificativas, departamentos, cargos, contracheques e registros de ponto, devido à sua flexibilidade de esquema e capacidade de armazenar dados semi-estruturados.

## Documentação da Implementação da Web API REST
### Para configurar o ambiente de desenvolvimento, siga as etapas abaixo:
Instale o Visual Studio Code, ASP.NET 7 e todas as dependências necessárias no seu sistema operacional.
Clone o repositório do projeto do GitHub para o seu ambiente local.
Configure as variáveis de ambiente necessárias, como strings de conexão para os bancos de dados MySQL e MongoDB, bem como as chaves de autenticação JWT.

### Recursos e Rotas
![Documentacacao](img/swagger-api-1.png)
![Documentacacao](img/swagger-api-2.png)
![Documentacacao](img/swagger-api-3.png)
![Documentacacao](img/swagger-api-4.png)
![Documentacacao](img/swagger-api-5.png)
![Documentacacao](img/swagger-api-6.png)
![Documentacacao](img/swagger-api-7.png)

### Documentação da Implementação do Banco de Dados NoSQL
#### Uso do MongoDB:
O MongoDB é utilizado para armazenar dados diversos que não se encaixam bem em uma estrutura de banco de dados relacional. As coleções do MongoDB incluem:
justifications: Armazena informações sobre as justificativas fornecidas pelos usuários para edições manuais nos registros de ponto.
departaments e positions: Armazenam informações sobre os departamentos e cargos dos empregados.
paychecks: Mantém os detalhes dos contracheques gerados com base nos registros de ponto.
timelogs: Armazena os registros de ponto dos empregados, incluindo data, hora de entrada e saída, e outras informações relevantes.
Justificativas das Escolhas
Optamos por usar o MongoDB para armazenar esses dados devido à flexibilidade do esquema, que permite adicionar campos conforme necessário sem interromper as operações existentes. Além disso, o MongoDB é escalável e adequado para o armazenamento de grandes volumes de dados semi-estruturados.

### Documentação da Implementação do Banco de Dados Relacional (MySQL)
#### Uso do MySQL
O MySQL é utilizado como banco de dados relacional para armazenar informações cruciais no projeto, incluindo os registros dos usuários, bem como para manter a estrutura de autenticação e autorização da aplicação. As tabelas do MySQL incluem:

AspNetRoles: Responsável por armazenar os papéis (ou funções) disponíveis na aplicação, o que é essencial para o gerenciamento de permissões.

HRAdministrators: Mantém informações sobre os administradores de recursos humanos e seus respectivos CNPJs.

AspNetRoleClaims: Armazena reivindicações associadas a cada papel da aplicação, permitindo uma maior personalização das permissões de cada papel.

Employees: Contém informações detalhadas sobre os empregados, como data de nascimento, data de contratação, CPF, horas de trabalho diárias, e suas associações com departamentos e cargos.

AspNetUsers: Armazena os dados dos usuários, incluindo seus nomes completos, papéis, informações de contato, chaves de segurança e outros detalhes importantes. Também faz a ligação entre os usuários e seus respectivos empregados e administradores de RH.

AspNetUserClaims: Contém as reivindicações associadas a cada usuário, o que é fundamental para o gerenciamento de permissões individuais.

AspNetUserLogins: Responsável por registrar logins externos de usuários, se houver integrações de autenticação externa.

AspNetUserRoles: Mantém o relacionamento entre os usuários e os papéis que desempenham na aplicação.

AspNetUserTokens: Armazena os tokens de autenticação associados a cada usuário, usados para autenticação e recuperação de senhas.


Justificativas das Escolhas

A escolha do MySQL como banco de dados relacional baseia-se em sua estrutura tabular sólida, ideal para armazenar informações altamente estruturadas, como detalhes de usuário e funções. A utilização do MySQL oferece os seguintes benefícios:

Consistência de Dados: O MySQL garante que os dados permaneçam consistentes por meio de relações definidas e verificações de integridade referencial.

Suporte a Transações: O MySQL suporta transações ACID (Atomicidade, Consistência, Isolamento e Durabilidade), garantindo a integridade dos dados em operações críticas.

Segurança e Autenticação: É uma escolha segura para armazenar informações de autenticação, como senhas de usuário, com recursos integrados de segurança.

Escalabilidade: O MySQL é escalável, permitindo o gerenciamento de grandes volumes de dados, caso o projeto cresça.

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

![DiagramaDeClasses](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/blob/main/docs/img/Diagrama%20de%20Classes.jpeg)


## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

![ModeloER](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/blob/main/docs/img/Modelo%20ER.jpeg)

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
![EsquemaRelacional](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/blob/main/docs/img/Esquema%20Relacional.jpeg)
## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.
[Arquivo SQL](/src/bd/banco.sql)
## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem

Frontend web: Vercel
Frontend mobile: Expo e sera disponibilizado um .apk
Backend: AWS EC2 (Tentativa)
Banco ORM: AWS RDS
Banco NoSQL: AtlasDB

## Qualidade de Software

Conceituar qualidade de fato é uma tarefa complexa, mas ela pode ser vista como um método gerencial que através de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem satisfeitas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, tal nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software.
Com base nessas características e nas respectivas sub-características, identifique as sub-características que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software considerando-se alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão a equipe avaliar os objetos de interesse.

> **Links Úteis**:
>
> - [ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de Software - Engenharia de Software 29](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209/)
