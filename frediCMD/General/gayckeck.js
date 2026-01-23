module.exports = {
  name: 'gaycheck',
  aliases: ['gaymeter', 'gcheck', 'howgay'],
  description: 'Checks gay percentage with fredi, violent, and realistic roasts',
  run: async (context) => {
    const { client, m } = context;

    try {
    
      let targetUser = null;
      let targetNumber = null;

     
      console.log(`Message context: isGroup=${m.isGroup}, mentionedJid=${JSON.stringify(m.mentionedJid)}, quotedSender=${m.quoted?.sender || 'none'}`);

  
      if (m.isGroup && m.mentionedJid && m.mentionedJid.length > 0) {
        console.log(`Tagged JIDs: ${JSON.stringify(m.mentionedJid)}`);
        targetUser = m.mentionedJid[0]; 
      } else if (m.quoted && m.quoted.sender) {
     
        console.log(`Quoted sender: ${m.quoted.sender}`);
        targetUser = m.quoted.sender;
      } else {
       
        console.log(`No tags or quoted message, using sender: ${m.sender}`);
        targetUser = m.sender;
      }

   
      if (
        !targetUser ||
        typeof targetUser !== 'string' ||
        (!targetUser.includes('@s.whatsapp.net') && !targetUser.includes('@lid'))
      ) {
        console.error(`Invalid target user: ${JSON.stringify(targetUser)}`);
        return m.reply(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\nWho the fuck am I torching? Tag someone or I’ll roast your sorry ass to ashes!\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`);
      }

      // Extract target number
      targetNumber = targetUser.split('@')[0];
      if (!targetNumber) {
        console.error(`Failed to extract target number from JID: ${targetUser}`);
        return m.reply(`❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\nThis user’s ID is fucked beyond repair. Try again, you brainless twit!\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`);
      }

    
      const checkingMsg = await client.sendMessage(
        m.chat,
        {
          text: `❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤\nCracking open @${targetNumber}'s soul for gay vibes... 🩸\nThis is gonna hurt like hell, you weakling!\n❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`,
          mentions: [targetUser],
        },
        { quoted: m }
      );

     
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

     
      const percentage = Math.floor(Math.random() * 101);

     
      let roast;
      let emoji;

      // Massive roast list🤣
      if (percentage === 0) {
        roast = "STRAIGHTER THAN A FUCKING RULER! You’re so dull you make cardboard look spicy, you basic-ass rock!";
        emoji = "🚫🏳️‍🌈";
      } else if (percentage <= 2) {
        roast = "NOT A HINT OF GAY! You’re so straight you’d get lost in a pride parade, you clueless troglodyte!";
        emoji = "📏";
      } else if (percentage <= 4) {
        roast = "ZERO SPARKS! You’re straighter than a flatline, you boring-ass zombie!";
        emoji = "😴";
      } else if (percentage <= 6) {
        roast = "BARELY A PULSE! You’re so straight you’d trip over a rainbow and sue it, you pathetic drone!";
        emoji = "🪨";
      } else if (percentage <= 8) {
        roast = "FAINT WHIFF OF CURIOUSITY! You’ve glanced at someone’s ass once and panicked, you spineless worm!";
        emoji = "👀";
      } else if (percentage <= 10) {
        roast = "TINY FLICKER! You’ve thought ‘nice jawline’ and then cried about it, you repressed fuck!";
        emoji = "💡";
      } else if (percentage <= 12) {
        roast = "SLIGHT TREMOR! You’ve stared a bit too long at a bro’s abs, you sneaky little shit!";
        emoji = "🤫";
      } else if (percentage <= 14) {
        roast = "MINOR VIBES DETECTED! You’d sob at a gay love story but swear it’s allergies, you fake-ass fraud!";
        emoji = "😢";
      } else if (percentage <= 16) {
        roast = "GETTING SUSSY! You’ve had a ‘what if I’m not straight’ Google search, you anxious mess!";
        emoji = "🧐";
      } else if (percentage <= 18) {
        roast = "CAUGHT IN 4K! You’re pretending it’s just ‘vibes,’ but we all see through you, you lying prick!";
        emoji = "📸";
      } else if (percentage <= 20) {
        roast = "TEETERING ON THE EDGE! You’re one rom-com away from a full identity crisis, you chaotic dumbass!";
        emoji = "🧭";
      } else if (percentage <= 22) {
        roast = "RAINBOW DUST SPOTTED! You’ve tried on someone’s glitter and liked it, you sneaky bastard!";
        emoji = "✨";
      } else if (percentage <= 24) {
        roast = "HALFWAY TO FABULOUS! You’re dipping toes in the gay pool but too scared to dive, you cowardly twink!";
        emoji = "🏊";
      } else if (percentage <= 26) {
        roast = "BI-CURIOUS CHAOS! You’re one tequila shot from kissing your bestie, you reckless fuck!";
        emoji = "🍹";
      } else if (percentage <= 28) {
        roast = "GAYDAR PINGS! You’re hoarding glitter and lying about it, you duplicitous sparkle gremlin!";
        emoji = "🚨";
      } else if (percentage <= 30) {
        roast = "VIBING HARD! You’ve got a secret Pinterest board for ‘aesthetic’ boys, you shady queer!";
        emoji = "📌";
      } else if (percentage <= 32) {
        roast = "RAINBOW TENDENCIES! You’re pretending it’s just ‘fashion sense,’ you delusional diva!";
        emoji = "🌈";
      } else if (percentage <= 34) {
        roast = "HALF A QUEER! You’re so confused you’re flipping coins to pick a team, you indecisive disaster!";
        emoji = "⚖️";
      } else if (percentage <= 36) {
        roast = "GAY VIBES RISING! You’re one pride flag away from a full glow-up, you half-baked queen!";
        emoji = "🏳️‍🌈";
      } else if (percentage <= 38) {
        roast = "NOT EVEN TRYING TO HIDE IT! Your straight act is crumbling like your dignity, you pathetic poser!";
        emoji = "🎭";
      } else if (percentage <= 40) {
        roast = "SOLID RAINBOW ENERGY! You’re out here winking at everyone, you shameless flirt!";
        emoji = "😉";
      } else if (percentage <= 42) {
        roast = "GAYDAR SCREAMING! You’re vibing harder than a drag show finale, you fabulous menace!";
        emoji = "🔊";
      } else if (percentage <= 44) {
        roast = "YOU’RE NOT FOOLING US! Your closet’s made of glass, you transparent twink!";
        emoji = "🪞";
      } else if (percentage <= 46) {
        roast = "RAINBOW IN TRAINING! You’re practicing your strut for the parade, you wannabe icon!";
        emoji = "🚶‍♂️";
      } else if (percentage <= 48) {
        roast = "HALFWAY TO FABULOUS! You’re one makeover away from slaying, you almost-there queen!";
        emoji = "💄";
      } else if (percentage <= 50) {
        roast = "PERFECTLY BALANCED MESS! You’re 50/50 and causing chaos everywhere, you unhinged bisexual disaster!";
        emoji = "⚖️";
      } else if (percentage <= 52) {
        roast = "TIPPING INTO GAYNESS! You’re leaning so hard you’re about to fall into a rainbow, you clumsy fuck!";
        emoji = "🌈";
      } else if (percentage <= 54) {
        roast = "GAY VIBES CONFIRMED! You’re out here stealing hearts and lying about it, you sneaky slut!";
        emoji = "💖";
      } else if (percentage <= 56) {
        roast = "FULL-ON PRIDE MODE! You’re waving the flag but calling it a towel, you delusional diva!";
        emoji = "🏳️‍🌈";
      } else if (percentage <= 58) {
        roast = "GLITTER IN YOUR BLOOD! You’re gayer than a unicorn’s fever dream, you sparkling freak!";
        emoji = "🦄";
      } else if (percentage <= 60) {
        roast = "RAINBOW ROYALTY! You’re ruling the queer scene with zero chill, you majestic bastard!";
        emoji = "👑";
      } else if (percentage <= 62) {
        roast = "FABULOUS AND UNHINGED! You’re so gay you make rainbows look basic, you chaotic icon!";
        emoji = "🌈🔥";
      } else if (percentage <= 64) {
        roast = "GAY AS A DISCO BALL! You’re shining so bright you’re blinding us, you radiant slut!";
        emoji = "🪩";
      } else if (percentage <= 66) {
        roast = "PRIDE PARADE CAPTAIN! You’re leading the charge with glitter cannons, you fearless queen!";
        emoji = "🎉";
      } else if (percentage <= 68) {
        roast = "GAY OVERDRIVE! You’re so queer you’re rewriting the laws of fabulousness, you untouchable legend!";
        emoji = "⚡";
      } else if (percentage <= 70) {
        roast = "RAINBOW WARRIOR! You’re out here slaying with every step, you unstoppable diva!";
        emoji = "🗡️";
      } else if (percentage <= 72) {
        roast = "GAY ICON IN TRAINING! You’re one wig away from stealing the spotlight, you rising star!";
        emoji = "🌟";
      } else if (percentage <= 74) {
        roast = "FABULOUSNESS OVERLOAD! You’re gayer than a drag brunch on steroids, you iconic mess!";
        emoji = "🍾";
      } else if (percentage <= 76) {
        roast = "QUEER LEGEND VIBES! You’re so gay you make the rainbow jealous, you radiant bastard!";
        emoji = "🏳️‍🌈🔥";
      } else if (percentage <= 78) {
        roast = "GAY GOD ENERGY! You’re out here creating new shades of fabulous, you divine queer!";
        emoji = "✨";
      } else if (percentage <= 80) {
        roast = "RAINBOW SUPREME! You’re so gay you’re bending reality, you cosmic diva!";
        emoji = "🌌";
      } else if (percentage <= 82) {
        roast = "ULTIMATE QUEER VIBES! You’re gayer than a pride float on fire, you unstoppable force!";
        emoji = "🔥🏳️‍🌈";
      } else if (percentage <= 84) {
        roast = "GAY TRANSCENDENCE! You’re so queer you’re rewriting the spectrum, you ethereal legend!";
        emoji = "🪐";
      } else if (percentage <= 86) {
        roast = "FABULOUS BEYOND MEASURE! You’re a walking pride apocalypse, you radiant disaster!";
        emoji = "💥";
      } else if (percentage <= 88) {
        roast = "GAY SINGULARITY ACHIEVED! You’re so queer you’re collapsing the straight universe, you cosmic queen!";
        emoji = "🌠";
      } else if (percentage <= 90) {
        roast = "RAINBOW OVERLORD! You’re ruling the gay multiverse with an iron glitter fist, you supreme diva!";
        emoji = "👑🌈";
      } else if (percentage <= 92) {
        roast = "GAY DEITY STATUS! You’re so fabulous you’re rewriting creation, you godly queer!";
        emoji = "🛐";
      } else if (percentage <= 94) {
        roast = "BEYOND FABULOUS! You’re gayer than the concept of rainbows, you celestial icon!";
        emoji = "🌟🏳️‍🌈";
      } else if (percentage <= 96) {
        roast = "GAY APOCALYPSE TRIGGER! You’re so queer you’re ending straightness forever, you cataclysmic legend!";
        emoji = "🌈💥";
      } else if (percentage <= 98) {
        roast = "ULTIMATE QUEER TITAN! You’re so gay you’re rewriting reality itself, you universe-shattering diva!";
        emoji = "🪐🔥";
      } else {
        roast = "ABSOLUTE GAY COSMIC EMPEROR! You’ve transcended all known sexuality and invented new dimensions of fabulous, you unstoppable rainbow god!";
        emoji = "🌌👑💥";
      }

      // insult pool💀
      let insult = "";
      if (percentage < 20) {
        insult = " Go choke on your boring life, you irrelevant speck of lint!";
      } else if (percentage > 80) {
        insult = " The universe bows to your fabulousness, you untouchable rainbow deity!";
      } else {
        const insults = [
          " You’re a walking trash fire!",
          " Your life’s a bigger flop than a dollar store wig!",
          " Even your shadow thinks you’re a loser!",
          " You make roadkill look charismatic!",
          " Your personality’s a certified dumpster dive!",
          " You’re the human equivalent of expired milk!",
          " Your existence is a cosmic typo!",
          " You’re so lame you make beige look exciting!",
          " Your vibe screams ‘I cry in parking lots’!",
          " You’re a discount knockoff of a real person!",
          " Your life’s a bigger mess than a clown’s makeup!",
          " You make bad decisions look like an art form!",
          " Your aura’s giving ‘I peaked at 12’!",
          " You’re the reason people hate group chats!",
          " Your face is a war crime against aesthetics!",
          " You’re so dull you make spreadsheets cry!",
          " Your entire vibe is a 404 error!",
          " You make elevator music sound thrilling!",
          " Your life’s a bigger tragedy than a soap opera!",
          " You’re the human equivalent of a wet sock!",
        ];
        insult = insults[Math.floor(Math.random() * insults.length)];
      }

    
      const resultMsg = `❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤
*GAY METER RESULTS* ${emoji}

*TARGET:* @${targetNumber}
*GAY PERCENTAGE:* ${percentage}% 

*VERDICT:* ${roast}${insult}

*DISCLAIMER:* This is 100% accurate and scientific, you sensitive snowflake! Cry about it! 😈
❥┈┈┈┈┈┈┈┈┈┈┈┈┈┈➤`;

      // Send the final result
      await client.sendMessage(
        m.chat,
        {
          text: resultMsg,
          mentions: [targetUser],
        },
        { quoted: m }
      );

     
      if (checkingMsg && checkingMsg.key) {
        try {
          await client.sendMessage(m.chat, {
            delete: checkingMsg.key,
          });
        } catch (deleteError) {
          console.error(`Failed to delete checking message: ${deleteError.stack}`);
        }
      }
    } catch (error) {
      console.error(`Gaycheck command detonated: ${error.stack}`);
      await m.reply(`◈━┈┈┈┈┈┈┈┈┈┈┈┈━◈\nThis shit blew up harder than your ego! Can’t check gay levels now, you doomed idiot!\n◈━┈┈┈┈┈┈┈┈┈┈┈┈━◈`);
    }
  },
};