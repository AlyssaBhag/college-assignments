# Git Workflow
**Note:** This assumes you already cloned the repository locally
## Initial Steps
### Step 1: Navigate to project in terminal
Open your terminal ([git bash](https://git-scm.com/downloads)) and navigate to the project
```bash
cd path/to/project
```

### Step 2: Switch to *develop* branch
**a)** Make sure you're on the develop branch:
```bash
git checkout develop
```
**b)** Pull the latest changes from the remote repo so that your local repo is up to date
```bash
git pull origin develop
```

## Creating a Feature Branch
### Step 3: Create a new feature branch
Choose a task from the Kanban board, create a feature branch.

**Branch Naming Convention**

Branch name should follow this format:
```bash
feature/[task-name]                     *task name should correspond to task on kanban board
```
**Example:**

The following creates a new branch called *feature/enemy-ai*, and changes you to that branch. All your changes/commits for that feature should be on this branch
```bash
git checkout -b feature/enemy-ai        *Make sure you are on develop branch before you run this
```
Now, move the task to *In Progress* on the kanban

## Commiting Your Changes
### Step 4: Add and Commit Changes
After making changes to your code, you need to stage and commit them.

**Stage All changes:**
```
git add .
```
**Commit your changes with a message:**
```
git commit -m "[In Progress] Implement Enemy Ai logic"
```
**(preferable) Message Conventions for commits**
- "[In Progress] *message* - If you're still wokring on the feature
- "[In Testing] *message*"  - When you are testing the feature
- "[For Review] *message*" - When you are done

## Pushing Your Branch
### Step 5: Push Your Feature Branch
```
git pull --rebase origin develop
git push origin feature/enemy-ai
```
This will push your changes to GitHub under the *feature/enemy-ai* branch.

## Create a Pull Request
### Step 6: Create a pull request in GitHub
1. Go to GitHub → Your Repository → Pull Requests → New Pull Request.

2. Select:
    -  Base Branch: develop

    - Compare Branch: feature/enemy-ai

3. Add a description of your changes

4. Submit your pull request.

#### [Creating a pull request in GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

The PR will be reviewed by someone else, and they will merge the changes into the Develop branch