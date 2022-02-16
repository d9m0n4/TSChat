import API from '../api/axios';

class Files {
  upload = async (file) => {
    let formData = new FormData();

    formData.append('file', file);

    return API.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  get = (id) => {
    return API.get(`/files/?id=${id}`);
  };

  delete = (id) => {
    return API.delete(`/files/?id=${id}`);
  };
  getAllOfUser = (id) => {
    return API.get(`/files/user?id=${id}`);
  };
}

export default new Files();
