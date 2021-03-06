// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
// const tencentcloud = require("tencentcloud-sdk-nodejs")
const config = require("../../sdk/sdk.json")["tencent-ecc"]

exports.route = {
  async post({title, body}) {
    if (!title || !body) {
      throw '参数不全'
    }
    let data = JSON.parse(JSON.stringify(config.mock))
    // const EccClient = tencentcloud.ecc.v20181213.Client
    // const clientConfig = {
    //   credential: {
    //     secretId: config.secretId,
    //     secretKey: config.secretKey
    //   },
    //   region: "",
    //   profile: {
    //     httpProfile: {
    //       endpoint: "ecc.ap-shanghai.tencentcloudapi.com",
    //     },
    //   },
    // }

    // const client = new EccClient(clientConfig)
    // const params = {
    //   "Content": body,
    //   "Title": title,
    //   "Grade": "grade11"
    // }
      
    // let data = await client.ECC(params)
    console.log(data.Data.ScoreCat)
    let marks = [{Name: '总分', Score: data.Data.Score, Percentage: '100%'}]
    for (let i of Object.keys(data.Data.ScoreCat)) {
      if (data.Data.ScoreCat[i].Name && data.Data.ScoreCat[i].Score) {
        marks.push({
          Name: data.Data.ScoreCat[i].Name,
          Score: data.Data.ScoreCat[i].Score,
          Percentage: data.Data.ScoreCat[i].Percentage + '%'
        })
      }
    }
    data.Data.ScoreCat = marks
    console.log(data.Data.ScoreCat)
    return data
  }
}