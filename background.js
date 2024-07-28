let pattern = "https://www.google.com/url?*";

function redirect(requestDetails) {
    const srcUrl = requestDetails.url;    
    const srcUrlObj = new URL(srcUrl);
    const targetUrl = srcUrlObj.searchParams.get("q");

    console.log(`Redirecting: "${srcUrl}" to "${targetUrl}"`);
    return {
        redirectUrl: targetUrl
    };
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: [pattern] },
  ["blocking"],
);
