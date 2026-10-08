/*
 * Camera catalogue for Northellas.eyes.
 * Texts come from the camera pages of https://northellaseyes.blogspot.com/ ("Τι βλέπουμε;" → view, "Επίσης..." → about).
 *
 *   hls    – direct live stream (played in-page with hls.js / native HLS)
 *   windy  – Windy webcam id (live snapshot + time-lapse player)
 *   snap   – direct snapshot image when the camera has one outside Windy
 *   meteo  – page slug on meteolive.gr (their own live player)
 *   stillOnly – show only the still image (no time-lapse tab); for cameras without a live stream
 *   ll     – [latitude, longitude] of the camera, from the original Google My Maps camera map
 *   dir    – compass bearing the camera looks towards, in degrees
 *   alt    – camera / village altitude in metres
 *   pop    – population and census year
 *
 * To turn any camera into in-page live video, add its alphastream playlist as `hls`.
 */
window.NHE_CAMS = [
  // ── Δυτική Μακεδονία ──────────────────────────────────────────
  {
    id: 'psarades', region: 'west', ll: [40.8285759, 21.0292886], dir: 285, hls: 'https://mediacp.alphastream.eu/psarades/index.m3u8',
    snap: 'https://cams.elaticam.com/output/psarades/webcamimage.jpg', windy: 1683478857, meteo: 'psarades', pop: [100, 'καλοκαίρι'],
    name: { el: 'Ψαράδες – Πρέσπες', en: 'Psarades – Prespes' },
    area: { el: 'Φλώρινα', en: 'Florina' },
    view: {
      el: 'Μπροστά μας βλέπουμε το ακριτικό χωριό των Ψαράδων στις Πρέσπες και κομμάτι της λίμνης! Στο βάθος είναι το όρος Malì i Thatë που ανήκει στην Αλβανία, με υψόμετρο 2.287 μέτρα. Λίγο πιο δεξιά και πίσω από αυτό το βουνό είναι η λίμνη της Οχρίδας!',
      en: 'In front of us is the border village of Psarades at Prespes and part of the lake. In the distance rises Mali i Thatë in Albania, 2,287 m high. A little to the right, behind that mountain, lies Lake Ohrid.'
    },
    about: {
      el: 'Οι Ψαράδες είναι ορεινός παραδοσιακός οικισμός στο βορειοδυτικό άκρο του νομού Φλώρινας, στη νότια όχθη της Μεγάλης Πρέσπας, 59 χλμ. βορειοδυτικά της Φλώρινας. Μέχρι το 1928 ονομαζόταν Νίβιτσι. Τους χειμερινούς μήνες κατοικείται από 60 άτομα και το καλοκαίρι από 100. Κύρια πηγή εισοδήματος είναι η αλιεία, η κτηνοτροφία (με τη σπάνια βραχυκερατική φυλή αγελάδων) και ο τουρισμός. Είναι το μοναδικό ελληνικό χωριό στις όχθες της Μεγάλης Πρέσπας.',
      en: 'Psarades is a traditional mountain settlement at the north-western tip of Florina prefecture, on the southern shore of Lake Megali Prespa, 59 km north-west of Florina. Until 1928 it was called Nivitsi. About 60 people live here in winter and 100 in summer, making a living from fishing, livestock (including the rare short-horned cattle breed) and tourism. It is the only Greek village on the shores of Megali Prespa.'
    },
    host: { name: 'Casa di Cardellino', url: 'https://www.facebook.com/CasadiCardellino/' },
    blog: 'https://northellaseyes.blogspot.com/2023/05/psarades-prespes-florina-camera.html'
  },
  {
    id: 'kastoria', region: 'west', ll: [40.5218713, 21.2738511], hls: 'https://mediacp.alphastream.eu/kastoria/index.m3u8',
    windy: 1675614049, meteo: 'kastoria', dir: 315,
    name: { el: 'Ντολτσό Καστοριάς', en: 'Doltso, Kastoria' },
    area: { el: 'Καστοριά', en: 'Kastoria' },
    view: {
      el: 'Η κάμερα έχει βορειοδυτικό προσανατολισμό. Μπροστά μας βλέπουμε τη βόρεια παραλία της Καστοριάς (λίμνη Ορεστιάδα) και το βουνό «Ψαλίδα» με υψόμετρο 1.095μ. Στα αριστερά διακρίνουμε το αρχοντικό Τζώτζα και στα δεξιά, στο βάθος, την περιοχή της Χλόης!',
      en: 'The camera faces north-west. In front of us is the north shore of Kastoria on Lake Orestiada and Mount Psalida (1,095 m). On the left stands the Tzotzas mansion and far right lies the Chloi area.'
    },
    about: {
      el: 'Η Καστοριά, χτισμένη σε χερσόνησο της λίμνης Ορεστιάδας, είναι γνωστή για τα βυζαντινά της εκκλησάκια, τα αρχοντικά της και τη γουνοποιία. Η λίμνη φιλοξενεί πλήθος πουλιών και παγώνει τους πιο κρύους χειμώνες.',
      en: 'Kastoria, built on a peninsula in Lake Orestiada, is known for its Byzantine chapels, its old mansions and its fur trade. The lake is home to many birds and freezes over in the coldest winters.'
    },
    host: { name: 'Hotel Kastoria', url: '' },
    blog: 'https://northellaseyes.blogspot.com/2023/02/kastoria-kamera.html'
  },
  {
    id: 'kastorialake', region: 'west', ll: [40.5125, 21.279], hls: 'https://mediawp.alphastream.eu/kastoria/kastoria/playlist.m3u8',
    windy: 1760738363, meteo: 'kastoria',
    name: { el: 'Λίμνη Καστοριάς', en: 'Lake Kastoria' },
    area: { el: 'Καστοριά', en: 'Kastoria' },
    view: {
      el: 'Ζωντανή εικόνα από τη λίμνη Ορεστιάδα της Καστοριάς.',
      en: 'Live view of Lake Orestiada in Kastoria.'
    },
    about: {
      el: 'Η λίμνη Ορεστιάδα περιβάλλει την Καστοριά από τρεις πλευρές. Είναι προστατευόμενη περιοχή Natura 2000, φιλοξενεί πελεκάνους, κύκνους και πολλά άλλα πουλιά και τους πιο κρύους χειμώνες παγώνει.',
      en: 'Lake Orestiada surrounds Kastoria on three sides. It is a protected Natura 2000 area, home to pelicans, swans and many other birds, and it freezes over in the coldest winters.'
    },
    host: { name: '', url: '' }
  },
  {
    id: 'nestorio', region: 'west', ll: [40.4094424, 21.0633327], hls: 'https://mediacp.alphastream.eu/nestorio/index.m3u8',
    snap: 'https://cams.elaticam.com/output/nestorio/webcamimage.jpg', meteo: 'nestorio', dir: 45, alt: 890,
    name: { el: 'Νεστόριο', en: 'Nestorio' },
    area: { el: 'Καστοριά', en: 'Kastoria' },
    view: {
      el: 'Η κάμερα έχει βορειοανατολικό προσανατολισμό. Μπροστά μας φαίνεται το Κάτω Νεστόριο και ο ποταμός Αλιάκμονας, και στο βάθος αριστερά το όρος Βίτσι στην Καστοριά. Στο αριστερό μέρος της εικόνας, μέσα στο χωριό, διακρίνουμε τον Ιερό Ναό Κοιμήσεως της Θεοτόκου.',
      en: 'The camera faces north-east. In front of us are Kato Nestorio and the Aliakmonas river, with Mount Vitsi in Kastoria far left. On the left side of the picture, inside the village, stands the Church of the Dormition of the Virgin.'
    },
    about: {
      el: 'Το Νεστόριο είναι χωριό της Περιφερειακής Ενότητας Καστοριάς, 25 χλμ. νοτιοδυτικά της Καστοριάς. Χωρίζεται σε Άνω και Κάτω Νεστόριο. Το Κάτω Νεστόριο φτάνει μέχρι τον Αλιάκμονα και βρίσκεται σε πλαγιά του Γράμμου, σε υψόμετρο 890 μέτρων. Κάθε καλοκαίρι φιλοξενεί το γνωστό River Party.',
      en: 'Nestorio is a village in the Kastoria regional unit, 25 km south-west of Kastoria. It is split into Ano and Kato Nestorio. Kato Nestorio reaches down to the Aliakmonas, on a slope of Mount Grammos at 890 m. Every summer it hosts the well-known River Party.'
    },
    host: { name: '', url: '' },
    blog: 'https://northellaseyes.blogspot.com/2025/03/blog-post.html'
  },
  {
    id: 'florina', region: 'west', ll: [40.7780824, 21.4064385], hls: 'https://mediawp.alphastream.eu/florina/florina/playlist.m3u8',
    windy: 1793907840, meteo: 'florinacity', alt: 678, dir: 158,
    name: { el: 'Φλώρινα', en: 'Florina' },
    area: { el: 'Πόλη', en: 'City' },
    view: {
      el: 'Η κάμερα βλέπει την πόλη της Φλώρινας με κατεύθυνση νότια-νοτιοανατολική και βρίσκεται σε υψόμετρο 678 μέτρων. Στα δεξιά της εικόνας ξεχωρίζει ο Σταυρός της πόλης, ιδιαίτερα τις νυχτερινές ώρες!',
      en: 'The camera looks south-south-east over the town of Florina from 678 m. On the right of the picture the town’s hilltop Cross stands out, especially at night.'
    },
    about: {
      el: 'Η Φλώρινα, η πόλη του Σακουλέβα, είναι χτισμένη στις όχθες του ποταμού και στους πρόποδες του Βαρνούντα. Είναι από τις πιο κρύες πόλεις της Ελλάδας και ο χειμώνας της, με τα χιόνια και τις φωτιές των Χριστουγέννων, είναι ξακουστός.',
      en: 'Florina sits on the banks of the Sakoulevas river at the foot of Mount Varnountas. It is one of the coldest towns in Greece, famous for its snowy winters and its Christmas Eve bonfires.'
    },
    host: { name: 'Phaidon Hotel', url: 'https://phaidonhotel.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2023/04/florina-camera.html'
  },
  {
    id: 'xinonero', region: 'west', ll: [40.6902579, 21.6232138], dir: 115, hls: 'https://mediacp.alphastream.eu/xinonero/index.m3u8',
    snap: 'https://cams.elaticam.com/output/xinonero/webcamimage.jpg', windy: 1669560756, meteo: 'xinonero', alt: 550, pop: [1081, 2011],
    name: { el: 'Ξινό Νερό', en: 'Xino Nero' },
    area: { el: 'Φλώρινα', en: 'Florina' },
    view: {
      el: 'Στα αριστερά βλέπουμε το Αμύνταιο και το κτήμα Άλφα. Ευθεία, στο βάθος, φαίνεται το όρος Βέρμιο, και από τη δεξιά μεριά ο ΑΗΣ Αμυνταίου και το όρος Άσκιο στην Πτολεμαΐδα.',
      en: 'On the left are Amyntaio and the Alpha estate. Straight ahead in the distance is Mount Vermio, and on the right the Amyntaio power station and Mount Askio near Ptolemaida.'
    },
    about: {
      el: 'Το Ξινό Νερό, παλαιότερα Εξί Σου και Άνω Βέρπιανη, είναι χωριό του Δήμου Αμυνταίου στη Φλώρινα. Είναι χτισμένο σε υψόμετρο 550 μέτρων και είναι ένα από τα κεφαλοχώρια του νομού. Σύμφωνα με την απογραφή του 2011 έχει 1.081 κατοίκους, που ασχολούνται κυρίως με τη γεωργία και την κτηνοτροφία. Απέχει 34 χλμ. από τη Φλώρινα και 5 από το Αμύνταιο.',
      en: 'Xino Nero, formerly Exi Sou and Ano Verpiani, is a village in the Amyntaio municipality of Florina. Built at 550 m, it is one of the main villages of the prefecture, with 1,081 residents in the 2011 census who mostly farm and raise livestock. It is 34 km from Florina and 5 km from Amyntaio.'
    },
    host: { name: 'meteolive.gr', url: 'https://www.meteolive.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2022/11/xino-nero-florina-camera.html'
  },
  {
    id: 'kastania', region: 'west', ll: [40.1745938, 22.0223649], hls: 'https://mediawp.alphastream.eu/kastaniacam/kastaniacam/playlist.m3u8',
    windy: 1753028277, meteo: 'kastaniacam', alt: 966, dir: 335,
    name: { el: 'Καστανιά Σερβίων', en: 'Kastania Servion' },
    area: { el: 'Κοζάνη', en: 'Kozani' },
    view: {
      el: 'Βρισκόμαστε στην Παλιά Καστανιά στα Σέρβια Κοζάνης, σε υψόμετρο 966μ. Μπροστά μας φαίνεται μέρος του χωριού και στο βάθος μεγάλο μέρος της λίμνης Πολυφύτου. Στο κέντρο της εικόνας η γέφυρα των Σερβίων και πιο πίσω, λίγο αριστερά, η πόλη της Κοζάνης!',
      en: 'We are in Old Kastania above Servia in Kozani, at 966 m. In front of us is part of the village and beyond it much of Lake Polyfytos. In the centre is the Servia bridge, and further back, slightly left, the city of Kozani.'
    },
    about: {
      el: 'Το χωριό είναι καλοχτισμένο και πυκνοκατοικημένο σε μια απότομη πετρώδη πλαγιά με πρόσοψη προς τον βορρά. Η θέση του προσφέρει πανοραμική θέα στην τεχνητή λίμνη Πολυφύτου, με κεντρικό σημείο την Υψηλή Γέφυρα Σερβίων. Το 1995 ένας σεισμός προκάλεσε σοβαρές ζημιές σε πολλά σπίτια του χωριού.',
      en: 'The village is tightly built on a steep, rocky, north-facing slope, with a panoramic view of the man-made Lake Polyfytos and its High Bridge of Servia. In 1995 an earthquake badly damaged many of its houses.'
    },
    host: { name: '', url: '' },
    blog: 'https://northellaseyes.blogspot.com/2025/07/Kastania-Servia-Kozani-Camera.html'
  },
  {
    id: 'neraida', region: 'west', ll: [40.2391024, 21.9674823], hls: 'https://mediacp.alphastream.eu/neraidacam/index.m3u8',
    windy: 1657478253, meteo: 'neraida', dir: 125,
    name: { el: 'Νεράιδα', en: 'Neraida' },
    area: { el: 'Λίμνη Πολυφύτου, Κοζάνη', en: 'Lake Polyfytos, Kozani' },
    view: {
      el: 'Η κάμερα έχει νοτιοανατολικό προσανατολισμό. Στο βάθος φαίνονται τα Πιέρια όρη με κορυφή το Φλάμπουρο (2.193μ), στα αριστερά το Βελβεντό και στα δεξιά, πίσω από τη γέφυρα, τα Σέρβια. Ακριβώς μπροστά μας είναι η λίμνη Πολυφύτου με τη διάσημη γέφυρα των Σερβίων!',
      en: 'The camera faces south-east. In the distance are the Pierian mountains with Flambouro peak (2,193 m), Velvento on the left and Servia behind the bridge on the right. Right in front of us is Lake Polyfytos with the famous Servia bridge.'
    },
    about: {
      el: 'Η Νεράιδα είναι παραλίμνιος οικισμός του Δήμου Σερβίων–Βελβεντού στην Κοζάνη. Βρίσκεται στο κέντρο της λίμνης Πολυφύτου, ψηλά στον λόφο της Νεράιδας, και στα όριά του περνά η γέφυρα Σερβίων–Νεράιδας της εθνικής οδού Λάρισας–Κοζάνης. Απέχει 6 χλμ. από τα Σέρβια.',
      en: 'Neraida is a lakeside settlement in the Servia–Velvento municipality of Kozani. It sits high on Neraida hill in the middle of Lake Polyfytos, right by the Servia–Neraida bridge on the Larissa–Kozani road, 6 km from Servia.'
    },
    host: { name: 'River Cafe Bar', url: '' },
    blog: 'https://northellaseyes.blogspot.com/2022/07/neraida-kozani-camera.html'
  },

  // ── Κεντρική Μακεδονία ────────────────────────────────────────
  {
    id: 'fotina', region: 'central', ll: [40.2204401, 22.3138468], hls: 'https://mediacp.alphastream.eu/foteina/index.m3u8',
    windy: 1656105641, snap: 'https://cams.elaticam.com/output/fotina/webcamimage.jpg', meteo: 'fotina',
    dir: 155, pop: [396, 2011],
    name: { el: 'Όλυμπος – Φωτεινά', en: 'Olympus – Fotina' },
    area: { el: 'Πιερία', en: 'Pieria' },
    view: {
      el: 'Η κάμερα έχει νοτιοανατολικό προσανατολισμό. Μπροστά μας φαίνεται κομμάτι από το χωριό των Φωτεινών και ο Όλυμπος, με τις κορυφές από αριστερά προς δεξιά: Προφήτης Ηλίας (2.802μ), Στεφάνι (2.909μ), Μύτικας (2.918μ) και Σκολιό (2.911μ)!',
      en: 'The camera faces south-east. In front of us is part of Fotina village and Mount Olympus with, from left to right, Profitis Ilias (2,802 m), Stefani (2,909 m), Mytikas (2,918 m) and Skolio (2,911 m).'
    },
    about: {
      el: 'Τα Φωτεινά είναι ορεινό χωριό της Πιερίας και ανήκουν διοικητικά στον Δήμο Κατερίνης, 20 χλμ. από την πόλη. Η Τοπική Κοινότητα Φωτεινών έχει 396 κατοίκους σύμφωνα με την απογραφή του 2011.',
      en: 'Fotina is a mountain village in Pieria, part of the Katerini municipality, 20 km from the town. The Fotina community had 396 residents in the 2011 census.'
    },
    host: { name: 'meteolive.gr', url: 'https://www.meteolive.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2022/06/fotina-pieria-camera.html'
  },
  {
    id: 'panteleimonas', region: 'central', ll: [40.0034254, 22.5898999], hls: 'https://mediacp.alphastream.eu/panteleimonas2/index.m3u8',
    snap: 'https://cams.elaticam.com/output/panteleimonas/webcamimage.jpg', windy: 1656359959, meteo: 'panteleimonas', dir: 0,
    name: { el: 'Όλυμπος Νότια', en: 'Olympus South' },
    area: { el: 'Νέος Παντελεήμονας, Πιερία', en: 'Neos Panteleimonas, Pieria' },
    view: {
      el: 'Η κάμερα κοιτάζει βόρεια. Αριστερά βλέπουμε τον Όλυμπο και στους πρόποδές του το Λιτόχωρο.',
      en: 'The camera faces north. On the left is Mount Olympus with Litochoro at its foot.'
    },
    about: {
      el: 'Ο Παλαιός Παντελεήμονας απέχει 43 χλμ. από την Κατερίνη και μόλις 6 χλμ. από το χωριό και την παραλία του Νέου Παντελεήμονα. Η θέα του Θερμαϊκού από εδώ είναι μοναδική. Το μονοπάτι προς το χωριό περνά μέσα από δάσος με καστανιές, βελανιδιές και κουμαριές του κάτω Ολύμπου. Το καλοκαίρι μπορείτε να παρακολουθήσετε τις εκδηλώσεις του Φεστιβάλ Ολύμπου στο Κάστρο του Πλαταμώνα.',
      en: 'Old Panteleimonas is 43 km from Katerini and just 6 km from the village and beach of Neos Panteleimonas. The view over the Thermaic Gulf is unique. The path to the village runs through lower-Olympus forest of chestnut, oak and strawberry trees. In summer the Olympus Festival holds events at Platamonas Castle.'
    },
    host: { name: 'Chalet Castello', url: 'https://www.chaletcastello.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2022/06/neos-panteleimonas-camera.html'
  },
  {
    id: 'platamonas', region: 'central', ll: [40.0034254, 22.5915], hls: 'https://mediacp.alphastream.eu/penteleimonas1/index.m3u8',
    snap: 'https://cams.elaticam.com/output/panteleimonasb/webcamimage.jpg', windy: 1656360060, meteo: 'panteleimonas', dir: 70,
    name: { el: 'Κάστρο Πλαταμώνα', en: 'Platamonas Castle' },
    area: { el: 'Νέος Παντελεήμονας, Πιερία', en: 'Neos Panteleimonas, Pieria' },
    view: {
      el: 'Η κάμερα κοιτάζει ανατολικά. Βλέπουμε το βυζαντινό κάστρο του Πλαταμώνα και απέναντι την πόλη της Θεσσαλονίκης!',
      en: 'The camera faces east. We see the Byzantine castle of Platamonas and, across the gulf, the city of Thessaloniki.'
    },
    about: {
      el: 'Ο Παλαιός Παντελεήμονας απέχει 43 χλμ. από την Κατερίνη και μόλις 6 χλμ. από το χωριό και την παραλία του Νέου Παντελεήμονα. Η θέα του Θερμαϊκού από εδώ είναι μοναδική. Το μονοπάτι προς το χωριό περνά μέσα από δάσος με καστανιές, βελανιδιές και κουμαριές του κάτω Ολύμπου. Το καλοκαίρι μπορείτε να παρακολουθήσετε τις εκδηλώσεις του Φεστιβάλ Ολύμπου στο Κάστρο του Πλαταμώνα.',
      en: 'Old Panteleimonas is 43 km from Katerini and just 6 km from the village and beach of Neos Panteleimonas. The view over the Thermaic Gulf is unique. The path to the village runs through lower-Olympus forest of chestnut, oak and strawberry trees. In summer the Olympus Festival holds events at Platamonas Castle.'
    },
    host: { name: 'Chalet Castello', url: 'https://www.chaletcastello.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2022/06/neos-panteleimonas-camera.html'
  },
  {
    id: 'katerini', region: 'central', ll: [40.2742921, 22.5413063], hls: 'https://mediacp.alphastream.eu/peristasi/index.m3u8',
    snap: 'https://cams.elaticam.com/output/peristasi/webcamimage.jpg', windy: 1655651149, meteo: 'peristasi', dir: 250,
    name: { el: 'Κατερίνη', en: 'Katerini' },
    area: { el: 'Περίσταση, Πιερία', en: 'Peristasi, Pieria' },
    view: {
      el: 'Η κάμερα έχει δυτικό προσανατολισμό. Στα δεξιά της εικόνας βλέπουμε μέρος της πόλης της Κατερίνης και στα αριστερά τον Όλυμπο!',
      en: 'The camera faces west. On the right is part of the town of Katerini and on the left Mount Olympus.'
    },
    about: {
      el: 'Η κάμερα βρίσκεται στο χωριό Περίσταση, που ιδρύθηκε ως Νέα Περίστασις μετά το 1922 από πρόσφυγες της Περίστασης της Ανατολικής Θράκης (σημερινό Σάρκιοϊ). Αργότερα εγκαταστάθηκαν και Πόντιοι και Βλάχοι. Στην Κατοχή εκτελέστηκαν από τους Ναζί 14 κάτοικοι. Εδώ βρισκόταν η έδρα του στρατοπέδου των Νεοζηλανδών Συμμάχων, και από το 1947 έως το 1950 ήρθαν κάτοικοι από τα Σκοτεινά, που είχαν πληγεί στον Εμφύλιο.',
      en: 'The camera is in the village of Peristasi, founded as Nea Peristasis after 1922 by refugees from Peristasi in Eastern Thrace (today’s Şarköy). Pontic Greeks and Vlachs later settled here too. During the Occupation the Nazis executed 14 villagers. The camp of the New Zealand Allied troops was based here, and between 1947 and 1950 people from Skotina, hit during the Civil War, moved in.'
    },
    host: { name: 'meteolive.gr', url: 'https://www.meteolive.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2022/06/Peristasi-Pieria-Camera.html'
  },
  {
    id: 'litochoro', region: 'central', ll: [40.102816, 22.5026609], hls: 'https://mediawp.alphastream.eu/enipeas/enipeas/playlist.m3u8',
    windy: 1750789009, meteo: 'olympusview', featured: true, dir: 260, alt: 295, pop: [6664, 2021],
    name: { el: 'Λιτόχωρο – Olympus View', en: 'Litochoro – Olympus View' },
    area: { el: 'Πιερία', en: 'Pieria' },
    view: {
      el: 'Μπροστά μας βλέπουμε το φαράγγι του Ενιπέα και τον ποταμό που το διασχίζει. Στο βάθος, ανάμεσα από τις πλαγιές του φαραγγιού, ξεχωρίζουμε την κορυφή του Ολύμπου Μύτικα (2.918μ) και το Στεφάνι (2.911μ)!',
      en: 'In front of us is the Enipeas gorge and the river that runs through it. Far back, between the gorge’s walls, rise the Olympus summits of Mytikas (2,918 m) and Stefani.'
    },
    about: {
      el: 'Κατεύθυνση και υψόμετρο κάμερας: 300° WNW, 295μ. Το Λιτόχωρο είναι πόλη της Πιερίας με 6.664 κατοίκους (απογραφή 2021). Βρίσκεται στο νότιο τμήμα του νομού, στις ανατολικές απολήξεις του Ολύμπου, 23 χλμ. από την Κατερίνη και 92 χλμ. από τη Θεσσαλονίκη. Είναι η αφετηρία για την ανάβαση στον Όλυμπο και για το μονοπάτι του φαραγγιού του Ενιπέα.',
      en: 'Camera bearing and altitude: 300° WNW, 295 m. Litochoro is a town in Pieria with 6,664 residents (2021 census). It lies in the south of the prefecture on the eastern foothills of Olympus, 23 km from Katerini and 92 km from Thessaloniki, and is the starting point for climbing Olympus and for the Enipeas gorge trail.'
    },
    host: { name: 'Olympus View', url: '' },
    blog: 'https://northellaseyes.blogspot.com/2025/04/olympus-view-olympus-view-litochoro.html'
  },
  {
    id: 'nokat', region: 'central', ll: [40.261872, 22.5958987], hls: 'https://mediacp.alphastream.eu/katerini/index.m3u8',
    windy: 1592169533, meteo: 'katerini', dir: 90,
    name: { el: 'Ναυτικός Όμιλος Κατερίνης', en: 'Katerini Nautical Club' },
    area: { el: 'Παραλία Κατερίνης', en: 'Paralia Katerinis' },
    view: {
      el: 'Η κάμερα έχει ανατολικό προσανατολισμό. Μπροστά μας έχουμε τον Θερμαϊκό κόλπο και ακριβώς απέναντι τα παράλια της Χαλκιδικής!',
      en: 'The camera faces east. In front of us is the Thermaic Gulf, and right across the water the coast of Chalkidiki.'
    },
    about: {
      el: 'Ο Ναυτικός Όμιλος Κατερίνης, σχεδόν έξι δεκαετίες μετά την ίδρυσή του, παραμένει το μοναδικό ενεργό ναυταθλητικό σωματείο της Πιερίας, ενός νομού με ακτές πάνω από 70 χλμ., από τους Νέους Πόρους ως τη Μεθώνη και το Δέλτα του Αλιάκμονα. Από τις τάξεις του αναδείχθηκαν κορυφαίοι αθλητές ιστιοπλοΐας και κωπηλασίας: η Κατερίνα Νικολαΐδου (4η στο Ρίο 2016, δύο φορές πρωταθλήτρια Ευρώπης), ο Ολυμπιονίκης Κώστας Καρυώτης, ο Θωμάς Καραμήτρος και ο Νίκος Κακούρης. Ο Όμιλος οργανώνει καθαρισμούς ακτών, σεμινάρια θαλάσσιας έρευνας και διάσωσης και συμμετέχει στο πρόγραμμα «Δρόμος του Δελφινιού» με το Λιμεναρχείο Κατερίνης.',
      en: 'Almost sixty years after it was founded, the Katerini Nautical Club is still the only active water-sports club in Pieria, whose coast runs for more than 70 km from Neoi Poroi to Methoni and the Aliakmonas delta. It has produced some of Greece’s best sailors and rowers: Katerina Nikolaidou (4th at Rio 2016, twice European champion), Olympic medallist Kostas Karyotis, Thomas Karamitros and Nikos Kakouris. The club runs beach clean-ups and sea search-and-rescue seminars, and takes part in the “Dolphin’s Path” programme with the Katerini Port Authority.'
    },
    host: { name: 'ΝΟΚΑΤ', url: 'http://nokat.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2022/06/naftikos-omilos-katerini-camera.html'
  },
  {
    id: 'neoiporoi', region: 'central', ll: [39.9784856, 22.6517343], hls: 'https://mediacp.alphastream.eu/neoiporoi/index.m3u8',
    windy: 1687203265, meteo: 'neoiporoi', dir: 305, pop: [733, 2011],
    name: { el: 'Νέοι Πόροι', en: 'Neoi Poroi' },
    area: { el: 'Πιερία', en: 'Pieria' },
    view: {
      el: 'Η νοτιότερη ακτή της Πιερίας από ψηλά, με βορειοδυτικό προσανατολισμό προς τις παραλίες και τον Όλυμπο.',
      en: 'Pieria’s southernmost beach seen from above, looking north-west along the coast towards Olympus.'
    },
    about: {
      el: 'Οι Νέοι Πόροι είναι παραθαλάσσιο χωριό της Πιερίας με 733 κατοίκους (απογραφή 2011). Η κύρια ασχολία είναι ο τουρισμός. Είναι χτισμένοι με πολεοδομικό σχέδιο, με μεγάλους δρόμους και πλατείες, 43 χλμ. από την Κατερίνη. Η ακτή τους είναι η νοτιότερη της Πιερίας, δίπλα στον παραδοσιακό οικισμό των Παλαιών Πόρων και στον υδροβιότοπο του βόρειου Δέλτα του Πηνειού.',
      en: 'Neoi Poroi is a seaside village in Pieria with 733 residents (2011 census) that lives mainly from tourism. It is laid out on a town plan with wide streets and squares, 43 km from Katerini. Its beach is the southernmost in Pieria, next to the traditional village of Palaioi Poroi and the wetlands of the northern Pineios delta.'
    },
    host: { name: 'Πάνω Απ’ Όλα', url: '' },
    blog: 'https://northellaseyes.blogspot.com/2023/06/neoi-poroi-pieria-camera.html'
  },
  {
    id: 'makrigialos', region: 'central', ll: [40.4107636, 22.6102982], hls: 'https://mediacp.alphastream.eu/makrigialos/index.m3u8',
    snap: 'https://cams.elaticam.com/output/makrigialos/webcamimage.jpg', windy: 1658340425, meteo: 'makrigialos', dir: 65, pop: [1851, 2001],
    name: { el: 'Μακρύγιαλος', en: 'Makrygialos' },
    area: { el: 'Πιερία', en: 'Pieria' },
    view: {
      el: 'Η κάμερα έχει βορειοανατολικό προσανατολισμό. Στο βάθος αριστερά φαίνεται η πόλη της Θεσσαλονίκης και ο Χορτιάτης (1.201μ), και στο κέντρο η Νέα Μηχανιώνα!',
      en: 'The camera faces north-east. Far left are the city of Thessaloniki and Mount Chortiatis (1,201 m), and in the centre Nea Michaniona.'
    },
    about: {
      el: 'Ο Μακρύγιαλος είναι μεγάλος οικισμός στις βόρειες ακτές της Πιερίας, έδρα του Δήμου Μεθώνης, με 1.851 κατοίκους (απογραφή 2001). Είναι τουριστικό και αλιευτικό κέντρο, με κατοίκους Πόντιους, Καταφυγιώτες και Βλάχους που ασχολούνται με ελιές, σιτηρά, μύδια και αλιεία. Το 1993 ανακαλύφθηκε εδώ νεολιθικός οικισμός. Απέχει 21 χλμ. από την Κατερίνη και περιλαμβάνει και την Αρχαία Πύδνα!',
      en: 'Makrygialos is a large settlement on the north coast of Pieria and seat of the Methoni municipality, with 1,851 residents (2001). It is a tourist and fishing centre whose Pontic, Katafygiot and Vlach families grow olives and grain and farm mussels. A Neolithic settlement was found here in 1993. It is 21 km from Katerini and includes ancient Pydna.'
    },
    host: { name: 'Cafe Bar DALI', url: 'https://www.facebook.com/cafebarDALI.club' },
    blog: 'https://northellaseyes.blogspot.com/2022/07/makrigialos-pieria-camera.html'
  },
  {
    id: 'naousa', region: 'central', ll: [40.6264778, 22.0650719], hls: 'https://mediacp.alphastream.eu/naousa/index.m3u8',
    windy: 1700423980, meteo: 'naousa', dir: 40,
    name: { el: 'Νάουσα', en: 'Naousa' },
    area: { el: 'Ημαθία', en: 'Imathia' },
    view: {
      el: 'Η κάμερα έχει βορειοανατολικό προσανατολισμό και βλέπουμε τους νομούς Ημαθίας και Πέλλας. Στο βάθος φαίνεται το όρος Πάικο (1.650μ) και τα Γιαννιτσά!',
      en: 'The camera faces north-east over the Imathia and Pella plain. In the distance are Mount Paiko (1,650 m) and Giannitsa.'
    },
    about: {
      el: 'Η Νάουσα, επίσημα η Ηρωική Πόλη της Νάουσας, ανήκει στην Κεντρική Μακεδονία και είναι χτισμένη στους πρόποδες του Βερμίου. Είναι ορεινή πόλη και, βάσει της τελευταίας απογραφής, το μεγαλύτερο ορεινό αστικό κέντρο της Ελλάδας.',
      en: 'Naousa, officially the Heroic City of Naousa, is in Central Macedonia at the foot of Mount Vermio. According to the latest census it is the largest mountain town in Greece.'
    },
    host: { name: 'meteolive.gr', url: 'https://www.meteolive.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2023/11/naousa-imathias-camera.html'
  },
  {
    id: 'derveni', region: 'central', ll: [40.713456, 22.9626469], windy: 1656018135, stillOnly: true, meteo: 'derveni', dir: 70,
    name: { el: 'Δερβένι', en: 'Derveni' },
    area: { el: 'Θεσσαλονίκη', en: 'Thessaloniki' },
    view: {
      el: 'Η κάμερα έχει ανατολικό προσανατολισμό. Στο βάθος, στο κέντρο, διακρίνεται το όρος Βερτίσκος (1.103μ). Τα χωριά που φαίνονται είναι ο Λαγκαδάς, τα Λαγυνά και το Περιβολάκι, και στα δεξιά η λίμνη Κορώνεια!',
      en: 'The camera faces east. In the centre, far off, is Mount Vertiskos (1,103 m). The villages in view are Lagkadas, Lagyna and Perivolaki, with Lake Koroneia on the right.'
    },
    about: {
      el: 'Το Δερβένι είναι τοποθεσία ανάμεσα στην Ευκαρπία και τα Λαγυνά, περίπου 10 χλμ. βορειοανατολικά της Θεσσαλονίκης. Εδώ βρίσκεται αρχαιολογικός χώρος με νεκρόπολη της αρχαίας Λητής, όπου βρέθηκαν ο Πάπυρος του Δερβενίου, το αρχαιότερο σωζόμενο βιβλίο της Ευρώπης, και ο Κρατήρας του Δερβενίου.',
      en: 'Derveni lies between Efkarpia and Lagyna, about 10 km north-east of Thessaloniki. It has an archaeological site with a cemetery of ancient Liti, where the Derveni Papyrus, Europe’s oldest surviving book, and the Derveni Krater were found.'
    },
    host: { name: 'meteolive.gr', url: 'https://www.meteolive.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2022/06/derveni-thessaloniki-camera.html'
  },
  {
    id: 'noth', region: 'central', ll: [40.5880005, 22.9419695], hls: 'https://mediacp.alphastream.eu/kalamaria/index.m3u8',
    snap: 'https://cams.elaticam.com/output/kalamaria/webcamimage.jpg', windy: 1664117000, meteo: 'thessaloniki', dir: 330,
    name: { el: 'Καλαμαριά', en: 'Kalamaria' },
    area: { el: 'Ναυτικός Όμιλος Θεσσαλονίκης', en: 'Thessaloniki Nautical Club' },
    view: {
      el: 'Η κάμερα έχει βορειοδυτικό προσανατολισμό. Στο κέντρο ξεχωρίζει το εκκλησάκι του Αγίου Νικολάου, στο βάθος δεξιά το κέντρο της Θεσσαλονίκης, ο Λευκός Πύργος και τα κάστρα της πόλης, και στην άκρη δεξιά το Μέγαρο Μουσικής!',
      en: 'The camera faces north-west. St Nicholas chapel stands out in the centre; far right are the city centre, the White Tower and the castle walls, with the Concert Hall at the right edge.'
    },
    about: {
      el: 'Ο Ν.Ο.Θ. ιδρύθηκε το 1931 με αρχικό σκοπό την κωπηλασία. Στα τέλη της δεκαετίας του ’40 έγινε πολυαθλητικός όμιλος και συμμετείχε με πληρώματά του στους Ολυμπιακούς Αγώνες του Λονδίνου το 1948 και του Ελσίνκι το 1952. Μέχρι σήμερα έχει κατακτήσει πολλές φορές τον τίτλο του Πολυνίκη Ομίλου, στελεχώνει συνεχώς την Εθνική Ομάδα και έχει παγκόσμιες διακρίσεις.',
      en: 'The Thessaloniki Nautical Club was founded in 1931 as a rowing club. By the late 1940s it had become a multi-sport club, sending crews to the London 1948 and Helsinki 1952 Olympics. It has since won the overall club title many times, keeps supplying the national team and has world-level results.'
    },
    host: { name: 'ΝΟΘ', url: 'http://ncth.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2022/09/thessaloniki-camera-nof.html'
  },
  {
    id: 'kerkini', region: 'central', ll: [41.1369701, 23.2159981], hls: 'https://mediacp.alphastream.eu/kerkini/index.m3u8',
    snap: 'https://cams.elaticam.com/output/kerkini/webcamimage.jpg', windy: 1656959415, meteo: 'kerkini', dir: 30,
    name: { el: 'Λιθότοπος – Κερκίνη', en: 'Lithotopos – Kerkini' },
    area: { el: 'Σέρρες', en: 'Serres' },
    view: {
      el: 'Η κάμερα έχει βορειοανατολικό προσανατολισμό. Μπροστά μας είναι η λίμνη Κερκίνη και στο βάθος, από αριστερά προς δεξιά, το Μπέλες (2.029μ), ο Όρβηλος (2.212μ) και ο Λαϊλιάς (1.849μ)!',
      en: 'The camera faces north-east. In front of us is Lake Kerkini and on the horizon, from left to right, Mount Beles (2,029 m), Orvilos (2,212 m) and Lailias (1,849 m).'
    },
    about: {
      el: 'Η Κερκίνη δημιουργήθηκε το 1932, όταν χτίστηκε το φράγμα στον Στρυμόνα στην περιοχή του Λιθότοπου, και χρησιμοποιήθηκε για την άρδευση της πεδιάδας των Σερρών. Θαυμασμό προκαλούν τα παραποτάμια δάση, τα νούφαρα, οι βουβάλια και η ποικιλία ψαριών και πουλιών στον υδροβιότοπο.',
      en: 'Lake Kerkini was created in 1932 when a dam was built on the Strymonas river at Lithotopos, to irrigate the Serres plain. Its riverside forests, water lilies, water buffalo and wealth of fish and birds make it one of Greece’s great wetlands.'
    },
    host: { name: 'Hotel Erodios', url: 'https://hotel-erodios.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2022/07/kerkini-camera.html'
  },
  {
    id: 'liti', region: 'central', ll: [40.7504039, 22.9764851], hls: 'https://mediacp.alphastream.eu/liti/index.m3u8',
    snap: 'https://cams.elaticam.com/output/liti/webcamimage.jpg', windy: 1654960490, meteo: 'liti', dir: 100,
    name: { el: 'Λητή', en: 'Liti' },
    area: { el: 'Θεσσαλονίκη', en: 'Thessaloniki' },
    view: {
      el: 'Η κάμερα έχει ανατολικό προσανατολισμό. Αριστερά και στο βάθος φαίνεται ο Βερτίσκος και ο Λαγκαδάς, και στα δεξιά ο Χορτιάτης!',
      en: 'The camera faces east. Far left are Mount Vertiskos and Lagkadas, and on the right Mount Chortiatis.'
    },
    about: {
      el: 'Η πρώτη κάμερα του δικτύου, από τις 15 Ιουνίου 2022. Η Λητή χτίστηκε πάνω στα ερείπια της ομώνυμης αρχαίας πόλης, στο κεντρικό τμήμα του νομού Θεσσαλονίκης. Την άποψη ότι η αρχαία πόλη βρισκόταν βορειοανατολικά της Θεσσαλονίκης ενισχύει και η λεγόμενη Ληταία Πύλη στα δυτικά τείχη της πόλης.',
      en: 'The network’s first camera, running since 15 June 2022. Liti was built on the ruins of the ancient city of the same name, in the middle of Thessaloniki prefecture. The Litaia Gate in Thessaloniki’s western walls supports the view that the ancient city lay north-east of Thessaloniki.'
    },
    host: { name: 'meteolive.gr', url: 'https://www.meteolive.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2022/06/Liti-Thessaloniki-camera.html'
  },
  {
    id: 'afytos', region: 'central', ll: [40.1006701, 23.437202], hls: 'https://mediacp.alphastream.eu/afytos/index.m3u8',
    windy: 1703709525, meteo: 'afytos', dir: 90, pop: [1273, 2011],
    name: { el: 'Άφυτος', en: 'Afytos' },
    area: { el: 'Χαλκιδική', en: 'Chalkidiki' },
    view: {
      el: 'Μπροστά μας βλέπουμε τον Τορωναίο κόλπο. Απέναντι, στα αριστερά, βρίσκεται η Νικήτη και στο κέντρο διακρίνεται ο Νέος Μαρμαράς.',
      en: 'In front of us is the Toroneos Gulf. Across the water Nikiti is on the left and Neos Marmaras in the centre.'
    },
    about: {
      el: 'Η Άφυτος είναι παραθαλάσσιος οικισμός και έδρα ομώνυμης τοπικής κοινότητας στον Δήμο Κασσάνδρας της Χαλκιδικής. Σύμφωνα με την απογραφή του 2011 έχει 1.273 κατοίκους και έκταση 23,46 χμ². Είναι γνωστή για τα πέτρινα σπίτια και τον γραφικό πεζόδρομο πάνω από τη θάλασσα.',
      en: 'Afytos is a seaside village and community seat in the Kassandra municipality of Chalkidiki, with 1,273 residents (2011) over 23.46 km². It is known for its stone houses and its lane above the sea.'
    },
    host: { name: 'On The Rocks', url: '' },
    blog: 'https://northellaseyes.blogspot.com/2023/12/afytos-halkidiki-camera.html'
  },
  {
    id: 'palaiochori', region: 'central', ll: [40.4924792, 23.6464073], hls: 'https://mediacp.alphastream.eu/palaiochori/index.m3u8',
    snap: 'https://cams.elaticam.com/output/palaiochori/webcamimage.jpg', windy: 1710740714, meteo: 'palaiochori', alt: 550, dir: 240,
    name: { el: 'Παλαιοχώρι', en: 'Palaiochori' },
    area: { el: 'Χαλκιδική', en: 'Chalkidiki' },
    view: {
      el: 'Το όμορφο χωριό του Παλαιοχωρίου στην ορεινή Χαλκιδική στο κέντρο της εικόνας. Στο βάθος φαίνεται ο Χολομώντας και στα δεξιά ξεχωρίζει ένα κομμάτι της Αρναίας!',
      en: 'The pretty village of Palaiochori in mountainous Chalkidiki fills the centre of the picture. Mount Cholomontas rises behind, and part of Arnaia shows on the right.'
    },
    about: {
      el: 'Το Παλαιοχώρι βρίσκεται στη βορειοανατολική Χαλκιδική, στον Χολομώντα, σε υψόμετρο περίπου 550 μέτρων, στο κέντρο του τριγώνου που σχηματίζει με τα γειτονικά χωριά, 3 χλμ. από το Νεοχώρι.',
      en: 'Palaiochori lies in north-east Chalkidiki on Mount Cholomontas, at about 550 m, in the middle of a triangle of neighbouring villages, 3 km from Neochori.'
    },
    host: { name: 'meteolive.gr', url: 'https://www.meteolive.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2024/03/Paleochori.html'
  },
  {
    id: 'ouranoupoli', region: 'central', ll: [40.3259371, 23.9811678], dir: 215, hls: 'https://mediawp.alphastream.eu/ouranoupoli/ouranoupoli/playlist.m3u8',
    snap: 'https://cams.elaticam.com/output/ouranoupoli/image.jpg', meteo: 'ouranoupoli',
    name: { el: 'Ουρανούπολη', en: 'Ouranoupoli' },
    area: { el: 'Χαλκιδική', en: 'Chalkidiki' },
    view: {
      el: 'Μπροστά μας βλέπουμε το λιμάνι της Ουρανούπολης και τον χαρακτηριστικό Βυζαντινό Πύργο του Προσφορίου! Στα δεξιά ένα μικρό κομμάτι της Αμμουλιανής, και στο βάθος το δεύτερο πόδι της Χαλκιδικής και το όρος Ίταμος (811μ).',
      en: 'In front of us are Ouranoupoli harbour and its landmark Byzantine Tower of Prosforion. On the right is a small part of Ammouliani island, and in the distance the Sithonia peninsula and Mount Itamos (811 m).'
    },
    about: {
      el: 'Η Ουρανούπολη είναι παραθαλάσσιο χωριό της Χαλκιδικής και η κύρια πύλη εισόδου για το Άγιο Όρος. Βρίσκεται στη βορειοδυτική πλευρά της χερσονήσου του Άθω και είναι ο τελευταίος κατοικημένος οικισμός πριν από τον Άθω.',
      en: 'Ouranoupoli is a seaside village in Chalkidiki and the main gateway to Mount Athos. It sits on the north-west side of the Athos peninsula and is the last inhabited village before the monastic state.'
    },
    host: { name: 'Ouranoupoli Sunset Hotel', url: 'https://www.ouranoupolisunsethotel.gr/' },
    blog: 'https://northellaseyes.blogspot.com/2024/04/ouranoupoli-chalkidiki-camera.html'
  },
  {
    id: 'agiosathanasios', region: 'central', ll: [40.8409702, 21.770073], dir: 10, hls: 'https://mediacp.alphastream.eu/agios/index.m3u8',
    snap: 'https://cams.elaticam.com/output/agios/webcamimage.jpg', meteo: 'agiosathanasios', alt: 1200,
    name: { el: 'Παλιός Άγιος Αθανάσιος', en: 'Old Agios Athanasios' },
    area: { el: 'Καϊμάκτσαλαν, Πέλλα', en: 'Kaimaktsalan, Pella' },
    view: {
      el: 'Μπροστά μας βλέπουμε τον Παλιό Άγιο Αθανάσιο και μέρος του όρους Καϊμάκτσαλαν.',
      en: 'In front of us are Old Agios Athanasios and part of Mount Kaimaktsalan.'
    },
    about: {
      el: 'Ο Άγιος Αθανάσιος είναι ορεινό χωριό της Πέλλας, πολύ κοντά στα σύνορα με τη Βόρεια Μακεδονία. Είναι χτισμένος σε υψόμετρο 1.200 μέτρων στις πλαγιές του Καϊμάκτσαλαν και έχει χαρακτηριστεί παραδοσιακός οικισμός από το 1992. Τον χειμώνα γεμίζει από επισκέπτες του χιονοδρομικού κέντρου.',
      en: 'Agios Athanasios is a mountain village in Pella, very close to the border with North Macedonia. It is built at 1,200 m on the slopes of Kaimaktsalan and has been a protected traditional settlement since 1992. In winter it fills with visitors to the ski resort.'
    },
    host: { name: 'Αστέρας του Βορρά', url: '' },
    blog: 'https://northellaseyes.blogspot.com/2024/05/palios-agios-athanasios-camera.html'
  },

  // ── Ανατολική Μακεδονία & Θράκη ───────────────────────────────
  {
    id: 'alexfaros', region: 'east', ll: [40.8452, 25.8775], hls: 'https://mediacp.alphastream.eu/alexandro/index.m3u8',
    windy: 1686575524, meteo: 'alexandroupolis', dir: 170,
    name: { el: 'Αλεξανδρούπολη – Φάρος', en: 'Alexandroupoli – Lighthouse' },
    area: { el: 'Έβρος', en: 'Evros' },
    view: {
      el: 'Στα αριστερά βλέπουμε τον επιβλητικό φάρο της πόλης και μέρος του λιμανιού, στο βάθος το Θρακικό Πέλαγος, και στα δεξιά, με καθαρό ουρανό, ξεχωρίζει το νησί της Ίμβρου!',
      en: 'On the left are the town’s imposing lighthouse and part of the harbour, beyond them the Thracian Sea, and on the right, on clear days, the island of Imvros.'
    },
    about: {
      el: 'Ο Φάρος της Αλεξανδρούπολης κατασκευάστηκε τον 19ο αιώνα από τη γαλλική Εταιρεία Φάρων και Φανών της Μεσογείου, με σύμβαση με την τότε οθωμανική κυβέρνηση. Χτίστηκε στο σημερινό λιμάνι για να διευκολύνει την ακτοπλοΐα και τους ναυτικούς που ταξίδευαν προς τον Ελλήσποντο. Σήμερα είναι το σύμβολο της πόλης.',
      en: 'The Alexandroupoli lighthouse was built in the 19th century by the French Mediterranean Lighthouse Company under a contract with the Ottoman government, to guide sailors heading for the Dardanelles. Today it is the symbol of the town.'
    },
    host: { name: 'Lighthouse Apartments', url: 'https://www.booking.com/hotel/gr/red-lady-bug.el.html' },
    blog: 'https://northellaseyes.blogspot.com/2023/06/alexandroupolis-thraki-live-camera.html'
  },
  {
    id: 'alexport', region: 'east', ll: [40.8476765, 25.8744762], hls: 'https://mediawp.alphastream.eu/alexandroupoli/alexandroupoli/playlist.m3u8',
    windy: 1762793055, meteo: 'alexandroupoli', dir: 75, pop: [64109, ''],
    name: { el: 'Αλεξανδρούπολη – Λιμάνι', en: 'Alexandroupoli – Port' },
    area: { el: 'Έβρος', en: 'Evros' },
    view: {
      el: 'Η κάμερα βλέπει το λιμάνι της Αλεξανδρούπολης, με θέαση 75° ανατολικά-βορειοανατολικά (ENE).',
      en: 'The camera looks over Alexandroupoli harbour, facing 75° east-north-east (ENE).'
    },
    about: {
      el: 'Η Αλεξανδρούπολη είναι πόλη της Θράκης και πρωτεύουσα της Περιφερειακής Ενότητας Έβρου, με 64.109 κατοίκους. Είναι η μεγαλύτερη σε έκταση και πληθυσμό πόλη της Θράκης και της Ανατολικής Μακεδονίας και Θράκης, σημαντικό λιμάνι και εμπορικό κέντρο της βορειοανατολικής Ελλάδας, σε στρατηγική θέση που ενώνει την Ευρώπη με την Ασία.',
      en: 'Alexandroupoli is a city in Thrace and capital of the Evros regional unit, with 64,109 residents. It is the largest city of Eastern Macedonia and Thrace, an important port and trading centre of north-east Greece, in a strategic spot linking Europe with Asia.'
    },
    host: { name: '', url: '' },
    blog: 'https://northellaseyes.blogspot.com/2025/11/Alexandroupolis-Port-Thraki-live-camera.html'
  },
  {
    id: 'soufli', region: 'east', ll: [41.1943171, 26.2992535], hls: 'https://mediacp.alphastream.eu/soufli/index.m3u8',
    snap: 'https://cams.elaticam.com/output/soufli/webcamimage.jpg', windy: 1656527141, meteo: 'soufli', dir: 90,
    name: { el: 'Σουφλί', en: 'Soufli' },
    area: { el: 'Έβρος', en: 'Evros' },
    view: {
      el: 'Μπροστά μας βλέπουμε το ανατολικό κομμάτι της κωμόπολης του Σουφλίου και στο βάθος τον ποταμό Έβρο και την Τουρκία!',
      en: 'In front of us is the eastern part of the town of Soufli, and in the distance the Evros river and Turkey.'
    },
    about: {
      el: 'Το Σουφλί, έδρα του ομώνυμου δήμου, βρίσκεται 67 χλμ. βορειοανατολικά της Αλεξανδρούπολης και 47 χλμ. νοτιοδυτικά της Ορεστιάδας, στην ανατολική πλευρά του λόφου του Προφήτη Ηλία, από τα τελευταία υψώματα της Ροδόπης. Το κέντρο απέχει 500 μέτρα από τον Έβρο. Είναι γνωστό για τη βιομηχανία μεταξιού που αναπτύχθηκε από τα μέσα του 19ου αιώνα. Σήμερα δραστηριοποιούνται ξανά 65 σηροτρόφοι και λίγες οικοτεχνίες, που κρατούν ζωντανή την παράδοση.',
      en: 'Soufli, seat of its municipality, lies 67 km north-east of Alexandroupoli and 47 km south-west of Orestiada, on the eastern side of Profitis Ilias hill, one of the last foothills of the Rhodope range. The centre is 500 m from the Evros. It is known for the silk industry that grew here from the mid-19th century; today 65 silkworm farmers and a few workshops keep the tradition alive.'
    },
    host: { name: 'Δημοτικό Μουσείο Σουφλίου', url: '' },
    blog: 'https://northellaseyes.blogspot.com/2022/06/soufli-evros-camera.html'
  },
  {
    id: 'dikaia', region: 'east', ll: [41.7058978, 26.2955972], hls: 'https://mediacp.alphastream.eu/dikaia/index.m3u8',
    windy: 1656360169, meteo: 'dikaia', dir: 135, pop: [561, 2011],
    name: { el: 'Δίκαια', en: 'Dikaia' },
    area: { el: 'Έβρος', en: 'Evros' },
    view: {
      el: 'Η κάμερα έχει νοτιοανατολικό προσανατολισμό. Στα δεξιά διακρίνουμε το Γενικό Λύκειο Δικαίων και στα αριστερά, πίσω από τα δέντρα, το υπαίθριο αμφιθέατρο Δικαίων.',
      en: 'The camera faces south-east. On the right is the Dikaia high school and on the left, behind the trees, the Dikaia open-air amphitheatre.'
    },
    about: {
      el: 'Τα Δίκαια είναι οικισμός του Δήμου Ορεστιάδας στον Έβρο, με 561 κατοίκους (2011). Μέχρι το 2011 ήταν έδρα του Δήμου Τριγώνου. Πήραν το όνομά τους από την αρχαία Δίκαια, πόλη του 6ου αιώνα π.Χ. κοντά στη λίμνη Βιστωνίδα, που κατά τον Στέφανο Βυζάντιο ιδρύθηκε από τον Δίκαιο, γιο του Ποσειδώνα, και που αναφέρει ο Ηρόδοτος στην πορεία του στρατού του Ξέρξη το 480 π.Χ.',
      en: 'Dikaia is a village in the Orestiada municipality of Evros, with 561 residents (2011), and was the seat of the Trigono municipality until 2011. It takes its name from ancient Dikaia, a 6th-century BC city near Lake Vistonida which, according to Stephanus of Byzantium, was founded by Dikaios, son of Poseidon, and which Herodotus mentions on the march of Xerxes’ army in 480 BC.'
    },
    host: { name: 'Χρήστος Ματουσίδης', url: '' },
    blog: 'https://northellaseyes.blogspot.com/2022/06/dikaia-evros-camera.html'
  }
];

/* Businesses and people that support the network (from the blog sidebar). */
window.NHE_PARTNERS = [
  'Αστέρας του Βορρά Chalet', 'Lithos Hotel', 'Phaidon Hotel', 'Σείριος Νεστόριο', 'Olympus View',
  'On The Rocks Άφυτος', 'Red Grape Adventures', 'Πάνω Απ’ Όλα', 'Ναυτικός Όμιλος Θεσσαλονίκης',
  'Lighthouse Apartments', 'ΝΟΚΑΤ', 'Cafe Bar DALI', 'Φαρμακείο Μαλάμου Αρετή', 'Hotel Erodios',
  'River Cafe Bar', 'Hotel Kastoria', 'Chalet Castello', 'Ouranoupoli Sunset Hotel',
  'Casa di Cardellino', 'Δημοτικό Μουσείο Σουφλίου', 'Χρήστος Ματουσίδης', 'meteolive.gr'
];
