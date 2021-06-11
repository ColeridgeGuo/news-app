import axios from 'axios'

// search NYTimes articles based on query
const search_nytimes_results = async query => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json` +
        `?q=${query}&api-key=1HzpS5vMG5GY8t5nTyN0Gj2SssDJ71Ye`
    )
    console.log(`Searching NYTimes article by ${query} - ${response.status}`)
    return response.data?.response?.docs
  } catch (error) {
    console.log(error)
  }
}

// return processed NYTimes search results
export const process_nytimes_search_results = data => {
  return {
    articles: data.map(article => ({
      id: article.uri,
      src: 'nytimes',
      url: article.web_url,
      title: article.headline?.main,
      image:
        `https://www.nytimes.com/${
          article.multimedia?.filter(media => media.width > 2000)[0]?.url
        }` ?? nytimes_default_img_url,
      sectionId: article.section_name?.toLowerCase(),
      date: new Date(article.pub_date).toLocaleString(),
    })),
  }
}

export default async ({ query: { kw } }, res) => {
  const results = await search_nytimes_results(kw)
  res.status(200).json(process_nytimes_search_results(results))
}
