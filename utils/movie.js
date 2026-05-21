const movie = [
  {
    id: 1,
    title: "Superman",
    description: "A fresh reboot of Superman where Clark Kent balances his Kryptonian legacy with life on Earth while facing powerful enemies.",
    genre: "Action, Sci-Fi",
    rating: 7.0,
    year: 2025,
    duration: "2h 9min",
    image: "https://images.unsplash.com/photo-1580130775562-0ef92da028de?q=80&w=750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "Weapons",
    description: "A mysterious horror-thriller exploring interconnected crimes and chilling secrets in a small town.",
    genre: "Horror, Thriller",
    rating: 7.3,
    year: 2025,
    duration: "2h",
    image: "https://images.unsplash.com/photo-1511875762315-c773eb98eec0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "Sinners",
    description: "A dark vampire tale set in the American South, blending horror with deep social themes.",
    genre: "Horror, Drama",
    rating: 7.5,
    year: 2025,
    duration: "2h 17min",
    image: "https://images.unsplash.com/photo-1580130544346-77d05d03d742?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    title: "One Battle After Another",
    description: "A revolutionary story about resistance and personal struggle set in a politically charged world.",
    genre: "Drama, Action",
    rating: 7.7,
    year: 2025,
    duration: "2h 41min",
    image: "https://plus.unsplash.com/premium_photo-1746874360892-9c77def65b97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fG1vdmllJTIwcG9zdGVyfGVufDB8fDB8fHww"
  },
  {
    id: 5,
    title: "Jurassic World: Rebirth",
    description: "A new dinosaur adventure that reignites the Jurassic franchise with fresh characters and chaos.",
    genre: "Adventure, Sci-Fi",
    rating: 5.8,
    year: 2025,
    duration: "2h 13min",
    image: "https://images.unsplash.com/photo-1774978239591-bccde732a2f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMzfHxtb3ZpZSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 6,
    title: "Frankenstein",
    description: "A gothic retelling of the classic tale exploring creation, humanity, and consequences.",
    genre: "Fantasy, Horror",
    rating: 7.4,
    year: 2025,
    duration: "2h 29min",
    image: "https://images.unsplash.com/photo-1593600014171-b11561e74ac5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY3fHxtb3ZpZSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 7,
    title: "Happy Gilmore 2",
    description: "The return of the iconic golfer in a comedy sequel filled with chaos and sports humor.",
    genre: "Comedy, Sports",
    rating: 6.8,
    year: 2025,
    duration: "1h 55min",
    image: "https://images.unsplash.com/photo-1742822050771-588f61785322?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTcwfHxtb3ZpZSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 8,
    title: "Thunderbolts",
    description: "A team of anti-heroes is assembled for dangerous missions in this Marvel action-packed film.",
    genre: "Action, Superhero",
    rating: 7.2,
    year: 2025,
    duration: "2h 10min",
    image: "https://plus.unsplash.com/premium_photo-1664382261665-9142b3a2b85d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY4fHxtb3ZpZSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 9,
    title: "Mission: Impossible – Final Reckoning",
    description: "Ethan Hunt faces his biggest mission yet in this explosive finale of the franchise.",
    genre: "Action, Thriller",
    rating: 7.6,
    year: 2025,
    duration: "2h 30min",
    image: "https://images.unsplash.com/photo-1635746736111-c007b1cca261?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTczfHxtb3ZpZSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 10,
    title: "F1: The Movie",
    description: "A former Formula 1 driver returns to racing in this high-speed sports drama.",
    genre: "Sports, Action",
    rating: 7.6,
    year: 2025,
    duration: "2h 35min",
    image: "https://plus.unsplash.com/premium_photo-1727896376162-620ded0fce68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg4fHxtb3ZpZSUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D"
  }
];

export default movie;