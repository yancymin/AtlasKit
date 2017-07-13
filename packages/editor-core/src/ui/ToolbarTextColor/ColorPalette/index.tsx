import * as React from 'react';
import { PureComponent } from 'react';
import Color from '../Color';

import { ColorPaletteWrapper } from './styles';

export interface Props {
  palette: Map<string, string>;
  selectedColor?: string;
  cols?: number;
  onClick: (value: string) => void;
}

export default class ColorPalette extends PureComponent<Props, undefined> {
  render() {
    const { palette, cols = 6, onClick, selectedColor } = this.props;
    return (
      <ColorPaletteWrapper style={{ maxWidth: cols * 32 }}>
        {Array.from(palette).map(([color, label]) => (
          <Color
            key={color}
            value={color}
            label={label}
            onClick={onClick}
            isSelected={color === selectedColor}
          />
        ))}
      </ColorPaletteWrapper>
    );
  }
}
