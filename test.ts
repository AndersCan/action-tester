// Import `SimpleGit` types and the default function exported from `simple-git`
import simpleGit, { SimpleGit } from "simple-git";
const git: SimpleGit = simpleGit();

main();
async function main() {
  await git.checkout("master");
  await git.checkoutLocalBranch("branch-a");
  const status = await git.status();
  await git.checkout("master");
  await git.deleteLocalBranch("branch-a");
  console.log(status);
}
