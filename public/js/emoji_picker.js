/**
 * Prattle Emoji Picker
 * High-performance, dark-themed, searchable emoji picker with category tabs,
 * recent emoji persistence, quick reaction strip, and cursor-aware text insertion.
 */

const EMOJI_DATA = {
    smileys: {
        name: "Smileys & Emotion",
        icon: "😀",
        emojis: [
            { char: "😀", name: "grinning face", tags: ["smile", "happy", "joy", "grin"] },
            { char: "😃", name: "grinning face with big eyes", tags: ["smile", "happy", "joy", "excited"] },
            { char: "😄", name: "grinning face with smiling eyes", tags: ["smile", "happy", "joy", "laugh"] },
            { char: "😁", name: "beaming face with smiling eyes", tags: ["grin", "smile", "happy"] },
            { char: "😆", name: "grinning squinting face", tags: ["laugh", "satisfied", "haha", "lol"] },
            { char: "😅", name: "grinning face with sweat", tags: ["relief", "sweat", "nervous", "laugh"] },
            { char: "🤣", name: "rolling on the floor laughing", tags: ["rofl", "lol", "laugh", "haha", "funny"] },
            { char: "😂", name: "face with tears of joy", tags: ["tears", "laugh", "lol", "crying laughing", "joy"] },
            { char: "🙂", name: "slightly smiling face", tags: ["smile", "kind", "friendly"] },
            { char: "🙃", name: "upside-down face", tags: ["silly", "sarcasm", "irony"] },
            { char: "😉", name: "winking face", tags: ["wink", "flirt", "joke"] },
            { char: "😊", name: "smiling face with smiling eyes", tags: ["blush", "happy", "warm", "smile"] },
            { char: "😇", name: "smiling face with halo", tags: ["angel", "innocent", "pure", "halo"] },
            { char: "🥰", name: "smiling face with hearts", tags: ["love", "adore", "infatuation", "affection"] },
            { char: "😍", name: "smiling face with heart-eyes", tags: ["love", "heart", "adore", "crush"] },
            { char: "🤩", name: "star-struck", tags: ["stars", "excited", "wow", "amazing"] },
            { char: "😘", name: "face blowing a kiss", tags: ["kiss", "love", "flirt", "affection"] },
            { char: "😗", name: "kissing face", tags: ["kiss", "love", "whistle"] },
            { char: "😚", name: "kissing face with closed eyes", tags: ["kiss", "love", "affection"] },
            { char: "😙", name: "kissing face with smiling eyes", tags: ["kiss", "smile", "friendly"] },
            { char: "😋", name: "face savoring food", tags: ["yum", "delicious", "tasty", "tongue"] },
            { char: "😛", name: "face with tongue", tags: ["tongue", "playful", "joke"] },
            { char: "😜", name: "winking face with tongue", tags: ["wink", "tongue", "crazy", "silly"] },
            { char: "🤪", name: "zany face", tags: ["crazy", "wild", "party", "goofy"] },
            { char: "😝", name: "squinting face with tongue", tags: ["tongue", "playful", "haha"] },
            { char: "🤑", name: "money-mouth face", tags: ["money", "rich", "dollar", "cash"] },
            { char: "🤗", name: "smiling face with open hands", tags: ["hug", "embrace", "warmth", "thanks"] },
            { char: "🤭", name: "face with hand over mouth", tags: ["oops", "giggle", "secret", "shhh"] },
            { char: "🤫", name: "shushing face", tags: ["quiet", "secret", "shh", "silence"] },
            { char: "🤔", name: "thinking face", tags: ["think", "hmm", "ponder", "wonder", "curious"] },
            { char: "🤐", name: "zipper-mouth face", tags: ["zip", "secret", "silent", "quiet"] },
            { char: "🤨", name: "face with raised eyebrow", tags: ["skeptical", "suspicious", "doubt"] },
            { char: "😐", name: "neutral face", tags: ["neutral", "meh", "straight face"] },
            { char: "😑", name: "expressionless face", tags: ["expressionless", "unimpressed", "blank"] },
            { char: "😶", name: "face without mouth", tags: ["speechless", "quiet", "mute"] },
            { char: "😏", name: "smirking face", tags: ["smirk", "sly", "flirt", "cocky"] },
            { char: "😒", name: "unamused face", tags: ["unamused", "annoyed", "bored", "meh"] },
            { char: "🙄", name: "face with rolling eyes", tags: ["eye roll", "annoyed", "whatever", "sarcastic"] },
            { char: "😬", name: "grimacing face", tags: ["grimace", "awkward", "nervous", "cringe"] },
            { char: "🤥", name: "lying face", tags: ["lie", "pinocchio", "fake"] },
            { char: "😌", name: "relieved face", tags: ["relieved", "calm", "peaceful", "zen"] },
            { char: "😔", name: "pensive face", tags: ["sad", "depressed", "down", "sorrow"] },
            { char: "😪", name: "sleepy face", tags: ["sleepy", "tired", "rest"] },
            { char: "🤤", name: "drooling face", tags: ["drool", "hungry", "delicious", "craving"] },
            { char: "😴", name: "sleeping face", tags: ["sleeping", "zzz", "tired", "goodnight"] },
            { char: "😷", name: "face with medical mask", tags: ["sick", "mask", "covid", "ill"] },
            { char: "🤒", name: "face with thermometer", tags: ["sick", "fever", "ill", "temperature"] },
            { char: "🤕", name: "face with head-bandage", tags: ["hurt", "injured", "bandage", "headache"] },
            { char: "🤢", name: "nauseated face", tags: ["nauseated", "sick", "gross", "vomit"] },
            { char: "🤮", name: "face vomiting", tags: ["vomit", "barf", "puke", "gross"] },
            { char: "🤧", name: "sneezing face", tags: ["sneeze", "cold", "flu", "tissue"] },
            { char: "🥵", name: "hot face", tags: ["hot", "heat", "sweating", "spicy"] },
            { char: "🥶", name: "cold face", tags: ["cold", "freezing", "ice", "chilly"] },
            { char: "🥴", name: "woozy face", tags: ["woozy", "dizzy", "drunk", "tipsy"] },
            { char: "😵", name: "face with crossed-out eyes", tags: ["dizzy", "knocked out", "dead"] },
            { char: "🤯", name: "exploding head", tags: ["mind blown", "shocked", "explosion", "wow"] },
            { char: "🤠", name: "cowboy hat face", tags: ["cowboy", "hat", "yeehaw", "western"] },
            { char: "🥳", name: "partying face", tags: ["party", "celebration", "birthday", "tada", "yay"] },
            { char: "🥸", name: "disguised face", tags: ["disguise", "glasses", "incognito", "detective"] },
            { char: "😎", name: "smiling face with sunglasses", tags: ["cool", "sunglasses", "swag", "boss"] },
            { char: "🤓", name: "nerd face", tags: ["nerd", "geek", "glasses", "smart"] },
            { char: "🧐", name: "face with monocle", tags: ["monocle", "curious", "investigate", "classy"] },
            { char: "😕", name: "confused face", tags: ["confused", "puzzled", "unsure"] },
            { char: "😟", name: "worried face", tags: ["worried", "nervous", "anxious"] },
            { char: "🙁", name: "slightly frowning face", tags: ["frown", "sad", "unhappy"] },
            { char: "😮", name: "face with open mouth", tags: ["surprised", "wow", "oh", "gasp"] },
            { char: "😯", name: "hushed face", tags: ["surprised", "quiet", "shock"] },
            { char: "😲", name: "astonished face", tags: ["astonished", "shocked", "speechless"] },
            { char: "😳", name: "flushed face", tags: ["flushed", "embarrassed", "blush", "shocked"] },
            { char: "🥺", name: "pleading face", tags: ["pleading", "puppy eyes", "begging", "please"] },
            { char: "😦", name: "frowning face with open mouth", tags: ["frown", "shocked", "scared"] },
            { char: "😧", name: "anguished face", tags: ["anguished", "stunned", "nervous"] },
            { char: "😨", name: "fearful face", tags: ["scared", "fear", "frightened", "shock"] },
            { char: "😰", name: "anxious face with sweat", tags: ["anxious", "sweat", "nervous", "blue"] },
            { char: "😥", name: "sad but relieved face", tags: ["sad", "relieved", "close call", "whew"] },
            { char: "😢", name: "crying face", tags: ["cry", "tear", "sad", "sorrow"] },
            { char: "😭", name: "loudly crying face", tags: ["sob", "cry", "tears", "bawling", "sad"] },
            { char: "😱", name: "face screaming in fear", tags: ["scream", "scared", "shocked", "munch"] },
            { char: "😖", name: "confounded face", tags: ["confounded", "struggling", "frustrated"] },
            { char: "😣", name: "persevering face", tags: ["persevering", "struggling", "ouch"] },
            { char: "😞", name: "disappointed face", tags: ["disappointed", "sad", "regret"] },
            { char: "😓", name: "downcast face with sweat", tags: ["sweat", "tired", "stressed"] },
            { char: "😩", name: "weary face", tags: ["weary", "tired", "give up", "ugh"] },
            { char: "😫", name: "tired face", tags: ["tired", "exhausted", "frustrated"] },
            { char: "🥱", name: "yawning face", tags: ["yawn", "sleepy", "bored"] },
            { char: "😤", name: "face with steam from nose", tags: ["proud", "triumph", "angry", "fuming"] },
            { char: "😡", name: "enraged face", tags: ["angry", "mad", "rage", "red"] },
            { char: "😠", name: "angry face", tags: ["angry", "mad", "annoyed", "grumpy"] },
            { char: "🤬", name: "face with symbols on mouth", tags: ["swearing", "cursing", "furious", "angry"] },
            { char: "😈", name: "smiling face with horns", tags: ["devil", "evil", "horns", "mischief"] },
            { char: "👿", name: "angry face with horns", tags: ["devil", "evil", "angry", "demon"] },
            { char: "💀", name: "skull", tags: ["dead", "skeleton", "death", "danger", "lol", "dying"] },
            { char: "☠️", name: "skull and crossbones", tags: ["poison", "danger", "pirate", "dead"] },
            { char: "💩", name: "pile of poo", tags: ["poop", "poo", "crap", "funny"] },
            { char: "🤡", name: "clown face", tags: ["clown", "joke", "fool", "circus"] },
            { char: "👻", name: "ghost", tags: ["ghost", "spooky", "halloween", "boo"] },
            { char: "👽", name: "alien", tags: ["alien", "ufo", "space", "extraterrestrial"] },
            { char: "👾", name: "alien monster", tags: ["game", "retro", "arcade", "pixel"] },
            { char: "🤖", name: "robot", tags: ["robot", "bot", "ai", "machine"] },
            { char: "🎃", name: "jack-o-lantern", tags: ["pumpkin", "halloween", "fall", "spooky"] },
            { char: "😺", name: "grinning cat", tags: ["cat", "happy", "smile"] },
            { char: "😸", name: "grinning cat with smiling eyes", tags: ["cat", "smile", "joy"] },
            { char: "😹", name: "cat with tears of joy", tags: ["cat", "laugh", "lol", "tears"] },
            { char: "😻", name: "smiling cat with heart-eyes", tags: ["cat", "love", "heart"] },
            { char: "😼", name: "cat with wry smile", tags: ["cat", "smirk", "sly"] },
            { char: "😽", name: "kissing cat", tags: ["cat", "kiss"] },
            { char: "🙀", name: "weary cat", tags: ["cat", "shock", "scared", "scream"] },
            { char: "😿", name: "crying cat", tags: ["cat", "sad", "tear"] },
            { char: "😾", name: "pouting cat", tags: ["cat", "angry", "grumpy"] }
        ]
    },
    people: {
        name: "People & Gestures",
        icon: "👋",
        emojis: [
            { char: "👋", name: "waving hand", tags: ["wave", "hello", "hi", "goodbye", "bye"] },
            { char: "🤚", name: "raised back of hand", tags: ["hand", "backhand", "raised"] },
            { char: "🖐️", name: "hand with fingers splayed", tags: ["hand", "five", "stop"] },
            { char: "✋", name: "raised hand", tags: ["hand", "stop", "high five"] },
            { char: "🖖", name: "vulcan salute", tags: ["star trek", "spock", "salute", "live long"] },
            { char: "👌", name: "OK hand", tags: ["ok", "perfect", "good", "fine", "nice"] },
            { char: "🤌", name: "pinched fingers", tags: ["italian", "what do you want", "gesture"] },
            { char: "🤏", name: "pinching hand", tags: ["small", "tiny", "little bit"] },
            { char: "✌️", name: "victory hand", tags: ["peace", "victory", "two", "v"] },
            { char: "🤞", name: "crossed fingers", tags: ["luck", "hopeful", "wish", "fingers crossed"] },
            { char: "🤟", name: "love-you gesture", tags: ["love", "ily", "rock on"] },
            { char: "🤘", name: "sign of the horns", tags: ["rock", "metal", "horns", "party"] },
            { char: "🤙", name: "call me hand", tags: ["call", "shaka", "hang loose", "phone"] },
            { char: "👈", name: "backhand index pointing left", tags: ["left", "point", "direction"] },
            { char: "👉", name: "backhand index pointing right", tags: ["right", "point", "direction"] },
            { char: "👆", name: "backhand index pointing up", tags: ["up", "point", "above"] },
            { char: "🖕", name: "middle finger", tags: ["offensive", "finger"] },
            { char: "👇", name: "backhand index pointing down", tags: ["down", "point", "below"] },
            { char: "☝️", name: "index pointing up", tags: ["point", "one", "first", "up"] },
            { char: "👍", name: "thumbs up", tags: ["thumbs up", "like", "yes", "approve", "good", "ok", "agree"] },
            { char: "👎", name: "thumbs down", tags: ["thumbs down", "dislike", "no", "bad", "disapprove"] },
            { char: "✊", name: "raised fist", tags: ["fist", "power", "strength", "solidarity"] },
            { char: "👊", name: "oncoming fist", tags: ["punch", "fist bump", "hit"] },
            { char: "🤛", name: "left-facing fist", tags: ["fist bump", "punch"] },
            { char: "🤜", name: "right-facing fist", tags: ["fist bump", "punch"] },
            { char: "👏", name: "clapping hands", tags: ["clap", "applause", "bravo", "praise"] },
            { char: "🙌", name: "raising hands", tags: ["celebrate", "praise", "yay", "hooray", "cheer"] },
            { char: "👐", name: "open hands", tags: ["open", "hands", "hug"] },
            { char: "🤲", name: "palms up together", tags: ["prayer", "offering", "dua"] },
            { char: "🤝", name: "handshake", tags: ["deal", "agreement", "shake", "meeting", "partner"] },
            { char: "🙏", name: "folded hands", tags: ["please", "thank you", "pray", "namaste", "bless", "hope"] },
            { char: "✍️", name: "writing hand", tags: ["write", "pen", "note", "exam"] },
            { char: "💅", name: "nail polish", tags: ["nails", "beauty", "slay", "sassy"] },
            { char: "🤳", name: "selfie", tags: ["selfie", "phone", "camera", "photo"] },
            { char: "💪", name: "flexed biceps", tags: ["muscle", "strong", "power", "flex", "workout", "gym"] },
            { char: "👀", name: "eyes", tags: ["look", "see", "watching", "peek", "curious"] },
            { char: "👁️", name: "eye", tags: ["look", "see", "vision"] },
            { char: "👅", name: "tongue", tags: ["taste", "tongue", "lick"] },
            { char: "👄", name: "mouth", tags: ["lips", "kiss", "talk"] },
            { char: "👶", name: "baby", tags: ["baby", "child", "infant"] },
            { char: "🧒", name: "child", tags: ["kid", "young"] },
            { char: "👦", name: "boy", tags: ["boy", "kid", "young"] },
            { char: "👧", name: "girl", tags: ["girl", "kid", "young"] },
            { char: "🧑", name: "person", tags: ["person", "human"] },
            { char: "👨", name: "man", tags: ["man", "guy", "adult"] },
            { char: "👩", name: "woman", tags: ["woman", "lady", "adult"] },
            { char: "🧓", name: "older person", tags: ["elder", "senior"] },
            { char: "👴", name: "old man", tags: ["grandpa", "elder", "senior"] },
            { char: "👵", name: "old woman", tags: ["grandma", "elder", "senior"] },
            { char: "👨‍💻", name: "man technologist", tags: ["coder", "developer", "programmer", "hacker", "tech"] },
            { char: "👩‍💻", name: "woman technologist", tags: ["coder", "developer", "programmer", "tech"] },
            { char: "🦸", name: "superhero", tags: ["hero", "super", "powers"] },
            { char: "🦹", name: "supervillain", tags: ["villain", "evil", "bad guy"] },
            { char: "🧙", name: "mage", tags: ["wizard", "magic", "sorcerer"] },
            { char: "🧚", name: "fairy", tags: ["fairy", "wings", "magic"] },
            { char: "🧛", name: "vampire", tags: ["vampire", "dracula", "blood"] },
            { char: "🧟", name: "zombie", tags: ["zombie", "undead", "walking dead"] },
            { char: "💃", name: "woman dancing", tags: ["dance", "party", "fun", "salsa"] },
            { char: "🕺", name: "man dancing", tags: ["dance", "party", "fun", "disco"] },
            { char: "🏃", name: "person running", tags: ["run", "fast", "exercise", "rush"] },
            { char: "🚶", name: "person walking", tags: ["walk", "pedestrian", "stroll"] }
        ]
    },
    animals: {
        name: "Animals & Nature",
        icon: "🐶",
        emojis: [
            { char: "🐶", name: "dog face", tags: ["dog", "puppy", "pet", "bark"] },
            { char: "🐱", name: "cat face", tags: ["cat", "kitten", "kitty", "meow", "pet"] },
            { char: "🐭", name: "mouse face", tags: ["mouse", "rodent"] },
            { char: "🐹", name: "hamster", tags: ["hamster", "pet", "cute"] },
            { char: "🐰", name: "rabbit face", tags: ["rabbit", "bunny", "cute", "easter"] },
            { char: "🦊", name: "fox", tags: ["fox", "clever", "animal"] },
            { char: "🐻", name: "bear", tags: ["bear", "teddy", "nature"] },
            { char: "🐼", name: "panda", tags: ["panda", "bear", "bamboo", "cute"] },
            { char: "🐨", name: "koala", tags: ["koala", "australia", "cute"] },
            { char: "🐯", name: "tiger face", tags: ["tiger", "wild", "cat"] },
            { char: "🦁", name: "lion", tags: ["lion", "king", "wild", "safari"] },
            { char: "🐮", name: "cow face", tags: ["cow", "moo", "milk", "farm"] },
            { char: "🐷", name: "pig face", tags: ["pig", "farm", "oink"] },
            { char: "🐸", name: "frog", tags: ["frog", "toad", "nature", "green"] },
            { char: "🐵", name: "monkey face", tags: ["monkey", "ape", "animal"] },
            { char: "🙈", name: "see-no-evil monkey", tags: ["monkey", "shy", "hide", "oops"] },
            { char: "🙉", name: "hear-no-evil monkey", tags: ["monkey", "deaf", "quiet"] },
            { char: "🙊", name: "speak-no-evil monkey", tags: ["monkey", "secret", "shh"] },
            { char: "🐔", name: "chicken", tags: ["chicken", "bird", "farm"] },
            { char: "🐧", name: "penguin", tags: ["penguin", "ice", "bird", "cute"] },
            { char: "🐦", name: "bird", tags: ["bird", "fly", "tweet"] },
            { char: "🐤", name: "baby chick", tags: ["chick", "baby bird", "cute", "yellow"] },
            { char: "🦆", name: "duck", tags: ["duck", "quack", "water"] },
            { char: "🦅", name: "eagle", tags: ["eagle", "bird", "predator", "america"] },
            { char: "🦉", name: "owl", tags: ["owl", "night", "wise", "bird"] },
            { char: "🦇", name: "bat", tags: ["bat", "vampire", "night", "halloween"] },
            { char: "🐺", name: "wolf", tags: ["wolf", "wild", "howl", "pack"] },
            { char: "🐗", name: "boar", tags: ["boar", "pig", "wild"] },
            { char: "🐴", name: "horse face", tags: ["horse", "pony", "ride", "farm"] },
            { char: "🦄", name: "unicorn", tags: ["unicorn", "magic", "fantasy", "rainbow"] },
            { char: "🐝", name: "honeybee", tags: ["bee", "honey", "buzz", "insect"] },
            { char: "🐛", name: "bug", tags: ["bug", "insect", "caterpillar"] },
            { char: "🦋", name: "butterfly", tags: ["butterfly", "pretty", "wings", "nature"] },
            { char: "🐌", name: "snail", tags: ["snail", "slow", "nature"] },
            { char: "🐞", name: "lady beetle", tags: ["ladybug", "beetle", "luck", "insect"] },
            { char: "🐜", name: "ant", tags: ["ant", "bug", "insect", "tiny"] },
            { char: "🕷️", name: "spider", tags: ["spider", "halloween", "scary", "bug"] },
            { char: "🦂", name: "scorpion", tags: ["scorpion", "zodiac", "desert"] },
            { char: "🐢", name: "turtle", tags: ["turtle", "slow", "tortoise", "reptile"] },
            { char: "🐍", name: "snake", tags: ["snake", "reptile", "slither"] },
            { char: "🦎", name: "lizard", tags: ["lizard", "gecko", "reptile"] },
            { char: "🦖", name: "T-Rex", tags: ["dinosaur", "trex", "jurassic"] },
            { char: "🐙", name: "octopus", tags: ["octopus", "sea", "ocean", "tentacles"] },
            { char: "🦑", name: "squid", tags: ["squid", "sea", "ocean"] },
            { char: "🦐", name: "shrimp", tags: ["shrimp", "seafood", "prawn"] },
            { char: "🦀", name: "crab", tags: ["crab", "beach", "seafood", "ocean"] },
            { char: "🐡", name: "blowfish", tags: ["fish", "pufferfish", "sea"] },
            { char: "🐠", name: "tropical fish", tags: ["fish", "aquarium", "sea"] },
            { char: "🐟", name: "fish", tags: ["fish", "swim", "water"] },
            { char: "🐬", name: "dolphin", tags: ["dolphin", "ocean", "swim", "cute"] },
            { char: "🐳", name: "spouting whale", tags: ["whale", "ocean", "sea", "huge"] },
            { char: "🦈", name: "shark", tags: ["shark", "ocean", "predator", "sea"] },
            { char: "🐊", name: "crocodile", tags: ["crocodile", "alligator", "reptile"] },
            { char: "🐘", name: "elephant", tags: ["elephant", "safari", "big", "trunk"] },
            { char: "🦛", name: "hippopotamus", tags: ["hippo", "safari"] },
            { char: "🦏", name: "rhinoceros", tags: ["rhino", "safari"] },
            { char: "🐪", name: "camel", tags: ["camel", "desert", "hump"] },
            { char: "🦒", name: "giraffe", tags: ["giraffe", "tall", "safari"] },
            { char: "🦘", name: "kangaroo", tags: ["kangaroo", "australia", "jump"] },
            { char: "🌲", name: "evergreen tree", tags: ["tree", "forest", "nature", "pine"] },
            { char: "🌳", name: "deciduous tree", tags: ["tree", "nature", "green"] },
            { char: "🌴", name: "palm tree", tags: ["palm", "beach", "tropical", "vacation"] },
            { char: "🌵", name: "cactus", tags: ["cactus", "desert", "plant"] },
            { char: "🌷", name: "tulip", tags: ["tulip", "flower", "spring", "garden"] },
            { char: "🌸", name: "cherry blossom", tags: ["flower", "cherry", "spring", "sakura", "pink"] },
            { char: "🌹", name: "rose", tags: ["rose", "flower", "love", "romantic", "red"] },
            { char: "🌺", name: "hibiscus", tags: ["flower", "tropical", "nature"] },
            { char: "🌻", name: "sunflower", tags: ["sunflower", "flower", "summer", "yellow"] },
            { char: "🌼", name: "blossom", tags: ["flower", "yellow", "spring"] },
            { char: "💐", name: "bouquet", tags: ["flowers", "gift", "romance", "celebrate"] },
            { char: "🌿", name: "herb", tags: ["plant", "leaf", "nature", "green"] },
            { char: "☘️", name: "shamrock", tags: ["shamrock", "irish", "st patrick", "clover"] },
            { char: "🍀", name: "four leaf clover", tags: ["luck", "lucky", "clover", "green"] },
            { char: "🍁", name: "maple leaf", tags: ["fall", "autumn", "canada", "leaf"] },
            { char: "🍂", name: "fallen leaf", tags: ["autumn", "fall", "leaves"] },
            { char: "🍃", name: "leaf fluttering in wind", tags: ["leaf", "wind", "nature", "breeze"] }
        ]
    },
    food: {
        name: "Food & Drink",
        icon: "🍔",
        emojis: [
            { char: "🍏", name: "green apple", tags: ["apple", "fruit", "green", "healthy"] },
            { char: "🍎", name: "red apple", tags: ["apple", "fruit", "red", "healthy"] },
            { char: "🍐", name: "pear", tags: ["pear", "fruit"] },
            { char: "🍊", name: "tangerine", tags: ["orange", "fruit", "citrus"] },
            { char: "🍋", name: "lemon", tags: ["lemon", "sour", "citrus", "yellow"] },
            { char: "🍌", name: "banana", tags: ["banana", "fruit", "yellow"] },
            { char: "🍉", name: "watermelon", tags: ["watermelon", "fruit", "summer"] },
            { char: "🍇", name: "grapes", tags: ["grapes", "fruit", "wine"] },
            { char: "🍓", name: "strawberry", tags: ["strawberry", "berry", "fruit", "sweet"] },
            { char: "🫐", name: "blueberries", tags: ["blueberry", "berry", "fruit"] },
            { char: "🍈", name: "melon", tags: ["melon", "fruit"] },
            { char: "🍒", name: "cherries", tags: ["cherry", "fruit", "sweet"] },
            { char: "🍑", name: "peach", tags: ["peach", "fruit", "butt"] },
            { char: "🥭", name: "mango", tags: ["mango", "fruit", "sweet", "tropical"] },
            { char: "🍍", name: "pineapple", tags: ["pineapple", "fruit", "tropical"] },
            { char: "🥥", name: "coconut", tags: ["coconut", "tropical"] },
            { char: "🥝", name: "kiwi fruit", tags: ["kiwi", "fruit"] },
            { char: "🍅", name: "tomato", tags: ["tomato", "vegetable", "salad"] },
            { char: "🥑", name: "avocado", tags: ["avocado", "guacamole", "healthy"] },
            { char: "🥦", name: "broccoli", tags: ["broccoli", "vegetable", "green"] },
            { char: "🌶️", name: "hot pepper", tags: ["spicy", "chili", "hot", "pepper"] },
            { char: "🌽", name: "ear of corn", tags: ["corn", "vegetable", "maize"] },
            { char: "🥕", name: "carrot", tags: ["carrot", "vegetable", "healthy"] },
            { char: "🥔", name: "potato", tags: ["potato", "food", "spud"] },
            { char: "🥐", name: "croissant", tags: ["croissant", "bread", "pastry", "french", "breakfast"] },
            { char: "🍞", name: "bread", tags: ["bread", "toast", "bakery"] },
            { char: "🥖", name: "baguette bread", tags: ["baguette", "bread", "french"] },
            { char: "🧀", name: "cheese wedge", tags: ["cheese", "dairy", "cheddar"] },
            { char: "🍳", name: "cooking", tags: ["egg", "fried egg", "breakfast", "cook"] },
            { char: "🥞", name: "pancakes", tags: ["pancakes", "breakfast", "syrup", "sweet"] },
            { char: "🧇", name: "waffle", tags: ["waffle", "breakfast", "sweet"] },
            { char: "🥓", name: "bacon", tags: ["bacon", "meat", "breakfast", "crispy"] },
            { char: "🥩", name: "cut of meat", tags: ["steak", "meat", "beef", "bbq"] },
            { char: "🍗", name: "poultry leg", tags: ["chicken", "drumstick", "meat", "food"] },
            { char: "🍖", name: "meat on bone", tags: ["meat", "bbq", "bone"] },
            { char: "🌭", name: "hot dog", tags: ["hotdog", "sausage", "fast food"] },
            { char: "🍔", name: "hamburger", tags: ["burger", "cheeseburger", "fast food", "yummy"] },
            { char: "🍟", name: "french fries", tags: ["fries", "chips", "fast food", "salty"] },
            { char: "🍕", name: "pizza", tags: ["pizza", "slice", "cheese", "fast food", "italian"] },
            { char: "🥪", name: "sandwich", tags: ["sandwich", "lunch", "bread"] },
            { char: "🌮", name: "taco", tags: ["taco", "mexican", "food"] },
            { char: "🌯", name: "burrito", tags: ["burrito", "mexican", "wrap"] },
            { char: "🥗", name: "green salad", tags: ["salad", "healthy", "vegetables"] },
            { char: "🍿", name: "popcorn", tags: ["popcorn", "movie", "snack", "cinema"] },
            { char: "🍝", name: "spaghetti", tags: ["pasta", "italian", "noodles"] },
            { char: "🍜", name: "steaming bowl", tags: ["ramen", "noodles", "soup", "asian"] },
            { char: "🍲", name: "pot of food", tags: ["stew", "soup", "curry", "hot pot"] },
            { char: "🍛", name: "curry rice", tags: ["curry", "rice", "indian", "spicy"] },
            { char: "🍣", name: "sushi", tags: ["sushi", "japanese", "fish", "rice"] },
            { char: "🍱", name: "bento box", tags: ["bento", "japanese", "lunch"] },
            { char: "🥟", name: "dumpling", tags: ["dumpling", "dim sum", "asian", "gyoza"] },
            { char: "🍙", name: "rice ball", tags: ["rice ball", "onigiri", "japanese"] },
            { char: "🍚", name: "cooked rice", tags: ["rice", "grain", "bowl"] },
            { char: "🍧", name: "shaved ice", tags: ["ice", "dessert", "sweet", "summer"] },
            { char: "🍨", name: "ice cream", tags: ["ice cream", "dessert", "sweet", "scoop"] },
            { char: "🍦", name: "soft ice cream", tags: ["ice cream", "cone", "vanilla", "dessert"] },
            { char: "🥧", name: "pie", tags: ["pie", "pastry", "dessert", "baking"] },
            { char: "🧁", name: "cupcake", tags: ["cupcake", "dessert", "sweet", "cake"] },
            { char: "🍰", name: "shortcake", tags: ["cake", "slice", "strawberry", "sweet", "dessert"] },
            { char: "🎂", name: "birthday cake", tags: ["birthday", "cake", "celebrate", "party", "candles"] },
            { char: "🍮", name: "custard", tags: ["pudding", "dessert", "sweet"] },
            { char: "🍭", name: "lollipop", tags: ["candy", "sweet", "sugar"] },
            { char: "🍬", name: "candy", tags: ["candy", "sweet", "treat"] },
            { char: "🍫", name: "chocolate bar", tags: ["chocolate", "sweet", "cocoa", "treat"] },
            { char: "🍩", name: "doughnut", tags: ["donut", "doughnut", "sweet", "dessert"] },
            { char: "🍪", name: "cookie", tags: ["cookie", "biscuit", "chocolate chip", "snack"] },
            { char: "☕", name: "hot beverage", tags: ["coffee", "tea", "cafe", "morning", "hot"] },
            { char: "🫖", name: "teapot", tags: ["tea", "pot", "hot drink"] },
            { char: "🍵", name: "teacup without handle", tags: ["tea", "green tea", "matcha"] },
            { char: "🧃", name: "beverage box", tags: ["juice", "box", "drink"] },
            { char: "🥤", name: "cup with straw", tags: ["soda", "drink", "cup", "juice", "cola"] },
            { char: "🧋", name: "bubble tea", tags: ["boba", "bubble tea", "milk tea"] },
            { char: "🍺", name: "beer mug", tags: ["beer", "drink", "cheers", "pub", "alcohol"] },
            { char: "🍻", name: "clinking beer mugs", tags: ["beers", "cheers", "party", "toast", "drinks"] },
            { char: "🥂", name: "clinking glasses", tags: ["cheers", "champagne", "celebrate", "toast"] },
            { char: "🍷", name: "wine glass", tags: ["wine", "red wine", "drink", "alcohol"] },
            { char: "🍸", name: "cocktail glass", tags: ["cocktail", "martini", "drink", "bar"] },
            { char: "🍹", name: "tropical drink", tags: ["cocktail", "tropical", "vacation", "beach"] },
            { char: "🍾", name: "bottle with popping cork", tags: ["champagne", "party", "celebrate", "popping"] }
        ]
    },
    activities: {
        name: "Activities & Sports",
        icon: "⚽",
        emojis: [
            { char: "⚽", name: "soccer ball", tags: ["soccer", "football", "sport", "game", "goal"] },
            { char: "🏀", name: "basketball", tags: ["basketball", "hoop", "sport", "nba"] },
            { char: "🏈", name: "american football", tags: ["football", "nfl", "sport"] },
            { char: "⚾", name: "baseball", tags: ["baseball", "mlb", "sport"] },
            { char: "🥎", name: "softball", tags: ["softball", "sport"] },
            { char: "🎾", name: "tennis", tags: ["tennis", "racket", "sport"] },
            { char: "🏐", name: "volleyball", tags: ["volleyball", "sport"] },
            { char: "🏉", name: "rugby football", tags: ["rugby", "sport"] },
            { char: "🎱", name: "pool 8 ball", tags: ["billiards", "pool", "8ball", "game"] },
            { char: "🏓", name: "ping pong", tags: ["table tennis", "ping pong", "sport"] },
            { char: "🏸", name: "badminton", tags: ["badminton", "shuttlecock", "sport"] },
            { char: "🏒", name: "ice hockey", tags: ["hockey", "sport", "ice"] },
            { char: "🏏", name: "cricket game", tags: ["cricket", "sport", "bat", "wicket"] },
            { char: "⛳", name: "flag in hole", tags: ["golf", "sport", "hole in one"] },
            { char: "🏹", name: "bow and arrow", tags: ["archery", "bow", "arrow", "target"] },
            { char: "🎣", name: "fishing pole", tags: ["fishing", "fish", "hook", "catch"] },
            { char: "🥊", name: "boxing glove", tags: ["boxing", "fight", "punch", "sport"] },
            { char: "🥋", name: "martial arts uniform", tags: ["karate", "judo", "taekwondo"] },
            { char: "🛹", name: "skateboard", tags: ["skate", "board", "skater"] },
            { char: "🛼", name: "roller skate", tags: ["roller skate", "skating"] },
            { char: "🎿", name: "skis", tags: ["skiing", "snow", "winter", "sport"] },
            { char: "🏂", name: "snowboarder", tags: ["snowboard", "winter", "sport"] },
            { char: "🏋️", name: "person lifting weights", tags: ["gym", "workout", "fitness", "weights", "strong"] },
            { char: "🚴", name: "person biking", tags: ["bike", "cycling", "ride", "sport"] },
            { char: "🏆", name: "trophy", tags: ["trophy", "winner", "first", "champion", "award", "gold"] },
            { char: "🥇", name: "1st place medal", tags: ["first", "gold", "medal", "winner"] },
            { char: "🥈", name: "2nd place medal", tags: ["second", "silver", "medal"] },
            { char: "🥉", name: "3rd place medal", tags: ["third", "bronze", "medal"] },
            { char: "🎖️", name: "military medal", tags: ["medal", "honor", "award"] },
            { char: "🎫", name: "ticket", tags: ["ticket", "movie", "event", "concert"] },
            { char: "🎟️", name: "admission tickets", tags: ["tickets", "show", "cinema"] },
            { char: "🎪", name: "circus tent", tags: ["circus", "carnival", "tent"] },
            { char: "🎭", name: "performing arts", tags: ["theater", "drama", "masks", "acting"] },
            { char: "🎨", name: "artist palette", tags: ["art", "paint", "draw", "creative", "artist"] },
            { char: "🎬", name: "clapper board", tags: ["movie", "film", "cinema", "action", "director"] },
            { char: "🎤", name: "microphone", tags: ["sing", "karaoke", "mic", "music", "podcast"] },
            { char: "🎧", name: "headphone", tags: ["music", "headphones", "listen", "audio"] },
            { char: "🎼", name: "musical score", tags: ["music", "notes", "song"] },
            { char: "🎹", name: "musical keyboard", tags: ["piano", "keyboard", "music"] },
            { char: "🥁", name: "drum", tags: ["drums", "music", "beat"] },
            { char: "🎷", name: "saxophone", tags: ["jazz", "sax", "music"] },
            { char: "🎺", name: "trumpet", tags: ["trumpet", "horn", "music"] },
            { char: "🎸", name: "guitar", tags: ["guitar", "rock", "music", "acoustic"] },
            { char: "🎻", name: "violin", tags: ["violin", "classical", "music"] },
            { char: "🎲", name: "game die", tags: ["dice", "game", "luck", "gamble", "roll"] },
            { char: "♟️", name: "chess pawn", tags: ["chess", "strategy", "game"] },
            { char: "🎯", name: "bullseye", tags: ["target", "bullseye", "darts", "hit", "goal"] },
            { char: "🎳", name: "bowling", tags: ["bowling", "strike", "sport"] },
            { char: "🎮", name: "video game", tags: ["game", "gaming", "controller", "playstation", "xbox"] },
            { char: "🎰", name: "slot machine", tags: ["slots", "casino", "gamble", "jackpot"] },
            { char: "🧩", name: "puzzle piece", tags: ["puzzle", "jigsaw", "problem", "solve"] }
        ]
    },
    travel: {
        name: "Travel & Places",
        icon: "🚗",
        emojis: [
            { char: "🚗", name: "automobile", tags: ["car", "drive", "vehicle", "travel"] },
            { char: "🚕", name: "taxi", tags: ["taxi", "cab", "ride", "uber"] },
            { char: "🚙", name: "sport utility vehicle", tags: ["suv", "car", "drive"] },
            { char: "🚌", name: "bus", tags: ["bus", "transit", "public", "school bus"] },
            { char: "🏎️", name: "racing car", tags: ["f1", "race", "speed", "fast"] },
            { char: "🚓", name: "police car", tags: ["police", "cop", "emergency", "siren"] },
            { char: "🚑", name: "ambulance", tags: ["ambulance", "hospital", "emergency", "medical"] },
            { char: "🚒", name: "fire engine", tags: ["fire truck", "emergency", "firefighter"] },
            { char: "🚚", name: "delivery truck", tags: ["truck", "delivery", "shipping", "cargo"] },
            { char: "🚜", name: "tractor", tags: ["tractor", "farm", "agriculture"] },
            { char: "🛴", name: "kick scooter", tags: ["scooter", "ride"] },
            { char: "🚲", name: "bicycle", tags: ["bike", "cycle", "ride", "bicycle"] },
            { char: "🛵", name: "motor scooter", tags: ["vespa", "scooter", "moped"] },
            { char: "🏍️", name: "motorcycle", tags: ["motorcycle", "bike", "speed", "ride"] },
            { char: "🚨", name: "police car light", tags: ["siren", "emergency", "alert", "warning"] },
            { char: "🚂", name: "locomotive", tags: ["train", "steam", "railway"] },
            { char: "🚆", name: "train", tags: ["train", "metro", "railway", "transit"] },
            { char: "🚇", name: "metro", tags: ["subway", "metro", "transit", "underground"] },
            { char: "✈️", name: "airplane", tags: ["plane", "flight", "fly", "travel", "vacation"] },
            { char: "🛫", name: "airplane departure", tags: ["flight", "takeoff", "travel", "airport"] },
            { char: "🛬", name: "airplane arrival", tags: ["landing", "arrival", "airport"] },
            { char: "🚀", name: "rocket", tags: ["rocket", "space", "launch", "moon", "crypto", "fast"] },
            { char: "🛸", name: "flying saucer", tags: ["ufo", "alien", "space"] },
            { char: "🚁", name: "helicopter", tags: ["helicopter", "chopper", "flight"] },
            { char: "⛵", name: "sailboat", tags: ["boat", "sailing", "yacht", "sea"] },
            { char: "🚤", name: "speedboat", tags: ["boat", "speed", "lake", "sea"] },
            { char: "🛳️", name: "passenger ship", tags: ["cruise", "ship", "boat", "travel"] },
            { char: "⚓", name: "anchor", tags: ["anchor", "ship", "sea", "nautical"] },
            { char: "⛽", name: "fuel pump", tags: ["gas", "petrol", "fuel", "station"] },
            { char: "🗺️", name: "world map", tags: ["map", "travel", "world", "explore"] },
            { char: "🗿", name: "moai", tags: ["statue", "easter island", "stone", "gigachad"] },
            { char: "🗽", name: "Statue of Liberty", tags: ["new york", "usa", "liberty", "america"] },
            { char: "🗼", name: "Tokyo tower", tags: ["tokyo", "tower", "japan"] },
            { char: "🏰", name: "castle", tags: ["castle", "fairytale", "disney", "palace"] },
            { char: "🏟️", name: "stadium", tags: ["stadium", "sports", "concert", "arena"] },
            { char: "🎡", name: "ferris wheel", tags: ["ferris wheel", "carnival", "amusement park"] },
            { char: "🎢", name: "roller coaster", tags: ["roller coaster", "fun", "theme park"] },
            { char: "🏖️", name: "beach with umbrella", tags: ["beach", "vacation", "summer", "sea", "relax"] },
            { char: "🏝️", name: "desert island", tags: ["island", "tropical", "beach"] },
            { char: "🌋", name: "volcano", tags: ["volcano", "lava", "eruption", "mountain"] },
            { char: "⛰️", name: "mountain", tags: ["mountain", "nature", "hike", "climb"] },
            { char: "🏔️", name: "snow-capped mountain", tags: ["mountain", "snow", "cold", "winter"] },
            { char: "🏕️", name: "camping", tags: ["camp", "tent", "outdoors", "nature"] },
            { char: "🏠", name: "house", tags: ["home", "house", "building"] },
            { char: "🏡", name: "house with garden", tags: ["home", "house", "garden"] },
            { char: "🏢", name: "office building", tags: ["office", "work", "building", "corporate"] },
            { char: "🏥", name: "hospital", tags: ["hospital", "doctor", "medical", "clinic"] },
            { char: "🏦", name: "bank", tags: ["bank", "money", "finance"] },
            { char: "🏨", name: "hotel", tags: ["hotel", "vacation", "room", "stay"] },
            { char: "🏫", name: "school", tags: ["school", "education", "student", "class"] },
            { char: "🕌", name: "mosque", tags: ["mosque", "islam", "prayer"] },
            { char: "🛕", name: "hindu temple", tags: ["temple", "hindu", "prayer"] },
            { char: "⛪", name: "church", tags: ["church", "christian", "religion"] }
        ]
    },
    objects: {
        name: "Objects & Tech",
        icon: "💡",
        emojis: [
            { char: "⌚", name: "watch", tags: ["watch", "time", "clock", "apple watch"] },
            { char: "📱", name: "mobile phone", tags: ["phone", "smartphone", "iphone", "android", "cell"] },
            { char: "💻", name: "laptop", tags: ["laptop", "computer", "macbook", "pc", "tech", "work"] },
            { char: "⌨️", name: "keyboard", tags: ["keyboard", "type", "computer"] },
            { char: "🖥️", name: "desktop computer", tags: ["computer", "pc", "monitor", "screen"] },
            { char: "🖱️", name: "computer mouse", tags: ["mouse", "click", "pc"] },
            { char: "📷", name: "camera", tags: ["camera", "photo", "picture", "shoot"] },
            { char: "📸", name: "camera with flash", tags: ["camera", "flash", "photo", "paparazzi"] },
            { char: "📹", name: "video camera", tags: ["video", "camcorder", "record"] },
            { char: "🎥", name: "movie camera", tags: ["movie", "film", "cinema", "record"] },
            { char: "📽️", name: "film projector", tags: ["projector", "cinema", "movie"] },
            { char: "📞", name: "telephone receiver", tags: ["phone", "call", "telephone"] },
            { char: "☎️", name: "telephone", tags: ["phone", "vintage", "landline"] },
            { char: "📺", name: "television", tags: ["tv", "screen", "show", "watch"] },
            { char: "📻", name: "radio", tags: ["radio", "music", "broadcast"] },
            { char: "⏱️", name: "stopwatch", tags: ["stopwatch", "timer", "speed", "fast"] },
            { char: "⏲️", name: "timer clock", tags: ["timer", "clock", "cooking"] },
            { char: "⏰", name: "alarm clock", tags: ["alarm", "wake up", "morning", "clock", "time"] },
            { char: "🕰️", name: "mantelpiece clock", tags: ["clock", "vintage", "time"] },
            { char: "⌛", name: "hourglass done", tags: ["hourglass", "time", "sand"] },
            { char: "⏳", name: "hourglass not done", tags: ["hourglass", "loading", "wait", "time"] },
            { char: "🔋", name: "battery", tags: ["battery", "power", "energy", "charge"] },
            { char: "🔌", name: "electric plug", tags: ["plug", "power", "electricity", "charge"] },
            { char: "💡", name: "light bulb", tags: ["bulb", "idea", "light", "smart", "bright", "eureka"] },
            { char: "🔦", name: "flashlight", tags: ["flashlight", "torch", "light", "dark"] },
            { char: "🕯️", name: "candle", tags: ["candle", "flame", "light", "wax"] },
            { char: "💸", name: "money with wings", tags: ["money", "cash", "spend", "flying money", "loss"] },
            { char: "💵", name: "dollar banknote", tags: ["dollar", "cash", "money", "bucks"] },
            { char: "💰", name: "money bag", tags: ["money", "rich", "bag", "wealth", "dollar", "fortune"] },
            { char: "💳", name: "credit card", tags: ["credit card", "payment", "buy", "shop"] },
            { char: "💎", name: "gem stone", tags: ["diamond", "gem", "jewel", "rich", "luxury", "rare"] },
            { char: "⚖️", name: "balance scale", tags: ["scale", "justice", "law", "balance"] },
            { char: "🧰", name: "toolbox", tags: ["toolbox", "tools", "repair", "fix"] },
            { char: "🔧", name: "wrench", tags: ["wrench", "tool", "fix", "repair", "settings"] },
            { char: "🔨", name: "hammer", tags: ["hammer", "tool", "build", "hit"] },
            { char: "🛠️", name: "hammer and wrench", tags: ["tools", "build", "settings", "fix", "maintenance"] },
            { char: "⚙️", name: "gear", tags: ["gear", "settings", "cog", "options", "config"] },
            { char: "💣", name: "bomb", tags: ["bomb", "explode", "boom", "danger"] },
            { char: "🔪", name: "kitchen knife", tags: ["knife", "cook", "cut", "sharp"] },
            { char: "🗡️", name: "dagger", tags: ["sword", "weapon", "dagger"] },
            { char: "⚔️", name: "crossed swords", tags: ["swords", "battle", "fight", "war"] },
            { char: "🛡️", name: "shield", tags: ["shield", "defense", "protect", "security", "guard"] },
            { char: "🔑", name: "key", tags: ["key", "lock", "unlock", "password", "access"] },
            { char: "🗝️", name: "old key", tags: ["key", "vintage", "secret", "treasure"] },
            { char: "🔒", name: "locked", tags: ["lock", "secure", "private", "safety", "closed"] },
            { char: "🔓", name: "unlocked", tags: ["unlock", "open", "free"] },
            { char: "📦", name: "package", tags: ["box", "package", "delivery", "amazon", "parcel"] },
            { char: "🎁", name: "wrapped gift", tags: ["gift", "present", "birthday", "christmas", "surprise"] },
            { char: "🎈", name: "balloon", tags: ["balloon", "celebration", "party", "birthday"] },
            { char: "🎉", name: "party popper", tags: ["party", "celebrate", "tada", "congratulations", "yay"] },
            { char: "🎊", name: "confetti ball", tags: ["confetti", "party", "celebration"] },
            { char: "🔮", name: "crystal ball", tags: ["magic", "future", "fortune", "crystal"] },
            { char: "🧪", name: "test tube", tags: ["science", "chemistry", "lab", "experiment"] },
            { char: "💊", name: "pill", tags: ["medicine", "pill", "drug", "health"] },
            { char: "💉", name: "syringe", tags: ["vaccine", "injection", "needle", "medical"] },
            { char: "📚", name: "books", tags: ["books", "study", "read", "library", "school", "learn"] },
            { char: "📖", name: "open book", tags: ["book", "read", "learn", "study"] },
            { char: "📝", name: "memo", tags: ["note", "pencil", "write", "document"] },
            { char: "✉️", name: "envelope", tags: ["letter", "mail", "email", "message"] },
            { char: "📩", name: "envelope with arrow", tags: ["inbox", "mail", "receive"] },
            { char: "📨", name: "incoming envelope", tags: ["mail", "message", "incoming"] },
            { char: "📌", name: "pushpin", tags: ["pin", "location", "mark", "notice"] },
            { char: "📍", name: "round pushpin", tags: ["pin", "location", "map", "gps"] }
        ]
    },
    symbols: {
        name: "Symbols & Hearts",
        icon: "💖",
        emojis: [
            { char: "❤️", name: "red heart", tags: ["love", "heart", "red", "romance", "affection", "like"] },
            { char: "🧡", name: "orange heart", tags: ["love", "heart", "orange"] },
            { char: "💛", name: "yellow heart", tags: ["love", "heart", "yellow", "friendship"] },
            { char: "💚", name: "green heart", tags: ["love", "heart", "green", "nature"] },
            { char: "💙", name: "blue heart", tags: ["love", "heart", "blue", "trust"] },
            { char: "💜", name: "purple heart", tags: ["love", "heart", "purple", "bts"] },
            { char: "🖤", name: "black heart", tags: ["love", "heart", "black", "dark"] },
            { char: "🤍", name: "white heart", tags: ["love", "heart", "white", "pure"] },
            { char: "🤎", name: "brown heart", tags: ["love", "heart", "brown"] },
            { char: "💔", name: "broken heart", tags: ["heartbreak", "sad", "broken", "grief", "breakup"] },
            { char: "❣️", name: "heart exclamation", tags: ["heart", "exclamation", "love"] },
            { char: "💕", name: "two hearts", tags: ["hearts", "love", "pink", "cute"] },
            { char: "💞", name: "revolving hearts", tags: ["hearts", "love", "romance"] },
            { char: "💓", name: "beating heart", tags: ["heartbeat", "love", "pulse"] },
            { char: "💗", name: "growing heart", tags: ["heart", "love", "excited"] },
            { char: "💖", name: "sparkling heart", tags: ["heart", "sparkle", "love", "shine", "pink"] },
            { char: "💘", name: "heart with arrow", tags: ["cupid", "love", "arrow", "romance"] },
            { char: "💝", name: "heart with ribbon", tags: ["gift", "love", "valentine", "heart"] },
            { char: "💟", name: "heart decoration", tags: ["heart", "purple", "love"] },
            { char: "💯", name: "hundred points", tags: ["100", "perfect", "score", "keep it 100", "real", "best"] },
            { char: "🔥", name: "fire", tags: ["fire", "flame", "lit", "hot", "burn", "awesome", "hype"] },
            { char: "✨", name: "sparkles", tags: ["sparkle", "shine", "magic", "stars", "clean", "special"] },
            { char: "🌟", name: "glowing star", tags: ["star", "shine", "bright", "glow"] },
            { char: "⭐", name: "star", tags: ["star", "favorite", "yellow"] },
            { char: "💫", name: "dizzy star", tags: ["star", "sparkle", "magic"] },
            { char: "💥", name: "collision", tags: ["boom", "explosion", "bang", "impact"] },
            { char: "💢", name: "anger symbol", tags: ["angry", "rage", "anime"] },
            { char: "💦", name: "sweat droplets", tags: ["sweat", "water", "splash", "drip"] },
            { char: "💨", name: "dashing away", tags: ["fast", "run", "wind", "speed", "fart"] },
            { char: "💬", name: "speech balloon", tags: ["chat", "talk", "bubble", "message"] },
            { char: "💭", name: "thought balloon", tags: ["think", "thought", "dream", "bubble"] },
            { char: "💤", name: "zzz", tags: ["sleep", "tired", "boring"] },
            { char: "🔔", name: "bell", tags: ["bell", "notification", "alert", "ring"] },
            { char: "🔕", name: "bell with slash", tags: ["mute", "silent", "quiet", "no notifications"] },
            { char: "🎵", name: "musical note", tags: ["music", "note", "sound", "song"] },
            { char: "🎶", name: "musical notes", tags: ["music", "sing", "tune", "notes"] },
            { char: "📢", name: "loudspeaker", tags: ["announce", "loud", "megaphone", "broadcast"] },
            { char: "📣", name: "megaphone", tags: ["cheer", "shout", "megaphone"] },
            { char: "⚠️", name: "warning", tags: ["warning", "caution", "alert", "danger"] },
            { char: "⛔", name: "no entry", tags: ["stop", "no entry", "forbidden", "denied"] },
            { char: "🚫", name: "prohibited", tags: ["no", "banned", "prohibited", "stop"] },
            { char: "❌", name: "cross mark", tags: ["no", "x", "wrong", "delete", "cancel", "bad"] },
            { char: "✅", name: "check mark button", tags: ["check", "yes", "done", "correct", "approve", "ok"] },
            { char: "✔️", name: "check mark", tags: ["check", "done", "yes"] },
            { char: "❓", name: "red question mark", tags: ["question", "what", "confused", "help"] },
            { char: "❔", name: "white question mark", tags: ["question", "what", "help"] },
            { char: "❗", name: "red exclamation mark", tags: ["exclamation", "alert", "important", "warning"] },
            { char: "‼️", name: "double exclamation mark", tags: ["exclamation", "shock", "alert"] },
            { char: "⁉️", name: "exclamation question mark", tags: ["shock", "question", "what"] },
            { char: "➕", name: "plus", tags: ["plus", "add", "math"] },
            { char: "➖", name: "minus", tags: ["minus", "subtract"] },
            { char: "✖️", name: "multiply", tags: ["multiply", "math"] },
            { char: "➗", name: "divide", tags: ["divide", "math"] },
            { char: "♾️", name: "infinity", tags: ["forever", "infinity", "limitless"] },
            { char: "🌐", name: "globe with meridians", tags: ["world", "internet", "web", "global", "earth"] },
            { char: "☀️", name: "sun", tags: ["sun", "sunny", "weather", "summer", "warm"] },
            { char: "🌙", name: "crescent moon", tags: ["moon", "night", "sleep", "dark"] },
            { char: "⚡", name: "high voltage", tags: ["lightning", "thunder", "power", "fast", "electric", "energy"] },
            { char: "❄️", name: "snowflake", tags: ["snow", "winter", "cold", "freeze", "ice"] },
            { char: "🌈", name: "rainbow", tags: ["rainbow", "colorful", "pride", "weather"] }
        ]
    },
    flags: {
        name: "Flags",
        icon: "🚩",
        emojis: [
            { char: "🏁", name: "chequered flag", tags: ["flag", "finish", "race", "winner"] },
            { char: "🚩", name: "triangular flag", tags: ["flag", "red flag", "warning", "mark"] },
            { char: "🎌", name: "crossed flags", tags: ["flags", "japan", "celebrate"] },
            { char: "🏴", name: "black flag", tags: ["flag", "black"] },
            { char: "🏳️", name: "white flag", tags: ["flag", "surrender", "peace"] },
            { char: "🏳️‍🌈", name: "rainbow flag", tags: ["pride", "lgbt", "rainbow", "flag"] },
            { char: "🏳️‍⚧️", name: "transgender flag", tags: ["trans", "pride", "flag"] },
            { char: "🏴‍☠️", name: "pirate flag", tags: ["pirate", "skull", "crossbones", "flag"] },
            { char: "🇮🇳", name: "flag: India", tags: ["india", "indian", "flag", "in"] },
            { char: "🇺🇸", name: "flag: United States", tags: ["usa", "america", "united states", "flag"] },
            { char: "🇬🇧", name: "flag: United Kingdom", tags: ["uk", "britain", "england", "flag"] },
            { char: "🇨🇦", name: "flag: Canada", tags: ["canada", "canadian", "flag"] },
            { char: "🇦🇺", name: "flag: Australia", tags: ["australia", "aussie", "flag"] },
            { char: "🇩🇪", name: "flag: Germany", tags: ["germany", "german", "flag"] },
            { char: "🇫🇷", name: "flag: France", tags: ["france", "french", "flag"] },
            { char: "🇯🇵", name: "flag: Japan", tags: ["japan", "japanese", "flag"] },
            { char: "🇧🇷", name: "flag: Brazil", tags: ["brazil", "flag"] },
            { char: "🇪🇸", name: "flag: Spain", tags: ["spain", "spanish", "flag"] },
            { char: "🇮🇹", name: "flag: Italy", tags: ["italy", "italian", "flag"] },
            { char: "🇰🇷", name: "flag: South Korea", tags: ["korea", "south korea", "korean", "flag"] },
            { char: "🇦🇪", name: "flag: United Arab Emirates", tags: ["uae", "dubai", "flag"] }
        ]
    }
};

// Top quick reactions for instant 1-tap reaction/insertion
const QUICK_EMOJIS = ["👍", "❤️", "😂", "🔥", "🎉", "😮", "😢", "✨", "🚀", "💯"];

class PrattleEmojiPicker {
    constructor(options = {}) {
        this.container = document.getElementById(options.containerId || 'emojiPickerContainer');
        this.toggleBtn = document.getElementById(options.toggleBtnId || 'emojiToggleBtn');
        this.targetInput = document.getElementById(options.inputId || 'inputMessage');
        this.quickBar = document.getElementById(options.quickBarId || 'quickEmojiBar');
        
        this.currentCategory = 'recent';
        this.isOpen = false;
        this.recentKey = 'prattle_recent_emojis';
        this.maxRecents = 24;

        if (!this.container || !this.targetInput) {
            console.warn('Emoji Picker: Elements not ready yet');
            return;
        }

        this.init();
    }

    init() {
        this.renderStructure();
        this.renderQuickBar();
        this.bindEvents();
        this.showCategory(this.getRecents().length > 0 ? 'recent' : 'smileys');
    }

    getRecents() {
        try {
            const data = localStorage.getItem(this.recentKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    addRecent(emojiChar) {
        try {
            let recents = this.getRecents().filter(e => e !== emojiChar);
            recents.unshift(emojiChar);
            if (recents.length > this.maxRecents) {
                recents = recents.slice(0, this.maxRecents);
            }
            localStorage.setItem(this.recentKey, JSON.stringify(recents));
        } catch (e) {
            console.error('Failed to save recent emoji', e);
        }
    }

    renderStructure() {
        this.container.innerHTML = `
            <div class="emoji-picker-header flex items-center justify-between p-2.5 border-b border-gray-700/80 bg-gray-800/90 gap-2">
                <div class="relative flex-1">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-gray-400">
                        <i class="fa-solid fa-magnifying-glass text-xs"></i>
                    </span>
                    <input type="text" id="emojiSearchInput" placeholder="Search emojis..." 
                        class="w-full bg-gray-900/90 text-gray-200 text-xs rounded-xl pl-8 pr-7 py-1.5 border border-gray-700 focus:border-indigo-500 focus:outline-none placeholder-gray-500 transition-colors">
                    <button type="button" id="clearEmojiSearch" class="hidden absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-200 text-xs">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <button type="button" id="closeEmojiPickerBtn" class="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700/60 transition-colors" title="Close">
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>

            <!-- Categories Bar -->
            <div id="emojiCategoryTabs" class="flex items-center justify-between px-2 py-1.5 border-b border-gray-700/60 bg-gray-850/90 text-sm overflow-x-auto no-scrollbar gap-1">
                <button type="button" data-cat="recent" class="cat-btn p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50 transition-colors" title="Frequently Used">
                    <i class="fa-regular fa-clock text-xs"></i>
                </button>
                <button type="button" data-cat="smileys" class="cat-btn p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50 transition-colors" title="Smileys & Emotion">
                    😀
                </button>
                <button type="button" data-cat="people" class="cat-btn p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50 transition-colors" title="People & Gestures">
                    👋
                </button>
                <button type="button" data-cat="animals" class="cat-btn p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50 transition-colors" title="Animals & Nature">
                    🐶
                </button>
                <button type="button" data-cat="food" class="cat-btn p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50 transition-colors" title="Food & Drink">
                    🍔
                </button>
                <button type="button" data-cat="activities" class="cat-btn p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50 transition-colors" title="Activities & Sports">
                    ⚽
                </button>
                <button type="button" data-cat="travel" class="cat-btn p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50 transition-colors" title="Travel & Places">
                    🚗
                </button>
                <button type="button" data-cat="objects" class="cat-btn p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50 transition-colors" title="Objects & Tech">
                    💡
                </button>
                <button type="button" data-cat="symbols" class="cat-btn p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50 transition-colors" title="Symbols & Hearts">
                    💖
                </button>
                <button type="button" data-cat="flags" class="cat-btn p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50 transition-colors" title="Flags">
                    🚩
                </button>
            </div>

            <!-- Emoji List Area -->
            <div id="emojiGridArea" class="p-2 overflow-y-auto max-h-56 min-h-[180px] custom-scrollbar select-none">
            </div>

            <!-- Footer / Info Bar -->
            <div id="emojiFooter" class="px-3 py-1.5 border-t border-gray-700/80 bg-gray-900/90 text-xs text-gray-400 flex items-center justify-between min-h-[30px]">
                <div id="emojiPreviewText" class="flex items-center gap-2 truncate">
                    <span class="text-gray-500">Pick an emoji</span>
                </div>
                <span class="text-[10px] text-gray-500 hidden sm:inline">ESC to close</span>
            </div>
        `;
    }

    renderQuickBar() {
        if (!this.quickBar) return;
        this.quickBar.innerHTML = QUICK_EMOJIS.map(emoji => `
            <button type="button" class="quick-emoji-btn text-lg hover:scale-125 transition-transform duration-100 p-1 rounded-md hover:bg-gray-700/50 active:scale-95" data-emoji="${emoji}" title="${emoji}">
                ${emoji}
            </button>
        `).join('');

        this.quickBar.querySelectorAll('.quick-emoji-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const emoji = btn.getAttribute('data-emoji');
                this.insertEmoji(emoji);
            });
        });
    }

    showCategory(catKey) {
        this.currentCategory = catKey;
        const grid = this.container.querySelector('#emojiGridArea');
        const searchInput = this.container.querySelector('#emojiSearchInput');
        if (searchInput) searchInput.value = '';
        const clearBtn = this.container.querySelector('#clearEmojiSearch');
        if (clearBtn) clearBtn.classList.add('hidden');

        // Update active tab styling
        this.container.querySelectorAll('.cat-btn').forEach(btn => {
            if (btn.getAttribute('data-cat') === catKey) {
                btn.classList.add('text-indigo-400', 'bg-gray-700/70');
                btn.classList.remove('text-gray-400');
            } else {
                btn.classList.remove('text-indigo-400', 'bg-gray-700/70');
                btn.classList.add('text-gray-400');
            }
        });

        if (catKey === 'recent') {
            const recents = this.getRecents();
            if (recents.length === 0) {
                grid.innerHTML = `
                    <div class="flex flex-col items-center justify-center h-40 text-gray-500 text-xs">
                        <i class="fa-regular fa-clock text-2xl mb-2 text-gray-600"></i>
                        <p>No recently used emojis</p>
                        <p class="text-[11px] text-gray-600 mt-1">Emojis you click will show up here!</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = `
                <div class="mb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-1">Frequently Used</div>
                <div class="grid grid-cols-8 gap-1">
                    ${recents.map(char => `
                        <button type="button" class="emoji-btn text-xl sm:text-2xl hover:scale-125 transition-transform duration-100 p-1 rounded-lg hover:bg-gray-700/80 active:scale-95 flex items-center justify-center aspect-square" data-emoji="${char}" data-name="Recent emoji" data-tags="">
                            ${char}
                        </button>
                    `).join('')}
                </div>
            `;
            this.bindEmojiClick(grid);
            return;
        }

        const category = EMOJI_DATA[catKey];
        if (!category) return;

        grid.innerHTML = `
            <div class="mb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-1">${category.name}</div>
            <div class="grid grid-cols-8 gap-1">
                ${category.emojis.map(e => `
                    <button type="button" class="emoji-btn text-xl sm:text-2xl hover:scale-125 transition-transform duration-100 p-1 rounded-lg hover:bg-gray-700/80 active:scale-95 flex items-center justify-center aspect-square" data-emoji="${e.char}" data-name="${e.name}" data-tags="${e.tags.join(', ')}">
                        ${e.char}
                    </button>
                `).join('')}
            </div>
        `;

        this.bindEmojiClick(grid);
    }

    searchEmojis(query) {
        const grid = this.container.querySelector('#emojiGridArea');
        const clearBtn = this.container.querySelector('#clearEmojiSearch');
        const q = query.trim().toLowerCase();

        if (q.length === 0) {
            clearBtn.classList.add('hidden');
            this.showCategory(this.currentCategory);
            return;
        }

        clearBtn.classList.remove('hidden');

        // Search through all categories
        const matches = [];
        Object.keys(EMOJI_DATA).forEach(catKey => {
            EMOJI_DATA[catKey].emojis.forEach(e => {
                if (e.name.toLowerCase().includes(q) || e.tags.some(tag => tag.toLowerCase().includes(q)) || e.char === q) {
                    matches.push(e);
                }
            });
        });

        // Clear active category tab highlight
        this.container.querySelectorAll('.cat-btn').forEach(btn => {
            btn.classList.remove('text-indigo-400', 'bg-gray-700/70');
            btn.classList.add('text-gray-400');
        });

        if (matches.length === 0) {
            grid.innerHTML = `
                <div class="flex flex-col items-center justify-center h-40 text-gray-500 text-xs">
                    <i class="fa-solid fa-face-frown text-2xl mb-2 text-gray-600"></i>
                    <p>No emojis found for "<span class="text-gray-400">${query}</span>"</p>
                    <p class="text-[11px] text-gray-600 mt-1">Try another search term like smile, love, dog, fire</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = `
            <div class="mb-1 text-[11px] font-semibold text-indigo-400 uppercase tracking-wider px-1">Search Results (${matches.length})</div>
            <div class="grid grid-cols-8 gap-1">
                ${matches.map(e => `
                    <button type="button" class="emoji-btn text-xl sm:text-2xl hover:scale-125 transition-transform duration-100 p-1 rounded-lg hover:bg-gray-700/80 active:scale-95 flex items-center justify-center aspect-square" data-emoji="${e.char}" data-name="${e.name}" data-tags="${e.tags.join(', ')}">
                        ${e.char}
                    </button>
                `).join('')}
            </div>
        `;

        this.bindEmojiClick(grid);
    }

    bindEmojiClick(container) {
        const previewText = this.container.querySelector('#emojiPreviewText');

        container.querySelectorAll('.emoji-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const char = btn.getAttribute('data-emoji');
                this.insertEmoji(char);
            });

            btn.addEventListener('mouseenter', () => {
                const char = btn.getAttribute('data-emoji');
                const name = btn.getAttribute('data-name');
                if (previewText) {
                    previewText.innerHTML = `
                        <span class="text-base">${char}</span>
                        <span class="text-gray-300 font-medium capitalize truncate">${name}</span>
                    `;
                }
            });

            btn.addEventListener('mouseleave', () => {
                if (previewText) {
                    previewText.innerHTML = `<span class="text-gray-500">Pick an emoji</span>`;
                }
            });
        });
    }

    insertEmoji(emojiChar) {
        if (!this.targetInput) return;

        const start = this.targetInput.selectionStart ?? this.targetInput.value.length;
        const end = this.targetInput.selectionEnd ?? this.targetInput.value.length;
        const val = this.targetInput.value;

        // Splice emoji at current selection
        this.targetInput.value = val.substring(0, start) + emojiChar + val.substring(end);
        const newCursorPos = start + emojiChar.length;

        // Restore focus and cursor position
        this.targetInput.focus();
        this.targetInput.setSelectionRange(newCursorPos, newCursorPos);

        // Trigger input event to auto-expand textarea if needed
        this.targetInput.dispatchEvent(new Event('input', { bubbles: true }));

        // Track in recent emojis
        this.addRecent(emojiChar);
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.container.classList.remove('hidden');
        // Small delay for CSS animation
        setTimeout(() => {
            this.container.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
            this.container.classList.add('opacity-100', 'scale-100');
        }, 10);

        this.isOpen = true;
        if (this.toggleBtn) {
            this.toggleBtn.classList.add('text-emerald-400');
            this.toggleBtn.classList.remove('text-gray-400');
            this.toggleBtn.innerHTML = `<i class="fa-solid fa-keyboard text-xl text-emerald-400 transition-transform transform scale-110"></i>`;
        }

        // Focus search input on desktop
        if (window.innerWidth > 640) {
            const search = this.container.querySelector('#emojiSearchInput');
            if (search) setTimeout(() => search.focus(), 50);
        }
    }

    close() {
        this.container.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        this.container.classList.remove('opacity-100', 'scale-100');
        setTimeout(() => {
            this.container.classList.add('hidden');
        }, 150);

        this.isOpen = false;
        if (this.toggleBtn) {
            this.toggleBtn.classList.remove('text-emerald-400');
            this.toggleBtn.classList.add('text-gray-400');
            this.toggleBtn.innerHTML = `<i class="fa-regular fa-face-smile text-xl text-gray-400 transition-transform hover:text-gray-200"></i>`;
        }
    }

    bindEvents() {
        // Toggle button click
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });
        }

        // Close button inside picker
        const closeBtn = this.container.querySelector('#closeEmojiPickerBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.close();
            });
        }

        // Category tab clicks
        this.container.querySelector('#emojiCategoryTabs')?.addEventListener('click', (e) => {
            const btn = e.target.closest('.cat-btn');
            if (!btn) return;
            e.preventDefault();
            e.stopPropagation();
            const cat = btn.getAttribute('data-cat');
            this.showCategory(cat);
        });

        // Search input events
        const searchInput = this.container.querySelector('#emojiSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchEmojis(e.target.value);
            });

            // Enter key selects the first matching emoji
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const firstEmoji = this.container.querySelector('.emoji-btn');
                    if (firstEmoji) {
                        const char = firstEmoji.getAttribute('data-emoji');
                        this.insertEmoji(char);
                    }
                } else if (e.key === 'Escape') {
                    this.close();
                }
            });
        }

        // Clear search button
        const clearBtn = this.container.querySelector('#clearEmojiSearch');
        if (clearBtn) {
            clearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showCategory(this.currentCategory);
            });
        }

        // Global outside click listener
        const outsideClickListener = (e) => {
            if (!this.isOpen) return;
            if (this.container.contains(e.target) || (this.toggleBtn && this.toggleBtn.contains(e.target))) {
                return;
            }
            this.close();
        };
        document.addEventListener('click', outsideClickListener);

        // Global Escape key listener
        const escListener = (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        };
        document.addEventListener('keydown', escListener);
    }
}

// Attach to window so it can be invoked cleanly in AJAX and standalone scripts
window.PrattleEmojiPicker = PrattleEmojiPicker;
