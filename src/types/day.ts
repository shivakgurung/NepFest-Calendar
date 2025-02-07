export interface Day {
    n: string; // Nepali date (e.g. '१')
    e: string; // English date (e.g. '14')
    t: string; // Tithi (e.g. 'प्रतिपदा')
    f: string; // Festival name (e.g. 'माघे संक्रान्ति, माघी पर्व')
    h: boolean; // Whether it's a holiday (true/false)
  }