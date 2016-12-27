const rp = require('request-promise');
const cheerio = require('cheerio');
const url = require('url');


// Extracts same domain links
// from the whole collection of page hyperlinks
// allows only http or https link - to prevent mailto links
// filters out image and pdf links
function extractInternalHyperlinks(linksCollection, baseUrl) {
  let internalHyperlinks = [];
  const hostname = url.parse(baseUrl).hostname;
  let filteredLinksCollection = linksCollection.filter(linkObject => {
    if(baseUrl && linkObject.attribs.href) {
      const linkPath = url.resolve(baseUrl, linkObject.attribs.href);
      const linkDomain = url.parse(linkPath).hostname;
      const protocol = url.parse(linkPath).protocol;
      const pathname = url.parse(linkPath).pathname;
      const validProtocol = (protocol === 'https:' || protocol === 'http:') ? true : false; // to remove mailto links
      const notAnImage = !(/\.(gif|jpe?g|tiff|png|pdf)$/i).test(pathname); // to filter out images and pdfs
      return (linkDomain === hostname) && validProtocol && notAnImage;
    }
  });
  internalHyperlinks = filteredLinksCollection.map(linkObject => {
    const fullPath = url.resolve(baseUrl, linkObject.attribs.href);
    const urlObject = url.parse(fullPath);
    return url.format({
        protocol: urlObject.protocol,
        hostname: urlObject.hostname,
        pathname: urlObject.pathname
      });
  });
  return internalHyperlinks;
}


// to extract asset urls - src or href
// from element object generated by cheerio
// normalises asset path to make them absolute
function extractAssetUrls(elementsCollection, assets, baseUrl) {
  elementsCollection.map(elem => {
    if(elem.attribs.src || elem.attribs.href) {
      const assetLocation = elem.attribs.src || elem.attribs.href;
      const fullPath = url.resolve(baseUrl, assetLocation); // making asset paths absolute
      assets.push(fullPath);
    }
  });
}

// takes a page url as input
// returns an object with three properties:
// {
//   uri: pageUrl, - input page url
//   assets: [], - page asset urls
//   internalHyperlinks: [] - more hyperlinks that were discovered
// }
function crawlSinglePage(pageUrl) {

  const urlObject = url.parse(pageUrl);
  const baseUrl = url.format({
    protocol: urlObject.protocol,
    hostname: urlObject.hostname
  });

  let assets = [];

  const options = {
    uri:  pageUrl,
    simple: false,
    resolveWithFullResponse: true,
    gzip: true
  };

  return rp(options)
    .then(response => {

      const isHTML = response.headers['content-type'].includes('text/html'); // flag for checking html content
      const is200 = (response.statusCode === 200); // flag for checking response status

      if(response && isHTML && is200) {

        const $ = cheerio.load(response.body);

        // extracting all image, style and script tags
        // from parsed html stired in $
        const imageSrc = Array.from($('img'));
        const styleLinks = Array.from($('link')).filter(link => link.attribs.rel === 'stylesheet');
        const scriptSrc = Array.from($('script'));

        // gathering them into one array before passing to extractAssetUrls function
        const staticAssetCollection = imageSrc.concat(styleLinks, scriptSrc);

        extractAssetUrls(staticAssetCollection, assets, baseUrl);

        // all hyperlinks present in the page
        const hyperlinks = Array.from($('a'));

        return {
          uri: pageUrl,
          assets: assets,
          internalHyperlinks: extractInternalHyperlinks(hyperlinks, baseUrl) // filterning out external links
        };
      }
      return {
        uri: pageUrl,
        assets: [],
        internalHyperlinks: []
      };
    })
    .catch(err => {
      // if request fails due to redirects
      // return empty assets and links array
      // console.log(err);
      return {
        uri: pageUrl,
        assets: [],
        internalHyperlinks: []
      };
    });

}

module.exports = crawlSinglePage;