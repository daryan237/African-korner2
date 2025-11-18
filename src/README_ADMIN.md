# 🎯 COMMENT LE GESTIONNAIRE VOIT LES COMMANDES

## 📍 Accès au Tableau de Bord

### 🌐 URL pour accéder au panneau administrateur :

```
https://votre-site.vercel.app/admin
```

**Par exemple :**
- Si votre site est : `african-korner.vercel.app`
- Le gestionnaire va sur : `african-korner.vercel.app/admin`

### 🔗 Lien rapide depuis le site :
Le gestionnaire peut aussi cliquer sur **"🔐 Accès Gestionnaire"** tout en bas de la page d'accueil (dans le footer)

---

## 📊 CE QUE LE GESTIONNAIRE VOIT

### 1️⃣ **Tableau de bord en temps réel** avec 4 cartes statistiques :

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Total Commandes │   En attente    │    Terminées    │  Revenu Total   │
│       24        │        3        │       18        │    450.50€      │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### 2️⃣ **Barre de recherche et filtres** :
- 🔍 Recherche par numéro de commande, nom ou téléphone
- 🎯 Filtre par statut (En attente, Confirmées, En préparation, etc.)

### 3️⃣ **Liste détaillée de TOUTES les commandes** :

Chaque commande affiche :

```
┌──────────────────────────────────────────────────────────────┐
│ #AK123456                         [En attente] (orange)      │
│ 18 novembre 2025 à 14:30                                     │
│                                                               │
│ 📦 Client: Marie Dubois                                      │
│ 📱 Téléphone: +33 6 12 34 56 78                              │
│ 📍 Adresse: 45 Rue Victor Hugo, 59100 Roubaix               │
│ 🕐 Heure souhaitée: 15:30                                    │
│ 💶 Total: 32.50€                                             │
│                                                               │
│ Articles commandés:                                           │
│ • 2x Ndolé (32€)                                             │
│ • 1x Riz Jollof (14€)                                        │
│                                                               │
│ 💬 Instructions: Sans arachides SVP                          │
│                                                               │
│ [Boutons pour changer le statut] →→→→→                       │
└──────────────────────────────────────────────────────────────┘
```

---

## ⚡ WORKFLOW - Comment gérer une commande

### 📥 **1. Nouvelle commande arrive**
- Un client passe commande sur le site
- La commande apparaît **IMMÉDIATEMENT** dans le tableau de bord
- Statut : **"En attente"** (orange)
- Le compteur "En attente" augmente

### ✅ **2. Le gestionnaire confirme**
- Clique sur le bouton **"Confirmée"**
- Le statut passe à **"Confirmée"** (bleu)
- **Action recommandée :** Appeler le client pour confirmer

### 👨‍🍳 **3. Préparation de la commande**
- Le gestionnaire clique sur **"En préparation"**
- Statut : **"En préparation"** (violet)
- La cuisine commence à préparer les plats

### 🎉 **4. Commande prête**
- Quand tout est prêt, clic sur **"Prête"**
- Statut : **"Prête"** (vert)
- **Pour livraison :** Donner au livreur
- **Pour emporter :** Appeler le client
- **Sur place :** Servir le client

### ✔️ **5. Commande terminée**
- Après livraison/service, clic sur **"Terminée"**
- Statut : **"Terminée"** (gris)
- La commande est archivée mais reste visible

---

## 🎨 STATUTS DISPONIBLES

| Statut | Couleur | Signification | Action à faire |
|--------|---------|---------------|----------------|
| 🟠 **En attente** | Orange | Nouvelle commande | Confirmer ou annuler |
| 🔵 **Confirmée** | Bleu | Acceptée par le restaurant | Commencer la préparation |
| 🟣 **En préparation** | Violet | En cours de cuisine | Continuer la préparation |
| 🟢 **Prête** | Vert | Prête pour livraison/retrait | Livrer ou appeler client |
| ⚪ **Terminée** | Gris | Livrée/Servie | Rien, archivée |
| 🔴 **Annulée** | Rouge | Commande annulée | Rien |

---

## 🔍 FONCTIONNALITÉS DE RECHERCHE

### Rechercher une commande spécifique :
```
🔍 Recherche: AK123456
→ Trouve la commande #AK123456

🔍 Recherche: Dubois
→ Trouve toutes les commandes de M./Mme Dubois

🔍 Recherche: 0612345678
→ Trouve toutes les commandes avec ce numéro
```

### Filtrer par statut :
```
Filtre: "En attente"
→ Affiche uniquement les commandes qui attendent confirmation

Filtre: "En préparation"
→ Affiche uniquement les commandes en cours de préparation
```

---

## 📱 INFORMATIONS VISIBLES PAR COMMANDE

### 👤 Informations client :
- ✅ Nom complet
- ✅ Numéro de téléphone (pour appeler)
- ✅ Email (si fourni)
- ✅ Adresse complète (pour livraison)
- ✅ Code postal et ville

### 🛒 Détails de la commande :
- ✅ Liste complète des plats
- ✅ Quantité de chaque plat
- ✅ Prix unitaire et total
- ✅ Frais de livraison (si applicable)
- ✅ **TOTAL À PAYER**

### 🕐 Informations de timing :
- ✅ Date et heure de la commande
- ✅ Heure souhaitée par le client
- ✅ Mode : Livraison / À emporter / Sur place

### 💬 Informations spéciales :
- ✅ Instructions du client (allergies, demandes)
- ✅ Mode de paiement choisi
- ✅ Historique des changements de statut

---

## 🔄 ACTUALISATION AUTOMATIQUE

### Comment voir les nouvelles commandes ?

**Option 1 :** Bouton "Actualiser" (en haut à droite)
```
🔄 Actualiser
```
→ Recharge toutes les données instantanément

**Option 2 :** Rafraîchir la page (F5)

**Recommandation :** Actualisez toutes les 2-3 minutes pendant les heures de pointe

---

## 📊 STATISTIQUES EN TEMPS RÉEL

Le tableau de bord calcule automatiquement :

### Statistiques globales :
- **Total de commandes** depuis le début
- **Commandes en attente** (nécessitent action)
- **Commandes terminées** (complétées)
- **Revenu total** en euros

### Statistiques par type :
- Nombre de livraisons
- Nombre de commandes à emporter
- Nombre de commandes sur place

### Statistiques financières :
- Revenu total
- Valeur moyenne par commande

---

## 💡 CONSEILS PRATIQUES

### ⏰ Pendant les heures de pointe :
1. Gardez le tableau de bord ouvert en permanence
2. Actualisez toutes les 2-3 minutes
3. Priorisez les commandes avec heure précise
4. Confirmez rapidement (< 5 minutes)

### 📞 Communication avec les clients :
1. **Appelez pour confirmer** les commandes > 30€
2. **Prévenez en cas de retard** (> 15 min)
3. **Vérifiez les instructions** spéciales (allergies)

### 🍳 Organisation en cuisine :
1. Préparez d'abord les commandes urgentes
2. Groupez les plats similaires
3. Vérifiez les créneaux horaires souhaités

---

## 📱 ACCÈS DEPUIS TÉLÉPHONE / TABLETTE

✅ **Le tableau de bord fonctionne sur tous les appareils :**
- Ordinateur (recommandé)
- Tablette (excellent)
- Smartphone (possible mais plus petit)

**Sur smartphone :**
- Tournez en mode paysage pour plus de confort
- Tous les boutons sont tactiles
- Scrollez pour voir toutes les informations

---

## 🔐 SÉCURITÉ

### ⚠️ IMPORTANT - Gardez l'accès privé !

```
❌ NE PAS partager l'URL /admin publiquement
❌ NE PAS partager sur les réseaux sociaux
❌ NE PAS donner l'accès à n'importe qui
✅ Accès réservé au gérant/personnel autorisé
✅ Données clients confidentielles
```

---

## 🆘 QUE FAIRE EN CAS DE PROBLÈME ?

### Le tableau de bord ne charge pas :
1. Vérifiez votre connexion internet
2. Cliquez sur "Actualiser"
3. Rechargez la page (F5)
4. Essayez un autre navigateur

### Une commande n'apparaît pas :
1. Vérifiez le filtre (mettez "Tous les statuts")
2. Cliquez sur "Actualiser"
3. Utilisez la recherche par numéro de commande

### Le client dit avoir commandé mais rien n'apparaît :
1. Demandez le numéro de commande (AK123456)
2. Utilisez la recherche
3. Si vraiment rien, le client n'a peut-être pas validé

---

## 🎯 RÉSUMÉ RAPIDE

```
1. Le gestionnaire va sur : votre-site.com/admin
2. Il voit TOUTES les commandes en temps réel
3. Il peut chercher/filtrer les commandes
4. Il change le statut avec les boutons
5. Il voit les stats en direct
```

**C'est aussi simple que ça !** 🎉

---

## 📞 EXEMPLE CONCRET D'UTILISATION

### 14h30 - Nouvelle commande :
```
🔔 NOUVELLE COMMANDE REÇUE
#AK789012
Client: Sophie Martin
Tel: +33 6 98 76 54 32
Livraison: 25 Rue de Lille, Roubaix
Heure: 15h00
Plats:
- 1x Poisson Braisé (20€)
- 2x Plantains (6€)
Total: 29.50€
Instructions: Sonnez au 2ème étage
```

### Actions du gestionnaire :
```
✅ 14h31 → Clic sur "Confirmée"
📞 14h32 → Appel client: "Bonjour Mme Martin, 
           commande confirmée, livraison à 15h"
👨‍🍳 14h35 → Clic sur "En préparation"
🍽️ 14h50 → Plats prêts → Clic sur "Prête"
🚗 14h55 → Livreur part
✔️ 15h10 → Livré → Clic sur "Terminée"
```

**TERMINÉ ! Commande gérée avec succès** 🎉

---

## 📈 ÉVOLUTION FUTURE (POSSIBLE)

Fonctionnalités qu'on pourra ajouter plus tard :
- 📧 Notifications par email automatiques
- 📱 SMS de confirmation automatiques
- 🖨️ Impression des bons de commande
- 📊 Rapports mensuels
- 👥 Gestion multi-utilisateurs
- 🔔 Notifications sonores pour nouvelles commandes

---

**🎊 Voilà ! Le gestionnaire a TOUT ce qu'il faut pour gérer les commandes efficacement !**
