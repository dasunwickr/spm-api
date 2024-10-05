import dotenv from "dotenv";
import { Octokit } from "@octokit/rest";
import simpleGit from "simple-git";

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN as string,
});

const git = simpleGit();

// Function to clone a repository from GitHub
export const cloneRepositoryFromGitHub = async (
  owner: string,
  repo: string,
  localPath: string
) => {
  try {
    // Get the repository details
    const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
      owner,
      repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    // Clone URL
    const cloneUrl = data.clone_url;

    // Use simple-git to clone the repository
    await git.clone(cloneUrl, localPath);

    console.log(`Cloned ${owner}/${repo} to ${localPath}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error cloning repository: ${error}`);
      throw new Error(`Failed to clone repository: ${error.message}`);
    }
  }
};
