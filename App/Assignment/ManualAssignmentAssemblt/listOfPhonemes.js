// b	b, bb	bug, bubble	Yes
// 2	d	d, dd, ed	dad, add, milled	Yes
// 3	f	f, ff, ph, gh, lf, ft	fat, cliff, phone, enough, half, often	No
// 4	g	g, gg, gh,gu,gue	gun, egg, ghost, guest, prologue	Yes
// 5	h	h, wh	hop, who	No
// 6	dʒ	j, ge, g, dge, di, gg	jam, wage, giraffe, edge, soldier, exaggerate	Yes
// 7	k	k, c, ch, cc, lk, qu ,q(u), ck, x	kit, cat, chris, accent, folk, bouquet, queen, rack, box	No
// 8	l	l, ll	live, well	Yes
// 9	m	m, mm, mb, mn, lm	man, summer, comb, column, palm	Yes
// 10	n	n, nn,kn, gn, pn, mn	net, funny, know, gnat, pneumonic, mnemonic	Yes
// 11	p	p, pp	pin, dippy	No
// 12	r	r, rr, wr, rh	run, carrot, wrench, rhyme	Yes
// 13	s	s, ss, c, sc, ps, st, ce, se	sit, less, circle, scene, psycho, listen, pace, course	No
// 14	t	t, tt, th, ed	tip, matter, thomas, ripped	No
// 15	v	v, f, ph, ve	vine, of, stephen, five	Yes
// 16	w	w, wh, u, o	wit, why, quick, choir	Yes
// 17	z	z, zz, s, ss, x, ze, se	zed, buzz, his, scissors, xylophone, craze	Yes
// 18	ʒ	s, si, z	treasure, division, azure	Yes
// 19	tʃ	ch, tch, tu, te	chip, watch, future, righteous	No
// 20	ʃ	sh, ce, s, ci, si, ch, sci, ti	sham, ocean, sure, special, pension, machine, conscience, station	No
// 21	θ	th	thongs	No
// 22	ð	th	leather	Yes
// 23	ŋ	ng, n, ngue	ring, pink, tongue	Yes
// 24	j	y, i, j	you, onion, hallelujah	Yes
// ------ vowels start here
// 25	æ	a, ai, au	cat, plaid, laugh
// 26	eɪ	a, ai, eigh, aigh, ay, er, et, ei, au, a_e, ea, ey	bay, maid, weigh, straight, pay, foyer, filet, eight, gauge, mate, break, they
// 27	e	e, ea, u, ie, ai, a, eo, ei, ae	end, bread, bury, friend, said, many, leopard, heifer, aesthetic
// 28	i:	e, ee, ea, y, ey, oe, ie, i, ei, eo, ay	be, bee, meat, lady, key, phoenix, grief, ski, deceive, people, quay
// 29	ɪ	i, e, o, u, ui, y, ie	it, england, women, busy, guild, gym, sieve
// 30	aɪ	i, y, igh, ie, uy, ye, ai, is, eigh, i_e	spider, sky, night, pie, guy, stye, aisle, island, height, kite
// 31	ɒ	a, ho, au, aw, ough	swan, honest, maul, slaw, fought
// 32	oʊ	o, oa, o_e, oe, ow, ough, eau, oo, ew	open, moat, bone, toe, sow, dough, beau, brooch, sew
// 33	ʊ	o, oo, u,ou	wolf, look, bush, would
// 34	ʌ	u, o, oo, ou	lug, monkey, blood, double
// 35	u:	o, oo, ew, ue, u_e, oe, ough, ui, oew, ou	who, loon, dew, blue, flute, shoe, through, fruit, manoeuvre, group
// 36	ɔɪ	oi, oy, uoy	join, boy, buoy
// 37	aʊ	ow, ou, ough	now, shout, bough
// 38	ə	a, er, i, ar, our, ur	about, ladder, pencil, dollar, honour, augur
// 39	eəʳ	air, are, ear, ere, eir, ayer	chair, dare, pear, where, their, prayer
// 40	ɑ:	a	arm
// 41	ɜ:ʳ	ir, er, ur, ear, or, our, yr	bird, term, burn, pearl, word, journey, myrtle
// 42	ɔ:	aw, a, or, oor, ore, oar, our, augh, ar, ough, au	paw, ball, fork, poor, fore, board, four, taught, war, bought, sauce
// 43	ɪəʳ	ear, eer, ere, ier	ear, steer, here, tier
// 44	ʊəʳ	ure, our	cure, tourist

const vowels = [
    {
        id: 25,
        ipa: "æ",
        isVowel: true
    },
    {
        id: 26,
        ipa: "eɪ",
        isVowel: true
    },
    {
        id: 27,
        ipa: "e",
        isVowel: true
    },
    {
        id: 28,
        ipa: "i:",
        isVowel: true
    },
    {
        id: 29,
        ipa: "ɪ",
        isVowel: true
    },
    {
        id: 30,
        ipa: "aɪ",
        isVowel: true
    },
    {
        id: 31,
        ipa: "ɒ",
        isVowel: true
    },
    {
        id: 32,
        ipa: "oʊ",
        isVowel: true
    },
    {
        id: 33,
        ipa: "ʊ",
        isVowel: true
    },
    {
        id: 34,
        ipa: "ʌ",
        isVowel: true
    },
    {
        id: 35,
        ipa: "u:",
        isVowel: true
    },
    {
        id: 36,
        ipa: "ɔɪ",
        isVowel: true
    },
    {
        id: 37,
        ipa: "aʊ",
        isVowel: true
    },
    {
        id: 38,
        ipa: "ə",
        isVowel: true
    },
    {
        id: 39,
        ipa: "eəʳ",
        isVowel: true
    },
    {
        id: 40,
        ipa: "ɑ:",
        isVowel: true
    },
    {
        id: 41,
        ipa: "ɜ:ʳ",
        isVowel: true
    },
    {
        id: 42,
        ipa: "ɔ:",
        isVowel: true
    },
    {
        id: 43,
        ipa: "ɪəʳ",
        isVowel: true
    },
    {
        id: 44,
        ipa: "ʊəʳ",
        isVowel: true
    }
];

const consonants = [
    {
        id: 1,
        ipa: "b",
        isVowel: false
    },
    {
        id: 2,
        ipa: "d",
        isVowel: false
    },
    {
        id: 3,
        ipa: "f",
        isVowel: false
    },
    {
        id: 4,
        ipa: "g",
        isVowel: false
    },
    {
        id: 5,
        ipa: "h",
        isVowel: false
    },
    {
        id: 6,
        ipa: "dʒ",
        isVowel: false
    },
    {
        id: 7,
        ipa: "k",
        isVowel: false
    },
    {
        id: 8,
        ipa: "l",
        isVowel: false
    },
    {
        id: 9,
        ipa: "m",
        isVowel: false
    },
    {
        id: 10,
        ipa: "n",
        isVowel: false
    },
    {
        id: 11,
        ipa: "p",
        isVowel: false
    },
    {
        id: 12,
        ipa: "r",
        isVowel: false
    },
    {
        id: 13,
        ipa: "s",
        isVowel: false
    },
    {
        id: 14,
        ipa: "t",
        isVowel: false
    },
    {
        id: 15,
        ipa: "v",
        isVowel: false
    },
    {
        id: 16,
        ipa: "w",
        isVowel: false
    },
    {
        id: 17,
        ipa: "z",
        isVowel: false
    },
    {
        id: 18,
        ipa: "ʒ",
        isVowel: false
    },
    {
        id: 19,
        ipa: "tʃ",
        isVowel: false
    },
    {
        id: 20,
        ipa: "ʃ",
        isVowel: false
    },
    {
        id: 21,
        ipa: "θ",
        isVowel: false
    },
    {
        id: 22,
        ipa: "ð",
        isVowel: false
    },
    {
        id: 23,
        ipa: "ŋ",
        isVowel: false
    },
    {
        id: 24,
        ipa: "j",
        isVowel: false
    }
];

export default { consonants, vowels };
