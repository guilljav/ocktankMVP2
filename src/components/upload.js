import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const UploadMutation = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      path
      id
      filename
      mimetype
    }
  }
`;
const FileUpload = () => {
  const [uploadFile] = useMutation(UploadMutation);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      // Do something with the files
      uploadFile({
        variables: { file },
        onCompleted: () => {},
      });
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive && 'isActive'}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : null
        // (
        //   <p>Drag 'n' drop some files here, or click to select files</p>
        // )
        }
      </div>
    </div>
  );
};
export default FileUpload;