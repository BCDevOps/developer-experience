# GitHub Awesomer
This is a nodejs based GitHub resource management scripts.

### Prerequisite:
- Node 10+
- npm

### Running:
```shell
cd /github-awesomer
cp .env.sample .env
# fill in the .env file
npm i
npm run inspect
```

## Tasks:
- [x] get inactive users, exclude OPS team
- [x] get updated inactive users that has not yet replied
- [x] devops request organization membership
- [ ] check repos without license, readme and an admin user
- [ ] repo has managed topics
- [ ] repo has expiry date
- [ ] github organization member's profile completeness
