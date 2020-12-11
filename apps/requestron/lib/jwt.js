const { createAppAuth } = require('@octokit/auth-app');

module.exports = async function createJWT() {

    let buff = new Buffer(process.env.PRIVATE_KEY, 'base64');
    let key = buff.toString('ascii');
    const auth = createAppAuth({
        appId: process.env.APP_ID,
        privateKey: key,
        installationId: process.env.INSTALLATION_ID,
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_TOKEN
    });

  const { token } = await auth({ type: 'installation' });
  return token;
}
