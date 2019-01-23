import axios from 'axios';

const client = axios.create({
  baseURL: 'https://novaweb.studio/dashboard/_api/projects',
  json: true
});

export default {
  async execute (method, resource, data={}) {
    return client({
      mode: 'cors',
      method,
      url: resource,
      data
    }).then(res => {
      return res.data;
    });
  },
  getProjects(){
    return this.execute('get', '');
  },
  setProject(data){
    return this.execute('post', '', data);
  },
  updateComment(objectId, comment){
    return this.execute('patch', `/${objectId}`, { comment });
  }
};