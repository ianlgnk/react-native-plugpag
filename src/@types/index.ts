import type { PlugpagAPI } from './plugpag';
import type { SunmiAPI } from './sunmi';
export * from './plugpag';
export * from './sunmi';

export interface API extends SunmiAPI, PlugpagAPI {}
