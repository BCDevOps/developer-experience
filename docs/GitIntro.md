---
resourceType: Documentation
personas: 
  - Product Owner
  - Designer
tags:
  - git
  - github
  - issues
  - questions
description: A non-technical introduction to Git
---

# A Non-Technical Introduction to Git

Here at the lab, the teams use git for the storage and sharing of all sorts of information - code, mostly, but an enormous amount of our documentation and collaboration lives on Github as well.
This can sometimes be a problem for non-technical members of the lab and teams. Many of the resources for learning git are not aimed at non-technical users, and finding out how to perform a few simple tasks with git can be very intimidating!
To that end, here is a quick and easy introduction to using git for our non-technical team members. We want you to feel confident in your ability to collaborate with everyone!

## What is Git?

Git is a version control system. It provides two key services to users:
1. It allows multiple users to work on the same repository at the same time without (much) concern about interfering with each others' work.
2. It allows users to view and return to previous versions of the repository.

A **repository** a collection of files and folders that (usually) represents one specific project or application. 
In the BC Government, the vast majority of our repositories are each for one application. However, we do have some repositories that serve other purposes (and do not always contain code). For example, we have several repositories that are used for documentation.

**Github** is a place for people to store and share these repositories in one central location, allowing code (or other content) to be accessed quickly and easily across the whole team.
Github is open-source, meaning that the public is able to view all of the content you put in your repository.
All of the lab teams use Github to store their code. Being open-source is a requirement of being a part of the lab.

## Workflows and Branches

We'll get started with setting you up to use git in just a moment - first, you need to understand what a "workflow" is in git.

Git performs those two key services (mentioned above) through something called **branches**. You can think of a branch like this:

Imagine that you have a master Word document on your H: drive. You decide that you want to try changing the layout, so you make a copy of it and get to work. You make this copy because, if you decide that you don't want to use the new layout, you don't have to do any work to change back - you just delete the copy.
Now imagine that, while you're working on your layout changes, someone else on your team wants to go change the content of the same file to update some of the information in it. They also make a copy to do this work.
A branch is like each of these copies, with one important difference - a branch can be **merged** back into the original, master copy. This means that, so long as your work doesn't directly affect the content being changed by your coworker, the branch could merge them both together without having to involve you in messy attempts to try to put that work together manually.

It's this merge functionality that makes git so useful (among other things!)

There are a large number of ways to organize your branches. We at the lab use a relatively simple, straightforward method called **Github Flow**.
Github Flow means that you have one master branch to which you never make direct edits. Instead, if you want to make a change, you make a branch. Each and every feature should make its own branch, and each branch should be made directly from the master branch.
There is an amazing in-depth explanation (with graphics!) of Github Flow available [here](https://guides.github.com/introduction/flow/).

In short, this means there are two things to keep in mind when you're making changes to things using git:
1. Make a new branch for each new 'feature' you are adding.
2. Always make your branch from master, rather than from another branch.

When you're looking at branches that already exist and are wondering how to read them, keep these rules in mind as well - it will help you to understand what they are.

Lastly, make sure your branch-name is very clear. Include: your name (or username), the type of change you're making (feature, bug-fix, etc), and a short but clear indication of the purpose of the branch.
For example, this document was originally written under the branch name `cailey/docs/git-intro`. 

## Installing git

You can find a great walkthrough of how to install git on your preferred OS [here](https://www.atlassian.com/git/tutorials/install-git).

This document will, for now, include instructions for only the terminal. GUI options may be added later. For now, if you plan to follow this doc, don't bother with the Sourcetree option.

## Setting Up Your Local Machine

You should start by finding a place to store your repositories. I highly recommend just creating a folder on your H: drive (or somewhere similar) called `repos`.

Now, open your command prompt or terminal and navigate to your new folder!

Once there, you can type `git --version` to make sure you have git installed properly.

### How Do I Navigate the Terminal?!

Like when you use Windows Explorer or Finder, you will find yourself in a specific folder when you're in the terminal, and you can move around from folder to folder using commands (instead of just clicking).

* Typing `ls` on Mac or `dir` on Windows will show you what that folder contains.
* Typing `cd foldername` will move you into that folder.
* Typing `cd ..` will move you up one folder.

So, assuming you put your repo in `H:\repos`, type `cd H:` and then `cd repos` to get into your new folder!

## Getting a Repo

First, before you can do anything to edit it, you'll need to download a repo onto your local machine. Begin by navigating to the repository you want on the github website.

There, you'll find a big green button that says `Clone or Download`. When you click on that, make sure the popup window says "Clone with HTTPS" and then copy the address in the box.

Now, return to your terminal (make sure you're in your repo folder!) and type `git clone address-you-just-copied`
It will probably look something like this: `git clone https://github.com/BCDevOps/nr-pipeline-ext.git`

It may ask you to log into Github, and then you should see this:

```
Cloning into 'nr-pipeline-ext'...
remote: Enumerating objects: 76, done.
remote: Counting objects: 100% (76/76), done.
remote: Compressing objects: 100% (68/68), done.
remote: Total 962 (delta 19), reused 21 (delta 6), pack-reused 886
Receiving objects: 100% (962/962), 472.03 KiB | 1.84 MiB/s, done.
Resolving deltas: 100% (623/623), done.
```

Congratulations, you just cloned your first git repo! Now type `ls` or `dir` to see the new folder with all the content in it!

## Making A New Branch

Begin by making sure that you've navigated into the project folder you cloned in the last step. Type `cd repo-name` to get into that folder if you haven't done so already.

Whenever you want to start a new branch, you should begin by checking out the master branch. 
When we say that a branch is **checked out**, this means that this is the branch you're currently working on.
You want to check out master when making a new branch because this means that you are forking your branch from master, instead of from another branch. Remember that Github Flow dictates that you should always fork from master!
If you've just cloned your repository, you won't need to do this, but let's cover it just in case you're returning to a repo you have already cloned.

Type `git branch` to see a list of all the available branches. The one you currently have checked out will be highlighted, usually in yellow.

If the highlighted branch is already master, then you can skip this step. Otherwise, type `git checkout master` to switch over to your master branch.

Now type `git pull`. The **pull** command downloads all the updates that have been made to your current branch since the last time you pulled (or cloned). 
It's important to pull often - this is how you make sure that your cloned repository is up-to-date with the one on Github!

Now you're ready to make your new branch! Type `git checkout -b branch-name` to create a new branch and check it out at the same time.
Remember to make your branch name highly descriptive (see the `Workflows and Branches` section for more details).

## Making Edits

Make sure that you've either made a new branch or have checked out an existing branch before you make your edits!

Now, using either Windows Explorer or Finder, navigate to the file you want to change. 
If you're planning to edit a markdown file of some kind (and any documentation or readmes on Github are written in markdown), you'll likely want to use a markdown editor. 
You can use Notepad on Windows or TextEdit on Mac, but I would *highly* recommend finding a specialized markdown editor for this purpose. 
I recommend [Typora](https://typora.io/) - it's very much like typing in Word.

As you make your changes, git is aware that there have been edits made to specific files in the repo.
You'll need to group your changes together into a **commit** - each commit is a snapshot of the whole repo, saving its state.
Commits are how Github is able to give you the ability to revert to a previous version of the repository.

In order to create a commit, make sure first that you navigate to the folder containing your cloned repository in command prompt or terminal. Then type the following:

`git add .` to tell git "I want to add all the changed files to my next commit"

`git commit -m 'comment'` to take all the changes and package them up into a single commit. 
You'll need to fill in the comment yourself - you should provide here a concise (preferably 1 sentence) explanation of what changes are contained within this commit.

You can (and should!) use commits liberally. Think of it like saving a Word document - every time you've done enough work to want to save it (like, say, every time you finish a section or paragraph), you should commit that work.

Once you've made all your changes and saved them using your commits, you now need to **push** these changes back up to Github.
This is the opposite of a pull - instead of downloading changes from Github to your local machine, you're uploading changes from your local machine to Github.
Perform a push like this (make sure you've committed all your changes first!):

`git push`

Very simple! And that's it - your changes are now on Github!

## Creating a Pull Request

Of course, just uploading your changes to Github doesn't mean you're done *quite* yet. 
Your changes are still on your personal branch - in order to make them official, you need to merge them to the master branch.
You do this by submitting a Pull Request (often shortened to PR).

So, once again, log onto Github on your browser and navigate to the repo you've just edited. You may notice that your changes aren't visible.
This is because, when you first view a repo, you're looking at the master branch, and your changes aren't there yet.

On about the middle of the page, you'll see a row of buttons. The left-most one should say `Branch: master` on it. Click on this button and it will reveal a list of all the branches that currently exist for this repository.
If you click on your branch name, the button will update to say `Branch: your-branch-name` and you should see a button just to the right that says either `Create Pull Request` or `View #XXX`.
If you see the `View` one, you've already made a PR for this branch. If you see the `Create Pull Request` button, click on it to get started.

Either way, if you click on the button, it will take you to your pull request - either to view the one that already exists, or to create a new one.

Make sure your PR has a clear title and a full description of everything you've changed.

You'll also need to assign reviewers to your PR - on the right-hand side of the PR page, make sure there are names under the `Reviewers` section.
If there isn't anyone listed there (some repos automatically assign reviewers, so you don't need to do this yourself), then click on the `Reviewer` heading and pick someone (preferably multiple someones) to review your changes.
Presumably you know who would make an appropriate reviewer to this repo - it should be someone who owns the repository, or at least works very closely with it.

If you're really not sure, go back to the repo 'homepage' (click on the Code tab near the top, under the repo title) and find the "Contributors" button to learn who contributes often to the repo. They would usually be a great pick for reviewer.

Once you're finished, you need only to wait for them to make a review of your changes and approve it. 
Keep an eye on your PRs by clicking on the `Pull Requests` button on the black bar that's at the top of every Github page.

Often, you can expect your reviewer to provide feedback that must be actioned before your branch can be merged.
If that happens, you can follow all the same steps from the `Making Edits` section all over again - just make sure that you're using the same branch!

Once your reviewer has approved your branch, they may merge it for you or they may expect you to merge your own changes. Check with them if you're not sure what's expected - every team will use slightly different rules for this.

And that's it! You've made your first edit to a Github repository! Congratulations :)
