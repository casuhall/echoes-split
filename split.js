let participants = ["CasuHall", "Kohntark", "Nerys"]

let loot_brute = `ID	Names	Quantity	Valuation 
1	MK7 Medium Rifled Railgun	2	63568.2 
2	MK7 Medium Snubnosed Railgun	3	196962.69 
3	MK7 Small Missile Launcher	7	50021.72 
4	Pithi C-Type Small Missile Launcher	3	155028530.67 
5	MK7 Medium Missile Launcher	2	67027.54 
6	Pithum C-Type Medium Missile Launcher	4	53069844.84 
7	MK7 Large Missile Launcher	1	143386.23 
8	Pithum C-Type Medium Rapid Missile Launcher	7	67988852.96 
9	MK7 Large Rapid Missile Launcher	1	208522.87 
10	MK7 Medium Torpedo Launcher	2	120427.92 
11	Pithum C-Type Medium Torpedo Launcher	5	12675554.1 
12	MK7 Small Torpedo Launcher	15	230184.45 
13	Pithi C-Type Small Torpedo Launcher	4	166708240.52 
14	MK7 Large Torpedo Launcher	2	559998.4 
15	MK7 Small Remote Capacitor Transmitter	1	2206.15 
16	MK7 Medium Remote Capacitor Transmiiter	3	47093.43 
17	MK7 Small Remote Shield Booster	4	84789.88 
18	MK7 Medium Remote Shield Booster	6	170711.94 
19	Pithum C-Type Medium Remote Shield Booster	3	8177961.42 
20	MK7 Small Shield Extender	2	89291.52 
21	MK7 Medium Shield Extender	1	210000.0 
22	MK7 Small Shield Booster	5	6481.45 
23	Pithi C-Type Small Shield Booster	3	57871755.33 
24	MK7 Medium Shield Booster	4	108215.12 
25	Pithum C-Type Medium Shield Booster	5	4231384.1 
26	MK7 Small Microwarpdrive	1	253585.56 
27	MK7 Small Afterburner	1	1940679.73 
28	MK7 Medium Afterburner	1	16273.23 
29	MK7 Warp Disruptors	1	110813.08 
30	MK7 Medium Capacitor Battery	1	61803.17 
31	MK7 Stasis Webifier	2	474419.22 
32	MK7 Adaptive Invulnerability Field	2	83106.08 
33	Pith C-Type Adaptive Invulnerability Field	7	10507063.21 
34	MK7 Missile Guidance Computer	1	169735.53 
35	MK7 Guidance Disruptor	1	8000.0 
36	MK7 Magnetic Field Stabilizer	5	388194.25 
37	Pithum C-Type Ballistic Control System	5	7386232.65 
38	MK7 Inertial Stabilizer	1	31190.33 
39	MK7 Reactive Shield Hardener	3	81689.97 
40	Pithum C-Type Reactive Shield Hardener	8	4622355.6 
41	Ancient Remains	2	464897.1 
42	Lv.7 Caldari Ship Debris	141	1114550.01 
43	Guristas Ship Debris	3	25455725.88 
`;

let loot_structuree = []
loot_brute.split("\n").forEach(element => {
    let ligne = /^(\d+)\t(.+)\t(\d+)\t(.+)$/.exec(element);
    if (ligne) {
        let quantite = Number.parseInt(ligne[3]);
        if (quantite == 1)
            loot_structuree.push({ ordre: ligne[1], libelle: ligne[2], valeur: Number.parseFloat(ligne[4]) })
        else
            for (let i = 0; i < quantite; i++) loot_structuree.push({ ordre: ligne[1], libelle: ligne[2], valeur: Number.parseFloat(ligne[4]) / quantite })

    }
});

class Partage {
    repartition = [];

    constructor(joueurs) {
        joueurs.forEach(j => this.repartition[j] = { joueur: j, loot: [], valeur: 0 })
    };

    pauvreJoueur = function () {
        let pauvre;
        this.repartition.forEach(joueur => { if (!pauvre || pauvre.valeur > joueur.valeur) pauvre = joueur; })
    }
}

let partage = new Partage(participants);

console.log(partage);
