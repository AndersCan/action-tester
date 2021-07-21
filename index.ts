// Import `SimpleGit` types and the default function exported from `simple-git`
import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();

main()
async function main() {
  
  const status = await git.status()
  
  console.log(status)
}