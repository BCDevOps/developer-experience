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
* Typing `cd [foldername]` will move you into that folder.
* Typing `cd ..` will move you up one folder.

So, assuming you put your repo in `H:\repos`, type `cd H:` and then `cd repos` to get into your new folder!

## Getting a Repo

First, before you can do anything to edit it, you'll need to download a repo onto your local machine. Begin by navigating to the repository you want on the github website.

There, you'll find a big green button that says `Clone or Download`. When you click on that, make sure the popup window says "Clone with HTTPS" and then copy the address in the box.

Now, return to your terminal (make sure you're in your repo folder!) and type `git clone [address you just copied]`
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
