// Validation utilities for API requests

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation (minimum 8 characters, at least one letter and one number)
export function validatePassword(password: string): boolean {
  return (
    password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)
  );
}

// User registration validation
export function validateUserRegistration(data: any): ValidationResult {
  const errors: string[] = [];

  if (!data.email || !validateEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!data.password || !validatePassword(data.password)) {
    errors.push(
      "Password must be at least 8 characters with letters and numbers"
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// User login validation
export function validateUserLogin(data: any): ValidationResult {
  const errors: string[] = [];

  if (!data.email || !validateEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.password || data.password.length === 0) {
    errors.push("Password is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Product validation
export function validateProduct(data: any): ValidationResult {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push("Product name is required");
  }

  if (!data.price || isNaN(data.price) || parseFloat(data.price) <= 0) {
    errors.push("Valid price is required");
  }

  if (!data.brand || data.brand.trim().length === 0) {
    errors.push("Brand is required");
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.push("Category is required");
  }

  if (
    data.stockQuantity !== undefined &&
    (isNaN(data.stockQuantity) || parseInt(data.stockQuantity) < 0)
  ) {
    errors.push("Stock quantity must be a non-negative number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Order validation
export function validateOrder(data: any): ValidationResult {
  const errors: string[] = [];

  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    errors.push("Order must contain at least one item");
  } else {
    data.items.forEach((item: any, index: number) => {
      if (!item.productId) {
        errors.push(`Item ${index + 1}: Product ID is required`);
      }
      if (
        !item.quantity ||
        isNaN(item.quantity) ||
        parseInt(item.quantity) <= 0
      ) {
        errors.push(`Item ${index + 1}: Valid quantity is required`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Pagination validation
export function validatePagination(
  page: string,
  limit: string
): ValidationResult {
  const errors: string[] = [];

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  if (isNaN(pageNum) || pageNum < 1) {
    errors.push("Page must be a positive number");
  }

  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    errors.push("Limit must be between 1 and 100");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
