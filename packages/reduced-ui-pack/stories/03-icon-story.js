import { storiesOf } from '@kadira/storybook';
import React from 'react';
import AkFieldText from '@atlaskit/field-text';
import Readme, { Code } from '@atlaskit/util-readme';
import icons from '!raw!../dist/icons-sprite.svg';
import '../src/index.less';
import iconIds from '../src/internal/iconIds';
import { name } from '../package.json';

// eslint-disable-next-line react/no-danger
const Spritemap = () => <div dangerouslySetInnerHTML={{ __html: icons }} />;

const iconSetupExample = `import icons from '!raw!${name}/dist/icons-sprite.svg'
...
<body>
  <!-- insert icons-sprite.svg here -->
  <svg focusable="false"><use xlink:href="#ak-icon-activity" /></svg>
</body>
`;
const iconsDesc = (<div>
  <p>
    The <code>icons-sprite.svg</code> file is an SVG sprite sheet, and can be included on your
    page to allow SVG elements to reference it.
  </p>
  <p>Include the sprite sheet on your page and then use one of the SVG snippets below</p>
  <p>Note that the <code>focusable</code> attribute is required for IE11 support.</p>
</div>);
const icons2Desc = (<p>
  This story can be used to check screen reader behaviour on these icons.
</p>);

storiesOf(name, module)
  .add('Icons', () => (
    <Readme component={'reduced-ui-pack'} description={iconsDesc}>
      <Code code={iconSetupExample}>
        <Spritemap />
        <style>
          {`
            .icon-example {
              display: flex;
              align-items: center;
              font-family: monospace;
            }

            .icon {
              width: 24px;
              height: 24px;
              margin: 0 16px;          }
          `}
        </style>
        {
          iconIds.map(iconId => (
            <p className="icon-example">
              <svg focusable="false" className="icon"><use xlinkHref={`#${iconId}`} /></svg>
              {`<svg focusable="false"><use xlink:href="#${iconId}" /></svg>`}
            </p>
          ))
        }
      </Code>
    </Readme>
  ))
  .add('Icons — accessibility check', () => (
    <Readme component={'reduced-ui-pack'} description={icons2Desc}>
      <Spritemap />
      <p>
        <AkFieldText
          isLabelHidden
          type="text"
          placeholder="Focus on me then tab to the button"
        />
      </p>
      <p>
        <button
          type="button"
          className="ak-button ak-button__appearance-primary"
        >
          <svg
            focusable="false"
            style={{
              height: '1.2em',
              width: '1.2em',
            }}
          >
            <use xlinkHref="#ak-icon-add" />
          </svg>
        </button>
      </p>
    </Readme>
  ));
