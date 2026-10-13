import { test as base } from '@playwright/test';
import { EmployeeData, TestData } from './input';

export type TestOptions = {
  employeeData: EmployeeData;
};

export const test = base.extend<{}, TestOptions>({
  employeeData: [
    async ({}, use) => {
      const randomId = Math.floor(Math.random() * 100000);
      TestData.initializeEmployeeData(randomId);
      console.log(`✓ Employee ID initialized: ${randomId}`);
      await use(TestData.EMPLOYEE_DATA);
    },
    { scope: 'worker' }
  ]
});