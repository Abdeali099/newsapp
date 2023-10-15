import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  
  const capitalizeFirstLetter = (string) => {
    return `${string.toString().charAt(0).toUpperCase() + string.toString().slice(1)}`
  };
  
  document.title = `${capitalizeFirstLetter(props.category)}`;  

  const handleFetchNews = async (varPage, event) => {

    console.log(event);

    try {

      props.setProgress(20);

      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + (varPage)}&pageSize=${props.pageSize}`;

      setLoading(true);

      let data = await fetch(url);

      props.setProgress(30);

      let parseData = await data.json();

      props.setProgress(70);

      setPage(page + varPage);
      setArticles(parseData.articles);
      setTotalResults(parseData.totalResults);
      setLoading(false);

      props.setProgress(100);

    } catch (error) {

      console.log("Error Ocurred : ", error);

    }

  }

  /* This used for fetch more data in loading */

  const fetchMoreData = async () => {

    try {

      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + (1)}&pageSize=${props.pageSize}`;

      console.log(url);

      let data = await fetch(url);

      let parseData = await data.json();

      setPage(page + 1);
      setArticles(articles.concat(parseData.articles));
      setTotalResults(parseData.totalResults);
      setLoading(false);

    } catch (error) {

      console.log("Error Ocurred : ", error);

    }

  };

  useEffect(() => {
    handleFetchNews(0, null);
  }, []);


  try {

    return (
      <>
        <div className="album py-5 bg-primary" style={{ paddingTop: "0px" }}>

          <h1 className='my-3 text-center text-light'>NewsHunt Top {capitalizeFirstLetter(props.category)} - Headlines</h1>

          {/* It says that when loading is true then and then Spinner will show */}
          {loading && <Spinner />}

          {/* Adding Infinite Scroll */}

          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
          >
            <div className="container">

              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">

                {articles.map((element) => {

                  return <div className="col" key={`${element["url"]}`}>

                    <Newsitem
                      title={element.title ? element.title : "Click on Read More..."}
                      description={element.description ? element.description : "Click on Read More..."}
                      imageURL={element.urlToImage ? element.urlToImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                      newsURL={element.url ? element.url : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"}
                      source={element.source.name}
                      author={element.author ? element.author : "UnKnown"}
                      date={element.publishedAt ? element.publishedAt : "0000-00-00T00:00:00Z"}
                    />

                  </div>
                })}

              </div>

            </div>

          </InfiniteScroll>

        </div>



        {/* onClick={handleFetchNews(-1)} onClick={handleFetchNews(1)} */}

        {/* onClick={handlePreviousClicked} onClick={handleNextClicked}*/}

        {/* <div className="container d-flex justify-content-between my-3">
            <button type="button" disabled={page <= 1} className="btn btn-danger" onClick={(event) => handleFetchNews(-1, event)} >	&larr; Previous</button>
            <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} onClick={(event) => handleFetchNews(1, event)} className="btn btn-danger" id="nextBtn" >Next &rarr;</button>
          </div> */}

      </>

    )
  }

  catch (error) {
    console.log("Error Ocurred : ", error);
  }



}

News.defaultProps = {
  articles: [],
  loading: true,
  page: 1,
  country: "in",
  category: "general"

};

News.propsTypes = {
  articles: PropTypes.array,
  loading: PropTypes.bool,
  page: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
};

export default News;