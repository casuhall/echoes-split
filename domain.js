class Objet {
  ordre;
  nom;
  valeur;
  quantite = 0;
  constructor(ordre, nom, valeur) {
    this.ordre = ordre;
    this.nom = nom;
    this.valeur = valeur;
  }
  toString() {
    return `#${this.ordre}\t${this.nom}\tx${this.quantite}`
  }
};

class Participant {

  _nom;

  _butin = new Map();

  _valeur_cumulee = 0.0;

  constructor(nom) {
    if (typeof nom === 'string' || nom instanceof String)
      this._nom = nom;
    else throw new IllegalArgumentException("Chaine de carractères atendu.");
  };

  attribuer(objet) {
    let b = this._butin.get(objet.nom);
    if (!b) this._butin.set(objet.nom, b = new Objet(objet.ordre, objet.nom, objet.valeur));
    b.quantite++;
    this._valeur_cumulee += objet.valeur;
  };

  toString() {
    let resultat = new String();
    let tmp = [...this._butin.values()].sort((a, b) => a.ordre - b.ordre);
    tmp.forEach((v) => {
      resultat += `${v.toString()}\n`;
    });
    return resultat;
  }
};

class Distribution {

  _participants = [];
  cagnotte = 0;

  constructor(participants) {
    if (participants)
      participants.forEach(nom => {
        if (nom)
          this._participants.push(new Participant(nom));
      });
  };

  _pauvreParticipant() {
    // obtention du participant ayant la valeur de butin cumulée la plus faible possible
    let pauvre;
    this._participants.forEach(p => {
      if (!pauvre || pauvre._valeur_cumulee > p._valeur_cumulee)
        pauvre = p
    });
    return pauvre;
  };

  distribuer(butin) {
    // trier le butin par ordre décroissant de valeur
    let butin_trie = new Array(...butin);
    butin_trie.sort((a, b) => b.valeur - a.valeur);
    // pour chaque objet dans l'ordre, attribuer au participant le plus pauvre et augmenter la cagnotte.
    butin_trie.forEach(objet => {
      this._pauvreParticipant().attribuer(objet);
      this.cagnotte += objet.valeur;
    });
  };

  toString() {
    let resultat = new String();
    this._participants.forEach(p => {
      resultat += ` ##### ${p._nom} $${p._valeur_cumulee.toLocaleString()} (${(p._valeur_cumulee - (this.cagnotte / this._participants.length)).toLocaleString()})

${p.toString()}
`
    });
    return resultat;
  };
};

export { Distribution };
