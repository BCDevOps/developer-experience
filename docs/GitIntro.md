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

