/*
 * Rules:
 * Each map must be a 10x10 grid
 * Each row must be delimited by '\n'
 * Each row must have consecutive values
 * Values can only be '-', 'O', 'I', 'X' or whitespaces
 * Player starts at 'O'
 * Player can walk over '-'
 * Player must reach 'I'
 * Player can't touch 'X'
*/

// Mapping to visual elements
const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '🌳',
    'I': '🎁',
    'HEART': '❤️',
    'PLAYER': '🏃‍♂️',
    'BURN': '🔥',
    'IMPACT': '💥',
};
  
const maps = [];
maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
`);
maps.push(`
    ----------
    -XXXXXXXX-
    -XXXXXXXX-
    -XXX--XXX-
    -XX----XX-
    -XX-XX-XX-
    -X--XX--X-
    ---XXXX---
    --XXXXXX--
    OXXXXXXXXI
`);
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
`);
maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
`);

maps.push(`
    O---------
    XXXXXXXXX-
    --------X-
    -XXXXXX-X-
    -X----X-X-
    -X-XXIX-X-
    -X-XXXX-X-
    -X------X-
    -XXXXXXXX-
    ----------
`);