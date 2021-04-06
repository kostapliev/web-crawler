const fs = require('fs');
const url = require('url');




const argumentss = require('yargs').argv; // исы аргументтæ терминалæй


const UrlInputted = require('./parseUrl'); // райсы йæхимæ url, кæцы ныффысста архайæг
const crawlSinglePage = require('./crawlSinglePage'); // crawls a single url and returns its data
const getBannedUrls = require('./robots'); // басгары robots.txt сыфтæн, кæдон краулингæн нæ бæззынц


const urlPool = {}; // contains all the urls. Format - "url": crawledOrNot - {'abc.com': false}
let crawledUrls = []; // contains all the crawled urls
let output = []; // contains output of all pages
let UrlBann = []; // ам ис иннæ urlтæ кæдонимæ нæй гæнæн архайын, уый тыххæй æмæ æрцыдысты фыст ам: robots.txt


// Batch data
// urls are processed in a batch defined by batchSizeLimit
// only if a batch is processed, new batch will begin
let batchSize = 0; // number of urls in current batch
let currentBatch = {}; // urls in current batch. Same format as urlPool
let batchInProgress = false; // flag to see if a batch is being processed
let batchLim; // бæтчы бæрц, терминалы йæ фыссæм


// a batch gets only five tries before next one begins
// that's why you shoud not keep very high batch size
let numberOfTries = 0;


//Ацы функци басгары url, ома, ис гæнæн, цæмæй ныккраулер æй кæнæм æви нæ; кæннод, зæгъгæ, robot.txtы у бан.
function UrlWorking(hyperlink) {
  const urlPath = url.parse(hyperlink).pathname;
  for(let i = 0; i < UrlBann.length; i++) {
    if(urlPath.startsWith(UrlBann[i])){
      return false;
    }
  }
  return true;
}


// ############# Краулеры зæрдæ ам ис ###############
/* 1) Арвиты индивидуалон urlтæ краулингæн crawlSinglePage функцийæн
 * 2) Ног кæны массивы фæстиуæг ног бæрæггæнæнтæй
 * 3) Вæрд цæуынц urlPool -ы статус
 * 
 * 
 * */
function procUrls(urlPool) {

  // before sending new batch for crawling
  // make sure current batch is processed
  // each batch gets 5 tries
  // if all urls are not prcessed with in 5 tries, batch is cleared
  let batchStatus = Object.keys(currentBatch).map(u => currentBatch[u]); // stores status of current batch in the form of true or false flags
  if(batchStatus.indexOf(false) > -1 && numberOfTries < 5) { // if even 1 false is present, it means the batch is being processed
    batchInProgress = true;
    numberOfTries++;
    return;
  } else {
    numberOfTries = 0;
    clearUnableUrls(currentBatch);
    batchInProgress = false;
    batchSize = 0;
    currentBatch = {};
    batchStatus = [];
    // writing to output
    // so even if user stops the process
    // he or she can view the result till that point
    fs.writeFile('output.json', JSON.stringify(output, null, 2), (err) => {
      if (err) throw err;
    });
  }

  for(uri in urlPool) {

    // if a url has not been processed and batch has some space
    // add the uri to the batch and send it for crawling
    if(!urlPool[uri] && batchSize < batchLim) {

      currentBatch[uri] = false;
      batchSize++;
      batchInProgress = true;

      crawlSinglePage(uri)
        .then(singlePageData => {

          // updating status of current uri in urlPool
          if(singlePageData) {
            urlPool[singlePageData.uri] = true;
            currentBatch[singlePageData.uri] = true;
          }

          // updating urlPool with newly discoverd links
          const newHyperlinks = singlePageData.internalHyperlinks;
          for(let i = 0, len = newHyperlinks.length; i < len; i++) {
            if(!(newHyperlinks[i] in urlPool) && UrlWorking(newHyperlinks[i])) {
              if(!(newHyperlinks[i].slice(0, - 1) in urlPool)) { // to take care of trailing slashes
                urlPool[newHyperlinks[i]] = false;
              }
            }
          }

          // updating output array with new page data
          if(!crawledUrls.includes(singlePageData.uri)) {
            crawledUrls.push(singlePageData.uri);
            output.push({
              uri: singlePageData.uri,
              assets: singlePageData.assets
            });
          }
        })
        .catch((error) => console.log(error));

    }

  }
}
//скусы кæд бæтч цалдæр хатт кусынмæ бахъавыд urlтæ бæтчы цæуынц фыст куыд true
function clearUnableUrls(currentBatch) {
  for(page in currentBatch) {
    if(!urlPool[page.uri]) {
      urlPool[page.uri] = true;
    }
  }
};

// ацы функци алы фондз уысмы басгары краулингы куыст æмæ кæд алкæцы urlимæ бакуыста, уæд раздахы фæстиуæг, кæд нæ, уæд фæдзуры функци procUrls -мæ
function CrawlerCheck() {

  const urlPoolStatus = Object.keys(urlPool).map(u => urlPool[u]); // url pool status contains true or false depending on if a url has been processed
  const allUrlsProcessed = urlPoolStatus.indexOf(false) === -1 ? true : false; // even if there is one false, crawling is still in progress
  if(!allUrlsProcessed) {
    procUrls(urlPool);
    setTimeout(CrawlerCheck, 5000);
  } else {
    fs.writeFile('output.json', JSON.stringify(output, null, 2), (err) => {
      if (err) throw err;
      console.log('Результат сохранен! Надо открыть файл output.json');
      process.exit();
    });
  }

  // ног кæны консолы статус
  const CrawleddUrls = output.length;
  console.log("Найдено страниц\t", Object.keys(urlPool).length);
  console.log("Обработано страниц\t", CrawleddUrls);
  console.log('##############################################');

}


// ам арæзт æрцæуынц рæвдзгæнæнтæ æмæ райдауы краулингы куыст
function raidau() {

  // фыццаг url краулингæн
  const startPath = UrlInputted(argumentss.domain);
  urlPool[startPath] = false;

  // терминалæй исы бæтчы бæрц æви æвæры хинымæц
  batchLim = argumentss.batch || 7;

  // кæсы robots.txt æмæ æвæры дзы бангонд urlтæ массивы: UrlBann
  getBannedUrls(startPath)
    .then(data => {
      UrlBann = data;
    })
    .catch(() => {
      UrlBann = []
    })

  // Райдауы краулинг
  setTimeout(CrawlerCheck, 5000);

}

raidau();
