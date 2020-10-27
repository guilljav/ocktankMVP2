import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { useMutation } from '@apollo/react-hooks';
import { UploadMutation } from './upload';
import { FileQuery } from './Uploads';

export default function WithPreviews(props) {
  const [file, setFile] = useState({});
  const [uploadFile] = useMutation(UploadMutation);


    const handleUpload = async () => {
      if(file){
          uploadFile({
            variables: { file },
            refetchQueries: [{query: FileQuery, variables: file}]
          });
          setFile({})
          console.log("Uploaded successfully: ", file)
      }
      else{
        console.log("No files to upload")
      }
    };

  const {getRootProps, getInputProps} = useDropzone({
    accept: '.csv',
    onDrop: acceptedFile => {
    setFile(
      Object.assign(acceptedFile[0], {
        preview: URL.createObjectURL(acceptedFile[0]),
      })
    );
    }
  });
  

  const thumbs = 
    <div className='thumb' key={file.name}>
      <div className='thumb-inner'>
        <img src={file.preview} className='img' alt={file.length && "img"} />
      </div>
    </div>

    useEffect(() => () => {
        URL.revokeObjectURL(file.preview)
    }, [file]);


  return (
    <section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some file here, or click to select file</p>
      </div>
      <aside className='thumb-container'>
        {thumbs}
        <button
          type='submit'
          className={`button`}
          style={{ display: file && !Object.keys(file).length && 'none' }}
          onClick={handleUpload}
        >
          Upload
        </button>
      </aside>
    </section>
  );
}
