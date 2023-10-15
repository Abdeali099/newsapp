import React  from 'react';
import './NewsItem.css';

 const Newsitem=(props) =>  {

    try {

    let { title, description, imageURL, newsURL, source, author, date } = props;

      return (
        <div className="card" style={{ height: "100%" }}>
  
          <div className="sourceNews">
            <span className='badge bg-success'>{source}</span>
          </div>
  
          <img src={imageURL ? imageURL : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"} className="card-img-top" alt="News" />
  
          <div className="card-body">
  
  
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
  
            <div className='div_btn'>
              <a rel="noreferrer" target="_blank" href={newsURL} className="btn btn-primary">Read More</a>
            </div>
          </div>
  
          <div className="card-footer">
            <p className="card-text text-center font-weight-bold">Last updated by <strong>{author}</strong> on <strong>{new Date(date).toGMTString()}</strong></p>
          </div>
  
        </div>
        
      )
    } catch (error) {

      console.log("Error Ocuuresd : ",error);
      
    }

}

export default Newsitem;
