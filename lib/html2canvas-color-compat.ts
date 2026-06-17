/**
 * html2canvas 1.x only parses rgb/rgba/hsl/hsl/hex/named colors.
 * Tailwind v4 opacity modifiers compile to color-mix(in oklab, …), which
 * browsers may expose on getComputedStyle as oklab()/oklch()/color-mix().
 */

const UNSUPPORTED_COLOR_FUNCTION_RE =
  /\b(?:oklab|oklch|color-mix|color)\(/i;

const HTML2CANVAS_SAFE_COLOR_RE =
  /^(?:#[0-9a-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|[a-z]+)$/i;

const SIMPLE_COLOR_PROPERTIES = [
  'color',
  'background-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'text-decoration-color',
  'column-rule-color',
  'caret-color',
  'fill',
  'stroke',
  '-webkit-text-fill-color',
  '-webkit-text-stroke-color',
  'accent-color',
] as const;

const COMPLEX_COLOR_PROPERTIES = ['box-shadow', 'text-shadow'] as const;

let canvasContext: CanvasRenderingContext2D | null = null;

function getCanvasContext(): CanvasRenderingContext2D | null {
  if (typeof document === 'undefined') return null;
  if (!canvasContext) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    canvasContext = canvas.getContext('2d');
  }
  return canvasContext;
}

export function hasUnsupportedColorFunction(value: string): boolean {
  return UNSUPPORTED_COLOR_FUNCTION_RE.test(value);
}

export function needsColorNormalization(value: string): boolean {
  const trimmed = value.trim();
  if (
    !trimmed ||
    trimmed === 'none' ||
    trimmed === 'inherit' ||
    trimmed === 'initial' ||
    trimmed === 'unset' ||
    trimmed === 'currentcolor'
  ) {
    return false;
  }
  if (hasUnsupportedColorFunction(trimmed)) return true;
  return !HTML2CANVAS_SAFE_COLOR_RE.test(trimmed);
}

export function normalizeColorForHtml2Canvas(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || !needsColorNormalization(trimmed)) return trimmed;

  const ctx = getCanvasContext();
  if (!ctx) return trimmed;

  try {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = trimmed;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    if (a === 255) return `rgb(${r}, ${g}, ${b})`;
    const alpha = Math.round((a / 255) * 1000) / 1000;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return trimmed;
  }
}

function extractColorFunctions(value: string): Array<{ start: number; end: number }> {
  const spans: Array<{ start: number; end: number }> = [];
  const pattern = /(?:oklab|oklch|color-mix|color)\(/gi;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value)) !== null) {
    const start = match.index;
    let depth = 0;
    let end = start;

    for (let i = start; i < value.length; i += 1) {
      if (value[i] === '(') depth += 1;
      else if (value[i] === ')') {
        depth -= 1;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }

    spans.push({ start, end });
    pattern.lastIndex = end;
  }

  return spans;
}

export function normalizeColorsInCSSValue(value: string): string {
  if (!value || !hasUnsupportedColorFunction(value)) {
    return needsColorNormalization(value)
      ? normalizeColorForHtml2Canvas(value)
      : value;
  }

  const spans = extractColorFunctions(value);
  if (spans.length === 0) {
    return normalizeColorForHtml2Canvas(value);
  }

  let result = value;
  for (let i = spans.length - 1; i >= 0; i -= 1) {
    const { start, end } = spans[i];
    const original = result.slice(start, end);
    const replacement = normalizeColorForHtml2Canvas(original);
    result = result.slice(0, start) + replacement + result.slice(end);
  }

  return result;
}

function inlineColorsOnElement(original: Element, clone: Element): void {
  if (!(clone instanceof HTMLElement)) return;

  const computed = window.getComputedStyle(original);
  const inlineStyle = clone.style;

  for (const property of SIMPLE_COLOR_PROPERTIES) {
    const value = computed.getPropertyValue(property);
    if (!value) continue;

    if (needsColorNormalization(value)) {
      inlineStyle.setProperty(property, normalizeColorForHtml2Canvas(value));
    }
  }

  for (const property of COMPLEX_COLOR_PROPERTIES) {
    const value = computed.getPropertyValue(property);
    if (!value || value === 'none') continue;

    if (hasUnsupportedColorFunction(value) || needsColorNormalization(value)) {
      inlineStyle.setProperty(property, normalizeColorsInCSSValue(value));
    }
  }
}

export function inlineCompatColorsForHtml2Canvas(
  originalRoot: HTMLElement,
  cloneRoot: HTMLElement
): void {
  const originalNodes = [originalRoot, ...originalRoot.querySelectorAll('*')];
  const cloneNodes = [cloneRoot, ...cloneRoot.querySelectorAll('*')];

  const count = Math.min(originalNodes.length, cloneNodes.length);
  for (let i = 0; i < count; i += 1) {
    inlineColorsOnElement(originalNodes[i], cloneNodes[i]);
  }
}

export function createHtml2CanvasOnClone(originalElement: HTMLElement) {
  return (_document: Document, clonedElement: HTMLElement) => {
    inlineCompatColorsForHtml2Canvas(originalElement, clonedElement);
  };
}

export function collectUnsupportedColors(root: HTMLElement): string[] {
  const issues: string[] = [];

  for (const element of [root, ...root.querySelectorAll('*')]) {
    const computed = window.getComputedStyle(element);

    for (const property of [...SIMPLE_COLOR_PROPERTIES, ...COMPLEX_COLOR_PROPERTIES]) {
      const value = computed.getPropertyValue(property);
      if (value && hasUnsupportedColorFunction(value)) {
        issues.push(`${property}: ${value}`);
      }
    }

    if (element instanceof HTMLElement) {
      for (const property of SIMPLE_COLOR_PROPERTIES) {
        const inlineValue = element.style.getPropertyValue(property);
        if (inlineValue && hasUnsupportedColorFunction(inlineValue)) {
          issues.push(`inline ${property}: ${inlineValue}`);
        }
      }
    }
  }

  return issues;
}
