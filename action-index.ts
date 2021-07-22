import * as core from "@actions/core";
import * as github from "@actions/github";
// Import `SimpleGit` types and the default function exported from `simple-git`
import simpleGit, { SimpleGit } from "simple-git";
const git: SimpleGit = simpleGit();

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello --=${nameToGreet}=--`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2);
  // console.log(`The event payload: ${payload}`);

  async function main() {
    const status1 = await git.status();
    console.log(status1);
    await git.checkout("master");
    await git.checkoutLocalBranch("branch-a");
    await git.merge(["branch-b"]);
    const status = await git.status();
    const log = await git.log(["-4"]);
    await git.checkout("master");
    await git.deleteLocalBranch("branch-a", true);
    console.log(status);
    console.log(log);
  }
  main();
} catch (error) {
  core.setFailed(error.message);
}
