const mapContent = (node: any) => {
  return (node.content || []).map(child => {
    switch (child.type) {
      case 'mention':  // Hipchat expects a 'text'-field for mentions
        return {
          type: 'mention',
          text: child.attrs.text,
          attrs: child.attrs
        };

      case 'emoji':
        return {
          type: 'emoji',
          attrs: child.attrs,
          text: child.attrs.fallback
        };

      case 'text':  // Hipchat expects text nodes to always have a marks array
        const marks = (child.marks || []).map(mark => {
          switch (mark.type) {
            case 'link':
              return {
                type: 'link',
                attrs: {
                  url: mark.attrs.href
                }
              };
            default:
              const { type, attrs } = mark;
              return attrs ? { type, attrs } : { type };
          }
        });

        return {
          type: 'text',
          text: child.text,
          marks
        };

      case 'hardBreak': // Hipchat expects hard breaks to be text
        return {
          type: 'text',
          text: '\n',
          marks: []
        };
    }

    return null;
  });
};

export default function(doc: any) {
  let content: any = [];
  doc.content.forEach(node => content = [...content, ...(content.length > 0 ? [{ type: 'text', 'text': '\n', marks: [] }] : []), ...mapContent(node)] );
  return content;
}
