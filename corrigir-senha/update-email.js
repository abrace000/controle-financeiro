const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Troca o e-mail falso por um de verdade, SEM mexer no UID nem na senha —
// isso preserva o vínculo com os dados que já existem no Firestore.
const emailAntigo = 'rodrigoecarol@fluxocerto.app';
const emailNovo = 'rotupe@hotmail.com';

admin.auth().getUserByEmail(emailAntigo)
  .then(userRecord => {
    console.log('Usuário encontrado, UID (será preservado):', userRecord.uid);
    return admin.auth().updateUser(userRecord.uid, { email: emailNovo, emailVerified: true });
  })
  .then(userRecord => {
    console.log('✅ E-mail atualizado com sucesso para:', userRecord.email);
    console.log('UID continua o mesmo:', userRecord.uid);
    console.log('Pode fechar este terminal e testar o login no app.');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Erro ao atualizar o e-mail:', error.message);
    process.exit(1);
  });
