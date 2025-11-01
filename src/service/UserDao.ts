import pool from './database/database'
import { Query } from './database/query'
import { AcsUser } from './models/User'
var md5 = require('md5');

class AcsUserDao {

    public async login(email: string, pass: string): Promise<any> {
        var obj: AcsUser = null
        try {
            console.log('pass:' + md5(pass));
            console.log("email: ", email);

            var rsw: any = await pool.query(Query.LOGIN, [email, md5(pass)])
            const rs = rsw.rows
            // console.log("rs: ", rs)
            rs.map((item: any) => {
                obj = new AcsUser()
                obj.idUser = item.id_user
                obj.idProf = item.id_role
                obj.idComp = item.id_comp
                obj.identUser = item.ident_user
                obj.nameUser = item.name_user
                obj.lastnameUser = item.lastname_user
                obj.emailUser = item.email_user
                obj.passUser = item.pass_user
                obj.genderUser = item.gender_user
                obj.dateBirthUser = item.date_birth_user
                obj.entailmentDateUser = item.entailment_date_user
            })
            // console.log("obj: ", obj)
        } catch (err) {
            console.log(err)
            throw err
        }
        return obj
    }

    public async users(): Promise<any> {
        try {
            var rsw: any = await pool.query(Query.SELECT_USERS)
            const rs = rsw.rows
            var list = []
            list = rs.map((item: any) => {
                const obj: AcsUser = new AcsUser()
                obj.idUser = item.id_user
                obj.idProf = item.id_role
                obj.idComp = item.id_comp
                obj.identUser = item.ident_user
                obj.nameUser = item.name_user
                obj.lastnameUser = item.lastname_user
                obj.emailUser = item.email_user
                obj.passUser = item.pass_user
                obj.genderUser = item.gender_user
                obj.dateBirthUser = item.date_birth_user
                obj.entailmentDateUser = item.entailment_date_user
                return obj
            })
        } catch (err) {
            console.log(err)
            throw err
        }
        return list
    }

    public async userById(id: number): Promise<any> {
        try {
            var rsw: any = await pool.query(Query.SELECT_USER_BY_ID, [id])
            const rs = rsw.rows
            var obj: AcsUser = null
            rs.map((item: any) => {
                obj = new AcsUser()
                obj.idUser = item.id_user
                obj.idProf = item.id_role
                obj.idComp = item.id_comp
                obj.identUser = item.ident_user
                obj.nameUser = item.name_user
                obj.lastnameUser = item.lastname_user
                obj.emailUser = item.email_user
                obj.passUser = item.pass_user
                obj.genderUser = item.gender_user
                obj.dateBirthUser = item.date_birth_user
                obj.entailmentDateUser = item.entailment_date_user
            })
        } catch (err) {
            console.log(err)
            throw err
        }
        return obj
    }

    public async userByEmail(email: string): Promise<any> {
        try {
            var rsw: any = await pool.query(Query.SELECT_USER_BY_EMAIL, [email])
            const rs = rsw.rows
            var obj: AcsUser = null
            rs.map((item: any) => {
                obj = new AcsUser()
                obj.idUser = item.id_user
                obj.idProf = item.id_role
                obj.idComp = item.id_comp
                obj.identUser = item.ident_user
                obj.nameUser = item.name_user
                obj.lastnameUser = item.lastname_user
                obj.emailUser = item.email_user
                obj.passUser = item.pass_user
                obj.genderUser = item.gender_user
                obj.dateBirthUser = item.date_birth_user
                obj.entailmentDateUser = item.entailment_date_user
            })
        } catch (err) {
            console.log(err)
            throw err
        }
        return obj
    }

    public async usersByIdComp(idcomp: number): Promise<any> {
        try {
            var rsw: any = await pool.query(Query.SELECT_USER_BY_ID_COMP, [idcomp])
            const rs = rsw.rows
            var list = []
            list = rs.map((item: any) => {
                const obj: AcsUser = new AcsUser()
                obj.idUser = item.id_user
                obj.idProf = item.id_role
                obj.idComp = item.id_comp
                obj.identUser = item.ident_user
                obj.nameUser = item.name_user
                obj.lastnameUser = item.lastname_user
                obj.emailUser = item.email_user
                obj.passUser = item.pass_user
                obj.genderUser = item.gender_user
                obj.dateBirthUser = item.date_birth_user
                obj.entailmentDateUser = item.entailment_date_user
                return obj
            })
        } catch (err) {
            console.log(err)
            throw err
        }
        return list
    }

    public async insert(user: AcsUser): Promise<any> {
        var action = false
        try {
            await pool.query(Query.INSERT_USER, [user.idProf, user.idComp, user.identUser,
            user.nameUser, user.lastnameUser, user.emailUser, md5(user.passUser),
            user.genderUser, user.dateBirthUser, user.entailmentDateUser])
            action = true
        } catch (err) {
            action = false
            console.log(err)
            throw err
        }
        return action
    }

    public async update(user: AcsUser, chPass: number): Promise<any> {
        var action = false
        try {
            if (chPass === 1) {
                await pool.query(Query.UPDATE_USER, [user.idProf, user.idComp, user.identUser,
                user.nameUser, user.lastnameUser, user.emailUser, md5(user.passUser), 
                user.genderUser, user.dateBirthUser, user.entailmentDateUser, user.idUser])
            } else {
                await pool.query(Query.UPDATE_USER_NCP, [user.idProf, user.idComp, user.identUser,
                user.nameUser, user.lastnameUser, user.emailUser, user.genderUser,
                user.dateBirthUser, user.entailmentDateUser, user.idUser])
            }
            action = true
        } catch (err) {
            action = false
            console.log(err)
            throw err
        }
        return action
    }

    public async delete(id: number): Promise<any> {
        var action = false
        try {
            await pool.query(Query.DELETE_USER, [id])
            action = true
        } catch (err) {
            action = false
            console.log(err)
            throw err
        }
        return action
    }
}


const acsUserDao = new AcsUserDao
export default acsUserDao
