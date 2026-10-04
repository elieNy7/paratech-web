/*
 * ============================================================
 *  CONFIGURATION DU SITE PARATECH — le seul fichier à modifier
 * ============================================================
 *  Tous les logiciels sont gratuits. Le site est financé par la
 *  publicité (Google AdSense), réglée plus bas dans « ads ».
 */
window.PARATECH_CONFIG = {
  contact: {
    // Numéro WhatsApp au format international, chiffres seulement
    whatsapp: "243812436993",
    email: "elieitnyembo@gmail.com",
    phoneDisplay: "+243 812 436 993",
    address: "265 Av. Kabambare, Q. La Voix du Peuple, Lingwala — Kinshasa, RDC",
    facebook: "",
    youtube: "",
    linkedin: ""
  },

  // Liens de téléchargement. Un lien vide ("") affiche « Bientôt ».
  downloads: {
    projecton: "https://github.com/elieNy7/paratech-web/releases/download/project-on-v2.7.2/ProjectOn_2.7.2_Setup.exe",
    pgraphics: "https://github.com/elieNy7/paratech-web/releases/download/pgraphics-v0.14.1/Pgraphics_0.14.1_Setup.exe",
    paudio: "https://github.com/elieNy7/paratech-web/releases/download/paudio-v0.1.0/pAudio_0.1.0_Setup.exe",
    meditationWindows: "https://github.com/elieNy7/paratech-web/releases/download/meditation-v3.5.3/Meditation_Pro_Setup_v3.5.3.exe",
    meditationAndroid: "https://play.google.com/store/apps/details?id=com.paratech.meditation"
  },

  /*
   * PUBLICITÉ — Google AdSense
   * 1. Créez un compte sur https://adsense.google.com avec le domaine du site.
   * 2. Collez votre identifiant éditeur dans « client » (ex. "ca-pub-1234567890123456"),
   *    et le même numéro dans le fichier ads.txt à la racine du site.
   * 3. Facultatif : créez des blocs d'annonces et collez leurs numéros dans « slots ».
   *    Sans numéro de bloc, les « annonces automatiques » d'AdSense placent les pubs.
   * Tant que « client » est vide, aucune publicité ni aucun emplacement n'apparaît.
   * Pour voir les emplacements avant l'activation : ajoutez ?ads=apercu à l'adresse.
   */
  ads: {
    client: "",
    slots: {
      home1: "",
      home2: "",
      product: ""
    }
  },

  legal: {
    company: "STE PARADOXE TECHNOLOGIE SARL",
    rccm: "KNG/RCCM/24-A-03192"
  }
};
