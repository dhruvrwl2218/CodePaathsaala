// validationSchema.js
import * as yup from 'yup';

const schema = yup.object().shape({
  Name: yup.string().required('Name is required'),
  CourseId: yup
    .string()
    .required('Course ID is required')
    .matches(/^[a-zA-Z0-9]*$/, 'Course ID should not include special characters'),
  Price: yup
    .number()
    .required('Price is required')
    .positive('Price must be a positive number'),
  Duration: yup.string().required('Duration is required'),
  Thumbnail: yup
    .mixed()
    .required('Thumbnail is required')
    .test(
      'fileSize',
      'File size is too large',
      (value) => {
        if (value && value.length > 0) {
          return value[0].size <= 10 * 1024 * 1024;
        }
        return false;
      }
    )
    .test(
      'fileType',
      'Unsupported file format',
      (value) => {
        // Validate the file type of the first file in the FileList
        return value && value.length > 0 && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
      }
    ),
    // .test(
    //   'fileSize',
    //   'File size is too large',
    //   (value) =>{console.log('File Size:', value?.size);
    //     return value && value.size <= 10 * 1024 * 1024
    //   }  // 2MB file size limit
    // )
    // .test(
    //   'fileType',
    //   'Unsupported file format',
    //   (value) =>
    //     value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
    // ),
    StudyMaterials: yup
  .array()
  .of(
    yup
      .mixed()
      .test('fileSize', 'Lecture File size is too large', (value) => {
        if (!value) return true; // allow empty field
        // Validate each file in the FileList
        return Array.from(value).every(file => file.size <= 200 * 1024 * 1024); // 200MB file size limit for videos
      })
      .test('fileType', 'Unsupported file format', (value) => {
        if (!value) return true; // allow empty field
        // Validate the file type of each file in the FileList
        return Array.from(value).every(file => ['video/mp4', 'video/avi', 'video/mkv'].includes(file.type));
      })
  ),
    // .required('At least one study material is required'),
  Description: yup
    .string()
    .required('Description is required')
    .max(500, 'Description must be at most 500 characters'),
});


export default schema;
