import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const message = core.getInput("message");
    const github_token = core.getInput("GITHUB_TOKEN");

    const context = github.context;
    const pull_request_number = context.issue.number;
    console.log(JSON.stringify(context, null, 2));
    if (pull_request_number == null) {
      core.setFailed("No pull_request_number found.");
      return;
    }
    console.log({ pull_request_number });
    const octokit = github.getOctokit(github_token);
    const new_comment = octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: pull_request_number,
      body: message,
    });

    await sleep(1000);
    await new_comment;
    core.setOutput("time", "time-output");

    console.log(JSON.stringify(new_comment, null, 2));
  } catch (error) {
    core.setFailed(error.message);
  }
}
function sleep(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
run();
