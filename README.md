# AISchedule SDU WH
山东大学（威海）小爱同学课程表代码  
![](https://img.shields.io/badge/%E5%BC%80%E5%8F%91%E8%80%85-yuzheng14-yellow)
![](https://img.shields.io/badge/dynamic/json?color=brightgreen&label=%E4%BD%BF%E7%94%A8%E4%BA%BA%E6%95%B0&query=%24.usedNum&url=https%3A%2F%2Fopen-schedule.ai.xiaomi.com%2Fapi%2Fcoder%3Ftb_id%3D36366)
![](https://img.shields.io/badge/dynamic/json?color=yellow&label=%E5%BC%80%E5%8F%91%E8%80%85&query=%24.coderName&url=https%3A%2F%2Fopen-schedule.ai.xiaomi.com%2Fapi%2Fcoder%3Ftb_id%3D36366)
[![](https://img.shields.io/badge/QQ%E7%BE%A4-653831786-important)](https://jq.qq.com/?_wv=1027&k=VvVwIsjE)

## 使用说明
##### 点击教务处导入
![图片加载失败](https://github-yuzheng14.oss-cn-beijing.aliyuncs.com/AISchedule-SDU-WH/1.png)
##### 登录个人信息化门户
![图片加载失败](https://github-yuzheng14.oss-cn-beijing.aliyuncs.com/AISchedule-SDU-WH/2.png)

##### 定位到当前学期理论课表
![图片加载失败](https://github-yuzheng14.oss-cn-beijing.aliyuncs.com/AISchedule-SDU-WH/3.png)

##### 点击一键导入
![图片加载失败](https://github-yuzheng14.oss-cn-beijing.aliyuncs.com/AISchedule-SDU-WH/4.png)

##### 导入成功
![图片加载失败](https://github-yuzheng14.oss-cn-beijing.aliyuncs.com/AISchedule-SDU-WH/5.png)

## 更新说明

- 36640（正在审核）
  - 添加课程表导入异常或失败时对加入QQ群的引导
- 36366（当前版本）
  - 修改DOM获取课程信息为正则表达式获取课程信息
  - 增加对同一节课不同时间不同课的支持
  - 增加对“（单周）”“（双周）”格式的周数的支持

## 注

抓包获取的用于显示使用人数的动态徽标仅显示当前版本的使用人数

## 文件目录结构
>│   parser.js  
>│   provider.js  
>│   README.md  
>│   
>└───.dist