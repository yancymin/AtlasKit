import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Panel from '../../../src/nodes/panel';

describe('<Panel/>', () => {
  context('info', () => {
    const infoPanel = shallow(<Panel type="info">This is a info panel</Panel>);

    it('should wrap content with <div>-tag', () => {
      expect(infoPanel.name()).to.equal('styled.div');
    });

    it('should have two children', () => {
      expect(infoPanel.children()).to.have.length(2);
    });
  });

  context('note', () => {
    const notePanel = shallow(<Panel type="note">This is a note panel</Panel>);

    it('should wrap content with <div>-tag', () => {
      expect(notePanel.name()).to.equal('styled.div');
    });

    it('should have two children', () => {
      expect(notePanel.children()).to.have.length(2);
    });
  });

  context('tip', () => {
    const tipPanel = shallow(<Panel type="tip">This is a tip panel</Panel>);

    it('should wrap content with <div>-tag', () => {
      expect(tipPanel.name()).to.equal('styled.div');
    });

    it('should have two children', () => {
      expect(tipPanel.children()).to.have.length(2);
    });
  });

  context('warning', () => {
    const warningPanel = shallow(<Panel type="warning">This is a warning panel</Panel>);

    it('should wrap content with <div>-tag', () => {
      expect(warningPanel.name()).to.equal('styled.div');
    });

    it('should have two children', () => {
      expect(warningPanel.children()).to.have.length(2);
    });
  });
});
