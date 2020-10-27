import React, { Component } from "react";
import "./Home.css";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
     
    var query = window.location.search.substring(1);
        //alert(query)//"app=article&act=news_content&aid=160990"
        var vars = query.split("&");
        //alert(vars);

    if (!this.props.isAuthenticated) {
      return;
    }
  

    this.setState({ isLoading: false });
  }

  // specify upload params and API url to file upload
 getUploadParams = ({ meta, file }) => {
  return { url: 'https://httpbin.org/post' }
}
 
// handle the status of the file upload
 handleChangeStatus = ({ meta, file }, status) => {
  console.log(status, meta, file)
}

handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

Preview = ({ meta }) => {
  const { name, percent, status } = meta
  return (
    <span style={{ alignSelf: 'flex-start', margin: '10px 3%', fontFamily: 'Helvetica' }}>
      {name}, {Math.round(percent)}%, {status}
    </span>
  )
}


  render() {
    return (
      <div>
        home
      </div>
     );
  }
}
