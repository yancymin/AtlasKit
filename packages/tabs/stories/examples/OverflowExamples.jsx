import React from 'react';
import Tabs from '@atlaskit/tabs';
import { akColorN100 } from '@atlaskit/util-shared-styles';
import Lorem from 'react-lorem-component';

export default () => (
  <div
    style={{
      width: 400,
      height: 200,
      margin: '16px auto',
      border: `1px dashed ${akColorN100}`,
      display: 'flex',
    }}
  >
    <Tabs
      tabs={[
        {
          label: 'Constrained height scrolls',
          defaultSelected: true,
          content: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexBasis: '100%',
                overflowY: 'scroll',
              }}
            >
              <p
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: '0 0 auto',
                }}
              >
                This paragraph is testing horizontal overflow to make sure that the
                scroll container stays where it should.
              </p>
              <Lorem />
            </div>
          ),
        },
        {
          label: 'Unconstrained height',
          content: (
            <div>
              <Lorem />
            </div>
          ),
        },
      ]}
    />
  </div>
);
