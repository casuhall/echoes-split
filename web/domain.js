/**
 * Représentation d'un objet physique.
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
    return `${this.nom}\t$${this.valeur}`
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
   * @param {number} valeur_pile valeur totale de la pile
   * @param {number} quantite nombre d'objets empilés
   * @memberof Pile
   */
  constructor(nom_objet, valeur_pile, quantite = 1) {
    if (!nom_objet) throw new Error("Il est obligatoire de fournir le nom de l'objet empilé.");
    if (!valeur_pile) throw new Error("Il est obligatoire de fournir la valeur totale de la pile.");
    if (!quantite || quantite <= 0 || !Number.isInteger(quantite))
      throw new Error("Il est obligatoire de fournir une quantité entière positive d'objet empilé.");
    this.objet = new Objet(nom_objet, valeur_pile / quantite);
    this.quantite = quantite;
  }
  /**
   * Dépiler les ojets
   * @returns {Array<Objet>} Liste d'objets unitaires correspondant à la pile
   * @memberof Pile
   */
  depiler() {
    let result = [];
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
  empiler(objet, quantite = 1) {
    if (!objet) throw new Error("Il est obligatoire de fournir l'objet à empiler.");
    if (objet.nom !== this.objet.nom) throw new Error("Il est impossible d'empiler des objets de nature différentes.");
    if (objet.valeur !== this.objet.valeur) throw new Error("Un même objet ne peut avoir plusieurs valeurs différentes.");
    this.quantite += quantite;
  }
  toString() {
    return `${this.objet.nom}\tx${this.quantite}\t$${this.quantite * this.objet.valeur}`
  }
};

class Participant {

  _nom;

  /**
   * Piles d'objets attribués au participant.
   * @type {Map<string,Pile>}
   * @memberof Participant
   */
  _butin = new Map();

  _valeur_cumulee = 0.0;

  constructor(nom) {
    if (typeof nom === 'string' || nom instanceof String)
      this._nom = nom;
    else throw new Error("Chaine de carractères atendu.");
  };
  /**
   * Attribuer un objet à la cagnotte du participant.
   * @param {Objet} objet
   * @memberof Participant
   */
  attribuer(objet) {
    if (!objet) throw new Error("Objet à attribuer obligatoire.")
    let b;
    if (b = this._butin.get(objet.nom)) b.quantite++;
    else this._butin.set(objet.nom, new Pile(objet.nom, objet.valeur));
    this._valeur_cumulee += objet.valeur;
  };

  toString() {
    let resultat = new String();
    for (const v of this._butin.values())
      resultat += `${v.toString()}\n`;
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
    if (!participants || participants.length == 0) throw new Error("au moins un participant attendu");
    participants.forEach(nom => {
      if (nom)
        this._participants.push(new Participant(nom));
    });
  }

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
    if (!butin || butin.length == 0) throw new Error("Au moins un élément de butin à distribué obligatoire.");
    // dépiler les objets
    /** @type {Array<Objet>} */
    let butin_trie = [];
    butin.forEach(pile => butin_trie.push(...pile.depiler()))
    // trier le butin par ordre décroissant de valeur
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
