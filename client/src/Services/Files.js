import API from '../api/axios';

class Files {
  upload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
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
