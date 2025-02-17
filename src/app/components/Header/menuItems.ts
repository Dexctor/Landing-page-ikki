export interface MenuItem {
  name: string;
  href: string;
  subItems?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { name: 'Accueil', href: '#' },
  { 
    name: 'Projets', 
    href: '#',
    subItems: [
      { name: 'Pourquoi MyIkki?', href: '#why-myikki' },
      { name: 'Comment cela fonctionne', href: '#how-it-works' },
      { name: 'Pour Qui MyIkki?', href: '#for-who' },
    ]
  },
  { 
    name: 'ICO', 
    href: '#',
    subItems: [
      { name: 'Souscrire', href: '#Souscrire' },
    ]
  },
  { 
    name: 'Tokenomics', 
    href: '#',
    subItems: [
      { name: 'Utilité', href: '#Utilité' },
      { name: 'Construction', href: '#Construction' },
      { name: 'Répartition', href: '#Répartition' },
      { name: 'Listing', href: '#Listing' },
    ]
  },
  { 
    name: 'Roadmap', 
    href: '#',
    subItems: [
      { name: 'Map', href: '#Map' },
    ]
  },
  { 
    name: 'Ecosystem', 
    href: '#',
    subItems: [
      { name: 'Pro', href: '#Pro' },
      { name: 'Particulier', href: '#Particulier' },
    ]
  },

  { 
    name: 'A propos de nous', 
    href: '#',
    subItems: [
      { name: 'Notre équipe', href: '#Notre équipe' },
      { name: 'Nos Partenaires', href: '#Nos Partenaires' },
      { name: 'Le Blog', href: '#Le Blog' },
      { name: 'Nous Contacter', href: '#Nous Contacter' },
    ]
  },
]; 