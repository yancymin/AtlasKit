import getButtonProps from '../../src/components/getButtonProps';

let component;

describe('getButtonProps', () => {
  beforeEach(() => {
    component = {
      state: {},
      props: {},
    };
  });

  it('should pass through all props to a custom component', () => {
    component.props.component = () => {};
    component.props.customProp = 1;

    expect(getButtonProps(component).customProp).toBe(1);
  });

  it('should not pass through all props to an inbuilt component', () => {
    component.customProp = 1;

    expect(getButtonProps(component).customProp).toBeUndefined();
  });

  it('should add appearance props', () => {
    expect(Object.keys(getButtonProps(component))).toEqual(expect.arrayContaining([
      'appearance',
      'className',
      'disabled',
      'isActive',
      'isFocus',
      'isHover',
      'isSelected',
      'spacing',
      'theme',
      'fit',
    ]));
  });

  it('should pass interaction state props from the component\'s state', () => {
    component.state.isActive = 1;
    component.state.isFocus = 2;
    component.state.isHover = 3;

    expect(getButtonProps(component).isActive).toBe(1);
    expect(getButtonProps(component).isFocus).toBe(2);
    expect(getButtonProps(component).isHover).toBe(3);
  });

  it('should add interaction handler props', () => {
    expect(Object.keys(getButtonProps(component))).toEqual(expect.arrayContaining([
      'onBlur',
      'onFocus',
      'onMouseDown',
      'onMouseEnter',
      'onMouseLeave',
      'onMouseUp',
    ]));
  });

  it('should pass interaction handler functions directly from the component', () => {
    component.onBlur = 1;
    component.onFocus = 2;
    component.onMouseDown = 3;
    component.onMouseEnter = 4;
    component.onMouseLeave = 5;
    component.onMouseUp = 6;

    expect(getButtonProps(component).onBlur).toBe(1);
    expect(getButtonProps(component).onFocus).toBe(2);
    expect(getButtonProps(component).onMouseDown).toBe(3);
    expect(getButtonProps(component).onMouseEnter).toBe(4);
    expect(getButtonProps(component).onMouseLeave).toBe(5);
    expect(getButtonProps(component).onMouseUp).toBe(6);
  });

  it('should pass the onClick handler from props', () => {
    component.onClick = 1;
    component.props.onClick = 2;

    expect(getButtonProps(component).onClick).toBe(2);
  });

  it('should add aria, form, id and type props to a button', () => {
    expect(Object.keys(getButtonProps(component))).toEqual(expect.arrayContaining([
      'aria-haspopup',
      'aria-expanded',
      'aria-controls',
      'form',
      'id',
      'type',
    ]));

    component.props.href = '#';

    expect(Object.keys(getButtonProps(component))).not.toEqual(expect.arrayContaining([
      'aria-haspopup',
      'aria-expanded',
      'aria-controls',
      'form',
      'id',
      'type',
    ]));
  });

  it('should add href and target props to a link', () => {
    component.props.href = '#';

    expect(Object.keys(getButtonProps(component))).toEqual(expect.arrayContaining([
      'href',
      'target',
    ]));

    component.props.isDisabled = true;

    expect(Object.keys(getButtonProps(component))).not.toEqual(expect.arrayContaining([
      'href',
      'target',
    ]));
  });
});
