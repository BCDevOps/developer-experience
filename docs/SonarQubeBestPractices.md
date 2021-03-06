---
title: SonarQube Best Practices
resourceType: Documentation
personas: 
  - Developer
  - Product Owner
  - Designer
tags:
  - openshift
  - SonarQube
  - security
  - scanning
  - static
  - vulnerability
  - project
  - devops
description: SonarQube Best Practices
---

# SonarQube Best Practices
### Installation options, configurations and why you should care

## What is SonarQube?
[SonarQube](http://www.sonarqube.org/)® is an automatic code review tool to detect bugs, vulnerabilities, and code smells in your code. It can integrate with your existing workflow to enable continuous code inspection across your project branches and pull requests.

When a piece of code does not comply with a rule, an issue is logged on the snapshot.  An issue can be logged on a source file or a unit test file. 

There are 3 types of issues: **Bugs**, **Code** **Smells** and **Vulnerabilities**.

| Issue                                                        | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Bug                                                          | A ***reliability-related*** issue that represents something wrong in the code. If this has not broken yet, it will, and probably at the worst possible moment. This needs to be fixed. Yesterday. |
| Code Smell                                                   | A ***maintainability-related*** issue in the code. Leaving it as-is means that at best maintainers will have a harder time than they should making changes to the code. At worst, they'll be so confused by the state of the code that they'll introduce additional errors as they make changes. |
| Vulnerability                                                | A ***security-related*** issue which represents a backdoor for attackers. See also [Security-related rules](https://docs.sonarqube.org/latest/user-guide/security-rules/). |
| [Security  Hotspot](https://docs.sonarqube.org/latest/user-guide/security-hotspots/) | Security-sensitive pieces of code that need to be manually reviewed. Upon review, you'll either find that there is no threat or that there is vulnerable code that needs to be fixed. |

**Coverage** (coverage)
It is a mix of Line coverage and Condition coverage. Its goal is to provide an even more accurate answer to the following question: How much of the source code has been covered by the unit tests?

**Condition coverage** (branch_coverage)
On each line of code containing some boolean expressions, the condition coverage simply answers the following question: 'Has each boolean expression been evaluated both to true and false?'. This is the density of possible conditions in flow control structures that have been followed during unit tests execution.

**Line coverage** (line_coverage)
On a given line of code, Line coverage simply answers the following question: Has this line of code been executed during the execution of the unit tests?  It is the density of covered lines by unit tests:
Line coverage = LC / EL
where LC = covered lines (lines_to_cover - uncovered_lines)
            EL = total number of executable lines (lines_to_cover)

More details on coverage can be found here:
- https://docs.sonarqube.org/latest/analysis/coverage/

  

# **SonarQube (local install)** - [link](https://developer.gov.bc.ca/SonarQube-on-OpenShift)

#### Quality Profiles

Sets of rules to check against the source code for things such as: programming errors, bugs, stylistic errors, complexity concerns, and suspicious constructs. These are the ones included by default

\-     *Sonar way* 
             o  default for each language, intended to be expanded upon

\-     *Sonar way recommended* 
             o  only for Typescript and Javascript. Has ~50% more rules. Extremely limited security benefit as most are formatting/verb based and do not fall under the OWASP Top 10, SANS Top 25 or CWE controls areas.

\-     *Extended rules* 
            o  you can create custom rules, but the base sets give pretty good coverage for what is meant as an assessment for common static vulnerabilities

 

#### Pipeline integration
Details on pipeline integration can be found at https://docs.sonarqube.org/latest/analysis/branch-pr-analysis-overview/
NOTE: *Merge/Pull request analysis requires the Developer, Enterprise, or Data Centre Edition (paid)*

 

#### Local clone scan
If you do scan against a local clone of the repository on your workstation or laptop, you may need to install additional packages for the scans to perform successfully (e.g. `**npm install typescript`** into the base scan directory).
If you don’t, SonarQube will not be able to perform analysis for that language

 

#### Quality Gates
Based on the results obtained through the scan, the scan will either Pass or Fail. Quality Gates help determine the desired threshold for your code. These are set in both local and cloud-based builds. There is a default quality gate, shown below, which should be applicable for *clean as you code* development cycles.  https://docs.sonarqube.org/latest/user-guide/quality-gates/

##### Conditions on New Code 
`(Sonar way default quality gate)`

| Metric                 | Operator        | Value |
| ---------------------- | --------------- | ----- |
| Coverage               | is less than    | 80.0% |
| Duplicated Lines (%)   | is greater than | 3.0%  |
| Maintainability Rating | is worse than   | A     |
| Reliability Rating     | is worse than   | A     |
| Security Rating        | is worse than   | A     |

While these quality gates will not stop a build from going forward, or being promoted to a subsequent environment, any issue that triggers a value beyond the default should be examined. This is especially critical for Bugs and Security issues. 

If security issues are identified in your scan and you are unsure of how to proceed, please contact your [Ministry information security team](https://intranet.gov.bc.ca/thehub/ocio/ocio-enterprise-services/information-security-branch/miso-contacts?) or inquire in the [#infosec](https://chat.developer.gov.bc.ca/channel/infosec) channel on Rocket.Chat.

#### Things to consider…
\-     If you don’t setup for day 0, technical debt will build up and seem unmanageable
\-     Language analyzers are not installed by default!
\-     Make sure to install the language analyzers for code in your repositories
     o  Administration > Marketplace 
     o  Don’t install/run them all if you don’t need to. Only having the languages enabled you need to assess reduces check time and chance of error when running the scans
\-     Use secret scanning integration with the Source Code Management (SCM) system to prevent secrets from getting pushed to the repo before SonarQube even has a chance to see them. This is available on GitHub by default for public repos (https://docs.github.com/en/code-security/secret-security/about-secret-scanning).

Infrastructure as Code (IoC) analysis is NOT covered by SonarQube (e.g. Ansible, Terraform)

For IoC analysis, please investigate solutions such as:
\-   https://geekflare.com/iac-security-scanner/ - Checkov, TFLint, Terrafirma, Accurics, CloudSploit
\-   https://snyk.io/product/infrastructure-as-code-security/ 


# **SonarCloud – the easier way** - [link](https://developer.gov.bc.ca/SonarQube-on-OpenShift#sonarcloud)

 The default way requires a *`.sonarcloud.properties*` file. This method will work for [Monorepos](https://sonarcloud.io/documentation/analysis/setup-monorepo/) (maintaining multiple separate projects within a single large repository).

https://sonarcloud.io/documentation/integrations/github/

[Automatic Analysis](https://sonarcloud.io/documentation/analysis/automatic-analysis/) makes it REALLY EASY but has some limitations. 

Namely,

\-     This will not work for Monorepos

\-     Compiled languages cannot be analyzed

\-     Import of external rule engine reports unsupported

\-     Only available for GitHub

\-     Additionally, only select languages are supported

The benefits are that setup is minimal: No properties file, excluded directories are still supported

Please be aware, the free version of SonarCloud only allows for analysis of public repositories. If you need to be able to assess private repositories, you will need to investigate the paid version. Also, **SonarCloud takes a copy of the GitHub code and analyses it.** This should be considered if there are sensitivities within your repo that you do not want disclosed outside of the GitHub private repo (in this case, it may be better to use the local install).

  

# **Why are we doing this?**

Remember that Static Application Security Testing (SAST), is just a piece of the puzzle. The main driver for these tools is to help ensure clean code and adherence to code standards which allows for easier insight into how the code base works. Less confusion -> better understanding -> less error prone. 

In our toolset, [OWASP ZAP](https://developer.gov.bc.ca/OWASP-ZAP-Security-Vulnerability-Scanning) can supplement SonarQube’s static code analysis with Dynamic Application Security Testing (DAST), and JFrog Xray (part of Artifactory) will provide Software Composition Analysis (SCA). Aqua will also analyze container images (CVA) based on aggregate sources of vulnerability data (CVEs, vendor advisories, and proprietary research), find malware, embedded secrets, OSS licenses, and configuration issues to further reduce the attack surface.

While Interactive Application Security Testing (IAST) tools are top tier for following context and identifying issues in white-box testing, we are not implementing a tool with this capability at this time.

 
