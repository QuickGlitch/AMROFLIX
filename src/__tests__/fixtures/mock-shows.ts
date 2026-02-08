export const mockShow: TVMazeShow = {
  id: 1,
  url: 'https://www.tvmaze.com/shows/1/under-the-dome',
  name: 'Under the Dome',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama', 'Science-Fiction', 'Thriller'],
  status: 'Ended',
  runtime: 60,
  averageRuntime: 60,
  premiered: '2013-06-24',
  ended: '2015-09-10',
  officialSite: 'http://www.cbs.com/shows/under-the-dome/',
  schedule: {
    time: '22:00',
    days: ['Thursday'],
  },
  rating: {
    average: 6.5,
  },
  weight: 98,
  network: {
    id: 2,
    name: 'CBS',
    country: {
      name: 'United States',
      code: 'US',
      timezone: 'America/New_York',
    },
    officialSite: 'https://www.cbs.com/',
  },
  webChannel: null,
  dvdCountry: null,
  externals: {
    tvrage: 25988,
    thetvdb: 264492,
    imdb: 'tt1553656',
  },
  image: {
    medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
    original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
  },
  summary: '<p><b>Under the Dome</b> is the story of a small town...</p>',
  updated: 1631010933,
  _links: {
    self: {
      href: 'https://api.tvmaze.com/shows/1',
    },
  },
}

export const mockShow2: TVMazeShow = {
  id: 253,
  url: 'https://www.tvmaze.com/shows/253/hells-kitchen',
  name: "Hell's Kitchen",
  type: 'Reality',
  language: 'English',
  genres: ['Food'],
  status: 'To Be Determined',
  runtime: 60,
  averageRuntime: 60,
  premiered: '2005-05-30',
  ended: null,
  officialSite: 'https://www.fox.com/hells-kitchen',
  schedule: {
    time: '20:00',
    days: ['Thursday'],
  },
  rating: {
    average: 6.8,
  },
  weight: 99,
  network: {
    id: 4,
    name: 'FOX',
    country: {
      name: 'United States',
      code: 'US',
      timezone: 'America/New_York',
    },
    officialSite: 'https://www.fox.com/',
  },
  webChannel: null,
  dvdCountry: null,
  externals: {
    tvrage: 3828,
    thetvdb: 74897,
    imdb: 'tt0437005',
  },
  image: {
    medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/587/1469625.jpg',
    original: 'https://static.tvmaze.com/uploads/images/original_untouched/587/1469625.jpg',
  },
  summary:
    "\u003Cp\u003EIn \u003Cb\u003EHell's Kitchen\u003C/b\u003E, aspiring chefs are put through an intense culinary academy to prove they possess the right combination of ingredients to win a life-changing grand prize.\u003C/p\u003E",
  updated: 1769811750,
  _links: {
    self: {
      href: 'https://api.tvmaze.com/shows/253',
    },
    previousepisode: {
      href: 'https://api.tvmaze.com/episodes/3481815',
      name: 'The Last State Standing Is...',
    },
  },
}
