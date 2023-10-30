import ReactGA from "react-ga4";

export function trackEvent(category: any, action = "click") {
    ReactGA.event({
        action,
        category,
    });
}