import { createClient, QueryResult, QueryData, QueryError } from '@supabase/supabase-js';
import { config } from '@/config/config';
import { Database } from '@/types/database';
import { queryClient } from '@/config/api/queryClient';
import { AppError } from '@/config/errors/AppError';

// TODO
// "Failed to fetch" signifies some sort of server error
// const errorMessage = cause?.message.includes('Failed to fetch')
//   ? 'Something went wrong'
//   : message;

export const supabase = createClient<Database>(
  config.VITE_SUPABASE_URL,
  config.VITE_SUPABASE_ANON_KEY,
  {
    global: {
      fetch: async (input, init) => {
        const response = await fetch(input, init);
        if (response.status === 401) {
          localStorage.removeItem('sb-127-auth-token');
          await queryClient.invalidateQueries({ queryKey: ['auth'] });
        }
        return response;
      },
    },
  },
);

type Supabase = typeof supabase;

type BaseReturnType3 = {
  data: unknown;
  error: unknown;
  status?: number;
  statusText?: string;
  count?: number | null;
};

type BaseReturnType2 = {
  status?: number;
  statusText?: string;
  count?: number | null;
} & ({
  data: NonNullable<unknown>;
  error: null;
} | {
  data: null;
  error: NonNullable<unknown>;
});

type BaseReturnType = {
  data: unknown;
  error: unknown;
};

type SupabaseFn<T extends BaseReturnType> = (client: Supabase) => PromiseLike<T>;

type Replace<T, K extends keyof T, R> = Omit<T, K> & { [P in K]: R };

type ReplaceSupabaseDataAndError<T extends BaseReturnType> = Omit<T, 'data' | 'error'> & ({
  data: NonNullable<T['data']>;
  error: null;
} | {
  data: null;
  error: AppError;
});

// eslint-disable-next-line max-len
export const sbClient = async <T extends BaseReturnType = BaseReturnType>(fn: SupabaseFn<T>): Promise<ReplaceSupabaseDataAndError<T>> => {
  const value = await fn(supabase);

  if (value.error) {
    const error = new AppError({ message: 'Temp Error' });
    return { ...value, error } as ReplaceSupabaseDataAndError<T>;
  }

  return value as ReplaceSupabaseDataAndError<T>;
};
