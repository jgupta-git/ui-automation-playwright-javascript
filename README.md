## Tech Stack

Playwright 1.40+ | TypeScript 5.0+ | Node.js 16+ | OrangeHRM Demo

## Overview

Test Target: [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)  
Testing Framework: Playwright with TypeScript  
Architecture: Page Object Model (POM)  
Test Organization: Native Playwright test.describe() with serial execution  
Tagging System: @positive, @negative

\---

## Test Scenarios

### Positive Tests (@positive)

|Scenario|Module|Test Name|
|-|-|-|
|Login with valid credentials|Authentication|loginValidUser|
|Create new employee|Employee Management|createEmployee|
|Search employee by name|Employee Management|searchEmployee|
|Upload employee photo|Employee Management|uploadEmployeePhoto|
|View employee dashboard|Employee Dashboard|checkEmployeeDashboard|
|Download employee report|Reports|downloadEmployeeReport|

### Negative Tests (@negative)

|Scenario|Module|Test Name|
|-|-|-|
|Login with invalid credentials|Authentication|loginInvalidUser|
|Logout functionality|Authentication|logoutUser|

\---

## Project Structure

```
OrangeHRM/
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── README.md                         # This file
├── src/
│   ├── pages/
│   │   ├── login.ts                  # Login page object
│   │   ├── logout.ts                 # Logout page object
│   │   ├── createEmployee.ts         # Employee creation page
│   │   ├── searchEmployee.ts         # Employee search page
│   │   ├── uploadEmployeeImage.ts    # Photo upload page
│   │   ├── checkEmployeeDashboard.ts # Dashboard verification
│   │   └── downloadReport.ts        # Report download page
│   ├── services/
│   │   ├── input.ts                  # Test data and constants
│   │   └── employee-test.ts          # Custom test fixture with employee data
│   └── assets/
│       └── av1.png                   # Sample photo for uploads
└── tests/
    ├── loginLogout.spec.ts           # Authentication tests
    ├── employeeTransactions.spec.ts  # Employee CRUD operations
    └── downloadEmployeeReport.spec.ts # Report download tests
```

## Key Files

### Page Objects (src/pages/)

* login.ts — Loginfunctionality
* logout.ts — Logoutfunctionality
* createEmployee.ts — Employee creation form
* searchEmployee.ts — Employee search and navigation
* uploadEmployeeImage.ts — File upload for employee photos
* checkEmployeeDashboard.ts — Dashboard and profile verification
* downloadReports.ts — Report viewing and download

### Services (src/services/)

* input.ts — Test data, user credentials, employee details
* employee-test.ts — Custom test fixture extending @playwright/test with shared employee data

### Test Files (tests/)

* loginLogout.spec.ts — @positive, @negative authentication scenarios
* employeeTransactions.spec.ts — Sequential employee creation, search, photo upload, dashboard checks
* downloadEmployeeReport.spec.ts — Employee report download/view scenarios

\---

## 📊 Test Reports

View the latest test results with detailed traces and screenshots:

**[Live Playwright Test Report](https://jgupta-git.github.io/ui-automation-playwright-javascript/playwright-report/index.html)**

- ✅ All tests passing
- 📈 Real-time metrics and traces
- 🎬 Screenshots and videos of test execution
\---

## Quick Start

### 1\. Prerequisites

* ✅ Node.js 16+ — Required for Playwright
* ✅ npm 7+ — Package manager
* ✅ Internet connectivity — Tests run against OrangeHRM Demo

### 2\. Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### 3\. Configure Test Data

Edit `src/services/input.ts` to update:

* VALID\_USER — OrangeHRM demo credentials
* EMPLOYEE\_DATA — Employee details for creation tests

```typescript
export class TestData {
  static readonly VALID\_USER = {
    username: "Admin",
    password: "admin123"
  };

  static EMPLOYEE\_DATA = {
    firstName: "John",
    lastName: "Doe",
    employeeId: "12345"
  };
}
```

### 4\. Run Tests

#### Run All Tests

```bash
npx playwright test
```

#### Run Tests by Tag

```bash
# Run only positive tests
npx playwright test --grep @positive

# Run only negative tests
npx playwright test --grep @negative
```

#### Run Specific Test File

```bash
npx playwright test tests/loginLogout.spec.ts
```

#### Run in Debug Mode

```bash
npx playwright test --debug
```

#### Run with Headed Browser (see browser actions)

```bash
npx playwright test --headed
```

### 5\. View Test Reports

```bash
# Generate and open HTML report
npx playwright show-report
```

\---

## Test Execution Flow

### Sequential Employee Tests (employeeTransactions.spec.ts)

Tests run in order using `test.describe.serial()`:

1. Create Employee — Creates employee with random ID (shared across tests)
2. Search Employee — Searches for the created employee using same random ID
3. Upload Photo — Uploads photo to the created employee's profile
4. Check Dashboard — Verifies employee appears in dashboard

### Custom Test Fixture (employee-test.ts)

The `employee-test.ts` extends Playwright's test fixture to:

* Generate one random employee ID per test run
* Share the ID across all sequential tests via `test.extend()`
* Initialize test data before test execution

```typescript
// Usage in tests
test('myTest', async ({ page, employeeData }) => {
  // employeeData.id contains shared random ID
  // Consistent across all tests in the run
});
```

\---

## Page Object Model (POM) Pattern

Each page object encapsulates selectors and methods for a specific page:

```typescript
export class loginPage {
  constructor(private page: Page) {}

  async navigateToLogin() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com');
    await this.page.waitForLoadState();
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('username').fill(username);
    await this.page.getByPlaceholder('password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.waitForLoadState('networkidle');
  }
}
```

Benefits:

* Selectors centralized in one place
* Easy to update when UI changes
* Reusable across multiple tests
* Clear separation of concerns

\---

## Test Tagging

Tests use native Playwright tags for organization:

```typescript
test('loginValidUser', async ({ page }) => {
  // Test implementation
});
// Tagged as @positive
```

Tags appear in test name and can be filtered with `--grep`:

```bash
# Run all @positive tests
npx playwright test --grep @positive

# Run all @negative tests  
npx playwright test --grep @negative

# Run tests matching pattern
npx playwright test --grep "loginLogout"
```

\---

## Configuration

### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,  // Disable for serial tests
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: 'html',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: \[
    { name: 'chromium', use: { ...devices\['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices\['Desktop Firefox'] } },
  ],
});
```

\---

## References

* Playwright Docs: [playwright.dev](https://playwright.dev)
* TypeScript: [typescriptlang.org](https://www.typescriptlang.org)
* OrangeHRM Demo: [opensource-demo.orangehrmlive.com](https://opensource-demo.orangehrmlive.com)
* Page Object Model: [selenium.dev/documentation](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

\---

## GitHub Repository

```
https://github.com/jgupta-git/ui-automation-playwright-javascript
```

\---

Last Updated: 2026-10-13 | Built with Playwright • TypeScript • Page Object Model

