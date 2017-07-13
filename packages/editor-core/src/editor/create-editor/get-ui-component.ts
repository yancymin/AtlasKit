import Tray from '../ui/Appearance/Tray';
import { EditorAppearance, EditorAppearanceComponentProps } from '../types';

export default function getUiComponent(
  appearance: EditorAppearance
): React.ComponentClass<EditorAppearanceComponentProps> {
  switch (appearance) {
    case 'tray':
      return Tray;
    default:
      throw new Error(`Appearance '${appearance}' is not supported by the editor.`);
  }
}
