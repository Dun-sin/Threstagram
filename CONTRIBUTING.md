## Rules

- Don't create a pull request on an issue that doesn't exist, create an issue first and if the changes you are proposing are said to be okay, you can go ahead and create a pull request

- Don't work on anything unless you are assigned, if you make a pull request without being assigned to that issue, it will be closed without being merged

- Don't work on more than one issue at a time, this is so that you don't make a huge pull request and others can have opportunities to work on another issue while you work on something else

- Do read the `readme.md` file

- Add the Issue you worked on in your Pull Request 

- Don't work on the main branch, create your own branch by following the instructions [here](https://github.com/Dun-sin/Threstagram/blob/main/CONTRIBUTING.md#-how-to-make-a-pull-request)

- Don't commit the lock files eg package.json

- Fill out issue and pull request(PR) templates properly, if you don't know how, check out previous issues/PR to know how they are filled or this video👇🏾

#### 👌🏾 How to fill a pull request template
[pull request template.webm](https://user-images.githubusercontent.com/78784850/195570788-05a6fe61-a9a3-4abe-ae17-936ffd6ea171.webm)

> # Note: Breaking any of the rules above👆🏽 will get your PR rejected

## 👩🏽‍💻 Prerequisite Skills to Contribute

### Contribute to the project

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 💥 How to Contribute

- Take a look at the existing [Issues](https://github.com/Dun-sin/Threstagram/issues) or [create a new issue](https://github.com/Dun-sin/Threstagram/issues/new/choose)!
- [Fork the Repo](https://github.com/Dun-sin/Threstagram/fork). Then, create a branch for any issue that you are working on. Finally, commit your work.
- Create a [Pull Request](https://github.com/Dun-sin/Threstagram/compare) (PR), which will be promptly reviewed and given suggestions for improvements by the community.
- Add screenshots or screen captures to your Pull Request to help us understand the effects of the changes proposed in your PR.

---

## 🌟 HOW TO MAKE A PULL REQUEST:

1. Start by making a Fork of the [Threstagram](https://github.com/Dun-sin/Threstagram) repository. Click on the <a href="https://github.com/Dun-sin/Threstagram/fork"><img src="https://i.imgur.com/G4z1kEe.png" height="21" width="21"></a>Fork symbol at the top right corner.

2. Clone your new fork of the repository in the terminal/CLI on your computer with the following command:

```bash
git clone https://github.com/<your-github-username>/Threstagram
```

3. Navigate to the newly created Threstagram project directory:

```bash
cd Threstagram
```

4. Set upstream command:

```bash
git remote add upstream https://github.com/Dun-sin/Threstagram.git
```

5. Create a new branch:

```bash
git checkout -b YourBranchName
```

6. Sync your fork or your local repository with the origin repository:

- In your forked repository, click on "Fetch upstream"
- Click "Fetch and merge"

### Alternatively, Git CLI way to Sync forked repository with origin repository:

```bash
git fetch upstream
```

```bash
git merge upstream/main
```

### [Github Docs](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) for Syncing

7. Make your changes to the source code.

8. Stage your changes and commit:

⚠️ Make sure not to commit package.json or package-lock.json file

```bash
git cz
```

9. Push your local commits to the remote repository:

```bash
git push origin YourBranchName
```

10. Create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)!

11. Congratulations! You've made your first contribution to [Threstagram](https://github.com/Dun-sin/Threstagram/graphs/contributors)!

🏆 After this, the maintainers will review the PR and will merge it if it helps move the Threstagram project forward. Otherwise, it will be given constructive feedback and suggestions for the changes needed to add the PR to the codebase.

---

## How to add a theme
- create an issue with an image of the theme, don't add the theme unless you are assigned to the issue
- add the theme in it's respective theme file, if it's a light theme add to the `lightDesign.tsx` and export it but not default
- use a number to name the theme e.g `light-1`, if `light-1` already exists go with the next number `light-2` etc
- code the preview in `themes/index.tsx`, copy it and adjust to how it should look in the respective design type eg the `lightDesign.tsx` file
- call it in the switch statement in `DisplayTheme.tsx`

## 💥 Issues

In order to discuss changes, you are welcome to [open an issue](https://github.com/Dun-sin/Threstagram/issues/new/choose) about what you would like to contribute. Enhancements are always encouraged and appreciated.
