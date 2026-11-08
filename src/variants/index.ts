import type { VariantName } from '../config';
import { BaselineVariant } from './baseline';
import type { Variant } from './Variant';

/** All available variants. Rest is added later */
const FACTORIES: Record<VariantName, () => Variant> = {
    baseline: () => new BaselineVariant(),
};

/** Creates the variant with the given name. */
export function createVariant(name: VariantName): Variant {
    return FACTORIES[name]();
}