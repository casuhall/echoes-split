Objet = class {
  nom,
  valeur
};

Participant = class {
  _nom,
  _butin = new Array<Objet>,
  _valeure_cumulee = 0.0,
  constructor(nom){
    this._nom=nom;
  },
  attribuer(objet){
    this._butin.push(objet);
    this._valeur_cumulee += objet.valeure;
  }
};

Distribution = class {
  _participants = new Arrays<Participant>,
  constructor (participants) {
    this._participants.forEach( nom => _participants.push(new Participant(nom)) );
  },
  _pauvreParticipant(){
    // obtention du participant ayant la valeur de butin cumulée la plus faible possible
    let pauvre;
    _participants.forEach( p => {
      if (!pauvre||pauvre.valeure_cumulee>p.valeure_cumulee)
        pauvre = p
    });
    return pauvre;
  },
  distribuer(butin){
    // trier le butin par ordre décroissant de valeur
    let butin_trie = new Array(...butin);
    butin_trie.sort( (a,b)=> b.valeure-a.valeure );
    // pour chaque objet dans l'ordre, attribuer au participant le plus pauvre
    butin_trie.forEach( objet => this._pauvreParticipant().attribuer(objet) );
  }
}