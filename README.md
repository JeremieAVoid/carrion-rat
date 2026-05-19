# 🐀 Carrion Rat

Un jeu de plateforme arcade où tu incarnes un rat en fuite à travers des mondes de plus en plus difficiles. Survive le plus longtemps possible, évite les obstacles et progresse à travers 9 niveaux de croissante difficulté.

---

## 🎮 À propos du jeu

**Carrion Rat** est un jeu de type Flappy Bird/Dash où :
- Tu contrôles un rat avec une seule touche (ESPACE ou clic souris)
- Le rat avance automatiquement, tu ne contrôles que sa hauteur
- Évite les obstacles en haut et en bas
- Atteins la fin du niveau avant que le timer ne s'écoule
- Débloque les niveaux en progressant

### 🎯 Objectif
Traverse 9 niveaux de difficulté croissante en esquivant les pièges pour atteindre la fin de chaque niveau.

### ⏱️ Mécanique
- **Contrôle unique** : ESPACE (ou clic) pour sauter
- **Physique** : Gravité constante, saut avec inertie
- **Timer** : Chaque niveau a un temps limité à accomplir
- **Score** : Chaque obstacle évité = +1 point

---

## 🌍 Les niveaux

Le jeu est divisé en **3 chapitres** avec **3 niveaux chacun** :

### ✨ Heaven (Niveaux -1, -2, -3) - Difficulté 1 à 5
Des niveaux d'introduction dans un monde paradisiaque avec des piliers dorés.
- **Heaven 3** : Difficulté 1
- **Heaven 2** : Difficulté 3
- **Heaven 1** : Difficulté 5

### 👹 Classic (Niveaux 1, 2, 3) - Difficulté 6 à 8
Le jeu classique avec des obstacles horrifiques. **Point de départ par défaut.**
- **Classic 1** : Difficulté 6 (Première partie officielle)
- **Classic 2** : Difficulté 7
- **Classic 3** : Difficulté 8

### 🔥 Hell (Niveaux 4, 5, 6) - Difficulté 10 à 15
Les niveaux les plus difficiles pour les joueurs expérimentés.
- **Hell 1** : Difficulté 10
- **Hell 2** : Difficulté 12
- **Hell 3** : Difficulté 15 (Défi ultime)

---

## 🚀 Installation

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un serveur local (pour éviter les problèmes CORS)

### Étapes

1. **Clone ou télécharge le projet**
   ```bash
   git clone <url-du-repo>
   cd carrion-rat
   ```

2. **Lance un serveur local**
   
   Avec Python 3 :
   ```bash
   python -m http.server 8000
   ```
   
   Avec Python 2 :
   ```bash
   python -m SimpleHTTPServer 8000
   ```
   
   Avec Node.js (http-server) :
   ```bash
   npx http-server
   ```

3. **Ouvre le jeu**
   - Va à `http://localhost:8000` dans ton navigateur
   - Tu arriveras sur la page d'accueil

---

## 🕹️ Comment jouer

### Menu principal
- **Nouvelle Partie** : Lance une partie depuis Classic 1 (niveau par défaut)
- **Reprendre** : Reprend ta dernière partie sauvegardée
- **Choix du Niveau** : Sélectionne un niveau spécifique (si débloqué)

### En jeu
| Action | Contrôle |
|--------|----------|
| Sauter | **ESPACE** ou **Clic souris** |
| Pause | **P**  ou **Clic bouton** |
| Quitter | **M** (retour au menu) |
| Recommencer | **ESPACE** (après un game over) |

### Progression
- Complète un niveau → Le suivant se débloque
- Ta progression est **sauvegardée automatiquement**
- Chaque niveau conserve ton meilleur score

---

## 💾 Sauvegarde

Les données sont stockées dans `localStorage` du navigateur :

```javascript
{
    "currentLevel": 4,              // Dernier niveau atteint (ID)
    "unlockedLevel": [4, 5, 6],     // Niveaux débloqués
    "bestScore": 1250               // Meilleur score global
}
```

### Réinitialiser la progression
Ouvre la console du navigateur (F12) et exécute :
```javascript
supprimer();  // Réinitialise toutes les données
```
---

## 🔧 Technologies utilisées

- **HTML** : Structure
- **CSS** : Styles et animations
- **Canvas 2D** : Rendu du jeu
- **JavaScript** : Logique du jeu
- **localStorage** : Sauvegarde locale

---

## 🐛 Dépannage

### "Image introuvable" dans la console
- Vérifie que tous les fichiers images existent dans `images/`
- Vérifie les chemins dans `game.js`

### Le jeu ne se sauvegarde pas
- `localStorage` doit être activé dans le navigateur
- Certains navigateurs en mode incognito désactivent `localStorage`

### Le son ne fonctionne pas
- Les fichiers audio doivent être dans `music/`
- Certains navigateurs bloquent la lecture auto avec son

## 🎵 Crédits

**Créé et produit par :**
- Jéremie ADAM
- Romain GUIBERT
- Paul-Elie KOUAKOU

---