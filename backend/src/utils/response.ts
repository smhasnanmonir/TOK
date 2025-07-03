import { Context } from "hono";

// Standard API response structure
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Success response helper
export function successResponse<T>(
  c: Context,
  data: T,
  message?: string,
  status: number = 200
) {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };

  if (message) {
    response.message = message;
  }

  return c.json(response, status);
}

// Error response helper
export function errorResponse(c: Context, error: string, status: number = 400) {
  const response: ApiResponse = {
    success: false,
    error,
  };

  return c.json(response, status);
}

// Paginated response helper
export function paginatedResponse<T>(
  c: Context,
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  },
  message?: string
) {
  const response: ApiResponse<T[]> = {
    success: true,
    data,
    pagination,
  };

  if (message) {
    response.message = message;
  }

  return c.json(response);
}

// Validation error response
export function validationErrorResponse(c: Context, errors: string[]) {
  return errorResponse(c, `Validation failed: ${errors.join(", ")}`, 400);
}

// Not found response
export function notFoundResponse(c: Context, resource: string = "Resource") {
  return errorResponse(c, `${resource} not found`, 404);
}

// Unauthorized response
export function unauthorizedResponse(
  c: Context,
  message: string = "Unauthorized"
) {
  return errorResponse(c, message, 401);
}

// Forbidden response
export function forbiddenResponse(c: Context, message: string = "Forbidden") {
  return errorResponse(c, message, 403);
}

// Internal server error response
export function internalServerErrorResponse(
  c: Context,
  message: string = "Internal server error"
) {
  return errorResponse(c, message, 500);
}
