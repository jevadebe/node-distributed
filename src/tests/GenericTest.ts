import SelfHandlerDriver from "../drivers/server/SelfHandler/SelfHandlerDriver";
import Server from "../Server";

import chai = require("chai");
const expect: Chai.ExpectStatic = chai.expect;

describe("Generic test", () => {
    let server: Server;
    let shd: SelfHandlerDriver;

    before(async function() {
        this.timeout(1000000);
        shd = new SelfHandlerDriver({
            test1: async (q: number, d: {[key: string]: any}) => q - 5,
            test2: async (q: number, d: {[key: string]: any}) => { throw new Error("Failed"); },
            testSubstract: async (q: number, d: {[key: string]: any}) => q - d.base,
            testSubstractWithObject: async (q: number, d: {[key: string]: any}) => q - d.base.sub,
            testSum: async (q: number, d: {[key: string]: any}) => q + d.base,
        });
        server = new Server(shd);
        await server.start();
    });

    it("should handle queue", async function() {
        this.timeout(1000000);
        const test1 = server.session<number, number>("test1");

        expect(await (test1.queue(8))).to.equal(3);
        expect(await (test1.queue(10))).to.equal(5);

        const p: Array<Promise<number>> = [];
        for (let i = 0; i < 100; i++) {
            p.push(test1.queue(i));
        }
        let total = 0;
        (await Promise.all(p)).forEach((a) => total += a);
        expect(total).to.equal(4450);
    });

    it("should bind", async () => {
          const test1 = server.session<number, number>("test1").bind();
          expect(await (test1(8))).to.equal(3);
          expect(await (test1(10))).to.equal(5);
        });

    it("should handle errors", async () => {
        const thrown = 0;
        const test2 = server.session("test2").bind();
        try {
                await (test2(8));
                expect(thrown).to.equal(1);
            } catch (ex) {
                expect(ex.toString()).to.equal("Error: Failed");
            }
        });

    it("should correctly handle data", async function() {
        this.timeout(100000);
        const testSum1 = server.session("testSum");
        testSum1.updateData("base", 5);
        const testSum2 = server.session("testSum");
        testSum2.updateData("base", 8);

        expect(await (testSum1.queue(10))).to.equal(15);
        expect(await (testSum2.queue(14))).to.equal(22);

        testSum2.updateData("base", 15);
        const testSubstract = server.session("testSubstract");
        testSubstract.updateData("base", 11);
        expect(await (testSubstract.queue(100))).to.equal(89);
        expect(await (testSum1.queue(10))).to.equal(15);
        expect(await (testSum2.queue(14))).to.equal(29);

        const testSubstractWithObject = server.session("testSubstractWithObject");
        testSubstractWithObject.updateData("base", { sub: 8 });
        expect(await (testSubstractWithObject.queue(14))).to.equal(6);
    });
});
