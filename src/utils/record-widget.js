'use strict';
(function () {
    var a = function Application() {
        this.initialize.apply(this, arguments)
    };
    a.prototype = {
        initialize: function initialize() {
            this.scriptTag = this.findScriptTag(), this.appUrl = this.generateURL(), this.attrs = this.generateAttrs(), this.iframe = this.generateIFrame(), this.listenForEvents(), this.scriptTag.parentNode.insertBefore(this.iframe, this.scriptTag)
        },
        listenForEvents: function listenForEvents() {
            window.addEventListener('message', this.iframeMessageReceived.bind(this), !1)
        },
        iframeMessageReceived: function iframeMessageReceived(b) {
            var c = b.data && b.data.event;
            'Countable: Open URL' == c && this.openPopup(b.data.url, b.data.title, b.data.size)
        },
        openPopup: function openPopup(b, c, d) {
            var e = window.navigator.userAgent.toLowerCase();
            if (/iphone|ipod|ipad/.test(e)) {
                var f = document.createElement('a');
                f.setAttribute('href', b), f.setAttribute('target', '_blank'), f.innerHTML = 'link text', f.click()
            } else window.open(b, c, d).focus()
        },
        generateIFrame: function generateIFrame() {
            var b = document.createElement('iframe');
            for (var c in this.attrs) this.attrs.hasOwnProperty(c) && b.setAttribute(c, this.attrs[c]);
            return b
        },
        generateAttrs: function generateAttrs() {
            return {
                id: 'countable-social-video-widget',
                style: 'max-width: ' + (this.scriptTag.getAttribute('data-max-width') || '100%') + ';',
                width: this.scriptTag.getAttribute('data-width') || '100%',
                height: this.scriptTag.getAttribute('data-height') || '500px',
                frameborder: 'no',
                src: this.appUrl
            }
        },
        generateURL: function generateURL() {
            var c = this.scriptTag.getAttribute('data-widget-url') || 'https://www.countable.us/widgets/social-video/index.html',
                d = '?' + this.queryParams();
            return c + d
        },
        getOGTitle: function getOGTitle() {
            var b = document.querySelector('meta[property="og:title"]');
            return b && b.content
        },
        queryParams: function queryParams() {
            var b = this,
                c = {
                    ogTitle: this.getOGTitle(),
                    signedAt: '1578681138',
                    hostname: window.location.hostname,
                    protocol: window.location.protocol,
                    path: window.location.pathname
                };
            ['partner-id', 'only-featured', 'auto-campaign', 'campaign', 'video-sharing', 'video-share-title', 'video-share-body', 'video-share-url', 'video-context', 'user-mode', 'title', 'subtitle', 'body', 'seed-video-ids', 'cta', 'cta-background-color', 'cta-text-color', 'include-address', 'include-birthdate', 'width', 'height'].forEach(function (f) {
                var g = f.split('-').map(function (h) {
                    return h.charAt(0).toUpperCase() + h.slice(1)
                }).join('');
                g = g.charAt(0).toLowerCase() + g.slice(1), c[g] = b.scriptTag.getAttribute('data-' + f)
            }), 'true' === c.autoCampaign && (c.campaign = window.location.hostname + window.location.pathname), c.campaign = c.campaign && c.campaign.replace(/\/$/, '');
            var e = [];
            return Object.keys(c).map(function (f) {
                c[f] && e.push(f + '=' + encodeURIComponent(c[f]))
            }), e.join('&')
        },
        findScriptTag: function findScriptTag() {
            return document.getElementById('countable-social-video-script')
        }
    }, new a
})();