const { GraphQLError } = require('graphql');
const webToken = require('jsonwebtoken');

const secret = 'secret';
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user', {
        extensions: { code: 'UNAUTHENTICATED' },
    }),
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = webToken.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    },
    signToken: function ({ username, _id }) {
        const payload = { username, _id };

        return webToken.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};