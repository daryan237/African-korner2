# 🚀 Guide de Déploiement - African Korner sur Vercel

## ✅ Problème Résolu !

Le problème "vite: command not found" est maintenant résolu. Tous les fichiers de configuration nécessaires ont été créés :

- ✅ `package.json` - Dépendances et scripts
- ✅ `vite.config.ts` - Configuration Vite
- ✅ `vercel.json` - Configuration Vercel
- ✅ `tsconfig.json` - Configuration TypeScript
- ✅ `index.html` - Point d'entrée HTML
- ✅ `main.tsx` - Point d'entrée React
- ✅ `.gitignore` - Fichiers à ignorer
- ✅ `README.md` - Documentation du projet

---

## 📝 Étapes de Déploiement

### 1️⃣ **Pousser les changements sur GitHub**

```bash
# Dans votre terminal, dans le dossier du projet

# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer un commit
git commit -m "Configuration Vercel + Vite"

# Ajouter votre repository GitHub
git remote add origin https://github.com/VOTRE_USERNAME/african-korner.git

# Pousser sur GitHub
git push -u origin main
```

**Note :** Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.

---

### 2️⃣ **Configuration sur Vercel**

1. **Allez sur** [vercel.com](https://vercel.com)
2. **Cliquez sur** "Add New Project"
3. **Importez** votre repository GitHub
4. **Vercel détecte automatiquement** la configuration Vite

**Settings détectés automatiquement :**
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

➡️ **NE MODIFIEZ PAS CES PARAMÈTRES**, ils sont maintenant corrects !

---

### 3️⃣ **Ajouter les Variables d'Environnement**

Dans Vercel, allez dans **Settings → Environment Variables** :

Ajoutez ces 4 variables :

```
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
SUPABASE_DB_URL=postgresql://...
```

**Comment trouver ces valeurs ?**
1. Allez sur [supabase.com](https://supabase.com)
2. Ouvrez votre projet African Korner
3. Allez dans **Settings → API**
4. Copiez les valeurs

---

### 4️⃣ **Déployer**

1. **Cliquez sur** "Deploy"
2. **Attendez** 2-3 minutes
3. ✅ **C'est en ligne !**

Votre site sera disponible sur :
```
https://african-korner.vercel.app
```

Ou votre domaine personnalisé si vous en avez configuré un.

---

## 🔍 Vérifications Post-Déploiement

### ✅ Vérifiez que tout fonctionne :

1. **Page d'accueil** : `https://votre-site.vercel.app`
   - Le site s'affiche correctement
   - Les animations fonctionnent
   - Le menu est visible

2. **Panier** : Ajoutez un produit
   - Le toast apparaît
   - Le compteur du panier augmente
   - La modal du panier s'ouvre

3. **Commande** : Testez une commande
   - Le tunnel de paiement fonctionne
   - Les 4 étapes sont accessibles
   - La commande est sauvegardée

4. **Admin** : `https://votre-site.vercel.app/admin`
   - Le tableau de bord s'affiche
   - Les commandes apparaissent
   - Les statistiques sont calculées

---

## 🆘 Si vous avez encore des erreurs

### ❌ Erreur "Module not found"

**Solution :**
```bash
# Assurez-vous que package.json est bien poussé sur GitHub
git add package.json
git commit -m "Update package.json"
git push
```

Puis redéployez sur Vercel.

---

### ❌ Erreur "Build failed"

**Solution :**
1. Vérifiez les logs dans Vercel
2. Assurez-vous que tous les fichiers sont sur GitHub
3. Vérifiez que `vercel.json` est bien présent

---

### ❌ Page blanche après déploiement

**Solution :**
1. Ouvrez la console du navigateur (F12)
2. Vérifiez les erreurs JavaScript
3. Assurez-vous que les variables d'environnement Supabase sont configurées

---

### ❌ L'admin ne fonctionne pas

**Solution :**
1. Vérifiez que `SUPABASE_URL` et `SUPABASE_ANON_KEY` sont bien configurés
2. Testez l'URL : `https://votre-site.vercel.app/admin`
3. Vérifiez la console pour des erreurs API

---

## 🎯 Commandes Git Utiles

```bash
# Voir le statut des fichiers
git status

# Voir l'historique des commits
git log --oneline

# Annuler les modifications locales
git checkout -- .

# Mettre à jour depuis GitHub
git pull

# Créer une nouvelle branche
git checkout -b nouvelle-fonctionnalite

# Revenir à la branche principale
git checkout main
```

---

## 🔄 Mise à Jour du Site

Pour déployer des changements :

```bash
# 1. Faites vos modifications dans le code

# 2. Ajoutez les fichiers modifiés
git add .

# 3. Créez un commit
git commit -m "Description de vos changements"

# 4. Poussez sur GitHub
git push

# 5. Vercel déploie AUTOMATIQUEMENT !
# Attendez 2-3 minutes, votre site est mis à jour
```

---

## 🌍 Configuration d'un Domaine Personnalisé

### Si vous avez un domaine (ex: africankorner.fr)

1. **Dans Vercel** → Settings → Domains
2. **Ajoutez votre domaine** : `africankorner.fr`
3. **Vercel vous donne** des enregistrements DNS à configurer
4. **Chez votre registrar** (OVH, Gandi, etc.), ajoutez :
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
5. **Attendez** 24-48h pour la propagation DNS

---

## 📊 Surveillance et Analytics

### Voir les statistiques de déploiement :

1. Allez dans l'onglet **"Deployments"** sur Vercel
2. Vous verrez :
   - ✅ Déploiements réussis
   - ⏱️ Temps de build
   - 📊 Taille du bundle
   - 🌍 Région de déploiement

### Activer Vercel Analytics (optionnel) :

1. Allez dans **Analytics** sur Vercel
2. Activez "Web Analytics"
3. Vous aurez accès à :
   - Nombre de visiteurs
   - Pages les plus vues
   - Performance du site
   - Origine géographique des visiteurs

---

## ✅ Checklist Finale

Avant de considérer le déploiement comme terminé :

- [ ] Le site est en ligne sur Vercel
- [ ] Toutes les pages fonctionnent (/, /admin, /track-order)
- [ ] Le panier fonctionne
- [ ] Le système de commande fonctionne
- [ ] Les variables Supabase sont configurées
- [ ] Le tableau de bord admin affiche les commandes
- [ ] Les animations fonctionnent
- [ ] Le site est responsive (mobile, tablette, desktop)
- [ ] Les images se chargent
- [ ] Le formulaire de contact fonctionne

---

## 🎉 Félicitations !

Votre site **African Korner** est maintenant en ligne et prêt à recevoir des commandes !

### Prochaines étapes recommandées :

1. ✅ Testez toutes les fonctionnalités
2. ✅ Formez le gestionnaire sur le panneau admin
3. ✅ Partagez l'URL avec vos clients
4. ✅ Configurez un domaine personnalisé (optionnel)
5. ✅ Ajoutez Google Analytics (optionnel)

---

**🍽️ Bon service avec African Korner !**
