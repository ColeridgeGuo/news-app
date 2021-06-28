import axios from 'axios'

const nytimes_default_img_url =
  'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

// get NYTimes article by url
const get_nytimes_article = async (articleId) => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json` +
        `?fq=web_url:("${articleId}")&api-key=1HzpS5vMG5GY8t5nTyN0Gj2SssDJ71Ye`
    )
    console.log(`Getting NYTimes article - ${response.status}`)
    return response.data?.response?.docs?.[0]
  } catch (error) {
    console.log(console.error)
  }
}

// return processed NYTimes article
const process_nytimes_article = (data) => {
  return {
    id: data.uri,
    src: 'nytimes',
    url: data.web_url,
    title: data.headline?.main,
    image:
      `https://static01.nyt.com/${
        data.multimedia?.filter((media) => media.width > 2000)[0]?.url
      }` ?? nytimes_default_img_url,
    sectionId: data.section_name?.toLowerCase(),
    date: new Date(data.pub_date).toLocaleString(),
    descp: data.abstract,
  }
}

export default async ({ query: { articleId } }, res) => {
  const results = await get_nytimes_article(articleId)
  res.status(200).json(process_nytimes_article(results))
}
