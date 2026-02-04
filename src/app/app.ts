import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Liat Elka DJ');
  protected isMenuOpen = signal(false);
  protected isScrolled = signal(false);
  protected currentLang = signal<'en' | 'he'>('en');

  // Content in both languages
  protected content = {
    en: {
      nav: {
        about: 'About',
        services: 'Services',
        media: 'Media',
        reviews: 'Reviews',
        contact: 'Contact'
      },
      hero: {
        tagline: 'Bringing the Party to Life',
        subtitle: 'Professional DJ for Private Events, Corporate Parties & Weddings',
        cta: 'Book Now'
      },
      about: {
        title: 'Meet Your DJ',
        p1: 'Hey there! I\'m Liat Elka.',
        p2: 'I turn every event into an unforgettable dance party. From 70s disco to today\'s biggest hits, I read the crowd and keep the energy high all night long.',
        p3: 'Good vibes only. Let\'s make your event legendary!',
        genres: ['Mainstream Hits', '70s • 80s • 90s', 'Hip Hop', 'Latin']
      },
      services: {
        title: 'Services',
        subtitle: 'Creating unforgettable moments for every occasion',
        items: [
          {
            icon: '🎉',
            title: 'Private Events',
            description: 'Birthdays, celebrations, house parties — I bring the perfect playlist and energy to make your private event unforgettable.'
          },
          {
            icon: '💼',
            title: 'Corporate Events',
            description: 'Company parties, product launches, team celebrations — professional DJ services that match your brand\'s vibe.'
          },
          {
            icon: '💍',
            title: 'Weddings',
            description: 'Your special day deserves the perfect soundtrack. From ceremony to last dance, I\'ll make it magical.'
          }
        ]
      },
      media: {
        title: 'Gallery',
        subtitle: 'Capturing the energy'
      },
      soundcloud: {
        title: 'Listen',
        subtitle: 'Check out my latest mixes'
      },
      instagram: {
        title: 'Follow the Vibe',
        subtitle: '@liat_elka',
        cta: 'Follow on Instagram'
      },
      reviews: {
        title: 'What People Say',
        subtitle: 'Real reviews from real parties',
        items: [
          {
            text: 'Liat was absolutely amazing! She had everyone dancing all night. The music selection was perfect!',
            author: 'Sarah M.',
            event: 'Wedding'
          },
          {
            text: 'Best DJ we\'ve ever hired for our company events. Professional, fun, and knows exactly how to read the crowd.',
            author: 'David K.',
            event: 'Corporate Event'
          },
          {
            text: 'My 40th birthday party was legendary thanks to Liat! She played all my favorite songs and the vibe was incredible.',
            author: 'Michelle R.',
            event: 'Birthday Party'
          }
        ]
      },
      contact: {
        title: 'Let\'s Party!',
        subtitle: 'Ready to make your event unforgettable? Get in touch!',
        whatsapp: 'Book via WhatsApp'
      },
      footer: {
        rights: '© 2026 Liat Elka DJ. All rights reserved.',
        tagline: 'Good Vibes Only 🎵'
      }
    },
    he: {
      nav: {
        about: 'אודות',
        services: 'שירותים',
        media: 'גלריה',
        reviews: 'המלצות',
        contact: 'צור קשר'
      },
      hero: {
        tagline: 'מביאה את המסיבה לחיים',
        subtitle: 'DJ מקצועית לאירועים פרטיים, עסקיים וחתונות',
        cta: 'להזמנה'
      },
      about: {
        title: 'הכירו את ה-DJ',
        p1: 'היי! אני ליאת אלקה.',
        p2: 'אני הופכת כל אירוע למסיבת ריקודים בלתי נשכחת. מדיסקו של שנות ה-70 ועד הלהיטים הכי חמים של היום, אני קוראת את הקהל ושומרת על האנרגיה גבוהה כל הלילה.',
        p3: 'רק ווייבים טובים. בואו נהפוך את האירוע שלכם לאגדי!',
        genres: ['להיטים', '70s • 80s • 90s', 'היפ הופ', 'לטינית']
      },
      services: {
        title: 'שירותים',
        subtitle: 'יוצרת רגעים בלתי נשכחים לכל אירוע',
        items: [
          {
            icon: '🎉',
            title: 'אירועים פרטיים',
            description: 'ימי הולדת, חגיגות, מסיבות בית — אני מביאה את הפלייליסט והאנרגיה המושלמים לאירוע הפרטי שלכם.'
          },
          {
            icon: '💼',
            title: 'אירועים עסקיים',
            description: 'מסיבות חברה, השקות מוצרים, חגיגות צוות — שירותי DJ מקצועיים שמתאימים לווייב של המותג שלכם.'
          },
          {
            icon: '💍',
            title: 'חתונות',
            description: 'היום המיוחד שלכם מגיע לו הפסקול המושלם. מהטקס ועד הריקוד האחרון, אני אהפוך אותו לקסום.'
          }
        ]
      },
      media: {
        title: 'גלריה',
        subtitle: 'לוכדת את האנרגיה'
      },
      soundcloud: {
        title: 'האזינו',
        subtitle: 'בדקו את המיקסים האחרונים שלי'
      },
      instagram: {
        title: 'עקבו אחרי הווייב',
        subtitle: '@liat_elka',
        cta: 'עקבו באינסטגרם'
      },
      reviews: {
        title: 'מה אומרים עליי',
        subtitle: 'ביקורות אמיתיות ממסיבות אמיתיות',
        items: [
          {
            text: 'ליאת הייתה מדהימה! היא גרמה לכולם לרקוד כל הלילה. בחירת המוזיקה הייתה מושלמת!',
            author: 'שרה מ.',
            event: 'חתונה'
          },
          {
            text: 'ה-DJ הכי טובה שהזמנו לאירועי החברה שלנו. מקצועית, כיפית, ויודעת בדיוק איך לקרוא את הקהל.',
            author: 'דוד כ.',
            event: 'אירוע עסקי'
          },
          {
            text: 'מסיבת יום ההולדת ה-40 שלי הייתה אגדית בזכות ליאת! היא שיחקה את כל השירים האהובים עליי והווייב היה מטורף.',
            author: 'מישל ר.',
            event: 'מסיבת יום הולדת'
          }
        ]
      },
      contact: {
        title: 'בואו נחגוג!',
        subtitle: 'מוכנים להפוך את האירוע שלכם לבלתי נשכח? צרו קשר!',
        whatsapp: 'הזמינו בוואטסאפ'
      },
      footer: {
        rights: '© 2026 ליאת אלקה DJ. כל הזכויות שמורות.',
        tagline: 'רק ווייבים טובים 🎵'
      }
    }
  };

  // Placeholder data
  protected galleryImages = [
    { id: 1, placeholder: true },
    { id: 2, placeholder: true },
    { id: 3, placeholder: true },
    { id: 4, placeholder: true },
    { id: 5, placeholder: true },
    { id: 6, placeholder: true }
  ];

  protected instagramPosts = [
    { id: 1, placeholder: true },
    { id: 2, placeholder: true },
    { id: 3, placeholder: true },
    { id: 4, placeholder: true }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleLang() {
    this.currentLang.update(l => l === 'en' ? 'he' : 'en');
  }

  get t() {
    return this.content[this.currentLang()];
  }

  get isHebrew() {
    return this.currentLang() === 'he';
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu();
    }
  }

  openWhatsApp() {
    // Replace with actual WhatsApp number
    window.open('https://wa.me/972501234567?text=Hi! I\'d like to book Liat Elka DJ for my event.', '_blank');
  }
}
