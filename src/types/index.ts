export interface IValidationError {
  email?: string | null,
  password?: string | null,
  name?: string | null
}

export interface IExtendedError extends Error {
  status?: number
}