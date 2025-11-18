# 🍽️ African Korner - Restaurant Camerounais

Site web moderne et responsive pour le restaurant African Korner situé à Roubaix, France.

## ✨ Fonctionnalités

### 🎨 Design
- Esthétique africaine moderne avec couleurs chaudes et vives
- Animations de défilement fluides style Apple
- Design 100% responsive (mobile, tablette, desktop)
- Indicateur d'ouverture du restaurant en temps réel

### 🛒 Système de Commande Complet
- **3 modes de commande** : Réservation de table, Livraison à domicile, À emporter
- Panier d'achat interactif avec animations
- Tunnel d'achat en 4 étapes
- Notifications toast lors de l'ajout au panier

### 💳 Paiements
- Apple Pay
- Carte bancaire
- Espèces
- Paiement sur place

### 📱 Fonctionnalités Avancées
- Sélecteur d'indicatif téléphonique international
- Créneaux horaires de livraison par intervalles de 30 minutes
- Formulaire de contact
- Menu interactif avec filtres par catégorie

### 🔐 Panneau Administrateur
- Tableau de bord en temps réel pour voir toutes les commandes
- Gestion des statuts de commande (En attente, Confirmée, En préparation, Prête, Terminée)
- Recherche et filtres avancés
- Statistiques en direct (nombre de commandes, revenus, etc.)
- Interface responsive accessible depuis ordinateur, tablette ou mobile

### 🗄️ Backend
- Base de données **Supabase** pour stockage des commandes
- API REST pour gestion des commandes
- Système de suivi de commande en temps réel

## 🚀 Technologies Utilisées

- **React 18** avec TypeScript
- **Vite** pour le build ultra-rapide
- **Tailwind CSS 4** pour le styling
- **Motion (Framer Motion)** pour les animations
- **Supabase** pour le backend et la base de données
- **Lucide React** pour les icônes
- **Recharts** pour les graphiques (si nécessaire)
- **Sonner** pour les notifications toast

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/african-korner.git

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🔧 Configuration Supabase

1. Créez un projet sur [Supabase](https://supabase.com)
2. Ajoutez les variables d'environnement dans Vercel :
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_DB_URL`

## 🌐 Déploiement sur Vercel

1. Push votre code sur GitHub
2. Connectez votre repository à [Vercel](https://vercel.com)
3. Ajoutez les variables d'environnement Supabase
4. Déployez !

L'URL sera : `https://votre-projet.vercel.app`

## 📊 Accès Administrateur

Pour gérer les commandes, accédez au panneau admin :

```
https://votre-site.vercel.app/admin
```

Consultez le fichier `GUIDE_GESTIONNAIRE.md` pour les instructions complètes.

## 📱 Pages

- `/` - Page d'accueil avec menu et commande
- `/admin` - Tableau de bord administrateur
- `/track-order` - Suivi de commande

## 🎯 Structure du Projet

```
/
├── components/          # Composants React
│   ├── ui/             # Composants UI (Shadcn)
│   ├── AdminDashboard.tsx
│   ├── Header.tsx
│   ├── Menu.tsx
│   └── ...
├── context/            # Context API (Panier)
├── pages/              # Pages de routage
├── styles/             # Styles globaux
├── utils/              # Utilitaires (API, Supabase)
├── supabase/           # Backend Supabase
└── App.tsx             # Composant principal
```

## 📝 Scripts Disponibles

```bash
npm run dev      # Lancer en mode développement
npm run build    # Build pour production
npm run preview  # Prévisualiser le build
```

## 🎨 Personnalisation

Les couleurs et styles peuvent être modifiés dans `/styles/globals.css`

## 📄 Documentation

- `GUIDE_GESTIONNAIRE.md` - Guide pratique pour le gestionnaire
- `README_ADMIN.md` - Documentation complète du panneau admin

## 🆘 Support

Pour toute question ou problème, consultez la documentation ou créez une issue.

## 📜 Licence

Tous droits réservés © 2025 African Korner

---

**Développé avec ❤️ pour African Korner - L'Afrique dans votre assiette**
