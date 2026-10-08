// Photo gallery: moments captured by the network's cameras, grouped by year.
// Add a photo: put <name>.webp (1600px wide) and <name>-sm.webp (720px) in img/gallery/<year>/,
// then add an entry below. `cam` links the photo to the live camera; `at` is local Greek time.
window.NHE_GALLERY = {
  2022: [
    { img: 'liti', cam: 'liti', at: '2022-09-17T19:08', tag: 'storm',
      place: { el: 'Λητή, Θεσσαλονίκη', en: 'Liti, Thessaloniki' },
      text: { el: 'Ένα τεράστιο «ράφι» καταιγίδας σκεπάζει τον κάμπο πάνω από τη Λητή.', en: 'A huge shelf cloud rolls over the plain above Liti.' } },
    { img: 'soufli', cam: 'soufli', at: '2022-01-12T10:53', tag: 'snow',
      place: { el: 'Σουφλί, Έβρος', en: 'Soufli, Evros' },
      text: { el: 'Χιονισμένο πρωινό στο Σουφλί, δίπλα στις γραμμές του τρένου.', en: 'A snowy morning in Soufli, next to the railway line.' } },
    { img: 'dikaia', cam: 'dikaia', at: '2022-02-03T07:24', tag: 'snow',
      place: { el: 'Δίκαια, Έβρος', en: 'Dikaia, Evros' },
      text: { el: 'Η Δίκαια ξυπνά κάτω από ένα λευκό πάπλωμα χιονιού.', en: 'Dikaia wakes up under a white blanket of snow.' } },
    { img: 'panteleimonas', cam: 'panteleimonas', at: '2022-03-09T06:35', tag: 'snow',
      place: { el: 'Νέος Παντελεήμονας, Πιερία', en: 'Neos Panteleimonas, Pieria' },
      text: { el: 'Χιονοθύελλα πριν το ξημέρωμα, με τα φώτα να λάμπουν μέσα στην ομίχλη.', en: 'A blizzard before dawn, with lights glowing through the fog.' } },
    { img: 'derveni', cam: 'derveni', at: '2022-08-24T20:15', tag: 'storm',
      place: { el: 'Δερβένι, Θεσσαλονίκη', en: 'Derveni, Thessaloniki' },
      text: { el: 'Σύννεφα καταιγίδας απλώνονται πάνω από τον κάμπο της Θεσσαλονίκης.', en: 'Storm clouds spread over the Thessaloniki plain.' } },
    { img: 'makrigialos', cam: 'makrigialos', at: '2022-09-06T07:05', tag: 'sunrise',
      place: { el: 'Μακρύγιαλος, Πιερία', en: 'Makrygialos, Pieria' },
      text: { el: 'Ο ήλιος ανατέλλει πάνω από τον Θερμαϊκό, κάτω από βαριά σύννεφα.', en: 'The sun rises over the Thermaic Gulf beneath heavy clouds.' } }
  ]
};
