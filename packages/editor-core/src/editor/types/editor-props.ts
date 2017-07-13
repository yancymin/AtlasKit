import { MediaState } from '@atlaskit/media-core';
import { EditorView } from '../../prosemirror';
import { ErrorReportingHandler } from '../../utils/error-reporter';

export type EditorAppearance = 'tray' | 'mini' | 'midi' | 'maxi';

export interface EditorProps {
  appearance: EditorAppearance;

  allowTextFormatting?: boolean;
  allowMentions?: boolean;
  saveOnEnter?: boolean;

  errorReporterHandler?: ErrorReportingHandler;
  uploadErrorHandler?: (state: MediaState) => void;

  emojiProvider?: Promise<any>;
  mentionProvider?: Promise<any>;
  mediaProvider?: Promise<any>;

  onChange?: (editorView: EditorView) => void;
  onSave?: (editorView: EditorView) => void;
}
