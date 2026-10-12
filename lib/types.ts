export type UserRole = 'admin' | 'customer';

export type WebsiteStatus = 'draft' | 'published' | 'unpublished' | 'archived';

export const websiteDraftSchema = {
  content: {
    recipientName: '',
    senderName: '',
    title: '',
    headline: '',
    message: '',
    letter: '',
    gallery: [],
    sections: [],
    colors: {
      primary: '#d77a96',
      accent: '#f7d7c4',
      background: '#fffaf3'
    },
    musicUrl: '',
    autoplay: false,
    showEnvelope: true
  }
};
