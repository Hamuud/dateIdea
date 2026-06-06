import volodari from '../assets/volodari.webp'
import brudnihroshi from '../assets/brudnihroshi.webp'
import duzhestrashnekino from '../assets/duzhestrashnekino.webp'
import prada from '../assets/prada.webp'
import planLondon from '../assets/planLondon.webp'
import michael from '../assets/michael.webp'

const movies = [
  {
    id: 1,
    title: 'Masters of the Universe',
    titleUA: 'Володарі Всесвіту',
    genre: 'Adventure, Action, Sci-Fi',
    showtimes: ['18:40'],
    poster: volodari,
    color: '#1a1a4e',
    trailerUrl: 'https://www.youtube.com/embed/ti_SLJZbueA',
  },
  {
    id: 2,
    title: 'IN THE GREY',
    titleUA: 'Брудні гроші',
    genre: 'Thriller, Action',
    showtimes: ['18:30', '20:30'],
    poster: brudnihroshi,
    color: '#2d1b36',
    trailerUrl: 'https://www.youtube.com/embed/Ji0Cg5W_R0A',
  },
  {
    id: 3,
    title: 'Scary Movie',
    titleUA: 'Дуже страшне кіно',
    genre: 'Comedy, Horror, Parody',
    showtimes: ['18:00', '20:00', '21:25'],
    poster: duzhestrashnekino,
    color: '#1b2d1b',
    trailerUrl: 'https://www.youtube.com/embed/yR3ECoK3inI',
  },
  {
    id: 4,
    title: 'THE DEVIL WEARS PRADA 2',
    titleUA: 'Диявол Носить Правда 2',
    genre: 'Drama, Comedy',
    showtimes: ['20:55'],
    poster: prada,
    color: '#3d1a1a',
    trailerUrl: 'https://www.youtube.com/embed/DY8JOXAKsnk',
  },
  {
    id: 5,
    title: 'FUZE',
    titleUA: 'Пограбування: План "Лондон"',
    genre: 'Thriller, Action',
    showtimes: ['19:00'],
    poster: planLondon,
    color: '#1a2d3d',
    trailerUrl: 'https://www.youtube.com/embed/BcY9CZ46_zQ',
  },
  {
    id: 6,
    title: 'Michael',
    titleUA: 'Майкл',
    genre: 'Biopic',
    showtimes: ['18:15', '20:45'],
    poster: michael,
    color: '#2d2d1a',
    trailerUrl: 'https://www.youtube.com/embed/uZZMPBhl0AY',
  },
]

export default movies
