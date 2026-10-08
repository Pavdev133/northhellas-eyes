(() => {
  'use strict';

  const CAMS = window.NHE_CAMS || [];
  const PARTNERS = window.NHE_PARTNERS || [];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const REFRESH_MS = 60 * 1000;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ── i18n ────────────────────────────────────────────────
  const T = {
    el: {
      'nav.cams': 'Κάμερες', 'nav.regions': 'Περιοχές', 'nav.map': 'Χάρτης', 'nav.weather': 'Καιρός', 'nav.about': 'Η ομάδα', 'nav.contact': 'Επικοινωνία', 'nav.gallery': 'Γκαλερί',
      'gal.eyebrow': 'Γκαλερί', 'gal.title1': 'Στιγμές', 'gal.title2': 'από τις κάμερές μας',
      'gal.text': 'Χιόνια, καταιγίδες, ουράνια τόξα και ανατολές που έπιασαν οι κάμερες του δικτύου. Διάλεξε χρονιά και πάτησε μια φωτογραφία για να τη δεις σε όλη την οθόνη.',
      'gal.photos': 'φωτογραφίες', 'gal.live': 'Δες την κάμερα ζωντανά', 'gal.close': 'Κλείσιμο',
      'gal.tag.snow': 'Χιόνι', 'gal.tag.storm': 'Καταιγίδα', 'gal.tag.sunrise': 'Ανατολή', 'gal.tag.rainbow': 'Ουράνιο τόξο',
      'hero.kicker': 'ζωντανές κάμερες · Βόρεια Ελλάδα',
      'hero.t1': 'Τα μάτια', 'hero.t2': 'της Βόρειας Ελλάδας',
      'hero.lead': 'Από τις Πρέσπες ως τον Έβρο, από τον Όλυμπο ως τη Χαλκιδική. Δες τον καιρό όπως είναι αυτή τη στιγμή, δωρεάν, 24 ώρες το 24ωρο.',
      'hero.cta': 'Όλες οι κάμερες', 'hero.open': 'Δες ζωντανά',
      'stats.cams': 'κάμερες σε λειτουργία', 'stats.regions': 'περιφέρειες, από τις Πρέσπες ως τον Έβρο',
      'stats.olympus': 'μέτρα, ο Μύτικας που βλέπουμε κάθε μέρα', 'stats.since': 'η χρονιά που ξεκινήσαμε',
      'cams.eyebrow': 'Το δίκτυο', 'cams.title1': 'Οι κάμερές', 'cams.title2': 'μας', 'cams.search': 'Αναζήτηση τοποθεσίας…',
      'cams.empty': 'Δεν βρέθηκε κάμερα με αυτό το όνομα.', 'cams.refresh': 'Οι εικόνες ανανεώνονται αυτόματα κάθε λεπτό.',
      'cams.updated': 'Τελευταία ανανέωση',
      'region.all': 'Όλες', 'region.west': 'Δυτική Μακεδονία', 'region.central': 'Κεντρική Μακεδονία',
      'region.east': 'Αν. Μακεδονία & Θράκη', 'region.live': 'Ζωντανό βίντεο', 'region.fav': 'Αγαπημένα',
      'fav.add': 'Προσθήκη στα αγαπημένα', 'fav.remove': 'Αφαίρεση από τα αγαπημένα', 'fav.added': 'Προστέθηκε στα αγαπημένα ★', 'fav.removed': 'Αφαιρέθηκε από τα αγαπημένα',
      'regions.eyebrow': 'Ταξίδι στον Βορρά', 'regions.title1': 'Τρεις περιφέρειες,', 'regions.title2': 'ένας ουρανός',
      'regions.cams': 'κάμερες', 'regions.go': 'Δες τις κάμερες',
      'rw.text': 'Λίμνες και βουνά: οι Πρέσπες, η Ορεστιάδα της Καστοριάς, ο Γράμμος, η Φλώρινα με τα χιόνια της και η λίμνη Πολυφύτου.',
      'rc.text': 'Ο Όλυμπος από τέσσερις μεριές, ο Θερμαϊκός, η Θεσσαλονίκη, η Κερκίνη, το Καϊμάκτσαλαν και οι θάλασσες της Χαλκιδικής.',
      're.text': 'Η Θράκη ως τα σύνορα: ο φάρος και το λιμάνι της Αλεξανδρούπολης, το Σουφλί του μεταξιού και τα Δίκαια του Έβρου.',
      'map.eyebrow': 'Πού βρίσκονται', 'map.title1': 'Ο χάρτης', 'map.title2': 'των καμερών',
      'map.text': 'Κάθε σημείο στον χάρτη είναι μια κάμερα του δικτύου και η φωτεινή ακτίνα δείχνει πού κοιτάζει. Πάτησε πάνω του για να τη δεις ζωντανά.',
      'map.load': 'Φόρτωση χάρτη', 'map.records': 'Ξεχωριστά σημεία του δικτύου',
      'map.loading': 'Φόρτωση χάρτη…', 'map.hint': 'Πάτησε μια κουκκίδα για να ανοίξεις την κάμερα.',
      'map.hintTouch': 'Πάτησε τον χάρτη για να τον μετακινήσεις, ή μια κουκκίδα για να ανοίξεις την κάμερα.',
      'map.style.sat': 'Δορυφόρος', 'map.style.topo': 'Ανάγλυφο', 'map.style.dark': 'Σκούρος',
      'map.open': 'Άνοιγμα κάμερας', 'map.fail': 'Ο χάρτης δεν φόρτωσε. Άνοιξέ τον στο Google Maps',
      'rec.high': 'Η ψηλότερη', 'rec.first': 'Η πρώτη', 'rec.west': 'Η δυτικότερη', 'rec.east': 'Η ανατολικότερη', 'rec.north': 'Η βορειότερη',
      'rec.olympus': 'Ο Όλυμπος', 'rec.city': 'Η μεγαλύτερη πόλη',
      'weather.eyebrow': 'Πρόγνωση', 'weather.title1': 'Βροχή, άνεμος', 'weather.title2': 'και θερμοκρασία',
      'weather.text': 'Ο ζωντανός χάρτης του Windy με το μοντέλο ECMWF. Άλλαξε επίπεδο από το μενού του χάρτη.',
      'weather.load': 'Φόρτωση χάρτη καιρού',
      'about.eyebrow': 'Η ιστορία μας', 'about.title1': 'Τρεις φίλοι,', 'about.title2': 'μία ιδέα',
      'about.p1': 'Τον Μάιο του 2022, τρεις φίλοι από τρεις διαφορετικούς επαγγελματικούς κόσμους συνέλαβαν την ιδέα της δημιουργίας ενός ενημερωτικού account στο Facebook, με στόχο τη δωρεάν και live ενημέρωση αγροτών, τουριστών και κάθε άλλου ενδιαφερόμενου για τις μετεωρολογικές συνθήκες στη Βόρεια Ελλάδα σε πραγματικό χρόνο.',
      'about.p2': 'Με γνώμονα την πρόθεσή τους να στηρίξουν, στο μέτρο που τους αναλογεί, την αγροτική παραγωγή, αλλά και να διευκολύνουν τις τουριστικές εισροές στη χώρα, ξεκίνησαν στις 15 Ιουνίου το «northellas.eyes»: ένα δίκτυο μετεωρολογικών καμερών που εντάσσονται σταδιακά και δίνουν live εικόνα για τον καιρό σε διάφορες περιοχές της Βόρειας Ελλάδας.',
      'about.p3': 'Η πρώτη κάμερα εγκαταστάθηκε στις 15 Ιουνίου 2022 στη Λητή Θεσσαλονίκης. Σήμερα το δίκτυο έχει 29 κάμερες. Οι κάμερες αποτελούν μέρος του ευρύτερου δικτύου meteolive.gr, με διαχειριστή τον Χρήστο Δημητρούλη.',
      'pillar.1t': 'Για τους αγρότες', 'pillar.1': 'Ο καιρός στο χωράφι, πριν βγεις από το σπίτι.',
      'pillar.2t': 'Για τους ταξιδιώτες', 'pillar.2': 'Χιόνι στο βουνό ή ήλιος στη θάλασσα; Δες πριν φύγεις.',
      'pillar.3t': 'Δωρεάν, πάντα', 'pillar.3': 'Χωρίς συνδρομές και χωρίς διαφημίσεις στην εικόνα.',
      'tl.1': 'Τρεις φίλοι, μία ιδέα: ενημέρωση για τον καιρό στη Βόρεια Ελλάδα, live και δωρεάν.',
      'tl.2': 'Η πρώτη κάμερα ανάβει στη Λητή Θεσσαλονίκης.',
      'tl.3': 'Φωτεινά, Νέος Παντελεήμονας, Κατερίνη, Ν.Ο. Κατερίνης, Δερβένι, Σουφλί, Δίκαια, Νεράιδα, Μακρύγιαλος, Κερκίνη, Ν.Ο. Θεσσαλονίκης, Ξινό Νερό.',
      'tl.4': 'Καστοριά, Φλώρινα, Ψαράδες, Αλεξανδρούπολη, Νέοι Πόροι, Νάουσα, Άφυτος.',
      'tl.5': 'Παλαιοχώρι, Ουρανούπολη, Παλιός Άγιος Αθανάσιος.',
      'tl.6': 'Νεστόριο, Λιτόχωρο, Καστανιά Σερβίων, λιμάνι Αλεξανδρούπολης.',
      'tl.nextT': 'Συνεχίζεται…', 'tl.next': 'Η επόμενη κάμερα μπορεί να είναι στο δικό σου μέρος.',
      'hosts.eyebrow': 'Ευχαριστούμε', 'hosts.title1': 'Φιλοξενούν', 'hosts.title2': 'τις κάμερές μας',
      'hosts.text': 'Κάθε κάμερα υπάρχει χάρη σε έναν άνθρωπο ή μια επιχείρηση που της έδωσε μια θέση με θέα.',
      'hosts.cta': 'Θέλεις κάμερα στο κατάλυμα ή στην επιχείρησή σου;', 'hosts.ctaLink': 'Στείλε μας μήνυμα',
      'contact.eyebrow': 'Επικοινωνία', 'contact.title1': 'Μείνε', 'contact.title2': 'συνδεδεμένος',
      'contact.text': 'Καθημερινά στιγμιότυπα, χιόνια, καταιγίδες και ηλιοβασιλέματα από όλη τη Βόρεια Ελλάδα. Για συνεργασίες, νέες κάμερες ή οτιδήποτε άλλο, γράψε μας στα social.',
      'contact.group': 'Ομάδα Facebook', 'contact.groupSub': 'Μοιράσου τις φωτογραφίες σου',
      'footer.tag': 'Δωρεάν ενημέρωση για τις μετεωρολογικές συνθήκες στη Βόρεια Ελλάδα με live κάμερες.',
      'footer.note': 'Δεν επιτρέπεται η αποθήκευση ή/και αναπαραγωγή εικόνας από τις κάμερες του δικτύου μας σε άλλα μέσα χωρίς τη σύμφωνη γνώμη μας.',
      'footer.partner': 'Σε συνεργασία με',
      'ded.eyebrow': 'Αφιέρωση', 'ded.title1': 'Ένα μεγάλο ευχαριστώ', 'ded.title2': 'στο meteolive.gr',
      'ded.text': 'Οι κάμερές μας αποτελούν μέρος του δικτύου meteolive.gr. Χάρη στη στήριξη του Χρήστου Δημητρούλη και της ομάδας του, η ζωντανή εικόνα από τη Βόρεια Ελλάδα φτάνει σε όλους, κάθε μέρα, δωρεάν. Τους αφιερώνουμε αυτή τη σελίδα.',
      'ded.cta': 'Επισκέψου το meteolive.gr',
      'tab.live': 'Ζωντανά', 'tab.timelapse': 'Time-lapse', 'tab.image': 'Εικόνα',
      'v.view': 'Τι βλέπουμε;', 'v.about': 'Επίσης…',
      'v.loading': 'Σύνδεση με την κάμερα…',
      'v.retrying': 'Η σύνδεση αργεί, ξαναδοκιμάζω…',
      'v.fail': 'Η ζωντανή ροή δεν απαντά αυτή τη στιγμή.',
      'v.failHint': 'Δοκίμασε το time-lapse ή άνοιξε την κάμερα στο meteolive.gr.',
      'v.noimg': 'Η εικόνα δεν είναι διαθέσιμη αυτή τη στιγμή.',
      'v.meteo': 'Ζωντανή ροή στο meteolive.gr', 'v.windy': 'Ιστορικό στο Windy', 'v.blog': 'Παλιά σελίδα',
      'v.host': 'Φιλοξενία', 'v.share': 'Ο σύνδεσμος αντιγράφηκε', 'v.retry': 'Ξανά',
      'f.dir': 'κατεύθυνση', 'f.alt': 'υψόμετρο', 'f.pop': 'κάτοικοι', 'f.region': 'περιοχή',
      'card.live': 'LIVE', 'card.snap': 'ΕΙΚΟΝΑ', 'st.on': 'ONLINE', 'st.off': 'OFFLINE', 'live.now': 'ΖΩΝΤΑΝΑ',
      'regionShort.west': 'Δ. Μακεδονία', 'regionShort.central': 'Κ. Μακεδονία', 'regionShort.east': 'Α. Μακ. & Θράκη',
      dirs: ['Β', 'ΒΑ', 'Α', 'ΝΑ', 'Ν', 'ΝΔ', 'Δ', 'ΒΔ']
    },
    en: {
      'nav.cams': 'Cameras', 'nav.regions': 'Regions', 'nav.map': 'Map', 'nav.weather': 'Weather', 'nav.about': 'About', 'nav.contact': 'Contact', 'nav.gallery': 'Gallery',
      'gal.eyebrow': 'Gallery', 'gal.title1': 'Moments', 'gal.title2': 'from our cameras',
      'gal.text': 'Snow, storms, rainbows and sunrises caught by the network\'s cameras. Pick a year and tap a photo to see it full screen.',
      'gal.photos': 'photos', 'gal.live': 'Watch this camera live', 'gal.close': 'Close',
      'gal.tag.snow': 'Snow', 'gal.tag.storm': 'Storm', 'gal.tag.sunrise': 'Sunrise', 'gal.tag.rainbow': 'Rainbow',
      'hero.kicker': 'live cameras · Northern Greece',
      'hero.t1': 'The eyes', 'hero.t2': 'of Northern Greece',
      'hero.lead': 'From Prespes to Evros, from Mount Olympus to Chalkidiki. See the weather exactly as it is right now, free, around the clock.',
      'hero.cta': 'All cameras', 'hero.open': 'Watch live',
      'stats.cams': 'cameras online', 'stats.regions': 'regions, from Prespes to Evros',
      'stats.olympus': 'metres: Mytikas, which we see every day', 'stats.since': 'the year we started',
      'cams.eyebrow': 'The network', 'cams.title1': 'Our', 'cams.title2': 'cameras', 'cams.search': 'Search a place…',
      'cams.empty': 'No camera matches that name.', 'cams.refresh': 'Images refresh automatically every minute.',
      'cams.updated': 'Last refresh',
      'region.all': 'All', 'region.west': 'Western Macedonia', 'region.central': 'Central Macedonia',
      'region.east': 'E. Macedonia & Thrace', 'region.live': 'Live video', 'region.fav': 'Favorites',
      'fav.add': 'Add to favorites', 'fav.remove': 'Remove from favorites', 'fav.added': 'Added to favorites ★', 'fav.removed': 'Removed from favorites',
      'regions.eyebrow': 'A journey north', 'regions.title1': 'Three regions,', 'regions.title2': 'one sky',
      'regions.cams': 'cameras', 'regions.go': 'See the cameras',
      'rw.text': 'Lakes and mountains: Prespes, Kastoria’s Lake Orestiada, Mount Grammos, snowy Florina and Lake Polyfytos.',
      'rc.text': 'Mount Olympus from four sides, the Thermaic Gulf, Thessaloniki, Lake Kerkini, Kaimaktsalan and the seas of Chalkidiki.',
      're.text': 'Thrace up to the border: Alexandroupoli’s lighthouse and port, Soufli, the town of silk, and Dikaia in Evros.',
      'map.eyebrow': 'Where they are', 'map.title1': 'The camera', 'map.title2': 'map',
      'map.text': 'Every dot is one camera in the network, and its glowing beam shows which way it looks. Tap one to watch it live.',
      'map.load': 'Load map', 'map.records': 'Network highlights',
      'map.loading': 'Loading map…', 'map.hint': 'Tap a dot to open that camera.',
      'map.hintTouch': 'Tap the map to move it, or tap a dot to open that camera.',
      'map.style.sat': 'Satellite', 'map.style.topo': 'Terrain', 'map.style.dark': 'Dark',
      'map.open': 'Open camera', 'map.fail': 'The map didn’t load. Open it on Google Maps',
      'rec.high': 'Highest', 'rec.first': 'First', 'rec.west': 'Westernmost', 'rec.east': 'Easternmost', 'rec.north': 'Northernmost',
      'rec.olympus': 'Mount Olympus', 'rec.city': 'Biggest city',
      'weather.eyebrow': 'Forecast', 'weather.title1': 'Rain, wind', 'weather.title2': 'and temperature',
      'weather.text': 'Windy’s live map with the ECMWF model. Switch layers from the map menu.',
      'weather.load': 'Load weather map',
      'about.eyebrow': 'Our story', 'about.title1': 'Three friends,', 'about.title2': 'one idea',
      'about.p1': 'In May 2022, three friends from three different walks of life came up with the idea of a Facebook page offering free, live, real-time weather updates for Northern Greece, for farmers, tourists and anyone else who needs them.',
      'about.p2': 'Wanting to support farming in whatever way they could, and to make travel to the region easier, they launched “northellas.eyes” on 15 June: a network of weather cameras, added one by one, that gives a live picture of the weather across Northern Greece.',
      'about.p3': 'The first camera went up on 15 June 2022 in Liti, Thessaloniki. Today the network has 29 cameras. They are part of the wider meteolive.gr network run by Christos Dimitroulis.',
      'pillar.1t': 'For farmers', 'pillar.1': 'The weather over your fields before you leave the house.',
      'pillar.2t': 'For travellers', 'pillar.2': 'Snow on the mountain or sun at the beach? Check before you go.',
      'pillar.3t': 'Always free', 'pillar.3': 'No subscriptions and no ads over the picture.',
      'tl.1': 'Three friends, one idea: live, free weather updates for Northern Greece.',
      'tl.2': 'The first camera goes live in Liti, Thessaloniki.',
      'tl.3': 'Fotina, Neos Panteleimonas, Katerini, Katerini Nautical Club, Derveni, Soufli, Dikaia, Neraida, Makrygialos, Kerkini, Thessaloniki Nautical Club, Xino Nero.',
      'tl.4': 'Kastoria, Florina, Psarades, Alexandroupoli, Neoi Poroi, Naousa, Afytos.',
      'tl.5': 'Palaiochori, Ouranoupoli, Old Agios Athanasios.',
      'tl.6': 'Nestorio, Litochoro, Kastania Servion, Alexandroupoli port.',
      'tl.nextT': 'To be continued…', 'tl.next': 'The next camera could be at your place.',
      'hosts.eyebrow': 'Thank you', 'hosts.title1': 'Our camera', 'hosts.title2': 'hosts',
      'hosts.text': 'Every camera exists thanks to a person or a business who gave it a spot with a view.',
      'hosts.cta': 'Would you like a camera at your hotel or business?', 'hosts.ctaLink': 'Send us a message',
      'contact.eyebrow': 'Contact', 'contact.title1': 'Stay', 'contact.title2': 'in touch',
      'contact.text': 'Daily snapshots, snowfalls, storms and sunsets from all over Northern Greece. For partnerships, new cameras or anything else, message us on social media.',
      'contact.group': 'Facebook group', 'contact.groupSub': 'Share your photos',
      'footer.tag': 'Free, live weather updates for Northern Greece from our camera network.',
      'footer.note': 'Images from our cameras may not be saved or republished elsewhere without our permission.',
      'footer.partner': 'In partnership with',
      'ded.eyebrow': 'Dedication', 'ded.title1': 'A big thank you', 'ded.title2': 'to meteolive.gr',
      'ded.text': 'Our cameras are part of the meteolive.gr network. Thanks to the support of Christos Dimitroulis and his team, the live view of Northern Greece reaches everyone, every day, for free. We dedicate this site to them.',
      'ded.cta': 'Visit meteolive.gr',
      'tab.live': 'Live', 'tab.timelapse': 'Time-lapse', 'tab.image': 'Image',
      'v.view': 'What we see', 'v.about': 'About the place',
      'v.loading': 'Connecting to the camera…',
      'v.retrying': 'Slow connection, trying again…',
      'v.fail': 'The live stream isn’t responding right now.',
      'v.failHint': 'Try the time-lapse, or open the camera on meteolive.gr.',
      'v.noimg': 'The image isn’t available right now.',
      'v.meteo': 'Live stream on meteolive.gr', 'v.windy': 'History on Windy', 'v.blog': 'Old page',
      'v.host': 'Hosted by', 'v.share': 'Link copied', 'v.retry': 'Retry',
      'f.dir': 'direction', 'f.alt': 'altitude', 'f.pop': 'residents', 'f.region': 'region',
      'card.live': 'LIVE', 'card.snap': 'IMAGE', 'st.on': 'ONLINE', 'st.off': 'OFFLINE', 'live.now': 'LIVE',
      'regionShort.west': 'W. Macedonia', 'regionShort.central': 'C. Macedonia', 'regionShort.east': 'E. Mac. & Thrace',
      dirs: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    }
  };

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang') || store.get('nhe-lang') || 'el';
  if (!T[lang]) lang = 'el';
  const t = (k) => T[lang][k] ?? T.el[k] ?? k;
  const L = (o) => (o ? o[lang] || o.el : '');
  const locale = () => (lang === 'el' ? 'el-GR' : 'en-GB');
  const num = (n) => Number(n).toLocaleString(locale());
  const m = () => (lang === 'el' ? 'μ' : 'm');
  const dirName = (deg) => t('dirs')[Math.round(((deg % 360) + 360) % 360 / 45) % 8];

  // ── Sources ─────────────────────────────────────────────
  const windyImg = (id) => `https://images-webcams.windy.com/${String(id).slice(-2)}/${id}/current/full/${id}.jpg`;
  const windyPlayer = (id) => `https://webcams.windy.com/webcams/public/embed/player/${id}/day`;
  const bucket = () => Math.floor(Date.now() / REFRESH_MS);
  const bust = (url) => url + (url.includes('?') ? '&' : '?') + 't=' + bucket();
  const snapOf = (cam) => (cam.snap ? cam.snap : cam.windy ? windyImg(cam.windy) : '');
  const altSnapOf = (cam) => (cam.snap && cam.windy ? windyImg(cam.windy) : '');
  const meteoUrl = (cam) => `https://www.meteolive.gr/p/${cam.meteo}.html`;
  const camById = (id) => CAMS.find((c) => c.id === id);

  function loadImg(img, cam) {
    const primary = snapOf(cam);
    const alt = altSnapOf(cam);
    if (!primary) return;
    img.onerror = () => {
      if (alt && !img.dataset.alt) { img.dataset.alt = '1'; img.src = bust(alt); return; }
      img.classList.remove('is-loaded');
      img.removeAttribute('src');
    };
    img.onload = () => img.classList.add('is-loaded');
    img.src = bust(img.dataset.alt && alt ? alt : primary);
  }

  // Fetch a fresh still in the background and swap it in. Always tries the
  // camera's own image first, so a one-off failure doesn't leave it on the
  // slower Windy fallback for good.
  function refreshImg(img, cam, onSwap) {
    const primary = snapOf(cam);
    const alt = altSnapOf(cam);
    if (!primary) return;
    const tryLoad = (url, next) => {
      const pre = new Image();
      pre.onload = () => {
        img.dataset.alt = url === primary ? '' : '1';
        img.src = pre.src;
        if (onSwap) onSwap();
      };
      if (next) pre.onerror = next;
      pre.src = bust(url);
    };
    tryLoad(primary, alt ? () => tryLoad(alt) : null);
  }

  // ── HLS ─────────────────────────────────────────────────
  // Plays a live stream and keeps it alive: network and decode errors are
  // recovered in place, stalls jump back to the live edge, and a stream that
  // dies is reloaded a few times before we give up and show the fallback.
  function playHls(video, url, { onPlay, onFail, onRetry, timeout = 15000, giveUpAfter = 45000 } = {}) {
    let done = false;      // gave up or destroyed
    let started = false;   // first frame shown
    let hls = null;
    let attempt = 0;
    let since = Date.now(); // last time the stream was playing (or when we started)
    let startTimer = null;
    let stallTimer = null;
    const nativeHls = !!video.canPlayType('application/vnd.apple.mpegurl');
    const hlsJsOk = !!(window.Hls && window.Hls.isSupported());
    // Prefer the browser's own HLS player (iPhone, Safari, Android): it needs
    // no CORS headers from the stream server. When both engines exist, each
    // reload switches to the other one, so a stream one engine can't play
    // still gets a chance on the other.
    let useHlsJs = hlsJsOk && !nativeHls;

    const clearTimers = () => { clearTimeout(startTimer); clearTimeout(stallTimer); };
    function teardown() {
      clearTimers();
      if (hls) { hls.destroy(); hls = null; }
      video.removeAttribute('src');
      try { video.load(); } catch { /* noop */ }
    }
    function giveUp() {
      if (done) return;
      done = true;
      teardown();
      onFail && onFail();
    }
    // Reload the whole stream with growing pauses; give up only after
    // `giveUpAfter` ms of trying without a picture.
    function restart() {
      if (done) return;
      if (Date.now() - since > giveUpAfter) { giveUp(); return; }
      attempt += 1;
      teardown();
      if (nativeHls && hlsJsOk) useHlsJs = !useHlsJs;
      if (!started && onRetry) onRetry(attempt);
      setTimeout(() => { if (!done) start(); }, Math.min(1000 * attempt, 3000));
    }
    const toLiveEdge = () => {
      if (hls && hls.liveSyncPosition) video.currentTime = hls.liveSyncPosition;
      else if (video.seekable.length) video.currentTime = Math.max(0, video.seekable.end(video.seekable.length - 1) - 2);
    };

    function start() {
      clearTimers();
      startTimer = setTimeout(restart, timeout);
      if (useHlsJs) {
        let mediaRecoveries = 0;
        hls = new window.Hls({
          lowLatencyMode: false,
          liveSyncDurationCount: 3,
          liveMaxLatencyDurationCount: 8,
          maxBufferLength: 30,
          backBufferLength: 30,
          startFragPrefetch: true,
          capLevelToPlayerSize: true,
          manifestLoadingMaxRetry: 6,
          manifestLoadingRetryDelay: 1000,
          levelLoadingMaxRetry: 6,
          fragLoadingMaxRetry: 8,
          fragLoadingRetryDelay: 1000
        });
        hls.on(window.Hls.Events.ERROR, (_, data) => {
          if (!data.fatal) return;
          if (data.type === window.Hls.ErrorTypes.MEDIA_ERROR && mediaRecoveries < 2) {
            mediaRecoveries += 1;
            hls.recoverMediaError();
          } else if (data.type === window.Hls.ErrorTypes.NETWORK_ERROR && started) {
            hls.startLoad();
          } else {
            restart();
          }
        });
        hls.on(window.Hls.Events.MANIFEST_PARSED, () => { video.play().catch(() => {}); });
        hls.loadSource(url);
        hls.attachMedia(video);
      } else if (nativeHls) {
        video.src = url;
        video.play().catch(() => {});
      } else {
        setTimeout(giveUp, 0);
      }
    }

    video.addEventListener('playing', () => {
      clearTimers();
      attempt = 0;
      since = Date.now();
      if (!started) { started = true; onPlay && onPlay(); }
    });
    // Buffering for a while: jump to the live edge, then reload if still stuck.
    video.addEventListener('waiting', () => {
      if (!started || done) return;
      clearTimeout(stallTimer);
      stallTimer = setTimeout(() => {
        toLiveEdge();
        video.play().catch(() => {});
        stallTimer = setTimeout(restart, 10000);
      }, 6000);
    });
    video.addEventListener('error', () => { if (!useHlsJs && video.getAttribute('src')) restart(); });
    // Coming back to the tab: catch up to live instead of playing old video.
    const onVisible = () => { if (document.visibilityState === 'visible' && started && !done && !video.paused) { toLiveEdge(); video.play().catch(() => {}); } };
    document.addEventListener('visibilitychange', onVisible);

    start();
    return { destroy() { done = true; teardown(); document.removeEventListener('visibilitychange', onVisible); } };
  }

    const playSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  const arrowSvg = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  // ── Grid ────────────────────────────────────────────────
  let filter = 'all';
  let query = '';

  // ── Favorites (kept on this device) ─────────────────────
  const favs = new Set((() => { try { return JSON.parse(store.get('nhe-favs') || '[]'); } catch { return []; } })());
  const isFav = (cam) => favs.has(cam.id);
  const starSvg = '<svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>';

  function paintFavButton(el, cam) {
    const on = isFav(cam);
    el.classList.toggle('is-on', on);
    el.setAttribute('aria-pressed', on);
    el.setAttribute('aria-label', t(on ? 'fav.remove' : 'fav.add'));
    el.title = t(on ? 'fav.remove' : 'fav.add');
  }

  function toggleFav(cam) {
    if (isFav(cam)) favs.delete(cam.id); else favs.add(cam.id);
    store.set('nhe-favs', JSON.stringify([...favs]));
    toast(t(isFav(cam) ? 'fav.added' : 'fav.removed'));
    if (filter === 'fav' && !favs.size) { setFilter('all'); } else { renderGrid(); }
    updateChips();
    if (current) paintFavButton($('#vFav'), current);
  }
  const norm = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/ς/g, 'σ');

  function visibleCams() {
    const q = norm(query);
    const list = CAMS.filter((c) => {
      if (filter === 'live' && !c.hls) return false;
      if (filter === 'fav' && !isFav(c)) return false;
      if (!['all', 'live', 'fav'].includes(filter) && c.region !== filter) return false;
      if (!q) return true;
      return norm([c.name.el, c.name.en, c.area.el, c.area.en, c.id].join(' ')).includes(q);
    });
    // Starred cameras come first, otherwise the catalogue order stays.
    return list.sort((a, b) => isFav(b) - isFav(a));
  }

  // ── Online / offline status ─────────────────────────────
  // Each camera is probed every couple of minutes: its live playlist when it
  // has one, otherwise its latest still. The viewer's player also reports in.
  const STATUS_MS = 2 * 60 * 1000;
  const camStatus = {};
  const misses = {};
  let lastCheck = 0;

  function statusBadge(cam) {
    return cam.hls
      ? `<span class="badge badge--live"><i></i> ${t('card.live')}</span>`
      : `<span class="badge">${t('card.snap')}</span>`;
  }

  // The camera view shows whether the open camera is online right now.
  function paintViewerStatus() {
    const el = $('#vStatus');
    const st = current && camStatus[current.id];
    el.hidden = !st;
    if (!st) return;
    el.className = `badge v-status badge--${st}`;
    el.innerHTML = `<i></i> ${t(st === 'on' ? 'st.on' : 'st.off')}`;
  }

  function paintStatus(cam) {
    if (current === cam) paintViewerStatus();
    const pin = mapPins.find((p) => p.cam === cam);
    const el = pin && pin.mk.getElement();
    if (el) el.classList.toggle('pin--off', camStatus[cam.id] === 'off');
  }

  function setStatus(cam, st) {
    if (camStatus[cam.id] === st) return;
    camStatus[cam.id] = st;
    paintStatus(cam);
  }

  async function probeStream(url) {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 12000);
    try {
      const r = await fetch(url, { cache: 'no-store', signal: ctl.signal });
      if (!r.ok) return 'off';
      return /#EXT(INF|-X-STREAM-INF)/.test(await r.text()) ? 'on' : 'off';
    } catch (e) {
      if (ctl.signal.aborted) return 'off';
      // Hosts without CORS: all we can learn is whether the server answers.
      try { await fetch(url, { mode: 'no-cors', cache: 'no-store', signal: ctl.signal }); return 'on'; } catch { return 'off'; }
    } finally {
      clearTimeout(timer);
    }
  }

  function probeImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      const timer = setTimeout(() => { img.src = ''; resolve('off'); }, 15000);
      img.onload = () => { clearTimeout(timer); resolve('on'); };
      img.onerror = () => { clearTimeout(timer); resolve('off'); };
      img.src = bust(url);
    });
  }

  function checkStatus() {
    if (document.visibilityState === 'hidden') return;
    lastCheck = Date.now();
    CAMS.forEach(async (cam) => {
      let st = 'off';
      if (cam.hls) st = await probeStream(cam.hls);
      else if (snapOf(cam)) st = await probeImage(snapOf(cam));
      // A camera that was online needs two misses in a row before it shows offline.
      if (st === 'off' && camStatus[cam.id] === 'on' && !misses[cam.id]) { misses[cam.id] = 1; return; }
      misses[cam.id] = 0;
      setStatus(cam, st);
    });
  }

  function renderGrid() {
    const grid = $('#grid');
    const list = visibleCams();
    $('#empty').hidden = list.length > 0;
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    list.forEach((cam, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'card';
      b.dataset.id = cam.id;
      b.style.setProperty('--i', i);
      b.innerHTML = `
        <div class="card__img">
          <div class="card__ph"><img src="img/logo-128.webp" width="64" height="64" alt=""></div>
          <img alt="" loading="lazy" decoding="async">
          ${statusBadge(cam)}
          <span class="card__fav" role="button" tabindex="0">${starSvg}</span>
          <span class="card__region">${t('regionShort.' + cam.region)}</span>
          <span class="card__play">${playSvg}</span>
          ${cam.dir != null ? `<span class="card__dir" title="${dirName(cam.dir)}"><i style="--dir:${cam.dir}deg"></i></span>` : ''}
        </div>
        <div class="card__body"><h3></h3><div class="card__meta"><span></span>${cam.alt ? `<span>${num(cam.alt)} ${m()}</span>` : ''}</div></div>`;
      $('h3', b).textContent = L(cam.name);
      $('.card__meta span', b).textContent = L(cam.area);
      $('.card__img > img', b).alt = L(cam.name);
      loadImg($('.card__img > img', b), cam);
      const star = $('.card__fav', b);
      paintFavButton(star, cam);
      star.addEventListener('click', (e) => { e.stopPropagation(); toggleFav(cam); });
      star.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); toggleFav(cam); }
      });
      b.addEventListener('click', () => openViewer(cam.id));
      if (finePointer && !reduced) addTilt(b);
      frag.appendChild(b);
    });
    grid.appendChild(frag);
  }

  function addTilt(card) {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', `${(x - .5) * 10}deg`);
      card.style.setProperty('--rx', `${(.5 - y) * 8}deg`);
      card.style.setProperty('--gx', `${x * 100}%`);
      card.style.setProperty('--gy', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  }

  function updateChips() {
    const counts = {
      cAll: CAMS.length,
      cWest: CAMS.filter((c) => c.region === 'west').length,
      cCentral: CAMS.filter((c) => c.region === 'central').length,
      cEast: CAMS.filter((c) => c.region === 'east').length,
      cLive: CAMS.filter((c) => c.hls).length,
      cFav: favs.size
    };
    $('#chipFav').hidden = !favs.size;
    Object.entries(counts).forEach(([id, n]) => { $('#' + id).textContent = n; });
    movePill();
  }
  function movePill() {
    const on = $('#chips .chip.is-on');
    const pill = $('#chipPill');
    if (!on) return;
    pill.style.width = on.offsetWidth + 'px';
    pill.style.transform = `translateX(${on.offsetLeft}px)`;
  }
  function setFilter(region) {
    filter = region;
    $$('#chips .chip').forEach((c) => c.classList.toggle('is-on', c.dataset.region === region));
    movePill();
    const on = $('#chips .chip.is-on');
    if (on) on.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' });
    renderGrid();
  }

  function refreshImages() {
    $$('#grid .card').forEach((card) => {
      const cam = camById(card.dataset.id);
      const img = $('.card__img > img', card);
      const r = card.getBoundingClientRect();
      if (cam && r.bottom > -200 && r.top < innerHeight + 200) {
        refreshImg(img, cam, () => img.classList.add('is-loaded'));
      }
    });
    stampRefresh(new Date());
  }

  let lastRefresh = new Date();
  function stampRefresh(now) {
    if (now) lastRefresh = now;
    const time = lastRefresh.toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Athens' });
    $('#lastRefresh').textContent = `· ${t('cams.updated')} ${time}`;
  }

  // ── Regions ─────────────────────────────────────────────
  const regionArt = {
    west: '<svg viewBox="0 0 400 200" preserveAspectRatio="none"><path d="M0 120 L60 70 L110 100 L170 40 L230 95 L290 60 L350 105 L400 80 V200 H0Z" fill="#1a2747" opacity=".8"/><path d="M0 150 C80 140 140 160 200 150 S320 135 400 150 V200 H0Z" fill="#3c5a8a" opacity=".55"/><path d="M0 170 C100 160 180 178 260 168 S360 160 400 170 V200 H0Z" fill="#101a33"/></svg>',
    central: '<svg viewBox="0 0 400 200" preserveAspectRatio="none"><path d="M0 130 L80 100 L150 60 L185 25 L205 45 L230 15 L260 50 L320 90 L400 110 V200 H0Z" fill="#1d2a4f"/><path d="M185 25 L205 45 L230 15 L245 32 L228 40 L205 58 L192 42Z" fill="#e8eeff" opacity=".7"/><path d="M0 165 C90 155 170 172 250 160 S350 150 400 160 V200 H0Z" fill="#0f1a35"/></svg>',
    east: '<svg viewBox="0 0 400 200" preserveAspectRatio="none"><path d="M0 140 L70 120 L130 135 L200 110 L270 128 L340 105 L400 120 V200 H0Z" fill="#17325a" opacity=".85"/><rect x="300" y="78" width="10" height="46" fill="#e8eeff" opacity=".85"/><path d="M296 78 L314 78 L305 66Z" fill="#ffb24a"/><path d="M0 160 C100 152 200 170 300 158 S380 152 400 158 V200 H0Z" fill="#0f1f3d"/></svg>'
  };
  function renderRegions() {
    const box = $('#regionCards');
    box.innerHTML = '';
    const keys = { west: 'rw', central: 'rc', east: 're' };
    ['west', 'central', 'east'].forEach((r, i) => {
      const cams = CAMS.filter((c) => c.region === r);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `region region--${r} reveal`;
      b.style.setProperty('--d', `${i * .12}s`);
      b.innerHTML = `<div class="region__art">${regionArt[r]}</div>
        <div class="region__num">${cams.length}<small>${t('regions.cams')}</small></div>
        <h3></h3><p></p><ul></ul>
        <span class="region__go">${t('regions.go')} ${arrowSvg}</span>`;
      $('h3', b).textContent = t('region.' + r);
      $('p', b).textContent = t(keys[r] + '.text');
      const ul = $('ul', b);
      const shorts = cams.map((c) => L(c.name).split(' – ')[0]);
      cams.forEach((c, j) => {
        const li = document.createElement('li');
        li.textContent = shorts.indexOf(shorts[j]) !== shorts.lastIndexOf(shorts[j]) ? L(c.name).split(' – ')[1] : shorts[j];
        ul.appendChild(li);
      });
      b.addEventListener('click', () => {
        setFilter(r);
        $('#cams').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      });
      box.appendChild(b);
    });
    observeReveals();
  }

  function renderRecords() {
    const recs = [
      ['rec.high', 'agiosathanasios', `${num(1200)} ${m()}`],
      ['rec.olympus', 'litochoro', `${num(2918)} ${m()}`],
      ['rec.first', 'liti', '2022'],
      ['rec.city', 'noth', num(802572), { el: 'Θεσσαλονίκη – Καλαμαριά', en: 'Thessaloniki – Kalamaria' }],
      ['rec.west', 'psarades', '21°E'],
      ['rec.east', 'soufli', '26°E'],
      ['rec.north', 'dikaia', '41.7°N']
    ];
    const ul = $('#dirList');
    ul.innerHTML = '';
    recs.forEach(([k, id, val, label]) => {
      const cam = camById(id);
      if (!cam) return;
      const li = document.createElement('li');
      li.innerHTML = `<button type="button"><span class="mini-compass"><i style="--dir:${cam.dir ?? 0}deg"></i></span><span><small></small><span class="n"></span></span><b></b></button>`;
      $('small', li).textContent = t(k);
      $('.n', li).textContent = L(label || cam.name);
      $('b', li).textContent = val;
      $('button', li).addEventListener('click', () => openViewer(id));
      ul.appendChild(li);
    });
  }

  function renderMarquees() {
    const names = CAMS.map((c) => L(c.name).split(' – ')[0]);
    const strip = $('#stripTrack');
    strip.innerHTML = '';
    [...names, ...names].forEach((n) => { const s = document.createElement('span'); s.textContent = n; strip.appendChild(s); });
    const half = Math.ceil(PARTNERS.length / 2);
    [['#partnersA', PARTNERS.slice(0, half)], ['#partnersB', PARTNERS.slice(half)]].forEach(([sel, list]) => {
      const row = $(sel);
      row.innerHTML = '';
      [...list, ...list, ...list, ...list].forEach((n) => { const s = document.createElement('span'); s.textContent = n; row.appendChild(s); });
    });
  }

  // Camera the hero's "watch live" button opens.
  const featureCam = camById('litochoro') || CAMS.find((c) => c.hls) || CAMS[0];

  // ── Viewer ──────────────────────────────────────────────
  const viewer = $('#viewer');
  let current = null;
  let tab = null;
  let player = null;
  let viewerTimer = null;
  let pushedEntry = false; // whether opening the viewer added a history entry

  function tabsFor(cam) {
    const tabs = [];
    if (cam.hls) tabs.push('live');
    if (cam.windy && !cam.stillOnly) tabs.push('timelapse');
    if (snapOf(cam)) tabs.push('image');
    return tabs;
  }

  function fillViewerText(cam) {
    paintFavButton($('#vFav'), cam);
    paintViewerStatus();
    $('#vName').textContent = L(cam.name);
    $('#vArea').textContent = `${L(cam.area)} · ${t('region.' + cam.region)}`;
    const view = $('#vView');
    const about = $('#vAbout');
    view.textContent = L(cam.view);
    about.textContent = L(cam.about);
    [view, about].forEach((el, i) => { el.classList.remove('reveal-text'); void el.offsetWidth; el.style.animationDelay = `${.1 + i * .1}s`; el.classList.add('reveal-text'); });

    const facts = $('#vFacts');
    facts.innerHTML = '';
    const fact = (html, cls = '') => { const d = document.createElement('div'); d.className = 'fact ' + cls; d.innerHTML = html; facts.appendChild(d); };
    if (cam.dir != null) {
      fact(`<div class="dial"><i class="needle"></i></div><b>${dirName(cam.dir)} · ${cam.dir}°</b><span>${t('f.dir')}</span>`, 'fact--compass');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const n = $('.needle', facts);
        if (n) n.style.transform = `rotate(${cam.dir}deg)`;
      }));
    }
    if (cam.alt) fact(`<b>${num(cam.alt)} ${m()}</b><span>${t('f.alt')}</span>`);
    if (cam.pop) fact(`<b>${num(cam.pop[0])}</b><span>${t('f.pop')}${typeof cam.pop[1] === 'number' ? ` (${cam.pop[1]})` : ''}</span>`);
    if (facts.children.length < 3) fact(`<b>${t('regionShort.' + cam.region)}</b><span>${t('f.region')}</span>`);
    facts.hidden = !facts.children.length;

    const meta = $('#vMeta');
    meta.innerHTML = '';
    const add = (text, href, cls) => {
      const el = document.createElement(href ? 'a' : 'span');
      el.textContent = text;
      if (href) { el.href = href; el.target = '_blank'; el.rel = 'noopener'; }
      if (cls) el.className = cls;
      meta.appendChild(el);
    };
    if (cam.meteo) add(t('v.meteo') + ' ↗', meteoUrl(cam), cam.hls ? '' : 'primary');
    if (cam.host && cam.host.name) add(`${t('v.host')}: ${cam.host.name}`, cam.host.url, 'host');
    if (cam.windy) add(t('v.windy') + ' ↗', `https://windy.com/webcams/${cam.windy}`);
    if (cam.blog) add(t('v.blog') + ' ↗', cam.blog);

    const tabs = $('#vTabs');
    tabs.innerHTML = '';
    tabsFor(cam).forEach((k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = t('tab.' + k);
      b.dataset.tab = k;
      b.className = k === tab ? 'is-on' : '';
      b.setAttribute('role', 'tab');
      b.addEventListener('click', () => showTab(k));
      tabs.appendChild(b);
    });
  }

  function stopMedia() {
    if (player) { player.destroy(); player = null; }
    clearInterval(viewerTimer);
    $('#vMedia').innerHTML = '';
  }

  function message(html) {
    const box = document.createElement('div');
    box.className = 'stage-msg';
    box.innerHTML = `<div>${html}</div>`;
    return box;
  }

  function showTab(k) {
    tab = k;
    $$('#vTabs button').forEach((b) => b.classList.toggle('is-on', b.dataset.tab === k));
    stopMedia();
    const media = $('#vMedia');
    const cam = current;

    if (k === 'live') {
      const video = document.createElement('video');
      video.muted = true; video.playsInline = true; video.autoplay = true; video.controls = true;
      // Show the latest still while the stream connects.
      if (snapOf(cam)) video.poster = bust(snapOf(cam));
      const loading = message(`<div class="spinner"></div><span>${t('v.loading')}</span>`);
      loading.classList.add('stage-msg--overlay');
      media.append(video, loading);
      player = playHls(video, cam.hls, {
        onPlay: () => { loading.remove(); setStatus(cam, 'on'); },
        onRetry: () => { const s = $('span', loading); if (s) s.textContent = t('v.retrying'); },
        onFail: () => {
          setStatus(cam, 'off');
          video.remove();
          loading.classList.remove('stage-msg--overlay');
          loading.innerHTML = `<div><strong>${t('v.fail')}</strong><br>${t('v.failHint')}<br>
            <button class="btn btn--ghost" type="button" data-act="retry">${t('v.retry')}</button>
            ${cam.windy ? `<button class="btn btn--primary" type="button" data-act="tl">${t('tab.timelapse')}</button>` : ''}
            ${cam.meteo ? `<a class="btn btn--ghost" href="${meteoUrl(cam)}" target="_blank" rel="noopener">meteolive.gr ↗</a>` : ''}</div>`;
          loading.addEventListener('click', (e) => {
            const act = e.target.dataset.act;
            if (act === 'retry') showTab('live');
            if (act === 'tl') showTab('timelapse');
          });
        }
      });
    } else if (k === 'timelapse') {
      const f = document.createElement('iframe');
      f.src = windyPlayer(cam.windy);
      f.title = `${L(cam.name)} – Windy time-lapse`;
      f.allow = 'autoplay; fullscreen';
      f.allowFullscreen = true;
      media.appendChild(f);
    } else {
      const img = document.createElement('img');
      img.alt = L(cam.name);
      const fallback = () => media.replaceChildren(message(`${t('v.noimg')}${cam.meteo ? `<br><a class="btn btn--ghost" href="${meteoUrl(cam)}" target="_blank" rel="noopener">meteolive.gr ↗</a>` : ''}`));
      img.onerror = () => {
        const alt = altSnapOf(cam);
        if (alt && !img.dataset.alt) { img.dataset.alt = '1'; img.src = bust(alt); } else fallback();
      };
      img.src = bust(snapOf(cam));
      media.appendChild(img);
      viewerTimer = setInterval(() => refreshImg(img, cam), REFRESH_MS);
    }
  }

  function openViewer(id, { push = true } = {}) {
    const cam = camById(id);
    if (!cam) return;
    current = cam;
    tab = tabsFor(cam)[0];
    fillViewerText(cam);
    if (!viewer.open) viewer.showModal();
    $('#vInfo').scrollTop = 0;
    showTab(tab);
    if (push && location.hash !== '#cam/' + id) { history.pushState({ cam: id }, '', '#cam/' + id); pushedEntry = true; }
  }

  function closeViewer({ pop = false } = {}) {
    stopMedia();
    if (viewer.open) viewer.close();
    current = null;
    // Step back over the entry we added, so the phone's Back button doesn't
    // reopen the camera that was just closed.
    if (!pop && location.hash.startsWith('#cam/')) {
      if (pushedEntry) history.back();
      else history.replaceState(null, '', location.pathname + location.search);
    }
    pushedEntry = false;
  }

  function step(dir) {
    const list = visibleCams().length ? visibleCams() : CAMS;
    let i = list.findIndex((c) => c === current);
    if (i < 0) i = 0;
    const next = list[(i + dir + list.length) % list.length];
    openViewer(next.id, { push: false });
    history.replaceState({ cam: next.id }, '', '#cam/' + next.id);
  }

  function toast(text) {
    const el = $('#toast');
    el.textContent = text;
    el.classList.add('is-on');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove('is-on'), 2200);
  }

  // ── Camera map (Leaflet, loaded only when the map scrolls near) ──
  const LEAFLET = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/';
  const GMAP = 'https://www.google.com/maps/d/viewer?mid=1-yr85x4If6XcXrupLkTw4G6AQViai84';
  const touch = matchMedia('(hover: none)').matches;
  let camMap = null;
  let mapSwitch = null;
  const mapPins = [];

  function loadLeaflet() {
    if (window.L && window.L.map) return Promise.resolve(window.L);
    // Wait for the stylesheet as well, so the map never lays out unstyled.
    const css = new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = LEAFLET + 'leaflet.min.css';
      link.onload = resolve;
      link.onerror = reject;
      document.head.append(link);
    });
    const js = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = LEAFLET + 'leaflet.min.js';
      script.onload = () => (window.L && window.L.map ? resolve(window.L) : reject());
      script.onerror = reject;
      document.head.append(script);
    });
    return Promise.all([js, css]).then(([Lf]) => Lf);
  }

  function pinIcon(Lf, cam) {
    const live = (cam.hls ? ' pin--live' : '') + (camStatus[cam.id] === 'off' ? ' pin--off' : '');
    const beam = cam.dir != null ? `<i class="pin__beam" style="transform: rotate(${cam.dir}deg)"></i>` : '';
    return Lf.divIcon({
      className: 'pin' + live,
      html: `${beam}<i class="pin__dot"></i>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -10],
      tooltipAnchor: [10, 0]
    });
  }

  function pinPopup(cam) {
    const box = document.createElement('div');
    box.className = 'mpop';
    const src = snapOf(cam);
    box.innerHTML = `
      ${src ? '<div class="mpop__img"><img alt=""></div>' : ''}
      <strong class="mpop__name">${L(cam.name)}</strong>
      <span class="mpop__area">${L(cam.area)}${cam.hls ? ` · <b class="mpop__live">LIVE</b>` : ''}</span>
      <button class="mpop__open" type="button">${t('map.open')}</button>`;
    if (src) loadImg($('img', box), cam);
    $('.mpop__open', box).addEventListener('click', () => openViewer(cam.id));
    return box;
  }

  function buildMap(Lf) {
    const box = $('#camMap');
    box.replaceChildren();
    const map = Lf.map(box, {
      zoomSnap: 0.25,
      scrollWheelZoom: false,
      dragging: !touch,
      attributionControl: true,
      maxBounds: [[38.6, 19.0], [42.6, 28.4]],
      maxBoundsViscosity: 0.8,
      minZoom: 6,
      maxZoom: 16
    });
    // Esri basemaps need no API key. Satellite by default; the switch remembers the choice.
    const esri = 'https://server.arcgisonline.com/ArcGIS/rest/services/';
    const tiles = (path, opts = {}) => Lf.tileLayer(`${esri}${path}/MapServer/tile/{z}/{y}/{x}`, { maxZoom: 16, ...opts });
    const credit = 'Tiles &copy; <a href="https://www.esri.com">Esri</a>';
    const styles = {
      sat: Lf.layerGroup([
        tiles('World_Imagery', { attribution: `${credit}, Maxar, Earthstar Geographics` }),
        tiles('Reference/World_Boundaries_and_Places', { pane: 'shadowPane' })
      ]),
      topo: tiles('World_Topo_Map', { attribution: `${credit}, HERE, Garmin, &copy; OpenStreetMap contributors` }),
      dark: Lf.layerGroup([
        tiles('Canvas/World_Dark_Gray_Base', { attribution: `${credit}, HERE, Garmin, &copy; OpenStreetMap contributors` }),
        tiles('Canvas/World_Dark_Gray_Reference', { pane: 'shadowPane' })
      ])
    };
    const saved = store.get('nhe-map');
    let style = Object.hasOwn(styles, saved) ? saved : 'sat';
    styles[style].addTo(map);
    const switcher = Lf.control({ position: 'topright' });
    switcher.onAdd = () => {
      const el = Lf.DomUtil.create('div', 'mapstyle');
      Lf.DomEvent.disableClickPropagation(el);
      const draw = () => {
        el.innerHTML = Object.keys(styles).map((k) =>
          `<button type="button" data-k="${k}" class="${k === style ? 'is-on' : ''}">${t('map.style.' + k)}</button>`).join('');
      };
      el.addEventListener('click', (e) => {
        const k = e.target.closest('button')?.dataset.k;
        if (!k || k === style) return;
        map.removeLayer(styles[style]);
        style = k;
        styles[style].addTo(map);
        store.set('nhe-map', style);
        draw();
      });
      draw();
      el.redraw = draw;
      return el;
    };
    switcher.addTo(map);
    mapSwitch = switcher;
    map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
    const placed = CAMS.filter((c) => c.ll);
    placed.forEach((cam) => {
      const mk = Lf.marker(cam.ll, { icon: pinIcon(Lf, cam), title: L(cam.name), riseOnHover: true }).addTo(map);
      mk.bindTooltip(L(cam.name).split(' – ')[0], { direction: 'right', className: 'pin-label', permanent: true, opacity: 1 });
      mk.on('click', () => {
        // Pins sitting on top of each other: zoom in first so the right one can be picked.
        const at = map.latLngToContainerPoint(cam.ll);
        const crowded = mapPins.some((o) => o.cam !== cam && map.latLngToContainerPoint(o.cam.ll).distanceTo(at) < 22);
        if (crowded && map.getZoom() < 12) { map.closePopup(); map.flyTo(cam.ll, Math.min(map.getZoom() + 2.5, 14), { duration: 0.6 }); return; }
        Lf.popup({ className: 'mpop-wrap', maxWidth: 240, minWidth: 200, autoPanPadding: [20, 70] })
          .setLatLng(cam.ll).setContent(pinPopup(cam)).openOn(map);
      });
      mapPins.push({ mk, cam });
    });
    const fit = () => map.fitBounds(Lf.latLngBounds(placed.map((c) => c.ll)), { padding: [24, 24] });
    fit();
    const labels = () => box.classList.toggle('cammap--labels', map.getZoom() >= 8.5);
    map.on('zoomend', labels);
    labels();
    // On phones one finger scrolls the page; tapping the map unlocks dragging.
    if (touch) {
      $('#mapHint').dataset.i18n = 'map.hintTouch';
      $('#mapHint').textContent = t('map.hintTouch');
      map.on('click', () => { map.dragging.enable(); box.classList.add('is-active'); });
      map.on('popupopen zoomstart', () => { map.dragging.enable(); box.classList.add('is-active'); });
    }
    addEventListener('resize', () => map.invalidateSize());
    camMap = map;
  }

  function mapLang() {
    mapPins.forEach(({ mk, cam }) => {
      mk.setTooltipContent(L(cam.name).split(' – ')[0]);
      mk.getElement()?.setAttribute('title', L(cam.name));
    });
    camMap.closePopup();
    mapSwitch?.getContainer()?.redraw?.();
  }

  function mapFailed() {
    const box = $('#camMap');
    box.classList.add('cammap--fail');
    box.innerHTML = `<a class="cammap__msg" href="${GMAP}" target="_blank" rel="noopener">${t('map.fail')} ↗</a>`;
  }

  function initMap() {
    const box = $('#camMap');
    if (!box) return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      loadLeaflet().then(buildMap).catch(mapFailed);
    };
    if (!('IntersectionObserver' in window)) { start(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) { io.disconnect(); start(); }
    }, { rootMargin: '400px' });
    io.observe(box);
  }

  // ── Lazy third-party embeds ─────────────────────────────
  function loadEmbed(box) {
    if (box.dataset.loaded) return;
    box.dataset.loaded = '1';
    const f = document.createElement('iframe');
    f.src = box.dataset.src;
    f.title = box.dataset.title || '';
    f.loading = 'lazy';
    f.allowFullscreen = true;
    box.replaceChildren(f);
  }

  // ── Motion ──────────────────────────────────────────────
  let revealIO = null;
  function observeReveals() {
    const items = $$('.reveal:not(.in)');
    if (!('IntersectionObserver' in window) || reduced) { items.forEach((el) => el.classList.add('in')); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        revealIO.unobserve(en.target);
        if (en.target.dataset.count != null || en.target.querySelector('[data-count]')) countUp(en.target);
      }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    }
    items.forEach((el) => revealIO.observe(el));
  }

  function countUp(root) {
    $$('[data-count]', root).forEach((el) => {
      const target = +el.dataset.count;
      if (reduced) { el.textContent = target; return; }
      const from = target > 1000 ? target - 120 : 0;
      const t0 = performance.now();
      const dur = 1600;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(from + (target - from) * e);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  function starfield() {
    const c = $('#stars');
    const ctx = c.getContext('2d');
    if (!ctx) return;
    let w, h, stars = [], shoot = null, running = true, dpr = Math.min(devicePixelRatio || 1, 2);
    function size() {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((w * h) / 2600);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h * .8,
        r: Math.random() * 1.2 + .2, a: Math.random(), s: Math.random() * .02 + .004
      }));
    }
    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.a += s.s;
        const o = .35 + Math.abs(Math.sin(s.a)) * .65;
        ctx.globalAlpha = o * (1 - s.y / (h * .9));
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!shoot && Math.random() < .004) shoot = { x: Math.random() * w * .7 + w * .2, y: Math.random() * h * .3, l: 0 };
      if (shoot) {
        shoot.l += 1;
        const len = 90, x = shoot.x - shoot.l * 7, y = shoot.y + shoot.l * 3;
        const g = ctx.createLinearGradient(x, y, x + len, y - len * .43);
        g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.globalAlpha = Math.max(0, 1 - shoot.l / 45);
        ctx.strokeStyle = g; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + len, y - len * .43); ctx.stroke();
        if (shoot.l > 45) shoot = null;
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    size();
    addEventListener('resize', size);
    if (reduced) { frame(); running = false; return; }
    new IntersectionObserver(([en]) => {
      const was = running;
      running = en.isIntersecting && !document.hidden;
      if (running && !was) requestAnimationFrame(frame);
    }).observe($('#hero'));
    requestAnimationFrame(frame);
  }

  function parallax() {
    const layers = [['.range--4', .08], ['.range--3', .16], ['.fog--1', .22], ['.range--2', .26], ['.range--1', .34]]
      .map(([s, f]) => [$(s), f]).filter(([el]) => el);
    let mx = 0, sy = 0, ticking = false;
    const apply = () => {
      ticking = false;
      layers.forEach(([el, f]) => { el.style.translate = `${-mx * f * 40}px ${sy * f}px`; });
    };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
    addEventListener('scroll', () => { sy = Math.min(scrollY, innerHeight); req(); }, { passive: true });
    if (finePointer) addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - .5; req(); }, { passive: true });
  }

  function onScroll() {
    const top = $('#top');
    const bar = $('#progress');
    const tl = $('#timeline');
    let ticking = false;
    const run = () => {
      ticking = false;
      const y = scrollY;
      top.classList.toggle('scrolled', y > 30);
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * .75 - r.top) / r.height));
      tl.style.setProperty('--p', p.toFixed(3));
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    run();

    const links = $$('#nav a');
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((a) => { const s = $(a.getAttribute('href')); if (s) io.observe(s); });
  }

  function magnetic() {
    if (!finePointer || reduced) return;
    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .25}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  function clock() {
    const tick = () => {
      const time = new Date().toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Athens' });
      $('#clock').textContent = (lang === 'el' ? 'Ελλάδα ' : 'Greece ') + time;
    };
    tick();
    setInterval(tick, 15000);
  }

  function intro() {
    const el = $('#intro');
    let seen = false;
    try { seen = sessionStorage.getItem('nhe-intro') === '1'; sessionStorage.setItem('nhe-intro', '1'); } catch { /* noop */ }
    const finish = () => {
      el.classList.add('done');
      $('.hero__title').classList.add('in');
      observeReveals();
    };
    if (reduced || seen || location.hash.startsWith('#cam/')) { el.remove(); finish(); return; }
    setTimeout(finish, 1900);
    setTimeout(() => el.remove(), 2900);
  }

  // ── Language ────────────────────────────────────────────
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    document.title = lang === 'el'
      ? 'Northellas.eyes · Ζωντανές κάμερες καιρού στη Βόρεια Ελλάδα'
      : 'Northellas.eyes · Live weather cams in Northern Greece';
    renderGrid();
    renderRegions();
    renderRecords();
    renderMarquees();
    updateChips();
    if (viewer.open && current) fillViewerText(current);
    if (camMap) mapLang();
    renderGallery();
    stampRefresh();
  }


  // ── Gallery ─────────────────────────────────────────────
  const GALLERY = window.NHE_GALLERY || {};
  const galYears = Object.keys(GALLERY).sort((a, b) => b - a);
  let galYear = galYears[0];
  let lbIndex = 0;
  const galPhotos = () => GALLERY[galYear] || [];
  const galSrc = (p, sm) => `img/gallery/${galYear}/${p.img}${sm ? '-sm' : ''}.webp`;
  const galDate = (p) => {
    const d = new Date(p.at);
    return d.toLocaleDateString(locale(), { day: 'numeric', month: 'long', year: 'numeric' })
      + ' · ' + d.toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  function renderGallery() {
    const years = $('#galYears');
    if (!years || !galYears.length) return;
    years.querySelectorAll('.chip').forEach((c) => c.remove());
    galYears.forEach((y) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (y === galYear ? ' is-on' : '');
      b.dataset.year = y;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', y === galYear);
      b.innerHTML = `<span>${y}</span> <small>${GALLERY[y].length}</small>`;
      years.appendChild(b);
    });
    $('#galGrid').innerHTML = galPhotos().map((p, i) => `
      <button type="button" class="gal__item" data-i="${i}" style="--i:${i}">
        <img src="${galSrc(p, true)}" alt="${L(p.place)}: ${L(p.text)}" loading="lazy" decoding="async">
        <span class="gal__tag gal__tag--${p.tag}">${t('gal.tag.' + p.tag)}</span>
        <span class="gal__cap"><b>${L(p.place)}</b><small>${galDate(p)}</small></span>
        <span class="gal__zoom" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></span>
      </button>`).join('');
    requestAnimationFrame(moveGalPill);
    const lb = $('#lb');
    if (lb && lb.open) fillLightbox();
  }

  function moveGalPill() {
    const on = $('#galYears .chip.is-on');
    const pill = $('#galPill');
    if (!on || !pill) return;
    pill.style.width = on.offsetWidth + 'px';
    pill.style.transform = `translateX(${on.offsetLeft}px)`;
  }

  function fillLightbox(dir = 0) {
    const p = galPhotos()[lbIndex];
    if (!p) return;
    const img = $('#lbImg');
    img.classList.remove('is-in', 'from-l', 'from-r');
    if (dir) img.classList.add(dir > 0 ? 'from-r' : 'from-l');
    img.onload = () => requestAnimationFrame(() => img.classList.add('is-in'));
    img.src = galSrc(p, false);
    img.alt = `${L(p.place)}: ${L(p.text)}`;
    if (img.complete) requestAnimationFrame(() => img.classList.add('is-in'));
    $('#lbTag').textContent = t('gal.tag.' + p.tag);
    $('#lbTag').className = 'gal__tag gal__tag--' + p.tag;
    $('#lbPlace').textContent = L(p.place);
    $('#lbText').textContent = L(p.text);
    $('#lbDate').textContent = galDate(p);
    $('#lbCount').textContent = `${lbIndex + 1} / ${galPhotos().length}`;
    $('#lbLiveText').textContent = t('gal.live');
    $('#lbCam').hidden = !p.cam || !CAMS.some((c) => c.id === p.cam);
    $('#lbClose').setAttribute('aria-label', t('gal.close'));
    const next = galPhotos()[(lbIndex + 1) % galPhotos().length];
    if (next) new Image().src = galSrc(next, false);
  }

  function stepLightbox(d) {
    const n = galPhotos().length;
    if (n < 2) return;
    lbIndex = (lbIndex + d + n) % n;
    fillLightbox(d);
  }

  function openLightbox(i) {
    const lb = $('#lb');
    lbIndex = i;
    fillLightbox();
    if (!lb.open) lb.showModal();
    document.documentElement.classList.add('lb-open');
  }

  function initGallery() {
    const lb = $('#lb');
    if (!lb || !galYears.length) return;
    $('#galYears').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip || chip.dataset.year === galYear) return;
      galYear = chip.dataset.year;
      renderGallery();
    });
    $('#galGrid').addEventListener('click', (e) => {
      const item = e.target.closest('.gal__item');
      if (item) openLightbox(+item.dataset.i);
    });
    addEventListener('resize', moveGalPill);
    lb.addEventListener('close', () => document.documentElement.classList.remove('lb-open'));
    $('#lbClose').addEventListener('click', () => lb.close());
    $('#lbPrev').addEventListener('click', () => stepLightbox(-1));
    $('#lbNext').addEventListener('click', () => stepLightbox(1));
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.id === 'lbStage') lb.close(); });
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') stepLightbox(1);
      else if (e.key === 'ArrowLeft') stepLightbox(-1);
    });
    $('#lbCam').addEventListener('click', () => {
      const p = galPhotos()[lbIndex];
      lb.close();
      if (p && p.cam) openViewer(p.cam);
    });
    let x0 = null, y0 = 0;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) stepLightbox(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) lb.close();
    }, { passive: true });
  }

  // ── Wire up ─────────────────────────────────────────────
  function init() {
    $('#year').textContent = new Date().getFullYear();
    $('#heroCount').textContent = CAMS.length;
    $('#statCams').dataset.count = CAMS.length;

    applyLang();
    intro();
    starfield();
    if (!reduced) parallax();
    onScroll();
    magnetic();
    clock();

    $('#langBtn').addEventListener('click', () => {
      lang = lang === 'el' ? 'en' : 'el';
      store.set('nhe-lang', lang);
      applyLang();
    });

    const burger = $('#burger');
    const nav = $('#nav');
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', open);
      nav.classList.toggle('is-open', open);
    });
    $$('a', nav).forEach((a) => a.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }));

    $('#chips').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (chip) setFilter(chip.dataset.region);
    });
    addEventListener('resize', movePill);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(movePill);
    $('#search').addEventListener('input', (e) => { query = e.target.value; renderGrid(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !viewer.open && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); $('#search').focus(); }
    });

    $('#heroOpen').addEventListener('click', () => openViewer(featureCam.id));

    $('#vClose').addEventListener('click', () => closeViewer());
    viewer.addEventListener('cancel', (e) => { e.preventDefault(); closeViewer(); });
    viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });
    $('#vPrev').addEventListener('click', () => step(-1));
    $('#vNext').addEventListener('click', () => step(1));
    document.addEventListener('keydown', (e) => {
      if (!viewer.open) return;
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
    let touchX = null;
    $('#vStage').addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    $('#vStage').addEventListener('touchend', (e) => {
      if (touchX == null || tab === 'timelapse') return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
      touchX = null;
    });
    $('#vFull').addEventListener('click', () => {
      const el = $('#vStage');
      const video = $('#vMedia video');
      if (document.fullscreenElement) document.exitFullscreen();
      else if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
      else if (video && video.webkitEnterFullscreen) video.webkitEnterFullscreen();
    });
    $('#vFav').addEventListener('click', () => { if (current) toggleFav(current); });
    $('#vShare').addEventListener('click', async () => {
      const url = location.href;
      if (navigator.share) {
        try { await navigator.share({ title: `${L(current.name)} · Northellas.eyes`, url }); } catch { /* cancelled */ }
      } else {
        try { await navigator.clipboard.writeText(url); toast(t('v.share')); } catch { /* blocked */ }
      }
    });

    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { loadEmbed(en.target); io.unobserve(en.target); }
      }), { rootMargin: '300px' })
      : null;
    $$('.embed').forEach((box) => {
      $('.embed__load', box).addEventListener('click', () => loadEmbed(box));
      if (io) io.observe(box);
    });

    initMap();
    initGallery();

    window.addEventListener('popstate', routeFromHash);
    routeFromHash();

    setInterval(refreshImages, REFRESH_MS);
    checkStatus();
    setInterval(checkStatus, STATUS_MS);
    stampRefresh(new Date());
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') { refreshImages(); if (Date.now() - lastCheck > 60000) checkStatus(); }
    });
  }

  function routeFromHash() {
    const m = location.hash.match(/^#cam\/([\w-]+)/);
    if (m) openViewer(m[1], { push: false });
    else if (viewer.open) closeViewer({ pop: true });
  }

  init();
})();
