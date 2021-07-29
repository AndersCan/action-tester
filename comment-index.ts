import * as core from "@actions/core";
import * as github from "@actions/github";

main();

async function main() {
  try {
    const message = core.getInput("comment-message", { required: true });
    const github_token = core.getInput("github-token", { required: true });
    const requiredPullRequestUser = core.getInput("required-pr-creator", {
      required: true,
    });
    console.log(JSON.stringify(github.context, null, 2));

    const { pull_request: pr } = github.context.payload;
    if (github_token.length !== 40) {
      core.warning(
        `github_token is not expected length 40. Was ${github_token.length}`
      );
    }
    const context = github.context;
    const pull_request_number = context.issue.number;

    if (pull_request_number == null) {
      core.setFailed(
        "No pull_request_number found. Must be run on `pull_request`"
      );
      return;
    }

    if (requiredPullRequestUser !== "*") {
      const isRequiredUser = pr.user.login === requiredPullRequestUser;
      if (!isRequiredUser) {
        const notRequiredPrCreatorMessage = `'${pr.user.login}' does not match required-pr-creator '${requiredPullRequestUser}'`;

        core.info(notRequiredPrCreatorMessage);
        core.setOutput("result", notRequiredPrCreatorMessage);

        return;
      }
    }

    core.info(`current pullrequest: ${pull_request_number}`);

    const octokit = github.getOctokit(github_token);
    const new_comment = octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request_number,
      body: message,
    });
    await new_comment;
    core.setOutput("success", true);
    core.setOutput("result", "successfully commented");
    console.log(JSON.stringify(new_comment, null, 2));
  } catch (error) {
    core.setOutput("result", `Error: ${error.message}`);
    core.setFailed(error.message);
  }
}
