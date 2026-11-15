export function csvCell(value) {
  const text = String(value ?? '');
  const trimmed = text.replace(/^[\s\u0000-\u001F]+/, '');
  const isPlainNumber = /^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(trimmed);
  return !isPlainNumber && /^[\s\u0000-\u001F]*[=+@-]/.test(text) ? \`'\${text}\` : text;
}

export function serializeCsv(rows) {
  return rows
    .map((row) => row.map((value) => \`"\${csvCell(value).replace(/"/g, '""')}"\`).join(','))
    .join('\n');
}
