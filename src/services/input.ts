/**
 * Test user credentials
 */
export interface TestUser {
  username: string;
  password: string;
}

export interface EmployeeData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  id: string;
}

export class TestData {
  /**
   * Valid user credentials
   */
  static readonly VALID_USER: TestUser = {
    username: 'Admin',
    password: 'admin123'
  };
  static readonly INVALID_USER: TestUser = {
    username: 'Admin',
    password: 'admin123*'
  };

  static EMPLOYEE_DATA: EmployeeData = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    password: 'password123',
    id: '12345'
  };
  
  static initializeEmployeeData(randomId: number): void {
    const id = randomId.toString();
    this.EMPLOYEE_DATA = {
      firstName: `John${id}`,
      lastName: `Doe${id}`,
      username: `johndoe${id}`,
      password: 'password123',
      id:id.toString()
    };
  }
}
