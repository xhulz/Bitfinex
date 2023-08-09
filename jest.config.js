module.exports = {
    // Configurações de diretórios onde os testes estão localizados
    roots: ['./test'],
  
    // Transforma automaticamente os arquivos .js usando babel-jest
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
  
    // Opções adicionais do Jest
    testEnvironment: 'node', // Define o ambiente de teste como Node.js
  
    // Opções de relatórios e saídas
    verbose: true, // Exibe detalhes sobre os testes sendo executados
    testPathIgnorePatterns: ['/node_modules/'], // Ignora diretórios de node_modules
  
    // Outras opções de configuração...
  };