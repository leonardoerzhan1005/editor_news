import sanitizeHtml from 'sanitize-html';

export const sanitize = (html: string) => {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img', 'iframe', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot'
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['style', 'class'],
      'img': ['src', 'width', 'height'],
      'iframe': ['src', 'width', 'height', 'allowfullscreen', 'frameborder'],
      'td': ['colspan', 'rowspan'],
      'th': ['colspan', 'rowspan'],
    },
  });
};
