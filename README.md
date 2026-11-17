# Site PARATECH

Site vitrine statique (HTML/CSS/JS, sans installation) qui présente les logiciels PARATECH,
tous gratuits : Project-On et Pgraphics,
plus les services de l'entreprise. Français par défaut, anglais avec le bouton FR/EN.
Le site est financé par la publicité (Google AdSense).

## Pages

| Page | Contenu |
|---|---|
| `index.html` | Accueil : logiciels, régie, pourquoi PARATECH, étapes, services, contact |
| `project-on.html` | Project-On : fonctions, captures, fiche technique, FAQ |
| `pgraphics.html` | Pgraphics (version native 1.0.0) : fonctions, Régie, console audio, Édition, fiche technique, FAQ |
| `confidentialite.html` | Politique de confidentialité (AdSense, et Pgraphics avec le compte Google : section `#pgraphics-google`) |
| `conditions.html` | Conditions d'utilisation (dont YouTube) |

Les captures sont dans `assets/img/<logiciel>/` (Pgraphics : `pg-*-030.jpg`, prises sur la version 0.3.0).
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

**Domaine : https://paratechsarl.com** (acheté chez Cloudflare, branché le 2026-11-16).
- Le fichier `CNAME` à la racine contient `paratechsarl.com` : ne pas le supprimer.
- DNS chez Cloudflare (paratechsarl.com ▸ DNS ▸ Records) : 4 enregistrements `A` `@` vers
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`,
  et un `CNAME` `www` vers `elieny7.github.io`, tous en **DNS only** (nuage gris) : GitHub
  fournit lui-même le certificat HTTPS. Les enregistrements `MX`/`TXT` servent au routage
  des e-mails de Cloudflare.
- L'ancienne adresse https://elieny7.github.io/paratech-web/ renvoie vers le domaine.

## Référencement (Google)

- Le site est déclaré dans Google Search Console (propriété de domaine `paratechsarl.com`,
  vérifiée par un enregistrement `TXT` `google-site-verification` chez Cloudflare : ne pas
  le supprimer). Le plan du site `sitemap.xml` y est envoyé.
- Chaque page a son titre et sa description (≈ 60 et 155 caractères, ce que Google affiche),
  une adresse canonique `https://paratechsarl.com/…` et des données structurées
  (`<script type="application/ld+json">`) : entreprise sur l'accueil, logiciel sur les
  pages produit.
- **À chaque nouvelle version** : changer aussi `softwareVersion` dans les données
  structurées de `pgraphics.html` / `project-on.html`, et la date `lastmod` de la page
  dans `sitemap.xml`. Pour une nouvelle page : l'ajouter à `sitemap.xml`, avec sa
  balise `canonical`.
- Sans choix du visiteur (bouton FR/EN ou `?lang=en`), le site s'affiche en français :
  c'est la version que Google indexe.

## Icônes

Icônes au trait : [Lucide](https://lucide.dev) (licence ISC). Logo WhatsApp : [Simple Icons](https://simpleicons.org) (CC0).
