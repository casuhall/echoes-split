const {Objet,Participant,Distribution} = require("./domain");

test("Initialisation d'une distribution vide",()=>{
    expect(new Distribution()._participants.length).toBe(0);
});

test("Initialisation d'une distribution avec", ()=>{
    expect(()=>new Distribution({nom:"toto"})).toThrow();
});

test("Distribution simple", ()=>{
    let ut = new Distribution(["Toto","Tata"]);
    ut.distribuer([
        {nom:"loot 1", valeur:10000},
        {nom:"loot 2", valeur:20000},
        {nom:"loot 1", valeur:10000}
    ])
    expect(ut._participants.length).toBe(2);
    expect(ut._participants[0]._valeur_cumulee).toBe(20000);
    expect(ut._participants[1]._valeur_cumulee).toBe(20000);
});