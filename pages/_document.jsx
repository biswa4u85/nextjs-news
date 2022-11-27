import Document, { Html, Head, Main, NextScript } from "next/document";
import Config from "../common/Config";
import Script from 'next/script'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charset="utf-8" />
                    <link rel="icon" href={'../assets/image/favicon.png'} />
                    <link rel="apple-touch-icon" href={'../assets/image/favicon.png'} />
                    <link rel="manifest" href={'../public/manifest.json'} />
                    <Script src="../public/assets/js/app.min.js"
                        strategy="lazyOnload"
                        onLoad={() =>
                            console.log(`script loaded correctly, window.FB has been populated`)
                        } />
                    <Script src="../public/assets/js/scripts.js" />
                    {/* <script src="../public/assets/js/app.min.js"></script>
                    <script src="../public/assets/js/scripts.js"></script> */}
                    {/* <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> */}
                    {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2698878418376050"
                    crossorigin="anonymous"></script> */}
                    {/* Google tag (gtag.js)  */}
                    {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-6D18RCSEWZ"></script> */}
                    <script>
                        {/* window.dataLayer = window.dataLayer || [];
                    function gtag() {dataLayer.push(arguments)}
                    gtag('js', new Date());

                    gtag('config', 'G-6D18RCSEWZ'); */}
                    </script>
                    {/* Google Tag Manager  */}
                    {/* <script>(function (w, d, s, l, i) {
                    w[l] = w[l] || []; w[l].push({
                        'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
      }); var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-MFFHG2K');</script> */}
                    {/* End Google Tag Manager  */}

                    {/* Google Tag Manager (noscript)  */}
                    {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFFHG2K" height="0" width="0"
                    style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript> */}
                    {/* End Google Tag Manager (noscript)  */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;