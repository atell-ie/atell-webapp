# Auditor PWA Application

### Native App to PWA Migration Notes
- Latest MUI v5
- Upgraded React-Router-Dom to v6
- Replaced filesystem with base64 img saved to IndexDB

### Automated deployment

When merging with main branch the following steps are triggered:
#### DEV
- Version <b>workflows/action.yml</b> is executed, which bumps package.json version and outputs [REALEASE] 0.0.v to workflow console
- In turn <b>workflows/main_auditor-pwa-webapp-dev.yml</b> is triggered based on [RELEASE] msg and deploys pwa build directly to Azure AppService: <b>auditor-pwa-webapp-dev</b>.

#### QA
To run QA build. Navigate to Actions -> select <b>Deploy Auditor-PWA QA</b> from the tab menu -> Execute workflow.</br>
GitHub action is configure to push 2x Docker images. One taggest with :latest and the other one with :[RELEASE] version. Image tagged with latest version is overwritten with every push, but [RELEASE] version is kept as a rollback option.
