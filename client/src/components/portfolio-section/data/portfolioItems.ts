export interface PortfolioItem {
    id: number;
    youtubeId: string;
    title: string;
    category: string;
    description: string;
}

export const portfolioItems: PortfolioItem[]  = [
  {
    id: 1,
    youtubeId: "Dna_GeK2gUU", // Replace with your actual YouTube video ID
    title: "Kincrest - The Gift of Memories",
    category: "Services",
    description: "A heartfelt message showcasing appreciation to life.",
  },
  {
    id: 2,
    youtubeId: "GTXT-3vWeII", // Replace with your actual YouTube video ID
    title: "Bladestar Renewables",
    category: "Energy",
    description: "Video showcasing work at the Bladestar turbines.",
  },
  {
    id: 3,
    youtubeId: "_Jdu7LDRtTo", // Replace with your actual YouTube video ID
    title: "Alcohol Companies Collection",
    category: "Alcohol",
    description: "Targeted alcohol videography sessions",
  },
  {
    id: 4,
    youtubeId: "Bix3EpNUeq4", // Replace with your actual YouTube video ID
    title: "Count Clays Shooting Academy Highlights",
    category: "Sports",
    description: "Showcasing a day of shooting and field sports.",
  }
];