const changePathnameURL = (pathname) => {
    const urlObject = new URL(window.location.href);
    urlObject.pathname = pathname;
    window.history.replaceState(null, null, urlObject.toString());
};

export default changePathnameURL;
