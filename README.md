# Site PARATECH

Site vitrine statique (HTML/CSS/JS, sans installation) qui présente les logiciels PARATECH,
tous gratuits : Project-On, Pgraphics, pAudio (bientôt) et Meditation (Windows et Android),
plus les services de l'entreprise. Français par défaut, anglais avec le bouton FR/EN.
Le site est financé par la publicité (Google AdSense).

## Pages

| Page | Contenu |
|---|---|
| `index.html` | Accueil : logiciels, régie, pourquoi PARATECH, étapes, services, contact |
| `project-on.html` | Project-On : fonctions, captures, fiche technique, FAQ |
| `pgraphics.html` | Pgraphics : fonctions, scénarios, animation, page Régie, fiche technique, FAQ |
| `paudio.html` | pAudio : fonctions, cas d'usage, avancement, fiche technique, FAQ |
| `meditation.html` | Meditation Windows et Android : fonctions, captures, fiche technique, FAQ |
| `confidentialite.html` | Politique de confidentialité (obligatoire pour AdSense) |

Les captures sont dans `assets/img/<logiciel>/` : `pc-*.jpg` pour Windows, `android-*.jpg` pour le téléphone.
Sur les pages produit, l'anglais est écrit à côté du français dans l'attribut `data-en`.

## Modifier le contenu

| Pour changer… | Fichier |
|---|---|
| WhatsApp, e-mail, adresse, réseaux sociaux | `assets/js/config.js` → `contact` |
| Liens de téléchargement (vide = « Bientôt disponible ») | `assets/js/config.js` → `downloads` |
| Publicité AdSense | `assets/js/config.js` → `ads`, et le fichier `ads.txt` |
| Textes français | les fichiers `.html` |
| Textes anglais de l'accueil | `assets/js/i18n.js` (même clé `data-i18n`) |

## Activer la publicité (après l'achat du domaine)

1. Brancher le domaine (voir plus bas), attendre que le site s'ouvre à cette adresse.
2. Créer un compte sur https://adsense.google.com et y ajouter le domaine.
3. Coller l'identifiant éditeur (`ca-pub-…`) dans `config.js` → `ads.client`.
4. Remplacer le contenu de `ads.txt` par la ligne donnée par AdSense.
5. Dans AdSense, activer « Confidentialité et messages » (bannière de consentement pour l'Europe).
6. Facultatif : créer des blocs d'annonces et coller leurs numéros dans `ads.slots`
   (`home1`, `home2` sur l'accueil, `product` sur les pages produit). Sans bloc, les
   annonces automatiques d'AdSense choisissent les emplacements.

Pour voir les emplacements avant l'activation : ajouter `?ads=apercu` à l'adresse.

## Tester en local

```bash
py -m http.server 8765 --directory PARATECH-Site
```

Puis ouvrir http://localhost:8765

## Mise en ligne (GitHub Pages)

Le site est publié depuis le dépôt `elieNy7/paratech-web` (branche `main`, dossier racine).
Chaque `git push` met le site à jour en une ou deux minutes.

**Brancher le domaine** (ex. `paratech.africa`) :
1. Créer un fichier `CNAME` à la racine contenant seulement le domaine, puis pousser.
2. Chez le vendeur du domaine, ajouter 4 enregistrements `A` vers
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`,
   et un `CNAME` `www` vers `elieny7.github.io`.
3. Dans GitHub → Settings → Pages, cocher « Enforce HTTPS » quand c'est proposé.

## Icônes

Icônes au trait : [Lucide](https://lucide.dev) (licence ISC). Logo WhatsApp : [Simple Icons](https://simpleicons.org) (CC0).
