import { EditorServicesConfig } from '../../../src';
import { JwtTokenProvider, MediaProvider } from '@atlaskit/media-core';
import { MentionResource } from '@atlaskit/mention';
import { name } from '../../../package.json';
import { EmojiResource } from '@atlaskit/emoji';
import * as chai from 'chai';
const { expect } = chai;

describe(name, () => {
  describe('EditorServicesConfig interface', () => {
    // The following test is non-functional but reinforces the types we import
    // from editor-core and external packages. This file will fail to compile
    // if any of the related packages' APIs change.
    it('should compile with TypeScript.', () => {
      const stubJwtTokenProvider: JwtTokenProvider = (collectionName?: string) => {
        return Promise.resolve('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
      };

      const configInstance: EditorServicesConfig = {
        emojiResourceProvider: function (): Promise<EmojiResource> {
          return Promise.resolve({} as EmojiResource);
        },
        mediaResourceProvider: function (): Promise<MediaProvider> {
          return Promise.resolve({
            uploadParams: {
              collection: 'mock',
            },
            viewContext: Promise.resolve({
              clientId: 'e3afd8e5-b7d2-4b8d-bff0-ec86e4b14595',
              serviceHost: 'http://media-api.host.com',
              tokenProvider: stubJwtTokenProvider,
            })
          });
        },
        mentionResourceProvider: function (): Promise<MentionResource> {
          return Promise.resolve({} as MentionResource);
        },
      };

      expect(configInstance).to.be.an('object');
      expect(configInstance.emojiResourceProvider!()).to.be.a('Promise');
      expect(configInstance.mediaResourceProvider!()).to.be.a('Promise');
      expect(configInstance.mentionResourceProvider!()).to.be.a('Promise');

      return configInstance.mediaResourceProvider!().then((mr: MediaProvider) => {
        expect(mr.uploadParams!.collection).to.be.a('string');
        expect(mr.viewContext).to.be.a('Promise');
      });
    });
  });
});
