export const LANGUAGE_MAP = {
  'ActionScript': 'actionscript3',
  'AppleScript': 'applescript',
  'Shell': 'bash',
  'CSharp': 'c#',
  'C++': 'cpp',
  'CSS': 'css',
  'ColdFusion': 'coldfusion',
  'Delphi': 'delphi',
  'Diff': 'diff',
  'Erlang': 'erl',
  'Groovy': 'groovy',
  'XML': 'xml',
  'Java': 'java',
  'JavaFX': 'javafx',
  'JavaScript': 'js',
  'PHP': 'php',
  'Perl': 'perl',
  'PlainText': 'text',
  'PowerShell': 'powershell',
  'Python': 'py',
  'Ruby': 'ruby',
  'SQL': 'sql',
  'Sass': 'sass',
  'Scala': 'scala',
  'VisualBasic': 'vb'
};

export const supportedLanguages = Object.keys(LANGUAGE_MAP).map(name => LANGUAGE_MAP[name]);

export function mapCodeLanguage(language: string): string {
  return LANGUAGE_MAP[language] || language.toLowerCase();
}
