import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { secret } from '../../config/global';
import { ResponseBody } from '../response-body';
import acsUserDao from '../../service/UserDao';
import { AcsUser } from '../../service/models/User';
import { logEvent } from 'pkg-prima-logger';

interface RequestBody {
    username: string;
    pass: string;
}

class ResponseLogin extends ResponseBody {
    constructor(success: boolean, public data: any, err: string) {
        super(success, err);
    }
}

export function login(req: Request, res: Response, next) {
    let login = req.body as RequestBody;
    acsUserDao.login(login.username, login.pass)
        .then((data: AcsUser) => {
            if (data) {
                let token = sign({ id: data.idUser }, secret);
                delete data.passUser;

                logEvent({
                    req,
                    msg: 'Success authentication',
                    event: {
                        action: 'success_authentication',
                        category: 'authentication'
                    },
                    extra: {
                        userId: data.idUser,
                        username: data.nameUser,
                        email: data.emailUser,
                    }
                });

                res.send(new ResponseLogin(true, { user: data, token: token }, null));
            } else {
                logEvent({
                    req,
                    msg: 'Login attempt failed',
                    level: "warn",
                    event: {
                        action: 'failed_authentication',
                        category: 'authentication'
                    },
                    extra: {
                        username: login.username,
                    }
                });

                res.send(new ResponseLogin(false, null, "Usuario o contraseña incorrectos"));
            }
        }, err => {
            console.log(err)
            req.log.error({
                msg: 'Error ocurred during authentication',
                ip: req.ip,
                route: req.originalUrl,
                error: err,
                context: {
                    username: login.username,
                }
            });

            res.status(500).send(new ResponseLogin(false, null, err));
        });
}