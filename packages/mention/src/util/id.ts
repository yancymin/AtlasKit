import * as uid from 'uid';

export default (prefix: string = ''): string => `${prefix}_${uid()}`;
