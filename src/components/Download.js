import React from 'react';
import ReactDOM from 'react-dom';

import downloadFile from '../utils/download';

class Download extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    downloadFile();
  }

  render() {
    return (
      <div>
        Downloading ...
      </div>
    )
  }
}

export default Download;