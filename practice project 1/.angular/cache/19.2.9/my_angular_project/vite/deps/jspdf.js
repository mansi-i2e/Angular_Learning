import "./chunk-NJ4VOZBH.js";

// node_modules/fflate/esm/browser.js
var ch2 = {};
var wk = function(c2, id, msg, transfer, cb) {
  var u2 = ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([c2], {
    type: "text/javascript"
  })));
  var w2 = new Worker(u2);
  w2.onerror = function(e) {
    return cb(e.error, null);
  };
  w2.onmessage = function(e) {
    return cb(null, e.data);
  };
  w2.postMessage(msg, transfer);
  return w2;
};
var u8 = Uint8Array;
var u16 = Uint16Array;
var u32 = Uint32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b2 = new u16(31);
  for (var i2 = 0; i2 < 31; ++i2) {
    b2[i2] = start += 1 << eb[i2 - 1];
  }
  var r2 = new u32(b2[30]);
  for (var i2 = 1; i2 < 30; ++i2) {
    for (var j2 = b2[i2]; j2 < b2[i2 + 1]; ++j2) {
      r2[j2] = j2 - b2[i2] << 5 | i2;
    }
  }
  return [b2, r2];
};
var _a = freb(fleb, 2);
var fl = _a[0];
var revfl = _a[1];
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b[0];
var revfd = _b[1];
var rev = new u16(32768);
for (i2 = 0; i2 < 32768; ++i2) {
  x2 = (i2 & 43690) >>> 1 | (i2 & 21845) << 1;
  x2 = (x2 & 52428) >>> 2 | (x2 & 13107) << 2;
  x2 = (x2 & 61680) >>> 4 | (x2 & 3855) << 4;
  rev[i2] = ((x2 & 65280) >>> 8 | (x2 & 255) << 8) >>> 1;
}
var x2;
var i2;
var hMap = function(cd, mb, r2) {
  var s2 = cd.length;
  var i2 = 0;
  var l2 = new u16(mb);
  for (; i2 < s2; ++i2) ++l2[cd[i2] - 1];
  var le2 = new u16(mb);
  for (i2 = 0; i2 < mb; ++i2) {
    le2[i2] = le2[i2 - 1] + l2[i2 - 1] << 1;
  }
  var co;
  if (r2) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i2 = 0; i2 < s2; ++i2) {
      if (cd[i2]) {
        var sv = i2 << 4 | cd[i2];
        var r_1 = mb - cd[i2];
        var v2 = le2[cd[i2] - 1]++ << r_1;
        for (var m2 = v2 | (1 << r_1) - 1; v2 <= m2; ++v2) {
          co[rev[v2] >>> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s2);
    for (i2 = 0; i2 < s2; ++i2) co[i2] = rev[le2[cd[i2] - 1]++] >>> 15 - cd[i2];
  }
  return co;
};
var flt = new u8(288);
for (i2 = 0; i2 < 144; ++i2) flt[i2] = 8;
var i2;
for (i2 = 144; i2 < 256; ++i2) flt[i2] = 9;
var i2;
for (i2 = 256; i2 < 280; ++i2) flt[i2] = 7;
var i2;
for (i2 = 280; i2 < 288; ++i2) flt[i2] = 8;
var i2;
var fdt = new u8(32);
for (i2 = 0; i2 < 32; ++i2) fdt[i2] = 5;
var i2;
var flm = hMap(flt, 9, 0);
var flrm = hMap(flt, 9, 1);
var fdm = hMap(fdt, 5, 0);
var fdrm = hMap(fdt, 5, 1);
var max = function(a2) {
  var m2 = a2[0];
  for (var i2 = 1; i2 < a2.length; ++i2) {
    if (a2[i2] > m2) m2 = a2[i2];
  }
  return m2;
};
var bits = function(d2, p2, m2) {
  var o2 = p2 / 8 >> 0;
  return (d2[o2] | d2[o2 + 1] << 8) >>> (p2 & 7) & m2;
};
var bits16 = function(d2, p2) {
  var o2 = p2 / 8 >> 0;
  return (d2[o2] | d2[o2 + 1] << 8 | d2[o2 + 2] << 16) >>> (p2 & 7);
};
var shft = function(p2) {
  return (p2 / 8 >> 0) + (p2 & 7 && 1);
};
var slc = function(v2, s2, e) {
  if (s2 == null || s2 < 0) s2 = 0;
  if (e == null || e > v2.length) e = v2.length;
  var n2 = new (v2 instanceof u16 ? u16 : v2 instanceof u32 ? u32 : u8)(e - s2);
  n2.set(v2.subarray(s2, e));
  return n2;
};
var inflt = function(dat, buf, st2) {
  var sl = dat.length;
  var noBuf = !buf || st2;
  var noSt = !st2 || st2.i;
  if (!st2) st2 = {};
  if (!buf) buf = new u8(sl * 3);
  var cbuf = function(l3) {
    var bl = buf.length;
    if (l3 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l3));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st2.f || 0, pos = st2.p || 0, bt2 = st2.b || 0, lm = st2.l, dm = st2.d, lbt = st2.m, dbt = st2.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      st2.f = final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s2 = shft(pos) + 4, l2 = dat[s2 - 4] | dat[s2 - 3] << 8, t = s2 + l2;
        if (t > sl) {
          if (noSt) throw "unexpected EOF";
          break;
        }
        if (noBuf) cbuf(bt2 + l2);
        buf.set(dat.subarray(s2, t), bt2);
        st2.b = bt2 += l2, st2.p = pos = t * 8;
        continue;
      } else if (type == 1) lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i2 = 0; i2 < hcLen; ++i2) {
          clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        if (!noSt && pos + tl * (clb + 7) > tbts) break;
        var clm = hMap(clt, clb, 1);
        for (var i2 = 0; i2 < tl; ) {
          var r2 = clm[bits(dat, pos, clbmsk)];
          pos += r2 & 15;
          var s2 = r2 >>> 4;
          if (s2 < 16) {
            ldt[i2++] = s2;
          } else {
            var c2 = 0, n2 = 0;
            if (s2 == 16) n2 = 3 + bits(dat, pos, 3), pos += 2, c2 = ldt[i2 - 1];
            else if (s2 == 17) n2 = 3 + bits(dat, pos, 7), pos += 3;
            else if (s2 == 18) n2 = 11 + bits(dat, pos, 127), pos += 7;
            while (n2--) ldt[i2++] = c2;
          }
        }
        var lt2 = ldt.subarray(0, hLit), dt2 = ldt.subarray(hLit);
        lbt = max(lt2);
        dbt = max(dt2);
        lm = hMap(lt2, lbt, 1);
        dm = hMap(dt2, dbt, 1);
      } else throw "invalid block type";
      if (pos > tbts) throw "unexpected EOF";
    }
    if (noBuf) cbuf(bt2 + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var mxa = lbt + dbt + 18;
    while (noSt || pos + mxa < tbts) {
      var c2 = lm[bits16(dat, pos) & lms], sym = c2 >>> 4;
      pos += c2 & 15;
      if (pos > tbts) throw "unexpected EOF";
      if (!c2) throw "invalid length/literal";
      if (sym < 256) buf[bt2++] = sym;
      else if (sym == 256) {
        lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i2 = sym - 257, b2 = fleb[i2];
          add = bits(dat, pos, (1 << b2) - 1) + fl[i2];
          pos += b2;
        }
        var d2 = dm[bits16(dat, pos) & dms], dsym = d2 >>> 4;
        if (!d2) throw "invalid distance";
        pos += d2 & 15;
        var dt2 = fd[dsym];
        if (dsym > 3) {
          var b2 = fdeb[dsym];
          dt2 += bits16(dat, pos) & (1 << b2) - 1, pos += b2;
        }
        if (pos > tbts) throw "unexpected EOF";
        if (noBuf) cbuf(bt2 + 131072);
        var end = bt2 + add;
        for (; bt2 < end; bt2 += 4) {
          buf[bt2] = buf[bt2 - dt2];
          buf[bt2 + 1] = buf[bt2 + 1 - dt2];
          buf[bt2 + 2] = buf[bt2 + 2 - dt2];
          buf[bt2 + 3] = buf[bt2 + 3 - dt2];
        }
        bt2 = end;
      }
    }
    st2.l = lm, st2.p = pos, st2.b = bt2;
    if (lm) final = 1, st2.m = lbt, st2.d = dm, st2.n = dbt;
  } while (!final);
  return bt2 == buf.length ? buf : slc(buf, 0, bt2);
};
var wbits = function(d2, p2, v2) {
  v2 <<= p2 & 7;
  var o2 = p2 / 8 >> 0;
  d2[o2] |= v2;
  d2[o2 + 1] |= v2 >>> 8;
};
var wbits16 = function(d2, p2, v2) {
  v2 <<= p2 & 7;
  var o2 = p2 / 8 >> 0;
  d2[o2] |= v2;
  d2[o2 + 1] |= v2 >>> 8;
  d2[o2 + 2] |= v2 >>> 16;
};
var hTree = function(d2, mb) {
  var t = [];
  for (var i2 = 0; i2 < d2.length; ++i2) {
    if (d2[i2]) t.push({
      s: i2,
      f: d2[i2]
    });
  }
  var s2 = t.length;
  var t2 = t.slice();
  if (!s2) return [new u8(0), 0];
  if (s2 == 1) {
    var v2 = new u8(t[0].s + 1);
    v2[t[0].s] = 1;
    return [v2, 1];
  }
  t.sort(function(a2, b2) {
    return a2.f - b2.f;
  });
  t.push({
    s: -1,
    f: 25001
  });
  var l2 = t[0], r2 = t[1], i0 = 0, i1 = 1, i22 = 2;
  t[0] = {
    s: -1,
    f: l2.f + r2.f,
    l: l2,
    r: r2
  };
  while (i1 != s2 - 1) {
    l2 = t[t[i0].f < t[i22].f ? i0++ : i22++];
    r2 = t[i0 != i1 && t[i0].f < t[i22].f ? i0++ : i22++];
    t[i1++] = {
      s: -1,
      f: l2.f + r2.f,
      l: l2,
      r: r2
    };
  }
  var maxSym = t2[0].s;
  for (var i2 = 1; i2 < s2; ++i2) {
    if (t2[i2].s > maxSym) maxSym = t2[i2].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i2 = 0, dt2 = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a2, b2) {
      return tr[b2.s] - tr[a2.s] || a2.f - b2.f;
    });
    for (; i2 < s2; ++i2) {
      var i2_1 = t2[i2].s;
      if (tr[i2_1] > mb) {
        dt2 += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else break;
    }
    dt2 >>>= lft;
    while (dt2 > 0) {
      var i2_2 = t2[i2].s;
      if (tr[i2_2] < mb) dt2 -= 1 << mb - tr[i2_2]++ - 1;
      else ++i2;
    }
    for (; i2 >= 0 && dt2; --i2) {
      var i2_3 = t2[i2].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt2;
      }
    }
    mbt = mb;
  }
  return [new u8(tr), mbt];
};
var ln = function(n2, l2, d2) {
  return n2.s == -1 ? Math.max(ln(n2.l, l2, d2 + 1), ln(n2.r, l2, d2 + 1)) : l2[n2.s] = d2;
};
var lc = function(c2) {
  var s2 = c2.length;
  while (s2 && !c2[--s2]) ;
  var cl = new u16(++s2);
  var cli = 0, cln = c2[0], cls = 1;
  var w2 = function(v2) {
    cl[cli++] = v2;
  };
  for (var i2 = 1; i2 <= s2; ++i2) {
    if (c2[i2] == cln && i2 != s2) ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138) w2(32754);
        if (cls > 2) {
          w2(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w2(cln), --cls;
        for (; cls > 6; cls -= 6) w2(8304);
        if (cls > 2) w2(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--) w2(cln);
      cls = 1;
      cln = c2[i2];
    }
  }
  return [cl.subarray(0, cli), s2];
};
var clen = function(cf, cl) {
  var l2 = 0;
  for (var i2 = 0; i2 < cl.length; ++i2) l2 += cf[i2] * cl[i2];
  return l2;
};
var wfblk = function(out, pos, dat) {
  var s2 = dat.length;
  var o2 = shft(pos + 2);
  out[o2] = s2 & 255;
  out[o2 + 1] = s2 >>> 8;
  out[o2 + 2] = out[o2] ^ 255;
  out[o2 + 3] = out[o2 + 1] ^ 255;
  for (var i2 = 0; i2 < s2; ++i2) out[o2 + i2 + 4] = dat[i2];
  return (o2 + 4 + s2) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p2) {
  wbits(out, p2++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2[0], mlb = _a2[1];
  var _b2 = hTree(df, 15), ddt = _b2[0], mdb = _b2[1];
  var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
  var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
  var lcfreq = new u16(19);
  for (var i2 = 0; i2 < lclt.length; ++i2) lcfreq[lclt[i2] & 31]++;
  for (var i2 = 0; i2 < lcdt.length; ++i2) lcfreq[lcdt[i2] & 31]++;
  var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc) ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
  if (flen <= ftlen && flen <= dtlen) return wfblk(out, p2, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p2, 1 + (dtlen < ftlen)), p2 += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p2, nlc - 257);
    wbits(out, p2 + 5, ndc - 1);
    wbits(out, p2 + 10, nlcc - 4);
    p2 += 14;
    for (var i2 = 0; i2 < nlcc; ++i2) wbits(out, p2 + 3 * i2, lct[clim[i2]]);
    p2 += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it2 = 0; it2 < 2; ++it2) {
      var clct = lcts[it2];
      for (var i2 = 0; i2 < clct.length; ++i2) {
        var len = clct[i2] & 31;
        wbits(out, p2, llm[len]), p2 += lct[len];
        if (len > 15) wbits(out, p2, clct[i2] >>> 5 & 127), p2 += clct[i2] >>> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i2 = 0; i2 < li; ++i2) {
    if (syms[i2] > 255) {
      var len = syms[i2] >>> 18 & 31;
      wbits16(out, p2, lm[len + 257]), p2 += ll[len + 257];
      if (len > 7) wbits(out, p2, syms[i2] >>> 23 & 31), p2 += fleb[len];
      var dst = syms[i2] & 31;
      wbits16(out, p2, dm[dst]), p2 += dl[dst];
      if (dst > 3) wbits16(out, p2, syms[i2] >>> 5 & 8191), p2 += fdeb[dst];
    } else {
      wbits16(out, p2, lm[syms[i2]]), p2 += ll[syms[i2]];
    }
  }
  wbits16(out, p2, lm[256]);
  return p2 + ll[256];
};
var deo = new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, lst) {
  var s2 = dat.length;
  var o2 = new u8(pre + s2 + 5 * (1 + Math.floor(s2 / 7e3)) + post);
  var w2 = o2.subarray(pre, o2.length - post);
  var pos = 0;
  if (!lvl || s2 < 8) {
    for (var i2 = 0; i2 <= s2; i2 += 65535) {
      var e = i2 + 65535;
      if (e < s2) {
        pos = wfblk(w2, pos, dat.subarray(i2, e));
      } else {
        w2[i2] = lst;
        pos = wfblk(w2, pos, dat.subarray(i2, s2));
      }
    }
  } else {
    var opt = deo[lvl - 1];
    var n2 = opt >>> 13, c2 = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = new u16(32768), head = new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i3) {
      return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
    };
    var syms = new u32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i2 = 0, li = 0, wi = 0, bs = 0;
    for (; i2 < s2; ++i2) {
      var hv = hsh(i2);
      var imod = i2 & 32767;
      var pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i2) {
        var rem = s2 - i2;
        if ((lc_1 > 7e3 || li > 24576) && rem > 423) {
          pos = wblk(dat, w2, 0, syms, lf, df, eb, li, bs, i2 - bs, pos);
          li = lc_1 = eb = 0, bs = i2;
          for (var j2 = 0; j2 < 286; ++j2) lf[j2] = 0;
          for (var j2 = 0; j2 < 30; ++j2) df[j2] = 0;
        }
        var l2 = 2, d2 = 0, ch_1 = c2, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i2 - dif)) {
          var maxn = Math.min(n2, rem) - 1;
          var maxd = Math.min(32767, i2);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i2 + l2] == dat[i2 + l2 - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl) ;
              if (nl > l2) {
                l2 = nl, d2 = dif;
                if (nl > maxn) break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j2 = 0; j2 < mmd; ++j2) {
                  var ti = i2 - dif + j2 + 32768 & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti + 32768 & 32767;
                  if (cd > md) md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod + 32768 & 32767;
          }
        }
        if (d2) {
          syms[li++] = 268435456 | revfl[l2] << 18 | revfd[d2];
          var lin = revfl[l2] & 31, din = revfd[d2] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i2 + l2;
          ++lc_1;
        } else {
          syms[li++] = dat[i2];
          ++lf[dat[i2]];
        }
      }
    }
    pos = wblk(dat, w2, lst, syms, lf, df, eb, li, bs, i2 - bs, pos);
    if (!lst) pos = wfblk(w2, pos, et);
  }
  return slc(o2, 0, pre + shft(pos) + post);
};
var crct = function() {
  var t = new u32(256);
  for (var i2 = 0; i2 < 256; ++i2) {
    var c2 = i2, k2 = 9;
    while (--k2) c2 = (c2 & 1 && 3988292384) ^ c2 >>> 1;
    t[i2] = c2;
  }
  return t;
}();
var crc = function() {
  var c2 = 4294967295;
  return {
    p: function(d2) {
      var cr = c2;
      for (var i2 = 0; i2 < d2.length; ++i2) cr = crct[cr & 255 ^ d2[i2]] ^ cr >>> 8;
      c2 = cr;
    },
    d: function() {
      return c2 ^ 4294967295;
    }
  };
};
var adler = function() {
  var a2 = 1, b2 = 0;
  return {
    p: function(d2) {
      var n2 = a2, m2 = b2;
      var l2 = d2.length;
      for (var i2 = 0; i2 != l2; ) {
        var e = Math.min(i2 + 5552, l2);
        for (; i2 < e; ++i2) n2 += d2[i2], m2 += n2;
        n2 %= 65521, m2 %= 65521;
      }
      a2 = n2, b2 = m2;
    },
    d: function() {
      return (a2 >>> 8 << 16 | (b2 & 255) << 8 | b2 >>> 8) + ((a2 & 255) << 23) * 2;
    }
  };
};
var dopt = function(dat, opt, pre, post, st2) {
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 12 + opt.mem, pre, post, !st2);
};
var mrg = function(a2, b2) {
  var o2 = {};
  for (var k2 in a2) o2[k2] = a2[k2];
  for (var k2 in b2) o2[k2] = b2[k2];
  return o2;
};
var wcln = function(fn, fnStr, td) {
  var dt2 = fn();
  var st2 = fn.toString();
  var ks = st2.slice(st2.indexOf("[") + 1, st2.lastIndexOf("]")).replace(/ /g, "").split(",");
  for (var i2 = 0; i2 < dt2.length; ++i2) {
    var v2 = dt2[i2], k2 = ks[i2];
    if (typeof v2 == "function") {
      fnStr += ";" + k2 + "=";
      var st_1 = v2.toString();
      if (v2.prototype) {
        if (st_1.indexOf("[native code]") != -1) {
          var spInd = st_1.indexOf(" ", 8) + 1;
          fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
        } else {
          fnStr += st_1;
          for (var t in v2.prototype) fnStr += ";" + k2 + ".prototype." + t + "=" + v2.prototype[t].toString();
        }
      } else fnStr += st_1;
    } else td[k2] = v2;
  }
  return [fnStr, td];
};
var ch = [];
var cbfs = function(v2) {
  var tl = [];
  for (var k2 in v2) {
    if (v2[k2] instanceof u8 || v2[k2] instanceof u16 || v2[k2] instanceof u32) tl.push((v2[k2] = new v2[k2].constructor(v2[k2])).buffer);
  }
  return tl;
};
var wrkr = function(fns, init, id, cb) {
  var _a2;
  if (!ch[id]) {
    var fnStr = "", td_1 = {}, m2 = fns.length - 1;
    for (var i2 = 0; i2 < m2; ++i2) _a2 = wcln(fns[i2], fnStr, td_1), fnStr = _a2[0], td_1 = _a2[1];
    ch[id] = wcln(fns[m2], fnStr, td_1);
  }
  var td = mrg({}, ch[id][1]);
  return wk(ch[id][0] + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td, cbfs(td), cb);
};
var bInflt = function() {
  return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, hMap, max, bits, bits16, shft, slc, inflt, inflateSync, pbf, gu8];
};
var guze = function() {
  return [gzs, gzl];
};
var zule = function() {
  return [zlv];
};
var pbf = function(msg) {
  return postMessage(msg, [msg.buffer]);
};
var gu8 = function(o2) {
  return o2 && o2.size && new u8(o2.size);
};
var astrm = function(strm) {
  strm.ondata = function(dat, final) {
    return postMessage([dat, final], [dat.buffer]);
  };
  return function(ev) {
    return strm.push(ev.data[0], ev.data[1]);
  };
};
var astrmify = function(fns, strm, opts, init, id) {
  var t;
  var w2 = wrkr(fns, init, id, function(err, dat) {
    if (err) w2.terminate(), strm.ondata.call(strm, err);
    else {
      if (dat[1]) w2.terminate();
      strm.ondata.call(strm, err, dat[0], dat[1]);
    }
  });
  w2.postMessage(opts);
  strm.push = function(d2, f2) {
    if (t) throw "stream finished";
    if (!strm.ondata) throw "no stream handler";
    w2.postMessage([d2, t = f2], [d2.buffer]);
  };
  strm.terminate = function() {
    w2.terminate();
  };
};
var wbytes = function(d2, b2, v2) {
  for (; v2; ++b2) d2[b2] = v2, v2 >>>= 8;
};
var gzh = function(c2, o2) {
  var fn = o2.filename;
  c2[0] = 31, c2[1] = 139, c2[2] = 8, c2[8] = o2.level < 2 ? 4 : o2.level == 9 ? 2 : 0, c2[9] = 3;
  if (o2.mtime != 0) wbytes(c2, 4, Math.floor(new Date(o2.mtime || Date.now()) / 1e3));
  if (fn) {
    c2[3] = 8;
    for (var i2 = 0; i2 <= fn.length; ++i2) c2[i2 + 10] = fn.charCodeAt(i2);
  }
};
var gzs = function(d2) {
  if (d2[0] != 31 || d2[1] != 139 || d2[2] != 8) throw "invalid gzip data";
  var flg = d2[3];
  var st2 = 10;
  if (flg & 4) st2 += d2[10] | (d2[11] << 8) + 2;
  for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d2[st2++]) ;
  return st2 + (flg & 2);
};
var gzl = function(d2) {
  var l2 = d2.length;
  return (d2[l2 - 4] | d2[l2 - 3] << 8 | d2[l2 - 2] << 16) + 2 * (d2[l2 - 1] << 23);
};
var gzhl = function(o2) {
  return 10 + (o2.filename && o2.filename.length + 1 || 0);
};
var zlh = function(c2, o2) {
  var lv = o2.level, fl2 = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
  c2[0] = 120, c2[1] = fl2 << 6 | (fl2 ? 32 - 2 * fl2 : 1);
};
var zlv = function(d2) {
  if ((d2[0] & 15) != 8 || d2[0] >>> 4 > 7 || (d2[0] << 8 | d2[1]) % 31) throw "invalid zlib data";
  if (d2[1] & 32) throw "invalid zlib data: preset dictionaries not supported";
};
var Deflate = function() {
  function Deflate2(opts, cb) {
    if (!cb && typeof opts == "function") cb = opts, opts = {};
    this.ondata = cb;
    this.o = opts || {};
  }
  Deflate2.prototype.p = function(c2, f2) {
    this.ondata(dopt(c2, this.o, 0, 0, !f2), f2);
  };
  Deflate2.prototype.push = function(chunk, final) {
    if (this.d) throw "stream finished";
    if (!this.ondata) throw "no stream handler";
    this.d = final;
    this.p(chunk, final || false);
  };
  return Deflate2;
}();
var Inflate = function() {
  function Inflate2(cb) {
    this.s = {};
    this.p = new u8(0);
    this.ondata = cb;
  }
  Inflate2.prototype.e = function(c2) {
    if (this.d) throw "stream finished";
    if (!this.ondata) throw "no stream handler";
    var l2 = this.p.length;
    var n2 = new u8(l2 + c2.length);
    n2.set(this.p), n2.set(c2, l2), this.p = n2;
  };
  Inflate2.prototype.c = function(final) {
    this.d = this.s.i = final || false;
    var bts = this.s.b;
    var dt2 = inflt(this.p, this.o, this.s);
    this.ondata(slc(dt2, bts, this.s.b), this.d);
    this.o = slc(dt2, this.s.b - 32768), this.s.b = this.o.length;
    this.p = slc(this.p, this.s.p / 8 >> 0), this.s.p &= 7;
  };
  Inflate2.prototype.push = function(chunk, final) {
    this.e(chunk), this.c(final);
  };
  return Inflate2;
}();
var AsyncInflate = /* @__PURE__ */ function() {
  function AsyncInflate2(cb) {
    this.ondata = cb;
    astrmify([bInflt, function() {
      return [astrm, Inflate];
    }], this, 0, function() {
      var strm = new Inflate();
      onmessage = astrm(strm);
    }, 7);
  }
  return AsyncInflate2;
}();
function inflateSync(data, out) {
  return inflt(data, out);
}
var Gzip = function() {
  function Gzip2(opts, cb) {
    this.c = crc();
    this.l = 0;
    this.v = 1;
    Deflate.call(this, opts, cb);
  }
  Gzip2.prototype.push = function(chunk, final) {
    Deflate.prototype.push.call(this, chunk, final);
  };
  Gzip2.prototype.p = function(c2, f2) {
    this.c.p(c2);
    this.l += c2.length;
    var raw = dopt(c2, this.o, this.v && gzhl(this.o), f2 && 8, !f2);
    if (this.v) gzh(raw, this.o), this.v = 0;
    if (f2) wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
    this.ondata(raw, f2);
  };
  return Gzip2;
}();
var Gunzip = function() {
  function Gunzip2(cb) {
    this.v = 1;
    Inflate.call(this, cb);
  }
  Gunzip2.prototype.push = function(chunk, final) {
    Inflate.prototype.e.call(this, chunk);
    if (this.v) {
      var s2 = gzs(this.p);
      if (s2 >= this.p.length && !final) return;
      this.p = this.p.subarray(s2), this.v = 0;
    }
    if (final) {
      if (this.p.length < 8) throw "invalid gzip stream";
      this.p = this.p.subarray(0, -8);
    }
    Inflate.prototype.c.call(this, final);
  };
  return Gunzip2;
}();
var AsyncGunzip = /* @__PURE__ */ function() {
  function AsyncGunzip2(cb) {
    this.ondata = cb;
    astrmify([bInflt, guze, function() {
      return [astrm, Inflate, Gunzip];
    }], this, 0, function() {
      var strm = new Gunzip();
      onmessage = astrm(strm);
    }, 9);
  }
  return AsyncGunzip2;
}();
var Zlib = function() {
  function Zlib2(opts, cb) {
    this.c = adler();
    this.v = 1;
    Deflate.call(this, opts, cb);
  }
  Zlib2.prototype.push = function(chunk, final) {
    Deflate.prototype.push.call(this, chunk, final);
  };
  Zlib2.prototype.p = function(c2, f2) {
    this.c.p(c2);
    var raw = dopt(c2, this.o, this.v && 2, f2 && 4, !f2);
    if (this.v) zlh(raw, this.o), this.v = 0;
    if (f2) wbytes(raw, raw.length - 4, this.c.d());
    this.ondata(raw, f2);
  };
  return Zlib2;
}();
function zlibSync(data, opts) {
  if (opts === void 0) {
    opts = {};
  }
  var a2 = adler();
  a2.p(data);
  var d2 = dopt(data, opts, 2, 4);
  return zlh(d2, opts), wbytes(d2, d2.length - 4, a2.d()), d2;
}
var Unzlib = function() {
  function Unzlib2(cb) {
    this.v = 1;
    Inflate.call(this, cb);
  }
  Unzlib2.prototype.push = function(chunk, final) {
    Inflate.prototype.e.call(this, chunk);
    if (this.v) {
      if (this.p.length < 2 && !final) return;
      this.p = this.p.subarray(2), this.v = 0;
    }
    if (final) {
      if (this.p.length < 4) throw "invalid zlib stream";
      this.p = this.p.subarray(0, -4);
    }
    Inflate.prototype.c.call(this, final);
  };
  return Unzlib2;
}();
var AsyncUnzlib = /* @__PURE__ */ function() {
  function AsyncUnzlib2(cb) {
    this.ondata = cb;
    astrmify([bInflt, zule, function() {
      return [astrm, Inflate, Unzlib];
    }], this, 0, function() {
      var strm = new Unzlib();
      onmessage = astrm(strm);
    }, 11);
  }
  return AsyncUnzlib2;
}();
function unzlibSync(data, out) {
  return inflt((zlv(data), data.subarray(2, -4)), out);
}
var Decompress = function() {
  function Decompress2(cb) {
    this.G = Gunzip;
    this.I = Inflate;
    this.Z = Unzlib;
    this.ondata = cb;
  }
  Decompress2.prototype.push = function(chunk, final) {
    if (!this.ondata) throw "no stream handler";
    if (!this.s) {
      if (this.p && this.p.length) {
        var n2 = new u8(this.p.length + chunk.length);
        n2.set(this.p), n2.set(chunk, this.p.length);
      } else this.p = chunk;
      if (this.p.length > 2) {
        var _this_1 = this;
        var cb = function() {
          _this_1.ondata.apply(_this_1, arguments);
        };
        this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(cb) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(cb) : new this.Z(cb);
        this.s.push(this.p, final);
        this.p = null;
      }
    } else this.s.push(chunk, final);
  };
  return Decompress2;
}();
var AsyncDecompress = function() {
  function AsyncDecompress2(cb) {
    this.G = AsyncGunzip;
    this.I = AsyncInflate;
    this.Z = AsyncUnzlib;
    this.ondata = cb;
  }
  AsyncDecompress2.prototype.push = function(chunk, final) {
    Decompress.prototype.push.call(this, chunk, final);
  };
  return AsyncDecompress2;
}();

// node_modules/jspdf/dist/jspdf.es.min.js
var r = /* @__PURE__ */ function() {
  return "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this;
}();
function n() {
  r.console && "function" == typeof r.console.log && r.console.log.apply(r.console, arguments);
}
var i = {
  log: n,
  warn: function(t) {
    r.console && ("function" == typeof r.console.warn ? r.console.warn.apply(r.console, arguments) : n.call(null, arguments));
  },
  error: function(t) {
    r.console && ("function" == typeof r.console.error ? r.console.error.apply(r.console, arguments) : n(t));
  }
};
function a(t, e, r2) {
  var n2 = new XMLHttpRequest();
  n2.open("GET", t), n2.responseType = "blob", n2.onload = function() {
    l(n2.response, e, r2);
  }, n2.onerror = function() {
    i.error("could not download file");
  }, n2.send();
}
function o(t) {
  var e = new XMLHttpRequest();
  e.open("HEAD", t, false);
  try {
    e.send();
  } catch (t2) {
  }
  return e.status >= 200 && e.status <= 299;
}
function s(t) {
  try {
    t.dispatchEvent(new MouseEvent("click"));
  } catch (r2) {
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), t.dispatchEvent(e);
  }
}
var u;
var c;
var l = r.saveAs || ("object" != typeof window || window !== r ? function() {
} : "undefined" != typeof HTMLAnchorElement && "download" in HTMLAnchorElement.prototype ? function(t, e, n2) {
  var i2 = r.URL || r.webkitURL, u2 = document.createElement("a");
  e = e || t.name || "download", u2.download = e, u2.rel = "noopener", "string" == typeof t ? (u2.href = t, u2.origin !== location.origin ? o(u2.href) ? a(t, e, n2) : s(u2, u2.target = "_blank") : s(u2)) : (u2.href = i2.createObjectURL(t), setTimeout(function() {
    i2.revokeObjectURL(u2.href);
  }, 4e4), setTimeout(function() {
    s(u2);
  }, 0));
} : "msSaveOrOpenBlob" in navigator ? function(t, e, r2) {
  if (e = e || t.name || "download", "string" == typeof t) {
    if (o(t)) a(t, e, r2);
    else {
      var n2 = document.createElement("a");
      n2.href = t, n2.target = "_blank", setTimeout(function() {
        s(n2);
      });
    }
  } else navigator.msSaveOrOpenBlob(function(t2, e2) {
    return void 0 === e2 ? e2 = {
      autoBom: false
    } : "object" != typeof e2 && (i.warn("Deprecated: Expected third argument to be a object"), e2 = {
      autoBom: !e2
    }), e2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t2.type) ? new Blob([String.fromCharCode(65279), t2], {
      type: t2.type
    }) : t2;
  }(t, r2), e);
} : function(t, e, n2, i2) {
  if ((i2 = i2 || open("", "_blank")) && (i2.document.title = i2.document.body.innerText = "downloading..."), "string" == typeof t) return a(t, e, n2);
  var o2 = "application/octet-stream" === t.type, s2 = /constructor/i.test(r.HTMLElement) || r.safari, u2 = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((u2 || o2 && s2) && "object" == typeof FileReader) {
    var c2 = new FileReader();
    c2.onloadend = function() {
      var t2 = c2.result;
      t2 = u2 ? t2 : t2.replace(/^data:[^;]*;/, "data:attachment/file;"), i2 ? i2.location.href = t2 : location = t2, i2 = null;
    }, c2.readAsDataURL(t);
  } else {
    var l2 = r.URL || r.webkitURL, h2 = l2.createObjectURL(t);
    i2 ? i2.location = h2 : location.href = h2, i2 = null, setTimeout(function() {
      l2.revokeObjectURL(h2);
    }, 4e4);
  }
});
function h(t) {
  var e;
  t = t || "", this.ok = false, "#" == t.charAt(0) && (t = t.substr(1, 6));
  t = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "00ffff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000000",
    blanchedalmond: "ffebcd",
    blue: "0000ff",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "00ffff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dodgerblue: "1e90ff",
    feldspar: "d19275",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "ff00ff",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgrey: "d3d3d3",
    lightgreen: "90ee90",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslateblue: "8470ff",
    lightslategray: "778899",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "00ff00",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "ff00ff",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370d8",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "d87093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    red: "ff0000",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    violetred: "d02090",
    wheat: "f5deb3",
    white: "ffffff",
    whitesmoke: "f5f5f5",
    yellow: "ffff00",
    yellowgreen: "9acd32"
  }[t = (t = t.replace(/ /g, "")).toLowerCase()] || t;
  for (var r2 = [{
    re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
    example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
    process: function(t2) {
      return [parseInt(t2[1]), parseInt(t2[2]), parseInt(t2[3])];
    }
  }, {
    re: /^(\w{2})(\w{2})(\w{2})$/,
    example: ["#00ff00", "336699"],
    process: function(t2) {
      return [parseInt(t2[1], 16), parseInt(t2[2], 16), parseInt(t2[3], 16)];
    }
  }, {
    re: /^(\w{1})(\w{1})(\w{1})$/,
    example: ["#fb0", "f0f"],
    process: function(t2) {
      return [parseInt(t2[1] + t2[1], 16), parseInt(t2[2] + t2[2], 16), parseInt(t2[3] + t2[3], 16)];
    }
  }], n2 = 0; n2 < r2.length; n2++) {
    var i2 = r2[n2].re, a2 = r2[n2].process, o2 = i2.exec(t);
    o2 && (e = a2(o2), this.r = e[0], this.g = e[1], this.b = e[2], this.ok = true);
  }
  this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r, this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g, this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b, this.toRGB = function() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  }, this.toHex = function() {
    var t2 = this.r.toString(16), e2 = this.g.toString(16), r3 = this.b.toString(16);
    return 1 == t2.length && (t2 = "0" + t2), 1 == e2.length && (e2 = "0" + e2), 1 == r3.length && (r3 = "0" + r3), "#" + t2 + e2 + r3;
  };
}
function f(t, e) {
  var r2 = t[0], n2 = t[1], i2 = t[2], a2 = t[3];
  r2 = p(r2, n2, i2, a2, e[0], 7, -680876936), a2 = p(a2, r2, n2, i2, e[1], 12, -389564586), i2 = p(i2, a2, r2, n2, e[2], 17, 606105819), n2 = p(n2, i2, a2, r2, e[3], 22, -1044525330), r2 = p(r2, n2, i2, a2, e[4], 7, -176418897), a2 = p(a2, r2, n2, i2, e[5], 12, 1200080426), i2 = p(i2, a2, r2, n2, e[6], 17, -1473231341), n2 = p(n2, i2, a2, r2, e[7], 22, -45705983), r2 = p(r2, n2, i2, a2, e[8], 7, 1770035416), a2 = p(a2, r2, n2, i2, e[9], 12, -1958414417), i2 = p(i2, a2, r2, n2, e[10], 17, -42063), n2 = p(n2, i2, a2, r2, e[11], 22, -1990404162), r2 = p(r2, n2, i2, a2, e[12], 7, 1804603682), a2 = p(a2, r2, n2, i2, e[13], 12, -40341101), i2 = p(i2, a2, r2, n2, e[14], 17, -1502002290), r2 = g(r2, n2 = p(n2, i2, a2, r2, e[15], 22, 1236535329), i2, a2, e[1], 5, -165796510), a2 = g(a2, r2, n2, i2, e[6], 9, -1069501632), i2 = g(i2, a2, r2, n2, e[11], 14, 643717713), n2 = g(n2, i2, a2, r2, e[0], 20, -373897302), r2 = g(r2, n2, i2, a2, e[5], 5, -701558691), a2 = g(a2, r2, n2, i2, e[10], 9, 38016083), i2 = g(i2, a2, r2, n2, e[15], 14, -660478335), n2 = g(n2, i2, a2, r2, e[4], 20, -405537848), r2 = g(r2, n2, i2, a2, e[9], 5, 568446438), a2 = g(a2, r2, n2, i2, e[14], 9, -1019803690), i2 = g(i2, a2, r2, n2, e[3], 14, -187363961), n2 = g(n2, i2, a2, r2, e[8], 20, 1163531501), r2 = g(r2, n2, i2, a2, e[13], 5, -1444681467), a2 = g(a2, r2, n2, i2, e[2], 9, -51403784), i2 = g(i2, a2, r2, n2, e[7], 14, 1735328473), r2 = m(r2, n2 = g(n2, i2, a2, r2, e[12], 20, -1926607734), i2, a2, e[5], 4, -378558), a2 = m(a2, r2, n2, i2, e[8], 11, -2022574463), i2 = m(i2, a2, r2, n2, e[11], 16, 1839030562), n2 = m(n2, i2, a2, r2, e[14], 23, -35309556), r2 = m(r2, n2, i2, a2, e[1], 4, -1530992060), a2 = m(a2, r2, n2, i2, e[4], 11, 1272893353), i2 = m(i2, a2, r2, n2, e[7], 16, -155497632), n2 = m(n2, i2, a2, r2, e[10], 23, -1094730640), r2 = m(r2, n2, i2, a2, e[13], 4, 681279174), a2 = m(a2, r2, n2, i2, e[0], 11, -358537222), i2 = m(i2, a2, r2, n2, e[3], 16, -722521979), n2 = m(n2, i2, a2, r2, e[6], 23, 76029189), r2 = m(r2, n2, i2, a2, e[9], 4, -640364487), a2 = m(a2, r2, n2, i2, e[12], 11, -421815835), i2 = m(i2, a2, r2, n2, e[15], 16, 530742520), r2 = v(r2, n2 = m(n2, i2, a2, r2, e[2], 23, -995338651), i2, a2, e[0], 6, -198630844), a2 = v(a2, r2, n2, i2, e[7], 10, 1126891415), i2 = v(i2, a2, r2, n2, e[14], 15, -1416354905), n2 = v(n2, i2, a2, r2, e[5], 21, -57434055), r2 = v(r2, n2, i2, a2, e[12], 6, 1700485571), a2 = v(a2, r2, n2, i2, e[3], 10, -1894986606), i2 = v(i2, a2, r2, n2, e[10], 15, -1051523), n2 = v(n2, i2, a2, r2, e[1], 21, -2054922799), r2 = v(r2, n2, i2, a2, e[8], 6, 1873313359), a2 = v(a2, r2, n2, i2, e[15], 10, -30611744), i2 = v(i2, a2, r2, n2, e[6], 15, -1560198380), n2 = v(n2, i2, a2, r2, e[13], 21, 1309151649), r2 = v(r2, n2, i2, a2, e[4], 6, -145523070), a2 = v(a2, r2, n2, i2, e[11], 10, -1120210379), i2 = v(i2, a2, r2, n2, e[2], 15, 718787259), n2 = v(n2, i2, a2, r2, e[9], 21, -343485551), t[0] = x(r2, t[0]), t[1] = x(n2, t[1]), t[2] = x(i2, t[2]), t[3] = x(a2, t[3]);
}
function d(t, e, r2, n2, i2, a2) {
  return e = x(x(e, t), x(n2, a2)), x(e << i2 | e >>> 32 - i2, r2);
}
function p(t, e, r2, n2, i2, a2, o2) {
  return d(e & r2 | ~e & n2, t, e, i2, a2, o2);
}
function g(t, e, r2, n2, i2, a2, o2) {
  return d(e & n2 | r2 & ~n2, t, e, i2, a2, o2);
}
function m(t, e, r2, n2, i2, a2, o2) {
  return d(e ^ r2 ^ n2, t, e, i2, a2, o2);
}
function v(t, e, r2, n2, i2, a2, o2) {
  return d(r2 ^ (e | ~n2), t, e, i2, a2, o2);
}
function b(t) {
  var e, r2 = t.length, n2 = [1732584193, -271733879, -1732584194, 271733878];
  for (e = 64; e <= t.length; e += 64) f(n2, y(t.substring(e - 64, e)));
  t = t.substring(e - 64);
  var i2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (e = 0; e < t.length; e++) i2[e >> 2] |= t.charCodeAt(e) << (e % 4 << 3);
  if (i2[e >> 2] |= 128 << (e % 4 << 3), e > 55) for (f(n2, i2), e = 0; e < 16; e++) i2[e] = 0;
  return i2[14] = 8 * r2, f(n2, i2), n2;
}
function y(t) {
  var e, r2 = [];
  for (e = 0; e < 64; e += 4) r2[e >> 2] = t.charCodeAt(e) + (t.charCodeAt(e + 1) << 8) + (t.charCodeAt(e + 2) << 16) + (t.charCodeAt(e + 3) << 24);
  return r2;
}
u = r.atob.bind(r), c = r.btoa.bind(r);
var w = "0123456789abcdef".split("");
function N(t) {
  for (var e = "", r2 = 0; r2 < 4; r2++) e += w[t >> 8 * r2 + 4 & 15] + w[t >> 8 * r2 & 15];
  return e;
}
function L(t) {
  return String.fromCharCode((255 & t) >> 0, (65280 & t) >> 8, (16711680 & t) >> 16, (4278190080 & t) >> 24);
}
function A(t) {
  return b(t).map(L).join("");
}
function x(t, e) {
  return t + e & 4294967295;
}
if ("5d41402abc4b2a76b9719d911017c592" != function(t) {
  for (var e = 0; e < t.length; e++) t[e] = N(t[e]);
  return t.join("");
}(b("hello"))) {
  let x2 = function(t, e) {
    var r2 = (65535 & t) + (65535 & e);
    return (t >> 16) + (e >> 16) + (r2 >> 16) << 16 | 65535 & r2;
  };
}
function S(t, e) {
  var r2, n2, i2, a2;
  if (t !== r2) {
    for (var o2 = (i2 = t, a2 = 1 + (256 / t.length >> 0), new Array(a2 + 1).join(i2)), s2 = [], u2 = 0; u2 < 256; u2++) s2[u2] = u2;
    var c2 = 0;
    for (u2 = 0; u2 < 256; u2++) {
      var l2 = s2[u2];
      c2 = (c2 + l2 + o2.charCodeAt(u2)) % 256, s2[u2] = s2[c2], s2[c2] = l2;
    }
    r2 = t, n2 = s2;
  } else s2 = n2;
  var h2 = e.length, f2 = 0, d2 = 0, p2 = "";
  for (u2 = 0; u2 < h2; u2++) d2 = (d2 + (l2 = s2[f2 = (f2 + 1) % 256])) % 256, s2[f2] = s2[d2], s2[d2] = l2, o2 = s2[(s2[f2] + s2[d2]) % 256], p2 += String.fromCharCode(e.charCodeAt(u2) ^ o2);
  return p2;
}
var _ = {
  print: 4,
  modify: 8,
  copy: 16,
  "annot-forms": 32
};
function P(t, e, r2, n2) {
  this.v = 1, this.r = 2;
  let i2 = 192;
  t.forEach(function(t2) {
    if (void 0 !== _.perm) throw new Error("Invalid permission: " + t2);
    i2 += _[t2];
  }), this.padding = "(¿N^NuAd\0NVÿú\b..\0¶Ðh>/\f©þdSiz";
  let a2 = (e + this.padding).substr(0, 32), o2 = (r2 + this.padding).substr(0, 32);
  this.O = this.processOwnerPassword(a2, o2), this.P = -(1 + (255 ^ i2)), this.encryptionKey = A(a2 + this.O + this.lsbFirstWord(this.P) + this.hexToBytes(n2)).substr(0, 5), this.U = S(this.encryptionKey, this.padding);
}
function k(t) {
  if ("object" != typeof t) throw new Error("Invalid Context passed to initialize PubSub (jsPDF-module)");
  var e = {};
  this.subscribe = function(t2, r2, n2) {
    if (n2 = n2 || false, "string" != typeof t2 || "function" != typeof r2 || "boolean" != typeof n2) throw new Error("Invalid arguments passed to PubSub.subscribe (jsPDF-module)");
    e.hasOwnProperty(t2) || (e[t2] = {});
    var i2 = Math.random().toString(35);
    return e[t2][i2] = [r2, !!n2], i2;
  }, this.unsubscribe = function(t2) {
    for (var r2 in e) if (e[r2][t2]) return delete e[r2][t2], 0 === Object.keys(e[r2]).length && delete e[r2], true;
    return false;
  }, this.publish = function(n2) {
    if (e.hasOwnProperty(n2)) {
      var a2 = Array.prototype.slice.call(arguments, 1), o2 = [];
      for (var s2 in e[n2]) {
        var u2 = e[n2][s2];
        try {
          u2[0].apply(t, a2);
        } catch (t2) {
          r.console && i.error("jsPDF PubSub Error", t2.message, t2);
        }
        u2[1] && o2.push(s2);
      }
      o2.length && o2.forEach(this.unsubscribe);
    }
  }, this.getTopics = function() {
    return e;
  };
}
function I(t) {
  if (!(this instanceof I)) return new I(t);
  var e = "opacity,stroke-opacity".split(",");
  for (var r2 in t) t.hasOwnProperty(r2) && e.indexOf(r2) >= 0 && (this[r2] = t[r2]);
  this.id = "", this.objectNumber = -1;
}
function F(t, e) {
  this.gState = t, this.matrix = e, this.id = "", this.objectNumber = -1;
}
function C(t, e, r2, n2, i2) {
  if (!(this instanceof C)) return new C(t, e, r2, n2, i2);
  this.type = "axial" === t ? 2 : 3, this.coords = e, this.colors = r2, F.call(this, n2, i2);
}
function j(t, e, r2, n2, i2) {
  if (!(this instanceof j)) return new j(t, e, r2, n2, i2);
  this.boundingBox = t, this.xStep = e, this.yStep = r2, this.stream = "", this.cloneIndex = 0, F.call(this, n2, i2);
}
function O(t) {
  var e, n2 = "string" == typeof arguments[0] ? arguments[0] : "p", a2 = arguments[1], o2 = arguments[2], s2 = arguments[3], u2 = [], f2 = 1, d2 = 16, p2 = "S", g2 = null;
  "object" == typeof (t = t || {}) && (n2 = t.orientation, a2 = t.unit || a2, o2 = t.format || o2, s2 = t.compress || t.compressPdf || s2, null !== (g2 = t.encryption || null) && (g2.userPassword = g2.userPassword || "", g2.ownerPassword = g2.ownerPassword || "", g2.userPermissions = g2.userPermissions || []), f2 = "number" == typeof t.userUnit ? Math.abs(t.userUnit) : 1, void 0 !== t.precision && (e = t.precision), void 0 !== t.floatPrecision && (d2 = t.floatPrecision), p2 = t.defaultPathOperation || "S"), u2 = t.filters || (true === s2 ? ["FlateEncode"] : u2), a2 = a2 || "mm", n2 = ("" + (n2 || "P")).toLowerCase();
  var m2 = t.putOnlyUsedFonts || false, v2 = {}, b2 = {
    internal: {},
    __private__: {}
  };
  b2.__private__.PubSub = k;
  var y2 = "1.3", w2 = b2.__private__.getPdfVersion = function() {
    return y2;
  };
  b2.__private__.setPdfVersion = function(t2) {
    y2 = t2;
  };
  var N2 = {
    a0: [2383.94, 3370.39],
    a1: [1683.78, 2383.94],
    a2: [1190.55, 1683.78],
    a3: [841.89, 1190.55],
    a4: [595.28, 841.89],
    a5: [419.53, 595.28],
    a6: [297.64, 419.53],
    a7: [209.76, 297.64],
    a8: [147.4, 209.76],
    a9: [104.88, 147.4],
    a10: [73.7, 104.88],
    b0: [2834.65, 4008.19],
    b1: [2004.09, 2834.65],
    b2: [1417.32, 2004.09],
    b3: [1000.63, 1417.32],
    b4: [708.66, 1000.63],
    b5: [498.9, 708.66],
    b6: [354.33, 498.9],
    b7: [249.45, 354.33],
    b8: [175.75, 249.45],
    b9: [124.72, 175.75],
    b10: [87.87, 124.72],
    c0: [2599.37, 3676.54],
    c1: [1836.85, 2599.37],
    c2: [1298.27, 1836.85],
    c3: [918.43, 1298.27],
    c4: [649.13, 918.43],
    c5: [459.21, 649.13],
    c6: [323.15, 459.21],
    c7: [229.61, 323.15],
    c8: [161.57, 229.61],
    c9: [113.39, 161.57],
    c10: [79.37, 113.39],
    dl: [311.81, 623.62],
    letter: [612, 792],
    "government-letter": [576, 756],
    legal: [612, 1008],
    "junior-legal": [576, 360],
    ledger: [1224, 792],
    tabloid: [792, 1224],
    "credit-card": [153, 243]
  };
  b2.__private__.getPageFormats = function() {
    return N2;
  };
  var L2 = b2.__private__.getPageFormat = function(t2) {
    return N2[t2];
  };
  o2 = o2 || "a4";
  var A2 = {
    COMPAT: "compat",
    ADVANCED: "advanced"
  }, x2 = A2.COMPAT;
  function S2() {
    this.saveGraphicsState(), ct2(new Ht2(xt2, 0, 0, -xt2, 0, Er() * xt2).toString() + " cm"), this.setFontSize(this.getFontSize() / xt2), p2 = "n", x2 = A2.ADVANCED;
  }
  function _2() {
    this.restoreGraphicsState(), p2 = "S", x2 = A2.COMPAT;
  }
  var F2 = function(t2, e2) {
    if ("bold" == t2 && "normal" == e2 || "bold" == t2 && 400 == e2 || "normal" == t2 && "italic" == e2 || "bold" == t2 && "italic" == e2) throw new Error("Invalid Combination of fontweight and fontstyle");
    return e2 && t2 !== e2 && (t2 = 400 == e2 ? "italic" == t2 ? "italic" : "normal" : 700 == e2 && "italic" !== t2 ? "bold" : t2 + "" + e2), t2;
  };
  b2.advancedAPI = function(t2) {
    var e2 = x2 === A2.COMPAT;
    return e2 && S2.call(this), "function" != typeof t2 || (t2(this), e2 && _2.call(this)), this;
  }, b2.compatAPI = function(t2) {
    var e2 = x2 === A2.ADVANCED;
    return e2 && _2.call(this), "function" != typeof t2 || (t2(this), e2 && S2.call(this)), this;
  }, b2.isAdvancedAPI = function() {
    return x2 === A2.ADVANCED;
  };
  var B2, M2 = function(t2) {
    if (x2 !== A2.ADVANCED) throw new Error(t2 + " is only available in 'advanced' API mode. You need to call advancedAPI() first.");
  }, E2 = b2.roundToPrecision = b2.__private__.roundToPrecision = function(t2, r2) {
    var n3 = e || r2;
    if (isNaN(t2) || isNaN(n3)) throw new Error("Invalid argument passed to jsPDF.roundToPrecision");
    return t2.toFixed(n3).replace(/0+$/, "");
  };
  B2 = b2.hpf = b2.__private__.hpf = "number" == typeof d2 ? function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return E2(t2, d2);
  } : "smart" === d2 ? function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return E2(t2, t2 > -1 && t2 < 1 ? 16 : 5);
  } : function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return E2(t2, 16);
  };
  var q2 = b2.f2 = b2.__private__.f2 = function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.f2");
    return E2(t2, 2);
  }, R2 = b2.__private__.f3 = function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.f3");
    return E2(t2, 3);
  }, T2 = b2.scale = b2.__private__.scale = function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.scale");
    return x2 === A2.COMPAT ? t2 * xt2 : x2 === A2.ADVANCED ? t2 : void 0;
  }, D2 = function(t2) {
    return x2 === A2.COMPAT ? Er() - t2 : x2 === A2.ADVANCED ? t2 : void 0;
  }, U2 = function(t2) {
    return T2(D2(t2));
  };
  b2.__private__.setPrecision = b2.setPrecision = function(t2) {
    "number" == typeof parseInt(t2, 10) && (e = parseInt(t2, 10));
  };
  var z2, H2 = "00000000000000000000000000000000", V2 = b2.__private__.getFileId = function() {
    return H2;
  }, W2 = b2.__private__.setFileId = function(t2) {
    return H2 = void 0 !== t2 && /^[a-fA-F0-9]{32}$/.test(t2) ? t2.toUpperCase() : H2.split("").map(function() {
      return "ABCDEF0123456789".charAt(Math.floor(16 * Math.random()));
    }).join(""), null !== g2 && (We = new P(g2.userPermissions, g2.userPassword, g2.ownerPassword, H2)), H2;
  };
  b2.setFileId = function(t2) {
    return W2(t2), this;
  }, b2.getFileId = function() {
    return V2();
  };
  var G2 = b2.__private__.convertDateToPDFDate = function(t2) {
    var e2 = t2.getTimezoneOffset(), r2 = e2 < 0 ? "+" : "-", n3 = Math.floor(Math.abs(e2 / 60)), i2 = Math.abs(e2 % 60), a3 = [r2, Z2(n3), "'", Z2(i2), "'"].join("");
    return ["D:", t2.getFullYear(), Z2(t2.getMonth() + 1), Z2(t2.getDate()), Z2(t2.getHours()), Z2(t2.getMinutes()), Z2(t2.getSeconds()), a3].join("");
  }, Y2 = b2.__private__.convertPDFDateToDate = function(t2) {
    var e2 = parseInt(t2.substr(2, 4), 10), r2 = parseInt(t2.substr(6, 2), 10) - 1, n3 = parseInt(t2.substr(8, 2), 10), i2 = parseInt(t2.substr(10, 2), 10), a3 = parseInt(t2.substr(12, 2), 10), o3 = parseInt(t2.substr(14, 2), 10);
    return new Date(e2, r2, n3, i2, a3, o3, 0);
  }, J2 = b2.__private__.setCreationDate = function(t2) {
    var e2;
    if (void 0 === t2 && (t2 = /* @__PURE__ */ new Date()), t2 instanceof Date) e2 = G2(t2);
    else {
      if (!/^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|-0[0-9]|-1[0-1])'(0[0-9]|[1-5][0-9])'?$/.test(t2)) throw new Error("Invalid argument passed to jsPDF.setCreationDate");
      e2 = t2;
    }
    return z2 = e2;
  }, X2 = b2.__private__.getCreationDate = function(t2) {
    var e2 = z2;
    return "jsDate" === t2 && (e2 = Y2(z2)), e2;
  };
  b2.setCreationDate = function(t2) {
    return J2(t2), this;
  }, b2.getCreationDate = function(t2) {
    return X2(t2);
  };
  var K2, Z2 = b2.__private__.padd2 = function(t2) {
    return ("0" + parseInt(t2)).slice(-2);
  }, $2 = b2.__private__.padd2Hex = function(t2) {
    return ("00" + (t2 = t2.toString())).substr(t2.length);
  }, Q2 = 0, tt2 = [], et3 = [], rt2 = 0, nt2 = [], it2 = [], at2 = false, ot2 = et3, st2 = function() {
    Q2 = 0, rt2 = 0, et3 = [], tt2 = [], nt2 = [], Zt2 = Jt2(), $t2 = Jt2();
  };
  b2.__private__.setCustomOutputDestination = function(t2) {
    at2 = true, ot2 = t2;
  };
  var ut2 = function(t2) {
    at2 || (ot2 = t2);
  };
  b2.__private__.resetCustomOutputDestination = function() {
    at2 = false, ot2 = et3;
  };
  var ct2 = b2.__private__.out = function(t2) {
    return t2 = t2.toString(), rt2 += t2.length + 1, ot2.push(t2), ot2;
  }, lt2 = b2.__private__.write = function(t2) {
    return ct2(1 === arguments.length ? t2.toString() : Array.prototype.join.call(arguments, " "));
  }, ht2 = b2.__private__.getArrayBuffer = function(t2) {
    for (var e2 = t2.length, r2 = new ArrayBuffer(e2), n3 = new Uint8Array(r2); e2--; ) n3[e2] = t2.charCodeAt(e2);
    return r2;
  }, ft2 = [["Helvetica", "helvetica", "normal", "WinAnsiEncoding"], ["Helvetica-Bold", "helvetica", "bold", "WinAnsiEncoding"], ["Helvetica-Oblique", "helvetica", "italic", "WinAnsiEncoding"], ["Helvetica-BoldOblique", "helvetica", "bolditalic", "WinAnsiEncoding"], ["Courier", "courier", "normal", "WinAnsiEncoding"], ["Courier-Bold", "courier", "bold", "WinAnsiEncoding"], ["Courier-Oblique", "courier", "italic", "WinAnsiEncoding"], ["Courier-BoldOblique", "courier", "bolditalic", "WinAnsiEncoding"], ["Times-Roman", "times", "normal", "WinAnsiEncoding"], ["Times-Bold", "times", "bold", "WinAnsiEncoding"], ["Times-Italic", "times", "italic", "WinAnsiEncoding"], ["Times-BoldItalic", "times", "bolditalic", "WinAnsiEncoding"], ["ZapfDingbats", "zapfdingbats", "normal", null], ["Symbol", "symbol", "normal", null]];
  b2.__private__.getStandardFonts = function() {
    return ft2;
  };
  var dt2 = t.fontSize || 16;
  b2.__private__.setFontSize = b2.setFontSize = function(t2) {
    return dt2 = x2 === A2.ADVANCED ? t2 / xt2 : t2, this;
  };
  var pt2, gt2 = b2.__private__.getFontSize = b2.getFontSize = function() {
    return x2 === A2.COMPAT ? dt2 : dt2 * xt2;
  }, mt2 = t.R2L || false;
  b2.__private__.setR2L = b2.setR2L = function(t2) {
    return mt2 = t2, this;
  }, b2.__private__.getR2L = b2.getR2L = function() {
    return mt2;
  };
  var vt2, bt2 = b2.__private__.setZoomMode = function(t2) {
    var e2 = [void 0, null, "fullwidth", "fullheight", "fullpage", "original"];
    if (/^\d*\.?\d*%$/.test(t2)) pt2 = t2;
    else if (isNaN(t2)) {
      if (-1 === e2.indexOf(t2)) throw new Error('zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "' + t2 + '" is not recognized.');
      pt2 = t2;
    } else pt2 = parseInt(t2, 10);
  };
  b2.__private__.getZoomMode = function() {
    return pt2;
  };
  var yt2, wt2 = b2.__private__.setPageMode = function(t2) {
    if (-1 == [void 0, null, "UseNone", "UseOutlines", "UseThumbs", "FullScreen"].indexOf(t2)) throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "' + t2 + '" is not recognized.');
    vt2 = t2;
  };
  b2.__private__.getPageMode = function() {
    return vt2;
  };
  var Nt2 = b2.__private__.setLayoutMode = function(t2) {
    if (-1 == [void 0, null, "continuous", "single", "twoleft", "tworight", "two"].indexOf(t2)) throw new Error('Layout mode must be one of continuous, single, twoleft, tworight. "' + t2 + '" is not recognized.');
    yt2 = t2;
  };
  b2.__private__.getLayoutMode = function() {
    return yt2;
  }, b2.__private__.setDisplayMode = b2.setDisplayMode = function(t2, e2, r2) {
    return bt2(t2), Nt2(e2), wt2(r2), this;
  };
  var Lt2 = {
    title: "",
    subject: "",
    author: "",
    keywords: "",
    creator: ""
  };
  b2.__private__.getDocumentProperty = function(t2) {
    if (-1 === Object.keys(Lt2).indexOf(t2)) throw new Error("Invalid argument passed to jsPDF.getDocumentProperty");
    return Lt2[t2];
  }, b2.__private__.getDocumentProperties = function() {
    return Lt2;
  }, b2.__private__.setDocumentProperties = b2.setProperties = b2.setDocumentProperties = function(t2) {
    for (var e2 in Lt2) Lt2.hasOwnProperty(e2) && t2[e2] && (Lt2[e2] = t2[e2]);
    return this;
  }, b2.__private__.setDocumentProperty = function(t2, e2) {
    if (-1 === Object.keys(Lt2).indexOf(t2)) throw new Error("Invalid arguments passed to jsPDF.setDocumentProperty");
    return Lt2[t2] = e2;
  };
  var At2, xt2, St2, _t2, Pt2, kt2 = {}, It2 = {}, Ft2 = [], Ct2 = {}, jt2 = {}, Ot2 = {}, Bt2 = {}, Mt2 = null, Et2 = 0, qt2 = [], Rt2 = new k(b2), Tt2 = t.hotfixes || [], Dt2 = {}, Ut2 = {}, zt2 = [], Ht2 = function(t2, e2, r2, n3, i2, a3) {
    if (!(this instanceof Ht2)) return new Ht2(t2, e2, r2, n3, i2, a3);
    isNaN(t2) && (t2 = 1), isNaN(e2) && (e2 = 0), isNaN(r2) && (r2 = 0), isNaN(n3) && (n3 = 1), isNaN(i2) && (i2 = 0), isNaN(a3) && (a3 = 0), this._matrix = [t2, e2, r2, n3, i2, a3];
  };
  Object.defineProperty(Ht2.prototype, "sx", {
    get: function() {
      return this._matrix[0];
    },
    set: function(t2) {
      this._matrix[0] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "shy", {
    get: function() {
      return this._matrix[1];
    },
    set: function(t2) {
      this._matrix[1] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "shx", {
    get: function() {
      return this._matrix[2];
    },
    set: function(t2) {
      this._matrix[2] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "sy", {
    get: function() {
      return this._matrix[3];
    },
    set: function(t2) {
      this._matrix[3] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "tx", {
    get: function() {
      return this._matrix[4];
    },
    set: function(t2) {
      this._matrix[4] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "ty", {
    get: function() {
      return this._matrix[5];
    },
    set: function(t2) {
      this._matrix[5] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "a", {
    get: function() {
      return this._matrix[0];
    },
    set: function(t2) {
      this._matrix[0] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "b", {
    get: function() {
      return this._matrix[1];
    },
    set: function(t2) {
      this._matrix[1] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "c", {
    get: function() {
      return this._matrix[2];
    },
    set: function(t2) {
      this._matrix[2] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "d", {
    get: function() {
      return this._matrix[3];
    },
    set: function(t2) {
      this._matrix[3] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "e", {
    get: function() {
      return this._matrix[4];
    },
    set: function(t2) {
      this._matrix[4] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "f", {
    get: function() {
      return this._matrix[5];
    },
    set: function(t2) {
      this._matrix[5] = t2;
    }
  }), Object.defineProperty(Ht2.prototype, "rotation", {
    get: function() {
      return Math.atan2(this.shx, this.sx);
    }
  }), Object.defineProperty(Ht2.prototype, "scaleX", {
    get: function() {
      return this.decompose().scale.sx;
    }
  }), Object.defineProperty(Ht2.prototype, "scaleY", {
    get: function() {
      return this.decompose().scale.sy;
    }
  }), Object.defineProperty(Ht2.prototype, "isIdentity", {
    get: function() {
      return 1 === this.sx && 0 === this.shy && 0 === this.shx && 1 === this.sy && 0 === this.tx && 0 === this.ty;
    }
  }), Ht2.prototype.join = function(t2) {
    return [this.sx, this.shy, this.shx, this.sy, this.tx, this.ty].map(B2).join(t2);
  }, Ht2.prototype.multiply = function(t2) {
    var e2 = t2.sx * this.sx + t2.shy * this.shx, r2 = t2.sx * this.shy + t2.shy * this.sy, n3 = t2.shx * this.sx + t2.sy * this.shx, i2 = t2.shx * this.shy + t2.sy * this.sy, a3 = t2.tx * this.sx + t2.ty * this.shx + this.tx, o3 = t2.tx * this.shy + t2.ty * this.sy + this.ty;
    return new Ht2(e2, r2, n3, i2, a3, o3);
  }, Ht2.prototype.decompose = function() {
    var t2 = this.sx, e2 = this.shy, r2 = this.shx, n3 = this.sy, i2 = this.tx, a3 = this.ty, o3 = Math.sqrt(t2 * t2 + e2 * e2), s3 = (t2 /= o3) * r2 + (e2 /= o3) * n3;
    r2 -= t2 * s3, n3 -= e2 * s3;
    var u3 = Math.sqrt(r2 * r2 + n3 * n3);
    return s3 /= u3, t2 * (n3 /= u3) < e2 * (r2 /= u3) && (t2 = -t2, e2 = -e2, s3 = -s3, o3 = -o3), {
      scale: new Ht2(o3, 0, 0, u3, 0, 0),
      translate: new Ht2(1, 0, 0, 1, i2, a3),
      rotate: new Ht2(t2, e2, -e2, t2, 0, 0),
      skew: new Ht2(1, 0, s3, 1, 0, 0)
    };
  }, Ht2.prototype.toString = function(t2) {
    return this.join(" ");
  }, Ht2.prototype.inversed = function() {
    var t2 = this.sx, e2 = this.shy, r2 = this.shx, n3 = this.sy, i2 = this.tx, a3 = this.ty, o3 = 1 / (t2 * n3 - e2 * r2), s3 = n3 * o3, u3 = -e2 * o3, c2 = -r2 * o3, l2 = t2 * o3;
    return new Ht2(s3, u3, c2, l2, -s3 * i2 - c2 * a3, -u3 * i2 - l2 * a3);
  }, Ht2.prototype.applyToPoint = function(t2) {
    var e2 = t2.x * this.sx + t2.y * this.shx + this.tx, r2 = t2.x * this.shy + t2.y * this.sy + this.ty;
    return new kr(e2, r2);
  }, Ht2.prototype.applyToRectangle = function(t2) {
    var e2 = this.applyToPoint(t2), r2 = this.applyToPoint(new kr(t2.x + t2.w, t2.y + t2.h));
    return new Ir(e2.x, e2.y, r2.x - e2.x, r2.y - e2.y);
  }, Ht2.prototype.clone = function() {
    var t2 = this.sx, e2 = this.shy, r2 = this.shx, n3 = this.sy, i2 = this.tx, a3 = this.ty;
    return new Ht2(t2, e2, r2, n3, i2, a3);
  }, b2.Matrix = Ht2;
  var Vt2 = b2.matrixMult = function(t2, e2) {
    return e2.multiply(t2);
  }, Wt2 = new Ht2(1, 0, 0, 1, 0, 0);
  b2.unitMatrix = b2.identityMatrix = Wt2;
  var Gt2 = function(t2, e2) {
    if (!jt2[t2]) {
      var r2 = (e2 instanceof C ? "Sh" : "P") + (Object.keys(Ct2).length + 1).toString(10);
      e2.id = r2, jt2[t2] = r2, Ct2[r2] = e2, Rt2.publish("addPattern", e2);
    }
  };
  b2.ShadingPattern = C, b2.TilingPattern = j, b2.addShadingPattern = function(t2, e2) {
    return M2("addShadingPattern()"), Gt2(t2, e2), this;
  }, b2.beginTilingPattern = function(t2) {
    M2("beginTilingPattern()"), Cr(t2.boundingBox[0], t2.boundingBox[1], t2.boundingBox[2] - t2.boundingBox[0], t2.boundingBox[3] - t2.boundingBox[1], t2.matrix);
  }, b2.endTilingPattern = function(t2, e2) {
    M2("endTilingPattern()"), e2.stream = it2[K2].join("\n"), Gt2(t2, e2), Rt2.publish("endTilingPattern", e2), zt2.pop().restore();
  };
  var Yt2 = b2.__private__.newObject = function() {
    var t2 = Jt2();
    return Xt2(t2, true), t2;
  }, Jt2 = b2.__private__.newObjectDeferred = function() {
    return Q2++, tt2[Q2] = function() {
      return rt2;
    }, Q2;
  }, Xt2 = function(t2, e2) {
    return e2 = "boolean" == typeof e2 && e2, tt2[t2] = rt2, e2 && ct2(t2 + " 0 obj"), t2;
  }, Kt2 = b2.__private__.newAdditionalObject = function() {
    var t2 = {
      objId: Jt2(),
      content: ""
    };
    return nt2.push(t2), t2;
  }, Zt2 = Jt2(), $t2 = Jt2(), Qt2 = b2.__private__.decodeColorString = function(t2) {
    var e2 = t2.split(" ");
    if (2 !== e2.length || "g" !== e2[1] && "G" !== e2[1]) {
      if (5 === e2.length && ("k" === e2[4] || "K" === e2[4])) {
        e2 = [(1 - e2[0]) * (1 - e2[3]), (1 - e2[1]) * (1 - e2[3]), (1 - e2[2]) * (1 - e2[3]), "r"];
      }
    } else {
      var r2 = parseFloat(e2[0]);
      e2 = [r2, r2, r2, "r"];
    }
    for (var n3 = "#", i2 = 0; i2 < 3; i2++) n3 += ("0" + Math.floor(255 * parseFloat(e2[i2])).toString(16)).slice(-2);
    return n3;
  }, te2 = b2.__private__.encodeColorString = function(t2) {
    var e2;
    "string" == typeof t2 && (t2 = {
      ch1: t2
    });
    var r2 = t2.ch1, n3 = t2.ch2, i2 = t2.ch3, a3 = t2.ch4, o3 = "draw" === t2.pdfColorType ? ["G", "RG", "K"] : ["g", "rg", "k"];
    if ("string" == typeof r2 && "#" !== r2.charAt(0)) {
      var s3 = new h(r2);
      if (s3.ok) r2 = s3.toHex();
      else if (!/^\d*\.?\d*$/.test(r2)) throw new Error('Invalid color "' + r2 + '" passed to jsPDF.encodeColorString.');
    }
    if ("string" == typeof r2 && /^#[0-9A-Fa-f]{3}$/.test(r2) && (r2 = "#" + r2[1] + r2[1] + r2[2] + r2[2] + r2[3] + r2[3]), "string" == typeof r2 && /^#[0-9A-Fa-f]{6}$/.test(r2)) {
      var u3 = parseInt(r2.substr(1), 16);
      r2 = u3 >> 16 & 255, n3 = u3 >> 8 & 255, i2 = 255 & u3;
    }
    if (void 0 === n3 || void 0 === a3 && r2 === n3 && n3 === i2) {
      if ("string" == typeof r2) e2 = r2 + " " + o3[0];
      else switch (t2.precision) {
        case 2:
          e2 = q2(r2 / 255) + " " + o3[0];
          break;
        case 3:
        default:
          e2 = R2(r2 / 255) + " " + o3[0];
      }
    } else if (void 0 === a3 || "object" == typeof a3) {
      if (a3 && !isNaN(a3.a) && 0 === a3.a) return e2 = ["1.", "1.", "1.", o3[1]].join(" ");
      if ("string" == typeof r2) e2 = [r2, n3, i2, o3[1]].join(" ");
      else switch (t2.precision) {
        case 2:
          e2 = [q2(r2 / 255), q2(n3 / 255), q2(i2 / 255), o3[1]].join(" ");
          break;
        default:
        case 3:
          e2 = [R2(r2 / 255), R2(n3 / 255), R2(i2 / 255), o3[1]].join(" ");
      }
    } else if ("string" == typeof r2) e2 = [r2, n3, i2, a3, o3[2]].join(" ");
    else switch (t2.precision) {
      case 2:
        e2 = [q2(r2), q2(n3), q2(i2), q2(a3), o3[2]].join(" ");
        break;
      case 3:
      default:
        e2 = [R2(r2), R2(n3), R2(i2), R2(a3), o3[2]].join(" ");
    }
    return e2;
  }, ee2 = b2.__private__.getFilters = function() {
    return u2;
  }, re2 = b2.__private__.putStream = function(t2) {
    var e2 = (t2 = t2 || {}).data || "", r2 = t2.filters || ee2(), n3 = t2.alreadyAppliedFilters || [], i2 = t2.addLength1 || false, a3 = e2.length, o3 = t2.objectId, s3 = function(t3) {
      return t3;
    };
    if (null !== g2 && void 0 === o3) throw new Error("ObjectId must be passed to putStream for file encryption");
    null !== g2 && (s3 = We.encryptor(o3, 0));
    var u3 = {};
    true === r2 && (r2 = ["FlateEncode"]);
    var c2 = t2.additionalKeyValues || [], l2 = (u3 = void 0 !== O.API.processDataByFilters ? O.API.processDataByFilters(e2, r2) : {
      data: e2,
      reverseChain: []
    }).reverseChain + (Array.isArray(n3) ? n3.join(" ") : n3.toString());
    if (0 !== u3.data.length && (c2.push({
      key: "Length",
      value: u3.data.length
    }), true === i2 && c2.push({
      key: "Length1",
      value: a3
    })), 0 != l2.length) if (l2.split("/").length - 1 == 1) c2.push({
      key: "Filter",
      value: l2
    });
    else {
      c2.push({
        key: "Filter",
        value: "[" + l2 + "]"
      });
      for (var h2 = 0; h2 < c2.length; h2 += 1) if ("DecodeParms" === c2[h2].key) {
        for (var f3 = [], d3 = 0; d3 < u3.reverseChain.split("/").length - 1; d3 += 1) f3.push("null");
        f3.push(c2[h2].value), c2[h2].value = "[" + f3.join(" ") + "]";
      }
    }
    ct2("<<");
    for (var p3 = 0; p3 < c2.length; p3++) ct2("/" + c2[p3].key + " " + c2[p3].value);
    ct2(">>"), 0 !== u3.data.length && (ct2("stream"), ct2(s3(u3.data)), ct2("endstream"));
  }, ne2 = b2.__private__.putPage = function(t2) {
    var e2 = t2.number, r2 = t2.data, n3 = t2.objId, i2 = t2.contentsObjId;
    Xt2(n3, true), ct2("<</Type /Page"), ct2("/Parent " + t2.rootDictionaryObjId + " 0 R"), ct2("/Resources " + t2.resourceDictionaryObjId + " 0 R"), ct2("/MediaBox [" + parseFloat(B2(t2.mediaBox.bottomLeftX)) + " " + parseFloat(B2(t2.mediaBox.bottomLeftY)) + " " + B2(t2.mediaBox.topRightX) + " " + B2(t2.mediaBox.topRightY) + "]"), null !== t2.cropBox && ct2("/CropBox [" + B2(t2.cropBox.bottomLeftX) + " " + B2(t2.cropBox.bottomLeftY) + " " + B2(t2.cropBox.topRightX) + " " + B2(t2.cropBox.topRightY) + "]"), null !== t2.bleedBox && ct2("/BleedBox [" + B2(t2.bleedBox.bottomLeftX) + " " + B2(t2.bleedBox.bottomLeftY) + " " + B2(t2.bleedBox.topRightX) + " " + B2(t2.bleedBox.topRightY) + "]"), null !== t2.trimBox && ct2("/TrimBox [" + B2(t2.trimBox.bottomLeftX) + " " + B2(t2.trimBox.bottomLeftY) + " " + B2(t2.trimBox.topRightX) + " " + B2(t2.trimBox.topRightY) + "]"), null !== t2.artBox && ct2("/ArtBox [" + B2(t2.artBox.bottomLeftX) + " " + B2(t2.artBox.bottomLeftY) + " " + B2(t2.artBox.topRightX) + " " + B2(t2.artBox.topRightY) + "]"), "number" == typeof t2.userUnit && 1 !== t2.userUnit && ct2("/UserUnit " + t2.userUnit), Rt2.publish("putPage", {
      objId: n3,
      pageContext: qt2[e2],
      pageNumber: e2,
      page: r2
    }), ct2("/Contents " + i2 + " 0 R"), ct2(">>"), ct2("endobj");
    var a3 = r2.join("\n");
    return x2 === A2.ADVANCED && (a3 += "\nQ"), Xt2(i2, true), re2({
      data: a3,
      filters: ee2(),
      objectId: i2
    }), ct2("endobj"), n3;
  }, ie2 = b2.__private__.putPages = function() {
    var t2, e2, r2 = [];
    for (t2 = 1; t2 <= Et2; t2++) qt2[t2].objId = Jt2(), qt2[t2].contentsObjId = Jt2();
    for (t2 = 1; t2 <= Et2; t2++) r2.push(ne2({
      number: t2,
      data: it2[t2],
      objId: qt2[t2].objId,
      contentsObjId: qt2[t2].contentsObjId,
      mediaBox: qt2[t2].mediaBox,
      cropBox: qt2[t2].cropBox,
      bleedBox: qt2[t2].bleedBox,
      trimBox: qt2[t2].trimBox,
      artBox: qt2[t2].artBox,
      userUnit: qt2[t2].userUnit,
      rootDictionaryObjId: Zt2,
      resourceDictionaryObjId: $t2
    }));
    Xt2(Zt2, true), ct2("<</Type /Pages");
    var n3 = "/Kids [";
    for (e2 = 0; e2 < Et2; e2++) n3 += r2[e2] + " 0 R ";
    ct2(n3 + "]"), ct2("/Count " + Et2), ct2(">>"), ct2("endobj"), Rt2.publish("postPutPages");
  }, ae2 = function(t2) {
    var e2 = function(t3, e3) {
      return -1 !== t3.indexOf(" ") ? "(" + Ie(t3, e3) + ")" : Ie(t3, e3);
    };
    Rt2.publish("putFont", {
      font: t2,
      out: ct2,
      newObject: Yt2,
      putStream: re2,
      pdfEscapeWithNeededParanthesis: e2
    }), true !== t2.isAlreadyPutted && (t2.objectNumber = Yt2(), ct2("<<"), ct2("/Type /Font"), ct2("/BaseFont /" + e2(t2.postScriptName)), ct2("/Subtype /Type1"), "string" == typeof t2.encoding && ct2("/Encoding /" + t2.encoding), ct2("/FirstChar 32"), ct2("/LastChar 255"), ct2(">>"), ct2("endobj"));
  }, oe2 = function() {
    for (var t2 in kt2) kt2.hasOwnProperty(t2) && (false === m2 || true === m2 && v2.hasOwnProperty(t2)) && ae2(kt2[t2]);
  }, se2 = function(t2) {
    t2.objectNumber = Yt2();
    var e2 = [];
    e2.push({
      key: "Type",
      value: "/XObject"
    }), e2.push({
      key: "Subtype",
      value: "/Form"
    }), e2.push({
      key: "BBox",
      value: "[" + [B2(t2.x), B2(t2.y), B2(t2.x + t2.width), B2(t2.y + t2.height)].join(" ") + "]"
    }), e2.push({
      key: "Matrix",
      value: "[" + t2.matrix.toString() + "]"
    });
    var r2 = t2.pages[1].join("\n");
    re2({
      data: r2,
      additionalKeyValues: e2,
      objectId: t2.objectNumber
    }), ct2("endobj");
  }, ue2 = function() {
    for (var t2 in Dt2) Dt2.hasOwnProperty(t2) && se2(Dt2[t2]);
  }, ce2 = function(t2, e2) {
    var r2, n3 = [], i2 = 1 / (e2 - 1);
    for (r2 = 0; r2 < 1; r2 += i2) n3.push(r2);
    if (n3.push(1), 0 != t2[0].offset) {
      var a3 = {
        offset: 0,
        color: t2[0].color
      };
      t2.unshift(a3);
    }
    if (1 != t2[t2.length - 1].offset) {
      var o3 = {
        offset: 1,
        color: t2[t2.length - 1].color
      };
      t2.push(o3);
    }
    for (var s3 = "", u3 = 0, c2 = 0; c2 < n3.length; c2++) {
      for (r2 = n3[c2]; r2 > t2[u3 + 1].offset; ) u3++;
      var l2 = t2[u3].offset, h2 = (r2 - l2) / (t2[u3 + 1].offset - l2), f3 = t2[u3].color, d3 = t2[u3 + 1].color;
      s3 += $2(Math.round((1 - h2) * f3[0] + h2 * d3[0]).toString(16)) + $2(Math.round((1 - h2) * f3[1] + h2 * d3[1]).toString(16)) + $2(Math.round((1 - h2) * f3[2] + h2 * d3[2]).toString(16));
    }
    return s3.trim();
  }, le2 = function(t2, e2) {
    e2 || (e2 = 21);
    var r2 = Yt2(), n3 = ce2(t2.colors, e2), i2 = [];
    i2.push({
      key: "FunctionType",
      value: "0"
    }), i2.push({
      key: "Domain",
      value: "[0.0 1.0]"
    }), i2.push({
      key: "Size",
      value: "[" + e2 + "]"
    }), i2.push({
      key: "BitsPerSample",
      value: "8"
    }), i2.push({
      key: "Range",
      value: "[0.0 1.0 0.0 1.0 0.0 1.0]"
    }), i2.push({
      key: "Decode",
      value: "[0.0 1.0 0.0 1.0 0.0 1.0]"
    }), re2({
      data: n3,
      additionalKeyValues: i2,
      alreadyAppliedFilters: ["/ASCIIHexDecode"],
      objectId: r2
    }), ct2("endobj"), t2.objectNumber = Yt2(), ct2("<< /ShadingType " + t2.type), ct2("/ColorSpace /DeviceRGB");
    var a3 = "/Coords [" + B2(parseFloat(t2.coords[0])) + " " + B2(parseFloat(t2.coords[1])) + " ";
    2 === t2.type ? a3 += B2(parseFloat(t2.coords[2])) + " " + B2(parseFloat(t2.coords[3])) : a3 += B2(parseFloat(t2.coords[2])) + " " + B2(parseFloat(t2.coords[3])) + " " + B2(parseFloat(t2.coords[4])) + " " + B2(parseFloat(t2.coords[5])), ct2(a3 += "]"), t2.matrix && ct2("/Matrix [" + t2.matrix.toString() + "]"), ct2("/Function " + r2 + " 0 R"), ct2("/Extend [true true]"), ct2(">>"), ct2("endobj");
  }, he2 = function(t2, e2) {
    var r2 = Jt2(), n3 = Yt2();
    e2.push({
      resourcesOid: r2,
      objectOid: n3
    }), t2.objectNumber = n3;
    var i2 = [];
    i2.push({
      key: "Type",
      value: "/Pattern"
    }), i2.push({
      key: "PatternType",
      value: "1"
    }), i2.push({
      key: "PaintType",
      value: "1"
    }), i2.push({
      key: "TilingType",
      value: "1"
    }), i2.push({
      key: "BBox",
      value: "[" + t2.boundingBox.map(B2).join(" ") + "]"
    }), i2.push({
      key: "XStep",
      value: B2(t2.xStep)
    }), i2.push({
      key: "YStep",
      value: B2(t2.yStep)
    }), i2.push({
      key: "Resources",
      value: r2 + " 0 R"
    }), t2.matrix && i2.push({
      key: "Matrix",
      value: "[" + t2.matrix.toString() + "]"
    }), re2({
      data: t2.stream,
      additionalKeyValues: i2,
      objectId: t2.objectNumber
    }), ct2("endobj");
  }, fe2 = function(t2) {
    var e2;
    for (e2 in Ct2) Ct2.hasOwnProperty(e2) && (Ct2[e2] instanceof C ? le2(Ct2[e2]) : Ct2[e2] instanceof j && he2(Ct2[e2], t2));
  }, de2 = function(t2) {
    for (var e2 in t2.objectNumber = Yt2(), ct2("<<"), t2) switch (e2) {
      case "opacity":
        ct2("/ca " + q2(t2[e2]));
        break;
      case "stroke-opacity":
        ct2("/CA " + q2(t2[e2]));
    }
    ct2(">>"), ct2("endobj");
  }, pe2 = function() {
    var t2;
    for (t2 in Ot2) Ot2.hasOwnProperty(t2) && de2(Ot2[t2]);
  }, ge2 = function() {
    for (var t2 in ct2("/XObject <<"), Dt2) Dt2.hasOwnProperty(t2) && Dt2[t2].objectNumber >= 0 && ct2("/" + t2 + " " + Dt2[t2].objectNumber + " 0 R");
    Rt2.publish("putXobjectDict"), ct2(">>");
  }, me2 = function() {
    We.oid = Yt2(), ct2("<<"), ct2("/Filter /Standard"), ct2("/V " + We.v), ct2("/R " + We.r), ct2("/U <" + We.toHexString(We.U) + ">"), ct2("/O <" + We.toHexString(We.O) + ">"), ct2("/P " + We.P), ct2(">>"), ct2("endobj");
  }, ve2 = function() {
    for (var t2 in ct2("/Font <<"), kt2) kt2.hasOwnProperty(t2) && (false === m2 || true === m2 && v2.hasOwnProperty(t2)) && ct2("/" + t2 + " " + kt2[t2].objectNumber + " 0 R");
    ct2(">>");
  }, be2 = function() {
    if (Object.keys(Ct2).length > 0) {
      for (var t2 in ct2("/Shading <<"), Ct2) Ct2.hasOwnProperty(t2) && Ct2[t2] instanceof C && Ct2[t2].objectNumber >= 0 && ct2("/" + t2 + " " + Ct2[t2].objectNumber + " 0 R");
      Rt2.publish("putShadingPatternDict"), ct2(">>");
    }
  }, ye2 = function(t2) {
    if (Object.keys(Ct2).length > 0) {
      for (var e2 in ct2("/Pattern <<"), Ct2) Ct2.hasOwnProperty(e2) && Ct2[e2] instanceof b2.TilingPattern && Ct2[e2].objectNumber >= 0 && Ct2[e2].objectNumber < t2 && ct2("/" + e2 + " " + Ct2[e2].objectNumber + " 0 R");
      Rt2.publish("putTilingPatternDict"), ct2(">>");
    }
  }, we = function() {
    if (Object.keys(Ot2).length > 0) {
      var t2;
      for (t2 in ct2("/ExtGState <<"), Ot2) Ot2.hasOwnProperty(t2) && Ot2[t2].objectNumber >= 0 && ct2("/" + t2 + " " + Ot2[t2].objectNumber + " 0 R");
      Rt2.publish("putGStateDict"), ct2(">>");
    }
  }, Ne = function(t2) {
    Xt2(t2.resourcesOid, true), ct2("<<"), ct2("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"), ve2(), be2(), ye2(t2.objectOid), we(), ge2(), ct2(">>"), ct2("endobj");
  }, Le = function() {
    var t2 = [];
    oe2(), pe2(), ue2(), fe2(t2), Rt2.publish("putResources"), t2.forEach(Ne), Ne({
      resourcesOid: $t2,
      objectOid: Number.MAX_SAFE_INTEGER
    }), Rt2.publish("postPutResources");
  }, Ae = function() {
    Rt2.publish("putAdditionalObjects");
    for (var t2 = 0; t2 < nt2.length; t2++) {
      var e2 = nt2[t2];
      Xt2(e2.objId, true), ct2(e2.content), ct2("endobj");
    }
    Rt2.publish("postPutAdditionalObjects");
  }, xe = function(t2) {
    It2[t2.fontName] = It2[t2.fontName] || {}, It2[t2.fontName][t2.fontStyle] = t2.id;
  }, Se = function(t2, e2, r2, n3, i2) {
    var a3 = {
      id: "F" + (Object.keys(kt2).length + 1).toString(10),
      postScriptName: t2,
      fontName: e2,
      fontStyle: r2,
      encoding: n3,
      isStandardFont: i2 || false,
      metadata: {}
    };
    return Rt2.publish("addFont", {
      font: a3,
      instance: this
    }), kt2[a3.id] = a3, xe(a3), a3.id;
  }, _e = function(t2) {
    for (var e2 = 0, r2 = ft2.length; e2 < r2; e2++) {
      var n3 = Se.call(this, t2[e2][0], t2[e2][1], t2[e2][2], ft2[e2][3], true);
      false === m2 && (v2[n3] = true);
      var i2 = t2[e2][0].split("-");
      xe({
        id: n3,
        fontName: i2[0],
        fontStyle: i2[1] || ""
      });
    }
    Rt2.publish("addFonts", {
      fonts: kt2,
      dictionary: It2
    });
  }, Pe = function(t2) {
    return t2.foo = function() {
      try {
        return t2.apply(this, arguments);
      } catch (t3) {
        var e2 = t3.stack || "";
        ~e2.indexOf(" at ") && (e2 = e2.split(" at ")[1]);
        var n3 = "Error in function " + e2.split("\n")[0].split("<")[0] + ": " + t3.message;
        if (!r.console) throw new Error(n3);
        r.console.error(n3, t3), r.alert && alert(n3);
      }
    }, t2.foo.bar = t2, t2.foo;
  }, ke = function(t2, e2) {
    var r2, n3, i2, a3, o3, s3, u3, c2, l2;
    if (i2 = (e2 = e2 || {}).sourceEncoding || "Unicode", o3 = e2.outputEncoding, (e2.autoencode || o3) && kt2[At2].metadata && kt2[At2].metadata[i2] && kt2[At2].metadata[i2].encoding && (a3 = kt2[At2].metadata[i2].encoding, !o3 && kt2[At2].encoding && (o3 = kt2[At2].encoding), !o3 && a3.codePages && (o3 = a3.codePages[0]), "string" == typeof o3 && (o3 = a3[o3]), o3)) {
      for (u3 = false, s3 = [], r2 = 0, n3 = t2.length; r2 < n3; r2++) (c2 = o3[t2.charCodeAt(r2)]) ? s3.push(String.fromCharCode(c2)) : s3.push(t2[r2]), s3[r2].charCodeAt(0) >> 8 && (u3 = true);
      t2 = s3.join("");
    }
    for (r2 = t2.length; void 0 === u3 && 0 !== r2; ) t2.charCodeAt(r2 - 1) >> 8 && (u3 = true), r2--;
    if (!u3) return t2;
    for (s3 = e2.noBOM ? [] : [254, 255], r2 = 0, n3 = t2.length; r2 < n3; r2++) {
      if ((l2 = (c2 = t2.charCodeAt(r2)) >> 8) >> 8) throw new Error("Character at position " + r2 + " of string '" + t2 + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
      s3.push(l2), s3.push(c2 - (l2 << 8));
    }
    return String.fromCharCode.apply(void 0, s3);
  }, Ie = b2.__private__.pdfEscape = b2.pdfEscape = function(t2, e2) {
    return ke(t2, e2).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }, Fe = b2.__private__.beginPage = function(t2) {
    it2[++Et2] = [], qt2[Et2] = {
      objId: 0,
      contentsObjId: 0,
      userUnit: Number(f2),
      artBox: null,
      bleedBox: null,
      cropBox: null,
      trimBox: null,
      mediaBox: {
        bottomLeftX: 0,
        bottomLeftY: 0,
        topRightX: Number(t2[0]),
        topRightY: Number(t2[1])
      }
    }, Oe(Et2), ut2(it2[K2]);
  }, Ce = function(t2, e2) {
    var r2, a3, s3;
    switch (n2 = e2 || n2, "string" == typeof t2 && (r2 = L2(t2.toLowerCase()), Array.isArray(r2) && (a3 = r2[0], s3 = r2[1])), Array.isArray(t2) && (a3 = t2[0] * xt2, s3 = t2[1] * xt2), isNaN(a3) && (a3 = o2[0], s3 = o2[1]), (a3 > 14400 || s3 > 14400) && (i.warn("A page in a PDF can not be wider or taller than 14400 userUnit. jsPDF limits the width/height to 14400"), a3 = Math.min(14400, a3), s3 = Math.min(14400, s3)), o2 = [a3, s3], n2.substr(0, 1)) {
      case "l":
        s3 > a3 && (o2 = [s3, a3]);
        break;
      case "p":
        a3 > s3 && (o2 = [s3, a3]);
    }
    Fe(o2), hr(lr), ct2(yr), 0 !== Sr && ct2(Sr + " J"), 0 !== _r && ct2(_r + " j"), Rt2.publish("addPage", {
      pageNumber: Et2
    });
  }, je = function(t2) {
    t2 > 0 && t2 <= Et2 && (it2.splice(t2, 1), qt2.splice(t2, 1), Et2--, K2 > Et2 && (K2 = Et2), this.setPage(K2));
  }, Oe = function(t2) {
    t2 > 0 && t2 <= Et2 && (K2 = t2);
  }, Be = b2.__private__.getNumberOfPages = b2.getNumberOfPages = function() {
    return it2.length - 1;
  }, Me = function(t2, e2, r2) {
    var n3, a3 = void 0;
    return r2 = r2 || {}, t2 = void 0 !== t2 ? t2 : kt2[At2].fontName, e2 = void 0 !== e2 ? e2 : kt2[At2].fontStyle, n3 = t2.toLowerCase(), void 0 !== It2[n3] && void 0 !== It2[n3][e2] ? a3 = It2[n3][e2] : void 0 !== It2[t2] && void 0 !== It2[t2][e2] ? a3 = It2[t2][e2] : false === r2.disableWarning && i.warn("Unable to look up font label for font '" + t2 + "', '" + e2 + "'. Refer to getFontList() for available fonts."), a3 || r2.noFallback || null == (a3 = It2.times[e2]) && (a3 = It2.times.normal), a3;
  }, Ee = b2.__private__.putInfo = function() {
    var t2 = Yt2(), e2 = function(t3) {
      return t3;
    };
    for (var r2 in null !== g2 && (e2 = We.encryptor(t2, 0)), ct2("<<"), ct2("/Producer (" + Ie(e2("jsPDF " + O.version)) + ")"), Lt2) Lt2.hasOwnProperty(r2) && Lt2[r2] && ct2("/" + r2.substr(0, 1).toUpperCase() + r2.substr(1) + " (" + Ie(e2(Lt2[r2])) + ")");
    ct2("/CreationDate (" + Ie(e2(z2)) + ")"), ct2(">>"), ct2("endobj");
  }, qe = b2.__private__.putCatalog = function(t2) {
    var e2 = (t2 = t2 || {}).rootDictionaryObjId || Zt2;
    switch (Yt2(), ct2("<<"), ct2("/Type /Catalog"), ct2("/Pages " + e2 + " 0 R"), pt2 || (pt2 = "fullwidth"), pt2) {
      case "fullwidth":
        ct2("/OpenAction [3 0 R /FitH null]");
        break;
      case "fullheight":
        ct2("/OpenAction [3 0 R /FitV null]");
        break;
      case "fullpage":
        ct2("/OpenAction [3 0 R /Fit]");
        break;
      case "original":
        ct2("/OpenAction [3 0 R /XYZ null null 1]");
        break;
      default:
        var r2 = "" + pt2;
        "%" === r2.substr(r2.length - 1) && (pt2 = parseInt(pt2) / 100), "number" == typeof pt2 && ct2("/OpenAction [3 0 R /XYZ null null " + q2(pt2) + "]");
    }
    switch (yt2 || (yt2 = "continuous"), yt2) {
      case "continuous":
        ct2("/PageLayout /OneColumn");
        break;
      case "single":
        ct2("/PageLayout /SinglePage");
        break;
      case "two":
      case "twoleft":
        ct2("/PageLayout /TwoColumnLeft");
        break;
      case "tworight":
        ct2("/PageLayout /TwoColumnRight");
    }
    vt2 && ct2("/PageMode /" + vt2), Rt2.publish("putCatalog"), ct2(">>"), ct2("endobj");
  }, Re = b2.__private__.putTrailer = function() {
    ct2("trailer"), ct2("<<"), ct2("/Size " + (Q2 + 1)), ct2("/Root " + Q2 + " 0 R"), ct2("/Info " + (Q2 - 1) + " 0 R"), null !== g2 && ct2("/Encrypt " + We.oid + " 0 R"), ct2("/ID [ <" + H2 + "> <" + H2 + "> ]"), ct2(">>");
  }, Te = b2.__private__.putHeader = function() {
    ct2("%PDF-" + y2), ct2("%ºß¬à");
  }, De = b2.__private__.putXRef = function() {
    var t2 = "0000000000";
    ct2("xref"), ct2("0 " + (Q2 + 1)), ct2("0000000000 65535 f ");
    for (var e2 = 1; e2 <= Q2; e2++) {
      "function" == typeof tt2[e2] ? ct2((t2 + tt2[e2]()).slice(-10) + " 00000 n ") : void 0 !== tt2[e2] ? ct2((t2 + tt2[e2]).slice(-10) + " 00000 n ") : ct2("0000000000 00000 n ");
    }
  }, Ue = b2.__private__.buildDocument = function() {
    st2(), ut2(et3), Rt2.publish("buildDocument"), Te(), ie2(), Ae(), Le(), null !== g2 && me2(), Ee(), qe();
    var t2 = rt2;
    return De(), Re(), ct2("startxref"), ct2("" + t2), ct2("%%EOF"), ut2(it2[K2]), et3.join("\n");
  }, ze = b2.__private__.getBlob = function(t2) {
    return new Blob([ht2(t2)], {
      type: "application/pdf"
    });
  }, He = b2.output = b2.__private__.output = Pe(function(t2, e2) {
    switch ("string" == typeof (e2 = e2 || {}) ? e2 = {
      filename: e2
    } : e2.filename = e2.filename || "generated.pdf", t2) {
      case void 0:
        return Ue();
      case "save":
        b2.save(e2.filename);
        break;
      case "arraybuffer":
        return ht2(Ue());
      case "blob":
        return ze(Ue());
      case "bloburi":
      case "bloburl":
        if (void 0 !== r.URL && "function" == typeof r.URL.createObjectURL) return r.URL && r.URL.createObjectURL(ze(Ue())) || void 0;
        i.warn("bloburl is not supported by your system, because URL.createObjectURL is not supported by your browser.");
        break;
      case "datauristring":
      case "dataurlstring":
        var n3 = "", a3 = Ue();
        try {
          n3 = c(a3);
        } catch (t3) {
          n3 = c(unescape(encodeURIComponent(a3)));
        }
        return "data:application/pdf;filename=" + e2.filename + ";base64," + n3;
      case "pdfobjectnewwindow":
        if ("[object Window]" === Object.prototype.toString.call(r)) {
          var o3 = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><script src="' + (e2.pdfObjectUrl || "https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js") + '"><\/script><script >PDFObject.embed("' + this.output("dataurlstring") + '", ' + JSON.stringify(e2) + ");<\/script></body></html>", s3 = r.open();
          return null !== s3 && s3.document.write(o3), s3;
        }
        throw new Error("The option pdfobjectnewwindow just works in a browser-environment.");
      case "pdfjsnewwindow":
        if ("[object Window]" === Object.prototype.toString.call(r)) {
          var u3 = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe id="pdfViewer" src="' + (e2.pdfJsUrl || "examples/PDF.js/web/viewer.html") + "?file=&downloadName=" + e2.filename + '" width="500px" height="400px" /></body></html>', l2 = r.open();
          if (null !== l2) {
            l2.document.write(u3);
            var h2 = this;
            l2.document.documentElement.querySelector("#pdfViewer").onload = function() {
              l2.document.title = e2.filename, l2.document.documentElement.querySelector("#pdfViewer").contentWindow.PDFViewerApplication.open(h2.output("bloburl"));
            };
          }
          return l2;
        }
        throw new Error("The option pdfjsnewwindow just works in a browser-environment.");
      case "dataurlnewwindow":
        if ("[object Window]" !== Object.prototype.toString.call(r)) throw new Error("The option dataurlnewwindow just works in a browser-environment.");
        var f3 = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe src="' + this.output("datauristring", e2) + '"></iframe></body></html>', d3 = r.open();
        if (null !== d3 && (d3.document.write(f3), d3.document.title = e2.filename), d3 || "undefined" == typeof safari) return d3;
        break;
      case "datauri":
      case "dataurl":
        return r.document.location.href = this.output("datauristring", e2);
      default:
        return null;
    }
  }), Ve = function(t2) {
    return true === Array.isArray(Tt2) && Tt2.indexOf(t2) > -1;
  };
  switch (a2) {
    case "pt":
      xt2 = 1;
      break;
    case "mm":
      xt2 = 72 / 25.4;
      break;
    case "cm":
      xt2 = 72 / 2.54;
      break;
    case "in":
      xt2 = 72;
      break;
    case "px":
      xt2 = 1 == Ve("px_scaling") ? 0.75 : 96 / 72;
      break;
    case "pc":
    case "em":
      xt2 = 12;
      break;
    case "ex":
      xt2 = 6;
      break;
    default:
      throw new Error("Invalid unit: " + a2);
  }
  var We = null;
  J2(), W2();
  var Ge = function(t2) {
    return null !== g2 ? We.encryptor(t2, 0) : function(t3) {
      return t3;
    };
  }, Ye = b2.__private__.getPageInfo = b2.getPageInfo = function(t2) {
    if (isNaN(t2) || t2 % 1 != 0) throw new Error("Invalid argument passed to jsPDF.getPageInfo");
    return {
      objId: qt2[t2].objId,
      pageNumber: t2,
      pageContext: qt2[t2]
    };
  }, Je = b2.__private__.getPageInfoByObjId = function(t2) {
    if (isNaN(t2) || t2 % 1 != 0) throw new Error("Invalid argument passed to jsPDF.getPageInfoByObjId");
    for (var e2 in qt2) if (qt2[e2].objId === t2) break;
    return Ye(e2);
  }, Xe = b2.__private__.getCurrentPageInfo = b2.getCurrentPageInfo = function() {
    return {
      objId: qt2[K2].objId,
      pageNumber: K2,
      pageContext: qt2[K2]
    };
  };
  b2.addPage = function() {
    return Ce.apply(this, arguments), this;
  }, b2.setPage = function() {
    return Oe.apply(this, arguments), ut2.call(this, it2[K2]), this;
  }, b2.insertPage = function(t2) {
    return this.addPage(), this.movePage(K2, t2), this;
  }, b2.movePage = function(t2, e2) {
    var r2, n3;
    if (t2 > e2) {
      r2 = it2[t2], n3 = qt2[t2];
      for (var i2 = t2; i2 > e2; i2--) it2[i2] = it2[i2 - 1], qt2[i2] = qt2[i2 - 1];
      it2[e2] = r2, qt2[e2] = n3, this.setPage(e2);
    } else if (t2 < e2) {
      r2 = it2[t2], n3 = qt2[t2];
      for (var a3 = t2; a3 < e2; a3++) it2[a3] = it2[a3 + 1], qt2[a3] = qt2[a3 + 1];
      it2[e2] = r2, qt2[e2] = n3, this.setPage(e2);
    }
    return this;
  }, b2.deletePage = function() {
    return je.apply(this, arguments), this;
  }, b2.__private__.text = b2.text = function(t2, e2, r2, n3, i2) {
    var a3, o3, s3, u3, c2, l2, h2, f3, d3 = (n3 = n3 || {}).scope || this;
    if ("number" == typeof t2 && "number" == typeof e2 && ("string" == typeof r2 || Array.isArray(r2))) {
      var p3 = r2;
      r2 = e2, e2 = t2, t2 = p3;
    }
    if (arguments[3] instanceof Ht2 == false ? (s3 = arguments[4], u3 = arguments[5], "object" == typeof (h2 = arguments[3]) && null !== h2 || ("string" == typeof s3 && (u3 = s3, s3 = null), "string" == typeof h2 && (u3 = h2, h2 = null), "number" == typeof h2 && (s3 = h2, h2 = null), n3 = {
      flags: h2,
      angle: s3,
      align: u3
    })) : (M2("The transform parameter of text() with a Matrix value"), f3 = i2), isNaN(e2) || isNaN(r2) || null == t2) throw new Error("Invalid arguments passed to jsPDF.text");
    if (0 === t2.length) return d3;
    var g3 = "", m3 = false, b3 = "number" == typeof n3.lineHeightFactor ? n3.lineHeightFactor : cr, y3 = d3.internal.scaleFactor;
    function w3(t3) {
      return t3 = t3.split("	").join(Array(n3.TabLen || 9).join(" ")), Ie(t3, h2);
    }
    function N3(t3) {
      for (var e3, r3 = t3.concat(), n4 = [], i3 = r3.length; i3--; ) "string" == typeof (e3 = r3.shift()) ? n4.push(e3) : Array.isArray(t3) && (1 === e3.length || void 0 === e3[1] && void 0 === e3[2]) ? n4.push(e3[0]) : n4.push([e3[0], e3[1], e3[2]]);
      return n4;
    }
    function L3(t3, e3) {
      var r3;
      if ("string" == typeof t3) r3 = e3(t3)[0];
      else if (Array.isArray(t3)) {
        for (var n4, i3, a4 = t3.concat(), o4 = [], s4 = a4.length; s4--; ) "string" == typeof (n4 = a4.shift()) ? o4.push(e3(n4)[0]) : Array.isArray(n4) && "string" == typeof n4[0] && (i3 = e3(n4[0], n4[1], n4[2]), o4.push([i3[0], i3[1], i3[2]]));
        r3 = o4;
      }
      return r3;
    }
    var S3 = false, _3 = true;
    if ("string" == typeof t2) S3 = true;
    else if (Array.isArray(t2)) {
      var P2 = t2.concat();
      o3 = [];
      for (var k2, I2 = P2.length; I2--; ) ("string" != typeof (k2 = P2.shift()) || Array.isArray(k2) && "string" != typeof k2[0]) && (_3 = false);
      S3 = _3;
    }
    if (false === S3) throw new Error('Type of text must be string or Array. "' + t2 + '" is not recognized.');
    "string" == typeof t2 && (t2 = t2.match(/[\r?\n]/) ? t2.split(/\r\n|\r|\n/g) : [t2]);
    var F3 = dt2 / d3.internal.scaleFactor, C2 = F3 * (cr - 1);
    switch (n3.baseline) {
      case "bottom":
        r2 -= C2;
        break;
      case "top":
        r2 += F3 - C2;
        break;
      case "hanging":
        r2 += F3 - 2 * C2;
        break;
      case "middle":
        r2 += F3 / 2 - C2;
    }
    if ((l2 = n3.maxWidth || 0) > 0 && ("string" == typeof t2 ? t2 = d3.splitTextToSize(t2, l2) : "[object Array]" === Object.prototype.toString.call(t2) && (t2 = t2.reduce(function(t3, e3) {
      return t3.concat(d3.splitTextToSize(e3, l2));
    }, []))), a3 = {
      text: t2,
      x: e2,
      y: r2,
      options: n3,
      mutex: {
        pdfEscape: Ie,
        activeFontKey: At2,
        fonts: kt2,
        activeFontSize: dt2
      }
    }, Rt2.publish("preProcessText", a3), t2 = a3.text, s3 = (n3 = a3.options).angle, f3 instanceof Ht2 == false && s3 && "number" == typeof s3) {
      s3 *= Math.PI / 180, 0 === n3.rotationDirection && (s3 = -s3), x2 === A2.ADVANCED && (s3 = -s3);
      var j2 = Math.cos(s3), O2 = Math.sin(s3);
      f3 = new Ht2(j2, O2, -O2, j2, 0, 0);
    } else s3 && s3 instanceof Ht2 && (f3 = s3);
    x2 !== A2.ADVANCED || f3 || (f3 = Wt2), void 0 !== (c2 = n3.charSpace || Ar) && (g3 += B2(T2(c2)) + " Tc\n", this.setCharSpace(this.getCharSpace() || 0));
    n3.lang;
    var E3 = -1, q3 = void 0 !== n3.renderingMode ? n3.renderingMode : n3.stroke, R3 = d3.internal.getCurrentPageInfo().pageContext;
    switch (q3) {
      case 0:
      case false:
      case "fill":
        E3 = 0;
        break;
      case 1:
      case true:
      case "stroke":
        E3 = 1;
        break;
      case 2:
      case "fillThenStroke":
        E3 = 2;
        break;
      case 3:
      case "invisible":
        E3 = 3;
        break;
      case 4:
      case "fillAndAddForClipping":
        E3 = 4;
        break;
      case 5:
      case "strokeAndAddPathForClipping":
        E3 = 5;
        break;
      case 6:
      case "fillThenStrokeAndAddToPathForClipping":
        E3 = 6;
        break;
      case 7:
      case "addToPathForClipping":
        E3 = 7;
    }
    var D3 = void 0 !== R3.usedRenderingMode ? R3.usedRenderingMode : -1;
    -1 !== E3 ? g3 += E3 + " Tr\n" : -1 !== D3 && (g3 += "0 Tr\n"), -1 !== E3 && (R3.usedRenderingMode = E3), u3 = n3.align || "left";
    var U3, z3 = dt2 * b3, H3 = d3.internal.pageSize.getWidth(), V3 = kt2[At2];
    c2 = n3.charSpace || Ar, l2 = n3.maxWidth || 0, h2 = Object.assign({
      autoencode: true,
      noBOM: true
    }, n3.flags);
    var W3 = [];
    if ("[object Array]" === Object.prototype.toString.call(t2)) {
      var G3;
      o3 = N3(t2), "left" !== u3 && (U3 = o3.map(function(t3) {
        return d3.getStringUnitWidth(t3, {
          font: V3,
          charSpace: c2,
          fontSize: dt2,
          doKerning: false
        }) * dt2 / y3;
      }));
      var Y3, J3 = 0;
      if ("right" === u3) {
        e2 -= U3[0], t2 = [], I2 = o3.length;
        for (var X3 = 0; X3 < I2; X3++) 0 === X3 ? (Y3 = gr(e2), G3 = mr(r2)) : (Y3 = T2(J3 - U3[X3]), G3 = -z3), t2.push([o3[X3], Y3, G3]), J3 = U3[X3];
      } else if ("center" === u3) {
        e2 -= U3[0] / 2, t2 = [], I2 = o3.length;
        for (var K3 = 0; K3 < I2; K3++) 0 === K3 ? (Y3 = gr(e2), G3 = mr(r2)) : (Y3 = T2((J3 - U3[K3]) / 2), G3 = -z3), t2.push([o3[K3], Y3, G3]), J3 = U3[K3];
      } else if ("left" === u3) {
        t2 = [], I2 = o3.length;
        for (var Z3 = 0; Z3 < I2; Z3++) t2.push(o3[Z3]);
      } else {
        if ("justify" !== u3) throw new Error('Unrecognized alignment option, use "left", "center", "right" or "justify".');
        t2 = [], I2 = o3.length, l2 = 0 !== l2 ? l2 : H3;
        for (var $3 = 0; $3 < I2; $3++) G3 = 0 === $3 ? mr(r2) : -z3, Y3 = 0 === $3 ? gr(e2) : 0, $3 < I2 - 1 && W3.push(B2(T2((l2 - U3[$3]) / (o3[$3].split(" ").length - 1)))), t2.push([o3[$3], Y3, G3]);
      }
    }
    var Q3 = "boolean" == typeof n3.R2L ? n3.R2L : mt2;
    true === Q3 && (t2 = L3(t2, function(t3, e3, r3) {
      return [t3.split("").reverse().join(""), e3, r3];
    })), a3 = {
      text: t2,
      x: e2,
      y: r2,
      options: n3,
      mutex: {
        pdfEscape: Ie,
        activeFontKey: At2,
        fonts: kt2,
        activeFontSize: dt2
      }
    }, Rt2.publish("postProcessText", a3), t2 = a3.text, m3 = a3.mutex.isHex || false;
    var tt3 = kt2[At2].encoding;
    "WinAnsiEncoding" !== tt3 && "StandardEncoding" !== tt3 || (t2 = L3(t2, function(t3, e3, r3) {
      return [w3(t3), e3, r3];
    })), o3 = N3(t2), t2 = [];
    for (var et4, rt3, nt3, it3 = 0, at3 = 1, ot3 = Array.isArray(o3[0]) ? at3 : it3, st3 = "", ut3 = function(t3, e3, r3) {
      var i3 = "";
      return r3 instanceof Ht2 ? (r3 = "number" == typeof n3.angle ? Vt2(r3, new Ht2(1, 0, 0, 1, t3, e3)) : Vt2(new Ht2(1, 0, 0, 1, t3, e3), r3), x2 === A2.ADVANCED && (r3 = Vt2(new Ht2(1, 0, 0, -1, 0, 0), r3)), i3 = r3.join(" ") + " Tm\n") : i3 = B2(t3) + " " + B2(e3) + " Td\n", i3;
    }, lt3 = 0; lt3 < o3.length; lt3++) {
      switch (st3 = "", ot3) {
        case at3:
          nt3 = (m3 ? "<" : "(") + o3[lt3][0] + (m3 ? ">" : ")"), et4 = parseFloat(o3[lt3][1]), rt3 = parseFloat(o3[lt3][2]);
          break;
        case it3:
          nt3 = (m3 ? "<" : "(") + o3[lt3] + (m3 ? ">" : ")"), et4 = gr(e2), rt3 = mr(r2);
      }
      void 0 !== W3 && void 0 !== W3[lt3] && (st3 = W3[lt3] + " Tw\n"), 0 === lt3 ? t2.push(st3 + ut3(et4, rt3, f3) + nt3) : ot3 === it3 ? t2.push(st3 + nt3) : ot3 === at3 && t2.push(st3 + ut3(et4, rt3, f3) + nt3);
    }
    t2 = ot3 === it3 ? t2.join(" Tj\nT* ") : t2.join(" Tj\n"), t2 += " Tj\n";
    var ht3 = "BT\n/";
    return ht3 += At2 + " " + dt2 + " Tf\n", ht3 += B2(dt2 * b3) + " TL\n", ht3 += Nr + "\n", ht3 += g3, ht3 += t2, ct2(ht3 += "ET"), v2[At2] = true, d3;
  };
  var Ke = b2.__private__.clip = b2.clip = function(t2) {
    return ct2("evenodd" === t2 ? "W*" : "W"), this;
  };
  b2.clipEvenOdd = function() {
    return Ke("evenodd");
  }, b2.__private__.discardPath = b2.discardPath = function() {
    return ct2("n"), this;
  };
  var Ze = b2.__private__.isValidStyle = function(t2) {
    var e2 = false;
    return -1 !== [void 0, null, "S", "D", "F", "DF", "FD", "f", "f*", "B", "B*", "n"].indexOf(t2) && (e2 = true), e2;
  };
  b2.__private__.setDefaultPathOperation = b2.setDefaultPathOperation = function(t2) {
    return Ze(t2) && (p2 = t2), this;
  };
  var $e = b2.__private__.getStyle = b2.getStyle = function(t2) {
    var e2 = p2;
    switch (t2) {
      case "D":
      case "S":
        e2 = "S";
        break;
      case "F":
        e2 = "f";
        break;
      case "FD":
      case "DF":
        e2 = "B";
        break;
      case "f":
      case "f*":
      case "B":
      case "B*":
        e2 = t2;
    }
    return e2;
  }, Qe = b2.close = function() {
    return ct2("h"), this;
  };
  b2.stroke = function() {
    return ct2("S"), this;
  }, b2.fill = function(t2) {
    return tr("f", t2), this;
  }, b2.fillEvenOdd = function(t2) {
    return tr("f*", t2), this;
  }, b2.fillStroke = function(t2) {
    return tr("B", t2), this;
  }, b2.fillStrokeEvenOdd = function(t2) {
    return tr("B*", t2), this;
  };
  var tr = function(t2, e2) {
    "object" == typeof e2 ? nr(e2, t2) : ct2(t2);
  }, er = function(t2) {
    null === t2 || x2 === A2.ADVANCED && void 0 === t2 || (t2 = $e(t2), ct2(t2));
  };
  function rr(t2, e2, r2, n3, i2) {
    var a3 = new j(e2 || this.boundingBox, r2 || this.xStep, n3 || this.yStep, this.gState, i2 || this.matrix);
    a3.stream = this.stream;
    var o3 = t2 + "$$" + this.cloneIndex++ + "$$";
    return Gt2(o3, a3), a3;
  }
  var nr = function(t2, e2) {
    var r2 = jt2[t2.key], n3 = Ct2[r2];
    if (n3 instanceof C) ct2("q"), ct2(ir(e2)), n3.gState && b2.setGState(n3.gState), ct2(t2.matrix.toString() + " cm"), ct2("/" + r2 + " sh"), ct2("Q");
    else if (n3 instanceof j) {
      var i2 = new Ht2(1, 0, 0, -1, 0, Er());
      t2.matrix && (i2 = i2.multiply(t2.matrix || Wt2), r2 = rr.call(n3, t2.key, t2.boundingBox, t2.xStep, t2.yStep, i2).id), ct2("q"), ct2("/Pattern cs"), ct2("/" + r2 + " scn"), n3.gState && b2.setGState(n3.gState), ct2(e2), ct2("Q");
    }
  }, ir = function(t2) {
    switch (t2) {
      case "f":
      case "F":
        return "W n";
      case "f*":
        return "W* n";
      case "B":
        return "W S";
      case "B*":
        return "W* S";
      case "S":
        return "W S";
      case "n":
        return "W n";
    }
  }, ar = b2.moveTo = function(t2, e2) {
    return ct2(B2(T2(t2)) + " " + B2(U2(e2)) + " m"), this;
  }, or = b2.lineTo = function(t2, e2) {
    return ct2(B2(T2(t2)) + " " + B2(U2(e2)) + " l"), this;
  }, sr = b2.curveTo = function(t2, e2, r2, n3, i2, a3) {
    return ct2([B2(T2(t2)), B2(U2(e2)), B2(T2(r2)), B2(U2(n3)), B2(T2(i2)), B2(U2(a3)), "c"].join(" ")), this;
  };
  b2.__private__.line = b2.line = function(t2, e2, r2, n3, i2) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3) || !Ze(i2)) throw new Error("Invalid arguments passed to jsPDF.line");
    return x2 === A2.COMPAT ? this.lines([[r2 - t2, n3 - e2]], t2, e2, [1, 1], i2 || "S") : this.lines([[r2 - t2, n3 - e2]], t2, e2, [1, 1]).stroke();
  }, b2.__private__.lines = b2.lines = function(t2, e2, r2, n3, i2, a3) {
    var o3, s3, u3, c2, l2, h2, f3, d3, p3, g3, m3, v3;
    if ("number" == typeof t2 && (v3 = r2, r2 = e2, e2 = t2, t2 = v3), n3 = n3 || [1, 1], a3 = a3 || false, isNaN(e2) || isNaN(r2) || !Array.isArray(t2) || !Array.isArray(n3) || !Ze(i2) || "boolean" != typeof a3) throw new Error("Invalid arguments passed to jsPDF.lines");
    for (ar(e2, r2), o3 = n3[0], s3 = n3[1], c2 = t2.length, g3 = e2, m3 = r2, u3 = 0; u3 < c2; u3++) 2 === (l2 = t2[u3]).length ? (g3 = l2[0] * o3 + g3, m3 = l2[1] * s3 + m3, or(g3, m3)) : (h2 = l2[0] * o3 + g3, f3 = l2[1] * s3 + m3, d3 = l2[2] * o3 + g3, p3 = l2[3] * s3 + m3, g3 = l2[4] * o3 + g3, m3 = l2[5] * s3 + m3, sr(h2, f3, d3, p3, g3, m3));
    return a3 && Qe(), er(i2), this;
  }, b2.path = function(t2) {
    for (var e2 = 0; e2 < t2.length; e2++) {
      var r2 = t2[e2], n3 = r2.c;
      switch (r2.op) {
        case "m":
          ar(n3[0], n3[1]);
          break;
        case "l":
          or(n3[0], n3[1]);
          break;
        case "c":
          sr.apply(this, n3);
          break;
        case "h":
          Qe();
      }
    }
    return this;
  }, b2.__private__.rect = b2.rect = function(t2, e2, r2, n3, i2) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3) || !Ze(i2)) throw new Error("Invalid arguments passed to jsPDF.rect");
    return x2 === A2.COMPAT && (n3 = -n3), ct2([B2(T2(t2)), B2(U2(e2)), B2(T2(r2)), B2(T2(n3)), "re"].join(" ")), er(i2), this;
  }, b2.__private__.triangle = b2.triangle = function(t2, e2, r2, n3, i2, a3, o3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3) || isNaN(i2) || isNaN(a3) || !Ze(o3)) throw new Error("Invalid arguments passed to jsPDF.triangle");
    return this.lines([[r2 - t2, n3 - e2], [i2 - r2, a3 - n3], [t2 - i2, e2 - a3]], t2, e2, [1, 1], o3, true), this;
  }, b2.__private__.roundedRect = b2.roundedRect = function(t2, e2, r2, n3, i2, a3, o3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3) || isNaN(i2) || isNaN(a3) || !Ze(o3)) throw new Error("Invalid arguments passed to jsPDF.roundedRect");
    var s3 = 4 / 3 * (Math.SQRT2 - 1);
    return i2 = Math.min(i2, 0.5 * r2), a3 = Math.min(a3, 0.5 * n3), this.lines([[r2 - 2 * i2, 0], [i2 * s3, 0, i2, a3 - a3 * s3, i2, a3], [0, n3 - 2 * a3], [0, a3 * s3, -i2 * s3, a3, -i2, a3], [2 * i2 - r2, 0], [-i2 * s3, 0, -i2, -a3 * s3, -i2, -a3], [0, 2 * a3 - n3], [0, -a3 * s3, i2 * s3, -a3, i2, -a3]], t2 + i2, e2, [1, 1], o3, true), this;
  }, b2.__private__.ellipse = b2.ellipse = function(t2, e2, r2, n3, i2) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || isNaN(n3) || !Ze(i2)) throw new Error("Invalid arguments passed to jsPDF.ellipse");
    var a3 = 4 / 3 * (Math.SQRT2 - 1) * r2, o3 = 4 / 3 * (Math.SQRT2 - 1) * n3;
    return ar(t2 + r2, e2), sr(t2 + r2, e2 - o3, t2 + a3, e2 - n3, t2, e2 - n3), sr(t2 - a3, e2 - n3, t2 - r2, e2 - o3, t2 - r2, e2), sr(t2 - r2, e2 + o3, t2 - a3, e2 + n3, t2, e2 + n3), sr(t2 + a3, e2 + n3, t2 + r2, e2 + o3, t2 + r2, e2), er(i2), this;
  }, b2.__private__.circle = b2.circle = function(t2, e2, r2, n3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r2) || !Ze(n3)) throw new Error("Invalid arguments passed to jsPDF.circle");
    return this.ellipse(t2, e2, r2, r2, n3);
  }, b2.setFont = function(t2, e2, r2) {
    return r2 && (e2 = F2(e2, r2)), At2 = Me(t2, e2, {
      disableWarning: false
    }), this;
  };
  var ur = b2.__private__.getFont = b2.getFont = function() {
    return kt2[Me.apply(b2, arguments)];
  };
  b2.__private__.getFontList = b2.getFontList = function() {
    var t2, e2, r2 = {};
    for (t2 in It2) if (It2.hasOwnProperty(t2)) for (e2 in r2[t2] = [], It2[t2]) It2[t2].hasOwnProperty(e2) && r2[t2].push(e2);
    return r2;
  }, b2.addFont = function(t2, e2, r2, n3, i2) {
    var a3 = ["StandardEncoding", "MacRomanEncoding", "Identity-H", "WinAnsiEncoding"];
    return arguments[3] && -1 !== a3.indexOf(arguments[3]) ? i2 = arguments[3] : arguments[3] && -1 == a3.indexOf(arguments[3]) && (r2 = F2(r2, n3)), i2 = i2 || "Identity-H", Se.call(this, t2, e2, r2, i2);
  };
  var cr, lr = t.lineWidth || 0.200025, hr = b2.__private__.setLineWidth = b2.setLineWidth = function(t2) {
    return ct2(B2(T2(t2)) + " w"), this;
  };
  b2.__private__.setLineDash = O.API.setLineDash = O.API.setLineDashPattern = function(t2, e2) {
    if (t2 = t2 || [], e2 = e2 || 0, isNaN(e2) || !Array.isArray(t2)) throw new Error("Invalid arguments passed to jsPDF.setLineDash");
    return t2 = t2.map(function(t3) {
      return B2(T2(t3));
    }).join(" "), e2 = B2(T2(e2)), ct2("[" + t2 + "] " + e2 + " d"), this;
  };
  var fr = b2.__private__.getLineHeight = b2.getLineHeight = function() {
    return dt2 * cr;
  };
  b2.__private__.getLineHeight = b2.getLineHeight = function() {
    return dt2 * cr;
  };
  var dr = b2.__private__.setLineHeightFactor = b2.setLineHeightFactor = function(t2) {
    return "number" == typeof (t2 = t2 || 1.15) && (cr = t2), this;
  }, pr = b2.__private__.getLineHeightFactor = b2.getLineHeightFactor = function() {
    return cr;
  };
  dr(t.lineHeight);
  var gr = b2.__private__.getHorizontalCoordinate = function(t2) {
    return T2(t2);
  }, mr = b2.__private__.getVerticalCoordinate = function(t2) {
    return x2 === A2.ADVANCED ? t2 : qt2[K2].mediaBox.topRightY - qt2[K2].mediaBox.bottomLeftY - T2(t2);
  }, vr = b2.__private__.getHorizontalCoordinateString = b2.getHorizontalCoordinateString = function(t2) {
    return B2(gr(t2));
  }, br = b2.__private__.getVerticalCoordinateString = b2.getVerticalCoordinateString = function(t2) {
    return B2(mr(t2));
  }, yr = t.strokeColor || "0 G";
  b2.__private__.getStrokeColor = b2.getDrawColor = function() {
    return Qt2(yr);
  }, b2.__private__.setStrokeColor = b2.setDrawColor = function(t2, e2, r2, n3) {
    return yr = te2({
      ch1: t2,
      ch2: e2,
      ch3: r2,
      ch4: n3,
      pdfColorType: "draw",
      precision: 2
    }), ct2(yr), this;
  };
  var wr = t.fillColor || "0 g";
  b2.__private__.getFillColor = b2.getFillColor = function() {
    return Qt2(wr);
  }, b2.__private__.setFillColor = b2.setFillColor = function(t2, e2, r2, n3) {
    return wr = te2({
      ch1: t2,
      ch2: e2,
      ch3: r2,
      ch4: n3,
      pdfColorType: "fill",
      precision: 2
    }), ct2(wr), this;
  };
  var Nr = t.textColor || "0 g", Lr = b2.__private__.getTextColor = b2.getTextColor = function() {
    return Qt2(Nr);
  };
  b2.__private__.setTextColor = b2.setTextColor = function(t2, e2, r2, n3) {
    return Nr = te2({
      ch1: t2,
      ch2: e2,
      ch3: r2,
      ch4: n3,
      pdfColorType: "text",
      precision: 3
    }), this;
  };
  var Ar = t.charSpace, xr = b2.__private__.getCharSpace = b2.getCharSpace = function() {
    return parseFloat(Ar || 0);
  };
  b2.__private__.setCharSpace = b2.setCharSpace = function(t2) {
    if (isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.setCharSpace");
    return Ar = t2, this;
  };
  var Sr = 0;
  b2.CapJoinStyles = {
    0: 0,
    butt: 0,
    but: 0,
    miter: 0,
    1: 1,
    round: 1,
    rounded: 1,
    circle: 1,
    2: 2,
    projecting: 2,
    project: 2,
    square: 2,
    bevel: 2
  }, b2.__private__.setLineCap = b2.setLineCap = function(t2) {
    var e2 = b2.CapJoinStyles[t2];
    if (void 0 === e2) throw new Error("Line cap style of '" + t2 + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
    return Sr = e2, ct2(e2 + " J"), this;
  };
  var _r = 0;
  b2.__private__.setLineJoin = b2.setLineJoin = function(t2) {
    var e2 = b2.CapJoinStyles[t2];
    if (void 0 === e2) throw new Error("Line join style of '" + t2 + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
    return _r = e2, ct2(e2 + " j"), this;
  }, b2.__private__.setLineMiterLimit = b2.__private__.setMiterLimit = b2.setLineMiterLimit = b2.setMiterLimit = function(t2) {
    if (t2 = t2 || 0, isNaN(t2)) throw new Error("Invalid argument passed to jsPDF.setLineMiterLimit");
    return ct2(B2(T2(t2)) + " M"), this;
  }, b2.GState = I, b2.setGState = function(t2) {
    (t2 = "string" == typeof t2 ? Ot2[Bt2[t2]] : Pr(null, t2)).equals(Mt2) || (ct2("/" + t2.id + " gs"), Mt2 = t2);
  };
  var Pr = function(t2, e2) {
    if (!t2 || !Bt2[t2]) {
      var r2 = false;
      for (var n3 in Ot2) if (Ot2.hasOwnProperty(n3) && Ot2[n3].equals(e2)) {
        r2 = true;
        break;
      }
      if (r2) e2 = Ot2[n3];
      else {
        var i2 = "GS" + (Object.keys(Ot2).length + 1).toString(10);
        Ot2[i2] = e2, e2.id = i2;
      }
      return t2 && (Bt2[t2] = e2.id), Rt2.publish("addGState", e2), e2;
    }
  };
  b2.addGState = function(t2, e2) {
    return Pr(t2, e2), this;
  }, b2.saveGraphicsState = function() {
    return ct2("q"), Ft2.push({
      key: At2,
      size: dt2,
      color: Nr
    }), this;
  }, b2.restoreGraphicsState = function() {
    ct2("Q");
    var t2 = Ft2.pop();
    return At2 = t2.key, dt2 = t2.size, Nr = t2.color, Mt2 = null, this;
  }, b2.setCurrentTransformationMatrix = function(t2) {
    return ct2(t2.toString() + " cm"), this;
  }, b2.comment = function(t2) {
    return ct2("#" + t2), this;
  };
  var kr = function(t2, e2) {
    var r2 = t2 || 0;
    Object.defineProperty(this, "x", {
      enumerable: true,
      get: function() {
        return r2;
      },
      set: function(t3) {
        isNaN(t3) || (r2 = parseFloat(t3));
      }
    });
    var n3 = e2 || 0;
    Object.defineProperty(this, "y", {
      enumerable: true,
      get: function() {
        return n3;
      },
      set: function(t3) {
        isNaN(t3) || (n3 = parseFloat(t3));
      }
    });
    var i2 = "pt";
    return Object.defineProperty(this, "type", {
      enumerable: true,
      get: function() {
        return i2;
      },
      set: function(t3) {
        i2 = t3.toString();
      }
    }), this;
  }, Ir = function(t2, e2, r2, n3) {
    kr.call(this, t2, e2), this.type = "rect";
    var i2 = r2 || 0;
    Object.defineProperty(this, "w", {
      enumerable: true,
      get: function() {
        return i2;
      },
      set: function(t3) {
        isNaN(t3) || (i2 = parseFloat(t3));
      }
    });
    var a3 = n3 || 0;
    return Object.defineProperty(this, "h", {
      enumerable: true,
      get: function() {
        return a3;
      },
      set: function(t3) {
        isNaN(t3) || (a3 = parseFloat(t3));
      }
    }), this;
  }, Fr = function() {
    this.page = Et2, this.currentPage = K2, this.pages = it2.slice(0), this.pagesContext = qt2.slice(0), this.x = St2, this.y = _t2, this.matrix = Pt2, this.width = Br(K2), this.height = Er(K2), this.outputDestination = ot2, this.id = "", this.objectNumber = -1;
  };
  Fr.prototype.restore = function() {
    Et2 = this.page, K2 = this.currentPage, qt2 = this.pagesContext, it2 = this.pages, St2 = this.x, _t2 = this.y, Pt2 = this.matrix, Mr(K2, this.width), qr(K2, this.height), ot2 = this.outputDestination;
  };
  var Cr = function(t2, e2, r2, n3, i2) {
    zt2.push(new Fr()), Et2 = K2 = 0, it2 = [], St2 = t2, _t2 = e2, Pt2 = i2, Fe([r2, n3]);
  }, jr = function(t2) {
    if (!Ut2[t2]) {
      var e2 = new Fr(), r2 = "Xo" + (Object.keys(Dt2).length + 1).toString(10);
      e2.id = r2, Ut2[t2] = r2, Dt2[r2] = e2, Rt2.publish("addFormObject", e2), zt2.pop().restore();
    }
  };
  for (var Or in b2.beginFormObject = function(t2, e2, r2, n3, i2) {
    return Cr(t2, e2, r2, n3, i2), this;
  }, b2.endFormObject = function(t2) {
    return jr(t2), this;
  }, b2.doFormObject = function(t2, e2) {
    var r2 = Dt2[Ut2[t2]];
    return ct2("q"), ct2(e2.toString() + " cm"), ct2("/" + r2.id + " Do"), ct2("Q"), this;
  }, b2.getFormObject = function(t2) {
    var e2 = Dt2[Ut2[t2]];
    return {
      x: e2.x,
      y: e2.y,
      width: e2.width,
      height: e2.height,
      matrix: e2.matrix
    };
  }, b2.save = function(t2, e2) {
    return t2 = t2 || "generated.pdf", (e2 = e2 || {}).returnPromise = e2.returnPromise || false, false === e2.returnPromise ? (l(ze(Ue()), t2), "function" == typeof l.unload && r.setTimeout && setTimeout(l.unload, 911), this) : new Promise(function(e3, n3) {
      try {
        var i2 = l(ze(Ue()), t2);
        "function" == typeof l.unload && r.setTimeout && setTimeout(l.unload, 911), e3(i2);
      } catch (t3) {
        n3(t3.message);
      }
    });
  }, O.API) O.API.hasOwnProperty(Or) && ("events" === Or && O.API.events.length ? function(t2, e2) {
    var r2, n3, i2;
    for (i2 = e2.length - 1; -1 !== i2; i2--) r2 = e2[i2][0], n3 = e2[i2][1], t2.subscribe.apply(t2, [r2].concat("function" == typeof n3 ? [n3] : n3));
  }(Rt2, O.API.events) : b2[Or] = O.API[Or]);
  var Br = b2.getPageWidth = function(t2) {
    return (qt2[t2 = t2 || K2].mediaBox.topRightX - qt2[t2].mediaBox.bottomLeftX) / xt2;
  }, Mr = b2.setPageWidth = function(t2, e2) {
    qt2[t2].mediaBox.topRightX = e2 * xt2 + qt2[t2].mediaBox.bottomLeftX;
  }, Er = b2.getPageHeight = function(t2) {
    return (qt2[t2 = t2 || K2].mediaBox.topRightY - qt2[t2].mediaBox.bottomLeftY) / xt2;
  }, qr = b2.setPageHeight = function(t2, e2) {
    qt2[t2].mediaBox.topRightY = e2 * xt2 + qt2[t2].mediaBox.bottomLeftY;
  };
  return b2.internal = {
    pdfEscape: Ie,
    getStyle: $e,
    getFont: ur,
    getFontSize: gt2,
    getCharSpace: xr,
    getTextColor: Lr,
    getLineHeight: fr,
    getLineHeightFactor: pr,
    write: lt2,
    getHorizontalCoordinate: gr,
    getVerticalCoordinate: mr,
    getCoordinateString: vr,
    getVerticalCoordinateString: br,
    collections: {},
    newObject: Yt2,
    newAdditionalObject: Kt2,
    newObjectDeferred: Jt2,
    newObjectDeferredBegin: Xt2,
    getFilters: ee2,
    putStream: re2,
    events: Rt2,
    scaleFactor: xt2,
    pageSize: {
      getWidth: function() {
        return Br(K2);
      },
      setWidth: function(t2) {
        Mr(K2, t2);
      },
      getHeight: function() {
        return Er(K2);
      },
      setHeight: function(t2) {
        qr(K2, t2);
      }
    },
    encryptionOptions: g2,
    encryption: We,
    getEncryptor: Ge,
    output: He,
    getNumberOfPages: Be,
    pages: it2,
    out: ct2,
    f2: q2,
    f3: R2,
    getPageInfo: Ye,
    getPageInfoByObjId: Je,
    getCurrentPageInfo: Xe,
    getPDFVersion: w2,
    Point: kr,
    Rectangle: Ir,
    Matrix: Ht2,
    hasHotfix: Ve
  }, Object.defineProperty(b2.internal.pageSize, "width", {
    get: function() {
      return Br(K2);
    },
    set: function(t2) {
      Mr(K2, t2);
    },
    enumerable: true,
    configurable: true
  }), Object.defineProperty(b2.internal.pageSize, "height", {
    get: function() {
      return Er(K2);
    },
    set: function(t2) {
      qr(K2, t2);
    },
    enumerable: true,
    configurable: true
  }), _e.call(b2, ft2), At2 = "F1", Ce(o2, n2), Rt2.publish("initialized"), b2;
}
P.prototype.lsbFirstWord = function(t) {
  return String.fromCharCode(t >> 0 & 255, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255);
}, P.prototype.toHexString = function(t) {
  return t.split("").map(function(t2) {
    return ("0" + (255 & t2.charCodeAt(0)).toString(16)).slice(-2);
  }).join("");
}, P.prototype.hexToBytes = function(t) {
  for (var e = [], r2 = 0; r2 < t.length; r2 += 2) e.push(String.fromCharCode(parseInt(t.substr(r2, 2), 16)));
  return e.join("");
}, P.prototype.processOwnerPassword = function(t, e) {
  return S(A(e).substr(0, 5), t);
}, P.prototype.encryptor = function(t, e) {
  let r2 = A(this.encryptionKey + String.fromCharCode(255 & t, t >> 8 & 255, t >> 16 & 255, 255 & e, e >> 8 & 255)).substr(0, 10);
  return function(t2) {
    return S(r2, t2);
  };
}, I.prototype.equals = function(t) {
  var e, r2 = "id,objectNumber,equals";
  if (!t || typeof t != typeof this) return false;
  var n2 = 0;
  for (e in this) if (!(r2.indexOf(e) >= 0)) {
    if (this.hasOwnProperty(e) && !t.hasOwnProperty(e)) return false;
    if (this[e] !== t[e]) return false;
    n2++;
  }
  for (e in t) t.hasOwnProperty(e) && r2.indexOf(e) < 0 && n2--;
  return 0 === n2;
}, O.API = {
  events: []
}, O.version = "2.3.1";
var B = O.API;
var M = 1;
var E = function(t) {
  return t.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
};
var q = function(t) {
  return t.replace(/\\\\/g, "\\").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
};
var R = function(t) {
  return t.toFixed(2);
};
var T = function(t) {
  return t.toFixed(5);
};
B.__acroform__ = {};
var D = function(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t;
};
var U = function(t) {
  return t * M;
};
var z = function(t) {
  var e = new ot(), r2 = wt.internal.getHeight(t) || 0, n2 = wt.internal.getWidth(t) || 0;
  return e.BBox = [0, 0, Number(R(n2)), Number(R(r2))], e;
};
var H = B.__acroform__.setBit = function(t, e) {
  if (t = t || 0, e = e || 0, isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBit");
  return t |= 1 << e;
};
var V = B.__acroform__.clearBit = function(t, e) {
  if (t = t || 0, e = e || 0, isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBit");
  return t &= ~(1 << e);
};
var W = B.__acroform__.getBit = function(t, e) {
  if (isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBit");
  return 0 == (t & 1 << e) ? 0 : 1;
};
var G = B.__acroform__.getBitForPdf = function(t, e) {
  if (isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBitForPdf");
  return W(t, e - 1);
};
var Y = B.__acroform__.setBitForPdf = function(t, e) {
  if (isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBitForPdf");
  return H(t, e - 1);
};
var J = B.__acroform__.clearBitForPdf = function(t, e) {
  if (isNaN(t) || isNaN(e)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBitForPdf");
  return V(t, e - 1);
};
var X = B.__acroform__.calculateCoordinates = function(t, e) {
  var r2 = e.internal.getHorizontalCoordinate, n2 = e.internal.getVerticalCoordinate, i2 = t[0], a2 = t[1], o2 = t[2], s2 = t[3], u2 = {};
  return u2.lowerLeft_X = r2(i2) || 0, u2.lowerLeft_Y = n2(a2 + s2) || 0, u2.upperRight_X = r2(i2 + o2) || 0, u2.upperRight_Y = n2(a2) || 0, [Number(R(u2.lowerLeft_X)), Number(R(u2.lowerLeft_Y)), Number(R(u2.upperRight_X)), Number(R(u2.upperRight_Y))];
};
var K = function(t) {
  if (t.appearanceStreamContent) return t.appearanceStreamContent;
  if (t.V || t.DV) {
    var e = [], r2 = t._V || t.DV, n2 = Z(t, r2), i2 = t.scope.internal.getFont(t.fontName, t.fontStyle).id;
    e.push("/Tx BMC"), e.push("q"), e.push("BT"), e.push(t.scope.__private__.encodeColorString(t.color)), e.push("/" + i2 + " " + R(n2.fontSize) + " Tf"), e.push("1 0 0 1 0 0 Tm"), e.push(n2.text), e.push("ET"), e.push("Q"), e.push("EMC");
    var a2 = z(t);
    return a2.scope = t.scope, a2.stream = e.join("\n"), a2;
  }
};
var Z = function(t, e) {
  var r2 = 0 === t.fontSize ? t.maxFontSize : t.fontSize, n2 = {
    text: "",
    fontSize: ""
  }, i2 = (e = ")" == (e = "(" == e.substr(0, 1) ? e.substr(1) : e).substr(e.length - 1) ? e.substr(0, e.length - 1) : e).split(" "), a2 = r2, o2 = wt.internal.getHeight(t) || 0;
  o2 = o2 < 0 ? -o2 : o2;
  var s2 = wt.internal.getWidth(t) || 0;
  s2 = s2 < 0 ? -s2 : s2;
  var u2 = function(e2, r3, n3) {
    if (e2 + 1 < i2.length) {
      var a3 = r3 + " " + i2[e2 + 1];
      return $(a3, t, n3).width <= s2 - 4;
    }
    return false;
  };
  a2++;
  t: for (; a2 > 0; ) {
    e = "", a2--;
    var c2, l2, h2 = $("3", t, a2).height, f2 = t.multiline ? o2 - a2 : (o2 - h2) / 2, d2 = f2 += 2, p2 = 0, g2 = 0;
    if (a2 <= 0) {
      e = "(...) Tj\n", e += "% Width of Text: " + $(e, t, a2 = 12).width + ", FieldWidth:" + s2 + "\n";
      break;
    }
    var m2 = "", v2 = 0;
    for (var b2 in i2) if (i2.hasOwnProperty(b2)) {
      m2 = " " == (m2 += i2[b2] + " ").substr(m2.length - 1) ? m2.substr(0, m2.length - 1) : m2;
      var y2 = parseInt(b2), w2 = u2(y2, m2, a2), N2 = b2 >= i2.length - 1;
      if (w2 && !N2) {
        m2 += " ";
        continue;
      }
      if (w2 || N2) {
        if (N2) g2 = y2;
        else if (t.multiline && (h2 + 2) * (v2 + 2) + 2 > o2) continue t;
      } else {
        if (!t.multiline) continue t;
        if ((h2 + 2) * (v2 + 2) + 2 > o2) continue t;
        g2 = y2;
      }
      for (var L2 = "", A2 = p2; A2 <= g2; A2++) L2 += i2[A2] + " ";
      switch (L2 = " " == L2.substr(L2.length - 1) ? L2.substr(0, L2.length - 1) : L2, l2 = $(L2, t, a2).width, t.textAlign) {
        case "right":
          c2 = s2 - l2 - 2;
          break;
        case "center":
          c2 = (s2 - l2) / 2;
          break;
        case "left":
        default:
          c2 = 2;
      }
      e += R(c2) + " " + R(d2) + " Td\n", e += "(" + E(L2) + ") Tj\n", e += -R(c2) + " 0 Td\n", d2 = -(a2 + 2), l2 = 0, p2 = g2 + 1, v2++, m2 = "";
    } else ;
    break;
  }
  return n2.text = e, n2.fontSize = a2, n2;
};
var $ = function(t, e, r2) {
  var n2 = e.scope.internal.getFont(e.fontName, e.fontStyle), i2 = e.scope.getStringUnitWidth(t, {
    font: n2,
    fontSize: parseFloat(r2),
    charSpace: 0
  }) * parseFloat(r2);
  return {
    height: e.scope.getStringUnitWidth("3", {
      font: n2,
      fontSize: parseFloat(r2),
      charSpace: 0
    }) * parseFloat(r2) * 1.5,
    width: i2
  };
};
var Q = {
  fields: [],
  xForms: [],
  acroFormDictionaryRoot: null,
  printedOut: false,
  internal: null,
  isInitialized: false
};
var tt = function(t, e) {
  var r2 = {
    type: "reference",
    object: t
  };
  void 0 === e.internal.getPageInfo(t.page).pageContext.annotations.find(function(t2) {
    return t2.type === r2.type && t2.object === r2.object;
  }) && e.internal.getPageInfo(t.page).pageContext.annotations.push(r2);
};
var et2 = function(t, e) {
  for (var r2 in t) if (t.hasOwnProperty(r2)) {
    var n2 = r2, i2 = t[r2];
    e.internal.newObjectDeferredBegin(i2.objId, true), "object" == typeof i2 && "function" == typeof i2.putStream && i2.putStream(), delete t[n2];
  }
};
var rt = function(t, e) {
  if (e.scope = t, void 0 !== t.internal && (void 0 === t.internal.acroformPlugin || false === t.internal.acroformPlugin.isInitialized)) {
    if (ut.FieldNum = 0, t.internal.acroformPlugin = JSON.parse(JSON.stringify(Q)), t.internal.acroformPlugin.acroFormDictionaryRoot) throw new Error("Exception while creating AcroformDictionary");
    M = t.internal.scaleFactor, t.internal.acroformPlugin.acroFormDictionaryRoot = new st(), t.internal.acroformPlugin.acroFormDictionaryRoot.scope = t, t.internal.acroformPlugin.acroFormDictionaryRoot._eventID = t.internal.events.subscribe("postPutResources", function() {
      !function(t2) {
        t2.internal.events.unsubscribe(t2.internal.acroformPlugin.acroFormDictionaryRoot._eventID), delete t2.internal.acroformPlugin.acroFormDictionaryRoot._eventID, t2.internal.acroformPlugin.printedOut = true;
      }(t);
    }), t.internal.events.subscribe("buildDocument", function() {
      !function(t2) {
        t2.internal.acroformPlugin.acroFormDictionaryRoot.objId = void 0;
        var e2 = t2.internal.acroformPlugin.acroFormDictionaryRoot.Fields;
        for (var r2 in e2) if (e2.hasOwnProperty(r2)) {
          var n2 = e2[r2];
          n2.objId = void 0, n2.hasAnnotation && tt(n2, t2);
        }
      }(t);
    }), t.internal.events.subscribe("putCatalog", function() {
      !function(t2) {
        if (void 0 === t2.internal.acroformPlugin.acroFormDictionaryRoot) throw new Error("putCatalogCallback: Root missing.");
        t2.internal.write("/AcroForm " + t2.internal.acroformPlugin.acroFormDictionaryRoot.objId + " 0 R");
      }(t);
    }), t.internal.events.subscribe("postPutPages", function(e2) {
      !function(t2, e3) {
        var r2 = !t2;
        for (var n2 in t2 || (e3.internal.newObjectDeferredBegin(e3.internal.acroformPlugin.acroFormDictionaryRoot.objId, true), e3.internal.acroformPlugin.acroFormDictionaryRoot.putStream()), t2 = t2 || e3.internal.acroformPlugin.acroFormDictionaryRoot.Kids) if (t2.hasOwnProperty(n2)) {
          var i2 = t2[n2], a2 = [], o2 = i2.Rect;
          if (i2.Rect && (i2.Rect = X(i2.Rect, e3)), e3.internal.newObjectDeferredBegin(i2.objId, true), i2.DA = wt.createDefaultAppearanceStream(i2), "object" == typeof i2 && "function" == typeof i2.getKeyValueListForStream && (a2 = i2.getKeyValueListForStream()), i2.Rect = o2, i2.hasAppearanceStream && !i2.appearanceStreamContent) {
            var s2 = K(i2);
            a2.push({
              key: "AP",
              value: "<</N " + s2 + ">>"
            }), e3.internal.acroformPlugin.xForms.push(s2);
          }
          if (i2.appearanceStreamContent) {
            var u2 = "";
            for (var c2 in i2.appearanceStreamContent) if (i2.appearanceStreamContent.hasOwnProperty(c2)) {
              var l2 = i2.appearanceStreamContent[c2];
              if (u2 += "/" + c2 + " ", u2 += "<<", Object.keys(l2).length >= 1 || Array.isArray(l2)) {
                for (var n2 in l2) if (l2.hasOwnProperty(n2)) {
                  var h2 = l2[n2];
                  "function" == typeof h2 && (h2 = h2.call(e3, i2)), u2 += "/" + n2 + " " + h2 + " ", e3.internal.acroformPlugin.xForms.indexOf(h2) >= 0 || e3.internal.acroformPlugin.xForms.push(h2);
                }
              } else "function" == typeof (h2 = l2) && (h2 = h2.call(e3, i2)), u2 += "/" + n2 + " " + h2, e3.internal.acroformPlugin.xForms.indexOf(h2) >= 0 || e3.internal.acroformPlugin.xForms.push(h2);
              u2 += ">>";
            }
            a2.push({
              key: "AP",
              value: "<<\n" + u2 + ">>"
            });
          }
          e3.internal.putStream({
            additionalKeyValues: a2,
            objectId: i2.objId
          }), e3.internal.out("endobj");
        }
        r2 && et2(e3.internal.acroformPlugin.xForms, e3);
      }(e2, t);
    }), t.internal.acroformPlugin.isInitialized = true;
  }
};
var nt = B.__acroform__.arrayToPdfArray = function(t, e, r2) {
  var n2 = function(t2) {
    return t2;
  };
  if (Array.isArray(t)) {
    for (var i2 = "[", a2 = 0; a2 < t.length; a2++) switch (0 !== a2 && (i2 += " "), typeof t[a2]) {
      case "boolean":
      case "number":
      case "object":
        i2 += t[a2].toString();
        break;
      case "string":
        "/" !== t[a2].substr(0, 1) ? (void 0 !== e && r2 && (n2 = r2.internal.getEncryptor(e)), i2 += "(" + E(n2(t[a2].toString())) + ")") : i2 += t[a2].toString();
    }
    return i2 += "]";
  }
  throw new Error("Invalid argument passed to jsPDF.__acroform__.arrayToPdfArray");
};
var it = function(t, e, r2) {
  var n2 = function(t2) {
    return t2;
  };
  return void 0 !== e && r2 && (n2 = r2.internal.getEncryptor(e)), (t = t || "").toString(), t = "(" + E(n2(t)) + ")";
};
var at = function() {
  this._objId = void 0, this._scope = void 0, Object.defineProperty(this, "objId", {
    get: function() {
      if (void 0 === this._objId) {
        if (void 0 === this.scope) return;
        this._objId = this.scope.internal.newObjectDeferred();
      }
      return this._objId;
    },
    set: function(t) {
      this._objId = t;
    }
  }), Object.defineProperty(this, "scope", {
    value: this._scope,
    writable: true
  });
};
at.prototype.toString = function() {
  return this.objId + " 0 R";
}, at.prototype.putStream = function() {
  var t = this.getKeyValueListForStream();
  this.scope.internal.putStream({
    data: this.stream,
    additionalKeyValues: t,
    objectId: this.objId
  }), this.scope.internal.out("endobj");
}, at.prototype.getKeyValueListForStream = function() {
  var t = [], e = Object.getOwnPropertyNames(this).filter(function(t2) {
    return "content" != t2 && "appearanceStreamContent" != t2 && "scope" != t2 && "objId" != t2 && "_" != t2.substring(0, 1);
  });
  for (var r2 in e) if (false === Object.getOwnPropertyDescriptor(this, e[r2]).configurable) {
    var n2 = e[r2], i2 = this[n2];
    i2 && (Array.isArray(i2) ? t.push({
      key: n2,
      value: nt(i2, this.objId, this.scope)
    }) : i2 instanceof at ? (i2.scope = this.scope, t.push({
      key: n2,
      value: i2.objId + " 0 R"
    })) : "function" != typeof i2 && t.push({
      key: n2,
      value: i2
    }));
  }
  return t;
};
var ot = function() {
  at.call(this), Object.defineProperty(this, "Type", {
    value: "/XObject",
    configurable: false,
    writable: true
  }), Object.defineProperty(this, "Subtype", {
    value: "/Form",
    configurable: false,
    writable: true
  }), Object.defineProperty(this, "FormType", {
    value: 1,
    configurable: false,
    writable: true
  });
  var t, e = [];
  Object.defineProperty(this, "BBox", {
    configurable: false,
    get: function() {
      return e;
    },
    set: function(t2) {
      e = t2;
    }
  }), Object.defineProperty(this, "Resources", {
    value: "2 0 R",
    configurable: false,
    writable: true
  }), Object.defineProperty(this, "stream", {
    enumerable: false,
    configurable: true,
    set: function(e2) {
      t = e2.trim();
    },
    get: function() {
      return t || null;
    }
  });
};
D(ot, at);
var st = function() {
  at.call(this);
  var t, e = [];
  Object.defineProperty(this, "Kids", {
    enumerable: false,
    configurable: true,
    get: function() {
      return e.length > 0 ? e : void 0;
    }
  }), Object.defineProperty(this, "Fields", {
    enumerable: false,
    configurable: false,
    get: function() {
      return e;
    }
  }), Object.defineProperty(this, "DA", {
    enumerable: false,
    configurable: false,
    get: function() {
      if (t) {
        var e2 = function(t2) {
          return t2;
        };
        return this.scope && (e2 = this.scope.internal.getEncryptor(this.objId)), "(" + E(e2(t)) + ")";
      }
    },
    set: function(e2) {
      t = e2;
    }
  });
};
D(st, at);
var ut = function() {
  at.call(this);
  var t = 4;
  Object.defineProperty(this, "F", {
    enumerable: false,
    configurable: false,
    get: function() {
      return t;
    },
    set: function(e2) {
      if (isNaN(e2)) throw new Error('Invalid value "' + e2 + '" for attribute F supplied.');
      t = e2;
    }
  }), Object.defineProperty(this, "showWhenPrinted", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(t, 3));
    },
    set: function(e2) {
      true === Boolean(e2) ? this.F = Y(t, 3) : this.F = J(t, 3);
    }
  });
  var e = 0;
  Object.defineProperty(this, "Ff", {
    enumerable: false,
    configurable: false,
    get: function() {
      return e;
    },
    set: function(t2) {
      if (isNaN(t2)) throw new Error('Invalid value "' + t2 + '" for attribute Ff supplied.');
      e = t2;
    }
  });
  var r2 = [];
  Object.defineProperty(this, "Rect", {
    enumerable: false,
    configurable: false,
    get: function() {
      if (0 !== r2.length) return r2;
    },
    set: function(t2) {
      r2 = void 0 !== t2 ? t2 : [];
    }
  }), Object.defineProperty(this, "x", {
    enumerable: true,
    configurable: true,
    get: function() {
      return !r2 || isNaN(r2[0]) ? 0 : r2[0];
    },
    set: function(t2) {
      r2[0] = t2;
    }
  }), Object.defineProperty(this, "y", {
    enumerable: true,
    configurable: true,
    get: function() {
      return !r2 || isNaN(r2[1]) ? 0 : r2[1];
    },
    set: function(t2) {
      r2[1] = t2;
    }
  }), Object.defineProperty(this, "width", {
    enumerable: true,
    configurable: true,
    get: function() {
      return !r2 || isNaN(r2[2]) ? 0 : r2[2];
    },
    set: function(t2) {
      r2[2] = t2;
    }
  }), Object.defineProperty(this, "height", {
    enumerable: true,
    configurable: true,
    get: function() {
      return !r2 || isNaN(r2[3]) ? 0 : r2[3];
    },
    set: function(t2) {
      r2[3] = t2;
    }
  });
  var n2 = "";
  Object.defineProperty(this, "FT", {
    enumerable: true,
    configurable: false,
    get: function() {
      return n2;
    },
    set: function(t2) {
      switch (t2) {
        case "/Btn":
        case "/Tx":
        case "/Ch":
        case "/Sig":
          n2 = t2;
          break;
        default:
          throw new Error('Invalid value "' + t2 + '" for attribute FT supplied.');
      }
    }
  });
  var i2 = null;
  Object.defineProperty(this, "T", {
    enumerable: true,
    configurable: false,
    get: function() {
      if (!i2 || i2.length < 1) {
        if (this instanceof mt) return;
        i2 = "FieldObject" + ut.FieldNum++;
      }
      var t2 = function(t3) {
        return t3;
      };
      return this.scope && (t2 = this.scope.internal.getEncryptor(this.objId)), "(" + E(t2(i2)) + ")";
    },
    set: function(t2) {
      i2 = t2.toString();
    }
  }), Object.defineProperty(this, "fieldName", {
    configurable: true,
    enumerable: true,
    get: function() {
      return i2;
    },
    set: function(t2) {
      i2 = t2;
    }
  });
  var a2 = "helvetica";
  Object.defineProperty(this, "fontName", {
    enumerable: true,
    configurable: true,
    get: function() {
      return a2;
    },
    set: function(t2) {
      a2 = t2;
    }
  });
  var o2 = "normal";
  Object.defineProperty(this, "fontStyle", {
    enumerable: true,
    configurable: true,
    get: function() {
      return o2;
    },
    set: function(t2) {
      o2 = t2;
    }
  });
  var s2 = 0;
  Object.defineProperty(this, "fontSize", {
    enumerable: true,
    configurable: true,
    get: function() {
      return s2;
    },
    set: function(t2) {
      s2 = t2;
    }
  });
  var u2 = void 0;
  Object.defineProperty(this, "maxFontSize", {
    enumerable: true,
    configurable: true,
    get: function() {
      return void 0 === u2 ? 50 / M : u2;
    },
    set: function(t2) {
      u2 = t2;
    }
  });
  var c2 = "black";
  Object.defineProperty(this, "color", {
    enumerable: true,
    configurable: true,
    get: function() {
      return c2;
    },
    set: function(t2) {
      c2 = t2;
    }
  });
  var l2 = "/F1 0 Tf 0 g";
  Object.defineProperty(this, "DA", {
    enumerable: true,
    configurable: false,
    get: function() {
      if (!(!l2 || this instanceof mt || this instanceof bt)) return it(l2, this.objId, this.scope);
    },
    set: function(t2) {
      t2 = t2.toString(), l2 = t2;
    }
  });
  var h2 = null;
  Object.defineProperty(this, "DV", {
    enumerable: false,
    configurable: false,
    get: function() {
      if (h2) return this instanceof dt == false ? it(h2, this.objId, this.scope) : h2;
    },
    set: function(t2) {
      t2 = t2.toString(), h2 = this instanceof dt == false ? "(" === t2.substr(0, 1) ? q(t2.substr(1, t2.length - 2)) : q(t2) : t2;
    }
  }), Object.defineProperty(this, "defaultValue", {
    enumerable: true,
    configurable: true,
    get: function() {
      return this instanceof dt == true ? q(h2.substr(1, h2.length - 1)) : h2;
    },
    set: function(t2) {
      t2 = t2.toString(), h2 = this instanceof dt == true ? "/" + t2 : t2;
    }
  });
  var f2 = null;
  Object.defineProperty(this, "_V", {
    enumerable: false,
    configurable: false,
    get: function() {
      if (f2) return f2;
    },
    set: function(t2) {
      this.V = t2;
    }
  }), Object.defineProperty(this, "V", {
    enumerable: false,
    configurable: false,
    get: function() {
      if (f2) return this instanceof dt == false ? it(f2, this.objId, this.scope) : f2;
    },
    set: function(t2) {
      t2 = t2.toString(), f2 = this instanceof dt == false ? "(" === t2.substr(0, 1) ? q(t2.substr(1, t2.length - 2)) : q(t2) : t2;
    }
  }), Object.defineProperty(this, "value", {
    enumerable: true,
    configurable: true,
    get: function() {
      return this instanceof dt == true ? q(f2.substr(1, f2.length - 1)) : f2;
    },
    set: function(t2) {
      t2 = t2.toString(), f2 = this instanceof dt == true ? "/" + t2 : t2;
    }
  }), Object.defineProperty(this, "hasAnnotation", {
    enumerable: true,
    configurable: true,
    get: function() {
      return this.Rect;
    }
  }), Object.defineProperty(this, "Type", {
    enumerable: true,
    configurable: false,
    get: function() {
      return this.hasAnnotation ? "/Annot" : null;
    }
  }), Object.defineProperty(this, "Subtype", {
    enumerable: true,
    configurable: false,
    get: function() {
      return this.hasAnnotation ? "/Widget" : null;
    }
  });
  var d2, p2 = false;
  Object.defineProperty(this, "hasAppearanceStream", {
    enumerable: true,
    configurable: true,
    get: function() {
      return p2;
    },
    set: function(t2) {
      t2 = Boolean(t2), p2 = t2;
    }
  }), Object.defineProperty(this, "page", {
    enumerable: true,
    configurable: true,
    get: function() {
      if (d2) return d2;
    },
    set: function(t2) {
      d2 = t2;
    }
  }), Object.defineProperty(this, "readOnly", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 1));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 1) : this.Ff = J(this.Ff, 1);
    }
  }), Object.defineProperty(this, "required", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 2));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 2) : this.Ff = J(this.Ff, 2);
    }
  }), Object.defineProperty(this, "noExport", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 3));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 3) : this.Ff = J(this.Ff, 3);
    }
  });
  var g2 = null;
  Object.defineProperty(this, "Q", {
    enumerable: true,
    configurable: false,
    get: function() {
      if (null !== g2) return g2;
    },
    set: function(t2) {
      if (-1 === [0, 1, 2].indexOf(t2)) throw new Error('Invalid value "' + t2 + '" for attribute Q supplied.');
      g2 = t2;
    }
  }), Object.defineProperty(this, "textAlign", {
    get: function() {
      var t2;
      switch (g2) {
        case 0:
        default:
          t2 = "left";
          break;
        case 1:
          t2 = "center";
          break;
        case 2:
          t2 = "right";
      }
      return t2;
    },
    configurable: true,
    enumerable: true,
    set: function(t2) {
      switch (t2) {
        case "right":
        case 2:
          g2 = 2;
          break;
        case "center":
        case 1:
          g2 = 1;
          break;
        case "left":
        case 0:
        default:
          g2 = 0;
      }
    }
  });
};
D(ut, at);
var ct = function() {
  ut.call(this), this.FT = "/Ch", this.V = "()", this.fontName = "zapfdingbats";
  var t = 0;
  Object.defineProperty(this, "TI", {
    enumerable: true,
    configurable: false,
    get: function() {
      return t;
    },
    set: function(e2) {
      t = e2;
    }
  }), Object.defineProperty(this, "topIndex", {
    enumerable: true,
    configurable: true,
    get: function() {
      return t;
    },
    set: function(e2) {
      t = e2;
    }
  });
  var e = [];
  Object.defineProperty(this, "Opt", {
    enumerable: true,
    configurable: false,
    get: function() {
      return nt(e, this.objId, this.scope);
    },
    set: function(t2) {
      var r2, n2;
      n2 = [], "string" == typeof (r2 = t2) && (n2 = function(t3, e2, r3) {
        r3 || (r3 = 1);
        for (var n3, i2 = []; n3 = e2.exec(t3); ) i2.push(n3[r3]);
        return i2;
      }(r2, /\((.*?)\)/g)), e = n2;
    }
  }), this.getOptions = function() {
    return e;
  }, this.setOptions = function(t2) {
    e = t2, this.sort && e.sort();
  }, this.addOption = function(t2) {
    t2 = (t2 = t2 || "").toString(), e.push(t2), this.sort && e.sort();
  }, this.removeOption = function(t2, r2) {
    for (r2 = r2 || false, t2 = (t2 = t2 || "").toString(); -1 !== e.indexOf(t2) && (e.splice(e.indexOf(t2), 1), false !== r2); ) ;
  }, Object.defineProperty(this, "combo", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 18));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 18) : this.Ff = J(this.Ff, 18);
    }
  }), Object.defineProperty(this, "edit", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 19));
    },
    set: function(t2) {
      true === this.combo && (true === Boolean(t2) ? this.Ff = Y(this.Ff, 19) : this.Ff = J(this.Ff, 19));
    }
  }), Object.defineProperty(this, "sort", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 20));
    },
    set: function(t2) {
      true === Boolean(t2) ? (this.Ff = Y(this.Ff, 20), e.sort()) : this.Ff = J(this.Ff, 20);
    }
  }), Object.defineProperty(this, "multiSelect", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 22));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 22) : this.Ff = J(this.Ff, 22);
    }
  }), Object.defineProperty(this, "doNotSpellCheck", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 23));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 23) : this.Ff = J(this.Ff, 23);
    }
  }), Object.defineProperty(this, "commitOnSelChange", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 27));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 27) : this.Ff = J(this.Ff, 27);
    }
  }), this.hasAppearanceStream = false;
};
D(ct, ut);
var lt = function() {
  ct.call(this), this.fontName = "helvetica", this.combo = false;
};
D(lt, ct);
var ht = function() {
  lt.call(this), this.combo = true;
};
D(ht, lt);
var ft = function() {
  ht.call(this), this.edit = true;
};
D(ft, ht);
var dt = function() {
  ut.call(this), this.FT = "/Btn", Object.defineProperty(this, "noToggleToOff", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 15));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 15) : this.Ff = J(this.Ff, 15);
    }
  }), Object.defineProperty(this, "radio", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 16));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 16) : this.Ff = J(this.Ff, 16);
    }
  }), Object.defineProperty(this, "pushButton", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 17));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 17) : this.Ff = J(this.Ff, 17);
    }
  }), Object.defineProperty(this, "radioIsUnison", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 26));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 26) : this.Ff = J(this.Ff, 26);
    }
  });
  var t, e = {};
  Object.defineProperty(this, "MK", {
    enumerable: false,
    configurable: false,
    get: function() {
      var t2 = function(t3) {
        return t3;
      };
      if (this.scope && (t2 = this.scope.internal.getEncryptor(this.objId)), 0 !== Object.keys(e).length) {
        var r2, n2 = [];
        for (r2 in n2.push("<<"), e) n2.push("/" + r2 + " (" + E(t2(e[r2])) + ")");
        return n2.push(">>"), n2.join("\n");
      }
    },
    set: function(t2) {
      "object" == typeof t2 && (e = t2);
    }
  }), Object.defineProperty(this, "caption", {
    enumerable: true,
    configurable: true,
    get: function() {
      return e.CA || "";
    },
    set: function(t2) {
      "string" == typeof t2 && (e.CA = t2);
    }
  }), Object.defineProperty(this, "AS", {
    enumerable: false,
    configurable: false,
    get: function() {
      return t;
    },
    set: function(e2) {
      t = e2;
    }
  }), Object.defineProperty(this, "appearanceState", {
    enumerable: true,
    configurable: true,
    get: function() {
      return t.substr(1, t.length - 1);
    },
    set: function(e2) {
      t = "/" + e2;
    }
  });
};
D(dt, ut);
var pt = function() {
  dt.call(this), this.pushButton = true;
};
D(pt, dt);
var gt = function() {
  dt.call(this), this.radio = true, this.pushButton = false;
  var t = [];
  Object.defineProperty(this, "Kids", {
    enumerable: true,
    configurable: false,
    get: function() {
      return t;
    },
    set: function(e) {
      t = void 0 !== e ? e : [];
    }
  });
};
D(gt, dt);
var mt = function() {
  var t, e;
  ut.call(this), Object.defineProperty(this, "Parent", {
    enumerable: false,
    configurable: false,
    get: function() {
      return t;
    },
    set: function(e2) {
      t = e2;
    }
  }), Object.defineProperty(this, "optionName", {
    enumerable: false,
    configurable: true,
    get: function() {
      return e;
    },
    set: function(t2) {
      e = t2;
    }
  });
  var r2, n2 = {};
  Object.defineProperty(this, "MK", {
    enumerable: false,
    configurable: false,
    get: function() {
      var t2 = function(t3) {
        return t3;
      };
      this.scope && (t2 = this.scope.internal.getEncryptor(this.objId));
      var e2, r3 = [];
      for (e2 in r3.push("<<"), n2) r3.push("/" + e2 + " (" + E(t2(n2[e2])) + ")");
      return r3.push(">>"), r3.join("\n");
    },
    set: function(t2) {
      "object" == typeof t2 && (n2 = t2);
    }
  }), Object.defineProperty(this, "caption", {
    enumerable: true,
    configurable: true,
    get: function() {
      return n2.CA || "";
    },
    set: function(t2) {
      "string" == typeof t2 && (n2.CA = t2);
    }
  }), Object.defineProperty(this, "AS", {
    enumerable: false,
    configurable: false,
    get: function() {
      return r2;
    },
    set: function(t2) {
      r2 = t2;
    }
  }), Object.defineProperty(this, "appearanceState", {
    enumerable: true,
    configurable: true,
    get: function() {
      return r2.substr(1, r2.length - 1);
    },
    set: function(t2) {
      r2 = "/" + t2;
    }
  }), this.caption = "l", this.appearanceState = "Off", this._AppearanceType = wt.RadioButton.Circle, this.appearanceStreamContent = this._AppearanceType.createAppearanceStream(this.optionName);
};
D(mt, ut), gt.prototype.setAppearance = function(t) {
  if (!("createAppearanceStream" in t) || !("getCA" in t)) throw new Error("Couldn't assign Appearance to RadioButton. Appearance was Invalid!");
  for (var e in this.Kids) if (this.Kids.hasOwnProperty(e)) {
    var r2 = this.Kids[e];
    r2.appearanceStreamContent = t.createAppearanceStream(r2.optionName), r2.caption = t.getCA();
  }
}, gt.prototype.createOption = function(t) {
  var e = new mt();
  return e.Parent = this, e.optionName = t, this.Kids.push(e), Nt.call(this.scope, e), e;
};
var vt = function() {
  dt.call(this), this.fontName = "zapfdingbats", this.caption = "3", this.appearanceState = "On", this.value = "On", this.textAlign = "center", this.appearanceStreamContent = wt.CheckBox.createAppearanceStream();
};
D(vt, dt);
var bt = function() {
  ut.call(this), this.FT = "/Tx", Object.defineProperty(this, "multiline", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 13));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 13) : this.Ff = J(this.Ff, 13);
    }
  }), Object.defineProperty(this, "fileSelect", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 21));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 21) : this.Ff = J(this.Ff, 21);
    }
  }), Object.defineProperty(this, "doNotSpellCheck", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 23));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 23) : this.Ff = J(this.Ff, 23);
    }
  }), Object.defineProperty(this, "doNotScroll", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 24));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 24) : this.Ff = J(this.Ff, 24);
    }
  }), Object.defineProperty(this, "comb", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 25));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 25) : this.Ff = J(this.Ff, 25);
    }
  }), Object.defineProperty(this, "richText", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 26));
    },
    set: function(t2) {
      true === Boolean(t2) ? this.Ff = Y(this.Ff, 26) : this.Ff = J(this.Ff, 26);
    }
  });
  var t = null;
  Object.defineProperty(this, "MaxLen", {
    enumerable: true,
    configurable: false,
    get: function() {
      return t;
    },
    set: function(e) {
      t = e;
    }
  }), Object.defineProperty(this, "maxLength", {
    enumerable: true,
    configurable: true,
    get: function() {
      return t;
    },
    set: function(e) {
      Number.isInteger(e) && (t = e);
    }
  }), Object.defineProperty(this, "hasAppearanceStream", {
    enumerable: true,
    configurable: true,
    get: function() {
      return this.V || this.DV;
    }
  });
};
D(bt, ut);
var yt = function() {
  bt.call(this), Object.defineProperty(this, "password", {
    enumerable: true,
    configurable: true,
    get: function() {
      return Boolean(G(this.Ff, 14));
    },
    set: function(t) {
      true === Boolean(t) ? this.Ff = Y(this.Ff, 14) : this.Ff = J(this.Ff, 14);
    }
  }), this.password = true;
};
D(yt, bt);
var wt = {
  CheckBox: {
    createAppearanceStream: function() {
      return {
        N: {
          On: wt.CheckBox.YesNormal
        },
        D: {
          On: wt.CheckBox.YesPushDown,
          Off: wt.CheckBox.OffPushDown
        }
      };
    },
    YesPushDown: function(t) {
      var e = z(t);
      e.scope = t.scope;
      var r2 = [], n2 = t.scope.internal.getFont(t.fontName, t.fontStyle).id, i2 = t.scope.__private__.encodeColorString(t.color), a2 = Z(t, t.caption);
      return r2.push("0.749023 g"), r2.push("0 0 " + R(wt.internal.getWidth(t)) + " " + R(wt.internal.getHeight(t)) + " re"), r2.push("f"), r2.push("BMC"), r2.push("q"), r2.push("0 0 1 rg"), r2.push("/" + n2 + " " + R(a2.fontSize) + " Tf " + i2), r2.push("BT"), r2.push(a2.text), r2.push("ET"), r2.push("Q"), r2.push("EMC"), e.stream = r2.join("\n"), e;
    },
    YesNormal: function(t) {
      var e = z(t);
      e.scope = t.scope;
      var r2 = t.scope.internal.getFont(t.fontName, t.fontStyle).id, n2 = t.scope.__private__.encodeColorString(t.color), i2 = [], a2 = wt.internal.getHeight(t), o2 = wt.internal.getWidth(t), s2 = Z(t, t.caption);
      return i2.push("1 g"), i2.push("0 0 " + R(o2) + " " + R(a2) + " re"), i2.push("f"), i2.push("q"), i2.push("0 0 1 rg"), i2.push("0 0 " + R(o2 - 1) + " " + R(a2 - 1) + " re"), i2.push("W"), i2.push("n"), i2.push("0 g"), i2.push("BT"), i2.push("/" + r2 + " " + R(s2.fontSize) + " Tf " + n2), i2.push(s2.text), i2.push("ET"), i2.push("Q"), e.stream = i2.join("\n"), e;
    },
    OffPushDown: function(t) {
      var e = z(t);
      e.scope = t.scope;
      var r2 = [];
      return r2.push("0.749023 g"), r2.push("0 0 " + R(wt.internal.getWidth(t)) + " " + R(wt.internal.getHeight(t)) + " re"), r2.push("f"), e.stream = r2.join("\n"), e;
    }
  },
  RadioButton: {
    Circle: {
      createAppearanceStream: function(t) {
        var e = {
          D: {
            Off: wt.RadioButton.Circle.OffPushDown
          },
          N: {}
        };
        return e.N[t] = wt.RadioButton.Circle.YesNormal, e.D[t] = wt.RadioButton.Circle.YesPushDown, e;
      },
      getCA: function() {
        return "l";
      },
      YesNormal: function(t) {
        var e = z(t);
        e.scope = t.scope;
        var r2 = [], n2 = wt.internal.getWidth(t) <= wt.internal.getHeight(t) ? wt.internal.getWidth(t) / 4 : wt.internal.getHeight(t) / 4;
        n2 = Number((0.9 * n2).toFixed(5));
        var i2 = wt.internal.Bezier_C, a2 = Number((n2 * i2).toFixed(5));
        return r2.push("q"), r2.push("1 0 0 1 " + T(wt.internal.getWidth(t) / 2) + " " + T(wt.internal.getHeight(t) / 2) + " cm"), r2.push(n2 + " 0 m"), r2.push(n2 + " " + a2 + " " + a2 + " " + n2 + " 0 " + n2 + " c"), r2.push("-" + a2 + " " + n2 + " -" + n2 + " " + a2 + " -" + n2 + " 0 c"), r2.push("-" + n2 + " -" + a2 + " -" + a2 + " -" + n2 + " 0 -" + n2 + " c"), r2.push(a2 + " -" + n2 + " " + n2 + " -" + a2 + " " + n2 + " 0 c"), r2.push("f"), r2.push("Q"), e.stream = r2.join("\n"), e;
      },
      YesPushDown: function(t) {
        var e = z(t);
        e.scope = t.scope;
        var r2 = [], n2 = wt.internal.getWidth(t) <= wt.internal.getHeight(t) ? wt.internal.getWidth(t) / 4 : wt.internal.getHeight(t) / 4;
        n2 = Number((0.9 * n2).toFixed(5));
        var i2 = Number((2 * n2).toFixed(5)), a2 = Number((i2 * wt.internal.Bezier_C).toFixed(5)), o2 = Number((n2 * wt.internal.Bezier_C).toFixed(5));
        return r2.push("0.749023 g"), r2.push("q"), r2.push("1 0 0 1 " + T(wt.internal.getWidth(t) / 2) + " " + T(wt.internal.getHeight(t) / 2) + " cm"), r2.push(i2 + " 0 m"), r2.push(i2 + " " + a2 + " " + a2 + " " + i2 + " 0 " + i2 + " c"), r2.push("-" + a2 + " " + i2 + " -" + i2 + " " + a2 + " -" + i2 + " 0 c"), r2.push("-" + i2 + " -" + a2 + " -" + a2 + " -" + i2 + " 0 -" + i2 + " c"), r2.push(a2 + " -" + i2 + " " + i2 + " -" + a2 + " " + i2 + " 0 c"), r2.push("f"), r2.push("Q"), r2.push("0 g"), r2.push("q"), r2.push("1 0 0 1 " + T(wt.internal.getWidth(t) / 2) + " " + T(wt.internal.getHeight(t) / 2) + " cm"), r2.push(n2 + " 0 m"), r2.push(n2 + " " + o2 + " " + o2 + " " + n2 + " 0 " + n2 + " c"), r2.push("-" + o2 + " " + n2 + " -" + n2 + " " + o2 + " -" + n2 + " 0 c"), r2.push("-" + n2 + " -" + o2 + " -" + o2 + " -" + n2 + " 0 -" + n2 + " c"), r2.push(o2 + " -" + n2 + " " + n2 + " -" + o2 + " " + n2 + " 0 c"), r2.push("f"), r2.push("Q"), e.stream = r2.join("\n"), e;
      },
      OffPushDown: function(t) {
        var e = z(t);
        e.scope = t.scope;
        var r2 = [], n2 = wt.internal.getWidth(t) <= wt.internal.getHeight(t) ? wt.internal.getWidth(t) / 4 : wt.internal.getHeight(t) / 4;
        n2 = Number((0.9 * n2).toFixed(5));
        var i2 = Number((2 * n2).toFixed(5)), a2 = Number((i2 * wt.internal.Bezier_C).toFixed(5));
        return r2.push("0.749023 g"), r2.push("q"), r2.push("1 0 0 1 " + T(wt.internal.getWidth(t) / 2) + " " + T(wt.internal.getHeight(t) / 2) + " cm"), r2.push(i2 + " 0 m"), r2.push(i2 + " " + a2 + " " + a2 + " " + i2 + " 0 " + i2 + " c"), r2.push("-" + a2 + " " + i2 + " -" + i2 + " " + a2 + " -" + i2 + " 0 c"), r2.push("-" + i2 + " -" + a2 + " -" + a2 + " -" + i2 + " 0 -" + i2 + " c"), r2.push(a2 + " -" + i2 + " " + i2 + " -" + a2 + " " + i2 + " 0 c"), r2.push("f"), r2.push("Q"), e.stream = r2.join("\n"), e;
      }
    },
    Cross: {
      createAppearanceStream: function(t) {
        var e = {
          D: {
            Off: wt.RadioButton.Cross.OffPushDown
          },
          N: {}
        };
        return e.N[t] = wt.RadioButton.Cross.YesNormal, e.D[t] = wt.RadioButton.Cross.YesPushDown, e;
      },
      getCA: function() {
        return "8";
      },
      YesNormal: function(t) {
        var e = z(t);
        e.scope = t.scope;
        var r2 = [], n2 = wt.internal.calculateCross(t);
        return r2.push("q"), r2.push("1 1 " + R(wt.internal.getWidth(t) - 2) + " " + R(wt.internal.getHeight(t) - 2) + " re"), r2.push("W"), r2.push("n"), r2.push(R(n2.x1.x) + " " + R(n2.x1.y) + " m"), r2.push(R(n2.x2.x) + " " + R(n2.x2.y) + " l"), r2.push(R(n2.x4.x) + " " + R(n2.x4.y) + " m"), r2.push(R(n2.x3.x) + " " + R(n2.x3.y) + " l"), r2.push("s"), r2.push("Q"), e.stream = r2.join("\n"), e;
      },
      YesPushDown: function(t) {
        var e = z(t);
        e.scope = t.scope;
        var r2 = wt.internal.calculateCross(t), n2 = [];
        return n2.push("0.749023 g"), n2.push("0 0 " + R(wt.internal.getWidth(t)) + " " + R(wt.internal.getHeight(t)) + " re"), n2.push("f"), n2.push("q"), n2.push("1 1 " + R(wt.internal.getWidth(t) - 2) + " " + R(wt.internal.getHeight(t) - 2) + " re"), n2.push("W"), n2.push("n"), n2.push(R(r2.x1.x) + " " + R(r2.x1.y) + " m"), n2.push(R(r2.x2.x) + " " + R(r2.x2.y) + " l"), n2.push(R(r2.x4.x) + " " + R(r2.x4.y) + " m"), n2.push(R(r2.x3.x) + " " + R(r2.x3.y) + " l"), n2.push("s"), n2.push("Q"), e.stream = n2.join("\n"), e;
      },
      OffPushDown: function(t) {
        var e = z(t);
        e.scope = t.scope;
        var r2 = [];
        return r2.push("0.749023 g"), r2.push("0 0 " + R(wt.internal.getWidth(t)) + " " + R(wt.internal.getHeight(t)) + " re"), r2.push("f"), e.stream = r2.join("\n"), e;
      }
    }
  },
  createDefaultAppearanceStream: function(t) {
    var e = t.scope.internal.getFont(t.fontName, t.fontStyle).id, r2 = t.scope.__private__.encodeColorString(t.color);
    return "/" + e + " " + t.fontSize + " Tf " + r2;
  }
};
wt.internal = {
  Bezier_C: 0.551915024494,
  calculateCross: function(t) {
    var e = wt.internal.getWidth(t), r2 = wt.internal.getHeight(t), n2 = Math.min(e, r2);
    return {
      x1: {
        x: (e - n2) / 2,
        y: (r2 - n2) / 2 + n2
      },
      x2: {
        x: (e - n2) / 2 + n2,
        y: (r2 - n2) / 2
      },
      x3: {
        x: (e - n2) / 2,
        y: (r2 - n2) / 2
      },
      x4: {
        x: (e - n2) / 2 + n2,
        y: (r2 - n2) / 2 + n2
      }
    };
  }
}, wt.internal.getWidth = function(t) {
  var e = 0;
  return "object" == typeof t && (e = U(t.Rect[2])), e;
}, wt.internal.getHeight = function(t) {
  var e = 0;
  return "object" == typeof t && (e = U(t.Rect[3])), e;
};
var Nt = B.addField = function(t) {
  if (rt(this, t), !(t instanceof ut)) throw new Error("Invalid argument passed to jsPDF.addField.");
  var e;
  return (e = t).scope.internal.acroformPlugin.printedOut && (e.scope.internal.acroformPlugin.printedOut = false, e.scope.internal.acroformPlugin.acroFormDictionaryRoot = null), e.scope.internal.acroformPlugin.acroFormDictionaryRoot.Fields.push(e), t.page = t.scope.internal.getCurrentPageInfo().pageNumber, this;
};
B.AcroFormChoiceField = ct, B.AcroFormListBox = lt, B.AcroFormComboBox = ht, B.AcroFormEditBox = ft, B.AcroFormButton = dt, B.AcroFormPushButton = pt, B.AcroFormRadioButton = gt, B.AcroFormCheckBox = vt, B.AcroFormTextField = bt, B.AcroFormPasswordField = yt, B.AcroFormAppearance = wt, B.AcroForm = {
  ChoiceField: ct,
  ListBox: lt,
  ComboBox: ht,
  EditBox: ft,
  Button: dt,
  PushButton: pt,
  RadioButton: gt,
  CheckBox: vt,
  TextField: bt,
  PasswordField: yt,
  Appearance: wt
}, O.AcroForm = {
  ChoiceField: ct,
  ListBox: lt,
  ComboBox: ht,
  EditBox: ft,
  Button: dt,
  PushButton: pt,
  RadioButton: gt,
  CheckBox: vt,
  TextField: bt,
  PasswordField: yt,
  Appearance: wt
};
var Lt = O.AcroForm;
function At(t) {
  return t.reduce(function(t2, e, r2) {
    return t2[e] = r2, t2;
  }, {});
}
!function(t) {
  t.__addimage__ = {};
  var e = "UNKNOWN", r2 = {
    PNG: [[137, 80, 78, 71]],
    TIFF: [[77, 77, 0, 42], [73, 73, 42, 0]],
    JPEG: [[255, 216, 255, 224, void 0, void 0, 74, 70, 73, 70, 0], [255, 216, 255, 225, void 0, void 0, 69, 120, 105, 102, 0, 0], [255, 216, 255, 219], [255, 216, 255, 238]],
    JPEG2000: [[0, 0, 0, 12, 106, 80, 32, 32]],
    GIF87a: [[71, 73, 70, 56, 55, 97]],
    GIF89a: [[71, 73, 70, 56, 57, 97]],
    WEBP: [[82, 73, 70, 70, void 0, void 0, void 0, void 0, 87, 69, 66, 80]],
    BMP: [[66, 77], [66, 65], [67, 73], [67, 80], [73, 67], [80, 84]]
  }, n2 = t.__addimage__.getImageFileTypeByImageData = function(t2, n3) {
    var i3, a3;
    n3 = n3 || e;
    var o3, s3, u2, c2 = e;
    if (x2(t2)) for (u2 in r2) for (o3 = r2[u2], i3 = 0; i3 < o3.length; i3 += 1) {
      for (s3 = true, a3 = 0; a3 < o3[i3].length; a3 += 1) if (void 0 !== o3[i3][a3] && o3[i3][a3] !== t2[a3]) {
        s3 = false;
        break;
      }
      if (true === s3) {
        c2 = u2;
        break;
      }
    }
    else for (u2 in r2) for (o3 = r2[u2], i3 = 0; i3 < o3.length; i3 += 1) {
      for (s3 = true, a3 = 0; a3 < o3[i3].length; a3 += 1) if (void 0 !== o3[i3][a3] && o3[i3][a3] !== t2.charCodeAt(a3)) {
        s3 = false;
        break;
      }
      if (true === s3) {
        c2 = u2;
        break;
      }
    }
    return c2 === e && n3 !== e && (c2 = n3), c2;
  }, i2 = function(t2) {
    for (var e2 = this.internal.write, r3 = this.internal.putStream, n3 = (0, this.internal.getFilters)(); -1 !== n3.indexOf("FlateEncode"); ) n3.splice(n3.indexOf("FlateEncode"), 1);
    t2.objectId = this.internal.newObject();
    var a3 = [];
    if (a3.push({
      key: "Type",
      value: "/XObject"
    }), a3.push({
      key: "Subtype",
      value: "/Image"
    }), a3.push({
      key: "Width",
      value: t2.width
    }), a3.push({
      key: "Height",
      value: t2.height
    }), t2.colorSpace === b2.INDEXED ? a3.push({
      key: "ColorSpace",
      value: "[/Indexed /DeviceRGB " + (t2.palette.length / 3 - 1) + " " + ("sMask" in t2 && void 0 !== t2.sMask ? t2.objectId + 2 : t2.objectId + 1) + " 0 R]"
    }) : (a3.push({
      key: "ColorSpace",
      value: "/" + t2.colorSpace
    }), t2.colorSpace === b2.DEVICE_CMYK && a3.push({
      key: "Decode",
      value: "[1 0 1 0 1 0 1 0]"
    })), a3.push({
      key: "BitsPerComponent",
      value: t2.bitsPerComponent
    }), "decodeParameters" in t2 && void 0 !== t2.decodeParameters && a3.push({
      key: "DecodeParms",
      value: "<<" + t2.decodeParameters + ">>"
    }), "transparency" in t2 && Array.isArray(t2.transparency)) {
      for (var o3 = "", s3 = 0, u2 = t2.transparency.length; s3 < u2; s3++) o3 += t2.transparency[s3] + " " + t2.transparency[s3] + " ";
      a3.push({
        key: "Mask",
        value: "[" + o3 + "]"
      });
    }
    void 0 !== t2.sMask && a3.push({
      key: "SMask",
      value: t2.objectId + 1 + " 0 R"
    });
    var c2 = void 0 !== t2.filter ? ["/" + t2.filter] : void 0;
    if (r3({
      data: t2.data,
      additionalKeyValues: a3,
      alreadyAppliedFilters: c2,
      objectId: t2.objectId
    }), e2("endobj"), "sMask" in t2 && void 0 !== t2.sMask) {
      var l3 = "/Predictor " + t2.predictor + " /Colors 1 /BitsPerComponent " + t2.bitsPerComponent + " /Columns " + t2.width, h3 = {
        width: t2.width,
        height: t2.height,
        colorSpace: "DeviceGray",
        bitsPerComponent: t2.bitsPerComponent,
        decodeParameters: l3,
        data: t2.sMask
      };
      "filter" in t2 && (h3.filter = t2.filter), i2.call(this, h3);
    }
    if (t2.colorSpace === b2.INDEXED) {
      var f3 = this.internal.newObject();
      r3({
        data: _2(new Uint8Array(t2.palette)),
        objectId: f3
      }), e2("endobj");
    }
  }, a2 = function() {
    var t2 = this.internal.collections.addImage_images;
    for (var e2 in t2) i2.call(this, t2[e2]);
  }, o2 = function() {
    var t2, e2 = this.internal.collections.addImage_images, r3 = this.internal.write;
    for (var n3 in e2) r3("/I" + (t2 = e2[n3]).index, t2.objectId, "0", "R");
  }, s2 = function() {
    this.internal.collections.addImage_images || (this.internal.collections.addImage_images = {}, this.internal.events.subscribe("putResources", a2), this.internal.events.subscribe("putXobjectDict", o2));
  }, l2 = function() {
    var t2 = this.internal.collections.addImage_images;
    return s2.call(this), t2;
  }, h2 = function() {
    return Object.keys(this.internal.collections.addImage_images).length;
  }, f2 = function(e2) {
    return "function" == typeof t["process" + e2.toUpperCase()];
  }, d2 = function(t2) {
    return "object" == typeof t2 && 1 === t2.nodeType;
  }, p2 = function(e2, r3) {
    if ("IMG" === e2.nodeName && e2.hasAttribute("src")) {
      var n3 = "" + e2.getAttribute("src");
      if (0 === n3.indexOf("data:image/")) return u(unescape(n3).split("base64,").pop());
      var i3 = t.loadFile(n3, true);
      if (void 0 !== i3) return i3;
    }
    if ("CANVAS" === e2.nodeName) {
      var a3;
      switch (r3) {
        case "PNG":
          a3 = "image/png";
          break;
        case "WEBP":
          a3 = "image/webp";
          break;
        case "JPEG":
        case "JPG":
        default:
          a3 = "image/jpeg";
      }
      return u(e2.toDataURL(a3, 1).split("base64,").pop());
    }
  }, g2 = function(t2) {
    var e2 = this.internal.collections.addImage_images;
    if (e2) {
      for (var r3 in e2) if (t2 === e2[r3].alias) return e2[r3];
    }
  }, m2 = function(t2, e2, r3) {
    return t2 || e2 || (t2 = -96, e2 = -96), t2 < 0 && (t2 = -1 * r3.width * 72 / t2 / this.internal.scaleFactor), e2 < 0 && (e2 = -1 * r3.height * 72 / e2 / this.internal.scaleFactor), 0 === t2 && (t2 = e2 * r3.width / r3.height), 0 === e2 && (e2 = t2 * r3.height / r3.width), [t2, e2];
  }, v2 = function(t2, e2, r3, n3, i3, a3) {
    var o3 = m2.call(this, r3, n3, i3), s3 = this.internal.getCoordinateString, u2 = this.internal.getVerticalCoordinateString, c2 = l2.call(this);
    if (r3 = o3[0], n3 = o3[1], c2[i3.index] = i3, a3) {
      a3 *= Math.PI / 180;
      var h3 = Math.cos(a3), f3 = Math.sin(a3), d3 = function(t3) {
        return t3.toFixed(4);
      }, p3 = [d3(h3), d3(f3), d3(-1 * f3), d3(h3), 0, 0, "cm"];
    }
    this.internal.write("q"), a3 ? (this.internal.write([1, "0", "0", 1, s3(t2), u2(e2 + n3), "cm"].join(" ")), this.internal.write(p3.join(" ")), this.internal.write([s3(r3), "0", "0", s3(n3), "0", "0", "cm"].join(" "))) : this.internal.write([s3(r3), "0", "0", s3(n3), s3(t2), u2(e2 + n3), "cm"].join(" ")), this.isAdvancedAPI() && this.internal.write([1, 0, 0, -1, 0, 0, "cm"].join(" ")), this.internal.write("/I" + i3.index + " Do"), this.internal.write("Q");
  }, b2 = t.color_spaces = {
    DEVICE_RGB: "DeviceRGB",
    DEVICE_GRAY: "DeviceGray",
    DEVICE_CMYK: "DeviceCMYK",
    CAL_GREY: "CalGray",
    CAL_RGB: "CalRGB",
    LAB: "Lab",
    ICC_BASED: "ICCBased",
    INDEXED: "Indexed",
    PATTERN: "Pattern",
    SEPARATION: "Separation",
    DEVICE_N: "DeviceN"
  };
  t.decode = {
    DCT_DECODE: "DCTDecode",
    FLATE_DECODE: "FlateDecode",
    LZW_DECODE: "LZWDecode",
    JPX_DECODE: "JPXDecode",
    JBIG2_DECODE: "JBIG2Decode",
    ASCII85_DECODE: "ASCII85Decode",
    ASCII_HEX_DECODE: "ASCIIHexDecode",
    RUN_LENGTH_DECODE: "RunLengthDecode",
    CCITT_FAX_DECODE: "CCITTFaxDecode"
  };
  var y2 = t.image_compression = {
    NONE: "NONE",
    FAST: "FAST",
    MEDIUM: "MEDIUM",
    SLOW: "SLOW"
  }, w2 = t.__addimage__.sHashCode = function(t2) {
    var e2, r3, n3 = 0;
    if ("string" == typeof t2) for (r3 = t2.length, e2 = 0; e2 < r3; e2++) n3 = (n3 << 5) - n3 + t2.charCodeAt(e2), n3 |= 0;
    else if (x2(t2)) for (r3 = t2.byteLength / 2, e2 = 0; e2 < r3; e2++) n3 = (n3 << 5) - n3 + t2[e2], n3 |= 0;
    return n3;
  }, N2 = t.__addimage__.validateStringAsBase64 = function(t2) {
    (t2 = t2 || "").toString().trim();
    var e2 = true;
    return 0 === t2.length && (e2 = false), t2.length % 4 != 0 && (e2 = false), false === /^[A-Za-z0-9+/]+$/.test(t2.substr(0, t2.length - 2)) && (e2 = false), false === /^[A-Za-z0-9/][A-Za-z0-9+/]|[A-Za-z0-9+/]=|==$/.test(t2.substr(-2)) && (e2 = false), e2;
  }, L2 = t.__addimage__.extractImageFromDataUrl = function(t2) {
    var e2 = (t2 = t2 || "").split("base64,"), r3 = null;
    if (2 === e2.length) {
      var n3 = /^data:(\w*\/\w*);*(charset=(?!charset=)[\w=-]*)*;*$/.exec(e2[0]);
      Array.isArray(n3) && (r3 = {
        mimeType: n3[1],
        charset: n3[2],
        data: e2[1]
      });
    }
    return r3;
  }, A2 = t.__addimage__.supportsArrayBuffer = function() {
    return "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array;
  };
  t.__addimage__.isArrayBuffer = function(t2) {
    return A2() && t2 instanceof ArrayBuffer;
  };
  var x2 = t.__addimage__.isArrayBufferView = function(t2) {
    return A2() && "undefined" != typeof Uint32Array && (t2 instanceof Int8Array || t2 instanceof Uint8Array || "undefined" != typeof Uint8ClampedArray && t2 instanceof Uint8ClampedArray || t2 instanceof Int16Array || t2 instanceof Uint16Array || t2 instanceof Int32Array || t2 instanceof Uint32Array || t2 instanceof Float32Array || t2 instanceof Float64Array);
  }, S2 = t.__addimage__.binaryStringToUint8Array = function(t2) {
    for (var e2 = t2.length, r3 = new Uint8Array(e2), n3 = 0; n3 < e2; n3++) r3[n3] = t2.charCodeAt(n3);
    return r3;
  }, _2 = t.__addimage__.arrayBufferToBinaryString = function(t2) {
    try {
      return u(c(String.fromCharCode.apply(null, t2)));
    } catch (e2) {
      if ("undefined" != typeof Uint8Array && void 0 !== Uint8Array.prototype.reduce) return new Uint8Array(t2).reduce(function(t3, e3) {
        return t3.push(String.fromCharCode(e3)), t3;
      }, []).join("");
    }
  };
  t.addImage = function() {
    var t2, r3, n3, i3, a3, o3, u2, c2, l3;
    if ("number" == typeof arguments[1] ? (r3 = e, n3 = arguments[1], i3 = arguments[2], a3 = arguments[3], o3 = arguments[4], u2 = arguments[5], c2 = arguments[6], l3 = arguments[7]) : (r3 = arguments[1], n3 = arguments[2], i3 = arguments[3], a3 = arguments[4], o3 = arguments[5], u2 = arguments[6], c2 = arguments[7], l3 = arguments[8]), "object" == typeof (t2 = arguments[0]) && !d2(t2) && "imageData" in t2) {
      var h3 = t2;
      t2 = h3.imageData, r3 = h3.format || r3 || e, n3 = h3.x || n3 || 0, i3 = h3.y || i3 || 0, a3 = h3.w || h3.width || a3, o3 = h3.h || h3.height || o3, u2 = h3.alias || u2, c2 = h3.compression || c2, l3 = h3.rotation || h3.angle || l3;
    }
    var f3 = this.internal.getFilters();
    if (void 0 === c2 && -1 !== f3.indexOf("FlateEncode") && (c2 = "SLOW"), isNaN(n3) || isNaN(i3)) throw new Error("Invalid coordinates passed to jsPDF.addImage");
    s2.call(this);
    var p3 = P2.call(this, t2, r3, u2, c2);
    return v2.call(this, n3, i3, a3, o3, p3, l3), this;
  };
  var P2 = function(r3, i3, a3, o3) {
    var s3, u2, c2;
    if ("string" == typeof r3 && n2(r3) === e) {
      r3 = unescape(r3);
      var l3 = k2(r3, false);
      ("" !== l3 || void 0 !== (l3 = t.loadFile(r3, true))) && (r3 = l3);
    }
    if (d2(r3) && (r3 = p2(r3, i3)), i3 = n2(r3, i3), !f2(i3)) throw new Error("addImage does not support files of type '" + i3 + "', please ensure that a plugin for '" + i3 + "' support is added.");
    if ((null == (c2 = a3) || 0 === c2.length) && (a3 = function(t2) {
      return "string" == typeof t2 || x2(t2) ? w2(t2) : null;
    }(r3)), (s3 = g2.call(this, a3)) || (A2() && (r3 instanceof Uint8Array || (u2 = r3, r3 = S2(r3))), s3 = this["process" + i3.toUpperCase()](r3, h2.call(this), a3, function(e2) {
      return e2 && "string" == typeof e2 && (e2 = e2.toUpperCase()), e2 in t.image_compression ? e2 : y2.NONE;
    }(o3), u2)), !s3) throw new Error("An unknown error occurred whilst processing the image.");
    return s3;
  }, k2 = t.__addimage__.convertBase64ToBinaryString = function(t2, e2) {
    var r3;
    e2 = "boolean" != typeof e2 || e2;
    var n3, i3 = "";
    if ("string" == typeof t2) {
      n3 = null !== (r3 = L2(t2)) ? r3.data : t2;
      try {
        i3 = u(n3);
      } catch (t3) {
        if (e2) throw N2(n3) ? new Error("atob-Error in jsPDF.convertBase64ToBinaryString " + t3.message) : new Error("Supplied Data is not a valid base64-String jsPDF.convertBase64ToBinaryString ");
      }
    }
    return i3;
  };
  t.getImageProperties = function(r3) {
    var i3, a3, o3 = "";
    if (d2(r3) && (r3 = p2(r3)), "string" == typeof r3 && n2(r3) === e && ("" === (o3 = k2(r3, false)) && (o3 = t.loadFile(r3) || ""), r3 = o3), a3 = n2(r3), !f2(a3)) throw new Error("addImage does not support files of type '" + a3 + "', please ensure that a plugin for '" + a3 + "' support is added.");
    if (!A2() || r3 instanceof Uint8Array || (r3 = S2(r3)), !(i3 = this["process" + a3.toUpperCase()](r3))) throw new Error("An unknown error occurred whilst processing the image");
    return i3.fileType = a3, i3;
  };
}(O.API), /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t) {
  var e = function(t2) {
    if (void 0 !== t2 && "" != t2) return true;
  };
  O.API.events.push(["addPage", function(t2) {
    this.internal.getPageInfo(t2.pageNumber).pageContext.annotations = [];
  }]), t.events.push(["putPage", function(t2) {
    for (var r2, n2, i2, a2 = this.internal.getCoordinateString, o2 = this.internal.getVerticalCoordinateString, s2 = this.internal.getPageInfoByObjId(t2.objId), u2 = t2.pageContext.annotations, c2 = false, l2 = 0; l2 < u2.length && !c2; l2++) switch ((r2 = u2[l2]).type) {
      case "link":
        (e(r2.options.url) || e(r2.options.pageNumber)) && (c2 = true);
        break;
      case "reference":
      case "text":
      case "freetext":
        c2 = true;
    }
    if (0 != c2) {
      this.internal.write("/Annots [");
      for (var h2 = 0; h2 < u2.length; h2++) {
        r2 = u2[h2];
        var f2 = this.internal.pdfEscape, d2 = this.internal.getEncryptor(t2.objId);
        switch (r2.type) {
          case "reference":
            this.internal.write(" " + r2.object.objId + " 0 R ");
            break;
          case "text":
            var p2 = this.internal.newAdditionalObject(), g2 = this.internal.newAdditionalObject(), m2 = this.internal.getEncryptor(p2.objId), v2 = r2.title || "Note";
            i2 = "<</Type /Annot /Subtype /Text " + (n2 = "/Rect [" + a2(r2.bounds.x) + " " + o2(r2.bounds.y + r2.bounds.h) + " " + a2(r2.bounds.x + r2.bounds.w) + " " + o2(r2.bounds.y) + "] ") + "/Contents (" + f2(m2(r2.contents)) + ")", i2 += " /Popup " + g2.objId + " 0 R", i2 += " /P " + s2.objId + " 0 R", i2 += " /T (" + f2(m2(v2)) + ") >>", p2.content = i2;
            var b2 = p2.objId + " 0 R";
            i2 = "<</Type /Annot /Subtype /Popup " + (n2 = "/Rect [" + a2(r2.bounds.x + 30) + " " + o2(r2.bounds.y + r2.bounds.h) + " " + a2(r2.bounds.x + r2.bounds.w + 30) + " " + o2(r2.bounds.y) + "] ") + " /Parent " + b2, r2.open && (i2 += " /Open true"), i2 += " >>", g2.content = i2, this.internal.write(p2.objId, "0 R", g2.objId, "0 R");
            break;
          case "freetext":
            n2 = "/Rect [" + a2(r2.bounds.x) + " " + o2(r2.bounds.y) + " " + a2(r2.bounds.x + r2.bounds.w) + " " + o2(r2.bounds.y + r2.bounds.h) + "] ";
            var y2 = r2.color || "#000000";
            i2 = "<</Type /Annot /Subtype /FreeText " + n2 + "/Contents (" + f2(d2(r2.contents)) + ")", i2 += " /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#" + y2 + ")", i2 += " /Border [0 0 0]", i2 += " >>", this.internal.write(i2);
            break;
          case "link":
            if (r2.options.name) {
              var w2 = this.annotations._nameMap[r2.options.name];
              r2.options.pageNumber = w2.page, r2.options.top = w2.y;
            } else r2.options.top || (r2.options.top = 0);
            if (n2 = "/Rect [" + r2.finalBounds.x + " " + r2.finalBounds.y + " " + r2.finalBounds.w + " " + r2.finalBounds.h + "] ", i2 = "", r2.options.url) i2 = "<</Type /Annot /Subtype /Link " + n2 + "/Border [0 0 0] /A <</S /URI /URI (" + f2(d2(r2.options.url)) + ") >>";
            else if (r2.options.pageNumber) {
              switch (i2 = "<</Type /Annot /Subtype /Link " + n2 + "/Border [0 0 0] /Dest [" + this.internal.getPageInfo(r2.options.pageNumber).objId + " 0 R", r2.options.magFactor = r2.options.magFactor || "XYZ", r2.options.magFactor) {
                case "Fit":
                  i2 += " /Fit]";
                  break;
                case "FitH":
                  i2 += " /FitH " + r2.options.top + "]";
                  break;
                case "FitV":
                  r2.options.left = r2.options.left || 0, i2 += " /FitV " + r2.options.left + "]";
                  break;
                case "XYZ":
                default:
                  var N2 = o2(r2.options.top);
                  r2.options.left = r2.options.left || 0, void 0 === r2.options.zoom && (r2.options.zoom = 0), i2 += " /XYZ " + r2.options.left + " " + N2 + " " + r2.options.zoom + "]";
              }
            }
            "" != i2 && (i2 += " >>", this.internal.write(i2));
        }
      }
      this.internal.write("]");
    }
  }]), t.createAnnotation = function(t2) {
    var e2 = this.internal.getCurrentPageInfo();
    switch (t2.type) {
      case "link":
        this.link(t2.bounds.x, t2.bounds.y, t2.bounds.w, t2.bounds.h, t2);
        break;
      case "text":
      case "freetext":
        e2.pageContext.annotations.push(t2);
    }
  }, t.link = function(t2, e2, r2, n2, i2) {
    var a2 = this.internal.getCurrentPageInfo(), o2 = this.internal.getCoordinateString, s2 = this.internal.getVerticalCoordinateString;
    a2.pageContext.annotations.push({
      finalBounds: {
        x: o2(t2),
        y: s2(e2),
        w: o2(t2 + r2),
        h: s2(e2 + n2)
      },
      options: i2,
      type: "link"
    });
  }, t.textWithLink = function(t2, e2, r2, n2) {
    var i2 = this.getTextWidth(t2), a2 = this.internal.getLineHeight() / this.internal.scaleFactor;
    return this.text(t2, e2, r2, n2), r2 += 0.2 * a2, "center" === n2.align && (e2 -= i2 / 2), "right" === n2.align && (e2 -= i2), this.link(e2, r2 - a2, i2, a2, n2), i2;
  }, t.getTextWidth = function(t2) {
    var e2 = this.internal.getFontSize();
    return this.getStringUnitWidth(t2) * e2 / this.internal.scaleFactor;
  };
}(O.API), /**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t) {
  var e = {
    1569: [65152],
    1570: [65153, 65154],
    1571: [65155, 65156],
    1572: [65157, 65158],
    1573: [65159, 65160],
    1574: [65161, 65162, 65163, 65164],
    1575: [65165, 65166],
    1576: [65167, 65168, 65169, 65170],
    1577: [65171, 65172],
    1578: [65173, 65174, 65175, 65176],
    1579: [65177, 65178, 65179, 65180],
    1580: [65181, 65182, 65183, 65184],
    1581: [65185, 65186, 65187, 65188],
    1582: [65189, 65190, 65191, 65192],
    1583: [65193, 65194],
    1584: [65195, 65196],
    1585: [65197, 65198],
    1586: [65199, 65200],
    1587: [65201, 65202, 65203, 65204],
    1588: [65205, 65206, 65207, 65208],
    1589: [65209, 65210, 65211, 65212],
    1590: [65213, 65214, 65215, 65216],
    1591: [65217, 65218, 65219, 65220],
    1592: [65221, 65222, 65223, 65224],
    1593: [65225, 65226, 65227, 65228],
    1594: [65229, 65230, 65231, 65232],
    1601: [65233, 65234, 65235, 65236],
    1602: [65237, 65238, 65239, 65240],
    1603: [65241, 65242, 65243, 65244],
    1604: [65245, 65246, 65247, 65248],
    1605: [65249, 65250, 65251, 65252],
    1606: [65253, 65254, 65255, 65256],
    1607: [65257, 65258, 65259, 65260],
    1608: [65261, 65262],
    1609: [65263, 65264, 64488, 64489],
    1610: [65265, 65266, 65267, 65268],
    1649: [64336, 64337],
    1655: [64477],
    1657: [64358, 64359, 64360, 64361],
    1658: [64350, 64351, 64352, 64353],
    1659: [64338, 64339, 64340, 64341],
    1662: [64342, 64343, 64344, 64345],
    1663: [64354, 64355, 64356, 64357],
    1664: [64346, 64347, 64348, 64349],
    1667: [64374, 64375, 64376, 64377],
    1668: [64370, 64371, 64372, 64373],
    1670: [64378, 64379, 64380, 64381],
    1671: [64382, 64383, 64384, 64385],
    1672: [64392, 64393],
    1676: [64388, 64389],
    1677: [64386, 64387],
    1678: [64390, 64391],
    1681: [64396, 64397],
    1688: [64394, 64395],
    1700: [64362, 64363, 64364, 64365],
    1702: [64366, 64367, 64368, 64369],
    1705: [64398, 64399, 64400, 64401],
    1709: [64467, 64468, 64469, 64470],
    1711: [64402, 64403, 64404, 64405],
    1713: [64410, 64411, 64412, 64413],
    1715: [64406, 64407, 64408, 64409],
    1722: [64414, 64415],
    1723: [64416, 64417, 64418, 64419],
    1726: [64426, 64427, 64428, 64429],
    1728: [64420, 64421],
    1729: [64422, 64423, 64424, 64425],
    1733: [64480, 64481],
    1734: [64473, 64474],
    1735: [64471, 64472],
    1736: [64475, 64476],
    1737: [64482, 64483],
    1739: [64478, 64479],
    1740: [64508, 64509, 64510, 64511],
    1744: [64484, 64485, 64486, 64487],
    1746: [64430, 64431],
    1747: [64432, 64433]
  }, r2 = {
    65247: {
      65154: 65269,
      65156: 65271,
      65160: 65273,
      65166: 65275
    },
    65248: {
      65154: 65270,
      65156: 65272,
      65160: 65274,
      65166: 65276
    },
    65165: {
      65247: {
        65248: {
          65258: 65010
        }
      }
    },
    1617: {
      1612: 64606,
      1613: 64607,
      1614: 64608,
      1615: 64609,
      1616: 64610
    }
  }, n2 = {
    1612: 64606,
    1613: 64607,
    1614: 64608,
    1615: 64609,
    1616: 64610
  }, i2 = [1570, 1571, 1573, 1575];
  t.__arabicParser__ = {};
  var a2 = t.__arabicParser__.isInArabicSubstitutionA = function(t2) {
    return void 0 !== e[t2.charCodeAt(0)];
  }, o2 = t.__arabicParser__.isArabicLetter = function(t2) {
    return "string" == typeof t2 && /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/.test(t2);
  }, s2 = t.__arabicParser__.isArabicEndLetter = function(t2) {
    return o2(t2) && a2(t2) && e[t2.charCodeAt(0)].length <= 2;
  }, u2 = t.__arabicParser__.isArabicAlfLetter = function(t2) {
    return o2(t2) && i2.indexOf(t2.charCodeAt(0)) >= 0;
  };
  t.__arabicParser__.arabicLetterHasIsolatedForm = function(t2) {
    return o2(t2) && a2(t2) && e[t2.charCodeAt(0)].length >= 1;
  };
  var c2 = t.__arabicParser__.arabicLetterHasFinalForm = function(t2) {
    return o2(t2) && a2(t2) && e[t2.charCodeAt(0)].length >= 2;
  };
  t.__arabicParser__.arabicLetterHasInitialForm = function(t2) {
    return o2(t2) && a2(t2) && e[t2.charCodeAt(0)].length >= 3;
  };
  var l2 = t.__arabicParser__.arabicLetterHasMedialForm = function(t2) {
    return o2(t2) && a2(t2) && 4 == e[t2.charCodeAt(0)].length;
  }, h2 = t.__arabicParser__.resolveLigatures = function(t2) {
    var e2 = 0, n3 = r2, i3 = "", a3 = 0;
    for (e2 = 0; e2 < t2.length; e2 += 1) void 0 !== n3[t2.charCodeAt(e2)] ? (a3++, "number" == typeof (n3 = n3[t2.charCodeAt(e2)]) && (i3 += String.fromCharCode(n3), n3 = r2, a3 = 0), e2 === t2.length - 1 && (n3 = r2, i3 += t2.charAt(e2 - (a3 - 1)), e2 -= a3 - 1, a3 = 0)) : (n3 = r2, i3 += t2.charAt(e2 - a3), e2 -= a3, a3 = 0);
    return i3;
  };
  t.__arabicParser__.isArabicDiacritic = function(t2) {
    return void 0 !== t2 && void 0 !== n2[t2.charCodeAt(0)];
  };
  var f2 = t.__arabicParser__.getCorrectForm = function(t2, e2, r3) {
    return o2(t2) ? false === a2(t2) ? -1 : !c2(t2) || !o2(e2) && !o2(r3) || !o2(r3) && s2(e2) || s2(t2) && !o2(e2) || s2(t2) && u2(e2) || s2(t2) && s2(e2) ? 0 : l2(t2) && o2(e2) && !s2(e2) && o2(r3) && c2(r3) ? 3 : s2(t2) || !o2(r3) ? 1 : 2 : -1;
  }, d2 = function(t2) {
    var r3 = 0, n3 = 0, i3 = 0, a3 = "", s3 = "", u3 = "", c3 = (t2 = t2 || "").split("\\s+"), l3 = [];
    for (r3 = 0; r3 < c3.length; r3 += 1) {
      for (l3.push(""), n3 = 0; n3 < c3[r3].length; n3 += 1) a3 = c3[r3][n3], s3 = c3[r3][n3 - 1], u3 = c3[r3][n3 + 1], o2(a3) ? (i3 = f2(a3, s3, u3), l3[r3] += -1 !== i3 ? String.fromCharCode(e[a3.charCodeAt(0)][i3]) : a3) : l3[r3] += a3;
      l3[r3] = h2(l3[r3]);
    }
    return l3.join(" ");
  }, p2 = t.__arabicParser__.processArabic = t.processArabic = function() {
    var t2, e2 = "string" == typeof arguments[0] ? arguments[0] : arguments[0].text, r3 = [];
    if (Array.isArray(e2)) {
      var n3 = 0;
      for (r3 = [], n3 = 0; n3 < e2.length; n3 += 1) Array.isArray(e2[n3]) ? r3.push([d2(e2[n3][0]), e2[n3][1], e2[n3][2]]) : r3.push([d2(e2[n3])]);
      t2 = r3;
    } else t2 = d2(e2);
    return "string" == typeof arguments[0] ? t2 : (arguments[0].text = t2, arguments[0]);
  };
  t.events.push(["preProcessText", p2]);
}(O.API), O.API.autoPrint = function(t) {
  var e;
  switch ((t = t || {}).variant = t.variant || "non-conform", t.variant) {
    case "javascript":
      this.addJS("print({});");
      break;
    case "non-conform":
    default:
      this.internal.events.subscribe("postPutResources", function() {
        e = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/S /Named"), this.internal.out("/Type /Action"), this.internal.out("/N /Print"), this.internal.out(">>"), this.internal.out("endobj");
      }), this.internal.events.subscribe("putCatalog", function() {
        this.internal.out("/OpenAction " + e + " 0 R");
      });
  }
  return this;
}, /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t) {
  var e = function() {
    var t2 = void 0;
    Object.defineProperty(this, "pdf", {
      get: function() {
        return t2;
      },
      set: function(e3) {
        t2 = e3;
      }
    });
    var e2 = 150;
    Object.defineProperty(this, "width", {
      get: function() {
        return e2;
      },
      set: function(t3) {
        e2 = isNaN(t3) || false === Number.isInteger(t3) || t3 < 0 ? 150 : t3, this.getContext("2d").pageWrapXEnabled && (this.getContext("2d").pageWrapX = e2 + 1);
      }
    });
    var r2 = 300;
    Object.defineProperty(this, "height", {
      get: function() {
        return r2;
      },
      set: function(t3) {
        r2 = isNaN(t3) || false === Number.isInteger(t3) || t3 < 0 ? 300 : t3, this.getContext("2d").pageWrapYEnabled && (this.getContext("2d").pageWrapY = r2 + 1);
      }
    });
    var n2 = [];
    Object.defineProperty(this, "childNodes", {
      get: function() {
        return n2;
      },
      set: function(t3) {
        n2 = t3;
      }
    });
    var i2 = {};
    Object.defineProperty(this, "style", {
      get: function() {
        return i2;
      },
      set: function(t3) {
        i2 = t3;
      }
    }), Object.defineProperty(this, "parentNode", {});
  };
  e.prototype.getContext = function(t2, e2) {
    var r2;
    if ("2d" !== (t2 = t2 || "2d")) return null;
    for (r2 in e2) this.pdf.context2d.hasOwnProperty(r2) && (this.pdf.context2d[r2] = e2[r2]);
    return this.pdf.context2d._canvas = this, this.pdf.context2d;
  }, e.prototype.toDataURL = function() {
    throw new Error("toDataURL is not implemented.");
  }, t.events.push(["initialized", function() {
    this.canvas = new e(), this.canvas.pdf = this;
  }]);
}(O.API), /**
 * @license
 * ====================================================================
 * Copyright (c) 2013 Youssef Beddad, youssef.beddad@gmail.com
 *               2013 Eduardo Menezes de Morais, eduardo.morais@usp.br
 *               2013 Lee Driscoll, https://github.com/lsdriscoll
 *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
 *               2014 James Hall, james@parall.ax
 *               2014 Diego Casorran, https://github.com/diegocr
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(t) {
  var e = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }, r2 = false, n2 = function() {
    void 0 === this.internal.__cell__ && (this.internal.__cell__ = {}, this.internal.__cell__.padding = 3, this.internal.__cell__.headerFunction = void 0, this.internal.__cell__.margins = Object.assign({}, e), this.internal.__cell__.margins.width = this.getPageWidth(), i2.call(this));
  }, i2 = function() {
    this.internal.__cell__.lastCell = new a2(), this.internal.__cell__.pages = 1;
  }, a2 = function() {
    var t2 = arguments[0];
    Object.defineProperty(this, "x", {
      enumerable: true,
      get: function() {
        return t2;
      },
      set: function(e3) {
        t2 = e3;
      }
    });
    var e2 = arguments[1];
    Object.defineProperty(this, "y", {
      enumerable: true,
      get: function() {
        return e2;
      },
      set: function(t3) {
        e2 = t3;
      }
    });
    var r3 = arguments[2];
    Object.defineProperty(this, "width", {
      enumerable: true,
      get: function() {
        return r3;
      },
      set: function(t3) {
        r3 = t3;
      }
    });
    var n3 = arguments[3];
    Object.defineProperty(this, "height", {
      enumerable: true,
      get: function() {
        return n3;
      },
      set: function(t3) {
        n3 = t3;
      }
    });
    var i3 = arguments[4];
    Object.defineProperty(this, "text", {
      enumerable: true,
      get: function() {
        return i3;
      },
      set: function(t3) {
        i3 = t3;
      }
    });
    var a3 = arguments[5];
    Object.defineProperty(this, "lineNumber", {
      enumerable: true,
      get: function() {
        return a3;
      },
      set: function(t3) {
        a3 = t3;
      }
    });
    var o3 = arguments[6];
    return Object.defineProperty(this, "align", {
      enumerable: true,
      get: function() {
        return o3;
      },
      set: function(t3) {
        o3 = t3;
      }
    }), this;
  };
  a2.prototype.clone = function() {
    return new a2(this.x, this.y, this.width, this.height, this.text, this.lineNumber, this.align);
  }, a2.prototype.toArray = function() {
    return [this.x, this.y, this.width, this.height, this.text, this.lineNumber, this.align];
  }, t.setHeaderFunction = function(t2) {
    return n2.call(this), this.internal.__cell__.headerFunction = "function" == typeof t2 ? t2 : void 0, this;
  }, t.getTextDimensions = function(t2, e2) {
    n2.call(this);
    var r3 = (e2 = e2 || {}).fontSize || this.getFontSize(), i3 = e2.font || this.getFont(), a3 = e2.scaleFactor || this.internal.scaleFactor, o3 = 0, s3 = 0, u2 = 0, c2 = this;
    if (!Array.isArray(t2) && "string" != typeof t2) {
      if ("number" != typeof t2) throw new Error("getTextDimensions expects text-parameter to be of type String or type Number or an Array of Strings.");
      t2 = String(t2);
    }
    const l2 = e2.maxWidth;
    l2 > 0 ? "string" == typeof t2 ? t2 = this.splitTextToSize(t2, l2) : "[object Array]" === Object.prototype.toString.call(t2) && (t2 = t2.reduce(function(t3, e3) {
      return t3.concat(c2.splitTextToSize(e3, l2));
    }, [])) : t2 = Array.isArray(t2) ? t2 : [t2];
    for (var h2 = 0; h2 < t2.length; h2++) o3 < (u2 = this.getStringUnitWidth(t2[h2], {
      font: i3
    }) * r3) && (o3 = u2);
    return 0 !== o3 && (s3 = t2.length), {
      w: o3 /= a3,
      h: Math.max((s3 * r3 * this.getLineHeightFactor() - r3 * (this.getLineHeightFactor() - 1)) / a3, 0)
    };
  }, t.cellAddPage = function() {
    n2.call(this), this.addPage();
    var t2 = this.internal.__cell__.margins || e;
    return this.internal.__cell__.lastCell = new a2(t2.left, t2.top, void 0, void 0), this.internal.__cell__.pages += 1, this;
  };
  var o2 = t.cell = function() {
    var t2;
    t2 = arguments[0] instanceof a2 ? arguments[0] : new a2(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]), n2.call(this);
    var i3 = this.internal.__cell__.lastCell, o3 = this.internal.__cell__.padding, s3 = this.internal.__cell__.margins || e, u2 = this.internal.__cell__.tableHeaderRow, c2 = this.internal.__cell__.printHeaders;
    return void 0 !== i3.lineNumber && (i3.lineNumber === t2.lineNumber ? (t2.x = (i3.x || 0) + (i3.width || 0), t2.y = i3.y || 0) : i3.y + i3.height + t2.height + s3.bottom > this.getPageHeight() ? (this.cellAddPage(), t2.y = s3.top, c2 && u2 && (this.printHeaderRow(t2.lineNumber, true), t2.y += u2[0].height)) : t2.y = i3.y + i3.height || t2.y), void 0 !== t2.text[0] && (this.rect(t2.x, t2.y, t2.width, t2.height, true === r2 ? "FD" : void 0), "right" === t2.align ? this.text(t2.text, t2.x + t2.width - o3, t2.y + o3, {
      align: "right",
      baseline: "top"
    }) : "center" === t2.align ? this.text(t2.text, t2.x + t2.width / 2, t2.y + o3, {
      align: "center",
      baseline: "top",
      maxWidth: t2.width - o3 - o3
    }) : this.text(t2.text, t2.x + o3, t2.y + o3, {
      align: "left",
      baseline: "top",
      maxWidth: t2.width - o3 - o3
    })), this.internal.__cell__.lastCell = t2, this;
  };
  t.table = function(t2, r3, u2, c2, l2) {
    if (n2.call(this), !u2) throw new Error("No data for PDF table.");
    var h2, f2, d2, p2, g2 = [], m2 = [], v2 = [], b2 = {}, y2 = {}, w2 = [], N2 = [], L2 = (l2 = l2 || {}).autoSize || false, A2 = false !== l2.printHeaders, x2 = l2.css && void 0 !== l2.css["font-size"] ? 16 * l2.css["font-size"] : l2.fontSize || 12, S2 = l2.margins || Object.assign({
      width: this.getPageWidth()
    }, e), _2 = "number" == typeof l2.padding ? l2.padding : 3, P2 = l2.headerBackgroundColor || "#c8c8c8";
    if (i2.call(this), this.internal.__cell__.printHeaders = A2, this.internal.__cell__.margins = S2, this.internal.__cell__.table_font_size = x2, this.internal.__cell__.padding = _2, this.internal.__cell__.headerBackgroundColor = P2, this.setFontSize(x2), null == c2) m2 = g2 = Object.keys(u2[0]), v2 = g2.map(function() {
      return "left";
    });
    else if (Array.isArray(c2) && "object" == typeof c2[0]) for (g2 = c2.map(function(t3) {
      return t3.name;
    }), m2 = c2.map(function(t3) {
      return t3.prompt || t3.name || "";
    }), v2 = c2.map(function(t3) {
      return t3.align || "left";
    }), h2 = 0; h2 < c2.length; h2 += 1) y2[c2[h2].name] = c2[h2].width * (19.049976 / 25.4);
    else Array.isArray(c2) && "string" == typeof c2[0] && (m2 = g2 = c2, v2 = g2.map(function() {
      return "left";
    }));
    if (L2 || Array.isArray(c2) && "string" == typeof c2[0]) for (h2 = 0; h2 < g2.length; h2 += 1) {
      for (b2[p2 = g2[h2]] = u2.map(function(t3) {
        return t3[p2];
      }), this.setFont(void 0, "bold"), w2.push(this.getTextDimensions(m2[h2], {
        fontSize: this.internal.__cell__.table_font_size,
        scaleFactor: this.internal.scaleFactor
      }).w), f2 = b2[p2], this.setFont(void 0, "normal"), d2 = 0; d2 < f2.length; d2 += 1) w2.push(this.getTextDimensions(f2[d2], {
        fontSize: this.internal.__cell__.table_font_size,
        scaleFactor: this.internal.scaleFactor
      }).w);
      y2[p2] = Math.max.apply(null, w2) + _2 + _2, w2 = [];
    }
    if (A2) {
      var k2 = {};
      for (h2 = 0; h2 < g2.length; h2 += 1) k2[g2[h2]] = {}, k2[g2[h2]].text = m2[h2], k2[g2[h2]].align = v2[h2];
      var I2 = s2.call(this, k2, y2);
      N2 = g2.map(function(e2) {
        return new a2(t2, r3, y2[e2], I2, k2[e2].text, void 0, k2[e2].align);
      }), this.setTableHeaderRow(N2), this.printHeaderRow(1, false);
    }
    var F2 = c2.reduce(function(t3, e2) {
      return t3[e2.name] = e2.align, t3;
    }, {});
    for (h2 = 0; h2 < u2.length; h2 += 1) {
      var C2 = s2.call(this, u2[h2], y2);
      for (d2 = 0; d2 < g2.length; d2 += 1) o2.call(this, new a2(t2, r3, y2[g2[d2]], C2, u2[h2][g2[d2]], h2 + 2, F2[g2[d2]]));
    }
    return this.internal.__cell__.table_x = t2, this.internal.__cell__.table_y = r3, this;
  };
  var s2 = function(t2, e2) {
    var r3 = this.internal.__cell__.padding, n3 = this.internal.__cell__.table_font_size, i3 = this.internal.scaleFactor;
    return Object.keys(t2).map(function(n4) {
      var i4 = t2[n4];
      return this.splitTextToSize(i4.hasOwnProperty("text") ? i4.text : i4, e2[n4] - r3 - r3);
    }, this).map(function(t3) {
      return this.getLineHeightFactor() * t3.length * n3 / i3 + r3 + r3;
    }, this).reduce(function(t3, e3) {
      return Math.max(t3, e3);
    }, 0);
  };
  t.setTableHeaderRow = function(t2) {
    n2.call(this), this.internal.__cell__.tableHeaderRow = t2;
  }, t.printHeaderRow = function(t2, e2) {
    if (n2.call(this), !this.internal.__cell__.tableHeaderRow) throw new Error("Property tableHeaderRow does not exist.");
    var i3;
    if (r2 = true, "function" == typeof this.internal.__cell__.headerFunction) {
      var s3 = this.internal.__cell__.headerFunction(this, this.internal.__cell__.pages);
      this.internal.__cell__.lastCell = new a2(s3[0], s3[1], s3[2], s3[3], void 0, -1);
    }
    this.setFont(void 0, "bold");
    for (var u2 = [], c2 = 0; c2 < this.internal.__cell__.tableHeaderRow.length; c2 += 1) i3 = this.internal.__cell__.tableHeaderRow[c2].clone(), e2 && (i3.y = this.internal.__cell__.margins.top || 0, u2.push(i3)), i3.lineNumber = t2, this.setFillColor(this.internal.__cell__.headerBackgroundColor), o2.call(this, i3);
    u2.length > 0 && this.setTableHeaderRow(u2), this.setFont(void 0, "normal"), r2 = false;
  };
}(O.API);
var xt = {
  italic: ["italic", "oblique", "normal"],
  oblique: ["oblique", "italic", "normal"],
  normal: ["normal", "oblique", "italic"]
};
var St = ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded"];
var _t = At(St);
var Pt = [100, 200, 300, 400, 500, 600, 700, 800, 900];
var kt = At(Pt);
function It(t) {
  var e = t.family.replace(/"|'/g, "").toLowerCase(), r2 = function(t2) {
    return xt[t2 = t2 || "normal"] ? t2 : "normal";
  }(t.style), n2 = function(t2) {
    if (!t2) return 400;
    if ("number" == typeof t2) return t2 >= 100 && t2 <= 900 && t2 % 100 == 0 ? t2 : 400;
    if (/^\d00$/.test(t2)) return parseInt(t2);
    switch (t2) {
      case "bold":
        return 700;
      case "normal":
      default:
        return 400;
    }
  }(t.weight), i2 = function(t2) {
    return "number" == typeof _t[t2 = t2 || "normal"] ? t2 : "normal";
  }(t.stretch);
  return {
    family: e,
    style: r2,
    weight: n2,
    stretch: i2,
    src: t.src || [],
    ref: t.ref || {
      name: e,
      style: [i2, r2, n2].join(" ")
    }
  };
}
function Ft(t, e, r2, n2) {
  var i2;
  for (i2 = r2; i2 >= 0 && i2 < e.length; i2 += n2) if (t[e[i2]]) return t[e[i2]];
  for (i2 = r2; i2 >= 0 && i2 < e.length; i2 -= n2) if (t[e[i2]]) return t[e[i2]];
}
var Ct = {
  "sans-serif": "helvetica",
  fixed: "courier",
  monospace: "courier",
  terminal: "courier",
  cursive: "times",
  fantasy: "times",
  serif: "times"
};
var jt = {
  caption: "times",
  icon: "times",
  menu: "times",
  "message-box": "times",
  "small-caption": "times",
  "status-bar": "times"
};
function Ot(t) {
  return [t.stretch, t.style, t.weight, t.family].join(" ");
}
function Bt(t, e, r2) {
  for (var n2 = (r2 = r2 || {}).defaultFontFamily || "times", i2 = Object.assign({}, Ct, r2.genericFontFamilies || {}), a2 = null, o2 = null, s2 = 0; s2 < e.length; ++s2) if (i2[(a2 = It(e[s2])).family] && (a2.family = i2[a2.family]), t.hasOwnProperty(a2.family)) {
    o2 = t[a2.family];
    break;
  }
  if (!(o2 = o2 || t[n2])) throw new Error("Could not find a font-family for the rule '" + Ot(a2) + "' and default family '" + n2 + "'.");
  if (o2 = function(t2, e2) {
    if (e2[t2]) return e2[t2];
    var r3 = _t[t2], n3 = r3 <= _t.normal ? -1 : 1, i3 = Ft(e2, St, r3, n3);
    if (!i3) throw new Error("Could not find a matching font-stretch value for " + t2);
    return i3;
  }(a2.stretch, o2), o2 = function(t2, e2) {
    if (e2[t2]) return e2[t2];
    for (var r3 = xt[t2], n3 = 0; n3 < r3.length; ++n3) if (e2[r3[n3]]) return e2[r3[n3]];
    throw new Error("Could not find a matching font-style for " + t2);
  }(a2.style, o2), !(o2 = function(t2, e2) {
    if (e2[t2]) return e2[t2];
    if (400 === t2 && e2[500]) return e2[500];
    if (500 === t2 && e2[400]) return e2[400];
    var r3 = kt[t2], n3 = Ft(e2, Pt, r3, t2 < 400 ? -1 : 1);
    if (!n3) throw new Error("Could not find a matching font-weight for value " + t2);
    return n3;
  }(a2.weight, o2))) throw new Error("Failed to resolve a font for the rule '" + Ot(a2) + "'.");
  return o2;
}
function Mt(t) {
  return t.trimLeft();
}
function Et(t, e) {
  for (var r2 = 0; r2 < t.length; ) {
    if (t.charAt(r2) === e) return [t.substring(0, r2), t.substring(r2 + 1)];
    r2 += 1;
  }
  return null;
}
function qt(t) {
  var e = t.match(/^(-[a-z_]|[a-z_])[a-z0-9_-]*/i);
  return null === e ? null : [e[0], t.substring(e[0].length)];
}
var Rt;
var Tt;
var Dt;
var Ut = ["times"];
!function(t) {
  var e, r2, n2, a2, o2, s2, u2, c2, l2, f2 = function(t2) {
    return t2 = t2 || {}, this.isStrokeTransparent = t2.isStrokeTransparent || false, this.strokeOpacity = t2.strokeOpacity || 1, this.strokeStyle = t2.strokeStyle || "#000000", this.fillStyle = t2.fillStyle || "#000000", this.isFillTransparent = t2.isFillTransparent || false, this.fillOpacity = t2.fillOpacity || 1, this.font = t2.font || "10px sans-serif", this.textBaseline = t2.textBaseline || "alphabetic", this.textAlign = t2.textAlign || "left", this.lineWidth = t2.lineWidth || 1, this.lineJoin = t2.lineJoin || "miter", this.lineCap = t2.lineCap || "butt", this.path = t2.path || [], this.transform = void 0 !== t2.transform ? t2.transform.clone() : new c2(), this.globalCompositeOperation = t2.globalCompositeOperation || "normal", this.globalAlpha = t2.globalAlpha || 1, this.clip_path = t2.clip_path || [], this.currentPoint = t2.currentPoint || new s2(), this.miterLimit = t2.miterLimit || 10, this.lastPoint = t2.lastPoint || new s2(), this.ignoreClearRect = "boolean" != typeof t2.ignoreClearRect || t2.ignoreClearRect, this;
  };
  t.events.push(["initialized", function() {
    this.context2d = new d2(this), e = this.internal.f2, r2 = this.internal.getCoordinateString, n2 = this.internal.getVerticalCoordinateString, a2 = this.internal.getHorizontalCoordinate, o2 = this.internal.getVerticalCoordinate, s2 = this.internal.Point, u2 = this.internal.Rectangle, c2 = this.internal.Matrix, l2 = new f2();
  }]);
  var d2 = function(t2) {
    Object.defineProperty(this, "canvas", {
      get: function() {
        return {
          parentNode: false,
          style: false
        };
      }
    });
    var e2 = t2;
    Object.defineProperty(this, "pdf", {
      get: function() {
        return e2;
      }
    });
    var r3 = false;
    Object.defineProperty(this, "pageWrapXEnabled", {
      get: function() {
        return r3;
      },
      set: function(t3) {
        r3 = Boolean(t3);
      }
    });
    var n3 = false;
    Object.defineProperty(this, "pageWrapYEnabled", {
      get: function() {
        return n3;
      },
      set: function(t3) {
        n3 = Boolean(t3);
      }
    });
    var i2 = 0;
    Object.defineProperty(this, "posX", {
      get: function() {
        return i2;
      },
      set: function(t3) {
        isNaN(t3) || (i2 = t3);
      }
    });
    var a3 = 0;
    Object.defineProperty(this, "posY", {
      get: function() {
        return a3;
      },
      set: function(t3) {
        isNaN(t3) || (a3 = t3);
      }
    });
    var o3 = false;
    Object.defineProperty(this, "autoPaging", {
      get: function() {
        return o3;
      },
      set: function(t3) {
        o3 = Boolean(t3);
      }
    });
    var s3 = 0;
    Object.defineProperty(this, "lastBreak", {
      get: function() {
        return s3;
      },
      set: function(t3) {
        s3 = t3;
      }
    });
    var u3 = [];
    Object.defineProperty(this, "pageBreaks", {
      get: function() {
        return u3;
      },
      set: function(t3) {
        u3 = t3;
      }
    }), Object.defineProperty(this, "ctx", {
      get: function() {
        return l2;
      },
      set: function(t3) {
        t3 instanceof f2 && (l2 = t3);
      }
    }), Object.defineProperty(this, "path", {
      get: function() {
        return l2.path;
      },
      set: function(t3) {
        l2.path = t3;
      }
    });
    var c3 = [];
    Object.defineProperty(this, "ctxStack", {
      get: function() {
        return c3;
      },
      set: function(t3) {
        c3 = t3;
      }
    }), Object.defineProperty(this, "fillStyle", {
      get: function() {
        return this.ctx.fillStyle;
      },
      set: function(t3) {
        var e3;
        e3 = p2(t3), this.ctx.fillStyle = e3.style, this.ctx.isFillTransparent = 0 === e3.a, this.ctx.fillOpacity = e3.a, this.pdf.setFillColor(e3.r, e3.g, e3.b, {
          a: e3.a
        }), this.pdf.setTextColor(e3.r, e3.g, e3.b, {
          a: e3.a
        });
      }
    }), Object.defineProperty(this, "strokeStyle", {
      get: function() {
        return this.ctx.strokeStyle;
      },
      set: function(t3) {
        var e3 = p2(t3);
        this.ctx.strokeStyle = e3.style, this.ctx.isStrokeTransparent = 0 === e3.a, this.ctx.strokeOpacity = e3.a, 0 === e3.a ? this.pdf.setDrawColor(255, 255, 255) : (e3.a, this.pdf.setDrawColor(e3.r, e3.g, e3.b));
      }
    }), Object.defineProperty(this, "lineCap", {
      get: function() {
        return this.ctx.lineCap;
      },
      set: function(t3) {
        -1 !== ["butt", "round", "square"].indexOf(t3) && (this.ctx.lineCap = t3, this.pdf.setLineCap(t3));
      }
    }), Object.defineProperty(this, "lineWidth", {
      get: function() {
        return this.ctx.lineWidth;
      },
      set: function(t3) {
        isNaN(t3) || (this.ctx.lineWidth = t3, this.pdf.setLineWidth(t3));
      }
    }), Object.defineProperty(this, "lineJoin", {
      get: function() {
        return this.ctx.lineJoin;
      },
      set: function(t3) {
        -1 !== ["bevel", "round", "miter"].indexOf(t3) && (this.ctx.lineJoin = t3, this.pdf.setLineJoin(t3));
      }
    }), Object.defineProperty(this, "miterLimit", {
      get: function() {
        return this.ctx.miterLimit;
      },
      set: function(t3) {
        isNaN(t3) || (this.ctx.miterLimit = t3, this.pdf.setMiterLimit(t3));
      }
    }), Object.defineProperty(this, "textBaseline", {
      get: function() {
        return this.ctx.textBaseline;
      },
      set: function(t3) {
        this.ctx.textBaseline = t3;
      }
    }), Object.defineProperty(this, "textAlign", {
      get: function() {
        return this.ctx.textAlign;
      },
      set: function(t3) {
        -1 !== ["right", "end", "center", "left", "start"].indexOf(t3) && (this.ctx.textAlign = t3);
      }
    });
    var h2 = null;
    function d3(t3, e3) {
      if (null === h2) {
        var r4 = function(t4) {
          var e4 = [];
          return Object.keys(t4).forEach(function(r5) {
            t4[r5].forEach(function(t5) {
              var n4 = null;
              switch (t5) {
                case "bold":
                  n4 = {
                    family: r5,
                    weight: "bold"
                  };
                  break;
                case "italic":
                  n4 = {
                    family: r5,
                    style: "italic"
                  };
                  break;
                case "bolditalic":
                  n4 = {
                    family: r5,
                    weight: "bold",
                    style: "italic"
                  };
                  break;
                case "":
                case "normal":
                  n4 = {
                    family: r5
                  };
              }
              null !== n4 && (n4.ref = {
                name: r5,
                style: t5
              }, e4.push(n4));
            });
          }), e4;
        }(t3.getFontList());
        h2 = function(t4) {
          for (var e4 = {}, r5 = 0; r5 < t4.length; ++r5) {
            var n4 = It(t4[r5]), i3 = n4.family, a4 = n4.stretch, o4 = n4.style, s4 = n4.weight;
            e4[i3] = e4[i3] || {}, e4[i3][a4] = e4[i3][a4] || {}, e4[i3][a4][o4] = e4[i3][a4][o4] || {}, e4[i3][a4][o4][s4] = n4;
          }
          return e4;
        }(r4.concat(e3));
      }
      return h2;
    }
    var g3 = null;
    Object.defineProperty(this, "fontFaces", {
      get: function() {
        return g3;
      },
      set: function(t3) {
        h2 = null, g3 = t3;
      }
    }), Object.defineProperty(this, "font", {
      get: function() {
        return this.ctx.font;
      },
      set: function(t3) {
        var e3;
        if (this.ctx.font = t3, null !== (e3 = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-_,\"\'\sa-z]+?)\s*$/i.exec(t3))) {
          var r4 = e3[1], n4 = (e3[2], e3[3]), i3 = e3[4], a4 = (e3[5], e3[6]), o4 = /^([.\d]+)((?:%|in|[cem]m|ex|p[ctx]))$/i.exec(i3)[2];
          i3 = "px" === o4 ? Math.floor(parseFloat(i3) * this.pdf.internal.scaleFactor) : "em" === o4 ? Math.floor(parseFloat(i3) * this.pdf.getFontSize()) : Math.floor(parseFloat(i3) * this.pdf.internal.scaleFactor), this.pdf.setFontSize(i3);
          var s4 = function(t4) {
            var e4, r5, n5 = [], i4 = t4.trim();
            if ("" === i4) return Ut;
            if (i4 in jt) return [jt[i4]];
            for (; "" !== i4; ) {
              switch (r5 = null, e4 = (i4 = Mt(i4)).charAt(0)) {
                case '"':
                case "'":
                  r5 = Et(i4.substring(1), e4);
                  break;
                default:
                  r5 = qt(i4);
              }
              if (null === r5) return Ut;
              if (n5.push(r5[0]), "" !== (i4 = Mt(r5[1])) && "," !== i4.charAt(0)) return Ut;
              i4 = i4.replace(/^,/, "");
            }
            return n5;
          }(a4);
          if (this.fontFaces) {
            var u4 = Bt(d3(this.pdf, this.fontFaces), s4.map(function(t4) {
              return {
                family: t4,
                stretch: "normal",
                weight: n4,
                style: r4
              };
            }));
            this.pdf.setFont(u4.ref.name, u4.ref.style);
          } else {
            var c4 = "";
            ("bold" === n4 || parseInt(n4, 10) >= 700 || "bold" === r4) && (c4 = "bold"), "italic" === r4 && (c4 += "italic"), 0 === c4.length && (c4 = "normal");
            for (var l3 = "", h3 = {
              arial: "Helvetica",
              Arial: "Helvetica",
              verdana: "Helvetica",
              Verdana: "Helvetica",
              helvetica: "Helvetica",
              Helvetica: "Helvetica",
              "sans-serif": "Helvetica",
              fixed: "Courier",
              monospace: "Courier",
              terminal: "Courier",
              cursive: "Times",
              fantasy: "Times",
              serif: "Times"
            }, f3 = 0; f3 < s4.length; f3++) {
              if (void 0 !== this.pdf.internal.getFont(s4[f3], c4, {
                noFallback: true,
                disableWarning: true
              })) {
                l3 = s4[f3];
                break;
              }
              if ("bolditalic" === c4 && void 0 !== this.pdf.internal.getFont(s4[f3], "bold", {
                noFallback: true,
                disableWarning: true
              })) l3 = s4[f3], c4 = "bold";
              else if (void 0 !== this.pdf.internal.getFont(s4[f3], "normal", {
                noFallback: true,
                disableWarning: true
              })) {
                l3 = s4[f3], c4 = "normal";
                break;
              }
            }
            if ("" === l3) {
              for (var p3 = 0; p3 < s4.length; p3++) if (h3[s4[p3]]) {
                l3 = h3[s4[p3]];
                break;
              }
            }
            l3 = "" === l3 ? "Times" : l3, this.pdf.setFont(l3, c4);
          }
        }
      }
    }), Object.defineProperty(this, "globalCompositeOperation", {
      get: function() {
        return this.ctx.globalCompositeOperation;
      },
      set: function(t3) {
        this.ctx.globalCompositeOperation = t3;
      }
    }), Object.defineProperty(this, "globalAlpha", {
      get: function() {
        return this.ctx.globalAlpha;
      },
      set: function(t3) {
        this.ctx.globalAlpha = t3;
      }
    }), Object.defineProperty(this, "ignoreClearRect", {
      get: function() {
        return this.ctx.ignoreClearRect;
      },
      set: function(t3) {
        this.ctx.ignoreClearRect = Boolean(t3);
      }
    });
  };
  d2.prototype.fill = function() {
    N2.call(this, "fill", false);
  }, d2.prototype.stroke = function() {
    N2.call(this, "stroke", false);
  }, d2.prototype.beginPath = function() {
    this.path = [{
      type: "begin"
    }];
  }, d2.prototype.moveTo = function(t2, e2) {
    if (isNaN(t2) || isNaN(e2)) throw i.error("jsPDF.context2d.moveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.moveTo");
    var r3 = this.ctx.transform.applyToPoint(new s2(t2, e2));
    this.path.push({
      type: "mt",
      x: r3.x,
      y: r3.y
    }), this.ctx.lastPoint = new s2(t2, e2);
  }, d2.prototype.closePath = function() {
    var t2 = new s2(0, 0), e2 = 0;
    for (e2 = this.path.length - 1; -1 !== e2; e2--) if ("begin" === this.path[e2].type && "object" == typeof this.path[e2 + 1] && "number" == typeof this.path[e2 + 1].x) {
      t2 = new s2(this.path[e2 + 1].x, this.path[e2 + 1].y), this.path.push({
        type: "lt",
        x: t2.x,
        y: t2.y
      });
      break;
    }
    "object" == typeof this.path[e2 + 2] && "number" == typeof this.path[e2 + 2].x && this.path.push(JSON.parse(JSON.stringify(this.path[e2 + 2]))), this.path.push({
      type: "close"
    }), this.ctx.lastPoint = new s2(t2.x, t2.y);
  }, d2.prototype.lineTo = function(t2, e2) {
    if (isNaN(t2) || isNaN(e2)) throw i.error("jsPDF.context2d.lineTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.lineTo");
    var r3 = this.ctx.transform.applyToPoint(new s2(t2, e2));
    this.path.push({
      type: "lt",
      x: r3.x,
      y: r3.y
    }), this.ctx.lastPoint = new s2(r3.x, r3.y);
  }, d2.prototype.clip = function() {
    this.ctx.clip_path = JSON.parse(JSON.stringify(this.path)), N2.call(this, null, true);
  }, d2.prototype.quadraticCurveTo = function(t2, e2, r3, n3) {
    if (isNaN(r3) || isNaN(n3) || isNaN(t2) || isNaN(e2)) throw i.error("jsPDF.context2d.quadraticCurveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.quadraticCurveTo");
    var a3 = this.ctx.transform.applyToPoint(new s2(r3, n3)), o3 = this.ctx.transform.applyToPoint(new s2(t2, e2));
    this.path.push({
      type: "qct",
      x1: o3.x,
      y1: o3.y,
      x: a3.x,
      y: a3.y
    }), this.ctx.lastPoint = new s2(a3.x, a3.y);
  }, d2.prototype.bezierCurveTo = function(t2, e2, r3, n3, a3, o3) {
    if (isNaN(a3) || isNaN(o3) || isNaN(t2) || isNaN(e2) || isNaN(r3) || isNaN(n3)) throw i.error("jsPDF.context2d.bezierCurveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.bezierCurveTo");
    var u3 = this.ctx.transform.applyToPoint(new s2(a3, o3)), c3 = this.ctx.transform.applyToPoint(new s2(t2, e2)), l3 = this.ctx.transform.applyToPoint(new s2(r3, n3));
    this.path.push({
      type: "bct",
      x1: c3.x,
      y1: c3.y,
      x2: l3.x,
      y2: l3.y,
      x: u3.x,
      y: u3.y
    }), this.ctx.lastPoint = new s2(u3.x, u3.y);
  }, d2.prototype.arc = function(t2, e2, r3, n3, a3, o3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r3) || isNaN(n3) || isNaN(a3)) throw i.error("jsPDF.context2d.arc: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.arc");
    if (o3 = Boolean(o3), !this.ctx.transform.isIdentity) {
      var u3 = this.ctx.transform.applyToPoint(new s2(t2, e2));
      t2 = u3.x, e2 = u3.y;
      var c3 = this.ctx.transform.applyToPoint(new s2(0, r3)), l3 = this.ctx.transform.applyToPoint(new s2(0, 0));
      r3 = Math.sqrt(Math.pow(c3.x - l3.x, 2) + Math.pow(c3.y - l3.y, 2));
    }
    Math.abs(a3 - n3) >= 2 * Math.PI && (n3 = 0, a3 = 2 * Math.PI), this.path.push({
      type: "arc",
      x: t2,
      y: e2,
      radius: r3,
      startAngle: n3,
      endAngle: a3,
      counterclockwise: o3
    });
  }, d2.prototype.arcTo = function(t2, e2, r3, n3, i2) {
    throw new Error("arcTo not implemented.");
  }, d2.prototype.rect = function(t2, e2, r3, n3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r3) || isNaN(n3)) throw i.error("jsPDF.context2d.rect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.rect");
    this.moveTo(t2, e2), this.lineTo(t2 + r3, e2), this.lineTo(t2 + r3, e2 + n3), this.lineTo(t2, e2 + n3), this.lineTo(t2, e2), this.lineTo(t2 + r3, e2), this.lineTo(t2, e2);
  }, d2.prototype.fillRect = function(t2, e2, r3, n3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r3) || isNaN(n3)) throw i.error("jsPDF.context2d.fillRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.fillRect");
    if (!g2.call(this)) {
      var a3 = {};
      "butt" !== this.lineCap && (a3.lineCap = this.lineCap, this.lineCap = "butt"), "miter" !== this.lineJoin && (a3.lineJoin = this.lineJoin, this.lineJoin = "miter"), this.beginPath(), this.rect(t2, e2, r3, n3), this.fill(), a3.hasOwnProperty("lineCap") && (this.lineCap = a3.lineCap), a3.hasOwnProperty("lineJoin") && (this.lineJoin = a3.lineJoin);
    }
  }, d2.prototype.strokeRect = function(t2, e2, r3, n3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r3) || isNaN(n3)) throw i.error("jsPDF.context2d.strokeRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.strokeRect");
    m2.call(this) || (this.beginPath(), this.rect(t2, e2, r3, n3), this.stroke());
  }, d2.prototype.clearRect = function(t2, e2, r3, n3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r3) || isNaN(n3)) throw i.error("jsPDF.context2d.clearRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.clearRect");
    this.ignoreClearRect || (this.fillStyle = "#ffffff", this.fillRect(t2, e2, r3, n3));
  }, d2.prototype.save = function(t2) {
    t2 = "boolean" != typeof t2 || t2;
    for (var e2 = this.pdf.internal.getCurrentPageInfo().pageNumber, r3 = 0; r3 < this.pdf.internal.getNumberOfPages(); r3++) this.pdf.setPage(r3 + 1), this.pdf.internal.out("q");
    if (this.pdf.setPage(e2), t2) {
      this.ctx.fontSize = this.pdf.internal.getFontSize();
      var n3 = new f2(this.ctx);
      this.ctxStack.push(this.ctx), this.ctx = n3;
    }
  }, d2.prototype.restore = function(t2) {
    t2 = "boolean" != typeof t2 || t2;
    for (var e2 = this.pdf.internal.getCurrentPageInfo().pageNumber, r3 = 0; r3 < this.pdf.internal.getNumberOfPages(); r3++) this.pdf.setPage(r3 + 1), this.pdf.internal.out("Q");
    this.pdf.setPage(e2), t2 && 0 !== this.ctxStack.length && (this.ctx = this.ctxStack.pop(), this.fillStyle = this.ctx.fillStyle, this.strokeStyle = this.ctx.strokeStyle, this.font = this.ctx.font, this.lineCap = this.ctx.lineCap, this.lineWidth = this.ctx.lineWidth, this.lineJoin = this.ctx.lineJoin);
  }, d2.prototype.toDataURL = function() {
    throw new Error("toDataUrl not implemented.");
  };
  var p2 = function(t2) {
    var e2, r3, n3, i2;
    if (true === t2.isCanvasGradient && (t2 = t2.getColor()), !t2) return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      style: t2
    };
    if (/transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/.test(t2)) e2 = 0, r3 = 0, n3 = 0, i2 = 0;
    else {
      var a3 = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(t2);
      if (null !== a3) e2 = parseInt(a3[1]), r3 = parseInt(a3[2]), n3 = parseInt(a3[3]), i2 = 1;
      else if (null !== (a3 = /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/.exec(t2))) e2 = parseInt(a3[1]), r3 = parseInt(a3[2]), n3 = parseInt(a3[3]), i2 = parseFloat(a3[4]);
      else {
        if (i2 = 1, "string" == typeof t2 && "#" !== t2.charAt(0)) {
          var o3 = new h(t2);
          t2 = o3.ok ? o3.toHex() : "#000000";
        }
        4 === t2.length ? (e2 = t2.substring(1, 2), e2 += e2, r3 = t2.substring(2, 3), r3 += r3, n3 = t2.substring(3, 4), n3 += n3) : (e2 = t2.substring(1, 3), r3 = t2.substring(3, 5), n3 = t2.substring(5, 7)), e2 = parseInt(e2, 16), r3 = parseInt(r3, 16), n3 = parseInt(n3, 16);
      }
    }
    return {
      r: e2,
      g: r3,
      b: n3,
      a: i2,
      style: t2
    };
  }, g2 = function() {
    return this.ctx.isFillTransparent || 0 == this.globalAlpha;
  }, m2 = function() {
    return Boolean(this.ctx.isStrokeTransparent || 0 == this.globalAlpha);
  };
  d2.prototype.fillText = function(t2, e2, r3, n3) {
    if (isNaN(e2) || isNaN(r3) || "string" != typeof t2) throw i.error("jsPDF.context2d.fillText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.fillText");
    if (n3 = isNaN(n3) ? void 0 : n3, !g2.call(this)) {
      r3 = A2.call(this, r3);
      var a3 = B2(this.ctx.transform.rotation), o3 = this.ctx.transform.scaleX;
      k2.call(this, {
        text: t2,
        x: e2,
        y: r3,
        scale: o3,
        angle: a3,
        align: this.textAlign,
        maxWidth: n3
      });
    }
  }, d2.prototype.strokeText = function(t2, e2, r3, n3) {
    if (isNaN(e2) || isNaN(r3) || "string" != typeof t2) throw i.error("jsPDF.context2d.strokeText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.strokeText");
    if (!m2.call(this)) {
      n3 = isNaN(n3) ? void 0 : n3, r3 = A2.call(this, r3);
      var a3 = B2(this.ctx.transform.rotation), o3 = this.ctx.transform.scaleX;
      k2.call(this, {
        text: t2,
        x: e2,
        y: r3,
        scale: o3,
        renderingMode: "stroke",
        angle: a3,
        align: this.textAlign,
        maxWidth: n3
      });
    }
  }, d2.prototype.measureText = function(t2) {
    if ("string" != typeof t2) throw i.error("jsPDF.context2d.measureText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.measureText");
    var e2 = this.pdf, r3 = this.pdf.internal.scaleFactor, n3 = e2.internal.getFontSize(), a3 = e2.getStringUnitWidth(t2) * n3 / e2.internal.scaleFactor, o3 = function(t3) {
      var e3 = (t3 = t3 || {}).width || 0;
      return Object.defineProperty(this, "width", {
        get: function() {
          return e3;
        }
      }), this;
    };
    return new o3({
      width: a3 *= Math.round(96 * r3 / 72 * 1e4) / 1e4
    });
  }, d2.prototype.scale = function(t2, e2) {
    if (isNaN(t2) || isNaN(e2)) throw i.error("jsPDF.context2d.scale: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.scale");
    var r3 = new c2(t2, 0, 0, e2, 0, 0);
    this.ctx.transform = this.ctx.transform.multiply(r3);
  }, d2.prototype.rotate = function(t2) {
    if (isNaN(t2)) throw i.error("jsPDF.context2d.rotate: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.rotate");
    var e2 = new c2(Math.cos(t2), Math.sin(t2), -Math.sin(t2), Math.cos(t2), 0, 0);
    this.ctx.transform = this.ctx.transform.multiply(e2);
  }, d2.prototype.translate = function(t2, e2) {
    if (isNaN(t2) || isNaN(e2)) throw i.error("jsPDF.context2d.translate: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.translate");
    var r3 = new c2(1, 0, 0, 1, t2, e2);
    this.ctx.transform = this.ctx.transform.multiply(r3);
  }, d2.prototype.transform = function(t2, e2, r3, n3, a3, o3) {
    if (isNaN(t2) || isNaN(e2) || isNaN(r3) || isNaN(n3) || isNaN(a3) || isNaN(o3)) throw i.error("jsPDF.context2d.transform: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.transform");
    var s3 = new c2(t2, e2, r3, n3, a3, o3);
    this.ctx.transform = this.ctx.transform.multiply(s3);
  }, d2.prototype.setTransform = function(t2, e2, r3, n3, i2, a3) {
    t2 = isNaN(t2) ? 1 : t2, e2 = isNaN(e2) ? 0 : e2, r3 = isNaN(r3) ? 0 : r3, n3 = isNaN(n3) ? 1 : n3, i2 = isNaN(i2) ? 0 : i2, a3 = isNaN(a3) ? 0 : a3, this.ctx.transform = new c2(t2, e2, r3, n3, i2, a3);
  }, d2.prototype.drawImage = function(t2, e2, r3, n3, i2, a3, o3, s3, l3) {
    var h2 = this.pdf.getImageProperties(t2), f3 = 1, d3 = 1, p3 = 1, g3 = 1;
    void 0 !== n3 && void 0 !== s3 && (p3 = s3 / n3, g3 = l3 / i2, f3 = h2.width / n3 * s3 / n3, d3 = h2.height / i2 * l3 / i2), void 0 === a3 && (a3 = e2, o3 = r3, e2 = 0, r3 = 0), void 0 !== n3 && void 0 === s3 && (s3 = n3, l3 = i2), void 0 === n3 && void 0 === s3 && (s3 = h2.width, l3 = h2.height);
    for (var m3, b3 = this.ctx.transform.decompose(), N3 = B2(b3.rotate.shx), A3 = new c2(), x3 = (A3 = (A3 = (A3 = A3.multiply(b3.translate)).multiply(b3.skew)).multiply(b3.scale)).applyToRectangle(new u2(a3 - e2 * p3, o3 - r3 * g3, n3 * f3, i2 * d3)), S3 = v2.call(this, x3), _3 = [], P3 = 0; P3 < S3.length; P3 += 1) -1 === _3.indexOf(S3[P3]) && _3.push(S3[P3]);
    if (w2(_3), this.autoPaging) for (var k3 = _3[0], I3 = _3[_3.length - 1], F3 = k3; F3 < I3 + 1; F3++) {
      if (this.pdf.setPage(F3), 0 !== this.ctx.clip_path.length) {
        var C3 = this.path;
        m3 = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = y2(m3, this.posX, -1 * this.pdf.internal.pageSize.height * (F3 - 1) + this.posY), L2.call(this, "fill", true), this.path = C3;
      }
      var j3 = JSON.parse(JSON.stringify(x3));
      j3 = y2([j3], this.posX, -1 * this.pdf.internal.pageSize.height * (F3 - 1) + this.posY)[0], this.pdf.addImage(t2, "JPEG", j3.x, j3.y, j3.w, j3.h, null, null, N3);
    }
    else this.pdf.addImage(t2, "JPEG", x3.x, x3.y, x3.w, x3.h, null, null, N3);
  };
  var v2 = function(t2, e2, r3) {
    var n3 = [];
    switch (e2 = e2 || this.pdf.internal.pageSize.width, r3 = r3 || this.pdf.internal.pageSize.height, t2.type) {
      default:
      case "mt":
      case "lt":
        n3.push(Math.floor((t2.y + this.posY) / r3) + 1);
        break;
      case "arc":
        n3.push(Math.floor((t2.y + this.posY - t2.radius) / r3) + 1), n3.push(Math.floor((t2.y + this.posY + t2.radius) / r3) + 1);
        break;
      case "qct":
        var i2 = M2(this.ctx.lastPoint.x, this.ctx.lastPoint.y, t2.x1, t2.y1, t2.x, t2.y);
        n3.push(Math.floor(i2.y / r3) + 1), n3.push(Math.floor((i2.y + i2.h) / r3) + 1);
        break;
      case "bct":
        var a3 = E2(this.ctx.lastPoint.x, this.ctx.lastPoint.y, t2.x1, t2.y1, t2.x2, t2.y2, t2.x, t2.y);
        n3.push(Math.floor(a3.y / r3) + 1), n3.push(Math.floor((a3.y + a3.h) / r3) + 1);
        break;
      case "rect":
        n3.push(Math.floor((t2.y + this.posY) / r3) + 1), n3.push(Math.floor((t2.y + t2.h + this.posY) / r3) + 1);
    }
    for (var o3 = 0; o3 < n3.length; o3 += 1) for (; this.pdf.internal.getNumberOfPages() < n3[o3]; ) b2.call(this);
    return n3;
  }, b2 = function() {
    var t2 = this.fillStyle, e2 = this.strokeStyle, r3 = this.font, n3 = this.lineCap, i2 = this.lineWidth, a3 = this.lineJoin;
    this.pdf.addPage(), this.fillStyle = t2, this.strokeStyle = e2, this.font = r3, this.lineCap = n3, this.lineWidth = i2, this.lineJoin = a3;
  }, y2 = function(t2, e2, r3) {
    for (var n3 = 0; n3 < t2.length; n3++) switch (t2[n3].type) {
      case "bct":
        t2[n3].x2 += e2, t2[n3].y2 += r3;
      case "qct":
        t2[n3].x1 += e2, t2[n3].y1 += r3;
      case "mt":
      case "lt":
      case "arc":
      default:
        t2[n3].x += e2, t2[n3].y += r3;
    }
    return t2;
  }, w2 = function(t2) {
    return t2.sort(function(t3, e2) {
      return t3 - e2;
    });
  }, N2 = function(t2, e2) {
    for (var r3, n3, i2 = this.fillStyle, a3 = this.strokeStyle, o3 = this.lineCap, s3 = this.lineWidth, u3 = s3 * this.ctx.transform.scaleX, c3 = this.lineJoin, l3 = JSON.parse(JSON.stringify(this.path)), h2 = JSON.parse(JSON.stringify(this.path)), f3 = [], d3 = 0; d3 < h2.length; d3++) if (void 0 !== h2[d3].x) for (var p3 = v2.call(this, h2[d3]), g3 = 0; g3 < p3.length; g3 += 1) -1 === f3.indexOf(p3[g3]) && f3.push(p3[g3]);
    for (var m3 = 0; m3 < f3.length; m3++) for (; this.pdf.internal.getNumberOfPages() < f3[m3]; ) b2.call(this);
    if (w2(f3), this.autoPaging) for (var N3 = f3[0], A3 = f3[f3.length - 1], x3 = N3; x3 < A3 + 1; x3++) {
      if (this.pdf.setPage(x3), this.fillStyle = i2, this.strokeStyle = a3, this.lineCap = o3, this.lineWidth = u3, this.lineJoin = c3, 0 !== this.ctx.clip_path.length) {
        var S3 = this.path;
        r3 = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = y2(r3, this.posX, -1 * this.pdf.internal.pageSize.height * (x3 - 1) + this.posY), L2.call(this, t2, true), this.path = S3;
      }
      n3 = JSON.parse(JSON.stringify(l3)), this.path = y2(n3, this.posX, -1 * this.pdf.internal.pageSize.height * (x3 - 1) + this.posY), false !== e2 && 0 !== x3 || L2.call(this, t2, e2), this.lineWidth = s3;
    }
    else this.lineWidth = u3, L2.call(this, t2, e2), this.lineWidth = s3;
    this.path = l3;
  }, L2 = function(t2, e2) {
    if (("stroke" !== t2 || e2 || !m2.call(this)) && ("stroke" === t2 || e2 || !g2.call(this))) {
      for (var r3, n3, i2 = [], a3 = this.path, o3 = 0; o3 < a3.length; o3++) {
        var s3 = a3[o3];
        switch (s3.type) {
          case "begin":
            i2.push({
              begin: true
            });
            break;
          case "close":
            i2.push({
              close: true
            });
            break;
          case "mt":
            i2.push({
              start: s3,
              deltas: [],
              abs: []
            });
            break;
          case "lt":
            var u3 = i2.length;
            if (!isNaN(a3[o3 - 1].x) && (r3 = [s3.x - a3[o3 - 1].x, s3.y - a3[o3 - 1].y], u3 > 0)) {
              for (; u3 >= 0; u3--) if (true !== i2[u3 - 1].close && true !== i2[u3 - 1].begin) {
                i2[u3 - 1].deltas.push(r3), i2[u3 - 1].abs.push(s3);
                break;
              }
            }
            break;
          case "bct":
            r3 = [s3.x1 - a3[o3 - 1].x, s3.y1 - a3[o3 - 1].y, s3.x2 - a3[o3 - 1].x, s3.y2 - a3[o3 - 1].y, s3.x - a3[o3 - 1].x, s3.y - a3[o3 - 1].y], i2[i2.length - 1].deltas.push(r3);
            break;
          case "qct":
            var c3 = a3[o3 - 1].x + 2 / 3 * (s3.x1 - a3[o3 - 1].x), l3 = a3[o3 - 1].y + 2 / 3 * (s3.y1 - a3[o3 - 1].y), h2 = s3.x + 2 / 3 * (s3.x1 - s3.x), f3 = s3.y + 2 / 3 * (s3.y1 - s3.y), d3 = s3.x, p3 = s3.y;
            r3 = [c3 - a3[o3 - 1].x, l3 - a3[o3 - 1].y, h2 - a3[o3 - 1].x, f3 - a3[o3 - 1].y, d3 - a3[o3 - 1].x, p3 - a3[o3 - 1].y], i2[i2.length - 1].deltas.push(r3);
            break;
          case "arc":
            i2.push({
              deltas: [],
              abs: [],
              arc: true
            }), Array.isArray(i2[i2.length - 1].abs) && i2[i2.length - 1].abs.push(s3);
        }
      }
      n3 = e2 ? null : "stroke" === t2 ? "stroke" : "fill";
      for (var v3 = 0; v3 < i2.length; v3++) {
        if (i2[v3].arc) {
          for (var b3 = i2[v3].abs, y3 = 0; y3 < b3.length; y3++) {
            var w3 = b3[y3];
            "arc" === w3.type ? x2.call(this, w3.x, w3.y, w3.radius, w3.startAngle, w3.endAngle, w3.counterclockwise, void 0, e2) : I2.call(this, w3.x, w3.y);
          }
          S2.call(this, n3), this.pdf.internal.out("h");
        }
        if (!i2[v3].arc && true !== i2[v3].close && true !== i2[v3].begin) {
          var N3 = i2[v3].start.x, L3 = i2[v3].start.y;
          F2.call(this, i2[v3].deltas, N3, L3);
        }
      }
      n3 && S2.call(this, n3), e2 && _2.call(this);
    }
  }, A2 = function(t2) {
    var e2 = this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor, r3 = e2 * (this.pdf.internal.getLineHeightFactor() - 1);
    switch (this.ctx.textBaseline) {
      case "bottom":
        return t2 - r3;
      case "top":
        return t2 + e2 - r3;
      case "hanging":
        return t2 + e2 - 2 * r3;
      case "middle":
        return t2 + e2 / 2 - r3;
      case "ideographic":
        return t2;
      case "alphabetic":
      default:
        return t2;
    }
  };
  d2.prototype.createLinearGradient = function() {
    var t2 = function() {
    };
    return t2.colorStops = [], t2.addColorStop = function(t3, e2) {
      this.colorStops.push([t3, e2]);
    }, t2.getColor = function() {
      return 0 === this.colorStops.length ? "#000000" : this.colorStops[0][1];
    }, t2.isCanvasGradient = true, t2;
  }, d2.prototype.createPattern = function() {
    return this.createLinearGradient();
  }, d2.prototype.createRadialGradient = function() {
    return this.createLinearGradient();
  };
  var x2 = function(t2, e2, r3, n3, i2, a3, o3, s3) {
    for (var u3 = j2.call(this, r3, n3, i2, a3), c3 = 0; c3 < u3.length; c3++) {
      var l3 = u3[c3];
      0 === c3 && P2.call(this, l3.x1 + t2, l3.y1 + e2), C2.call(this, t2, e2, l3.x2, l3.y2, l3.x3, l3.y3, l3.x4, l3.y4);
    }
    s3 ? _2.call(this) : S2.call(this, o3);
  }, S2 = function(t2) {
    switch (t2) {
      case "stroke":
        this.pdf.internal.out("S");
        break;
      case "fill":
        this.pdf.internal.out("f");
    }
  }, _2 = function() {
    this.pdf.clip(), this.pdf.discardPath();
  }, P2 = function(t2, e2) {
    this.pdf.internal.out(r2(t2) + " " + n2(e2) + " m");
  }, k2 = function(t2) {
    var e2;
    switch (t2.align) {
      case "right":
      case "end":
        e2 = "right";
        break;
      case "center":
        e2 = "center";
        break;
      case "left":
      case "start":
      default:
        e2 = "left";
    }
    var r3 = this.ctx.transform.applyToPoint(new s2(t2.x, t2.y)), n3 = this.ctx.transform.decompose(), i2 = new c2();
    i2 = (i2 = (i2 = i2.multiply(n3.translate)).multiply(n3.skew)).multiply(n3.scale);
    for (var a3, o3, l3, h2 = this.pdf.getTextDimensions(t2.text), f3 = this.ctx.transform.applyToRectangle(new u2(t2.x, t2.y, h2.w, h2.h)), d3 = i2.applyToRectangle(new u2(t2.x, t2.y - h2.h, h2.w, h2.h)), p3 = v2.call(this, d3), g3 = [], m3 = 0; m3 < p3.length; m3 += 1) -1 === g3.indexOf(p3[m3]) && g3.push(p3[m3]);
    if (w2(g3), true === this.autoPaging) for (var b3 = g3[0], N3 = g3[g3.length - 1], A3 = b3; A3 < N3 + 1; A3++) {
      if (this.pdf.setPage(A3), 0 !== this.ctx.clip_path.length) {
        var x3 = this.path;
        a3 = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = y2(a3, this.posX, -1 * this.pdf.internal.pageSize.height * (A3 - 1) + this.posY), L2.call(this, "fill", true), this.path = x3;
      }
      var S3 = JSON.parse(JSON.stringify(f3));
      S3 = y2([S3], this.posX, -1 * this.pdf.internal.pageSize.height * (A3 - 1) + this.posY)[0], t2.scale >= 0.01 && (o3 = this.pdf.internal.getFontSize(), this.pdf.setFontSize(o3 * t2.scale), l3 = this.lineWidth, this.lineWidth = l3 * t2.scale), this.pdf.text(t2.text, S3.x, S3.y, {
        angle: t2.angle,
        align: e2,
        renderingMode: t2.renderingMode,
        maxWidth: t2.maxWidth
      }), t2.scale >= 0.01 && (this.pdf.setFontSize(o3), this.lineWidth = l3);
    }
    else t2.scale >= 0.01 && (o3 = this.pdf.internal.getFontSize(), this.pdf.setFontSize(o3 * t2.scale), l3 = this.lineWidth, this.lineWidth = l3 * t2.scale), this.pdf.text(t2.text, r3.x + this.posX, r3.y + this.posY, {
      angle: t2.angle,
      align: e2,
      renderingMode: t2.renderingMode,
      maxWidth: t2.maxWidth
    }), t2.scale >= 0.01 && (this.pdf.setFontSize(o3), this.lineWidth = l3);
  }, I2 = function(t2, e2, i2, a3) {
    i2 = i2 || 0, a3 = a3 || 0, this.pdf.internal.out(r2(t2 + i2) + " " + n2(e2 + a3) + " l");
  }, F2 = function(t2, e2, r3) {
    return this.pdf.lines(t2, e2, r3, null, null);
  }, C2 = function(t2, r3, n3, i2, s3, u3, c3, l3) {
    this.pdf.internal.out([e(a2(n3 + t2)), e(o2(i2 + r3)), e(a2(s3 + t2)), e(o2(u3 + r3)), e(a2(c3 + t2)), e(o2(l3 + r3)), "c"].join(" "));
  }, j2 = function(t2, e2, r3, n3) {
    for (var i2 = 2 * Math.PI, a3 = Math.PI / 2; e2 > r3; ) e2 -= i2;
    var o3 = Math.abs(r3 - e2);
    o3 < i2 && n3 && (o3 = i2 - o3);
    for (var s3 = [], u3 = n3 ? -1 : 1, c3 = e2; o3 > 1e-5; ) {
      var l3 = c3 + u3 * Math.min(o3, a3);
      s3.push(O2.call(this, t2, c3, l3)), o3 -= Math.abs(l3 - c3), c3 = l3;
    }
    return s3;
  }, O2 = function(t2, e2, r3) {
    var n3 = (r3 - e2) / 2, i2 = t2 * Math.cos(n3), a3 = t2 * Math.sin(n3), o3 = i2, s3 = -a3, u3 = o3 * o3 + s3 * s3, c3 = u3 + o3 * i2 + s3 * a3, l3 = 4 / 3 * (Math.sqrt(2 * u3 * c3) - c3) / (o3 * a3 - s3 * i2), h2 = o3 - l3 * s3, f3 = s3 + l3 * o3, d3 = h2, p3 = -f3, g3 = n3 + e2, m3 = Math.cos(g3), v3 = Math.sin(g3);
    return {
      x1: t2 * Math.cos(e2),
      y1: t2 * Math.sin(e2),
      x2: h2 * m3 - f3 * v3,
      y2: h2 * v3 + f3 * m3,
      x3: d3 * m3 - p3 * v3,
      y3: d3 * v3 + p3 * m3,
      x4: t2 * Math.cos(r3),
      y4: t2 * Math.sin(r3)
    };
  }, B2 = function(t2) {
    return 180 * t2 / Math.PI;
  }, M2 = function(t2, e2, r3, n3, i2, a3) {
    var o3 = t2 + 0.5 * (r3 - t2), s3 = e2 + 0.5 * (n3 - e2), c3 = i2 + 0.5 * (r3 - i2), l3 = a3 + 0.5 * (n3 - a3), h2 = Math.min(t2, i2, o3, c3), f3 = Math.max(t2, i2, o3, c3), d3 = Math.min(e2, a3, s3, l3), p3 = Math.max(e2, a3, s3, l3);
    return new u2(h2, d3, f3 - h2, p3 - d3);
  }, E2 = function(t2, e2, r3, n3, i2, a3, o3, s3) {
    var c3, l3, h2, f3, d3, p3, g3, m3, v3, b3, y3, w3, N3, L3, A3 = r3 - t2, x3 = n3 - e2, S3 = i2 - r3, _3 = a3 - n3, P3 = o3 - i2, k3 = s3 - a3;
    for (l3 = 0; l3 < 41; l3++) v3 = (g3 = (h2 = t2 + (c3 = l3 / 40) * A3) + c3 * ((d3 = r3 + c3 * S3) - h2)) + c3 * (d3 + c3 * (i2 + c3 * P3 - d3) - g3), b3 = (m3 = (f3 = e2 + c3 * x3) + c3 * ((p3 = n3 + c3 * _3) - f3)) + c3 * (p3 + c3 * (a3 + c3 * k3 - p3) - m3), 0 == l3 ? (y3 = v3, w3 = b3, N3 = v3, L3 = b3) : (y3 = Math.min(y3, v3), w3 = Math.min(w3, b3), N3 = Math.max(N3, v3), L3 = Math.max(L3, b3));
    return new u2(Math.round(y3), Math.round(w3), Math.round(N3 - y3), Math.round(L3 - w3));
  };
}(O.API), /**
 * @license
 * jsPDF filters PlugIn
 * Copyright (c) 2014 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  var r2 = function(t) {
    var e2, r3, n3, i3, a3, o2, s2, u2, c2, l2;
    for (/[^\x00-\xFF]/.test(t), r3 = [], n3 = 0, i3 = (t += e2 = "\0\0\0\0".slice(t.length % 4 || 4)).length; i3 > n3; n3 += 4) 0 !== (a3 = (t.charCodeAt(n3) << 24) + (t.charCodeAt(n3 + 1) << 16) + (t.charCodeAt(n3 + 2) << 8) + t.charCodeAt(n3 + 3)) ? (o2 = (a3 = ((a3 = ((a3 = ((a3 = (a3 - (l2 = a3 % 85)) / 85) - (c2 = a3 % 85)) / 85) - (u2 = a3 % 85)) / 85) - (s2 = a3 % 85)) / 85) % 85, r3.push(o2 + 33, s2 + 33, u2 + 33, c2 + 33, l2 + 33)) : r3.push(122);
    return function(t2, e3) {
      for (var r4 = e3; r4 > 0; r4--) t2.pop();
    }(r3, e2.length), String.fromCharCode.apply(String, r3) + "~>";
  }, n2 = function(t) {
    var e2, r3, n3, i3, a3, o2 = String, s2 = "length", u2 = 255, c2 = "charCodeAt", l2 = "slice", h2 = "replace";
    for (t[l2](-2), t = t[l2](0, -2)[h2](/\s/g, "")[h2]("z", "!!!!!"), n3 = [], i3 = 0, a3 = (t += e2 = "uuuuu"[l2](t[s2] % 5 || 5))[s2]; a3 > i3; i3 += 5) r3 = 52200625 * (t[c2](i3) - 33) + 614125 * (t[c2](i3 + 1) - 33) + 7225 * (t[c2](i3 + 2) - 33) + 85 * (t[c2](i3 + 3) - 33) + (t[c2](i3 + 4) - 33), n3.push(u2 & r3 >> 24, u2 & r3 >> 16, u2 & r3 >> 8, u2 & r3);
    return function(t2, e3) {
      for (var r4 = e3; r4 > 0; r4--) t2.pop();
    }(n3, e2[s2]), o2.fromCharCode.apply(o2, n3);
  }, i2 = function(t) {
    var e2 = new RegExp(/^([0-9A-Fa-f]{2})+$/);
    if (-1 !== (t = t.replace(/\s/g, "")).indexOf(">") && (t = t.substr(0, t.indexOf(">"))), t.length % 2 && (t += "0"), false === e2.test(t)) return "";
    for (var r3 = "", n3 = 0; n3 < t.length; n3 += 2) r3 += String.fromCharCode("0x" + (t[n3] + t[n3 + 1]));
    return r3;
  }, a2 = function(e2) {
    for (var r3 = new Uint8Array(e2.length), n3 = e2.length; n3--; ) r3[n3] = e2.charCodeAt(n3);
    return e2 = (r3 = zlibSync(r3)).reduce(function(t, e3) {
      return t + String.fromCharCode(e3);
    }, "");
  };
  e.processDataByFilters = function(t, e2) {
    var o2 = 0, s2 = t || "", u2 = [];
    for ("string" == typeof (e2 = e2 || []) && (e2 = [e2]), o2 = 0; o2 < e2.length; o2 += 1) switch (e2[o2]) {
      case "ASCII85Decode":
      case "/ASCII85Decode":
        s2 = n2(s2), u2.push("/ASCII85Encode");
        break;
      case "ASCII85Encode":
      case "/ASCII85Encode":
        s2 = r2(s2), u2.push("/ASCII85Decode");
        break;
      case "ASCIIHexDecode":
      case "/ASCIIHexDecode":
        s2 = i2(s2), u2.push("/ASCIIHexEncode");
        break;
      case "ASCIIHexEncode":
      case "/ASCIIHexEncode":
        s2 = s2.split("").map(function(t2) {
          return ("0" + t2.charCodeAt().toString(16)).slice(-2);
        }).join("") + ">", u2.push("/ASCIIHexDecode");
        break;
      case "FlateEncode":
      case "/FlateEncode":
        s2 = a2(s2), u2.push("/FlateDecode");
        break;
      default:
        throw new Error('The filter: "' + e2[o2] + '" is not implemented');
    }
    return {
      data: s2,
      reverseChain: u2.reverse().join(" ")
    };
  };
}(O.API), /**
 * @license
 * jsPDF fileloading PlugIn
 * Copyright (c) 2018 Aras Abbasi (aras.abbasi@gmail.com)
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t) {
  t.loadFile = function(t2, e, r2) {
    return function(t3, e2, r3) {
      e2 = false !== e2, r3 = "function" == typeof r3 ? r3 : function() {
      };
      var n2 = void 0;
      try {
        n2 = function(t4, e3, r4) {
          var n3 = new XMLHttpRequest(), i2 = 0, a2 = function(t5) {
            var e4 = t5.length, r5 = [], n4 = String.fromCharCode;
            for (i2 = 0; i2 < e4; i2 += 1) r5.push(n4(255 & t5.charCodeAt(i2)));
            return r5.join("");
          };
          if (n3.open("GET", t4, !e3), n3.overrideMimeType("text/plain; charset=x-user-defined"), false === e3 && (n3.onload = function() {
            200 === n3.status ? r4(a2(this.responseText)) : r4(void 0);
          }), n3.send(null), e3 && 200 === n3.status) return a2(n3.responseText);
        }(t3, e2, r3);
      } catch (t4) {
      }
      return n2;
    }(t2, e, r2);
  }, t.loadImageFile = t.loadFile;
}(O.API), /**
 * @license
 * Copyright (c) 2018 Erik Koopmans
 * Released under the MIT License.
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t) {
  function e() {
    return (r.html2canvas ? Promise.resolve(r.html2canvas) : import("./html2canvas.esm-45DHNQVM.js")).catch(function(t2) {
      return Promise.reject(new Error("Could not load html2canvas: " + t2));
    }).then(function(t2) {
      return t2.default ? t2.default : t2;
    });
  }
  function n2() {
    return (r.DOMPurify ? Promise.resolve(r.DOMPurify) : import("./purify.es-27COP2ZM.js")).catch(function(t2) {
      return Promise.reject(new Error("Could not load dompurify: " + t2));
    }).then(function(t2) {
      return t2.default ? t2.default : t2;
    });
  }
  var i2 = function(t2) {
    var e2 = typeof t2;
    return "undefined" === e2 ? "undefined" : "string" === e2 || t2 instanceof String ? "string" : "number" === e2 || t2 instanceof Number ? "number" : "function" === e2 || t2 instanceof Function ? "function" : t2 && t2.constructor === Array ? "array" : t2 && 1 === t2.nodeType ? "element" : "object" === e2 ? "object" : "unknown";
  }, a2 = function(t2, e2) {
    var r2 = document.createElement(t2);
    for (var n3 in e2.className && (r2.className = e2.className), e2.innerHTML && e2.dompurify && (r2.innerHTML = e2.dompurify.sanitize(e2.innerHTML)), e2.style) r2.style[n3] = e2.style[n3];
    return r2;
  }, o2 = function(t2, e2) {
    for (var r2 = 3 === t2.nodeType ? document.createTextNode(t2.nodeValue) : t2.cloneNode(false), n3 = t2.firstChild; n3; n3 = n3.nextSibling) true !== e2 && 1 === n3.nodeType && "SCRIPT" === n3.nodeName || r2.appendChild(o2(n3, e2));
    return 1 === t2.nodeType && ("CANVAS" === t2.nodeName ? (r2.width = t2.width, r2.height = t2.height, r2.getContext("2d").drawImage(t2, 0, 0)) : "TEXTAREA" !== t2.nodeName && "SELECT" !== t2.nodeName || (r2.value = t2.value), r2.addEventListener("load", function() {
      r2.scrollTop = t2.scrollTop, r2.scrollLeft = t2.scrollLeft;
    }, true)), r2;
  }, s2 = function t2(e2) {
    var r2 = Object.assign(t2.convert(Promise.resolve()), JSON.parse(JSON.stringify(t2.template))), n3 = t2.convert(Promise.resolve(), r2);
    return n3 = (n3 = n3.setProgress(1, t2, 1, [t2])).set(e2);
  };
  (s2.prototype = Object.create(Promise.prototype)).constructor = s2, s2.convert = function(t2, e2) {
    return t2.__proto__ = e2 || s2.prototype, t2;
  }, s2.template = {
    prop: {
      src: null,
      container: null,
      overlay: null,
      canvas: null,
      img: null,
      pdf: null,
      pageSize: null,
      callback: function() {
      }
    },
    progress: {
      val: 0,
      state: null,
      n: 0,
      stack: []
    },
    opt: {
      filename: "file.pdf",
      margin: [0, 0, 0, 0],
      enableLinks: true,
      x: 0,
      y: 0,
      html2canvas: {},
      jsPDF: {},
      backgroundColor: "transparent"
    }
  }, s2.prototype.from = function(t2, e2) {
    return this.then(function() {
      switch (e2 = e2 || function(t3) {
        switch (i2(t3)) {
          case "string":
            return "string";
          case "element":
            return "canvas" === t3.nodeName.toLowerCase() ? "canvas" : "element";
          default:
            return "unknown";
        }
      }(t2)) {
        case "string":
          return this.then(n2).then(function(e3) {
            return this.set({
              src: a2("div", {
                innerHTML: t2,
                dompurify: e3
              })
            });
          });
        case "element":
          return this.set({
            src: t2
          });
        case "canvas":
          return this.set({
            canvas: t2
          });
        case "img":
          return this.set({
            img: t2
          });
        default:
          return this.error("Unknown source type.");
      }
    });
  }, s2.prototype.to = function(t2) {
    switch (t2) {
      case "container":
        return this.toContainer();
      case "canvas":
        return this.toCanvas();
      case "img":
        return this.toImg();
      case "pdf":
        return this.toPdf();
      default:
        return this.error("Invalid target.");
    }
  }, s2.prototype.toContainer = function() {
    return this.thenList([function() {
      return this.prop.src || this.error("Cannot duplicate - no source HTML.");
    }, function() {
      return this.prop.pageSize || this.setPageSize();
    }]).then(function() {
      var t2 = {
        position: "relative",
        display: "inline-block",
        width: Math.max(this.prop.src.clientWidth, this.prop.src.scrollWidth, this.prop.src.offsetWidth) + "px",
        left: 0,
        right: 0,
        top: 0,
        margin: "auto",
        backgroundColor: this.opt.backgroundColor
      }, e2 = o2(this.prop.src, this.opt.html2canvas.javascriptEnabled);
      "BODY" === e2.tagName && (t2.height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) + "px"), this.prop.overlay = a2("div", {
        className: "html2pdf__overlay",
        style: {
          position: "fixed",
          overflow: "hidden",
          zIndex: 1e3,
          left: "-100000px",
          right: 0,
          bottom: 0,
          top: 0
        }
      }), this.prop.container = a2("div", {
        className: "html2pdf__container",
        style: t2
      }), this.prop.container.appendChild(e2), this.prop.container.firstChild.appendChild(a2("div", {
        style: {
          clear: "both",
          border: "0 none transparent",
          margin: 0,
          padding: 0,
          height: 0
        }
      })), this.prop.container.style.float = "none", this.prop.overlay.appendChild(this.prop.container), document.body.appendChild(this.prop.overlay), this.prop.container.firstChild.style.position = "relative", this.prop.container.height = Math.max(this.prop.container.firstChild.clientHeight, this.prop.container.firstChild.scrollHeight, this.prop.container.firstChild.offsetHeight) + "px";
    });
  }, s2.prototype.toCanvas = function() {
    var t2 = [function() {
      return document.body.contains(this.prop.container) || this.toContainer();
    }];
    return this.thenList(t2).then(e).then(function(t3) {
      var e2 = Object.assign({}, this.opt.html2canvas);
      return delete e2.onrendered, t3(this.prop.container, e2);
    }).then(function(t3) {
      (this.opt.html2canvas.onrendered || function() {
      })(t3), this.prop.canvas = t3, document.body.removeChild(this.prop.overlay);
    });
  }, s2.prototype.toContext2d = function() {
    var t2 = [function() {
      return document.body.contains(this.prop.container) || this.toContainer();
    }];
    return this.thenList(t2).then(e).then(function(t3) {
      var e2 = this.opt.jsPDF, r2 = this.opt.fontFaces, n3 = Object.assign({
        async: true,
        allowTaint: true,
        scale: 1,
        scrollX: this.opt.scrollX || 0,
        scrollY: this.opt.scrollY || 0,
        backgroundColor: "#ffffff",
        imageTimeout: 15e3,
        logging: true,
        proxy: null,
        removeContainer: true,
        foreignObjectRendering: false,
        useCORS: false
      }, this.opt.html2canvas);
      if (delete n3.onrendered, e2.context2d.autoPaging = true, e2.context2d.posX = this.opt.x, e2.context2d.posY = this.opt.y, e2.context2d.fontFaces = r2, r2) for (var i3 = 0; i3 < r2.length; ++i3) {
        var a3 = r2[i3], o3 = a3.src.find(function(t4) {
          return "truetype" === t4.format;
        });
        o3 && e2.addFont(o3.url, a3.ref.name, a3.ref.style);
      }
      return n3.windowHeight = n3.windowHeight || 0, n3.windowHeight = 0 == n3.windowHeight ? Math.max(this.prop.container.clientHeight, this.prop.container.scrollHeight, this.prop.container.offsetHeight) : n3.windowHeight, t3(this.prop.container, n3);
    }).then(function(t3) {
      (this.opt.html2canvas.onrendered || function() {
      })(t3), this.prop.canvas = t3, document.body.removeChild(this.prop.overlay);
    });
  }, s2.prototype.toImg = function() {
    return this.thenList([function() {
      return this.prop.canvas || this.toCanvas();
    }]).then(function() {
      var t2 = this.prop.canvas.toDataURL("image/" + this.opt.image.type, this.opt.image.quality);
      this.prop.img = document.createElement("img"), this.prop.img.src = t2;
    });
  }, s2.prototype.toPdf = function() {
    return this.thenList([function() {
      return this.toContext2d();
    }]).then(function() {
      this.prop.pdf = this.prop.pdf || this.opt.jsPDF;
    });
  }, s2.prototype.output = function(t2, e2, r2) {
    return "img" === (r2 = r2 || "pdf").toLowerCase() || "image" === r2.toLowerCase() ? this.outputImg(t2, e2) : this.outputPdf(t2, e2);
  }, s2.prototype.outputPdf = function(t2, e2) {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).then(function() {
      return this.prop.pdf.output(t2, e2);
    });
  }, s2.prototype.outputImg = function(t2) {
    return this.thenList([function() {
      return this.prop.img || this.toImg();
    }]).then(function() {
      switch (t2) {
        case void 0:
        case "img":
          return this.prop.img;
        case "datauristring":
        case "dataurlstring":
          return this.prop.img.src;
        case "datauri":
        case "dataurl":
          return document.location.href = this.prop.img.src;
        default:
          throw 'Image output type "' + t2 + '" is not supported.';
      }
    });
  }, s2.prototype.save = function(t2) {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).set(t2 ? {
      filename: t2
    } : null).then(function() {
      this.prop.pdf.save(this.opt.filename);
    });
  }, s2.prototype.doCallback = function() {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).then(function() {
      this.prop.callback(this.prop.pdf);
    });
  }, s2.prototype.set = function(t2) {
    if ("object" !== i2(t2)) return this;
    var e2 = Object.keys(t2 || {}).map(function(e3) {
      if (e3 in s2.template.prop) return function() {
        this.prop[e3] = t2[e3];
      };
      switch (e3) {
        case "margin":
          return this.setMargin.bind(this, t2.margin);
        case "jsPDF":
          return function() {
            return this.opt.jsPDF = t2.jsPDF, this.setPageSize();
          };
        case "pageSize":
          return this.setPageSize.bind(this, t2.pageSize);
        default:
          return function() {
            this.opt[e3] = t2[e3];
          };
      }
    }, this);
    return this.then(function() {
      return this.thenList(e2);
    });
  }, s2.prototype.get = function(t2, e2) {
    return this.then(function() {
      var r2 = t2 in s2.template.prop ? this.prop[t2] : this.opt[t2];
      return e2 ? e2(r2) : r2;
    });
  }, s2.prototype.setMargin = function(t2) {
    return this.then(function() {
      switch (i2(t2)) {
        case "number":
          t2 = [t2, t2, t2, t2];
        case "array":
          if (2 === t2.length && (t2 = [t2[0], t2[1], t2[0], t2[1]]), 4 === t2.length) break;
        default:
          return this.error("Invalid margin array.");
      }
      this.opt.margin = t2;
    }).then(this.setPageSize);
  }, s2.prototype.setPageSize = function(t2) {
    function e2(t3, e3) {
      return Math.floor(t3 * e3 / 72 * 96);
    }
    return this.then(function() {
      (t2 = t2 || O.getPageSize(this.opt.jsPDF)).hasOwnProperty("inner") || (t2.inner = {
        width: t2.width - this.opt.margin[1] - this.opt.margin[3],
        height: t2.height - this.opt.margin[0] - this.opt.margin[2]
      }, t2.inner.px = {
        width: e2(t2.inner.width, t2.k),
        height: e2(t2.inner.height, t2.k)
      }, t2.inner.ratio = t2.inner.height / t2.inner.width), this.prop.pageSize = t2;
    });
  }, s2.prototype.setProgress = function(t2, e2, r2, n3) {
    return null != t2 && (this.progress.val = t2), null != e2 && (this.progress.state = e2), null != r2 && (this.progress.n = r2), null != n3 && (this.progress.stack = n3), this.progress.ratio = this.progress.val / this.progress.state, this;
  }, s2.prototype.updateProgress = function(t2, e2, r2, n3) {
    return this.setProgress(t2 ? this.progress.val + t2 : null, e2 || null, r2 ? this.progress.n + r2 : null, n3 ? this.progress.stack.concat(n3) : null);
  }, s2.prototype.then = function(t2, e2) {
    var r2 = this;
    return this.thenCore(t2, e2, function(t3, e3) {
      return r2.updateProgress(null, null, 1, [t3]), Promise.prototype.then.call(this, function(e4) {
        return r2.updateProgress(null, t3), e4;
      }).then(t3, e3).then(function(t4) {
        return r2.updateProgress(1), t4;
      });
    });
  }, s2.prototype.thenCore = function(t2, e2, r2) {
    r2 = r2 || Promise.prototype.then;
    t2 && (t2 = t2.bind(this)), e2 && (e2 = e2.bind(this));
    var n3 = -1 !== Promise.toString().indexOf("[native code]") && "Promise" === Promise.name ? this : s2.convert(Object.assign({}, this), Promise.prototype), i3 = r2.call(n3, t2, e2);
    return s2.convert(i3, this.__proto__);
  }, s2.prototype.thenExternal = function(t2, e2) {
    return Promise.prototype.then.call(this, t2, e2);
  }, s2.prototype.thenList = function(t2) {
    var e2 = this;
    return t2.forEach(function(t3) {
      e2 = e2.thenCore(t3);
    }), e2;
  }, s2.prototype.catch = function(t2) {
    t2 && (t2 = t2.bind(this));
    var e2 = Promise.prototype.catch.call(this, t2);
    return s2.convert(e2, this);
  }, s2.prototype.catchExternal = function(t2) {
    return Promise.prototype.catch.call(this, t2);
  }, s2.prototype.error = function(t2) {
    return this.then(function() {
      throw new Error(t2);
    });
  }, s2.prototype.using = s2.prototype.set, s2.prototype.saveAs = s2.prototype.save, s2.prototype.export = s2.prototype.output, s2.prototype.run = s2.prototype.then, O.getPageSize = function(t2, e2, r2) {
    if ("object" == typeof t2) {
      var n3 = t2;
      t2 = n3.orientation, e2 = n3.unit || e2, r2 = n3.format || r2;
    }
    e2 = e2 || "mm", r2 = r2 || "a4", t2 = ("" + (t2 || "P")).toLowerCase();
    var i3, a3 = ("" + r2).toLowerCase(), o3 = {
      a0: [2383.94, 3370.39],
      a1: [1683.78, 2383.94],
      a2: [1190.55, 1683.78],
      a3: [841.89, 1190.55],
      a4: [595.28, 841.89],
      a5: [419.53, 595.28],
      a6: [297.64, 419.53],
      a7: [209.76, 297.64],
      a8: [147.4, 209.76],
      a9: [104.88, 147.4],
      a10: [73.7, 104.88],
      b0: [2834.65, 4008.19],
      b1: [2004.09, 2834.65],
      b2: [1417.32, 2004.09],
      b3: [1000.63, 1417.32],
      b4: [708.66, 1000.63],
      b5: [498.9, 708.66],
      b6: [354.33, 498.9],
      b7: [249.45, 354.33],
      b8: [175.75, 249.45],
      b9: [124.72, 175.75],
      b10: [87.87, 124.72],
      c0: [2599.37, 3676.54],
      c1: [1836.85, 2599.37],
      c2: [1298.27, 1836.85],
      c3: [918.43, 1298.27],
      c4: [649.13, 918.43],
      c5: [459.21, 649.13],
      c6: [323.15, 459.21],
      c7: [229.61, 323.15],
      c8: [161.57, 229.61],
      c9: [113.39, 161.57],
      c10: [79.37, 113.39],
      dl: [311.81, 623.62],
      letter: [612, 792],
      "government-letter": [576, 756],
      legal: [612, 1008],
      "junior-legal": [576, 360],
      ledger: [1224, 792],
      tabloid: [792, 1224],
      "credit-card": [153, 243]
    };
    switch (e2) {
      case "pt":
        i3 = 1;
        break;
      case "mm":
        i3 = 72 / 25.4;
        break;
      case "cm":
        i3 = 72 / 2.54;
        break;
      case "in":
        i3 = 72;
        break;
      case "px":
        i3 = 0.75;
        break;
      case "pc":
      case "em":
        i3 = 12;
        break;
      case "ex":
        i3 = 6;
        break;
      default:
        throw "Invalid unit: " + e2;
    }
    var s3, u2 = 0, c2 = 0;
    if (o3.hasOwnProperty(a3)) u2 = o3[a3][1] / i3, c2 = o3[a3][0] / i3;
    else try {
      u2 = r2[1], c2 = r2[0];
    } catch (t3) {
      throw new Error("Invalid format: " + r2);
    }
    if ("p" === t2 || "portrait" === t2) t2 = "p", c2 > u2 && (s3 = c2, c2 = u2, u2 = s3);
    else {
      if ("l" !== t2 && "landscape" !== t2) throw "Invalid orientation: " + t2;
      t2 = "l", u2 > c2 && (s3 = c2, c2 = u2, u2 = s3);
    }
    return {
      width: c2,
      height: u2,
      unit: e2,
      k: i3,
      orientation: t2
    };
  }, t.html = function(t2, e2) {
    (e2 = e2 || {}).callback = e2.callback || function() {
    }, e2.html2canvas = e2.html2canvas || {}, e2.html2canvas.canvas = e2.html2canvas.canvas || this.canvas, e2.jsPDF = e2.jsPDF || this, e2.fontFaces = e2.fontFaces ? e2.fontFaces.map(It) : null;
    var r2 = new s2(e2);
    return e2.worker ? r2 : r2.from(t2).doCallback();
  };
}(O.API), O.API.addJS = function(t) {
  return Dt = t, this.internal.events.subscribe("postPutResources", function() {
    Rt = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/Names [(EmbeddedJS) " + (Rt + 1) + " 0 R]"), this.internal.out(">>"), this.internal.out("endobj"), Tt = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/S /JavaScript"), this.internal.out("/JS (" + Dt + ")"), this.internal.out(">>"), this.internal.out("endobj");
  }), this.internal.events.subscribe("putCatalog", function() {
    void 0 !== Rt && void 0 !== Tt && this.internal.out("/Names <</JavaScript " + Rt + " 0 R>>");
  }), this;
}, /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t) {
  var e;
  t.events.push(["postPutResources", function() {
    var t2 = this, r2 = /^(\d+) 0 obj$/;
    if (this.outline.root.children.length > 0) for (var n2 = t2.outline.render().split(/\r\n/), i2 = 0; i2 < n2.length; i2++) {
      var a2 = n2[i2], o2 = r2.exec(a2);
      if (null != o2) {
        var s2 = o2[1];
        t2.internal.newObjectDeferredBegin(s2, false);
      }
      t2.internal.write(a2);
    }
    if (this.outline.createNamedDestinations) {
      var u2 = this.internal.pages.length, c2 = [];
      for (i2 = 0; i2 < u2; i2++) {
        var l2 = t2.internal.newObject();
        c2.push(l2);
        var h2 = t2.internal.getPageInfo(i2 + 1);
        t2.internal.write("<< /D[" + h2.objId + " 0 R /XYZ null null null]>> endobj");
      }
      var f2 = t2.internal.newObject();
      t2.internal.write("<< /Names [ ");
      for (i2 = 0; i2 < c2.length; i2++) t2.internal.write("(page_" + (i2 + 1) + ")" + c2[i2] + " 0 R");
      t2.internal.write(" ] >>", "endobj"), e = t2.internal.newObject(), t2.internal.write("<< /Dests " + f2 + " 0 R"), t2.internal.write(">>", "endobj");
    }
  }]), t.events.push(["putCatalog", function() {
    this.outline.root.children.length > 0 && (this.internal.write("/Outlines", this.outline.makeRef(this.outline.root)), this.outline.createNamedDestinations && this.internal.write("/Names " + e + " 0 R"));
  }]), t.events.push(["initialized", function() {
    var t2 = this;
    t2.outline = {
      createNamedDestinations: false,
      root: {
        children: []
      }
    }, t2.outline.add = function(t3, e2, r2) {
      var n2 = {
        title: e2,
        options: r2,
        children: []
      };
      return null == t3 && (t3 = this.root), t3.children.push(n2), n2;
    }, t2.outline.render = function() {
      return this.ctx = {}, this.ctx.val = "", this.ctx.pdf = t2, this.genIds_r(this.root), this.renderRoot(this.root), this.renderItems(this.root), this.ctx.val;
    }, t2.outline.genIds_r = function(e2) {
      e2.id = t2.internal.newObjectDeferred();
      for (var r2 = 0; r2 < e2.children.length; r2++) this.genIds_r(e2.children[r2]);
    }, t2.outline.renderRoot = function(t3) {
      this.objStart(t3), this.line("/Type /Outlines"), t3.children.length > 0 && (this.line("/First " + this.makeRef(t3.children[0])), this.line("/Last " + this.makeRef(t3.children[t3.children.length - 1]))), this.line("/Count " + this.count_r({
        count: 0
      }, t3)), this.objEnd();
    }, t2.outline.renderItems = function(e2) {
      for (var r2 = this.ctx.pdf.internal.getVerticalCoordinateString, n2 = 0; n2 < e2.children.length; n2++) {
        var i2 = e2.children[n2];
        this.objStart(i2), this.line("/Title " + this.makeString(i2.title)), this.line("/Parent " + this.makeRef(e2)), n2 > 0 && this.line("/Prev " + this.makeRef(e2.children[n2 - 1])), n2 < e2.children.length - 1 && this.line("/Next " + this.makeRef(e2.children[n2 + 1])), i2.children.length > 0 && (this.line("/First " + this.makeRef(i2.children[0])), this.line("/Last " + this.makeRef(i2.children[i2.children.length - 1])));
        var a2 = this.count = this.count_r({
          count: 0
        }, i2);
        if (a2 > 0 && this.line("/Count " + a2), i2.options && i2.options.pageNumber) {
          var o2 = t2.internal.getPageInfo(i2.options.pageNumber);
          this.line("/Dest [" + o2.objId + " 0 R /XYZ 0 " + r2(0) + " 0]");
        }
        this.objEnd();
      }
      for (var s2 = 0; s2 < e2.children.length; s2++) this.renderItems(e2.children[s2]);
    }, t2.outline.line = function(t3) {
      this.ctx.val += t3 + "\r\n";
    }, t2.outline.makeRef = function(t3) {
      return t3.id + " 0 R";
    }, t2.outline.makeString = function(e2) {
      return "(" + t2.internal.pdfEscape(e2) + ")";
    }, t2.outline.objStart = function(t3) {
      this.ctx.val += "\r\n" + t3.id + " 0 obj\r\n<<\r\n";
    }, t2.outline.objEnd = function() {
      this.ctx.val += ">> \r\nendobj\r\n";
    }, t2.outline.count_r = function(t3, e2) {
      for (var r2 = 0; r2 < e2.children.length; r2++) t3.count++, this.count_r(t3, e2.children[r2]);
      return t3.count;
    };
  }]);
}(O.API), /**
 * @license
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t) {
  var e = [192, 193, 194, 195, 196, 197, 198, 199];
  t.processJPEG = function(t2, r2, n2, i2, a2, o2) {
    var s2, u2 = this.decode.DCT_DECODE, c2 = null;
    if ("string" == typeof t2 || this.__addimage__.isArrayBuffer(t2) || this.__addimage__.isArrayBufferView(t2)) {
      switch (t2 = a2 || t2, t2 = this.__addimage__.isArrayBuffer(t2) ? new Uint8Array(t2) : t2, (s2 = function(t3) {
        for (var r3, n3 = 256 * t3.charCodeAt(4) + t3.charCodeAt(5), i3 = t3.length, a3 = {
          width: 0,
          height: 0,
          numcomponents: 1
        }, o3 = 4; o3 < i3; o3 += 2) {
          if (o3 += n3, -1 !== e.indexOf(t3.charCodeAt(o3 + 1))) {
            r3 = 256 * t3.charCodeAt(o3 + 5) + t3.charCodeAt(o3 + 6), a3 = {
              width: 256 * t3.charCodeAt(o3 + 7) + t3.charCodeAt(o3 + 8),
              height: r3,
              numcomponents: t3.charCodeAt(o3 + 9)
            };
            break;
          }
          n3 = 256 * t3.charCodeAt(o3 + 2) + t3.charCodeAt(o3 + 3);
        }
        return a3;
      }(t2 = this.__addimage__.isArrayBufferView(t2) ? this.__addimage__.arrayBufferToBinaryString(t2) : t2)).numcomponents) {
        case 1:
          o2 = this.color_spaces.DEVICE_GRAY;
          break;
        case 4:
          o2 = this.color_spaces.DEVICE_CMYK;
          break;
        case 3:
          o2 = this.color_spaces.DEVICE_RGB;
      }
      c2 = {
        data: t2,
        width: s2.width,
        height: s2.height,
        colorSpace: o2,
        bitsPerComponent: 8,
        filter: u2,
        index: r2,
        alias: n2
      };
    }
    return c2;
  };
}(O.API);
var zt;
var Ht;
var Vt;
var Wt;
var Gt;
var Yt = function() {
  var t, n2, i2;
  function a2(t2) {
    var e, r2, n3, i3, a3, o3, s2, u2, c2, l2, h2, f2, d2, p2;
    for (this.data = t2, this.pos = 8, this.palette = [], this.imgData = [], this.transparency = {}, this.animation = null, this.text = {}, o3 = null; ; ) {
      switch (e = this.readUInt32(), c2 = function() {
        var t3, e2;
        for (e2 = [], t3 = 0; t3 < 4; ++t3) e2.push(String.fromCharCode(this.data[this.pos++]));
        return e2;
      }.call(this).join("")) {
        case "IHDR":
          this.width = this.readUInt32(), this.height = this.readUInt32(), this.bits = this.data[this.pos++], this.colorType = this.data[this.pos++], this.compressionMethod = this.data[this.pos++], this.filterMethod = this.data[this.pos++], this.interlaceMethod = this.data[this.pos++];
          break;
        case "acTL":
          this.animation = {
            numFrames: this.readUInt32(),
            numPlays: this.readUInt32() || 1 / 0,
            frames: []
          };
          break;
        case "PLTE":
          this.palette = this.read(e);
          break;
        case "fcTL":
          o3 && this.animation.frames.push(o3), this.pos += 4, o3 = {
            width: this.readUInt32(),
            height: this.readUInt32(),
            xOffset: this.readUInt32(),
            yOffset: this.readUInt32()
          }, a3 = this.readUInt16(), i3 = this.readUInt16() || 100, o3.delay = 1e3 * a3 / i3, o3.disposeOp = this.data[this.pos++], o3.blendOp = this.data[this.pos++], o3.data = [];
          break;
        case "IDAT":
        case "fdAT":
          for ("fdAT" === c2 && (this.pos += 4, e -= 4), t2 = (null != o3 ? o3.data : void 0) || this.imgData, f2 = 0; 0 <= e ? f2 < e : f2 > e; 0 <= e ? ++f2 : --f2) t2.push(this.data[this.pos++]);
          break;
        case "tRNS":
          switch (this.transparency = {}, this.colorType) {
            case 3:
              if (n3 = this.palette.length / 3, this.transparency.indexed = this.read(e), this.transparency.indexed.length > n3) throw new Error("More transparent colors than palette size");
              if ((l2 = n3 - this.transparency.indexed.length) > 0) for (d2 = 0; 0 <= l2 ? d2 < l2 : d2 > l2; 0 <= l2 ? ++d2 : --d2) this.transparency.indexed.push(255);
              break;
            case 0:
              this.transparency.grayscale = this.read(e)[0];
              break;
            case 2:
              this.transparency.rgb = this.read(e);
          }
          break;
        case "tEXt":
          s2 = (h2 = this.read(e)).indexOf(0), u2 = String.fromCharCode.apply(String, h2.slice(0, s2)), this.text[u2] = String.fromCharCode.apply(String, h2.slice(s2 + 1));
          break;
        case "IEND":
          return o3 && this.animation.frames.push(o3), this.colors = function() {
            switch (this.colorType) {
              case 0:
              case 3:
              case 4:
                return 1;
              case 2:
              case 6:
                return 3;
            }
          }.call(this), this.hasAlphaChannel = 4 === (p2 = this.colorType) || 6 === p2, r2 = this.colors + (this.hasAlphaChannel ? 1 : 0), this.pixelBitlength = this.bits * r2, this.colorSpace = function() {
            switch (this.colors) {
              case 1:
                return "DeviceGray";
              case 3:
                return "DeviceRGB";
            }
          }.call(this), void (this.imgData = new Uint8Array(this.imgData));
        default:
          this.pos += e;
      }
      if (this.pos += 4, this.pos > this.data.length) throw new Error("Incomplete or corrupt PNG file");
    }
  }
  a2.prototype.read = function(t2) {
    var e, r2;
    for (r2 = [], e = 0; 0 <= t2 ? e < t2 : e > t2; 0 <= t2 ? ++e : --e) r2.push(this.data[this.pos++]);
    return r2;
  }, a2.prototype.readUInt32 = function() {
    return this.data[this.pos++] << 24 | this.data[this.pos++] << 16 | this.data[this.pos++] << 8 | this.data[this.pos++];
  }, a2.prototype.readUInt16 = function() {
    return this.data[this.pos++] << 8 | this.data[this.pos++];
  }, a2.prototype.decodePixels = function(t2) {
    var r2 = this.pixelBitlength / 8, n3 = new Uint8Array(this.width * this.height * r2), i3 = 0, a3 = this;
    if (null == t2 && (t2 = this.imgData), 0 === t2.length) return new Uint8Array(0);
    function o3(e, o4, s2, u2) {
      var c2, l2, h2, f2, d2, p2, g2, m2, v2, b2, y2, w2, N2, L2, A2, x2, S2, _2, P2, k2, I2, F2 = Math.ceil((a3.width - e) / s2), C2 = Math.ceil((a3.height - o4) / u2), j2 = a3.width == F2 && a3.height == C2;
      for (L2 = r2 * F2, w2 = j2 ? n3 : new Uint8Array(L2 * C2), p2 = t2.length, N2 = 0, l2 = 0; N2 < C2 && i3 < p2; ) {
        switch (t2[i3++]) {
          case 0:
            for (f2 = S2 = 0; S2 < L2; f2 = S2 += 1) w2[l2++] = t2[i3++];
            break;
          case 1:
            for (f2 = _2 = 0; _2 < L2; f2 = _2 += 1) c2 = t2[i3++], d2 = f2 < r2 ? 0 : w2[l2 - r2], w2[l2++] = (c2 + d2) % 256;
            break;
          case 2:
            for (f2 = P2 = 0; P2 < L2; f2 = P2 += 1) c2 = t2[i3++], h2 = (f2 - f2 % r2) / r2, A2 = N2 && w2[(N2 - 1) * L2 + h2 * r2 + f2 % r2], w2[l2++] = (A2 + c2) % 256;
            break;
          case 3:
            for (f2 = k2 = 0; k2 < L2; f2 = k2 += 1) c2 = t2[i3++], h2 = (f2 - f2 % r2) / r2, d2 = f2 < r2 ? 0 : w2[l2 - r2], A2 = N2 && w2[(N2 - 1) * L2 + h2 * r2 + f2 % r2], w2[l2++] = (c2 + Math.floor((d2 + A2) / 2)) % 256;
            break;
          case 4:
            for (f2 = I2 = 0; I2 < L2; f2 = I2 += 1) c2 = t2[i3++], h2 = (f2 - f2 % r2) / r2, d2 = f2 < r2 ? 0 : w2[l2 - r2], 0 === N2 ? A2 = x2 = 0 : (A2 = w2[(N2 - 1) * L2 + h2 * r2 + f2 % r2], x2 = h2 && w2[(N2 - 1) * L2 + (h2 - 1) * r2 + f2 % r2]), g2 = d2 + A2 - x2, m2 = Math.abs(g2 - d2), b2 = Math.abs(g2 - A2), y2 = Math.abs(g2 - x2), v2 = m2 <= b2 && m2 <= y2 ? d2 : b2 <= y2 ? A2 : x2, w2[l2++] = (c2 + v2) % 256;
            break;
          default:
            throw new Error("Invalid filter algorithm: " + t2[i3 - 1]);
        }
        if (!j2) {
          var O2 = ((o4 + N2 * u2) * a3.width + e) * r2, B2 = N2 * L2;
          for (f2 = 0; f2 < F2; f2 += 1) {
            for (var M2 = 0; M2 < r2; M2 += 1) n3[O2++] = w2[B2++];
            O2 += (s2 - 1) * r2;
          }
        }
        N2++;
      }
    }
    return t2 = unzlibSync(t2), 1 == a3.interlaceMethod ? (o3(0, 0, 8, 8), o3(4, 0, 8, 8), o3(0, 4, 4, 8), o3(2, 0, 4, 4), o3(0, 2, 2, 4), o3(1, 0, 2, 2), o3(0, 1, 1, 2)) : o3(0, 0, 1, 1), n3;
  }, a2.prototype.decodePalette = function() {
    var t2, e, r2, n3, i3, a3, o3, s2, u2;
    for (r2 = this.palette, a3 = this.transparency.indexed || [], i3 = new Uint8Array((a3.length || 0) + r2.length), n3 = 0, t2 = 0, e = o3 = 0, s2 = r2.length; o3 < s2; e = o3 += 3) i3[n3++] = r2[e], i3[n3++] = r2[e + 1], i3[n3++] = r2[e + 2], i3[n3++] = null != (u2 = a3[t2++]) ? u2 : 255;
    return i3;
  }, a2.prototype.copyToImageData = function(t2, e) {
    var r2, n3, i3, a3, o3, s2, u2, c2, l2, h2, f2;
    if (n3 = this.colors, l2 = null, r2 = this.hasAlphaChannel, this.palette.length && (l2 = null != (f2 = this._decodedPalette) ? f2 : this._decodedPalette = this.decodePalette(), n3 = 4, r2 = true), c2 = (i3 = t2.data || t2).length, o3 = l2 || e, a3 = s2 = 0, 1 === n3) for (; a3 < c2; ) u2 = l2 ? 4 * e[a3 / 4] : s2, h2 = o3[u2++], i3[a3++] = h2, i3[a3++] = h2, i3[a3++] = h2, i3[a3++] = r2 ? o3[u2++] : 255, s2 = u2;
    else for (; a3 < c2; ) u2 = l2 ? 4 * e[a3 / 4] : s2, i3[a3++] = o3[u2++], i3[a3++] = o3[u2++], i3[a3++] = o3[u2++], i3[a3++] = r2 ? o3[u2++] : 255, s2 = u2;
  }, a2.prototype.decode = function() {
    var t2;
    return t2 = new Uint8Array(this.width * this.height * 4), this.copyToImageData(t2, this.decodePixels()), t2;
  };
  var o2 = function() {
    if ("[object Window]" === Object.prototype.toString.call(r)) {
      try {
        n2 = r.document.createElement("canvas"), i2 = n2.getContext("2d");
      } catch (t2) {
        return false;
      }
      return true;
    }
    return false;
  };
  return o2(), t = function(t2) {
    var e;
    if (true === o2()) return i2.width = t2.width, i2.height = t2.height, i2.clearRect(0, 0, t2.width, t2.height), i2.putImageData(t2, 0, 0), (e = new Image()).src = n2.toDataURL(), e;
    throw new Error("This method requires a Browser with Canvas-capability.");
  }, a2.prototype.decodeFrames = function(e) {
    var r2, n3, i3, a3, o3, s2, u2, c2;
    if (this.animation) {
      for (c2 = [], n3 = o3 = 0, s2 = (u2 = this.animation.frames).length; o3 < s2; n3 = ++o3) r2 = u2[n3], i3 = e.createImageData(r2.width, r2.height), a3 = this.decodePixels(new Uint8Array(r2.data)), this.copyToImageData(i3, a3), r2.imageData = i3, c2.push(r2.image = t(i3));
      return c2;
    }
  }, a2.prototype.renderFrame = function(t2, e) {
    var r2, n3, i3;
    return r2 = (n3 = this.animation.frames)[e], i3 = n3[e - 1], 0 === e && t2.clearRect(0, 0, this.width, this.height), 1 === (null != i3 ? i3.disposeOp : void 0) ? t2.clearRect(i3.xOffset, i3.yOffset, i3.width, i3.height) : 2 === (null != i3 ? i3.disposeOp : void 0) && t2.putImageData(i3.imageData, i3.xOffset, i3.yOffset), 0 === r2.blendOp && t2.clearRect(r2.xOffset, r2.yOffset, r2.width, r2.height), t2.drawImage(r2.image, r2.xOffset, r2.yOffset);
  }, a2.prototype.animate = function(t2) {
    var e, r2, n3, i3, a3, o3, s2 = this;
    return r2 = 0, o3 = this.animation, i3 = o3.numFrames, n3 = o3.frames, a3 = o3.numPlays, (e = function() {
      var o4, u2;
      if (o4 = r2++ % i3, u2 = n3[o4], s2.renderFrame(t2, o4), i3 > 1 && r2 / i3 < a3) return s2.animation._timeout = setTimeout(e, u2.delay);
    })();
  }, a2.prototype.stopAnimation = function() {
    var t2;
    return clearTimeout(null != (t2 = this.animation) ? t2._timeout : void 0);
  }, a2.prototype.render = function(t2) {
    var e, r2;
    return t2._png && t2._png.stopAnimation(), t2._png = this, t2.width = this.width, t2.height = this.height, e = t2.getContext("2d"), this.animation ? (this.decodeFrames(e), this.animate(e)) : (r2 = e.createImageData(this.width, this.height), this.copyToImageData(r2, this.decodePixels()), e.putImageData(r2, 0, 0));
  }, a2;
}();
function Jt(t) {
  var e = 0;
  if (71 !== t[e++] || 73 !== t[e++] || 70 !== t[e++] || 56 !== t[e++] || 56 != (t[e++] + 1 & 253) || 97 !== t[e++]) throw new Error("Invalid GIF 87a/89a header.");
  var r2 = t[e++] | t[e++] << 8, n2 = t[e++] | t[e++] << 8, i2 = t[e++], a2 = i2 >> 7, o2 = 1 << (7 & i2) + 1;
  t[e++];
  t[e++];
  var s2 = null, u2 = null;
  a2 && (s2 = e, u2 = o2, e += 3 * o2);
  var c2 = true, l2 = [], h2 = 0, f2 = null, d2 = 0, p2 = null;
  for (this.width = r2, this.height = n2; c2 && e < t.length; ) switch (t[e++]) {
    case 33:
      switch (t[e++]) {
        case 255:
          if (11 !== t[e] || 78 == t[e + 1] && 69 == t[e + 2] && 84 == t[e + 3] && 83 == t[e + 4] && 67 == t[e + 5] && 65 == t[e + 6] && 80 == t[e + 7] && 69 == t[e + 8] && 50 == t[e + 9] && 46 == t[e + 10] && 48 == t[e + 11] && 3 == t[e + 12] && 1 == t[e + 13] && 0 == t[e + 16]) e += 14, p2 = t[e++] | t[e++] << 8, e++;
          else for (e += 12; ; ) {
            if (!((P2 = t[e++]) >= 0)) throw Error("Invalid block size");
            if (0 === P2) break;
            e += P2;
          }
          break;
        case 249:
          if (4 !== t[e++] || 0 !== t[e + 4]) throw new Error("Invalid graphics extension block.");
          var g2 = t[e++];
          h2 = t[e++] | t[e++] << 8, f2 = t[e++], 0 == (1 & g2) && (f2 = null), d2 = g2 >> 2 & 7, e++;
          break;
        case 254:
          for (; ; ) {
            if (!((P2 = t[e++]) >= 0)) throw Error("Invalid block size");
            if (0 === P2) break;
            e += P2;
          }
          break;
        default:
          throw new Error("Unknown graphic control label: 0x" + t[e - 1].toString(16));
      }
      break;
    case 44:
      var m2 = t[e++] | t[e++] << 8, v2 = t[e++] | t[e++] << 8, b2 = t[e++] | t[e++] << 8, y2 = t[e++] | t[e++] << 8, w2 = t[e++], N2 = w2 >> 6 & 1, L2 = 1 << (7 & w2) + 1, A2 = s2, x2 = u2, S2 = false;
      if (w2 >> 7) {
        S2 = true;
        A2 = e, x2 = L2, e += 3 * L2;
      }
      var _2 = e;
      for (e++; ; ) {
        var P2;
        if (!((P2 = t[e++]) >= 0)) throw Error("Invalid block size");
        if (0 === P2) break;
        e += P2;
      }
      l2.push({
        x: m2,
        y: v2,
        width: b2,
        height: y2,
        has_local_palette: S2,
        palette_offset: A2,
        palette_size: x2,
        data_offset: _2,
        data_length: e - _2,
        transparent_index: f2,
        interlaced: !!N2,
        delay: h2,
        disposal: d2
      });
      break;
    case 59:
      c2 = false;
      break;
    default:
      throw new Error("Unknown gif block: 0x" + t[e - 1].toString(16));
  }
  this.numFrames = function() {
    return l2.length;
  }, this.loopCount = function() {
    return p2;
  }, this.frameInfo = function(t2) {
    if (t2 < 0 || t2 >= l2.length) throw new Error("Frame index out of range.");
    return l2[t2];
  }, this.decodeAndBlitFrameBGRA = function(e2, n3) {
    var i3 = this.frameInfo(e2), a3 = i3.width * i3.height, o3 = new Uint8Array(a3);
    Xt(t, i3.data_offset, o3, a3);
    var s3 = i3.palette_offset, u3 = i3.transparent_index;
    null === u3 && (u3 = 256);
    var c3 = i3.width, l3 = r2 - c3, h3 = c3, f3 = 4 * (i3.y * r2 + i3.x), d3 = 4 * ((i3.y + i3.height) * r2 + i3.x), p3 = f3, g3 = 4 * l3;
    true === i3.interlaced && (g3 += 4 * r2 * 7);
    for (var m3 = 8, v3 = 0, b3 = o3.length; v3 < b3; ++v3) {
      var y3 = o3[v3];
      if (0 === h3 && (h3 = c3, (p3 += g3) >= d3 && (g3 = 4 * l3 + 4 * r2 * (m3 - 1), p3 = f3 + (c3 + l3) * (m3 << 1), m3 >>= 1)), y3 === u3) p3 += 4;
      else {
        var w3 = t[s3 + 3 * y3], N3 = t[s3 + 3 * y3 + 1], L3 = t[s3 + 3 * y3 + 2];
        n3[p3++] = L3, n3[p3++] = N3, n3[p3++] = w3, n3[p3++] = 255;
      }
      --h3;
    }
  }, this.decodeAndBlitFrameRGBA = function(e2, n3) {
    var i3 = this.frameInfo(e2), a3 = i3.width * i3.height, o3 = new Uint8Array(a3);
    Xt(t, i3.data_offset, o3, a3);
    var s3 = i3.palette_offset, u3 = i3.transparent_index;
    null === u3 && (u3 = 256);
    var c3 = i3.width, l3 = r2 - c3, h3 = c3, f3 = 4 * (i3.y * r2 + i3.x), d3 = 4 * ((i3.y + i3.height) * r2 + i3.x), p3 = f3, g3 = 4 * l3;
    true === i3.interlaced && (g3 += 4 * r2 * 7);
    for (var m3 = 8, v3 = 0, b3 = o3.length; v3 < b3; ++v3) {
      var y3 = o3[v3];
      if (0 === h3 && (h3 = c3, (p3 += g3) >= d3 && (g3 = 4 * l3 + 4 * r2 * (m3 - 1), p3 = f3 + (c3 + l3) * (m3 << 1), m3 >>= 1)), y3 === u3) p3 += 4;
      else {
        var w3 = t[s3 + 3 * y3], N3 = t[s3 + 3 * y3 + 1], L3 = t[s3 + 3 * y3 + 2];
        n3[p3++] = w3, n3[p3++] = N3, n3[p3++] = L3, n3[p3++] = 255;
      }
      --h3;
    }
  };
}
function Xt(t, e, r2, n2) {
  for (var a2 = t[e++], o2 = 1 << a2, s2 = o2 + 1, u2 = s2 + 1, c2 = a2 + 1, l2 = (1 << c2) - 1, h2 = 0, f2 = 0, d2 = 0, p2 = t[e++], g2 = new Int32Array(4096), m2 = null; ; ) {
    for (; h2 < 16 && 0 !== p2; ) f2 |= t[e++] << h2, h2 += 8, 1 === p2 ? p2 = t[e++] : --p2;
    if (h2 < c2) break;
    var v2 = f2 & l2;
    if (f2 >>= c2, h2 -= c2, v2 !== o2) {
      if (v2 === s2) break;
      for (var b2 = v2 < u2 ? v2 : m2, y2 = 0, w2 = b2; w2 > o2; ) w2 = g2[w2] >> 8, ++y2;
      var N2 = w2;
      if (d2 + y2 + (b2 !== v2 ? 1 : 0) > n2) return void i.log("Warning, gif stream longer than expected.");
      r2[d2++] = N2;
      var L2 = d2 += y2;
      for (b2 !== v2 && (r2[d2++] = N2), w2 = b2; y2--; ) w2 = g2[w2], r2[--L2] = 255 & w2, w2 >>= 8;
      null !== m2 && u2 < 4096 && (g2[u2++] = m2 << 8 | N2, u2 >= l2 + 1 && c2 < 12 && (++c2, l2 = l2 << 1 | 1)), m2 = v2;
    } else u2 = s2 + 1, l2 = (1 << (c2 = a2 + 1)) - 1, m2 = null;
  }
  return d2 !== n2 && i.log("Warning, gif stream shorter than expected."), r2;
}
function Kt(t) {
  var e, r2, n2, i2, a2, o2 = Math.floor, s2 = new Array(64), u2 = new Array(64), c2 = new Array(64), l2 = new Array(64), h2 = new Array(65535), f2 = new Array(65535), d2 = new Array(64), p2 = new Array(64), g2 = [], m2 = 0, v2 = 7, b2 = new Array(64), y2 = new Array(64), w2 = new Array(64), N2 = new Array(256), L2 = new Array(2048), A2 = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63], x2 = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], S2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], _2 = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125], P2 = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250], k2 = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], I2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], F2 = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119], C2 = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];
  function j2(t2, e2) {
    for (var r3 = 0, n3 = 0, i3 = new Array(), a3 = 1; a3 <= 16; a3++) {
      for (var o3 = 1; o3 <= t2[a3]; o3++) i3[e2[n3]] = [], i3[e2[n3]][0] = r3, i3[e2[n3]][1] = a3, n3++, r3++;
      r3 *= 2;
    }
    return i3;
  }
  function O2(t2) {
    for (var e2 = t2[0], r3 = t2[1] - 1; r3 >= 0; ) e2 & 1 << r3 && (m2 |= 1 << v2), r3--, --v2 < 0 && (255 == m2 ? (B2(255), B2(0)) : B2(m2), v2 = 7, m2 = 0);
  }
  function B2(t2) {
    g2.push(t2);
  }
  function M2(t2) {
    B2(t2 >> 8 & 255), B2(255 & t2);
  }
  function E2(t2, e2, r3, n3, i3) {
    for (var a3, o3 = i3[0], s3 = i3[240], u3 = function(t3, e3) {
      var r4, n4, i4, a4, o4, s4, u4, c4, l4, h3, f3 = 0;
      for (l4 = 0; l4 < 8; ++l4) {
        r4 = t3[f3], n4 = t3[f3 + 1], i4 = t3[f3 + 2], a4 = t3[f3 + 3], o4 = t3[f3 + 4], s4 = t3[f3 + 5], u4 = t3[f3 + 6];
        var p3 = r4 + (c4 = t3[f3 + 7]), g4 = r4 - c4, m4 = n4 + u4, v4 = n4 - u4, b4 = i4 + s4, y4 = i4 - s4, w4 = a4 + o4, N3 = a4 - o4, L3 = p3 + w4, A3 = p3 - w4, x3 = m4 + b4, S3 = m4 - b4;
        t3[f3] = L3 + x3, t3[f3 + 4] = L3 - x3;
        var _3 = 0.707106781 * (S3 + A3);
        t3[f3 + 2] = A3 + _3, t3[f3 + 6] = A3 - _3;
        var P3 = 0.382683433 * ((L3 = N3 + y4) - (S3 = v4 + g4)), k3 = 0.5411961 * L3 + P3, I3 = 1.306562965 * S3 + P3, F3 = 0.707106781 * (x3 = y4 + v4), C3 = g4 + F3, j3 = g4 - F3;
        t3[f3 + 5] = j3 + k3, t3[f3 + 3] = j3 - k3, t3[f3 + 1] = C3 + I3, t3[f3 + 7] = C3 - I3, f3 += 8;
      }
      for (f3 = 0, l4 = 0; l4 < 8; ++l4) {
        r4 = t3[f3], n4 = t3[f3 + 8], i4 = t3[f3 + 16], a4 = t3[f3 + 24], o4 = t3[f3 + 32], s4 = t3[f3 + 40], u4 = t3[f3 + 48];
        var O3 = r4 + (c4 = t3[f3 + 56]), B3 = r4 - c4, M3 = n4 + u4, E3 = n4 - u4, q3 = i4 + s4, R2 = i4 - s4, T2 = a4 + o4, D2 = a4 - o4, U2 = O3 + T2, z2 = O3 - T2, H2 = M3 + q3, V2 = M3 - q3;
        t3[f3] = U2 + H2, t3[f3 + 32] = U2 - H2;
        var W2 = 0.707106781 * (V2 + z2);
        t3[f3 + 16] = z2 + W2, t3[f3 + 48] = z2 - W2;
        var G2 = 0.382683433 * ((U2 = D2 + R2) - (V2 = E3 + B3)), Y2 = 0.5411961 * U2 + G2, J2 = 1.306562965 * V2 + G2, X2 = 0.707106781 * (H2 = R2 + E3), K2 = B3 + X2, Z2 = B3 - X2;
        t3[f3 + 40] = Z2 + Y2, t3[f3 + 24] = Z2 - Y2, t3[f3 + 8] = K2 + J2, t3[f3 + 56] = K2 - J2, f3++;
      }
      for (l4 = 0; l4 < 64; ++l4) h3 = t3[l4] * e3[l4], d2[l4] = h3 > 0 ? h3 + 0.5 | 0 : h3 - 0.5 | 0;
      return d2;
    }(t2, e2), c3 = 0; c3 < 64; ++c3) p2[A2[c3]] = u3[c3];
    var l3 = p2[0] - r3;
    r3 = p2[0], 0 == l3 ? O2(n3[0]) : (O2(n3[f2[a3 = 32767 + l3]]), O2(h2[a3]));
    for (var g3 = 63; g3 > 0 && 0 == p2[g3]; ) g3--;
    if (0 == g3) return O2(o3), r3;
    for (var m3, v3 = 1; v3 <= g3; ) {
      for (var b3 = v3; 0 == p2[v3] && v3 <= g3; ) ++v3;
      var y3 = v3 - b3;
      if (y3 >= 16) {
        m3 = y3 >> 4;
        for (var w3 = 1; w3 <= m3; ++w3) O2(s3);
        y3 &= 15;
      }
      a3 = 32767 + p2[v3], O2(i3[(y3 << 4) + f2[a3]]), O2(h2[a3]), v3++;
    }
    return 63 != g3 && O2(o3), r3;
  }
  function q2(t2) {
    (t2 = Math.min(Math.max(t2, 1), 100), a2 != t2) && (!function(t3) {
      for (var e2 = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], r3 = 0; r3 < 64; r3++) {
        var n3 = o2((e2[r3] * t3 + 50) / 100);
        n3 = Math.min(Math.max(n3, 1), 255), s2[A2[r3]] = n3;
      }
      for (var i3 = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], a3 = 0; a3 < 64; a3++) {
        var h3 = o2((i3[a3] * t3 + 50) / 100);
        h3 = Math.min(Math.max(h3, 1), 255), u2[A2[a3]] = h3;
      }
      for (var f3 = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379], d3 = 0, p3 = 0; p3 < 8; p3++) for (var g3 = 0; g3 < 8; g3++) c2[d3] = 1 / (s2[A2[d3]] * f3[p3] * f3[g3] * 8), l2[d3] = 1 / (u2[A2[d3]] * f3[p3] * f3[g3] * 8), d3++;
    }(t2 < 50 ? Math.floor(5e3 / t2) : Math.floor(200 - 2 * t2)), a2 = t2);
  }
  this.encode = function(t2, a3) {
    a3 && q2(a3), g2 = new Array(), m2 = 0, v2 = 7, M2(65496), M2(65504), M2(16), B2(74), B2(70), B2(73), B2(70), B2(0), B2(1), B2(1), B2(0), M2(1), M2(1), B2(0), B2(0), function() {
      M2(65499), M2(132), B2(0);
      for (var t3 = 0; t3 < 64; t3++) B2(s2[t3]);
      B2(1);
      for (var e2 = 0; e2 < 64; e2++) B2(u2[e2]);
    }(), function(t3, e2) {
      M2(65472), M2(17), B2(8), M2(e2), M2(t3), B2(3), B2(1), B2(17), B2(0), B2(2), B2(17), B2(1), B2(3), B2(17), B2(1);
    }(t2.width, t2.height), function() {
      M2(65476), M2(418), B2(0);
      for (var t3 = 0; t3 < 16; t3++) B2(x2[t3 + 1]);
      for (var e2 = 0; e2 <= 11; e2++) B2(S2[e2]);
      B2(16);
      for (var r3 = 0; r3 < 16; r3++) B2(_2[r3 + 1]);
      for (var n3 = 0; n3 <= 161; n3++) B2(P2[n3]);
      B2(1);
      for (var i3 = 0; i3 < 16; i3++) B2(k2[i3 + 1]);
      for (var a4 = 0; a4 <= 11; a4++) B2(I2[a4]);
      B2(17);
      for (var o4 = 0; o4 < 16; o4++) B2(F2[o4 + 1]);
      for (var s3 = 0; s3 <= 161; s3++) B2(C2[s3]);
    }(), M2(65498), M2(12), B2(3), B2(1), B2(0), B2(2), B2(17), B2(3), B2(17), B2(0), B2(63), B2(0);
    var o3 = 0, h3 = 0, f3 = 0;
    m2 = 0, v2 = 7, this.encode.displayName = "_encode_";
    for (var d3, p3, N3, A3, j3, R2, T2, D2, U2, z2 = t2.data, H2 = t2.width, V2 = t2.height, W2 = 4 * H2, G2 = 0; G2 < V2; ) {
      for (d3 = 0; d3 < W2; ) {
        for (j3 = W2 * G2 + d3, T2 = -1, D2 = 0, U2 = 0; U2 < 64; U2++) R2 = j3 + (D2 = U2 >> 3) * W2 + (T2 = 4 * (7 & U2)), G2 + D2 >= V2 && (R2 -= W2 * (G2 + 1 + D2 - V2)), d3 + T2 >= W2 && (R2 -= d3 + T2 - W2 + 4), p3 = z2[R2++], N3 = z2[R2++], A3 = z2[R2++], b2[U2] = (L2[p3] + L2[N3 + 256 >> 0] + L2[A3 + 512 >> 0] >> 16) - 128, y2[U2] = (L2[p3 + 768 >> 0] + L2[N3 + 1024 >> 0] + L2[A3 + 1280 >> 0] >> 16) - 128, w2[U2] = (L2[p3 + 1280 >> 0] + L2[N3 + 1536 >> 0] + L2[A3 + 1792 >> 0] >> 16) - 128;
        o3 = E2(b2, c2, o3, e, n2), h3 = E2(y2, l2, h3, r2, i2), f3 = E2(w2, l2, f3, r2, i2), d3 += 32;
      }
      G2 += 8;
    }
    if (v2 >= 0) {
      var Y2 = [];
      Y2[1] = v2 + 1, Y2[0] = (1 << v2 + 1) - 1, O2(Y2);
    }
    return M2(65497), new Uint8Array(g2);
  }, t = t || 50, function() {
    for (var t2 = String.fromCharCode, e2 = 0; e2 < 256; e2++) N2[e2] = t2(e2);
  }(), e = j2(x2, S2), r2 = j2(k2, I2), n2 = j2(_2, P2), i2 = j2(F2, C2), function() {
    for (var t2 = 1, e2 = 2, r3 = 1; r3 <= 15; r3++) {
      for (var n3 = t2; n3 < e2; n3++) f2[32767 + n3] = r3, h2[32767 + n3] = [], h2[32767 + n3][1] = r3, h2[32767 + n3][0] = n3;
      for (var i3 = -(e2 - 1); i3 <= -t2; i3++) f2[32767 + i3] = r3, h2[32767 + i3] = [], h2[32767 + i3][1] = r3, h2[32767 + i3][0] = e2 - 1 + i3;
      t2 <<= 1, e2 <<= 1;
    }
  }(), function() {
    for (var t2 = 0; t2 < 256; t2++) L2[t2] = 19595 * t2, L2[t2 + 256 >> 0] = 38470 * t2, L2[t2 + 512 >> 0] = 7471 * t2 + 32768, L2[t2 + 768 >> 0] = -11059 * t2, L2[t2 + 1024 >> 0] = -21709 * t2, L2[t2 + 1280 >> 0] = 32768 * t2 + 8421375, L2[t2 + 1536 >> 0] = -27439 * t2, L2[t2 + 1792 >> 0] = -5329 * t2;
  }(), q2(t);
}
function Zt(t, e) {
  if (this.pos = 0, this.buffer = t, this.datav = new DataView(t.buffer), this.is_with_alpha = !!e, this.bottom_up = true, this.flag = String.fromCharCode(this.buffer[0]) + String.fromCharCode(this.buffer[1]), this.pos += 2, -1 === ["BM", "BA", "CI", "CP", "IC", "PT"].indexOf(this.flag)) throw new Error("Invalid BMP File");
  this.parseHeader(), this.parseBGR();
}
function $t(t) {
  function e(t2) {
    if (!t2) throw Error("assert :P");
  }
  function r2(t2, e2, r3) {
    for (var n3 = 0; 4 > n3; n3++) if (t2[e2 + n3] != r3.charCodeAt(n3)) return true;
    return false;
  }
  function n2(t2, e2, r3, n3, i3) {
    for (var a3 = 0; a3 < i3; a3++) t2[e2 + a3] = r3[n3 + a3];
  }
  function i2(t2, e2, r3, n3) {
    for (var i3 = 0; i3 < n3; i3++) t2[e2 + i3] = r3;
  }
  function a2(t2) {
    return new Int32Array(t2);
  }
  function o2(t2, e2) {
    for (var r3 = [], n3 = 0; n3 < t2; n3++) r3.push(new e2());
    return r3;
  }
  function s2(t2, e2) {
    var r3 = [];
    return function t3(r4, n3, i3) {
      for (var a3 = i3[n3], o3 = 0; o3 < a3 && (r4.push(i3.length > n3 + 1 ? [] : new e2()), !(i3.length < n3 + 1)); o3++) t3(r4[o3], n3 + 1, i3);
    }(r3, 0, t2), r3;
  }
  function u2(t2, e2) {
    for (var r3 = "", n3 = 0; n3 < 4; n3++) r3 += String.fromCharCode(t2[e2++]);
    return r3;
  }
  function c2(t2, e2) {
    return (t2[e2 + 0] << 0 | t2[e2 + 1] << 8 | t2[e2 + 2] << 16) >>> 0;
  }
  function l2(t2, e2) {
    return (t2[e2 + 0] << 0 | t2[e2 + 1] << 8 | t2[e2 + 2] << 16 | t2[e2 + 3] << 24) >>> 0;
  }
  new ($t = function() {
    var t2 = this;
    function u3(t3, e2) {
      for (var r3 = 1 << e2 - 1 >>> 0; t3 & r3; ) r3 >>>= 1;
      return r3 ? (t3 & r3 - 1) + r3 : t3;
    }
    function c3(t3, r3, n3, i3, a3) {
      e(!(i3 % n3));
      do {
        t3[r3 + (i3 -= n3)] = a3;
      } while (0 < i3);
    }
    function l3(t3, r3, n3, i3, o3) {
      if (e(2328 >= o3), 512 >= o3) var s3 = a2(512);
      else if (null == (s3 = a2(o3))) return 0;
      return function(t4, r4, n4, i4, o4, s4) {
        var l4, f4, d4 = r4, p4 = 1 << n4, g4 = a2(16), m4 = a2(16);
        for (e(0 != o4), e(null != i4), e(null != t4), e(0 < n4), f4 = 0; f4 < o4; ++f4) {
          if (15 < i4[f4]) return 0;
          ++g4[i4[f4]];
        }
        if (g4[0] == o4) return 0;
        for (m4[1] = 0, l4 = 1; 15 > l4; ++l4) {
          if (g4[l4] > 1 << l4) return 0;
          m4[l4 + 1] = m4[l4] + g4[l4];
        }
        for (f4 = 0; f4 < o4; ++f4) l4 = i4[f4], 0 < i4[f4] && (s4[m4[l4]++] = f4);
        if (1 == m4[15]) return (i4 = new h3()).g = 0, i4.value = s4[0], c3(t4, d4, 1, p4, i4), p4;
        var v4, b4 = -1, y4 = p4 - 1, w4 = 0, N4 = 1, L4 = 1, A3 = 1 << n4;
        for (f4 = 0, l4 = 1, o4 = 2; l4 <= n4; ++l4, o4 <<= 1) {
          if (N4 += L4 <<= 1, 0 > (L4 -= g4[l4])) return 0;
          for (; 0 < g4[l4]; --g4[l4]) (i4 = new h3()).g = l4, i4.value = s4[f4++], c3(t4, d4 + w4, o4, A3, i4), w4 = u3(w4, l4);
        }
        for (l4 = n4 + 1, o4 = 2; 15 >= l4; ++l4, o4 <<= 1) {
          if (N4 += L4 <<= 1, 0 > (L4 -= g4[l4])) return 0;
          for (; 0 < g4[l4]; --g4[l4]) {
            if (i4 = new h3(), (w4 & y4) != b4) {
              for (d4 += A3, v4 = 1 << (b4 = l4) - n4; 15 > b4 && !(0 >= (v4 -= g4[b4])); ) ++b4, v4 <<= 1;
              p4 += A3 = 1 << (v4 = b4 - n4), t4[r4 + (b4 = w4 & y4)].g = v4 + n4, t4[r4 + b4].value = d4 - r4 - b4;
            }
            i4.g = l4 - n4, i4.value = s4[f4++], c3(t4, d4 + (w4 >> n4), o4, A3, i4), w4 = u3(w4, l4);
          }
        }
        return N4 != 2 * m4[15] - 1 ? 0 : p4;
      }(t3, r3, n3, i3, o3, s3);
    }
    function h3() {
      this.value = this.g = 0;
    }
    function f3() {
      this.value = this.g = 0;
    }
    function d3() {
      this.G = o2(5, h3), this.H = a2(5), this.jc = this.Qb = this.qb = this.nd = 0, this.pd = o2(Rr, f3);
    }
    function p3(t3, r3, n3, i3) {
      e(null != t3), e(null != r3), e(2147483648 > i3), t3.Ca = 254, t3.I = 0, t3.b = -8, t3.Ka = 0, t3.oa = r3, t3.pa = n3, t3.Jd = r3, t3.Yc = n3 + i3, t3.Zc = 4 <= i3 ? n3 + i3 - 4 + 1 : n3, _2(t3);
    }
    function g3(t3, e2) {
      for (var r3 = 0; 0 < e2--; ) r3 |= k2(t3, 128) << e2;
      return r3;
    }
    function m3(t3, e2) {
      var r3 = g3(t3, e2);
      return P2(t3) ? -r3 : r3;
    }
    function v3(t3, r3, n3, i3) {
      var a3, o3 = 0;
      for (e(null != t3), e(null != r3), e(4294967288 > i3), t3.Sb = i3, t3.Ra = 0, t3.u = 0, t3.h = 0, 4 < i3 && (i3 = 4), a3 = 0; a3 < i3; ++a3) o3 += r3[n3 + a3] << 8 * a3;
      t3.Ra = o3, t3.bb = i3, t3.oa = r3, t3.pa = n3;
    }
    function b3(t3) {
      for (; 8 <= t3.u && t3.bb < t3.Sb; ) t3.Ra >>>= 8, t3.Ra += t3.oa[t3.pa + t3.bb] << Ur - 8 >>> 0, ++t3.bb, t3.u -= 8;
      A2(t3) && (t3.h = 1, t3.u = 0);
    }
    function y3(t3, r3) {
      if (e(0 <= r3), !t3.h && r3 <= Dr) {
        var n3 = L3(t3) & Tr[r3];
        return t3.u += r3, b3(t3), n3;
      }
      return t3.h = 1, t3.u = 0;
    }
    function w3() {
      this.b = this.Ca = this.I = 0, this.oa = [], this.pa = 0, this.Jd = [], this.Yc = 0, this.Zc = [], this.Ka = 0;
    }
    function N3() {
      this.Ra = 0, this.oa = [], this.h = this.u = this.bb = this.Sb = this.pa = 0;
    }
    function L3(t3) {
      return t3.Ra >>> (t3.u & Ur - 1) >>> 0;
    }
    function A2(t3) {
      return e(t3.bb <= t3.Sb), t3.h || t3.bb == t3.Sb && t3.u > Ur;
    }
    function x2(t3, e2) {
      t3.u = e2, t3.h = A2(t3);
    }
    function S2(t3) {
      t3.u >= zr && (e(t3.u >= zr), b3(t3));
    }
    function _2(t3) {
      e(null != t3 && null != t3.oa), t3.pa < t3.Zc ? (t3.I = (t3.oa[t3.pa++] | t3.I << 8) >>> 0, t3.b += 8) : (e(null != t3 && null != t3.oa), t3.pa < t3.Yc ? (t3.b += 8, t3.I = t3.oa[t3.pa++] | t3.I << 8) : t3.Ka ? t3.b = 0 : (t3.I <<= 8, t3.b += 8, t3.Ka = 1));
    }
    function P2(t3) {
      return g3(t3, 1);
    }
    function k2(t3, e2) {
      var r3 = t3.Ca;
      0 > t3.b && _2(t3);
      var n3 = t3.b, i3 = r3 * e2 >>> 8, a3 = (t3.I >>> n3 > i3) + 0;
      for (a3 ? (r3 -= i3, t3.I -= i3 + 1 << n3 >>> 0) : r3 = i3 + 1, n3 = r3, i3 = 0; 256 <= n3; ) i3 += 8, n3 >>= 8;
      return n3 = 7 ^ i3 + Hr[n3], t3.b -= n3, t3.Ca = (r3 << n3) - 1, a3;
    }
    function I2(t3, e2, r3) {
      t3[e2 + 0] = r3 >> 24 & 255, t3[e2 + 1] = r3 >> 16 & 255, t3[e2 + 2] = r3 >> 8 & 255, t3[e2 + 3] = r3 >> 0 & 255;
    }
    function F2(t3, e2) {
      return t3[e2 + 0] << 0 | t3[e2 + 1] << 8;
    }
    function C2(t3, e2) {
      return F2(t3, e2) | t3[e2 + 2] << 16;
    }
    function j2(t3, e2) {
      return F2(t3, e2) | F2(t3, e2 + 2) << 16;
    }
    function O2(t3, r3) {
      var n3 = 1 << r3;
      return e(null != t3), e(0 < r3), t3.X = a2(n3), null == t3.X ? 0 : (t3.Mb = 32 - r3, t3.Xa = r3, 1);
    }
    function B2(t3, r3) {
      e(null != t3), e(null != r3), e(t3.Xa == r3.Xa), n2(r3.X, 0, t3.X, 0, 1 << r3.Xa);
    }
    function M2() {
      this.X = [], this.Xa = this.Mb = 0;
    }
    function E2(t3, r3, n3, i3) {
      e(null != n3), e(null != i3);
      var a3 = n3[0], o3 = i3[0];
      return 0 == a3 && (a3 = (t3 * o3 + r3 / 2) / r3), 0 == o3 && (o3 = (r3 * a3 + t3 / 2) / t3), 0 >= a3 || 0 >= o3 ? 0 : (n3[0] = a3, i3[0] = o3, 1);
    }
    function q2(t3, e2) {
      return t3 + (1 << e2) - 1 >>> e2;
    }
    function R2(t3, e2) {
      return ((4278255360 & t3) + (4278255360 & e2) >>> 0 & 4278255360) + ((16711935 & t3) + (16711935 & e2) >>> 0 & 16711935) >>> 0;
    }
    function T2(e2, r3) {
      t2[r3] = function(r4, n3, i3, a3, o3, s3, u4) {
        var c4;
        for (c4 = 0; c4 < o3; ++c4) {
          var l4 = t2[e2](s3[u4 + c4 - 1], i3, a3 + c4);
          s3[u4 + c4] = R2(r4[n3 + c4], l4);
        }
      };
    }
    function D2() {
      this.ud = this.hd = this.jd = 0;
    }
    function U2(t3, e2) {
      return ((4278124286 & (t3 ^ e2)) >>> 1) + (t3 & e2) >>> 0;
    }
    function z2(t3) {
      return 0 <= t3 && 256 > t3 ? t3 : 0 > t3 ? 0 : 255 < t3 ? 255 : void 0;
    }
    function H2(t3, e2) {
      return z2(t3 + (t3 - e2 + 0.5 >> 1));
    }
    function V2(t3, e2, r3) {
      return Math.abs(e2 - r3) - Math.abs(t3 - r3);
    }
    function W2(t3, e2, r3, n3, i3, a3, o3) {
      for (n3 = a3[o3 - 1], r3 = 0; r3 < i3; ++r3) a3[o3 + r3] = n3 = R2(t3[e2 + r3], n3);
    }
    function G2(t3, e2, r3, n3, i3) {
      var a3;
      for (a3 = 0; a3 < r3; ++a3) {
        var o3 = t3[e2 + a3], s3 = o3 >> 8 & 255, u4 = 16711935 & (u4 = (u4 = 16711935 & o3) + ((s3 << 16) + s3));
        n3[i3 + a3] = (4278255360 & o3) + u4 >>> 0;
      }
    }
    function Y2(t3, e2) {
      e2.jd = t3 >> 0 & 255, e2.hd = t3 >> 8 & 255, e2.ud = t3 >> 16 & 255;
    }
    function J2(t3, e2, r3, n3, i3, a3) {
      var o3;
      for (o3 = 0; o3 < n3; ++o3) {
        var s3 = e2[r3 + o3], u4 = s3 >>> 8, c4 = s3, l4 = 255 & (l4 = (l4 = s3 >>> 16) + ((t3.jd << 24 >> 24) * (u4 << 24 >> 24) >>> 5));
        c4 = 255 & (c4 = (c4 = c4 + ((t3.hd << 24 >> 24) * (u4 << 24 >> 24) >>> 5)) + ((t3.ud << 24 >> 24) * (l4 << 24 >> 24) >>> 5));
        i3[a3 + o3] = (4278255360 & s3) + (l4 << 16) + c4;
      }
    }
    function X2(e2, r3, n3, i3, a3) {
      t2[r3] = function(t3, e3, r4, n4, o3, s3, u4, c4, l4) {
        for (n4 = u4; n4 < c4; ++n4) for (u4 = 0; u4 < l4; ++u4) o3[s3++] = a3(r4[i3(t3[e3++])]);
      }, t2[e2] = function(e3, r4, o3, s3, u4, c4, l4) {
        var h4 = 8 >> e3.b, f4 = e3.Ea, d4 = e3.K[0], p4 = e3.w;
        if (8 > h4) for (e3 = (1 << e3.b) - 1, p4 = (1 << h4) - 1; r4 < o3; ++r4) {
          var g4, m4 = 0;
          for (g4 = 0; g4 < f4; ++g4) g4 & e3 || (m4 = i3(s3[u4++])), c4[l4++] = a3(d4[m4 & p4]), m4 >>= h4;
        }
        else t2["VP8LMapColor" + n3](s3, u4, d4, p4, c4, l4, r4, o3, f4);
      };
    }
    function K2(t3, e2, r3, n3, i3) {
      for (r3 = e2 + r3; e2 < r3; ) {
        var a3 = t3[e2++];
        n3[i3++] = a3 >> 16 & 255, n3[i3++] = a3 >> 8 & 255, n3[i3++] = a3 >> 0 & 255;
      }
    }
    function Z2(t3, e2, r3, n3, i3) {
      for (r3 = e2 + r3; e2 < r3; ) {
        var a3 = t3[e2++];
        n3[i3++] = a3 >> 16 & 255, n3[i3++] = a3 >> 8 & 255, n3[i3++] = a3 >> 0 & 255, n3[i3++] = a3 >> 24 & 255;
      }
    }
    function $2(t3, e2, r3, n3, i3) {
      for (r3 = e2 + r3; e2 < r3; ) {
        var a3 = (o3 = t3[e2++]) >> 16 & 240 | o3 >> 12 & 15, o3 = o3 >> 0 & 240 | o3 >> 28 & 15;
        n3[i3++] = a3, n3[i3++] = o3;
      }
    }
    function Q2(t3, e2, r3, n3, i3) {
      for (r3 = e2 + r3; e2 < r3; ) {
        var a3 = (o3 = t3[e2++]) >> 16 & 248 | o3 >> 13 & 7, o3 = o3 >> 5 & 224 | o3 >> 3 & 31;
        n3[i3++] = a3, n3[i3++] = o3;
      }
    }
    function tt2(t3, e2, r3, n3, i3) {
      for (r3 = e2 + r3; e2 < r3; ) {
        var a3 = t3[e2++];
        n3[i3++] = a3 >> 0 & 255, n3[i3++] = a3 >> 8 & 255, n3[i3++] = a3 >> 16 & 255;
      }
    }
    function et3(t3, e2, r3, i3, a3, o3) {
      if (0 == o3) for (r3 = e2 + r3; e2 < r3; ) I2(i3, ((o3 = t3[e2++])[0] >> 24 | o3[1] >> 8 & 65280 | o3[2] << 8 & 16711680 | o3[3] << 24) >>> 0), a3 += 32;
      else n2(i3, a3, t3, e2, r3);
    }
    function rt2(e2, r3) {
      t2[r3][0] = t2[e2 + "0"], t2[r3][1] = t2[e2 + "1"], t2[r3][2] = t2[e2 + "2"], t2[r3][3] = t2[e2 + "3"], t2[r3][4] = t2[e2 + "4"], t2[r3][5] = t2[e2 + "5"], t2[r3][6] = t2[e2 + "6"], t2[r3][7] = t2[e2 + "7"], t2[r3][8] = t2[e2 + "8"], t2[r3][9] = t2[e2 + "9"], t2[r3][10] = t2[e2 + "10"], t2[r3][11] = t2[e2 + "11"], t2[r3][12] = t2[e2 + "12"], t2[r3][13] = t2[e2 + "13"], t2[r3][14] = t2[e2 + "0"], t2[r3][15] = t2[e2 + "0"];
    }
    function nt2(t3) {
      return t3 == Hn || t3 == Vn || t3 == Wn || t3 == Gn;
    }
    function it2() {
      this.eb = [], this.size = this.A = this.fb = 0;
    }
    function at2() {
      this.y = [], this.f = [], this.ea = [], this.F = [], this.Tc = this.Ed = this.Cd = this.Fd = this.lb = this.Db = this.Ab = this.fa = this.J = this.W = this.N = this.O = 0;
    }
    function ot2() {
      this.Rd = this.height = this.width = this.S = 0, this.f = {}, this.f.RGBA = new it2(), this.f.kb = new at2(), this.sd = null;
    }
    function st2() {
      this.width = [0], this.height = [0], this.Pd = [0], this.Qd = [0], this.format = [0];
    }
    function ut2() {
      this.Id = this.fd = this.Md = this.hb = this.ib = this.da = this.bd = this.cd = this.j = this.v = this.Da = this.Sd = this.ob = 0;
    }
    function ct2(t3) {
      return alert("todo:WebPSamplerProcessPlane"), t3.T;
    }
    function lt2(t3, e2) {
      var r3 = t3.T, i3 = e2.ba.f.RGBA, a3 = i3.eb, o3 = i3.fb + t3.ka * i3.A, s3 = vi[e2.ba.S], u4 = t3.y, c4 = t3.O, l4 = t3.f, h4 = t3.N, f4 = t3.ea, d4 = t3.W, p4 = e2.cc, g4 = e2.dc, m4 = e2.Mc, v4 = e2.Nc, b4 = t3.ka, y4 = t3.ka + t3.T, w4 = t3.U, N4 = w4 + 1 >> 1;
      for (0 == b4 ? s3(u4, c4, null, null, l4, h4, f4, d4, l4, h4, f4, d4, a3, o3, null, null, w4) : (s3(e2.ec, e2.fc, u4, c4, p4, g4, m4, v4, l4, h4, f4, d4, a3, o3 - i3.A, a3, o3, w4), ++r3); b4 + 2 < y4; b4 += 2) p4 = l4, g4 = h4, m4 = f4, v4 = d4, h4 += t3.Rc, d4 += t3.Rc, o3 += 2 * i3.A, s3(u4, (c4 += 2 * t3.fa) - t3.fa, u4, c4, p4, g4, m4, v4, l4, h4, f4, d4, a3, o3 - i3.A, a3, o3, w4);
      return c4 += t3.fa, t3.j + y4 < t3.o ? (n2(e2.ec, e2.fc, u4, c4, w4), n2(e2.cc, e2.dc, l4, h4, N4), n2(e2.Mc, e2.Nc, f4, d4, N4), r3--) : 1 & y4 || s3(u4, c4, null, null, l4, h4, f4, d4, l4, h4, f4, d4, a3, o3 + i3.A, null, null, w4), r3;
    }
    function ht2(t3, r3, n3) {
      var i3 = t3.F, a3 = [t3.J];
      if (null != i3) {
        var o3 = t3.U, s3 = r3.ba.S, u4 = s3 == Dn || s3 == Wn;
        r3 = r3.ba.f.RGBA;
        var c4 = [0], l4 = t3.ka;
        c4[0] = t3.T, t3.Kb && (0 == l4 ? --c4[0] : (--l4, a3[0] -= t3.width), t3.j + t3.ka + t3.T == t3.o && (c4[0] = t3.o - t3.j - l4));
        var h4 = r3.eb;
        l4 = r3.fb + l4 * r3.A;
        t3 = Sn(i3, a3[0], t3.width, o3, c4, h4, l4 + (u4 ? 0 : 3), r3.A), e(n3 == c4), t3 && nt2(s3) && An(h4, l4, u4, o3, c4, r3.A);
      }
      return 0;
    }
    function ft2(t3) {
      var e2 = t3.ma, r3 = e2.ba.S, n3 = 11 > r3, i3 = r3 == qn || r3 == Tn || r3 == Dn || r3 == Un || 12 == r3 || nt2(r3);
      if (e2.memory = null, e2.Ib = null, e2.Jb = null, e2.Nd = null, !Mr(e2.Oa, t3, i3 ? 11 : 12)) return 0;
      if (i3 && nt2(r3) && br(), t3.da) alert("todo:use_scaling");
      else {
        if (n3) {
          if (e2.Ib = ct2, t3.Kb) {
            if (r3 = t3.U + 1 >> 1, e2.memory = a2(t3.U + 2 * r3), null == e2.memory) return 0;
            e2.ec = e2.memory, e2.fc = 0, e2.cc = e2.ec, e2.dc = e2.fc + t3.U, e2.Mc = e2.cc, e2.Nc = e2.dc + r3, e2.Ib = lt2, br();
          }
        } else alert("todo:EmitYUV");
        i3 && (e2.Jb = ht2, n3 && mr());
      }
      if (n3 && !Ci) {
        for (t3 = 0; 256 > t3; ++t3) ji[t3] = 89858 * (t3 - 128) + _i >> Si, Mi[t3] = -22014 * (t3 - 128) + _i, Bi[t3] = -45773 * (t3 - 128), Oi[t3] = 113618 * (t3 - 128) + _i >> Si;
        for (t3 = Pi; t3 < ki; ++t3) e2 = 76283 * (t3 - 16) + _i >> Si, Ei[t3 - Pi] = Wt2(e2, 255), qi[t3 - Pi] = Wt2(e2 + 8 >> 4, 15);
        Ci = 1;
      }
      return 1;
    }
    function dt2(t3) {
      var r3 = t3.ma, n3 = t3.U, i3 = t3.T;
      return e(!(1 & t3.ka)), 0 >= n3 || 0 >= i3 ? 0 : (n3 = r3.Ib(t3, r3), null != r3.Jb && r3.Jb(t3, r3, n3), r3.Dc += n3, 1);
    }
    function pt2(t3) {
      t3.ma.memory = null;
    }
    function gt2(t3, e2, r3, n3) {
      return 47 != y3(t3, 8) ? 0 : (e2[0] = y3(t3, 14) + 1, r3[0] = y3(t3, 14) + 1, n3[0] = y3(t3, 1), 0 != y3(t3, 3) ? 0 : !t3.h);
    }
    function mt2(t3, e2) {
      if (4 > t3) return t3 + 1;
      var r3 = t3 - 2 >> 1;
      return (2 + (1 & t3) << r3) + y3(e2, r3) + 1;
    }
    function vt2(t3, e2) {
      return 120 < e2 ? e2 - 120 : 1 <= (r3 = ((r3 = $n[e2 - 1]) >> 4) * t3 + (8 - (15 & r3))) ? r3 : 1;
      var r3;
    }
    function bt2(t3, e2, r3) {
      var n3 = L3(r3), i3 = t3[e2 += 255 & n3].g - 8;
      return 0 < i3 && (x2(r3, r3.u + 8), n3 = L3(r3), e2 += t3[e2].value, e2 += n3 & (1 << i3) - 1), x2(r3, r3.u + t3[e2].g), t3[e2].value;
    }
    function yt2(t3, r3, n3) {
      return n3.g += t3.g, n3.value += t3.value << r3 >>> 0, e(8 >= n3.g), t3.g;
    }
    function wt2(t3, r3, n3) {
      var i3 = t3.xc;
      return e((r3 = 0 == i3 ? 0 : t3.vc[t3.md * (n3 >> i3) + (r3 >> i3)]) < t3.Wb), t3.Ya[r3];
    }
    function Nt2(t3, r3, i3, a3) {
      var o3 = t3.ab, s3 = t3.c * r3, u4 = t3.C;
      r3 = u4 + r3;
      var c4 = i3, l4 = a3;
      for (a3 = t3.Ta, i3 = t3.Ua; 0 < o3--; ) {
        var h4 = t3.gc[o3], f4 = u4, d4 = r3, p4 = c4, g4 = l4, m4 = (l4 = a3, c4 = i3, h4.Ea);
        switch (e(f4 < d4), e(d4 <= h4.nc), h4.hc) {
          case 2:
            Gr(p4, g4, (d4 - f4) * m4, l4, c4);
            break;
          case 0:
            var v4 = f4, b4 = d4, y4 = l4, w4 = c4, N4 = (_3 = h4).Ea;
            0 == v4 && (Vr(p4, g4, null, null, 1, y4, w4), W2(p4, g4 + 1, 0, 0, N4 - 1, y4, w4 + 1), g4 += N4, w4 += N4, ++v4);
            for (var L4 = 1 << _3.b, A3 = L4 - 1, x3 = q2(N4, _3.b), S3 = _3.K, _3 = _3.w + (v4 >> _3.b) * x3; v4 < b4; ) {
              var P3 = S3, k3 = _3, I3 = 1;
              for (Wr(p4, g4, y4, w4 - N4, 1, y4, w4); I3 < N4; ) {
                var F3 = (I3 & ~A3) + L4;
                F3 > N4 && (F3 = N4), (0, Zr[P3[k3++] >> 8 & 15])(p4, g4 + +I3, y4, w4 + I3 - N4, F3 - I3, y4, w4 + I3), I3 = F3;
              }
              g4 += N4, w4 += N4, ++v4 & A3 || (_3 += x3);
            }
            d4 != h4.nc && n2(l4, c4 - m4, l4, c4 + (d4 - f4 - 1) * m4, m4);
            break;
          case 1:
            for (m4 = p4, b4 = g4, N4 = (p4 = h4.Ea) - (w4 = p4 & ~(y4 = (g4 = 1 << h4.b) - 1)), v4 = q2(p4, h4.b), L4 = h4.K, h4 = h4.w + (f4 >> h4.b) * v4; f4 < d4; ) {
              for (A3 = L4, x3 = h4, S3 = new D2(), _3 = b4 + w4, P3 = b4 + p4; b4 < _3; ) Y2(A3[x3++], S3), $r(S3, m4, b4, g4, l4, c4), b4 += g4, c4 += g4;
              b4 < P3 && (Y2(A3[x3++], S3), $r(S3, m4, b4, N4, l4, c4), b4 += N4, c4 += N4), ++f4 & y4 || (h4 += v4);
            }
            break;
          case 3:
            if (p4 == l4 && g4 == c4 && 0 < h4.b) {
              for (b4 = l4, p4 = m4 = c4 + (d4 - f4) * m4 - (w4 = (d4 - f4) * q2(h4.Ea, h4.b)), g4 = l4, y4 = c4, v4 = [], w4 = (N4 = w4) - 1; 0 <= w4; --w4) v4[w4] = g4[y4 + w4];
              for (w4 = N4 - 1; 0 <= w4; --w4) b4[p4 + w4] = v4[w4];
              Yr(h4, f4, d4, l4, m4, l4, c4);
            } else Yr(h4, f4, d4, p4, g4, l4, c4);
        }
        c4 = a3, l4 = i3;
      }
      l4 != i3 && n2(a3, i3, c4, l4, s3);
    }
    function Lt2(t3, r3) {
      var n3 = t3.V, i3 = t3.Ba + t3.c * t3.C, a3 = r3 - t3.C;
      if (e(r3 <= t3.l.o), e(16 >= a3), 0 < a3) {
        var o3 = t3.l, s3 = t3.Ta, u4 = t3.Ua, c4 = o3.width;
        if (Nt2(t3, a3, n3, i3), a3 = u4 = [u4], e((n3 = t3.C) < (i3 = r3)), e(o3.v < o3.va), i3 > o3.o && (i3 = o3.o), n3 < o3.j) {
          var l4 = o3.j - n3;
          n3 = o3.j;
          a3[0] += l4 * c4;
        }
        if (n3 >= i3 ? n3 = 0 : (a3[0] += 4 * o3.v, o3.ka = n3 - o3.j, o3.U = o3.va - o3.v, o3.T = i3 - n3, n3 = 1), n3) {
          if (u4 = u4[0], 11 > (n3 = t3.ca).S) {
            var h4 = n3.f.RGBA, f4 = (i3 = n3.S, a3 = o3.U, o3 = o3.T, l4 = h4.eb, h4.A), d4 = o3;
            for (h4 = h4.fb + t3.Ma * h4.A; 0 < d4--; ) {
              var p4 = s3, g4 = u4, m4 = a3, v4 = l4, b4 = h4;
              switch (i3) {
                case En:
                  Qr(p4, g4, m4, v4, b4);
                  break;
                case qn:
                  tn(p4, g4, m4, v4, b4);
                  break;
                case Hn:
                  tn(p4, g4, m4, v4, b4), An(v4, b4, 0, m4, 1, 0);
                  break;
                case Rn:
                  nn(p4, g4, m4, v4, b4);
                  break;
                case Tn:
                  et3(p4, g4, m4, v4, b4, 1);
                  break;
                case Vn:
                  et3(p4, g4, m4, v4, b4, 1), An(v4, b4, 0, m4, 1, 0);
                  break;
                case Dn:
                  et3(p4, g4, m4, v4, b4, 0);
                  break;
                case Wn:
                  et3(p4, g4, m4, v4, b4, 0), An(v4, b4, 1, m4, 1, 0);
                  break;
                case Un:
                  en(p4, g4, m4, v4, b4);
                  break;
                case Gn:
                  en(p4, g4, m4, v4, b4), xn(v4, b4, m4, 1, 0);
                  break;
                case zn:
                  rn(p4, g4, m4, v4, b4);
                  break;
                default:
                  e(0);
              }
              u4 += c4, h4 += f4;
            }
            t3.Ma += o3;
          } else alert("todo:EmitRescaledRowsYUVA");
          e(t3.Ma <= n3.height);
        }
      }
      t3.C = r3, e(t3.C <= t3.i);
    }
    function At2(t3) {
      var e2;
      if (0 < t3.ua) return 0;
      for (e2 = 0; e2 < t3.Wb; ++e2) {
        var r3 = t3.Ya[e2].G, n3 = t3.Ya[e2].H;
        if (0 < r3[1][n3[1] + 0].g || 0 < r3[2][n3[2] + 0].g || 0 < r3[3][n3[3] + 0].g) return 0;
      }
      return 1;
    }
    function xt2(t3, r3, n3, i3, a3, o3) {
      if (0 != t3.Z) {
        var s3 = t3.qd, u4 = t3.rd;
        for (e(null != mi[t3.Z]); r3 < n3; ++r3) mi[t3.Z](s3, u4, i3, a3, i3, a3, o3), s3 = i3, u4 = a3, a3 += o3;
        t3.qd = s3, t3.rd = u4;
      }
    }
    function St2(t3, r3) {
      var n3 = t3.l.ma, i3 = 0 == n3.Z || 1 == n3.Z ? t3.l.j : t3.C;
      i3 = t3.C < i3 ? i3 : t3.C;
      if (e(r3 <= t3.l.o), r3 > i3) {
        var a3 = t3.l.width, o3 = n3.ca, s3 = n3.tb + a3 * i3, u4 = t3.V, c4 = t3.Ba + t3.c * i3, l4 = t3.gc;
        e(1 == t3.ab), e(3 == l4[0].hc), Xr(l4[0], i3, r3, u4, c4, o3, s3), xt2(n3, i3, r3, o3, s3, a3);
      }
      t3.C = t3.Ma = r3;
    }
    function _t2(t3, r3, n3, i3, a3, o3, s3) {
      var u4 = t3.$ / i3, c4 = t3.$ % i3, l4 = t3.m, h4 = t3.s, f4 = n3 + t3.$, d4 = f4;
      a3 = n3 + i3 * a3;
      var p4 = n3 + i3 * o3, g4 = 280 + h4.ua, m4 = t3.Pb ? u4 : 16777216, v4 = 0 < h4.ua ? h4.Wa : null, b4 = h4.wc, y4 = f4 < p4 ? wt2(h4, c4, u4) : null;
      e(t3.C < o3), e(p4 <= a3);
      var w4 = false;
      t: for (; ; ) {
        for (; w4 || f4 < p4; ) {
          var N4 = 0;
          if (u4 >= m4) {
            var _3 = f4 - n3;
            e((m4 = t3).Pb), m4.wd = m4.m, m4.xd = _3, 0 < m4.s.ua && B2(m4.s.Wa, m4.s.vb), m4 = u4 + ti;
          }
          if (c4 & b4 || (y4 = wt2(h4, c4, u4)), e(null != y4), y4.Qb && (r3[f4] = y4.qb, w4 = true), !w4) if (S2(l4), y4.jc) {
            N4 = l4, _3 = r3;
            var P3 = f4, k3 = y4.pd[L3(N4) & Rr - 1];
            e(y4.jc), 256 > k3.g ? (x2(N4, N4.u + k3.g), _3[P3] = k3.value, N4 = 0) : (x2(N4, N4.u + k3.g - 256), e(256 <= k3.value), N4 = k3.value), 0 == N4 && (w4 = true);
          } else N4 = bt2(y4.G[0], y4.H[0], l4);
          if (l4.h) break;
          if (w4 || 256 > N4) {
            if (!w4) if (y4.nd) r3[f4] = (y4.qb | N4 << 8) >>> 0;
            else {
              if (S2(l4), w4 = bt2(y4.G[1], y4.H[1], l4), S2(l4), _3 = bt2(y4.G[2], y4.H[2], l4), P3 = bt2(y4.G[3], y4.H[3], l4), l4.h) break;
              r3[f4] = (P3 << 24 | w4 << 16 | N4 << 8 | _3) >>> 0;
            }
            if (w4 = false, ++f4, ++c4 >= i3 && (c4 = 0, ++u4, null != s3 && u4 <= o3 && !(u4 % 16) && s3(t3, u4), null != v4)) for (; d4 < f4; ) N4 = r3[d4++], v4.X[(506832829 * N4 & 4294967295) >>> v4.Mb] = N4;
          } else if (280 > N4) {
            if (N4 = mt2(N4 - 256, l4), _3 = bt2(y4.G[4], y4.H[4], l4), S2(l4), _3 = vt2(i3, _3 = mt2(_3, l4)), l4.h) break;
            if (f4 - n3 < _3 || a3 - f4 < N4) break t;
            for (P3 = 0; P3 < N4; ++P3) r3[f4 + P3] = r3[f4 + P3 - _3];
            for (f4 += N4, c4 += N4; c4 >= i3; ) c4 -= i3, ++u4, null != s3 && u4 <= o3 && !(u4 % 16) && s3(t3, u4);
            if (e(f4 <= a3), c4 & b4 && (y4 = wt2(h4, c4, u4)), null != v4) for (; d4 < f4; ) N4 = r3[d4++], v4.X[(506832829 * N4 & 4294967295) >>> v4.Mb] = N4;
          } else {
            if (!(N4 < g4)) break t;
            for (w4 = N4 - 280, e(null != v4); d4 < f4; ) N4 = r3[d4++], v4.X[(506832829 * N4 & 4294967295) >>> v4.Mb] = N4;
            N4 = f4, e(!(w4 >>> (_3 = v4).Xa)), r3[N4] = _3.X[w4], w4 = true;
          }
          w4 || e(l4.h == A2(l4));
        }
        if (t3.Pb && l4.h && f4 < a3) e(t3.m.h), t3.a = 5, t3.m = t3.wd, t3.$ = t3.xd, 0 < t3.s.ua && B2(t3.s.vb, t3.s.Wa);
        else {
          if (l4.h) break t;
          null != s3 && s3(t3, u4 > o3 ? o3 : u4), t3.a = 0, t3.$ = f4 - n3;
        }
        return 1;
      }
      return t3.a = 3, 0;
    }
    function Pt2(t3) {
      e(null != t3), t3.vc = null, t3.yc = null, t3.Ya = null;
      var r3 = t3.Wa;
      null != r3 && (r3.X = null), t3.vb = null, e(null != t3);
    }
    function kt2() {
      var e2 = new or();
      return null == e2 ? null : (e2.a = 0, e2.xb = gi, rt2("Predictor", "VP8LPredictors"), rt2("Predictor", "VP8LPredictors_C"), rt2("PredictorAdd", "VP8LPredictorsAdd"), rt2("PredictorAdd", "VP8LPredictorsAdd_C"), Gr = G2, $r = J2, Qr = K2, tn = Z2, en = $2, rn = Q2, nn = tt2, t2.VP8LMapColor32b = Jr, t2.VP8LMapColor8b = Kr, e2);
    }
    function It2(t3, r3, n3, s3, u4) {
      var c4 = 1, f4 = [t3], p4 = [r3], g4 = s3.m, m4 = s3.s, v4 = null, b4 = 0;
      t: for (; ; ) {
        if (n3) for (; c4 && y3(g4, 1); ) {
          var w4 = f4, N4 = p4, A3 = s3, _3 = 1, P3 = A3.m, k3 = A3.gc[A3.ab], I3 = y3(P3, 2);
          if (A3.Oc & 1 << I3) c4 = 0;
          else {
            switch (A3.Oc |= 1 << I3, k3.hc = I3, k3.Ea = w4[0], k3.nc = N4[0], k3.K = [null], ++A3.ab, e(4 >= A3.ab), I3) {
              case 0:
              case 1:
                k3.b = y3(P3, 3) + 2, _3 = It2(q2(k3.Ea, k3.b), q2(k3.nc, k3.b), 0, A3, k3.K), k3.K = k3.K[0];
                break;
              case 3:
                var F3, C3 = y3(P3, 8) + 1, j3 = 16 < C3 ? 0 : 4 < C3 ? 1 : 2 < C3 ? 2 : 3;
                if (w4[0] = q2(k3.Ea, j3), k3.b = j3, F3 = _3 = It2(C3, 1, 0, A3, k3.K)) {
                  var B3, M3 = C3, E3 = k3, T3 = 1 << (8 >> E3.b), D3 = a2(T3);
                  if (null == D3) F3 = 0;
                  else {
                    var U3 = E3.K[0], z3 = E3.w;
                    for (D3[0] = E3.K[0][0], B3 = 1; B3 < 1 * M3; ++B3) D3[B3] = R2(U3[z3 + B3], D3[B3 - 1]);
                    for (; B3 < 4 * T3; ++B3) D3[B3] = 0;
                    E3.K[0] = null, E3.K[0] = D3, F3 = 1;
                  }
                }
                _3 = F3;
                break;
              case 2:
                break;
              default:
                e(0);
            }
            c4 = _3;
          }
        }
        if (f4 = f4[0], p4 = p4[0], c4 && y3(g4, 1) && !(c4 = 1 <= (b4 = y3(g4, 4)) && 11 >= b4)) {
          s3.a = 3;
          break t;
        }
        var H3;
        if (H3 = c4) e: {
          var V3, W3, G3, Y3 = s3, J3 = f4, X3 = p4, K3 = b4, Z3 = n3, $3 = Y3.m, Q3 = Y3.s, tt3 = [null], et4 = 1, rt3 = 0, nt3 = Qn[K3];
          r: for (; ; ) {
            if (Z3 && y3($3, 1)) {
              var it3 = y3($3, 3) + 2, at3 = q2(J3, it3), ot3 = q2(X3, it3), st3 = at3 * ot3;
              if (!It2(at3, ot3, 0, Y3, tt3)) break r;
              for (tt3 = tt3[0], Q3.xc = it3, V3 = 0; V3 < st3; ++V3) {
                var ut3 = tt3[V3] >> 8 & 65535;
                tt3[V3] = ut3, ut3 >= et4 && (et4 = ut3 + 1);
              }
            }
            if ($3.h) break r;
            for (W3 = 0; 5 > W3; ++W3) {
              var ct3 = Xn[W3];
              !W3 && 0 < K3 && (ct3 += 1 << K3), rt3 < ct3 && (rt3 = ct3);
            }
            var lt3 = o2(et4 * nt3, h3), ht3 = et4, ft3 = o2(ht3, d3);
            if (null == ft3) var dt3 = null;
            else e(65536 >= ht3), dt3 = ft3;
            var pt3 = a2(rt3);
            if (null == dt3 || null == pt3 || null == lt3) {
              Y3.a = 1;
              break r;
            }
            var gt3 = lt3;
            for (V3 = G3 = 0; V3 < et4; ++V3) {
              var mt3 = dt3[V3], vt3 = mt3.G, bt3 = mt3.H, wt3 = 0, Nt3 = 1, Lt3 = 0;
              for (W3 = 0; 5 > W3; ++W3) {
                ct3 = Xn[W3], vt3[W3] = gt3, bt3[W3] = G3, !W3 && 0 < K3 && (ct3 += 1 << K3);
                n: {
                  var At3, xt3 = ct3, St3 = Y3, kt3 = pt3, Ft3 = gt3, Ct3 = G3, jt3 = 0, Ot3 = St3.m, Bt3 = y3(Ot3, 1);
                  if (i2(kt3, 0, 0, xt3), Bt3) {
                    var Mt3 = y3(Ot3, 1) + 1, Et3 = y3(Ot3, 1), qt3 = y3(Ot3, 0 == Et3 ? 1 : 8);
                    kt3[qt3] = 1, 2 == Mt3 && (kt3[qt3 = y3(Ot3, 8)] = 1);
                    var Rt3 = 1;
                  } else {
                    var Tt3 = a2(19), Dt3 = y3(Ot3, 4) + 4;
                    if (19 < Dt3) {
                      St3.a = 3;
                      var Ut3 = 0;
                      break n;
                    }
                    for (At3 = 0; At3 < Dt3; ++At3) Tt3[Zn[At3]] = y3(Ot3, 3);
                    var zt3 = void 0, Ht3 = void 0, Vt3 = St3, Wt3 = Tt3, Gt3 = xt3, Yt3 = kt3, Jt3 = 0, Xt3 = Vt3.m, Kt3 = 8, Zt3 = o2(128, h3);
                    i: for (; l3(Zt3, 0, 7, Wt3, 19); ) {
                      if (y3(Xt3, 1)) {
                        var $t3 = 2 + 2 * y3(Xt3, 3);
                        if ((zt3 = 2 + y3(Xt3, $t3)) > Gt3) break i;
                      } else zt3 = Gt3;
                      for (Ht3 = 0; Ht3 < Gt3 && zt3--; ) {
                        S2(Xt3);
                        var Qt3 = Zt3[0 + (127 & L3(Xt3))];
                        x2(Xt3, Xt3.u + Qt3.g);
                        var te3 = Qt3.value;
                        if (16 > te3) Yt3[Ht3++] = te3, 0 != te3 && (Kt3 = te3);
                        else {
                          var ee3 = 16 == te3, re3 = te3 - 16, ne3 = Jn[re3], ie3 = y3(Xt3, Yn[re3]) + ne3;
                          if (Ht3 + ie3 > Gt3) break i;
                          for (var ae3 = ee3 ? Kt3 : 0; 0 < ie3--; ) Yt3[Ht3++] = ae3;
                        }
                      }
                      Jt3 = 1;
                      break i;
                    }
                    Jt3 || (Vt3.a = 3), Rt3 = Jt3;
                  }
                  (Rt3 = Rt3 && !Ot3.h) && (jt3 = l3(Ft3, Ct3, 8, kt3, xt3)), Rt3 && 0 != jt3 ? Ut3 = jt3 : (St3.a = 3, Ut3 = 0);
                }
                if (0 == Ut3) break r;
                if (Nt3 && 1 == Kn[W3] && (Nt3 = 0 == gt3[G3].g), wt3 += gt3[G3].g, G3 += Ut3, 3 >= W3) {
                  var oe3, se3 = pt3[0];
                  for (oe3 = 1; oe3 < ct3; ++oe3) pt3[oe3] > se3 && (se3 = pt3[oe3]);
                  Lt3 += se3;
                }
              }
              if (mt3.nd = Nt3, mt3.Qb = 0, Nt3 && (mt3.qb = (vt3[3][bt3[3] + 0].value << 24 | vt3[1][bt3[1] + 0].value << 16 | vt3[2][bt3[2] + 0].value) >>> 0, 0 == wt3 && 256 > vt3[0][bt3[0] + 0].value && (mt3.Qb = 1, mt3.qb += vt3[0][bt3[0] + 0].value << 8)), mt3.jc = !mt3.Qb && 6 > Lt3, mt3.jc) {
                var ue3, ce3 = mt3;
                for (ue3 = 0; ue3 < Rr; ++ue3) {
                  var le3 = ue3, he3 = ce3.pd[le3], fe3 = ce3.G[0][ce3.H[0] + le3];
                  256 <= fe3.value ? (he3.g = fe3.g + 256, he3.value = fe3.value) : (he3.g = 0, he3.value = 0, le3 >>= yt2(fe3, 8, he3), le3 >>= yt2(ce3.G[1][ce3.H[1] + le3], 16, he3), le3 >>= yt2(ce3.G[2][ce3.H[2] + le3], 0, he3), yt2(ce3.G[3][ce3.H[3] + le3], 24, he3));
                }
              }
            }
            Q3.vc = tt3, Q3.Wb = et4, Q3.Ya = dt3, Q3.yc = lt3, H3 = 1;
            break e;
          }
          H3 = 0;
        }
        if (!(c4 = H3)) {
          s3.a = 3;
          break t;
        }
        if (0 < b4) {
          if (m4.ua = 1 << b4, !O2(m4.Wa, b4)) {
            s3.a = 1, c4 = 0;
            break t;
          }
        } else m4.ua = 0;
        var de3 = s3, pe3 = f4, ge3 = p4, me3 = de3.s, ve3 = me3.xc;
        if (de3.c = pe3, de3.i = ge3, me3.md = q2(pe3, ve3), me3.wc = 0 == ve3 ? -1 : (1 << ve3) - 1, n3) {
          s3.xb = pi;
          break t;
        }
        if (null == (v4 = a2(f4 * p4))) {
          s3.a = 1, c4 = 0;
          break t;
        }
        c4 = (c4 = _t2(s3, v4, 0, f4, p4, p4, null)) && !g4.h;
        break t;
      }
      return c4 ? (null != u4 ? u4[0] = v4 : (e(null == v4), e(n3)), s3.$ = 0, n3 || Pt2(m4)) : Pt2(m4), c4;
    }
    function Ft2(t3, r3) {
      var n3 = t3.c * t3.i, i3 = n3 + r3 + 16 * r3;
      return e(t3.c <= r3), t3.V = a2(i3), null == t3.V ? (t3.Ta = null, t3.Ua = 0, t3.a = 1, 0) : (t3.Ta = t3.V, t3.Ua = t3.Ba + n3 + r3, 1);
    }
    function Ct2(t3, r3) {
      var n3 = t3.C, i3 = r3 - n3, a3 = t3.V, o3 = t3.Ba + t3.c * n3;
      for (e(r3 <= t3.l.o); 0 < i3; ) {
        var s3 = 16 < i3 ? 16 : i3, u4 = t3.l.ma, c4 = t3.l.width, l4 = c4 * s3, h4 = u4.ca, f4 = u4.tb + c4 * n3, d4 = t3.Ta, p4 = t3.Ua;
        Nt2(t3, s3, a3, o3), _n(d4, p4, h4, f4, l4), xt2(u4, n3, n3 + s3, h4, f4, c4), i3 -= s3, a3 += s3 * t3.c, n3 += s3;
      }
      e(n3 == r3), t3.C = t3.Ma = r3;
    }
    function jt2() {
      this.ub = this.yd = this.td = this.Rb = 0;
    }
    function Ot2() {
      this.Kd = this.Ld = this.Ud = this.Td = this.i = this.c = 0;
    }
    function Bt2() {
      this.Fb = this.Bb = this.Cb = 0, this.Zb = a2(4), this.Lb = a2(4);
    }
    function Mt2() {
      this.Yb = function() {
        var t3 = [];
        return function t4(e2, r3, n3) {
          for (var i3 = n3[r3], a3 = 0; a3 < i3 && (e2.push(n3.length > r3 + 1 ? [] : 0), !(n3.length < r3 + 1)); a3++) t4(e2[a3], r3 + 1, n3);
        }(t3, 0, [3, 11]), t3;
      }();
    }
    function Et2() {
      this.jb = a2(3), this.Wc = s2([4, 8], Mt2), this.Xc = s2([4, 17], Mt2);
    }
    function qt2() {
      this.Pc = this.wb = this.Tb = this.zd = 0, this.vd = new a2(4), this.od = new a2(4);
    }
    function Rt2() {
      this.ld = this.La = this.dd = this.tc = 0;
    }
    function Tt2() {
      this.Na = this.la = 0;
    }
    function Dt2() {
      this.Sc = [0, 0], this.Eb = [0, 0], this.Qc = [0, 0], this.ia = this.lc = 0;
    }
    function Ut2() {
      this.ad = a2(384), this.Za = 0, this.Ob = a2(16), this.$b = this.Ad = this.ia = this.Gc = this.Hc = this.Dd = 0;
    }
    function zt2() {
      this.uc = this.M = this.Nb = 0, this.wa = Array(new Rt2()), this.Y = 0, this.ya = Array(new Ut2()), this.aa = 0, this.l = new Gt2();
    }
    function Ht2() {
      this.y = a2(16), this.f = a2(8), this.ea = a2(8);
    }
    function Vt2() {
      this.cb = this.a = 0, this.sc = "", this.m = new w3(), this.Od = new jt2(), this.Kc = new Ot2(), this.ed = new qt2(), this.Qa = new Bt2(), this.Ic = this.$c = this.Aa = 0, this.D = new zt2(), this.Xb = this.Va = this.Hb = this.zb = this.yb = this.Ub = this.za = 0, this.Jc = o2(8, w3), this.ia = 0, this.pb = o2(4, Dt2), this.Pa = new Et2(), this.Bd = this.kc = 0, this.Ac = [], this.Bc = 0, this.zc = [0, 0, 0, 0], this.Gd = Array(new Ht2()), this.Hd = 0, this.rb = Array(new Tt2()), this.sb = 0, this.wa = Array(new Rt2()), this.Y = 0, this.oc = [], this.pc = 0, this.sa = [], this.ta = 0, this.qa = [], this.ra = 0, this.Ha = [], this.B = this.R = this.Ia = 0, this.Ec = [], this.M = this.ja = this.Vb = this.Fc = 0, this.ya = Array(new Ut2()), this.L = this.aa = 0, this.gd = s2([4, 2], Rt2), this.ga = null, this.Fa = [], this.Cc = this.qc = this.P = 0, this.Gb = [], this.Uc = 0, this.mb = [], this.nb = 0, this.rc = [], this.Ga = this.Vc = 0;
    }
    function Wt2(t3, e2) {
      return 0 > t3 ? 0 : t3 > e2 ? e2 : t3;
    }
    function Gt2() {
      this.T = this.U = this.ka = this.height = this.width = 0, this.y = [], this.f = [], this.ea = [], this.Rc = this.fa = this.W = this.N = this.O = 0, this.ma = "void", this.put = "VP8IoPutHook", this.ac = "VP8IoSetupHook", this.bc = "VP8IoTeardownHook", this.ha = this.Kb = 0, this.data = [], this.hb = this.ib = this.da = this.o = this.j = this.va = this.v = this.Da = this.ob = this.w = 0, this.F = [], this.J = 0;
    }
    function Yt2() {
      var t3 = new Vt2();
      return null != t3 && (t3.a = 0, t3.sc = "OK", t3.cb = 0, t3.Xb = 0, ni || (ni = Zt2)), t3;
    }
    function Jt2(t3, e2, r3) {
      return 0 == t3.a && (t3.a = e2, t3.sc = r3, t3.cb = 0), 0;
    }
    function Xt2(t3, e2, r3) {
      return 3 <= r3 && 157 == t3[e2 + 0] && 1 == t3[e2 + 1] && 42 == t3[e2 + 2];
    }
    function Kt2(t3, r3) {
      if (null == t3) return 0;
      if (t3.a = 0, t3.sc = "OK", null == r3) return Jt2(t3, 2, "null VP8Io passed to VP8GetHeaders()");
      var n3 = r3.data, a3 = r3.w, o3 = r3.ha;
      if (4 > o3) return Jt2(t3, 7, "Truncated header.");
      var s3 = n3[a3 + 0] | n3[a3 + 1] << 8 | n3[a3 + 2] << 16, u4 = t3.Od;
      if (u4.Rb = !(1 & s3), u4.td = s3 >> 1 & 7, u4.yd = s3 >> 4 & 1, u4.ub = s3 >> 5, 3 < u4.td) return Jt2(t3, 3, "Incorrect keyframe parameters.");
      if (!u4.yd) return Jt2(t3, 4, "Frame not displayable.");
      a3 += 3, o3 -= 3;
      var c4 = t3.Kc;
      if (u4.Rb) {
        if (7 > o3) return Jt2(t3, 7, "cannot parse picture header");
        if (!Xt2(n3, a3, o3)) return Jt2(t3, 3, "Bad code word");
        c4.c = 16383 & (n3[a3 + 4] << 8 | n3[a3 + 3]), c4.Td = n3[a3 + 4] >> 6, c4.i = 16383 & (n3[a3 + 6] << 8 | n3[a3 + 5]), c4.Ud = n3[a3 + 6] >> 6, a3 += 7, o3 -= 7, t3.za = c4.c + 15 >> 4, t3.Ub = c4.i + 15 >> 4, r3.width = c4.c, r3.height = c4.i, r3.Da = 0, r3.j = 0, r3.v = 0, r3.va = r3.width, r3.o = r3.height, r3.da = 0, r3.ib = r3.width, r3.hb = r3.height, r3.U = r3.width, r3.T = r3.height, i2((s3 = t3.Pa).jb, 0, 255, s3.jb.length), e(null != (s3 = t3.Qa)), s3.Cb = 0, s3.Bb = 0, s3.Fb = 1, i2(s3.Zb, 0, 0, s3.Zb.length), i2(s3.Lb, 0, 0, s3.Lb);
      }
      if (u4.ub > o3) return Jt2(t3, 7, "bad partition length");
      p3(s3 = t3.m, n3, a3, u4.ub), a3 += u4.ub, o3 -= u4.ub, u4.Rb && (c4.Ld = P2(s3), c4.Kd = P2(s3)), c4 = t3.Qa;
      var l4, h4 = t3.Pa;
      if (e(null != s3), e(null != c4), c4.Cb = P2(s3), c4.Cb) {
        if (c4.Bb = P2(s3), P2(s3)) {
          for (c4.Fb = P2(s3), l4 = 0; 4 > l4; ++l4) c4.Zb[l4] = P2(s3) ? m3(s3, 7) : 0;
          for (l4 = 0; 4 > l4; ++l4) c4.Lb[l4] = P2(s3) ? m3(s3, 6) : 0;
        }
        if (c4.Bb) for (l4 = 0; 3 > l4; ++l4) h4.jb[l4] = P2(s3) ? g3(s3, 8) : 255;
      } else c4.Bb = 0;
      if (s3.Ka) return Jt2(t3, 3, "cannot parse segment header");
      if ((c4 = t3.ed).zd = P2(s3), c4.Tb = g3(s3, 6), c4.wb = g3(s3, 3), c4.Pc = P2(s3), c4.Pc && P2(s3)) {
        for (h4 = 0; 4 > h4; ++h4) P2(s3) && (c4.vd[h4] = m3(s3, 6));
        for (h4 = 0; 4 > h4; ++h4) P2(s3) && (c4.od[h4] = m3(s3, 6));
      }
      if (t3.L = 0 == c4.Tb ? 0 : c4.zd ? 1 : 2, s3.Ka) return Jt2(t3, 3, "cannot parse filter header");
      var f4 = o3;
      if (o3 = l4 = a3, a3 = l4 + f4, c4 = f4, t3.Xb = (1 << g3(t3.m, 2)) - 1, f4 < 3 * (h4 = t3.Xb)) n3 = 7;
      else {
        for (l4 += 3 * h4, c4 -= 3 * h4, f4 = 0; f4 < h4; ++f4) {
          var d4 = n3[o3 + 0] | n3[o3 + 1] << 8 | n3[o3 + 2] << 16;
          d4 > c4 && (d4 = c4), p3(t3.Jc[+f4], n3, l4, d4), l4 += d4, c4 -= d4, o3 += 3;
        }
        p3(t3.Jc[+h4], n3, l4, c4), n3 = l4 < a3 ? 0 : 5;
      }
      if (0 != n3) return Jt2(t3, n3, "cannot parse partitions");
      for (n3 = g3(l4 = t3.m, 7), o3 = P2(l4) ? m3(l4, 4) : 0, a3 = P2(l4) ? m3(l4, 4) : 0, c4 = P2(l4) ? m3(l4, 4) : 0, h4 = P2(l4) ? m3(l4, 4) : 0, l4 = P2(l4) ? m3(l4, 4) : 0, f4 = t3.Qa, d4 = 0; 4 > d4; ++d4) {
        if (f4.Cb) {
          var v4 = f4.Zb[d4];
          f4.Fb || (v4 += n3);
        } else {
          if (0 < d4) {
            t3.pb[d4] = t3.pb[0];
            continue;
          }
          v4 = n3;
        }
        var b4 = t3.pb[d4];
        b4.Sc[0] = ei[Wt2(v4 + o3, 127)], b4.Sc[1] = ri[Wt2(v4 + 0, 127)], b4.Eb[0] = 2 * ei[Wt2(v4 + a3, 127)], b4.Eb[1] = 101581 * ri[Wt2(v4 + c4, 127)] >> 16, 8 > b4.Eb[1] && (b4.Eb[1] = 8), b4.Qc[0] = ei[Wt2(v4 + h4, 117)], b4.Qc[1] = ri[Wt2(v4 + l4, 127)], b4.lc = v4 + l4;
      }
      if (!u4.Rb) return Jt2(t3, 4, "Not a key frame.");
      for (P2(s3), u4 = t3.Pa, n3 = 0; 4 > n3; ++n3) {
        for (o3 = 0; 8 > o3; ++o3) for (a3 = 0; 3 > a3; ++a3) for (c4 = 0; 11 > c4; ++c4) h4 = k2(s3, ci[n3][o3][a3][c4]) ? g3(s3, 8) : si[n3][o3][a3][c4], u4.Wc[n3][o3].Yb[a3][c4] = h4;
        for (o3 = 0; 17 > o3; ++o3) u4.Xc[n3][o3] = u4.Wc[n3][li[o3]];
      }
      return t3.kc = P2(s3), t3.kc && (t3.Bd = g3(s3, 8)), t3.cb = 1;
    }
    function Zt2(t3, e2, r3, n3, i3, a3, o3) {
      var s3 = e2[i3].Yb[r3];
      for (r3 = 0; 16 > i3; ++i3) {
        if (!k2(t3, s3[r3 + 0])) return i3;
        for (; !k2(t3, s3[r3 + 1]); ) if (s3 = e2[++i3].Yb[0], r3 = 0, 16 == i3) return 16;
        var u4 = e2[i3 + 1].Yb;
        if (k2(t3, s3[r3 + 2])) {
          var c4 = t3, l4 = 0;
          if (k2(c4, (f4 = s3)[(h4 = r3) + 3])) {
            if (k2(c4, f4[h4 + 6])) {
              for (s3 = 0, h4 = 2 * (l4 = k2(c4, f4[h4 + 8])) + (f4 = k2(c4, f4[h4 + 9 + l4])), l4 = 0, f4 = ii[h4]; f4[s3]; ++s3) l4 += l4 + k2(c4, f4[s3]);
              l4 += 3 + (8 << h4);
            } else k2(c4, f4[h4 + 7]) ? (l4 = 7 + 2 * k2(c4, 165), l4 += k2(c4, 145)) : l4 = 5 + k2(c4, 159);
          } else l4 = k2(c4, f4[h4 + 4]) ? 3 + k2(c4, f4[h4 + 5]) : 2;
          s3 = u4[2];
        } else l4 = 1, s3 = u4[1];
        u4 = o3 + ai[i3], 0 > (c4 = t3).b && _2(c4);
        var h4, f4 = c4.b, d4 = (h4 = c4.Ca >> 1) - (c4.I >> f4) >> 31;
        --c4.b, c4.Ca += d4, c4.Ca |= 1, c4.I -= (h4 + 1 & d4) << f4, a3[u4] = ((l4 ^ d4) - d4) * n3[(0 < i3) + 0];
      }
      return 16;
    }
    function $t2(t3) {
      var e2 = t3.rb[t3.sb - 1];
      e2.la = 0, e2.Na = 0, i2(t3.zc, 0, 0, t3.zc.length), t3.ja = 0;
    }
    function Qt2(t3, r3) {
      if (null == t3) return 0;
      if (null == r3) return Jt2(t3, 2, "NULL VP8Io parameter in VP8Decode().");
      if (!t3.cb && !Kt2(t3, r3)) return 0;
      if (e(t3.cb), null == r3.ac || r3.ac(r3)) {
        r3.ob && (t3.L = 0);
        var s3 = Ti[t3.L];
        if (2 == t3.L ? (t3.yb = 0, t3.zb = 0) : (t3.yb = r3.v - s3 >> 4, t3.zb = r3.j - s3 >> 4, 0 > t3.yb && (t3.yb = 0), 0 > t3.zb && (t3.zb = 0)), t3.Va = r3.o + 15 + s3 >> 4, t3.Hb = r3.va + 15 + s3 >> 4, t3.Hb > t3.za && (t3.Hb = t3.za), t3.Va > t3.Ub && (t3.Va = t3.Ub), 0 < t3.L) {
          var u4 = t3.ed;
          for (s3 = 0; 4 > s3; ++s3) {
            var c4;
            if (t3.Qa.Cb) {
              var l4 = t3.Qa.Lb[s3];
              t3.Qa.Fb || (l4 += u4.Tb);
            } else l4 = u4.Tb;
            for (c4 = 0; 1 >= c4; ++c4) {
              var h4 = t3.gd[s3][c4], f4 = l4;
              if (u4.Pc && (f4 += u4.vd[0], c4 && (f4 += u4.od[0])), 0 < (f4 = 0 > f4 ? 0 : 63 < f4 ? 63 : f4)) {
                var d4 = f4;
                0 < u4.wb && (d4 = 4 < u4.wb ? d4 >> 2 : d4 >> 1) > 9 - u4.wb && (d4 = 9 - u4.wb), 1 > d4 && (d4 = 1), h4.dd = d4, h4.tc = 2 * f4 + d4, h4.ld = 40 <= f4 ? 2 : 15 <= f4 ? 1 : 0;
              } else h4.tc = 0;
              h4.La = c4;
            }
          }
        }
        s3 = 0;
      } else Jt2(t3, 6, "Frame setup failed"), s3 = t3.a;
      if (s3 = 0 == s3) {
        if (s3) {
          t3.$c = 0, 0 < t3.Aa || (t3.Ic = Ui);
          t: {
            s3 = t3.Ic;
            u4 = 4 * (d4 = t3.za);
            var p4 = 32 * d4, g4 = d4 + 1, m4 = 0 < t3.L ? d4 * (0 < t3.Aa ? 2 : 1) : 0, v4 = (2 == t3.Aa ? 2 : 1) * d4;
            if ((h4 = u4 + 832 + (c4 = 3 * (16 * s3 + Ti[t3.L]) / 2 * p4) + (l4 = null != t3.Fa && 0 < t3.Fa.length ? t3.Kc.c * t3.Kc.i : 0)) != h4) s3 = 0;
            else {
              if (h4 > t3.Vb) {
                if (t3.Vb = 0, t3.Ec = a2(h4), t3.Fc = 0, null == t3.Ec) {
                  s3 = Jt2(t3, 1, "no memory during frame initialization.");
                  break t;
                }
                t3.Vb = h4;
              }
              h4 = t3.Ec, f4 = t3.Fc, t3.Ac = h4, t3.Bc = f4, f4 += u4, t3.Gd = o2(p4, Ht2), t3.Hd = 0, t3.rb = o2(g4 + 1, Tt2), t3.sb = 1, t3.wa = m4 ? o2(m4, Rt2) : null, t3.Y = 0, t3.D.Nb = 0, t3.D.wa = t3.wa, t3.D.Y = t3.Y, 0 < t3.Aa && (t3.D.Y += d4), e(true), t3.oc = h4, t3.pc = f4, f4 += 832, t3.ya = o2(v4, Ut2), t3.aa = 0, t3.D.ya = t3.ya, t3.D.aa = t3.aa, 2 == t3.Aa && (t3.D.aa += d4), t3.R = 16 * d4, t3.B = 8 * d4, d4 = (p4 = Ti[t3.L]) * t3.R, p4 = p4 / 2 * t3.B, t3.sa = h4, t3.ta = f4 + d4, t3.qa = t3.sa, t3.ra = t3.ta + 16 * s3 * t3.R + p4, t3.Ha = t3.qa, t3.Ia = t3.ra + 8 * s3 * t3.B + p4, t3.$c = 0, f4 += c4, t3.mb = l4 ? h4 : null, t3.nb = l4 ? f4 : null, e(f4 + l4 <= t3.Fc + t3.Vb), $t2(t3), i2(t3.Ac, t3.Bc, 0, u4), s3 = 1;
            }
          }
          if (s3) {
            if (r3.ka = 0, r3.y = t3.sa, r3.O = t3.ta, r3.f = t3.qa, r3.N = t3.ra, r3.ea = t3.Ha, r3.Vd = t3.Ia, r3.fa = t3.R, r3.Rc = t3.B, r3.F = null, r3.J = 0, !Cn) {
              for (s3 = -255; 255 >= s3; ++s3) Pn[255 + s3] = 0 > s3 ? -s3 : s3;
              for (s3 = -1020; 1020 >= s3; ++s3) kn[1020 + s3] = -128 > s3 ? -128 : 127 < s3 ? 127 : s3;
              for (s3 = -112; 112 >= s3; ++s3) In[112 + s3] = -16 > s3 ? -16 : 15 < s3 ? 15 : s3;
              for (s3 = -255; 510 >= s3; ++s3) Fn[255 + s3] = 0 > s3 ? 0 : 255 < s3 ? 255 : s3;
              Cn = 1;
            }
            an = ce2, on = ae2, un = oe2, cn = se2, ln2 = ue2, sn = ie2, hn = Je, fn = Xe, dn = $e, pn = Qe, gn = Ke, mn = Ze, vn = tr, bn = er, yn = ze, wn = He, Nn = Ve, Ln = We, fi[0] = xe, fi[1] = he2, fi[2] = Le, fi[3] = Ae, fi[4] = Se, fi[5] = Pe, fi[6] = _e, fi[7] = ke, fi[8] = Fe, fi[9] = Ie, hi[0] = ve2, hi[1] = de2, hi[2] = pe2, hi[3] = ge2, hi[4] = be2, hi[5] = ye2, hi[6] = we, di[0] = Be, di[1] = fe2, di[2] = Ce, di[3] = je, di[4] = Ee, di[5] = Me, di[6] = qe, s3 = 1;
          } else s3 = 0;
        }
        s3 && (s3 = function(t4, r4) {
          for (t4.M = 0; t4.M < t4.Va; ++t4.M) {
            var o3, s4 = t4.Jc[t4.M & t4.Xb], u5 = t4.m, c5 = t4;
            for (o3 = 0; o3 < c5.za; ++o3) {
              var l5 = u5, h5 = c5, f5 = h5.Ac, d5 = h5.Bc + 4 * o3, p5 = h5.zc, g5 = h5.ya[h5.aa + o3];
              if (h5.Qa.Bb ? g5.$b = k2(l5, h5.Pa.jb[0]) ? 2 + k2(l5, h5.Pa.jb[2]) : k2(l5, h5.Pa.jb[1]) : g5.$b = 0, h5.kc && (g5.Ad = k2(l5, h5.Bd)), g5.Za = !k2(l5, 145) + 0, g5.Za) {
                var m5 = g5.Ob, v5 = 0;
                for (h5 = 0; 4 > h5; ++h5) {
                  var b4, y4 = p5[0 + h5];
                  for (b4 = 0; 4 > b4; ++b4) {
                    y4 = ui[f5[d5 + b4]][y4];
                    for (var w4 = oi[k2(l5, y4[0])]; 0 < w4; ) w4 = oi[2 * w4 + k2(l5, y4[w4])];
                    y4 = -w4, f5[d5 + b4] = y4;
                  }
                  n2(m5, v5, f5, d5, 4), v5 += 4, p5[0 + h5] = y4;
                }
              } else y4 = k2(l5, 156) ? k2(l5, 128) ? 1 : 3 : k2(l5, 163) ? 2 : 0, g5.Ob[0] = y4, i2(f5, d5, y4, 4), i2(p5, 0, y4, 4);
              g5.Dd = k2(l5, 142) ? k2(l5, 114) ? k2(l5, 183) ? 1 : 3 : 2 : 0;
            }
            if (c5.m.Ka) return Jt2(t4, 7, "Premature end-of-partition0 encountered.");
            for (; t4.ja < t4.za; ++t4.ja) {
              if (c5 = s4, l5 = (u5 = t4).rb[u5.sb - 1], f5 = u5.rb[u5.sb + u5.ja], o3 = u5.ya[u5.aa + u5.ja], d5 = u5.kc ? o3.Ad : 0) l5.la = f5.la = 0, o3.Za || (l5.Na = f5.Na = 0), o3.Hc = 0, o3.Gc = 0, o3.ia = 0;
              else {
                var N4, L4;
                l5 = f5, f5 = c5, d5 = u5.Pa.Xc, p5 = u5.ya[u5.aa + u5.ja], g5 = u5.pb[p5.$b];
                if (h5 = p5.ad, m5 = 0, v5 = u5.rb[u5.sb - 1], y4 = b4 = 0, i2(h5, m5, 0, 384), p5.Za) var A3 = 0, x3 = d5[3];
                else {
                  w4 = a2(16);
                  var S3 = l5.Na + v5.Na;
                  if (S3 = ni(f5, d5[1], S3, g5.Eb, 0, w4, 0), l5.Na = v5.Na = (0 < S3) + 0, 1 < S3) an(w4, 0, h5, m5);
                  else {
                    var _3 = w4[0] + 3 >> 3;
                    for (w4 = 0; 256 > w4; w4 += 16) h5[m5 + w4] = _3;
                  }
                  A3 = 1, x3 = d5[0];
                }
                var P3 = 15 & l5.la, I3 = 15 & v5.la;
                for (w4 = 0; 4 > w4; ++w4) {
                  var F3 = 1 & I3;
                  for (_3 = L4 = 0; 4 > _3; ++_3) P3 = P3 >> 1 | (F3 = (S3 = ni(f5, x3, S3 = F3 + (1 & P3), g5.Sc, A3, h5, m5)) > A3) << 7, L4 = L4 << 2 | (3 < S3 ? 3 : 1 < S3 ? 2 : 0 != h5[m5 + 0]), m5 += 16;
                  P3 >>= 4, I3 = I3 >> 1 | F3 << 7, b4 = (b4 << 8 | L4) >>> 0;
                }
                for (x3 = P3, A3 = I3 >> 4, N4 = 0; 4 > N4; N4 += 2) {
                  for (L4 = 0, P3 = l5.la >> 4 + N4, I3 = v5.la >> 4 + N4, w4 = 0; 2 > w4; ++w4) {
                    for (F3 = 1 & I3, _3 = 0; 2 > _3; ++_3) S3 = F3 + (1 & P3), P3 = P3 >> 1 | (F3 = 0 < (S3 = ni(f5, d5[2], S3, g5.Qc, 0, h5, m5))) << 3, L4 = L4 << 2 | (3 < S3 ? 3 : 1 < S3 ? 2 : 0 != h5[m5 + 0]), m5 += 16;
                    P3 >>= 2, I3 = I3 >> 1 | F3 << 5;
                  }
                  y4 |= L4 << 4 * N4, x3 |= P3 << 4 << N4, A3 |= (240 & I3) << N4;
                }
                l5.la = x3, v5.la = A3, p5.Hc = b4, p5.Gc = y4, p5.ia = 43690 & y4 ? 0 : g5.ia, d5 = !(b4 | y4);
              }
              if (0 < u5.L && (u5.wa[u5.Y + u5.ja] = u5.gd[o3.$b][o3.Za], u5.wa[u5.Y + u5.ja].La |= !d5), c5.Ka) return Jt2(t4, 7, "Premature end-of-file encountered.");
            }
            if ($t2(t4), u5 = r4, c5 = 1, o3 = (s4 = t4).D, l5 = 0 < s4.L && s4.M >= s4.zb && s4.M <= s4.Va, 0 == s4.Aa) t: {
              if (o3.M = s4.M, o3.uc = l5, Or(s4, o3), c5 = 1, o3 = (L4 = s4.D).Nb, l5 = (y4 = Ti[s4.L]) * s4.R, f5 = y4 / 2 * s4.B, w4 = 16 * o3 * s4.R, _3 = 8 * o3 * s4.B, d5 = s4.sa, p5 = s4.ta - l5 + w4, g5 = s4.qa, h5 = s4.ra - f5 + _3, m5 = s4.Ha, v5 = s4.Ia - f5 + _3, I3 = 0 == (P3 = L4.M), b4 = P3 >= s4.Va - 1, 2 == s4.Aa && Or(s4, L4), L4.uc) for (F3 = (S3 = s4).D.M, e(S3.D.uc), L4 = S3.yb; L4 < S3.Hb; ++L4) {
                A3 = L4, x3 = F3;
                var C3 = (j3 = (U3 = S3).D).Nb;
                N4 = U3.R;
                var j3 = j3.wa[j3.Y + A3], O3 = U3.sa, B3 = U3.ta + 16 * C3 * N4 + 16 * A3, M3 = j3.dd, E3 = j3.tc;
                if (0 != E3) if (e(3 <= E3), 1 == U3.L) 0 < A3 && wn(O3, B3, N4, E3 + 4), j3.La && Ln(O3, B3, N4, E3), 0 < x3 && yn(O3, B3, N4, E3 + 4), j3.La && Nn(O3, B3, N4, E3);
                else {
                  var q3 = U3.B, R3 = U3.qa, T3 = U3.ra + 8 * C3 * q3 + 8 * A3, D3 = U3.Ha, U3 = U3.Ia + 8 * C3 * q3 + 8 * A3;
                  C3 = j3.ld;
                  0 < A3 && (fn(O3, B3, N4, E3 + 4, M3, C3), pn(R3, T3, D3, U3, q3, E3 + 4, M3, C3)), j3.La && (mn(O3, B3, N4, E3, M3, C3), bn(R3, T3, D3, U3, q3, E3, M3, C3)), 0 < x3 && (hn(O3, B3, N4, E3 + 4, M3, C3), dn(R3, T3, D3, U3, q3, E3 + 4, M3, C3)), j3.La && (gn(O3, B3, N4, E3, M3, C3), vn(R3, T3, D3, U3, q3, E3, M3, C3));
                }
              }
              if (s4.ia && alert("todo:DitherRow"), null != u5.put) {
                if (L4 = 16 * P3, P3 = 16 * (P3 + 1), I3 ? (u5.y = s4.sa, u5.O = s4.ta + w4, u5.f = s4.qa, u5.N = s4.ra + _3, u5.ea = s4.Ha, u5.W = s4.Ia + _3) : (L4 -= y4, u5.y = d5, u5.O = p5, u5.f = g5, u5.N = h5, u5.ea = m5, u5.W = v5), b4 || (P3 -= y4), P3 > u5.o && (P3 = u5.o), u5.F = null, u5.J = null, null != s4.Fa && 0 < s4.Fa.length && L4 < P3 && (u5.J = hr(s4, u5, L4, P3 - L4), u5.F = s4.mb, null == u5.F && 0 == u5.F.length)) {
                  c5 = Jt2(s4, 3, "Could not decode alpha data.");
                  break t;
                }
                L4 < u5.j && (y4 = u5.j - L4, L4 = u5.j, e(!(1 & y4)), u5.O += s4.R * y4, u5.N += s4.B * (y4 >> 1), u5.W += s4.B * (y4 >> 1), null != u5.F && (u5.J += u5.width * y4)), L4 < P3 && (u5.O += u5.v, u5.N += u5.v >> 1, u5.W += u5.v >> 1, null != u5.F && (u5.J += u5.v), u5.ka = L4 - u5.j, u5.U = u5.va - u5.v, u5.T = P3 - L4, c5 = u5.put(u5));
              }
              o3 + 1 != s4.Ic || b4 || (n2(s4.sa, s4.ta - l5, d5, p5 + 16 * s4.R, l5), n2(s4.qa, s4.ra - f5, g5, h5 + 8 * s4.B, f5), n2(s4.Ha, s4.Ia - f5, m5, v5 + 8 * s4.B, f5));
            }
            if (!c5) return Jt2(t4, 6, "Output aborted.");
          }
          return 1;
        }(t3, r3)), null != r3.bc && r3.bc(r3), s3 &= 1;
      }
      return s3 ? (t3.cb = 0, s3) : 0;
    }
    function te2(t3, e2, r3, n3, i3) {
      i3 = t3[e2 + r3 + 32 * n3] + (i3 >> 3), t3[e2 + r3 + 32 * n3] = -256 & i3 ? 0 > i3 ? 0 : 255 : i3;
    }
    function ee2(t3, e2, r3, n3, i3, a3) {
      te2(t3, e2, 0, r3, n3 + i3), te2(t3, e2, 1, r3, n3 + a3), te2(t3, e2, 2, r3, n3 - a3), te2(t3, e2, 3, r3, n3 - i3);
    }
    function re2(t3) {
      return (20091 * t3 >> 16) + t3;
    }
    function ne2(t3, e2, r3, n3) {
      var i3, o3 = 0, s3 = a2(16);
      for (i3 = 0; 4 > i3; ++i3) {
        var u4 = t3[e2 + 0] + t3[e2 + 8], c4 = t3[e2 + 0] - t3[e2 + 8], l4 = (35468 * t3[e2 + 4] >> 16) - re2(t3[e2 + 12]), h4 = re2(t3[e2 + 4]) + (35468 * t3[e2 + 12] >> 16);
        s3[o3 + 0] = u4 + h4, s3[o3 + 1] = c4 + l4, s3[o3 + 2] = c4 - l4, s3[o3 + 3] = u4 - h4, o3 += 4, e2++;
      }
      for (i3 = o3 = 0; 4 > i3; ++i3) u4 = (t3 = s3[o3 + 0] + 4) + s3[o3 + 8], c4 = t3 - s3[o3 + 8], l4 = (35468 * s3[o3 + 4] >> 16) - re2(s3[o3 + 12]), te2(r3, n3, 0, 0, u4 + (h4 = re2(s3[o3 + 4]) + (35468 * s3[o3 + 12] >> 16))), te2(r3, n3, 1, 0, c4 + l4), te2(r3, n3, 2, 0, c4 - l4), te2(r3, n3, 3, 0, u4 - h4), o3++, n3 += 32;
    }
    function ie2(t3, e2, r3, n3) {
      var i3 = t3[e2 + 0] + 4, a3 = 35468 * t3[e2 + 4] >> 16, o3 = re2(t3[e2 + 4]), s3 = 35468 * t3[e2 + 1] >> 16;
      ee2(r3, n3, 0, i3 + o3, t3 = re2(t3[e2 + 1]), s3), ee2(r3, n3, 1, i3 + a3, t3, s3), ee2(r3, n3, 2, i3 - a3, t3, s3), ee2(r3, n3, 3, i3 - o3, t3, s3);
    }
    function ae2(t3, e2, r3, n3, i3) {
      ne2(t3, e2, r3, n3), i3 && ne2(t3, e2 + 16, r3, n3 + 4);
    }
    function oe2(t3, e2, r3, n3) {
      on(t3, e2 + 0, r3, n3, 1), on(t3, e2 + 32, r3, n3 + 128, 1);
    }
    function se2(t3, e2, r3, n3) {
      var i3;
      for (t3 = t3[e2 + 0] + 4, i3 = 0; 4 > i3; ++i3) for (e2 = 0; 4 > e2; ++e2) te2(r3, n3, e2, i3, t3);
    }
    function ue2(t3, e2, r3, n3) {
      t3[e2 + 0] && cn(t3, e2 + 0, r3, n3), t3[e2 + 16] && cn(t3, e2 + 16, r3, n3 + 4), t3[e2 + 32] && cn(t3, e2 + 32, r3, n3 + 128), t3[e2 + 48] && cn(t3, e2 + 48, r3, n3 + 128 + 4);
    }
    function ce2(t3, e2, r3, n3) {
      var i3, o3 = a2(16);
      for (i3 = 0; 4 > i3; ++i3) {
        var s3 = t3[e2 + 0 + i3] + t3[e2 + 12 + i3], u4 = t3[e2 + 4 + i3] + t3[e2 + 8 + i3], c4 = t3[e2 + 4 + i3] - t3[e2 + 8 + i3], l4 = t3[e2 + 0 + i3] - t3[e2 + 12 + i3];
        o3[0 + i3] = s3 + u4, o3[8 + i3] = s3 - u4, o3[4 + i3] = l4 + c4, o3[12 + i3] = l4 - c4;
      }
      for (i3 = 0; 4 > i3; ++i3) s3 = (t3 = o3[0 + 4 * i3] + 3) + o3[3 + 4 * i3], u4 = o3[1 + 4 * i3] + o3[2 + 4 * i3], c4 = o3[1 + 4 * i3] - o3[2 + 4 * i3], l4 = t3 - o3[3 + 4 * i3], r3[n3 + 0] = s3 + u4 >> 3, r3[n3 + 16] = l4 + c4 >> 3, r3[n3 + 32] = s3 - u4 >> 3, r3[n3 + 48] = l4 - c4 >> 3, n3 += 64;
    }
    function le2(t3, e2, r3) {
      var n3, i3 = e2 - 32, a3 = Bn, o3 = 255 - t3[i3 - 1];
      for (n3 = 0; n3 < r3; ++n3) {
        var s3, u4 = a3, c4 = o3 + t3[e2 - 1];
        for (s3 = 0; s3 < r3; ++s3) t3[e2 + s3] = u4[c4 + t3[i3 + s3]];
        e2 += 32;
      }
    }
    function he2(t3, e2) {
      le2(t3, e2, 4);
    }
    function fe2(t3, e2) {
      le2(t3, e2, 8);
    }
    function de2(t3, e2) {
      le2(t3, e2, 16);
    }
    function pe2(t3, e2) {
      var r3;
      for (r3 = 0; 16 > r3; ++r3) n2(t3, e2 + 32 * r3, t3, e2 - 32, 16);
    }
    function ge2(t3, e2) {
      var r3;
      for (r3 = 16; 0 < r3; --r3) i2(t3, e2, t3[e2 - 1], 16), e2 += 32;
    }
    function me2(t3, e2, r3) {
      var n3;
      for (n3 = 0; 16 > n3; ++n3) i2(e2, r3 + 32 * n3, t3, 16);
    }
    function ve2(t3, e2) {
      var r3, n3 = 16;
      for (r3 = 0; 16 > r3; ++r3) n3 += t3[e2 - 1 + 32 * r3] + t3[e2 + r3 - 32];
      me2(n3 >> 5, t3, e2);
    }
    function be2(t3, e2) {
      var r3, n3 = 8;
      for (r3 = 0; 16 > r3; ++r3) n3 += t3[e2 - 1 + 32 * r3];
      me2(n3 >> 4, t3, e2);
    }
    function ye2(t3, e2) {
      var r3, n3 = 8;
      for (r3 = 0; 16 > r3; ++r3) n3 += t3[e2 + r3 - 32];
      me2(n3 >> 4, t3, e2);
    }
    function we(t3, e2) {
      me2(128, t3, e2);
    }
    function Ne(t3, e2, r3) {
      return t3 + 2 * e2 + r3 + 2 >> 2;
    }
    function Le(t3, e2) {
      var r3, i3 = e2 - 32;
      i3 = new Uint8Array([Ne(t3[i3 - 1], t3[i3 + 0], t3[i3 + 1]), Ne(t3[i3 + 0], t3[i3 + 1], t3[i3 + 2]), Ne(t3[i3 + 1], t3[i3 + 2], t3[i3 + 3]), Ne(t3[i3 + 2], t3[i3 + 3], t3[i3 + 4])]);
      for (r3 = 0; 4 > r3; ++r3) n2(t3, e2 + 32 * r3, i3, 0, i3.length);
    }
    function Ae(t3, e2) {
      var r3 = t3[e2 - 1], n3 = t3[e2 - 1 + 32], i3 = t3[e2 - 1 + 64], a3 = t3[e2 - 1 + 96];
      I2(t3, e2 + 0, 16843009 * Ne(t3[e2 - 1 - 32], r3, n3)), I2(t3, e2 + 32, 16843009 * Ne(r3, n3, i3)), I2(t3, e2 + 64, 16843009 * Ne(n3, i3, a3)), I2(t3, e2 + 96, 16843009 * Ne(i3, a3, a3));
    }
    function xe(t3, e2) {
      var r3, n3 = 4;
      for (r3 = 0; 4 > r3; ++r3) n3 += t3[e2 + r3 - 32] + t3[e2 - 1 + 32 * r3];
      for (n3 >>= 3, r3 = 0; 4 > r3; ++r3) i2(t3, e2 + 32 * r3, n3, 4);
    }
    function Se(t3, e2) {
      var r3 = t3[e2 - 1 + 0], n3 = t3[e2 - 1 + 32], i3 = t3[e2 - 1 + 64], a3 = t3[e2 - 1 - 32], o3 = t3[e2 + 0 - 32], s3 = t3[e2 + 1 - 32], u4 = t3[e2 + 2 - 32], c4 = t3[e2 + 3 - 32];
      t3[e2 + 0 + 96] = Ne(n3, i3, t3[e2 - 1 + 96]), t3[e2 + 1 + 96] = t3[e2 + 0 + 64] = Ne(r3, n3, i3), t3[e2 + 2 + 96] = t3[e2 + 1 + 64] = t3[e2 + 0 + 32] = Ne(a3, r3, n3), t3[e2 + 3 + 96] = t3[e2 + 2 + 64] = t3[e2 + 1 + 32] = t3[e2 + 0 + 0] = Ne(o3, a3, r3), t3[e2 + 3 + 64] = t3[e2 + 2 + 32] = t3[e2 + 1 + 0] = Ne(s3, o3, a3), t3[e2 + 3 + 32] = t3[e2 + 2 + 0] = Ne(u4, s3, o3), t3[e2 + 3 + 0] = Ne(c4, u4, s3);
    }
    function _e(t3, e2) {
      var r3 = t3[e2 + 1 - 32], n3 = t3[e2 + 2 - 32], i3 = t3[e2 + 3 - 32], a3 = t3[e2 + 4 - 32], o3 = t3[e2 + 5 - 32], s3 = t3[e2 + 6 - 32], u4 = t3[e2 + 7 - 32];
      t3[e2 + 0 + 0] = Ne(t3[e2 + 0 - 32], r3, n3), t3[e2 + 1 + 0] = t3[e2 + 0 + 32] = Ne(r3, n3, i3), t3[e2 + 2 + 0] = t3[e2 + 1 + 32] = t3[e2 + 0 + 64] = Ne(n3, i3, a3), t3[e2 + 3 + 0] = t3[e2 + 2 + 32] = t3[e2 + 1 + 64] = t3[e2 + 0 + 96] = Ne(i3, a3, o3), t3[e2 + 3 + 32] = t3[e2 + 2 + 64] = t3[e2 + 1 + 96] = Ne(a3, o3, s3), t3[e2 + 3 + 64] = t3[e2 + 2 + 96] = Ne(o3, s3, u4), t3[e2 + 3 + 96] = Ne(s3, u4, u4);
    }
    function Pe(t3, e2) {
      var r3 = t3[e2 - 1 + 0], n3 = t3[e2 - 1 + 32], i3 = t3[e2 - 1 + 64], a3 = t3[e2 - 1 - 32], o3 = t3[e2 + 0 - 32], s3 = t3[e2 + 1 - 32], u4 = t3[e2 + 2 - 32], c4 = t3[e2 + 3 - 32];
      t3[e2 + 0 + 0] = t3[e2 + 1 + 64] = a3 + o3 + 1 >> 1, t3[e2 + 1 + 0] = t3[e2 + 2 + 64] = o3 + s3 + 1 >> 1, t3[e2 + 2 + 0] = t3[e2 + 3 + 64] = s3 + u4 + 1 >> 1, t3[e2 + 3 + 0] = u4 + c4 + 1 >> 1, t3[e2 + 0 + 96] = Ne(i3, n3, r3), t3[e2 + 0 + 64] = Ne(n3, r3, a3), t3[e2 + 0 + 32] = t3[e2 + 1 + 96] = Ne(r3, a3, o3), t3[e2 + 1 + 32] = t3[e2 + 2 + 96] = Ne(a3, o3, s3), t3[e2 + 2 + 32] = t3[e2 + 3 + 96] = Ne(o3, s3, u4), t3[e2 + 3 + 32] = Ne(s3, u4, c4);
    }
    function ke(t3, e2) {
      var r3 = t3[e2 + 0 - 32], n3 = t3[e2 + 1 - 32], i3 = t3[e2 + 2 - 32], a3 = t3[e2 + 3 - 32], o3 = t3[e2 + 4 - 32], s3 = t3[e2 + 5 - 32], u4 = t3[e2 + 6 - 32], c4 = t3[e2 + 7 - 32];
      t3[e2 + 0 + 0] = r3 + n3 + 1 >> 1, t3[e2 + 1 + 0] = t3[e2 + 0 + 64] = n3 + i3 + 1 >> 1, t3[e2 + 2 + 0] = t3[e2 + 1 + 64] = i3 + a3 + 1 >> 1, t3[e2 + 3 + 0] = t3[e2 + 2 + 64] = a3 + o3 + 1 >> 1, t3[e2 + 0 + 32] = Ne(r3, n3, i3), t3[e2 + 1 + 32] = t3[e2 + 0 + 96] = Ne(n3, i3, a3), t3[e2 + 2 + 32] = t3[e2 + 1 + 96] = Ne(i3, a3, o3), t3[e2 + 3 + 32] = t3[e2 + 2 + 96] = Ne(a3, o3, s3), t3[e2 + 3 + 64] = Ne(o3, s3, u4), t3[e2 + 3 + 96] = Ne(s3, u4, c4);
    }
    function Ie(t3, e2) {
      var r3 = t3[e2 - 1 + 0], n3 = t3[e2 - 1 + 32], i3 = t3[e2 - 1 + 64], a3 = t3[e2 - 1 + 96];
      t3[e2 + 0 + 0] = r3 + n3 + 1 >> 1, t3[e2 + 2 + 0] = t3[e2 + 0 + 32] = n3 + i3 + 1 >> 1, t3[e2 + 2 + 32] = t3[e2 + 0 + 64] = i3 + a3 + 1 >> 1, t3[e2 + 1 + 0] = Ne(r3, n3, i3), t3[e2 + 3 + 0] = t3[e2 + 1 + 32] = Ne(n3, i3, a3), t3[e2 + 3 + 32] = t3[e2 + 1 + 64] = Ne(i3, a3, a3), t3[e2 + 3 + 64] = t3[e2 + 2 + 64] = t3[e2 + 0 + 96] = t3[e2 + 1 + 96] = t3[e2 + 2 + 96] = t3[e2 + 3 + 96] = a3;
    }
    function Fe(t3, e2) {
      var r3 = t3[e2 - 1 + 0], n3 = t3[e2 - 1 + 32], i3 = t3[e2 - 1 + 64], a3 = t3[e2 - 1 + 96], o3 = t3[e2 - 1 - 32], s3 = t3[e2 + 0 - 32], u4 = t3[e2 + 1 - 32], c4 = t3[e2 + 2 - 32];
      t3[e2 + 0 + 0] = t3[e2 + 2 + 32] = r3 + o3 + 1 >> 1, t3[e2 + 0 + 32] = t3[e2 + 2 + 64] = n3 + r3 + 1 >> 1, t3[e2 + 0 + 64] = t3[e2 + 2 + 96] = i3 + n3 + 1 >> 1, t3[e2 + 0 + 96] = a3 + i3 + 1 >> 1, t3[e2 + 3 + 0] = Ne(s3, u4, c4), t3[e2 + 2 + 0] = Ne(o3, s3, u4), t3[e2 + 1 + 0] = t3[e2 + 3 + 32] = Ne(r3, o3, s3), t3[e2 + 1 + 32] = t3[e2 + 3 + 64] = Ne(n3, r3, o3), t3[e2 + 1 + 64] = t3[e2 + 3 + 96] = Ne(i3, n3, r3), t3[e2 + 1 + 96] = Ne(a3, i3, n3);
    }
    function Ce(t3, e2) {
      var r3;
      for (r3 = 0; 8 > r3; ++r3) n2(t3, e2 + 32 * r3, t3, e2 - 32, 8);
    }
    function je(t3, e2) {
      var r3;
      for (r3 = 0; 8 > r3; ++r3) i2(t3, e2, t3[e2 - 1], 8), e2 += 32;
    }
    function Oe(t3, e2, r3) {
      var n3;
      for (n3 = 0; 8 > n3; ++n3) i2(e2, r3 + 32 * n3, t3, 8);
    }
    function Be(t3, e2) {
      var r3, n3 = 8;
      for (r3 = 0; 8 > r3; ++r3) n3 += t3[e2 + r3 - 32] + t3[e2 - 1 + 32 * r3];
      Oe(n3 >> 4, t3, e2);
    }
    function Me(t3, e2) {
      var r3, n3 = 4;
      for (r3 = 0; 8 > r3; ++r3) n3 += t3[e2 + r3 - 32];
      Oe(n3 >> 3, t3, e2);
    }
    function Ee(t3, e2) {
      var r3, n3 = 4;
      for (r3 = 0; 8 > r3; ++r3) n3 += t3[e2 - 1 + 32 * r3];
      Oe(n3 >> 3, t3, e2);
    }
    function qe(t3, e2) {
      Oe(128, t3, e2);
    }
    function Re(t3, e2, r3) {
      var n3 = t3[e2 - r3], i3 = t3[e2 + 0], a3 = 3 * (i3 - n3) + jn[1020 + t3[e2 - 2 * r3] - t3[e2 + r3]], o3 = On[112 + (a3 + 4 >> 3)];
      t3[e2 - r3] = Bn[255 + n3 + On[112 + (a3 + 3 >> 3)]], t3[e2 + 0] = Bn[255 + i3 - o3];
    }
    function Te(t3, e2, r3, n3) {
      var i3 = t3[e2 + 0], a3 = t3[e2 + r3];
      return Mn[255 + t3[e2 - 2 * r3] - t3[e2 - r3]] > n3 || Mn[255 + a3 - i3] > n3;
    }
    function De(t3, e2, r3, n3) {
      return 4 * Mn[255 + t3[e2 - r3] - t3[e2 + 0]] + Mn[255 + t3[e2 - 2 * r3] - t3[e2 + r3]] <= n3;
    }
    function Ue(t3, e2, r3, n3, i3) {
      var a3 = t3[e2 - 3 * r3], o3 = t3[e2 - 2 * r3], s3 = t3[e2 - r3], u4 = t3[e2 + 0], c4 = t3[e2 + r3], l4 = t3[e2 + 2 * r3], h4 = t3[e2 + 3 * r3];
      return 4 * Mn[255 + s3 - u4] + Mn[255 + o3 - c4] > n3 ? 0 : Mn[255 + t3[e2 - 4 * r3] - a3] <= i3 && Mn[255 + a3 - o3] <= i3 && Mn[255 + o3 - s3] <= i3 && Mn[255 + h4 - l4] <= i3 && Mn[255 + l4 - c4] <= i3 && Mn[255 + c4 - u4] <= i3;
    }
    function ze(t3, e2, r3, n3) {
      var i3 = 2 * n3 + 1;
      for (n3 = 0; 16 > n3; ++n3) De(t3, e2 + n3, r3, i3) && Re(t3, e2 + n3, r3);
    }
    function He(t3, e2, r3, n3) {
      var i3 = 2 * n3 + 1;
      for (n3 = 0; 16 > n3; ++n3) De(t3, e2 + n3 * r3, 1, i3) && Re(t3, e2 + n3 * r3, 1);
    }
    function Ve(t3, e2, r3, n3) {
      var i3;
      for (i3 = 3; 0 < i3; --i3) ze(t3, e2 += 4 * r3, r3, n3);
    }
    function We(t3, e2, r3, n3) {
      var i3;
      for (i3 = 3; 0 < i3; --i3) He(t3, e2 += 4, r3, n3);
    }
    function Ge(t3, e2, r3, n3, i3, a3, o3, s3) {
      for (a3 = 2 * a3 + 1; 0 < i3--; ) {
        if (Ue(t3, e2, r3, a3, o3)) if (Te(t3, e2, r3, s3)) Re(t3, e2, r3);
        else {
          var u4 = t3, c4 = e2, l4 = r3, h4 = u4[c4 - 2 * l4], f4 = u4[c4 - l4], d4 = u4[c4 + 0], p4 = u4[c4 + l4], g4 = u4[c4 + 2 * l4], m4 = 27 * (b4 = jn[1020 + 3 * (d4 - f4) + jn[1020 + h4 - p4]]) + 63 >> 7, v4 = 18 * b4 + 63 >> 7, b4 = 9 * b4 + 63 >> 7;
          u4[c4 - 3 * l4] = Bn[255 + u4[c4 - 3 * l4] + b4], u4[c4 - 2 * l4] = Bn[255 + h4 + v4], u4[c4 - l4] = Bn[255 + f4 + m4], u4[c4 + 0] = Bn[255 + d4 - m4], u4[c4 + l4] = Bn[255 + p4 - v4], u4[c4 + 2 * l4] = Bn[255 + g4 - b4];
        }
        e2 += n3;
      }
    }
    function Ye(t3, e2, r3, n3, i3, a3, o3, s3) {
      for (a3 = 2 * a3 + 1; 0 < i3--; ) {
        if (Ue(t3, e2, r3, a3, o3)) if (Te(t3, e2, r3, s3)) Re(t3, e2, r3);
        else {
          var u4 = t3, c4 = e2, l4 = r3, h4 = u4[c4 - l4], f4 = u4[c4 + 0], d4 = u4[c4 + l4], p4 = On[112 + ((g4 = 3 * (f4 - h4)) + 4 >> 3)], g4 = On[112 + (g4 + 3 >> 3)], m4 = p4 + 1 >> 1;
          u4[c4 - 2 * l4] = Bn[255 + u4[c4 - 2 * l4] + m4], u4[c4 - l4] = Bn[255 + h4 + g4], u4[c4 + 0] = Bn[255 + f4 - p4], u4[c4 + l4] = Bn[255 + d4 - m4];
        }
        e2 += n3;
      }
    }
    function Je(t3, e2, r3, n3, i3, a3) {
      Ge(t3, e2, r3, 1, 16, n3, i3, a3);
    }
    function Xe(t3, e2, r3, n3, i3, a3) {
      Ge(t3, e2, 1, r3, 16, n3, i3, a3);
    }
    function Ke(t3, e2, r3, n3, i3, a3) {
      var o3;
      for (o3 = 3; 0 < o3; --o3) Ye(t3, e2 += 4 * r3, r3, 1, 16, n3, i3, a3);
    }
    function Ze(t3, e2, r3, n3, i3, a3) {
      var o3;
      for (o3 = 3; 0 < o3; --o3) Ye(t3, e2 += 4, 1, r3, 16, n3, i3, a3);
    }
    function $e(t3, e2, r3, n3, i3, a3, o3, s3) {
      Ge(t3, e2, i3, 1, 8, a3, o3, s3), Ge(r3, n3, i3, 1, 8, a3, o3, s3);
    }
    function Qe(t3, e2, r3, n3, i3, a3, o3, s3) {
      Ge(t3, e2, 1, i3, 8, a3, o3, s3), Ge(r3, n3, 1, i3, 8, a3, o3, s3);
    }
    function tr(t3, e2, r3, n3, i3, a3, o3, s3) {
      Ye(t3, e2 + 4 * i3, i3, 1, 8, a3, o3, s3), Ye(r3, n3 + 4 * i3, i3, 1, 8, a3, o3, s3);
    }
    function er(t3, e2, r3, n3, i3, a3, o3, s3) {
      Ye(t3, e2 + 4, 1, i3, 8, a3, o3, s3), Ye(r3, n3 + 4, 1, i3, 8, a3, o3, s3);
    }
    function rr() {
      this.ba = new ot2(), this.ec = [], this.cc = [], this.Mc = [], this.Dc = this.Nc = this.dc = this.fc = 0, this.Oa = new ut2(), this.memory = 0, this.Ib = "OutputFunc", this.Jb = "OutputAlphaFunc", this.Nd = "OutputRowFunc";
    }
    function nr() {
      this.data = [], this.offset = this.kd = this.ha = this.w = 0, this.na = [], this.xa = this.gb = this.Ja = this.Sa = this.P = 0;
    }
    function ir() {
      this.nc = this.Ea = this.b = this.hc = 0, this.K = [], this.w = 0;
    }
    function ar() {
      this.ua = 0, this.Wa = new M2(), this.vb = new M2(), this.md = this.xc = this.wc = 0, this.vc = [], this.Wb = 0, this.Ya = new d3(), this.yc = new h3();
    }
    function or() {
      this.xb = this.a = 0, this.l = new Gt2(), this.ca = new ot2(), this.V = [], this.Ba = 0, this.Ta = [], this.Ua = 0, this.m = new N3(), this.Pb = 0, this.wd = new N3(), this.Ma = this.$ = this.C = this.i = this.c = this.xd = 0, this.s = new ar(), this.ab = 0, this.gc = o2(4, ir), this.Oc = 0;
    }
    function sr() {
      this.Lc = this.Z = this.$a = this.i = this.c = 0, this.l = new Gt2(), this.ic = 0, this.ca = [], this.tb = 0, this.qd = null, this.rd = 0;
    }
    function ur(t3, e2, r3, n3, i3, a3, o3) {
      for (t3 = null == t3 ? 0 : t3[e2 + 0], e2 = 0; e2 < o3; ++e2) i3[a3 + e2] = t3 + r3[n3 + e2] & 255, t3 = i3[a3 + e2];
    }
    function cr(t3, e2, r3, n3, i3, a3, o3) {
      var s3;
      if (null == t3) ur(null, null, r3, n3, i3, a3, o3);
      else for (s3 = 0; s3 < o3; ++s3) i3[a3 + s3] = t3[e2 + s3] + r3[n3 + s3] & 255;
    }
    function lr(t3, e2, r3, n3, i3, a3, o3) {
      if (null == t3) ur(null, null, r3, n3, i3, a3, o3);
      else {
        var s3, u4 = t3[e2 + 0], c4 = u4, l4 = u4;
        for (s3 = 0; s3 < o3; ++s3) c4 = l4 + (u4 = t3[e2 + s3]) - c4, l4 = r3[n3 + s3] + (-256 & c4 ? 0 > c4 ? 0 : 255 : c4) & 255, c4 = u4, i3[a3 + s3] = l4;
      }
    }
    function hr(t3, r3, i3, o3) {
      var s3 = r3.width, u4 = r3.o;
      if (e(null != t3 && null != r3), 0 > i3 || 0 >= o3 || i3 + o3 > u4) return null;
      if (!t3.Cc) {
        if (null == t3.ga) {
          var c4;
          if (t3.ga = new sr(), (c4 = null == t3.ga) || (c4 = r3.width * r3.o, e(0 == t3.Gb.length), t3.Gb = a2(c4), t3.Uc = 0, null == t3.Gb ? c4 = 0 : (t3.mb = t3.Gb, t3.nb = t3.Uc, t3.rc = null, c4 = 1), c4 = !c4), !c4) {
            c4 = t3.ga;
            var l4 = t3.Fa, h4 = t3.P, f4 = t3.qc, d4 = t3.mb, p4 = t3.nb, g4 = h4 + 1, m4 = f4 - 1, b4 = c4.l;
            if (e(null != l4 && null != d4 && null != r3), mi[0] = null, mi[1] = ur, mi[2] = cr, mi[3] = lr, c4.ca = d4, c4.tb = p4, c4.c = r3.width, c4.i = r3.height, e(0 < c4.c && 0 < c4.i), 1 >= f4) r3 = 0;
            else if (c4.$a = l4[h4 + 0] >> 0 & 3, c4.Z = l4[h4 + 0] >> 2 & 3, c4.Lc = l4[h4 + 0] >> 4 & 3, h4 = l4[h4 + 0] >> 6 & 3, 0 > c4.$a || 1 < c4.$a || 4 <= c4.Z || 1 < c4.Lc || h4) r3 = 0;
            else if (b4.put = dt2, b4.ac = ft2, b4.bc = pt2, b4.ma = c4, b4.width = r3.width, b4.height = r3.height, b4.Da = r3.Da, b4.v = r3.v, b4.va = r3.va, b4.j = r3.j, b4.o = r3.o, c4.$a) t: {
              e(1 == c4.$a), r3 = kt2();
              e: for (; ; ) {
                if (null == r3) {
                  r3 = 0;
                  break t;
                }
                if (e(null != c4), c4.mc = r3, r3.c = c4.c, r3.i = c4.i, r3.l = c4.l, r3.l.ma = c4, r3.l.width = c4.c, r3.l.height = c4.i, r3.a = 0, v3(r3.m, l4, g4, m4), !It2(c4.c, c4.i, 1, r3, null)) break e;
                if (1 == r3.ab && 3 == r3.gc[0].hc && At2(r3.s) ? (c4.ic = 1, l4 = r3.c * r3.i, r3.Ta = null, r3.Ua = 0, r3.V = a2(l4), r3.Ba = 0, null == r3.V ? (r3.a = 1, r3 = 0) : r3 = 1) : (c4.ic = 0, r3 = Ft2(r3, c4.c)), !r3) break e;
                r3 = 1;
                break t;
              }
              c4.mc = null, r3 = 0;
            }
            else r3 = m4 >= c4.c * c4.i;
            c4 = !r3;
          }
          if (c4) return null;
          1 != t3.ga.Lc ? t3.Ga = 0 : o3 = u4 - i3;
        }
        e(null != t3.ga), e(i3 + o3 <= u4);
        t: {
          if (r3 = (l4 = t3.ga).c, u4 = l4.l.o, 0 == l4.$a) {
            if (g4 = t3.rc, m4 = t3.Vc, b4 = t3.Fa, h4 = t3.P + 1 + i3 * r3, f4 = t3.mb, d4 = t3.nb + i3 * r3, e(h4 <= t3.P + t3.qc), 0 != l4.Z) for (e(null != mi[l4.Z]), c4 = 0; c4 < o3; ++c4) mi[l4.Z](g4, m4, b4, h4, f4, d4, r3), g4 = f4, m4 = d4, d4 += r3, h4 += r3;
            else for (c4 = 0; c4 < o3; ++c4) n2(f4, d4, b4, h4, r3), g4 = f4, m4 = d4, d4 += r3, h4 += r3;
            t3.rc = g4, t3.Vc = m4;
          } else {
            if (e(null != l4.mc), r3 = i3 + o3, e(null != (c4 = l4.mc)), e(r3 <= c4.i), c4.C >= r3) r3 = 1;
            else if (l4.ic || mr(), l4.ic) {
              l4 = c4.V, g4 = c4.Ba, m4 = c4.c;
              var y4 = c4.i, w4 = (b4 = 1, h4 = c4.$ / m4, f4 = c4.$ % m4, d4 = c4.m, p4 = c4.s, c4.$), N4 = m4 * y4, L4 = m4 * r3, x3 = p4.wc, _3 = w4 < L4 ? wt2(p4, f4, h4) : null;
              e(w4 <= N4), e(r3 <= y4), e(At2(p4));
              e: for (; ; ) {
                for (; !d4.h && w4 < L4; ) {
                  if (f4 & x3 || (_3 = wt2(p4, f4, h4)), e(null != _3), S2(d4), 256 > (y4 = bt2(_3.G[0], _3.H[0], d4))) l4[g4 + w4] = y4, ++w4, ++f4 >= m4 && (f4 = 0, ++h4 <= r3 && !(h4 % 16) && St2(c4, h4));
                  else {
                    if (!(280 > y4)) {
                      b4 = 0;
                      break e;
                    }
                    y4 = mt2(y4 - 256, d4);
                    var P3, k3 = bt2(_3.G[4], _3.H[4], d4);
                    if (S2(d4), !(w4 >= (k3 = vt2(m4, k3 = mt2(k3, d4))) && N4 - w4 >= y4)) {
                      b4 = 0;
                      break e;
                    }
                    for (P3 = 0; P3 < y4; ++P3) l4[g4 + w4 + P3] = l4[g4 + w4 + P3 - k3];
                    for (w4 += y4, f4 += y4; f4 >= m4; ) f4 -= m4, ++h4 <= r3 && !(h4 % 16) && St2(c4, h4);
                    w4 < L4 && f4 & x3 && (_3 = wt2(p4, f4, h4));
                  }
                  e(d4.h == A2(d4));
                }
                St2(c4, h4 > r3 ? r3 : h4);
                break e;
              }
              !b4 || d4.h && w4 < N4 ? (b4 = 0, c4.a = d4.h ? 5 : 3) : c4.$ = w4, r3 = b4;
            } else r3 = _t2(c4, c4.V, c4.Ba, c4.c, c4.i, r3, Ct2);
            if (!r3) {
              o3 = 0;
              break t;
            }
          }
          i3 + o3 >= u4 && (t3.Cc = 1), o3 = 1;
        }
        if (!o3) return null;
        if (t3.Cc && (null != (o3 = t3.ga) && (o3.mc = null), t3.ga = null, 0 < t3.Ga)) return alert("todo:WebPDequantizeLevels"), null;
      }
      return t3.nb + i3 * s3;
    }
    function fr(t3, e2, r3, n3, i3, a3) {
      for (; 0 < i3--; ) {
        var o3, s3 = t3, u4 = e2 + (r3 ? 1 : 0), c4 = t3, l4 = e2 + (r3 ? 0 : 3);
        for (o3 = 0; o3 < n3; ++o3) {
          var h4 = c4[l4 + 4 * o3];
          255 != h4 && (h4 *= 32897, s3[u4 + 4 * o3 + 0] = s3[u4 + 4 * o3 + 0] * h4 >> 23, s3[u4 + 4 * o3 + 1] = s3[u4 + 4 * o3 + 1] * h4 >> 23, s3[u4 + 4 * o3 + 2] = s3[u4 + 4 * o3 + 2] * h4 >> 23);
        }
        e2 += a3;
      }
    }
    function dr(t3, e2, r3, n3, i3) {
      for (; 0 < n3--; ) {
        var a3;
        for (a3 = 0; a3 < r3; ++a3) {
          var o3 = t3[e2 + 2 * a3 + 0], s3 = 15 & (c4 = t3[e2 + 2 * a3 + 1]), u4 = 4369 * s3, c4 = (240 & c4 | c4 >> 4) * u4 >> 16;
          t3[e2 + 2 * a3 + 0] = (240 & o3 | o3 >> 4) * u4 >> 16 & 240 | (15 & o3 | o3 << 4) * u4 >> 16 >> 4 & 15, t3[e2 + 2 * a3 + 1] = 240 & c4 | s3;
        }
        e2 += i3;
      }
    }
    function pr(t3, e2, r3, n3, i3, a3, o3, s3) {
      var u4, c4, l4 = 255;
      for (c4 = 0; c4 < i3; ++c4) {
        for (u4 = 0; u4 < n3; ++u4) {
          var h4 = t3[e2 + u4];
          a3[o3 + 4 * u4] = h4, l4 &= h4;
        }
        e2 += r3, o3 += s3;
      }
      return 255 != l4;
    }
    function gr(t3, e2, r3, n3, i3) {
      var a3;
      for (a3 = 0; a3 < i3; ++a3) r3[n3 + a3] = t3[e2 + a3] >> 8;
    }
    function mr() {
      An = fr, xn = dr, Sn = pr, _n = gr;
    }
    function vr(r3, n3, i3) {
      t2[r3] = function(t3, r4, a3, o3, s3, u4, c4, l4, h4, f4, d4, p4, g4, m4, v4, b4, y4) {
        var w4, N4 = y4 - 1 >> 1, L4 = s3[u4 + 0] | c4[l4 + 0] << 16, A3 = h4[f4 + 0] | d4[p4 + 0] << 16;
        e(null != t3);
        var x3 = 3 * L4 + A3 + 131074 >> 2;
        for (n3(t3[r4 + 0], 255 & x3, x3 >> 16, g4, m4), null != a3 && (x3 = 3 * A3 + L4 + 131074 >> 2, n3(a3[o3 + 0], 255 & x3, x3 >> 16, v4, b4)), w4 = 1; w4 <= N4; ++w4) {
          var S3 = s3[u4 + w4] | c4[l4 + w4] << 16, _3 = h4[f4 + w4] | d4[p4 + w4] << 16, P3 = L4 + S3 + A3 + _3 + 524296, k3 = P3 + 2 * (S3 + A3) >> 3;
          x3 = k3 + L4 >> 1, L4 = (P3 = P3 + 2 * (L4 + _3) >> 3) + S3 >> 1, n3(t3[r4 + 2 * w4 - 1], 255 & x3, x3 >> 16, g4, m4 + (2 * w4 - 1) * i3), n3(t3[r4 + 2 * w4 - 0], 255 & L4, L4 >> 16, g4, m4 + (2 * w4 - 0) * i3), null != a3 && (x3 = P3 + A3 >> 1, L4 = k3 + _3 >> 1, n3(a3[o3 + 2 * w4 - 1], 255 & x3, x3 >> 16, v4, b4 + (2 * w4 - 1) * i3), n3(a3[o3 + 2 * w4 + 0], 255 & L4, L4 >> 16, v4, b4 + (2 * w4 + 0) * i3)), L4 = S3, A3 = _3;
        }
        1 & y4 || (x3 = 3 * L4 + A3 + 131074 >> 2, n3(t3[r4 + y4 - 1], 255 & x3, x3 >> 16, g4, m4 + (y4 - 1) * i3), null != a3 && (x3 = 3 * A3 + L4 + 131074 >> 2, n3(a3[o3 + y4 - 1], 255 & x3, x3 >> 16, v4, b4 + (y4 - 1) * i3)));
      };
    }
    function br() {
      vi[En] = bi, vi[qn] = wi, vi[Rn] = yi, vi[Tn] = Ni, vi[Dn] = Li, vi[Un] = Ai, vi[zn] = xi, vi[Hn] = wi, vi[Vn] = Ni, vi[Wn] = Li, vi[Gn] = Ai;
    }
    function yr(t3) {
      return t3 & ~Fi ? 0 > t3 ? 0 : 255 : t3 >> Ii;
    }
    function wr(t3, e2) {
      return yr((19077 * t3 >> 8) + (26149 * e2 >> 8) - 14234);
    }
    function Nr(t3, e2, r3) {
      return yr((19077 * t3 >> 8) - (6419 * e2 >> 8) - (13320 * r3 >> 8) + 8708);
    }
    function Lr(t3, e2) {
      return yr((19077 * t3 >> 8) + (33050 * e2 >> 8) - 17685);
    }
    function Ar(t3, e2, r3, n3, i3) {
      n3[i3 + 0] = wr(t3, r3), n3[i3 + 1] = Nr(t3, e2, r3), n3[i3 + 2] = Lr(t3, e2);
    }
    function xr(t3, e2, r3, n3, i3) {
      n3[i3 + 0] = Lr(t3, e2), n3[i3 + 1] = Nr(t3, e2, r3), n3[i3 + 2] = wr(t3, r3);
    }
    function Sr(t3, e2, r3, n3, i3) {
      var a3 = Nr(t3, e2, r3);
      e2 = a3 << 3 & 224 | Lr(t3, e2) >> 3, n3[i3 + 0] = 248 & wr(t3, r3) | a3 >> 5, n3[i3 + 1] = e2;
    }
    function _r(t3, e2, r3, n3, i3) {
      var a3 = 240 & Lr(t3, e2) | 15;
      n3[i3 + 0] = 240 & wr(t3, r3) | Nr(t3, e2, r3) >> 4, n3[i3 + 1] = a3;
    }
    function Pr(t3, e2, r3, n3, i3) {
      n3[i3 + 0] = 255, Ar(t3, e2, r3, n3, i3 + 1);
    }
    function kr(t3, e2, r3, n3, i3) {
      xr(t3, e2, r3, n3, i3), n3[i3 + 3] = 255;
    }
    function Ir(t3, e2, r3, n3, i3) {
      Ar(t3, e2, r3, n3, i3), n3[i3 + 3] = 255;
    }
    function Wt2(t3, e2) {
      return 0 > t3 ? 0 : t3 > e2 ? e2 : t3;
    }
    function Fr(e2, r3, n3) {
      t2[e2] = function(t3, e3, i3, a3, o3, s3, u4, c4, l4) {
        for (var h4 = c4 + (-2 & l4) * n3; c4 != h4; ) r3(t3[e3 + 0], i3[a3 + 0], o3[s3 + 0], u4, c4), r3(t3[e3 + 1], i3[a3 + 0], o3[s3 + 0], u4, c4 + n3), e3 += 2, ++a3, ++s3, c4 += 2 * n3;
        1 & l4 && r3(t3[e3 + 0], i3[a3 + 0], o3[s3 + 0], u4, c4);
      };
    }
    function Cr(t3, e2, r3) {
      return 0 == r3 ? 0 == t3 ? 0 == e2 ? 6 : 5 : 0 == e2 ? 4 : 0 : r3;
    }
    function jr(t3, e2, r3, n3, i3) {
      switch (t3 >>> 30) {
        case 3:
          on(e2, r3, n3, i3, 0);
          break;
        case 2:
          sn(e2, r3, n3, i3);
          break;
        case 1:
          cn(e2, r3, n3, i3);
      }
    }
    function Or(t3, e2) {
      var r3, a3, o3 = e2.M, s3 = e2.Nb, u4 = t3.oc, c4 = t3.pc + 40, l4 = t3.oc, h4 = t3.pc + 584, f4 = t3.oc, d4 = t3.pc + 600;
      for (r3 = 0; 16 > r3; ++r3) u4[c4 + 32 * r3 - 1] = 129;
      for (r3 = 0; 8 > r3; ++r3) l4[h4 + 32 * r3 - 1] = 129, f4[d4 + 32 * r3 - 1] = 129;
      for (0 < o3 ? u4[c4 - 1 - 32] = l4[h4 - 1 - 32] = f4[d4 - 1 - 32] = 129 : (i2(u4, c4 - 32 - 1, 127, 21), i2(l4, h4 - 32 - 1, 127, 9), i2(f4, d4 - 32 - 1, 127, 9)), a3 = 0; a3 < t3.za; ++a3) {
        var p4 = e2.ya[e2.aa + a3];
        if (0 < a3) {
          for (r3 = -1; 16 > r3; ++r3) n2(u4, c4 + 32 * r3 - 4, u4, c4 + 32 * r3 + 12, 4);
          for (r3 = -1; 8 > r3; ++r3) n2(l4, h4 + 32 * r3 - 4, l4, h4 + 32 * r3 + 4, 4), n2(f4, d4 + 32 * r3 - 4, f4, d4 + 32 * r3 + 4, 4);
        }
        var g4 = t3.Gd, m4 = t3.Hd + a3, v4 = p4.ad, b4 = p4.Hc;
        if (0 < o3 && (n2(u4, c4 - 32, g4[m4].y, 0, 16), n2(l4, h4 - 32, g4[m4].f, 0, 8), n2(f4, d4 - 32, g4[m4].ea, 0, 8)), p4.Za) {
          var y4 = u4, w4 = c4 - 32 + 16;
          for (0 < o3 && (a3 >= t3.za - 1 ? i2(y4, w4, g4[m4].y[15], 4) : n2(y4, w4, g4[m4 + 1].y, 0, 4)), r3 = 0; 4 > r3; r3++) y4[w4 + 128 + r3] = y4[w4 + 256 + r3] = y4[w4 + 384 + r3] = y4[w4 + 0 + r3];
          for (r3 = 0; 16 > r3; ++r3, b4 <<= 2) y4 = u4, w4 = c4 + Ri[r3], fi[p4.Ob[r3]](y4, w4), jr(b4, v4, 16 * +r3, y4, w4);
        } else if (y4 = Cr(a3, o3, p4.Ob[0]), hi[y4](u4, c4), 0 != b4) for (r3 = 0; 16 > r3; ++r3, b4 <<= 2) jr(b4, v4, 16 * +r3, u4, c4 + Ri[r3]);
        for (r3 = p4.Gc, y4 = Cr(a3, o3, p4.Dd), di[y4](l4, h4), di[y4](f4, d4), b4 = v4, y4 = l4, w4 = h4, 255 & (p4 = r3 >> 0) && (170 & p4 ? un(b4, 256, y4, w4) : ln2(b4, 256, y4, w4)), p4 = f4, b4 = d4, 255 & (r3 >>= 8) && (170 & r3 ? un(v4, 320, p4, b4) : ln2(v4, 320, p4, b4)), o3 < t3.Ub - 1 && (n2(g4[m4].y, 0, u4, c4 + 480, 16), n2(g4[m4].f, 0, l4, h4 + 224, 8), n2(g4[m4].ea, 0, f4, d4 + 224, 8)), r3 = 8 * s3 * t3.B, g4 = t3.sa, m4 = t3.ta + 16 * a3 + 16 * s3 * t3.R, v4 = t3.qa, p4 = t3.ra + 8 * a3 + r3, b4 = t3.Ha, y4 = t3.Ia + 8 * a3 + r3, r3 = 0; 16 > r3; ++r3) n2(g4, m4 + r3 * t3.R, u4, c4 + 32 * r3, 16);
        for (r3 = 0; 8 > r3; ++r3) n2(v4, p4 + r3 * t3.B, l4, h4 + 32 * r3, 8), n2(b4, y4 + r3 * t3.B, f4, d4 + 32 * r3, 8);
      }
    }
    function Br(t3, n3, i3, a3, o3, s3, u4, c4, l4) {
      var h4 = [0], f4 = [0], d4 = 0, p4 = null != l4 ? l4.kd : 0, g4 = null != l4 ? l4 : new nr();
      if (null == t3 || 12 > i3) return 7;
      g4.data = t3, g4.w = n3, g4.ha = i3, n3 = [n3], i3 = [i3], g4.gb = [g4.gb];
      t: {
        var m4 = n3, b4 = i3, y4 = g4.gb;
        if (e(null != t3), e(null != b4), e(null != y4), y4[0] = 0, 12 <= b4[0] && !r2(t3, m4[0], "RIFF")) {
          if (r2(t3, m4[0] + 8, "WEBP")) {
            y4 = 3;
            break t;
          }
          var w4 = j2(t3, m4[0] + 4);
          if (12 > w4 || 4294967286 < w4) {
            y4 = 3;
            break t;
          }
          if (p4 && w4 > b4[0] - 8) {
            y4 = 7;
            break t;
          }
          y4[0] = w4, m4[0] += 12, b4[0] -= 12;
        }
        y4 = 0;
      }
      if (0 != y4) return y4;
      for (w4 = 0 < g4.gb[0], i3 = i3[0]; ; ) {
        t: {
          var L4 = t3;
          b4 = n3, y4 = i3;
          var A3 = h4, x3 = f4, S3 = m4 = [0];
          if ((k3 = d4 = [d4])[0] = 0, 8 > y4[0]) y4 = 7;
          else {
            if (!r2(L4, b4[0], "VP8X")) {
              if (10 != j2(L4, b4[0] + 4)) {
                y4 = 3;
                break t;
              }
              if (18 > y4[0]) {
                y4 = 7;
                break t;
              }
              var _3 = j2(L4, b4[0] + 8), P3 = 1 + C2(L4, b4[0] + 12);
              if (2147483648 <= P3 * (L4 = 1 + C2(L4, b4[0] + 15))) {
                y4 = 3;
                break t;
              }
              null != S3 && (S3[0] = _3), null != A3 && (A3[0] = P3), null != x3 && (x3[0] = L4), b4[0] += 18, y4[0] -= 18, k3[0] = 1;
            }
            y4 = 0;
          }
        }
        if (d4 = d4[0], m4 = m4[0], 0 != y4) return y4;
        if (b4 = !!(2 & m4), !w4 && d4) return 3;
        if (null != s3 && (s3[0] = !!(16 & m4)), null != u4 && (u4[0] = b4), null != c4 && (c4[0] = 0), u4 = h4[0], m4 = f4[0], d4 && b4 && null == l4) {
          y4 = 0;
          break;
        }
        if (4 > i3) {
          y4 = 7;
          break;
        }
        if (w4 && d4 || !w4 && !d4 && !r2(t3, n3[0], "ALPH")) {
          i3 = [i3], g4.na = [g4.na], g4.P = [g4.P], g4.Sa = [g4.Sa];
          t: {
            _3 = t3, y4 = n3, w4 = i3;
            var k3 = g4.gb;
            A3 = g4.na, x3 = g4.P, S3 = g4.Sa;
            P3 = 22, e(null != _3), e(null != w4), L4 = y4[0];
            var I3 = w4[0];
            for (e(null != A3), e(null != S3), A3[0] = null, x3[0] = null, S3[0] = 0; ; ) {
              if (y4[0] = L4, w4[0] = I3, 8 > I3) {
                y4 = 7;
                break t;
              }
              var F3 = j2(_3, L4 + 4);
              if (4294967286 < F3) {
                y4 = 3;
                break t;
              }
              var O3 = 8 + F3 + 1 & -2;
              if (P3 += O3, 0 < k3 && P3 > k3) {
                y4 = 3;
                break t;
              }
              if (!r2(_3, L4, "VP8 ") || !r2(_3, L4, "VP8L")) {
                y4 = 0;
                break t;
              }
              if (I3[0] < O3) {
                y4 = 7;
                break t;
              }
              r2(_3, L4, "ALPH") || (A3[0] = _3, x3[0] = L4 + 8, S3[0] = F3), L4 += O3, I3 -= O3;
            }
          }
          if (i3 = i3[0], g4.na = g4.na[0], g4.P = g4.P[0], g4.Sa = g4.Sa[0], 0 != y4) break;
        }
        i3 = [i3], g4.Ja = [g4.Ja], g4.xa = [g4.xa];
        t: if (k3 = t3, y4 = n3, w4 = i3, A3 = g4.gb[0], x3 = g4.Ja, S3 = g4.xa, _3 = y4[0], L4 = !r2(k3, _3, "VP8 "), P3 = !r2(k3, _3, "VP8L"), e(null != k3), e(null != w4), e(null != x3), e(null != S3), 8 > w4[0]) y4 = 7;
        else {
          if (L4 || P3) {
            if (k3 = j2(k3, _3 + 4), 12 <= A3 && k3 > A3 - 12) {
              y4 = 3;
              break t;
            }
            if (p4 && k3 > w4[0] - 8) {
              y4 = 7;
              break t;
            }
            x3[0] = k3, y4[0] += 8, w4[0] -= 8, S3[0] = P3;
          } else S3[0] = 5 <= w4[0] && 47 == k3[_3 + 0] && !(k3[_3 + 4] >> 5), x3[0] = w4[0];
          y4 = 0;
        }
        if (i3 = i3[0], g4.Ja = g4.Ja[0], g4.xa = g4.xa[0], n3 = n3[0], 0 != y4) break;
        if (4294967286 < g4.Ja) return 3;
        if (null == c4 || b4 || (c4[0] = g4.xa ? 2 : 1), u4 = [u4], m4 = [m4], g4.xa) {
          if (5 > i3) {
            y4 = 7;
            break;
          }
          c4 = u4, p4 = m4, b4 = s3, null == t3 || 5 > i3 ? t3 = 0 : 5 <= i3 && 47 == t3[n3 + 0] && !(t3[n3 + 4] >> 5) ? (w4 = [0], k3 = [0], A3 = [0], v3(x3 = new N3(), t3, n3, i3), gt2(x3, w4, k3, A3) ? (null != c4 && (c4[0] = w4[0]), null != p4 && (p4[0] = k3[0]), null != b4 && (b4[0] = A3[0]), t3 = 1) : t3 = 0) : t3 = 0;
        } else {
          if (10 > i3) {
            y4 = 7;
            break;
          }
          c4 = m4, null == t3 || 10 > i3 || !Xt2(t3, n3 + 3, i3 - 3) ? t3 = 0 : (p4 = t3[n3 + 0] | t3[n3 + 1] << 8 | t3[n3 + 2] << 16, b4 = 16383 & (t3[n3 + 7] << 8 | t3[n3 + 6]), t3 = 16383 & (t3[n3 + 9] << 8 | t3[n3 + 8]), 1 & p4 || 3 < (p4 >> 1 & 7) || !(p4 >> 4 & 1) || p4 >> 5 >= g4.Ja || !b4 || !t3 ? t3 = 0 : (u4 && (u4[0] = b4), c4 && (c4[0] = t3), t3 = 1));
        }
        if (!t3) return 3;
        if (u4 = u4[0], m4 = m4[0], d4 && (h4[0] != u4 || f4[0] != m4)) return 3;
        null != l4 && (l4[0] = g4, l4.offset = n3 - l4.w, e(4294967286 > n3 - l4.w), e(l4.offset == l4.ha - i3));
        break;
      }
      return 0 == y4 || 7 == y4 && d4 && null == l4 ? (null != s3 && (s3[0] |= null != g4.na && 0 < g4.na.length), null != a3 && (a3[0] = u4), null != o3 && (o3[0] = m4), 0) : y4;
    }
    function Mr(t3, e2, r3) {
      var n3 = e2.width, i3 = e2.height, a3 = 0, o3 = 0, s3 = n3, u4 = i3;
      if (e2.Da = null != t3 && 0 < t3.Da, e2.Da && (s3 = t3.cd, u4 = t3.bd, a3 = t3.v, o3 = t3.j, 11 > r3 || (a3 &= -2, o3 &= -2), 0 > a3 || 0 > o3 || 0 >= s3 || 0 >= u4 || a3 + s3 > n3 || o3 + u4 > i3)) return 0;
      if (e2.v = a3, e2.j = o3, e2.va = a3 + s3, e2.o = o3 + u4, e2.U = s3, e2.T = u4, e2.da = null != t3 && 0 < t3.da, e2.da) {
        if (!E2(s3, u4, r3 = [t3.ib], a3 = [t3.hb])) return 0;
        e2.ib = r3[0], e2.hb = a3[0];
      }
      return e2.ob = null != t3 && t3.ob, e2.Kb = null == t3 || !t3.Sd, e2.da && (e2.ob = e2.ib < 3 * n3 / 4 && e2.hb < 3 * i3 / 4, e2.Kb = 0), 1;
    }
    function Er(t3) {
      if (null == t3) return 2;
      if (11 > t3.S) {
        var e2 = t3.f.RGBA;
        e2.fb += (t3.height - 1) * e2.A, e2.A = -e2.A;
      } else e2 = t3.f.kb, t3 = t3.height, e2.O += (t3 - 1) * e2.fa, e2.fa = -e2.fa, e2.N += (t3 - 1 >> 1) * e2.Ab, e2.Ab = -e2.Ab, e2.W += (t3 - 1 >> 1) * e2.Db, e2.Db = -e2.Db, null != e2.F && (e2.J += (t3 - 1) * e2.lb, e2.lb = -e2.lb);
      return 0;
    }
    function qr(t3, e2, r3, n3) {
      if (null == n3 || 0 >= t3 || 0 >= e2) return 2;
      if (null != r3) {
        if (r3.Da) {
          var i3 = r3.cd, o3 = r3.bd, s3 = -2 & r3.v, u4 = -2 & r3.j;
          if (0 > s3 || 0 > u4 || 0 >= i3 || 0 >= o3 || s3 + i3 > t3 || u4 + o3 > e2) return 2;
          t3 = i3, e2 = o3;
        }
        if (r3.da) {
          if (!E2(t3, e2, i3 = [r3.ib], o3 = [r3.hb])) return 2;
          t3 = i3[0], e2 = o3[0];
        }
      }
      n3.width = t3, n3.height = e2;
      t: {
        var c4 = n3.width, l4 = n3.height;
        if (t3 = n3.S, 0 >= c4 || 0 >= l4 || !(t3 >= En && 13 > t3)) t3 = 2;
        else {
          if (0 >= n3.Rd && null == n3.sd) {
            s3 = o3 = i3 = e2 = 0;
            var h4 = (u4 = c4 * zi[t3]) * l4;
            if (11 > t3 || (o3 = (l4 + 1) / 2 * (e2 = (c4 + 1) / 2), 12 == t3 && (s3 = (i3 = c4) * l4)), null == (l4 = a2(h4 + 2 * o3 + s3))) {
              t3 = 1;
              break t;
            }
            n3.sd = l4, 11 > t3 ? ((c4 = n3.f.RGBA).eb = l4, c4.fb = 0, c4.A = u4, c4.size = h4) : ((c4 = n3.f.kb).y = l4, c4.O = 0, c4.fa = u4, c4.Fd = h4, c4.f = l4, c4.N = 0 + h4, c4.Ab = e2, c4.Cd = o3, c4.ea = l4, c4.W = 0 + h4 + o3, c4.Db = e2, c4.Ed = o3, 12 == t3 && (c4.F = l4, c4.J = 0 + h4 + 2 * o3), c4.Tc = s3, c4.lb = i3);
          }
          if (e2 = 1, i3 = n3.S, o3 = n3.width, s3 = n3.height, i3 >= En && 13 > i3) {
            if (11 > i3) t3 = n3.f.RGBA, e2 &= (u4 = Math.abs(t3.A)) * (s3 - 1) + o3 <= t3.size, e2 &= u4 >= o3 * zi[i3], e2 &= null != t3.eb;
            else {
              t3 = n3.f.kb, u4 = (o3 + 1) / 2, h4 = (s3 + 1) / 2, c4 = Math.abs(t3.fa);
              l4 = Math.abs(t3.Ab);
              var f4 = Math.abs(t3.Db), d4 = Math.abs(t3.lb), p4 = d4 * (s3 - 1) + o3;
              e2 &= c4 * (s3 - 1) + o3 <= t3.Fd, e2 &= l4 * (h4 - 1) + u4 <= t3.Cd, e2 = (e2 &= f4 * (h4 - 1) + u4 <= t3.Ed) & c4 >= o3 & l4 >= u4 & f4 >= u4, e2 &= null != t3.y, e2 &= null != t3.f, e2 &= null != t3.ea, 12 == i3 && (e2 &= d4 >= o3, e2 &= p4 <= t3.Tc, e2 &= null != t3.F);
            }
          } else e2 = 0;
          t3 = e2 ? 0 : 2;
        }
      }
      return 0 != t3 || null != r3 && r3.fd && (t3 = Er(n3)), t3;
    }
    var Rr = 64, Tr = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215], Dr = 24, Ur = 32, zr = 8, Hr = [0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
    T2("Predictor0", "PredictorAdd0"), t2.Predictor0 = function() {
      return 4278190080;
    }, t2.Predictor1 = function(t3) {
      return t3;
    }, t2.Predictor2 = function(t3, e2, r3) {
      return e2[r3 + 0];
    }, t2.Predictor3 = function(t3, e2, r3) {
      return e2[r3 + 1];
    }, t2.Predictor4 = function(t3, e2, r3) {
      return e2[r3 - 1];
    }, t2.Predictor5 = function(t3, e2, r3) {
      return U2(U2(t3, e2[r3 + 1]), e2[r3 + 0]);
    }, t2.Predictor6 = function(t3, e2, r3) {
      return U2(t3, e2[r3 - 1]);
    }, t2.Predictor7 = function(t3, e2, r3) {
      return U2(t3, e2[r3 + 0]);
    }, t2.Predictor8 = function(t3, e2, r3) {
      return U2(e2[r3 - 1], e2[r3 + 0]);
    }, t2.Predictor9 = function(t3, e2, r3) {
      return U2(e2[r3 + 0], e2[r3 + 1]);
    }, t2.Predictor10 = function(t3, e2, r3) {
      return U2(U2(t3, e2[r3 - 1]), U2(e2[r3 + 0], e2[r3 + 1]));
    }, t2.Predictor11 = function(t3, e2, r3) {
      var n3 = e2[r3 + 0];
      return 0 >= V2(n3 >> 24 & 255, t3 >> 24 & 255, (e2 = e2[r3 - 1]) >> 24 & 255) + V2(n3 >> 16 & 255, t3 >> 16 & 255, e2 >> 16 & 255) + V2(n3 >> 8 & 255, t3 >> 8 & 255, e2 >> 8 & 255) + V2(255 & n3, 255 & t3, 255 & e2) ? n3 : t3;
    }, t2.Predictor12 = function(t3, e2, r3) {
      var n3 = e2[r3 + 0];
      return (z2((t3 >> 24 & 255) + (n3 >> 24 & 255) - ((e2 = e2[r3 - 1]) >> 24 & 255)) << 24 | z2((t3 >> 16 & 255) + (n3 >> 16 & 255) - (e2 >> 16 & 255)) << 16 | z2((t3 >> 8 & 255) + (n3 >> 8 & 255) - (e2 >> 8 & 255)) << 8 | z2((255 & t3) + (255 & n3) - (255 & e2))) >>> 0;
    }, t2.Predictor13 = function(t3, e2, r3) {
      var n3 = e2[r3 - 1];
      return (H2((t3 = U2(t3, e2[r3 + 0])) >> 24 & 255, n3 >> 24 & 255) << 24 | H2(t3 >> 16 & 255, n3 >> 16 & 255) << 16 | H2(t3 >> 8 & 255, n3 >> 8 & 255) << 8 | H2(t3 >> 0 & 255, n3 >> 0 & 255)) >>> 0;
    };
    var Vr = t2.PredictorAdd0;
    t2.PredictorAdd1 = W2, T2("Predictor2", "PredictorAdd2"), T2("Predictor3", "PredictorAdd3"), T2("Predictor4", "PredictorAdd4"), T2("Predictor5", "PredictorAdd5"), T2("Predictor6", "PredictorAdd6"), T2("Predictor7", "PredictorAdd7"), T2("Predictor8", "PredictorAdd8"), T2("Predictor9", "PredictorAdd9"), T2("Predictor10", "PredictorAdd10"), T2("Predictor11", "PredictorAdd11"), T2("Predictor12", "PredictorAdd12"), T2("Predictor13", "PredictorAdd13");
    var Wr = t2.PredictorAdd2;
    X2("ColorIndexInverseTransform", "MapARGB", "32b", function(t3) {
      return t3 >> 8 & 255;
    }, function(t3) {
      return t3;
    }), X2("VP8LColorIndexInverseTransformAlpha", "MapAlpha", "8b", function(t3) {
      return t3;
    }, function(t3) {
      return t3 >> 8 & 255;
    });
    var Gr, Yr = t2.ColorIndexInverseTransform, Jr = t2.MapARGB, Xr = t2.VP8LColorIndexInverseTransformAlpha, Kr = t2.MapAlpha, Zr = t2.VP8LPredictorsAdd = [];
    Zr.length = 16, (t2.VP8LPredictors = []).length = 16, (t2.VP8LPredictorsAdd_C = []).length = 16, (t2.VP8LPredictors_C = []).length = 16;
    var $r, Qr, tn, en, rn, nn, an, on, sn, un, cn, ln2, hn, fn, dn, pn, gn, mn, vn, bn, yn, wn, Nn, Ln, An, xn, Sn, _n, Pn = a2(511), kn = a2(2041), In = a2(225), Fn = a2(767), Cn = 0, jn = kn, On = In, Bn = Fn, Mn = Pn, En = 0, qn = 1, Rn = 2, Tn = 3, Dn = 4, Un = 5, zn = 6, Hn = 7, Vn = 8, Wn = 9, Gn = 10, Yn = [2, 3, 7], Jn = [3, 3, 11], Xn = [280, 256, 256, 256, 40], Kn = [0, 1, 1, 1, 0], Zn = [17, 18, 0, 1, 2, 3, 4, 5, 16, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], $n = [24, 7, 23, 25, 40, 6, 39, 41, 22, 26, 38, 42, 56, 5, 55, 57, 21, 27, 54, 58, 37, 43, 72, 4, 71, 73, 20, 28, 53, 59, 70, 74, 36, 44, 88, 69, 75, 52, 60, 3, 87, 89, 19, 29, 86, 90, 35, 45, 68, 76, 85, 91, 51, 61, 104, 2, 103, 105, 18, 30, 102, 106, 34, 46, 84, 92, 67, 77, 101, 107, 50, 62, 120, 1, 119, 121, 83, 93, 17, 31, 100, 108, 66, 78, 118, 122, 33, 47, 117, 123, 49, 63, 99, 109, 82, 94, 0, 116, 124, 65, 79, 16, 32, 98, 110, 48, 115, 125, 81, 95, 64, 114, 126, 97, 111, 80, 113, 127, 96, 112], Qn = [2954, 2956, 2958, 2962, 2970, 2986, 3018, 3082, 3212, 3468, 3980, 5004], ti = 8, ei = [4, 5, 6, 7, 8, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 17, 18, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 25, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 93, 95, 96, 98, 100, 101, 102, 104, 106, 108, 110, 112, 114, 116, 118, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 143, 145, 148, 151, 154, 157], ri = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 119, 122, 125, 128, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 167, 170, 173, 177, 181, 185, 189, 193, 197, 201, 205, 209, 213, 217, 221, 225, 229, 234, 239, 245, 249, 254, 259, 264, 269, 274, 279, 284], ni = null, ii = [[173, 148, 140, 0], [176, 155, 140, 135, 0], [180, 157, 141, 134, 130, 0], [254, 254, 243, 230, 196, 177, 153, 140, 133, 130, 129, 0]], ai = [0, 1, 4, 8, 5, 2, 3, 6, 9, 12, 13, 10, 7, 11, 14, 15], oi = [-0, 1, -1, 2, -2, 3, 4, 6, -3, 5, -4, -5, -6, 7, -7, 8, -8, -9], si = [[[[128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]], [[253, 136, 254, 255, 228, 219, 128, 128, 128, 128, 128], [189, 129, 242, 255, 227, 213, 255, 219, 128, 128, 128], [106, 126, 227, 252, 214, 209, 255, 255, 128, 128, 128]], [[1, 98, 248, 255, 236, 226, 255, 255, 128, 128, 128], [181, 133, 238, 254, 221, 234, 255, 154, 128, 128, 128], [78, 134, 202, 247, 198, 180, 255, 219, 128, 128, 128]], [[1, 185, 249, 255, 243, 255, 128, 128, 128, 128, 128], [184, 150, 247, 255, 236, 224, 128, 128, 128, 128, 128], [77, 110, 216, 255, 236, 230, 128, 128, 128, 128, 128]], [[1, 101, 251, 255, 241, 255, 128, 128, 128, 128, 128], [170, 139, 241, 252, 236, 209, 255, 255, 128, 128, 128], [37, 116, 196, 243, 228, 255, 255, 255, 128, 128, 128]], [[1, 204, 254, 255, 245, 255, 128, 128, 128, 128, 128], [207, 160, 250, 255, 238, 128, 128, 128, 128, 128, 128], [102, 103, 231, 255, 211, 171, 128, 128, 128, 128, 128]], [[1, 152, 252, 255, 240, 255, 128, 128, 128, 128, 128], [177, 135, 243, 255, 234, 225, 128, 128, 128, 128, 128], [80, 129, 211, 255, 194, 224, 128, 128, 128, 128, 128]], [[1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [246, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]]], [[[198, 35, 237, 223, 193, 187, 162, 160, 145, 155, 62], [131, 45, 198, 221, 172, 176, 220, 157, 252, 221, 1], [68, 47, 146, 208, 149, 167, 221, 162, 255, 223, 128]], [[1, 149, 241, 255, 221, 224, 255, 255, 128, 128, 128], [184, 141, 234, 253, 222, 220, 255, 199, 128, 128, 128], [81, 99, 181, 242, 176, 190, 249, 202, 255, 255, 128]], [[1, 129, 232, 253, 214, 197, 242, 196, 255, 255, 128], [99, 121, 210, 250, 201, 198, 255, 202, 128, 128, 128], [23, 91, 163, 242, 170, 187, 247, 210, 255, 255, 128]], [[1, 200, 246, 255, 234, 255, 128, 128, 128, 128, 128], [109, 178, 241, 255, 231, 245, 255, 255, 128, 128, 128], [44, 130, 201, 253, 205, 192, 255, 255, 128, 128, 128]], [[1, 132, 239, 251, 219, 209, 255, 165, 128, 128, 128], [94, 136, 225, 251, 218, 190, 255, 255, 128, 128, 128], [22, 100, 174, 245, 186, 161, 255, 199, 128, 128, 128]], [[1, 182, 249, 255, 232, 235, 128, 128, 128, 128, 128], [124, 143, 241, 255, 227, 234, 128, 128, 128, 128, 128], [35, 77, 181, 251, 193, 211, 255, 205, 128, 128, 128]], [[1, 157, 247, 255, 236, 231, 255, 255, 128, 128, 128], [121, 141, 235, 255, 225, 227, 255, 255, 128, 128, 128], [45, 99, 188, 251, 195, 217, 255, 224, 128, 128, 128]], [[1, 1, 251, 255, 213, 255, 128, 128, 128, 128, 128], [203, 1, 248, 255, 255, 128, 128, 128, 128, 128, 128], [137, 1, 177, 255, 224, 255, 128, 128, 128, 128, 128]]], [[[253, 9, 248, 251, 207, 208, 255, 192, 128, 128, 128], [175, 13, 224, 243, 193, 185, 249, 198, 255, 255, 128], [73, 17, 171, 221, 161, 179, 236, 167, 255, 234, 128]], [[1, 95, 247, 253, 212, 183, 255, 255, 128, 128, 128], [239, 90, 244, 250, 211, 209, 255, 255, 128, 128, 128], [155, 77, 195, 248, 188, 195, 255, 255, 128, 128, 128]], [[1, 24, 239, 251, 218, 219, 255, 205, 128, 128, 128], [201, 51, 219, 255, 196, 186, 128, 128, 128, 128, 128], [69, 46, 190, 239, 201, 218, 255, 228, 128, 128, 128]], [[1, 191, 251, 255, 255, 128, 128, 128, 128, 128, 128], [223, 165, 249, 255, 213, 255, 128, 128, 128, 128, 128], [141, 124, 248, 255, 255, 128, 128, 128, 128, 128, 128]], [[1, 16, 248, 255, 255, 128, 128, 128, 128, 128, 128], [190, 36, 230, 255, 236, 255, 128, 128, 128, 128, 128], [149, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[1, 226, 255, 128, 128, 128, 128, 128, 128, 128, 128], [247, 192, 255, 128, 128, 128, 128, 128, 128, 128, 128], [240, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[1, 134, 252, 255, 255, 128, 128, 128, 128, 128, 128], [213, 62, 250, 255, 255, 128, 128, 128, 128, 128, 128], [55, 93, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]]], [[[202, 24, 213, 235, 186, 191, 220, 160, 240, 175, 255], [126, 38, 182, 232, 169, 184, 228, 174, 255, 187, 128], [61, 46, 138, 219, 151, 178, 240, 170, 255, 216, 128]], [[1, 112, 230, 250, 199, 191, 247, 159, 255, 255, 128], [166, 109, 228, 252, 211, 215, 255, 174, 128, 128, 128], [39, 77, 162, 232, 172, 180, 245, 178, 255, 255, 128]], [[1, 52, 220, 246, 198, 199, 249, 220, 255, 255, 128], [124, 74, 191, 243, 183, 193, 250, 221, 255, 255, 128], [24, 71, 130, 219, 154, 170, 243, 182, 255, 255, 128]], [[1, 182, 225, 249, 219, 240, 255, 224, 128, 128, 128], [149, 150, 226, 252, 216, 205, 255, 171, 128, 128, 128], [28, 108, 170, 242, 183, 194, 254, 223, 255, 255, 128]], [[1, 81, 230, 252, 204, 203, 255, 192, 128, 128, 128], [123, 102, 209, 247, 188, 196, 255, 233, 128, 128, 128], [20, 95, 153, 243, 164, 173, 255, 203, 128, 128, 128]], [[1, 222, 248, 255, 216, 213, 128, 128, 128, 128, 128], [168, 175, 246, 252, 235, 205, 255, 255, 128, 128, 128], [47, 116, 215, 255, 211, 212, 255, 255, 128, 128, 128]], [[1, 121, 236, 253, 212, 214, 255, 255, 128, 128, 128], [141, 84, 213, 252, 201, 202, 255, 219, 128, 128, 128], [42, 80, 160, 240, 162, 185, 255, 205, 128, 128, 128]], [[1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [244, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [238, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]]]], ui = [[[231, 120, 48, 89, 115, 113, 120, 152, 112], [152, 179, 64, 126, 170, 118, 46, 70, 95], [175, 69, 143, 80, 85, 82, 72, 155, 103], [56, 58, 10, 171, 218, 189, 17, 13, 152], [114, 26, 17, 163, 44, 195, 21, 10, 173], [121, 24, 80, 195, 26, 62, 44, 64, 85], [144, 71, 10, 38, 171, 213, 144, 34, 26], [170, 46, 55, 19, 136, 160, 33, 206, 71], [63, 20, 8, 114, 114, 208, 12, 9, 226], [81, 40, 11, 96, 182, 84, 29, 16, 36]], [[134, 183, 89, 137, 98, 101, 106, 165, 148], [72, 187, 100, 130, 157, 111, 32, 75, 80], [66, 102, 167, 99, 74, 62, 40, 234, 128], [41, 53, 9, 178, 241, 141, 26, 8, 107], [74, 43, 26, 146, 73, 166, 49, 23, 157], [65, 38, 105, 160, 51, 52, 31, 115, 128], [104, 79, 12, 27, 217, 255, 87, 17, 7], [87, 68, 71, 44, 114, 51, 15, 186, 23], [47, 41, 14, 110, 182, 183, 21, 17, 194], [66, 45, 25, 102, 197, 189, 23, 18, 22]], [[88, 88, 147, 150, 42, 46, 45, 196, 205], [43, 97, 183, 117, 85, 38, 35, 179, 61], [39, 53, 200, 87, 26, 21, 43, 232, 171], [56, 34, 51, 104, 114, 102, 29, 93, 77], [39, 28, 85, 171, 58, 165, 90, 98, 64], [34, 22, 116, 206, 23, 34, 43, 166, 73], [107, 54, 32, 26, 51, 1, 81, 43, 31], [68, 25, 106, 22, 64, 171, 36, 225, 114], [34, 19, 21, 102, 132, 188, 16, 76, 124], [62, 18, 78, 95, 85, 57, 50, 48, 51]], [[193, 101, 35, 159, 215, 111, 89, 46, 111], [60, 148, 31, 172, 219, 228, 21, 18, 111], [112, 113, 77, 85, 179, 255, 38, 120, 114], [40, 42, 1, 196, 245, 209, 10, 25, 109], [88, 43, 29, 140, 166, 213, 37, 43, 154], [61, 63, 30, 155, 67, 45, 68, 1, 209], [100, 80, 8, 43, 154, 1, 51, 26, 71], [142, 78, 78, 16, 255, 128, 34, 197, 171], [41, 40, 5, 102, 211, 183, 4, 1, 221], [51, 50, 17, 168, 209, 192, 23, 25, 82]], [[138, 31, 36, 171, 27, 166, 38, 44, 229], [67, 87, 58, 169, 82, 115, 26, 59, 179], [63, 59, 90, 180, 59, 166, 93, 73, 154], [40, 40, 21, 116, 143, 209, 34, 39, 175], [47, 15, 16, 183, 34, 223, 49, 45, 183], [46, 17, 33, 183, 6, 98, 15, 32, 183], [57, 46, 22, 24, 128, 1, 54, 17, 37], [65, 32, 73, 115, 28, 128, 23, 128, 205], [40, 3, 9, 115, 51, 192, 18, 6, 223], [87, 37, 9, 115, 59, 77, 64, 21, 47]], [[104, 55, 44, 218, 9, 54, 53, 130, 226], [64, 90, 70, 205, 40, 41, 23, 26, 57], [54, 57, 112, 184, 5, 41, 38, 166, 213], [30, 34, 26, 133, 152, 116, 10, 32, 134], [39, 19, 53, 221, 26, 114, 32, 73, 255], [31, 9, 65, 234, 2, 15, 1, 118, 73], [75, 32, 12, 51, 192, 255, 160, 43, 51], [88, 31, 35, 67, 102, 85, 55, 186, 85], [56, 21, 23, 111, 59, 205, 45, 37, 192], [55, 38, 70, 124, 73, 102, 1, 34, 98]], [[125, 98, 42, 88, 104, 85, 117, 175, 82], [95, 84, 53, 89, 128, 100, 113, 101, 45], [75, 79, 123, 47, 51, 128, 81, 171, 1], [57, 17, 5, 71, 102, 57, 53, 41, 49], [38, 33, 13, 121, 57, 73, 26, 1, 85], [41, 10, 67, 138, 77, 110, 90, 47, 114], [115, 21, 2, 10, 102, 255, 166, 23, 6], [101, 29, 16, 10, 85, 128, 101, 196, 26], [57, 18, 10, 102, 102, 213, 34, 20, 43], [117, 20, 15, 36, 163, 128, 68, 1, 26]], [[102, 61, 71, 37, 34, 53, 31, 243, 192], [69, 60, 71, 38, 73, 119, 28, 222, 37], [68, 45, 128, 34, 1, 47, 11, 245, 171], [62, 17, 19, 70, 146, 85, 55, 62, 70], [37, 43, 37, 154, 100, 163, 85, 160, 1], [63, 9, 92, 136, 28, 64, 32, 201, 85], [75, 15, 9, 9, 64, 255, 184, 119, 16], [86, 6, 28, 5, 64, 255, 25, 248, 1], [56, 8, 17, 132, 137, 255, 55, 116, 128], [58, 15, 20, 82, 135, 57, 26, 121, 40]], [[164, 50, 31, 137, 154, 133, 25, 35, 218], [51, 103, 44, 131, 131, 123, 31, 6, 158], [86, 40, 64, 135, 148, 224, 45, 183, 128], [22, 26, 17, 131, 240, 154, 14, 1, 209], [45, 16, 21, 91, 64, 222, 7, 1, 197], [56, 21, 39, 155, 60, 138, 23, 102, 213], [83, 12, 13, 54, 192, 255, 68, 47, 28], [85, 26, 85, 85, 128, 128, 32, 146, 171], [18, 11, 7, 63, 144, 171, 4, 4, 246], [35, 27, 10, 146, 174, 171, 12, 26, 128]], [[190, 80, 35, 99, 180, 80, 126, 54, 45], [85, 126, 47, 87, 176, 51, 41, 20, 32], [101, 75, 128, 139, 118, 146, 116, 128, 85], [56, 41, 15, 176, 236, 85, 37, 9, 62], [71, 30, 17, 119, 118, 255, 17, 18, 138], [101, 38, 60, 138, 55, 70, 43, 26, 142], [146, 36, 19, 30, 171, 255, 97, 27, 20], [138, 45, 61, 62, 219, 1, 81, 188, 64], [32, 41, 20, 117, 151, 142, 20, 21, 163], [112, 19, 12, 61, 195, 128, 48, 4, 24]]], ci = [[[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[176, 246, 255, 255, 255, 255, 255, 255, 255, 255, 255], [223, 241, 252, 255, 255, 255, 255, 255, 255, 255, 255], [249, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 244, 252, 255, 255, 255, 255, 255, 255, 255, 255], [234, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 246, 254, 255, 255, 255, 255, 255, 255, 255, 255], [239, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 253, 255, 254, 255, 255, 255, 255, 255, 255], [250, 255, 254, 255, 254, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[217, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [225, 252, 241, 253, 255, 255, 254, 255, 255, 255, 255], [234, 250, 241, 250, 253, 255, 253, 254, 255, 255, 255]], [[255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [223, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [238, 253, 254, 254, 255, 255, 255, 255, 255, 255, 255]], [[255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255], [249, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 255, 255, 255, 255, 255, 255, 255, 255, 255], [247, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [252, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255], [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[186, 251, 250, 255, 255, 255, 255, 255, 255, 255, 255], [234, 251, 244, 254, 255, 255, 255, 255, 255, 255, 255], [251, 251, 243, 253, 254, 255, 254, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [236, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 253, 253, 254, 254, 255, 255, 255, 255, 255, 255]], [[255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[248, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [250, 254, 252, 254, 255, 255, 255, 255, 255, 255, 255], [248, 254, 249, 253, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255], [246, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255], [252, 254, 251, 254, 254, 255, 255, 255, 255, 255, 255]], [[255, 254, 252, 255, 255, 255, 255, 255, 255, 255, 255], [248, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 254, 254, 255, 255, 255, 255, 255, 255, 255]], [[255, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255], [245, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 251, 253, 255, 255, 255, 255, 255, 255, 255, 255], [252, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255], [249, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 253, 255, 255, 255, 255, 255, 255, 255, 255], [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]]], li = [0, 1, 2, 3, 6, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0], hi = [], fi = [], di = [], pi = 1, gi = 2, mi = [], vi = [];
    vr("UpsampleRgbLinePair", Ar, 3), vr("UpsampleBgrLinePair", xr, 3), vr("UpsampleRgbaLinePair", Ir, 4), vr("UpsampleBgraLinePair", kr, 4), vr("UpsampleArgbLinePair", Pr, 4), vr("UpsampleRgba4444LinePair", _r, 2), vr("UpsampleRgb565LinePair", Sr, 2);
    var bi = t2.UpsampleRgbLinePair, yi = t2.UpsampleBgrLinePair, wi = t2.UpsampleRgbaLinePair, Ni = t2.UpsampleBgraLinePair, Li = t2.UpsampleArgbLinePair, Ai = t2.UpsampleRgba4444LinePair, xi = t2.UpsampleRgb565LinePair, Si = 16, _i = 1 << Si - 1, Pi = -227, ki = 482, Ii = 6, Fi = (256 << Ii) - 1, Ci = 0, ji = a2(256), Oi = a2(256), Bi = a2(256), Mi = a2(256), Ei = a2(ki - Pi), qi = a2(ki - Pi);
    Fr("YuvToRgbRow", Ar, 3), Fr("YuvToBgrRow", xr, 3), Fr("YuvToRgbaRow", Ir, 4), Fr("YuvToBgraRow", kr, 4), Fr("YuvToArgbRow", Pr, 4), Fr("YuvToRgba4444Row", _r, 2), Fr("YuvToRgb565Row", Sr, 2);
    var Ri = [0, 4, 8, 12, 128, 132, 136, 140, 256, 260, 264, 268, 384, 388, 392, 396], Ti = [0, 2, 8], Di = [8, 7, 6, 4, 4, 2, 2, 2, 1, 1, 1, 1], Ui = 1;
    this.WebPDecodeRGBA = function(t3, r3, n3, i3, a3) {
      var o3 = qn, s3 = new rr(), u4 = new ot2();
      s3.ba = u4, u4.S = o3, u4.width = [u4.width], u4.height = [u4.height];
      var c4 = u4.width, l4 = u4.height, h4 = new st2();
      if (null == h4 || null == t3) var f4 = 2;
      else e(null != h4), f4 = Br(t3, r3, n3, h4.width, h4.height, h4.Pd, h4.Qd, h4.format, null);
      if (0 != f4 ? c4 = 0 : (null != c4 && (c4[0] = h4.width[0]), null != l4 && (l4[0] = h4.height[0]), c4 = 1), c4) {
        u4.width = u4.width[0], u4.height = u4.height[0], null != i3 && (i3[0] = u4.width), null != a3 && (a3[0] = u4.height);
        t: {
          if (i3 = new Gt2(), (a3 = new nr()).data = t3, a3.w = r3, a3.ha = n3, a3.kd = 1, r3 = [0], e(null != a3), (0 == (t3 = Br(a3.data, a3.w, a3.ha, null, null, null, r3, null, a3)) || 7 == t3) && r3[0] && (t3 = 4), 0 == (r3 = t3)) {
            if (e(null != s3), i3.data = a3.data, i3.w = a3.w + a3.offset, i3.ha = a3.ha - a3.offset, i3.put = dt2, i3.ac = ft2, i3.bc = pt2, i3.ma = s3, a3.xa) {
              if (null == (t3 = kt2())) {
                s3 = 1;
                break t;
              }
              if (function(t4, r4) {
                var n4 = [0], i4 = [0], a4 = [0];
                e: for (; ; ) {
                  if (null == t4) return 0;
                  if (null == r4) return t4.a = 2, 0;
                  if (t4.l = r4, t4.a = 0, v3(t4.m, r4.data, r4.w, r4.ha), !gt2(t4.m, n4, i4, a4)) {
                    t4.a = 3;
                    break e;
                  }
                  if (t4.xb = gi, r4.width = n4[0], r4.height = i4[0], !It2(n4[0], i4[0], 1, t4, null)) break e;
                  return 1;
                }
                return e(0 != t4.a), 0;
              }(t3, i3)) {
                if (i3 = 0 == (r3 = qr(i3.width, i3.height, s3.Oa, s3.ba))) {
                  e: {
                    i3 = t3;
                    r: for (; ; ) {
                      if (null == i3) {
                        i3 = 0;
                        break e;
                      }
                      if (e(null != i3.s.yc), e(null != i3.s.Ya), e(0 < i3.s.Wb), e(null != (n3 = i3.l)), e(null != (a3 = n3.ma)), 0 != i3.xb) {
                        if (i3.ca = a3.ba, i3.tb = a3.tb, e(null != i3.ca), !Mr(a3.Oa, n3, Tn)) {
                          i3.a = 2;
                          break r;
                        }
                        if (!Ft2(i3, n3.width)) break r;
                        if (n3.da) break r;
                        if ((n3.da || nt2(i3.ca.S)) && mr(), 11 > i3.ca.S || (alert("todo:WebPInitConvertARGBToYUV"), null != i3.ca.f.kb.F && mr()), i3.Pb && 0 < i3.s.ua && null == i3.s.vb.X && !O2(i3.s.vb, i3.s.Wa.Xa)) {
                          i3.a = 1;
                          break r;
                        }
                        i3.xb = 0;
                      }
                      if (!_t2(i3, i3.V, i3.Ba, i3.c, i3.i, n3.o, Lt2)) break r;
                      a3.Dc = i3.Ma, i3 = 1;
                      break e;
                    }
                    e(0 != i3.a), i3 = 0;
                  }
                  i3 = !i3;
                }
                i3 && (r3 = t3.a);
              } else r3 = t3.a;
            } else {
              if (null == (t3 = new Yt2())) {
                s3 = 1;
                break t;
              }
              if (t3.Fa = a3.na, t3.P = a3.P, t3.qc = a3.Sa, Kt2(t3, i3)) {
                if (0 == (r3 = qr(i3.width, i3.height, s3.Oa, s3.ba))) {
                  if (t3.Aa = 0, n3 = s3.Oa, e(null != (a3 = t3)), null != n3) {
                    if (0 < (c4 = 0 > (c4 = n3.Md) ? 0 : 100 < c4 ? 255 : 255 * c4 / 100)) {
                      for (l4 = h4 = 0; 4 > l4; ++l4) 12 > (f4 = a3.pb[l4]).lc && (f4.ia = c4 * Di[0 > f4.lc ? 0 : f4.lc] >> 3), h4 |= f4.ia;
                      h4 && (alert("todo:VP8InitRandom"), a3.ia = 1);
                    }
                    a3.Ga = n3.Id, 100 < a3.Ga ? a3.Ga = 100 : 0 > a3.Ga && (a3.Ga = 0);
                  }
                  Qt2(t3, i3) || (r3 = t3.a);
                }
              } else r3 = t3.a;
            }
            0 == r3 && null != s3.Oa && s3.Oa.fd && (r3 = Er(s3.ba));
          }
          s3 = r3;
        }
        o3 = 0 != s3 ? null : 11 > o3 ? u4.f.RGBA.eb : u4.f.kb.y;
      } else o3 = null;
      return o3;
    };
    var zi = [3, 4, 3, 4, 4, 2, 2, 4, 4, 4, 2, 1, 1];
  })();
  var h2 = [0], f2 = [0], d2 = [], p2 = new $t(), g2 = t, m2 = function(t2, e2) {
    var r3 = {}, n3 = 0, i3 = false, a3 = 0, o3 = 0;
    if (r3.frames = [], !/** @license
       * Copyright (c) 2017 Dominik Homberger
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
    https://webpjs.appspot.com
    WebPRiffParser dominikhlbg@gmail.com
    */
    function(t3, e3, r4, n4) {
      for (var i4 = 0; i4 < n4; i4++) if (t3[e3 + i4] != r4.charCodeAt(i4)) return true;
      return false;
    }(t2, e2, "RIFF", 4)) {
      var s3, h3;
      l2(t2, e2 += 4);
      for (e2 += 8; e2 < t2.length; ) {
        var f3 = u2(t2, e2), d3 = l2(t2, e2 += 4);
        e2 += 4;
        var p3 = d3 + (1 & d3);
        switch (f3) {
          case "VP8 ":
          case "VP8L":
            void 0 === r3.frames[n3] && (r3.frames[n3] = {});
            (v3 = r3.frames[n3]).src_off = i3 ? o3 : e2 - 8, v3.src_size = a3 + d3 + 8, n3++, i3 && (i3 = false, a3 = 0, o3 = 0);
            break;
          case "VP8X":
            (v3 = r3.header = {}).feature_flags = t2[e2];
            var g3 = e2 + 4;
            v3.canvas_width = 1 + c2(t2, g3);
            g3 += 3;
            v3.canvas_height = 1 + c2(t2, g3);
            g3 += 3;
            break;
          case "ALPH":
            i3 = true, a3 = p3 + 8, o3 = e2 - 8;
            break;
          case "ANIM":
            (v3 = r3.header).bgcolor = l2(t2, e2);
            g3 = e2 + 4;
            v3.loop_count = (s3 = t2)[(h3 = g3) + 0] << 0 | s3[h3 + 1] << 8;
            g3 += 2;
            break;
          case "ANMF":
            var m3, v3;
            (v3 = r3.frames[n3] = {}).offset_x = 2 * c2(t2, e2), e2 += 3, v3.offset_y = 2 * c2(t2, e2), e2 += 3, v3.width = 1 + c2(t2, e2), e2 += 3, v3.height = 1 + c2(t2, e2), e2 += 3, v3.duration = c2(t2, e2), e2 += 3, m3 = t2[e2++], v3.dispose = 1 & m3, v3.blend = m3 >> 1 & 1;
        }
        "ANMF" != f3 && (e2 += p3);
      }
      return r3;
    }
  }(g2, 0);
  m2.response = g2, m2.rgbaoutput = true, m2.dataurl = false;
  var v2 = m2.header ? m2.header : null, b2 = m2.frames ? m2.frames : null;
  if (v2) {
    v2.loop_counter = v2.loop_count, h2 = [v2.canvas_height], f2 = [v2.canvas_width];
    for (var y2 = 0; y2 < b2.length && 0 != b2[y2].blend; y2++) ;
  }
  var w2 = b2[0], N2 = p2.WebPDecodeRGBA(g2, w2.src_off, w2.src_size, f2, h2);
  w2.rgba = N2, w2.imgwidth = f2[0], w2.imgheight = h2[0];
  for (var L2 = 0; L2 < f2[0] * h2[0] * 4; L2++) d2[L2] = N2[L2];
  return this.width = f2, this.height = h2, this.data = d2, this;
}
!function(e) {
  var r2 = function() {
    return "function" == typeof zlibSync;
  }, n2 = function(r3, n3, a3, l3) {
    var h3 = 4, f3 = s2;
    switch (l3) {
      case e.image_compression.FAST:
        h3 = 1, f3 = o2;
        break;
      case e.image_compression.MEDIUM:
        h3 = 6, f3 = u2;
        break;
      case e.image_compression.SLOW:
        h3 = 9, f3 = c2;
    }
    r3 = i2(r3, n3, a3, f3);
    var d2 = zlibSync(r3, {
      level: h3
    });
    return e.__addimage__.arrayBufferToBinaryString(d2);
  }, i2 = function(t, e2, r3, n3) {
    for (var i3, a3, o3, s3 = t.length / e2, u3 = new Uint8Array(t.length + s3), c3 = h2(), l3 = 0; l3 < s3; l3 += 1) {
      if (o3 = l3 * e2, i3 = t.subarray(o3, o3 + e2), n3) u3.set(n3(i3, r3, a3), o3 + l3);
      else {
        for (var d2, p2 = c3.length, g2 = []; d2 < p2; d2 += 1) g2[d2] = c3[d2](i3, r3, a3);
        var m2 = f2(g2.concat());
        u3.set(g2[m2], o3 + l3);
      }
      a3 = i3;
    }
    return u3;
  }, a2 = function(t) {
    var e2 = Array.apply([], t);
    return e2.unshift(0), e2;
  }, o2 = function(t, e2) {
    var r3, n3 = [], i3 = t.length;
    n3[0] = 1;
    for (var a3 = 0; a3 < i3; a3 += 1) r3 = t[a3 - e2] || 0, n3[a3 + 1] = t[a3] - r3 + 256 & 255;
    return n3;
  }, s2 = function(t, e2, r3) {
    var n3, i3 = [], a3 = t.length;
    i3[0] = 2;
    for (var o3 = 0; o3 < a3; o3 += 1) n3 = r3 && r3[o3] || 0, i3[o3 + 1] = t[o3] - n3 + 256 & 255;
    return i3;
  }, u2 = function(t, e2, r3) {
    var n3, i3, a3 = [], o3 = t.length;
    a3[0] = 3;
    for (var s3 = 0; s3 < o3; s3 += 1) n3 = t[s3 - e2] || 0, i3 = r3 && r3[s3] || 0, a3[s3 + 1] = t[s3] + 256 - (n3 + i3 >>> 1) & 255;
    return a3;
  }, c2 = function(t, e2, r3) {
    var n3, i3, a3, o3, s3 = [], u3 = t.length;
    s3[0] = 4;
    for (var c3 = 0; c3 < u3; c3 += 1) n3 = t[c3 - e2] || 0, i3 = r3 && r3[c3] || 0, a3 = r3 && r3[c3 - e2] || 0, o3 = l2(n3, i3, a3), s3[c3 + 1] = t[c3] - o3 + 256 & 255;
    return s3;
  }, l2 = function(t, e2, r3) {
    if (t === e2 && e2 === r3) return t;
    var n3 = Math.abs(e2 - r3), i3 = Math.abs(t - r3), a3 = Math.abs(t + e2 - r3 - r3);
    return n3 <= i3 && n3 <= a3 ? t : i3 <= a3 ? e2 : r3;
  }, h2 = function() {
    return [a2, o2, s2, u2, c2];
  }, f2 = function(t) {
    var e2 = t.map(function(t2) {
      return t2.reduce(function(t3, e3) {
        return t3 + Math.abs(e3);
      }, 0);
    });
    return e2.indexOf(Math.min.apply(null, e2));
  };
  e.processPNG = function(t, i3, a3, o3) {
    var s3, u3, c3, l3, h3, f3, d2, p2, g2, m2, v2, b2, y2, w2, N2, L2 = this.decode.FLATE_DECODE, A2 = "";
    if (this.__addimage__.isArrayBuffer(t) && (t = new Uint8Array(t)), this.__addimage__.isArrayBufferView(t)) {
      if (t = (c3 = new Yt(t)).imgData, u3 = c3.bits, s3 = c3.colorSpace, h3 = c3.colors, -1 !== [4, 6].indexOf(c3.colorType)) {
        if (8 === c3.bits) {
          g2 = (p2 = 32 == c3.pixelBitlength ? new Uint32Array(c3.decodePixels().buffer) : 16 == c3.pixelBitlength ? new Uint16Array(c3.decodePixels().buffer) : new Uint8Array(c3.decodePixels().buffer)).length, v2 = new Uint8Array(g2 * c3.colors), m2 = new Uint8Array(g2);
          var x2, S2 = c3.pixelBitlength - c3.bits;
          for (w2 = 0, N2 = 0; w2 < g2; w2++) {
            for (y2 = p2[w2], x2 = 0; x2 < S2; ) v2[N2++] = y2 >>> x2 & 255, x2 += c3.bits;
            m2[w2] = y2 >>> x2 & 255;
          }
        }
        if (16 === c3.bits) {
          g2 = (p2 = new Uint32Array(c3.decodePixels().buffer)).length, v2 = new Uint8Array(g2 * (32 / c3.pixelBitlength) * c3.colors), m2 = new Uint8Array(g2 * (32 / c3.pixelBitlength)), b2 = c3.colors > 1, w2 = 0, N2 = 0;
          for (var _2 = 0; w2 < g2; ) y2 = p2[w2++], v2[N2++] = y2 >>> 0 & 255, b2 && (v2[N2++] = y2 >>> 16 & 255, y2 = p2[w2++], v2[N2++] = y2 >>> 0 & 255), m2[_2++] = y2 >>> 16 & 255;
          u3 = 8;
        }
        o3 !== e.image_compression.NONE && r2() ? (t = n2(v2, c3.width * c3.colors, c3.colors, o3), d2 = n2(m2, c3.width, 1, o3)) : (t = v2, d2 = m2, L2 = void 0);
      }
      if (3 === c3.colorType && (s3 = this.color_spaces.INDEXED, f3 = c3.palette, c3.transparency.indexed)) {
        var P2 = c3.transparency.indexed, k2 = 0;
        for (w2 = 0, g2 = P2.length; w2 < g2; ++w2) k2 += P2[w2];
        if ((k2 /= 255) === g2 - 1 && -1 !== P2.indexOf(0)) l3 = [P2.indexOf(0)];
        else if (k2 !== g2) {
          for (p2 = c3.decodePixels(), m2 = new Uint8Array(p2.length), w2 = 0, g2 = p2.length; w2 < g2; w2++) m2[w2] = P2[p2[w2]];
          d2 = n2(m2, c3.width, 1);
        }
      }
      var I2 = function(t2) {
        var r3;
        switch (t2) {
          case e.image_compression.FAST:
            r3 = 11;
            break;
          case e.image_compression.MEDIUM:
            r3 = 13;
            break;
          case e.image_compression.SLOW:
            r3 = 14;
            break;
          default:
            r3 = 12;
        }
        return r3;
      }(o3);
      return L2 === this.decode.FLATE_DECODE && (A2 = "/Predictor " + I2 + " "), A2 += "/Colors " + h3 + " /BitsPerComponent " + u3 + " /Columns " + c3.width, (this.__addimage__.isArrayBuffer(t) || this.__addimage__.isArrayBufferView(t)) && (t = this.__addimage__.arrayBufferToBinaryString(t)), (d2 && this.__addimage__.isArrayBuffer(d2) || this.__addimage__.isArrayBufferView(d2)) && (d2 = this.__addimage__.arrayBufferToBinaryString(d2)), {
        alias: a3,
        data: t,
        index: i3,
        filter: L2,
        decodeParameters: A2,
        transparency: l3,
        palette: f3,
        sMask: d2,
        predictor: I2,
        width: c3.width,
        height: c3.height,
        bitsPerComponent: u3,
        colorSpace: s3
      };
    }
  };
}(O.API), function(t) {
  t.processGIF89A = function(e, r2, n2, i2) {
    var a2 = new Jt(e), o2 = a2.width, s2 = a2.height, u2 = [];
    a2.decodeAndBlitFrameRGBA(0, u2);
    var c2 = {
      data: u2,
      width: o2,
      height: s2
    }, l2 = new Kt(100).encode(c2, 100);
    return t.processJPEG.call(this, l2, r2, n2, i2);
  }, t.processGIF87A = t.processGIF89A;
}(O.API), Zt.prototype.parseHeader = function() {
  if (this.fileSize = this.datav.getUint32(this.pos, true), this.pos += 4, this.reserved = this.datav.getUint32(this.pos, true), this.pos += 4, this.offset = this.datav.getUint32(this.pos, true), this.pos += 4, this.headerSize = this.datav.getUint32(this.pos, true), this.pos += 4, this.width = this.datav.getUint32(this.pos, true), this.pos += 4, this.height = this.datav.getInt32(this.pos, true), this.pos += 4, this.planes = this.datav.getUint16(this.pos, true), this.pos += 2, this.bitPP = this.datav.getUint16(this.pos, true), this.pos += 2, this.compress = this.datav.getUint32(this.pos, true), this.pos += 4, this.rawSize = this.datav.getUint32(this.pos, true), this.pos += 4, this.hr = this.datav.getUint32(this.pos, true), this.pos += 4, this.vr = this.datav.getUint32(this.pos, true), this.pos += 4, this.colors = this.datav.getUint32(this.pos, true), this.pos += 4, this.importantColors = this.datav.getUint32(this.pos, true), this.pos += 4, 16 === this.bitPP && this.is_with_alpha && (this.bitPP = 15), this.bitPP < 15) {
    var t = 0 === this.colors ? 1 << this.bitPP : this.colors;
    this.palette = new Array(t);
    for (var e = 0; e < t; e++) {
      var r2 = this.datav.getUint8(this.pos++, true), n2 = this.datav.getUint8(this.pos++, true), i2 = this.datav.getUint8(this.pos++, true), a2 = this.datav.getUint8(this.pos++, true);
      this.palette[e] = {
        red: i2,
        green: n2,
        blue: r2,
        quad: a2
      };
    }
  }
  this.height < 0 && (this.height *= -1, this.bottom_up = false);
}, Zt.prototype.parseBGR = function() {
  this.pos = this.offset;
  try {
    var t = "bit" + this.bitPP, e = this.width * this.height * 4;
    this.data = new Uint8Array(e), this[t]();
  } catch (t2) {
    i.log("bit decode error:" + t2);
  }
}, Zt.prototype.bit1 = function() {
  var t, e = Math.ceil(this.width / 8), r2 = e % 4;
  for (t = this.height - 1; t >= 0; t--) {
    for (var n2 = this.bottom_up ? t : this.height - 1 - t, i2 = 0; i2 < e; i2++) for (var a2 = this.datav.getUint8(this.pos++, true), o2 = n2 * this.width * 4 + 8 * i2 * 4, s2 = 0; s2 < 8 && 8 * i2 + s2 < this.width; s2++) {
      var u2 = this.palette[a2 >> 7 - s2 & 1];
      this.data[o2 + 4 * s2] = u2.blue, this.data[o2 + 4 * s2 + 1] = u2.green, this.data[o2 + 4 * s2 + 2] = u2.red, this.data[o2 + 4 * s2 + 3] = 255;
    }
    0 !== r2 && (this.pos += 4 - r2);
  }
}, Zt.prototype.bit4 = function() {
  for (var t = Math.ceil(this.width / 2), e = t % 4, r2 = this.height - 1; r2 >= 0; r2--) {
    for (var n2 = this.bottom_up ? r2 : this.height - 1 - r2, i2 = 0; i2 < t; i2++) {
      var a2 = this.datav.getUint8(this.pos++, true), o2 = n2 * this.width * 4 + 2 * i2 * 4, s2 = a2 >> 4, u2 = 15 & a2, c2 = this.palette[s2];
      if (this.data[o2] = c2.blue, this.data[o2 + 1] = c2.green, this.data[o2 + 2] = c2.red, this.data[o2 + 3] = 255, 2 * i2 + 1 >= this.width) break;
      c2 = this.palette[u2], this.data[o2 + 4] = c2.blue, this.data[o2 + 4 + 1] = c2.green, this.data[o2 + 4 + 2] = c2.red, this.data[o2 + 4 + 3] = 255;
    }
    0 !== e && (this.pos += 4 - e);
  }
}, Zt.prototype.bit8 = function() {
  for (var t = this.width % 4, e = this.height - 1; e >= 0; e--) {
    for (var r2 = this.bottom_up ? e : this.height - 1 - e, n2 = 0; n2 < this.width; n2++) {
      var i2 = this.datav.getUint8(this.pos++, true), a2 = r2 * this.width * 4 + 4 * n2;
      if (i2 < this.palette.length) {
        var o2 = this.palette[i2];
        this.data[a2] = o2.red, this.data[a2 + 1] = o2.green, this.data[a2 + 2] = o2.blue, this.data[a2 + 3] = 255;
      } else this.data[a2] = 255, this.data[a2 + 1] = 255, this.data[a2 + 2] = 255, this.data[a2 + 3] = 255;
    }
    0 !== t && (this.pos += 4 - t);
  }
}, Zt.prototype.bit15 = function() {
  for (var t = this.width % 3, e = parseInt("11111", 2), r2 = this.height - 1; r2 >= 0; r2--) {
    for (var n2 = this.bottom_up ? r2 : this.height - 1 - r2, i2 = 0; i2 < this.width; i2++) {
      var a2 = this.datav.getUint16(this.pos, true);
      this.pos += 2;
      var o2 = (a2 & e) / e * 255 | 0, s2 = (a2 >> 5 & e) / e * 255 | 0, u2 = (a2 >> 10 & e) / e * 255 | 0, c2 = a2 >> 15 ? 255 : 0, l2 = n2 * this.width * 4 + 4 * i2;
      this.data[l2] = u2, this.data[l2 + 1] = s2, this.data[l2 + 2] = o2, this.data[l2 + 3] = c2;
    }
    this.pos += t;
  }
}, Zt.prototype.bit16 = function() {
  for (var t = this.width % 3, e = parseInt("11111", 2), r2 = parseInt("111111", 2), n2 = this.height - 1; n2 >= 0; n2--) {
    for (var i2 = this.bottom_up ? n2 : this.height - 1 - n2, a2 = 0; a2 < this.width; a2++) {
      var o2 = this.datav.getUint16(this.pos, true);
      this.pos += 2;
      var s2 = (o2 & e) / e * 255 | 0, u2 = (o2 >> 5 & r2) / r2 * 255 | 0, c2 = (o2 >> 11) / e * 255 | 0, l2 = i2 * this.width * 4 + 4 * a2;
      this.data[l2] = c2, this.data[l2 + 1] = u2, this.data[l2 + 2] = s2, this.data[l2 + 3] = 255;
    }
    this.pos += t;
  }
}, Zt.prototype.bit24 = function() {
  for (var t = this.height - 1; t >= 0; t--) {
    for (var e = this.bottom_up ? t : this.height - 1 - t, r2 = 0; r2 < this.width; r2++) {
      var n2 = this.datav.getUint8(this.pos++, true), i2 = this.datav.getUint8(this.pos++, true), a2 = this.datav.getUint8(this.pos++, true), o2 = e * this.width * 4 + 4 * r2;
      this.data[o2] = a2, this.data[o2 + 1] = i2, this.data[o2 + 2] = n2, this.data[o2 + 3] = 255;
    }
    this.pos += this.width % 4;
  }
}, Zt.prototype.bit32 = function() {
  for (var t = this.height - 1; t >= 0; t--) for (var e = this.bottom_up ? t : this.height - 1 - t, r2 = 0; r2 < this.width; r2++) {
    var n2 = this.datav.getUint8(this.pos++, true), i2 = this.datav.getUint8(this.pos++, true), a2 = this.datav.getUint8(this.pos++, true), o2 = this.datav.getUint8(this.pos++, true), s2 = e * this.width * 4 + 4 * r2;
    this.data[s2] = a2, this.data[s2 + 1] = i2, this.data[s2 + 2] = n2, this.data[s2 + 3] = o2;
  }
}, Zt.prototype.getData = function() {
  return this.data;
}, /**
 * @license
 * Copyright (c) 2018 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t) {
  t.processBMP = function(e, r2, n2, i2) {
    var a2 = new Zt(e, false), o2 = a2.width, s2 = a2.height, u2 = {
      data: a2.getData(),
      width: o2,
      height: s2
    }, c2 = new Kt(100).encode(u2, 100);
    return t.processJPEG.call(this, c2, r2, n2, i2);
  };
}(O.API), $t.prototype.getData = function() {
  return this.data;
}, /**
 * @license
 * Copyright (c) 2019 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t) {
  t.processWEBP = function(e, r2, n2, i2) {
    var a2 = new $t(e, false), o2 = a2.width, s2 = a2.height, u2 = {
      data: a2.getData(),
      width: o2,
      height: s2
    }, c2 = new Kt(100).encode(u2, 100);
    return t.processJPEG.call(this, c2, r2, n2, i2);
  };
}(O.API), O.API.setLanguage = function(t) {
  return void 0 === this.internal.languageSettings && (this.internal.languageSettings = {}, this.internal.languageSettings.isSubscribed = false), void 0 !== {
    af: "Afrikaans",
    sq: "Albanian",
    ar: "Arabic (Standard)",
    "ar-DZ": "Arabic (Algeria)",
    "ar-BH": "Arabic (Bahrain)",
    "ar-EG": "Arabic (Egypt)",
    "ar-IQ": "Arabic (Iraq)",
    "ar-JO": "Arabic (Jordan)",
    "ar-KW": "Arabic (Kuwait)",
    "ar-LB": "Arabic (Lebanon)",
    "ar-LY": "Arabic (Libya)",
    "ar-MA": "Arabic (Morocco)",
    "ar-OM": "Arabic (Oman)",
    "ar-QA": "Arabic (Qatar)",
    "ar-SA": "Arabic (Saudi Arabia)",
    "ar-SY": "Arabic (Syria)",
    "ar-TN": "Arabic (Tunisia)",
    "ar-AE": "Arabic (U.A.E.)",
    "ar-YE": "Arabic (Yemen)",
    an: "Aragonese",
    hy: "Armenian",
    as: "Assamese",
    ast: "Asturian",
    az: "Azerbaijani",
    eu: "Basque",
    be: "Belarusian",
    bn: "Bengali",
    bs: "Bosnian",
    br: "Breton",
    bg: "Bulgarian",
    my: "Burmese",
    ca: "Catalan",
    ch: "Chamorro",
    ce: "Chechen",
    zh: "Chinese",
    "zh-HK": "Chinese (Hong Kong)",
    "zh-CN": "Chinese (PRC)",
    "zh-SG": "Chinese (Singapore)",
    "zh-TW": "Chinese (Taiwan)",
    cv: "Chuvash",
    co: "Corsican",
    cr: "Cree",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch (Standard)",
    "nl-BE": "Dutch (Belgian)",
    en: "English",
    "en-AU": "English (Australia)",
    "en-BZ": "English (Belize)",
    "en-CA": "English (Canada)",
    "en-IE": "English (Ireland)",
    "en-JM": "English (Jamaica)",
    "en-NZ": "English (New Zealand)",
    "en-PH": "English (Philippines)",
    "en-ZA": "English (South Africa)",
    "en-TT": "English (Trinidad & Tobago)",
    "en-GB": "English (United Kingdom)",
    "en-US": "English (United States)",
    "en-ZW": "English (Zimbabwe)",
    eo: "Esperanto",
    et: "Estonian",
    fo: "Faeroese",
    fj: "Fijian",
    fi: "Finnish",
    fr: "French (Standard)",
    "fr-BE": "French (Belgium)",
    "fr-CA": "French (Canada)",
    "fr-FR": "French (France)",
    "fr-LU": "French (Luxembourg)",
    "fr-MC": "French (Monaco)",
    "fr-CH": "French (Switzerland)",
    fy: "Frisian",
    fur: "Friulian",
    gd: "Gaelic (Scots)",
    "gd-IE": "Gaelic (Irish)",
    gl: "Galacian",
    ka: "Georgian",
    de: "German (Standard)",
    "de-AT": "German (Austria)",
    "de-DE": "German (Germany)",
    "de-LI": "German (Liechtenstein)",
    "de-LU": "German (Luxembourg)",
    "de-CH": "German (Switzerland)",
    el: "Greek",
    gu: "Gujurati",
    ht: "Haitian",
    he: "Hebrew",
    hi: "Hindi",
    hu: "Hungarian",
    is: "Icelandic",
    id: "Indonesian",
    iu: "Inuktitut",
    ga: "Irish",
    it: "Italian (Standard)",
    "it-CH": "Italian (Switzerland)",
    ja: "Japanese",
    kn: "Kannada",
    ks: "Kashmiri",
    kk: "Kazakh",
    km: "Khmer",
    ky: "Kirghiz",
    tlh: "Klingon",
    ko: "Korean",
    "ko-KP": "Korean (North Korea)",
    "ko-KR": "Korean (South Korea)",
    la: "Latin",
    lv: "Latvian",
    lt: "Lithuanian",
    lb: "Luxembourgish",
    mk: "FYRO Macedonian",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    mi: "Maori",
    mr: "Marathi",
    mo: "Moldavian",
    nv: "Navajo",
    ng: "Ndonga",
    ne: "Nepali",
    no: "Norwegian",
    nb: "Norwegian (Bokmal)",
    nn: "Norwegian (Nynorsk)",
    oc: "Occitan",
    or: "Oriya",
    om: "Oromo",
    fa: "Persian",
    "fa-IR": "Persian/Iran",
    pl: "Polish",
    pt: "Portuguese",
    "pt-BR": "Portuguese (Brazil)",
    pa: "Punjabi",
    "pa-IN": "Punjabi (India)",
    "pa-PK": "Punjabi (Pakistan)",
    qu: "Quechua",
    rm: "Rhaeto-Romanic",
    ro: "Romanian",
    "ro-MO": "Romanian (Moldavia)",
    ru: "Russian",
    "ru-MO": "Russian (Moldavia)",
    sz: "Sami (Lappish)",
    sg: "Sango",
    sa: "Sanskrit",
    sc: "Sardinian",
    sd: "Sindhi",
    si: "Singhalese",
    sr: "Serbian",
    sk: "Slovak",
    sl: "Slovenian",
    so: "Somani",
    sb: "Sorbian",
    es: "Spanish",
    "es-AR": "Spanish (Argentina)",
    "es-BO": "Spanish (Bolivia)",
    "es-CL": "Spanish (Chile)",
    "es-CO": "Spanish (Colombia)",
    "es-CR": "Spanish (Costa Rica)",
    "es-DO": "Spanish (Dominican Republic)",
    "es-EC": "Spanish (Ecuador)",
    "es-SV": "Spanish (El Salvador)",
    "es-GT": "Spanish (Guatemala)",
    "es-HN": "Spanish (Honduras)",
    "es-MX": "Spanish (Mexico)",
    "es-NI": "Spanish (Nicaragua)",
    "es-PA": "Spanish (Panama)",
    "es-PY": "Spanish (Paraguay)",
    "es-PE": "Spanish (Peru)",
    "es-PR": "Spanish (Puerto Rico)",
    "es-ES": "Spanish (Spain)",
    "es-UY": "Spanish (Uruguay)",
    "es-VE": "Spanish (Venezuela)",
    sx: "Sutu",
    sw: "Swahili",
    sv: "Swedish",
    "sv-FI": "Swedish (Finland)",
    "sv-SV": "Swedish (Sweden)",
    ta: "Tamil",
    tt: "Tatar",
    te: "Teluga",
    th: "Thai",
    tig: "Tigre",
    ts: "Tsonga",
    tn: "Tswana",
    tr: "Turkish",
    tk: "Turkmen",
    uk: "Ukrainian",
    hsb: "Upper Sorbian",
    ur: "Urdu",
    ve: "Venda",
    vi: "Vietnamese",
    vo: "Volapuk",
    wa: "Walloon",
    cy: "Welsh",
    xh: "Xhosa",
    ji: "Yiddish",
    zu: "Zulu"
  }[t] && (this.internal.languageSettings.languageCode = t, false === this.internal.languageSettings.isSubscribed && (this.internal.events.subscribe("putCatalog", function() {
    this.internal.write("/Lang (" + this.internal.languageSettings.languageCode + ")");
  }), this.internal.languageSettings.isSubscribed = true)), this;
}, /** @license
 * MIT license.
 * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 *               2014 Diego Casorran, https://github.com/diegocr
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
zt = O.API, Ht = zt.getCharWidthsArray = function(t, e) {
  var r2, n2, i2 = (e = e || {}).font || this.internal.getFont(), a2 = e.fontSize || this.internal.getFontSize(), o2 = e.charSpace || this.internal.getCharSpace(), s2 = e.widths ? e.widths : i2.metadata.Unicode.widths, u2 = s2.fof ? s2.fof : 1, c2 = e.kerning ? e.kerning : i2.metadata.Unicode.kerning, l2 = c2.fof ? c2.fof : 1, h2 = false !== e.doKerning, f2 = 0, d2 = t.length, p2 = 0, g2 = s2[0] || u2, m2 = [];
  for (r2 = 0; r2 < d2; r2++) n2 = t.charCodeAt(r2), "function" == typeof i2.metadata.widthOfString ? m2.push((i2.metadata.widthOfGlyph(i2.metadata.characterToGlyph(n2)) + o2 * (1e3 / a2) || 0) / 1e3) : (f2 = h2 && "object" == typeof c2[n2] && !isNaN(parseInt(c2[n2][p2], 10)) ? c2[n2][p2] / l2 : 0, m2.push((s2[n2] || g2) / u2 + f2)), p2 = n2;
  return m2;
}, Vt = zt.getStringUnitWidth = function(t, e) {
  var r2 = (e = e || {}).fontSize || this.internal.getFontSize(), n2 = e.font || this.internal.getFont(), i2 = e.charSpace || this.internal.getCharSpace();
  return zt.processArabic && (t = zt.processArabic(t)), "function" == typeof n2.metadata.widthOfString ? n2.metadata.widthOfString(t, r2, i2) / r2 : Ht.apply(this, arguments).reduce(function(t2, e2) {
    return t2 + e2;
  }, 0);
}, Wt = function(t, e, r2, n2) {
  for (var i2 = [], a2 = 0, o2 = t.length, s2 = 0; a2 !== o2 && s2 + e[a2] < r2; ) s2 += e[a2], a2++;
  i2.push(t.slice(0, a2));
  var u2 = a2;
  for (s2 = 0; a2 !== o2; ) s2 + e[a2] > n2 && (i2.push(t.slice(u2, a2)), s2 = 0, u2 = a2), s2 += e[a2], a2++;
  return u2 !== a2 && i2.push(t.slice(u2, a2)), i2;
}, Gt = function(t, e, r2) {
  r2 || (r2 = {});
  var n2, i2, a2, o2, s2, u2, c2, l2 = [], h2 = [l2], f2 = r2.textIndent || 0, d2 = 0, p2 = 0, g2 = t.split(" "), m2 = Ht.apply(this, [" ", r2])[0];
  if (u2 = -1 === r2.lineIndent ? g2[0].length + 2 : r2.lineIndent || 0) {
    var v2 = Array(u2).join(" "), b2 = [];
    g2.map(function(t2) {
      (t2 = t2.split(/\s*\n/)).length > 1 ? b2 = b2.concat(t2.map(function(t3, e2) {
        return (e2 && t3.length ? "\n" : "") + t3;
      })) : b2.push(t2[0]);
    }), g2 = b2, u2 = Vt.apply(this, [v2, r2]);
  }
  for (a2 = 0, o2 = g2.length; a2 < o2; a2++) {
    var y2 = 0;
    if (n2 = g2[a2], u2 && "\n" == n2[0] && (n2 = n2.substr(1), y2 = 1), f2 + d2 + (p2 = (i2 = Ht.apply(this, [n2, r2])).reduce(function(t2, e2) {
      return t2 + e2;
    }, 0)) > e || y2) {
      if (p2 > e) {
        for (s2 = Wt.apply(this, [n2, i2, e - (f2 + d2), e]), l2.push(s2.shift()), l2 = [s2.pop()]; s2.length; ) h2.push([s2.shift()]);
        p2 = i2.slice(n2.length - (l2[0] ? l2[0].length : 0)).reduce(function(t2, e2) {
          return t2 + e2;
        }, 0);
      } else l2 = [n2];
      h2.push(l2), f2 = p2 + u2, d2 = m2;
    } else l2.push(n2), f2 += d2 + p2, d2 = m2;
  }
  return c2 = u2 ? function(t2, e2) {
    return (e2 ? v2 : "") + t2.join(" ");
  } : function(t2) {
    return t2.join(" ");
  }, h2.map(c2);
}, zt.splitTextToSize = function(t, e, r2) {
  var n2, i2 = (r2 = r2 || {}).fontSize || this.internal.getFontSize(), a2 = function(t2) {
    if (t2.widths && t2.kerning) return {
      widths: t2.widths,
      kerning: t2.kerning
    };
    var e2 = this.internal.getFont(t2.fontName, t2.fontStyle);
    return e2.metadata.Unicode ? {
      widths: e2.metadata.Unicode.widths || {
        0: 1
      },
      kerning: e2.metadata.Unicode.kerning || {}
    } : {
      font: e2.metadata,
      fontSize: this.internal.getFontSize(),
      charSpace: this.internal.getCharSpace()
    };
  }.call(this, r2);
  n2 = Array.isArray(t) ? t : String(t).split(/\r?\n/);
  var o2 = 1 * this.internal.scaleFactor * e / i2;
  a2.textIndent = r2.textIndent ? 1 * r2.textIndent * this.internal.scaleFactor / i2 : 0, a2.lineIndent = r2.lineIndent;
  var s2, u2, c2 = [];
  for (s2 = 0, u2 = n2.length; s2 < u2; s2++) c2 = c2.concat(Gt.apply(this, [n2[s2], o2, a2]));
  return c2;
}, /** @license
 jsPDF standard_fonts_metrics plugin
 * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 * MIT license.
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(t) {
  t.__fontmetrics__ = t.__fontmetrics__ || {};
  for (var e = "klmnopqrstuvwxyz", r2 = {}, n2 = {}, i2 = 0; i2 < e.length; i2++) r2[e[i2]] = "0123456789abcdef"[i2], n2["0123456789abcdef"[i2]] = e[i2];
  var a2 = function(t2) {
    return "0x" + parseInt(t2, 10).toString(16);
  }, o2 = t.__fontmetrics__.compress = function(t2) {
    var e2, r3, i3, s3, u3 = ["{"];
    for (var c3 in t2) {
      if (e2 = t2[c3], isNaN(parseInt(c3, 10)) ? r3 = "'" + c3 + "'" : (c3 = parseInt(c3, 10), r3 = (r3 = a2(c3).slice(2)).slice(0, -1) + n2[r3.slice(-1)]), "number" == typeof e2) e2 < 0 ? (i3 = a2(e2).slice(3), s3 = "-") : (i3 = a2(e2).slice(2), s3 = ""), i3 = s3 + i3.slice(0, -1) + n2[i3.slice(-1)];
      else {
        if ("object" != typeof e2) throw new Error("Don't know what to do with value type " + typeof e2 + ".");
        i3 = o2(e2);
      }
      u3.push(r3 + i3);
    }
    return u3.push("}"), u3.join("");
  }, s2 = t.__fontmetrics__.uncompress = function(t2) {
    if ("string" != typeof t2) throw new Error("Invalid argument passed to uncompress.");
    for (var e2, n3, i3, a3, o3 = {}, s3 = 1, u3 = o3, c3 = [], l3 = "", h2 = "", f2 = t2.length - 1, d2 = 1; d2 < f2; d2 += 1) "'" == (a3 = t2[d2]) ? e2 ? (i3 = e2.join(""), e2 = void 0) : e2 = [] : e2 ? e2.push(a3) : "{" == a3 ? (c3.push([u3, i3]), u3 = {}, i3 = void 0) : "}" == a3 ? ((n3 = c3.pop())[0][n3[1]] = u3, i3 = void 0, u3 = n3[0]) : "-" == a3 ? s3 = -1 : void 0 === i3 ? r2.hasOwnProperty(a3) ? (l3 += r2[a3], i3 = parseInt(l3, 16) * s3, s3 = 1, l3 = "") : l3 += a3 : r2.hasOwnProperty(a3) ? (h2 += r2[a3], u3[i3] = parseInt(h2, 16) * s3, s3 = 1, i3 = void 0, h2 = "") : h2 += a3;
    return o3;
  }, u2 = {
    codePages: ["WinAnsiEncoding"],
    WinAnsiEncoding: s2("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")
  }, c2 = {
    Unicode: {
      Courier: u2,
      "Courier-Bold": u2,
      "Courier-BoldOblique": u2,
      "Courier-Oblique": u2,
      Helvetica: u2,
      "Helvetica-Bold": u2,
      "Helvetica-BoldOblique": u2,
      "Helvetica-Oblique": u2,
      "Times-Roman": u2,
      "Times-Bold": u2,
      "Times-BoldItalic": u2,
      "Times-Italic": u2
    }
  }, l2 = {
    Unicode: {
      "Courier-Oblique": s2("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
      "Times-BoldItalic": s2("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),
      "Helvetica-Bold": s2("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
      Courier: s2("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
      "Courier-BoldOblique": s2("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
      "Times-Bold": s2("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),
      Symbol: s2("{'widths'{k3uaw4r19m3m2k1t2l2l202m2y2n3m2p5n202q6o3k3m2s2l2t2l2v3r2w1t3m3m2y1t2z1wbk2sbl3r'fof'6o3n3m3o3m3p3m3q3m3r3m3s3m3t3m3u1w3v1w3w3r3x3r3y3r3z2wbp3t3l3m5v2l5x2l5z3m2q4yfr3r7v3k7w1o7x3k}'kerning'{'fof'-6o}}"),
      Helvetica: s2("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),
      "Helvetica-BoldOblique": s2("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
      ZapfDingbats: s2("{'widths'{k4u2k1w'fof'6o}'kerning'{'fof'-6o}}"),
      "Courier-Bold": s2("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
      "Times-Italic": s2("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),
      "Times-Roman": s2("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),
      "Helvetica-Oblique": s2("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")
    }
  };
  t.events.push(["addFont", function(t2) {
    var e2 = t2.font, r3 = l2.Unicode[e2.postScriptName];
    r3 && (e2.metadata.Unicode = {}, e2.metadata.Unicode.widths = r3.widths, e2.metadata.Unicode.kerning = r3.kerning);
    var n3 = c2.Unicode[e2.postScriptName];
    n3 && (e2.metadata.Unicode.encoding = n3, e2.encoding = n3.codePages[0]);
  }]);
}(O.API), /**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t) {
  var e = function(t2) {
    for (var e2 = t2.length, r2 = new Uint8Array(e2), n2 = 0; n2 < e2; n2++) r2[n2] = t2.charCodeAt(n2);
    return r2;
  };
  t.API.events.push(["addFont", function(r2) {
    var n2 = void 0, i2 = r2.font, a2 = r2.instance;
    if (!i2.isStandardFont) {
      if (void 0 === a2) throw new Error("Font does not exist in vFS, import fonts or remove declaration doc.addFont('" + i2.postScriptName + "').");
      if ("string" != typeof (n2 = false === a2.existsFileInVFS(i2.postScriptName) ? a2.loadFile(i2.postScriptName) : a2.getFileFromVFS(i2.postScriptName))) throw new Error("Font is not stored as string-data in vFS, import fonts or remove declaration doc.addFont('" + i2.postScriptName + "').");
      !function(r3, n3) {
        n3 = /^\x00\x01\x00\x00/.test(n3) ? e(n3) : e(u(n3)), r3.metadata = t.API.TTFFont.open(n3), r3.metadata.Unicode = r3.metadata.Unicode || {
          encoding: {},
          kerning: {},
          widths: []
        }, r3.metadata.glyIdsUsed = [0];
      }(i2, n2);
    }
  }]);
}(O), /** @license
 * Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(t) {
  function e() {
    return (r.canvg ? Promise.resolve(r.canvg) : import("./index.es-5S2NOXI2.js")).catch(function(t2) {
      return Promise.reject(new Error("Could not load canvg: " + t2));
    }).then(function(t2) {
      return t2.default ? t2.default : t2;
    });
  }
  O.API.addSvgAsImage = function(t2, r2, n2, a2, o2, s2, u2, c2) {
    if (isNaN(r2) || isNaN(n2)) throw i.error("jsPDF.addSvgAsImage: Invalid coordinates", arguments), new Error("Invalid coordinates passed to jsPDF.addSvgAsImage");
    if (isNaN(a2) || isNaN(o2)) throw i.error("jsPDF.addSvgAsImage: Invalid measurements", arguments), new Error("Invalid measurements (width and/or height) passed to jsPDF.addSvgAsImage");
    var l2 = document.createElement("canvas");
    l2.width = a2, l2.height = o2;
    var h2 = l2.getContext("2d");
    h2.fillStyle = "#fff", h2.fillRect(0, 0, l2.width, l2.height);
    var f2 = {
      ignoreMouse: true,
      ignoreAnimation: true,
      ignoreDimensions: true
    }, d2 = this;
    return e().then(function(e2) {
      return e2.fromString(h2, t2, f2);
    }, function() {
      return Promise.reject(new Error("Could not load canvg."));
    }).then(function(t3) {
      return t3.render(f2);
    }).then(function() {
      d2.addImage(l2.toDataURL("image/jpeg", 1), r2, n2, a2, o2, u2, c2);
    });
  };
}(), O.API.putTotalPages = function(t) {
  var e, r2 = 0;
  parseInt(this.internal.getFont().id.substr(1), 10) < 15 ? (e = new RegExp(t, "g"), r2 = this.internal.getNumberOfPages()) : (e = new RegExp(this.pdfEscape16(t, this.internal.getFont()), "g"), r2 = this.pdfEscape16(this.internal.getNumberOfPages() + "", this.internal.getFont()));
  for (var n2 = 1; n2 <= this.internal.getNumberOfPages(); n2++) for (var i2 = 0; i2 < this.internal.pages[n2].length; i2++) this.internal.pages[n2][i2] = this.internal.pages[n2][i2].replace(e, r2);
  return this;
}, O.API.viewerPreferences = function(t, e) {
  var r2;
  t = t || {}, e = e || false;
  var n2, i2, a2, o2 = {
    HideToolbar: {
      defaultValue: false,
      value: false,
      type: "boolean",
      explicitSet: false,
      valueSet: [true, false],
      pdfVersion: 1.3
    },
    HideMenubar: {
      defaultValue: false,
      value: false,
      type: "boolean",
      explicitSet: false,
      valueSet: [true, false],
      pdfVersion: 1.3
    },
    HideWindowUI: {
      defaultValue: false,
      value: false,
      type: "boolean",
      explicitSet: false,
      valueSet: [true, false],
      pdfVersion: 1.3
    },
    FitWindow: {
      defaultValue: false,
      value: false,
      type: "boolean",
      explicitSet: false,
      valueSet: [true, false],
      pdfVersion: 1.3
    },
    CenterWindow: {
      defaultValue: false,
      value: false,
      type: "boolean",
      explicitSet: false,
      valueSet: [true, false],
      pdfVersion: 1.3
    },
    DisplayDocTitle: {
      defaultValue: false,
      value: false,
      type: "boolean",
      explicitSet: false,
      valueSet: [true, false],
      pdfVersion: 1.4
    },
    NonFullScreenPageMode: {
      defaultValue: "UseNone",
      value: "UseNone",
      type: "name",
      explicitSet: false,
      valueSet: ["UseNone", "UseOutlines", "UseThumbs", "UseOC"],
      pdfVersion: 1.3
    },
    Direction: {
      defaultValue: "L2R",
      value: "L2R",
      type: "name",
      explicitSet: false,
      valueSet: ["L2R", "R2L"],
      pdfVersion: 1.3
    },
    ViewArea: {
      defaultValue: "CropBox",
      value: "CropBox",
      type: "name",
      explicitSet: false,
      valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
      pdfVersion: 1.4
    },
    ViewClip: {
      defaultValue: "CropBox",
      value: "CropBox",
      type: "name",
      explicitSet: false,
      valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
      pdfVersion: 1.4
    },
    PrintArea: {
      defaultValue: "CropBox",
      value: "CropBox",
      type: "name",
      explicitSet: false,
      valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
      pdfVersion: 1.4
    },
    PrintClip: {
      defaultValue: "CropBox",
      value: "CropBox",
      type: "name",
      explicitSet: false,
      valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"],
      pdfVersion: 1.4
    },
    PrintScaling: {
      defaultValue: "AppDefault",
      value: "AppDefault",
      type: "name",
      explicitSet: false,
      valueSet: ["AppDefault", "None"],
      pdfVersion: 1.6
    },
    Duplex: {
      defaultValue: "",
      value: "none",
      type: "name",
      explicitSet: false,
      valueSet: ["Simplex", "DuplexFlipShortEdge", "DuplexFlipLongEdge", "none"],
      pdfVersion: 1.7
    },
    PickTrayByPDFSize: {
      defaultValue: false,
      value: false,
      type: "boolean",
      explicitSet: false,
      valueSet: [true, false],
      pdfVersion: 1.7
    },
    PrintPageRange: {
      defaultValue: "",
      value: "",
      type: "array",
      explicitSet: false,
      valueSet: null,
      pdfVersion: 1.7
    },
    NumCopies: {
      defaultValue: 1,
      value: 1,
      type: "integer",
      explicitSet: false,
      valueSet: null,
      pdfVersion: 1.7
    }
  }, s2 = Object.keys(o2), u2 = [], c2 = 0, l2 = 0, h2 = 0;
  function f2(t2, e2) {
    var r3, n3 = false;
    for (r3 = 0; r3 < t2.length; r3 += 1) t2[r3] === e2 && (n3 = true);
    return n3;
  }
  if (void 0 === this.internal.viewerpreferences && (this.internal.viewerpreferences = {}, this.internal.viewerpreferences.configuration = JSON.parse(JSON.stringify(o2)), this.internal.viewerpreferences.isSubscribed = false), r2 = this.internal.viewerpreferences.configuration, "reset" === t || true === e) {
    var d2 = s2.length;
    for (h2 = 0; h2 < d2; h2 += 1) r2[s2[h2]].value = r2[s2[h2]].defaultValue, r2[s2[h2]].explicitSet = false;
  }
  if ("object" == typeof t) {
    for (i2 in t) if (a2 = t[i2], f2(s2, i2) && void 0 !== a2) {
      if ("boolean" === r2[i2].type && "boolean" == typeof a2) r2[i2].value = a2;
      else if ("name" === r2[i2].type && f2(r2[i2].valueSet, a2)) r2[i2].value = a2;
      else if ("integer" === r2[i2].type && Number.isInteger(a2)) r2[i2].value = a2;
      else if ("array" === r2[i2].type) {
        for (c2 = 0; c2 < a2.length; c2 += 1) if (n2 = true, 1 === a2[c2].length && "number" == typeof a2[c2][0]) u2.push(String(a2[c2] - 1));
        else if (a2[c2].length > 1) {
          for (l2 = 0; l2 < a2[c2].length; l2 += 1) "number" != typeof a2[c2][l2] && (n2 = false);
          true === n2 && u2.push([a2[c2][0] - 1, a2[c2][1] - 1].join(" "));
        }
        r2[i2].value = "[" + u2.join(" ") + "]";
      } else r2[i2].value = r2[i2].defaultValue;
      r2[i2].explicitSet = true;
    }
  }
  return false === this.internal.viewerpreferences.isSubscribed && (this.internal.events.subscribe("putCatalog", function() {
    var t2, e2 = [];
    for (t2 in r2) true === r2[t2].explicitSet && ("name" === r2[t2].type ? e2.push("/" + t2 + " /" + r2[t2].value) : e2.push("/" + t2 + " " + r2[t2].value));
    0 !== e2.length && this.internal.write("/ViewerPreferences\n<<\n" + e2.join("\n") + "\n>>");
  }), this.internal.viewerpreferences.isSubscribed = true), this.internal.viewerpreferences.configuration = r2, this;
}, /** ====================================================================
 * @license
 * jsPDF XMP metadata plugin
 * Copyright (c) 2016 Jussi Utunen, u-jussi@suomi24.fi
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(t) {
  var e = function() {
    var t2 = '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="' + this.internal.__metadata__.namespaceuri + '"><jspdf:metadata>', e2 = unescape(encodeURIComponent('<x:xmpmeta xmlns:x="adobe:ns:meta/">')), r3 = unescape(encodeURIComponent(t2)), n2 = unescape(encodeURIComponent(this.internal.__metadata__.metadata)), i2 = unescape(encodeURIComponent("</jspdf:metadata></rdf:Description></rdf:RDF>")), a2 = unescape(encodeURIComponent("</x:xmpmeta>")), o2 = r3.length + n2.length + i2.length + e2.length + a2.length;
    this.internal.__metadata__.metadata_object_number = this.internal.newObject(), this.internal.write("<< /Type /Metadata /Subtype /XML /Length " + o2 + " >>"), this.internal.write("stream"), this.internal.write(e2 + r3 + n2 + i2 + a2), this.internal.write("endstream"), this.internal.write("endobj");
  }, r2 = function() {
    this.internal.__metadata__.metadata_object_number && this.internal.write("/Metadata " + this.internal.__metadata__.metadata_object_number + " 0 R");
  };
  t.addMetadata = function(t2, n2) {
    return void 0 === this.internal.__metadata__ && (this.internal.__metadata__ = {
      metadata: t2,
      namespaceuri: n2 || "http://jspdf.default.namespaceuri/"
    }, this.internal.events.subscribe("putCatalog", r2), this.internal.events.subscribe("postPutResources", e)), this;
  };
}(O.API), function(t) {
  var e = t.API, r2 = e.pdfEscape16 = function(t2, e2) {
    for (var r3, n3 = e2.metadata.Unicode.widths, i3 = ["", "0", "00", "000", "0000"], a2 = [""], o2 = 0, s2 = t2.length; o2 < s2; ++o2) {
      if (r3 = e2.metadata.characterToGlyph(t2.charCodeAt(o2)), e2.metadata.glyIdsUsed.push(r3), e2.metadata.toUnicode[r3] = t2.charCodeAt(o2), -1 == n3.indexOf(r3) && (n3.push(r3), n3.push([parseInt(e2.metadata.widthOfGlyph(r3), 10)])), "0" == r3) return a2.join("");
      r3 = r3.toString(16), a2.push(i3[4 - r3.length], r3);
    }
    return a2.join("");
  }, n2 = function(t2) {
    var e2, r3, n3, i3, a2, o2, s2;
    for (a2 = "/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000><ffff>\nendcodespacerange", n3 = [], o2 = 0, s2 = (r3 = Object.keys(t2).sort(function(t3, e3) {
      return t3 - e3;
    })).length; o2 < s2; o2++) e2 = r3[o2], n3.length >= 100 && (a2 += "\n" + n3.length + " beginbfchar\n" + n3.join("\n") + "\nendbfchar", n3 = []), void 0 !== t2[e2] && null !== t2[e2] && "function" == typeof t2[e2].toString && (i3 = ("0000" + t2[e2].toString(16)).slice(-4), e2 = ("0000" + (+e2).toString(16)).slice(-4), n3.push("<" + e2 + "><" + i3 + ">"));
    return n3.length && (a2 += "\n" + n3.length + " beginbfchar\n" + n3.join("\n") + "\nendbfchar\n"), a2 += "endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend";
  };
  e.events.push(["putFont", function(e2) {
    !function(e3) {
      var r3 = e3.font, i3 = e3.out, a2 = e3.newObject, o2 = e3.putStream, s2 = e3.pdfEscapeWithNeededParanthesis;
      if (r3.metadata instanceof t.API.TTFFont && "Identity-H" === r3.encoding) {
        for (var u2 = r3.metadata.Unicode.widths, c2 = r3.metadata.subset.encode(r3.metadata.glyIdsUsed, 1), l2 = "", h2 = 0; h2 < c2.length; h2++) l2 += String.fromCharCode(c2[h2]);
        var f2 = a2();
        o2({
          data: l2,
          addLength1: true,
          objectId: f2
        }), i3("endobj");
        var d2 = a2();
        o2({
          data: n2(r3.metadata.toUnicode),
          addLength1: true,
          objectId: d2
        }), i3("endobj");
        var p2 = a2();
        i3("<<"), i3("/Type /FontDescriptor"), i3("/FontName /" + s2(r3.fontName)), i3("/FontFile2 " + f2 + " 0 R"), i3("/FontBBox " + t.API.PDFObject.convert(r3.metadata.bbox)), i3("/Flags " + r3.metadata.flags), i3("/StemV " + r3.metadata.stemV), i3("/ItalicAngle " + r3.metadata.italicAngle), i3("/Ascent " + r3.metadata.ascender), i3("/Descent " + r3.metadata.decender), i3("/CapHeight " + r3.metadata.capHeight), i3(">>"), i3("endobj");
        var g2 = a2();
        i3("<<"), i3("/Type /Font"), i3("/BaseFont /" + s2(r3.fontName)), i3("/FontDescriptor " + p2 + " 0 R"), i3("/W " + t.API.PDFObject.convert(u2)), i3("/CIDToGIDMap /Identity"), i3("/DW 1000"), i3("/Subtype /CIDFontType2"), i3("/CIDSystemInfo"), i3("<<"), i3("/Supplement 0"), i3("/Registry (Adobe)"), i3("/Ordering (" + r3.encoding + ")"), i3(">>"), i3(">>"), i3("endobj"), r3.objectNumber = a2(), i3("<<"), i3("/Type /Font"), i3("/Subtype /Type0"), i3("/ToUnicode " + d2 + " 0 R"), i3("/BaseFont /" + s2(r3.fontName)), i3("/Encoding /" + r3.encoding), i3("/DescendantFonts [" + g2 + " 0 R]"), i3(">>"), i3("endobj"), r3.isAlreadyPutted = true;
      }
    }(e2);
  }]);
  e.events.push(["putFont", function(e2) {
    !function(e3) {
      var r3 = e3.font, i3 = e3.out, a2 = e3.newObject, o2 = e3.putStream, s2 = e3.pdfEscapeWithNeededParanthesis;
      if (r3.metadata instanceof t.API.TTFFont && "WinAnsiEncoding" === r3.encoding) {
        for (var u2 = r3.metadata.rawData, c2 = "", l2 = 0; l2 < u2.length; l2++) c2 += String.fromCharCode(u2[l2]);
        var h2 = a2();
        o2({
          data: c2,
          addLength1: true,
          objectId: h2
        }), i3("endobj");
        var f2 = a2();
        o2({
          data: n2(r3.metadata.toUnicode),
          addLength1: true,
          objectId: f2
        }), i3("endobj");
        var d2 = a2();
        i3("<<"), i3("/Descent " + r3.metadata.decender), i3("/CapHeight " + r3.metadata.capHeight), i3("/StemV " + r3.metadata.stemV), i3("/Type /FontDescriptor"), i3("/FontFile2 " + h2 + " 0 R"), i3("/Flags 96"), i3("/FontBBox " + t.API.PDFObject.convert(r3.metadata.bbox)), i3("/FontName /" + s2(r3.fontName)), i3("/ItalicAngle " + r3.metadata.italicAngle), i3("/Ascent " + r3.metadata.ascender), i3(">>"), i3("endobj"), r3.objectNumber = a2();
        for (var p2 = 0; p2 < r3.metadata.hmtx.widths.length; p2++) r3.metadata.hmtx.widths[p2] = parseInt(r3.metadata.hmtx.widths[p2] * (1e3 / r3.metadata.head.unitsPerEm));
        i3("<</Subtype/TrueType/Type/Font/ToUnicode " + f2 + " 0 R/BaseFont/" + s2(r3.fontName) + "/FontDescriptor " + d2 + " 0 R/Encoding/" + r3.encoding + " /FirstChar 29 /LastChar 255 /Widths " + t.API.PDFObject.convert(r3.metadata.hmtx.widths) + ">>"), i3("endobj"), r3.isAlreadyPutted = true;
      }
    }(e2);
  }]);
  var i2 = function(t2) {
    var e2, n3 = t2.text || "", i3 = t2.x, a2 = t2.y, o2 = t2.options || {}, s2 = t2.mutex || {}, u2 = s2.pdfEscape, c2 = s2.activeFontKey, l2 = s2.fonts, h2 = c2, f2 = "", d2 = 0, p2 = "", g2 = l2[h2].encoding;
    if ("Identity-H" !== l2[h2].encoding) return {
      text: n3,
      x: i3,
      y: a2,
      options: o2,
      mutex: s2
    };
    for (p2 = n3, h2 = c2, Array.isArray(n3) && (p2 = n3[0]), d2 = 0; d2 < p2.length; d2 += 1) l2[h2].metadata.hasOwnProperty("cmap") && (e2 = l2[h2].metadata.cmap.unicode.codeMap[p2[d2].charCodeAt(0)]), e2 || p2[d2].charCodeAt(0) < 256 && l2[h2].metadata.hasOwnProperty("Unicode") ? f2 += p2[d2] : f2 += "";
    var m2 = "";
    return parseInt(h2.slice(1)) < 14 || "WinAnsiEncoding" === g2 ? m2 = u2(f2, h2).split("").map(function(t3) {
      return t3.charCodeAt(0).toString(16);
    }).join("") : "Identity-H" === g2 && (m2 = r2(f2, l2[h2])), s2.isHex = true, {
      text: m2,
      x: i3,
      y: a2,
      options: o2,
      mutex: s2
    };
  };
  e.events.push(["postProcessText", function(t2) {
    var e2 = t2.text || "", r3 = [], n3 = {
      text: e2,
      x: t2.x,
      y: t2.y,
      options: t2.options,
      mutex: t2.mutex
    };
    if (Array.isArray(e2)) {
      var a2 = 0;
      for (a2 = 0; a2 < e2.length; a2 += 1) Array.isArray(e2[a2]) && 3 === e2[a2].length ? r3.push([i2(Object.assign({}, n3, {
        text: e2[a2][0]
      })).text, e2[a2][1], e2[a2][2]]) : r3.push(i2(Object.assign({}, n3, {
        text: e2[a2]
      })).text);
      t2.text = r3;
    } else t2.text = i2(Object.assign({}, n3, {
      text: e2
    })).text;
  }]);
}(O), /**
 * @license
 * jsPDF virtual FileSystem functionality
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t) {
  var e = function() {
    return void 0 === this.internal.vFS && (this.internal.vFS = {}), true;
  };
  t.existsFileInVFS = function(t2) {
    return e.call(this), void 0 !== this.internal.vFS[t2];
  }, t.addFileToVFS = function(t2, r2) {
    return e.call(this), this.internal.vFS[t2] = r2, this;
  }, t.getFileFromVFS = function(t2) {
    return e.call(this), void 0 !== this.internal.vFS[t2] ? this.internal.vFS[t2] : null;
  };
}(O.API), /**
 * @license
 * Unicode Bidi Engine based on the work of Alex Shensis (@asthensis)
 * MIT License
 */
function(t) {
  t.__bidiEngine__ = t.prototype.__bidiEngine__ = function(t2) {
    var r3, n2, i2, a2, o2, s2, u2, c2 = e, l2 = [[0, 3, 0, 1, 0, 0, 0], [0, 3, 0, 1, 2, 2, 0], [0, 3, 0, 17, 2, 0, 1], [0, 3, 5, 5, 4, 1, 0], [0, 3, 21, 21, 4, 0, 1], [0, 3, 5, 5, 4, 2, 0]], h2 = [[2, 0, 1, 1, 0, 1, 0], [2, 0, 1, 1, 0, 2, 0], [2, 0, 2, 1, 3, 2, 0], [2, 0, 2, 33, 3, 1, 1]], f2 = {
      L: 0,
      R: 1,
      EN: 2,
      AN: 3,
      N: 4,
      B: 5,
      S: 6
    }, d2 = {
      0: 0,
      5: 1,
      6: 2,
      7: 3,
      32: 4,
      251: 5,
      254: 6,
      255: 7
    }, p2 = ["(", ")", "(", "<", ">", "<", "[", "]", "[", "{", "}", "{", "«", "»", "«", "‹", "›", "‹", "⁅", "⁆", "⁅", "⁽", "⁾", "⁽", "₍", "₎", "₍", "≤", "≥", "≤", "〈", "〉", "〈", "﹙", "﹚", "﹙", "﹛", "﹜", "﹛", "﹝", "﹞", "﹝", "﹤", "﹥", "﹤"], g2 = new RegExp(/^([1-4|9]|1[0-9]|2[0-9]|3[0168]|4[04589]|5[012]|7[78]|159|16[0-9]|17[0-2]|21[569]|22[03489]|250)$/), m2 = false, v2 = 0;
    this.__bidiEngine__ = {};
    var b2 = function(t3) {
      var e2 = t3.charCodeAt(), r4 = e2 >> 8, n3 = d2[r4];
      return void 0 !== n3 ? c2[256 * n3 + (255 & e2)] : 252 === r4 || 253 === r4 ? "AL" : g2.test(r4) ? "L" : 8 === r4 ? "R" : "N";
    }, y2 = function(t3) {
      for (var e2, r4 = 0; r4 < t3.length; r4++) {
        if ("L" === (e2 = b2(t3.charAt(r4)))) return false;
        if ("R" === e2) return true;
      }
      return false;
    }, w2 = function(t3, e2, o3, s3) {
      var u3, c3, l3, h3, f3 = e2[s3];
      switch (f3) {
        case "L":
        case "R":
          m2 = false;
          break;
        case "N":
        case "AN":
          break;
        case "EN":
          m2 && (f3 = "AN");
          break;
        case "AL":
          m2 = true, f3 = "R";
          break;
        case "WS":
          f3 = "N";
          break;
        case "CS":
          s3 < 1 || s3 + 1 >= e2.length || "EN" !== (u3 = o3[s3 - 1]) && "AN" !== u3 || "EN" !== (c3 = e2[s3 + 1]) && "AN" !== c3 ? f3 = "N" : m2 && (c3 = "AN"), f3 = c3 === u3 ? c3 : "N";
          break;
        case "ES":
          f3 = "EN" === (u3 = s3 > 0 ? o3[s3 - 1] : "B") && s3 + 1 < e2.length && "EN" === e2[s3 + 1] ? "EN" : "N";
          break;
        case "ET":
          if (s3 > 0 && "EN" === o3[s3 - 1]) {
            f3 = "EN";
            break;
          }
          if (m2) {
            f3 = "N";
            break;
          }
          for (l3 = s3 + 1, h3 = e2.length; l3 < h3 && "ET" === e2[l3]; ) l3++;
          f3 = l3 < h3 && "EN" === e2[l3] ? "EN" : "N";
          break;
        case "NSM":
          if (i2 && !a2) {
            for (h3 = e2.length, l3 = s3 + 1; l3 < h3 && "NSM" === e2[l3]; ) l3++;
            if (l3 < h3) {
              var d3 = t3[s3], p3 = d3 >= 1425 && d3 <= 2303 || 64286 === d3;
              if (u3 = e2[l3], p3 && ("R" === u3 || "AL" === u3)) {
                f3 = "R";
                break;
              }
            }
          }
          f3 = s3 < 1 || "B" === (u3 = e2[s3 - 1]) ? "N" : o3[s3 - 1];
          break;
        case "B":
          m2 = false, r3 = true, f3 = v2;
          break;
        case "S":
          n2 = true, f3 = "N";
          break;
        case "LRE":
        case "RLE":
        case "LRO":
        case "RLO":
        case "PDF":
          m2 = false;
          break;
        case "BN":
          f3 = "N";
      }
      return f3;
    }, N2 = function(t3, e2, r4) {
      var n3 = t3.split("");
      return r4 && L2(n3, r4, {
        hiLevel: v2
      }), n3.reverse(), e2 && e2.reverse(), n3.join("");
    }, L2 = function(t3, e2, i3) {
      var a3, o3, s3, u3, c3, d3 = -1, p3 = t3.length, g3 = 0, y3 = [], N3 = v2 ? h2 : l2, L3 = [];
      for (m2 = false, r3 = false, n2 = false, o3 = 0; o3 < p3; o3++) L3[o3] = b2(t3[o3]);
      for (s3 = 0; s3 < p3; s3++) {
        if (c3 = g3, y3[s3] = w2(t3, L3, y3, s3), a3 = 240 & (g3 = N3[c3][f2[y3[s3]]]), g3 &= 15, e2[s3] = u3 = N3[g3][5], a3 > 0) if (16 === a3) {
          for (o3 = d3; o3 < s3; o3++) e2[o3] = 1;
          d3 = -1;
        } else d3 = -1;
        if (N3[g3][6]) -1 === d3 && (d3 = s3);
        else if (d3 > -1) {
          for (o3 = d3; o3 < s3; o3++) e2[o3] = u3;
          d3 = -1;
        }
        "B" === L3[s3] && (e2[s3] = 0), i3.hiLevel |= u3;
      }
      n2 && function(t4, e3, r4) {
        for (var n3 = 0; n3 < r4; n3++) if ("S" === t4[n3]) {
          e3[n3] = v2;
          for (var i4 = n3 - 1; i4 >= 0 && "WS" === t4[i4]; i4--) e3[i4] = v2;
        }
      }(L3, e2, p3);
    }, A2 = function(t3, e2, n3, i3, a3) {
      if (!(a3.hiLevel < t3)) {
        if (1 === t3 && 1 === v2 && !r3) return e2.reverse(), void (n3 && n3.reverse());
        for (var o3, s3, u3, c3, l3 = e2.length, h3 = 0; h3 < l3; ) {
          if (i3[h3] >= t3) {
            for (u3 = h3 + 1; u3 < l3 && i3[u3] >= t3; ) u3++;
            for (c3 = h3, s3 = u3 - 1; c3 < s3; c3++, s3--) o3 = e2[c3], e2[c3] = e2[s3], e2[s3] = o3, n3 && (o3 = n3[c3], n3[c3] = n3[s3], n3[s3] = o3);
            h3 = u3;
          }
          h3++;
        }
      }
    }, x2 = function(t3, e2, r4) {
      var n3 = t3.split(""), i3 = {
        hiLevel: v2
      };
      return r4 || (r4 = []), L2(n3, r4, i3), function(t4, e3, r5) {
        if (0 !== r5.hiLevel && u2) for (var n4, i4 = 0; i4 < t4.length; i4++) 1 === e3[i4] && (n4 = p2.indexOf(t4[i4])) >= 0 && (t4[i4] = p2[n4 + 1]);
      }(n3, r4, i3), A2(2, n3, e2, r4, i3), A2(1, n3, e2, r4, i3), n3.join("");
    };
    return this.__bidiEngine__.doBidiReorder = function(t3, e2, r4) {
      if (function(t4, e3) {
        if (e3) for (var r5 = 0; r5 < t4.length; r5++) e3[r5] = r5;
        void 0 === a2 && (a2 = y2(t4)), void 0 === s2 && (s2 = y2(t4));
      }(t3, e2), i2 || !o2 || s2) {
        if (i2 && o2 && a2 ^ s2) v2 = a2 ? 1 : 0, t3 = N2(t3, e2, r4);
        else if (!i2 && o2 && s2) v2 = a2 ? 1 : 0, t3 = x2(t3, e2, r4), t3 = N2(t3, e2);
        else if (!i2 || a2 || o2 || s2) {
          if (i2 && !o2 && a2 ^ s2) t3 = N2(t3, e2), a2 ? (v2 = 0, t3 = x2(t3, e2, r4)) : (v2 = 1, t3 = x2(t3, e2, r4), t3 = N2(t3, e2));
          else if (i2 && a2 && !o2 && s2) v2 = 1, t3 = x2(t3, e2, r4), t3 = N2(t3, e2);
          else if (!i2 && !o2 && a2 ^ s2) {
            var n3 = u2;
            a2 ? (v2 = 1, t3 = x2(t3, e2, r4), v2 = 0, u2 = false, t3 = x2(t3, e2, r4), u2 = n3) : (v2 = 0, t3 = x2(t3, e2, r4), t3 = N2(t3, e2), v2 = 1, u2 = false, t3 = x2(t3, e2, r4), u2 = n3, t3 = N2(t3, e2));
          }
        } else v2 = 0, t3 = x2(t3, e2, r4);
      } else v2 = a2 ? 1 : 0, t3 = x2(t3, e2, r4);
      return t3;
    }, this.__bidiEngine__.setOptions = function(t3) {
      t3 && (i2 = t3.isInputVisual, o2 = t3.isOutputVisual, a2 = t3.isInputRtl, s2 = t3.isOutputRtl, u2 = t3.isSymmetricSwapping);
    }, this.__bidiEngine__.setOptions(t2), this.__bidiEngine__;
  };
  var e = ["BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "S", "B", "S", "WS", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "B", "B", "B", "S", "WS", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "BN", "BN", "BN", "BN", "BN", "BN", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "CS", "N", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "L", "N", "N", "BN", "N", "N", "ET", "ET", "EN", "EN", "N", "L", "N", "N", "N", "EN", "L", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "N", "N", "N", "N", "N", "ET", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "NSM", "R", "NSM", "NSM", "R", "NSM", "NSM", "R", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AN", "AN", "AN", "AN", "AN", "AN", "N", "N", "AL", "ET", "ET", "AL", "CS", "AL", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "ET", "AN", "AN", "AL", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "NSM", "NSM", "N", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "R", "N", "N", "N", "N", "R", "N", "N", "N", "N", "N", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "BN", "BN", "BN", "L", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "B", "LRE", "RLE", "PDF", "LRO", "RLO", "CS", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "BN", "BN", "BN", "BN", "BN", "N", "LRI", "RLI", "FSI", "PDI", "BN", "BN", "BN", "BN", "BN", "BN", "EN", "L", "N", "N", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "L", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "R", "NSM", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "ES", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "R", "R", "R", "R", "R", "N", "R", "N", "R", "R", "N", "R", "R", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "CS", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "ET", "N", "N", "ES", "ES", "N", "N", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "BN", "N", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "N", "N", "N", "ET", "ET", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"], r2 = new t.__bidiEngine__({
    isInputVisual: true
  });
  t.API.events.push(["postProcessText", function(t2) {
    var e2 = t2.text, n2 = (t2.x, t2.y, t2.options || {}), i2 = (t2.mutex, n2.lang, []);
    if (n2.isInputVisual = "boolean" != typeof n2.isInputVisual || n2.isInputVisual, r2.setOptions(n2), "[object Array]" === Object.prototype.toString.call(e2)) {
      var a2 = 0;
      for (i2 = [], a2 = 0; a2 < e2.length; a2 += 1) "[object Array]" === Object.prototype.toString.call(e2[a2]) ? i2.push([r2.doBidiReorder(e2[a2][0]), e2[a2][1], e2[a2][2]]) : i2.push([r2.doBidiReorder(e2[a2])]);
      t2.text = i2;
    } else t2.text = r2.doBidiReorder(e2);
    r2.setOptions({
      isInputVisual: true
    });
  }]);
}(O), O.API.TTFFont = function() {
  function t(t2) {
    var e;
    if (this.rawData = t2, e = this.contents = new te(t2), this.contents.pos = 4, "ttcf" === e.readString(4)) throw new Error("TTCF not supported.");
    e.pos = 0, this.parse(), this.subset = new ye(this), this.registerTTF();
  }
  return t.open = function(e) {
    return new t(e);
  }, t.prototype.parse = function() {
    return this.directory = new ee(this.contents), this.head = new ie(this), this.name = new he(this), this.cmap = new oe(this), this.toUnicode = {}, this.hhea = new se(this), this.maxp = new fe(this), this.hmtx = new de(this), this.post = new ce(this), this.os2 = new ue(this), this.loca = new be(this), this.glyf = new ge(this), this.ascender = this.os2.exists && this.os2.ascender || this.hhea.ascender, this.decender = this.os2.exists && this.os2.decender || this.hhea.decender, this.lineGap = this.os2.exists && this.os2.lineGap || this.hhea.lineGap, this.bbox = [this.head.xMin, this.head.yMin, this.head.xMax, this.head.yMax];
  }, t.prototype.registerTTF = function() {
    var t2, e, r2, n2, i2;
    if (this.scaleFactor = 1e3 / this.head.unitsPerEm, this.bbox = function() {
      var e2, r3, n3, i3;
      for (i3 = [], e2 = 0, r3 = (n3 = this.bbox).length; e2 < r3; e2++) t2 = n3[e2], i3.push(Math.round(t2 * this.scaleFactor));
      return i3;
    }.call(this), this.stemV = 0, this.post.exists ? (r2 = 255 & (n2 = this.post.italic_angle), 0 != (32768 & (e = n2 >> 16)) && (e = -(1 + (65535 ^ e))), this.italicAngle = +(e + "." + r2)) : this.italicAngle = 0, this.ascender = Math.round(this.ascender * this.scaleFactor), this.decender = Math.round(this.decender * this.scaleFactor), this.lineGap = Math.round(this.lineGap * this.scaleFactor), this.capHeight = this.os2.exists && this.os2.capHeight || this.ascender, this.xHeight = this.os2.exists && this.os2.xHeight || 0, this.familyClass = (this.os2.exists && this.os2.familyClass || 0) >> 8, this.isSerif = 1 === (i2 = this.familyClass) || 2 === i2 || 3 === i2 || 4 === i2 || 5 === i2 || 7 === i2, this.isScript = 10 === this.familyClass, this.flags = 0, this.post.isFixedPitch && (this.flags |= 1), this.isSerif && (this.flags |= 2), this.isScript && (this.flags |= 8), 0 !== this.italicAngle && (this.flags |= 64), this.flags |= 32, !this.cmap.unicode) throw new Error("No unicode cmap for font");
  }, t.prototype.characterToGlyph = function(t2) {
    var e;
    return (null != (e = this.cmap.unicode) ? e.codeMap[t2] : void 0) || 0;
  }, t.prototype.widthOfGlyph = function(t2) {
    var e;
    return e = 1e3 / this.head.unitsPerEm, this.hmtx.forGlyph(t2).advance * e;
  }, t.prototype.widthOfString = function(t2, e, r2) {
    var n2, i2, a2, o2;
    for (a2 = 0, i2 = 0, o2 = (t2 = "" + t2).length; 0 <= o2 ? i2 < o2 : i2 > o2; i2 = 0 <= o2 ? ++i2 : --i2) n2 = t2.charCodeAt(i2), a2 += this.widthOfGlyph(this.characterToGlyph(n2)) + r2 * (1e3 / e) || 0;
    return a2 * (e / 1e3);
  }, t.prototype.lineHeight = function(t2, e) {
    var r2;
    return null == e && (e = false), r2 = e ? this.lineGap : 0, (this.ascender + r2 - this.decender) / 1e3 * t2;
  }, t;
}();
var Qt;
var te = function() {
  function t(t2) {
    this.data = null != t2 ? t2 : [], this.pos = 0, this.length = this.data.length;
  }
  return t.prototype.readByte = function() {
    return this.data[this.pos++];
  }, t.prototype.writeByte = function(t2) {
    return this.data[this.pos++] = t2;
  }, t.prototype.readUInt32 = function() {
    return 16777216 * this.readByte() + (this.readByte() << 16) + (this.readByte() << 8) + this.readByte();
  }, t.prototype.writeUInt32 = function(t2) {
    return this.writeByte(t2 >>> 24 & 255), this.writeByte(t2 >> 16 & 255), this.writeByte(t2 >> 8 & 255), this.writeByte(255 & t2);
  }, t.prototype.readInt32 = function() {
    var t2;
    return (t2 = this.readUInt32()) >= 2147483648 ? t2 - 4294967296 : t2;
  }, t.prototype.writeInt32 = function(t2) {
    return t2 < 0 && (t2 += 4294967296), this.writeUInt32(t2);
  }, t.prototype.readUInt16 = function() {
    return this.readByte() << 8 | this.readByte();
  }, t.prototype.writeUInt16 = function(t2) {
    return this.writeByte(t2 >> 8 & 255), this.writeByte(255 & t2);
  }, t.prototype.readInt16 = function() {
    var t2;
    return (t2 = this.readUInt16()) >= 32768 ? t2 - 65536 : t2;
  }, t.prototype.writeInt16 = function(t2) {
    return t2 < 0 && (t2 += 65536), this.writeUInt16(t2);
  }, t.prototype.readString = function(t2) {
    var e, r2;
    for (r2 = [], e = 0; 0 <= t2 ? e < t2 : e > t2; e = 0 <= t2 ? ++e : --e) r2[e] = String.fromCharCode(this.readByte());
    return r2.join("");
  }, t.prototype.writeString = function(t2) {
    var e, r2, n2;
    for (n2 = [], e = 0, r2 = t2.length; 0 <= r2 ? e < r2 : e > r2; e = 0 <= r2 ? ++e : --e) n2.push(this.writeByte(t2.charCodeAt(e)));
    return n2;
  }, t.prototype.readShort = function() {
    return this.readInt16();
  }, t.prototype.writeShort = function(t2) {
    return this.writeInt16(t2);
  }, t.prototype.readLongLong = function() {
    var t2, e, r2, n2, i2, a2, o2, s2;
    return t2 = this.readByte(), e = this.readByte(), r2 = this.readByte(), n2 = this.readByte(), i2 = this.readByte(), a2 = this.readByte(), o2 = this.readByte(), s2 = this.readByte(), 128 & t2 ? -1 * (72057594037927940 * (255 ^ t2) + 281474976710656 * (255 ^ e) + 1099511627776 * (255 ^ r2) + 4294967296 * (255 ^ n2) + 16777216 * (255 ^ i2) + 65536 * (255 ^ a2) + 256 * (255 ^ o2) + (255 ^ s2) + 1) : 72057594037927940 * t2 + 281474976710656 * e + 1099511627776 * r2 + 4294967296 * n2 + 16777216 * i2 + 65536 * a2 + 256 * o2 + s2;
  }, t.prototype.writeLongLong = function(t2) {
    var e, r2;
    return e = Math.floor(t2 / 4294967296), r2 = 4294967295 & t2, this.writeByte(e >> 24 & 255), this.writeByte(e >> 16 & 255), this.writeByte(e >> 8 & 255), this.writeByte(255 & e), this.writeByte(r2 >> 24 & 255), this.writeByte(r2 >> 16 & 255), this.writeByte(r2 >> 8 & 255), this.writeByte(255 & r2);
  }, t.prototype.readInt = function() {
    return this.readInt32();
  }, t.prototype.writeInt = function(t2) {
    return this.writeInt32(t2);
  }, t.prototype.read = function(t2) {
    var e, r2;
    for (e = [], r2 = 0; 0 <= t2 ? r2 < t2 : r2 > t2; r2 = 0 <= t2 ? ++r2 : --r2) e.push(this.readByte());
    return e;
  }, t.prototype.write = function(t2) {
    var e, r2, n2, i2;
    for (i2 = [], r2 = 0, n2 = t2.length; r2 < n2; r2++) e = t2[r2], i2.push(this.writeByte(e));
    return i2;
  }, t;
}();
var ee = function() {
  var t;
  function e(t2) {
    var e2, r2, n2;
    for (this.scalarType = t2.readInt(), this.tableCount = t2.readShort(), this.searchRange = t2.readShort(), this.entrySelector = t2.readShort(), this.rangeShift = t2.readShort(), this.tables = {}, r2 = 0, n2 = this.tableCount; 0 <= n2 ? r2 < n2 : r2 > n2; r2 = 0 <= n2 ? ++r2 : --r2) e2 = {
      tag: t2.readString(4),
      checksum: t2.readInt(),
      offset: t2.readInt(),
      length: t2.readInt()
    }, this.tables[e2.tag] = e2;
  }
  return e.prototype.encode = function(e2) {
    var r2, n2, i2, a2, o2, s2, u2, c2, l2, h2, f2, d2, p2;
    for (p2 in f2 = Object.keys(e2).length, s2 = Math.log(2), l2 = 16 * Math.floor(Math.log(f2) / s2), a2 = Math.floor(l2 / s2), c2 = 16 * f2 - l2, (n2 = new te()).writeInt(this.scalarType), n2.writeShort(f2), n2.writeShort(l2), n2.writeShort(a2), n2.writeShort(c2), i2 = 16 * f2, u2 = n2.pos + i2, o2 = null, d2 = [], e2) for (h2 = e2[p2], n2.writeString(p2), n2.writeInt(t(h2)), n2.writeInt(u2), n2.writeInt(h2.length), d2 = d2.concat(h2), "head" === p2 && (o2 = u2), u2 += h2.length; u2 % 4; ) d2.push(0), u2++;
    return n2.write(d2), r2 = 2981146554 - t(n2.data), n2.pos = o2 + 8, n2.writeUInt32(r2), n2.data;
  }, t = function(t2) {
    var e2, r2, n2, i2;
    for (t2 = pe.call(t2); t2.length % 4; ) t2.push(0);
    for (n2 = new te(t2), r2 = 0, e2 = 0, i2 = t2.length; e2 < i2; e2 = e2 += 4) r2 += n2.readUInt32();
    return 4294967295 & r2;
  }, e;
}();
var re = {}.hasOwnProperty;
var ne = function(t, e) {
  for (var r2 in e) re.call(e, r2) && (t[r2] = e[r2]);
  function n2() {
    this.constructor = t;
  }
  return n2.prototype = e.prototype, t.prototype = new n2(), t.__super__ = e.prototype, t;
};
Qt = function() {
  function t(t2) {
    var e;
    this.file = t2, e = this.file.directory.tables[this.tag], this.exists = !!e, e && (this.offset = e.offset, this.length = e.length, this.parse(this.file.contents));
  }
  return t.prototype.parse = function() {
  }, t.prototype.encode = function() {
  }, t.prototype.raw = function() {
    return this.exists ? (this.file.contents.pos = this.offset, this.file.contents.read(this.length)) : null;
  }, t;
}();
var ie = function(t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return ne(e, Qt), e.prototype.tag = "head", e.prototype.parse = function(t2) {
    return t2.pos = this.offset, this.version = t2.readInt(), this.revision = t2.readInt(), this.checkSumAdjustment = t2.readInt(), this.magicNumber = t2.readInt(), this.flags = t2.readShort(), this.unitsPerEm = t2.readShort(), this.created = t2.readLongLong(), this.modified = t2.readLongLong(), this.xMin = t2.readShort(), this.yMin = t2.readShort(), this.xMax = t2.readShort(), this.yMax = t2.readShort(), this.macStyle = t2.readShort(), this.lowestRecPPEM = t2.readShort(), this.fontDirectionHint = t2.readShort(), this.indexToLocFormat = t2.readShort(), this.glyphDataFormat = t2.readShort();
  }, e.prototype.encode = function(t2) {
    var e2;
    return (e2 = new te()).writeInt(this.version), e2.writeInt(this.revision), e2.writeInt(this.checkSumAdjustment), e2.writeInt(this.magicNumber), e2.writeShort(this.flags), e2.writeShort(this.unitsPerEm), e2.writeLongLong(this.created), e2.writeLongLong(this.modified), e2.writeShort(this.xMin), e2.writeShort(this.yMin), e2.writeShort(this.xMax), e2.writeShort(this.yMax), e2.writeShort(this.macStyle), e2.writeShort(this.lowestRecPPEM), e2.writeShort(this.fontDirectionHint), e2.writeShort(t2), e2.writeShort(this.glyphDataFormat), e2.data;
  }, e;
}();
var ae = function() {
  function t(t2, e) {
    var r2, n2, i2, a2, o2, s2, u2, c2, l2, h2, f2, d2, p2, g2, m2, v2, b2;
    switch (this.platformID = t2.readUInt16(), this.encodingID = t2.readShort(), this.offset = e + t2.readInt(), l2 = t2.pos, t2.pos = this.offset, this.format = t2.readUInt16(), this.length = t2.readUInt16(), this.language = t2.readUInt16(), this.isUnicode = 3 === this.platformID && 1 === this.encodingID && 4 === this.format || 0 === this.platformID && 4 === this.format, this.codeMap = {}, this.format) {
      case 0:
        for (s2 = 0; s2 < 256; ++s2) this.codeMap[s2] = t2.readByte();
        break;
      case 4:
        for (f2 = t2.readUInt16(), h2 = f2 / 2, t2.pos += 6, i2 = function() {
          var e2, r3;
          for (r3 = [], s2 = e2 = 0; 0 <= h2 ? e2 < h2 : e2 > h2; s2 = 0 <= h2 ? ++e2 : --e2) r3.push(t2.readUInt16());
          return r3;
        }(), t2.pos += 2, p2 = function() {
          var e2, r3;
          for (r3 = [], s2 = e2 = 0; 0 <= h2 ? e2 < h2 : e2 > h2; s2 = 0 <= h2 ? ++e2 : --e2) r3.push(t2.readUInt16());
          return r3;
        }(), u2 = function() {
          var e2, r3;
          for (r3 = [], s2 = e2 = 0; 0 <= h2 ? e2 < h2 : e2 > h2; s2 = 0 <= h2 ? ++e2 : --e2) r3.push(t2.readUInt16());
          return r3;
        }(), c2 = function() {
          var e2, r3;
          for (r3 = [], s2 = e2 = 0; 0 <= h2 ? e2 < h2 : e2 > h2; s2 = 0 <= h2 ? ++e2 : --e2) r3.push(t2.readUInt16());
          return r3;
        }(), n2 = (this.length - t2.pos + this.offset) / 2, o2 = function() {
          var e2, r3;
          for (r3 = [], s2 = e2 = 0; 0 <= n2 ? e2 < n2 : e2 > n2; s2 = 0 <= n2 ? ++e2 : --e2) r3.push(t2.readUInt16());
          return r3;
        }(), s2 = m2 = 0, b2 = i2.length; m2 < b2; s2 = ++m2) for (g2 = i2[s2], r2 = v2 = d2 = p2[s2]; d2 <= g2 ? v2 <= g2 : v2 >= g2; r2 = d2 <= g2 ? ++v2 : --v2) 0 === c2[s2] ? a2 = r2 + u2[s2] : 0 !== (a2 = o2[c2[s2] / 2 + (r2 - d2) - (h2 - s2)] || 0) && (a2 += u2[s2]), this.codeMap[r2] = 65535 & a2;
    }
    t2.pos = l2;
  }
  return t.encode = function(t2, e) {
    var r2, n2, i2, a2, o2, s2, u2, c2, l2, h2, f2, d2, p2, g2, m2, v2, b2, y2, w2, N2, L2, A2, x2, S2, _2, P2, k2, I2, F2, C2, j2, O2, B2, M2, E2, q2, R2, T2, D2, U2, z2, H2, V2, W2, G2, Y2;
    switch (I2 = new te(), a2 = Object.keys(t2).sort(function(t3, e2) {
      return t3 - e2;
    }), e) {
      case "macroman":
        for (p2 = 0, g2 = function() {
          var t3 = [];
          for (d2 = 0; d2 < 256; ++d2) t3.push(0);
          return t3;
        }(), v2 = {
          0: 0
        }, i2 = {}, F2 = 0, B2 = a2.length; F2 < B2; F2++) null == v2[V2 = t2[n2 = a2[F2]]] && (v2[V2] = ++p2), i2[n2] = {
          old: t2[n2],
          new: v2[t2[n2]]
        }, g2[n2] = v2[t2[n2]];
        return I2.writeUInt16(1), I2.writeUInt16(0), I2.writeUInt32(12), I2.writeUInt16(0), I2.writeUInt16(262), I2.writeUInt16(0), I2.write(g2), {
          charMap: i2,
          subtable: I2.data,
          maxGlyphID: p2 + 1
        };
      case "unicode":
        for (P2 = [], l2 = [], b2 = 0, v2 = {}, r2 = {}, m2 = u2 = null, C2 = 0, M2 = a2.length; C2 < M2; C2++) null == v2[w2 = t2[n2 = a2[C2]]] && (v2[w2] = ++b2), r2[n2] = {
          old: w2,
          new: v2[w2]
        }, o2 = v2[w2] - n2, null != m2 && o2 === u2 || (m2 && l2.push(m2), P2.push(n2), u2 = o2), m2 = n2;
        for (m2 && l2.push(m2), l2.push(65535), P2.push(65535), S2 = 2 * (x2 = P2.length), A2 = 2 * Math.pow(Math.log(x2) / Math.LN2, 2), h2 = Math.log(A2 / 2) / Math.LN2, L2 = 2 * x2 - A2, s2 = [], N2 = [], f2 = [], d2 = j2 = 0, E2 = P2.length; j2 < E2; d2 = ++j2) {
          if (_2 = P2[d2], c2 = l2[d2], 65535 === _2) {
            s2.push(0), N2.push(0);
            break;
          }
          if (_2 - (k2 = r2[_2].new) >= 32768) for (s2.push(0), N2.push(2 * (f2.length + x2 - d2)), n2 = O2 = _2; _2 <= c2 ? O2 <= c2 : O2 >= c2; n2 = _2 <= c2 ? ++O2 : --O2) f2.push(r2[n2].new);
          else s2.push(k2 - _2), N2.push(0);
        }
        for (I2.writeUInt16(3), I2.writeUInt16(1), I2.writeUInt32(12), I2.writeUInt16(4), I2.writeUInt16(16 + 8 * x2 + 2 * f2.length), I2.writeUInt16(0), I2.writeUInt16(S2), I2.writeUInt16(A2), I2.writeUInt16(h2), I2.writeUInt16(L2), z2 = 0, q2 = l2.length; z2 < q2; z2++) n2 = l2[z2], I2.writeUInt16(n2);
        for (I2.writeUInt16(0), H2 = 0, R2 = P2.length; H2 < R2; H2++) n2 = P2[H2], I2.writeUInt16(n2);
        for (W2 = 0, T2 = s2.length; W2 < T2; W2++) o2 = s2[W2], I2.writeUInt16(o2);
        for (G2 = 0, D2 = N2.length; G2 < D2; G2++) y2 = N2[G2], I2.writeUInt16(y2);
        for (Y2 = 0, U2 = f2.length; Y2 < U2; Y2++) p2 = f2[Y2], I2.writeUInt16(p2);
        return {
          charMap: r2,
          subtable: I2.data,
          maxGlyphID: b2 + 1
        };
    }
  }, t;
}();
var oe = function(t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return ne(e, Qt), e.prototype.tag = "cmap", e.prototype.parse = function(t2) {
    var e2, r2, n2;
    for (t2.pos = this.offset, this.version = t2.readUInt16(), n2 = t2.readUInt16(), this.tables = [], this.unicode = null, r2 = 0; 0 <= n2 ? r2 < n2 : r2 > n2; r2 = 0 <= n2 ? ++r2 : --r2) e2 = new ae(t2, this.offset), this.tables.push(e2), e2.isUnicode && null == this.unicode && (this.unicode = e2);
    return true;
  }, e.encode = function(t2, e2) {
    var r2, n2;
    return null == e2 && (e2 = "macroman"), r2 = ae.encode(t2, e2), (n2 = new te()).writeUInt16(0), n2.writeUInt16(1), r2.table = n2.data.concat(r2.subtable), r2;
  }, e;
}();
var se = function(t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return ne(e, Qt), e.prototype.tag = "hhea", e.prototype.parse = function(t2) {
    return t2.pos = this.offset, this.version = t2.readInt(), this.ascender = t2.readShort(), this.decender = t2.readShort(), this.lineGap = t2.readShort(), this.advanceWidthMax = t2.readShort(), this.minLeftSideBearing = t2.readShort(), this.minRightSideBearing = t2.readShort(), this.xMaxExtent = t2.readShort(), this.caretSlopeRise = t2.readShort(), this.caretSlopeRun = t2.readShort(), this.caretOffset = t2.readShort(), t2.pos += 8, this.metricDataFormat = t2.readShort(), this.numberOfMetrics = t2.readUInt16();
  }, e;
}();
var ue = function(t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return ne(e, Qt), e.prototype.tag = "OS/2", e.prototype.parse = function(t2) {
    if (t2.pos = this.offset, this.version = t2.readUInt16(), this.averageCharWidth = t2.readShort(), this.weightClass = t2.readUInt16(), this.widthClass = t2.readUInt16(), this.type = t2.readShort(), this.ySubscriptXSize = t2.readShort(), this.ySubscriptYSize = t2.readShort(), this.ySubscriptXOffset = t2.readShort(), this.ySubscriptYOffset = t2.readShort(), this.ySuperscriptXSize = t2.readShort(), this.ySuperscriptYSize = t2.readShort(), this.ySuperscriptXOffset = t2.readShort(), this.ySuperscriptYOffset = t2.readShort(), this.yStrikeoutSize = t2.readShort(), this.yStrikeoutPosition = t2.readShort(), this.familyClass = t2.readShort(), this.panose = function() {
      var e2, r2;
      for (r2 = [], e2 = 0; e2 < 10; ++e2) r2.push(t2.readByte());
      return r2;
    }(), this.charRange = function() {
      var e2, r2;
      for (r2 = [], e2 = 0; e2 < 4; ++e2) r2.push(t2.readInt());
      return r2;
    }(), this.vendorID = t2.readString(4), this.selection = t2.readShort(), this.firstCharIndex = t2.readShort(), this.lastCharIndex = t2.readShort(), this.version > 0 && (this.ascent = t2.readShort(), this.descent = t2.readShort(), this.lineGap = t2.readShort(), this.winAscent = t2.readShort(), this.winDescent = t2.readShort(), this.codePageRange = function() {
      var e2, r2;
      for (r2 = [], e2 = 0; e2 < 2; e2 = ++e2) r2.push(t2.readInt());
      return r2;
    }(), this.version > 1)) return this.xHeight = t2.readShort(), this.capHeight = t2.readShort(), this.defaultChar = t2.readShort(), this.breakChar = t2.readShort(), this.maxContext = t2.readShort();
  }, e;
}();
var ce = function(t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return ne(e, Qt), e.prototype.tag = "post", e.prototype.parse = function(t2) {
    var e2, r2, n2;
    switch (t2.pos = this.offset, this.format = t2.readInt(), this.italicAngle = t2.readInt(), this.underlinePosition = t2.readShort(), this.underlineThickness = t2.readShort(), this.isFixedPitch = t2.readInt(), this.minMemType42 = t2.readInt(), this.maxMemType42 = t2.readInt(), this.minMemType1 = t2.readInt(), this.maxMemType1 = t2.readInt(), this.format) {
      case 65536:
        break;
      case 131072:
        var i2;
        for (r2 = t2.readUInt16(), this.glyphNameIndex = [], i2 = 0; 0 <= r2 ? i2 < r2 : i2 > r2; i2 = 0 <= r2 ? ++i2 : --i2) this.glyphNameIndex.push(t2.readUInt16());
        for (this.names = [], n2 = []; t2.pos < this.offset + this.length; ) e2 = t2.readByte(), n2.push(this.names.push(t2.readString(e2)));
        return n2;
      case 151552:
        return r2 = t2.readUInt16(), this.offsets = t2.read(r2);
      case 196608:
        break;
      case 262144:
        return this.map = function() {
          var e3, r3, n3;
          for (n3 = [], i2 = e3 = 0, r3 = this.file.maxp.numGlyphs; 0 <= r3 ? e3 < r3 : e3 > r3; i2 = 0 <= r3 ? ++e3 : --e3) n3.push(t2.readUInt32());
          return n3;
        }.call(this);
    }
  }, e;
}();
var le = function(t, e) {
  this.raw = t, this.length = t.length, this.platformID = e.platformID, this.encodingID = e.encodingID, this.languageID = e.languageID;
};
var he = function(t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return ne(e, Qt), e.prototype.tag = "name", e.prototype.parse = function(t2) {
    var e2, r2, n2, i2, a2, o2, s2, u2, c2, l2, h2;
    for (t2.pos = this.offset, t2.readShort(), e2 = t2.readShort(), o2 = t2.readShort(), r2 = [], i2 = 0; 0 <= e2 ? i2 < e2 : i2 > e2; i2 = 0 <= e2 ? ++i2 : --i2) r2.push({
      platformID: t2.readShort(),
      encodingID: t2.readShort(),
      languageID: t2.readShort(),
      nameID: t2.readShort(),
      length: t2.readShort(),
      offset: this.offset + o2 + t2.readShort()
    });
    for (s2 = {}, i2 = c2 = 0, l2 = r2.length; c2 < l2; i2 = ++c2) n2 = r2[i2], t2.pos = n2.offset, u2 = t2.readString(n2.length), a2 = new le(u2, n2), null == s2[h2 = n2.nameID] && (s2[h2] = []), s2[n2.nameID].push(a2);
    this.strings = s2, this.copyright = s2[0], this.fontFamily = s2[1], this.fontSubfamily = s2[2], this.uniqueSubfamily = s2[3], this.fontName = s2[4], this.version = s2[5];
    try {
      this.postscriptName = s2[6][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
    } catch (t3) {
      this.postscriptName = s2[4][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
    }
    return this.trademark = s2[7], this.manufacturer = s2[8], this.designer = s2[9], this.description = s2[10], this.vendorUrl = s2[11], this.designerUrl = s2[12], this.license = s2[13], this.licenseUrl = s2[14], this.preferredFamily = s2[15], this.preferredSubfamily = s2[17], this.compatibleFull = s2[18], this.sampleText = s2[19];
  }, e;
}();
var fe = function(t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return ne(e, Qt), e.prototype.tag = "maxp", e.prototype.parse = function(t2) {
    return t2.pos = this.offset, this.version = t2.readInt(), this.numGlyphs = t2.readUInt16(), this.maxPoints = t2.readUInt16(), this.maxContours = t2.readUInt16(), this.maxCompositePoints = t2.readUInt16(), this.maxComponentContours = t2.readUInt16(), this.maxZones = t2.readUInt16(), this.maxTwilightPoints = t2.readUInt16(), this.maxStorage = t2.readUInt16(), this.maxFunctionDefs = t2.readUInt16(), this.maxInstructionDefs = t2.readUInt16(), this.maxStackElements = t2.readUInt16(), this.maxSizeOfInstructions = t2.readUInt16(), this.maxComponentElements = t2.readUInt16(), this.maxComponentDepth = t2.readUInt16();
  }, e;
}();
var de = function(t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return ne(e, Qt), e.prototype.tag = "hmtx", e.prototype.parse = function(t2) {
    var e2, r2, n2, i2, a2, o2, s2;
    for (t2.pos = this.offset, this.metrics = [], e2 = 0, o2 = this.file.hhea.numberOfMetrics; 0 <= o2 ? e2 < o2 : e2 > o2; e2 = 0 <= o2 ? ++e2 : --e2) this.metrics.push({
      advance: t2.readUInt16(),
      lsb: t2.readInt16()
    });
    for (n2 = this.file.maxp.numGlyphs - this.file.hhea.numberOfMetrics, this.leftSideBearings = function() {
      var r3, i3;
      for (i3 = [], e2 = r3 = 0; 0 <= n2 ? r3 < n2 : r3 > n2; e2 = 0 <= n2 ? ++r3 : --r3) i3.push(t2.readInt16());
      return i3;
    }(), this.widths = function() {
      var t3, e3, r3, n3;
      for (n3 = [], t3 = 0, e3 = (r3 = this.metrics).length; t3 < e3; t3++) i2 = r3[t3], n3.push(i2.advance);
      return n3;
    }.call(this), r2 = this.widths[this.widths.length - 1], s2 = [], e2 = a2 = 0; 0 <= n2 ? a2 < n2 : a2 > n2; e2 = 0 <= n2 ? ++a2 : --a2) s2.push(this.widths.push(r2));
    return s2;
  }, e.prototype.forGlyph = function(t2) {
    return t2 in this.metrics ? this.metrics[t2] : {
      advance: this.metrics[this.metrics.length - 1].advance,
      lsb: this.leftSideBearings[t2 - this.metrics.length]
    };
  }, e;
}();
var pe = [].slice;
var ge = function(t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return ne(e, Qt), e.prototype.tag = "glyf", e.prototype.parse = function() {
    return this.cache = {};
  }, e.prototype.glyphFor = function(t2) {
    var e2, r2, n2, i2, a2, o2, s2, u2, c2, l2;
    return t2 in this.cache ? this.cache[t2] : (i2 = this.file.loca, e2 = this.file.contents, r2 = i2.indexOf(t2), 0 === (n2 = i2.lengthOf(t2)) ? this.cache[t2] = null : (e2.pos = this.offset + r2, a2 = (o2 = new te(e2.read(n2))).readShort(), u2 = o2.readShort(), l2 = o2.readShort(), s2 = o2.readShort(), c2 = o2.readShort(), this.cache[t2] = -1 === a2 ? new ve(o2, u2, l2, s2, c2) : new me(o2, a2, u2, l2, s2, c2), this.cache[t2]));
  }, e.prototype.encode = function(t2, e2, r2) {
    var n2, i2, a2, o2, s2;
    for (a2 = [], i2 = [], o2 = 0, s2 = e2.length; o2 < s2; o2++) n2 = t2[e2[o2]], i2.push(a2.length), n2 && (a2 = a2.concat(n2.encode(r2)));
    return i2.push(a2.length), {
      table: a2,
      offsets: i2
    };
  }, e;
}();
var me = function() {
  function t(t2, e, r2, n2, i2, a2) {
    this.raw = t2, this.numberOfContours = e, this.xMin = r2, this.yMin = n2, this.xMax = i2, this.yMax = a2, this.compound = false;
  }
  return t.prototype.encode = function() {
    return this.raw.data;
  }, t;
}();
var ve = function() {
  function t(t2, e, r2, n2, i2) {
    var a2, o2;
    for (this.raw = t2, this.xMin = e, this.yMin = r2, this.xMax = n2, this.yMax = i2, this.compound = true, this.glyphIDs = [], this.glyphOffsets = [], a2 = this.raw; o2 = a2.readShort(), this.glyphOffsets.push(a2.pos), this.glyphIDs.push(a2.readUInt16()), 32 & o2; ) a2.pos += 1 & o2 ? 4 : 2, 128 & o2 ? a2.pos += 8 : 64 & o2 ? a2.pos += 4 : 8 & o2 && (a2.pos += 2);
  }
  return 1, 8, 32, 64, 128, t.prototype.encode = function() {
    var t2, e, r2;
    for (e = new te(pe.call(this.raw.data)), t2 = 0, r2 = this.glyphIDs.length; t2 < r2; ++t2) e.pos = this.glyphOffsets[t2];
    return e.data;
  }, t;
}();
var be = function(t) {
  function e() {
    return e.__super__.constructor.apply(this, arguments);
  }
  return ne(e, Qt), e.prototype.tag = "loca", e.prototype.parse = function(t2) {
    var e2, r2;
    return t2.pos = this.offset, e2 = this.file.head.indexToLocFormat, this.offsets = 0 === e2 ? function() {
      var e3, n2;
      for (n2 = [], r2 = 0, e3 = this.length; r2 < e3; r2 += 2) n2.push(2 * t2.readUInt16());
      return n2;
    }.call(this) : function() {
      var e3, n2;
      for (n2 = [], r2 = 0, e3 = this.length; r2 < e3; r2 += 4) n2.push(t2.readUInt32());
      return n2;
    }.call(this);
  }, e.prototype.indexOf = function(t2) {
    return this.offsets[t2];
  }, e.prototype.lengthOf = function(t2) {
    return this.offsets[t2 + 1] - this.offsets[t2];
  }, e.prototype.encode = function(t2, e2) {
    for (var r2 = new Uint32Array(this.offsets.length), n2 = 0, i2 = 0, a2 = 0; a2 < r2.length; ++a2) if (r2[a2] = n2, i2 < e2.length && e2[i2] == a2) {
      ++i2, r2[a2] = n2;
      var o2 = this.offsets[a2], s2 = this.offsets[a2 + 1] - o2;
      s2 > 0 && (n2 += s2);
    }
    for (var u2 = new Array(4 * r2.length), c2 = 0; c2 < r2.length; ++c2) u2[4 * c2 + 3] = 255 & r2[c2], u2[4 * c2 + 2] = (65280 & r2[c2]) >> 8, u2[4 * c2 + 1] = (16711680 & r2[c2]) >> 16, u2[4 * c2] = (4278190080 & r2[c2]) >> 24;
    return u2;
  }, e;
}();
var ye = function() {
  function t(t2) {
    this.font = t2, this.subset = {}, this.unicodes = {}, this.next = 33;
  }
  return t.prototype.generateCmap = function() {
    var t2, e, r2, n2, i2;
    for (e in n2 = this.font.cmap.tables[0].codeMap, t2 = {}, i2 = this.subset) r2 = i2[e], t2[e] = n2[r2];
    return t2;
  }, t.prototype.glyphsFor = function(t2) {
    var e, r2, n2, i2, a2, o2, s2;
    for (n2 = {}, a2 = 0, o2 = t2.length; a2 < o2; a2++) n2[i2 = t2[a2]] = this.font.glyf.glyphFor(i2);
    for (i2 in e = [], n2) (null != (r2 = n2[i2]) ? r2.compound : void 0) && e.push.apply(e, r2.glyphIDs);
    if (e.length > 0) for (i2 in s2 = this.glyphsFor(e)) r2 = s2[i2], n2[i2] = r2;
    return n2;
  }, t.prototype.encode = function(t2, e) {
    var r2, n2, i2, a2, o2, s2, u2, c2, l2, h2, f2, d2, p2, g2, m2;
    for (n2 in r2 = oe.encode(this.generateCmap(), "unicode"), a2 = this.glyphsFor(t2), f2 = {
      0: 0
    }, m2 = r2.charMap) f2[(s2 = m2[n2]).old] = s2.new;
    for (d2 in h2 = r2.maxGlyphID, a2) d2 in f2 || (f2[d2] = h2++);
    return c2 = function(t3) {
      var e2, r3;
      for (e2 in r3 = {}, t3) r3[t3[e2]] = e2;
      return r3;
    }(f2), l2 = Object.keys(c2).sort(function(t3, e2) {
      return t3 - e2;
    }), p2 = function() {
      var t3, e2, r3;
      for (r3 = [], t3 = 0, e2 = l2.length; t3 < e2; t3++) o2 = l2[t3], r3.push(c2[o2]);
      return r3;
    }(), i2 = this.font.glyf.encode(a2, p2, f2), u2 = this.font.loca.encode(i2.offsets, p2), g2 = {
      cmap: this.font.cmap.raw(),
      glyf: i2.table,
      loca: u2,
      hmtx: this.font.hmtx.raw(),
      hhea: this.font.hhea.raw(),
      maxp: this.font.maxp.raw(),
      post: this.font.post.raw(),
      name: this.font.name.raw(),
      head: this.font.head.encode(e)
    }, this.font.os2.exists && (g2["OS/2"] = this.font.os2.raw()), this.font.directory.encode(g2);
  }, t;
}();
O.API.PDFObject = function() {
  var t;
  function e() {
  }
  return t = function(t2, e2) {
    return (Array(e2 + 1).join("0") + t2).slice(-e2);
  }, e.convert = function(r2) {
    var n2, i2, a2, o2;
    if (Array.isArray(r2)) return "[" + function() {
      var t2, i3, a3;
      for (a3 = [], t2 = 0, i3 = r2.length; t2 < i3; t2++) n2 = r2[t2], a3.push(e.convert(n2));
      return a3;
    }().join(" ") + "]";
    if ("string" == typeof r2) return "/" + r2;
    if (null != r2 ? r2.isString : void 0) return "(" + r2 + ")";
    if (r2 instanceof Date) return "(D:" + t(r2.getUTCFullYear(), 4) + t(r2.getUTCMonth(), 2) + t(r2.getUTCDate(), 2) + t(r2.getUTCHours(), 2) + t(r2.getUTCMinutes(), 2) + t(r2.getUTCSeconds(), 2) + "Z)";
    if ("[object Object]" === {}.toString.call(r2)) {
      for (i2 in a2 = ["<<"], r2) o2 = r2[i2], a2.push("/" + i2 + " " + e.convert(o2));
      return a2.push(">>"), a2.join("\n");
    }
    return "" + r2;
  }, e;
}();
var jspdf_es_min_default = O;
export {
  Lt as AcroForm,
  wt as AcroFormAppearance,
  dt as AcroFormButton,
  vt as AcroFormCheckBox,
  ct as AcroFormChoiceField,
  ht as AcroFormComboBox,
  ft as AcroFormEditBox,
  lt as AcroFormListBox,
  yt as AcroFormPasswordField,
  pt as AcroFormPushButton,
  gt as AcroFormRadioButton,
  bt as AcroFormTextField,
  I as GState,
  C as ShadingPattern,
  j as TilingPattern,
  jspdf_es_min_default as default,
  O as jsPDF
};
/*! Bundled license information:

jspdf/dist/jspdf.es.min.js:
  (** @license
   *
   * jsPDF - PDF Document creation from JavaScript
   * Version 2.3.1 Built on 2021-03-08T15:44:11.674Z
   *                      CommitID 00000000
   *
   * Copyright (c) 2010-2020 James Hall <james@parall.ax>, https://github.com/MrRio/jsPDF
   *               2015-2020 yWorks GmbH, http://www.yworks.com
   *               2015-2020 Lukas Holländer <lukas.hollaender@yworks.com>, https://github.com/HackbrettXXX
   *               2016-2018 Aras Abbasi <aras.abbasi@gmail.com>
   *               2010 Aaron Spike, https://github.com/acspike
   *               2012 Willow Systems Corporation, willow-systems.com
   *               2012 Pablo Hess, https://github.com/pablohess
   *               2012 Florian Jenett, https://github.com/fjenett
   *               2013 Warren Weckesser, https://github.com/warrenweckesser
   *               2013 Youssef Beddad, https://github.com/lifof
   *               2013 Lee Driscoll, https://github.com/lsdriscoll
   *               2013 Stefan Slonevskiy, https://github.com/stefslon
   *               2013 Jeremy Morel, https://github.com/jmorel
   *               2013 Christoph Hartmann, https://github.com/chris-rock
   *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
   *               2014 James Makes, https://github.com/dollaruw
   *               2014 Diego Casorran, https://github.com/diegocr
   *               2014 Steven Spungin, https://github.com/Flamenco
   *               2014 Kenneth Glassey, https://github.com/Gavvers
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   *
   * Contributor(s):
   *    siefkenj, ahwolf, rickygu, Midnith, saintclair, eaparango,
   *    kim3er, mfo, alnorth, Flamenco
   *)
  (**
   * @license
   * FileSaver.js
   * A saveAs() FileSaver implementation.
   *
   * By Eli Grey, http://eligrey.com
   *
   * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
   * source  : http://purl.eligrey.com/github/FileSaver.js
   *)
  (**
   * A class to parse color values
   * @author Stoyan Stefanov <sstoo@gmail.com>
   * {@link   http://www.phpied.com/rgb-color-parser-in-javascript/}
   * @license Use it if you like it
   *)
  (**
   * @license
   * Joseph Myers does not specify a particular license for his work.
   *
   * Author: Joseph Myers
   * Accessed from: http://www.myersdaily.org/joseph/javascript/md5.js
   *
   * Modified by: Owen Leong
   *)
  (**
   * @license
   * FPDF is released under a permissive license: there is no usage restriction.
   * You may embed it freely in your application (commercial or not), with or
   * without modifications.
   *
   * Reference: http://www.fpdf.org/en/script/script37.php
   *)
  (**
   * @license
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   * Author: Owen Leong (@owenl131)
   * Date: 15 Oct 2020
   * References:
   * https://www.cs.cmu.edu/~dst/Adobe/Gallery/anon21jul01-pdf-encryption.txt
   * https://github.com/foliojs/pdfkit/blob/master/lib/security.js
   * http://www.fpdf.org/en/script/script37.php
   *)
  (** @license
   * jsPDF addImage plugin
   * Copyright (c) 2012 Jason Siefken, https://github.com/siefkenj/
   *               2013 Chris Dowling, https://github.com/gingerchris
   *               2013 Trinh Ho, https://github.com/ineedfat
   *               2013 Edwin Alejandro Perez, https://github.com/eaparango
   *               2013 Norah Smith, https://github.com/burnburnrocket
   *               2014 Diego Casorran, https://github.com/diegocr
   *               2014 James Robb, https://github.com/jamesbrobb
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   *)
  (**
   * @license
   *
   * Copyright (c) 2014 James Robb, https://github.com/jamesbrobb
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   * ====================================================================
   *)
  (**
   * @license
   * (c) Dean McNamee <dean@gmail.com>, 2013.
   *
   * https://github.com/deanm/omggif
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to
   * deal in the Software without restriction, including without limitation the
   * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
   * sell copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
   * IN THE SOFTWARE.
   *
   * omggif is a JavaScript implementation of a GIF 89a encoder and decoder,
   * including animation and compression.  It does not rely on any specific
   * underlying system, so should run in the browser, Node, or Plask.
   *)
  (**
   * @license
    Copyright (c) 2008, Adobe Systems Incorporated
    All rights reserved.
  
    Redistribution and use in source and binary forms, with or without 
    modification, are permitted provided that the following conditions are
    met:
  
    * Redistributions of source code must retain the above copyright notice, 
      this list of conditions and the following disclaimer.
    
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the 
      documentation and/or other materials provided with the distribution.
    
    * Neither the name of Adobe Systems Incorporated nor the names of its 
      contributors may be used to endorse or promote products derived from 
      this software without specific prior written permission.
  
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
    IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
    THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
    CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
    EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
    LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
    NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  *)
  (**
   * @license
   * Copyright (c) 2017 Aras Abbasi
   *
   * Licensed under the MIT License.
   * http://opensource.org/licenses/mit-license
   *)
*/
//# sourceMappingURL=jspdf.js.map
