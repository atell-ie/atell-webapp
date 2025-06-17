const sentryDsn =
    "https://d472f0e691ff494bb824cf50a01b0311@o1223074.ingest.sentry.io/6367187";

const envs = {
    local: {
        api: {
            url: "http://localhost:8080/api"
        },
        auth: {
            url: "http://localhost:8080/api/token/"
        },
        clientId: "8421eeb1-73c8-45c0-bf92-04aa74d27a0e",
        passwordReset: {
            params: [
                "p=B2C_1_password_reset_ng",
                "nonce=defaultNonce",
                "scope=openid",
                "response_type=id_token",
                "prompt=login"
            ],
            redirectUri: "https://auditor-qa.checkventory.com",
            url: "https://checkventoryadb2cqa.b2clogin.com/checkventoryadb2cqa.onmicrosoft.com/oauth2/v2.0/authorize"
        },
        sentryDsn
    },
    dev: {
        api: {
            url: "https://atell-api.azurewebsites.net/api"
        },
        auth: {
            url: "https://atell-api.azurewebsites.net/api/token/"
        },
        clientId: "8421eeb1-73c8-45c0-bf92-04aa74d27a0e",
        passwordReset: {
            params: [
                "p=B2C_1_password_reset_ng",
                "nonce=defaultNonce",
                "scope=openid",
                "response_type=id_token",
                "prompt=login"
            ],
            redirectUri: "https://auditor-qa.checkventory.com",
            url: "https://checkventoryadb2cqa.b2clogin.com/checkventoryadb2cqa.onmicrosoft.com/oauth2/v2.0/authorize"
        },
        sentryDsn
    },
    qa: {
        api: {
            url: "https://api-qa.checkventory.com"
        },
        auth: {
            url: "https://auth-qa.checkventory.com/acquire_token_with_ropc"
        },
        clientId: "8421eeb1-73c8-45c0-bf92-04aa74d27a0e",
        passwordReset: {
            params: [
                "p=B2C_1_password_reset_ng",
                "nonce=defaultNonce",
                "scope=openid",
                "response_type=id_token",
                "prompt=login"
            ],
            redirectUri: "https://auditor-qa.checkventory.com",
            url: "https://checkventoryadb2cqa.b2clogin.com/checkventoryadb2cqa.onmicrosoft.com/oauth2/v2.0/authorize"
        },
        sentryDsn
    },
    prod: {
        api: {
            url: "https://api.checkventory.com"
        },
        auth: {
            url: "https://auth.checkventory.com/acquire_token_with_ropc"
        },
        clientId: "a2bb5f43-7402-43c8-8a60-b2b5dcd25582",
        passwordReset: {
            params: [
                "p=B2C_1_password_reset_ng",
                "nonce=defaultNonce",
                "scope=openid",
                "response_type=id_token",
                "prompt=login"
            ],
            redirectUri: "https://auditor.checkventory.com",
            url: "https://checkventoryadb2c.b2clogin.com/checkventoryadb2c.onmicrosoft.com/oauth2/v2.0/authorize"
        },
        sentryDsn
    }
};

export default envs;
