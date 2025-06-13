export const SelectTravelersList = [
  {
    id: 1,
    title: 'Just Me',
    icon: '✈️',
    people: '1 Person',
    desc: 'A solo traveler in exploration',
  },
  {
    id: 2,
    title: 'A Couple',
    icon: '🥂',
    people: '2 People',
    desc: 'Two travelers in tandem',
  },
  {
    id: 3,
    title: 'Family',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 People',
    desc: 'A group of fun-loving adventurers',
  },
  {
    id: 4,
    title: 'Friends',
    icon: '🧑‍🤝‍🧑',
    people: '5 to 10 People',
    desc: 'A bunch of thrill-seekers',
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    icon: '💸',
    desc: 'Stay conscious of costs',
  },
  {
    id: 2,
    title: 'Moderate',
    icon: '💰',
    desc: 'Keep costs on the average side',
  },
  {
    id: 3,
    title: 'Luxury',
    icon: '💎',
    desc: "Don't worry about cost",
  },
];

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {days} days with each day plan with best time to visit in JSON format.';