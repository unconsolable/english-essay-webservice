# seu生学部2020春季线上打卡小活动
section 1  


名称：未定

活动时间：

活动目的和概述:

提供平台，使参与者打卡完成各种值得学习的好习惯。


活动规则：


活动组成：
个体（参与者，团队）：
	内容：
		关键字（账号信息的唯一认证）
		昵称（可任意修改）
		团队名称（团队信息的唯一认证，不可修改）
		卡片（来自队伍）
		积分
	行为：
		
		登陆（注册）
		提交任务
		确认队名（队伍认证）
团队(团队视为个体处理)
	内容：
		名称
		人数（未定上下界）
		卡片信息
	行为：
		更新已获得卡片
		

面向用户平台：
公示：
	内容：
		规则明细
		排行榜
任务：
	内容：
		名称
		类型（日常任务，限时任务（趣味任务））
		任务状态（可见，不可见）
		分值
		具体解释
		提交要求
额外积分：
	内容：
		对应任务[]
		分值[]
		已经累计连续完成的时间
		

管理者平台：
数据集：
	内容：
		个体&对应积分
	行为：
		更新排行榜
		更新任务
		接受每个个体的任务提交
		更新个体信息

实现：
PlanA：
仅构建网页利用QQ处理提交（无后端）
UI：
	组件：
		底部导航栏(参考微信底部导航栏)：
			：图标：任务列表，公告，我的
			@ 点击时切换
			
		排行榜：
			：[名次|昵称|积分]	（不同区间用不同背景色区分）
		公示框
			：公示内容
		成长的小树
			几张不同图片表示不同状态（用积分）
		集卡册
			几张卡片图片（亮色为拥有）
		任务框
			：[任务]（呈现任务信息见上）&
			    状态（0，1是否完成）（0->显示提交按钮，亮色）（1->显示提交按钮，暗色，打上完成的时间戳）
			[按钮]“提交”<QQ会话>
		按钮		
		背景
		

	欢迎页面：
			[按钮(登陆)]
		
			inputlist：
		
	主页面（我的）
		====================
		【个人信息 】                      [小树]
		====================
		                   [集卡册]
		====================
			n个[任务框(1)]
	                               （显示已经完成的任务）
		====================
			[按钮（退出）]
	主页面(任务)
		======================
			n个[任务框(0)]
	                                      （显示已经任务）
		======================
	主页面(公示)				
		======================
			[排行榜]
		======================
			[规则]	
		======================
			[按钮（人工反馈）]

			
PlanB：
UI
	QQ群完成一切
	军军的空间公布前10排行

	

人工处理：

	内容：
		在线表格
		个体：[名称|类型（队伍or个人）|分数]
		
		任务可见表格
		[0,1]x n	
		
		每个人的历史纪录
		[id]x n(以及完成的任务id)

	个体:	
		内容：以在线表格处理(关键字：学号（唯一关键字）)
		登陆（注册）：再数据库中查找学号（有则登陆，无则注册并登陆）
		提交：利用QQ一键建立会话功能，提交图片和编号给管理员
		队伍认证：同一个名称的个人为同一个团队
	团队：
		内容：以在线表格处理(关键字：名称（唯一关键字）)
				
	任务：
		接受提交：QQ的图片和文字，用户关键字，团队关键字		
		处理：找到用户关键字，团队关键字对应积分更改。
	更新数据到UI。
	


>任务



（此处仅列举 日常任务 名次和分值）


1.	早起				（6.10前5，6.30前4，7.00前3，周末7点前5，到8点前是4，到9点前是3）
2.	每天运动一万步			（10000:4  7000:3  周末8000:4  5000:3）
3.	11点之前上床睡觉			（4）
4.	图书馆打卡（每天）			（3）	(+1,+2)
5.	早到教室，考虑坐前排			（1：3,2：5）
6.	认真吃早餐				（3）
7.	卫生习惯（卫生得分）			（4）
8.	拍摄运动场所（户外运动）		（3）
9.	英语学习 				  (+1,+2)
		背单词20			（3）
		口语训练  			（3）
		听力训练（英语音频） 8分钟	（3）
		阅读英语美文  1篇		（3）
10.	阅读课外书籍			（3)	(+1,+2)
11.	每天练字       			（3）	(+1,+2)
12.	坚持跑操满勤一周			（10）
13.	课程实践				（+1,+2）
		数电实验			（4）	
		额外专业知识学习		（4）	
		项目实践			（4）
		编程题			（4）
		
额外加分
T1.  	周末额外奖励（满足当天加分达到一定标准）   （+4）

>团队集卡
（以有大致基准未具体商讨）
同个人任务并行，即该团队同时完成某一类任务次数的累记次数到某一数值，团队成员均可以获得该类型卡片。




奖品发放
1.以个人积分发放:   （未定）
	（1）凡是积分到达某一分值的前xi名发放奖品i。
	（2）最终积分前前xi名发放奖品i。
	（3）达到积分x获得对应奖品
2.以团队集卡发放：（未定）
	（1）集齐不同所有卡的前x支队伍




奖品

部分低额奖品

电脑清理套装 	11
方形闹钟        	16 
桌面摆件        	10     
可倒计时闹钟       	10
感应夜灯              	20
大鱼可变形U型枕 	30

高额奖品

充电宝		70 
电脑支架 		40
