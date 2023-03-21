# Suindara Mapa

Sistema de prevenção de queimadas e desmatamento no bioma cerrado.

# Passos para implantação
1. Realizar o build da solução via SAM:
    > sam build -p

2. Realizar o deploy guiado via SAM (vide sugestão de valores dos parâmetros ao final):
    > sam deploy --guided
    # URL do mapa
    > MapURL: {map url. Ex: suindara.cerrados.org}

3. Compilar o projeto:
    > npm run build

4. Sincronizar o conteúdo com o bucket S3:
    > aws s3 sync build/ s3://{map url}/

5. No Route 53 (https://console.aws.amazon.com/route53/v2/home):
    - incluir uma zona hospedada para o subdomínio (Ex: suindara.cerrados.org)
    - incluir um registro do tipo A para o subdomínio, tendo como alias a distribuição do CloudFront
    - Anotar os endereços dos registros do tipo NS

6. No registrador de dominio pai (Ex: registro.br), inserir registros do tipo NS para o subdomínio, delegando para os endereços anotados no passo anterior.

7. No Certificate Manager (https://sa-east-1.console.aws.amazon.com/acm/home):
    - Solicitar um certificado público para o subdomínio, com validação via DNS
    - Aceitar a criação de um registro CNAME no Route 53

8. No CloudFront (https://console.aws.amazon.com/cloudfront/home):
Incluir o subdomínio como "Alternate Domain Names (CNAMEs)"
Especificar como "Custom SSL Certificate" o certificado criado no passo anterior
