import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/shared';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
