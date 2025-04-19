import { Distribution, Pile } from "../web/domain.js";
import { expect } from 'chai';

describe("Initialisation à vide", function () {
    it("Une distribution sans participants n'a aucun sens", function () {
        expect(() => { new Distribution() },
            "l'instanciation d'une distribution sans participants ne devrait pas être possible").to.throw();
        expect(() => { new Distribution([]) },
            "l'instanciation d'une distribution avec une liste de participants vide ne devrait pas être possible").to.throw();
    });
    it("Une distribution avec participants, mais sans butins est possible", function () {
        let distribution = new Distribution(["toto", "tata"]);
        expect(distribution.toString()).to.equal(
            ` ##### toto $0 (0)


 ##### tata $0 (0)


`);
    });
});
describe("Cas nominaux", function () {
    it("Distribution d'objets unitaires", () => {
        let distribution = new Distribution(["toto", "tata"]);
        distribution.distribuer([new Pile("obj1", 1), new Pile("obj2", 1)]);
        expect(distribution.toString()).to.be.equal(
            ` ##### toto $1 (0)

obj1	x1	$1

 ##### tata $1 (0)

obj2	x1	$1

`);
    });
    it("Distribution de piles");
});
