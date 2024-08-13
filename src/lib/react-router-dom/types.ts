import { QueryClient } from '@tanstack/react-query';
import { LoaderFunction } from 'react-router-dom';

export type QueryLoaderFunction = (queryClient: QueryClient) => LoaderFunction;
