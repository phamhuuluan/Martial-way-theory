/**
 * Theory-question starts:
 * - N/.
 * - Câu N.
 * - Câu N
 * - N/. Hỏi:
 */
const QUESTION_START =
  /^\s*(?:\d+\s*\/\.(?:\s*Hỏi\s*:)?|Câu\s+\d+\s*[:.]?)\s*/i;

const QUESTION_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

function normalizeText(text: string): string {
  return text.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function getBlockText(element: Element): string {
  return normalizeText(element.textContent ?? '');
}

function isEmptyBlock(element: Element): boolean {
  if (element.tagName !== 'P') return false;

  const text = getBlockText(element);
  if (text) return false;

  const inner = element.innerHTML
    .replace(/<br\s*\/?>/gi, '')
    .replace(/&nbsp;/gi, ' ')
    .trim();

  return !inner || /^<strong>\s*<\/strong>$/i.test(inner);
}

export function isQuestionNode(element: Element): boolean {
  if (!QUESTION_TAGS.has(element.tagName)) return false;
  return QUESTION_START.test(getBlockText(element));
}

function groupIntoQuestionBlocks(root: HTMLElement): void {
  const blocks = Array.from(root.children).filter(
    (child) => !isEmptyBlock(child)
  );

  const output: Element[] = [];
  let preamble: HTMLDivElement | null = null;
  let currentQuestion: HTMLDivElement | null = null;

  for (const block of blocks) {
    if (isQuestionNode(block)) {
      if (currentQuestion) {
        output.push(currentQuestion);
      }

      currentQuestion = root.ownerDocument.createElement('div');
      currentQuestion.className = 'docx-question';
      block.classList.add('docx-question__heading');
      currentQuestion.appendChild(block);
      continue;
    }

    if (currentQuestion) {
      currentQuestion.appendChild(block);
      continue;
    }

    if (!preamble) {
      preamble = root.ownerDocument.createElement('div');
      preamble.className = 'docx-preamble';
    }
    preamble.appendChild(block);
  }

  if (currentQuestion) {
    output.push(currentQuestion);
  }

  if (preamble) {
    output.unshift(preamble);
  }

  root.replaceChildren(...output);
}

export function formatDocxHtml(html: string): string {
  const doc = new DOMParser().parseFromString(
    `<div id="docx-root">${html}</div>`,
    'text/html'
  );
  const root = doc.getElementById('docx-root');
  if (!root) return html;

  groupIntoQuestionBlocks(root);
  return root.innerHTML;
}
