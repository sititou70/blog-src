const ghpages = require("gh-pages");

console.log("deploying...");

ghpages.publish(
  "public",
  {
    branch: "master",
    repo: "git@github.com:sititou70/sititou70.github.io.git",
  },
  () => {
    console.log("Deploy Completed!");
  }
);
