const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Esses valores têm que ser EXATAMENTE iguais aos que estão no index.html
// (dentro das constantes _c e _b, na seção AUTH).
const email = 'rodrigoecarol@fluxocerto.app';
const novaSenha = 'RodrigoECarolFlyxo2025!';

admin.auth().getUserByEmail(email)
  .then(userRecord => {
    console.log('Usuário encontrado, UID:', userRecord.uid);
    return admin.auth().updateUser(userRecord.uid, { password: novaSenha });
  })
  .then(userRecord => {
    console.log('✅ Senha atualizada com sucesso para:', userRecord.email);
    console.log('Pode fechar este terminal e tentar logar no app de novo.');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Erro ao atualizar a senha:', error.message);
    process.exit(1);
  });
