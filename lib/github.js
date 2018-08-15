const git=require('github-client');
const github;
module.exports={
  login:(_password) => {
    github=git.new({
      username:'marchuanv',
      password: _password
    });
  }
};
