// Edit text here. Put photos in /public/photos and music in /public/music.
// A photo path like "/photos/early-1.jpg" points to public/photos/early-1.jpg.
// If a photo is missing, the page shows a "Photo coming soon" box instead of breaking.

export const site = {
  music: '/music/blessing.mp3',
  babyName: '', // leave empty until the parents reveal it
  fromName: 'Your brother', // change to how you sign the letter
}

export const loveStory = {
  title: 'Before the wedding',
  intro: 'Every love story starts with a small moment that nobody knew would matter.',
  items: [
    { photo: '/beforemarriage1.jpeg', date: 'Date here', caption: 'How it all began.' },
    { photo: '/beforemarriage2.jpeg', date: 'Date here', caption: 'A memory we still smile about.' },
    { photo: '/beforemarriage3.jpeg', date: 'Date here', caption: 'The moment we knew.' },
  ],
}

export const wedding = {
  title: 'The wedding day',
  intro: 'The day two families became one.',
  items: [
    { photo: '/wedding1.jpeg', caption: 'The ceremony.' },
    { photo: '/wedding2.jpeg', caption: 'Bride and groom.' },
    { photo: '/wedding3.jpeg', caption: 'The celebration.' },
  ],
  message: 'Write a special wedding message here.',
}

export const afterMarriage = {
  title: 'Life together',
  intro: 'Trips, family gatherings and ordinary days that became favorites.',
  items: [
    { photo: '/together1.jpeg', caption: 'Adventures together.' },
    { photo: '/together2.jpeg', caption: 'Family gatherings.' },
    { photo: '/together3.jpeg', caption: 'Everyday moments.' },
  ],
}

export const parenthood = {
  title: 'The journey to parenthood',
  intro: 'Then came the news that changed everything.',
  items: [
    { photo: '/parenthood1.jpeg', date: 'Date here', caption: 'The announcement.' },
    { photo: '/parenthood2.jpeg', caption: 'Waiting, hoping, smiling.' },
    { photo: '/parenthood3.jpeg', caption: 'Counting the days.' },
  ],
  message: 'Write a message of excitement and anticipation here.',
}

export const baby = {
  title: 'Welcome, baby boy',
  photos: [
    { photo: '/baby3.jpg', caption: 'Hello, little one.' },
    { photo: '/baby4.jpg', caption: 'Our newest blessing.' },
  ],
  message: 'Write a message celebrating his arrival here.',
}

export const letter = {
  title: 'A letter for you',
  hint: 'Tap the envelope to open it',
  greeting: 'Dear little one,',
  paragraphs: [
    'Write your personal letter to your nephew here.',
    'Tell him about his family, the people who already love him, and what you hope for his future.',
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