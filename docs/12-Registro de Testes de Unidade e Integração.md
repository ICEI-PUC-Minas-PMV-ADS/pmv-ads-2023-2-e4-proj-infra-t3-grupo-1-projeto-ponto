# Teste de unidade:
### Backend: 
[Link dos arquivos](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/tree/main/src/backend/ClockIn/ClockIn.Infrastructure.Tests)<br>
No backend foram realizados 3 testes e foi utilizado o xUnit como ferramenta, sendo eles:
*Teste 01 – Um teste simples de conexão com o banco de dados*
Nele foi configurado uma string de conexão, tenta se conectar ao banco de dados e verifica se a conexão foi bem-sucedida. Se a conexão funcionar, o teste passa; caso contrário, ele falha.

*Teste 02 – CRUD no repositório do Departamento*
1.TestGetDepartamentsByHRAdministratorId: Este teste verifica se podemos recuperar departamentos com base no ID do administrador de RH.
2. TestCreateDepartament: Aqui, estamos testando a criação de um novo departamento. Verificamos se a operação de criação está funcionando corretamente.
3. TestUpdateDepartament: Este teste se concentra na atualização de informações de um departamento existente. Garantimos que as atualizações são tratadas corretamente.
4. TestDeleteDepartament: Por fim, testamos a exclusão de um departamento. Certificamo-nos de que o processo de exclusão funciona como esperado.
Para realizar esses testes, configuramos um ambiente de teste que inclui um contexto de aplicativo, injeção de dependência e usamos um repositório de departamentos. 

*Teste 03 – CRUD no repositório do Administrator de RH*
1. TestCreateHRAdministrator: Neste teste, criamos um novo administrador de RH e um usuário associado, garantindo que o processo seja bem-sucedido.
2. TestGetHRAdministrator: Aqui, verificamos se conseguimos obter um administrador de RH pelo seu ID. É importante que essa operação funcione corretamente.
3. TestUpdateHRAdministrator: Testamos a atualização das informações de um administrador de RH existente. Garantimos que a atualização do CNPJ e das informações do usuário seja efetuada com sucesso.
4. TestDeleteHRAdministrator: Por fim, testamos a exclusão de um administrador de RH, assegurando que o processo de exclusão funcione conforme o esperado.
Para realizar esses testes, configuramos um ambiente de teste com um contexto de aplicativo, injeção de dependência e fazemos uso de um repositório de administradores de RH. Também usamos o serviço de usuário da aplicação para criar e atualizar usuários. 

### Frontend:
*Web:* 
[Link dos arquivos](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/blob/main/src/frontend/web/clockin/src/components/ButtonCancel/ButtonCancel.test.js)<br>

Foi realizado apenas um teste simples com a própria ferramenta de teste do react o testing-library. Nele testamos a renderização do componente do botão de cancelar, onde para ter sucesso ele deve encontrar o texto “Cancelar” no componente renderizado.

*Mobile:*
obs.: ainda em desenvolvimento

# Teste de integração
Para realizar os testes de integração foram realizados com o Cypress como ferramenta.
[Link dos arquivos](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/tree/main/src/frontend/web/clockin/cypress/e2e)<br>

*Teste 01 – Carregamento de página web por autenticação:*
Nele testamos se é possível carregar a página inicial que não é necessário estar autenticado e como um teste de falha passamos um url onde é necessário estar autenticado assim o erro retornado foi 401.

*Teste 02 – Login do administrador de RH:*
Nele foi testado se é possível realizar login, inicialmente com as credenciais validas, retornando um código 200 e um segundo teste de falha com credenciais invalidas, retornando assim um 400.

*Teste 03 – Edição do nome do departamento*
Nele foi testado se é possível fazer a edição do nome de um departamento, inicialmente foi cadastrado um novo departamento e dpeois editado o nome desse departamento recém-criado, retornando um código 204. Para testar uma falha ao realizar a edição inserimos mais caracteres que o permitido assim retornando um código 400.

*Teste 04 – Criação de um novo departamento* 
Nele testamos se é possível criar um novo departamento no sistema, ao preencher os dados e clicar no botão para cadastro obtendo sucesso o retorno do código 201.

*Teste 05 – Deleção de uma justificativa*
Nele testamos se é possível remover uma justificativa, para isso foi criado um nova justificativa e clicado no botão de excluir, tento sucesso retornando o código 204.
