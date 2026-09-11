/**
 * Curated Character Database (~100 Top & Famous Characters)
 * Covers One Piece, Naruto, and Marvel
 * Includes LocalStorage Persistence & Roster Editor APIs
 */

const STORAGE_KEY = 'anime_draft_roster_v2';

// 1. One Piece — Straw Hats & most famous legends
const ONE_PIECE = [
  { name: "Monkey D. Luffy", epithet: "Straw Hat / Emperor", affiliation: "Straw Hat Pirates", role: "Captain", bounty: 3000000000, power: "Hito Hito no Mi: Nika (Gear 5)", techniques: ["Bajrang Gun", "Conqueror's Infusion"], color: "#e63946" },
  { name: "Roronoa Zoro", epithet: "King of Hell", affiliation: "Straw Hat Pirates", role: "Swordsman", bounty: 1111000000, power: "Three-Sword Style / Enma", techniques: ["Ashura Nine Blades", "Dragon Damnation"], color: "#2a9d8f" },
  { name: "Nami", epithet: "Cat Burglar", affiliation: "Straw Hat Pirates", role: "Navigator", bounty: 366000000, power: "Sorcery Clima-Tact & Zeus", techniques: ["Zeus Breeze Tempo", "Thunderbolt"], color: "#f4a261" },
  { name: "Usopp", epithet: "God Usopp", affiliation: "Straw Hat Pirates", role: "Sniper", bounty: 500000000, power: "Kuro Kabuto & Pop Greens", techniques: ["Firebird Star", "Observation Sniping"], color: "#d4a373" },
  { name: "Sanji", epithet: "Black Leg", affiliation: "Straw Hat Pirates", role: "Cook", bounty: 1032000000, power: "Ifrit Jambe & Germa Body", techniques: ["Boeuf Burst", "Hell Memories"], color: "#e9c46a" },
  { name: "Tony Tony Chopper", epithet: "Cotton Candy Lover", affiliation: "Straw Hat Pirates", role: "Doctor", bounty: 1000, power: "Hito Hito no Mi (Monster Point)", techniques: ["Monster Palm", "Kung Fu Point"], color: "#e76f51" },
  { name: "Nico Robin", epithet: "Devil Child", affiliation: "Straw Hat Pirates", role: "Archaeologist", bounty: 930000000, power: "Hana Hana no Mi (Demonio Fleur)", techniques: ["Demonio Fleur", "Gigante Fleur"], color: "#6a4c93" },
  { name: "Franky", epithet: "Iron Man Franky", affiliation: "Straw Hat Pirates", role: "Shipwright", bounty: 394000000, power: "Battle Franky Cyborg", techniques: ["Radical Beam", "General Cannon"], color: "#0077b6" },
  { name: "Brook", epithet: "Soul King", affiliation: "Straw Hat Pirates", role: "Musician", bounty: 383000000, power: "Yomi Yomi no Mi & Soul Solid", techniques: ["Underworld Chill", "Hanauta Sancho"], color: "#264653" },
  { name: "Jinbe", epithet: "Knight of the Sea", affiliation: "Straw Hat Pirates", role: "Helmsman", bounty: 1100000000, power: "Fish-Man Karate Secret Art", techniques: ["Vagabond Drill", "Demon Brick"], color: "#1d3557" },
  { name: "Nefertari Vivi", epithet: "Princess of Arabasta", affiliation: "Straw Hat Honorary", role: "Princess", bounty: 0, power: "Peacock Slasher String", techniques: ["Peacock Slash", "Royal Diplomacy"], color: "#90e0ef" },
  { name: "Gol D. Roger", epithet: "King of the Pirates", affiliation: "Roger Pirates", role: "Pirate King", bounty: 5564800000, power: "Supreme Conqueror's (Divine Departure)", techniques: ["Conqueror's Haki"], color: "#b91c1c" },
  { name: "Silvers Rayleigh", epithet: "The Dark King", affiliation: "Roger Pirates", role: "First Mate", bounty: 2500000000, power: "Master of All Three Haki", techniques: ["Haki Mastery"], color: "#1e3a8a" },
  { name: "Kozuki Oden", epithet: "Lord of Kuri", affiliation: "Kozuki Clan", role: "Daimyo", bounty: 3500000000, power: "Two-Sword Style: Togen Totsuka", techniques: ["Togen Totsuka"], color: "#b91c1c" },
  { name: "Edward Newgate", epithet: "Whitebeard", affiliation: "Whitebeard Pirates", role: "Emperor", bounty: 5046000000, power: "Gura Gura no Mi (Tremor)", techniques: ["Seaquake Fist"], color: "#1e3a8a" },
  { name: "Marco", epithet: "Marco the Phoenix", affiliation: "Whitebeard Pirates", role: "1st Commander", bounty: 1374000000, power: "Tori Tori no Mi: Phoenix", techniques: ["Phoenix Flame Regeneration"], color: "#b91c1c" },
  { name: "Portgas D. Ace", epithet: "Fire Fist Ace", affiliation: "Whitebeard Pirates", role: "2nd Commander", bounty: 550000000, power: "Mera Mera no Mi (Flame)", techniques: ["Fire Fist"], color: "#1e3a8a" },
  { name: "Shanks", epithet: "Red-Haired Shanks", affiliation: "Red Hair Pirates", role: "Emperor", bounty: 4048900000, power: "Divine Departure Conqueror's", techniques: ["Conqueror's Haki"], color: "#b91c1c" },
  { name: "Benn Beckman", epithet: "First Mate / Strategist", affiliation: "Red Hair Pirates", role: "First Mate", bounty: 2200000000, power: "Armament Rifle & Super Genius", techniques: ["Sharpshooting"], color: "#1e3a8a" },
  { name: "Kaido", epithet: "King of the Beasts", affiliation: "Beasts Pirates", role: "Emperor", bounty: 4611100000, power: "Uo Uo no Mi: Azure Dragon", techniques: ["Bolo Breath"], color: "#b91c1c" },
  { name: "King", epithet: "The Conflagration", affiliation: "Beasts Pirates", role: "Lead Performer", bounty: 1390000000, power: "Pteranodon & Lunarian Fire", techniques: ["Fire Dive"], color: "#1e3a8a" },
  { name: "Queen", epithet: "The Plague", affiliation: "Beasts Pirates", role: "Lead Performer", bounty: 1320000000, power: "Brachiosaurus Cyborg Viral Plagues", techniques: ["Ice Blitzkrieg"], color: "#b91c1c" },
  { name: "Charlotte Linlin", epithet: "Big Mom", affiliation: "Big Mom Pirates", role: "Emperor", bounty: 4388000000, power: "Soru Soru no Mi (Souls)", techniques: ["Homies Summon"], color: "#1e3a8a" },
  { name: "Charlotte Katakuri", epithet: "Unbeaten Commander", affiliation: "Big Mom Pirates", role: "Sweet Commander", bounty: 1057000000, power: "Mochi Mochi & Future Sight", techniques: ["Power Mochi"], color: "#b91c1c" },
  { name: "Marshall D. Teach", epithet: "Blackbeard", affiliation: "Blackbeard Pirates", role: "Emperor", bounty: 3996000000, power: "Darkness & Tremor Fruits", techniques: ["Black Hole"], color: "#1e3a8a" },
  { name: "Kuzan", epithet: "Aokiji", affiliation: "Former Marine Admiral", role: "Admiral", bounty: 0, power: "Hie Hie no Mi (Ice-Ice)", techniques: ["Ice Age"], color: "#48cae4" },
  { name: "Borsalino", epithet: "Kizaru", affiliation: "Marines", role: "Admiral", bounty: 0, power: "Pika Pika no Mi (Light)", techniques: ["Yasakani no Magatama"], color: "#f9c74f" },
  { name: "Sakazuki", epithet: "Akainu", affiliation: "Marines", role: "Fleet Admiral", bounty: 0, power: "Magu Magu no Mi (Magma)", techniques: ["Great Eruption"], color: "#c1121f" },
  { name: "Monkey D. Garp", epithet: "Hero of the Marines", affiliation: "Marines", role: "Vice Admiral", bounty: 0, power: "Legendary Fist Strength", techniques: ["Fist of Love"], color: "#495057" },
  { name: "Dracule Mihawk", epithet: "Greatest Swordsman", affiliation: "Former Warlord", role: "World's Strongest Swordsman", bounty: 3590000000, power: "Kokuto Yoru Mastery", techniques: ["Black Sword Slash"], color: "#212529" },
  { name: "Boa Hancock", epithet: "Pirate Empress", affiliation: "Kuja Pirates", role: "Empress", bounty: 1659000000, power: "Mero Mero no Mi (Love-Love)", techniques: ["Love-Love Beam"], color: "#f28482" },
  { name: "Crocodile", epithet: "Mr. 0 / Desert King", affiliation: "Cross Guild", role: "Former Warlord", bounty: 1965000000, power: "Suna Suna no Mi (Sand)", techniques: ["Desert Spada"], color: "#d4a373" },
  { name: "Donquixote Doflamingo", epithet: "Heavenly Demon", affiliation: "Donquixote Pirates", role: "Former Warlord", bounty: 3400000000, power: "Ito Ito no Mi (String)", techniques: ["Overheat"], color: "#f72585" },
  { name: "Trafalgar Law", epithet: "Surgeon of Death", affiliation: "Heart Pirates", role: "Captain", bounty: 3000000000, power: "Ope Ope no Mi (Surgical)", techniques: ["Room: Shambles"], color: "#495057" },
  { name: "Sabo", epithet: "Chief of Staff", affiliation: "Revolutionary Army", role: "Chief of Staff", bounty: 602000000, power: "Mera Mera no Mi (Flame)", techniques: ["Dragon's Claw"], color: "#e76f51" }
];

// 2. Naruto — most famous shinobi & legends
const NARUTO = [
  { name: "Naruto Uzumaki", epithet: "Seventh Hokage / Child of Prophecy", affiliation: "Hidden Leaf (Konoha)", role: "Hokage", bounty: 100000, power: "Nine-Tails Kurama & Six Paths Sage Mode", techniques: ["Rasenshuriken", "Tailed Beast Bomb"], color: "#f77f00" },
  { name: "Sasuke Uchiha", epithet: "Shadow Hokage", affiliation: "Hidden Leaf / Uchiha", role: "Rogue Protector", bounty: 98000, power: "Eternal Mangekyo & Rinnegan", techniques: ["Indra's Arrow", "Amaterasu Black Flames"], color: "#d00000" },
  { name: "Sakura Haruno", epithet: "Medical Master", affiliation: "Hidden Leaf (Konoha)", role: "Medical Chief", bounty: 65000, power: "Byakugou Seal & Monstrous Strength", techniques: ["Cherry Blossom Clash", "Katsuyu Healing"], color: "#f77f00" },
  { name: "Kakashi Hatake", epithet: "The Copy Ninja", affiliation: "Hidden Leaf (Konoha)", role: "Sixth Hokage", bounty: 85000, power: "1,000 Jutsu & Purple Lightning", techniques: ["Raikiri", "Kamui Warp"], color: "#d00000" },
  { name: "Itachi Uchiha", epithet: "Sharingan Prodigy", affiliation: "Akatsuki / Leaf", role: "ANBU Legend", bounty: 95000, power: "Mangekyo Tsukuyomi & Totsuka Blade", techniques: ["Tsukuyomi", "Amaterasu", "Izanami"], color: "#f77f00" },
  { name: "Madara Uchiha", epithet: "Ghost of the Uchiha", affiliation: "Uchiha Clan", role: "Clan Patriarch", bounty: 120000, power: "Perfect Susanoo & Ten-Tails", techniques: ["Tengai Shinsei Meteor", "Infinite Tsukuyomi"], color: "#d00000" },
  { name: "Hashirama Senju", epithet: "First Hokage / God of Shinobi", affiliation: "Hidden Leaf (Konoha)", role: "First Hokage", bounty: 110000, power: "Wood Release (Mokuton) & Sage Mode", techniques: ["True Several Thousand Hands"], color: "#f77f00" },
  { name: "Tobirama Senju", epithet: "Second Hokage", affiliation: "Hidden Leaf (Konoha)", role: "Second Hokage", bounty: 90000, power: "Flying Thunder God & Water Release", techniques: ["Flying Raijin Slash", "Water Dragon"], color: "#d00000" },
  { name: "Hiruzen Sarutobi", epithet: "The Professor", affiliation: "Hidden Leaf (Konoha)", role: "Third Hokage", bounty: 75000, power: "Master of 5 Chakra Natures & Enma", techniques: ["Reaper Death Seal"], color: "#f77f00" },
  { name: "Minato Namikaze", epithet: "Yellow Flash", affiliation: "Hidden Leaf (Konoha)", role: "Fourth Hokage", bounty: 98000, power: "Flying Thunder God & Rasengan Blitz", techniques: ["Flying Raijin Level 2", "Rasengan"], color: "#d00000" },
  { name: "Tsunade", epithet: "Fifth Hokage / Sannin", affiliation: "Hidden Leaf (Konoha)", role: "Fifth Hokage", bounty: 80000, power: "Creation Rebirth & Monstrous Strength", techniques: ["Heavenly Foot of Pain"], color: "#f77f00" },
  { name: "Jiraiya", epithet: "The Toad Sage", affiliation: "Hidden Leaf (Konoha)", role: "Legendary Sannin", bounty: 82000, power: "Mount Myoboku Toad Arts & Sage Mode", techniques: ["Massive Rasengan"], color: "#d00000" },
  { name: "Orochimaru", epithet: "The Snake Sannin", affiliation: "Hidden Sound (Oto)", role: "Sound Founder", bounty: 85000, power: "Eight Branches Technique & Edo Tensei", techniques: ["Reanimation Jutsu", "Kusanagi Blade"], color: "#f77f00" },
  { name: "Obito Uchiha", epithet: "Tobi / Masked Man", affiliation: "Akatsuki", role: "Ten-Tails Jinchuriki", bounty: 105000, power: "Kamui Dimension Intangibility", techniques: ["Kamui Teleport"], color: "#d00000" },
  { name: "Pain (Nagato)", epithet: "God of Six Paths", affiliation: "Akatsuki / Rain", role: "Akatsuki Leader", bounty: 98000, power: "Rinnegan All-Paths Gravity Control", techniques: ["Shinra Tensei", "Chibaku Tensei"], color: "#f77f00" },
  { name: "Gaara", epithet: "Fifth Kazekage", affiliation: "Hidden Sand (Suna)", role: "Kazekage", bounty: 82000, power: "Absolute Sand Defense & Sand Tsunami", techniques: ["Giant Sand Burial"], color: "#d00000" },
  { name: "Might Guy", epithet: "Noble Blue Beast", affiliation: "Hidden Leaf (Konoha)", role: "Taijutsu Master", bounty: 90000, power: "Eight Inner Gates Formation", techniques: ["Night Guy Dragon Kick"], color: "#f77f00" },
  { name: "Rock Lee", epithet: "Handsome Devil", affiliation: "Hidden Leaf (Konoha)", role: "Taijutsu Specialist", bounty: 65000, power: "Six Inner Gates & Drunken Fist", techniques: ["Hidden Lotus", "Primary Lotus"], color: "#d00000" },
  { name: "Shikamaru Nara", epithet: "Chief Strategist", affiliation: "Hidden Leaf (Konoha)", role: "Eighth Hokage", bounty: 70000, power: "Shadow Possession & 200+ IQ", techniques: ["Shadow Strangle"], color: "#f77f00" },
  { name: "Neji Hyuga", epithet: "Hyuga Prodigy", affiliation: "Hidden Leaf / Hyuga", role: "Gentle Fist Master", bounty: 68000, power: "Byakugan & Eight Trigrams 64 Palms", techniques: ["Palms Revolving Heaven"], color: "#d00000" },
  { name: "Hinata Hyuga", epithet: "Byakugan Princess", affiliation: "Hidden Leaf / Hyuga", role: "Kunoichi", bounty: 60000, power: "Gentle Step Twin Lion Fists", techniques: ["Twin Lion Fists"], color: "#f77f00" },
  { name: "Killer Bee", epithet: "Eight-Tails Jinchuriki", affiliation: "Hidden Cloud (Kumo)", role: "Eight-Tails Host", bounty: 88000, power: "Eight-Tails Gyuki & 7 Blades", techniques: ["Tailed Beast Lariat"], color: "#d00000" },
  { name: "Deidara", epithet: "Explosion Artist", affiliation: "Akatsuki", role: "S-Rank Missing Nin", bounty: 92000, power: "Explosive Clay Bombs", techniques: ["C4 Karura", "Art is a Bang"], color: "#f77f00" },
  { name: "Sasori", epithet: "Master Puppeteer", affiliation: "Akatsuki", role: "S-Rank Missing Nin", bounty: 88000, power: "Human Puppet Mastery", techniques: ["Red Secret Technique"], color: "#d00000" },
  { name: "Kisame Hoshigaki", epithet: "Tailless Tailed Beast", affiliation: "Akatsuki", role: "S-Rank Missing Nin", bounty: 90000, power: "Samehada & Water Style", techniques: ["Water Shark Bomb"], color: "#f77f00" },
  { name: "Hidan", epithet: "Immortal Zealot", affiliation: "Akatsuki", role: "S-Rank Missing Nin", bounty: 78000, power: "Curse Ritual Immortality", techniques: ["Blood Curse Technique"], color: "#d00000" },
  { name: "Kakuzu", epithet: "Five Hearts", affiliation: "Akatsuki", role: "S-Rank Missing Nin", bounty: 85000, power: "Earth Grudge Fear & Five Masks", techniques: ["Fire Style: Fire Dragon Flame Bomb"], color: "#f77f00" },
  { name: "Konan", epithet: "Angel of Akatsuki", affiliation: "Akatsuki / Rain", role: "Leader of Amegakure", bounty: 84000, power: "Origami Paper Transformation", techniques: ["Paper Shuriken Storm"], color: "#d00000" },
  { name: "Yahiko", epithet: "Founder of Akatsuki", affiliation: "Akatsuki / Rain", role: "Founder", bounty: 0, power: "Charismatic Leadership & Rain Ninjutsu", techniques: ["Rain Style Combat"], color: "#f77f00" },
  { name: "Zabuza Momochi", epithet: "Demon of the Hidden Mist", affiliation: "Hidden Mist Village", role: "Missing Nin", bounty: 0, power: "Silent Killing & Water Style", techniques: ["Hidden Mist Jutsu"], color: "#d00000" },
  { name: "Haku", epithet: "Ice Release User", affiliation: "Hidden Mist Village", role: "Mercenary Shinobi", bounty: 0, power: "Ice Release (Hyoton)", techniques: ["Thousand Flying Water Needles"], color: "#f77f00" },
  { name: "Mei Terumi", epithet: "Fifth Mizukage", affiliation: "Hidden Mist Village", role: "Mizukage", bounty: 0, power: "Lava & Boil Release", techniques: ["Melting Apparition"], color: "#d00000" },
  { name: "Temari", epithet: "Wind Style Master", affiliation: "Hidden Sand (Suna)", role: "Jonin", bounty: 0, power: "Giant Iron Fan Wind Jutsu", techniques: ["Wind Scythe Jutsu"], color: "#f77f00" },
  { name: "Kankuro", epithet: "Puppet Master", affiliation: "Hidden Sand (Suna)", role: "Jonin", bounty: 0, power: "Puppet Technique", techniques: ["Crow & Black Ant Combo"], color: "#d00000" },
  { name: "Kaguya Otsutsuki", epithet: "Progenitor of Chakra", affiliation: "Otsutsuki Clan", role: "Rabbit Goddess", bounty: 0, power: "Divine Tree & Dimensional Manipulation", techniques: ["All-Killing Ash Bones"], color: "#f77f00" }
];

// 3. Marvel — most famous heroes & villains
const MARVEL = [
  { name: "Tony Stark", epithet: "Iron Man", affiliation: "Avengers", role: "Genius Inventor", power: "Powered Armor Suit", techniques: ["Repulsor Blast", "Unibeam"], color: "#c1121f" },
  { name: "Steve Rogers", epithet: "Captain America", affiliation: "Avengers", role: "Super Soldier", power: "Super-Soldier Serum", techniques: ["Shield Throw", "Vibranium Block"], color: "#1d3557" },
  { name: "Thor Odinson", epithet: "God of Thunder", affiliation: "Avengers / Asgard", role: "Asgardian Prince", power: "Mjolnir & Storm Control", techniques: ["Lightning Strike", "Godblast"], color: "#f9c74f" },
  { name: "Bruce Banner", epithet: "Hulk", affiliation: "Avengers", role: "Gamma Scientist", power: "Gamma-Fueled Strength", techniques: ["Thunderclap", "Hulk Smash"], color: "#2a9d8f" },
  { name: "Natasha Romanoff", epithet: "Black Widow", affiliation: "Avengers / S.H.I.E.L.D.", role: "Master Spy", power: "Elite Combat Training", techniques: ["Widow's Bite", "Martial Arts Takedown"], color: "#212529" },
  { name: "Clint Barton", epithet: "Hawkeye", affiliation: "Avengers", role: "Master Archer", power: "Precision Marksmanship", techniques: ["Trick Arrow Volley"], color: "#495057" },
  { name: "Peter Parker", epithet: "Spider-Man", affiliation: "Avengers", role: "Web-Slinger", power: "Radioactive Spider Bite", techniques: ["Web Swing", "Spider-Sense Dodge"], color: "#e63946" },
  { name: "Stephen Strange", epithet: "Doctor Strange", affiliation: "Masters of the Mystic Arts", role: "Sorcerer Supreme", power: "Mystic Arts Mastery", techniques: ["Eye of Agamotto", "Mirror Dimension"], color: "#6a4c93" },
  { name: "T'Challa", epithet: "Black Panther", affiliation: "Wakanda / Avengers", role: "King of Wakanda", power: "Heart-Shaped Herb Enhancement", techniques: ["Vibranium Claw Strike"], color: "#212529" },
  { name: "Carol Danvers", epithet: "Captain Marvel", affiliation: "Avengers", role: "Cosmic Protector", power: "Photonic Energy Absorption", techniques: ["Binary Blast"], color: "#3a86ff" },
  { name: "Wanda Maximoff", epithet: "Scarlet Witch", affiliation: "Avengers", role: "Chaos Magic Wielder", power: "Reality-Warping Chaos Magic", techniques: ["Hex Bolt", "Reality Alteration"], color: "#b91c1c" },
  { name: "Vision", epithet: "The Android Avenger", affiliation: "Avengers", role: "Synthetic Being", power: "Mind Stone & Density Control", techniques: ["Solar Beam", "Intangibility Phase"], color: "#8338ec" },
  { name: "Scott Lang", epithet: "Ant-Man", affiliation: "Avengers", role: "Size-Shifter", power: "Pym Particle Suit", techniques: ["Giant-Man Growth"], color: "#e76f51" },
  { name: "Hope van Dyne", epithet: "Wasp", affiliation: "Avengers", role: "Size-Shifter", power: "Pym Particle Suit & Flight", techniques: ["Bio-Sting Blast"], color: "#ffd60a" },
  { name: "Peter Quill", epithet: "Star-Lord", affiliation: "Guardians of the Galaxy", role: "Outlaw Leader", power: "Elemental Guns & Jet Boots", techniques: ["Element Gun Blast"], color: "#e63946" },
  { name: "Gamora", epithet: "Deadliest Woman in the Galaxy", affiliation: "Guardians of the Galaxy", role: "Assassin", power: "Enhanced Combat Prowess", techniques: ["Godslayer Blade Strike"], color: "#2a9d8f" },
  { name: "Rocket Raccoon", epithet: "Rocket", affiliation: "Guardians of the Galaxy", role: "Weapons Expert", power: "Genius Engineering", techniques: ["Heavy Blaster Barrage"], color: "#7f5539" },
  { name: "Groot", epithet: "I Am Groot", affiliation: "Guardians of the Galaxy", role: "Flora Colossus", power: "Regenerating Plant Body", techniques: ["Vine Lash", "Body Regrowth"], color: "#606c38" },
  { name: "Logan", epithet: "Wolverine", affiliation: "X-Men", role: "Feral Mutant", power: "Adamantium Claws & Healing Factor", techniques: ["Berserker Slash"], color: "#ffb703" },
  { name: "Wade Wilson", epithet: "Deadpool", affiliation: "X-Force", role: "Merc with a Mouth", power: "Regenerative Healing Factor", techniques: ["Katana Flurry"], color: "#c1121f" },
  { name: "Ororo Munroe", epithet: "Storm", affiliation: "X-Men", role: "Weather Goddess", power: "Weather Manipulation", techniques: ["Lightning Storm Call"], color: "#3a86ff" },
  { name: "Charles Xavier", epithet: "Professor X", affiliation: "X-Men", role: "Telepathic Founder", power: "Omega-Level Telepathy", techniques: ["Cerebro Mind Link"], color: "#adb5bd" },
  { name: "Erik Lehnsherr", epithet: "Magneto", affiliation: "Brotherhood of Mutants", role: "Master of Magnetism", power: "Magnetic Field Control", techniques: ["Metal Storm"], color: "#7209b7" },
  { name: "Matt Murdock", epithet: "Daredevil", affiliation: "Defenders", role: "Blind Vigilante", power: "Radar Sense & Martial Arts", techniques: ["Billy Club Combo"], color: "#c1121f" },
  { name: "Jean Grey", epithet: "Phoenix", affiliation: "X-Men", role: "Telepath & Telekinetic", power: "Phoenix Force Vessel", techniques: ["Telekinetic Blast"], color: "#f72585" },
  { name: "Loki Laufeyson", epithet: "God of Mischief", affiliation: "Asgard", role: "Trickster God", power: "Illusion & Sorcery", techniques: ["Illusory Duplication"], color: "#2d6a4f" },
  { name: "Thanos", epithet: "The Mad Titan", affiliation: "Black Order", role: "Cosmic Conqueror", power: "Infinity Gauntlet Mastery", techniques: ["Infinity Stone Snap"], color: "#9d4edd" },
  { name: "Nick Fury", epithet: "The Director", affiliation: "S.H.I.E.L.D.", role: "Spymaster", power: "Tactical Genius & Leadership", techniques: ["Strategic Command"], color: "#212529" },
  { name: "Sam Wilson", epithet: "Falcon", affiliation: "Avengers", role: "Aerial Combatant", power: "EXO-7 Wing Suit", techniques: ["Redwing Recon Strike"], color: "#e63946" },
  { name: "Bucky Barnes", epithet: "Winter Soldier", affiliation: "Avengers", role: "Enhanced Assassin", power: "Vibranium Arm & Super-Soldier Serum", techniques: ["Precision Rifle Strike"], color: "#495057" }
];

// Build the master roster from all three universes
function buildMasterRoster() {
  const masterList = [];

  ONE_PIECE.forEach(c => masterList.push({
    ...c,
    id: `op_${c.name.toLowerCase().replace(/\s+/g, '_')}`,
    universe: "onepiece",
    origin: c.origin || "Grand Line",
    quote: c.quote || "The sea has no limits!"
  }));

  NARUTO.forEach(c => masterList.push({
    ...c,
    id: `nr_${c.name.toLowerCase().replace(/\s+/g, '_')}`,
    universe: "naruto",
    origin: c.origin || "Land of Fire",
    quote: c.quote || "My ninja way will never waver!"
  }));

  MARVEL.forEach(c => masterList.push({
    ...c,
    id: `mv_${c.name.toLowerCase().replace(/\s+/g, '_')}`,
    universe: "marvel",
    origin: c.origin || "Earth-616",
    quote: c.quote || "Avengers, assemble!"
  }));

  return masterList;
}

// Master curated list (~100 characters)
const MASTER_DEFAULT_ROSTER = buildMasterRoster();

// LocalStorage API Helpers
function getSavedRoster() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length >= 50) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Error reading local storage", e);
  }
  return [...MASTER_DEFAULT_ROSTER];
}

function saveRosterToStorage(roster) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roster));
  } catch (e) {
    console.warn("Storage quota or write error", e);
  }
}

function resetRosterToDefault() {
  localStorage.removeItem(STORAGE_KEY);
  return [...MASTER_DEFAULT_ROSTER];
}
