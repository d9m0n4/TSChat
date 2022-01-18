import API from '../api/axios';

class Files {
  upload = (files) => {
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append('file', element);
    }
    console.log(formData);
    return API.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  delete = (id) => {
    return API.delete(`/files/?id=${id}`);
  };
}

export default new Files();
