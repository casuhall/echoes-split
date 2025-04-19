/**
 * Représentation d'un objet
 * @class Objet
 */
class Objet {
  /**
   * Nom de l'objet.
   * @type string
   * @memberof Objet
   */
  nom;
  /**
   * Valeur unitaire de l'objet.
   * @type number
   * @memberof Objet
   */
  valeur;
  /**
   * Creates an instance of Objet.
   * @param {string} nom
   * @param {number} valeur Valeur unitaire de l'objet.
   * @memberof Objet
   */
  constructor(nom, valeur) {
    this.nom = nom;
    this.valeur = valeur;
  }
  toString() {
    return `${this.nom}\tx${this.valeur}`
  }
};

/**
 * Une pile d'objets
 * @class Pile
 */
class Pile {
  /**
   * ype d'objet empilé
   * @type Objet
   * @memberof Pile
   */
  objet;

  /**
   * Quantité d'objets dans la Pile
   * @type number
   * @memberof Pile
   */
  quantite = 0;

  /**
   * Initialisation d'une pile d'objet
   * @param {string} nom_objet nom de l'objet dans la pile
   * @param {number} quantite nombre d'objets empilés
   * @param {number} valeur_pile valeur totale de la pile
   * @memberof Pile
   */
  constructor(nom_objet, quantite, valeur_pile) {
    if (!nom_objet) throw new IllegalArgumentException("Il est obligatoire de fournir le nom de l'objet empilé.");
    if (!quantite) throw new IllegalArgumentException("Il est obligatoire de fournir une quantité d'objet empilé.");
    if (!valeur_pile) throw new IllegalArgumentException("Il est obligatoire de fournir la valeur totale de la pile.");
    this.objet = new Objet(nom_objet, valeur_pile / quantite);
    this.quantite = quantite;
  }
  /**
   * Creates an instance of Pile.
   * @param {Object} objet
   * @param {number} [quantite=1]
   * @memberof Pile
   */
  constructor(objet, quantite = 1) {
    if (!objet) throw new IllegalArgumentException("Il est obligatoire de fournir l'objet de base de la pile.");
    this.objet = objet;
    this.quantite = quantite;
  }
  /**
   * Dépiler les ojets
   * @returns {Array<Objet>} Liste d'objets unitaires correspondant à la pile
   * @memberof Pile
   */
  depiler() {
    let result = new Array(this.quantite);
    for (let i = 0; i < this.quantite; i++) result.push(this.objet);
    return result;
  }
  /**
   * Rajouter un/des objet(s) à la pile.
   *
   * @param {Objet} objet
   * @param {number} [quantite=1]
   * @memberof Pile
   */
  empiler(objet,quantite = 1){
    if (!objet) throw new IllegalArgumentException("Il est obligatoire de fournir l'objet à empiler.");
    if (objet.nom !== this.objet.nom) throw new IllegalArgumentException("Il est impossible d'empiler des objets de nature différentes.");
    if (objet.valeur !== this.objet.valeur) throw new IllegalArgumentException("Un même objet ne peut avoir plusieurs valeurs différentes.");
    this.quantite+=quantite;
  }
  toString() {
    return `${this.nom}\tx${this.quantite}\t${this.quantite * this.objet.valeur}`
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

/** Distribution de butins 
*/
class Distribution {

  /** liste des participants 
   *  @type {Array<Participant>}
   */
  _participants = [];

  /** liste des participants 
  *  @type {number}
  */
  cagnotte = 0;

  /**
   * Initialisation d'une distribution à partir d'une liste de participants
   * @param {Array.<string>} participants 
   */
  constructor(participants) {
    if (participants && participants.length > 0)
      participants.forEach(nom => {
        if (nom)
          this._participants.push(new Participant(nom));
      });
    else
      throw new IllegalArgumentException("au moins un participant attendu");
  };

  /**
   * Obtention du participant possédant le butin distribué de plus faible valeur cumulée.
   * @returns {Participant}
   */
  _pauvreParticipant() {
    // obtention du participant ayant la valeur de butin cumulée la plus faible possible
    let pauvre;
    this._participants.forEach(p => {
      if (!pauvre || pauvre._valeur_cumulee > p._valeur_cumulee)
        pauvre = p
    });
    return pauvre;
  };

  /**
   * Distribuer de façon équitable une liste d'objet aux participants de la distribution
   * @param {Array<Pile>} butin 
   */
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

  /**
   * Mise en forme du résultat de la distribution.
   * @returns résultat de la distribution mis en forme
   */
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

export { Distribution, Pile };
