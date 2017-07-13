import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import * as sinon from 'sinon';

import {
  mergeTextNodes,
  renderTextNodes,
  stringifyTextNodes
} from '../../../src/nodes/text';
import * as markUtils from '../../../src/marks';

describe('Text', () => {

  describe('mergeTextNodes', () => {

    it('should wrap adjecent text nodes in a textWrapper', () => {
      const input = [
        {
          type: 'text',
          text: 'hello '
        },
        {
          type: 'text',
          text: 'world! '
        },
        {
          type: 'mention',
          attrs: {
            id: 'abcd-abcd-abcd',
            text: '@Oscar Wallhult'
          }
        },
        {
          type: 'text',
          text: ' is my name!'
        }
      ];

      expect(mergeTextNodes(input)).to.deep.equal([
        {
          type: 'textWrapper',
          content: [
            {
              type: 'text',
              text: 'hello '
            },
            {
              type: 'text',
              text: 'world! '
            }
          ]
        },
        {
          type: 'mention',
          attrs: {
            id: 'abcd-abcd-abcd',
            text: '@Oscar Wallhult'
          }
        },
        {
          type: 'textWrapper',
          content: [
            {
              type: 'text',
              text: ' is my name!'
            }
          ]
        }
      ]);
    });
  });

  describe('stringifyTextNodes', () => {
    it('should concatenate all the text nodes into a string', () => {
      const textNodes = [
        {
          type: 'text',
          text: 'Hello '
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'strong'
            }
          ]
        }
      ];
      expect(stringifyTextNodes(textNodes)).to.equal('Hello World!');
    });
  });

  describe('renderTextNodes', () => {
    it('should wrap text nodes with marks', () => {
      const textNodes = [
        {
          type: 'text',
          text: 'Hello '
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'strong'
            }
          ]
        }
      ];

      const output = shallow(<div>{renderTextNodes(textNodes)}</div>);
      expect(output.html()).to.equal('<div>Hello <strong>World!</strong></div>');
    });

    it('should order marks', () => {
      const textNodes = [
        {
          type: 'text',
          text: 'Hello ',
          marks: [
            {
              type: 'strong'
            },
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        }
      ];

      const spy = sinon.spy(markUtils, 'getMarksByOrder');
      renderTextNodes(textNodes);
      expect(spy.calledWith(textNodes[0].marks)).to.equal(true);
      spy.restore();
    });

    it('should join adjecent text nodes with same marks', () => {
      const textNodes = [
        {
          type: 'text',
          text: 'Hello ',
          marks: [
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'strong'
            },
            {
              type: 'link',
              attrs: {
                url: 'https://www.atlassian.com'
              }
            }
          ]
        }
      ];

      const output = mount(<div>{renderTextNodes(textNodes)}</div>);
      expect(output.find('a').length).to.equal(1);
      expect(output.find('a').first().text()).to.equal('Hello World!');
      expect(output.find('a').first().props()).to.have.property('href', 'https://www.atlassian.com');
      expect(output.find('a').find('strong').first().text()).to.equal('World!');
    });
  });

  it('should be able to render text nodes with multiple marks', () => {
    const textNodes = [
      {
        type: 'text',
        text: 'Hello ',
        marks: [
          {
            type: 'strong',
          }
        ]
      },
      {
        type: 'text',
        text: 'World!',
        marks: [
          {
            type: 'strong'
          },
          {
            type: 'em'
          },
          {
            type: 'underline'
          }
        ]
      }
    ];

    const output = mount(<div>{renderTextNodes(textNodes)}</div>);
    expect(output.childAt(0).is('Strong')).to.equal(true);
    expect(output.childAt(0).text()).to.equal('Hello ');
    expect(output.childAt(1).is('Em')).to.equal(true);
    expect(output.childAt(1).childAt(0).is('Strong')).to.equal(true);
    expect(output.childAt(1).childAt(0).childAt(0).is('Underline')).to.equal(true);
    expect(output.childAt(1).text()).to.equal('World!');
  });

  it('should not join adjecent nodes with same mark type when attributes are not the same', () => {
    const textNodes = [
      {
        type: 'text',
        text: 'Hello',
        marks: [
          {
            type: 'link',
            attrs: {
              url: 'https://www.atlassian.com'
            }
          }
        ]
      },
      {
        type: 'text',
        text: 'World!',
        marks: [
          {
            type: 'link',
            attrs: {
              url: 'https://www.hipchat.com'
            }
          }
        ]
      }
    ];

    const output = mount(<div>{renderTextNodes(textNodes)}</div>);
    expect(output.find('a').length).to.equal(2);
    expect(output.find('a').first().text()).to.equal('Hello');
    expect(output.find('a').first().props()).to.have.property('href', 'https://www.atlassian.com');
    expect(output.find('a').last().text()).to.equal('World!');
    expect(output.find('a').last().props()).to.have.property('href', 'https://www.hipchat.com');
  });

  it('should not join nodes with same mark type if they are not adjecent', () => {
    const textNodes = [
      {
        type: 'text',
        text: 'Hello',
        marks: [
          {
            type: 'link',
            attrs: {
              url: 'https://www.atlassian.com'
            }
          }
        ]
      },
      {
        type: 'text',
        text: ' '
      },
      {
        type: 'text',
        text: 'World!',
        marks: [
          {
            type: 'link',
            attrs: {
              url: 'https://www.atlassian.com'
            }
          }
        ]
      }
    ];

    const output = mount(<div>{renderTextNodes(textNodes)}</div>);
    expect(output.find('a').length).to.equal(2);
    expect(output.find('a').first().text()).to.equal('Hello');
    expect(output.find('a').first().props()).to.have.property('href', 'https://www.atlassian.com');
    expect(output.find('a').last().text()).to.equal('World!');
    expect(output.find('a').last().props()).to.have.property('href', 'https://www.atlassian.com');
  });

  it('should replace text nodes that only contains "\\n" with a hard break', () => {
    const textNodes = [
      {
        type: 'text',
        text: 'Hello'
      },
      {
        type: 'text',
        text: '\n'
      },
      {
        type: 'text',
        text: 'World'
      }
    ];

    const output = mount(<div>{renderTextNodes(textNodes)}</div>);
    expect(output.find('br').length).to.equal(1);
  });

  it('should render link-marks that is missing protocol', () => {
    const textNodes = [
      {
        type: 'text',
        text: 'www.atlassian.com'
      },
      {
        type: 'text',
        text: 'link',
        marks: [
          {
            type: 'link',
            attrs: {
              href: 'www.atlassian.com'
            }
          }
        ]
      }
    ];

    const output = mount(<div>{renderTextNodes(textNodes)}</div>);
    expect(output.find('a').length).to.equal(1);
    expect(output.find('a').first().props()).to.have.property('href', '//www.atlassian.com');
  });

  it('should not render link-marks that starts with "javascript:"', () => {
    const textNodes = [
      {
        type: 'text',
        text: 'Click this '
      },
      {
        type: 'text',
        text: 'link',
        marks: [
          {
            type: 'link',
            attrs: {
              href: 'javascript:alert("Hello world!")'
            }
          }
        ]
      }
    ];

    const output = mount(<div>{renderTextNodes(textNodes)}</div>);
    expect(output.find('a').length).to.equal(0);
  });

});
