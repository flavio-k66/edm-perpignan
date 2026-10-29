// Catalogue du showroom (showroom.html et categorie.html).
// Ajouter un produit : copier un bloc dans "produits", avec cat = id de la catégorie,
// une photo dans assets/img/catalogue/<cat>/ et la fiche PDF dans assets/fiches/<cat>/.
// "prix" n'est affiché que s'il est renseigné (utilisé pour le déstockage).
window.EDM_CATALOGUE = {
 "categories": [
  {
   "id": "cuisson",
   "nom": "Cuisson",
   "intro": "Fours mixtes, fourneaux, induction, planchas, friteuses et sauteuses pour la cuisine de restaurant."
  },
  {
   "id": "froid",
   "nom": "Froid",
   "intro": "Armoires et tables réfrigérées, cellules de refroidissement, vitrines à boissons et machines à glaçons."
  },
  {
   "id": "laverie",
   "nom": "Laverie",
   "intro": "Lave-vaisselle, lave-verres et blanchisserie professionnelle."
  },
  {
   "id": "preparation",
   "nom": "Préparation",
   "intro": "Batteurs, coupe-légumes, cutters, sous-vide et balances pour gagner du temps en cuisine."
  },
  {
   "id": "destockage",
   "nom": "Déstockage",
   "intro": "Matériel en stock, prix affichés, dans la limite des quantités disponibles."
  }
 ],
 "produits": [
  {
   "cat": "cuisson",
   "slug": "four-mixte-rational-icombi-classic-10-1-1",
   "nom": "Four mixte Rational iCombi Classic 10-1/1 E/G",
   "marque": "Rational",
   "reference": "iCombi Classic 10-1/1 E/G",
   "description": "Four mixte qui associe vapeur et air pulsé, séparément ou ensemble, de 30 à 300 °C. Ses 10 niveaux GN 1/1 servent aux grillades, au braisage et à la cuisson au four, avec plaques boulangères 400 × 600 mm en option. Nettoyage automatique intégré.",
   "points": [
    "10 niveaux GN 1/1",
    "Électrique ou gaz",
    "L 850 × P 842 mm"
   ],
   "image": "assets/img/catalogue/cuisson/four-mixte-rational-icombi-classic-10-1-1.jpg",
   "pdf": "assets/fiches/cuisson/four-mixte-rational-icombi-classic-10-1-1.pdf"
  },
  {
   "cat": "cuisson",
   "slug": "sauteuse-rational-ivario-2-xs",
   "nom": "Sauteuse multifonction Rational iVario 2-XS",
   "marque": "Rational",
   "reference": "iVario 2-XS",
   "description": "Appareil de cuisson à deux cuves indépendantes pour pocher, sauter et frire. Chaque cuve offre 17 litres utiles et 13 dm² de surface de rissolage, avec des assistants qui adaptent la cuisson. Compact, il remplace plusieurs appareils traditionnels.",
   "points": [
    "2 cuves de 17 L",
    "Électrique 400 V, 14 kW",
    "L 1100 × P 756 mm"
   ],
   "image": "assets/img/catalogue/cuisson/sauteuse-rational-ivario-2-xs.jpg",
   "pdf": "assets/fiches/cuisson/sauteuse-rational-ivario-2-xs.pdf"
  },
  {
   "cat": "cuisson",
   "slug": "fourneau-gaz-rosinox-041-g-700",
   "nom": "Fourneau gaz Rosinox 041 G - 700, 4 feux sur four GN 2/1",
   "marque": "Rosinox",
   "reference": "041 G - 700 (RX39159971)",
   "description": "Fourneau gaz avec 4 feux vifs sur un four gaz GN 2/1 réglable de 50 à 300 °C. Plan de cuisson en inox aux angles arrondis et grilles en fonte émaillée, faciles à nettoyer. Un poste de cuisson complet pour la cuisine de restaurant.",
   "points": [
    "4 feux + four GN 2/1",
    "Gaz, 32 kW au total",
    "L 800 × P 730 × H 900 mm"
   ],
   "image": "assets/img/catalogue/cuisson/fourneau-gaz-rosinox-041-g-700.jpg",
   "pdf": "assets/fiches/cuisson/fourneau-gaz-rosinox-041-g-700.pdf"
  },
  {
   "cat": "cuisson",
   "slug": "friteuse-electrique-tecnoinox-frs35e7",
   "nom": "Friteuse électrique Tecnoinox Tecno70 FRS35E7, 14 L",
   "marque": "Tecnoinox",
   "reference": "FRS35E7 (616035)",
   "description": "Friteuse électrique sur placard fermé, avec une cuve de 14 litres et des résistances basculantes qui facilitent le nettoyage. Température réglable de 100 à 190 °C. Paniers, couvercle et bac de récupération de l'huile sont fournis.",
   "points": [
    "1 cuve de 14 L",
    "Électrique 400 V, 10,8 kW",
    "L 35 × P 70 cm"
   ],
   "image": "assets/img/catalogue/cuisson/friteuse-electrique-tecnoinox-frs35e7.jpg",
   "pdf": "assets/fiches/cuisson/friteuse-electrique-tecnoinox-frs35e7.pdf"
  },
  {
   "cat": "cuisson",
   "slug": "fourneau-induction-bonnet-advancia-b2a9fi58pe",
   "nom": "Fourneau induction Bonnet Advancia B2A9FI58PE, 4 foyers",
   "marque": "Bonnet",
   "reference": "B2A9FI58PE",
   "description": "Bloc de cuisson à induction avec 4 foyers de 5 kW sous une plaque vitrocéramique. Chaque zone détecte la casserole et se règle de 0 à 100 %, pour une chauffe très rapide. Construction tout inox sur baie libre, pensée pour un usage intensif.",
   "points": [
    "4 foyers induction de 5 kW",
    "Triphasé 400 V, 20 kW",
    "L 800 × P 920 mm"
   ],
   "image": "assets/img/catalogue/cuisson/fourneau-induction-bonnet-advancia-b2a9fi58pe.jpg",
   "pdf": "assets/fiches/cuisson/fourneau-induction-bonnet-advancia-b2a9fi58pe.pdf"
  },
  {
   "cat": "cuisson",
   "slug": "plancha-chromee-angelo-po-1s1ft4e",
   "nom": "Plancha électrique chromée Angelo Po 1S1FT4E",
   "marque": "Angelo Po",
   "reference": "1S1FT4E",
   "description": "Plancha électrique à plaque lisse chromée de 730 × 530 mm, sur placard ouvert. Deux zones de cuisson indépendantes réglables de 70 à 260 °C, et un programme de lavage qui nettoie la plaque avec peu d'eau. Pratique pour saisir à la minute.",
   "points": [
    "Plaque chromée 730 × 530 mm",
    "Électrique, 2 zones de 5,1 kW",
    "L 80 × P 72 × H 90 cm"
   ],
   "image": "assets/img/catalogue/cuisson/plancha-chromee-angelo-po-1s1ft4e.jpg",
   "pdf": "assets/fiches/cuisson/plancha-chromee-angelo-po-1s1ft4e.pdf"
  },
  {
   "cat": "froid",
   "slug": "armoire-refrigeree-infrico-agb701",
   "nom": "Armoire réfrigérée Infrico AGB701",
   "marque": "Infrico",
   "reference": "AGB701",
   "description": "Armoire réfrigérée inox GN 2/1 à une porte, de -2 °C à +8 °C, avec 560 litres de capacité. Idéale en cuisine pour stocker viandes, préparations et produits frais, avec intérieur aux angles arrondis facile à nettoyer, éclairage LED et serrure.",
   "points": [
    "560 litres, de -2 °C à +8 °C",
    "Format GN 2/1, 3 étagères",
    "687 x 794 x 2130 mm"
   ],
   "image": "assets/img/catalogue/froid/armoire-refrigeree-infrico-agb701.jpg",
   "pdf": "assets/fiches/froid/armoire-refrigeree-infrico-agb701.pdf"
  },
  {
   "cat": "froid",
   "slug": "table-refrigeree-fagor-ccp-3g",
   "nom": "Table réfrigérée Fagor CCP-3G",
   "marque": "Fagor Professional",
   "reference": "CCP-3G",
   "description": "Table réfrigérée Gastronorm de la gamme Concept 700, à 3 portes, en inox AISI 304. Elle offre un plan de travail avec dosseret de 10 cm et garde vos produits entre 0 °C et +8 °C, juste sous la main pendant le service.",
   "points": [
    "3 portes GN 1/1, de 0 °C à +8 °C",
    "214 litres utiles réfrigérés",
    "1792 x 700 x 850 mm"
   ],
   "image": "assets/img/catalogue/froid/table-refrigeree-fagor-ccp-3g.jpg",
   "pdf": "assets/fiches/froid/table-refrigeree-fagor-ccp-3g.pdf"
  },
  {
   "cat": "froid",
   "slug": "refroidisseur-bouteilles-infrico-erc130ph",
   "nom": "Refroidisseur de bouteilles Infrico ERC130PH",
   "marque": "Infrico",
   "reference": "ERC130PH",
   "description": "Grand refroidisseur de bouteilles à 2 portes, de +4 °C à +8 °C, avec 1310 litres de capacité. Parfait pour un bar, un snack ou une épicerie qui veut garder beaucoup de boissons au frais, avec éclairage LED et 4 étagères.",
   "points": [
    "1310 litres, de +4 °C à +8 °C",
    "2 portes, 4 étagères, éclairage LED",
    "1384 x 842 x 2003 mm"
   ],
   "image": "assets/img/catalogue/froid/refroidisseur-bouteilles-infrico-erc130ph.jpg",
   "pdf": "assets/fiches/froid/refroidisseur-bouteilles-infrico-erc130ph.pdf"
  },
  {
   "cat": "froid",
   "slug": "machine-a-glacons-hoshizaki-im-45pe",
   "nom": "Machine à glaçons Hoshizaki IM-45PE",
   "marque": "Hoshizaki",
   "reference": "IM-45PE",
   "description": "Machine à glaçons cube autonome qui produit jusqu'à 47 kg de glaçons par 24 heures, avec une réserve de 18 kg. Ses glaçons compacts et durs conviennent bien aux bars et restaurants, et chaque cycle se fait avec une eau renouvelée.",
   "points": [
    "Jusqu'à 47 kg de glaçons par 24 h",
    "Stockage de 18 kg",
    "Glaçons cube standard (L)"
   ],
   "image": "assets/img/catalogue/froid/machine-a-glacons-hoshizaki-im-45pe.jpg",
   "pdf": "assets/fiches/froid/machine-a-glacons-hoshizaki-im-45pe.pdf"
  },
  {
   "cat": "froid",
   "slug": "cellule-refroidissement-sagi-jf51h",
   "nom": "Cellule de refroidissement rapide SAGI JF51H",
   "marque": "SAGI",
   "reference": "JF51H",
   "description": "Cellule mixte de refroidissement rapide et de surgélation en inox, 5 niveaux GN 1/1, conçue pour se placer sous un four. Elle refroidit 15 kg de +90 °C à +3 °C à cœur en 90 minutes, idéale en restauration, pâtisserie et glacerie.",
   "points": [
    "15 kg de +90 °C à +3 °C en 90 min",
    "7 kg de +90 °C à -18 °C en 240 min",
    "5 bacs GN 1/1, sonde à cœur"
   ],
   "image": "assets/img/catalogue/froid/cellule-refroidissement-sagi-jf51h.jpg",
   "pdf": "assets/fiches/froid/cellule-refroidissement-sagi-jf51h.pdf"
  },
  {
   "cat": "froid",
   "slug": "refrigerateur-sous-comptoir-infrico-msg2000",
   "nom": "Réfrigérateur sous comptoir Infrico MSG2000",
   "marque": "Infrico",
   "reference": "MSG2000",
   "description": "Réfrigérateur bas en inox AISI 304, de -2 °C à +8 °C, d'une hauteur de 650 mm. Il se glisse sous un plan de travail ou un équipement de cuisson pour garder vos produits frais au plus près du poste, au format GN 1/1.",
   "points": [
    "310 litres, de -2 °C à +8 °C",
    "Format GN 1/1",
    "2000 x 700 x 650 mm"
   ],
   "image": "assets/img/catalogue/froid/refrigerateur-sous-comptoir-infrico-msg2000.jpg",
   "pdf": "assets/fiches/froid/refrigerateur-sous-comptoir-infrico-msg2000.pdf"
  },
  {
   "cat": "froid",
   "slug": "armoire-refrigeree-sagi-ne70k",
   "nom": "Armoire réfrigérée SAGI NE70K",
   "marque": "SAGI",
   "reference": "NE70K",
   "description": "Armoire réfrigérée positive GN 2/1 à une porte, de la série Nex-to Plus, entièrement en inox AISI 304. Avec 455 litres utiles et 20 niveaux, elle range beaucoup en cuisine. Serrure et éclairage de série, classe énergétique A.",
   "points": [
    "455 litres utiles, de -2 °C à +8 °C",
    "GN 2/1, 20 niveaux",
    "Classe énergétique A"
   ],
   "image": "assets/img/catalogue/froid/armoire-refrigeree-sagi-ne70k.jpg",
   "pdf": "assets/fiches/froid/armoire-refrigeree-sagi-ne70k.pdf"
  },
  {
   "cat": "laverie",
   "slug": "lave-vaisselle-frontal-ecomax-f504-10b",
   "nom": "Lave-vaisselle frontal Ecomax F504-10B / F504S-10B",
   "marque": "Ecomax by Hobart",
   "reference": "F504-10B & F504S-10B",
   "description": "Lave-vaisselle frontal compact pour la vaisselle du quotidien en restaurant ou en cuisine collective. Il traite jusqu'à 60 casiers de 500 x 500 mm par heure, avec des cycles de 60 ou 150 secondes. Le modèle F504S-10B intègre en plus un adoucisseur d'eau.",
   "points": [
    "Jusqu'à 60 casiers par heure",
    "Hauteur de passage 360 mm",
    "2,3 litres d'eau par cycle"
   ],
   "image": "assets/img/catalogue/laverie/lave-vaisselle-frontal-ecomax-f504-10b.jpg",
   "pdf": "assets/fiches/laverie/lave-vaisselle-frontal-ecomax-f504-10b.pdf"
  },
  {
   "cat": "laverie",
   "slug": "lave-vaisselle-capot-ecomax-h604",
   "nom": "Lave-vaisselle à capot Ecomax H604",
   "marque": "Ecomax by Hobart",
   "reference": "H604",
   "description": "Lave-vaisselle à capot pensé pour la restauration et l'hôtellerie, à associer à des tables de lavage. Il traite jusqu'à 48 casiers par heure avec 3 cycles au choix (75, 150 ou 180 s), et sa hauteur de passage de 440 mm accueille aussi plateaux et casseroles.",
   "points": [
    "Jusqu'à 48 casiers par heure",
    "Hauteur de passage 440 mm",
    "Capot fermé, économe en énergie"
   ],
   "image": "assets/img/catalogue/laverie/lave-vaisselle-capot-ecomax-h604.jpg",
   "pdf": "assets/fiches/laverie/lave-vaisselle-capot-ecomax-h604.pdf"
  },
  {
   "cat": "laverie",
   "slug": "lave-verres-smeg-spg405",
   "nom": "Lave-verres Smeg SPG405",
   "marque": "Smeg",
   "reference": "SPG405",
   "description": "Lave-verres de la série Ecoline, idéal pour les bars et cafés. Il accepte des paniers de 400 x 400 mm, propose 3 programmes automatiques et 1 programme entièrement paramétrable, et lave jusqu'à 40 paniers par heure.",
   "points": [
    "Jusqu'à 40 paniers par heure",
    "Paniers 400 x 400 mm",
    "Filtration en 4 étapes"
   ],
   "image": "assets/img/catalogue/laverie/lave-verres-smeg-spg405.jpg",
   "pdf": "assets/fiches/laverie/lave-verres-smeg-spg405.pdf"
  },
  {
   "cat": "laverie",
   "slug": "lave-vaisselle-smeg-spd500",
   "nom": "Lave-vaisselle sous comptoir Smeg SPD500",
   "marque": "Smeg",
   "reference": "SPD500",
   "description": "Lave-vaisselle sous comptoir de la série Ecoline, pour assiettes, verres, couverts et bacs GN 1/1. Avec ses paniers de 500 x 500 mm, il traite jusqu'à 40 paniers ou 720 assiettes par heure, et sa pompe de vidange est fournie de série.",
   "points": [
    "Jusqu'à 720 assiettes par heure",
    "Paniers 500 x 500 mm",
    "3,2 litres d'eau par cycle"
   ],
   "image": "assets/img/catalogue/laverie/lave-vaisselle-smeg-spd500.jpg",
   "pdf": "assets/fiches/laverie/lave-vaisselle-smeg-spd500.pdf"
  },
  {
   "cat": "laverie",
   "slug": "laveuse-seche-linge-primus-sp10-sd10",
   "nom": "Laveuse-essoreuse Primus SP10 et sèche-linge Primus SD10",
   "marque": "Primus",
   "reference": "SP10 / SD10",
   "description": "Un duo de blanchisserie professionnelle de 10 kg chacun : une laveuse-essoreuse et un sèche-linge, pour traiter le linge sur place. La laveuse essore à 1200 tr/min avec 6 programmes, le sèche-linge propose 4 programmes en chauffage gaz ou électrique.",
   "points": [
    "Capacité 10 kg",
    "Essorage 1200 tr/min (facteur G 440)",
    "Sèche-linge gaz ou électrique"
   ],
   "image": "assets/img/catalogue/laverie/laveuse-seche-linge-primus-sp10-sd10.jpg",
   "pdf": "assets/fiches/laverie/laveuse-seche-linge-primus-sp10-sd10.pdf"
  },
  {
   "cat": "preparation",
   "slug": "batteur-melangeur-robot-coupe-rm8",
   "nom": "Batteur mélangeur Robot Coupe RM8",
   "marque": "Robot Coupe",
   "reference": "RM8 (réf. 26220D)",
   "description": "Batteur mélangeur de table pour tous vos fouettages, mélanges et pétrissages. Sa cuve inox de 7,6 litres monte jusqu'à 16 blancs d'oeufs et pétrit jusqu'à 4 kg de pâte à pain. Un allié précieux en pâtisserie, boulangerie ou restaurant.",
   "points": [
    "Cuve inox 7,6 L avec poignée",
    "700 W, de 60 à 600 tr/min",
    "3 outils inox : fouet, palette, spirale"
   ],
   "image": "assets/img/catalogue/preparation/batteur-melangeur-robot-coupe-rm8.jpg",
   "pdf": "assets/fiches/preparation/batteur-melangeur-robot-coupe-rm8.pdf"
  },
  {
   "cat": "preparation",
   "slug": "coupe-frites-sammic-cf-5",
   "nom": "Coupe-frites Sammic CF-5 (8 x 8 mm)",
   "marque": "Sammic",
   "reference": "CF-5 (réf. 1020060)",
   "description": "Coupe-frites manuel à levier pour des frites nettes et régulières, sans déchirures ni déchets. Il produit de 100 à 150 kg par heure et sa grille-presse interchangeable permet des frites de 8, 10 ou 12 mm. Idéal pour restaurants et collectivités.",
   "points": [
    "100 à 150 kg par heure",
    "Corps en alliage inoxydable, 4 kg",
    "Homologué NSF"
   ],
   "image": "assets/img/catalogue/preparation/coupe-frites-sammic-cf-5.jpg",
   "pdf": "assets/fiches/preparation/coupe-frites-sammic-cf-5.pdf"
  },
  {
   "cat": "preparation",
   "slug": "balance-plateforme-l2g-tsx60",
   "nom": "Balance plateforme L2G TSX60",
   "marque": "L2G",
   "reference": "TSX60",
   "description": "Balance plateforme de 60 kg, précise à 10 grammes, pour peser livraisons, gros volumes et préparations. Plateau inox de 400 x 300 mm, colonne inox et indicateur LED inclinable, avec batterie interne rechargeable.",
   "points": [
    "Portée 60 kg, précision 10 g",
    "Plateau inox 304 IP65, 400 x 300 mm",
    "Batterie interne rechargeable"
   ],
   "image": "assets/img/catalogue/preparation/balance-plateforme-l2g-tsx60.jpg",
   "pdf": "assets/fiches/preparation/balance-plateforme-l2g-tsx60.pdf"
  },
  {
   "cat": "preparation",
   "slug": "coupe-legumes-robot-coupe-cl50-ultra",
   "nom": "Coupe-légumes Robot Coupe CL 50 Ultra 1 vitesse",
   "marque": "Robot Coupe",
   "reference": "CL 50 Ultra (réf. 24465 mono / 24473 tri)",
   "description": "Coupe-légumes professionnel pour réaliser émincés, râpés, bâtonnets, macédoines et frites, ainsi que le râpé de fromage. Pensé pour 50 à 400 repas par service, avec un débit théorique jusqu'à 500 kg/h. Livré sans disque, 50 disques en option.",
   "points": [
    "550 W, 375 tr/min",
    "50 à 400 repas par service",
    "Bloc moteur inox, éjection latérale"
   ],
   "image": "assets/img/catalogue/preparation/coupe-legumes-robot-coupe-cl50-ultra.jpg",
   "pdf": "assets/fiches/preparation/coupe-legumes-robot-coupe-cl50-ultra.pdf"
  },
  {
   "cat": "preparation",
   "slug": "robot-cook-robot-coupe",
   "nom": "Cutter-blender chauffant Robot Coupe Robot Cook",
   "marque": "Robot Coupe",
   "reference": "Robot Cook (réf. 43000R)",
   "description": "Cutter-blender professionnel qui mixe et chauffe dans la même cuve inox de 3,7 litres, jusqu'à 140°C au degré près. Il traite de 300 g à 2,5 kg par opération, pour 10 à 100 couverts. Toutes les pièces démontables passent au lave-vaisselle.",
   "points": [
    "1800 W, jusqu'à 4500 tr/min",
    "Chauffe jusqu'à 140°C",
    "Fonction 9 programmes"
   ],
   "image": "assets/img/catalogue/preparation/robot-cook-robot-coupe.jpg",
   "pdf": "assets/fiches/preparation/robot-cook-robot-coupe.pdf"
  },
  {
   "cat": "preparation",
   "slug": "machine-sous-vide-sammic-su-310",
   "nom": "Machine sous vide Sammic SU-310",
   "marque": "Sammic",
   "reference": "SU-310",
   "description": "Machine à emballer sous vide à poser sur table, avec barre de soudure de 320 mm et pompe Busch de 10 m³/h. Le vide est contrôlé par capteur et l'écran couleur garde jusqu'à 99 programmes. Une touche pause permet aussi de mariner les aliments.",
   "points": [
    "Pompe Busch 10 m³/h",
    "Barre de soudure 320 mm, double soudure",
    "Carrosserie et cuve inox"
   ],
   "image": "assets/img/catalogue/preparation/machine-sous-vide-sammic-su-310.jpg",
   "pdf": "assets/fiches/preparation/machine-sous-vide-sammic-su-310.pdf"
  },
  {
   "cat": "destockage",
   "slug": "refrigerateur-smeg-spr07pdxr",
   "nom": "Réfrigérateur Smeg SPR07PDXR",
   "marque": "Smeg",
   "reference": "SPR07PDXR",
   "description": "Armoire réfrigérée professionnelle une porte, en inox AISI 304 dedans comme dehors. Réglable de -2 °C à +8 °C avec contrôle électronique, écran LCD et alarmes. Elle convient aux restaurants, bars, boulangeries et traiteurs.",
   "points": [
    "Modèle 700 litres (465 l net)",
    "De -2 °C à +8 °C",
    "Classe énergétique A, gaz R290"
   ],
   "image": "assets/img/catalogue/destockage/refrigerateur-smeg-spr07pdxr.jpg",
   "pdf": "assets/fiches/destockage/refrigerateur-smeg-spr07pdxr.pdf",
   "prix": "1 900 €"
  },
  {
   "cat": "destockage",
   "slug": "mixeur-plongeant-hendi-blend",
   "nom": "Mixeur plongeant Hendi Blend",
   "marque": "Hendi",
   "reference": "222157",
   "description": "Mixeur plongeant de 250 W avec 6 vitesses et écran LCD, en ABS avec manche en inox. Sa lame en croix en inox revêtue de titane tourne jusqu'à 13 500 tr/min. Il convient pour des préparations de 1 à 8 litres en cuisine.",
   "points": [
    "250 W, 6 vitesses, écran LCD",
    "Jusqu'à 13 500 tr/min",
    "Pour 1 à 8 litres"
   ],
   "image": null,
   "pdf": "assets/fiches/destockage/mixeur-plongeant-hendi-blend.pdf",
   "prix": "234 €"
  },
  {
   "cat": "destockage",
   "slug": "chauffe-sauce-casselin-ccs2",
   "nom": "Chauffe-sauce double Casselin CCS2",
   "marque": "Casselin",
   "reference": "CCS2",
   "description": "Chauffe-sauce en inox pour garder deux sauces au chaud, livré avec deux bouteilles de 1 L. Chaque emplacement a son thermostat réglable jusqu'à 90 °C. Compact (30,7 x 16,5 cm), il se pose facilement sur un comptoir de snack ou de bar.",
   "points": [
    "2 bouteilles de 1 L incluses",
    "2 thermostats de 0 à 90 °C",
    "400 W, 230 V"
   ],
   "image": "assets/img/catalogue/destockage/chauffe-sauce-casselin-ccs2.jpg",
   "pdf": "assets/fiches/destockage/chauffe-sauce-casselin-ccs2.pdf",
   "prix": "369 €"
  },
  {
   "cat": "destockage",
   "slug": "gaufrier-krampouz-wecabaao",
   "nom": "Gaufrier Krampouz WECABAAO",
   "marque": "Krampouz",
   "reference": "WECABAAO",
   "description": "Gaufrier électrique pour gaufres de Bruxelles 4 x 6, avec plaques en fonte et bâti en inox. Ouverture à 180°, thermostat de 50 à 300 °C et bacs de récupération. Fabriqué en France, il convient aux snacks, crêperies et salons de thé.",
   "points": [
    "Gaufres de Bruxelles 4 x 6",
    "1800 W, 230-240 V",
    "Thermostat de 50 à 300 °C"
   ],
   "image": "assets/img/catalogue/destockage/gaufrier-krampouz-wecabaao.jpg",
   "pdf": "assets/fiches/destockage/gaufrier-krampouz-wecabaao.pdf",
   "prix": "675,18 €"
  },
  {
   "cat": "destockage",
   "slug": "plaque-induction-maxima-09371040",
   "nom": "Plaque à induction Maxima 3500 W",
   "marque": "Maxima",
   "reference": "09371040",
   "description": "Plaque à induction de 3500 W avec plan en verre, commandes tactiles et écran LCD. Température de 60 à 240 °C en 10 niveaux et minuterie jusqu'à 180 minutes. Pour casseroles à fond plat de 12 à 24 cm, en cuisine ou en appoint.",
   "points": [
    "3500 W, 230 V monophasé",
    "60 à 240 °C en 10 niveaux",
    "Minuterie de 0 à 180 min"
   ],
   "image": "assets/img/catalogue/destockage/plaque-induction-maxima-09371040.jpg",
   "pdf": "assets/fiches/destockage/plaque-induction-maxima-09371040.pdf",
   "prix": "160 €"
  },
  {
   "cat": "destockage",
   "slug": "balance-diamond-wr-30x1-l",
   "nom": "Balance électronique Diamond WR-30X1-L",
   "marque": "Diamond",
   "reference": "WR-30X1-L",
   "description": "Balance de table de 30 kg précise au gramme, avec plateau inox de 180 x 245 mm et clavier étanche. Écran LCD rétroéclairé et batterie rechargeable de 240 heures d'autonomie pour peser et doser partout en cuisine ou chez un traiteur.",
   "points": [
    "30 kg, précision 1 g",
    "Plateau inox 180 x 245 mm",
    "Batterie 240 h d'autonomie"
   ],
   "image": "assets/img/catalogue/destockage/balance-diamond-wr-30x1-l.jpg",
   "pdf": "assets/fiches/destockage/balance-diamond-wr-30x1-l.pdf",
   "prix": "195 €"
  }
 ]
};
