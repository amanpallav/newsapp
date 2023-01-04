import React, { Component } from 'react'
import Newsitem from './Newsitem.js'
import Spinner from './Spinner.js'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class News extends Component {
  articles = [
    {
      "source": {
        "id": null,
        "name": "New York Times"
      },
      "author": "Amanda Holpuch",
      "title": "Latest Abortion and Roe v. Wade News: Live Updates - The New York Times",
      "description": "As health care providers were seeing a spike in demand for birth control, emergency contraception and abortion pills, politicians weigh in after Friday’s Supreme Court ruling striking down Roe v. Wade.",
      "url": "https://www.nytimes.com/live/2022/06/26/us/abortion-roe-wade-supreme-court",
      "urlToImage": "https://static01.nyt.com/images/2022/06/26/business/live-blog-20220626-abortion-roe-wade-supreme-court-header-01/merlin_209156304_529739f9-578b-4898-b0bf-bad91f7be528-facebookJumbo.jpg",
      "publishedAt": "2022-06-26T18:31:42Z",
      "content": "Abortion has become or will soon become illegal in more than a dozen states whose legislatures had passed so-called trigger laws, allowing for bans shortly after the Supreme Court decision overturnin… [+8390 chars]"
    },
    {
      "source": {
        "id": "google-news",
        "name": "Google News"
      },
      "author": null,
      "title": "Michigan's largest health system reverses course on abortion stance - Detroit Free Press",
      "description": null,
      "url": "https://news.google.com/__i/rss/rd/articles/CBMijwFodHRwczovL3d3dy5mcmVlcC5jb20vc3RvcnkvbmV3cy9sb2NhbC9taWNoaWdhbi8yMDIyLzA2LzI2L21pY2hpZ2FuLXNwZWN0cnVtLWJlYXVtb250LWhlYWx0aC1zeXN0ZW0tcmV2ZXJzZXMtY291cnNlLWFib3J0aW9uLXN0YW5jZS83NzM4NDk5MDAxL9IBAA?oc=5",
      "urlToImage": null,
      "publishedAt": "2022-06-26T16:53:04Z",
      "content": null
    },
    {
      "source": {
        "id": "the-washington-post",
        "name": "The Washington Post"
      },
      "author": "Rachel Pannett, Annabelle Timsit",
      "title": "Monkeypox cases surge as WHO stops short of declaring a global emergency - The Washington Post",
      "description": "The World Health Organization said the monkeypox outbreak is an « evolving threat » but does not yet constitute an international public health emergency.",
      "url": "https://www.washingtonpost.com/health/2022/06/25/monkeypox-who-global-emergency/",
      "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://d1i4t8bqe7zgj6.cloudfront.net/05-21-2022/t_7345a580607849f5a427e54bc8667d59_name_fb095550_d848_11ec_be17_286164974c54_scaled.jpg&w=1440",
      "publishedAt": "2022-06-26T04:13:00Z",
      "content": "Placeholder while article actions load\r\nThe World Health Organization has decided not to declare monkeypox a global emergency despite a rapid rise in cases in Europe, electing instead to describe it … [+4376 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Ntd.com"
      },
      "author": null,
      "title": "More Than 900 Cases of Hepatitis of Unknown Origin Reported in Children, WHO Says - The Epoch Times",
      "description": "Health officials across 33 countries have received reports of 920 probable cases of severe acute hepatitis of unknown ...",
      "url": "https://www.ntd.com/more-than-900-cases-of-hepatitis-of-unknown-origin-reported-in-children-who-says_799538.html",
      "urlToImage": "https://img.ntd.com/assets/uploads/2022/04/hepatitis.jpg",
      "publishedAt": "2022-06-25T19:54:51Z",
      "content": "Health officials across 33 countries have received reports of 920 probable cases of severe acute hepatitis of unknown origin in young children, according to the World Health Organization (WHO).\r\nIn a… [+4144 chars]"
    }
  ]


  constructor() {
    super();
    //console.log("Hello i am a constructor from news component");
    this.state =
    {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    }

  }

  async componentDidMount() {
    //console.log("cdm");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0edb249572034a958995d89dd2cd4337&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState(
      {
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      }
    )
  }

  

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0edb249572034a958995d89dd2cd4337&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState(
      {
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false
      }
    )

  }

  render() {
    console.log("rendering");
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsMonkey: Top Headlines</h1>

        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length != this.state.totalResults}
          loader={<Spinner />}
        >

          <div className="container">

          <div className="row">

            {this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              )
            })}

            </div>

          </div>

        </InfiniteScroll>


      </div>


    )
  }
}
