import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';

import {
  defaultI18n,
  i18nShape,
  validateCurrent,
  validateTotal,
} from '../internal/props';
import { Container, ButtonActive, Ellipsis } from '../styled/index';

const MAX_VISIBLE_PAGES = 7;

const range = (start, length) => [...Array(length)].map((_, i) => start + i);

/**
 * Returns an array that represents how the pagination should appear. This
 * array will contain page numbers and ellipsis. For example:
 *
 * pageRange(7, 5, 100) = [1, '...', 4, 5, 6, '...', 100]
 *
 * This method will throw an exception if visible is less than 7. With less
 * than 7 visible pages it can become impossible to navigate the range.
 *
 * @param {number} visible - the maximum amount of visible page slots
 * @param {number} current - the current page
 * @param {number} total - the total amount of pages
 */
export const pageRange = (visible, current, total) => {
  if (visible < 7) {
    throw new Error('cannot create range with visible pages less than 7');
  }
  // only need ellipsis if we have more pages than we can display
  const needEllipsis = total > visible;
  // show start ellipsis if the current page is further away than max - 3 from the first page
  const hasStartEllipsis = needEllipsis && visible - 3 < current;
  // show end ellipsis if the current page is further than total - max + 3 from the last page
  const hasEndEllipsis = needEllipsis && current < (total - visible) + 4;
  if (!needEllipsis) {
    return range(1, total);
  } else if (hasStartEllipsis && !hasEndEllipsis) {
    const pageCount = visible - 2;
    return [1, '...', ...range((total - pageCount) + 1, pageCount)];
  } else if (!hasStartEllipsis && hasEndEllipsis) {
    const pageCount = visible - 2;
    return [...range(1, pageCount), '...', total];
  }
  // we have both start and end ellipsis
  const pageCount = visible - 4;
  return [1, '...', ...range(current - Math.floor(pageCount / 2), pageCount), '...', total];
};

export default class Pagination extends PureComponent {
  static propTypes = {
    /** The page that is currently selected. */
    current: validateCurrent,
    /** Object that sets the values for the previous and next buttons. It should
    have the properties 'prev' and 'next', which should be strings. Defaults to
    'Prev' and 'Next' */
    i18n: i18nShape,
    /** Function to call when the page is changed. It is called with the number
    of the page clicked on. */
    onSetPage: PropTypes.func,
    /** The number of pages to display. */
    total: validateTotal,
  }

  static defaultProps = {
    current: 1,
    i18n: defaultI18n,
    onSetPage() {},
    total: 1,
  }

  onSetPage = page => () => this.props.onSetPage(page)

  render() {
    const { total, current, i18n } = this.props;
    const prevLabel = i18n.prev;
    const prevIsDisabled = current === 1;
    const prevOnClick = this.onSetPage(current - 1);

    const nextLabel = i18n.next;
    const nextIsDisabled = current === total;
    const nextOnClick = this.onSetPage(current + 1);

    return !total ? null : (
      <Container>
        <Button
          appearance="link"
          isDisabled={prevIsDisabled}
          onClick={prevOnClick}
        >
          { prevLabel }
        </Button>

        { pageRange(MAX_VISIBLE_PAGES, current, total)
            .map((pageNum, i) => {
              const isDisabled = pageNum === current;
              const Element = isDisabled ? ButtonActive : Button;
              return pageNum === '...' ?
                <Ellipsis key={i}>...</Ellipsis> :
                <Element
                  isDisabled={isDisabled}
                  key={i}
                  appearance="link"
                  onClick={this.onSetPage(pageNum)}
                >
                  {pageNum}
                </Element>;
            })}

        <Button
          appearance="link"
          isDisabled={nextIsDisabled}
          onClick={nextOnClick}
        >
          { nextLabel }
        </Button>
      </Container>
    );
  }
}
