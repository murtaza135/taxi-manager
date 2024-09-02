import mapValues from 'lodash/mapValues';
import { ReplaceNullWithUndefined, ReplaceType } from '@/types/utils';

export type CreateObjectTransformer<T> = ReplaceType<ReplaceNullWithUndefined<T>, FileList, File>;

export const createObjectTransformer = <T extends object>(data: T) => (
  mapValues(data, (val) => {
    if (!val) return undefined;
    if (Number.isNaN(val)) return undefined;
    if (val instanceof FileList) return val[0] as File | undefined;
    return val;
  }) as CreateObjectTransformer<T>
);
