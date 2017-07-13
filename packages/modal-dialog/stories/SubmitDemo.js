import React from 'react';
import Button from '@atlaskit/button';
import AkFieldText from '@atlaskit/field-text';
import ModalDialog from '../src';

const testFormId = 'test-form';

export default function () {
  return (
    <div>
      <ModalDialog
        footer={
          <Button
            appearance="primary"
            form={testFormId}
            type="submit"
          >Create issue</Button>
        }
        header={
          <span>Submit demo</span>
        }
        isOpen
      >
        <form
          action="https://httpbin.org/post"
          id={testFormId}
          method="post"
          target="submit-frame"
        >
          <p>Enter some text and then try submitting with enter + click.</p>
          <AkFieldText
            label="Name"
            name="my-name"
            placeholder="Your name"
          />
          <AkFieldText
            label="Email"
            name="my-email"
            placeholder="gbelson@hooli.com"
          />
        </form>
      </ModalDialog>

      <iframe
        name="submit-frame"
        title="Form POST test"
      />
    </div>
  );
}
