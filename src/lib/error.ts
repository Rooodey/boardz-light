import { ZodSchema } from "zod";

type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: { code: string; message?: string; constraint?: string };
};

export type ActionResult<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<ActionResult<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (err: unknown) {
    if (isPostgresError(err)) {
      const meta = extractPostgresError(err);
      return {
        data: null,
        error: {
          code: "DatabaseError",
          message: meta.detail,
          constraint: meta.constraint,
        },
      };
    }
    return {
      data: null,
      error: { code: "UnknownError", message: "An unknown error occured" },
    };
  }
}

export function isPostgresError(err: unknown): err is {
  code: string;
  constraint_name?: string;
  table_name?: string;
  detail?: string;
} {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    typeof (err as any).code === "string"
  );
}

export function extractPostgresError(err: unknown): {
  code?: string;
  constraint?: string;
  table?: string;
  detail?: string;
} {
  if (typeof err === "object" && err !== null) {
    const e = err as any;

    return {
      code: e.code,
      constraint: e.constraint_name || e.constraint, // fallback
      table: e.table_name || e.table,
      detail: e.detail,
    };
  }

  return {};
}

export function validationError(message = "Error at validating input.") {
  return {
    data: null,
    error: {
      code: "ValidationError",
      message,
    },
  } as const;
}

export function fetchingError(message = "Error at fetching data.") {
  return {
    data: null,
    error: {
      code: "FetchingError",
      message,
    },
  } as const;
}

export function notFoundError(message = "Data not found.") {
  return {
    data: null,
    error: {
      code: "NotFoundError",
      message,
    },
  } as const;
}
