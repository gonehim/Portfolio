import { SECTION_SCHEMAS, PortfolioSchema, type Portfolio } from './schema.ts';
import type { ProposedEdit } from './parseEdit.ts';

// The real validation gate: whatever Claude proposed gets checked field-by-field
// against the Zod schema for its section, then the whole merged document is
// checked again against PortfolioSchema before this returns. Throws on anything
// that doesn't fit — nothing is written to GitHub unless this function succeeds.
export function applyEdit(current: Portfolio, edit: ProposedEdit): Portfolio {
  const sectionDef = SECTION_SCHEMAS[edit.section];
  if (!sectionDef) {
    throw new Error(`Unknown section: "${edit.section}"`);
  }

  const next = structuredClone(current) as Record<string, unknown>;

  if (edit.mode === 'merge') {
    if (sectionDef.kind !== 'object') {
      throw new Error(`"merge" only applies to object sections, not "${edit.section}".`);
    }
    if (typeof edit.value !== 'object' || edit.value === null || Array.isArray(edit.value)) {
      throw new Error(`"merge" requires an object value for "${edit.section}".`);
    }
    const merged = { ...(next[edit.section] as object), ...(edit.value as object) };
    next[edit.section] = sectionDef.schema.parse(merged);
  } else if (edit.mode === 'append') {
    if (sectionDef.kind !== 'array') {
      throw new Error(`"append" only applies to array sections, not "${edit.section}".`);
    }
    const item = sectionDef.schema.parse(edit.value);
    next[edit.section] = [...(next[edit.section] as unknown[]), item];
  } else if (edit.mode === 'replace') {
    if (sectionDef.kind === 'array') {
      if (!Array.isArray(edit.value)) {
        throw new Error(`"replace" on array section "${edit.section}" requires an array value.`);
      }
      next[edit.section] = edit.value.map((item) => sectionDef.schema.parse(item));
    } else {
      next[edit.section] = sectionDef.schema.parse(edit.value);
    }
  } else {
    throw new Error(`Unknown edit mode: "${edit.mode}"`);
  }

  return PortfolioSchema.parse(next);
}
