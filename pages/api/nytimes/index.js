import axios from 'axios'

const nytimes_default_img_url =
  'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

// get NYTimes home articles
const get_nytimes_home = async () => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/home.json` +
        `?api-key=1HzpS5vMG5GY8t5nTyN0Gj2SssDJ71Ye`
    )
    console.log(`Getting NYTimes home - ${response.status}`)
    return response.data?.results?.filter(filter_nytimes_section).slice(0, 10)
  } catch {
    console.log(error)
  }
}

// filter home articles to selected sections
const filter_nytimes_section = article => {
  const sections = ['world', 'business', 'technology', 'sports']
  return sections.includes(article.section) || article.subsection === 'politics'
}

// return processed NYTimes results
export const process_nytimes_results = data => {
  return {
    articles: data.map(article => ({
      id: article.uri,
      src: 'nytimes',
      url: article.url,
      title: article.title,
      image:
        article.multimedia?.filter(media => media.width > 2000)[0]?.url ??
        nytimes_default_img_url,
      sectionId:
        article.subsection === 'politics'
          ? article.subsection
          : article.section,
      date: new Date(article.published_date).toLocaleString(),
      descp: article.abstract,
    })),
  }
}

export default async (req, res) => {
  const results = await get_nytimes_home()
  res.status(200).json(process_nytimes_results(results))
}
