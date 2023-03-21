import awsconfig_prod from 'assets/awsconfig/aws-exports-prod';
import awsconfig_dev from 'assets/awsconfig/aws-exports-dev';

const awsconfig = process.env.NODE_ENV==='production' ? awsconfig_prod : awsconfig_dev;

export default awsconfig;
