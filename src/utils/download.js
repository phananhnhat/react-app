
import PrintUtility from './printUtility';
import axios from 'axios';

const downloadMyFile = params => {
  return axios(({
    method: 'GET',
    url: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80',
    // params,
    responseType: 'blob'
  }));
};

const downloadFile = () => {
  downloadMyFile().then(response => {
    const fileName = 'hihihihihi.jpeg';
    const blob = new Blob([response.data], {type: 'image/jpg'});
    PrintUtility.printBlob(blob, fileName, 500);
  }).catch(e => {
    debugger;
  });

}

export default downloadFile;