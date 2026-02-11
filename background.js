const patterns = ["*://www.google.com/url?*", "*://www.youtube.com/redirect?*"];

function redirect(requestDetails) {
    console.log(`Triggered redirect for: ${requestDetails.url}`);
    const srcUrl = requestDetails.url;    
    const srcUrlObj = new URL(srcUrl);
    const param = srcUrlObj.searchParams.has("url") ? "url" : "q";
    const targetUrl = srcUrlObj.searchParams.get(param);
    
    try {
        // ensure URL validity
        const targetUrlObj = new URL(targetUrl);
        console.log(`Redirecting: "${srcUrl}" to "${targetUrl}"`);
        return {
            redirectUrl: targetUrlObj.toString()
        };
    } catch (ex) {
        console.error(`Failed to detect valid target in "${srcUrl}" using param "${param}"`);
    }
}

browser.webRequest.onBeforeRequest.addListener(
    redirect,
    { urls: patterns },
    ["blocking"],
);
