import axios from 'axios'

const guardian_default_img_url =
  'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'

// get Guardian article by id
const get_guardian_article = async (articleId) => {
  try {
    const response = await axios.get(
      `https://content.guardianapis.com/${articleId}` +
        `?api-key=8f86228c-9df5-451e-a505-f7979e6ec8a3&show-blocks=all`
    )
    console.log(`Getting Guardian article - ${response.status}`)
    return response.data?.response?.content
  } catch (error) {
    console.log(error)
  }
}

// return processed Guardian article
const process_guardian_article = (data) => {
  return {
    id: data.id,
    src: 'guardian',
    url: data.webUrl,
    title: data.webTitle,
    image:
      data.blocks?.main?.elements?.[0]?.assets?.pop?.()?.file ??
      guardian_default_img_url,
    sectionId: data.sectionId.toLowerCase(),
    date: new Date(data.webPublicationDate).toLocaleString(),
    descp: data.blocks?.body?.[0]?.bodyTextSummary,
  }
}

export default async ({ query: { articleId } }, res) => {
  const results = await get_guardian_article(articleId)
  res.status(200).json(process_guardian_article(results))
}
