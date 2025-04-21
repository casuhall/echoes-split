import { Distribution, Pile } from "../web/domain.js";
import { expect } from 'chai';

describe("test du comportement de l'objet Distribution", function () {
    describe("Cas aux limites", function () {
        it("Une distribution sans participants n'a aucun sens", function () {
            expect(() => { new Distribution() },
                "l'instanciation d'une distribution sans participants ne devrait pas être possible").to.throw();
            expect(() => { new Distribution([]) },
                "l'instanciation d'une distribution avec une liste de participants vide ne devrait pas être possible").to.throw();
        });
        it("Une distribution à un seul participant ne nécessite pas d'outil...", function () {
            expect(() => { new Distribution(["toto"]) },
                "l'instanciation d'une distribution avec un seul participant ne devrait pas être possible").to.throw();
        });
        it("Une distribution avec participants, mais sans butins est possible", function () {
            let distribution = new Distribution(["toto", "tata"]);
            expect(distribution.toString()).to.equal(
                ' ##### toto $0 (0)\n\n\n ##### tata $0 (0)\n\n\n');
        });
        it("Un nombre très élevé d'objet dans une pile ne devrait pas provoquer d'erreur", function () {
            // /!\ fonctionne pour l'ordre du million d'objet, erreur pour le billion
            // TODO : étudier la possibilité d'amender le libellé pour faire de piles de packet, et plus des piles d'objet
            let distribution = new Distribution(["toto", "tata"]);
            distribution.distribuer([new Pile("obj1", 2000000, 2000000)]);
            expect(distribution.toString()).to.be.equal(
                ' ##### toto $1,000,000 (0)\n\nobj1\tx1,000,000\t$1,000,000\n\n ##### tata $1,000,000 (0)\n\nobj1\tx1,000,000\t$1,000,000\n\n');
        });
    });
    describe("Cas nominaux", function () {
        it("Distribution d'objets unitaires", () => {
            let distribution = new Distribution(["toto", "tata"]);
            distribution.distribuer([new Pile("obj1", 1), new Pile("obj2", 1)]);
            expect(distribution.toString()).to.be.equal(
                ' ##### toto $1 (0)\n\nobj1\tx1\t$1\n\n ##### tata $1 (0)\n\nobj2\tx1\t$1\n\n');
        });
        it("Distribution d'une pile", function () {
            let distribution = new Distribution(["toto", "tata"]);
            distribution.distribuer([new Pile("obj1", 10, 10)]);
            expect(distribution.toString()).to.be.equal(
                ' ##### toto $5 (0)\n\nobj1\tx5\t$5\n\n ##### tata $5 (0)\n\nobj1\tx5\t$5\n\n');
        });
    });
})