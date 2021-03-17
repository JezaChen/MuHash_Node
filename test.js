
const addon = require('bindings')('addon');
const expect = require('chai').expect;

// 测试仅插入的情况
describe('Only Add', function() {
    it('H(a + b) should equal to H(b + a)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");

        let t = new addon.MuHashWrapper(item1_buf);
        t.insert(item2_buf);

        a_b_result = t.finalizeBase64();

        t = new addon.MuHashWrapper(item2_buf);
        t.insert(item1_buf);
        b_a_result = t.finalizeBase64();

        expect(a_b_result).to.be.equal(b_a_result);
    });

    it('H(a + b + c) should equal to H(b + c + a)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");
        let item3_buf = Buffer.from("Item3");

        let t = new addon.MuHashWrapper(item1_buf);
        t.insert(item2_buf);
        t.insert(item3_buf);

        a_b_result = t.finalizeBase64();

        t = new addon.MuHashWrapper(item2_buf);
        t.insert(item3_buf);
        t.insert(item1_buf);
        b_a_result = t.finalizeBase64();

        expect(a_b_result).to.be.equal(b_a_result);
    });
});

// 测试插入 + 删除的情况
describe('Add & Remove', function() {
    it('H(a + b - b) should equal to H(a)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");

        let t = new addon.MuHashWrapper(item1_buf);
        t.insert(item2_buf);
        t.remove(item2_buf);

        a_b_result = t.finalizeBase64();

        t = new addon.MuHashWrapper(item1_buf);
        b_a_result = t.finalizeBase64();

        expect(a_b_result).to.be.equal(b_a_result);
    });

    it('H(a + b - a) should equal to H(b)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");

        let t = new addon.MuHashWrapper(item1_buf);
        t.insert(item2_buf);
        t.remove(item1_buf);

        a_b_result = t.finalizeBase64();

        t = new addon.MuHashWrapper(item2_buf);
        b_a_result = t.finalizeBase64();

        expect(a_b_result).to.be.equal(b_a_result);
    });

    it('H(a + b + c - b) should equal to H(c + a)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");
        let item3_buf = Buffer.from("Item3");

        let t = new addon.MuHashWrapper(item1_buf);
        t.insert(item2_buf);
        t.insert(item3_buf);
        t.remove(item2_buf)

        a_b_result = t.finalizeBase64();

        t = new addon.MuHashWrapper(item3_buf);
        t.insert(item1_buf);
        b_a_result = t.finalizeBase64();

        expect(a_b_result).to.be.equal(b_a_result);
    });
});

// 测试MuHash乘的情况
describe('Only Mul Hash', function() {
    it('H(a + b) should equal to H(a) + H(b)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");

        let ab_muhash = new addon.MuHashWrapper(item1_buf);
        ab_muhash.insert(item2_buf);

        let a_muhash = new addon.MuHashWrapper(item1_buf);
        let b_muhash = new addon.MuHashWrapper(item2_buf);
        a_muhash.mul(b_muhash)
        expect(ab_muhash.finalizeBase64()).to.be.equal(a_muhash.finalizeBase64());
    });

    it('H(b + a) should equal to H(a) + H(b)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");

        let ab_muhash = new addon.MuHashWrapper(item2_buf);
        ab_muhash.insert(item1_buf);

        let a_muhash = new addon.MuHashWrapper(item1_buf);
        let b_muhash = new addon.MuHashWrapper(item2_buf);
        a_muhash.mul(b_muhash)
        expect(ab_muhash.finalizeBase64()).to.be.equal(a_muhash.finalizeBase64());
    });

    it('H(a + b) should equal to H(b) + H(a)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");

        let ab_muhash = new addon.MuHashWrapper(item1_buf);
        ab_muhash.insert(item2_buf);

        let a_muhash = new addon.MuHashWrapper(item1_buf);
        let b_muhash = new addon.MuHashWrapper(item2_buf);
        b_muhash.mul(a_muhash)
        expect(ab_muhash.finalizeBase64()).to.be.equal(b_muhash.finalizeBase64());
    });

    it('H(a + b + c) should equal to H(a) + H(b) + H(c)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");
        let item3_buf = Buffer.from("Item3");

        let abc_muhash = new addon.MuHashWrapper(item1_buf);
        abc_muhash.insert(item2_buf);
        abc_muhash.insert(item3_buf);

        let a_muhash = new addon.MuHashWrapper(item1_buf);
        let b_muhash = new addon.MuHashWrapper(item2_buf);
        let c_muhash = new addon.MuHashWrapper(item3_buf);

        a_muhash.mul(b_muhash);
        a_muhash.mul(c_muhash);
        expect(abc_muhash.finalizeBase64()).to.be.equal(a_muhash.finalizeBase64());
    });

    it('H(a + b + c) should equal to H(a + b) + H(c)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");
        let item3_buf = Buffer.from("Item3");

        let abc_muhash = new addon.MuHashWrapper(item1_buf);
        abc_muhash.insert(item2_buf);
        abc_muhash.insert(item3_buf);

        let ab_muhash = new addon.MuHashWrapper(item1_buf);
        ab_muhash.insert(item2_buf);
        let c_muhash = new addon.MuHashWrapper(item3_buf);

        ab_muhash.mul(c_muhash);
        expect(abc_muhash.finalizeBase64()).to.be.equal(ab_muhash.finalizeBase64());
    });

    it('H(a + b + c) should equal to H(a) + H(b + c)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");
        let item3_buf = Buffer.from("Item3");

        let abc_muhash = new addon.MuHashWrapper(item1_buf);
        abc_muhash.insert(item2_buf);
        abc_muhash.insert(item3_buf);

        let a_muhash = new addon.MuHashWrapper(item1_buf);
        let bc_muhash = new addon.MuHashWrapper(item2_buf);
        bc_muhash.insert(item3_buf);

        a_muhash.mul(bc_muhash);
        expect(abc_muhash.finalizeBase64()).to.be.equal(a_muhash.finalizeBase64());
    });

    it('H(a + b + c) should equal to H(b) + H(a + c)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");
        let item3_buf = Buffer.from("Item3");

        let abc_muhash = new addon.MuHashWrapper(item1_buf);
        abc_muhash.insert(item2_buf);
        abc_muhash.insert(item3_buf);

        let b_muhash = new addon.MuHashWrapper(item2_buf);
        let ac_muhash = new addon.MuHashWrapper(item1_buf);
        ac_muhash.insert(item3_buf);

        b_muhash.mul(ac_muhash);
        expect(abc_muhash.finalizeBase64()).to.be.equal(b_muhash.finalizeBase64());
    });

    it('H(a + b) + H(c) should equal to H(b) + H(a + c)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");
        let item3_buf = Buffer.from("Item3");

        let ab_muhash = new addon.MuHashWrapper(item1_buf);
        ab_muhash.insert(item2_buf);
        let c_muhash = new addon.MuHashWrapper(item3_buf);
        ab_muhash.mul(c_muhash);

        let b_muhash = new addon.MuHashWrapper(item2_buf);
        let ac_muhash = new addon.MuHashWrapper(item1_buf);
        ac_muhash.insert(item3_buf);

        b_muhash.mul(ac_muhash);
        expect(ab_muhash.finalizeBase64()).to.be.equal(b_muhash.finalizeBase64());
    });
});

// 测试MuHash乘与除的情况
describe('Mul & Div Hash', function() {
    it('H(a) + H(b) - H(b) should equal to H(a)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");

        let a_muhash = new addon.MuHashWrapper(item1_buf);
        let b_muhash = new addon.MuHashWrapper(item2_buf);
        a_muhash.mul(b_muhash);
        a_muhash.div(b_muhash);

        let a_muhash2 = new addon.MuHashWrapper(item1_buf);

        expect(a_muhash.finalizeBase64()).to.be.equal(a_muhash2.finalizeBase64());
    });

    it('H(a) + H(b) - H(a) should equal to H(b)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");

        let left = new addon.MuHashWrapper(item1_buf);
        let b_muhash = new addon.MuHashWrapper(item2_buf);
        left.mul(b_muhash);
        let a_muhash = new addon.MuHashWrapper(item1_buf);
        left.div(a_muhash);

        expect(left.finalizeBase64()).to.be.equal(b_muhash.finalizeBase64());
    });

    it('H(a) + H(b) + H(c) - H(b) should equal to H(a + c)', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");
        let item3_buf = Buffer.from("Item3");

        let left = new addon.MuHashWrapper(item1_buf);
        let b_muhash = new addon.MuHashWrapper(item2_buf);
        left.mul(b_muhash);
        let c_muhash = new addon.MuHashWrapper(item3_buf);
        left.mul(c_muhash);
        left.div(b_muhash);

        let ac_muhash = new addon.MuHashWrapper(item1_buf);
        ac_muhash.insert(item3_buf);

        expect(left.finalizeBase64()).to.be.equal(ac_muhash.finalizeBase64());
    });
});

// 随机测试
describe('Random Test', function() {
    it('H(a) + H(b) + H(c + d) + H(e + f) - H(a + c + f) should equal to H(b + e + d)', function() {
        let a_buf = Buffer.from("Item A");
        let b_buf = Buffer.from("Item B");
        let c_buf = Buffer.from("Item C");
        let d_buf = Buffer.from("Item D");
        let e_buf = Buffer.from("Item E");
        let f_buf = Buffer.from("Item F");
        let left = new addon.MuHashWrapper(a_buf);
        let b_muhash = new addon.MuHashWrapper(b_buf);
        let cd_muhash = new addon.MuHashWrapper(c_buf);
        cd_muhash.insert(d_buf);
        let ef_muhash = new addon.MuHashWrapper(e_buf);
        ef_muhash.insert(f_buf);
        let acf_muhash = new addon.MuHashWrapper(a_buf);
        acf_muhash.insert(c_buf);
        acf_muhash.insert(f_buf);
        left.mul(b_muhash);
        left.mul(cd_muhash);
        left.mul(ef_muhash);
        left.div(acf_muhash);

        let bed_muhash = new addon.MuHashWrapper(b_buf);
        bed_muhash.insert(e_buf);
        bed_muhash.insert(d_buf);

        expect(left.finalizeBase64()).to.be.equal(bed_muhash.finalizeBase64());
    });
});

// 异常测试
describe('Exception Test', function() {
    it('Init Buffer expected', function() {
        expect(() => new addon.MuHashWrapper("sss")).to.throw("Buffer expected");
        expect(() => new addon.MuHashWrapper(23)).to.throw("Buffer expected");
    });

    it('Insert & Remove Buffer expected', function() {
        let muhash = new addon.MuHashWrapper(Buffer.from("test"));
        expect(() => muhash.insert(324)).to.throw("Buffer expected");
        expect(() => muhash.remove({a: 1, b: 2})).to.throw("Buffer expected");
    });
});

// Finalize后还能继续使用
describe('Reuse After Finalization', function() {
    it('Reuse Test I', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");

        let a_muhash = new addon.MuHashWrapper(item1_buf);
        a_muhash.finalizeBase64(); //Finalize
        a_muhash.insert(item2_buf); //Reuse

        let ab_muhash = new addon.MuHashWrapper(item1_buf);
        ab_muhash.insert(item2_buf);
        expect(a_muhash.finalizeBase64()).to.be.equal(ab_muhash.finalizeBase64());
    });

    it('Reuse Test II', function() {
        let item1_buf = Buffer.from("Item1");
        let item2_buf = Buffer.from("Item2");

        let a_muhash = new addon.MuHashWrapper(item1_buf);
        let b_muhash = new addon.MuHashWrapper(item2_buf);
        a_muhash.finalizeBase64(); //Finalize
        b_muhash.finalizeBase64();

        a_muhash.mul(b_muhash); //Reuse a_muhash and b_muhash

        let ab_muhash = new addon.MuHashWrapper(item1_buf);
        ab_muhash.insert(item2_buf);
        expect(a_muhash.finalizeBase64()).to.be.equal(ab_muhash.finalizeBase64());
    });
});