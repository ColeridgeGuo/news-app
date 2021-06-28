import axios from 'axios'

const guardian_default_img_url =
  'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'

// get Guardian home articles
const get_guardian_home = async () => {
  try {
    const response = await axios.get(
      `https://content.guardianapis.com/search` +
        `?api-key=8f86228c-9df5-451e-a505-f7979e6ec8a3` +
        '&section=(world|sport|business|technology|politics)' +
        '&show-blocks=all&page-size=20'
    )
    console.log(`Getting Guardian home - ${response.status}`)
    return response.data?.response?.results
  } catch (error) {
    console.log(error)
  }
}

// return processed Guardian results
export const process_guardian_results = (data) => {
  const results = data.map((article) => ({
    id: article.id,
    url: article.webUrl,
    src: 'guardian',
    title: article.webTitle,
    image:
      article.blocks?.main?.elements?.[0]?.assets?.pop?.()?.file ??
      guardian_default_img_url,
    sectionId: article.sectionId === 'sport' ? 'sports' : article.sectionId,
    date: new Date(article.webPublicationDate).toLocaleString(),
    descp: article.blocks?.body?.[0]?.bodyTextSummary,
  }))
  const vaildRes = results.filter((article) =>
    Object.values(article).every((x) => x !== undefined)
  )
  return { articles: vaildRes.slice(0, 10) }
}

export default async (req, res) => {
  const results = await get_guardian_home()
  res.status(200).json(process_guardian_results(results))
}
