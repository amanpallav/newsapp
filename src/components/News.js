import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  //document.title = `${this.props.category} - NewsMonkey`

  useEffect(() => {
    const updateNews = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0edb249572034a958995d89dd2cd4337&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      setArticles(parsedData.articles);
      setLoading(false)
    }
    updateNews();
  }, [])



  const handleNextClick = async () => {
    //console.log("Next button clicked");
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0edb249572034a958995d89dd2cd4337&page=${page + 1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false)
  }

  const handlePrevClick = async () => {
    //console.log('Previous button clicked');
    setPage(page - 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0edb249572034a958995d89dd2cd4337&page=${page - 1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setLoading(false)
  }


  return (
    <div className='container my-3'>
      <h1 className='text-center'>NewsMonkey: Top Headlines from {props.category}</h1>
      {loading && <Spinner />}
      <div className="row">
        {!loading && articles.map((element) => {
          return <div className="col-md-3" key={element.url}>
            <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
          </div>
        }
        )}

      </div>

      <div className="buttons d-flex justify-content-between my-3">
        <button type="button" disabled={page <= 1} onClick={handlePrevClick} className="btn btn-dark">Previous</button>
        <button type="button" disabled={page >= articles.length} onClick={handleNextClick} className="btn btn-dark">Next</button>
      </div>
    </div>
  )
}

export default News
