const express = require('express');
const axios = require('axios');
const path = require('path');

const githubAuth = (req, res) => {
    //#swagger.tags = ['githubAuth']
    express.static(res.sendFile(path.join(__dirname, '../static/github-auth/index.html')));
};

const auth = (req, res) => {
    //#swagger.tags = ['auth']
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
};
const oauthCallback = ({
    query: {
        code
    }
}, res) => {
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code,
    };
    const opts = {
        headers: {
            accept: 'application/json'
        }
    };
    axios
        .post('https://github.com/login/oauth/access_token', body, opts)
        .then((_res) => _res.data.access_token)
        .then((token) => {
            // eslint-disable-next-line no-console
            console.log('My token:', token);

            res.redirect(`/github-auth/?token=${token}`);

            // enable to go back to home pagge
            // res.redirect(`/?token=${token}`);
        })
        .catch((err) => res.status(500).json({
            err: err.message
        }));
};

module.exports = {
    githubAuth,
    auth,
    oauthCallback
};
