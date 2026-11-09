// Edit text here. Put photos in /public/photos and music in /public/music.
// A photo path like "/photos/early-1.jpg" points to public/photos/early-1.jpg.
// If a photo is missing, the page shows a "Photo coming soon" box instead of breaking.

export const site = {
  music: '/music/blessing.mp3',
  babyName: '', // leave empty until the parents reveal it
  fromName: 'Your Uncle, Kiros', // change to how you sign the letter
}

export const loveStory = {
  title: 'THE BEGINNING',
  intro: 'Where two separate paths started walking the exact same way.',
  items: [
    { photo: '/beforemarriage1.jpeg', date: '', caption: 'How it all began' },
    { photo: '/beforemarriage2.jpeg', date: '', caption: 'A memory we still smile about' },
    { photo: '/beforemarriage3.jpeg', date: '', caption: 'Pure Joy' },
  ],
}

export const wedding = {
  title: 'BECOMING ONE',
  intro: 'When forever officially began.',
  items: [
    { photo: '/wedding1.jpeg', caption: 'A Quiet Moment' },
    { photo: '/wedding2.jpeg', caption: 'Bride and groom' },
    { photo: '/wedding3.jpeg', caption: 'The celebration' },
  ],
  message: 'Watching you both start your life together, surrounded by a family I am incredibly proud to be part of, fills my heart with so much joy 💕',
}

export const afterMarriage = {
  title: 'LIFE TOGETHER',
  intro: 'The quiet days, the laughter, and all the sweet moments in between.',
  items: [
    { photo: '/together1.jpeg', caption: 'Little Moments' },
    { photo: '/together2.jpeg', caption: 'Side by Side' },
    { photo: '/together3.jpeg', caption: 'Sweet Escape' },
  ],
}

export const parenthood = {
  title: 'PARENTHOOD JOURNEY',
  intro: 'Then came the news that changed everything.',
  items: [
    { photo: '/parenthood1.jpeg', date: '', caption: 'The announcement' },
    { photo: '/parenthood2.jpeg', caption: 'Waiting, hoping, smiling' },
    { photo: '/parenthood3.jpeg', caption: 'Counting the days' },
  ],
  message: 'Watching your love grow into a family of three is the greatest gift. We cannot wait to meet the newest member of our family!',
}

export const baby = {
  title: 'WELCOME, BABY BOY',
  photos: [
    { photo: '/baby22.jpg', caption: 'Hello, little one.' },
    { photo: '/babbby.jpg', caption: 'Our newest blessing.' },
  ],
  message: 'You are already so loved, sweet little boy. We cannot wait to watch you grow, laugh, and fill our lives with endless joy.',
}

export const letter = {
  title: 'A LETTER TO MY NEPHEW',
  hint: 'Tap the envelope to open it',
  greeting: 'Dear little one,',
  paragraphs: [
    'You have not arrived yet, and you are already so loved.',
    'Your Mom and Dad have been waiting for you with more joy than words can hold. A whole family is ready to welcome you with open arms, prayers, and love.',
    'I may  live far from you, on another continent, but distance will never change what you are to me. You will be in my thoughts and prayers every day. I hope you grow up curious, kind, and brave, and that you always know where home is.',
    'welcome to the world, little one.',
  
  ],
  closing: 'With all my love,',
}

export const blessings = {
  title: 'Blessings and wishes',
  intro: 'Words from the people who love you most.',
  items: [
    { from: 'Family member name', message: 'A prayer, blessing or wish for the baby.' },
    { from: 'Family member name', message: 'A prayer, blessing or wish for the baby.' },
    { from: 'Family member name', message: 'A prayer, blessing or wish for the baby.' },
  ],
}

export const closing = {
  photo: '/newchapter2.jpg',
  title: 'A new chapter begins',
  message:
    'Love made a family. Family made a home. And now a little boy makes it complete.',
  signature: 'Made with love, for a lifetime of memories.',
}