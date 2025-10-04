# LambdaTest Cypress Playground Automation

This repo contains Cypress automation tests for [LambdaTest Selenium Playground](https://www.lambdatest.com/selenium-playground).

## Test Scenarios

1. Drag & Drop Slider (verify slider moves to 95).
2. Input Form Submit with:
   - Accessibility audit (axe + pa11y).
   - Performance audit (Lighthouse).
   - Assertions for success message.

## Features

- Parallel execution on LambdaTest Cloud (Windows 10 Chrome, macOS Catalina Edge).
- Cypress video recordings, screenshots, terminal logs enabled.
- Uses both CSS + XPath selectors.
- Configured with `.gitpod.yml` for Gitpod runs.

## Run Locally

```bash
npm install
npx cypress open
```
