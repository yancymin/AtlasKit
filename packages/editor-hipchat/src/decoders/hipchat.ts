const mapContent = (content: any) => {
  return content.map(child => {
    switch (child.type) {
      case 'mention':
        const attrs = child.attrs.displayName ? { ...child.attrs, text: child.text } : child.attrs;
        return {
          type: 'mention',
          attrs
        };

      case 'emoji':
        return {
          type: 'emoji',
          attrs: child.attrs
        };

      case 'text':
        if (child.text === '\n') {
          return {
            type: 'hardBreak'
          };
        }

        const marks = (child.marks || []).map(mark => {
          switch (mark.type) {
            case 'link':
              return {
                type: 'link',
                attrs: {
                  href: mark.attrs.url
                }
              };
            default:
              const { type, attrs } = mark;
              return attrs ? { type, attrs } : { type };
          }
        });

        return marks && marks.length > 0 ? { type: 'text', text: child.text, marks } : { type: 'text', text: child.text };
    }

    return null;
  });
};

export default function(value: any) {
  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: (value && value.length ? mapContent(value) : [{ type: 'text', text: ' ' }])
      }
    ]
  };
}
