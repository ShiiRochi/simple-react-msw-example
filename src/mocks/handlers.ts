import {rest} from "msw";


export const createHandlers = ({ shouldFail= false } = {}) => [
    rest.get('http://localhost/login', (req, res, ctx) => {
        return res(
            ctx.status(shouldFail ? 401 : 200),
            ctx.json(shouldFail ? { data: "fail" } : {
                data: "success",
                user: {
                    id: 1,
                    name: "user"
                }
            })
        );
    })
];

export const handlers = createHandlers();



