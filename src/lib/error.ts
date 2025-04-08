export type Success<T> = {
  data: T;
  error: null;
};

export type Failure = {
  data: null;
  error: {
    code: string;
    message?: string;
    constraint?: string;
  };
};

export type ActionResult<T> = Success<T> | Failure;

type PostgresErrorType = {
  code: string;
  constraint_name?: string;
  constraint?: string;
  table_name?: string;
  table?: string;
  detail?: string;
};

export async function tryCatch<T>(
  promise: Promise<T>,
): Promise<ActionResult<T>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (err) {
    if (isPostgresError(err)) {
      const meta = extractPostgresError(err);
      return {
        data: null,
        error: {
          code: "DatabaseError",
          message: meta.detail ?? "A database error occurred.",
          constraint: meta.constraint,
        },
      };
    }
    return {
      data: null,
      error: {
        code: "UnknownError",
        message: "An unknown error occurred",
      },
    };
  }
}

export function isPostgresError(err: unknown): err is PostgresErrorType {
  return typeof err === "object" && err !== null && "code" in err;
}

export function extractPostgresError(err: unknown): PostgresErrorType {
  const e = err as PostgresErrorType;
  return {
    code: e.code,
    constraint: e.constraint_name ?? e.constraint,
    table: e.table_name ?? e.table,
    detail: e.detail,
  };
}

export function validationError(
  message = "Error at validating input.",
): Failure {
  return {
    data: null,
    error: { code: "ValidationError", message },
  };
}

export function fetchingError(message = "Error at fetching data."): Failure {
  return {
    data: null,
    error: { code: "FetchingError", message },
  };
}

export function notFoundError(message = "Data not found."): Failure {
  return {
    data: null,
    error: { code: "NotFoundError", message },
  };
}
