// Import `SimpleGit` types and the default function exported from `simple-git`
import simpleGit, { SimpleGit } from "simple-git";
const git: SimpleGit = simpleGit();

main();
async function main() {
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
