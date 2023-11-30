import { Octokit } from "@octokit/core";

let auth = {
  owner: "",
  repo: ""
}
export const authentification = async (owner: any, repo: any) => {
  console.log(owner, repo)
  auth = {
    owner: owner,
    repo: repo
  }
}

export const InitialRepo = async (token: any, fileName: any, contentBlob: any, message = "FirstCommit") => {
  const octokit = new Octokit({
    auth: token,
  });
  const initialRepo = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: auth.owner,
    repo: auth.repo,
    path: fileName,
    message: message,
    content: contentBlob
  })
  return initialRepo
}

export const GetHead = async (token:any) => {
  console.log(auth)
  const octokit = new Octokit({
    auth: token,
  });
  const head = await octokit.request(
    "GET /repos/{owner}/{repo}/git/matching-refs/{ref}",
    {
      owner: auth.owner,
      repo: auth.repo,
      ref: 'heads',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  );
  return head
}

export const CommitHead = async (token: any,head: any) => {
  const octokit = new Octokit({
    auth: token,
  });
  const commitHead = await octokit.request(`GET ${head.data[0].object.url}`);
  return commitHead
}

// función para poder conseguir el tree relacionado con el commit al que hace referencia el head.

export const TreeCommitHead = async (token: any,commitHead: any) => {
  const octokit = new Octokit({
    auth: token,
  });

  const treeCommitHead = await octokit.request(
    `GET ${commitHead.data.tree.url}`
  );

  return treeCommitHead;
};

export const RecursiveTree = async (token: any,commitHead: any, dir: any) => {
  const octokit = new Octokit({
    auth: token,
  });
  const getRecursiveTree = await octokit.request(
    `GET ${commitHead.data.tree.url}?recursive=1`
  );
  const findTree = getRecursiveTree.data.tree.find((tree: any) => tree.path === dir)
  return findTree
}

// función creadora del arbol correspondiente al archivo para convertilo en Blob.

export const CreateBlob = async (token: any,contentFile: any) => {
  // console.log(contentFile)
  const octokit = new Octokit({
    auth: token,
  });
  const blob = await octokit.request("POST /repos/{owner}/{repo}/git/blobs", {
    owner: auth.owner,
    repo: auth.repo,
    content: contentFile,
  });
  return blob
};


export const CreateTreeDir = async (token: any,tree: any, baseTreeSHA: any) => {
  // console.log(tree)
  const octokit = new Octokit({
    auth: token,
  });
  const createTreeDir = await octokit.request(
    "POST /repos/{owner}/{repo}/git/trees",
    {
      base_tree: baseTreeSHA,
      owner: auth.owner,
      repo: auth.repo,
      tree
    }
  );
  return createTreeDir
}

export const CreateCommit = async (token: any,head: any, TreeHead: any, message: any) => {
  // const octokit = new Octokit({
  //   auth: "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",
  // });
  console.log(token)
  const octokit = new Octokit({
    auth: token,
  });
  const createCommit = await octokit.request(
    "POST /repos/{owner}/{repo}/git/commits",
    {
      parents: [head.data[0].object.sha],
      owner: auth.owner,
      repo: auth.repo,
      message: message,
      tree: TreeHead.data.sha,
    }
  );
  return createCommit
};

export const UpdateRef = async (token: any,createCommit: any) => {
  const octokit = new Octokit({
    auth: token,
  });
  const updateRef = await octokit.request(
    "PATCH /repos/{owner}/{repo}/git/refs/{ref}",
    {
      ref: "heads/main",
      owner: auth.owner,
      repo: auth.repo,
      sha: createCommit.data.sha,
    }
  );
  return updateRef
}
