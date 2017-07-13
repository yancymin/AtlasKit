import { EditorView } from '../prosemirror-view';
import { Event } from '../dom';
import { Plugin } from '../prosemirror-state';
import * as dom from '../dom';

export function keymap(bindings: { [key: string]: any }): Plugin;

export function keydownHandler(bindings: { [key: string]: any }): (view: EditorView, event: dom.KeyboardEvent) => boolean;
