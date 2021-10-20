import { Note } from './note';

export const NOTES: Note[] = [
    {
      title: 'Ceci est un texte',
      text: `r[] test
y-> test
-> test`,
      date: new Date(2021, 9, 7, 14, 37, 0),
      archive: false
    },
    {
      title: '11',
      date: new Date(2021, 9, 6),
      archive: false,
      text: `a[.] Dr Nice
b(.) objectives :
g(x) nice person
() very nice person`
    },
    {
      title: '12',
      date: new Date(2021, 9, 5),
      archive: false,
      text: `Narco
[!] leptic 
[^] a narcoleptic`
    },
    {
      title: '13',
      date: new Date(2021, 9, 4),
      archive: false,
      text: ':-) Bombasto'
    },
    {
      title: '14',
      date: new Date(2021, 9, 3),
      archive: false,
      text: 'Celeritas'
    },
    {
      title: '15',
      date: new Date(2021, 9, 2),
      archive: false,
      text: 'Magneta'
    },
    {
      title: '16',
      date: new Date(2021, 9, 1),
      archive: false,
      text: 'RubberMan'
    },
    {
      title: '17',
      date: new Date(2021, 8, 30),
      archive: false,
      text: 'Dynama'
    },
    {
      title: '18',
      date: new Date(2021, 8, 29),
      archive: false,
      text: 'Dr IQ'
    },
    {
      title: '19',
      date: new Date(2021, 8, 28),
      archive: true,
      text: 'Magma'
    },
    {
      title: '20',
      date: new Date(2021, 8, 27),
      archive: false,
      text: 'Tornado\noh yeah'
    }
].reverse();
