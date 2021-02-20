exports.route = {
  async post({title, body}) {
    let data = {
      title, body,
      "Data": {
        "Score": 72.39,
        "ScoreCat": {
          "Words": {
            "Name": "词汇",
            "Score": 76.08,
            "Percentage": 42
          },
          "Sentences": {
            "Name": "句子",
            "Score": 61.16,
            "Percentage": 28
          },
          "Structure": {
            "Name": "篇章结构",
            "Score": 80.37,
            "Percentage": 23
          },
          "Content": {
            "Name": "内容",
            "Score": 69,
            "Percentage": 7
          },
          "Score": 0,
          "Percentage": 0
        },
        "Comment": "作者词汇基础扎实；可适当增加复合句和从句的使用；文中衔接词丰富。请多加练习，更上一层楼。",
        "SentenceComments": [
          {
            "Sentence": {
              "Sentence": "Teenagers likeating fast 1888861 food.",
              "ParaID": 1,
              "SentenceID": 7
            },
            "Suggestions": [
              {
                "Type": "Error",
                "ErrorType": "拼写错误",
                "Origin": "likeating",
                "Replace": "elevating",
                "Message": "likeating 可能是拼写错误，请注意拼写检查，这里应将 likeating 替换为 elevating",
                "ErrorPosition": [
                  8,
                  8
                ],
                "ErrorCoordinate": [
                  {
                    "Coordinate": [
                      424,
                      360,
                      459,
                      359,
                      459,
                      386,
                      424,
                      387
                    ]
                  }
                ]
              },
              {
                "Type": "Error",
                "ErrorType": "易混淆词汇建议",
                "Origin": "1888861",
                "Replace": "1886861",
                "Message": "注意1888861 与 1886861 的区别，推荐将 1888861 替换为 1886861",
                "ErrorPosition": [
                  8,
                  8
                ],
                "ErrorCoordinate": [
                  {
                    "Coordinate": [
                      424,
                      360,
                      459,
                      359,
                      459,
                      386,
                      424,
                      387
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
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
    return data
  }
}