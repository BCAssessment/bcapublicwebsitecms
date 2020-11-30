import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/';
import styled from 'styled-components';


const Wrapper = styled.div`
    .ck.ck-editor__editable_inline {
      background-color: #e4e4e4;
      border: 1px solid var(--ck-color-base-border);
      min-height: 200px;
      > div {
        min-height: 200px;
        border-bottom: 25px;
      },
      .ck.ck-toolbar
      {
        display:block !important;
      }
  }
`;

const configuration = {
  fontColorConfig: {
    columns: 8, 
    documentColors: 8
  },  
  fontColor: {
    colors: [
      {
        color: "#07819a",
        label: "Teal"
      },
      {
        color: "#00ABE6",
        label: "Blue"
      },
      {
        color: "#32BCAD",
        label: "Green"
      },
      {
        color: "#79d9ee",
        label: "Light Blue"
      },
      {
        color: "#97D7D4",
        label: "Light Green"
      },
      {
        color: "#56565A",
        label: "Dark Grey"
      },
      {
        color: "#000",
        label: "Black"
      },
      {
        color: "#fff",
        label: "White",
        hasBorder: true
      },
    ] 
  },
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'fontColor',
    '|',
    'indent',
    'outdent',
    '|',
    'undo',
    'redo',
  ],
};

const Editor = ({ onChange, name, value }) => {
  return (
    <Wrapper>
      <CKEditor
        editor={DecoupledEditor}
        config={configuration}
        data={value}
        onInit= { editor => {
          editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
	          window.editor = editor;
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
      />
    </Wrapper>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;