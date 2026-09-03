const calculateLevel = (xp) => {

  xp = Number(xp || 0); 
  
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 800) return 4;
  if (xp < 1200) return 5;

  return Math.floor(xp / 250) + 2;
};


const getRank = (level) => {

  if (level >= 10)
    return "Eco Master";

  if (level >= 7)
    return "Eco Champion";

  if (level >= 5)
    return "Eco Hero";

  if (level >= 3)
    return "Green Explorer";

  return "Eco Beginner";
};


module.exports = {
  calculateLevel,
  getRank,
};