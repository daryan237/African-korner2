# 📱 Guide du Gestionnaire - African Korner

## 🎯 Comment accéder au tableau de bord administrateur

### URL d'accès :
```
https://votre-site.vercel.app/admin
```

**Exemple :** Si votre site est `african-korner.vercel.app`, allez sur :
```
https://african-korner.vercel.app/admin
```

---

## 📊 Tableau de Bord - Vue d'ensemble

### Cartes de statistiques (en haut) :
1. **Total Commandes** - Nombre total de commandes reçues
2. **En attente** - Commandes qui nécessitent votre attention
3. **Terminées** - Commandes complétées
4. **Revenu Total** - Chiffre d'affaires total en euros

---

## 🔍 Rechercher et Filtrer les Commandes

### Barre de recherche :
- Tapez un **numéro de commande** (ex: AK123456)
- Tapez un **nom de client**
- Tapez un **numéro de téléphone**

### Filtre par statut :
Cliquez sur le menu déroulant pour filtrer par :
- **Tous les statuts** (par défaut)
- **En attente** - Nouvelles commandes
- **Confirmées** - Commandes acceptées
- **En préparation** - En cours de préparation
- **Prêtes** - Prêtes pour livraison/retrait
- **Terminées** - Commandes livrées
- **Annulées** - Commandes annulées

---

## 📋 Détails d'une Commande

Chaque carte de commande affiche :

### Informations client :
- 📦 **Nom du client**
- 📱 **Téléphone** (pour contacter le client)
- 📍 **Adresse** (pour les livraisons)
- 🕐 **Heure souhaitée** (timing de livraison/retrait)

### Détails de la commande :
- **Liste des plats** avec quantités
- **Prix de chaque plat**
- **Frais de livraison** (3.50€ pour les livraisons)
- **Total à payer**

### Informations spéciales :
- 💬 **Instructions** du client (allergies, demandes spéciales) en jaune

---

## ✅ Gérer le Statut des Commandes

### Workflow typique :

1. **Nouvelle commande arrive** → Statut : **En attente** (orange)
   - ✅ Action : Cliquez sur "Confirmée" pour accepter

2. **Commande confirmée** → Statut : **Confirmée** (bleu)
   - ✅ Action : Commencez la préparation, cliquez sur "En préparation"

3. **Cuisine en cours** → Statut : **En préparation** (violet)
   - ✅ Action : Quand c'est prêt, cliquez sur "Prête"

4. **Commande prête** → Statut : **Prête** (vert)
   - Pour livraison : Donnez au livreur
   - Pour emporter : Appelez le client
   - Pour sur place : Servez le client

5. **Client servi** → Statut : **Terminée** (gris)
   - ✅ Fin du processus

### Pour annuler une commande :
- Cliquez sur **"Annulée"** (rouge)
- À utiliser si client annule ou problème

---

## 🔔 Notifications Client (Recommandé)

**Important :** Appelez le client pour :
- ✅ Confirmer la commande (statut "Confirmée")
- ✅ Indiquer que c'est prêt (statut "Prête")
- ✅ En cas de retard ou problème

**Numéro du client affiché** sur chaque commande

---

## 📱 Exemple de Gestion - Commande Livraison

### 11h30 - Nouvelle commande arrive :
```
#AK123456
Client: Jean Dupont
Téléphone: +33 6 12 34 56 78
Adresse: 123 Rue de l'Épeule, 59100 Roubaix
Heure souhaitée: 12h30
Articles:
- 2x Ndolé (32€)
- 1x Jollof Rice (14€)
Total: 49.50€ (avec livraison)
```

### Actions :
1. **11h30** → Cliquez sur "Confirmée"
2. **11h35** → Appelez le client : "Bonjour M. Dupont, commande confirmée, livraison prévue à 12h30"
3. **11h40** → Cliquez sur "En préparation"
4. **12h15** → Commande terminée → Cliquez sur "Prête"
5. **12h15** → Donnez au livreur
6. **12h35** → Livreur revient → Cliquez sur "Terminée"

---

## 🔄 Actualiser les Commandes

En haut à droite, cliquez sur **"Actualiser"** pour :
- Voir les nouvelles commandes
- Rafraîchir les statistiques
- Mettre à jour la liste

**Conseil :** Actualisez toutes les 2-3 minutes pendant les heures de pointe

---

## 📊 Statistiques Utiles

Le tableau de bord calcule automatiquement :
- **Nombre de commandes** par type (livraison, emporter, sur place)
- **Revenu total** en temps réel
- **Valeur moyenne** par commande
- **Commandes en attente** (nécessitant action immédiate)

---

## 💡 Conseils de Gestion

### Heures de pointe (12h-14h et 19h-21h) :
- ✅ Vérifiez le tableau de bord toutes les 2 minutes
- ✅ Confirmez rapidement les commandes
- ✅ Priorisez les livraisons avec heure précise

### Préparation efficace :
- ✅ Groupez les plats similaires
- ✅ Préparez d'abord les commandes avec heure proche
- ✅ Vérifiez les instructions spéciales

### Communication client :
- ✅ Appelez toujours pour confirmer les grosses commandes
- ✅ Prévenez si retard > 15 minutes
- ✅ Notez les allergies et demandes spéciales

---

## 🆘 Résolution de Problèmes

### Le tableau de bord ne charge pas :
1. Vérifiez votre connexion internet
2. Cliquez sur "Actualiser"
3. Rechargez la page (F5)

### Une commande n'apparaît pas :
1. Cliquez sur "Tous les statuts" dans le filtre
2. Utilisez la recherche par numéro de commande
3. Cliquez sur "Actualiser"

### Erreur lors du changement de statut :
1. Vérifiez votre connexion
2. Réessayez dans 1 minute
3. Rechargez la page si le problème persiste

---

## 📞 Support Technique

Si vous rencontrez un problème technique :
1. Notez le numéro de commande concerné
2. Faites une capture d'écran
3. Contactez le support technique

---

## 🔐 Sécurité

**Important :**
- ⚠️ Ne partagez JAMAIS l'URL `/admin` publiquement
- ⚠️ Déconnectez-vous après utilisation sur ordinateur partagé
- ⚠️ Les données clients sont confidentielles

---

## 📱 Accès Mobile

Le tableau de bord fonctionne sur :
- ✅ Ordinateur (recommandé)
- ✅ Tablette
- ✅ Smartphone

**Sur mobile :**
- Tournez l'écran en mode paysage pour plus de confort
- Les boutons sont optimisés pour le tactile

---

## 🎯 Raccourcis Clavier (Ordinateur)

- **Ctrl + R** ou **F5** → Actualiser
- **Ctrl + F** → Rechercher dans la page

---

## ✨ Bonnes Pratiques

### En début de service :
1. ✅ Ouvrez le tableau de bord
2. ✅ Vérifiez les commandes en attente
3. ✅ Préparez-vous pour les commandes programmées

### Pendant le service :
1. ✅ Gardez le tableau de bord ouvert
2. ✅ Actualisez régulièrement
3. ✅ Changez les statuts en temps réel

### En fin de service :
1. ✅ Vérifiez que toutes les commandes sont "Terminées"
2. ✅ Consultez les statistiques du jour
3. ✅ Notez les revenus

---

**🎉 Félicitations ! Vous êtes prêt à gérer les commandes d'African Korner !**
