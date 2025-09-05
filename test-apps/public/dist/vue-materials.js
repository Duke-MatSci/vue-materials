import { reactive as yd, createApp as bd, openBlock as f, createElementBlock as w, normalizeClass as O, renderSlot as P, createElementVNode as x, normalizeStyle as J, withDirectives as yt, vShow as rs, h as xe, resolveComponent as b, createBlock as D, mergeProps as ee, toHandlers as _e, withCtx as y, createCommentVNode as N, getCurrentInstance as Ko, createVNode as k, toDisplayString as R, createTextVNode as te, Transition as ue, Fragment as de, renderList as ge, withModifiers as Md, nextTick as wd, setBlockTracking as ne, withKeys as Jo, KeepAlive as cr, inject as Zo, computed as el, TransitionGroup as $d, vModelDynamic as tl, vModelText as Td } from "vue";
function Cd(e) {
  return yd(e);
}
let ga = null, _a = null, ya = null;
const lt = bd({
  data: () => ({
    prefix: "md-theme-",
    theme: "default",
    enabled: !0,
    metaColors: !1
  }),
  computed: {
    themeTarget() {
      return this.$isServer ? !1 : document.documentElement;
    },
    fullThemeName() {
      return this.getThemeName();
    }
  },
  watch: {
    enabled: {
      immediate: !0,
      handler() {
        const { fullThemeName: e, themeTarget: t, enabled: r } = this;
        t && (r ? (t.classList.add(e), this.metaColors && this.setHtmlMetaColors(e)) : (t.classList.remove(e), this.metaColors && this.setHtmlMetaColors()));
      }
    },
    theme(e, t) {
      const { getThemeName: r, themeTarget: n } = this;
      e = r(e), n.classList.remove(r(t)), n.classList.add(e), this.metaColors && this.setHtmlMetaColors(e);
    },
    metaColors(e) {
      e ? this.setHtmlMetaColors(this.fullThemeName) : this.setHtmlMetaColors();
    }
  },
  methods: {
    getAncestorTheme(e) {
      if (e) {
        const t = e.mdTheme, r = (n) => {
          if (n) {
            const { mdTheme: a, $parent: s } = n;
            return a && a !== t ? a : r(s);
          }
          return this.theme;
        };
        return r(e.$parent);
      }
      return null;
    },
    getThemeName(e) {
      const t = e || this.theme;
      return this.prefix + t;
    },
    setMicrosoftColors(e) {
      ga && ga.setAttribute("content", e);
    },
    setThemeColors(e) {
      _a && _a.setAttribute("content", e);
    },
    setMaskColors(e) {
      ya && ya.setAttribute("color", e);
    },
    setHtmlMetaColors(e) {
      let t = "#fff";
      e && (t = window.getComputedStyle(document.documentElement).getPropertyValue(`--${e}-primary`)), t && (this.setMicrosoftColors(t), this.setThemeColors(t), this.setMaskColors(t));
    }
  },
  mounted() {
    ga = document.querySelector('[name="msapplication-TileColor"]'), _a = document.querySelector('[name="theme-color"]'), ya = document.querySelector('[rel="mask-icon"]'), this.enabled && this.metaColors && window.addEventListener("load", () => {
      this.setHtmlMetaColors(this.fullThemeName);
    });
  }
}), xd = () => {
  let e = new Cd({
    ripple: !0,
    theming: {},
    locale: {
      startYear: 1900,
      endYear: 2099,
      dateFormat: "yyyy-MM-dd",
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      shorterDays: ["S", "M", "T", "W", "T", "F", "S"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      shorterMonths: ["J", "F", "M", "A", "M", "Ju", "Ju", "A", "Se", "O", "N", "D"],
      firstDayOfAWeek: 0,
      cancel: "Cancel",
      confirm: "Ok"
    },
    router: {
      linkActiveClass: "router-link-active"
    }
  });
  return Object.defineProperties(e.theming, {
    metaColors: {
      get: () => lt.metaColors,
      set(t) {
        lt.metaColors = t;
      }
    },
    theme: {
      get: () => lt.theme,
      set(t) {
        lt.theme = t;
      }
    },
    enabled: {
      get: () => lt.enabled,
      set(t) {
        lt.enabled = t;
      }
    }
  }), e;
}, Q = (e) => {
  e.material || (e.material = xd(), e.config.globalProperties.$material = e.material, e.provide("material", e.material));
};
var rl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function se(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Pd = function(t) {
  return Sd(t) && !Dd(t);
};
function Sd(e) {
  return !!e && typeof e == "object";
}
function Dd(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || Ad(e);
}
var kd = typeof Symbol == "function" && Symbol.for, Od = kd ? Symbol.for("react.element") : 60103;
function Ad(e) {
  return e.$$typeof === Od;
}
function Ed(e) {
  return Array.isArray(e) ? [] : {};
}
function ir(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? ft(Ed(e), e, t) : e;
}
function Id(e, t, r) {
  return e.concat(t).map(function(n) {
    return ir(n, r);
  });
}
function Ld(e, t) {
  if (!t.customMerge)
    return ft;
  var r = t.customMerge(e);
  return typeof r == "function" ? r : ft;
}
function Rd(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function As(e) {
  return Object.keys(e).concat(Rd(e));
}
function al(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function Nd(e, t) {
  return al(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function Hd(e, t, r) {
  var n = {};
  return r.isMergeableObject(e) && As(e).forEach(function(a) {
    n[a] = ir(e[a], r);
  }), As(t).forEach(function(a) {
    Nd(e, a) || (al(e, a) && r.isMergeableObject(t[a]) ? n[a] = Ld(a, r)(e[a], t[a], r) : n[a] = ir(t[a], r));
  }), n;
}
function ft(e, t, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || Id, r.isMergeableObject = r.isMergeableObject || Pd, r.cloneUnlessOtherwiseSpecified = ir;
  var n = Array.isArray(t), a = Array.isArray(e), s = n === a;
  return s ? n ? r.arrayMerge(e, t, r) : Hd(e, t, r) : ir(t, r);
}
ft.all = function(t, r) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(n, a) {
    return ft(n, a, r);
  }, {});
};
var Fd = ft, Bd = Fd;
const nl = /* @__PURE__ */ se(Bd);
function W(e) {
  return nl({
    props: {
      mdTheme: "md-theme-default"
    },
    computed: {
      $mdActiveTheme() {
        return "md-theme-default";
      }
    }
  }, e);
}
var Ar = { exports: {} }, sr = { exports: {} };
(function() {
  var e, t, r, n, a, s;
  typeof performance < "u" && performance !== null && performance.now ? sr.exports = function() {
    return performance.now();
  } : typeof process < "u" && process !== null && process.hrtime ? (sr.exports = function() {
    return (e() - a) / 1e6;
  }, t = process.hrtime, e = function() {
    var i;
    return i = t(), i[0] * 1e9 + i[1];
  }, n = e(), s = process.uptime() * 1e9, a = n - s) : Date.now ? (sr.exports = function() {
    return Date.now() - r;
  }, r = Date.now()) : (sr.exports = function() {
    return (/* @__PURE__ */ new Date()).getTime() - r;
  }, r = (/* @__PURE__ */ new Date()).getTime());
}).call(rl);
var Wd = sr.exports, Yd = Wd, Te = typeof window > "u" ? rl : window, Mr = ["moz", "webkit"], ct = "AnimationFrame", mt = Te["request" + ct], or = Te["cancel" + ct] || Te["cancelRequest" + ct];
for (var Kt = 0; !mt && Kt < Mr.length; Kt++)
  mt = Te[Mr[Kt] + "Request" + ct], or = Te[Mr[Kt] + "Cancel" + ct] || Te[Mr[Kt] + "CancelRequest" + ct];
if (!mt || !or) {
  var ba = 0, Es = 0, Ge = [], zd = 1e3 / 60;
  mt = function(e) {
    if (Ge.length === 0) {
      var t = Yd(), r = Math.max(0, zd - (t - ba));
      ba = r + t, setTimeout(function() {
        var n = Ge.slice(0);
        Ge.length = 0;
        for (var a = 0; a < n.length; a++)
          if (!n[a].cancelled)
            try {
              n[a].callback(ba);
            } catch (s) {
              setTimeout(function() {
                throw s;
              }, 0);
            }
      }, Math.round(r));
    }
    return Ge.push({
      handle: ++Es,
      callback: e,
      cancelled: !1
    }), Es;
  }, or = function(e) {
    for (var t = 0; t < Ge.length; t++)
      Ge[t].handle === e && (Ge[t].cancelled = !0);
  };
}
Ar.exports = function(e) {
  return mt.call(Te, e);
};
Ar.exports.cancel = function() {
  or.apply(Te, arguments);
};
Ar.exports.polyfill = function(e) {
  e || (e = Te), e.requestAnimationFrame = mt, e.cancelAnimationFrame = or;
};
var qd = Ar.exports;
const Er = /* @__PURE__ */ se(qd), Z = (e, t) => ({
  validator: (r) => !!t.includes(r)
}), Ud = ["fixed", "fixed-last", "reveal", "overlap", "flexible"], sl = {
  props: {
    mdMode: {
      type: String,
      ...Z("md-mode", Ud)
    },
    mdWaterfall: Boolean,
    mdScrollbar: {
      type: Boolean,
      default: !0
    }
  },
  data: () => ({
    revealTimer: null,
    revealLastPos: 0,
    manualTick: !1,
    MdApp: {
      options: {
        mode: null,
        waterfall: !1,
        flexible: !1
      },
      toolbar: {
        element: null,
        titleElement: null,
        height: "0px",
        initialHeight: 0,
        top: 0,
        titleSize: 20,
        hasElevation: !0,
        revealActive: !1,
        fixedLastActive: !1,
        fixedLastHeight: !1,
        overlapOff: !1
      },
      drawer: {
        initialWidth: 0,
        active: !1,
        mode: "temporary",
        submode: null,
        width: 0,
        right: !1
      }
    }
  }),
  provide() {
    return {
      MdApp: this.MdApp
    };
  },
  computed: {
    isFixed() {
      return this.mdMode && this.mdMode !== "fixed";
    },
    isDrawerMini() {
      return this.MdApp.drawer.mode === "persistent" && this.MdApp.drawer.submode === "mini";
    },
    contentPadding() {
      return this.MdApp.drawer, this.MdApp.drawer.active && this.MdApp.drawer.mode === "persistent" && this.MdApp.drawer.submode === "full" ? this.MdApp.drawer.width : 0;
    },
    contentStyles() {
      return {
        [`padding-${this.MdApp.drawer.right ? "right" : "left"}`]: this.contentPadding
      };
    },
    containerStyles() {
      let e = {};
      return this.isFixed && (e["margin-top"] = this.MdApp.toolbar.initialHeight + "px"), this.isDrawerMini && (e[`padding-${this.MdApp.drawer.right ? "right" : "left"}`] = this.MdApp.drawer.active ? 0 : this.MdApp.drawer.initialWidth + "px"), e;
    },
    scrollerClasses() {
      if (this.mdScrollbar)
        return "md-scrollbar";
    },
    appClasses() {
      return {
        "md-waterfall": this.mdWaterfall,
        "md-flexible": this.mdMode === "flexible",
        "md-fixed": this.mdMode === "fixed",
        "md-fixed-last": this.mdMode === "fixed-last",
        "md-reveal": this.mdMode === "reveal",
        "md-overlap": this.mdMode === "overlap",
        "md-drawer-active": this.MdApp.drawer.active
      };
    }
  },
  watch: {
    mdMode(e) {
      this.MdApp.options.mode = e;
    },
    mdWaterfall(e) {
      this.MdApp.options.waterfall = e, this.setToolbarElevation();
    }
  },
  methods: {
    setToolbarElevation() {
      this.MdApp.toolbar.hasElevation = !this.mdWaterfall;
    },
    setToolbarTimer(e) {
      window.clearTimeout(this.revealTimer), this.revealTimer = window.setTimeout(() => {
        this.revealLastPos = e;
      }, 100);
    },
    setToolbarMarginAndHeight(e, t) {
      this.MdApp.toolbar.top = e, this.MdApp.toolbar.height = t;
    },
    getToolbarConstrants(e) {
      if (!this.MdApp.toolbar.element)
        return {
          toolbarHeight: 0,
          safeAmount: 10,
          threshold: 10,
          scrollTop: e.target.scrollTop,
          initialHeight: 0
        };
      const t = this.MdApp.toolbar.element.offsetHeight, r = 10, n = t + r, a = e.target.scrollTop;
      return this.MdApp.toolbar.initialHeight || (this.MdApp.toolbar.initialHeight = t), {
        toolbarHeight: t,
        safeAmount: r,
        threshold: n,
        scrollTop: a,
        initialHeight: this.MdApp.toolbar.initialHeight
      };
    },
    handleWaterfallScroll(e) {
      let { threshold: t, scrollTop: r } = this.getToolbarConstrants(e), n = 4;
      this.mdMode === "reveal" && (n = t), this.MdApp.toolbar.hasElevation = r >= n;
    },
    handleFlexibleMode(e) {
      let { scrollTop: t, initialHeight: r } = this.getToolbarConstrants(e);
      const n = this.MdApp.toolbar.element, a = n.querySelector(".md-toolbar-row:first-child");
      if (!n)
        return;
      const s = a.offsetHeight, i = r - t, o = t < r - s;
      s && (o ? n.style.height = i + "px" : n.style.height = s + "px");
      const l = this.MdApp.toolbar.titleElement;
      if (l) {
        const m = this.MdApp.toolbar.titleSize;
        if (o) {
          const g = Math.max(
            0,
            1 - (t - m) / (i + m + 1e-6)
          ) * (m - 20) + 20;
          l.style.fontSize = g + "px";
        } else
          l.style.fontSize = "20px";
      }
      let { threshold: d, toolbarHeight: u } = this.getToolbarConstrants(e);
      this.setToolbarMarginAndHeight(t - d, u);
    },
    handleRevealMode(e) {
      const { toolbarHeight: t, safeAmount: r, threshold: n, scrollTop: a } = this.getToolbarConstrants(e);
      this.setToolbarTimer(a), this.setToolbarMarginAndHeight(a - n, t), a >= n ? this.MdApp.toolbar.revealActive = this.revealLastPos > a + r : this.MdApp.toolbar.revealActive = !0;
    },
    handleFixedLastMode(e) {
      let { scrollTop: t, toolbarHeight: r, safeAmount: n } = this.getToolbarConstrants(e);
      const a = this.MdApp.toolbar.element, i = a.querySelector(".md-toolbar-row:first-child").offsetHeight;
      a && (this.setToolbarTimer(t), this.setToolbarMarginAndHeight(t - i, r), this.MdApp.toolbar.fixedLastHeight = i, t >= i ? this.MdApp.toolbar.fixedLastActive = this.revealLastPos > t + n : this.MdApp.toolbar.fixedLastActive = !0);
    },
    handleOverlapMode(e) {
      const { toolbarHeight: t, scrollTop: r, initialHeight: n } = this.getToolbarConstrants(e), a = this.MdApp.toolbar.element, i = a.querySelector(".md-toolbar-row:first-child").offsetHeight;
      if (!a)
        return;
      const o = n - r - r * 100 / (n - i - i / 1.5);
      i && (r < n - i && o >= i ? (this.MdApp.toolbar.overlapOff = !1, a.style.height = o + "px") : (this.MdApp.toolbar.overlapOff = !0, a.style.height = i + "px")), this.setToolbarMarginAndHeight(r, t);
    },
    handleModeScroll(e) {
      this.mdMode === "reveal" ? this.handleRevealMode(e) : this.mdMode === "fixed-last" ? this.handleFixedLastMode(e) : this.mdMode === "overlap" ? this.handleOverlapMode(e) : this.mdMode === "flexible" && this.handleFlexibleMode(e);
    },
    handleScroll(e) {
      this.MdApp.toolbar.element && Er(() => {
        this.mdWaterfall && this.handleWaterfallScroll(e), this.mdMode && this.handleModeScroll(e);
      });
    }
  },
  created() {
    this.MdApp.options.mode = this.mdMode, this.MdApp.options.waterfall = this.mdWaterfall, this.setToolbarElevation();
  },
  mounted() {
    const e = {
      target: {
        scrollTop: 0
      }
    };
    this.mdMode === "reveal" && (this.MdApp.toolbar.revealActive = !0, this.handleRevealMode(e)), this.mdMode === "flexible" && (this.MdApp.toolbar.revealActive = !0, this.handleFlexibleMode(e)), this.mdMode === "fixed-last" && (this.MdApp.toolbar.fixedLastActive = !0, this.handleFixedLastMode(e)), this.mdMode === "overlap" && this.handleOverlapMode(e);
  }
};
const C = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, a] of t)
    r[n] = a;
  return r;
}, jd = new W({
  name: "MdAppSideDrawer",
  mixins: [sl]
});
function Vd(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-app md-app-side-drawer md-layout-row", [e.appClasses, e.$mdActiveTheme]])
  }, [
    P(e.$slots, "md-app-drawer-left"),
    P(e.$slots, "md-app-drawer-right-previous"),
    x("main", {
      class: O(["md-app-container md-flex md-layout-column", [e.$mdActiveTheme, e.scrollerClasses]]),
      style: J(e.contentStyles),
      onScrollPassive: t[1] || (t[1] = (...i) => e.handleScroll && e.handleScroll(...i))
    }, [
      P(e.$slots, "md-app-toolbar"),
      x("div", {
        class: O(["md-app-scroller md-layout-column md-flex", [e.$mdActiveTheme, e.scrollerClasses]]),
        style: J(e.containerStyles),
        onScrollPassive: t[0] || (t[0] = (...i) => e.handleScroll && e.handleScroll(...i))
      }, [
        P(e.$slots, "md-app-content")
      ], 38)
    ], 38),
    P(e.$slots, "md-app-drawer-right")
  ], 2);
}
const Qd = /* @__PURE__ */ C(jd, [["render", Vd]]);
const Xd = new W({
  name: "MdAppInternalDrawer",
  mixins: [sl]
});
function Gd(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-app md-app-internal-drawer md-layout-column", [e.appClasses, e.$mdActiveTheme]])
  }, [
    P(e.$slots, "md-app-toolbar"),
    x("main", {
      class: O(["md-app-container md-flex md-layout-row", [e.$mdActiveTheme, e.scrollerClasses]]),
      style: J([e.containerStyles, e.contentStyles])
    }, [
      P(e.$slots, "md-app-drawer-left"),
      P(e.$slots, "md-app-drawer-right-previous"),
      x("div", {
        class: O(["md-app-scroller md-layout-column md-flex", [e.$mdActiveTheme, e.scrollerClasses]])
      }, [
        P(e.$slots, "md-app-content")
      ], 2),
      P(e.$slots, "md-app-drawer-right")
    ], 6)
  ], 2);
}
const Kd = /* @__PURE__ */ C(Xd, [["render", Gd]]), Jd = new W({
  name: "MdDrawerRightPrevious",
  props: {
    mdPermanent: {
      type: String,
      ...Z("md-permanent", ["full", "clipped", "card"])
    },
    mdPersistent: {
      type: String,
      ...Z("md-persistent", ["mini", "full"])
    },
    mdActive: Boolean,
    mdFixed: Boolean
  },
  computed: {
    drawerClasses() {
      let e = {
        "md-temporary": this.isTemporary,
        "md-persistent": this.mdPersistent,
        "md-permanent": this.mdPermanent,
        "md-active": this.mdActive,
        "md-fixed": this.mdFixed
      };
      return this.mdPermanent && (e["md-permanent-" + this.mdPermanent] = !0), this.mdPersistent && (e["md-persistent-" + this.mdPersistent] = !0), e;
    },
    isTemporary() {
      return !this.mdPermanent && !this.mdPersistent;
    }
  }
});
function Zd(e, t, r, n, a, s) {
  return yt((f(), w("div", {
    class: O(["md-drawer md-right-previous", e.drawerClasses])
  }, null, 2)), [
    [rs, !1]
  ]);
}
const eu = /* @__PURE__ */ C(Jd, [["render", Zd]]);
const il = ["md-app-toolbar", "md-app-drawer", "md-app-content"];
function as(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function tu(e) {
  if (!e || !e.type)
    return !1;
  const t = e.type.name || e.type.__name || "";
  return il.includes(as(t));
}
function ru(e) {
  return e ? e.mdRight === "" || !!e.mdRight : !1;
}
function au(e, t) {
  return e && il.includes(e.slot) || tu(t);
}
function nu(e) {
  return JSON.stringify({
    persistent: e && e["md-persistent"],
    permanent: e && e["md-permanent"]
  });
}
function su(e, t, r, n, a) {
  let s = [], i = !1;
  return e && e.forEach((o) => {
    var u;
    const l = o.data || {}, d = o.props || {};
    if (au(l, o)) {
      const c = l.slot || as(((u = o.type) == null ? void 0 : u.name) || "");
      if (o.data = o.data || {}, o.data.slot = c, c === "md-app-drawer") {
        const m = ru(d);
        if (i) {
          console.warn(
            "There shouldn't be more than one drawer in a MdApp at one time."
          );
          return;
        }
        if (i = !0, o.data.slot += `-${m ? "right" : "left"}`, o.key = nu(l.attrs || {}), m) {
          const g = xe(eu, {
            ...d
          });
          g.data = g.data || {}, g.data.slot = "md-app-drawer-right-previous", s.push(g);
        }
      }
      s.push(o);
    }
  }), s;
}
function iu(e) {
  const t = e.filter((r) => {
    var a, s;
    const n = ((a = r.data) == null ? void 0 : a.slot) || as(((s = r.type) == null ? void 0 : s.name) || "");
    return ["md-app-drawer", "md-app-drawer-right", "md-app-drawer-left"].indexOf(
      n
    ) > -1;
  });
  return t.length ? t : [];
}
function ou(e) {
  const t = e && e["md-permanent"];
  return t && (t === "clipped" || t === "card");
}
const Is = {
  name: "MdApp",
  functional: !0,
  render(e, { children: t, data: r }) {
    let n = Qd;
    const a = t ? Array.isArray(t) ? t : [t] : [], s = su(
      a
    );
    iu(s).forEach((l) => {
      l && ou(l.data.attrs) && (n = Kd);
    });
    const o = {};
    return r && r.staticClass && r.staticClass.split(/\s+/).forEach((l) => {
      l.length !== 0 && (o[l] = !0);
    }), xe(
      n,
      {
        ...e,
        class: { ...o, ...r && r.class ? r.class : {} },
        style: {
          ...r && r.staticStyle ? r.staticStyle : {},
          ...r && r.style ? r.style : {}
        }
      },
      s
    );
  }
};
const lu = new W({
  name: "MdToolbar",
  props: {
    mdElevation: {
      type: [String, Number],
      default: 4
    }
  }
});
function du(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-toolbar", [e.$mdActiveTheme, `md-elevation-${e.mdElevation}`]])
  }, [
    P(e.$slots, "default")
  ], 2);
}
const $r = /* @__PURE__ */ C(lu, [["render", du]]);
const uu = {
  name: "MdAppToolbar",
  components: {
    MdToolbar: $r
  },
  inject: ["MdApp"],
  computed: {
    toolbarClasses() {
      return {
        "md-no-elevation": !this.MdApp.toolbar.hasElevation,
        "md-reveal-active": this.MdApp.toolbar.revealActive,
        "md-fixed-last-active": this.MdApp.toolbar.fixedLastActive,
        "md-overlap-off": this.MdApp.toolbar.overlapOff
      };
    },
    toolbarStyles() {
      let e = {
        top: `${this.MdApp.toolbar.top}px`
      };
      return this.MdApp.toolbar.fixedLastActive && (e.transform = `translate3D(0, ${this.MdApp.toolbar.fixedLastHeight}px, 0)`), e;
    }
  },
  mounted() {
    const e = this.$el.querySelector(
      ".md-title, .md-display-1, .md-display-2"
    );
    this.MdApp.toolbar.element = this.$el, this.MdApp.toolbar.titleElement = e, e && (this.MdApp.toolbar.titleSize = parseInt(
      window.getComputedStyle(e).fontSize,
      10
    ));
  }
};
function cu(e, t, r, n, a, s) {
  const i = b("md-toolbar");
  return f(), D(i, ee({ class: "md-app-toolbar" }, e.$attrs, _e(e.$listeners), {
    class: s.toolbarClasses,
    style: s.toolbarStyles
  }), {
    default: y(() => [
      P(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["class", "style"]);
}
const Ls = /* @__PURE__ */ C(uu, [["render", cu]]);
const fu = new W({
  name: "MdCard",
  props: {
    mdWithHover: Boolean
  },
  data: () => ({
    MdCard: {
      expand: !1
    }
  }),
  provide() {
    return {
      MdCard: this.MdCard
    };
  },
  computed: {
    cardClasses() {
      return {
        "md-with-hover": this.mdWithHover,
        "md-expand-active": this.MdCard.expand
      };
    }
  }
});
function mu(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-card", [e.$mdActiveTheme, e.cardClasses]])
  }, [
    P(e.$slots, "default")
  ], 2);
}
const Wa = /* @__PURE__ */ C(fu, [["render", mu]]), ht = new W({
  name: "MdContent",
  props: {
    mdTag: {
      type: String,
      default: "div"
    }
  },
  render() {
    return xe(this.mdTag, {
      class: [this.$mdActiveTheme, "md-content"],
      attrs: this.$attrs
      //on: this.$listeners
    }, this.$slots.default());
  }
});
const hu = {
  name: "MdAppContent",
  components: {
    MdCard: Wa,
    MdContent: ht
  },
  inject: ["MdApp"],
  computed: {
    showCard() {
      return this.MdApp.options && this.MdApp.options.mode === "overlap";
    }
  }
};
function pu(e, t, r, n, a, s) {
  const i = b("md-card"), o = b("md-content");
  return s.showCard ? (f(), D(i, ee({
    key: 0,
    class: "md-app-content md-flex"
  }, e.$attrs, _e(e.$listeners)), {
    default: y(() => [
      P(e.$slots, "default")
    ]),
    _: 3
  }, 16)) : (f(), D(o, ee({
    key: 1,
    class: "md-app-content md-flex"
  }, e.$attrs, _e(e.$listeners)), {
    default: y(() => [
      P(e.$slots, "default")
    ]),
    _: 3
  }, 16));
}
const Rs = /* @__PURE__ */ C(hu, [["render", pu]]), Ir = {
  name: "MdPortal",
  abstract: !0,
  emits: ["md-destroy", "md-initial-parent"],
  props: {
    mdAttachToParent: Boolean,
    mdTarget: {
      type: null,
      validator(e) {
        return HTMLElement && e && e instanceof HTMLElement ? !0 : (console.log("The md-target-el prop is invalid. You should pass a valid HTMLElement."), !1);
      }
    }
  },
  data: () => ({
    leaveTimeout: null,
    originalParentEl: null
  }),
  computed: {
    transitionName() {
      return this.$attrs["transition-prefix"] ? this.$attrs["transition-prefix"] : "v";
    },
    leaveClass() {
      return this.transitionName + "-leave-from";
    },
    leaveActiveClass() {
      return this.transitionName + "-leave-active";
    },
    leaveToClass() {
      return this.transitionName + "-leave-to";
    }
  },
  watch: {
    mdTarget(e, t) {
      this.changeParentEl(e), t && this.$forceUpdate();
    }
  },
  methods: {
    getTransitionDuration(e) {
      const t = window.getComputedStyle(e).transitionDuration, r = parseFloat(t, 10);
      let n = t.match(/m?s/);
      return n && (n = n[0]), n === "s" ? r * 1e3 : n === "ms" ? r : 0;
    },
    killGhostElement(e) {
      e.parentNode && (this.changeParentEl(this.originalParentEl), this.$options._parentElm = this.originalParentEl, e.parentNode.removeChild(e));
    },
    initDestroy(e) {
      let t = this.$el;
      e && this.$el.nodeType === Node.COMMENT_NODE && (t = this.$vnode.elm), t.classList.add(this.leaveClass), t.classList.add(this.leaveActiveClass), this.$nextTick().then(() => {
        t.classList.add(this.leaveToClass), clearTimeout(this.leaveTimeout), this.leaveTimeout = setTimeout(() => {
          this.destroyElement(t);
        }, this.getTransitionDuration(t));
      });
    },
    destroyElement(e) {
      window.requestAnimationFrame(() => {
        e.classList.remove(this.leaveClass), e.classList.remove(this.leaveActiveClass), e.classList.remove(this.leaveToClass), this.$emit("md-destroy"), this.killGhostElement(e);
      });
    },
    changeParentEl(e) {
      e && e.appendChild(this.$el);
    }
  },
  mounted() {
    this.originalParentEl || (this.originalParentEl = this.$el.parentNode, this.$emit("md-initial-parent", this.$el.parentNode)), this.mdAttachToParent && this.$el.parentNode.parentNode ? this.changeParentEl(this.$el.parentNode.parentNode) : document && this.changeParentEl(this.mdTarget || document.body);
  },
  beforeUnmount() {
    if (this.$el.classList)
      this.initDestroy();
    else {
      var e = this;
      this.$nextTick(function() {
        e.killGhostElement(e.$el);
      });
    }
  },
  render() {
    const e = this.$slots.default();
    if (e && e[0])
      return e[0];
  }
};
const vu = {
  name: "MdOverlay",
  components: {
    MdPortal: Ir
  },
  props: {
    mdTarget: {
      type: null,
      default: null
    },
    mdActive: Boolean,
    mdAttachToParent: Boolean,
    mdFixed: Boolean
  },
  computed: {
    overlayClasses() {
      return {
        "md-fixed": this.mdFixed
      };
    },
    style() {
      if (this.mdTarget)
        return {
          top: this.mdTarget.scrollTop - 100 + "px"
        };
    }
  }
};
function gu(e, t, r, n, a, s) {
  const i = b("md-portal");
  return f(), D(i, {
    "md-attach-to-parent": r.mdAttachToParent,
    mdTarget: r.mdTarget,
    "transition-prefix": "md-overlay"
  }, {
    default: y(() => [
      r.mdActive ? (f(), w("div", {
        key: 0,
        class: O(["md-overlay", s.overlayClasses]),
        style: J(s.style ? s.style : !1)
      }, null, 6)) : N("", !0)
    ]),
    _: 1
  }, 8, ["md-attach-to-parent", "mdTarget"]);
}
const ns = /* @__PURE__ */ C(vu, [["render", gu]]), ol = {
  props: {
    mdSwipeable: Boolean,
    mdSwipeThreshold: {
      type: Number,
      default: 150
    },
    mdSwipeRestraint: {
      type: Number,
      default: 100
    },
    mdSwipeTime: {
      type: Number,
      default: 300
    }
  },
  data: () => ({
    swipeStart: !1,
    swipeStartTime: null,
    swiped: null,
    touchPosition: {
      startX: 0,
      startY: 0
    }
  }),
  computed: {
    getSwipeElement() {
      return this.mdSwipeElement || window;
    }
  },
  methods: {
    handleTouchStart(e) {
      this.touchPosition.startX = e.touches[0].screenX, this.touchPosition.startY = e.touches[0].screenY, this.swipeStartTime = /* @__PURE__ */ new Date(), this.swipeStart = !0;
    },
    /* eslint-disable complexity */
    handleTouchMove(e) {
      if (this.swipeStart) {
        const t = e.touches[0].screenX, r = e.touches[0].screenY, n = t - this.touchPosition.startX, a = r - this.touchPosition.startY;
        /* @__PURE__ */ new Date() - this.swipeStartTime <= this.mdSwipeTime && (Math.abs(n) >= this.mdSwipeThreshold && Math.abs(a) <= this.mdSwipeRestraint ? this.swiped = n < 0 ? "left" : "right" : Math.abs(a) >= this.mdSwipeThreshold && Math.abs(n) <= this.mdSwipeRestraint && (this.swiped = a < 0 ? "up" : "down"));
      }
    },
    /* eslint-enable complexity */
    handleTouchEnd() {
      this.touchPosition = {
        startX: 0,
        startY: 0
      }, this.swiped = null, this.swipeStart = !1;
    }
  },
  mounted() {
    this.mdSwipeable && (this.getSwipeElement.addEventListener("touchstart", this.handleTouchStart, !1), this.getSwipeElement.addEventListener("touchend", this.handleTouchEnd, !1), this.getSwipeElement.addEventListener("touchmove", this.handleTouchMove, !1));
  },
  beforeUnmount() {
    this.mdSwipeable && (this.getSwipeElement.removeEventListener("touchstart", this.handleTouchStart, !1), this.getSwipeElement.removeEventListener("touchend", this.handleTouchEnd, !1), this.getSwipeElement.removeEventListener("touchmove", this.handleTouchMove, !1));
  }
};
const _u = new W({
  name: "MdDrawer",
  mixins: [ol],
  components: {
    MdOverlay: ns
  },
  props: {
    mdRight: Boolean,
    mdPermanent: {
      type: String,
      ...Z("md-permanent", ["full", "clipped", "card"])
    },
    mdPersistent: {
      type: String,
      ...Z("md-persistent", ["mini", "full"])
    },
    mdActive: Boolean,
    mdFixed: Boolean
  },
  watch: {
    mdActive(e) {
      e ? this.$emit("md-opened") : this.$emit("md-closed");
    },
    swiped(e) {
      (e === "right" || e === "left") && this.$emit("update:mdActive", e === "right");
    }
  },
  computed: {
    drawerClasses() {
      let e = {
        "md-left": !this.mdRight,
        "md-right": this.mdRight,
        "md-temporary": this.isTemporary,
        "md-persistent": this.mdPersistent,
        "md-permanent": this.mdPermanent,
        "md-active": this.mdActive,
        "md-fixed": this.mdFixed
      };
      return this.mdPermanent && (e["md-permanent-" + this.mdPermanent] = !0), this.mdPersistent && (e["md-persistent-" + this.mdPersistent] = !0), e;
    },
    isTemporary() {
      return !this.mdPermanent && !this.mdPersistent;
    },
    mode() {
      return this.mdPersistent ? "persistent" : this.mdPermanent ? "permanent" : "temporary";
    },
    submode() {
      if (this.mdPersistent)
        return this.mdPersistent;
      if (this.mdPermanent)
        return this.mdPermanent;
    },
    mdSwipeElement() {
      return this.$el.parentNode;
    }
  },
  methods: {
    closeDrawer() {
      this.$emit("update:mdActive", !1);
    }
  }
});
function yu(e, t, r, n, a, s) {
  const i = b("md-overlay");
  return f(), w("div", {
    class: O(["md-drawer", [e.$mdActiveTheme, e.drawerClasses]])
  }, [
    P(e.$slots, "default"),
    e.mdFixed ? (f(), D(i, {
      key: 0,
      "md-active": e.mdActive,
      onClick: e.closeDrawer
    }, null, 8, ["md-active", "onClick"])) : (f(), D(i, {
      key: 1,
      "md-active": e.mdActive,
      onClick: e.closeDrawer,
      "md-attach-to-parent": ""
    }, null, 8, ["md-active", "onClick"]))
  ], 2);
}
const Ya = /* @__PURE__ */ C(_u, [["render", yu]]), bu = {
  name: "MdAppDrawer",
  components: {
    MdDrawer: Ya
  },
  inject: ["MdApp"],
  data: () => ({
    drawerElement: {
      mdActive: null,
      mode: null,
      submode: null
    },
    initialized: !1
  }),
  props: {
    mdRight: {
      type: Boolean,
      default: !1
    },
    mdActive: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    visible() {
      return this.drawerElement.mdActive;
    },
    mode() {
      return this.drawerElement.mode;
    },
    submode() {
      return this.drawerElement.submode;
    }
  },
  watch: {
    visible(e) {
      this.MdApp.drawer.width = this.getDrawerWidth(), this.MdApp.drawer.active = e;
    },
    mode(e) {
      this.MdApp.drawer.mode = e;
    },
    submode(e) {
      this.MdApp.drawer.submode = e;
    },
    mdRight(e) {
      this.MdApp.drawer.right = e;
    }
  },
  methods: {
    getDrawerWidth() {
      return this.$el ? window.getComputedStyle(this.$el).width : 0;
    },
    updateDrawerData() {
      this.MdApp.drawer.width = this.getDrawerWidth(), this.MdApp.drawer.active = this.visible, this.MdApp.drawer.mode = this.mode, this.MdApp.drawer.submode = this.submode, this.MdApp.drawer.right = this.mdRight;
    },
    clearDrawerData() {
      this.MdApp.drawer.width = 0, this.MdApp.drawer.active = !1, this.MdApp.drawer.mode = "temporary", this.MdApp.drawer.submode = null, this.MdApp.drawer.initialWidth = 0;
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.MdApp.drawer.initialWidth = this.$el.offsetWidth, this.drawerElement = this.$refs.drawer, this.updateDrawerData(), this.initialized = !0;
    });
  },
  updated() {
    this.drawerElement = this.$refs.drawer;
  },
  beforeUnmount() {
    this.clearDrawerData();
  }
};
function Mu(e, t, r, n, a, s) {
  const i = b("md-drawer");
  return f(), D(i, ee({
    class: "md-app-drawer",
    "md-active": r.mdActive && e.initialized
  }, e.$attrs, _e(e.$listeners), {
    "md-right": r.mdRight,
    ref: "drawer"
  }), {
    default: y(() => [
      P(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["md-active", "md-right"]);
}
const Ns = /* @__PURE__ */ C(bu, [["render", Mu]]), wu = (e) => {
  Q(e), e.component(Is.name, Is), e.component(Ls.name, Ls), e.component(Rs.name, Rs), e.component(Ns.name, Ns);
};
const $u = new W({
  name: "MdAvatar"
});
function Tu(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-avatar", [e.$mdActiveTheme]])
  }, [
    P(e.$slots, "default")
  ], 2);
}
const Hs = /* @__PURE__ */ C($u, [["render", Tu]]), Cu = (e) => {
  Q(e), e.component(Hs.name, Hs);
};
const xu = new W({
  name: "MdBadgeStandalone"
});
function Pu(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-badge", [e.$mdActiveTheme]])
  }, [
    P(e.$slots, "default")
  ], 2);
}
const Su = /* @__PURE__ */ C(xu, [["render", Pu]]);
const Du = new W({
  setup() {
    return {
      instance: Ko()
    };
  },
  name: "MdBadge",
  components: {
    MdBadgeStandalone: Su
  },
  props: {
    mdContent: [String, Number],
    mdPosition: {
      type: String,
      default: "top",
      ...Z("md-position", [
        "top",
        "bottom"
      ])
    },
    mdDense: Boolean
  },
  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    badgeClasses() {
      const e = this.getStaticClass(), t = this.instance.attrs.class;
      return {
        ["md-position-" + this.mdPosition]: !0,
        "md-dense": this.mdDense,
        ...e,
        ...t
      };
    },
    styles() {
      const e = this.instance.attrs.staticStyle, t = this.instance.attrs.style;
      return {
        ...e,
        ...t
      };
    }
  },
  methods: {
    getStaticClass() {
      const e = this.instance.attrs.class;
      function t() {
        return e.split(" ").filter((r) => r).reduce((r, n) => (r[n] = !0, r), {});
      }
      return e ? t() : {};
    }
  }
}), ku = {
  key: 0,
  class: "md-badge-content"
};
function Ou(e, t, r, n, a, s) {
  const i = b("md-badge-standalone");
  return e.hasDefaultSlot ? (f(), w("div", ku, [
    P(e.$slots, "default"),
    k(i, {
      class: O(e.badgeClasses),
      style: J(e.styles)
    }, {
      default: y(() => [
        x("div", null, R(e.mdContent), 1)
      ]),
      _: 1
    }, 8, ["class", "style"])
  ])) : (f(), D(i, {
    key: 1,
    class: O(e.badgeClasses),
    style: J(e.styles)
  }, {
    default: y(() => [
      te(R(e.mdContent), 1)
    ]),
    _: 1
  }, 8, ["class", "style"]));
}
const Fs = /* @__PURE__ */ C(Du, [["render", Ou]]), Au = (e) => {
  Q(e), e.component(Fs.name, Fs);
};
let Bs = !1, pt = null, ll = !1, ss = {
  currentElement: null
};
function Eu() {
  try {
    var e = Object.defineProperty({}, "passive", {
      get() {
        ll = { passive: !0 };
      }
    });
    window.addEventListener("ghost", null, e);
  } catch {
  }
}
function Iu({ keyCode: e, target: t }) {
  ss.currentElement = t;
}
function Tr(e) {
  ss.currentElement = null;
}
function Lu() {
  pt.addEventListener("keyup", Iu);
}
function Ru() {
  pt.addEventListener("pointerup", Tr);
}
function Nu() {
  pt.addEventListener("MSPointerUp", Tr);
}
function Hu() {
  pt.addEventListener("mouseup", Tr), "ontouchend" in window && pt.addEventListener("touchend", Tr, ll);
}
function Fu() {
  window.PointerEvent ? Ru() : window.MSPointerEvent ? Nu() : Hu(), Lu();
}
function Bu() {
  Bs || (pt = document.body, Eu(), Fu(), Bs = !0);
}
const Wu = {
  data: () => ({
    mdHasFocus: !1
  }),
  computed: {
    focusedElement() {
      return ss.currentElement;
    }
  },
  watch: {
    focusedElement(e) {
      this.mdHasFocus = e === this.$el;
    }
  },
  mounted() {
    Bu();
  }
}, Je = () => Math.random().toString(36).slice(4);
const Yu = new W({
  name: "MdWave",
  data() {
    return {
      animating: !1
    };
  },
  props: {
    waveClasses: null,
    waveStyles: null
  },
  mounted: function() {
    this.animating = !0;
  },
  methods: {
    end() {
      this.animating = !1, this.$emit("md-end");
    }
  }
}), zu = { key: 0 };
function qu(e, t, r, n, a, s) {
  return f(), D(ue, {
    name: "md-ripple",
    onAfterEnter: e.end,
    appear: ""
  }, {
    default: y(() => [
      e.animating ? (f(), w("span", zu)) : N("", !0)
    ]),
    _: 1
  }, 8, ["onAfterEnter"]);
}
const za = /* @__PURE__ */ C(Yu, [["render", qu]]);
const Uu = new W({
  name: "MdRipple",
  components: {
    MdWave: za
  },
  props: {
    mdActive: null,
    mdDisabled: Boolean,
    mdCentered: Boolean,
    mdEventTrigger: {
      type: Boolean,
      default: !0
    }
  },
  data: () => ({
    ripples: [],
    touchTimeout: null,
    eventType: null
  }),
  computed: {
    isDisabled() {
      return this.mdDisabled;
    },
    rippleClasses() {
      return {
        "md-disabled": this.isDisabled
      };
    },
    waveClasses() {
      return {
        "md-centered": this.mdCentered
      };
    }
  },
  watch: {
    mdActive(e) {
      const t = typeof e == "boolean", r = e instanceof MouseEvent;
      t && this.mdCentered && e ? this.startRipple({
        type: "mousedown"
      }) : r && this.startRipple(e), this.$emit("update:mdActive", !1);
    }
  },
  methods: {
    touchMoveCheck() {
      window.clearTimeout(this.touchTimeout);
    },
    touchStartCheck(e) {
      this.touchTimeout = window.setTimeout(() => {
        this.startRipple(e);
      }, 100);
    },
    startRipple(e) {
      window.requestAnimationFrame(() => {
        const { eventType: t, isDisabled: r, mdCentered: n } = this;
        if (!r && (!t || t === e.type)) {
          let a = this.getSize(), s = null;
          n ? s = this.getCenteredPosition(a) : s = this.getHitPosition(e, a), this.eventType = e.type, this.ripples.push({
            waveStyles: this.applyStyles(s, a),
            uuid: Je()
          });
        }
      });
    },
    applyStyles(e, t) {
      return t += "px", {
        ...e,
        width: t,
        height: t
      };
    },
    clearWave(e) {
      e ? this.ripples = this.ripples.filter((t) => t.uuid !== e) : this.ripples = [];
    },
    getSize() {
      const { offsetWidth: e, offsetHeight: t } = this.$el;
      return Math.round(Math.max(e, t));
    },
    getCenteredPosition(e) {
      const t = -e / 2 + "px";
      return {
        "margin-top": t,
        "margin-left": t
      };
    },
    getHitPosition(e, t) {
      const r = this.$el.getBoundingClientRect();
      let n = e.pageY, a = e.pageX;
      return e.type === "touchstart" && (n = e.changedTouches[0].pageY, a = e.changedTouches[0].pageX), {
        top: n - r.top - t / 2 - document.documentElement.scrollTop + "px",
        left: a - r.left - t / 2 - document.documentElement.scrollLeft + "px"
      };
    }
  }
});
function ju(e, t, r, n, a, s) {
  const i = b("md-wave");
  return f(), w("div", {
    class: O(["md-ripple", e.rippleClasses]),
    onTouchstartPassive: t[0] || (t[0] = (o) => e.mdEventTrigger && e.touchStartCheck(o)),
    onTouchmovePassive: t[1] || (t[1] = (o) => e.mdEventTrigger && e.touchMoveCheck(o)),
    onMousedownPassive: t[2] || (t[2] = (o) => e.mdEventTrigger && e.startRipple(o))
  }, [
    P(e.$slots, "default"),
    e.isDisabled ? N("", !0) : (f(!0), w(de, { key: 0 }, ge(e.ripples, (o) => (f(), D(i, {
      key: o.uuid,
      class: O(["md-ripple-wave", e.waveClasses]),
      style: J(o.waveStyles),
      onMdEnd: (l) => e.clearWave(o.uuid)
    }, null, 8, ["class", "style", "onMdEnd"]))), 128))
  ], 34);
}
const Ke = /* @__PURE__ */ C(Uu, [["render", ju]]), dl = {
  components: {
    MdRipple: Ke
  },
  props: {
    mdRipple: {
      type: Boolean,
      default: !0
    }
  }
}, ul = {
  props: {
    to: [String, Object],
    replace: Boolean,
    append: Boolean,
    activeClass: String,
    exact: Boolean,
    event: [String, Array],
    exactActiveClass: String
  }
}, is = (e, t) => {
  var n, a, s;
  const r = ((n = e == null ? void 0 : e.$options) == null ? void 0 : n.components.RouterLink) || ((a = e == null ? void 0 : e.$options) == null ? void 0 : a.components["router-link"]);
  return {
    ...t,
    ...(s = r == null ? void 0 : r.options) == null ? void 0 : s.props
  };
};
const Vu = {
  name: "MdButtonContent",
  components: {
    MdRipple: Ke
  },
  props: {
    mdRipple: Boolean,
    mdRippleActive: null,
    disabled: Boolean
  }
}, Qu = { class: "md-button-content" };
function Xu(e, t, r, n, a, s) {
  const i = b("md-ripple");
  return f(), D(i, {
    "md-disabled": !r.mdRipple || r.disabled,
    "md-event-trigger": !1,
    "md-active": r.mdRippleActive,
    "onUpdate:mdActive": t[0] || (t[0] = (o) => e.$emit("update:mdRippleActive", o))
  }, {
    default: y(() => [
      x("div", Qu, [
        P(e.$slots, "default")
      ])
    ]),
    _: 3
  }, 8, ["md-disabled", "md-active"]);
}
const Gu = /* @__PURE__ */ C(Vu, [["render", Xu]]);
const Pe = new W({
  name: "MdButton",
  data() {
    return {
      rippleActive: !1
    };
  },
  components: {
    MdButtonContent: Gu
  },
  mixins: [
    dl,
    Wu,
    ul
  ],
  props: {
    href: String,
    type: {
      type: String,
      default: "button"
    },
    nolink: Boolean,
    disabled: Boolean
  },
  computed: {
    rippleWorks() {
      return this.mdRipple && !this.disabled;
    },
    isRouterLink() {
      return this.to;
    }
  },
  render() {
    var a, s, i, o, l, d;
    const e = b("md-button-content"), t = xe(e, {
      mdRipple: this.mdRipple,
      disabled: this.disabled,
      mdRippleActive: this.rippleActive,
      "onUpdate:MdRippleActive": (u) => this.rippleActive = u
    }, this.$slots.default);
    let r = {
      ...this.$attrs,
      class: [
        "md-button",
        this.$mdActiveTheme,
        {
          "md-ripple-off": !this.mdRipple,
          "md-focused": this.mdHasFocus
        }
      ],
      href: this.href,
      disabled: this.disabled,
      type: !this.href && (this.type || "button"),
      onTouchstart: (u) => {
        this.rippleWorks && (this.rippleActive = u), this.$attrs.touchstart && this.$attrs.touchstart(u);
      },
      onTouchmove: (u) => {
        this.rippleWorks && (this.rippleActive = u), this.$attrs.touchstart && this.$attrs.touchstart(u);
      },
      onMousedown: (u) => {
        this.rippleWorks && (this.rippleActive = u), this.$attrs.onMousedown && this.$attrs.onMousedown(u);
      }
    }, n = "button";
    if (!this.nolink) {
      if (this.href)
        n = "a";
      else if (this.isRouterLink) {
        this.$options.props = is(this, this.$options.props), n = b("router-link");
        const u = this.$props.exactActiveClass, c = `${this.$props.activeClass || ((s = (a = this.$material) == null ? void 0 : a.router) == null ? void 0 : s.linkActiveClass)} md-active`;
        r = {
          ...this.$props,
          exactActiveClass: u,
          activeClass: c
        }, (i = r.props) == null || delete i.type, (o = r.attrs) == null || delete o.type, (l = r.props) == null || delete l.href, (d = r.attrs) == null || delete d.href;
      }
    }
    return xe(n, r, [t]);
  }
}), Ku = (e) => {
  Q(e), e.component(Pe.name, Pe);
};
const Ju = {
  name: "MdCardArea",
  props: {
    mdInset: Boolean
  },
  computed: {
    areaClasses() {
      return {
        "md-inset": this.mdInset
      };
    }
  }
};
function Zu(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-card-area", s.areaClasses])
  }, [
    P(e.$slots, "default")
  ], 2);
}
const Ws = /* @__PURE__ */ C(Ju, [["render", Zu]]);
const ec = {
  name: "MdCardHeader"
}, tc = { class: "md-card-header" };
function rc(e, t, r, n, a, s) {
  return f(), w("div", tc, [
    P(e.$slots, "default")
  ]);
}
const Ys = /* @__PURE__ */ C(ec, [["render", rc]]), ac = {
  name: "MdCardHeaderText",
  data: () => ({
    parentClasses: null
  }),
  mounted() {
    this.parentClasses = this.$parent.$el.classList, this.parentClasses.contains("md-card-header") && this.parentClasses.add("md-card-header-flex");
  },
  beforeUnmount() {
    this.parentClasses.remove("md-card-header-flex");
  }
}, nc = { class: "md-card-header-text" };
function sc(e, t, r, n, a, s) {
  return f(), w("div", nc, [
    P(e.$slots, "default")
  ]);
}
const zs = /* @__PURE__ */ C(ac, [["render", sc]]);
const ic = {
  name: "MdCardMedia",
  props: {
    mdRatio: {
      type: String,
      ...Z("md-ratio", [
        "16-9",
        "16/9",
        "16:9",
        "4-3",
        "4/3",
        "4:3",
        "1-1",
        "1/1",
        "1:1"
      ])
    },
    mdMedium: Boolean,
    mdBig: Boolean
  },
  computed: {
    mediaClasses() {
      let e = {};
      if (this.mdRatio) {
        const t = this.getAspectRatio();
        if (t) {
          const [r, n] = t;
          e[`md-ratio-${r}-${n}`] = !0;
        }
      }
      return (this.mdMedium || this.mdBig) && (e = {
        "md-medium": this.mdMedium,
        "md-big": this.mdBig
      }), e;
    }
  },
  methods: {
    getAspectRatio() {
      let e = [];
      return this.mdRatio.indexOf(":") !== -1 ? e = this.mdRatio.split(":") : this.mdRatio.indexOf("/") !== -1 ? e = this.mdRatio.split("/") : this.mdRatio.indexOf("-") !== -1 && (e = this.mdRatio.split("-")), e.length === 2 ? e : null;
    }
  }
};
function oc(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-card-media", s.mediaClasses])
  }, [
    P(e.$slots, "default")
  ], 2);
}
const qs = /* @__PURE__ */ C(ic, [["render", oc]]);
const lc = {
  name: "MdCardMediaActions"
}, dc = { class: "md-card-media-actions" };
function uc(e, t, r, n, a, s) {
  return f(), w("div", dc, [
    P(e.$slots, "default")
  ]);
}
const Us = /* @__PURE__ */ C(lc, [["render", uc]]);
const cc = {
  name: "MdCardMediaCover",
  props: {
    mdTextScrim: Boolean,
    mdSolid: Boolean
  },
  data: () => ({
    backdropBackground: {}
  }),
  computed: {
    coverClasses() {
      return {
        "md-text-scrim": this.mdTextScrim,
        "md-solid": this.mdSolid
      };
    },
    coverStyles() {
      return {
        background: this.backdropBackground
      };
    }
  },
  methods: {
    applyScrimColor(e) {
      this.$refs.backdrop && (this.backdropBackground = `linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, ${e / 2}) 66%, rgba(0, 0, 0, ${e}) 100%)`);
    },
    applySolidColor(e) {
      let t = this.$el.querySelector(".md-card-area");
      t && (t.style.background = `rgba(0, 0, 0, ${e})`);
    },
    getImageLightness(e, t, r) {
      let n = document.createElement("canvas");
      e.crossOrigin = "Anonymous", e.onload = function() {
        let a = 0, s, i, o, l, d, u, c;
        n.width = this.width, n.height = this.height, s = n.getContext("2d"), s.drawImage(this, 0, 0), i = s.getImageData(0, 0, n.width, n.height), o = i.data;
        for (let m = 0, g = o.length; m < g; m += 4)
          l = o[m], d = o[m + 1], u = o[m + 2], c = Math.floor((l + d + u) / 3), a += c;
        t(Math.floor(a / (this.width * this.height)));
      }, e.onerror = r;
    }
  },
  mounted() {
    const e = (r = 0.6) => {
      this.mdTextScrim ? this.applyScrimColor(r) : this.mdSolid && this.applySolidColor(r);
    };
    let t = this.$el.querySelector("img");
    t && (this.mdTextScrim || this.mdSolid) && this.getImageLightness(t, (r) => {
      let n = 256, a = (Math.abs(n - r) * 100 / n + 15) / 100;
      a >= 0.7 && (a = 0.7), e(a);
    }, e);
  }
};
function fc(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-card-media-cover", s.coverClasses])
  }, [
    P(e.$slots, "default"),
    r.mdTextScrim ? (f(), w("div", {
      key: 0,
      class: "md-card-backdrop",
      style: J(s.coverStyles),
      ref: "backdrop"
    }, null, 4)) : N("", !0)
  ], 2);
}
const js = /* @__PURE__ */ C(cc, [["render", fc]]);
const mc = {
  name: "MdCardContent"
}, hc = { class: "md-card-content" };
function pc(e, t, r, n, a, s) {
  return f(), w("div", hc, [
    P(e.$slots, "default")
  ]);
}
const Vs = /* @__PURE__ */ C(mc, [["render", pc]]);
const vc = {
  name: "MdCardExpand",
  inject: ["MdCard"]
}, gc = { class: "md-card-expand" };
function _c(e, t, r, n, a, s) {
  return f(), w("div", gc, [
    P(e.$slots, "default")
  ]);
}
const Qs = /* @__PURE__ */ C(vc, [["render", _c]]);
const Xs = {
  name: "MdCardExpandTrigger",
  inject: ["MdCard"],
  render(e) {
    const [t] = this.$slots.default, r = " md-card-expand-trigger";
    let n = {
      click: () => {
        this.MdCard.expand = !this.MdCard.expand;
      }
    };
    return t ? (t.componentOptions.listeners = {
      ...t.componentOptions.listeners,
      ...n
    }, t.data.staticClass += r, t) : e("div", {
      staticClass: r,
      on: n
    });
  }
}, os = (e, t, r) => {
  if ("MutationObserver" in window) {
    const n = new window.MutationObserver(r);
    return n.observe(e, t), {
      disconnect: () => {
        n.disconnect();
      }
    };
  }
};
const yc = {
  name: "MdCardExpandContent",
  inject: ["MdCard"],
  data: () => ({
    marginTop: 0,
    resizeObserver: null,
    transitionEnabled: !0
  }),
  computed: {
    expand() {
      return this.MdCard.expand;
    },
    contentStyles() {
      return {
        "margin-top": `-${this.marginTop}px`,
        opacity: this.marginTop === 0 ? 1 : 0,
        "transition-property": this.transitionEnabled ? null : "none"
      };
    }
  },
  methods: {
    calculateMarginTop() {
      this.expand ? this.marginTop = 0 : this.marginTop = this.$el.children[0].offsetHeight;
    },
    calculateMarginTopImmediately() {
      this.expand || (this.transitionEnabled = !1, this.$nextTick(() => {
        this.calculateMarginTop(), this.$nextTick(() => {
          this.$el.offsetHeight, this.transitionEnabled = !0;
        });
      }));
    }
  },
  watch: {
    expand() {
      this.calculateMarginTop();
    }
  },
  mounted() {
    this.calculateMarginTopImmediately(), this.resizeObserver = os(this.$el, {
      childList: !0,
      characterData: !0,
      subtree: !0
    }, this.calculateMarginTopImmediately);
  },
  beforeUnmount() {
    this.resizeObserver.disconnect();
  }
};
function bc(e, t, r, n, a, s) {
  return f(), w("div", {
    class: "md-card-expand-content",
    style: J(s.contentStyles)
  }, [
    P(e.$slots, "default")
  ], 4);
}
const Gs = /* @__PURE__ */ C(yc, [["render", bc]]);
const Mc = ["left", "right", "space-between"], wc = {
  name: "MdCardActions",
  props: {
    mdAlignment: {
      type: String,
      default: "right",
      ...Z("md-alignment", Mc)
    }
  }
};
function $c(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-card-actions", `md-alignment-${r.mdAlignment}`])
  }, [
    P(e.$slots, "default")
  ], 2);
}
const Ks = /* @__PURE__ */ C(wc, [["render", $c]]), Tc = (e) => {
  Q(e), e.component(Wa.name, Wa), e.component(Ws.name, Ws), e.component(Ys.name, Ys), e.component(zs.name, zs), e.component(qs.name, qs), e.component(Us.name, Us), e.component(js.name, js), e.component(Vs.name, Vs), e.component(Qs.name, Qs), e.component(Xs.name, Xs), e.component(Gs.name, Gs), e.component(Ks.name, Ks);
}, Cc = {
  emits: ["update:modelValue"],
  components: {
    MdRipple: Ke
  },
  props: {
    model: [String, Boolean, Object, Number, Array],
    value: {
      type: [String, Boolean, Object, Number]
    },
    name: [String, Number],
    required: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    trueValue: {
      default: !0
    },
    falseValue: {
      default: !1
    },
    modelValue: !1
  },
  model: {
    prop: "model",
    event: "change"
  },
  data: () => ({
    rippleActive: !1,
    innervalue: !1
  }),
  computed: {
    attrs() {
      const e = {
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        "true-value": this.trueValue,
        "false-value": this.falseValue
      };
      return e.modelValue = this.$attrs.modelValue, e;
    },
    checkClasses() {
      return {
        "md-checked": this.innervalue,
        "md-disabled": this.disabled,
        "md-required": this.required,
        "md-indeterminate": this.indeterminate
      };
    }
  },
  watch: {
    modelValue(e) {
      var t = this.innervalue === void 0 ? !1 : this.innervalue, r = e === void 0 ? !1 : e;
      t != r && this.toggleCheck();
    }
  },
  methods: {
    toggleCheck() {
      if (!this.disabled) {
        this.rippleActive = !0, this.innervalue = !this.innervalue, this.$emit("update:modelValue", this.innervalue);
        var e = this;
        this.$nextTick(function() {
          e.innervalue != e.modelValue && (e.innervalue = e.modelValue), e.rippleActive = !1;
        });
      }
    }
  },
  mounted() {
    this.innervalue = this.$attrs.modelValue, this.modelValue && (this.innervalue = !0);
  }
};
const xc = new W({
  name: "MdCheckbox",
  mixins: [Cc],
  props: {
    id: {
      type: String,
      default: () => "md-checkbox-" + Je()
    }
  }
}), Pc = ["id", ".indeterminate"], Sc = ["for"];
function Dc(e, t, r, n, a, s) {
  const i = b("md-ripple");
  return f(), w("div", {
    class: O(["md-checkbox", [e.$mdActiveTheme, e.checkClasses]])
  }, [
    x("div", {
      class: "md-checkbox-container",
      onClick: t[0] || (t[0] = (...o) => e.toggleCheck && e.toggleCheck(...o))
    }, [
      k(i, {
        "md-centered": "",
        mdActive: e.rippleActive,
        "md-disabled": e.disabled
      }, {
        default: y(() => [
          x("input", ee({
            id: e.id,
            type: "checkbox"
          }, e.attrs, { ".indeterminate": e.indeterminate }), null, 48, Pc)
        ]),
        _: 1
      }, 8, ["mdActive", "md-disabled"])
    ]),
    e.$slots.default ? (f(), w("label", {
      key: 0,
      for: e.id,
      class: "md-checkbox-label",
      onClick: t[1] || (t[1] = Md((...o) => e.toggleCheck && e.toggleCheck(...o), ["prevent"]))
    }, [
      P(e.$slots, "default")
    ], 8, Sc)) : N("", !0)
  ], 2);
}
const Cr = /* @__PURE__ */ C(xc, [["render", Dc]]), kc = (e) => {
  Q(e), e.component(Cr.name, Cr);
}, Oc = (e) => {
  Q(e), e.component(ht.name, ht);
};
var qa = { exports: {} }, cl = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(cl);
var S = cl.exports, Ua = { exports: {} }, ja = { exports: {} }, fl = { exports: {} };
(function(e) {
  function t(r) {
    "@babel/helpers - typeof";
    return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
      return typeof n;
    } : function(n) {
      return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(r);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(fl);
var bt = fl.exports, Va = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(n, a) {
    if (a.length < n)
      throw new TypeError(n + " argument" + (n > 1 ? "s" : "") + " required, but only " + a.length + " present");
  }
  e.exports = t.default;
})(Va, Va.exports);
var H = Va.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(bt), a = r(H);
  function s(i) {
    return (0, a.default)(1, arguments), i instanceof Date || (0, n.default)(i) === "object" && Object.prototype.toString.call(i) === "[object Date]";
  }
  e.exports = t.default;
})(ja, ja.exports);
var Ac = ja.exports, Qa = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(bt), a = r(H);
  function s(i) {
    (0, a.default)(1, arguments);
    var o = Object.prototype.toString.call(i);
    return i instanceof Date || (0, n.default)(i) === "object" && o === "[object Date]" ? new Date(i.getTime()) : typeof i == "number" || o === "[object Number]" ? new Date(i) : ((typeof i == "string" || o === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"), console.warn(new Error().stack)), /* @__PURE__ */ new Date(NaN));
  }
  e.exports = t.default;
})(Qa, Qa.exports);
var X = Qa.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i;
  var n = r(Ac), a = r(X), s = r(H);
  function i(o) {
    if ((0, s.default)(1, arguments), !(0, n.default)(o) && typeof o != "number")
      return !1;
    var l = (0, a.default)(o);
    return !isNaN(Number(l));
  }
  e.exports = t.default;
})(Ua, Ua.exports);
var ml = Ua.exports;
const Ma = /* @__PURE__ */ se(ml);
var Xa = { exports: {} }, Ga = { exports: {} }, Ka = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(n) {
    if (n === null || n === !0 || n === !1)
      return NaN;
    var a = Number(n);
    return isNaN(a) ? a : a < 0 ? Math.ceil(a) : Math.floor(a);
  }
  e.exports = t.default;
})(Ka, Ka.exports);
var oe = Ka.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i;
  var n = r(oe), a = r(X), s = r(H);
  function i(o, l) {
    (0, s.default)(2, arguments);
    var d = (0, a.default)(o).getTime(), u = (0, n.default)(l);
    return new Date(d + u);
  }
  e.exports = t.default;
})(Ga, Ga.exports);
var Ec = Ga.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i;
  var n = r(Ec), a = r(H), s = r(oe);
  function i(o, l) {
    (0, a.default)(2, arguments);
    var d = (0, s.default)(l);
    return (0, n.default)(o, -d);
  }
  e.exports = t.default;
})(Xa, Xa.exports);
var hl = Xa.exports, Ja = { exports: {} }, Za = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i;
  var n = r(X), a = r(H), s = 864e5;
  function i(o) {
    (0, a.default)(1, arguments);
    var l = (0, n.default)(o), d = l.getTime();
    l.setUTCMonth(0, 1), l.setUTCHours(0, 0, 0, 0);
    var u = l.getTime(), c = d - u;
    return Math.floor(c / s) + 1;
  }
  e.exports = t.default;
})(Za, Za.exports);
var Ic = Za.exports, en = { exports: {} }, tn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(X), a = r(H);
  function s(i) {
    (0, a.default)(1, arguments);
    var o = 1, l = (0, n.default)(i), d = l.getUTCDay(), u = (d < o ? 7 : 0) + d - o;
    return l.setUTCDate(l.getUTCDate() - u), l.setUTCHours(0, 0, 0, 0), l;
  }
  e.exports = t.default;
})(tn, tn.exports);
var fr = tn.exports, rn = { exports: {} }, an = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i;
  var n = r(X), a = r(H), s = r(fr);
  function i(o) {
    (0, a.default)(1, arguments);
    var l = (0, n.default)(o), d = l.getUTCFullYear(), u = /* @__PURE__ */ new Date(0);
    u.setUTCFullYear(d + 1, 0, 4), u.setUTCHours(0, 0, 0, 0);
    var c = (0, s.default)(u), m = /* @__PURE__ */ new Date(0);
    m.setUTCFullYear(d, 0, 4), m.setUTCHours(0, 0, 0, 0);
    var g = (0, s.default)(m);
    return l.getTime() >= c.getTime() ? d + 1 : l.getTime() >= g.getTime() ? d : d - 1;
  }
  e.exports = t.default;
})(an, an.exports);
var pl = an.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i;
  var n = r(pl), a = r(fr), s = r(H);
  function i(o) {
    (0, s.default)(1, arguments);
    var l = (0, n.default)(o), d = /* @__PURE__ */ new Date(0);
    d.setUTCFullYear(l, 0, 4), d.setUTCHours(0, 0, 0, 0);
    var u = (0, a.default)(d);
    return u;
  }
  e.exports = t.default;
})(rn, rn.exports);
var Lc = rn.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = l;
  var n = r(X), a = r(fr), s = r(Lc), i = r(H), o = 6048e5;
  function l(d) {
    (0, i.default)(1, arguments);
    var u = (0, n.default)(d), c = (0, a.default)(u).getTime() - (0, s.default)(u).getTime();
    return Math.round(c / o) + 1;
  }
  e.exports = t.default;
})(en, en.exports);
var vl = en.exports, nn = { exports: {} }, sn = { exports: {} }, Se = {};
Object.defineProperty(Se, "__esModule", {
  value: !0
});
Se.getDefaultOptions = Rc;
Se.setDefaultOptions = Nc;
var gl = {};
function Rc() {
  return gl;
}
function Nc(e) {
  gl = e;
}
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = o;
  var n = r(X), a = r(H), s = r(oe), i = Se;
  function o(l, d) {
    var u, c, m, g, M, E, $, _;
    (0, a.default)(1, arguments);
    var v = (0, i.getDefaultOptions)(), h = (0, s.default)((u = (c = (m = (g = d == null ? void 0 : d.weekStartsOn) !== null && g !== void 0 ? g : d == null || (M = d.locale) === null || M === void 0 || (E = M.options) === null || E === void 0 ? void 0 : E.weekStartsOn) !== null && m !== void 0 ? m : v.weekStartsOn) !== null && c !== void 0 ? c : ($ = v.locale) === null || $ === void 0 || (_ = $.options) === null || _ === void 0 ? void 0 : _.weekStartsOn) !== null && u !== void 0 ? u : 0);
    if (!(h >= 0 && h <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var p = (0, n.default)(l), T = p.getUTCDay(), A = (T < h ? 7 : 0) + T - h;
    return p.setUTCDate(p.getUTCDate() - A), p.setUTCHours(0, 0, 0, 0), p;
  }
  e.exports = t.default;
})(sn, sn.exports);
var mr = sn.exports, on = { exports: {} }, ln = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = l;
  var n = r(X), a = r(H), s = r(mr), i = r(oe), o = Se;
  function l(d, u) {
    var c, m, g, M, E, $, _, v;
    (0, a.default)(1, arguments);
    var h = (0, n.default)(d), p = h.getUTCFullYear(), T = (0, o.getDefaultOptions)(), A = (0, i.default)((c = (m = (g = (M = u == null ? void 0 : u.firstWeekContainsDate) !== null && M !== void 0 ? M : u == null || (E = u.locale) === null || E === void 0 || ($ = E.options) === null || $ === void 0 ? void 0 : $.firstWeekContainsDate) !== null && g !== void 0 ? g : T.firstWeekContainsDate) !== null && m !== void 0 ? m : (_ = T.locale) === null || _ === void 0 || (v = _.options) === null || v === void 0 ? void 0 : v.firstWeekContainsDate) !== null && c !== void 0 ? c : 1);
    if (!(A >= 1 && A <= 7))
      throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    var B = /* @__PURE__ */ new Date(0);
    B.setUTCFullYear(p + 1, 0, A), B.setUTCHours(0, 0, 0, 0);
    var ye = (0, s.default)(B, u), le = /* @__PURE__ */ new Date(0);
    le.setUTCFullYear(p, 0, A), le.setUTCHours(0, 0, 0, 0);
    var be = (0, s.default)(le, u);
    return h.getTime() >= ye.getTime() ? p + 1 : h.getTime() >= be.getTime() ? p : p - 1;
  }
  e.exports = t.default;
})(ln, ln.exports);
var ls = ln.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = l;
  var n = r(ls), a = r(H), s = r(mr), i = r(oe), o = Se;
  function l(d, u) {
    var c, m, g, M, E, $, _, v;
    (0, a.default)(1, arguments);
    var h = (0, o.getDefaultOptions)(), p = (0, i.default)((c = (m = (g = (M = u == null ? void 0 : u.firstWeekContainsDate) !== null && M !== void 0 ? M : u == null || (E = u.locale) === null || E === void 0 || ($ = E.options) === null || $ === void 0 ? void 0 : $.firstWeekContainsDate) !== null && g !== void 0 ? g : h.firstWeekContainsDate) !== null && m !== void 0 ? m : (_ = h.locale) === null || _ === void 0 || (v = _.options) === null || v === void 0 ? void 0 : v.firstWeekContainsDate) !== null && c !== void 0 ? c : 1), T = (0, n.default)(d, u), A = /* @__PURE__ */ new Date(0);
    A.setUTCFullYear(T, 0, p), A.setUTCHours(0, 0, 0, 0);
    var B = (0, s.default)(A, u);
    return B;
  }
  e.exports = t.default;
})(on, on.exports);
var Hc = on.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = l;
  var n = r(X), a = r(mr), s = r(Hc), i = r(H), o = 6048e5;
  function l(d, u) {
    (0, i.default)(1, arguments);
    var c = (0, n.default)(d), m = (0, a.default)(c, u).getTime() - (0, s.default)(c, u).getTime();
    return Math.round(m / o) + 1;
  }
  e.exports = t.default;
})(nn, nn.exports);
var _l = nn.exports, dn = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(n, a) {
    for (var s = n < 0 ? "-" : "", i = Math.abs(n).toString(); i.length < a; )
      i = "0" + i;
    return s + i;
  }
  e.exports = t.default;
})(dn, dn.exports);
var yl = dn.exports, un = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = r(yl), a = {
    // Year
    y: function(o, l) {
      var d = o.getUTCFullYear(), u = d > 0 ? d : 1 - d;
      return (0, n.default)(l === "yy" ? u % 100 : u, l.length);
    },
    // Month
    M: function(o, l) {
      var d = o.getUTCMonth();
      return l === "M" ? String(d + 1) : (0, n.default)(d + 1, 2);
    },
    // Day of the month
    d: function(o, l) {
      return (0, n.default)(o.getUTCDate(), l.length);
    },
    // AM or PM
    a: function(o, l) {
      var d = o.getUTCHours() / 12 >= 1 ? "pm" : "am";
      switch (l) {
        case "a":
        case "aa":
          return d.toUpperCase();
        case "aaa":
          return d;
        case "aaaaa":
          return d[0];
        case "aaaa":
        default:
          return d === "am" ? "a.m." : "p.m.";
      }
    },
    // Hour [1-12]
    h: function(o, l) {
      return (0, n.default)(o.getUTCHours() % 12 || 12, l.length);
    },
    // Hour [0-23]
    H: function(o, l) {
      return (0, n.default)(o.getUTCHours(), l.length);
    },
    // Minute
    m: function(o, l) {
      return (0, n.default)(o.getUTCMinutes(), l.length);
    },
    // Second
    s: function(o, l) {
      return (0, n.default)(o.getUTCSeconds(), l.length);
    },
    // Fraction of second
    S: function(o, l) {
      var d = l.length, u = o.getUTCMilliseconds(), c = Math.floor(u * Math.pow(10, d - 3));
      return (0, n.default)(c, l.length);
    }
  }, s = a;
  t.default = s, e.exports = t.default;
})(un, un.exports);
var Fc = un.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = r(Ic), a = r(vl), s = r(pl), i = r(_l), o = r(ls), l = r(yl), d = r(Fc), u = {
    am: "am",
    pm: "pm",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }, c = {
    // Era
    G: function(_, v, h) {
      var p = _.getUTCFullYear() > 0 ? 1 : 0;
      switch (v) {
        case "G":
        case "GG":
        case "GGG":
          return h.era(p, {
            width: "abbreviated"
          });
        case "GGGGG":
          return h.era(p, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return h.era(p, {
            width: "wide"
          });
      }
    },
    // Year
    y: function(_, v, h) {
      if (v === "yo") {
        var p = _.getUTCFullYear(), T = p > 0 ? p : 1 - p;
        return h.ordinalNumber(T, {
          unit: "year"
        });
      }
      return d.default.y(_, v);
    },
    // Local week-numbering year
    Y: function(_, v, h, p) {
      var T = (0, o.default)(_, p), A = T > 0 ? T : 1 - T;
      if (v === "YY") {
        var B = A % 100;
        return (0, l.default)(B, 2);
      }
      return v === "Yo" ? h.ordinalNumber(A, {
        unit: "year"
      }) : (0, l.default)(A, v.length);
    },
    // ISO week-numbering year
    R: function(_, v) {
      var h = (0, s.default)(_);
      return (0, l.default)(h, v.length);
    },
    // Extended year. This is a single number designating the year of this calendar system.
    // The main difference between `y` and `u` localizers are B.C. years:
    // | Year | `y` | `u` |
    // |------|-----|-----|
    // | AC 1 |   1 |   1 |
    // | BC 1 |   1 |   0 |
    // | BC 2 |   2 |  -1 |
    // Also `yy` always returns the last two digits of a year,
    // while `uu` pads single digit years to 2 characters and returns other years unchanged.
    u: function(_, v) {
      var h = _.getUTCFullYear();
      return (0, l.default)(h, v.length);
    },
    // Quarter
    Q: function(_, v, h) {
      var p = Math.ceil((_.getUTCMonth() + 1) / 3);
      switch (v) {
        case "Q":
          return String(p);
        case "QQ":
          return (0, l.default)(p, 2);
        case "Qo":
          return h.ordinalNumber(p, {
            unit: "quarter"
          });
        case "QQQ":
          return h.quarter(p, {
            width: "abbreviated",
            context: "formatting"
          });
        case "QQQQQ":
          return h.quarter(p, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return h.quarter(p, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Stand-alone quarter
    q: function(_, v, h) {
      var p = Math.ceil((_.getUTCMonth() + 1) / 3);
      switch (v) {
        case "q":
          return String(p);
        case "qq":
          return (0, l.default)(p, 2);
        case "qo":
          return h.ordinalNumber(p, {
            unit: "quarter"
          });
        case "qqq":
          return h.quarter(p, {
            width: "abbreviated",
            context: "standalone"
          });
        case "qqqqq":
          return h.quarter(p, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return h.quarter(p, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    // Month
    M: function(_, v, h) {
      var p = _.getUTCMonth();
      switch (v) {
        case "M":
        case "MM":
          return d.default.M(_, v);
        case "Mo":
          return h.ordinalNumber(p + 1, {
            unit: "month"
          });
        case "MMM":
          return h.month(p, {
            width: "abbreviated",
            context: "formatting"
          });
        case "MMMMM":
          return h.month(p, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return h.month(p, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Stand-alone month
    L: function(_, v, h) {
      var p = _.getUTCMonth();
      switch (v) {
        case "L":
          return String(p + 1);
        case "LL":
          return (0, l.default)(p + 1, 2);
        case "Lo":
          return h.ordinalNumber(p + 1, {
            unit: "month"
          });
        case "LLL":
          return h.month(p, {
            width: "abbreviated",
            context: "standalone"
          });
        case "LLLLL":
          return h.month(p, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return h.month(p, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    // Local week of year
    w: function(_, v, h, p) {
      var T = (0, i.default)(_, p);
      return v === "wo" ? h.ordinalNumber(T, {
        unit: "week"
      }) : (0, l.default)(T, v.length);
    },
    // ISO week of year
    I: function(_, v, h) {
      var p = (0, a.default)(_);
      return v === "Io" ? h.ordinalNumber(p, {
        unit: "week"
      }) : (0, l.default)(p, v.length);
    },
    // Day of the month
    d: function(_, v, h) {
      return v === "do" ? h.ordinalNumber(_.getUTCDate(), {
        unit: "date"
      }) : d.default.d(_, v);
    },
    // Day of year
    D: function(_, v, h) {
      var p = (0, n.default)(_);
      return v === "Do" ? h.ordinalNumber(p, {
        unit: "dayOfYear"
      }) : (0, l.default)(p, v.length);
    },
    // Day of week
    E: function(_, v, h) {
      var p = _.getUTCDay();
      switch (v) {
        case "E":
        case "EE":
        case "EEE":
          return h.day(p, {
            width: "abbreviated",
            context: "formatting"
          });
        case "EEEEE":
          return h.day(p, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return h.day(p, {
            width: "short",
            context: "formatting"
          });
        case "EEEE":
        default:
          return h.day(p, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Local day of week
    e: function(_, v, h, p) {
      var T = _.getUTCDay(), A = (T - p.weekStartsOn + 8) % 7 || 7;
      switch (v) {
        case "e":
          return String(A);
        case "ee":
          return (0, l.default)(A, 2);
        case "eo":
          return h.ordinalNumber(A, {
            unit: "day"
          });
        case "eee":
          return h.day(T, {
            width: "abbreviated",
            context: "formatting"
          });
        case "eeeee":
          return h.day(T, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return h.day(T, {
            width: "short",
            context: "formatting"
          });
        case "eeee":
        default:
          return h.day(T, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Stand-alone local day of week
    c: function(_, v, h, p) {
      var T = _.getUTCDay(), A = (T - p.weekStartsOn + 8) % 7 || 7;
      switch (v) {
        case "c":
          return String(A);
        case "cc":
          return (0, l.default)(A, v.length);
        case "co":
          return h.ordinalNumber(A, {
            unit: "day"
          });
        case "ccc":
          return h.day(T, {
            width: "abbreviated",
            context: "standalone"
          });
        case "ccccc":
          return h.day(T, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return h.day(T, {
            width: "short",
            context: "standalone"
          });
        case "cccc":
        default:
          return h.day(T, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    // ISO day of week
    i: function(_, v, h) {
      var p = _.getUTCDay(), T = p === 0 ? 7 : p;
      switch (v) {
        case "i":
          return String(T);
        case "ii":
          return (0, l.default)(T, v.length);
        case "io":
          return h.ordinalNumber(T, {
            unit: "day"
          });
        case "iii":
          return h.day(p, {
            width: "abbreviated",
            context: "formatting"
          });
        case "iiiii":
          return h.day(p, {
            width: "narrow",
            context: "formatting"
          });
        case "iiiiii":
          return h.day(p, {
            width: "short",
            context: "formatting"
          });
        case "iiii":
        default:
          return h.day(p, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // AM or PM
    a: function(_, v, h) {
      var p = _.getUTCHours(), T = p / 12 >= 1 ? "pm" : "am";
      switch (v) {
        case "a":
        case "aa":
          return h.dayPeriod(T, {
            width: "abbreviated",
            context: "formatting"
          });
        case "aaa":
          return h.dayPeriod(T, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "aaaaa":
          return h.dayPeriod(T, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return h.dayPeriod(T, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // AM, PM, midnight, noon
    b: function(_, v, h) {
      var p = _.getUTCHours(), T;
      switch (p === 12 ? T = u.noon : p === 0 ? T = u.midnight : T = p / 12 >= 1 ? "pm" : "am", v) {
        case "b":
        case "bb":
          return h.dayPeriod(T, {
            width: "abbreviated",
            context: "formatting"
          });
        case "bbb":
          return h.dayPeriod(T, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "bbbbb":
          return h.dayPeriod(T, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return h.dayPeriod(T, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // in the morning, in the afternoon, in the evening, at night
    B: function(_, v, h) {
      var p = _.getUTCHours(), T;
      switch (p >= 17 ? T = u.evening : p >= 12 ? T = u.afternoon : p >= 4 ? T = u.morning : T = u.night, v) {
        case "B":
        case "BB":
        case "BBB":
          return h.dayPeriod(T, {
            width: "abbreviated",
            context: "formatting"
          });
        case "BBBBB":
          return h.dayPeriod(T, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return h.dayPeriod(T, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Hour [1-12]
    h: function(_, v, h) {
      if (v === "ho") {
        var p = _.getUTCHours() % 12;
        return p === 0 && (p = 12), h.ordinalNumber(p, {
          unit: "hour"
        });
      }
      return d.default.h(_, v);
    },
    // Hour [0-23]
    H: function(_, v, h) {
      return v === "Ho" ? h.ordinalNumber(_.getUTCHours(), {
        unit: "hour"
      }) : d.default.H(_, v);
    },
    // Hour [0-11]
    K: function(_, v, h) {
      var p = _.getUTCHours() % 12;
      return v === "Ko" ? h.ordinalNumber(p, {
        unit: "hour"
      }) : (0, l.default)(p, v.length);
    },
    // Hour [1-24]
    k: function(_, v, h) {
      var p = _.getUTCHours();
      return p === 0 && (p = 24), v === "ko" ? h.ordinalNumber(p, {
        unit: "hour"
      }) : (0, l.default)(p, v.length);
    },
    // Minute
    m: function(_, v, h) {
      return v === "mo" ? h.ordinalNumber(_.getUTCMinutes(), {
        unit: "minute"
      }) : d.default.m(_, v);
    },
    // Second
    s: function(_, v, h) {
      return v === "so" ? h.ordinalNumber(_.getUTCSeconds(), {
        unit: "second"
      }) : d.default.s(_, v);
    },
    // Fraction of second
    S: function(_, v) {
      return d.default.S(_, v);
    },
    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function(_, v, h, p) {
      var T = p._originalDate || _, A = T.getTimezoneOffset();
      if (A === 0)
        return "Z";
      switch (v) {
        case "X":
          return g(A);
        case "XXXX":
        case "XX":
          return M(A);
        case "XXXXX":
        case "XXX":
        default:
          return M(A, ":");
      }
    },
    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function(_, v, h, p) {
      var T = p._originalDate || _, A = T.getTimezoneOffset();
      switch (v) {
        case "x":
          return g(A);
        case "xxxx":
        case "xx":
          return M(A);
        case "xxxxx":
        case "xxx":
        default:
          return M(A, ":");
      }
    },
    // Timezone (GMT)
    O: function(_, v, h, p) {
      var T = p._originalDate || _, A = T.getTimezoneOffset();
      switch (v) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + m(A, ":");
        case "OOOO":
        default:
          return "GMT" + M(A, ":");
      }
    },
    // Timezone (specific non-location)
    z: function(_, v, h, p) {
      var T = p._originalDate || _, A = T.getTimezoneOffset();
      switch (v) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + m(A, ":");
        case "zzzz":
        default:
          return "GMT" + M(A, ":");
      }
    },
    // Seconds timestamp
    t: function(_, v, h, p) {
      var T = p._originalDate || _, A = Math.floor(T.getTime() / 1e3);
      return (0, l.default)(A, v.length);
    },
    // Milliseconds timestamp
    T: function(_, v, h, p) {
      var T = p._originalDate || _, A = T.getTime();
      return (0, l.default)(A, v.length);
    }
  };
  function m($, _) {
    var v = $ > 0 ? "-" : "+", h = Math.abs($), p = Math.floor(h / 60), T = h % 60;
    if (T === 0)
      return v + String(p);
    var A = _ || "";
    return v + String(p) + A + (0, l.default)(T, 2);
  }
  function g($, _) {
    if ($ % 60 === 0) {
      var v = $ > 0 ? "-" : "+";
      return v + (0, l.default)(Math.abs($) / 60, 2);
    }
    return M($, _);
  }
  function M($, _) {
    var v = _ || "", h = $ > 0 ? "-" : "+", p = Math.abs($), T = (0, l.default)(Math.floor(p / 60), 2), A = (0, l.default)(p % 60, 2);
    return h + T + v + A;
  }
  var E = c;
  t.default = E, e.exports = t.default;
})(Ja, Ja.exports);
var Bc = Ja.exports, cn = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var r = function(l, d) {
    switch (l) {
      case "P":
        return d.date({
          width: "short"
        });
      case "PP":
        return d.date({
          width: "medium"
        });
      case "PPP":
        return d.date({
          width: "long"
        });
      case "PPPP":
      default:
        return d.date({
          width: "full"
        });
    }
  }, n = function(l, d) {
    switch (l) {
      case "p":
        return d.time({
          width: "short"
        });
      case "pp":
        return d.time({
          width: "medium"
        });
      case "ppp":
        return d.time({
          width: "long"
        });
      case "pppp":
      default:
        return d.time({
          width: "full"
        });
    }
  }, a = function(l, d) {
    var u = l.match(/(P+)(p+)?/) || [], c = u[1], m = u[2];
    if (!m)
      return r(l, d);
    var g;
    switch (c) {
      case "P":
        g = d.dateTime({
          width: "short"
        });
        break;
      case "PP":
        g = d.dateTime({
          width: "medium"
        });
        break;
      case "PPP":
        g = d.dateTime({
          width: "long"
        });
        break;
      case "PPPP":
      default:
        g = d.dateTime({
          width: "full"
        });
        break;
    }
    return g.replace("{{date}}", r(c, d)).replace("{{time}}", n(m, d));
  }, s = {
    p: n,
    P: a
  }, i = s;
  t.default = i, e.exports = t.default;
})(cn, cn.exports);
var bl = cn.exports, fn = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(n) {
    var a = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()));
    return a.setUTCFullYear(n.getFullYear()), n.getTime() - a.getTime();
  }
  e.exports = t.default;
})(fn, fn.exports);
var Ml = fn.exports, Mt = {};
Object.defineProperty(Mt, "__esModule", {
  value: !0
});
Mt.isProtectedDayOfYearToken = zc;
Mt.isProtectedWeekYearToken = qc;
Mt.throwProtectedError = Uc;
var Wc = ["D", "DD"], Yc = ["YY", "YYYY"];
function zc(e) {
  return Wc.indexOf(e) !== -1;
}
function qc(e) {
  return Yc.indexOf(e) !== -1;
}
function Uc(e, t, r) {
  if (e === "YYYY")
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t, "`) for formatting years to the input `").concat(r, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "YY")
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(t, "`) for formatting years to the input `").concat(r, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "D")
    throw new RangeError("Use `d` instead of `D` (in `".concat(t, "`) for formatting days of the month to the input `").concat(r, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  if (e === "DD")
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(t, "`) for formatting days of the month to the input `").concat(r, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
}
var mn = { exports: {} }, hn = { exports: {} }, pn = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var r = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  }, n = function(i, o, l) {
    var d, u = r[i];
    return typeof u == "string" ? d = u : o === 1 ? d = u.one : d = u.other.replace("{{count}}", o.toString()), l != null && l.addSuffix ? l.comparison && l.comparison > 0 ? "in " + d : d + " ago" : d;
  }, a = n;
  t.default = a, e.exports = t.default;
})(pn, pn.exports);
var jc = pn.exports, vn = { exports: {} }, gn = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(n) {
    return function() {
      var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, s = a.width ? String(a.width) : n.defaultWidth, i = n.formats[s] || n.formats[n.defaultWidth];
      return i;
    };
  }
  e.exports = t.default;
})(gn, gn.exports);
var Vc = gn.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = r(Vc), a = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  }, s = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  }, i = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  }, o = {
    date: (0, n.default)({
      formats: a,
      defaultWidth: "full"
    }),
    time: (0, n.default)({
      formats: s,
      defaultWidth: "full"
    }),
    dateTime: (0, n.default)({
      formats: i,
      defaultWidth: "full"
    })
  }, l = o;
  t.default = l, e.exports = t.default;
})(vn, vn.exports);
var Qc = vn.exports, _n = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var r = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  }, n = function(i, o, l, d) {
    return r[i];
  }, a = n;
  t.default = a, e.exports = t.default;
})(_n, _n.exports);
var Xc = _n.exports, yn = { exports: {} }, bn = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(n) {
    return function(a, s) {
      var i = s != null && s.context ? String(s.context) : "standalone", o;
      if (i === "formatting" && n.formattingValues) {
        var l = n.defaultFormattingWidth || n.defaultWidth, d = s != null && s.width ? String(s.width) : l;
        o = n.formattingValues[d] || n.formattingValues[l];
      } else {
        var u = n.defaultWidth, c = s != null && s.width ? String(s.width) : n.defaultWidth;
        o = n.values[c] || n.values[u];
      }
      var m = n.argumentCallback ? n.argumentCallback(a) : a;
      return o[m];
    };
  }
  e.exports = t.default;
})(bn, bn.exports);
var Gc = bn.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = r(Gc), a = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  }, s = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  }, i = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }, o = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  }, l = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  }, d = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  }, u = function(M, E) {
    var $ = Number(M), _ = $ % 100;
    if (_ > 20 || _ < 10)
      switch (_ % 10) {
        case 1:
          return $ + "st";
        case 2:
          return $ + "nd";
        case 3:
          return $ + "rd";
      }
    return $ + "th";
  }, c = {
    ordinalNumber: u,
    era: (0, n.default)({
      values: a,
      defaultWidth: "wide"
    }),
    quarter: (0, n.default)({
      values: s,
      defaultWidth: "wide",
      argumentCallback: function(M) {
        return M - 1;
      }
    }),
    month: (0, n.default)({
      values: i,
      defaultWidth: "wide"
    }),
    day: (0, n.default)({
      values: o,
      defaultWidth: "wide"
    }),
    dayPeriod: (0, n.default)({
      values: l,
      defaultWidth: "wide",
      formattingValues: d,
      defaultFormattingWidth: "wide"
    })
  }, m = c;
  t.default = m, e.exports = t.default;
})(yn, yn.exports);
var Kc = yn.exports, Mn = { exports: {} }, wn = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(s) {
    return function(i) {
      var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, l = o.width, d = l && s.matchPatterns[l] || s.matchPatterns[s.defaultMatchWidth], u = i.match(d);
      if (!u)
        return null;
      var c = u[0], m = l && s.parsePatterns[l] || s.parsePatterns[s.defaultParseWidth], g = Array.isArray(m) ? a(m, function($) {
        return $.test(c);
      }) : n(m, function($) {
        return $.test(c);
      }), M;
      M = s.valueCallback ? s.valueCallback(g) : g, M = o.valueCallback ? o.valueCallback(M) : M;
      var E = i.slice(c.length);
      return {
        value: M,
        rest: E
      };
    };
  }
  function n(s, i) {
    for (var o in s)
      if (s.hasOwnProperty(o) && i(s[o]))
        return o;
  }
  function a(s, i) {
    for (var o = 0; o < s.length; o++)
      if (i(s[o]))
        return o;
  }
  e.exports = t.default;
})(wn, wn.exports);
var Jc = wn.exports, $n = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(n) {
    return function(a) {
      var s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = a.match(n.matchPattern);
      if (!i)
        return null;
      var o = i[0], l = a.match(n.parsePattern);
      if (!l)
        return null;
      var d = n.valueCallback ? n.valueCallback(l[0]) : l[0];
      d = s.valueCallback ? s.valueCallback(d) : d;
      var u = a.slice(o.length);
      return {
        value: d,
        rest: u
      };
    };
  }
  e.exports = t.default;
})($n, $n.exports);
var Zc = $n.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = r(Jc), a = r(Zc), s = /^(\d+)(th|st|nd|rd)?/i, i = /\d+/i, o = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  }, l = {
    any: [/^b/i, /^(a|c)/i]
  }, d = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  }, u = {
    any: [/1/i, /2/i, /3/i, /4/i]
  }, c = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  }, m = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  }, g = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  }, M = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  }, E = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  }, $ = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  }, _ = {
    ordinalNumber: (0, a.default)({
      matchPattern: s,
      parsePattern: i,
      valueCallback: function(p) {
        return parseInt(p, 10);
      }
    }),
    era: (0, n.default)({
      matchPatterns: o,
      defaultMatchWidth: "wide",
      parsePatterns: l,
      defaultParseWidth: "any"
    }),
    quarter: (0, n.default)({
      matchPatterns: d,
      defaultMatchWidth: "wide",
      parsePatterns: u,
      defaultParseWidth: "any",
      valueCallback: function(p) {
        return p + 1;
      }
    }),
    month: (0, n.default)({
      matchPatterns: c,
      defaultMatchWidth: "wide",
      parsePatterns: m,
      defaultParseWidth: "any"
    }),
    day: (0, n.default)({
      matchPatterns: g,
      defaultMatchWidth: "wide",
      parsePatterns: M,
      defaultParseWidth: "any"
    }),
    dayPeriod: (0, n.default)({
      matchPatterns: E,
      defaultMatchWidth: "any",
      parsePatterns: $,
      defaultParseWidth: "any"
    })
  }, v = _;
  t.default = v, e.exports = t.default;
})(Mn, Mn.exports);
var ef = Mn.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = r(jc), a = r(Qc), s = r(Xc), i = r(Kc), o = r(ef), l = {
    code: "en-US",
    formatDistance: n.default,
    formatLong: a.default,
    formatRelative: s.default,
    localize: i.default,
    match: o.default,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  }, d = l;
  t.default = d, e.exports = t.default;
})(hn, hn.exports);
var tf = hn.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0;
  var n = r(tf), a = n.default;
  t.default = a, e.exports = t.default;
})(mn, mn.exports);
var wl = mn.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = h;
  var n = r(ml), a = r(hl), s = r(X), i = r(Bc), o = r(bl), l = r(Ml), d = Mt, u = r(oe), c = r(H), m = Se, g = r(wl), M = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, E = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, $ = /^'([^]*?)'?$/, _ = /''/g, v = /[a-zA-Z]/;
  function h(T, A, B) {
    var ye, le, be, st, K, Ie, Le, Re, Ne, He, Fe, Be, We, Ye, ze, qe, Ue, je;
    (0, c.default)(2, arguments);
    var Qt = String(A), Me = (0, m.getDefaultOptions)(), we = (ye = (le = B == null ? void 0 : B.locale) !== null && le !== void 0 ? le : Me.locale) !== null && ye !== void 0 ? ye : g.default, Ve = (0, u.default)((be = (st = (K = (Ie = B == null ? void 0 : B.firstWeekContainsDate) !== null && Ie !== void 0 ? Ie : B == null || (Le = B.locale) === null || Le === void 0 || (Re = Le.options) === null || Re === void 0 ? void 0 : Re.firstWeekContainsDate) !== null && K !== void 0 ? K : Me.firstWeekContainsDate) !== null && st !== void 0 ? st : (Ne = Me.locale) === null || Ne === void 0 || (He = Ne.options) === null || He === void 0 ? void 0 : He.firstWeekContainsDate) !== null && be !== void 0 ? be : 1);
    if (!(Ve >= 1 && Ve <= 7))
      throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    var Qe = (0, u.default)((Fe = (Be = (We = (Ye = B == null ? void 0 : B.weekStartsOn) !== null && Ye !== void 0 ? Ye : B == null || (ze = B.locale) === null || ze === void 0 || (qe = ze.options) === null || qe === void 0 ? void 0 : qe.weekStartsOn) !== null && We !== void 0 ? We : Me.weekStartsOn) !== null && Be !== void 0 ? Be : (Ue = Me.locale) === null || Ue === void 0 || (je = Ue.options) === null || je === void 0 ? void 0 : je.weekStartsOn) !== null && Fe !== void 0 ? Fe : 0);
    if (!(Qe >= 0 && Qe <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    if (!we.localize)
      throw new RangeError("locale must contain localize property");
    if (!we.formatLong)
      throw new RangeError("locale must contain formatLong property");
    var ce = (0, s.default)(T);
    if (!(0, n.default)(ce))
      throw new RangeError("Invalid time value");
    var it = (0, l.default)(ce), Xe = (0, a.default)(ce, it), ot = {
      firstWeekContainsDate: Ve,
      weekStartsOn: Qe,
      locale: we,
      _originalDate: ce
    }, Xt = Qt.match(E).map(function(ie) {
      var fe = ie[0];
      if (fe === "p" || fe === "P") {
        var De = o.default[fe];
        return De(ie, we.formatLong);
      }
      return ie;
    }).join("").match(M).map(function(ie) {
      if (ie === "''")
        return "'";
      var fe = ie[0];
      if (fe === "'")
        return p(ie);
      var De = i.default[fe];
      if (De)
        return !(B != null && B.useAdditionalWeekYearTokens) && (0, d.isProtectedWeekYearToken)(ie) && (0, d.throwProtectedError)(ie, A, String(T)), !(B != null && B.useAdditionalDayOfYearTokens) && (0, d.isProtectedDayOfYearToken)(ie) && (0, d.throwProtectedError)(ie, A, String(T)), De(Xe, ie, we.localize, ot);
      if (fe.match(v))
        throw new RangeError("Format string contains an unescaped latin alphabet character `" + fe + "`");
      return ie;
    }).join("");
    return Xt;
  }
  function p(T) {
    var A = T.match($);
    return A ? A[1].replace(_, "'") : T;
  }
  e.exports = t.default;
})(qa, qa.exports);
var rf = qa.exports;
const Js = /* @__PURE__ */ se(rf);
var Tn = { exports: {} }, $l = { exports: {} }, Tl = { exports: {} }, Cl = { exports: {} };
(function(e) {
  function t(r, n) {
    (n == null || n > r.length) && (n = r.length);
    for (var a = 0, s = Array(n); a < n; a++)
      s[a] = r[a];
    return s;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Cl);
var af = Cl.exports;
(function(e) {
  var t = af;
  function r(n, a) {
    if (n) {
      if (typeof n == "string")
        return t(n, a);
      var s = {}.toString.call(n).slice(8, -1);
      return s === "Object" && n.constructor && (s = n.constructor.name), s === "Map" || s === "Set" ? Array.from(n) : s === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? t(n, a) : void 0;
    }
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Tl);
var nf = Tl.exports;
(function(e) {
  var t = nf;
  function r(n, a) {
    var s = typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
    if (!s) {
      if (Array.isArray(n) || (s = t(n)) || a && n && typeof n.length == "number") {
        s && (n = s);
        var i = 0, o = function() {
        };
        return {
          s: o,
          n: function() {
            return i >= n.length ? {
              done: !0
            } : {
              done: !1,
              value: n[i++]
            };
          },
          e: function(m) {
            throw m;
          },
          f: o
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var l, d = !0, u = !1;
    return {
      s: function() {
        s = s.call(n);
      },
      n: function() {
        var m = s.next();
        return d = m.done, m;
      },
      e: function(m) {
        u = !0, l = m;
      },
      f: function() {
        try {
          d || s.return == null || s.return();
        } finally {
          if (u)
            throw l;
        }
      }
    };
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})($l);
var sf = $l.exports, Cn = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(n, a) {
    if (n == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var s in a)
      Object.prototype.hasOwnProperty.call(a, s) && (n[s] = a[s]);
    return n;
  }
  e.exports = t.default;
})(Cn, Cn.exports);
var of = Cn.exports, Ce = {}, xl = { exports: {} };
(function(e) {
  function t(r) {
    if (r === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return r;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(xl);
var Y = xl.exports, Pl = { exports: {} }, Sl = { exports: {} };
(function(e) {
  function t(r, n) {
    return e.exports = t = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, s) {
      return a.__proto__ = s, a;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(r, n);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Sl);
var lf = Sl.exports;
(function(e) {
  var t = lf;
  function r(n, a) {
    if (typeof a != "function" && a !== null)
      throw new TypeError("Super expression must either be null or a function");
    n.prototype = Object.create(a && a.prototype, {
      constructor: {
        value: n,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(n, "prototype", {
      writable: !1
    }), a && t(n, a);
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Pl);
var j = Pl.exports, Dl = { exports: {} }, kl = { exports: {} };
(function(e) {
  function t(r) {
    return e.exports = t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
      return n.__proto__ || Object.getPrototypeOf(n);
    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(r);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(kl);
var df = kl.exports, Ol = { exports: {} };
(function(e) {
  function t() {
    try {
      var r = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
    } catch {
    }
    return (e.exports = t = function() {
      return !!r;
    }, e.exports.__esModule = !0, e.exports.default = e.exports)();
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ol);
var uf = Ol.exports, Al = { exports: {} };
(function(e) {
  var t = bt.default, r = Y;
  function n(a, s) {
    if (s && (t(s) == "object" || typeof s == "function"))
      return s;
    if (s !== void 0)
      throw new TypeError("Derived constructors may only return object or undefined");
    return r(a);
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Al);
var cf = Al.exports;
(function(e) {
  var t = df, r = uf, n = cf;
  function a(s) {
    var i = r();
    return function() {
      var o, l = t(s);
      if (i) {
        var d = t(this).constructor;
        o = Reflect.construct(l, arguments, d);
      } else
        o = l.apply(this, arguments);
      return n(this, o);
    };
  }
  e.exports = a, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Dl);
var V = Dl.exports, El = { exports: {} };
(function(e) {
  function t(r, n) {
    if (!(r instanceof n))
      throw new TypeError("Cannot call a class as a function");
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(El);
var z = El.exports, Il = { exports: {} }, Ll = { exports: {} }, Rl = { exports: {} };
(function(e) {
  var t = bt.default;
  function r(n, a) {
    if (t(n) != "object" || !n)
      return n;
    var s = n[Symbol.toPrimitive];
    if (s !== void 0) {
      var i = s.call(n, a || "default");
      if (t(i) != "object")
        return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (a === "string" ? String : Number)(n);
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Rl);
var ff = Rl.exports;
(function(e) {
  var t = bt.default, r = ff;
  function n(a) {
    var s = r(a, "string");
    return t(s) == "symbol" ? s : s + "";
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ll);
var Nl = Ll.exports;
(function(e) {
  var t = Nl;
  function r(a, s) {
    for (var i = 0; i < s.length; i++) {
      var o = s[i];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(a, t(o.key), o);
    }
  }
  function n(a, s, i) {
    return s && r(a.prototype, s), i && r(a, i), Object.defineProperty(a, "prototype", {
      writable: !1
    }), a;
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Il);
var q = Il.exports, Hl = { exports: {} };
(function(e) {
  var t = Nl;
  function r(n, a, s) {
    return (a = t(a)) in n ? Object.defineProperty(n, a, {
      value: s,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : n[a] = s, n;
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Hl);
var U = Hl.exports, wt = S.default;
Object.defineProperty(Ce, "__esModule", {
  value: !0
});
Ce.ValueSetter = Ce.Setter = Ce.DateToSystemTimezoneSetter = void 0;
var Zs = wt(Y), Fl = wt(j), Bl = wt(V), ds = wt(z), us = wt(q), xr = wt(U), mf = 10, cs = /* @__PURE__ */ function() {
  function e() {
    (0, ds.default)(this, e), (0, xr.default)(this, "priority", void 0), (0, xr.default)(this, "subPriority", 0);
  }
  return (0, us.default)(e, [{
    key: "validate",
    value: function(r, n) {
      return !0;
    }
  }]), e;
}();
Ce.Setter = cs;
var hf = /* @__PURE__ */ function(e) {
  (0, Fl.default)(r, e);
  var t = (0, Bl.default)(r);
  function r(n, a, s, i, o) {
    var l;
    return (0, ds.default)(this, r), l = t.call(this), l.value = n, l.validateValue = a, l.setValue = s, l.priority = i, o && (l.subPriority = o), l;
  }
  return (0, us.default)(r, [{
    key: "validate",
    value: function(a, s) {
      return this.validateValue(a, this.value, s);
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return this.setValue(a, s, this.value, i);
    }
  }]), r;
}(cs);
Ce.ValueSetter = hf;
var pf = /* @__PURE__ */ function(e) {
  (0, Fl.default)(r, e);
  var t = (0, Bl.default)(r);
  function r() {
    var n;
    (0, ds.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, xr.default)((0, Zs.default)(n), "priority", mf), (0, xr.default)((0, Zs.default)(n), "subPriority", -1), n;
  }
  return (0, us.default)(r, [{
    key: "set",
    value: function(a, s) {
      if (s.timestampIsSet)
        return a;
      var i = /* @__PURE__ */ new Date(0);
      return i.setFullYear(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()), i.setHours(a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds()), i;
    }
  }]), r;
}(cs);
Ce.DateToSystemTimezoneSetter = pf;
var Lr = {}, Rr = {}, F = {}, fs = S.default;
Object.defineProperty(F, "__esModule", {
  value: !0
});
F.Parser = void 0;
var vf = fs(z), gf = fs(q), wa = fs(U), _f = Ce, yf = /* @__PURE__ */ function() {
  function e() {
    (0, vf.default)(this, e), (0, wa.default)(this, "incompatibleTokens", void 0), (0, wa.default)(this, "priority", void 0), (0, wa.default)(this, "subPriority", void 0);
  }
  return (0, gf.default)(e, [{
    key: "run",
    value: function(r, n, a, s) {
      var i = this.parse(r, n, a, s);
      return i ? {
        setter: new _f.ValueSetter(i.value, this.validate, this.set, this.priority, this.subPriority),
        rest: i.rest
      } : null;
    }
  }, {
    key: "validate",
    value: function(r, n, a) {
      return !0;
    }
  }]), e;
}();
F.Parser = yf;
var $t = S.default;
Object.defineProperty(Rr, "__esModule", {
  value: !0
});
Rr.EraParser = void 0;
var bf = $t(z), Mf = $t(q), ei = $t(Y), wf = $t(j), $f = $t(V), ti = $t(U), Tf = F, Cf = /* @__PURE__ */ function(e) {
  (0, wf.default)(r, e);
  var t = (0, $f.default)(r);
  function r() {
    var n;
    (0, bf.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, ti.default)((0, ei.default)(n), "priority", 140), (0, ti.default)((0, ei.default)(n), "incompatibleTokens", ["R", "u", "t", "T"]), n;
  }
  return (0, Mf.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "G":
        case "GG":
        case "GGG":
          return i.era(a, {
            width: "abbreviated"
          }) || i.era(a, {
            width: "narrow"
          });
        case "GGGGG":
          return i.era(a, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return i.era(a, {
            width: "wide"
          }) || i.era(a, {
            width: "abbreviated"
          }) || i.era(a, {
            width: "narrow"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return s.era = i, a.setUTCFullYear(i, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Tf.Parser);
Rr.EraParser = Cf;
var Nr = {}, I = {}, L = {};
Object.defineProperty(L, "__esModule", {
  value: !0
});
L.secondsInYear = L.secondsInWeek = L.secondsInQuarter = L.secondsInMonth = L.secondsInMinute = L.secondsInHour = L.secondsInDay = L.quartersInYear = L.monthsInYear = L.monthsInQuarter = L.minutesInHour = L.minTime = L.millisecondsInSecond = L.millisecondsInMinute = L.millisecondsInHour = L.maxTime = L.daysInYear = L.daysInWeek = void 0;
var xf = 7;
L.daysInWeek = xf;
var Wl = 365.2425;
L.daysInYear = Wl;
var Yl = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
L.maxTime = Yl;
var Pf = 6e4;
L.millisecondsInMinute = Pf;
var Sf = 36e5;
L.millisecondsInHour = Sf;
var Df = 1e3;
L.millisecondsInSecond = Df;
var kf = -Yl;
L.minTime = kf;
var Of = 60;
L.minutesInHour = Of;
var Af = 3;
L.monthsInQuarter = Af;
var Ef = 12;
L.monthsInYear = Ef;
var If = 4;
L.quartersInYear = If;
var zl = 3600;
L.secondsInHour = zl;
var Lf = 60;
L.secondsInMinute = Lf;
var ms = zl * 24;
L.secondsInDay = ms;
var Rf = ms * 7;
L.secondsInWeek = Rf;
var ql = ms * Wl;
L.secondsInYear = ql;
var Ul = ql / 12;
L.secondsInMonth = Ul;
var Nf = Ul * 3;
L.secondsInQuarter = Nf;
var re = {};
Object.defineProperty(re, "__esModule", {
  value: !0
});
re.timezonePatterns = re.numericPatterns = void 0;
var Hf = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
};
re.numericPatterns = Hf;
var Ff = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
re.timezonePatterns = Ff;
Object.defineProperty(I, "__esModule", {
  value: !0
});
I.dayPeriodEnumToHours = Uf;
I.isLeapYearIndex = Vf;
I.mapValue = Bf;
I.normalizeTwoDigitYear = jf;
I.parseAnyDigitsSigned = Yf;
I.parseNDigits = zf;
I.parseNDigitsSigned = qf;
I.parseNumericPattern = he;
I.parseTimezonePattern = Wf;
var $a = L, $e = re;
function Bf(e, t) {
  return e && {
    value: t(e.value),
    rest: e.rest
  };
}
function he(e, t) {
  var r = t.match(e);
  return r ? {
    value: parseInt(r[0], 10),
    rest: t.slice(r[0].length)
  } : null;
}
function Wf(e, t) {
  var r = t.match(e);
  if (!r)
    return null;
  if (r[0] === "Z")
    return {
      value: 0,
      rest: t.slice(1)
    };
  var n = r[1] === "+" ? 1 : -1, a = r[2] ? parseInt(r[2], 10) : 0, s = r[3] ? parseInt(r[3], 10) : 0, i = r[5] ? parseInt(r[5], 10) : 0;
  return {
    value: n * (a * $a.millisecondsInHour + s * $a.millisecondsInMinute + i * $a.millisecondsInSecond),
    rest: t.slice(r[0].length)
  };
}
function Yf(e) {
  return he($e.numericPatterns.anyDigitsSigned, e);
}
function zf(e, t) {
  switch (e) {
    case 1:
      return he($e.numericPatterns.singleDigit, t);
    case 2:
      return he($e.numericPatterns.twoDigits, t);
    case 3:
      return he($e.numericPatterns.threeDigits, t);
    case 4:
      return he($e.numericPatterns.fourDigits, t);
    default:
      return he(new RegExp("^\\d{1," + e + "}"), t);
  }
}
function qf(e, t) {
  switch (e) {
    case 1:
      return he($e.numericPatterns.singleDigitSigned, t);
    case 2:
      return he($e.numericPatterns.twoDigitsSigned, t);
    case 3:
      return he($e.numericPatterns.threeDigitsSigned, t);
    case 4:
      return he($e.numericPatterns.fourDigitsSigned, t);
    default:
      return he(new RegExp("^-?\\d{1," + e + "}"), t);
  }
}
function Uf(e) {
  switch (e) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function jf(e, t) {
  var r = t > 0, n = r ? t : 1 - t, a;
  if (n <= 50)
    a = e || 100;
  else {
    var s = n + 50, i = Math.floor(s / 100) * 100, o = e >= s % 100;
    a = e + i - (o ? 100 : 0);
  }
  return r ? a : 1 - a;
}
function Vf(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
var Tt = S.default;
Object.defineProperty(Nr, "__esModule", {
  value: !0
});
Nr.YearParser = void 0;
var Qf = Tt(z), Xf = Tt(q), ri = Tt(Y), Gf = Tt(j), Kf = Tt(V), ai = Tt(U), Jf = F, dt = I, Zf = /* @__PURE__ */ function(e) {
  (0, Gf.default)(r, e);
  var t = (0, Kf.default)(r);
  function r() {
    var n;
    (0, Qf.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, ai.default)((0, ri.default)(n), "priority", 130), (0, ai.default)((0, ri.default)(n), "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]), n;
  }
  return (0, Xf.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      var o = function(d) {
        return {
          year: d,
          isTwoDigitYear: s === "yy"
        };
      };
      switch (s) {
        case "y":
          return (0, dt.mapValue)((0, dt.parseNDigits)(4, a), o);
        case "yo":
          return (0, dt.mapValue)(i.ordinalNumber(a, {
            unit: "year"
          }), o);
        default:
          return (0, dt.mapValue)((0, dt.parseNDigits)(s.length, a), o);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s.isTwoDigitYear || s.year > 0;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      var o = a.getUTCFullYear();
      if (i.isTwoDigitYear) {
        var l = (0, dt.normalizeTwoDigitYear)(i.year, o);
        return a.setUTCFullYear(l, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
      }
      var d = !("era" in s) || s.era === 1 ? i.year : 1 - i.year;
      return a.setUTCFullYear(d, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Jf.Parser);
Nr.YearParser = Zf;
var Hr = {}, Oe = S.default;
Object.defineProperty(Hr, "__esModule", {
  value: !0
});
Hr.LocalWeekYearParser = void 0;
var em = Oe(z), tm = Oe(q), ni = Oe(Y), rm = Oe(j), am = Oe(V), si = Oe(U), nm = F, ut = I, sm = Oe(ls), ii = Oe(mr), im = /* @__PURE__ */ function(e) {
  (0, rm.default)(r, e);
  var t = (0, am.default)(r);
  function r() {
    var n;
    (0, em.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, si.default)((0, ni.default)(n), "priority", 130), (0, si.default)((0, ni.default)(n), "incompatibleTokens", ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]), n;
  }
  return (0, tm.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      var o = function(d) {
        return {
          year: d,
          isTwoDigitYear: s === "YY"
        };
      };
      switch (s) {
        case "Y":
          return (0, ut.mapValue)((0, ut.parseNDigits)(4, a), o);
        case "Yo":
          return (0, ut.mapValue)(i.ordinalNumber(a, {
            unit: "year"
          }), o);
        default:
          return (0, ut.mapValue)((0, ut.parseNDigits)(s.length, a), o);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s.isTwoDigitYear || s.year > 0;
    }
  }, {
    key: "set",
    value: function(a, s, i, o) {
      var l = (0, sm.default)(a, o);
      if (i.isTwoDigitYear) {
        var d = (0, ut.normalizeTwoDigitYear)(i.year, l);
        return a.setUTCFullYear(d, 0, o.firstWeekContainsDate), a.setUTCHours(0, 0, 0, 0), (0, ii.default)(a, o);
      }
      var u = !("era" in s) || s.era === 1 ? i.year : 1 - i.year;
      return a.setUTCFullYear(u, 0, o.firstWeekContainsDate), a.setUTCHours(0, 0, 0, 0), (0, ii.default)(a, o);
    }
  }]), r;
}(nm.Parser);
Hr.LocalWeekYearParser = im;
var Fr = {}, Ze = S.default;
Object.defineProperty(Fr, "__esModule", {
  value: !0
});
Fr.ISOWeekYearParser = void 0;
var om = Ze(z), lm = Ze(q), oi = Ze(Y), dm = Ze(j), um = Ze(V), li = Ze(U), cm = F, di = I, fm = Ze(fr), mm = /* @__PURE__ */ function(e) {
  (0, dm.default)(r, e);
  var t = (0, um.default)(r);
  function r() {
    var n;
    (0, om.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, li.default)((0, oi.default)(n), "priority", 130), (0, li.default)((0, oi.default)(n), "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]), n;
  }
  return (0, lm.default)(r, [{
    key: "parse",
    value: function(a, s) {
      return s === "R" ? (0, di.parseNDigitsSigned)(4, a) : (0, di.parseNDigitsSigned)(s.length, a);
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      var o = /* @__PURE__ */ new Date(0);
      return o.setUTCFullYear(i, 0, 4), o.setUTCHours(0, 0, 0, 0), (0, fm.default)(o);
    }
  }]), r;
}(cm.Parser);
Fr.ISOWeekYearParser = mm;
var Br = {}, Ct = S.default;
Object.defineProperty(Br, "__esModule", {
  value: !0
});
Br.ExtendedYearParser = void 0;
var hm = Ct(z), pm = Ct(q), ui = Ct(Y), vm = Ct(j), gm = Ct(V), ci = Ct(U), _m = F, fi = I, ym = /* @__PURE__ */ function(e) {
  (0, vm.default)(r, e);
  var t = (0, gm.default)(r);
  function r() {
    var n;
    (0, hm.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, ci.default)((0, ui.default)(n), "priority", 130), (0, ci.default)((0, ui.default)(n), "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]), n;
  }
  return (0, pm.default)(r, [{
    key: "parse",
    value: function(a, s) {
      return s === "u" ? (0, fi.parseNDigitsSigned)(4, a) : (0, fi.parseNDigitsSigned)(s.length, a);
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCFullYear(i, 0, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(_m.Parser);
Br.ExtendedYearParser = ym;
var Wr = {}, xt = S.default;
Object.defineProperty(Wr, "__esModule", {
  value: !0
});
Wr.QuarterParser = void 0;
var bm = xt(z), Mm = xt(q), mi = xt(Y), wm = xt(j), $m = xt(V), hi = xt(U), Tm = F, Cm = I, xm = /* @__PURE__ */ function(e) {
  (0, wm.default)(r, e);
  var t = (0, $m.default)(r);
  function r() {
    var n;
    (0, bm.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, hi.default)((0, mi.default)(n), "priority", 120), (0, hi.default)((0, mi.default)(n), "incompatibleTokens", ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]), n;
  }
  return (0, Mm.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "Q":
        case "QQ":
          return (0, Cm.parseNDigits)(s.length, a);
        case "Qo":
          return i.ordinalNumber(a, {
            unit: "quarter"
          });
        case "QQQ":
          return i.quarter(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.quarter(a, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQQ":
          return i.quarter(a, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return i.quarter(a, {
            width: "wide",
            context: "formatting"
          }) || i.quarter(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.quarter(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 1 && s <= 4;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCMonth((i - 1) * 3, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Tm.Parser);
Wr.QuarterParser = xm;
var Yr = {}, Pt = S.default;
Object.defineProperty(Yr, "__esModule", {
  value: !0
});
Yr.StandAloneQuarterParser = void 0;
var Pm = Pt(z), Sm = Pt(q), pi = Pt(Y), Dm = Pt(j), km = Pt(V), vi = Pt(U), Om = F, Am = I, Em = /* @__PURE__ */ function(e) {
  (0, Dm.default)(r, e);
  var t = (0, km.default)(r);
  function r() {
    var n;
    (0, Pm.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, vi.default)((0, pi.default)(n), "priority", 120), (0, vi.default)((0, pi.default)(n), "incompatibleTokens", ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]), n;
  }
  return (0, Sm.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "q":
        case "qq":
          return (0, Am.parseNDigits)(s.length, a);
        case "qo":
          return i.ordinalNumber(a, {
            unit: "quarter"
          });
        case "qqq":
          return i.quarter(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.quarter(a, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqqq":
          return i.quarter(a, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return i.quarter(a, {
            width: "wide",
            context: "standalone"
          }) || i.quarter(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.quarter(a, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 1 && s <= 4;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCMonth((i - 1) * 3, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Om.Parser);
Yr.StandAloneQuarterParser = Em;
var zr = {}, St = S.default;
Object.defineProperty(zr, "__esModule", {
  value: !0
});
zr.MonthParser = void 0;
var Im = St(z), Lm = St(q), gi = St(Y), Rm = St(j), Nm = St(V), _i = St(U), Jt = I, Hm = F, Fm = re, Bm = /* @__PURE__ */ function(e) {
  (0, Rm.default)(r, e);
  var t = (0, Nm.default)(r);
  function r() {
    var n;
    (0, Im.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, _i.default)((0, gi.default)(n), "incompatibleTokens", ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]), (0, _i.default)((0, gi.default)(n), "priority", 110), n;
  }
  return (0, Lm.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      var o = function(d) {
        return d - 1;
      };
      switch (s) {
        case "M":
          return (0, Jt.mapValue)((0, Jt.parseNumericPattern)(Fm.numericPatterns.month, a), o);
        case "MM":
          return (0, Jt.mapValue)((0, Jt.parseNDigits)(2, a), o);
        case "Mo":
          return (0, Jt.mapValue)(i.ordinalNumber(a, {
            unit: "month"
          }), o);
        case "MMM":
          return i.month(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.month(a, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMMM":
          return i.month(a, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return i.month(a, {
            width: "wide",
            context: "formatting"
          }) || i.month(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.month(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 0 && s <= 11;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCMonth(i, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Hm.Parser);
zr.MonthParser = Bm;
var qr = {}, Dt = S.default;
Object.defineProperty(qr, "__esModule", {
  value: !0
});
qr.StandAloneMonthParser = void 0;
var Wm = Dt(z), Ym = Dt(q), yi = Dt(Y), zm = Dt(j), qm = Dt(V), bi = Dt(U), Um = F, jm = re, Zt = I, Vm = /* @__PURE__ */ function(e) {
  (0, zm.default)(r, e);
  var t = (0, qm.default)(r);
  function r() {
    var n;
    (0, Wm.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, bi.default)((0, yi.default)(n), "priority", 110), (0, bi.default)((0, yi.default)(n), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]), n;
  }
  return (0, Ym.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      var o = function(d) {
        return d - 1;
      };
      switch (s) {
        case "L":
          return (0, Zt.mapValue)((0, Zt.parseNumericPattern)(jm.numericPatterns.month, a), o);
        case "LL":
          return (0, Zt.mapValue)((0, Zt.parseNDigits)(2, a), o);
        case "Lo":
          return (0, Zt.mapValue)(i.ordinalNumber(a, {
            unit: "month"
          }), o);
        case "LLL":
          return i.month(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.month(a, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLLL":
          return i.month(a, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return i.month(a, {
            width: "wide",
            context: "standalone"
          }) || i.month(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.month(a, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 0 && s <= 11;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCMonth(i, 1), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Um.Parser);
qr.StandAloneMonthParser = Vm;
var Ur = {}, xn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = o;
  var n = r(oe), a = r(X), s = r(_l), i = r(H);
  function o(l, d, u) {
    (0, i.default)(2, arguments);
    var c = (0, a.default)(l), m = (0, n.default)(d), g = (0, s.default)(c, u) - m;
    return c.setUTCDate(c.getUTCDate() - g * 7), c;
  }
  e.exports = t.default;
})(xn, xn.exports);
var Qm = xn.exports, Ae = S.default;
Object.defineProperty(Ur, "__esModule", {
  value: !0
});
Ur.LocalWeekParser = void 0;
var Xm = Ae(z), Gm = Ae(q), Mi = Ae(Y), Km = Ae(j), Jm = Ae(V), wi = Ae(U), Zm = F, eh = re, $i = I, th = Ae(Qm), rh = Ae(mr), ah = /* @__PURE__ */ function(e) {
  (0, Km.default)(r, e);
  var t = (0, Jm.default)(r);
  function r() {
    var n;
    (0, Xm.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, wi.default)((0, Mi.default)(n), "priority", 100), (0, wi.default)((0, Mi.default)(n), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]), n;
  }
  return (0, Gm.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "w":
          return (0, $i.parseNumericPattern)(eh.numericPatterns.week, a);
        case "wo":
          return i.ordinalNumber(a, {
            unit: "week"
          });
        default:
          return (0, $i.parseNDigits)(s.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 1 && s <= 53;
    }
  }, {
    key: "set",
    value: function(a, s, i, o) {
      return (0, rh.default)((0, th.default)(a, i, o), o);
    }
  }]), r;
}(Zm.Parser);
Ur.LocalWeekParser = ah;
var jr = {}, Pn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = o;
  var n = r(oe), a = r(X), s = r(vl), i = r(H);
  function o(l, d) {
    (0, i.default)(2, arguments);
    var u = (0, a.default)(l), c = (0, n.default)(d), m = (0, s.default)(u) - c;
    return u.setUTCDate(u.getUTCDate() - m * 7), u;
  }
  e.exports = t.default;
})(Pn, Pn.exports);
var nh = Pn.exports, Ee = S.default;
Object.defineProperty(jr, "__esModule", {
  value: !0
});
jr.ISOWeekParser = void 0;
var sh = Ee(z), ih = Ee(q), Ti = Ee(Y), oh = Ee(j), lh = Ee(V), Ci = Ee(U), dh = F, uh = re, xi = I, ch = Ee(nh), fh = Ee(fr), mh = /* @__PURE__ */ function(e) {
  (0, oh.default)(r, e);
  var t = (0, lh.default)(r);
  function r() {
    var n;
    (0, sh.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Ci.default)((0, Ti.default)(n), "priority", 100), (0, Ci.default)((0, Ti.default)(n), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]), n;
  }
  return (0, ih.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "I":
          return (0, xi.parseNumericPattern)(uh.numericPatterns.week, a);
        case "Io":
          return i.ordinalNumber(a, {
            unit: "week"
          });
        default:
          return (0, xi.parseNDigits)(s.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 1 && s <= 53;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return (0, fh.default)((0, ch.default)(a, i));
    }
  }]), r;
}(dh.Parser);
jr.ISOWeekParser = mh;
var Vr = {}, kt = S.default;
Object.defineProperty(Vr, "__esModule", {
  value: !0
});
Vr.DateParser = void 0;
var hh = kt(z), ph = kt(q), Ta = kt(Y), vh = kt(j), gh = kt(V), Ca = kt(U), xa = I, _h = F, yh = re, bh = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Mh = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], wh = /* @__PURE__ */ function(e) {
  (0, vh.default)(r, e);
  var t = (0, gh.default)(r);
  function r() {
    var n;
    (0, hh.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Ca.default)((0, Ta.default)(n), "priority", 90), (0, Ca.default)((0, Ta.default)(n), "subPriority", 1), (0, Ca.default)((0, Ta.default)(n), "incompatibleTokens", ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]), n;
  }
  return (0, ph.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "d":
          return (0, xa.parseNumericPattern)(yh.numericPatterns.date, a);
        case "do":
          return i.ordinalNumber(a, {
            unit: "date"
          });
        default:
          return (0, xa.parseNDigits)(s.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      var i = a.getUTCFullYear(), o = (0, xa.isLeapYearIndex)(i), l = a.getUTCMonth();
      return o ? s >= 1 && s <= Mh[l] : s >= 1 && s <= bh[l];
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCDate(i), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(_h.Parser);
Vr.DateParser = wh;
var Qr = {}, Ot = S.default;
Object.defineProperty(Qr, "__esModule", {
  value: !0
});
Qr.DayOfYearParser = void 0;
var $h = Ot(z), Th = Ot(q), Pa = Ot(Y), Ch = Ot(j), xh = Ot(V), Sa = Ot(U), Ph = F, Sh = re, Da = I, Dh = /* @__PURE__ */ function(e) {
  (0, Ch.default)(r, e);
  var t = (0, xh.default)(r);
  function r() {
    var n;
    (0, $h.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Sa.default)((0, Pa.default)(n), "priority", 90), (0, Sa.default)((0, Pa.default)(n), "subpriority", 1), (0, Sa.default)((0, Pa.default)(n), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]), n;
  }
  return (0, Th.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "D":
        case "DD":
          return (0, Da.parseNumericPattern)(Sh.numericPatterns.dayOfYear, a);
        case "Do":
          return i.ordinalNumber(a, {
            unit: "date"
          });
        default:
          return (0, Da.parseNDigits)(s.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      var i = a.getUTCFullYear(), o = (0, Da.isLeapYearIndex)(i);
      return o ? s >= 1 && s <= 366 : s >= 1 && s <= 365;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCMonth(0, i), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ph.Parser);
Qr.DayOfYearParser = Dh;
var Xr = {}, Sn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = o;
  var n = r(X), a = r(H), s = r(oe), i = Se;
  function o(l, d, u) {
    var c, m, g, M, E, $, _, v;
    (0, a.default)(2, arguments);
    var h = (0, i.getDefaultOptions)(), p = (0, s.default)((c = (m = (g = (M = u == null ? void 0 : u.weekStartsOn) !== null && M !== void 0 ? M : u == null || (E = u.locale) === null || E === void 0 || ($ = E.options) === null || $ === void 0 ? void 0 : $.weekStartsOn) !== null && g !== void 0 ? g : h.weekStartsOn) !== null && m !== void 0 ? m : (_ = h.locale) === null || _ === void 0 || (v = _.options) === null || v === void 0 ? void 0 : v.weekStartsOn) !== null && c !== void 0 ? c : 0);
    if (!(p >= 0 && p <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var T = (0, n.default)(l), A = (0, s.default)(d), B = T.getUTCDay(), ye = A % 7, le = (ye + 7) % 7, be = (le < p ? 7 : 0) + A - B;
    return T.setUTCDate(T.getUTCDate() + be), T;
  }
  e.exports = t.default;
})(Sn, Sn.exports);
var hs = Sn.exports, et = S.default;
Object.defineProperty(Xr, "__esModule", {
  value: !0
});
Xr.DayParser = void 0;
var kh = et(z), Oh = et(q), Pi = et(Y), Ah = et(j), Eh = et(V), Si = et(U), Ih = F, Lh = et(hs), Rh = /* @__PURE__ */ function(e) {
  (0, Ah.default)(r, e);
  var t = (0, Eh.default)(r);
  function r() {
    var n;
    (0, kh.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Si.default)((0, Pi.default)(n), "priority", 90), (0, Si.default)((0, Pi.default)(n), "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]), n;
  }
  return (0, Oh.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "E":
        case "EE":
        case "EEE":
          return i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEE":
          return i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEE":
        default:
          return i.day(a, {
            width: "wide",
            context: "formatting"
          }) || i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 0 && s <= 6;
    }
  }, {
    key: "set",
    value: function(a, s, i, o) {
      return a = (0, Lh.default)(a, i, o), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Ih.Parser);
Xr.DayParser = Rh;
var Gr = {}, tt = S.default;
Object.defineProperty(Gr, "__esModule", {
  value: !0
});
Gr.LocalDayParser = void 0;
var Nh = tt(z), Hh = tt(q), Di = tt(Y), Fh = tt(j), Bh = tt(V), ki = tt(U), Wh = F, ka = I, Yh = tt(hs), zh = /* @__PURE__ */ function(e) {
  (0, Fh.default)(r, e);
  var t = (0, Bh.default)(r);
  function r() {
    var n;
    (0, Nh.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, ki.default)((0, Di.default)(n), "priority", 90), (0, ki.default)((0, Di.default)(n), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]), n;
  }
  return (0, Hh.default)(r, [{
    key: "parse",
    value: function(a, s, i, o) {
      var l = function(u) {
        var c = Math.floor((u - 1) / 7) * 7;
        return (u + o.weekStartsOn + 6) % 7 + c;
      };
      switch (s) {
        case "e":
        case "ee":
          return (0, ka.mapValue)((0, ka.parseNDigits)(s.length, a), l);
        case "eo":
          return (0, ka.mapValue)(i.ordinalNumber(a, {
            unit: "day"
          }), l);
        case "eee":
          return i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeee":
          return i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
        case "eeee":
        default:
          return i.day(a, {
            width: "wide",
            context: "formatting"
          }) || i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 0 && s <= 6;
    }
  }, {
    key: "set",
    value: function(a, s, i, o) {
      return a = (0, Yh.default)(a, i, o), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Wh.Parser);
Gr.LocalDayParser = zh;
var Kr = {}, rt = S.default;
Object.defineProperty(Kr, "__esModule", {
  value: !0
});
Kr.StandAloneLocalDayParser = void 0;
var qh = rt(z), Uh = rt(q), Oi = rt(Y), jh = rt(j), Vh = rt(V), Ai = rt(U), Qh = F, Oa = I, Xh = rt(hs), Gh = /* @__PURE__ */ function(e) {
  (0, jh.default)(r, e);
  var t = (0, Vh.default)(r);
  function r() {
    var n;
    (0, qh.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Ai.default)((0, Oi.default)(n), "priority", 90), (0, Ai.default)((0, Oi.default)(n), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]), n;
  }
  return (0, Uh.default)(r, [{
    key: "parse",
    value: function(a, s, i, o) {
      var l = function(u) {
        var c = Math.floor((u - 1) / 7) * 7;
        return (u + o.weekStartsOn + 6) % 7 + c;
      };
      switch (s) {
        case "c":
        case "cc":
          return (0, Oa.mapValue)((0, Oa.parseNDigits)(s.length, a), l);
        case "co":
          return (0, Oa.mapValue)(i.ordinalNumber(a, {
            unit: "day"
          }), l);
        case "ccc":
          return i.day(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.day(a, {
            width: "short",
            context: "standalone"
          }) || i.day(a, {
            width: "narrow",
            context: "standalone"
          });
        case "ccccc":
          return i.day(a, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return i.day(a, {
            width: "short",
            context: "standalone"
          }) || i.day(a, {
            width: "narrow",
            context: "standalone"
          });
        case "cccc":
        default:
          return i.day(a, {
            width: "wide",
            context: "standalone"
          }) || i.day(a, {
            width: "abbreviated",
            context: "standalone"
          }) || i.day(a, {
            width: "short",
            context: "standalone"
          }) || i.day(a, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 0 && s <= 6;
    }
  }, {
    key: "set",
    value: function(a, s, i, o) {
      return a = (0, Xh.default)(a, i, o), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(Qh.Parser);
Kr.StandAloneLocalDayParser = Gh;
var Jr = {}, Dn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i;
  var n = r(X), a = r(H), s = r(oe);
  function i(o, l) {
    (0, a.default)(2, arguments);
    var d = (0, s.default)(l);
    d % 7 === 0 && (d = d - 7);
    var u = 1, c = (0, n.default)(o), m = c.getUTCDay(), g = d % 7, M = (g + 7) % 7, E = (M < u ? 7 : 0) + d - m;
    return c.setUTCDate(c.getUTCDate() + E), c;
  }
  e.exports = t.default;
})(Dn, Dn.exports);
var Kh = Dn.exports, at = S.default;
Object.defineProperty(Jr, "__esModule", {
  value: !0
});
Jr.ISODayParser = void 0;
var Jh = at(z), Zh = at(q), Ei = at(Y), ep = at(j), tp = at(V), Ii = at(U), rp = F, er = I, ap = at(Kh), np = /* @__PURE__ */ function(e) {
  (0, ep.default)(r, e);
  var t = (0, tp.default)(r);
  function r() {
    var n;
    (0, Jh.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Ii.default)((0, Ei.default)(n), "priority", 90), (0, Ii.default)((0, Ei.default)(n), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]), n;
  }
  return (0, Zh.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      var o = function(d) {
        return d === 0 ? 7 : d;
      };
      switch (s) {
        case "i":
        case "ii":
          return (0, er.parseNDigits)(s.length, a);
        case "io":
          return i.ordinalNumber(a, {
            unit: "day"
          });
        case "iii":
          return (0, er.mapValue)(i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          }), o);
        case "iiiii":
          return (0, er.mapValue)(i.day(a, {
            width: "narrow",
            context: "formatting"
          }), o);
        case "iiiiii":
          return (0, er.mapValue)(i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          }), o);
        case "iiii":
        default:
          return (0, er.mapValue)(i.day(a, {
            width: "wide",
            context: "formatting"
          }) || i.day(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.day(a, {
            width: "short",
            context: "formatting"
          }) || i.day(a, {
            width: "narrow",
            context: "formatting"
          }), o);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 1 && s <= 7;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a = (0, ap.default)(a, i), a.setUTCHours(0, 0, 0, 0), a;
    }
  }]), r;
}(rp.Parser);
Jr.ISODayParser = np;
var Zr = {}, At = S.default;
Object.defineProperty(Zr, "__esModule", {
  value: !0
});
Zr.AMPMParser = void 0;
var sp = At(z), ip = At(q), Li = At(Y), op = At(j), lp = At(V), Ri = At(U), dp = F, up = I, cp = /* @__PURE__ */ function(e) {
  (0, op.default)(r, e);
  var t = (0, lp.default)(r);
  function r() {
    var n;
    (0, sp.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Ri.default)((0, Li.default)(n), "priority", 80), (0, Ri.default)((0, Li.default)(n), "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]), n;
  }
  return (0, ip.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "a":
        case "aa":
        case "aaa":
          return i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaaa":
          return i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return i.dayPeriod(a, {
            width: "wide",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCHours((0, up.dayPeriodEnumToHours)(i), 0, 0, 0), a;
    }
  }]), r;
}(dp.Parser);
Zr.AMPMParser = cp;
var ea = {}, Et = S.default;
Object.defineProperty(ea, "__esModule", {
  value: !0
});
ea.AMPMMidnightParser = void 0;
var fp = Et(z), mp = Et(q), Ni = Et(Y), hp = Et(j), pp = Et(V), Hi = Et(U), vp = F, gp = I, _p = /* @__PURE__ */ function(e) {
  (0, hp.default)(r, e);
  var t = (0, pp.default)(r);
  function r() {
    var n;
    (0, fp.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Hi.default)((0, Ni.default)(n), "priority", 80), (0, Hi.default)((0, Ni.default)(n), "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]), n;
  }
  return (0, mp.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "b":
        case "bb":
        case "bbb":
          return i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbbb":
          return i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return i.dayPeriod(a, {
            width: "wide",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCHours((0, gp.dayPeriodEnumToHours)(i), 0, 0, 0), a;
    }
  }]), r;
}(vp.Parser);
ea.AMPMMidnightParser = _p;
var ta = {}, It = S.default;
Object.defineProperty(ta, "__esModule", {
  value: !0
});
ta.DayPeriodParser = void 0;
var yp = It(z), bp = It(q), Fi = It(Y), Mp = It(j), wp = It(V), Bi = It(U), $p = F, Tp = I, Cp = /* @__PURE__ */ function(e) {
  (0, Mp.default)(r, e);
  var t = (0, wp.default)(r);
  function r() {
    var n;
    (0, yp.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Bi.default)((0, Fi.default)(n), "priority", 80), (0, Bi.default)((0, Fi.default)(n), "incompatibleTokens", ["a", "b", "t", "T"]), n;
  }
  return (0, bp.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "B":
        case "BB":
        case "BBB":
          return i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBBB":
          return i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return i.dayPeriod(a, {
            width: "wide",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting"
          }) || i.dayPeriod(a, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCHours((0, Tp.dayPeriodEnumToHours)(i), 0, 0, 0), a;
    }
  }]), r;
}($p.Parser);
ta.DayPeriodParser = Cp;
var ra = {}, Lt = S.default;
Object.defineProperty(ra, "__esModule", {
  value: !0
});
ra.Hour1to12Parser = void 0;
var xp = Lt(z), Pp = Lt(q), Wi = Lt(Y), Sp = Lt(j), Dp = Lt(V), Yi = Lt(U), kp = F, Op = re, zi = I, Ap = /* @__PURE__ */ function(e) {
  (0, Sp.default)(r, e);
  var t = (0, Dp.default)(r);
  function r() {
    var n;
    (0, xp.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Yi.default)((0, Wi.default)(n), "priority", 70), (0, Yi.default)((0, Wi.default)(n), "incompatibleTokens", ["H", "K", "k", "t", "T"]), n;
  }
  return (0, Pp.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "h":
          return (0, zi.parseNumericPattern)(Op.numericPatterns.hour12h, a);
        case "ho":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return (0, zi.parseNDigits)(s.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 1 && s <= 12;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      var o = a.getUTCHours() >= 12;
      return o && i < 12 ? a.setUTCHours(i + 12, 0, 0, 0) : !o && i === 12 ? a.setUTCHours(0, 0, 0, 0) : a.setUTCHours(i, 0, 0, 0), a;
    }
  }]), r;
}(kp.Parser);
ra.Hour1to12Parser = Ap;
var aa = {}, Rt = S.default;
Object.defineProperty(aa, "__esModule", {
  value: !0
});
aa.Hour0to23Parser = void 0;
var Ep = Rt(z), Ip = Rt(q), qi = Rt(Y), Lp = Rt(j), Rp = Rt(V), Ui = Rt(U), Np = F, Hp = re, ji = I, Fp = /* @__PURE__ */ function(e) {
  (0, Lp.default)(r, e);
  var t = (0, Rp.default)(r);
  function r() {
    var n;
    (0, Ep.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Ui.default)((0, qi.default)(n), "priority", 70), (0, Ui.default)((0, qi.default)(n), "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]), n;
  }
  return (0, Ip.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "H":
          return (0, ji.parseNumericPattern)(Hp.numericPatterns.hour23h, a);
        case "Ho":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return (0, ji.parseNDigits)(s.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 0 && s <= 23;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCHours(i, 0, 0, 0), a;
    }
  }]), r;
}(Np.Parser);
aa.Hour0to23Parser = Fp;
var na = {}, Nt = S.default;
Object.defineProperty(na, "__esModule", {
  value: !0
});
na.Hour0To11Parser = void 0;
var Bp = Nt(z), Wp = Nt(q), Vi = Nt(Y), Yp = Nt(j), zp = Nt(V), Qi = Nt(U), qp = F, Up = re, Xi = I, jp = /* @__PURE__ */ function(e) {
  (0, Yp.default)(r, e);
  var t = (0, zp.default)(r);
  function r() {
    var n;
    (0, Bp.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Qi.default)((0, Vi.default)(n), "priority", 70), (0, Qi.default)((0, Vi.default)(n), "incompatibleTokens", ["h", "H", "k", "t", "T"]), n;
  }
  return (0, Wp.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "K":
          return (0, Xi.parseNumericPattern)(Up.numericPatterns.hour11h, a);
        case "Ko":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return (0, Xi.parseNDigits)(s.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 0 && s <= 11;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      var o = a.getUTCHours() >= 12;
      return o && i < 12 ? a.setUTCHours(i + 12, 0, 0, 0) : a.setUTCHours(i, 0, 0, 0), a;
    }
  }]), r;
}(qp.Parser);
na.Hour0To11Parser = jp;
var sa = {}, Ht = S.default;
Object.defineProperty(sa, "__esModule", {
  value: !0
});
sa.Hour1To24Parser = void 0;
var Vp = Ht(z), Qp = Ht(q), Gi = Ht(Y), Xp = Ht(j), Gp = Ht(V), Ki = Ht(U), Kp = F, Jp = re, Ji = I, Zp = /* @__PURE__ */ function(e) {
  (0, Xp.default)(r, e);
  var t = (0, Gp.default)(r);
  function r() {
    var n;
    (0, Vp.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, Ki.default)((0, Gi.default)(n), "priority", 70), (0, Ki.default)((0, Gi.default)(n), "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]), n;
  }
  return (0, Qp.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "k":
          return (0, Ji.parseNumericPattern)(Jp.numericPatterns.hour24h, a);
        case "ko":
          return i.ordinalNumber(a, {
            unit: "hour"
          });
        default:
          return (0, Ji.parseNDigits)(s.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 1 && s <= 24;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      var o = i <= 24 ? i % 24 : i;
      return a.setUTCHours(o, 0, 0, 0), a;
    }
  }]), r;
}(Kp.Parser);
sa.Hour1To24Parser = Zp;
var ia = {}, Ft = S.default;
Object.defineProperty(ia, "__esModule", {
  value: !0
});
ia.MinuteParser = void 0;
var ev = Ft(z), tv = Ft(q), Zi = Ft(Y), rv = Ft(j), av = Ft(V), eo = Ft(U), nv = F, sv = re, to = I, iv = /* @__PURE__ */ function(e) {
  (0, rv.default)(r, e);
  var t = (0, av.default)(r);
  function r() {
    var n;
    (0, ev.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, eo.default)((0, Zi.default)(n), "priority", 60), (0, eo.default)((0, Zi.default)(n), "incompatibleTokens", ["t", "T"]), n;
  }
  return (0, tv.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "m":
          return (0, to.parseNumericPattern)(sv.numericPatterns.minute, a);
        case "mo":
          return i.ordinalNumber(a, {
            unit: "minute"
          });
        default:
          return (0, to.parseNDigits)(s.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 0 && s <= 59;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCMinutes(i, 0, 0), a;
    }
  }]), r;
}(nv.Parser);
ia.MinuteParser = iv;
var oa = {}, Bt = S.default;
Object.defineProperty(oa, "__esModule", {
  value: !0
});
oa.SecondParser = void 0;
var ov = Bt(z), lv = Bt(q), ro = Bt(Y), dv = Bt(j), uv = Bt(V), ao = Bt(U), cv = F, fv = re, no = I, mv = /* @__PURE__ */ function(e) {
  (0, dv.default)(r, e);
  var t = (0, uv.default)(r);
  function r() {
    var n;
    (0, ov.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, ao.default)((0, ro.default)(n), "priority", 50), (0, ao.default)((0, ro.default)(n), "incompatibleTokens", ["t", "T"]), n;
  }
  return (0, lv.default)(r, [{
    key: "parse",
    value: function(a, s, i) {
      switch (s) {
        case "s":
          return (0, no.parseNumericPattern)(fv.numericPatterns.second, a);
        case "so":
          return i.ordinalNumber(a, {
            unit: "second"
          });
        default:
          return (0, no.parseNDigits)(s.length, a);
      }
    }
  }, {
    key: "validate",
    value: function(a, s) {
      return s >= 0 && s <= 59;
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCSeconds(i, 0), a;
    }
  }]), r;
}(cv.Parser);
oa.SecondParser = mv;
var la = {}, Wt = S.default;
Object.defineProperty(la, "__esModule", {
  value: !0
});
la.FractionOfSecondParser = void 0;
var hv = Wt(z), pv = Wt(q), so = Wt(Y), vv = Wt(j), gv = Wt(V), io = Wt(U), _v = F, oo = I, yv = /* @__PURE__ */ function(e) {
  (0, vv.default)(r, e);
  var t = (0, gv.default)(r);
  function r() {
    var n;
    (0, hv.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, io.default)((0, so.default)(n), "priority", 30), (0, io.default)((0, so.default)(n), "incompatibleTokens", ["t", "T"]), n;
  }
  return (0, pv.default)(r, [{
    key: "parse",
    value: function(a, s) {
      var i = function(l) {
        return Math.floor(l * Math.pow(10, -s.length + 3));
      };
      return (0, oo.mapValue)((0, oo.parseNDigits)(s.length, a), i);
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return a.setUTCMilliseconds(i), a;
    }
  }]), r;
}(_v.Parser);
la.FractionOfSecondParser = yv;
var da = {}, Yt = S.default;
Object.defineProperty(da, "__esModule", {
  value: !0
});
da.ISOTimezoneWithZParser = void 0;
var bv = Yt(z), Mv = Yt(q), lo = Yt(Y), wv = Yt(j), $v = Yt(V), uo = Yt(U), Tv = F, tr = re, rr = I, Cv = /* @__PURE__ */ function(e) {
  (0, wv.default)(r, e);
  var t = (0, $v.default)(r);
  function r() {
    var n;
    (0, bv.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, uo.default)((0, lo.default)(n), "priority", 10), (0, uo.default)((0, lo.default)(n), "incompatibleTokens", ["t", "T", "x"]), n;
  }
  return (0, Mv.default)(r, [{
    key: "parse",
    value: function(a, s) {
      switch (s) {
        case "X":
          return (0, rr.parseTimezonePattern)(tr.timezonePatterns.basicOptionalMinutes, a);
        case "XX":
          return (0, rr.parseTimezonePattern)(tr.timezonePatterns.basic, a);
        case "XXXX":
          return (0, rr.parseTimezonePattern)(tr.timezonePatterns.basicOptionalSeconds, a);
        case "XXXXX":
          return (0, rr.parseTimezonePattern)(tr.timezonePatterns.extendedOptionalSeconds, a);
        case "XXX":
        default:
          return (0, rr.parseTimezonePattern)(tr.timezonePatterns.extended, a);
      }
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return s.timestampIsSet ? a : new Date(a.getTime() - i);
    }
  }]), r;
}(Tv.Parser);
da.ISOTimezoneWithZParser = Cv;
var ua = {}, zt = S.default;
Object.defineProperty(ua, "__esModule", {
  value: !0
});
ua.ISOTimezoneParser = void 0;
var xv = zt(z), Pv = zt(q), co = zt(Y), Sv = zt(j), Dv = zt(V), fo = zt(U), kv = F, ar = re, nr = I, Ov = /* @__PURE__ */ function(e) {
  (0, Sv.default)(r, e);
  var t = (0, Dv.default)(r);
  function r() {
    var n;
    (0, xv.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, fo.default)((0, co.default)(n), "priority", 10), (0, fo.default)((0, co.default)(n), "incompatibleTokens", ["t", "T", "X"]), n;
  }
  return (0, Pv.default)(r, [{
    key: "parse",
    value: function(a, s) {
      switch (s) {
        case "x":
          return (0, nr.parseTimezonePattern)(ar.timezonePatterns.basicOptionalMinutes, a);
        case "xx":
          return (0, nr.parseTimezonePattern)(ar.timezonePatterns.basic, a);
        case "xxxx":
          return (0, nr.parseTimezonePattern)(ar.timezonePatterns.basicOptionalSeconds, a);
        case "xxxxx":
          return (0, nr.parseTimezonePattern)(ar.timezonePatterns.extendedOptionalSeconds, a);
        case "xxx":
        default:
          return (0, nr.parseTimezonePattern)(ar.timezonePatterns.extended, a);
      }
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return s.timestampIsSet ? a : new Date(a.getTime() - i);
    }
  }]), r;
}(kv.Parser);
ua.ISOTimezoneParser = Ov;
var ca = {}, qt = S.default;
Object.defineProperty(ca, "__esModule", {
  value: !0
});
ca.TimestampSecondsParser = void 0;
var Av = qt(z), Ev = qt(q), mo = qt(Y), Iv = qt(j), Lv = qt(V), ho = qt(U), Rv = F, Nv = I, Hv = /* @__PURE__ */ function(e) {
  (0, Iv.default)(r, e);
  var t = (0, Lv.default)(r);
  function r() {
    var n;
    (0, Av.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, ho.default)((0, mo.default)(n), "priority", 40), (0, ho.default)((0, mo.default)(n), "incompatibleTokens", "*"), n;
  }
  return (0, Ev.default)(r, [{
    key: "parse",
    value: function(a) {
      return (0, Nv.parseAnyDigitsSigned)(a);
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return [new Date(i * 1e3), {
        timestampIsSet: !0
      }];
    }
  }]), r;
}(Rv.Parser);
ca.TimestampSecondsParser = Hv;
var fa = {}, Ut = S.default;
Object.defineProperty(fa, "__esModule", {
  value: !0
});
fa.TimestampMillisecondsParser = void 0;
var Fv = Ut(z), Bv = Ut(q), po = Ut(Y), Wv = Ut(j), Yv = Ut(V), vo = Ut(U), zv = F, qv = I, Uv = /* @__PURE__ */ function(e) {
  (0, Wv.default)(r, e);
  var t = (0, Yv.default)(r);
  function r() {
    var n;
    (0, Fv.default)(this, r);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++)
      s[i] = arguments[i];
    return n = t.call.apply(t, [this].concat(s)), (0, vo.default)((0, po.default)(n), "priority", 20), (0, vo.default)((0, po.default)(n), "incompatibleTokens", "*"), n;
  }
  return (0, Bv.default)(r, [{
    key: "parse",
    value: function(a) {
      return (0, qv.parseAnyDigitsSigned)(a);
    }
  }, {
    key: "set",
    value: function(a, s, i) {
      return [new Date(i), {
        timestampIsSet: !0
      }];
    }
  }]), r;
}(zv.Parser);
fa.TimestampMillisecondsParser = Uv;
Object.defineProperty(Lr, "__esModule", {
  value: !0
});
Lr.parsers = void 0;
var jv = Rr, Vv = Nr, Qv = Hr, Xv = Fr, Gv = Br, Kv = Wr, Jv = Yr, Zv = zr, eg = qr, tg = Ur, rg = jr, ag = Vr, ng = Qr, sg = Xr, ig = Gr, og = Kr, lg = Jr, dg = Zr, ug = ea, cg = ta, fg = ra, mg = aa, hg = na, pg = sa, vg = ia, gg = oa, _g = la, yg = da, bg = ua, Mg = ca, wg = fa, $g = {
  G: new jv.EraParser(),
  y: new Vv.YearParser(),
  Y: new Qv.LocalWeekYearParser(),
  R: new Xv.ISOWeekYearParser(),
  u: new Gv.ExtendedYearParser(),
  Q: new Kv.QuarterParser(),
  q: new Jv.StandAloneQuarterParser(),
  M: new Zv.MonthParser(),
  L: new eg.StandAloneMonthParser(),
  w: new tg.LocalWeekParser(),
  I: new rg.ISOWeekParser(),
  d: new ag.DateParser(),
  D: new ng.DayOfYearParser(),
  E: new sg.DayParser(),
  e: new ig.LocalDayParser(),
  c: new og.StandAloneLocalDayParser(),
  i: new lg.ISODayParser(),
  a: new dg.AMPMParser(),
  b: new ug.AMPMMidnightParser(),
  B: new cg.DayPeriodParser(),
  h: new fg.Hour1to12Parser(),
  H: new mg.Hour0to23Parser(),
  K: new hg.Hour0To11Parser(),
  k: new pg.Hour1To24Parser(),
  m: new vg.MinuteParser(),
  s: new gg.SecondParser(),
  S: new _g.FractionOfSecondParser(),
  X: new yg.ISOTimezoneWithZParser(),
  x: new bg.ISOTimezoneParser(),
  t: new Mg.TimestampSecondsParser(),
  T: new wg.TimestampMillisecondsParser()
};
Lr.parsers = $g;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = B;
  var n = r(bt), a = r(sf), s = r(wl), i = r(hl), o = r(X), l = r(of), d = r(bl), u = r(Ml), c = Mt, m = r(oe), g = r(H), M = Ce, E = Lr, $ = Se, _ = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, v = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, h = /^'([^]*?)'?$/, p = /''/g, T = /\S/, A = /[a-zA-Z]/;
  function B(le, be, st, K) {
    var Ie, Le, Re, Ne, He, Fe, Be, We, Ye, ze, qe, Ue, je, Qt, Me, we, Ve, Qe;
    (0, g.default)(3, arguments);
    var ce = String(le), it = String(be), Xe = (0, $.getDefaultOptions)(), ot = (Ie = (Le = K == null ? void 0 : K.locale) !== null && Le !== void 0 ? Le : Xe.locale) !== null && Ie !== void 0 ? Ie : s.default;
    if (!ot.match)
      throw new RangeError("locale must contain match property");
    var Xt = (0, m.default)((Re = (Ne = (He = (Fe = K == null ? void 0 : K.firstWeekContainsDate) !== null && Fe !== void 0 ? Fe : K == null || (Be = K.locale) === null || Be === void 0 || (We = Be.options) === null || We === void 0 ? void 0 : We.firstWeekContainsDate) !== null && He !== void 0 ? He : Xe.firstWeekContainsDate) !== null && Ne !== void 0 ? Ne : (Ye = Xe.locale) === null || Ye === void 0 || (ze = Ye.options) === null || ze === void 0 ? void 0 : ze.firstWeekContainsDate) !== null && Re !== void 0 ? Re : 1);
    if (!(Xt >= 1 && Xt <= 7))
      throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    var ie = (0, m.default)((qe = (Ue = (je = (Qt = K == null ? void 0 : K.weekStartsOn) !== null && Qt !== void 0 ? Qt : K == null || (Me = K.locale) === null || Me === void 0 || (we = Me.options) === null || we === void 0 ? void 0 : we.weekStartsOn) !== null && je !== void 0 ? je : Xe.weekStartsOn) !== null && Ue !== void 0 ? Ue : (Ve = Xe.locale) === null || Ve === void 0 || (Qe = Ve.options) === null || Qe === void 0 ? void 0 : Qe.weekStartsOn) !== null && qe !== void 0 ? qe : 0);
    if (!(ie >= 0 && ie <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    if (it === "")
      return ce === "" ? (0, o.default)(st) : /* @__PURE__ */ new Date(NaN);
    var fe = {
      firstWeekContainsDate: Xt,
      weekStartsOn: ie,
      locale: ot
    }, De = [new M.DateToSystemTimezoneSetter()], vd = it.match(v).map(function(ae) {
      var G = ae[0];
      if (G in d.default) {
        var me = d.default[G];
        return me(ae, ot.formatLong);
      }
      return ae;
    }).join("").match(_), ha = [], gr = (0, a.default)(vd), Ts;
    try {
      var gd = function() {
        var G = Ts.value;
        !(K != null && K.useAdditionalWeekYearTokens) && (0, c.isProtectedWeekYearToken)(G) && (0, c.throwProtectedError)(G, it, le), !(K != null && K.useAdditionalDayOfYearTokens) && (0, c.isProtectedDayOfYearToken)(G) && (0, c.throwProtectedError)(G, it, le);
        var me = G[0], br = E.parsers[me];
        if (br) {
          var Ds = br.incompatibleTokens;
          if (Array.isArray(Ds)) {
            var ks = ha.find(function(Os) {
              return Ds.includes(Os.token) || Os.token === me;
            });
            if (ks)
              throw new RangeError("The format string mustn't contain `".concat(ks.fullToken, "` and `").concat(G, "` at the same time"));
          } else if (br.incompatibleTokens === "*" && ha.length > 0)
            throw new RangeError("The format string mustn't contain `".concat(G, "` and any other token at the same time"));
          ha.push({
            token: me,
            fullToken: G
          });
          var va = br.run(ce, G, ot.match, fe);
          if (!va)
            return {
              v: /* @__PURE__ */ new Date(NaN)
            };
          De.push(va.setter), ce = va.rest;
        } else {
          if (me.match(A))
            throw new RangeError("Format string contains an unescaped latin alphabet character `" + me + "`");
          if (G === "''" ? G = "'" : me === "'" && (G = ye(G)), ce.indexOf(G) === 0)
            ce = ce.slice(G.length);
          else
            return {
              v: /* @__PURE__ */ new Date(NaN)
            };
        }
      };
      for (gr.s(); !(Ts = gr.n()).done; ) {
        var Cs = gd();
        if ((0, n.default)(Cs) === "object")
          return Cs.v;
      }
    } catch (ae) {
      gr.e(ae);
    } finally {
      gr.f();
    }
    if (ce.length > 0 && T.test(ce))
      return /* @__PURE__ */ new Date(NaN);
    var _d = De.map(function(ae) {
      return ae.priority;
    }).sort(function(ae, G) {
      return G - ae;
    }).filter(function(ae, G, me) {
      return me.indexOf(ae) === G;
    }).map(function(ae) {
      return De.filter(function(G) {
        return G.priority === ae;
      }).sort(function(G, me) {
        return me.subPriority - G.subPriority;
      });
    }).map(function(ae) {
      return ae[0];
    }), pa = (0, o.default)(st);
    if (isNaN(pa.getTime()))
      return /* @__PURE__ */ new Date(NaN);
    var Gt = (0, i.default)(pa, (0, u.default)(pa)), xs = {}, _r = (0, a.default)(_d), Ps;
    try {
      for (_r.s(); !(Ps = _r.n()).done; ) {
        var Ss = Ps.value;
        if (!Ss.validate(Gt, fe))
          return /* @__PURE__ */ new Date(NaN);
        var yr = Ss.set(Gt, xs, fe);
        Array.isArray(yr) ? (Gt = yr[0], (0, l.default)(xs, yr[1])) : Gt = yr;
      }
    } catch (ae) {
      _r.e(ae);
    } finally {
      _r.f();
    }
    return Gt;
  }
  function ye(le) {
    return le.match(h)[1].replace(p, "'");
  }
  e.exports = t.default;
})(Tn, Tn.exports);
var Tg = Tn.exports;
const Aa = /* @__PURE__ */ se(Tg);
var kn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i;
  var n = r(oe), a = r(X), s = r(H);
  function i(o, l) {
    (0, s.default)(2, arguments);
    var d = (0, a.default)(o), u = (0, n.default)(l);
    if (isNaN(u))
      return /* @__PURE__ */ new Date(NaN);
    if (!u)
      return d;
    var c = d.getDate(), m = new Date(d.getTime());
    m.setMonth(d.getMonth() + u + 1, 0);
    var g = m.getDate();
    return c >= g ? m : (d.setFullYear(m.getFullYear(), m.getMonth(), c), d);
  }
  e.exports = t.default;
})(kn, kn.exports);
var jl = kn.exports;
const Cg = /* @__PURE__ */ se(jl);
var On = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(X), a = r(H);
  function s(i) {
    (0, a.default)(1, arguments);
    var o = (0, n.default)(i);
    return o.setDate(1), o.setHours(0, 0, 0, 0), o;
  }
  e.exports = t.default;
})(On, On.exports);
var xg = On.exports;
const Pg = /* @__PURE__ */ se(xg);
var An = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i;
  var n = r(oe), a = r(jl), s = r(H);
  function i(o, l) {
    (0, s.default)(2, arguments);
    var d = (0, n.default)(l);
    return (0, a.default)(o, -d);
  }
  e.exports = t.default;
})(An, An.exports);
var Sg = An.exports;
const Dg = /* @__PURE__ */ se(Sg);
var En = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(X), a = r(H);
  function s(i) {
    (0, a.default)(1, arguments);
    var o = (0, n.default)(i), l = o.getDate();
    return l;
  }
  e.exports = t.default;
})(En, En.exports);
var kg = En.exports;
const go = /* @__PURE__ */ se(kg);
var In = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(X), a = r(H);
  function s(i) {
    (0, a.default)(1, arguments);
    var o = (0, n.default)(i), l = o.getDay();
    return l;
  }
  e.exports = t.default;
})(In, In.exports);
var Og = In.exports;
const _o = /* @__PURE__ */ se(Og);
var Ln = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(X), a = r(H);
  function s(i) {
    (0, a.default)(1, arguments);
    var o = (0, n.default)(i), l = o.getFullYear(), d = o.getMonth(), u = /* @__PURE__ */ new Date(0);
    return u.setFullYear(l, d + 1, 0), u.setHours(0, 0, 0, 0), u.getDate();
  }
  e.exports = t.default;
})(Ln, Ln.exports);
var Vl = Ln.exports;
const Ag = /* @__PURE__ */ se(Vl);
var Rn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(X), a = r(H);
  function s(i) {
    (0, a.default)(1, arguments);
    var o = (0, n.default)(i), l = o.getMonth();
    return l;
  }
  e.exports = t.default;
})(Rn, Rn.exports);
var Eg = Rn.exports;
const Ea = /* @__PURE__ */ se(Eg);
var Nn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(X), a = r(H);
  function s(i) {
    return (0, a.default)(1, arguments), (0, n.default)(i).getFullYear();
  }
  e.exports = t.default;
})(Nn, Nn.exports);
var Ig = Nn.exports;
const Ia = /* @__PURE__ */ se(Ig);
var Hn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(X), a = r(H);
  function s(i, o) {
    (0, a.default)(2, arguments);
    var l = (0, n.default)(i), d = (0, n.default)(o);
    return l.getTime() === d.getTime();
  }
  e.exports = t.default;
})(Hn, Hn.exports);
var Lg = Hn.exports;
const Rg = /* @__PURE__ */ se(Lg);
var Fn = { exports: {} }, Bn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(X), a = r(H);
  function s(i) {
    (0, a.default)(1, arguments);
    var o = (0, n.default)(i);
    return o.setHours(0, 0, 0, 0), o;
  }
  e.exports = t.default;
})(Bn, Bn.exports);
var Ng = Bn.exports;
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = s;
  var n = r(Ng), a = r(H);
  function s(i, o) {
    (0, a.default)(2, arguments);
    var l = (0, n.default)(i), d = (0, n.default)(o);
    return l.getTime() === d.getTime();
  }
  e.exports = t.default;
})(Fn, Fn.exports);
var Hg = Fn.exports;
const yo = /* @__PURE__ */ se(Hg);
var Wn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i;
  var n = r(oe), a = r(X), s = r(H);
  function i(o, l) {
    (0, s.default)(2, arguments);
    var d = (0, a.default)(o), u = (0, n.default)(l);
    return d.setDate(u), d;
  }
  e.exports = t.default;
})(Wn, Wn.exports);
var Fg = Wn.exports;
const wr = /* @__PURE__ */ se(Fg);
var Yn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = o;
  var n = r(oe), a = r(X), s = r(Vl), i = r(H);
  function o(l, d) {
    (0, i.default)(2, arguments);
    var u = (0, a.default)(l), c = (0, n.default)(d), m = u.getFullYear(), g = u.getDate(), M = /* @__PURE__ */ new Date(0);
    M.setFullYear(m, c, 15), M.setHours(0, 0, 0, 0);
    var E = (0, s.default)(M);
    return u.setMonth(c, Math.min(g, E)), u;
  }
  e.exports = t.default;
})(Yn, Yn.exports);
var Bg = Yn.exports;
const Wg = /* @__PURE__ */ se(Bg);
var zn = { exports: {} };
(function(e, t) {
  var r = S.default;
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = i;
  var n = r(oe), a = r(X), s = r(H);
  function i(o, l) {
    (0, s.default)(2, arguments);
    var d = (0, a.default)(o), u = (0, n.default)(l);
    return isNaN(d.getTime()) ? /* @__PURE__ */ new Date(NaN) : (d.setFullYear(u), d);
  }
  e.exports = t.default;
})(zn, zn.exports);
var Yg = zn.exports;
const zg = /* @__PURE__ */ se(Yg);
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var hr = typeof window < "u" && typeof document < "u" && typeof navigator < "u", qg = function() {
  for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
    if (hr && navigator.userAgent.indexOf(e[t]) >= 0)
      return 1;
  return 0;
}();
function Ug(e) {
  var t = !1;
  return function() {
    t || (t = !0, window.Promise.resolve().then(function() {
      t = !1, e();
    }));
  };
}
function jg(e) {
  var t = !1;
  return function() {
    t || (t = !0, setTimeout(function() {
      t = !1, e();
    }, qg));
  };
}
var Vg = hr && window.Promise, Qg = Vg ? Ug : jg;
function Ql(e) {
  var t = {};
  return e && t.toString.call(e) === "[object Function]";
}
function nt(e, t) {
  if (e.nodeType !== 1)
    return [];
  var r = e.ownerDocument.defaultView, n = r.getComputedStyle(e, null);
  return t ? n[t] : n;
}
function ps(e) {
  return e.nodeName === "HTML" ? e : e.parentNode || e.host;
}
function pr(e) {
  if (!e)
    return document.body;
  switch (e.nodeName) {
    case "HTML":
    case "BODY":
      return e.ownerDocument.body;
    case "#document":
      return e.body;
  }
  var t = nt(e), r = t.overflow, n = t.overflowX, a = t.overflowY;
  return /(auto|scroll|overlay)/.test(r + a + n) ? e : pr(ps(e));
}
function Xl(e) {
  return e && e.referenceNode ? e.referenceNode : e;
}
var bo = hr && !!(window.MSInputMethodContext && document.documentMode), Mo = hr && /MSIE 10/.test(navigator.userAgent);
function jt(e) {
  return e === 11 ? bo : e === 10 ? Mo : bo || Mo;
}
function vt(e) {
  if (!e)
    return document.documentElement;
  for (var t = jt(10) ? document.body : null, r = e.offsetParent || null; r === t && e.nextElementSibling; )
    r = (e = e.nextElementSibling).offsetParent;
  var n = r && r.nodeName;
  return !n || n === "BODY" || n === "HTML" ? e ? e.ownerDocument.documentElement : document.documentElement : ["TH", "TD", "TABLE"].indexOf(r.nodeName) !== -1 && nt(r, "position") === "static" ? vt(r) : r;
}
function Xg(e) {
  var t = e.nodeName;
  return t === "BODY" ? !1 : t === "HTML" || vt(e.firstElementChild) === e;
}
function qn(e) {
  return e.parentNode !== null ? qn(e.parentNode) : e;
}
function Pr(e, t) {
  if (!e || !e.nodeType || !t || !t.nodeType)
    return document.documentElement;
  var r = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, n = r ? e : t, a = r ? t : e, s = document.createRange();
  s.setStart(n, 0), s.setEnd(a, 0);
  var i = s.commonAncestorContainer;
  if (e !== i && t !== i || n.contains(a))
    return Xg(i) ? i : vt(i);
  var o = qn(e);
  return o.host ? Pr(o.host, t) : Pr(e, qn(t).host);
}
function gt(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top", r = t === "top" ? "scrollTop" : "scrollLeft", n = e.nodeName;
  if (n === "BODY" || n === "HTML") {
    var a = e.ownerDocument.documentElement, s = e.ownerDocument.scrollingElement || a;
    return s[r];
  }
  return e[r];
}
function Gg(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = gt(t, "top"), a = gt(t, "left"), s = r ? -1 : 1;
  return e.top += n * s, e.bottom += n * s, e.left += a * s, e.right += a * s, e;
}
function wo(e, t) {
  var r = t === "x" ? "Left" : "Top", n = r === "Left" ? "Right" : "Bottom";
  return parseFloat(e["border" + r + "Width"]) + parseFloat(e["border" + n + "Width"]);
}
function $o(e, t, r, n) {
  return Math.max(t["offset" + e], t["scroll" + e], r["client" + e], r["offset" + e], r["scroll" + e], jt(10) ? parseInt(r["offset" + e]) + parseInt(n["margin" + (e === "Height" ? "Top" : "Left")]) + parseInt(n["margin" + (e === "Height" ? "Bottom" : "Right")]) : 0);
}
function Gl(e) {
  var t = e.body, r = e.documentElement, n = jt(10) && getComputedStyle(r);
  return {
    height: $o("Height", t, r, n),
    width: $o("Width", t, r, n)
  };
}
var Kg = function(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}, Jg = function() {
  function e(t, r) {
    for (var n = 0; n < r.length; n++) {
      var a = r[n];
      a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a);
    }
  }
  return function(t, r, n) {
    return r && e(t.prototype, r), n && e(t, n), t;
  };
}(), _t = function(e, t, r) {
  return t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}, pe = Object.assign || function(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t];
    for (var n in r)
      Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
  }
  return e;
};
function ke(e) {
  return pe({}, e, {
    right: e.left + e.width,
    bottom: e.top + e.height
  });
}
function Un(e) {
  var t = {};
  try {
    if (jt(10)) {
      t = e.getBoundingClientRect();
      var r = gt(e, "top"), n = gt(e, "left");
      t.top += r, t.left += n, t.bottom += r, t.right += n;
    } else
      t = e.getBoundingClientRect();
  } catch {
  }
  var a = {
    left: t.left,
    top: t.top,
    width: t.right - t.left,
    height: t.bottom - t.top
  }, s = e.nodeName === "HTML" ? Gl(e.ownerDocument) : {}, i = s.width || e.clientWidth || a.width, o = s.height || e.clientHeight || a.height, l = e.offsetWidth - i, d = e.offsetHeight - o;
  if (l || d) {
    var u = nt(e);
    l -= wo(u, "x"), d -= wo(u, "y"), a.width -= l, a.height -= d;
  }
  return ke(a);
}
function vs(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = jt(10), a = t.nodeName === "HTML", s = Un(e), i = Un(t), o = pr(e), l = nt(t), d = parseFloat(l.borderTopWidth), u = parseFloat(l.borderLeftWidth);
  r && a && (i.top = Math.max(i.top, 0), i.left = Math.max(i.left, 0));
  var c = ke({
    top: s.top - i.top - d,
    left: s.left - i.left - u,
    width: s.width,
    height: s.height
  });
  if (c.marginTop = 0, c.marginLeft = 0, !n && a) {
    var m = parseFloat(l.marginTop), g = parseFloat(l.marginLeft);
    c.top -= d - m, c.bottom -= d - m, c.left -= u - g, c.right -= u - g, c.marginTop = m, c.marginLeft = g;
  }
  return (n && !r ? t.contains(o) : t === o && o.nodeName !== "BODY") && (c = Gg(c, t)), c;
}
function Zg(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = e.ownerDocument.documentElement, n = vs(e, r), a = Math.max(r.clientWidth, window.innerWidth || 0), s = Math.max(r.clientHeight, window.innerHeight || 0), i = t ? 0 : gt(r), o = t ? 0 : gt(r, "left"), l = {
    top: i - n.top + n.marginTop,
    left: o - n.left + n.marginLeft,
    width: a,
    height: s
  };
  return ke(l);
}
function Kl(e) {
  var t = e.nodeName;
  if (t === "BODY" || t === "HTML")
    return !1;
  if (nt(e, "position") === "fixed")
    return !0;
  var r = ps(e);
  return r ? Kl(r) : !1;
}
function Jl(e) {
  if (!e || !e.parentElement || jt())
    return document.documentElement;
  for (var t = e.parentElement; t && nt(t, "transform") === "none"; )
    t = t.parentElement;
  return t || document.documentElement;
}
function gs(e, t, r, n) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, s = { top: 0, left: 0 }, i = a ? Jl(e) : Pr(e, Xl(t));
  if (n === "viewport")
    s = Zg(i, a);
  else {
    var o = void 0;
    n === "scrollParent" ? (o = pr(ps(t)), o.nodeName === "BODY" && (o = e.ownerDocument.documentElement)) : n === "window" ? o = e.ownerDocument.documentElement : o = n;
    var l = vs(o, i, a);
    if (o.nodeName === "HTML" && !Kl(i)) {
      var d = Gl(e.ownerDocument), u = d.height, c = d.width;
      s.top += l.top - l.marginTop, s.bottom = u + l.top, s.left += l.left - l.marginLeft, s.right = c + l.left;
    } else
      s = l;
  }
  r = r || 0;
  var m = typeof r == "number";
  return s.left += m ? r : r.left || 0, s.top += m ? r : r.top || 0, s.right -= m ? r : r.right || 0, s.bottom -= m ? r : r.bottom || 0, s;
}
function e_(e) {
  var t = e.width, r = e.height;
  return t * r;
}
function Zl(e, t, r, n, a) {
  var s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
  if (e.indexOf("auto") === -1)
    return e;
  var i = gs(r, n, s, a), o = {
    top: {
      width: i.width,
      height: t.top - i.top
    },
    right: {
      width: i.right - t.right,
      height: i.height
    },
    bottom: {
      width: i.width,
      height: i.bottom - t.bottom
    },
    left: {
      width: t.left - i.left,
      height: i.height
    }
  }, l = Object.keys(o).map(function(m) {
    return pe({
      key: m
    }, o[m], {
      area: e_(o[m])
    });
  }).sort(function(m, g) {
    return g.area - m.area;
  }), d = l.filter(function(m) {
    var g = m.width, M = m.height;
    return g >= r.clientWidth && M >= r.clientHeight;
  }), u = d.length > 0 ? d[0].key : l[0].key, c = e.split("-")[1];
  return u + (c ? "-" + c : "");
}
function ed(e, t, r) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, a = n ? Jl(t) : Pr(t, Xl(r));
  return vs(r, a, n);
}
function td(e) {
  var t = e.ownerDocument.defaultView, r = t.getComputedStyle(e), n = parseFloat(r.marginTop || 0) + parseFloat(r.marginBottom || 0), a = parseFloat(r.marginLeft || 0) + parseFloat(r.marginRight || 0), s = {
    width: e.offsetWidth + a,
    height: e.offsetHeight + n
  };
  return s;
}
function Sr(e) {
  var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
  return e.replace(/left|right|bottom|top/g, function(r) {
    return t[r];
  });
}
function rd(e, t, r) {
  r = r.split("-")[0];
  var n = td(e), a = {
    width: n.width,
    height: n.height
  }, s = ["right", "left"].indexOf(r) !== -1, i = s ? "top" : "left", o = s ? "left" : "top", l = s ? "height" : "width", d = s ? "width" : "height";
  return a[i] = t[i] + t[l] / 2 - n[l] / 2, r === o ? a[o] = t[o] - n[d] : a[o] = t[Sr(o)], a;
}
function vr(e, t) {
  return Array.prototype.find ? e.find(t) : e.filter(t)[0];
}
function t_(e, t, r) {
  if (Array.prototype.findIndex)
    return e.findIndex(function(a) {
      return a[t] === r;
    });
  var n = vr(e, function(a) {
    return a[t] === r;
  });
  return e.indexOf(n);
}
function ad(e, t, r) {
  var n = r === void 0 ? e : e.slice(0, t_(e, "name", r));
  return n.forEach(function(a) {
    a.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
    var s = a.function || a.fn;
    a.enabled && Ql(s) && (t.offsets.popper = ke(t.offsets.popper), t.offsets.reference = ke(t.offsets.reference), t = s(t, a));
  }), t;
}
function r_() {
  if (!this.state.isDestroyed) {
    var e = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: !1,
      offsets: {}
    };
    e.offsets.reference = ed(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = Zl(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = rd(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = ad(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
  }
}
function nd(e, t) {
  return e.some(function(r) {
    var n = r.name, a = r.enabled;
    return a && n === t;
  });
}
function _s(e) {
  for (var t = [!1, "ms", "Webkit", "Moz", "O"], r = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
    var a = t[n], s = a ? "" + a + r : e;
    if (typeof document.body.style[s] < "u")
      return s;
  }
  return null;
}
function a_() {
  return this.state.isDestroyed = !0, nd(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[_s("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
}
function sd(e) {
  var t = e.ownerDocument;
  return t ? t.defaultView : window;
}
function id(e, t, r, n) {
  var a = e.nodeName === "BODY", s = a ? e.ownerDocument.defaultView : e;
  s.addEventListener(t, r, { passive: !0 }), a || id(pr(s.parentNode), t, r, n), n.push(s);
}
function n_(e, t, r, n) {
  r.updateBound = n, sd(e).addEventListener("resize", r.updateBound, { passive: !0 });
  var a = pr(e);
  return id(a, "scroll", r.updateBound, r.scrollParents), r.scrollElement = a, r.eventsEnabled = !0, r;
}
function s_() {
  this.state.eventsEnabled || (this.state = n_(this.reference, this.options, this.state, this.scheduleUpdate));
}
function i_(e, t) {
  return sd(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(r) {
    r.removeEventListener("scroll", t.updateBound);
  }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
}
function o_() {
  this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = i_(this.reference, this.state));
}
function ys(e) {
  return e !== "" && !isNaN(parseFloat(e)) && isFinite(e);
}
function jn(e, t) {
  Object.keys(t).forEach(function(r) {
    var n = "";
    ["width", "height", "top", "right", "bottom", "left"].indexOf(r) !== -1 && ys(t[r]) && (n = "px"), e.style[r] = t[r] + n;
  });
}
function l_(e, t) {
  Object.keys(t).forEach(function(r) {
    var n = t[r];
    n !== !1 ? e.setAttribute(r, t[r]) : e.removeAttribute(r);
  });
}
function d_(e) {
  return jn(e.instance.popper, e.styles), l_(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && jn(e.arrowElement, e.arrowStyles), e;
}
function u_(e, t, r, n, a) {
  var s = ed(a, t, e, r.positionFixed), i = Zl(r.placement, s, t, e, r.modifiers.flip.boundariesElement, r.modifiers.flip.padding);
  return t.setAttribute("x-placement", i), jn(t, { position: r.positionFixed ? "fixed" : "absolute" }), r;
}
function c_(e, t) {
  var r = e.offsets, n = r.popper, a = r.reference, s = Math.round, i = Math.floor, o = function(_) {
    return _;
  }, l = s(a.width), d = s(n.width), u = ["left", "right"].indexOf(e.placement) !== -1, c = e.placement.indexOf("-") !== -1, m = l % 2 === d % 2, g = l % 2 === 1 && d % 2 === 1, M = t ? u || c || m ? s : i : o, E = t ? s : o;
  return {
    left: M(g && !c && t ? n.left - 1 : n.left),
    top: E(n.top),
    bottom: E(n.bottom),
    right: M(n.right)
  };
}
var f_ = hr && /Firefox/i.test(navigator.userAgent);
function m_(e, t) {
  var r = t.x, n = t.y, a = e.offsets.popper, s = vr(e.instance.modifiers, function(h) {
    return h.name === "applyStyle";
  }).gpuAcceleration;
  s !== void 0 && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
  var i = s !== void 0 ? s : t.gpuAcceleration, o = vt(e.instance.popper), l = Un(o), d = {
    position: a.position
  }, u = c_(e, window.devicePixelRatio < 2 || !f_), c = r === "bottom" ? "top" : "bottom", m = n === "right" ? "left" : "right", g = _s("transform"), M = void 0, E = void 0;
  if (c === "bottom" ? o.nodeName === "HTML" ? E = -o.clientHeight + u.bottom : E = -l.height + u.bottom : E = u.top, m === "right" ? o.nodeName === "HTML" ? M = -o.clientWidth + u.right : M = -l.width + u.right : M = u.left, i && g)
    d[g] = "translate3d(" + M + "px, " + E + "px, 0)", d[c] = 0, d[m] = 0, d.willChange = "transform";
  else {
    var $ = c === "bottom" ? -1 : 1, _ = m === "right" ? -1 : 1;
    d[c] = E * $, d[m] = M * _, d.willChange = c + ", " + m;
  }
  var v = {
    "x-placement": e.placement
  };
  return e.attributes = pe({}, v, e.attributes), e.styles = pe({}, d, e.styles), e.arrowStyles = pe({}, e.offsets.arrow, e.arrowStyles), e;
}
function od(e, t, r) {
  var n = vr(e, function(o) {
    var l = o.name;
    return l === t;
  }), a = !!n && e.some(function(o) {
    return o.name === r && o.enabled && o.order < n.order;
  });
  if (!a) {
    var s = "`" + t + "`", i = "`" + r + "`";
    console.warn(i + " modifier is required by " + s + " modifier in order to work, be sure to include it before " + s + "!");
  }
  return a;
}
function h_(e, t) {
  var r;
  if (!od(e.instance.modifiers, "arrow", "keepTogether"))
    return e;
  var n = t.element;
  if (typeof n == "string") {
    if (n = e.instance.popper.querySelector(n), !n)
      return e;
  } else if (!e.instance.popper.contains(n))
    return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
  var a = e.placement.split("-")[0], s = e.offsets, i = s.popper, o = s.reference, l = ["left", "right"].indexOf(a) !== -1, d = l ? "height" : "width", u = l ? "Top" : "Left", c = u.toLowerCase(), m = l ? "left" : "top", g = l ? "bottom" : "right", M = td(n)[d];
  o[g] - M < i[c] && (e.offsets.popper[c] -= i[c] - (o[g] - M)), o[c] + M > i[g] && (e.offsets.popper[c] += o[c] + M - i[g]), e.offsets.popper = ke(e.offsets.popper);
  var E = o[c] + o[d] / 2 - M / 2, $ = nt(e.instance.popper), _ = parseFloat($["margin" + u]), v = parseFloat($["border" + u + "Width"]), h = E - e.offsets.popper[c] - _ - v;
  return h = Math.max(Math.min(i[d] - M, h), 0), e.arrowElement = n, e.offsets.arrow = (r = {}, _t(r, c, Math.round(h)), _t(r, m, ""), r), e;
}
function p_(e) {
  return e === "end" ? "start" : e === "start" ? "end" : e;
}
var ld = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], La = ld.slice(3);
function To(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = La.indexOf(e), n = La.slice(r + 1).concat(La.slice(0, r));
  return t ? n.reverse() : n;
}
var Ra = {
  FLIP: "flip",
  CLOCKWISE: "clockwise",
  COUNTERCLOCKWISE: "counterclockwise"
};
function v_(e, t) {
  if (nd(e.instance.modifiers, "inner") || e.flipped && e.placement === e.originalPlacement)
    return e;
  var r = gs(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed), n = e.placement.split("-")[0], a = Sr(n), s = e.placement.split("-")[1] || "", i = [];
  switch (t.behavior) {
    case Ra.FLIP:
      i = [n, a];
      break;
    case Ra.CLOCKWISE:
      i = To(n);
      break;
    case Ra.COUNTERCLOCKWISE:
      i = To(n, !0);
      break;
    default:
      i = t.behavior;
  }
  return i.forEach(function(o, l) {
    if (n !== o || i.length === l + 1)
      return e;
    n = e.placement.split("-")[0], a = Sr(n);
    var d = e.offsets.popper, u = e.offsets.reference, c = Math.floor, m = n === "left" && c(d.right) > c(u.left) || n === "right" && c(d.left) < c(u.right) || n === "top" && c(d.bottom) > c(u.top) || n === "bottom" && c(d.top) < c(u.bottom), g = c(d.left) < c(r.left), M = c(d.right) > c(r.right), E = c(d.top) < c(r.top), $ = c(d.bottom) > c(r.bottom), _ = n === "left" && g || n === "right" && M || n === "top" && E || n === "bottom" && $, v = ["top", "bottom"].indexOf(n) !== -1, h = !!t.flipVariations && (v && s === "start" && g || v && s === "end" && M || !v && s === "start" && E || !v && s === "end" && $), p = !!t.flipVariationsByContent && (v && s === "start" && M || v && s === "end" && g || !v && s === "start" && $ || !v && s === "end" && E), T = h || p;
    (m || _ || T) && (e.flipped = !0, (m || _) && (n = i[l + 1]), T && (s = p_(s)), e.placement = n + (s ? "-" + s : ""), e.offsets.popper = pe({}, e.offsets.popper, rd(e.instance.popper, e.offsets.reference, e.placement)), e = ad(e.instance.modifiers, e, "flip"));
  }), e;
}
function g_(e) {
  var t = e.offsets, r = t.popper, n = t.reference, a = e.placement.split("-")[0], s = Math.floor, i = ["top", "bottom"].indexOf(a) !== -1, o = i ? "right" : "bottom", l = i ? "left" : "top", d = i ? "width" : "height";
  return r[o] < s(n[l]) && (e.offsets.popper[l] = s(n[l]) - r[d]), r[l] > s(n[o]) && (e.offsets.popper[l] = s(n[o])), e;
}
function __(e, t, r, n) {
  var a = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), s = +a[1], i = a[2];
  if (!s)
    return e;
  if (i.indexOf("%") === 0) {
    var o = void 0;
    switch (i) {
      case "%p":
        o = r;
        break;
      case "%":
      case "%r":
      default:
        o = n;
    }
    var l = ke(o);
    return l[t] / 100 * s;
  } else if (i === "vh" || i === "vw") {
    var d = void 0;
    return i === "vh" ? d = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : d = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), d / 100 * s;
  } else
    return s;
}
function y_(e, t, r, n) {
  var a = [0, 0], s = ["right", "left"].indexOf(n) !== -1, i = e.split(/(\+|\-)/).map(function(u) {
    return u.trim();
  }), o = i.indexOf(vr(i, function(u) {
    return u.search(/,|\s/) !== -1;
  }));
  i[o] && i[o].indexOf(",") === -1 && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
  var l = /\s*,\s*|\s+/, d = o !== -1 ? [i.slice(0, o).concat([i[o].split(l)[0]]), [i[o].split(l)[1]].concat(i.slice(o + 1))] : [i];
  return d = d.map(function(u, c) {
    var m = (c === 1 ? !s : s) ? "height" : "width", g = !1;
    return u.reduce(function(M, E) {
      return M[M.length - 1] === "" && ["+", "-"].indexOf(E) !== -1 ? (M[M.length - 1] = E, g = !0, M) : g ? (M[M.length - 1] += E, g = !1, M) : M.concat(E);
    }, []).map(function(M) {
      return __(M, m, t, r);
    });
  }), d.forEach(function(u, c) {
    u.forEach(function(m, g) {
      ys(m) && (a[c] += m * (u[g - 1] === "-" ? -1 : 1));
    });
  }), a;
}
function b_(e, t) {
  var r = t.offset, n = e.placement, a = e.offsets, s = a.popper, i = a.reference, o = n.split("-")[0], l = void 0;
  return ys(+r) ? l = [+r, 0] : l = y_(r, s, i, o), o === "left" ? (s.top += l[0], s.left -= l[1]) : o === "right" ? (s.top += l[0], s.left += l[1]) : o === "top" ? (s.left += l[0], s.top -= l[1]) : o === "bottom" && (s.left += l[0], s.top += l[1]), e.popper = s, e;
}
function M_(e, t) {
  var r = t.boundariesElement || vt(e.instance.popper);
  e.instance.reference === r && (r = vt(r));
  var n = _s("transform"), a = e.instance.popper.style, s = a.top, i = a.left, o = a[n];
  a.top = "", a.left = "", a[n] = "";
  var l = gs(e.instance.popper, e.instance.reference, t.padding, r, e.positionFixed);
  a.top = s, a.left = i, a[n] = o, t.boundaries = l;
  var d = t.priority, u = e.offsets.popper, c = {
    primary: function(g) {
      var M = u[g];
      return u[g] < l[g] && !t.escapeWithReference && (M = Math.max(u[g], l[g])), _t({}, g, M);
    },
    secondary: function(g) {
      var M = g === "right" ? "left" : "top", E = u[M];
      return u[g] > l[g] && !t.escapeWithReference && (E = Math.min(u[M], l[g] - (g === "right" ? u.width : u.height))), _t({}, M, E);
    }
  };
  return d.forEach(function(m) {
    var g = ["left", "top"].indexOf(m) !== -1 ? "primary" : "secondary";
    u = pe({}, u, c[g](m));
  }), e.offsets.popper = u, e;
}
function w_(e) {
  var t = e.placement, r = t.split("-")[0], n = t.split("-")[1];
  if (n) {
    var a = e.offsets, s = a.reference, i = a.popper, o = ["bottom", "top"].indexOf(r) !== -1, l = o ? "left" : "top", d = o ? "width" : "height", u = {
      start: _t({}, l, s[l]),
      end: _t({}, l, s[l] + s[d] - i[d])
    };
    e.offsets.popper = pe({}, i, u[n]);
  }
  return e;
}
function $_(e) {
  if (!od(e.instance.modifiers, "hide", "preventOverflow"))
    return e;
  var t = e.offsets.reference, r = vr(e.instance.modifiers, function(n) {
    return n.name === "preventOverflow";
  }).boundaries;
  if (t.bottom < r.top || t.left > r.right || t.top > r.bottom || t.right < r.left) {
    if (e.hide === !0)
      return e;
    e.hide = !0, e.attributes["x-out-of-boundaries"] = "";
  } else {
    if (e.hide === !1)
      return e;
    e.hide = !1, e.attributes["x-out-of-boundaries"] = !1;
  }
  return e;
}
function T_(e) {
  var t = e.placement, r = t.split("-")[0], n = e.offsets, a = n.popper, s = n.reference, i = ["left", "right"].indexOf(r) !== -1, o = ["top", "left"].indexOf(r) === -1;
  return a[i ? "left" : "top"] = s[r] - (o ? a[i ? "width" : "height"] : 0), e.placement = Sr(t), e.offsets.popper = ke(a), e;
}
var C_ = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: w_
  },
  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: b_,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },
  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: M_,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ["left", "right", "top", "bottom"],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: "scrollParent"
  },
  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: g_
  },
  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: h_,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: "[x-arrow]"
  },
  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: v_,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: "flip",
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: "viewport",
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: !1,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: !1
  },
  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: !1,
    /** @prop {ModifierFn} */
    fn: T_
  },
  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: $_
  },
  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: m_,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: !0,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: "bottom",
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: "right"
  },
  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: !0,
    /** @prop {ModifierFn} */
    fn: d_,
    /** @prop {Function} */
    onLoad: u_,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: void 0
  }
}, x_ = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: "bottom",
  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: !1,
  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: !0,
  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: !1,
  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function() {
  },
  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function() {
  },
  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: C_
}, ma = function() {
  function e(t, r) {
    var n = this, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Kg(this, e), this.scheduleUpdate = function() {
      return requestAnimationFrame(n.update);
    }, this.update = Qg(this.update.bind(this)), this.options = pe({}, e.Defaults, a), this.state = {
      isDestroyed: !1,
      isCreated: !1,
      scrollParents: []
    }, this.reference = t && t.jquery ? t[0] : t, this.popper = r && r.jquery ? r[0] : r, this.options.modifiers = {}, Object.keys(pe({}, e.Defaults.modifiers, a.modifiers)).forEach(function(i) {
      n.options.modifiers[i] = pe({}, e.Defaults.modifiers[i] || {}, a.modifiers ? a.modifiers[i] : {});
    }), this.modifiers = Object.keys(this.options.modifiers).map(function(i) {
      return pe({
        name: i
      }, n.options.modifiers[i]);
    }).sort(function(i, o) {
      return i.order - o.order;
    }), this.modifiers.forEach(function(i) {
      i.enabled && Ql(i.onLoad) && i.onLoad(n.reference, n.popper, n.options, i, n.state);
    }), this.update();
    var s = this.options.eventsEnabled;
    s && this.enableEventListeners(), this.state.eventsEnabled = s;
  }
  return Jg(e, [{
    key: "update",
    value: function() {
      return r_.call(this);
    }
  }, {
    key: "destroy",
    value: function() {
      return a_.call(this);
    }
  }, {
    key: "enableEventListeners",
    value: function() {
      return s_.call(this);
    }
  }, {
    key: "disableEventListeners",
    value: function() {
      return o_.call(this);
    }
    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */
    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */
  }]), e;
}();
ma.Utils = (typeof window < "u" ? window : global).PopperUtils;
ma.placements = ld;
ma.Defaults = x_;
const P_ = ma;
const bs = {
  name: "MdPopover",
  emits: ["md-active"],
  abstract: !0,
  components: {
    MdPortal: Ir
  },
  props: {
    mdActive: Boolean,
    mdSettings: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    popperInstance: null,
    originalParentEl: null,
    shouldRender: !1,
    shouldActivate: !1
  }),
  computed: {
    popoverClasses() {
      if (this.shouldActivate)
        return "md-active";
      if (this.shouldRender)
        return "md-rendering";
    }
  },
  watch: {
    mdActive: {
      immediate: !0,
      handler(e) {
        this.shouldRender = e, e ? this.bindPopper() : this.shouldActivate = !1;
      }
    },
    mdSettings() {
      this.popperInstance && this.createPopper();
    }
  },
  methods: {
    getPopperOptions() {
      return {
        placement: "bottom",
        modifiers: {
          preventOverflow: {
            boundariesElement: "viewport",
            padding: 16
          },
          computeStyle: {
            gpuAcceleration: !1
          }
        },
        onCreate: () => {
          this.shouldActivate = !0, this.$emit("md-active");
        }
      };
    },
    setOriginalParent(e) {
      this.originalParentEl || (e.classList.contains("md-checkbox-label") && e.closest(".all_selector") && (e = e.closest(".all_selector")), this.originalParentEl = e);
    },
    killPopper() {
      this.popperInstance && (this.popperInstance.destroy(), this.popperInstance = null);
    },
    bindPopper() {
      this.$nextTick().then(() => {
        this.originalParentEl && this.createPopper();
      });
    },
    createPopper() {
      if (this.mdSettings) {
        const t = nl(this.getPopperOptions(), this.mdSettings);
        if (this.$el.nodeType !== Node.COMMENT_NODE) {
          this.popperInstance = new P_(this.originalParentEl, this.$el, t);
          var e = this;
          wd(function() {
            var r = e.$el.style && e.$el.style.left ? e.$el.style.left : !1;
            r && r.charAt(0) == "-" && (e.$el.style.left = "10px");
          });
        }
      }
    },
    resetPopper() {
      this.popperInstance && (this.killPopper(), this.createPopper());
    }
  },
  beforeUnmount() {
    this.killPopper();
  },
  mounted() {
    this.resetPopper();
  },
  render() {
    const e = b("md-portal");
    return xe(e, {
      ...this.$attrs,
      onMdInitialParent: this.setOriginalParent,
      onMdDestroy: this.killPopper
    }, this.$slots.default);
  }
};
let Na = {};
const S_ = {
  name: "MdSVGLoader",
  props: {
    mdSrc: {
      type: String,
      required: !0
    }
  },
  data: () => ({
    html: null,
    error: null
  }),
  watch: {
    mdSrc() {
      this.html = null, this.loadSVG();
    }
  },
  methods: {
    isSVG(e) {
      return typeof e != "string" ? !1 : e.indexOf("svg") >= 0;
    },
    setHtml(e) {
      Na[this.mdSrc].then((t) => (this.html = t, this.$nextTick())).then(() => this.$emit("md-loaded"));
    },
    unexpectedError(e) {
      this.error = `Something bad happened trying to fetch ${this.mdSrc}.`, e(this.error);
    },
    loadSVG() {
      Na.hasOwnProperty(this.mdSrc) ? this.setHtml() : Na[this.mdSrc] = new Promise((e, t) => {
        const r = new window.XMLHttpRequest();
        r.open("GET", this.mdSrc, !0), r.onload = () => {
          const n = r.getResponseHeader("content-type");
          r.status === 200 ? this.isSVG(n) ? (e(r.response), this.setHtml()) : (this.error = `The file ${this.mdSrc} is not a valid SVG.`, t(this.error)) : r.status >= 400 && r.status < 500 ? (this.error = `The file ${this.mdSrc} do not exists.`, t(this.error)) : this.unexpectedError(t);
        }, r.onerror = () => this.unexpectedError(t), r.onabort = () => this.unexpectedError(t), r.send();
      });
    }
  },
  mounted() {
    this.loadSVG();
  }
}, D_ = ["innerHTML"];
function k_(e, t, r, n, a, s) {
  return f(), w("i", {
    class: "md-svg-loader",
    innerHTML: e.html
  }, null, 8, D_);
}
const O_ = /* @__PURE__ */ C(S_, [["render", k_]]);
const A_ = new W({
  name: "MdIcon",
  emits: ["md-loaded"],
  components: {
    MdSvgLoader: O_
  },
  props: {
    mdSrc: String
  }
});
function E_(e, t, r, n, a, s) {
  const i = b("md-svg-loader");
  return e.mdSrc ? (f(), D(i, {
    key: 0,
    class: O(["md-icon md-icon-image", [e.$mdActiveTheme]]),
    "md-src": e.mdSrc,
    onMdLoaded: t[0] || (t[0] = (o) => e.$emit("md-loaded"))
  }, null, 8, ["md-src", "class"])) : (f(), w("i", {
    key: 1,
    class: O(["md-icon md-icon-font", [e.$mdActiveTheme]])
  }, [
    P(e.$slots, "default")
  ], 2));
}
const ve = /* @__PURE__ */ C(A_, [["render", E_]]), I_ = {
  name: "MdArrowRightIcon",
  components: {
    MdIcon: ve
  }
}, L_ = /* @__PURE__ */ x("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ x("path", { d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" }),
  /* @__PURE__ */ x("path", {
    d: "M0-.25h24v24H0z",
    fill: "none"
  })
], -1);
function R_(e, t, r, n, a, s) {
  const i = b("md-icon");
  return t[0] || (ne(-1), t[0] = k(i, { class: "md-icon-image" }, {
    default: y(() => [
      L_
    ]),
    _: 1
  }), ne(1), t[0]);
}
const N_ = /* @__PURE__ */ C(I_, [["render", R_]]), H_ = {
  name: "MdArrowLeftIcon",
  components: {
    MdIcon: ve
  }
}, F_ = /* @__PURE__ */ x("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ x("path", { d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" }),
  /* @__PURE__ */ x("path", {
    d: "M0-.5h24v24H0z",
    fill: "none"
  })
], -1);
function B_(e, t, r, n, a, s) {
  const i = b("md-icon");
  return t[0] || (ne(-1), t[0] = k(i, { class: "md-icon-image" }, {
    default: y(() => [
      F_
    ]),
    _: 1
  }), ne(1), t[0]);
}
const W_ = /* @__PURE__ */ C(H_, [["render", B_]]), dd = {
  name: "MdFocusTrap",
  abstract: !0,
  methods: {
    setFocus() {
      window.setTimeout(() => {
        this.$el.tagName && (this.$el.setAttribute("tabindex", "-1"), this.$el.focus());
      }, 20);
    }
  },
  mounted() {
    this.setFocus();
  },
  render() {
    try {
      const e = this.$slots.default();
      if (!e)
        return null;
      if (e.length > 1)
        throw new Error();
      return e[0];
    } catch {
      console.log("MdFocusTrap can only render one, and exactly one child component.");
    }
    return null;
  }
};
const Y_ = new W({
  emits: ["update:mdActive", "md-clicked-outside", "md-closed", "md-opened"],
  name: "MdDialog",
  components: {
    MdPortal: Ir,
    MdOverlay: ns,
    MdFocusTrap: dd
  },
  props: {
    mdActive: Boolean,
    mdTarget: {
      type: null,
      default: null
    },
    mdBackdrop: {
      type: Boolean,
      default: !0
    },
    mdBackdropClass: {
      type: String,
      default: "md-dialog-overlay"
    },
    mdCloseOnEsc: {
      type: Boolean,
      default: !0
    },
    mdClickOutsideToClose: {
      type: Boolean,
      default: !0
    },
    mdFullscreen: {
      type: Boolean,
      default: !0
    },
    mdAnimateFromSource: Boolean
  },
  data: () => ({
    I_mdTargetLastScroll: !1
  }),
  computed: {
    dialogClasses() {
      return {
        "md-active": this.mdActive
      };
    },
    dialogContainerClasses() {
      return {
        "md-dialog-fullscreen": this.mdFullscreen
      };
    }
  },
  watch: {
    mdActive(e) {
      this.mdTarget && (e ? (this.I_mdTargetLastScroll = this.mdTarget.scrollTop, this.mdTarget.style.overflow = "hidden") : (this.mdTarget.style.overflow = "auto", this.mdTarget.scrollTop = this.I_mdTargetLastScroll));
    }
  },
  methods: {
    closeDialog() {
    },
    onClick() {
      this.mdClickOutsideToClose && this.closeDialog(), this.$emit("md-clicked-outside");
    },
    onEsc() {
      this.mdCloseOnEsc && this.closeDialog();
    }
  }
});
function z_(e, t, r, n, a, s) {
  const i = b("md-overlay"), o = b("md-focus-trap"), l = b("md-portal");
  return f(), D(l, {
    mdTarget: e.mdTarget,
    ref: "portalRef"
  }, {
    default: y(() => [
      k(ue, { name: "md-dialog" }, {
        default: y(() => [
          e.mdActive ? (f(), w("div", {
            key: 0,
            class: O(["md-dialog", e.mdTarget ? "with-target" : ""])
          }, [
            k(o, null, {
              default: y(() => [
                x("div", {
                  class: O(["md-dialog-container", [e.dialogContainerClasses, e.$mdActiveTheme]]),
                  onKeydown: t[0] || (t[0] = Jo((...d) => e.onEsc && e.onEsc(...d), ["esc"]))
                }, [
                  P(e.$slots, "default"),
                  (f(), D(cr, null, [
                    e.mdBackdrop ? (f(), D(i, {
                      key: 0,
                      class: O(e.mdBackdropClass),
                      mdTarget: e.mdTarget,
                      "md-fixed": !e.mdTarget,
                      "md-active": e.mdActive,
                      onClick: e.onClick
                    }, null, 8, ["class", "mdTarget", "md-fixed", "md-active", "onClick"])) : N("", !0)
                  ], 1024))
                ], 34)
              ]),
              _: 3
            })
          ], 2)) : N("", !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 8, ["mdTarget"]);
}
const lr = /* @__PURE__ */ C(Y_, [["render", z_]]);
const q_ = {
  name: "MdDialogActions"
}, U_ = { class: "md-dialog-actions" };
function j_(e, t, r, n, a, s) {
  return f(), w("div", U_, [
    P(e.$slots, "default")
  ]);
}
const dr = /* @__PURE__ */ C(q_, [["render", j_]]);
const Ha = 7, Co = (e, t) => e && e.querySelector ? e.querySelectorAll(t) : !1, V_ = new W({
  emits: ["md-closed", "update:mdDate"],
  name: "MdDatepickerDialog",
  components: {
    MdPopover: bs,
    MdArrowRightIcon: N_,
    MdArrowLeftIcon: W_,
    MdDialog: lr,
    MdButton: Pe,
    MdDialogActions: dr,
    MdContent: ht
  },
  props: {
    mdDate: Date,
    mdDisabledDates: [Array, Function],
    mdImmediately: {
      type: Boolean,
      default: !1
    },
    mdPlacement: {
      type: String,
      default: "bottom-start"
    }
  },
  data: () => ({
    currentDate: null,
    selectedDate: null,
    showDialog: !1,
    monthAction: null,
    currentView: "day",
    contentStyles: {},
    availableYears: null
    // locale: {
    // 	startYear: 1900,
    // 	endYear: 2099,
    // 	dateFormat: 'dd-MM-yyyy',
    // 	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    // 	shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    // 	shorterDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    // 	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // 	shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    // 	shorterMonths: ['J', 'F', 'M', 'A', 'M', 'Ju', 'Ju', 'A', 'Se', 'O', 'N', 'D'],
    // 	firstDayOfAWeek: 0,
    // 	cancel: 'Close',
    // 	confirm: 'Ok'
    // },
  }),
  setup() {
    const e = Zo("material");
    return {
      locale: el(() => e.locale)
    };
  },
  computed: {
    firstDayOfAWeek() {
      let e = Number(this.locale.firstDayOfAWeek);
      return Number.isNaN(e) || !Number.isFinite(e) ? 0 : (e = Math.floor(e) % Ha, e += e < 0 ? Ha : 0, e);
    },
    filteredShorterDays() {
      const e = this.locale.shorterDays, t = this.firstDayOfAWeek;
      return [...e.slice(t), ...e.slice(0, t)];
    },
    popperSettings() {
      return {
        //placement: 'bottom-start',
        placement: this.mdPlacement,
        modifiers: {
          keepTogether: {
            enabled: !0
          },
          flip: {
            enabled: !1
          }
        }
      };
    },
    calendarClasses() {
      return this.monthAction === "next" ? "md-next" : "md-previous";
    },
    firstDayOfMonth() {
      return Pg(this.currentDate).getDay();
    },
    prefixEmptyDays() {
      let e = this.firstDayOfMonth - this.firstDayOfAWeek;
      return e += e < 0 ? Ha : 0, e;
    },
    daysInMonth() {
      return Ag(this.currentDate);
    },
    currentDay() {
      return this.selectedDate ? go(this.selectedDate) : go(this.currentDate);
    },
    currentMonth() {
      return Ea(this.currentDate);
    },
    currentMonthName() {
      return this.locale.months[this.currentMonth];
    },
    currentYear() {
      return Ia(this.currentDate);
    },
    selectedYear() {
      return this.selectedDate ? Ia(this.selectedDate) : Ia(this.currentDate);
    },
    shortDayName() {
      return this.selectedDate ? this.locale.shortDays[_o(this.selectedDate)] : this.locale.shortDays[_o(this.currentDate)];
    },
    shortMonthName() {
      return this.selectedDate ? this.locale.shortMonths[Ea(this.selectedDate)] : this.locale.shortMonths[Ea(this.currentDate)];
    }
  },
  watch: {
    mdDate() {
      this.currentDate = this.mdDate || /* @__PURE__ */ new Date(), this.selectedDate = this.mdDate;
    },
    currentDate(e, t) {
      this.$nextTick().then(() => {
        t && this.setContentStyles();
      });
    },
    currentView() {
      this.$nextTick().then(() => {
        if (this.currentView === "year") {
          const e = Co(this.$el, ".md-datepicker-year-button.md-datepicker-selected");
          e.length && e[0].scrollIntoView({
            behavior: "instant",
            block: "center",
            inline: "center"
          });
        }
      });
    }
  },
  methods: {
    setContentStyles() {
      const e = Co(this.$el, ".md-datepicker-month");
      if (e.length) {
        const t = e[e.length - 1];
        this.contentStyles = {
          height: t.offsetHeight + 10 + "px"
        };
      }
    },
    setAvailableYears() {
      const { startYear: e, endYear: t } = this.locale;
      let r = e, n = [];
      for (; r <= t; )
        n.push(r++);
      this.availableYears = n;
    },
    handleDisabledDateByArray(e) {
      return this.mdDisabledDates.some((t) => yo(t, e));
    },
    isDisabled(e) {
      if (this.mdDisabledDates) {
        const t = wr(this.currentDate, e);
        if (Array.isArray(this.mdDisabledDates))
          return this.handleDisabledDateByArray(t);
        if (typeof this.mdDisabledDates == "function")
          return this.mdDisabledDates(t);
      }
    },
    isSelectedDay(e) {
      return Rg(this.selectedDate, wr(this.currentDate, e));
    },
    isToday(e) {
      return yo(/* @__PURE__ */ new Date(), wr(this.currentDate, e));
    },
    previousMonth() {
      this.monthAction = "previous", this.currentDate = Dg(this.currentDate, 1);
    },
    nextMonth() {
      this.monthAction = "next", this.currentDate = Cg(this.currentDate, 1);
    },
    switchMonth(e) {
      this.currentDate = Wg(this.currentDate, e), this.currentView = "day";
    },
    switchYear(e) {
      this.currentDate = zg(this.currentDate, e), this.currentView = "month";
    },
    selectDate(e) {
      this.currentDate = wr(this.currentDate, e), this.selectedDate = this.currentDate, this.mdImmediately && (this.$emit("update:mdDate", this.selectedDate), this.closeDialog());
    },
    closeDialog() {
      this.$emit("md-closed");
    },
    onClose() {
      this.closeDialog();
    },
    onCancel() {
      this.closeDialog();
    },
    onConfirm() {
      this.$emit("update:mdDate", this.selectedDate), this.closeDialog();
    },
    resetDate() {
      this.currentDate = this.mdDate || /* @__PURE__ */ new Date(), this.selectedDate = this.mdDate, this.currentView = "day";
    }
  },
  created() {
    this.setAvailableYears(), this.resetDate();
  }
}), Q_ = { class: "md-datepicker-header" }, X_ = { class: "md-datepicker-dayname" }, G_ = { class: "md-datepicker-monthname" }, K_ = { class: "md-datepicker-day" }, J_ = { class: "md-datepicker-body" }, Z_ = {
  key: 0,
  class: "md-datepicker-body-header"
}, e0 = { class: "md-datepicker-week" }, t0 = { class: "md-datepicker-days" }, r0 = ["onClick"], a0 = {
  key: 1,
  class: "md-datepicker-panel md-datepicker-month-selector"
}, n0 = ["onClick"], s0 = ["onClick"];
function i0(e, t, r, n, a, s) {
  const i = b("md-arrow-left-icon"), o = b("md-button"), l = b("md-arrow-right-icon"), d = b("md-content"), u = b("md-dialog-actions"), c = b("md-popover");
  return f(), D(c, {
    "md-settings": e.popperSettings,
    "md-active": ""
  }, {
    default: y(() => [
      k(ue, {
        name: "md-datepicker-dialog",
        appear: "",
        onEnter: e.setContentStyles,
        onAfterLeave: e.resetDate
      }, {
        default: y(() => [
          x("div", {
            class: O(["md-datepicker-dialog", [e.$mdActiveTheme]])
          }, [
            x("div", Q_, [
              x("span", {
                class: O(["md-datepicker-year-select", { "md-selected": e.currentView === "year" }]),
                onClick: t[0] || (t[0] = (m) => e.currentView = "year")
              }, R(e.selectedYear), 3),
              x("div", {
                class: O(["md-datepicker-date-select", { "md-selected": e.currentView !== "year" }]),
                onClick: t[1] || (t[1] = (m) => e.currentView = "day")
              }, [
                x("strong", X_, R(e.shortDayName) + ", ", 1),
                x("strong", G_, R(e.shortMonthName), 1),
                x("strong", K_, R(e.currentDay), 1)
              ], 2)
            ]),
            x("div", J_, [
              k(ue, { name: "md-datepicker-body-header" }, {
                default: y(() => [
                  e.currentView === "day" ? (f(), w("div", Z_, [
                    k(o, {
                      class: "md-dense md-icon-button",
                      onClick: e.previousMonth
                    }, {
                      default: y(() => [
                        k(i)
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    k(o, {
                      class: "md-dense md-icon-button",
                      onClick: e.nextMonth
                    }, {
                      default: y(() => [
                        k(l)
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])) : N("", !0)
                ]),
                _: 1
              }),
              x("div", {
                class: "md-datepicker-body-content",
                style: J(e.contentStyles)
              }, [
                k(ue, { name: "md-datepicker-view" }, {
                  default: y(() => [
                    e.currentView === "day" ? (f(), D($d, {
                      key: 0,
                      class: O(["md-datepicker-panel md-datepicker-calendar", e.calendarClasses]),
                      tag: "div",
                      name: "md-datepicker-month"
                    }, {
                      default: y(() => [
                        (f(!0), w(de, null, ge([e.currentDate], (m) => (f(), w("div", {
                          class: "md-datepicker-panel md-datepicker-month",
                          key: m.getMonth()
                        }, [
                          k(o, {
                            class: "md-dense md-datepicker-month-trigger",
                            onClick: t[2] || (t[2] = (g) => e.currentView = "month")
                          }, {
                            default: y(() => [
                              te(R(e.currentMonthName) + " " + R(e.currentYear), 1)
                            ]),
                            _: 1
                          }),
                          x("div", e0, [
                            (f(!0), w(de, null, ge(e.locale.shorterDays, (g, M) => (f(), w("span", { key: M }, R(g), 1))), 128))
                          ]),
                          x("div", t0, [
                            (f(!0), w(de, null, ge(e.prefixEmptyDays, (g) => (f(), w("span", {
                              class: "md-datepicker-empty",
                              key: "day-empty-" + g
                            }))), 128)),
                            (f(!0), w(de, null, ge(e.daysInMonth, (g) => (f(), w("div", {
                              class: "md-datepicker-day",
                              key: "day-" + g
                            }, [
                              x("span", {
                                class: O(["md-datepicker-day-button", {
                                  "md-datepicker-selected": e.isSelectedDay(g),
                                  "md-datepicker-today": e.isToday(g),
                                  "md-datepicker-disabled": e.isDisabled(g)
                                }]),
                                onClick: (M) => e.selectDate(g)
                              }, R(g), 11, r0)
                            ]))), 128))
                          ])
                        ]))), 128))
                      ]),
                      _: 1
                    }, 8, ["class"])) : e.currentView === "month" ? (f(), w("div", a0, [
                      k(o, {
                        class: "md-datepicker-year-trigger",
                        onClick: t[3] || (t[3] = (m) => e.currentView = "year")
                      }, {
                        default: y(() => [
                          te(R(e.currentYear), 1)
                        ]),
                        _: 1
                      }),
                      (f(!0), w(de, null, ge(e.locale.months, (m, g) => (f(), w("span", {
                        class: O(["md-datepicker-month-button", {
                          "md-datepicker-selected": e.currentMonthName === m
                        }]),
                        key: m,
                        onClick: (M) => e.switchMonth(g)
                      }, R(m), 11, n0))), 128))
                    ])) : e.currentView === "year" ? (f(), D(cr, { key: 2 }, [
                      k(d, { class: "md-datepicker-panel md-datepicker-year-selector md-scrollbar" }, {
                        default: y(() => [
                          (f(!0), w(de, null, ge(e.availableYears, (m) => (f(), w("span", {
                            class: O(["md-datepicker-year-button", {
                              "md-datepicker-selected": e.currentYear === m
                            }]),
                            key: m,
                            onClick: (g) => e.switchYear(m)
                          }, R(m), 11, s0))), 128))
                        ]),
                        _: 1
                      })
                    ], 1024)) : N("", !0)
                  ]),
                  _: 1
                })
              ], 4),
              k(u, { class: "md-datepicker-body-footer" }, {
                default: y(() => [
                  k(o, {
                    class: "md-primary",
                    onClick: e.onCancel
                  }, {
                    default: y(() => [
                      te(R(e.locale.cancel), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  e.mdImmediately ? N("", !0) : (f(), D(o, {
                    key: 0,
                    class: "md-primary",
                    onClick: e.onConfirm
                  }, {
                    default: y(() => [
                      te(R(e.locale.confirm), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"]))
                ]),
                _: 1
              })
            ])
          ], 2)
        ]),
        _: 1
      }, 8, ["onEnter", "onAfterLeave"])
    ]),
    _: 1
  }, 8, ["md-settings"]);
}
const o0 = /* @__PURE__ */ C(V_, [["render", i0]]), l0 = {
  name: "MdDateIcon",
  components: {
    MdIcon: ve
  }
}, d0 = /* @__PURE__ */ x("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ x("path", { d: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" }),
  /* @__PURE__ */ x("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  })
], -1);
function u0(e, t, r, n, a, s) {
  const i = b("md-icon");
  return t[0] || (ne(-1), t[0] = k(i, { class: "md-icon-image" }, {
    default: y(() => [
      d0
    ]),
    _: 1
  }), ne(1), t[0]);
}
const c0 = /* @__PURE__ */ C(l0, [["render", u0]]), f0 = (e, t) => {
  let r;
  return function() {
    const n = () => e.apply(this, arguments);
    clearTimeout(r), r = setTimeout(n, t);
  };
}, m0 = {
  name: "MdClearIcon",
  components: {
    MdIcon: ve
  }
}, h0 = {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, p0 = /* @__PURE__ */ x("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }, null, -1), v0 = /* @__PURE__ */ x("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}, null, -1), g0 = [
  p0,
  v0
];
function _0(e, t, r, n, a, s) {
  const i = b("md-icon");
  return t[0] || (ne(-1), t[0] = k(i, { class: "md-icon-image" }, {
    default: y(() => [
      (f(), w("svg", h0, g0))
    ]),
    _: 1
  }), ne(1), t[0]);
}
const y0 = /* @__PURE__ */ C(m0, [["render", _0]]), b0 = {
  name: "MdPasswordOffIcon",
  components: {
    MdIcon: ve
  }
}, M0 = /* @__PURE__ */ x("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ x("path", {
    d: "M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z",
    fill: "none"
  }),
  /* @__PURE__ */ x("path", { d: "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" })
], -1);
function w0(e, t, r, n, a, s) {
  const i = b("md-icon");
  return t[0] || (ne(-1), t[0] = k(i, { class: "md-icon-image" }, {
    default: y(() => [
      M0
    ]),
    _: 1
  }), ne(1), t[0]);
}
const $0 = /* @__PURE__ */ C(b0, [["render", w0]]), T0 = {
  name: "MdPasswordOnIcon",
  components: {
    MdIcon: ve
  }
}, C0 = /* @__PURE__ */ x("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ x("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }),
  /* @__PURE__ */ x("path", { d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" })
], -1);
function x0(e, t, r, n, a, s) {
  const i = b("md-icon");
  return t[0] || (ne(-1), t[0] = k(i, { class: "md-icon-image" }, {
    default: y(() => [
      C0
    ]),
    _: 1
  }), ne(1), t[0]);
}
const P0 = /* @__PURE__ */ C(T0, [["render", x0]]);
const S0 = new W({
  name: "MdField",
  emits: ["md-clear"],
  components: {
    MdButton: Pe,
    MdClearIcon: y0,
    MdPasswordOffIcon: $0,
    MdPasswordOnIcon: P0
  },
  props: {
    mdInline: Boolean,
    mdClearable: Boolean,
    mdCounter: {
      type: Boolean,
      default: !0
    },
    mdTogglePassword: {
      type: Boolean,
      default: !0
    }
  },
  data: () => ({
    showPassword: !1,
    MdField: {
      value: null,
      focused: !1,
      highlighted: !1,
      disabled: !1,
      required: !1,
      placeholder: !1,
      textarea: !1,
      autogrow: !1,
      maxlength: null,
      counter: null,
      password: null,
      togglePassword: !1,
      clear: !1,
      file: !1,
      hasInvalidValue: !1
    }
  }),
  provide() {
    return {
      MdField: this.MdField
    };
  },
  computed: {
    stringValue() {
      return (this.MdField.value || this.MdField.value === 0) && this.MdField.value.toString();
    },
    hasCounter() {
      return this.mdCounter && (this.MdField.maxlength || this.MdField.counter);
    },
    hasPasswordToggle() {
      return this.mdTogglePassword && this.MdField.password;
    },
    hasValue() {
      return this.stringValue && this.stringValue.length > 0 || this.MdField.hasInvalidValue;
    },
    valueLength() {
      return this.stringValue ? this.stringValue.length : 0;
    },
    fieldClasses() {
      return {
        "md-inline": this.mdInline,
        "md-clearable": this.mdClearable,
        "md-focused": this.MdField.focused,
        "md-highlight": this.MdField.highlighted,
        "md-disabled": this.MdField.disabled,
        "md-required": this.MdField.required,
        "md-has-value": this.hasValue,
        "md-has-placeholder": this.MdField.placeholder,
        "md-has-textarea": this.MdField.textarea,
        "md-has-password": this.MdField.password,
        "md-has-file": this.MdField.file,
        "md-has-select": this.MdField.select,
        "md-autogrow": this.MdField.autogrow
      };
    }
  },
  methods: {
    clearInput() {
      this.MdField.clear = !0, this.$emit("md-clear"), this.$nextTick().then(() => {
        this.MdField.clear = !1;
      });
    },
    togglePassword() {
      this.MdField.togglePassword = !this.MdField.togglePassword;
    },
    onBlur() {
      this.MdField.highlighted = !1;
    }
  }
}), D0 = {
  key: 0,
  class: "md-count"
};
function k0(e, t, r, n, a, s) {
  const i = b("md-clear-icon"), o = b("md-button"), l = b("md-password-on-icon"), d = b("md-password-off-icon");
  return f(), w("div", {
    class: O(["md-field", [e.$mdActiveTheme, e.fieldClasses]]),
    onBlur: t[0] || (t[0] = (...u) => e.onBlur && e.onBlur(...u))
  }, [
    P(e.$slots, "default"),
    e.hasCounter ? (f(), w("span", D0, R(e.valueLength) + " / " + R(e.MdField.maxlength || e.MdField.counter), 1)) : N("", !0),
    k(ue, {
      name: "md-input-action",
      appear: ""
    }, {
      default: y(() => [
        e.hasValue && e.mdClearable ? (f(), D(o, {
          key: 0,
          tabindex: "-1",
          class: "md-icon-button md-dense md-input-action md-clear",
          onClick: e.clearInput,
          disabled: e.MdField.disabled
        }, {
          default: y(() => [
            k(i)
          ]),
          _: 1
        }, 8, ["onClick", "disabled"])) : N("", !0)
      ]),
      _: 1
    }),
    k(ue, {
      name: "md-input-action",
      appear: ""
    }, {
      default: y(() => [
        e.hasPasswordToggle ? (f(), D(o, {
          key: 0,
          tabindex: "-1",
          class: "md-icon-button md-dense md-input-action md-toggle-password",
          onClick: e.togglePassword
        }, {
          default: y(() => [
            e.MdField.togglePassword ? (f(), D(l, { key: 0 })) : (f(), D(d, { key: 1 }))
          ]),
          _: 1
        }, 8, ["onClick"])) : N("", !0)
      ]),
      _: 1
    })
  ], 34);
}
const Vn = /* @__PURE__ */ C(S0, [["render", k0]]), Ms = {
  emits: ["update:modelValue"],
  props: {
    value: {},
    placeholder: String,
    name: String,
    maxlength: [String, Number],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
    mdCounter: [String, Number]
  },
  data() {
    return {
      localValue: this.value,
      textareaHeight: !1
    };
  },
  computed: {
    model: {
      get() {
        return this.attributes.modelValue;
      },
      set(e) {
        e.constructor.toString().match(/function (\w*)/)[1].toLowerCase() !== "inputevent" && this.$nextTick(() => {
          this.localValue = e, this.MdField.hasInvalidValue = this.isInvalidValue();
        });
      }
    },
    clear() {
      return this.MdField.clear;
    },
    attributes() {
      return {
        ...this.$attrs,
        //type: this.type,
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        placeholder: this.placeholder,
        readonly: this.readonly,
        maxlength: this.maxlength
      };
    }
  },
  watch: {
    model(e) {
      this.setFieldValue();
    },
    clear(e) {
      e && this.clearField();
    },
    placeholder() {
      this.setPlaceholder();
    },
    disabled() {
      this.setDisabled();
    },
    required() {
      this.setRequired();
    },
    maxlength() {
      this.setMaxlength();
    },
    mdCounter() {
      this.setMaxlength();
    },
    localValue(e) {
      this.$emit("update:modelValue", e);
    },
    value(e) {
      this.localValue = e;
    }
  },
  methods: {
    clearField() {
      this.$el.value = "", this.model = "", this.setFieldValue();
    },
    setLabelFor() {
      if (this.$el.parentNode) {
        const e = this.$el.parentNode.querySelector("label");
        if (e) {
          const t = e.getAttribute("for");
          (!t || t.indexOf("md-") >= 0) && e.setAttribute("for", this.id);
        }
      }
    },
    setFormResetListener() {
      if (!this.$el.form)
        return;
      this.$el.form.addEventListener("reset", this.onParentFormReset);
    },
    removeFormResetListener() {
      if (!this.$el.form)
        return;
      this.$el.form.removeEventListener("reset", this.onParentFormReset);
    },
    onParentFormReset() {
      this.clearField();
    },
    isInvalidValue() {
      return this.$el.validity ? this.$el.validity.badInput : !1;
    },
    setFieldValue() {
      this.MdField.value = this.model;
    },
    setPlaceholder() {
      this.MdField.placeholder = !!this.placeholder;
    },
    setDisabled() {
      this.MdField.disabled = !!this.disabled;
    },
    setRequired() {
      this.MdField.required = !!this.required;
    },
    setMaxlength() {
      this.mdCounter ? this.MdField.counter = parseInt(this.mdCounter, 10) : this.MdField.maxlength = parseInt(this.maxlength, 10);
    },
    onFocus() {
      this.MdField.focused = !0;
    },
    onBlur() {
      this.MdField.focused = !1;
    }
  },
  created() {
    this.setFieldValue(), this.setPlaceholder(), this.setDisabled(), this.setRequired(), this.setMaxlength();
  },
  mounted() {
    this.setLabelFor(), this.setFormResetListener();
  },
  beforeUnmount() {
    this.removeFormResetListener();
  }
}, O0 = new W({
  name: "MdInput",
  mixins: [Ms],
  inject: ["MdField"],
  props: {
    id: {
      type: String,
      default: () => "md-input-" + Je()
    },
    type: {
      type: String,
      default: "text"
    }
  },
  computed: {
    toggleType() {
      return this.MdField.togglePassword;
    },
    isPassword() {
      return this.type === "password";
    },
    /*
       listeners () {
         var l = {...this.$listeners}
         delete l.input
         return l
       }*/
    listeners() {
      var e = Object.keys(this.$attrs).filter((t) => t.startsWith("on")).reduce((t, r) => (t[r] = this.$attrs[r], t), {});
      return delete e.input, e;
    }
  },
  watch: {
    type(e) {
      this.setPassword(this.isPassword);
    },
    toggleType(e) {
      e ? this.setTypeText() : this.setTypePassword();
    }
  },
  methods: {
    setPassword(e) {
      this.MdField.password = e, this.MdField.togglePassword = !1;
    },
    setTypePassword() {
      this.$el.type = "password";
    },
    setTypeText() {
      this.$el.type = "text";
    }
  },
  created() {
    this.setPassword(this.isPassword);
  },
  mounted() {
    this.isPassword && this.setTypePassword();
  },
  beforeUnmount() {
    this.setPassword(!1);
  }
});
function A0(e, t, r, n, a, s) {
  return yt((f(), w("input", ee({
    class: "md-input",
    "onUpdate:modelValue": t[0] || (t[0] = (i) => e.model = i)
  }, e.attributes, _e(e.listeners, !0), {
    onFocus: t[1] || (t[1] = (...i) => e.onFocus && e.onFocus(...i)),
    onBlur: t[2] || (t[2] = (...i) => e.onBlur && e.onBlur(...i))
  }), null, 16)), [
    [tl, e.model]
  ]);
}
const Qn = /* @__PURE__ */ C(O0, [["render", A0]]);
const E0 = {
  emits: ["update:modelValue", "md-opened", "md-closed", "md-clear"],
  name: "MdDatepicker",
  components: {
    MdOverlay: ns,
    MdDateIcon: c0,
    MdField: Vn,
    MdInput: Qn,
    MdDatepickerDialog: o0
  },
  props: {
    //modelValue: false,
    modelValue: [String, Number, Date],
    // value: [String, Number, Date],
    mdDisabledDates: [Array, Function],
    mdOpenOnFocus: {
      type: Boolean,
      default: !0
    },
    mdCloseOnBlur: {
      type: Boolean,
      default: !1
    },
    mdOverrideNative: {
      type: Boolean,
      default: !0
    },
    mdImmediately: {
      type: Boolean,
      default: !1
    },
    mdModelType: {
      type: Function,
      default: Date,
      ...Z("md-model-type", [Date, String, Number])
    },
    MdDebounce: {
      type: Number,
      default: 1e3
    },
    mdClearable: {
      type: Boolean,
      default: !0
    },
    mdPlacement: {
      type: String,
      default: "bottom-start"
    }
  },
  data: () => ({
    showDialog: !1,
    // String for input
    inputDate: "",
    // Date for real value
    localDate: null
  }),
  setup() {
    const e = Zo("material");
    return {
      locale: el(() => e.locale)
    };
  },
  computed: {
    // locale () {
    //   return this.$material.locale
    // },
    type() {
      return this.mdOverrideNative ? "text" : "date";
    },
    dateFormat() {
      return this.locale.dateFormat || "dd.MM.yyyy";
    },
    modelType() {
      return this.isModelTypeString ? String : this.isModelTypeNumber ? Number : this.isModelTypeDate ? Date : this.mdModelType;
    },
    isModelNull() {
      return this.modelValue === null || this.modelValue === void 0;
    },
    isModelTypeString() {
      return typeof this.modelValue == "string";
    },
    isModelTypeNumber() {
      return Number.isInteger(this.modelValue) && this.value >= 0;
    },
    isModelTypeDate() {
      return typeof this.modelValue == "object" && this.modelValue instanceof Date && Ma(this.modelValue);
    },
    localString() {
      return this.localDate && Js(this.localDate, this.dateFormat);
    },
    localNumber() {
      return this.localDate && Number(this.localDate);
    },
    parsedInputDate() {
      const e = Aa(this.inputDate, this.dateFormat, /* @__PURE__ */ new Date());
      return e && Ma(e) ? e : null;
    },
    pattern() {
      return this.dateFormat.replace(/yyyy|MM|dd/g, (e) => {
        switch (e) {
          case "yyyy":
            return "[0-9]{4}";
          case "MM":
          case "dd":
            return "[0-9]{2}";
        }
      });
    }
  },
  watch: {
    modelValue: {
      immediate: !0,
      handler(e) {
        this.valueDateToLocalDate(), this.inputDate != e && (this.inputDate = e);
      }
    },
    inputDate(e) {
      this.inputDateToLocalDate();
    },
    localDate() {
      this.inputDate = this.localString, this.modelType === Date && this.$emit("update:modelValue", this.localDate);
    },
    localString() {
      this.modelType === String && this.$emit("update:modelValue", this.localString);
    },
    localNumber() {
      this.modelType === Number && this.$emit("update:modelValue", this.localNumber);
    },
    // value: {
    //   immediate: true,
    //   handler () {
    //     this.valueDateToLocalDate()
    //   }
    // },
    mdModelType(e) {
      switch (e) {
        case Date:
          this.$emit("update:modelValue", this.localDate);
          break;
        case String:
          this.$emit("update:modelValue", this.localString);
          break;
        case Number:
          this.$emit("update:modelValue", this.localNumber);
          break;
      }
    },
    dateFormat() {
      this.localDate && (this.inputDate = Js(this.localDate, this.dateFormat));
    }
  },
  methods: {
    toggleDialog(e = null) {
      var t = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      !t || this.mdOverrideNative ? (this.showDialog = e === null ? !this.showDialog : e, this.showDialog ? this.$emit("md-opened") : this.$emit("md-closed")) : this.$refs.input.$el.click();
    },
    // onBlur (event) {
    // 	if(event && !event.relatedTarget || !event) {
    //   	this.showDialog = false;
    // 		this.$emit('md-closed');
    // 	}
    // },
    onFocus() {
      this.mdOpenOnFocus && this.toggleDialog(!0);
    },
    // onBlur(event){
    //   if (this.mdCloseOnBlur && event && !event.relatedTarget || !event) {
    //     this.toggleDialog(false)
    //   }
    // },
    onBlur(e) {
      if (this.mdCloseOnBlur) {
        const t = this.$refs.mdRef.$el, r = e.relatedTarget;
        t.contains(r) || this.toggleDialog(!1);
      }
    },
    // onFocusOut (event) {
    //   if (this.mdCloseOnBlur && event && !event.relatedTarget || !event) {
    //     this.toggleDialog(false)
    //   }
    // },
    inputDateToLocalDate() {
      this.inputDate ? this.parsedInputDate && (this.localDate = this.parsedInputDate) : this.localDate = null;
    },
    valueDateToLocalDate() {
      if (this.isModelNull)
        this.localDate = null;
      else if (this.isModelTypeNumber)
        this.localDate = new Date(this.modelValue);
      else if (this.isModelTypeDate)
        this.localDate = this.modelValue;
      else if (this.isModelTypeString) {
        let e = Aa(this.modelValue, this.dateFormat, /* @__PURE__ */ new Date());
        Ma(e) ? this.localDate = Aa(this.modelValue, this.dateFormat, /* @__PURE__ */ new Date()) : console.log(`The datepicker value is not a valid date. Given value: ${this.modelValue}, format: ${this.dateFormat}`);
      } else
        console.log(`The datepicker value is not a valid date. Given value: ${this.modelValue}`);
    },
    onClear() {
      this.inputDate = "", this.$emit("md-clear");
    }
  },
  created() {
    this.inputDateToLocalDate = f0(this.inputDateToLocalDate, this.MdDebounce), this.inputDate = this.modelValue;
  }
};
function I0(e, t, r, n, a, s) {
  const i = b("md-date-icon"), o = b("md-input"), l = b("md-datepicker-dialog"), d = b("md-overlay"), u = b("md-field");
  return f(), D(u, {
    class: O(["md-datepicker", { "md-native": !r.mdOverrideNative }]),
    "md-clearable": r.mdClearable,
    onMdClear: s.onClear
  }, {
    default: y(() => [
      k(i, {
        class: "md-date-icon",
        onClick: s.toggleDialog
      }, null, 8, ["onClick"]),
      k(o, {
        type: s.type,
        ref: "input",
        modelValue: e.inputDate,
        "onUpdate:modelValue": t[0] || (t[0] = (c) => e.inputDate = c),
        onFocus: s.onFocus,
        onBlur: s.onBlur,
        pattern: s.pattern,
        name: "datepicker-input"
      }, null, 8, ["type", "modelValue", "onFocus", "onBlur", "pattern"]),
      P(e.$slots, "default"),
      (f(), D(cr, null, [
        e.showDialog ? (f(), D(l, {
          key: 0,
          ref: "mdRef",
          mdDate: e.localDate,
          "onUpdate:mdDate": t[1] || (t[1] = (c) => e.localDate = c),
          "md-disabled-dates": r.mdDisabledDates,
          mdImmediately: r.mdImmediately,
          onMdClosed: s.toggleDialog,
          "md-placement": r.mdPlacement
        }, null, 8, ["mdDate", "md-disabled-dates", "mdImmediately", "onMdClosed", "md-placement"])) : N("", !0)
      ], 1024)),
      k(d, {
        class: "md-datepicker-overlay",
        "md-fixed": "",
        "md-active": e.showDialog,
        onClick: t[2] || (t[2] = (c) => s.toggleDialog(!1))
      }, null, 8, ["md-active"])
    ]),
    _: 3
  }, 8, ["class", "md-clearable", "onMdClear"]);
}
const xo = /* @__PURE__ */ C(E0, [["render", I0]]), L0 = (e) => {
  Q(e), e.component(xo.name, xo);
};
const R0 = {
  name: "MdDialogTitle"
}, N0 = { class: "md-dialog-title md-title" };
function H0(e, t, r, n, a, s) {
  return f(), w("span", N0, [
    P(e.$slots, "default")
  ]);
}
const Dr = /* @__PURE__ */ C(R0, [["render", H0]]);
const F0 = new W({
  name: "MdDialogContent"
});
function B0(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-dialog-content", e.$mdActiveTheme])
  }, [
    P(e.$slots, "default")
  ], 2);
}
const kr = /* @__PURE__ */ C(F0, [["render", B0]]), W0 = (e) => {
  Q(e), e.component(lr.name, lr), e.component(Dr.name, Dr), e.component(kr.name, kr), e.component(dr.name, dr);
}, Y0 = {
  emits: ["update:mdActive"],
  components: {
    MdButton: Pe,
    MdDialogActions: dr,
    MdDialogTitle: Dr,
    MdDialog: lr,
    MdDialogContent: kr
  },
  name: "MdDialogAlert",
  props: {
    mdTitle: String,
    mdContent: String,
    mdConfirmText: {
      type: String,
      default: "Ok"
    }
  },
  methods: {
    onConfirm() {
      this.$emit("md-confirm"), this.$emit("update:mdActive", !1);
    }
  }
};
function z0(e, t, r, n, a, s) {
  const i = b("md-dialog-title"), o = b("md-dialog-content"), l = b("md-button"), d = b("md-dialog-actions"), u = b("md-dialog");
  return f(), D(u, ee(e.$attrs, { "md-fullscreen": !1 }), {
    default: y(() => [
      r.mdTitle ? (f(), D(i, { key: 0 }, {
        default: y(() => [
          te(R(r.mdTitle), 1)
        ]),
        _: 1
      })) : N("", !0),
      r.mdContent ? (f(), D(o, {
        key: 1,
        innerHTML: r.mdContent
      }, null, 8, ["innerHTML"])) : N("", !0),
      k(d, null, {
        default: y(() => [
          k(l, {
            class: "md-primary",
            onClick: t[0] || (t[0] = (c) => s.onConfirm())
          }, {
            default: y(() => [
              te(R(r.mdConfirmText), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 16);
}
const Po = /* @__PURE__ */ C(Y0, [["render", z0]]), q0 = (e) => {
  Q(e), e.component(Po.name, Po);
}, U0 = {
  emits: ["md-cancel", "md-confirm", "update:mdActive"],
  components: {
    MdButton: Pe,
    MdDialogActions: dr,
    MdDialogTitle: Dr,
    MdDialog: lr,
    MdDialogContent: kr
  },
  name: "MdDialogConfirm",
  props: {
    mdTitle: String,
    mdContent: String,
    mdConfirmText: {
      type: String,
      default: "Ok"
    },
    mdCancelText: {
      type: String,
      default: "Cancel"
    }
  },
  methods: {
    onCancel() {
      this.$emit("md-cancel"), this.$emit("update:mdActive", !1);
    },
    onConfirm() {
      this.$emit("md-confirm"), this.$emit("update:mdActive", !1);
    }
  }
};
function j0(e, t, r, n, a, s) {
  const i = b("md-dialog-title"), o = b("md-dialog-content"), l = b("md-button"), d = b("md-dialog-actions"), u = b("md-dialog");
  return f(), D(u, ee(e.$attrs, { "md-fullscreen": !1 }), {
    default: y(() => [
      r.mdTitle ? (f(), D(i, { key: 0 }, {
        default: y(() => [
          te(R(r.mdTitle), 1)
        ]),
        _: 1
      })) : N("", !0),
      r.mdContent ? (f(), D(o, {
        key: 1,
        innerHTML: r.mdContent
      }, null, 8, ["innerHTML"])) : N("", !0),
      k(d, null, {
        default: y(() => [
          k(l, { onClick: s.onCancel }, {
            default: y(() => [
              te(R(r.mdCancelText), 1)
            ]),
            _: 1
          }, 8, ["onClick"]),
          k(l, {
            class: "md-primary",
            onClick: s.onConfirm
          }, {
            default: y(() => [
              te(R(r.mdConfirmText), 1)
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 16);
}
const So = /* @__PURE__ */ C(U0, [["render", j0]]), V0 = (e) => {
  Q(e), e.component(So.name, So);
}, Q0 = {
  name: "MdDialogPrompt",
  emits: ["update:modelValue", "md-cancel", "update:mdActive", "md-confirm"],
  props: {
    value: {},
    mdTitle: String,
    mdInputName: String,
    mdInputId: String,
    mdInputMaxlength: [String, Number],
    mdInputPlaceholder: [String, Number],
    mdContent: String,
    mdConfirmText: {
      type: String,
      default: "Ok"
    },
    mdCancelText: {
      type: String,
      default: "Cancel"
    }
  },
  data: () => ({
    inputValue: null
  }),
  watch: {
    value() {
      this.inputValue = this.value;
    }
  },
  methods: {
    onCancel() {
      this.$emit("md-cancel"), this.$emit("update:mdActive", !1);
    },
    onConfirm() {
      this.$emit("update:modelValue", this.inputValue), this.$emit("md-confirm", this.inputValue), this.$emit("update:mdActive", !1);
    },
    setInputFocus() {
      window.setTimeout(() => {
        this.$refs.input.$el.focus();
      }, 50);
    }
  },
  created() {
    this.inputValue = this.value;
  }
};
function X0(e, t, r, n, a, s) {
  const i = b("md-dialog-title"), o = b("md-dialog-content"), l = b("md-input"), d = b("md-field"), u = b("md-button"), c = b("md-dialog-actions"), m = b("md-dialog");
  return f(), D(m, ee(e.$attrs, {
    "md-fullscreen": !1,
    onMdOpened: s.setInputFocus
  }), {
    default: y(() => [
      r.mdTitle ? (f(), D(i, { key: 0 }, {
        default: y(() => [
          te(R(r.mdTitle), 1)
        ]),
        _: 1
      })) : N("", !0),
      r.mdContent ? (f(), D(o, {
        key: 1,
        innerHTML: r.mdContent
      }, null, 8, ["innerHTML"])) : N("", !0),
      k(o, null, {
        default: y(() => [
          k(d, null, {
            default: y(() => [
              k(l, {
                ref: "input",
                modelValue: e.inputValue,
                "onUpdate:modelValue": t[0] || (t[0] = (g) => e.inputValue = g),
                id: r.mdInputId,
                name: r.mdInputName,
                maxlength: r.mdInputMaxlength,
                placeholder: r.mdInputPlaceholder,
                onKeydown: Jo(s.onConfirm, ["enter"])
              }, null, 8, ["modelValue", "id", "name", "maxlength", "placeholder", "onKeydown"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      k(c, null, {
        default: y(() => [
          k(u, {
            class: "md-primary",
            onClick: s.onCancel
          }, {
            default: y(() => [
              te(R(r.mdCancelText), 1)
            ]),
            _: 1
          }, 8, ["onClick"]),
          k(u, {
            class: "md-primary",
            onClick: s.onConfirm
          }, {
            default: y(() => [
              te(R(r.mdConfirmText), 1)
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 16, ["onMdOpened"]);
}
const Do = /* @__PURE__ */ C(Q0, [["render", X0]]), G0 = (e) => {
  Q(e), e.component(Do.name, Do);
};
const K0 = new W({
  name: "MdDivider",
  computed: {
    insideList() {
      return this.$parent.$options._componentTag === "md-list";
    }
  }
});
function J0(e, t, r, n, a, s) {
  return e.insideList ? (f(), w("li", {
    key: 0,
    class: O(["md-divider", [e.$mdActiveTheme]])
  }, null, 2)) : (f(), w("hr", {
    key: 1,
    class: O(["md-divider", [e.$mdActiveTheme]])
  }, null, 2));
}
const ko = /* @__PURE__ */ C(K0, [["render", J0]]), Z0 = (e) => {
  Q(e), e.component(ko.name, ko);
}, ey = new W({
  name: "MdDrawerRightPrevious",
  props: {
    mdPermanent: {
      type: String,
      ...Z("md-permanent", ["full", "clipped", "card"])
    },
    mdPersistent: {
      type: String,
      ...Z("md-persistent", ["mini", "full"])
    },
    mdActive: Boolean,
    mdFixed: Boolean
  },
  computed: {
    drawerClasses() {
      let e = {
        "md-temporary": this.isTemporary,
        "md-persistent": this.mdPersistent,
        "md-permanent": this.mdPermanent,
        "md-active": this.mdActive,
        "md-fixed": this.mdFixed
      };
      return this.mdPermanent && (e["md-permanent-" + this.mdPermanent] = !0), this.mdPersistent && (e["md-persistent-" + this.mdPersistent] = !0), e;
    },
    isTemporary() {
      return !this.mdPermanent && !this.mdPersistent;
    }
  }
});
function ty(e, t, r, n, a, s) {
  return yt((f(), w("div", {
    class: O(["md-drawer md-right-previous", e.drawerClasses])
  }, null, 2)), [
    [rs, !1]
  ]);
}
const Xn = /* @__PURE__ */ C(ey, [["render", ty]]), ry = (e) => {
  Q(e), e.component(Ya.name, Ya), e.component(Xn.name, Xn);
};
const ay = (e) => {
}, ud = {
  mdRounded: Boolean,
  mdSize: {
    type: Number,
    default: 420
  },
  mdIcon: String,
  mdLabel: String,
  mdDescription: String
};
const ny = new W({
  name: "MdEmptyState",
  props: ud,
  computed: {
    emptyStateClasses() {
      return {
        "md-rounded": this.mdRounded
      };
    },
    emptyStateStyles() {
      if (this.mdRounded) {
        const e = this.mdSize + "px";
        return {
          width: e,
          height: e
        };
      }
    }
  }
}), sy = { class: "md-empty-state-container" }, iy = {
  key: 0,
  class: "md-empty-state-label"
}, oy = {
  key: 1,
  class: "md-empty-state-description"
};
function ly(e, t, r, n, a, s) {
  return f(), D(ue, {
    name: "md-empty-state",
    appear: ""
  }, {
    default: y(() => [
      x("div", {
        class: O(["md-empty-state", [e.emptyStateClasses, e.$mdActiveTheme]]),
        style: J(e.emptyStateStyles)
      }, [
        x("div", sy, [
          e.mdLabel ? (f(), w("strong", iy, R(e.mdLabel), 1)) : N("", !0),
          e.mdDescription ? (f(), w("p", oy, R(e.mdDescription), 1)) : N("", !0),
          P(e.$slots, "default")
        ])
      ], 6)
    ]),
    _: 3
  });
}
const Gn = /* @__PURE__ */ C(ny, [["render", ly]]), dy = (e) => {
  Q(e), e.component(Gn.name, Gn);
}, uy = {
  name: "MdFileIcon",
  components: {
    MdIcon: ve
  }
}, cy = /* @__PURE__ */ x("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ x("path", { d: "M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" }),
  /* @__PURE__ */ x("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  })
], -1);
function fy(e, t, r, n, a, s) {
  const i = b("md-icon");
  return t[0] || (ne(-1), t[0] = k(i, { class: "md-icon-image" }, {
    default: y(() => [
      cy
    ]),
    _: 1
  }), ne(1), t[0]);
}
const my = /* @__PURE__ */ C(uy, [["render", fy]]);
const hy = {
  emits: ["md-change"],
  name: "MdFile",
  components: {
    MdFileIcon: my
  },
  props: {
    id: {
      type: String,
      default: () => "md-file-" + Je()
    },
    name: String
  },
  computed: {
    iconClass() {
      return {
        "md-disabled": this.disabled
      };
    }
  },
  mixins: [Ms],
  inject: ["MdField"],
  methods: {
    getMultipleName(e) {
      let t = [];
      return [...e].forEach(({ name: r }) => t.push(r)), t.join(", ");
    },
    getFileName(e, t) {
      return !e || e.length === 0 ? t.value.split("\\").pop() : e.length > 1 ? this.getMultipleName(e) : e.length === 1 ? e[0].name : null;
    },
    openPicker() {
      this.onFocus(), this.$refs.inputFile.click();
    },
    onChange(e) {
      this.onFileSelected(e);
    },
    onFileSelected({ target: e, dataTransfer: t }) {
      const r = e.files || t.files;
      this.model = this.getFileName(r, e), this.$emit("md-change", r || e.value);
    }
  },
  created() {
    this.MdField.file = !0;
  },
  beforeUnmount() {
    this.MdField.file = !1;
  }
}, py = { class: "md-file" };
function vy(e, t, r, n, a, s) {
  const i = b("md-file-icon");
  return f(), w("div", py, [
    k(i, {
      class: O(["md-file-icon", s.iconClass]),
      onClick: s.openPicker
    }, null, 8, ["class", "onClick"]),
    yt(x("input", ee({
      class: "md-input",
      readonly: "",
      "onUpdate:modelValue": t[0] || (t[0] = (o) => e.model = o)
    }, { disabled: e.disabled, required: e.required, placeholder: e.placeholder }, {
      onClick: t[1] || (t[1] = (...o) => s.openPicker && s.openPicker(...o)),
      onBlur: t[2] || (t[2] = (...o) => e.onBlur && e.onBlur(...o))
    }), null, 16), [
      [tl, e.model]
    ]),
    x("input", ee({
      type: "file",
      ref: "inputFile"
    }, e.attributes, {
      onChange: t[3] || (t[3] = (...o) => s.onChange && s.onChange(...o))
    }), null, 16)
  ]);
}
const Oo = /* @__PURE__ */ C(hy, [["render", vy]]);
function gy(e, t) {
  const r = e.style.height, n = e.offsetHeight, a = e.scrollHeight;
  return e.style.overflow = "hidden", n >= a && (e.style.height = n + t + "px", a < e.scrollHeight) ? (e.style.height = r, n) : a;
}
const _y = new W({
  name: "MdTextarea",
  mixins: [Ms],
  inject: ["MdField"],
  props: {
    id: {
      type: String,
      default: () => "md-textarea-" + Je()
    },
    mdAutogrow: Boolean
  },
  computed: {
    listeners() {
      return {
        //...this.$listeners,
        input: this.onInput
      };
    },
    textareaStyles() {
      return {
        height: this.textareaHeight
      };
    }
  },
  methods: {
    getTextAreaLineSize() {
      const e = window.getComputedStyle(this.$el);
      return parseInt(e.lineHeight, 10);
    },
    setTextAreaSize(e) {
      let t = e;
      if (!e) {
        const r = this.getTextAreaLineSize();
        t = gy(this.$el, r);
      }
      this.textareaHeight = t + "px";
    },
    applyStyles() {
      this.mdAutogrow && (this.setTextAreaSize(32), this.$nextTick().then(() => {
        this.setTextAreaSize(), window.setTimeout(() => {
          this.$el.style.overflow = "auto";
        }, 10);
      }));
    },
    setTextarea() {
      this.MdField.textarea = !0;
    },
    setAutogrow() {
      this.MdField.autogrow = this.mdAutogrow;
    },
    onInput() {
      this.setFieldValue();
    }
  },
  watch: {
    localValue() {
      this.applyStyles();
    }
  },
  created() {
    this.setTextarea(), this.setAutogrow();
  },
  mounted() {
    this.$nextTick().then(this.applyStyles);
  },
  beforeUnmount() {
    this.setTextarea(!1);
  }
});
function yy(e, t, r, n, a, s) {
  return yt((f(), w("textarea", ee({
    class: "md-textarea",
    style: e.textareaStyles,
    "onUpdate:modelValue": t[0] || (t[0] = (i) => e.model = i)
  }, e.attributes, _e(e.listeners, !0), {
    onFocus: t[1] || (t[1] = (...i) => e.onFocus && e.onFocus(...i)),
    onBlur: t[2] || (t[2] = (...i) => e.onBlur && e.onBlur(...i))
  }), `
  `, 16)), [
    [Td, e.model]
  ]);
}
const Ao = /* @__PURE__ */ C(_y, [["render", yy]]), by = (e) => {
  Q(e), e.component(Vn.name, Vn), e.component(Oo.name, Oo), e.component(Qn.name, Qn), e.component(Ao.name, Ao);
}, My = (e) => {
  Q(e), e.component(ve.name, ve);
};
const wy = (e) => {
};
const $y = new W({
  name: "MdList",
  data() {
    return {
      MdList: {
        expandable: [],
        expandATab: this.expandATab,
        pushExpandable: this.pushExpandable,
        removeExpandable: this.removeExpandable
      }
    };
  },
  provide() {
    return {
      MdList: this.MdList
    };
  },
  props: {
    mdExpandSingle: {
      default: !1
    }
  },
  methods: {
    expandATab(e) {
      this.mdExpandSingle && e && this.MdList.expandable.filter(
        (r) => r !== e
      ).forEach(
        (r) => r.close()
      );
    },
    pushExpandable(e) {
      let t = this.MdList.expandable;
      t.find((r) => r === e) || (this.MdList.expandable = t.concat([
        e
      ]));
    },
    removeExpandable(e) {
      let t = this.MdList.expandable;
      t.find((r) => r === e) && (this.MdList.expandable = t.filter(
        (r) => r !== e
      ));
    }
  }
});
function Ty(e, t, r, n, a, s) {
  return f(), w("ul", ee({
    class: ["md-list", [e.$mdActiveTheme]]
  }, e.$attrs, _e(e.$listeners, !0)), [
    P(e.$slots, "default")
  ], 16);
}
const Kn = /* @__PURE__ */ C($y, [["render", Ty]]), Cy = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup"
], xy = {
  name: "MdListItemContent",
  components: {
    MdRipple: Ke
  },
  props: {
    mdDisabled: Boolean
  }
};
function Py(e, t, r, n, a, s) {
  const i = b("md-ripple");
  return f(), D(i, {
    class: "md-list-item-content",
    "md-disabled": r.mdDisabled
  }, {
    default: y(() => [
      P(e.$slots, "default")
    ]),
    _: 3
  }, 8, ["md-disabled"]);
}
const Sy = /* @__PURE__ */ C(xy, [["render", Py]]), Vt = {
  mixins: [dl],
  components: {
    MdListItemContent: Sy
  },
  props: {
    disabled: Boolean
  },
  computed: {
    isDisabled() {
      return !this.mdRipple || this.disabled;
    }
  }
}, Dy = {
  name: "MdListItemDefault",
  mixins: [Vt],
  methods: {
    toggleControl() {
      const e = this.$el.querySelector(
        ".md-checkbox-container, .md-switch-container, .md-radio-container"
      );
      e && e.click();
    }
  }
};
function ky(e, t, r, n, a, s) {
  const i = b("md-list-item-content");
  return f(), w("div", {
    class: "md-list-item-default",
    onClick: t[0] || (t[0] = (...o) => s.toggleControl && s.toggleControl(...o))
  }, [
    k(i, { "md-disabled": "" }, {
      default: y(() => [
        P(e.$slots, "default")
      ]),
      _: 3
    })
  ]);
}
const Oy = /* @__PURE__ */ C(Dy, [["render", ky]]), Ay = {
  name: "MdListItemFakeButton",
  mixins: [Vt]
}, Ey = ["disabled"];
function Iy(e, t, r, n, a, s) {
  const i = b("md-list-item-content");
  return f(), w("div", {
    class: "md-list-item-fake-button",
    disabled: e.disabled
  }, [
    k(i, { "md-disabled": e.isDisabled }, {
      default: y(() => [
        P(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["md-disabled"])
  ], 8, Ey);
}
const Ly = /* @__PURE__ */ C(Ay, [["render", Iy]]), Ry = {
  name: "MdListItemButton",
  mixins: [Vt]
}, Ny = ["disabled"];
function Hy(e, t, r, n, a, s) {
  const i = b("md-list-item-content");
  return f(), w("button", {
    type: "button",
    class: "md-list-item-button",
    disabled: e.disabled
  }, [
    k(i, { "md-disabled": e.isDisabled }, {
      default: y(() => [
        P(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["md-disabled"])
  ], 8, Ny);
}
const cd = /* @__PURE__ */ C(Ry, [["render", Hy]]), Fy = {
  name: "MdListItemLink",
  mixins: [Vt],
  props: {
    download: String,
    href: String,
    hreflang: String,
    ping: String,
    rel: String,
    target: String,
    type: String
  }
};
function By(e, t, r, n, a, s) {
  const i = b("md-list-item-content");
  return f(), w("a", ee({ class: "md-list-item-link" }, e.$props), [
    k(i, { "md-disabled": e.isDisabled }, {
      default: y(() => [
        P(e.$slots, "default")
      ]),
      _: 3
    }, 8, ["md-disabled"])
  ], 16);
}
const Wy = /* @__PURE__ */ C(Fy, [["render", By]]), Yy = {
  name: "MdListItemRouter",
  mixins: [Vt],
  computed: {
    routerProps() {
      return this.$props;
    }
  }
};
function zy(e, t, r, n, a, s) {
  const i = b("md-list-item-content"), o = b("router-link");
  return f(), D(o, ee({ class: "md-list-item-router" }, s.routerProps), {
    default: y(() => [
      k(i, { "md-disabled": e.isDisabled }, {
        default: y(() => [
          P(e.$slots, "default")
        ]),
        _: 3
      }, 8, ["md-disabled"])
    ]),
    _: 3
  }, 16);
}
const Fa = /* @__PURE__ */ C(Yy, [["render", zy]]), qy = {
  name: "MdArrowDownIcon",
  components: {
    MdIcon: ve
  }
}, Uy = /* @__PURE__ */ x("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ x("path", { d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" }),
  /* @__PURE__ */ x("path", {
    d: "M0-.75h24v24H0z",
    fill: "none"
  })
], -1);
function jy(e, t, r, n, a, s) {
  const i = b("md-icon");
  return t[0] || (ne(-1), t[0] = k(i, { class: "md-icon-image" }, {
    default: y(() => [
      Uy
    ]),
    _: 1
  }), ne(1), t[0]);
}
const Vy = /* @__PURE__ */ C(qy, [["render", jy]]);
const Qy = {
  name: "MdListItemExpand",
  components: {
    MdArrowDownIcon: Vy
  },
  mixins: [Vt],
  inject: ["MdList"],
  data: () => ({
    expandStyles: {},
    showContent: !1
  }),
  props: {
    mdExpanded: Boolean
  },
  computed: {
    expandClasses() {
      return {
        "md-active": this.showContent
      };
    }
  },
  methods: {
    getChildrenSize() {
      const e = this.$refs.listExpand;
      let t = 0;
      return Array.from(e.children).forEach((r) => {
        t += r.offsetHeight;
      }), t;
    },
    fetchStyle() {
      return new Promise((e) => {
        Er(() => {
          let t = 0;
          this.showContent || (t = "auto"), this.expandStyles = { height: t }, e();
        });
      });
    },
    toggleExpand() {
      this.fetchStyle().then(() => {
        this.showContent = !this.showContent;
      });
    },
    open() {
      if (this.showContent)
        return !1;
      this.fetchStyle().then(() => {
        this.showContent = !0;
      });
    },
    close() {
      if (!this.showContent)
        return !1;
      this.fetchStyle().then(() => {
        this.showContent = !1;
      });
    }
  },
  watch: {
    mdExpanded() {
      this.mdExpanded ? this.open() : this.close();
    },
    showContent() {
      let e = this.showContent;
      this.$emit("update:mdExpanded", e), this.$nextTick(
        () => this.$emit(e ? "md-expanded" : "md-collapsed")
      ), e && this.MdList.expandATab(this);
    }
  },
  created() {
    this.MdList.pushExpandable(this);
  },
  mounted() {
    this.mdExpanded && this.open();
  },
  beforeUnmount() {
    this.MdList.removeExpandable(this);
  }
};
function Xy(e, t, r, n, a, s) {
  const i = b("md-arrow-down-icon"), o = b("md-list-item-content");
  return f(), w("div", {
    class: O(["md-list-item-expand", s.expandClasses])
  }, [
    k(o, {
      "md-disabled": e.isDisabled,
      onClick: s.toggleExpand
    }, {
      default: y(() => [
        P(e.$slots, "default"),
        k(i, { class: "md-list-expand-icon" })
      ]),
      _: 3
    }, 8, ["md-disabled", "onClick"]),
    x("div", {
      class: "md-list-expand",
      ref: "listExpand",
      style: J(e.expandStyles)
    }, [
      P(e.$slots, "md-expand")
    ], 4)
  ], 2);
}
const Gy = /* @__PURE__ */ C(Qy, [["render", Xy]]);
function fd(e) {
  return e.hasOwnProperty("mdExpand") && e.mdExpand !== !1;
}
function Ky(e, t) {
  if (fd(e))
    return {
      "md-expand": () => t["md-expand"] ? t["md-expand"]() : []
    };
}
function Jy(e) {
  return e.default && e.default.some(
    (t) => t.type && t.type.name === "MdButton"
  );
}
function Zy(e) {
  let t = Object.keys(e || {}), r = !1;
  return t.forEach((n) => {
    Cy.includes(n) && (r = !0);
  }), r;
}
function eb(e, t) {
  return e && e.$router && t.to;
}
function tb(e, t, r, n) {
  return fd(e) ? Gy : e.disabled ? cd : eb(t, e) ? (Fa.props = is(t, {
    target: String
  }), delete Fa.props.href, Fa) : e.href ? Wy : Zy(r) ? rb(n) : Oy;
}
function rb(e) {
  return Jy(e) ? Ly : cd;
}
const Jn = {
  name: "MdListItem",
  functional: !0,
  components: {
    MdButton: Pe
  },
  render(e, { parent: t, listeners: r, data: n, slots: a }) {
    let s = tb(e, t, r, a), i = "md-list-item";
    n.staticClass && (i += " " + n.staticClass);
    const o = {};
    a.default && (o.default = () => a.default());
    const l = Ky(e, a);
    return l && Object.assign(o, l), xe(
      "li",
      {
        ...n,
        class: i,
        onClick: r == null ? void 0 : r.click,
        on: r
      },
      [
        xe(
          s,
          {
            ...e,
            class: "md-list-item-container md-button-clean",
            onClick: r == null ? void 0 : r.click,
            on: r
          },
          o
        )
      ]
    );
  }
}, ab = (e) => {
  Q(e), e.component(Kn.name, Kn), e.component(Jn.name, Jn);
};
const nb = {
  emits: ["md-opened", "md-closed", "update:mdActive"],
  name: "MdMenu",
  props: {
    mdActive: Boolean,
    mdAlignTrigger: Boolean,
    mdOffsetX: Number,
    mdOffsetY: Number,
    mdFullWidth: Boolean,
    mdDense: Boolean,
    mdDirection: {
      type: String,
      default: "bottom-start",
      ...Z("md-direction", [
        "top-end",
        "top-start",
        "bottom-end",
        "bottom-start"
      ])
    },
    mdCloseOnSelect: {
      type: Boolean,
      default: !0
    },
    mdCloseOnClick: {
      type: Boolean,
      default: !1
    },
    mdSize: {
      type: String,
      default: "small",
      ...Z("md-size", [
        "auto",
        "small",
        "medium",
        "big",
        "huge"
      ])
    }
  },
  data() {
    return {
      triggerEl: null,
      MdMenu: {
        instance: this,
        active: this.mdActive,
        direction: this.mdDirection,
        size: this.mdSize,
        alignTrigger: this.mdAlignTrigger,
        offsetX: this.mdOffsetX,
        offsetY: this.mdOffsetY,
        fullWidth: this.mdFullWidth,
        dense: this.mdDense,
        closeOnSelect: this.mdCloseOnSelect,
        closeOnClick: this.mdCloseOnClick,
        bodyClickObserver: null,
        windowResizeObserver: null,
        $el: this.$el
      }
    };
  },
  provide() {
    return {
      MdMenu: this.MdMenu
    };
  },
  computed: {
    isActive() {
      return this.MdMenu.active;
    }
  },
  watch: {
    mdActive: {
      immediate: !0,
      handler(e) {
        this.MdMenu.active = e;
      }
    },
    mdDirection(e) {
      this.MdMenu.direction = e;
    },
    mdSize(e) {
      this.MdMenu.size = e;
    },
    mdAlignTrigger(e) {
      this.MdMenu.alignTrigger = e;
    },
    mdOffsetX(e) {
      this.MdMenu.offsetX = e;
    },
    mdOffsetY(e) {
      this.MdMenu.offsetY = e;
    },
    isActive(e) {
      this.$emit("update:mdActive", e), e ? this.$emit("md-opened") : this.$emit("md-closed");
    },
    mdCloseOnSelect() {
      this.MdMenu.closeOnSelect = this.mdCloseOnSelect;
    },
    mdCloseOnClick() {
      this.MdMenu.closeOnClick = this.mdCloseOnClick;
    }
  },
  methods: {
    toggleContent(e) {
      this.MdMenu.active = !this.MdMenu.active;
    }
  },
  mounted() {
    this.MdMenu.$el = this.$el, this.$nextTick().then(() => {
      this.triggerEl = this.$el.querySelector("[md-menu-trigger]"), this.triggerEl && this.triggerEl.addEventListener("click", this.toggleContent);
    });
  },
  beforeUnmount() {
    this.triggerEl && this.triggerEl.removeEventListener("click", this.toggleContent);
  }
}, sb = { class: "md-menu" };
function ib(e, t, r, n, a, s) {
  return f(), w("div", sb, [
    P(e.$slots, "default")
  ]);
}
const Eo = /* @__PURE__ */ C(nb, [["render", ib]]), md = (e, t, r, n) => {
  function a() {
    e.removeEventListener(t, r);
  }
  return t && t.indexOf("click") >= 0 && /iP/i.test(navigator.userAgent) && (e.style.cursor = "pointer"), e.addEventListener(t, r, n || !1), {
    destroy: a
  };
}, ws = (e = window, t) => ({
  destroy: md(e, "resize", () => {
    window.requestAnimationFrame(t);
  }, { passive: !0 }).destroy
}), Io = (e, t) => typeof Node.prototype.contains == "function" ? Node.prototype.contains.call(e, t) : (Node.prototype.compareDocumentPosition.call(t, e) & Node.prototype.DOCUMENT_POSITION_CONTAINS) !== 0;
const ob = new W({
  emits: ["setParentOffsets"],
  name: "MdMenuContent",
  components: {
    MdPopover: bs,
    MdFocusTrap: dd,
    MdList: Kn
  },
  props: {
    mdListClass: [String, Boolean],
    mdContentClass: [String, Boolean],
    listenTyping: [Boolean],
    id: [String],
    show: [Boolean]
  },
  inject: ["MdMenu"],
  data: () => ({
    highlightIndex: -1,
    didMount: !1,
    highlightItems: [],
    popperSettings: null,
    menuStyles: "",
    observerTimeout: !1,
    typingTimeout: !1,
    typingBuffer: "",
    I_id: !1,
    I_keyListenersEnabled: !1
  }),
  computed: {
    filteredAttrs() {
      return this.$attrs;
    },
    highlightedItem() {
      return this.highlightItems[this.highlightIndex];
    },
    shouldRender() {
      return this.MdMenu.active;
    },
    menuClasses() {
      const e = "md-menu-content-";
      return {
        [e + this.MdMenu.direction]: !0,
        [e + this.MdMenu.size]: !0,
        "md-menu-content": this.didMount,
        "md-shallow": !this.didMount
      };
    },
    listClasses() {
      return {
        "md-dense": this.MdMenu.dense,
        ...this.mdListClass
      };
    }
  },
  watch: {
    shouldRender(e) {
      e && (this.setPopperSettings(), setTimeout(() => {
        this.setInitialHighlightIndex(), this.createResizeObserver(), this.createKeydownListener();
      }, 0), this.observerTimeout && (clearTimeout(this.observerTimeout), this.observerTimeout = !1), this.observerTimeout = setTimeout(() => {
        this.createClickEventObserver();
      }, 200));
    }
  },
  methods: {
    setPopperSettings() {
      const { direction: e, alignTrigger: t } = this.MdMenu;
      let { offsetX: r, offsetY: n } = this.getOffsets();
      this.hasCustomOffsets() || (this.MdMenu.instance.$el && this.MdMenu.instance.$el.offsetHeight && (n = -this.MdMenu.instance.$el.offsetHeight - 11), e.includes("start") ? r = -8 : e.includes("end") && (r = 8)), this.popperSettings = {
        placement: e,
        modifiers: {
          keepTogether: {
            enabled: !0
          },
          flip: {
            enabled: !1
          },
          offset: {
            offset: `${r}, ${n}`
          }
        }
      };
    },
    setInitialHighlightIndex() {
      this.setHighlightItems(), this.highlightItems.forEach((e, t) => {
        e.classList.contains("md-selected") && (this.highlightIndex = t - 1);
      });
    },
    setHighlightItems() {
      if (this.$el.querySelectorAll) {
        const e = this.$el.querySelectorAll(".md-list-item-container:not(.md-list-item-default):not([disabled])");
        this.highlightItems = Array.from(e);
      }
    },
    getIndexHighlightFromTyping() {
      var e = this, t = 0, r = !1, n = !1;
      for (const i of this.highlightItems) {
        var a = i.querySelector(".md-list-item-text");
        if (a) {
          var s = a.innerHTML.toLowerCase();
          if (s)
            if (s.startsWith(e.typingBuffer)) {
              r = !0;
              break;
            } else
              e.typingBuffer.length > 1 && s.includes(e.typingBuffer) && !s.startsWith("-") && (n = t);
        }
        t++;
      }
      return r ? t : n || 0;
    },
    setHighlight(e, t) {
      if (this.setHighlightItems(), this.highlightItems.length) {
        if (t && this.typingBuffer.length > 0) {
          var r = this.getIndexHighlightFromTyping();
          this.highlightIndex = r;
        } else
          e === "down" ? this.highlightIndex === this.highlightItems.length - 1 ? this.highlightIndex = 0 : this.highlightIndex++ : this.highlightIndex === 0 ? this.highlightIndex = this.highlightItems.length - 1 : this.highlightIndex--;
        this.clearAllHighlights(), this.setItemHighlight();
      }
    },
    clearAllHighlights() {
      this.highlightItems.forEach((e) => {
        e.closest(".md-menu-item").classList.remove("md-highlight");
      });
    },
    setItemHighlight() {
      if (this.highlightedItem) {
        var e = this.highlightedItem.closest(".md-menu-item");
        e.classList.add("md-highlight"), this.$emit("setParentOffsets", e);
      }
    },
    setSelection() {
      this.highlightedItem && this.highlightedItem.closest(".md-menu-item").click();
    },
    onEsc() {
      this.MdMenu.active = !1, this.destroyKeyDownListener();
    },
    getOffsets() {
      const e = this.getBodyPosition(), t = this.MdMenu.offsetX || 0, r = this.MdMenu.offsetY || 0;
      return {
        offsetX: t - e.x,
        offsetY: r - e.y
      };
    },
    hasCustomOffsets() {
      const { offsetX: e, offsetY: t, alignTrigger: r } = this.MdMenu;
      return !!(r || t || e);
    },
    isMenu({ target: e }) {
      return this.MdMenu.$el ? Io(this.MdMenu.$el, e) : !1;
    },
    isMenuContentEl({ target: e }) {
      return this.$refs.menu ? Io(this.$refs.menu, e) : !1;
    },
    createClickEventObserver() {
      document && (this.MdMenu.bodyClickObserver = md(document.body, "click", (e) => {
        e.stopPropagation(), !this.isMenu(e) && (this.MdMenu.closeOnClick || !this.isMenuContentEl(e)) && (this.MdMenu.active = !1, this.MdMenu.bodyClickObserver.destroy(), this.MdMenu.windowResizeObserver.destroy(), this.destroyKeyDownListener());
      }));
    },
    createKeydownListener() {
      var e = this.id ? this.id : this.I_id;
      if (this.I_keyListenersEnabled)
        return !1;
      this.keyNavigationListener = (t) => this.keyNavigation(t, e), window.addEventListener("keydown", this.keyNavigationListener), this.I_keyListenersEnabled = !0;
    },
    destroyKeyDownListener() {
      window.removeEventListener("keydown", this.keyNavigationListener), this.I_keyListenersEnabled = !1;
    },
    keyNavigation(e, t) {
      if (!this.show || this.id && t !== this.id || !this.id && this.I_id && t != this.I_id)
        return !1;
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault(), this.setHighlight("up");
          break;
        case "ArrowDown":
          e.preventDefault(), this.setHighlight("down");
          break;
        case "Enter":
          this.setSelection(), e.stopPropagation();
          break;
        case "Space":
          this.setSelection(), e.stopPropagation();
          break;
        case "Escape":
          this.onEsc();
          break;
        case "Tab":
          this.onEsc();
          break;
        default:
          this.listenTyping && this.onTyping(e);
      }
    },
    onTyping(e) {
      if (e && e.key && e.key.length == 1 && /^[A-Za-z0-9]*$/.test(e.key)) {
        this.typingTimeout && clearTimeout(this.typingTimeout), this.typingBuffer += e.key, this.setHighlight(!1, !0);
        var t = this;
        this.typingTimeout = setTimeout(function() {
          t.typingBuffer = "";
        }, 400);
      }
    },
    createResizeObserver() {
      this.MdMenu.windowResizeObserver = ws(window, this.setStyles);
    },
    setupWatchers() {
      this.$watch("MdMenu.direction", this.setPopperSettings), this.$watch("MdMenu.alignTrigger", this.setPopperSettings), this.$watch("MdMenu.offsetX", this.setPopperSettings), this.$watch("MdMenu.offsetY", this.setPopperSettings);
    },
    setStyles() {
      this.MdMenu.fullWidth && (this.menuStyles = `
            width: ${this.MdMenu.instance.$el.offsetWidth}px;
            max-width: ${this.MdMenu.instance.$el.offsetWidth}px
          `);
    },
    getBodyPosition() {
      const e = document.body, { top: t, left: r } = e.getBoundingClientRect(), n = window.scrollX !== void 0 ? window.scrollX : e.scrollLeft, a = window.scrollY !== void 0 ? window.scrollY : e.scrollTop;
      return { x: r + n, y: t + a };
    }
  },
  mounted() {
    this.id || (this.I_id = Math.floor(Math.random() * (9999 - 999 + 1)) + 999 + ""), this.$nextTick().then(() => {
      this.setHighlightItems(), this.setupWatchers(), this.setStyles(), this.didMount = !0;
    });
  },
  beforeUnmount() {
    this.MdMenu.bodyClickObserver && this.MdMenu.bodyClickObserver.destroy(), this.MdMenu.windowResizeObserver && this.MdMenu.windowResizeObserver.destroy(), this.destroyKeyDownListener();
  }
});
function lb(e, t, r, n, a, s) {
  const i = b("md-list"), o = b("md-popover");
  return f(), D(o, {
    "md-settings": e.popperSettings,
    "transition-prefix": "md-menu-content",
    "md-active": e.shouldRender
  }, {
    default: y(() => [
      k(ue, {
        name: "md-menu-content",
        css: e.didMount
      }, {
        default: y(() => [
          e.shouldRender ? (f(), w("div", {
            key: 0,
            class: O([e.menuClasses, e.mdContentClass, e.$mdActiveTheme]),
            style: J(e.menuStyles),
            ref: "menu"
          }, [
            x("div", {
              class: O(["md-menu-content-container md-scrollbar", e.$mdActiveTheme]),
              ref: "container"
            }, [
              k(i, ee({ class: e.listClasses }, e.filteredAttrs), {
                default: y(() => [
                  P(e.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ], 2)
          ], 6)) : N("", !0)
        ]),
        _: 3
      }, 8, ["css"])
    ]),
    _: 3
  }, 8, ["md-settings", "md-active"]);
}
const Lo = /* @__PURE__ */ C(ob, [["render", lb]]), db = new W({
  components: {
    MdListItem: Jn
  },
  name: "MdMenuItem",
  props: {
    disabled: Boolean
  },
  inject: ["MdMenu"],
  data: () => ({
    highlighted: !1
  }),
  computed: {
    itemClasses() {
      return {
        "md-highlight": this.highlighted
      };
    }
    /*
          listeners () {
            if (this.disabled) {
              return {}
            }
    				
            if (!this.MdMenu.closeOnSelect) {
              return this.$listeners ? 
            }
    
            let listeners = {}
            let listenerNames = Object.keys(this.$listeners)
    
            listenerNames.forEach(listener => {
              if (MdInteractionEvents.includes(listener)) {
                listeners[listener] = $event => {
                  this.$listeners[listener]($event)
                  this.closeMenu()
                }
              } else {
                listeners[listener] = this.$listeners[listener]
              }
            })
    
            return listeners
          }*/
  },
  methods: {
    closeMenu() {
      this.MdMenu.active = !1, this.MdMenu.eventObserver && this.MdMenu.eventObserver.destroy();
    },
    triggerCloseMenu() {
      this.disabled || this.closeMenu();
    }
  },
  mounted() {
    this.$el.children && this.$el.children[0] && this.$el.children[0].tagName.toUpperCase() === "A" && this.$el.addEventListener("click", this.triggerCloseMenu);
  },
  unmounted() {
    this.$el && this.$el.removeEventListener("click", this.triggerCloseMenu);
  }
});
function ub(e, t, r, n, a, s) {
  const i = b("md-list-item");
  return f(), D(i, ee({ class: "md-menu-item" }, e.$attrs, {
    class: [e.itemClasses, e.$mdActiveTheme],
    disabled: e.disabled,
    tabindex: e.highlighted && -1,
    onClick: t[0] || (t[0] = (o) => e.closeMenu())
  }), {
    default: y(() => [
      P(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["class", "disabled", "tabindex"]);
}
const Ro = /* @__PURE__ */ C(db, [["render", ub]]), cb = (e) => {
  Q(e), e.component(Eo.name, Eo), e.component(Lo.name, Lo), e.component(Ro.name, Ro);
}, fb = (e) => {
  Q(e), e.component(Ke.name, Ke), e.component(za.name, za);
}, mb = {
  name: "MdSnackbarContent",
  props: {
    mdClasses: Array
  }
}, hb = { class: "md-snackbar-content" };
function pb(e, t, r, n, a, s) {
  return f(), D(ue, {
    name: "md-snackbar",
    appear: ""
  }, {
    default: y(() => [
      x("div", {
        class: O(["md-snackbar", r.mdClasses])
      }, [
        x("div", hb, [
          P(e.$slots, "default")
        ])
      ], 2)
    ]),
    _: 3
  });
}
const vb = /* @__PURE__ */ C(mb, [["render", pb]]);
let ur = null, hd = null;
function No(e, t, r) {
  return new Promise((n) => {
    ur = {
      destroy: () => {
        ur = null, n();
      }
    }, e !== 1 / 0 && (hd = window.setTimeout(() => {
      $s();
    }, e));
  });
}
const $s = () => new Promise((e) => {
  ur ? (window.clearTimeout(hd), ur.destroy(), window.setTimeout(e, 400)) : e();
}), gb = (e, t, r) => ur ? $s().then(() => No(e)) : No(e);
const _b = new W({
  name: "MdSnackbar",
  components: {
    MdPortal: Ir,
    MdSnackbarContent: vb
  },
  props: {
    mdActive: Boolean,
    mdPersistent: Boolean,
    mdDuration: {
      type: Number,
      default: 4e3
    },
    mdPosition: {
      type: String,
      default: "center",
      ...Z("md-position", ["center", "left"])
    }
  },
  emits: ["update:mdActive", "md-opened", "md-closed"],
  computed: {
    snackbarClasses() {
      return {
        ["md-position-" + this.mdPosition]: !0
      };
    }
  },
  watch: {
    mdActive(e) {
      e ? gb(this.mdDuration, this.mdPersistent).then(() => {
        this.$emit("update:mdActive", !1), this.$emit("md-opened");
      }) : ($s(), this.$emit("md-closed"));
    }
  }
});
function yb(e, t, r, n, a, s) {
  const i = b("md-snackbar-content"), o = b("md-portal");
  return e.mdPersistent && e.mdDuration !== 1 / 0 ? (f(), D(o, { key: 0 }, {
    default: y(() => [
      (f(), D(cr, null, [
        e.mdActive ? (f(), D(i, {
          key: 0,
          "md-classes": [e.snackbarClasses, e.$mdActiveTheme]
        }, {
          default: y(() => [
            P(e.$slots, "default")
          ]),
          _: 3
        }, 8, ["md-classes"])) : N("", !0)
      ], 1024))
    ]),
    _: 3
  })) : (f(), D(o, { key: 1 }, {
    default: y(() => [
      e.mdActive ? (f(), D(i, {
        key: 0,
        "md-classes": [e.snackbarClasses, e.$mdActiveTheme]
      }, {
        default: y(() => [
          P(e.$slots, "default")
        ]),
        _: 3
      }, 8, ["md-classes"])) : N("", !0)
    ]),
    _: 3
  }));
}
const Ho = /* @__PURE__ */ C(_b, [["render", yb]]), bb = (e) => {
  Q(e), e.component(Ho.name, Ho);
};
const Mb = new W({
  name: "MdSpeedDial",
  props: {
    mdEvent: {
      type: String,
      default: "hover",
      ...Z("md-event", ["click", "hover"])
    },
    mdDirection: {
      type: String,
      default: "top",
      ...Z("md-direction", ["top", "bottom"])
    },
    mdEffect: {
      type: String,
      default: "fling",
      ...Z("md-effect", ["fling", "scale", "opacity"])
    }
  },
  data() {
    return {
      MdSpeedDial: {
        active: !1,
        event: this.mdEvent,
        direction: this.mdDirection
      }
    };
  },
  provide() {
    return {
      MdSpeedDial: this.MdSpeedDial
    };
  },
  computed: {
    speedDialClasses() {
      return {
        "md-active": this.MdSpeedDial.active,
        "md-with-hover": this.mdEvent === "hover",
        ["md-direction-" + this.mdDirection]: !0,
        ["md-effect-" + this.mdEffect]: !0
      };
    }
  }
});
function wb(e, t, r, n, a, s) {
  return f(), w("div", {
    class: O(["md-speed-dial", [e.$mdActiveTheme, e.speedDialClasses]])
  }, [
    P(e.$slots, "default")
  ], 2);
}
const Fo = /* @__PURE__ */ C(Mb, [["render", wb]]);
const $b = {
  name: "MdSpeedDialTarget",
  components: {
    MdButton: Pe
  },
  inject: ["MdSpeedDial"],
  methods: {
    handleClick() {
      this.MdSpeedDial.event === "click" && (this.MdSpeedDial.active = !this.MdSpeedDial.active);
    }
  }
};
function Tb(e, t, r, n, a, s) {
  const i = b("md-button");
  return f(), D(i, ee({ class: "md-speed-dial-target md-fab" }, e.$attrs, { onClick: s.handleClick }), {
    default: y(() => [
      P(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["onClick"]);
}
const Bo = /* @__PURE__ */ C($b, [["render", Tb]]);
const Cb = {
  name: "MdSpeedDialContent",
  inject: ["MdSpeedDial"]
  /*
      methods: {
        setChildrenIndexes () {
  				//console.log(this);
          //this.$nextTick().then(() => {
  				//	console.log(this.slots);
          //  const countChild = this.$refs.length
  
          //  this.$refs.forEach((child, index) => {
          //    if (child._vnode.tag === 'button') {
          //      const childIndex = getChildIndex(this.MdSpeedDial.direction, index, countChild)
  
          //      child.$el.setAttribute('md-button-index', childIndex)
          //      child.$el.classList.add('md-raised')
          //    }
          //  })
          //})
        }
      },
      mounted () {
        this.setChildrenIndexes()
      },
      updated () {
        this.setChildrenIndexes()
      }*/
}, xb = { class: "md-speed-dial-content" };
function Pb(e, t, r, n, a, s) {
  return f(), w("div", xb, [
    P(e.$slots, "default")
  ]);
}
const Wo = /* @__PURE__ */ C(Cb, [["render", Pb]]), Sb = (e) => {
  Q(e), e.component(Fo.name, Fo), e.component(Bo.name, Bo), e.component(Wo.name, Wo);
}, Db = {
  methods: {
    isAssetIcon: (e) => /\w+[/\\.]\w+/.test(e)
  }
}, Yo = (e, t) => e ? e[t] !== !1 : !0, kb = (e, t, r) => {
  const n = Yo(r, "leading");
  return Yo(r, "trailing"), function() {
    n && (() => e.apply(this, arguments))();
  };
};
function Ob(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let r = 0; r < e.length; r++)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
const Ab = new W({
  name: "MdTabs",
  mixins: [Db, ol],
  components: {
    MdButton: Pe,
    MdContent: ht,
    MdIcon: ve
  },
  props: {
    mdAlignment: {
      type: String,
      default: "left",
      ...Z("md-alignment", ["left", "right", "centered", "fixed"])
    },
    mdElevation: {
      type: [Number, String],
      default: 0
    },
    mdSyncRoute: Boolean,
    mdDynamicHeight: Boolean,
    mdActiveTab: [String, Number],
    mdIsRtl: { type: Boolean, default: !1 }
  },
  data: () => ({
    resizeObserver: null,
    resizeObserver2: null,
    activeTab: null,
    activeTabIndex: 0,
    indicatorStyles: {},
    indicatorClass: null,
    noTransition: !0,
    containerStyles: {},
    contentStyles: {
      height: "0px"
    },
    hasContent: !1,
    MdTabs: {
      items: /* @__PURE__ */ new Map()
    },
    activeButtonEl: null,
    orderedIds: []
  }),
  provide() {
    return {
      MdTabs: this.MdTabs
    };
  },
  computed: {
    orderedItems() {
      return this.orderedIds.map(
        (t) => this.MdTabs.items.get(t)
      ).filter((t) => t !== void 0);
    },
    tabsClasses() {
      return {
        ["md-alignment-" + this.mdAlignment]: !0,
        "md-no-transition": this.noTransition,
        "md-dynamic-height": this.mdDynamicHeight
      };
    },
    navigationClasses() {
      return "md-elevation-" + this.mdElevation;
    },
    mdSwipeElement() {
      return this.$refs.tabsContent.$el;
    }
  },
  watch: {
    MdTabs: {
      deep: !0,
      handler() {
        this.recomputeOrderedIds(), this.tryKeepCurrentTab(), this.callResizeFunctions();
      }
    },
    activeTab(e) {
      this.$emit("md-changed", e), this.setActiveButtonElAndIndicatorStyles();
    },
    mdActiveTab(e) {
      this.activeTab = e;
    },
    activeButtonEl(e) {
      this.activeTabIndex = e ? [].indexOf.call(e.parentNode.children, e) : -1;
    },
    activeTabIndex() {
      this.setIndicatorStyles(), this.calculateTabPos();
    },
    $route() {
      this.$nextTick(this.setActiveButtonEl);
    },
    swiped(e) {
      const t = this.orderedIds.length;
      this.activeTabIndex < t && e === "right" ? this.setActiveTabByIndex(this.activeTabIndex + 1) : this.activeTabIndex > 0 && e === "left" && this.setActiveTabByIndex(this.activeTabIndex - 1);
    }
  },
  methods: {
    isActiveTabId(e) {
      return Number.isNaN(e) && Number.isNaN(this.activeTab) || e === this.activeTab;
    },
    hasActiveTab() {
      return this.activeTab != null || this.mdActiveTab != null;
    },
    setActiveTab(e) {
      this.mdSyncRoute || (this.activeTab = e);
    },
    setActiveButtonElAndIndicatorStyles() {
      this.$nextTick().then(() => {
        this.setIndicatorStyles(), this.setActiveButtonEl();
      });
    },
    tryKeepCurrentTab() {
      if (this.mdSyncRoute)
        return;
      const t = this.orderedIds.indexOf(this.activeTab) !== -1, r = this.orderedIds.length - 1, n = this.activeTabIndex >= 0 && this.activeTabIndex <= r;
      t ? this.setActiveButtonElAndIndicatorStyles() : n ? this.setActiveTabByIndex(this.activeTabIndex) : r !== -1 ? this.setActiveTabByIndex(r) : this.activeTab = null;
    },
    setActiveButtonEl() {
      var e;
      this.activeButtonEl = (e = this.$refs.navigation) == null ? void 0 : e.querySelector(".md-tab-nav-button.md-active");
    },
    setActiveTabByIndex(e) {
      this.activeTab = this.orderedIds[e];
    },
    ensureHasActiveTab() {
      this.hasActiveTab() || (this.activeTab = this.orderedIds[0]);
    },
    setHasContent() {
      this.hasContent = this.orderedItems.some((e) => e == null ? void 0 : e.hasContent);
    },
    setIndicatorStyles() {
      Er(() => {
        this.$nextTick().then(() => {
          if (this.activeButtonEl && this.$refs.indicator) {
            const e = this.activeButtonEl.offsetWidth, t = this.activeButtonEl.offsetLeft;
            this.$refs.indicator.offsetLeft < t ? this.indicatorClass = "md-tabs-indicator-right" : this.indicatorClass = "md-tabs-indicator-left", this.indicatorStyles = {
              left: `${t}px`,
              right: `calc(100% - ${e + t}px)`
            };
          } else
            this.indicatorStyles = {
              left: "100%",
              right: "100%"
            };
        });
      });
    },
    calculateTabPos() {
      this.$nextTick(() => {
        try {
          if (this.hasContent && this.$refs.tabsContainer) {
            const e = this.ours(this.$refs.tabsContainer.querySelectorAll(`.md-tab:nth-child(${this.activeTabIndex + 1})`)), t = e.length ? e[0] : null;
            t && t.offsetParent !== null ? this.contentStyles = {
              height: `${t.offsetHeight}px`
            } : this.contentStyles = {
              height: "0px"
            }, this.containerStyles = {
              transform: `translate3D(${this.mdIsRtl ? this.activeTabIndex * 100 : -this.activeTabIndex * 100}%, 0, 0)`
            };
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    callResizeFunctions() {
      this.setHasContent(), this.setIndicatorStyles(), this.calculateTabPos();
    },
    setupObservers() {
      try {
        if (this.resizeObserver = os(this.$el.querySelector(".md-tabs-content"), {
          childList: !0,
          characterData: !0,
          subtree: !0
        }, () => {
          this.callResizeFunctions();
        }), window.ResizeObserver) {
          this.resizeObserver2 = new ResizeObserver((t) => {
            t.forEach((r) => {
              this.callResizeFunctions();
            });
          });
          const e = this.$el.querySelector(".md-tabs-content");
          e && this.resizeObserver2.observe(e);
        }
        window.addEventListener("resize", this.callResizeFunctions);
      } catch {
      }
    },
    recomputeOrderedIds() {
      if (this.$refs.tabsContainer) {
        const e = this.ours(this.$refs.tabsContainer.querySelectorAll(".md-tab")).map((t) => t.mdTabIdAsObject ?? t.id);
        Ob(this.orderedIds, e) || (this.orderedIds = e);
      }
    },
    /**
     * querySelector/querySelectorAll return all descendant elements, even elements from nested md-tabs.
     * @return only the md-tab elements that are owned by this md-tabs
     */
    ours(e) {
      return [].filter.call(e, (t) => t.parentNode === this.$refs.tabsContainer);
    }
  },
  created() {
    this.setIndicatorStyles = kb(this.setIndicatorStyles), this.activeTab = this.mdActiveTab;
  },
  // updated(){
  //   this.callResizeFunctions()
  // },
  mounted() {
    this.setupObservers(), this.$nextTick().then(() => (this.mdSyncRoute || (this.recomputeOrderedIds(), this.ensureHasActiveTab()), this.$nextTick())).then(() => {
      window.setTimeout(() => {
        this.setActiveButtonEl(), this.callResizeFunctions(), this.noTransition = !1, this.setupObservers();
      }, 100);
    }), this.$refs.navigation.addEventListener("transitionend", this.setIndicatorStyles);
  },
  beforeUnmount() {
    this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null), this.resizeObserver2 && (this.resizeObserver2.disconnect(), this.resizeObserver2 = null), window.removeEventListener("resize", this.callResizeFunctions), this.$refs.navigation && this.$refs.navigation.removeEventListener("transitionend", this.setIndicatorStyles);
  }
}), Eb = { class: "md-tab-label" };
function Ib(e, t, r, n, a, s) {
  const i = b("md-icon"), o = b("md-button"), l = b("md-content");
  return f(), w("div", {
    class: O(["md-tabs", [e.tabsClasses, e.$mdActiveTheme]])
  }, [
    x("div", {
      class: O(["md-tabs-navigation", e.navigationClasses]),
      ref: "navigation"
    }, [
      (f(!0), w(de, null, ge(e.orderedItems, ({ id: d, label: u, props: c, icon: m, disabled: g, onClick: M, data: E, events: $ }, _) => (f(), D(o, ee({
        key: _,
        class: ["md-tab-nav-button", {
          "md-active": !e.mdSyncRoute && e.isActiveTabId(d),
          "md-icon-label": m && u
        }],
        disabled: g,
        ref_for: !0
      }, c, _e($ || {}), {
        onClick: (v) => M ? M() : e.setActiveTab(d)
      }), {
        default: y(() => [
          e.$slots["md-tab"] ? P(e.$slots, "md-tab", {
            key: 0,
            tab: { label: u, icon: m, data: E }
          }) : (f(), w(de, { key: 1 }, [
            m ? (f(), w(de, { key: 1 }, [
              e.isAssetIcon(m) ? (f(), D(i, {
                key: 0,
                class: "md-tab-icon",
                "md-src": m
              }, null, 8, ["md-src"])) : (f(), D(i, {
                key: 1,
                class: "md-tab-icon"
              }, {
                default: y(() => [
                  te(R(m), 1)
                ]),
                _: 2
              }, 1024)),
              x("span", Eb, R(u), 1)
            ], 64)) : (f(), w(de, { key: 0 }, [
              te(R(u), 1)
            ], 64))
          ], 64))
        ]),
        _: 2
      }, 1040, ["class", "disabled", "onClick"]))), 128)),
      x("span", {
        class: O(["md-tabs-indicator", e.indicatorClass]),
        style: J(e.indicatorStyles),
        ref: "indicator"
      }, null, 6)
    ], 2),
    yt(k(l, {
      ref: "tabsContent",
      class: "md-tabs-content",
      style: J(e.contentStyles)
    }, {
      default: y(() => [
        x("div", {
          ref: "tabsContainer",
          class: "md-tabs-container",
          style: J(e.containerStyles)
        }, [
          P(e.$slots, "default")
        ], 4)
      ]),
      _: 3
    }, 8, ["style"]), [
      [rs, e.hasContent]
    ])
  ], 2);
}
const zo = /* @__PURE__ */ C(Ab, [["render", Ib]]), Lb = {
  name: "MdTab",
  mixins: [ul],
  props: {
    id: {
      type: [String, Number],
      default: () => "md-tab-" + Je()
    },
    href: [String, Number],
    mdDisabled: Boolean,
    mdLabel: [String, Number],
    mdIcon: String,
    mdOnClick: Function,
    mdTemplateData: {
      type: Object,
      default: () => ({})
    }
  },
  inject: ["MdTabs"],
  data: () => ({
    observer: null,
    hasContent: null
  }),
  watch: {
    $props: {
      deep: !0,
      handler() {
        this.setTabData();
      }
    },
    $attrs: {
      deep: !0,
      handler() {
        this.setTabData();
      }
    }
  },
  computed: {
    attrs() {
      return {
        ...this.$attrs,
        id: this.id
      };
    },
    listeners() {
      return Object.keys(this.$attrs).filter((e) => e.startsWith("on")).reduce((e, t) => (e[t] = this.$attrs[t], e), {});
    }
  },
  methods: {
    setTabContent() {
      const e = this.MdTabs.items.get(this.id);
      e && (e.hasContent = !!this.$slots.default);
    },
    setupObserver() {
      this.observer = os(this.$el, {
        childList: !0
      }, this.setTabContent);
    },
    // setTabData () {
    //   // MdTabs does not know the order of tabs, as tabs are in a slot: store IDs in the DOM: DOM elements are ordered
    //   this.$el.mdTabIdAsObject = this.id
    //   // new Map() because Map is not reactive in VueJs 2
    //   this.MdTabs.items = new Map(this.MdTabs.items.set(this.id, {
    //     id: this.id,
    //     hasContent: !!this.$slots.default,
    //     label: this.mdLabel,
    //     icon: this.mdIcon,
    //     disabled: this.mdDisabled,
    //     data: this.mdTemplateData,
    //     props: this.getPropValues(),
    //     events: this.$listeners
    //   }))
    // },
    setTabData() {
      this.$el.mdTabIdAsObject = this.id;
      const e = this.MdTabs.items.get(this.id), t = {
        id: this.id,
        hasContent: !!this.$slots.default,
        label: this.mdLabel,
        icon: this.mdIcon,
        disabled: this.mdDisabled,
        onClick: this.mdOnClick,
        data: this.mdTemplateData,
        props: this.getPropValues(),
        events: this.$listeners
      };
      JSON.stringify(e) !== JSON.stringify(t) && (this.MdTabs.items = new Map(this.MdTabs.items.set(this.id, {
        id: this.id,
        hasContent: !!this.$slots.default,
        label: this.mdLabel,
        icon: this.mdIcon,
        disabled: this.mdDisabled,
        onClick: this.mdOnClick,
        data: this.mdTemplateData,
        props: this.getPropValues(),
        events: this.$listeners
      })));
    },
    // },
    getPropValues() {
      const e = Object.keys(this.$options.props), t = ["id", "mdLabel", "mdDisabled", "mdTemplateData"];
      let r = {};
      return e.forEach((n) => {
        t.includes(n) || (this[n] ? r[n] = this[n] : this.$attrs.hasOwnProperty(n) && (n ? r[n] = this.$attrs[n] : r[n] = !0));
      }), r;
    }
  },
  mounted() {
    this.setupObserver(), this.setTabData();
  },
  beforeUnmount() {
    this.observer && this.observer.disconnect(), this.MdTabs.items.delete(this.id), this.MdTabs.items = new Map(this.MdTabs.items);
  },
  render(e) {
    let t = {
      staticClass: "md-tab",
      attrs: {
        ...this.$attrs,
        id: this.id
      },
      on: this.$listeners
    };
    return this.$router && this.to && (this.$options.props = is(this, this.$options.props), t.props = this.$props), e("div", t, this.$slots.default);
  }
}, Rb = ["id"];
function Nb(e, t, r, n, a, s) {
  return f(), w("div", ee({
    ref: "el",
    id: r.id,
    class: "md-tab"
  }, s.attrs, _e(s.listeners, !0)), [
    P(e.$slots, "default")
  ], 16, Rb);
}
const qo = /* @__PURE__ */ C(Lb, [["render", Nb]]), Hb = (e) => {
  Q(e), e.component(zo.name, zo), e.component(qo.name, qo);
}, Fb = {
  name: "MdUpwardIcon",
  components: {
    MdIcon: ve
  }
}, Bb = /* @__PURE__ */ x("svg", {
  height: "24",
  viewBox: "0 0 24 24",
  width: "24",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ x("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }),
  /* @__PURE__ */ x("path", { d: "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" })
], -1);
function Wb(e, t, r, n, a, s) {
  const i = b("md-icon");
  return t[0] || (ne(-1), t[0] = k(i, { class: "md-icon-image" }, {
    default: y(() => [
      Bb
    ]),
    _: 1
  }), ne(1), t[0]);
}
const Yb = /* @__PURE__ */ C(Fb, [["render", Wb]]);
const zb = new W({
  setup() {
    return { instance: Ko() };
  },
  name: "MdTooltip",
  emit: ["update:mdActive"],
  components: {
    MdPopover: bs
  },
  props: {
    mdActive: Boolean,
    mdTargetref: String,
    mdDelay: {
      type: [String, Number],
      default: 0
    },
    mdDirection: {
      type: String,
      default: "bottom",
      ...Z("md-direction", ["top", "right", "bottom", "left"])
    }
  },
  data: () => ({
    shouldRender: !1,
    targetEl: null
  }),
  computed: {
    tooltipClasses() {
      return "md-tooltip-" + this.mdDirection;
    },
    tooltipStyles() {
      return `transition-delay: ${this.mdDelay}ms`;
    },
    popperSettings() {
      return {
        placement: this.mdDirection,
        modifiers: {
          offset: {
            offset: "0, 16"
          }
        }
      };
    }
  },
  watch: {
    mdActive() {
      this.shouldRender = this.mdActive;
    },
    shouldRender(e) {
      this.$emit("update:mdActive", e);
    }
  },
  methods: {
    show() {
      this.shouldRender = !0;
    },
    hide() {
      this.shouldRender = !1;
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      if (this.shouldRender = this.mdActive, this.mdTargetref ? this.instance.parent.refs[this.mdTargetref] && (this.targetEl = this.instance.parent.refs[this.mdTargetref][0]) : this.targetEl = this.instance.parent.vnode.el, this.targetEl) {
        this.targetEl.addEventListener("mouseenter", this.show, !1);
        var e = this;
        this.targetEl.addEventListener("touchstart", function() {
          setTimeout(function() {
            e.hide();
          }, 2e3);
        }), this.targetEl.addEventListener("mouseleave", this.hide, !1);
      }
    });
  },
  beforeUnmount() {
    this.targetEl && (this.targetEl.removeEventListener("mouseenter", this.show), this.targetEl.removeEventListener("mouseleave", this.hide));
  }
});
function qb(e, t, r, n, a, s) {
  const i = b("md-popover");
  return f(), D(i, {
    "md-settings": e.popperSettings,
    "md-active": e.shouldRender
  }, {
    default: y(() => [
      e.shouldRender ? (f(), D(ue, {
        key: 0,
        name: "md-tooltip"
      }, {
        default: y(() => [
          x("div", {
            class: O(["md-tooltip", [e.tooltipClasses, e.$mdActiveTheme]]),
            style: J(e.tooltipStyles)
          }, [
            P(e.$slots, "default")
          ], 6)
        ]),
        _: 3
      })) : N("", !0)
    ]),
    _: 3
  }, 8, ["md-settings", "md-active"]);
}
const Zn = /* @__PURE__ */ C(zb, [["render", qb]]);
const Ub = {
  name: "MdTableHead",
  components: {
    MdUpwardIcon: Yb,
    MdRipple: Ke,
    MdTooltip: Zn
  },
  props: {
    mdNumeric: Boolean,
    numeric: Boolean,
    id: [String, Number],
    label: String,
    tooltip: String,
    sortBy: String,
    item: [Array, Object],
    key: String
  },
  inject: ["MdTable"],
  data: () => ({
    width: null,
    windowResizeObserver: null
  }),
  computed: {
    hasSort() {
      return this.MdTable.sort && this.sortBy;
    },
    isSorted() {
      if (this.MdTable.sort)
        return this.MdTable.sort === this.sortBy;
    },
    isDescSorted() {
      return this.isSorted && this.MdTable.sortOrder === "desc";
    },
    isAscSorted() {
      return this.isSorted && this.MdTable.sortOrder === "asc";
    },
    headStyles() {
      return {
        width: this.width + "px"
      };
    },
    headClasses() {
      return {
        "md-numeric": this.numeric || this.mdNumeric,
        "md-sortable": this.hasSort,
        "md-sorted": this.isSorted,
        "md-sorted-desc": this.isDescSorted
      };
    }
  },
  methods: {
    changeSort() {
      this.hasSort && (this.isAscSorted ? this.MdTable.sortOrder = "desc" : this.MdTable.sortOrder = "asc", this.MdTable.sort = this.sortBy, this.MdTable.emitEvent("md-sorted", this.MdTable.sort), this.MdTable.emitEvent("update:mdSort", this.MdTable.sort), this.MdTable.emitEvent("update:mdSortOrder", this.MdTable.sortOrder), this.MdTable.sortTable());
    },
    getChildNodesBySelector(e, t) {
      return Array.from(e.childNodes).filter(({ classList: r }) => r && r.contains(t));
    },
    getNodeIndex(e, t) {
      return [].indexOf.call(e, t);
    },
    setWidth() {
      if (this.MdTable.fixedHeader) {
        const e = "md-table-cell", t = this.getChildNodesBySelector(this.$el.parentNode, "md-table-head"), r = this.MdTable.contentEl.querySelectorAll("tr:first-child ." + e), n = this.getNodeIndex(t, this.$el);
        this.width = r[n].offsetWidth;
      }
    }
  },
  updated() {
    this.$nextTick().then(this.setWidth);
  },
  mounted() {
    this.$nextTick().then(this.setWidth), this.MdTable.fixedHeader && (this.windowResizeObserver = new ws(window, this.setWidth));
  },
  beforeDestroy() {
    this.windowResizeObserver && this.windowResizeObserver.destroy();
  }
}, jb = ["id"], Vb = {
  key: 0,
  class: "md-table-head-container"
}, Qb = { class: "md-table-head-label" }, Xb = { class: "md-table-head-label" };
function Gb(e, t, r, n, a, s) {
  const i = b("md-upward-icon"), o = b("md-tooltip"), l = b("md-ripple");
  return f(), w("th", {
    class: O(["md-table-head", s.headClasses]),
    id: r.id,
    style: J(s.headStyles),
    onClick: t[0] || (t[0] = (...d) => s.changeSort && s.changeSort(...d))
  }, [
    e.$slots.default ? (f(), w("div", Vb, [
      x("div", Qb, [
        P(e.$slots, "default")
      ])
    ])) : (f(), D(l, {
      key: 1,
      class: "md-table-head-container",
      "md-disabled": !s.hasSort
    }, {
      default: y(() => [
        x("div", Xb, [
          s.hasSort ? (f(), D(i, {
            key: 0,
            class: "md-table-sortable-icon"
          }, {
            default: y(() => [
              te("arrow_upward")
            ]),
            _: 1
          })) : N("", !0),
          te(" " + R(r.label) + " ", 1),
          r.tooltip ? (f(), D(o, { key: 1 }, {
            default: y(() => [
              te(R(r.tooltip), 1)
            ]),
            _: 1
          })) : N("", !0)
        ])
      ]),
      _: 1
    }, 8, ["md-disabled"]))
  ], 14, jb);
}
const Or = /* @__PURE__ */ C(Ub, [["render", Gb]]), Kb = {
  name: "MdTableHeadSelection",
  components: {
    MdTableHead: Or,
    MdCheckbox: Cr
  },
  inject: ["MdTable"],
  computed: {
    selectableCount() {
      return Object.keys(this.selectable).length;
    },
    isDisabled() {
      return !this.selectableCount;
    },
    selectable() {
      return this.MdTable.selectable;
    },
    selectedItems() {
      return this.MdTable.selectedItems;
    },
    allSelected() {
      return this.selectableCount === 0 ? !1 : this.selectable.every((e) => this.selectedItems.includes(e));
    }
  },
  methods: {
    onChange(e) {
      e ? this.MdTable.selectedItems = this.selectedItems.concat(this.selectable.filter((t) => !this.selectedItems.includes(t))) : this.MdTable.selectedItems = this.selectedItems.filter((t) => !this.selectable.includes(t));
    }
  }
}, Jb = { class: "md-table-cell-container" };
function Zb(e, t, r, n, a, s) {
  const i = b("md-checkbox"), o = b("md-table-head");
  return s.selectableCount ? (f(), D(o, {
    key: 0,
    class: "md-table-cell-selection"
  }, {
    default: y(() => [
      x("div", Jb, [
        k(i, {
          model: s.allSelected,
          disabled: s.isDisabled,
          onChange: s.onChange
        }, null, 8, ["model", "disabled", "onChange"])
      ])
    ]),
    _: 1
  })) : N("", !0);
}
const eM = /* @__PURE__ */ C(Kb, [["render", Zb]]), tM = {
  name: "MdTableThead",
  inject: ["MdTable"],
  components: {
    MdTableHead: Or,
    MdTableHeadSelection: eM
  }
};
function rM(e, t, r, n, a, s) {
  const i = b("md-table-head-selection"), o = b("md-table-head");
  return f(), w("thead", null, [
    x("tr", null, [
      k(i),
      (f(!0), w(de, null, ge(s.MdTable.items, (l, d) => (f(), D(o, {
        key: d,
        item: l
      }, null, 8, ["item"]))), 128))
    ])
  ]);
}
const aM = /* @__PURE__ */ C(tM, [["render", rM]]);
const nM = {
  name: "MdTableAlternateHeader"
}, sM = { class: "md-table-alternate-header" };
function iM(e, t, r, n, a, s) {
  return f(), D(ue, { name: "md-table-alternate-header" }, {
    default: y(() => [
      x("div", sM, [
        P(e.$slots, "default")
      ])
    ]),
    _: 3
  });
}
const oM = /* @__PURE__ */ C(nM, [["render", iM]]);
const lM = {
  emits: ["input"],
  components: { MdCheckbox: Cr },
  name: "MdTableCellSelection",
  props: {
    value: Boolean,
    mdRowId: [Number, String],
    mdSelectable: Boolean,
    mdDisabled: Boolean
  },
  inject: ["MdTable"],
  data: () => ({
    isSelected: !1
  }),
  watch: {
    value: {
      immediate: !0,
      handler(e) {
        this.isSelected = e;
      }
    }
  },
  methods: {
    onChange() {
      this.$emit("input", this.isSelected);
    }
  }
}, dM = {
  key: 0,
  class: "md-table-cell md-table-cell-selection"
}, uM = { class: "md-table-cell-container" };
function cM(e, t, r, n, a, s) {
  const i = b("md-checkbox");
  return r.mdSelectable ? (f(), w("td", dM, [
    x("div", uM, [
      k(i, {
        modelValue: e.isSelected,
        "onUpdate:modelValue": t[0] || (t[0] = (o) => e.isSelected = o),
        disabled: !r.mdSelectable || r.mdDisabled,
        onChange: s.onChange
      }, null, 8, ["modelValue", "disabled", "onChange"])
    ])
  ])) : N("", !0);
}
const pd = /* @__PURE__ */ C(lM, [["render", cM]]);
const fM = {
  name: "MdTableRow",
  components: {
    MdTableCellSelection: pd
  },
  props: {
    mdIndex: [Number, String],
    mdId: [Number, String],
    mdSelectable: {
      type: [String],
      ...Z("md-selectable", ["multiple", "single"])
    },
    mdDisabled: Boolean,
    mdAutoSelect: Boolean,
    mdItem: [Array, Object]
  },
  inject: ["MdTable"],
  data: () => ({
    index: null
  }),
  computed: {
    selectableCount() {
      return this.MdTable.selectable.length;
    },
    isMultipleSelected() {
      return this.MdTable.selectedItems.includes(this.mdItem);
    },
    isSingleSelected() {
      return this.MdTable.singleSelection === this.mdItem;
    },
    hasMultipleSelection() {
      return this.MdTable.hasValue && this.mdSelectable === "multiple";
    },
    hasSingleSelection() {
      return this.MdTable.hasValue && this.mdSelectable === "single";
    },
    rowClasses() {
      return this.MdTable.hasValue ? {
        "md-has-selection": !this.mdDisabled && (this.mdAutoSelect || this.hasSingleSelection),
        "md-selected": this.isMultipleSelected,
        "md-selected-single": this.isSingleSelected
      } : {};
    },
    isInSelectedItems() {
      return this.MdTable.selectedItems.includes(this.mdItem);
    }
  },
  watch: {
    mdDisabled() {
      this.mdDisabled ? this.removeSelectableItem() : this.addSelectableItem();
    },
    mdSelectable() {
      this.MdTable.selectingMode = this.mdSelectable;
    },
    mdItem(e, t) {
      this.removeSelectableItem(t), this.$nextTick(this.addSelectableItem);
    }
  },
  methods: {
    onClick() {
      this.MdTable.hasValue && !this.mdDisabled && (this.hasMultipleSelection ? this.selectRowIfMultiple() : this.hasSingleSelection && this.selectRowIfSingle());
    },
    toggleSelection() {
      this.MdTable.manageItemSelection(this.mdItem);
    },
    addSelection() {
      this.isMultipleSelected || (this.MdTable.selectedItems = this.MdTable.selectedItems.concat([
        this.mdItem
      ]));
    },
    removeSelection() {
      this.isMultipleSelected && (this.MdTable.selectedItems = this.MdTable.selectedItems.filter(
        (e) => e !== this.mdItem
      ));
    },
    selectRowIfSingle() {
      this.MdTable.singleSelection === this.mdItem ? this.MdTable.singleSelection = null : this.MdTable.singleSelection = this.mdItem;
    },
    selectRowIfMultiple() {
      this.toggleSelection();
    },
    addSelectableItem() {
      this.MdTable.selectable && this.mdItem && this.MdTable.selectable.indexOf(this.mdItem) === -1 && this.MdTable.selectable.push(this.mdItem);
    },
    removeSelectableItem(e = this.mdItem) {
      if (this.MdTable.selectable && e) {
        const t = this.MdTable.selectable.indexOf(e);
        t > -1 && this.MdTable.selectable.splice(t, 1);
      }
    }
  },
  mounted() {
    this.addSelectableItem();
  },
  beforeUnmount() {
    this.removeSelectableItem();
  }
};
function mM(e, t, r, n, a, s) {
  const i = b("md-table-cell-selection");
  return f(), w("tr", ee({
    class: ["md-table-row", s.rowClasses],
    onClick: t[1] || (t[1] = (...o) => s.onClick && s.onClick(...o))
  }, _e(e.$listeners, !0)), [
    s.selectableCount ? (f(), D(i, {
      key: 0,
      value: s.isMultipleSelected,
      onInput: t[0] || (t[0] = (o) => o ? s.addSelection() : s.removeSelection()),
      "md-disabled": r.mdDisabled,
      "md-selectable": r.mdSelectable === "multiple",
      "md-row-id": r.mdIndex
    }, null, 8, ["value", "md-disabled", "md-selectable", "md-row-id"])) : N("", !0),
    P(e.$slots, "default")
  ], 16);
}
const es = /* @__PURE__ */ C(fM, [["render", mM]]), hM = {
  name: "MdTableRowGhost",
  props: {
    mdIndex: [String, Number],
    mdId: [String, Number],
    mdItem: [Array, Object]
  }
};
function pM(e, t, r, n, a, s) {
  return P(e.$slots, "default", {
    mdItem: r.mdItem,
    mdId: r.mdId,
    mdIndex: r.mdIndex
  });
}
const vM = /* @__PURE__ */ C(hM, [["render", pM]]), ts = {
  functional: !0,
  props: {
    mdTag: {
      type: String,
      default: "div"
    }
  },
  render(e, { children: t, data: r, listeners: n }) {
    return xe(e.mdTag, {
      ...r,
      on: n
    }, t);
  }
};
const Ba = (e, t) => {
  let r = e;
  for (const n of t.split("."))
    r = r[n];
  return r;
}, gM = {
  name: "MdTable",
  components: {
    MdTagSwitcher: ts,
    MdTableAlternateHeader: oM,
    MdTableThead: aM,
    MdTableRow: es,
    MdTableRowGhost: vM,
    MdTableCellSelection: pd,
    MdContent: ht
  },
  props: {
    value: [Array, Object],
    mdModelId: {
      type: String,
      default: "id"
    },
    mdCard: Boolean,
    mdFixedHeader: Boolean,
    mdHeight: {
      type: [Number, String],
      default: 400
    },
    mdSort: String,
    mdSortOrder: {
      type: String,
      default: "asc",
      ...Z("md-sort-order", ["asc", "desc"])
    },
    mdSortFn: {
      type: Function,
      default(e) {
        const t = this.MdTable.sort, n = this.MdTable.sortOrder === "asc" ? 1 : -1, a = function(s, i) {
          const o = Ba(s, t), l = Ba(i, t);
          return o === l ? 0 : o == null || Number.isNaN(o) ? 1 : l == null || Number.isNaN(l) ? -1 : typeof o == "number" && typeof l == "number" ? (o - l) * n : String(o).localeCompare(String(l)) * n;
        };
        return e.sort(a);
      }
    },
    mdSelectedValue: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      windowResizeObserver: null,
      fixedHeaderTableWidth: 0,
      fixedHeaderPadding: 0,
      hasContentScroll: !1,
      MdTable: {
        items: {},
        sort: null,
        sortOrder: null,
        singleSelection: null,
        selectedItems: [],
        selectable: [],
        fixedHeader: null,
        contentPadding: null,
        contentEl: null,
        // computed
        hasValue: this.hasValue,
        // methods
        emitEvent: this.emitEvent,
        sortTable: this.sortTable,
        manageItemSelection: this.manageItemSelection,
        getModel: this.getModel,
        getModelItem: this.getModelItem,
        selectingMode: null
      },
      itemsUuidMap: /* @__PURE__ */ new WeakMap()
    };
  },
  computed: {
    contentTag() {
      return this.mdCard ? "md-card" : "md-content";
    },
    headerCount() {
      return Object.keys(this.MdTable.items).length;
    },
    selectedCount() {
      return this.MdTable.selectedItems.length;
    },
    headerStyles() {
      return this.mdFixedHeader ? `padding-right: ${this.fixedHeaderPadding}px` : "";
    },
    hasValue() {
      return this.value && this.value.length !== 0;
    },
    headerClasses() {
      return this.mdFixedHeader && this.hasContentScroll || !this.hasValue ? "md-table-fixed-header-active" : "";
    },
    contentStyles() {
      if (this.mdFixedHeader) {
        const e = typeof this.mdHeight == "number" ? this.mdHeight + "px" : this.mdHeight;
        return {
          height: e,
          "max-height": e
        };
      }
      return {};
    },
    contentClasses() {
      return {
        "md-table-fixed-header": this.mdFixedHeader
      };
    },
    fixedHeaderTableStyles() {
      return {
        width: this.fixedHeaderTableWidth + "px"
      };
    }
  },
  provide() {
    return {
      MdTable: this.MdTable
    };
  },
  watch: {
    value: {
      handler() {
        this.$nextTick(() => {
          this.setTableItems(), this.setFixedHeaderWidth();
        });
      },
      immediate: !0
    },
    mdSort() {
      this.MdTable.sort = this.mdSort, this.sortTable();
    },
    mdSortOrder() {
      this.MdTable.sortOrder = this.mdSortOrder, this.sortTable();
    },
    mdSelectedValue: {
      handler() {
        this.setSelectedItems();
      },
      immediate: !0
    }
  },
  methods: {
    getRowId(e, t) {
      if (this.itemsUuidMap.has(e))
        return this.itemsUuidMap.get(e);
      const n = Ba(e, t) || Je();
      return this.itemsUuidMap.set(e, n), n;
    },
    setTableItems() {
      this.MdTable.items = {}, this.MdTable.selectable = [], this.hasValue && this.value.forEach((e, t) => {
        const r = this.getRowId(e, this.mdModelId);
        this.MdTable.items[r] = e, this.MdTable.selectable.push(r);
      });
    },
    setSelectedItems() {
      this.mdSelectedValue ? Array.isArray(this.mdSelectedValue) ? this.MdTable.selectedItems = this.mdSelectedValue : this.MdTable.selectedItems = [this.mdSelectedValue] : this.MdTable.selectedItems = [];
    },
    setFixedHeaderWidth() {
      this.mdFixedHeader && this.$refs.contentTable && (this.fixedHeaderTableWidth = this.$refs.contentTable.offsetWidth, this.fixedHeaderPadding = this.getScrollbarWidth());
    },
    getScrollbarWidth() {
      const e = document.createElement("div");
      e.style.visibility = "hidden", e.style.overflow = "scroll", document.body.appendChild(e);
      const t = document.createElement("div");
      e.appendChild(t);
      const r = e.offsetWidth - t.offsetWidth;
      return e.parentNode.removeChild(e), r;
    },
    setHeaderScroll(e) {
      this.$refs.contentTable && (this.$refs.contentTable.scrollLeft = e.target.scrollLeft);
    },
    setScroll(e) {
      this.mdFixedHeader && this.$refs.fixedHeaderContainer && (this.$refs.fixedHeaderContainer.scrollLeft = e.target.scrollLeft), this.hasContentScroll = e.target.scrollTop > 0, Er(() => {
        this.emitEvent("scroll", e);
      });
    },
    sortTable() {
      this.mdSort && this.hasValue && this.mdSortFn(this.value);
    },
    manageItemSelection(e) {
      const t = this.MdTable.selectedItems.indexOf(e);
      t > -1 ? this.MdTable.selectedItems.splice(t, 1) : this.MdTable.selectedItems.push(e), this.emitEvent("selection", this.MdTable.selectedItems);
    },
    getModel() {
      return this.value;
    },
    getModelItem(e) {
      return this.MdTable.items[e];
    },
    emitEvent(e, t) {
      this.$emit(e, t);
    }
  },
  mounted() {
    this.MdTable.sort = this.mdSort, this.MdTable.sortOrder = this.mdSortOrder, this.MdTable.fixedHeader = this.mdFixedHeader, this.MdTable.contentEl = this.$refs.contentTable, this.setTableItems(), this.setSelectedItems(), this.setFixedHeaderWidth(), this.mdFixedHeader && (this.windowResizeObserver = new ws(() => {
      this.setFixedHeaderWidth();
    }), this.windowResizeObserver.observe(window));
  },
  beforeUnmount() {
    this.windowResizeObserver && this.windowResizeObserver.disconnect();
  }
}, _M = { ref: "contentTable" }, yM = { key: 1 }, bM = { key: 2 }, MM = { key: 3 }, wM = ["colspan"];
function $M(e, t, r, n, a, s) {
  const i = b("md-table-alternate-header"), o = b("md-table-thead"), l = b("md-table-row-ghost"), d = b("md-content"), u = b("md-tag-switcher");
  return f(), D(u, {
    "md-tag": s.contentTag,
    class: "md-table"
  }, {
    default: y(() => [
      P(e.$slots, "md-table-toolbar"),
      (f(), D(cr, null, [
        e.$slots["md-table-alternate-header"] && s.selectedCount ? (f(), D(i, { key: 0 }, {
          default: y(() => [
            P(e.$slots, "md-table-alternate-header", { count: s.selectedCount })
          ]),
          _: 3
        })) : N("", !0)
      ], 1024)),
      r.mdFixedHeader ? (f(), w("div", {
        key: 0,
        class: O(["md-table-fixed-header", s.headerClasses]),
        style: J(s.headerStyles)
      }, [
        x("div", {
          class: "md-table-fixed-header-container",
          ref: "fixedHeaderContainer",
          onScroll: t[0] || (t[0] = (...c) => s.setHeaderScroll && s.setHeaderScroll(...c))
        }, [
          x("table", {
            style: J(s.fixedHeaderTableStyles)
          }, [
            k(o)
          ], 4)
        ], 544)
      ], 6)) : N("", !0),
      k(d, {
        class: O(["md-table-content md-scrollbar", s.contentClasses]),
        style: J(s.contentStyles),
        onScroll: s.setScroll
      }, {
        default: y(() => [
          x("table", _M, [
            !r.mdFixedHeader && e.$slots["md-table-row"] ? (f(), D(o, {
              key: 0,
              class: O(s.headerClasses)
            }, null, 8, ["class"])) : N("", !0),
            e.$slots["md-table-row"] ? r.value.length ? (f(), w("tbody", bM, [
              (f(!0), w(de, null, ge(r.value, (c, m) => (f(), D(l, {
                key: s.getRowId(c, r.mdModelId),
                "md-id": s.getRowId(c, r.mdModelId),
                "md-index": m,
                "md-item": c
              }, {
                default: y(() => [
                  P(e.$slots, "md-table-row", {
                    item: c,
                    index: m
                  })
                ]),
                _: 2
              }, 1032, ["md-id", "md-index", "md-item"]))), 128))
            ])) : e.$slots["md-table-empty-state"] ? (f(), w("tbody", MM, [
              x("tr", null, [
                x("td", { colspan: s.headerCount }, [
                  P(e.$slots, "md-table-empty-state")
                ], 8, wM)
              ])
            ])) : N("", !0) : (f(), w("tbody", yM, [
              P(e.$slots, "default")
            ]))
          ], 512),
          P(e.$slots, "md-table-pagination")
        ]),
        _: 3
      }, 8, ["class", "style", "onScroll"]),
      !s.hasValue && e.$slots["md-table-pagination"] ? P(e.$slots, "default", { key: 1 }) : N("", !0)
    ]),
    _: 3
  }, 8, ["md-tag"]);
}
const TM = /* @__PURE__ */ C(gM, [["render", $M]]);
function CM(e, t) {
  const r = [
    "md-table-toolbar",
    "md-table-empty-state",
    "md-table-pagination"
  ];
  let n = Array.from(e), a = {};
  function s({ componentOptions: i }) {
    return i && i.tag;
  }
  return n.forEach((i, o) => {
    if (i && i.tag) {
      const l = s(i);
      l && r.includes(l) && (i.data.slot = l, i.data.attrs = i.data.attrs || {}, a[l] = () => i, n.splice(o, 1));
    }
  }), {
    childNodes: n,
    slots: a
  };
}
const xM = {
  name: "MdTableContainer",
  functional: !0,
  render(e, { data: t, props: r, children: n }) {
    let a = [], s = t.scopedSlots;
    if (n) {
      const { childNodes: i, slots: o } = CM(n);
      a = i, s = {
        ...s,
        ...o
      };
    }
    return e(
      TM,
      {
        ...t,
        props: r,
        scopedSlots: s
      },
      [a]
    );
  }
};
const PM = {
  name: "MdTableToolbar",
  components: {
    MdToolbar: $r
  },
  inject: ["MdTable"]
};
function SM(e, t, r, n, a, s) {
  const i = b("md-toolbar");
  return f(), D(i, {
    class: "md-table-toolbar md-transparent",
    "md-elevation": 0
  }, {
    default: y(() => [
      P(e.$slots, "default")
    ]),
    _: 3
  });
}
const Uo = /* @__PURE__ */ C(PM, [["render", SM]]);
const DM = {
  name: "MdTableEmptyState",
  components: { MdEmptyState: Gn },
  props: ud,
  inject: ["MdTable"]
};
function kM(e, t, r, n, a, s) {
  const i = b("md-empty-state");
  return f(), D(i, ee(e.$props, { class: "md-table-empty-state" }), {
    default: y(() => [
      P(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const jo = /* @__PURE__ */ C(DM, [["render", kM]]);
const OM = {
  name: "MdTableCell",
  props: {
    mdId: [String, Number],
    mdLabel: String,
    mdNumeric: Boolean,
    mdTooltip: String,
    mdSortBy: String
  },
  inject: ["MdTable"],
  data: () => ({
    index: null,
    parentNode: null
  }),
  computed: {
    cellClasses() {
      return {
        "md-numeric": this.mdNumeric
      };
    }
  },
  watch: {
    mdSortBy() {
      this.setCellData();
    },
    mdNumeric() {
      this.setCellData();
    },
    mdLabel() {
      this.setCellData();
    },
    mdTooltip() {
      this.setCellData();
    }
  },
  methods: {
    setCellData(e = this) {
      console.log("_______ _______ _______ _______ _______ _______ _______ _______ _______ _______ "), console.log(this), console.log(e), this.MdTable.items[e.index] = {
        id: e.mdId,
        label: e.mdLabel,
        numeric: e.mdNumeric,
        tooltip: e.mdTooltip,
        sortBy: e.mdSortBy
      }, console.log(this.MdTable.items[e.index].label);
    },
    updateAllCellData() {
      this.MdTable.items = {}, Array.from(this.parentNode.childNodes).filter(({ tagName: t, classList: r }) => {
        const n = r && r.contains("md-table-cell-selection");
        return t && t.toLowerCase() === "td" && !n;
      }).forEach((t, r) => {
        console.log(t);
        const n = t.__vnode.props;
        n.index = r, this.setCellData(n);
      });
    }
  },
  mounted() {
    this.parentNode = this.$el.parentNode, this.updateAllCellData();
  },
  destroyed() {
    if (this.$el.parentNode !== null)
      return !1;
    this.updateAllCellData();
  }
}, AM = { class: "md-table-cell-container" };
function EM(e, t, r, n, a, s) {
  return f(), w("td", {
    class: O(["md-table-cell", s.cellClasses])
  }, [
    x("div", AM, [
      P(e.$slots, "default")
    ])
  ], 2);
}
const Vo = /* @__PURE__ */ C(OM, [["render", EM]]);
const IM = {
  name: "MdTablePagination",
  inject: ["MdTable"],
  props: {
    mdPageSize: {
      type: [String, Number],
      default: 10
    },
    mdPageOptions: {
      type: Array,
      default: () => [10, 25, 50, 100]
    },
    mdPage: {
      type: Number,
      default: 1
    },
    mdTotal: {
      type: [String, Number],
      default: "Many"
    },
    mdLabel: {
      type: String,
      default: "Rows per page:"
    },
    mdSeparator: {
      type: String,
      default: "of"
    }
  },
  data: () => ({
    currentPageSize: 0
  }),
  computed: {
    currentItemCount() {
      return (this.mdPage - 1) * this.mdPageSize + 1;
    },
    currentPageCount() {
      return this.mdPage * this.mdPageSize;
    }
  },
  watch: {
    mdPageSize: {
      immediate: !0,
      handler(e) {
        this.currentPageSize = this.pageSize;
      }
    }
  },
  methods: {
    setPageSize() {
      this.$emit("update:mdPageSize", this.currentPageSize);
    },
    goToPrevious() {
    },
    goToNext() {
    }
  },
  created() {
    this.currentPageSize = this.mdPageSize;
  }
}, LM = { class: "md-table-pagination" }, RM = { class: "md-table-pagination-label" };
function NM(e, t, r, n, a, s) {
  const i = b("md-option"), o = b("md-select"), l = b("md-field"), d = b("md-icon"), u = b("md-button");
  return f(), w("div", LM, [
    r.mdPageOptions !== !1 ? (f(), w(de, { key: 0 }, [
      x("span", RM, R(r.mdLabel), 1),
      k(l, null, {
        default: y(() => [
          k(o, {
            modelValue: e.currentPageSize,
            "onUpdate:modelValue": t[0] || (t[0] = (c) => e.currentPageSize = c),
            "md-dense": "",
            "md-class": "md-pagination-select",
            onChanged: s.setPageSize
          }, {
            default: y(() => [
              (f(!0), w(de, null, ge(r.mdPageOptions, (c) => (f(), D(i, {
                key: c,
                value: c
              }, {
                default: y(() => [
                  te(R(c), 1)
                ]),
                _: 2
              }, 1032, ["value"]))), 128))
            ]),
            _: 1
          }, 8, ["modelValue", "onChanged"])
        ]),
        _: 1
      })
    ], 64)) : N("", !0),
    x("span", null, R(s.currentItemCount) + "-" + R(s.currentPageCount) + " " + R(r.mdSeparator) + " " + R(r.mdTotal), 1),
    k(u, {
      class: "md-icon-button md-table-pagination-previous",
      onClick: t[1] || (t[1] = (c) => s.goToPrevious()),
      disabled: r.mdPage === 1
    }, {
      default: y(() => [
        k(d, null, {
          default: y(() => [
            te("keyboard_arrow_left")
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["disabled"]),
    k(u, {
      class: "md-icon-button md-table-pagination-next",
      onClick: t[2] || (t[2] = (c) => s.goToNext())
    }, {
      default: y(() => [
        k(d, null, {
          default: y(() => [
            te("keyboard_arrow_right")
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ]);
}
const Qo = /* @__PURE__ */ C(IM, [["render", NM]]), HM = (e) => {
  Q(e), e.component("MdTable", xM), e.component(Uo.name, Uo), e.component(jo.name, jo), e.component(es.name, es), e.component(Or.name, Or), e.component(Vo.name, Vo), e.component(Qo.name, Qo);
}, FM = (e) => {
  Q(e), e.component(ts.name, ts);
}, BM = (e) => {
  Q(e), e.component($r.name, $r);
}, WM = (e) => {
  Q(e), e.component(Zn.name, Zn);
};
const YM = new W({
  name: "MdProgressBar",
  props: {
    mdValue: {
      type: Number,
      default: 0
    },
    mdBuffer: {
      type: Number,
      default: 0
    },
    mdMode: {
      type: String,
      default: "determinate",
      ...Z("md-mode", [
        "determinate",
        "indeterminate",
        "query",
        "buffer"
      ])
    }
  },
  computed: {
    isDeterminate() {
      return this.mdMode === "determinate";
    },
    isBuffer() {
      return this.mdMode === "buffer";
    },
    hasAmountFill() {
      return this.isBuffer || this.isDeterminate;
    },
    progressClasses() {
      return "md-" + this.mdMode;
    },
    progressValueStyle() {
      if (this.hasAmountFill)
        return `width: ${this.mdValue}%`;
    },
    progressTrackStyle() {
      if (this.hasAmountFill)
        return `width: ${this.mdBuffer}%`;
    },
    progressBufferStyle() {
      if (this.hasAmountFill)
        return `left: calc(${this.mdBuffer}% + 8px)`;
    }
  }
}), zM = ["Style"];
function qM(e, t, r, n, a, s) {
  return f(), D(ue, {
    name: "md-progress-bar",
    appear: ""
  }, {
    default: y(() => [
      x("div", {
        class: O(["md-progress-bar", [e.progressClasses, e.$mdActiveTheme]])
      }, [
        x("div", {
          class: "md-progress-bar-track",
          style: J(e.progressTrackStyle)
        }, null, 4),
        x("div", {
          class: "md-progress-bar-fill",
          style: J(e.progressValueStyle)
        }, null, 4),
        x("div", {
          class: "md-progress-bar-buffer",
          Style: e.progressBufferStyle
        }, null, 8, zM)
      ], 2)
    ]),
    _: 1
  });
}
const Xo = /* @__PURE__ */ C(YM, [["render", qM]]);
const UM = new W({
  name: "MdProgressSpinner",
  props: {
    mdValue: {
      type: Number,
      default: 0
    },
    mdDiameter: {
      type: Number,
      default: 60
    },
    mdStroke: {
      type: Number,
      default: 6
    },
    mdMode: {
      type: String,
      default: "determinate",
      ...Z("md-mode", [
        "determinate",
        "indeterminate"
      ])
    }
  },
  computed: {
    isDeterminate() {
      return this.mdMode === "determinate";
    },
    isIndeterminate() {
      return this.mdMode === "indeterminate";
    },
    progressClasses() {
      return {
        ["md-progress-spinner-indeterminate"]: !0,
        ["md-" + this.mdMode]: !0
      };
    },
    circleRadius() {
      return (this.mdDiameter - this.mdStroke) / 2;
    },
    circleStrokeWidth() {
      return this.mdStroke + "px";
    },
    circleCircumference() {
      return 2 * Math.PI * this.circleRadius;
    },
    circleStrokeDashArray() {
      return this.circleCircumference + "px";
    },
    circleStrokeDashOffset() {
      return this.isDeterminate ? this.circleCircumference * (100 - this.mdValue) / 100 + "px" : this.isIndeterminate ? this.circleCircumference * 0.2 + "px" : null;
    }
  },
  watch: {
    mdValue() {
      this.attachCircleStyle();
    },
    mdDiameter() {
      this.attachSvgStyle(), this.attachCircleStyle();
    },
    mdStroke() {
      this.attachCircleStyle();
    }
  },
  methods: {
    attachSvgStyle() {
      const e = this.$refs["md-progress-spinner-draw"], t = `${this.mdDiameter}px`;
      e.style.width = t, e.style.height = t;
    },
    attachCircleStyle() {
      const e = this.$refs["md-progress-spinner-circle"];
      e.style.strokeDashoffset = this.circleStrokeDashOffset, e.style.strokeDasharray = this.circleStrokeDashArray, e.style.strokeWidth = this.circleStrokeWidth, e.style.setProperty("--md-progress-spinner-start-value", 0.95 * this.circleCircumference), e.style.setProperty("--md-progress-spinner-end-value", 0.2 * this.circleCircumference);
    }
  },
  mounted() {
    this.attachSvgStyle(), this.attachCircleStyle();
  }
}), jM = ["viewBox"], VM = ["r"];
function QM(e, t, r, n, a, s) {
  return f(), D(ue, {
    name: "md-progress-spinner",
    appear: ""
  }, {
    default: y(() => [
      x("div", {
        class: O(["md-progress-spinner", [e.progressClasses, e.$mdActiveTheme]])
      }, [
        (f(), w("svg", {
          class: "md-progress-spinner-draw",
          preserveAspectRatio: "xMidYMid meet",
          focusable: "false",
          viewBox: `0 0 ${e.mdDiameter} ${e.mdDiameter}`,
          ref: "md-progress-spinner-draw"
        }, [
          x("circle", {
            class: "md-progress-spinner-circle",
            cx: "50%",
            cy: "50%",
            r: e.circleRadius,
            ref: "md-progress-spinner-circle"
          }, null, 8, VM)
        ], 8, jM))
      ], 2)
    ]),
    _: 1
  });
}
const Go = /* @__PURE__ */ C(UM, [["render", QM]]), XM = (e) => {
  Q(e), e.component(Xo.name, Xo), e.component(Go.name, Go);
}, GM = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MdApp: wu,
  MdAvatar: Cu,
  MdBadge: Au,
  MdButton: Ku,
  MdCard: Tc,
  MdCheckbox: kc,
  MdContent: Oc,
  MdDatepicker: L0,
  MdDialog: W0,
  MdDialogAlert: q0,
  MdDialogConfirm: V0,
  MdDialogPrompt: G0,
  MdDivider: Z0,
  MdDrawer: ry,
  MdDrawerRightPrevious: Xn,
  MdElevation: ay,
  MdEmptyState: dy,
  MdField: by,
  MdIcon: My,
  MdLayout: wy,
  MdList: ab,
  MdMenu: cb,
  MdProgress: XM,
  MdRipple: fb,
  MdSnackbar: bb,
  MdSpeedDial: Sb,
  MdTable: HM,
  MdTabs: Hb,
  MdTagSwitcher: FM,
  MdToolbar: BM,
  MdTooltip: WM
}, Symbol.toStringTag, { value: "Module" })), KM = {
  install(e) {
    Q(e), Object.values(GM).forEach((t) => {
      e.component(t.name, t);
    });
  }
};
KM.version = "__VERSION__";
export {
  wu as MdApp,
  Cu as MdAvatar,
  Au as MdBadge,
  Ku as MdButton,
  Tc as MdCard,
  kc as MdCheckbox,
  Oc as MdContent,
  L0 as MdDatepicker,
  W0 as MdDialog,
  q0 as MdDialogAlert,
  V0 as MdDialogConfirm,
  G0 as MdDialogPrompt,
  Z0 as MdDivider,
  ry as MdDrawer,
  Xn as MdDrawerRightPrevious,
  ay as MdElevation,
  dy as MdEmptyState,
  by as MdField,
  My as MdIcon,
  wy as MdLayout,
  ab as MdList,
  cb as MdMenu,
  XM as MdProgress,
  fb as MdRipple,
  bb as MdSnackbar,
  Sb as MdSpeedDial,
  HM as MdTable,
  Hb as MdTabs,
  FM as MdTagSwitcher,
  BM as MdToolbar,
  WM as MdTooltip,
  KM as default
};
