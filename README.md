# Web Crawler
# Хуымæтæг Веб-Краулер
# Простой Веб-Краулер
####Simple web crawler built using Node.js

####Хуымæтæг веб-краулер Node.js-ы фæрцы

####Простой веб-крауел используя Node.js


## Getting Started

## Куыд хъæуы райдайын кусын

## Как следует начать работать

- Clone the repo or download the zip file, and `cd` into the project folder.
- Install dependencies and run the crawler on your site!

- Скъопи кæн æви æрбавгæн zip файл æмæ 'cd' йы уылтыл бахиз проекты папкæмæ.
- Сæвæр цы пакеттæ хъæуынц куыстæн æмæ скусын кæн краулеры дæ сайты!

- Клонируйте репозиторий или загрузите zip-файл и `cd` в папку проекта.
- Установите зависимости и запустите краулер на вашем сайте!

```
npm install
node index.js --domain https://vikaslalwani.com --batch 5
```
###Arguments:
###Аргументтæ:
###Аргументы:

- `domain`: sub-domain on which you want to run the crawler. Please note that this crawler will not cross sub-domains.
- `batch`: instead of sending plenty of requests at once, it restricts the number to the batch size you enter. Only after finishing a batch it will pick next batch.

- `domain`: субдомен, кæм дæ фæнды дæ краулер скусын кæнын. Хъус æрдар ацы краулер нæ рахизы суб-доментæй уæлдæр.
- `batch`: цæмæй бирæ курдиаттæ ма æрвитай æмрæстæджы, уый тыххæй арæнæвæры курдиæтты нымæцы. Ома, цалынмæ иу парти ма фæуа, уæдмæ иннæ парти не скусдзæн.

- `domain`: поддомен, на котором вы хотите запустить краулер. Обратите внимание, что этот искатель не будет пересекать поддомены.
- `batch`: вместо того чтобы посылать множество запросов одновременно, он ограничивает их количество размером пакета, который вы вводите. Только после окончания партии он выберет следующую партию.

**Note:** A batch gets only five tries before next one begins. That's why you shoud not keep very high batch size. 5 is the default.
**Хъусдард:** Парти исы æрмæст 5 фæлварæны цалынмæ ма райдауа иннæ кусын. Уый тыххæй партийы бæрц стырæй ма дар. 5 у æнæивдæй.
**Внимание:** Партия получает только пять попыток, прежде чем начнется следующая. Вот почему вы не должны держать очень высокий размер партии. 5 - это значение по умолчанию.


PS: 5 is a good number. Just saying!
PS: 5 хорз нымæц у. Мæнмæ афтæ кæсы!
PS: 5 - хорошее число. Просто говорю!


## Features
## Миниуджытæ
## Особенности
This crawler is designed for gathering a subdomain's assets:

- Crawls all pages of a subdomain. Excludes other subdomains.
- Generates JSON output listing the URLs of every static asset(images, javascript, stylesheets), grouped by page.
- Respects `robots.txt` of a site.
- Batches the requests to avoid sending too many requests. Ideally, it will run at 1 page per second.
- Keeps saving the output to `output.json` file locally. So even if you stop it midway, you will get your results.
- Only crawls `html` pages. Ignores images and pdfs.
- Gracefully ignores `404` pages.

Ацы краулер арæзт у æмбырд кæнын субдомены ресурстæн:

- Абыры алы фæрстыл субдомены. Иннæ субдоментæм нæ хизы.
- Генераци кæны JSONы хуызы номхыгъд, кæм ис URLтæ алкæцы ресурсæн(нывтæ, javascript, css), кæдон группæ гонд сты фæрстæм гæсгæ.
- Кад кæны сайты `robots.txt`æн.
- Ныппарти кæны курдиаттæ, цæмæй бирæ ма æрвита курдиæттæ. Хъуыдымæ гæсгæ иу сыф алы уысм уыны.
- Бафснайы иу фæстиуджытæ `output.json` файлы. Кæд æрдæг фæндагыл дæр æрлæууын кæнай краулер, уæддæр райсдзынæ фæстиуæг.
- Архайы æрмæст `html` сыфтимæ. Нывтыл æмæ pdfтыл хъоды кæны.
- Нæ кусы `404` сыфтимæ.

Этот искатель предназначен для сбора ресурсов поддомена:

- Обходит все страницы поддомена. Исключает другие поддомены.
- Генерирует вывод JSON с перечислением URL-адресов каждого статического ресурса(изображения, javascript, таблицы стилей), сгруппированных по страницам.
- Уважает `robots.txt-о месте.
- Пакетирует запросы, чтобы избежать отправки слишком большого количества запросов. В идеале он будет работать со скоростью 1 страница в секунду.
- Сохраняет вывод в файл output.json локально. Поэтому, даже если вы остановите его на полпути, вы получите свои результаты.
- Только обходит `html` страницы. Игнорирует изображения и PDF-файлы.
- Изящно игнорирует " 404` страницы.


## Components
## Компоненттæ
## Компоненты


```
.
├── README.md // you are here
├── crawlSinglePage.js // crawls one page at a time
├── index.js // manages the crawler. script starts here
├── node_modules // dependencies
├── output.json // final output
├── package.json // meta data about app
├── parseUrl.js // parses input url
├── robots.js // parses robots.txt
└── robots.txt // stores a site's robots.txt if one exists
```

```
.
├── README.md // ды ам дæ
├── crawlSinglePage.js // абыры иу сыфыл 
├── index.js // къухдариуæггад кæны краулерæй. Скрипттæ райдауынц ардыгæй.
├── node_modules // бастдзинæдтæ
├── output.json // фæстиуджытæ
├── package.json // мета информаци æфтуаны тыххæй
├── parseUrl.js // парс кæны бацæугæ url
├── robots.js // парс кæны robots.txt
└── robots.txt // æфснайы robots.txt кæд дзы ис
```

```
.
├── README.md // ты здесь
├── crawlSinglePage.js // ползает по одной странице за раз
├── index.js // управляет краулером. сценарий начинается здесь
├── node_modules // зависимости
├── output.json // конечный результат
├── package.json // метаданные о приложении
├── parseUrl.js // анализирует входной URL-адрес
├── robots.js // разбирает robots.txt
└── robots.txt // хранит информацию о сайте robots.txt если он существует
```

## How it works
## Куыд кусы
## Как это работает


###Overview:
- Input url is parsed.
- Crawling starts at the given page. Each crawl:
  - returns that pages's assets
  - more hyperlinks from that page
- Newly discovered urls are added to the pool.
- Crawler goes to more urls, and extract assets and even more urls.
- Once all urls are crawled, program ends. 

###Афæлгæст:
- Цы url ныффыссай, уый парс кæны.
- Краулинг райдауы бадæтгæ сыфæй. Алкæцы цикл:
  - æрбаздахы сыфы ресурстæ
  - фылдæр æрвитæнтæ ацы фарсæй
- Ног æрвитæнтæ æфтыд цæуынц пулмæ.
- Краулер фылдæр urlтæм ацæуы, æмæ æрбавгæны фылдæр ресурстæ æмæ urlтæ.
- Куы фæуа urlты анализ, уæд программæ фæуы йæ куыст.

###Обзор:
- Входной URL-адрес анализируется.
- Ползание начинается с заданной страницы. Каждый обход:
 - возвращает активы этой страницы
 - больше гиперссылок с этой страницы
- Вновь обнаруженные URL-адреса добавляются в пул.
- Crawler переходит к большему количеству URL-адресов и извлекает активы и еще больше URL-адресов.
- После обхода всех URL-адресов программа завершается.


###Inside code:
- Code starts with `index.js`, where `init` function:
  - parses the input url using `parseUrl.js` module and adds it to url pool.
  - fetches `robots.txt` using `robots.json` and stores banned urls in `bannedUrls` array.
  - calls `checkCrawlingStatus` function.
- Next, `checkCrawlingStatus` keeps an eye on url pool. If all urls in the pool are processed it ends the program, if not, it calls `processUrlPool` function. It keeps calling `processUrlPool` every 5 seconds.
- `processUrlPool` makes batches of certain size and fetches data from those pages using `crawlSinglePage.js` module. Only after finishing current batch, next one gets formed.
- `crawlSinglePage.js` sends `GET` requests to individual pages and returns an object containing input url, page assets and newly discovered links.
- The newly discovered urls are added to the pool and `checkCrawlingStatus.js` notices them in the next cycle.
- Output file is appended after each batch is processed.
- Once all the urls in the pool are done, program stops.

###Коды мидæг:
- Код райдауы `index.js`æй, уым ис `init` функци, кæцы:
  - парс кæны бадæтгæ url, ацы модулы фæрцы `parseUrl.js` æмæ йæ бафтауы url пулмæ
  - æрбавгæны `robots.txt`  `robots.json`ы фæрцы æмæ æфснайы хъодыгонд urlтæ `bannedUrls` массивы.
  - фæдзуры `checkCrawlingStatus` функцимæ.
- Дарддæр, `checkCrawlingStatus` йæ хъус дары пулмæ. Кæд пулы адристæ фесты, уæд куыст æрлæууы; кæд нæйы, уæд фæдзуры  `processUrlPool` функцимæ. Алы хатт дзуры  `processUrlPool` алы 5 уысмы.
- `processUrlPool` аразы партитæ сæрмагонд бæрцæй æмæ æвгæны бæрæггæнæнтæ  `crawlSinglePage.js` модулы фæрцы. Кæд ацы парти фæуа, иннæ парти аразын райдауы.
- `crawlSinglePage.js` æрвиты `GET` курдиæттæ æмæ раздахы объект, кæцыйы ис бадæтгæ  url, ресурстæ æмæ ног æрвитæнтæ.
- Ног æрвитæнтæ пулмæ бафтыд вæййынц æмæ `checkCrawlingStatus.js` фены сæ иннæ циклы.
- Фæстиуджыты файлмæ бафтыд вæййынц алы партийы фæстæ.
- Кæд пулы нал ис æрвитæнтæ, уæд программæ æрлæууы.


###Внутренний код:
- Код начинается с `index.js`, где функция `init` :
 - анализирует входной URL-адрес с помощью `parseUrl.js` модуля и добавляет его в пул URL-адресов.
 - фетчи `robots.txt` используя ' robots.json` и храня запрещенные URL-адреса в массиве `bannedUrls`.
 - вызывает функцию checkCrawlingStatus.
- Далее, " checkCrawlingStatus` следит за пулом URL-адресов. Если все URL-адреса в пуле обработаны, то программа завершает работу, если нет, то она вызывает функцию processUrlPool. Он продолжает вызывать " processUrlPool` каждые 5 секунд.
- `processUrlPool` делает пакеты определенного размера и извлекает данные с этих страниц с помощью `crawlSinglePage.js` модуль. Только после окончания текущей партии формируется следующая.
- `crawlSinglePage.js` отправляет запросы `GET` на отдельные страницы и возвращает объект, содержащий входной URL-адрес, ресурсы страницы и вновь обнаруженные ссылки.
- Вновь обнаруженные URL-адреса добавляются в пул и `checkCrawlingStatus.js-замечает их в следующем цикле.
- Выходной файл добавляется после обработки каждого пакета.
- Как только все URL-адреса в пуле будут сделаны, программа остановится.




## Known Issues

- If no protocol given, it assumes `https`.
- `about` and `about.html` pages will be treated differently.
- Both `http` and `https` pages will be crawled.
- Does not respect canonical tags.
- Does not respect individual page's meta-robot tags.
- Does not handle redirects.
- Although it works, there are no unit tests yet :(

## Зындгонд рæдыдтытæ

- Кæд протокол нæ ныффыстай, уæд хъуыды кæны, ома у `https`.
- `about` æмæ `about.html`имæ æндæрхуызон архайдзæн.
- `http` æмæ `https` сыфтæ ныккраул кæндзæн.
- Нæ кады кæны каноникон тегтæн.
- Нæ кад кæны индивидуалон сыфты мета-роботы тегтæн.
- Редиректтимæ нæ архайы.
- Кусы, фæлæ йын нæй юнитесттæ :(

## Известные проблемы

- Если протокол не указан, он предполагает " https`.
- `о` и `about.html-со страницами будут обращаться по-другому.
- Будут сканироваться как "http", так и "https" страницы.
- Не уважает канонические теги.
- Не уважает теги мета-роботов отдельных страниц.
- Не обрабатывает редиректы.
- Хотя это работает, модульных тестов пока нет :(
