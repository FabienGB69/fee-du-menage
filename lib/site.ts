export const siteConfig = {
  name: 'Fée du Ménage',
  phoneDisplay: '+33 6 09 89 65 64',
  phoneHref: 'tel:+33609896564',
  email: 'prestation.menage69@gmail.com',
  address: '55 rue du Bourdonnais, 69009 Lyon',
  area: 'Lyon uniquement, rayon 8 km',
  wecasaUrl: 'https://www.wecasa.fr/menage/lyon/djamila',
  reviews: 106,
  rating: '5/5',
  quoteRecipientName: 'Djamila',
  whatsappMessage: 'Bonjour, je souhaite obtenir un devis pour une prestation de ménage à Lyon.',
  domain: 'https://fee-du-menage.fr'
};

export const whatsappHref = `https://wa.me/33609896564?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export const services = [
  {
    title: 'Ménage régulier',
    icon: '🏡',
    description: 'Entretien hebdomadaire, bi-mensuel ou ponctuel pour garder un intérieur propre et agréable.',
    detail: 'Idéal pour les appartements et maisons à Lyon : dépoussiérage, sols, cuisine, salle de bain et entretien courant.'
  },
  {
    title: 'Grand nettoyage',
    icon: '✨',
    description: 'Nettoyage approfondi des pièces de vie, cuisine, salle de bain et surfaces à dépoussiérer.',
    detail: 'Une intervention plus complète pour remettre le logement à niveau ou préparer une période chargée.'
  },
  {
    title: 'Ménage après déménagement',
    icon: '📦',
    description: 'Remise au propre avant état des lieux, emménagement ou départ d’un logement lyonnais.',
    detail: 'Nettoyage soigné des surfaces accessibles pour rendre ou récupérer un logement propre.'
  },
  {
    title: 'Nettoyage Airbnb',
    icon: '🔑',
    description: 'Préparation soignée de votre location courte durée pour accueillir les voyageurs dans les meilleures conditions.',
    detail: 'Une solution locale pour maintenir une expérience voyageurs propre, régulière et rassurante.'
  },
  {
    title: 'Nettoyage des vitres',
    icon: '🪟',
    description: 'Vitres, miroirs et surfaces vitrées pour plus de luminosité dans votre logement.',
    detail: 'Nettoyage ponctuel ou en complément d’une prestation de ménage à domicile.'
  }
];

export const excludedServices = ['Pas de bureaux', 'Pas de repassage', 'Pas de nettoyage fin de chantier'];
