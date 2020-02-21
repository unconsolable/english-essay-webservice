const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/user/sumbit/checkTask"

exports.route = {
	async get({ QQ, taskNum }) {
		console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
        let userdb = await mongodb('user')
        let time=new Date()
		try {
            let user= await userdb.findOne({QQ})
            let {doneList}=user
            doneList.push({taskNum,time})
            await userdb.update({QQ},{$set:{doneList}})
		} catch (e) {
			console.log(e)
			throw "打卡时出现错误"
		}
		return "打卡成功"
	}
}