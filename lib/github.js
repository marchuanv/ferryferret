const git=require('github-client');
module.exports={
  write:(_password, branchName, fileContent, filePath) => {
    const github=git.new({
      username:'marchuanv',
      password: _password
    });
    const repo = github.getRepo('marchuanv', 'ferryferret');
	const message = "auto commit";
	const branch = repo.getBranch("master");
	branch.write(filePath, fileContent, message, false)
	.done(function() {});
  }
};
